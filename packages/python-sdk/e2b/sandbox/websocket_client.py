from __future__ import annotations

import asyncio
import logging
import random

from queue import Queue
from threading import Event
from typing import Any, Callable, List, Optional, AsyncIterator

from websockets.legacy.client import WebSocketClientProtocol, Connect
from websockets.exceptions import ConnectionClosed
from websockets.typing import Data

from e2b.sandbox.exception import SandboxException

logger = logging.getLogger(__name__)


class WebSocket:
    def __init__(
        self,
        url: str,
        started: Event,
        stopped: Event,
        queue_in: Queue[dict],
        queue_out: Queue[Data],
    ):
        self._ws: Optional[WebSocketClientProtocol] = None
        self.url = url
        self.started = started
        self.stopped = stopped
        self._process_cleanup: List[Callable[[], Any]] = []
        self._queue_in = queue_in
        self._queue_out = queue_out

    def run(self):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        loop.run_until_complete(self.async_run())

    async def async_run(self):
        await self._connect()
        await self.close()

    async def _send_message(self):
        logger.debug("WebSocket starting to send messages")
        while True:
            if self._queue_in.empty():
                await asyncio.sleep(0)
                continue
            message = self._queue_in.get()
            logger.debug(f"WebSocket message to send: {message}")
            if self._ws:
                await self._ws.send(message)
                logger.debug(f"WebSocket message sent: {message}")
                self._queue_in.task_done()
            else:
                logger.error("No WebSocket connection")

    async def _receive_message(self):
        try:
            if not self._ws:
                logger.error("No WebSocket connection")
                return
            async for message in self._ws:
                logger.debug(f"WebSocket received message: {message}".strip())
                self._queue_out.put(message)
        except Exception as e:
            logger.error(f"WebSocket received error while receiving messages: {e}")

    async def _connect(self):
        logger.debug(f"WebSocket connecting to {self.url}")

        ws_logger = logger.getChild("websockets.client")
        ws_logger.setLevel(logging.ERROR)

        websocket_connector = E2BConnect(
            self.url,
            max_size=None,
            max_queue=None,
            logger=ws_logger,
        )

        websocket_connector.BACKOFF_MIN = 1
        websocket_connector.BACKOFF_FACTOR = 1
        websocket_connector.BACKOFF_INITIAL = 0.2  # type: ignore

        async for websocket in websocket_connector:
            try:
                self._ws = websocket
                self.started.set()
                logger.info(f"WebSocket connected to {self.url}")

                send_task = asyncio.create_task(
                    self._send_message(), name="send_message"
                )
                self._process_cleanup.append(send_task.cancel)

                receive_task = asyncio.create_task(
                    self._receive_message(), name="receive_message"
                )
                self._process_cleanup.append(receive_task.cancel)

                while not self.stopped.is_set():
                    await asyncio.sleep(0)

                logger.info("WebSocket stopped")
                break
            except ConnectionClosed:
                logger.warning("WebSocket disconnected, it will try to reconnect")
                if self.stopped.is_set():
                    break

    async def close(self):
        for cancel in self._process_cleanup:
            cancel()

        self._process_cleanup.clear()

        if self._ws:
            await self._ws.close()


class E2BConnect(Connect):
    async def __aiter__(self) -> AsyncIterator[WebSocketClientProtocol]:
        tries = 0
        max_tries = 10
        backoff_delay = 0.2
        while True:
            try:
                async with self as protocol:
                    yield protocol
            except Exception:
                tries += 1
                if tries >= max_tries:
                    raise SandboxException("Failed to connect to the server")
                # Add a random initial delay between 0 and 5 seconds.
                # See 7.2.3. Recovering from Abnormal Closure in RFC 6544.
                if backoff_delay == 0.2:
                    initial_delay = random.random()
                    self.logger.info(
                        "! connect failed; reconnecting in %.1f seconds",
                        initial_delay,
                        exc_info=True,
                    )
                    await asyncio.sleep(initial_delay)
                else:
                    self.logger.info(
                        "! connect failed again; retrying in %d seconds",
                        int(backoff_delay),
                        exc_info=True,
                    )
                    await asyncio.sleep(int(backoff_delay))
                # Increase delay with truncated exponential backoff.
                backoff_delay = backoff_delay * 1.1
                backoff_delay = min(backoff_delay, 10)
                continue
            else:
                # Connection succeeded - reset backoff delay
                backoff_delay = 0.2
