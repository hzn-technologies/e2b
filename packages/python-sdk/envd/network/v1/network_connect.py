# Code generated by protoc-gen-connect-python 0.1.0.dev2, DO NOT EDIT.
from typing import Any, Generator

import connect

from envd.network.v1 import network_pb2 as envd_dot_network_dot_v1_dot_network__pb2

NetworkServiceName = "envd.network.v1.NetworkService"


class NetworkServiceClient:
    def __init__(self, base_url, *, pool=None, compressor=None, json=False, **opts):
        self._list_ports = connect.Client(
            pool=pool,
            url=f"{base_url}/{NetworkServiceName}/ListPorts",
            response_type=envd_dot_network_dot_v1_dot_network__pb2.ListPortsResponse,
            compressor=compressor,
            json=json,
            **opts
        )
        self._watch_ports = connect.Client(
            pool=pool,
            url=f"{base_url}/{NetworkServiceName}/WatchPorts",
            response_type=envd_dot_network_dot_v1_dot_network__pb2.WatchPortsResponse,
            compressor=compressor,
            json=json,
            **opts
        )

    def list_ports(self, req: envd_dot_network_dot_v1_dot_network__pb2.ListPortsRequest, **opts) -> envd_dot_network_dot_v1_dot_network__pb2.ListPortsResponse:
        return self._list_ports.call_unary(req, **opts)

    def watch_ports(self, req: envd_dot_network_dot_v1_dot_network__pb2.WatchPortsRequest , **opts) -> Generator[envd_dot_network_dot_v1_dot_network__pb2.WatchPortsResponse, Any, None]:
        return self._watch_ports.call_server_stream(req, **opts)
