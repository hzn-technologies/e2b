from agent.basic_agent import BasicAgent
from agent.smol_agent import SmolAgent


def get_agent_factory_from_template(template_id: str):
    print("tempalte", template_id)
    match template_id:
        case "SmolDeveloper":
            return SmolAgent.create
        case _:
            return BasicAgent.create
