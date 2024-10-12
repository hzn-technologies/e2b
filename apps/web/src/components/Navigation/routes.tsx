




// Three parts
//
// 1. Documentation
//    - Concepts - "filesystem", "what is sandbox", ...
//    - How to's (guides?) - simple examples of things like "how to run AI-generated code" or "how to install custom packages" or "how to add language runtime" or "how to upload files" or "how to change current working directory" or "how to add another user" or "how to set up environment variables"
//      - This could be additionally split into parts like "Customization", "Running AI-generated code"
//    - Integrations
// 2. Cookbook?
// 3. API Reference
//    - API spec
//    - Python SDK
//    - JS SDK
//
//
//
//
// Note:
// - We need some kind of "first steps" that's super simple
// - Having something like
// - Maybe have following separate pages:
//   - Documentation
//   - Reference
//   - Integrations
//   - Cookbook
//

export const routes = [
  {
    title: '',
    links: [
      {
        title: 'Home',
        href: '/docs',
      },
    ],
  },
  {
    title: 'Quickstart',
    links: [
      {
        title: 'Set up E2B Sandbox',
        href: '/docs/installation',
      },
    ]
  },
  {
    title: 'Guides', // How to's
    links: [
      {
        title: 'Executed AI-generated code',
        href: '/docs/a',
      },
      {
        title: 'Install custom packages',
        href: '/docs/b',
      },
      {
        title: 'Upload & download files',
        href: '/docs/c',
      },
      {
        title: 'Customize CPU and RAM',
        href: '/docs/d',
      }
    ]
  },
  {
    title: 'AI Code Execution',
    links: [
      {
        title: 'Data analysis',
        href: '/docs/code-execution/overview',
      },
      {
        title: 'Data visualization',
        href: '/docs/code-execution/overview',
      },
      {
        title: 'Interactive charts',
        href: '/docs/code-execution/overview',
      },
    ]
  },
  {
    title: 'Filesystem',
    links: [
      {
        title: 'Overview',
        href: '/docs/filesystem/overview',
      },
    ]
  },
  {
    title: 'Commands',
    links: [
      {
        title: 'Overview',
        href: '/docs/process/overview',
      },
    ]
  },
  {
    // Maybe move integrations to a separate page?
    title: 'Integrations',
    links: [
      {
        title: 'OpenAI',
        href: '/docs/integrations/openai',
      },
      {
        title: 'Vercel AI SDK',
        href: '/docs/integrations/ai-sdk',
      },
      {
        title: 'Langchain',
        href: '/docs/integrations/ai-sdk',
      },
    ]
  },
]



// export const routes = [
//   {
//     title: 'Getting Started',
//     links: [
//       {
//         title: 'Installation',
//         href: '/docs',
//       },
//       {
//         title: 'helloWorld.[ts|js]',
//         href: '/docs/hello-world/js',
//         icon: <Image src={logoNode} width={20} height={20} alt="Python logo" />,
//         isFontMono: true,
//       },
//       {
//         title: 'hello_world.py',
//         href: '/docs/hello-world/py',
//         icon: <Image src={logoPython} width={20} height={20} alt="Python logo" />,
//         isFontMono: true,
//       },
//       {
//         title: 'Supported LLMs and AI frameworks',
//         href: '/docs/supported',
//       },
//       // {
//       //   title: 'What\'s Code Interpreting?',
//       //   href: '/code-interpreting',
//       // },
//       {
//         icon: <KeyRound strokeWidth={1} size={20} />,
//         title: 'API Key',
//         href: '/docs/getting-started/api-key',
//       },
//       {
//         icon: <DollarSign strokeWidth={1} size={20} />,
//         title: 'Pricing',
//         href: '/docs/pricing',
//       },
//       {
//         icon: <BarChart strokeWidth={1} size={20} />,
//         title: 'Track usage',
//         href: '/dashboard?tab=usage',
//       },
//       {
//         icon: <ShieldQuestion strokeWidth={1} size={20} />,
//         title: 'Getting help',
//         href: '/docs/getting-help',
//       },
//     ],
//   },
//   {
//     title: 'Guides',
//     links: [
//       {
//         icon: <BookOpen strokeWidth={1} size={20} />,
//         title: 'Guides and examples in cookbook',
//         href: 'https://github.com/e2b-dev/e2b-cookbook',
//       },
//       {
//         icon: <BookOpen strokeWidth={1} size={20} />,
//         title: '[SDK Beta] Migration',
//         href: '/docs/guide/beta-migration',
//       },
//       {
//         icon: <BookOpen strokeWidth={1} size={20} />,
//         title: '[SDK Beta] Runtimes in Code Interpreter',
//         href: '/docs/guide/beta-code-interpreter-language-runtimes',
//       },
//       // {
//       //   icon: <Hammer strokeWidth={1} size={20} />,
//       //   title: 'Guide: Code Interpreter with OpenAI models',
//       //   href: '/guide/simple-gpt4-code-interpreter',
//       // },
//       // {
//       //   icon: <Hammer strokeWidth={1} size={20} />,
//       //   title: 'Guide: Secure Sandbox for Devin-like agent',
//       //   href: '/guide/simple-gpt4-code-interpreter',
//       // },
//       // {
//       //   icon: <Hammer strokeWidth={1} size={20} />,
//       //   title: 'Guide: Generative UI with Next.js',
//       //   href: '/guide/simple-gpt4-code-interpreter',
//       // },
//       // {
//       //   icon: <Hammer strokeWidth={1} size={20} />,
//       //   title: 'Guide: Upload and analyze CSV files with AI',
//       //   href: '/guide/simple-gpt4-code-interpreter',
//       // },
//       // {
//       //   icon: <Hammer strokeWidth={1} size={20} />,
//       //   title: 'Guide: Customize sandbox compute (TODO: Move this away from guides?)',
//       //   href: '/guide/simple-gpt4-code-interpreter',
//       // },
//     ],
//   },
//   {
//     title: 'E2B Code Interpreter',
//     links: [
//       {
//         title: 'Installation',
//         href: '/docs/code-interpreter/installation',
//       },
//       {
//         icon: <Terminal strokeWidth={1} size={20} />,
//         title: 'AI Code Execution',
//         href: '/docs/code-interpreter/execution',
//       },
//       // {
//       //   icon: <Book strokeWidth={1} size={20} />,
//       //   title: 'Streaming',
//       //   href: '/code-interpreter/examples',
//       // },
//       // {
//       //   icon: <Wrench strokeWidth={1} size={20} />,
//       //   title: 'Supported languages',
//       //   href: '/code-interpreter/template',
//       // },
//       // {
//       //   icon: <Wrench strokeWidth={1} size={20} />,
//       //   title: 'Preinstalled packages (customization)',
//       //   href: '/code-interpreter/template',
//       // },
//       {
//         icon: <Wrench strokeWidth={1} size={20} />,
//         title: 'Customization',
//         href: '/docs/code-interpreter/template',
//       },
//       {
//         icon: <Cog strokeWidth={1} size={20} />,
//         title: 'Kernels',
//         href: '/docs/code-interpreter/kernels',
//       },
//     ],
//   },
//   {
//     title: 'E2B Sandbox',
//     links: [
//       {
//         title: 'Overview',
//         href: '/docs/sandbox/overview',
//       },
//       {
//         icon: <Cpu strokeWidth={1} size={20} />,
//         title: 'Compute',
//         href: '/docs/sandbox/compute',
//       },
//       {
//         icon: <PencilRuler strokeWidth={1} size={20} />,
//         title: 'Customization',
//         href: '/docs/sandbox/custom',
//       },
//       {
//         icon: <Variable strokeWidth={1} size={20} />,
//         title: 'Environment Variables',
//         href: '/docs/sandbox/api/envs',
//       },
//       {
//         icon: <FolderTree strokeWidth={1} size={20} />,
//         title: 'Filesystem',
//         href: '/docs/sandbox/api/filesystem',
//       },
//       {
//         icon: <ChevronRightSquare strokeWidth={1} size={20} />,
//         title: 'Process',
//         href: '/docs/sandbox/api/process',
//       },
//       {
//         icon: <Folder strokeWidth={1} size={20} />,
//         title: 'Working Directory',
//         href: '/docs/sandbox/api/cwd',
//       },
//       {
//         icon: <Link strokeWidth={1} size={20} />,
//         title: 'Sandbox URL',
//         href: '/docs/sandbox/api/url',
//       },
//       {
//         icon: <FileUp strokeWidth={1} size={20} />,
//         title: 'Upload Files',
//         href: '/docs/sandbox/api/upload',
//       },
//       {
//         icon: <FileDown strokeWidth={1} size={20} />,
//         title: 'Download Files',
//         href: '/docs/sandbox/api/download',
//       },
//       {
//         icon: <Timer strokeWidth={1} size={20} />,
//         title: 'Timeouts',
//         href: '/docs/sandbox/api/timeouts',
//       },
//       {
//         icon: <RefreshCw strokeWidth={1} size={20} />,
//         title: 'Connect to running sandbox',
//         href: '/docs/sandbox/api/reconnect',
//       },
//       {
//         icon: <Braces strokeWidth={1} size={20} />,
//         title: 'Sandbox metadata',
//         href: '/docs/sandbox/api/metadata',
//       },
//     ],
//   },
//   {
//     title: 'CLI',
//     links: [
//       {
//         icon: <Settings strokeWidth={1} size={20} />,
//         title: 'Installation',
//         href: '/docs/cli/installation',
//       },
//       {
//         icon: <TerminalSquare strokeWidth={1} size={20} />,
//         title: 'Commands',
//         href: '/docs/cli/commands',
//       },
//     ],
//   },
//   {
//     title: 'Custom Sandboxes',
//     links: [
//       {
//         title: 'Overview',
//         href: '/docs/sandbox/templates/overview',
//       },
//       {
//         icon: <File strokeWidth={1} size={20} />,
//         title: 'Template File',
//         href: '/docs/sandbox/templates/template-file',
//       },
//       {
//         icon: <PlaySquare strokeWidth={1} size={20} />,
//         title: 'Start Command',
//         href: '/docs/sandbox/templates/start-cmd',
//       },
//       {
//         icon: <Hammer strokeWidth={1} size={20} />,
//         title: 'Guide: Creating Custom Sandbox',
//         href: '/docs/guide/custom-sandbox',
//       },
//       {
//         icon: <HardDrive strokeWidth={1} size={20} />,
//         title: 'Connecting buckets to persist data',
//         href: '/docs/guide/connect-bucket',
//       },
//     ],
//   },
// ]
