# Code generated by protoc-gen-connect-python 0.1.0.dev2, DO NOT EDIT.
from typing import Any, Generator

import connect

from envd.filesystem.v1 import filesystem_pb2 as envd_dot_filesystem_dot_v1_dot_filesystem__pb2

FilesystemServiceName = "envd.filesystem.v1.FilesystemService"


class FilesystemServiceClient:
    def __init__(self, base_url, *, pool=None, compressor=None, json=False, **opts):
        self._stat = connect.Client(
            pool=pool,
            url=f"{base_url}/{FilesystemServiceName}/Stat",
            response_type=envd_dot_filesystem_dot_v1_dot_filesystem__pb2.StatResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._create_file = connect.Client(
            pool=pool,
            url=f"{base_url}/{FilesystemServiceName}/CreateFile",
            response_type=envd_dot_filesystem_dot_v1_dot_filesystem__pb2.CreateFileResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._create_dir = connect.Client(
            pool=pool,
            url=f"{base_url}/{FilesystemServiceName}/CreateDir",
            response_type=envd_dot_filesystem_dot_v1_dot_filesystem__pb2.CreateDirResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._list_dir = connect.Client(
            pool=pool,
            url=f"{base_url}/{FilesystemServiceName}/ListDir",
            response_type=envd_dot_filesystem_dot_v1_dot_filesystem__pb2.ListDirResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._watch = connect.Client(
            pool=pool,
            url=f"{base_url}/{FilesystemServiceName}/Watch",
            response_type=envd_dot_filesystem_dot_v1_dot_filesystem__pb2.WatchResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._rename = connect.Client(
            pool=pool,
            url=f"{base_url}/{FilesystemServiceName}/Rename",
            response_type=envd_dot_filesystem_dot_v1_dot_filesystem__pb2.RenameResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._remove = connect.Client(
            pool=pool,
            url=f"{base_url}/{FilesystemServiceName}/Remove",
            response_type=envd_dot_filesystem_dot_v1_dot_filesystem__pb2.RemoveResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._copy = connect.Client(
            pool=pool,
            url=f"{base_url}/{FilesystemServiceName}/Copy",
            response_type=envd_dot_filesystem_dot_v1_dot_filesystem__pb2.CopyResponse,
            compressor=compressor,
            json=json,
            **opts
        )

    def stat(self, req: envd_dot_filesystem_dot_v1_dot_filesystem__pb2.StatRequest, **opts) -> envd_dot_filesystem_dot_v1_dot_filesystem__pb2.StatResponse:
        return self._stat.call_unary(req, **opts)

    def create_file(self, req: envd_dot_filesystem_dot_v1_dot_filesystem__pb2.CreateFileRequest, **opts) -> envd_dot_filesystem_dot_v1_dot_filesystem__pb2.CreateFileResponse:
        return self._create_file.call_unary(req, **opts)

    def create_dir(self, req: envd_dot_filesystem_dot_v1_dot_filesystem__pb2.CreateDirRequest, **opts) -> envd_dot_filesystem_dot_v1_dot_filesystem__pb2.CreateDirResponse:
        return self._create_dir.call_unary(req, **opts)

    def list_dir(self, req: envd_dot_filesystem_dot_v1_dot_filesystem__pb2.ListDirRequest, **opts) -> envd_dot_filesystem_dot_v1_dot_filesystem__pb2.ListDirResponse:
        return self._list_dir.call_unary(req, **opts)

    def watch(self, req: envd_dot_filesystem_dot_v1_dot_filesystem__pb2.WatchRequest , **opts) -> Generator[envd_dot_filesystem_dot_v1_dot_filesystem__pb2.WatchResponse, Any, None]:
        return self._watch.call_server_stream(req, **opts)

    def rename(self, req: envd_dot_filesystem_dot_v1_dot_filesystem__pb2.RenameRequest, **opts) -> envd_dot_filesystem_dot_v1_dot_filesystem__pb2.RenameResponse:
        return self._rename.call_unary(req, **opts)

    def remove(self, req: envd_dot_filesystem_dot_v1_dot_filesystem__pb2.RemoveRequest, **opts) -> envd_dot_filesystem_dot_v1_dot_filesystem__pb2.RemoveResponse:
        return self._remove.call_unary(req, **opts)

    def copy(self, req: envd_dot_filesystem_dot_v1_dot_filesystem__pb2.CopyRequest, **opts) -> envd_dot_filesystem_dot_v1_dot_filesystem__pb2.CopyResponse:
        return self._copy.call_unary(req, **opts)
