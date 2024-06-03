# Code generated by protoc-gen-connect-python 0.1.0.dev2, DO NOT EDIT.
from typing import Any, Generator

import connect

from envd.process import process_pb2 as envd_dot_process_dot_process__pb2

ProcessServiceName = "envd.process.ProcessService"


class ProcessServiceClient:
    def __init__(self, base_url, *, pool=None, compressor=None, json=False, **opts):
        self._list = connect.Client(
            pool=pool,
            url=f"{base_url}/{ProcessServiceName}/List",
            response_type=envd_dot_process_dot_process__pb2.ListResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._connect = connect.Client(
            pool=pool,
            url=f"{base_url}/{ProcessServiceName}/Connect",
            response_type=envd_dot_process_dot_process__pb2.ConnectResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._start = connect.Client(
            pool=pool,
            url=f"{base_url}/{ProcessServiceName}/Start",
            response_type=envd_dot_process_dot_process__pb2.StartResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._update = connect.Client(
            pool=pool,
            url=f"{base_url}/{ProcessServiceName}/Update",
            response_type=envd_dot_process_dot_process__pb2.UpdateResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._stream_input = connect.Client(
            pool=pool,
            url=f"{base_url}/{ProcessServiceName}/StreamInput",
            response_type=envd_dot_process_dot_process__pb2.StreamInputResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._send_input = connect.Client(
            pool=pool,
            url=f"{base_url}/{ProcessServiceName}/SendInput",
            response_type=envd_dot_process_dot_process__pb2.SendInputResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._send_signal = connect.Client(
            pool=pool,
            url=f"{base_url}/{ProcessServiceName}/SendSignal",
            response_type=envd_dot_process_dot_process__pb2.SendSignalResponse,
            compressor=compressor,
            json=json,
            **opts
        )

    def list(self, req: envd_dot_process_dot_process__pb2.ListRequest, **opts) -> envd_dot_process_dot_process__pb2.ListResponse:
        return self._list.call_unary(req, **opts)

    def connect(self, req: envd_dot_process_dot_process__pb2.ConnectRequest , **opts) -> Generator[envd_dot_process_dot_process__pb2.ConnectResponse, Any, None]:
        return self._connect.call_server_stream(req, **opts)

    def start(self, req: envd_dot_process_dot_process__pb2.StartRequest , **opts) -> Generator[envd_dot_process_dot_process__pb2.StartResponse, Any, None]:
        return self._start.call_server_stream(req, **opts)

    def update(self, req: envd_dot_process_dot_process__pb2.UpdateRequest, **opts) -> envd_dot_process_dot_process__pb2.UpdateResponse:
        return self._update.call_unary(req, **opts)

    def stream_input(self, req: envd_dot_process_dot_process__pb2.StreamInputRequest, **opts) -> envd_dot_process_dot_process__pb2.StreamInputResponse:
        return self._stream_input.call_client_stream(req, **opts)

    def send_input(self, req: envd_dot_process_dot_process__pb2.SendInputRequest, **opts) -> envd_dot_process_dot_process__pb2.SendInputResponse:
        return self._send_input.call_unary(req, **opts)

    def send_signal(self, req: envd_dot_process_dot_process__pb2.SendSignalRequest, **opts) -> envd_dot_process_dot_process__pb2.SendSignalResponse:
        return self._send_signal.call_unary(req, **opts)
