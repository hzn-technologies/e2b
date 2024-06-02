"""
Secure sandboxed cloud environments made for AI agents and AI apps

Check usage docs - https://e2b.dev/docs/sandbox/overview

E2B Sandbox is a secure sandboxed cloud environment made for AI agents and AI
apps. Sandboxes allow AI agents and apps to have long running cloud secure
environments. In these environments, large language models can use the same
tools as humans do.
"""

from envd.filesystem.v1.filesystem_pb2 import FilesystemEvent, FileType, EntryInfo
from .api import (
    ApiClient,
    AuthenticationException,
    client,
)
from .connection_config import ConnectionConfig
from .sandbox.main import Sandbox
from .sandbox.process import ProcessHandle, ProcessOutput, ProcessResult
