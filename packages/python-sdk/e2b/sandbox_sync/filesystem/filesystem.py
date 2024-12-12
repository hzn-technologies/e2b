from io import TextIOBase
from typing import Iterator, List, Literal, Optional, overload

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
from e2b.sandbox.filesystem.filesystem import EntryInfo, map_file_type, WriteEntry
from e2b.sandbox_sync.filesystem.watch_handle import WatchHandle

class Filesystem:
    """
    Module for interacting with the filesystem in the sandbox.
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
    ) -> str:
        """
        Read file content as a `str`.

        :param path: Path to the file
        :param user: Run the operation as this user
        :param format: Format of the file content—`text` by default
        :param request_timeout: Timeout for the request in **seconds**

        :return: File content as a `str`
        """
        ...

    @overload
    def read(
        self,
        path: str,
        format: Literal["bytes"],
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> bytearray:
        """
        Read file content as a `bytearray`.

        :param path: Path to the file
        :param user: Run the operation as this user
        :param format: Format of the file content—`bytes`
        :param request_timeout: Timeout for the request in **seconds**

        :return: File content as a `bytearray`
        """
        ...

    @overload
    def read(
        self,
        path: str,
        format: Literal["stream"],
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> Iterator[bytes]:
        """
        Read file content as a `Iterator[bytes]`.

        :param path: Path to the file
        :param user: Run the operation as this user
        :param format: Format of the file content—`stream`
        :param request_timeout: Timeout for the request in **seconds**

        :return: File content as an `Iterator[bytes]`
        """
        ...

    def read(
        self,
        path: str,
        format: Literal["text", "bytes", "stream"] = "text",
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ):
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

    def write(
        self,
        files: List[WriteEntry],
        user: Optional[Username] = "user",
        request_timeout: Optional[float] = None,
    ) -> List[EntryInfo]:
        """
        Write content to a file(s).

        :param files: list of files to write 
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request
        :return: Information about the written files
        """

       # Prepare the files for the multipart/form-data request
        httpx_files = []
        for file in files:
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

        return [EntryInfo(**file) for file in write_files]

    def list(
        self,
        path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> List[EntryInfo]:
        """
        List entries in a directory.

        :param path: Path to the directory
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request in **seconds**

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
        Check if a file or a directory exists.

        :param path: Path to a file or a directory
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request in **seconds**

        :return: `True` if the file or directory exists, `False` otherwise
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
        Remove a file or a directory.

        :param path: Path to a file or a directory
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request in **seconds**
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
        Rename a file or directory.

        :param old_path: Path to the file or directory to rename
        :param new_path: New path to the file or directory
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request in **seconds**

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
        Create a new directory and all directories along the way if needed on the specified path.

        :param path: Path to a new directory. For example '/dirA/dirB' when creating 'dirB'.
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request in **seconds**

        :return: `True` if the directory was created, `False` if the directory already exists
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

    def watch_dir(
        self,
        path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> WatchHandle:
        """
        Watch directory for filesystem events.

        :param path: Path to a directory to watch
        :param user: Run the operation as this user
        :param request_timeout: Timeout for the request in **seconds**

        :return: `WatchHandle` object for stopping watching directory
        """
        try:
            r = self._rpc.create_watcher(
                filesystem_pb2.CreateWatcherRequest(path=path),
                request_timeout=self._connection_config.get_request_timeout(
                    request_timeout
                ),
                headers={
                    **authentication_header(user),
                    KEEPALIVE_PING_HEADER: str(KEEPALIVE_PING_INTERVAL_SEC),
                },
            )
        except Exception as e:
            raise handle_rpc_exception(e)

        return WatchHandle(self._rpc, r.watcher_id)
