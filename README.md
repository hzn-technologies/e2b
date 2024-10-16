<p align="center">
  <img width="100" src="/readme-assets/logo-circle.png" alt="e2b logo">
</p>

<h4 align="center">
  <a href="https://pypi.org/project/e2b/">
    <img alt="Last 1 month downloads for the Python SDK" loading="lazy" width="200" height="20" decoding="async" data-nimg="1"
    style="color:transparent;width:auto;height:100%" src="https://img.shields.io/pypi/dm/e2b?label=PyPI%20Downloads">
  </a>
  <a href="https://www.npmjs.com/package/e2b">
    <img alt="Last 1 month downloads for the JavaScript SDK" loading="lazy" width="200" height="20" decoding="async" data-nimg="1"
    style="color:transparent;width:auto;height:100%" src="https://img.shields.io/npm/dm/e2b?label=NPM%20Downloads">
  </a>
</h4>

<!---
<img width="100%" src="/readme-assets/preview.png" alt="Cover image">
--->
## What is E2B?
[E2B](https://www.e2b.dev/) is an open-source infrastructure that allows you run to AI-generated code in secure isolated sandboxes in the cloud. To start and control sandboxes, use our [JavaScript SDK](https://www.npmjs.com/package/@e2b/code-interpreter) or [Python SDK](https://pypi.org/project/e2b_code_interpreter).

## Run your first Sandbox

### 1. Install SDK

JavaScript / TypeScript
```
npm i @e2b/code-interpreter
```

Python
```
pip install e2b-code-interpreter
```

### 2. Execute code with code interpreter inside Sandbox

JavaScript / TypeScript
```ts
import { Sandbox } from '@e2b/code-interpreter'

const sandbox = await Sandbox.create()
await sbx.runCode()('x = 1')

const execution = await sbx.runCode()('x+=1; x')
console.log(execution.text)  // outputs 2
```

Python
```py
from e2b_code_interpreter import Sandbox

with Sandbox() as sandbox:
    sandbox.run_code()("x = 1")
    execution = sandbox.run_code()("x+=1; x")
    print(execution.text)  # outputs 2
```

### 3. Check docs
Visit [E2B documentation](https://e2b.dev/docs).

### 4. E2B cookbook
Visit our [Cookbook](https://github.com/e2b-dev/e2b-cookbook/tree/main) to get inspired by examples with different LLMs and AI frameworks.
