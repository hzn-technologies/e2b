from io import TextIOBase
from typing import Iterator, List, Literal, Optional, overload
from e2b.sandbox.filesystem.filesystem import WriteData, WriteEntry

import e2b_connect
import httpcore
import httpx
from e2b.connection_config import (
    ConnectionConfig,
    Username,
    KEEPALIVE_PING_HEADER,
    KEEPALIVE_PING_INTERVAL_SEC,
)
from e2b.envd.api import ENVD_API_FILES_ROUTE, handle_envd_api_exception
from e2b.envd.filesystem import filesystem_connect, filesystem_pb2
from e2b.envd.rpc import authentication_header, handle_rpc_exception
from e2b.exceptions import SandboxException
from e2b.sandbox.filesystem.filesystem import EntryInfo, map_file_type
from e2b.sandbox_sync.filesystem.watch_handle import WatchHandle


class Filesystem:
    """
    Manager for interacting with the filesystem in the sandbox.
    """

    def __init__(
        self,
        envd_api_url: str,
        connection_config: ConnectionConfig,
        pool: httpcore.ConnectionPool,
        envd_api: httpx.Client,
    ) -> None:
        self._envd_api_url = envd_api_url
        self._connection_config = connection_config
        self._pool = pool
        self._envd_api = envd_api

        self._rpc = filesystem_connect.FilesystemClient(
            envd_api_url,
            # TODO: Fix and enable compression again — the headers compression is not solved for streaming.
            # compressor=e2b_connect.GzipCompressor,
            pool=pool,
            json=True,
        )

    @overload
    def read(
        self,
        path: str,
        format: Literal["text"] = "text",
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> str: ...

    @overload
    def read(
        self,
        path: str,
        format: Literal["bytes"],
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> bytearray: ...

    @overload
    def read(
        self,
        path: str,
        format: Literal["stream"],
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> Iterator[bytes]: ...

    def read(
        self,
        path: str,
        format: Literal["text", "bytes", "stream"] = "text",
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ):
        """
        Reads a whole file content and returns it in requested format (text by default).

        :param path: Path to the file
        :param format: Format of the file content
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request
        :return File content in requested format
        """
        r = self._envd_api.get(
            ENVD_API_FILES_ROUTE,
            params={"path": path, "username": user},
            timeout=self._connection_config.get_request_timeout(request_timeout),
        )

        err = handle_envd_api_exception(r)
        if err:
            raise err

        if format == "text":
            return r.text
        elif format == "bytes":
            return bytearray(r.content)
        elif format == "stream":
            return r.iter_bytes()

    @overload
    def write(
        self,
        path: str,
        data: WriteData,
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> EntryInfo:
        """
        Writes content to a file on the path.
        When writing to a file that doesn't exist, the file will get created.
        When writing to a file that already exists, the file will get overwritten.
        When writing to a file that's in a directory that doesn't exist, the directory will get created.

        :param path: Path to the file
        :param data: Data to write to the file
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request
        :return: Information about the written file
        """

    @overload
    def write(
        self,
        files: List[WriteEntry],
        user: Optional[Username] = "user",
        request_timeout: Optional[float] = None,
    ) -> List[EntryInfo]:
        """
        Writes a list of files to the filesystem.
        When writing to a file that doesn't exist, the file will get created.
        When writing to a file that already exists, the file will get overwritten.
        When writing to a file that's in a directory that doesn't exist, you'll get an error.

        :param files: list of files to write 
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request
        :return: Information about the written files
        """

    def write(
        self,
        path_or_files: str | List[WriteEntry],
        data_or_user: WriteData | Username = "user",
        user_or_request_timeout: Optional[float | Username] = None,
        request_timeout_or_none: Optional[float] = None
    ) -> EntryInfo | List[EntryInfo]:
        path, write_files, user, request_timeout  = None, [], "user", None
        if isinstance(path_or_files, str):
            if isinstance(data_or_user, list):
                raise Exception("Cannot specify both path and array of files. You have to specify either path and data for a single file or an array for multiple files.")
            path, write_files, user, request_timeout = \
                path_or_files, [{"path": path_or_files, "data": data_or_user}], user_or_request_timeout or "user", request_timeout_or_none
        else:
            if path_or_files is None:
                raise Exception("Path or files are required")
            path, write_files, user, request_timeout = \
                None, path_or_files, data_or_user, user_or_request_timeout
        
        # Prepare the files for the multipart/form-data request
        httpx_files = []
        for file in write_files:
            file_path, file_data = file['path'], file['data']
            if isinstance(file_data, str) or isinstance(file_data, bytes):
                httpx_files.append(('file', (file_path, file_data)))
            elif isinstance(file_data, TextIOBase):
                httpx_files.append(('file', (file_path, file_data.read())))
            else:
                raise ValueError(f"Unsupported data type for file {file_path}")
        
        # Allow passing empty list of files
        if len(httpx_files) == 0: return []

        params = {"username": user}
        if path is not None: params["path"] = path

        r = self._envd_api.post(
            ENVD_API_FILES_ROUTE,
            files=httpx_files,
            params=params,
            timeout=self._connection_config.get_request_timeout(request_timeout),
        )

        err = handle_envd_api_exception(r)
        if err:
            raise err

        write_files = r.json()

        if not isinstance(write_files, list) or len(write_files) == 0:
            raise Exception("Expected to receive information about written file")

        if len(write_files) == 1 and path:
            file = write_files[0]
            return EntryInfo(**file)
        else:
            return [EntryInfo(**file) for file in write_files]

    def list(
        self,
        path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> List[EntryInfo]:
        """
        Lists entries in a directory.

        :param path: Path to the directory
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request
        :return: List of entries in the directory
        """
        try:
            res = self._rpc.list_dir(
                filesystem_pb2.ListDirRequest(path=path),
                request_timeout=self._connection_config.get_request_timeout(
                    request_timeout
                ),
                headers=authentication_header(user),
            )

            entries: List[EntryInfo] = []
            for entry in res.entries:
                event_type = map_file_type(entry.type)

                if event_type:
                    entries.append(
                        EntryInfo(name=entry.name, type=event_type, path=entry.path)
                    )

            return entries
        except Exception as e:
            raise handle_rpc_exception(e)

    def exists(
        self,
        path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> bool:
        """
        Checks if a file or a directory exists.

        :param path: Path to a file or a directory
        :param user Run the operation as this user
        :param request_timeout Timeout for the request
        """
        try:
            self._rpc.stat(
                filesystem_pb2.StatRequest(path=path),
                request_timeout=self._connection_config.get_request_timeout(
                    request_timeout
                ),
                headers=authentication_header(user),
            )
            return True

        except Exception as e:
            if isinstance(e, e2b_connect.ConnectException):
                if e.status == e2b_connect.Code.not_found:
                    return False
            raise handle_rpc_exception(e)

    def remove(
        self,
        path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> None:
        """
        Removes a file or a directory.
        :param path: Path to a file or a directory
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request
        """
        try:
            self._rpc.remove(
                filesystem_pb2.RemoveRequest(path=path),
                request_timeout=self._connection_config.get_request_timeout(
                    request_timeout
                ),
                headers=authentication_header(user),
            )
        except Exception as e:
            raise handle_rpc_exception(e)

    def rename(
        self,
        old_path: str,
        new_path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> EntryInfo:
        """
        Renames a file or directory from one path to another.

        :param old_path Path to the file or directory to move
        :param new_path Path to move the file or directory to
        :param user Run the operation as this user
        :param request_timeout Timeout for the request

        :return: Information about the renamed file or directory
        """
        try:
            r = self._rpc.move(
                filesystem_pb2.MoveRequest(
                    source=old_path,
                    destination=new_path,
                ),
                request_timeout=self._connection_config.get_request_timeout(
                    request_timeout
                ),
                headers=authentication_header(user),
            )

            return EntryInfo(
                name=r.entry.name,
                type=map_file_type(r.entry.type),
                path=r.entry.path,
            )
        except Exception as e:
            raise handle_rpc_exception(e)

    def make_dir(
        self,
        path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> bool:
        """
        Creates a new directory and all directories along the way if needed on the specified path.

        :param path: Path to a new directory. For example '/dirA/dirB' when creating 'dirB'.
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request
        :return: True if the directory was created, False if the directory already exists
        """
        try:
            self._rpc.make_dir(
                filesystem_pb2.MakeDirRequest(path=path),
                request_timeout=self._connection_config.get_request_timeout(
                    request_timeout
                ),
                headers=authentication_header(user),
            )

            return True
        except Exception as e:
            if isinstance(e, e2b_connect.ConnectException):
                if e.status == e2b_connect.Code.already_exists:
                    return False
            raise handle_rpc_exception(e)

    def watch(
        self,
        path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
        timeout: Optional[float] = 60,
    ) -> WatchHandle:
        """
        Watches directory for filesystem events. The watch will be closed after the timeout.
        To get the events, you need to iterate over the returned WatchHandle.

        :param path: Path to a directory that will be watched
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request
        :param timeout: Timeout for the watch, after which the watch will be closed
        :return: Watcher handle
        """
        events = self._rpc.watch_dir(
            filesystem_pb2.WatchDirRequest(path=path),
            request_timeout=self._connection_config.get_request_timeout(
                request_timeout
            ),
            timeout=timeout,
            headers={
                **authentication_header(user),
                KEEPALIVE_PING_HEADER: str(KEEPALIVE_PING_INTERVAL_SEC),
            },
        )

        try:
            start_event = events.__next__()

            if not start_event.HasField("start"):
                raise SandboxException(
                    f"Failed to start watch: expected start event, got {start_event}",
                )

            return WatchHandle(events=events)
        except Exception as e:
            raise handle_rpc_exception(e)
