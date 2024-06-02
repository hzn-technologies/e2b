import logging
import connect

from typing import Dict, Optional, Callable, Any, Generator, Union, Literal

from envd.process.v1 import process_connect, process_pb2
from pydantic import BaseModel

logger = logging.getLogger(__name__)


class ProcessOutput(BaseModel):
    stdout: Optional[str] = None
    stderr: Optional[str] = None


class ProcessResult(ProcessOutput):
    exit_code: int
    error: Optional[str]


class ProcessHandle:
    def __init__(
        self,
        pid: int,
        kill: Callable[[], None],
        events: Generator[
            Union[process_pb2.StartResponse, process_pb2.ConnectResponse], Any, None
        ],
    ):
        self.pid = pid
        self.kill = kill
        self._events = events

        self._stdout: bytes = b""
        self._stderr: bytes = b""

        self.result: Optional[ProcessResult] = None

    def __next__(self):
        event = next(self._events)

        if event.HasField("data"):
            if event.event.data.stdout:
                self._stdout += event.event.data.stdout
                return ProcessOutput(stdout=self._stdout.decode())
            if event.event.data.stderr:
                self._stderr += event.event.data.stderr
                return ProcessOutput(stderr=self._stderr.decode())
        if event.HasField("end"):
            self.result = ProcessResult(
                stdout=self._stdout.decode(),
                stderr=self._stderr.decode(),
                exit_code=event.event.end.exit_code,
                error=event.event.end.error,
            )

        raise StopIteration

    def __iter__(self):
        return self

    def wait(self):
        for _ in self:
            pass

        if self.result is None:
            raise RuntimeError("Process has not ended")

        return self.result


# TODO: Add disconnect for process handle
class Process:
    def __init__(self, base_url: str) -> None:
        self.base_url = base_url

        self._service = process_connect.ProcessServiceClient(
            self.base_url,
            compressor=connect.GzipCompressor,
        )

    def list(self):
        params = process_pb2.ListRequest()

        res = self._service.list(params)
        return [p for p in res.processes]

    def kill(self, pid: int):
        params = process_pb2.SendSignalRequest(
            process=process_pb2.ProcessSelector(pid=pid),
            signal=process_pb2.Signal.SIGNAL_SIGKILL,
        )

        self._service.send_signal(params)

    def sendStdin(self, pid: int, data: bytes):
        params = process_pb2.SendInputRequest(
            process=process_pb2.ProcessSelector(pid=pid),
            input=process_pb2.ProcessInput(stdin=data),
        )

        self._service.send_input(params)

    def start(
        self,
        cmd: str,
        envs: Optional[Dict[str, str]] = {},
        user: Literal["root", "user"] = "user",
        cwd: Optional[str] = None,
    ):
        params = process_pb2.StartRequest(
            owner=process_pb2.Credential(username=user),
            process=process_pb2.ProcessConfig(
                cmd="/bin/bash",
                envs=envs,
                args=["-l", "-c", cmd],
                cwd=cwd,
            ),
        )

        events = self._service.start(params)

        start_event = next(events)

        return ProcessHandle(
            pid=start_event.event.start.pid,
            kill=lambda: self.kill(start_event.event.start.pid),
            events=events,
        )

    def connect(self, pid: int):
        params = process_pb2.ConnectRequest(
            process=process_pb2.ProcessSelector(pid=pid),
        )

        events = self._service.connect(params)

        return ProcessHandle(
            pid=pid,
            kill=lambda: self.kill(pid),
            events=events,
        )
