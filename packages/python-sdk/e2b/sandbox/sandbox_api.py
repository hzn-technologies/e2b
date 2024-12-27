from abc import ABC
from dataclasses import dataclass
from datetime import datetime
from typing import Dict, Optional

from httpx import Limits


@dataclass
class SandboxInfo:
    """Information about a sandbox."""

    sandbox_id: str
    """Sandbox ID."""
    template_id: str
    """Template ID."""
    name: Optional[str]
    """Template name."""
    metadata: Dict[str, str]
    """Saved sandbox metadata."""
    started_at: datetime
    """Sandbox start time."""


@dataclass
class SandboxMetrics:
    """Sandbox resource usage metrics"""

    timestamp: datetime
    """Timestamp of the metrics."""
    cpu_pct: float
    """CPU usage in percentage."""
    cpu_count: int
    """Number of CPU cores."""
    mem_mib_used: int
    """Memory usage in bytes."""
    mem_mib_total: int
    """Total memory available"""


class SandboxApiBase(ABC):
    _limits = Limits(
        max_keepalive_connections=10,
        max_connections=20,
        keepalive_expiry=20,
    )

    @staticmethod
    def _get_sandbox_id(sandbox_id: str, client_id: str) -> str:
        return f"{sandbox_id}-{client_id}"
