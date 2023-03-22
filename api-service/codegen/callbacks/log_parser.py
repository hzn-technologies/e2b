import datetime
import uuid

from typing import Dict, List

from codegen.agent.base import parse_action_string, separate_thought_and_action


class LogStreamParser:
    """
    We receive a stream of tokens and want to parse this stream of tokens to

    // Example
    Thought



    To allow continuous streaming of partially finished logs we parse the logs every time we receive new token or tool output.
    We parse only the tokens that corresponds to the buffered logs and not all the tokens that we have ever received.

    Buffered logs are partially finished logs that are either unfinished (still being streamed)
    or they are tools' logs for which we haven't received outputs yet.
    We can keep track of the buffered logs because there will always be more tool logs than tool outputs - we must parse the actions from tokens before they executed.
    Because of that all buffered logs can be flushed to finished logs when we receive output for the last tool in the buffered logs.

    We are matching the tools' logs and tools' outputs by the order in which they are parsed and ingested - if we need to support asynchronous execution of tools we need to change this matching.
    """

    def __init__(self) -> None:
        # All "finished" logs that the parser saved.
        self._logs: List[Dict[str, str]] = []

        self._token_buffer: str = ""

        # Logs have both `thought` logs and `tool` logs.
        # These logs can be partially parsed or they can have missing outputs.
        # They are flushed to self._logs after outputs for all tools in self._logs.buffer are ingested.
        self._logs_buffer: List[Dict[str, str]] = []

        # This is a list of tools' outputs that corresponds to the tool logs in the self._logs.buffer.
        self._tools_output_buffer: List[Dict[str, str]] = []
        # List of ids corresponding to the buffered logs.
        self._id_buffer: List[str] = []
        # List of timestamps corresponding to the buffered logs.
        self._start_timestamp_buffer: List[str] = []

    def _parse(self):
        """This function should be called only after ingesting new token or tool output to update the buffered logs."""
        thought, action_string = separate_thought_and_action(self._token_buffer)
        tools_logs = [
            {
                "type": "tool",
                "tool_name": action.attrib["tool"],
                "tool_input": action.text or "",
            }
            for action in parse_action_string(action_string)
        ]

        # Update tools' logs with the information from ingested tools' outputs.
        for i in range(len(self._tools_output_buffer)):
            tools_logs[i] = {
                **tools_logs[i],
                **self._tools_output_buffer[i],
            }

        # We overwrite the current buffered logs with their newer version.
        # If you ingested token or tool output this will save the change so you can call self.get_logs and get the new logs.
        self._logs_buffer = [
            {
                "type": "thought",
                "content": thought.removeprefix("Thought:")
                .replace("Action:", "")
                .strip(),
            },
            *tools_logs,
        ]

        # Add a new uuids to id buffer if we have less ids that there are logs in the logs buffer.
        self._id_buffer.extend(
            (
                str(uuid.uuid4())
                for _ in range(len(self._logs_buffer) - len(self._id_buffer))
            )
        )

        # Assign the stable ids to logs
        for log, id in zip(self._logs_buffer, self._id_buffer):
            log["id"] = id

        # Add a new timestamps to timestamps buffer if we have less timestamps that there are logs in the logs buffer.
        self._start_timestamp_buffer.extend(
            (
                str(datetime.datetime.now())
                for _ in range(
                    len(self._logs_buffer) - len(self._start_timestamp_buffer)
                )
            )
        )

        # Assign the corresponding timestamps to logs
        for log, timestamp in zip(self._logs_buffer, self._start_timestamp_buffer):
            log["created_at"] = timestamp

    def ingest_token(self, token: str):
        """Ingest token and update the logs."""
        self._token_buffer += token
        self._parse()
        return self

    def ingest_tool_output(self, output: str):
        """Ingest output from tool and update the logs."""
        self._tools_output_buffer.append(
            {
                "finish_at": str(datetime.datetime.now()),
                "tool_output": output,
            }
        )
        self._parse()

        # If we received output for the last tool in the buffered logs we save the buffered logs to logs and reset all buffers.
        # We know this is is the output for the last tool if the number of tool logs in buffered logs is equal to the number of buffered outputs.
        if len(self._tools_output_buffer) == len(
            [log for log in self._logs_buffer if log["type"] == "tool"]
        ):
            self._logs.extend(self._logs_buffer)
            self._token_buffer = ""
            self._logs_buffer = []
            self._tools_output_buffer = []
            self._id_buffer = []

        return self

    def get_logs(self):
        return [
            *self._logs,
            *self._logs_buffer,
        ]
