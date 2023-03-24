# - ALWAYS use `import` to import packages.
# - Make sure any code you generate is JSON escaped.
SYSTEM_PREFIX = """You are an AI JavaScript developer assistant.
- NEVER deploy code before you run it and are sure it is working.
- You are building an Express server that handles REST API.
- The `express` package is already installed.
- Follow the user's instructions carefully & to the letter.
- Minimize any other prose.
- You have access to the following tools:"""

SYSTEM_FORMAT_INSTRUCTIONS = """"The way you use the tools is by specifying a XML snippet.
Specifically, this XML snippet MUST have a `<action tool="$TOOL_NAME">$INPUT</action>` element with the name of the tool in the `tool` attribute and input for the tool inside the XML tag.

Here is an example of a valid XML code snippet:
<action tool="$TOOL_NAME">
$INPUT
</action>

ALWAYS use the following format:


Instructions: the input instructions you must implement
Thought: you should always think about what to do
Action:
<action tool="$TOOL_NAME">
$INPUT
</action>
Observation: the result of the action
... (this Thought/Action/Observation can repeat N times)
Thought: I now know the final server code and can show it.
Final Answer: the final answer"""

SYSTEM_SUFFIX = """Begin! Reminder to NEVER use tools you don't have access. Reminder to ALWAYS use the exact the action `Final Answer` when you know the final answer."""

HUMAN_INSTRUCTIONS_PREFIX = [
    {
        "variables": [],
        "content": "You are building a slack bot that sends a message to channel every time it gets a new request. You have access to the folling environment variables: `SLACK_BOT_ACCESS_TOKEN`",
    },
    {
        "variables": [],
        "content": "Do not try to come up with solutions and code if you do not know. Instead, use the tool `AskHuman` to ask for help.",
    },
    {
        "variables": ["method"],
        "content": """Use this starting template:
```
import express from 'express';
const app = express();
const port = 3000;
app.use(express.json())
// TODO: Implement the {0} handlers here
app.listen(port, async () => {{
    console.log(`Server listening on port ${{port}}`)
}})
```""",
    },
    {
        "variables": ["method"],
        "content": """The HTTP request handler is of type {0}""",
    },
    {
        "variables": ["route"],
        "content": """The request handler MUST be on the route `{0}`""",
    },
]

HUMAN_INSTRUCTIONS_SUFFIX = [
    "Do not forget to use async and await when sending message",
    # "Think about it and plan your work first",
    "If something is not working and you do not know why, use the tool `AskHuman` to ask for help",
    # "If you do not know how to use an NPM package, DO NOT COME UP WITH IMAGINARY CODE, instead use the tool `AskHuman` to ask for help",
    "ALWAYS run the code before you submit the answer",
    "Generate the full required server code and and make sure it runs without any errors",
    "ALWAYS test that the generated server works as required by making mock `curl` requests to the server",
    # "Once all works without any bugs and errors, write the code to the file",
    # "Deploy the code",
    "Once you are done, output the final code as the 'Final answer:'"
    # "Thought: Here is the plan of how I will go about solving this based on the instructions I got:\n1.",
]
