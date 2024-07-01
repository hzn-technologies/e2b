import connect
import httpx
import httpcore

from enum import Enum
from dataclasses import dataclass
from typing import (
    Iterator,
    List,
    Optional,
    overload,
    Literal,
    Union,
    IO,
)

from e2b.sandbox.filesystem.watch_handle import WatchHandle
from e2b.connection_config import (
    Username,
    ConnectionConfig,
)
from e2b.exceptions import (
    SandboxException,
)
from e2b.envd.api import handle_envd_api_exception
from e2b.envd.rpc import authentication_header, handle_rpc_exception
from e2b.envd.filesystem import filesystem_connect, filesystem_pb2
from e2b.envd.api import ENVD_API_FILES_ROUTE


class FileType(Enum):
    FILE = "file"
    DIR = "dir"


def map_file_type(ft: filesystem_pb2.FileType):
    if ft == filesystem_pb2.FileType.FILE_TYPE_FILE:
        return FileType.FILE
    elif ft == filesystem_pb2.FileType.FILE_TYPE_DIRECTORY:
        return FileType.DIR


@dataclass
class EntryInfo:
    name: str
    type: FileType


class Filesystem:
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
            compressor=connect.GzipCompressor,
            pool=pool,
        )

    @overload
    def read(
        self,
        path: str,
        format: Literal["text"] = "text",
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> str:
        ...

    @overload
    def read(
        self,
        path: str,
        format: Literal["bytes"],
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> bytearray:
        ...

    @overload
    def read(
        self,
        path: str,
        format: Literal["stream"],
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> Iterator[bytes]:
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
        path: str,
        data: Union[str, bytes, IO],
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> None:
        r = self._envd_api.post(
            ENVD_API_FILES_ROUTE,
            files={"file": data},
            params={"path": path, "username": user},
            timeout=self._connection_config.get_request_timeout(request_timeout),
        )

        err = handle_envd_api_exception(r)
        if err:
            raise err

    def list(
        self,
        path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> List[EntryInfo]:
        try:
            res = self._rpc.list_dir(
                filesystem_pb2.ListDirRequest(
                    path=path,
                ),
                request_timeout=self._connection_config.get_request_timeout(
                    request_timeout
                ),
                headers=authentication_header(user),
            )

            entries: List[EntryInfo] = []
            for entry in res.entries:
                event_type = map_file_type(entry.type)

                if event_type:
                    entries.append(EntryInfo(name=entry.name, type=event_type))

            return entries
        except Exception as e:
            raise handle_rpc_exception(e)

    def exists(
        self,
        path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> bool:
        try:
            self._rpc.stat(
                filesystem_pb2.StatRequest(
                    path=path,
                ),
                request_timeout=self._connection_config.get_request_timeout(
                    request_timeout
                ),
                headers=authentication_header(user),
            )
            return True

        except Exception as e:
            if isinstance(e, connect.ConnectException):
                if e.status == connect.Code.not_found:
                    return False
            raise handle_rpc_exception(e)

    def remove(
        self,
        path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> None:
        try:
            self._rpc.remove(
                filesystem_pb2.RemoveRequest(
                    path=path,
                ),
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
    ) -> None:
        try:
            self._rpc.move(
                filesystem_pb2.MoveRequest(
                    source=old_path,
                    destination=new_path,
                ),
                request_timeout=self._connection_config.get_request_timeout(
                    request_timeout
                ),
                headers=authentication_header(user),
            )
        except Exception as e:
            raise handle_rpc_exception(e)

    def make_dir(
        self,
        path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
    ) -> bool:
        try:
            self._rpc.make_dir(
                filesystem_pb2.MakeDirRequest(
                    path=path,
                ),
                request_timeout=self._connection_config.get_request_timeout(
                    request_timeout
                ),
                headers=authentication_header(user),
            )

            return True
        except Exception as e:
            if isinstance(e, connect.ConnectException):
                if e.status == connect.Code.already_exists:
                    return False
            raise handle_rpc_exception(e)

    def watch(
        self,
        path: str,
        user: Username = "user",
        request_timeout: Optional[float] = None,
        timeout: Optional[float] = 60,
    ):
        events = self._rpc.watch_dir(
            filesystem_pb2.WatchDirRequest(
                path=path,
            ),
            request_timeout=self._connection_config.get_request_timeout(
                request_timeout
            ),
            timeout=timeout,
            headers=authentication_header(user),
        )

        try:
            start_event = next(events)

            if not start_event.HasField("start"):
                raise SandboxException(
                    f"Failed to start watch: expected start event, got {start_event}",
                )

            return WatchHandle(events=events)
        except Exception as e:
            raise handle_rpc_exception(e)
