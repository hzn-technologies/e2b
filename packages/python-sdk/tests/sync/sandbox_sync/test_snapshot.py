import pytest
from e2b import Sandbox


@pytest.mark.skip_debug()
def test_snapshot(template):
    sbx = Sandbox(template, timeout=5)
    try:
        assert sbx.is_running()

        sandbox_id = sbx.pause()
        assert not sbx.is_running()

        sbx.resume(sandbox_id)
        assert sbx.is_running()
    finally:
        sbx.kill()
