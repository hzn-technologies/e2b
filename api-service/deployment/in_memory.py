import uuid

from typing import Callable, Coroutine, Dict

from pydantic import PrivateAttr

from deployment.manager import AgentDeploymentManager, AgentDeployment
from agent.base import AgentBase, AgentConfig


class InMemoryDeploymentManager(AgentDeploymentManager):
    agent_factory: Callable[[AgentConfig], Coroutine[None, None, AgentBase]]
    _deployments: Dict[str, AgentDeployment] = PrivateAttr(default={})

    async def create_deployment(self, config: AgentConfig):
        agent = await self.agent_factory(config)
        deployment = AgentDeployment(
            id=str(uuid.uuid4()),
            agent=agent,
        )
        self._deployments[deployment.id] = deployment
        return deployment

    async def remove_deployment(self, id: str):
        deployment = await self.get_deployment(id)
        if deployment is None:
            return
        await deployment.agent.stop()
        del self._deployments[deployment.id]

    async def get_deployment(self, id: str):
        return self._deployments[id]

    async def list_deployments(self):
        return list(self._deployments.values())
