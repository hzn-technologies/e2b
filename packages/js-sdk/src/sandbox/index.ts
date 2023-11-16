import normalizePath from 'normalize-path'

import { ENVD_PORT, FILE_ROUTE } from '../constants'
import { id } from '../utils/id'
import { createDeferredPromise, formatSettledErrors, withTimeout } from '../utils/promise'
import { codeSnippetService, ScanOpenedPortsHandler as ScanOpenPortsHandler } from './codeSnippet'
import { FileInfo, FilesystemManager, filesystemService } from './filesystem'
import FilesystemWatcher from './filesystemWatcher'
import { Process, ProcessManager, ProcessMessage, ProcessOpts, ProcessOutput, processService } from './process'
import { CallOpts, SandboxConnection, SandboxConnectionOpts } from './sandboxConnection'
import { Terminal, TerminalManager, TerminalOpts, TerminalOutput, terminalService } from './terminal'
import { resolvePath } from '../utils/filesystem'
import { Actions } from '../templates/openai'
import { CurrentWorkingDirectoryDoesntExistError } from '../error'

export type DownloadFileFormat =
  | 'base64'
  | 'blob'
  | 'buffer'
  | 'arraybuffer'
  | 'text';

export interface SandboxOpts extends SandboxConnectionOpts {
  onScanPorts?: ScanOpenPortsHandler;
  /** Timeout for sandbox to start */
  timeout?: number;
  onStdout?: (out: ProcessMessage) => Promise<void> | void;
  onStderr?: (out: ProcessMessage) => Promise<void> | void;
  onExit?: () => Promise<void> | void;
}

export interface Action<T = { [key: string]: any }> {
  (sandbox: Sandbox, args: T): string | Promise<string>
}

export class Sandbox extends SandboxConnection {
  readonly terminal: TerminalManager
  readonly filesystem: FilesystemManager
  readonly process: ProcessManager

  readonly _actions: Map<string, Action<any>> = new Map()

  private readonly onScanPorts?: ScanOpenPortsHandler

  protected constructor(opts?: SandboxOpts) {
    opts = opts || {}
    super(opts)
    this.onScanPorts = opts.onScanPorts

    // Init Filesystem handler
    this.filesystem = {
      /**
       * List files in a directory.
       * @param path Path to a directory
       * @param opts Call options
       * @param {timeout} [opts.timeout] Timeout for call in milliseconds (default is 60 seconds)
       * @returns Array of files in a directory
       */
      list: async (path, opts?: CallOpts) => {
        return (await this._call(
          filesystemService,
          'list',
          [_resolvePath(path)],
          opts,
        )) as FileInfo[]
      },
      /**
       * Reads the whole content of a file.
       * @param path Path to a file
       * @param opts Call options
       * @param {timeout} [opts.timeout] Timeout for call in milliseconds (default is 60 seconds)
       * @returns Content of a file
       */
      read: async (path, opts?: CallOpts) => {
        return (await this._call(
          filesystemService,
          'read',
          [_resolvePath(path)],
          opts,
        )) as string
      },
      /**
       * Removes a file or a directory.
       * @param path Path to a file or a directory
       * @param opts Call options
       * @param {timeout} [opts.timeout] Timeout for call in milliseconds (default is 60 seconds)
       */
      remove: async (path, opts?: CallOpts) => {
        await this._call(
          filesystemService,
          'remove',
          [_resolvePath(path)],
          opts,
        )
      },
      /**
       * Writes content to a new file on path.
       * @param path Path to a new file. For example '/dirA/dirB/newFile.txt' when creating 'newFile.txt'
       * @param content Content to write to a new file
       * @param opts Call options
       * @param {timeout} [opts.timeout] Timeout for call in milliseconds (default is 60 seconds)
       */
      write: async (path, content, opts?: CallOpts) => {
        await this._call(
          filesystemService,
          'write',
          [_resolvePath(path), content],
          opts,
        )
      },
      /**
       * Write array of bytes to a file.
       * This can be used when you cannot represent the data as an UTF-8 string.
       *
       * @param path path to a file
       * @param content byte array representing the content to write
       */
      writeBytes: async (path: string, content: Uint8Array) => {
        // We need to convert the byte array to base64 string without using browser or node specific APIs.
        // This should be achieved by the node polyfills.
        const base64Content = Buffer.from(content).toString('base64')
        await this._call(filesystemService, 'writeBase64', [
          _resolvePath(path),
          base64Content,
        ])
      },
      /**
       * Reads the whole content of a file as an array of bytes.
       * @param path path to a file
       * @returns byte array representing the content of a file
       */
      readBytes: async (path: string) => {
        const base64Content = (await this._call(
          filesystemService,
          'readBase64',
          [_resolvePath(path)],
        )) as string
        // We need to convert the byte array to base64 string without using browser or node specific APIs.
        // This should be achieved by the node polyfills.
        return Buffer.from(base64Content, 'base64')
      },
      /**
       * Creates a new directory and all directories along the way if needed on the specified pth.
       * @param path Path to a new directory. For example '/dirA/dirB' when creating 'dirB'.
       * @param opts Call options
       * @param {timeout} [opts.timeout] Timeout for call in milliseconds (default is 60 seconds)
       */
      makeDir: async (path, opts?: CallOpts) => {
        await this._call(
          filesystemService,
          'makeDir',
          [_resolvePath(path)],
          opts,
        )
      },
      /**
       * Watches directory for filesystem events.
       * @param path Path to a directory that will be watched
       * @returns New watcher
       */
      watchDir: (path: string) => {
        this.logger.debug?.(`Watching directory "${path}"`)
        const npath = normalizePath(_resolvePath(path))
        return new FilesystemWatcher(this, npath)
      },
    }

    // Init Terminal handler
    this.terminal = {
      start: async ({
        onData,
        size,
        onExit,
        envVars,
        cmd,
        cwd = '',
        terminalID = id(12),
        timeout = undefined,
      }: TerminalOpts) => {
        const start = async ({
          onData,
          size,
          onExit,
          envVars,
          cmd,
          cwd = '',
          rootDir,
          terminalID = id(12),
        }: Omit<TerminalOpts, 'timeout'>) => {
          this.logger.debug?.(`Starting terminal "${terminalID}"`)
          if (!cwd && rootDir) {
            this.logger.warn?.(
              'The rootDir parameter is deprecated, use cwd instead.',
            )
            cwd = rootDir
          }
          if (!cwd && this.cwd) {
            cwd = this.cwd
          }
          envVars = envVars || {}
          envVars = { ...this.envVars, ...envVars }

          const { promise: terminalExited, resolve: triggerExit } =
            createDeferredPromise()

          const output = new TerminalOutput()

          function handleData(data: string) {
            output.addData(data)
            onData?.(data)
          }

          const [onDataSubID, onExitSubID] = await this._handleSubscriptions(
            this._subscribe(terminalService, handleData, 'onData', terminalID),
            this._subscribe(terminalService, triggerExit, 'onExit', terminalID),
          )

          const { promise: unsubscribing, resolve: handleFinishUnsubscribing } =
            createDeferredPromise<TerminalOutput>()

          terminalExited.then(async () => {
            const results = await Promise.allSettled([
              this._unsubscribe(onExitSubID),
              this._unsubscribe(onDataSubID),
            ])
            this.logger.debug?.(`Terminal "${terminalID}" exited`)

            const errMsg = formatSettledErrors(results)
            if (errMsg) {
              this.logger.error?.(errMsg)
            }

            onExit?.()
            handleFinishUnsubscribing(output)
          })

          try {
            await this._call(terminalService, 'start', [
              terminalID,
              size.cols,
              size.rows,
              // Handle optional args for old devbookd compatibility
              ...(cmd !== undefined ? [envVars, cmd, cwd] : []),
            ])
          } catch (err) {
            triggerExit()
            await unsubscribing
            throw err
          }

          return new Terminal(
            terminalID,
            this,
            triggerExit,
            unsubscribing,
            output,
          )
        }
        return await withTimeout(
          start,
          timeout,
        )({
          onData,
          size,
          onExit,
          envVars,
          cmd,
          cwd,
          terminalID,
        })
      },
    }

    // Init Process handler
    this.process = {
      start: async (optsOrCmd: string | ProcessOpts) => {
        const opts = typeof optsOrCmd === 'string' ? { cmd: optsOrCmd } : optsOrCmd
        const start = async ({
          cmd,
          onStdout,
          onStderr,
          onExit,
          envVars = {},
          cwd = '',
          rootDir,
          processID = id(12),
        }: Omit<ProcessOpts, 'timeout'>) => {
          if (!cwd && rootDir) {
            this.logger.warn?.(
              'The rootDir parameter is deprecated, use cwd instead.',
            )
            cwd = rootDir
          }
          if (!cwd && this.cwd) {
            cwd = this.cwd
          }
          if (!cmd) throw new Error('cmd is required')

          envVars = envVars || {}
          envVars = { ...this.envVars, ...envVars }

          this.logger.debug?.(`Starting process "${processID}", cmd: "${cmd}"`)

          const { promise: processExited, resolve: triggerExit } =
            createDeferredPromise()

          const output = new ProcessOutput()
          const handleExit = (exitCode: number) => {
            output.setExitCode(exitCode)
            triggerExit()
          }

          const handleStdout = (data: { line: string; timestamp: number }) => {
            const message = new ProcessMessage(
              data.line,
              data.timestamp,
              false,
            )
            output.addStdout(message)

            if (onStdout) {
              onStdout(message)
            } else if ((this.opts as SandboxOpts).onStdout) {
              // @ts-expect-error TS2339
              this.opts.onStdout(message)
            }
          }

          const handleStderr = (data: { line: string; timestamp: number }) => {
            const message = new ProcessMessage(data.line, data.timestamp, true)
            output.addStderr(message)

            if (onStderr) {
              onStderr(message)
            } else if ((this.opts as SandboxOpts).onStderr) {
              // @ts-expect-error TS2339
              this.opts.onStderr(message)
            }
          }

          const [onExitSubID, onStdoutSubID, onStderrSubID] =
            await this._handleSubscriptions(
              this._subscribe(processService, handleExit, 'onExit', processID),
              this._subscribe(
                processService,
                handleStdout,
                'onStdout',
                processID,
              ),
              this._subscribe(
                processService,
                handleStderr,
                'onStderr',
                processID,
              ),
            )

          const { promise: unsubscribing, resolve: handleFinishUnsubscribing } =
            createDeferredPromise<ProcessOutput>()

          processExited.then(async () => {
            const results = await Promise.allSettled([
              this._unsubscribe(onExitSubID),
              onStdoutSubID ? this._unsubscribe(onStdoutSubID) : undefined,
              onStderrSubID ? this._unsubscribe(onStderrSubID) : undefined,
            ])
            this.logger.debug?.(`Process "${processID}" exited`)

            const errMsg = formatSettledErrors(results)
            if (errMsg) {
              this.logger.error?.(errMsg)
            }

            if (onExit) {
              onExit(output.exitCode || 0)
            } else if ((this.opts as SandboxOpts).onExit) {
              // @ts-expect-error TS2339
              this.opts.onExit()
            }

            handleFinishUnsubscribing(output)
          })

          try {
            await this._call(processService, 'start', [
              processID,
              cmd,
              envVars,
              cwd,
            ])
          } catch (err) {
            triggerExit()
            await unsubscribing
            if (
              /error starting process '\w+': fork\/exec \/bin\/bash: no such file or directory/.test((err as Error)?.message)
            ) {
              throw new CurrentWorkingDirectoryDoesntExistError(
                `Failed to start the process. You are trying set 'cwd' to a directory that does not exist.\n${(err as Error)?.message}`
              )
            }
            throw err
          }

          return new Process(
            processID,
            this,
            triggerExit,
            unsubscribing,
            output,
          )
        }
        const timeout = opts.timeout
        return await withTimeout(start, timeout)(opts)
      },
      startAndWait: async (optsOrCmd: string | ProcessOpts) => {
        const opts = typeof optsOrCmd === 'string' ? { cmd: optsOrCmd } : optsOrCmd
        const process = await this.process.start(opts)
        return await process.wait()
      }
    }

    const _resolvePath = (path: string): string =>
      resolvePath(path, this.cwd, this.logger)
  }

  /**
   * URL that can be used to download or upload file to the sandbox via a multipart/form-data POST request.
   * This is useful if you're uploading files directly from the browser.
   * The file will be uploaded to the user's home directory with the same name.
   * If a file with the same name already exists, it will be overwritten.
   */
  get fileURL() {
    const protocol = this.opts.__debug_devEnv === 'local' ? 'http' : 'https'
    const hostname = this.getHostname(this.opts.__debug_port || ENVD_PORT)
    return `${protocol}://${hostname}${FILE_ROUTE}`
  }

  /**
   * Returns a map of added actions.
   *
   * @returns Map of added actions
   */
  get actions() {
    return new Map(this._actions)
  }

  /**
   * OpenAI integration that can be used to get output for the actions added in the sandbox.
   *
   * @returns OpenAI integration
   */
  get openai() {
    return {
      actions: new Actions(this),
    } as const
  }

  /**
   * Creates a new Sandbox from the default `base` sandbox template.
   * @returns New Sandbox
   *
   * @example
   * ```ts
   * const sandbox = await Sandbox.create()
   * ```
   */
  static async create(): Promise<Sandbox>;
  /**
   * Creates a new Sandbox from the template with the specified ID.
   * @param id Sandbox ID
   * @returns New Sandbox
   *
   * @example
   * ```ts
   * const sandbox = await Sandbox.create("sandboxID")
   * ```
   */
  static async create(id: string): Promise<Sandbox>;
  /**
   * Creates a new Sandbox from the specified options.
   * @param opts Sandbox options
   * @returns New Sandbox
   *
   * @example
   * ```ts
   * const sandbox = await Sandbox.create({
   *   id: "sandboxID",
   *   onStdout: console.log,
   * })
   * ```
   */
  static async create(opts: SandboxOpts): Promise<Sandbox>;
  static async create(optsOrID?: string | SandboxOpts) {
    const opts = typeof optsOrID === 'string' ? { id: optsOrID } : optsOrID
    return new Sandbox(opts)
      ._open({ timeout: opts?.timeout })
      .then(async (sandbox) => {
        if (opts?.cwd) {
          console.log(`Custom cwd for Sandbox set: "${opts.cwd}"`)
          await sandbox.filesystem.makeDir(opts.cwd)
        }
        return sandbox
      })
  }

  /**
   * Reconnects to an existing Sandbox.
   * @param sandboxID Sandbox ID
   * @returns Existing Sandbox
   *
   * @example
   * ```ts
   * const sandbox = await Sandbox.reconnect(sandboxID)
   * ```
   */
  static async reconnect(sandboxID: string): Promise<Sandbox>;
  /**
   * Reconnects to an existing Sandbox.
   * @param opts Sandbox options
   * @returns Existing Sandbox
   *
   * @example
   * ```ts
   * const sandbox = await Sandbox.reconnect({
   *   sandboxID,
   * })
   * ```
   */
  static async reconnect(opts: Omit<SandboxOpts, 'id'> & { sandboxID: string }): Promise<Sandbox>;
  static async reconnect(sandboxIDorOpts: string | Omit<SandboxOpts, 'id'> & { sandboxID: string }) {
    let sandboxID: string
    let opts: SandboxOpts
    if (typeof sandboxIDorOpts === 'string') {
      sandboxID = sandboxIDorOpts
      opts = {}
    } else {
      sandboxID = sandboxIDorOpts.sandboxID
      opts = sandboxIDorOpts
    }

    const instanceIDAndClientID = sandboxID.split("-")
    const instanceID = instanceIDAndClientID[0]
    const clientID = instanceIDAndClientID[1]
    opts.__sandbox = { instanceID, clientID, envID: 'unknown' }
    return new Sandbox(opts)
      ._open({ timeout: opts?.timeout })
      .then(async (sandbox) => {
        if (opts?.cwd) {
          console.log(`Custom cwd for Sandbox set: "${opts.cwd}"`)
          await sandbox.filesystem.makeDir(opts.cwd)
        }
        return sandbox
      })
  }

  /**
   * Add a new action. The name of the action is automatically extracted from the function name.
   *
   * You can use this action with specific integrations like OpenAI to interact with the sandbox and get output for the action.
   *
   * @param action Action handler
   * @returns Sandbox
   *
   * @example
   * ```ts
   * const sandbox = await Sandbox.create()
   * sandbox.addAction('readFile', (sandbox, args) => sandbox.filesystem.read(args.path))
   * ```
   */
  addAction<T = { [name: string]: any }>(action: Action<T>): this;
  /**
   * Add a new action with a specified name.
   *
   * You can use this action with specific integrations like OpenAI to interact with the sandbox and get output for the action.
   *
   * @param name Action name
   * @param action Action handler
   * @returns Sandbox
   *
   * @example
   * ```ts
   * async function readFile(sandbox: Sandbox, args: any) {
   *   return sandbox.filesystem.read(args.path)
   * }
   *
   * const sandbox = await Sandbox.create()
   * sandbox.addAction(readFile)
   * ```
   */
  addAction<T = { [name: string]: any }>(name: string, action: Action<T>): this;
  addAction<T = { [name: string]: any }>(actionOrName: string | Action<T>, action?: Action<T>): this {
    if (typeof actionOrName === 'string') {
      if (!action) throw new Error('Action is required')
      this._actions.set(actionOrName, action)
      return this
    } else if (typeof actionOrName === 'function') {
      action = actionOrName

      if (!action.name) {
        throw new Error('Action name is required')
      }

      this._actions.set(action.name, action)
    } else {
      throw new Error('Action or action name and action is required')
    }

    return this
  }

  /**
   * Remove an action.
   * @param name Action name
   * @returns Sandbox
   *
   * @example
   * ```ts
   * const sandbox = await Sandbox.create()
   * sandbox.addAction('hello', (sandbox, args) => 'Hello World')
   * sandbox.removeAction('hello')
   * ```
   */
  removeAction(name: string) {
    this._actions.delete(name)

    return this
  }

  /**
   * Uploads a file to the sandbox.
   * The file will be uploaded to the user's home directory with the same name.
   * If a file with the same name already exists, it will be overwritten.
   *
   * **You can use the {@link Sandbox.fileURL} property and upload file directly via POST multipart/form-data**
   *
   */
  async uploadFile(file: Buffer | Blob, filename: string) {
    const body = new FormData()

    const blob =
      file instanceof Blob
        ? file
        : new Blob([file], { type: 'application/octet-stream' })

    body.append('file', blob, filename)

    // TODO: Ensure the this is bound in this function
    const response = await fetch(this.fileURL, {
      method: 'POST',
      body,
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(
        `Failed to upload file ${response.status} - ${response.statusText}: ${text}`,
      )
    }

    return `/home/user/${filename}`
  }

  /**
   * Downloads a file from the sandbox.
   * @param remotePath Path to a file on the sandbox
   * @param format Format of the downloaded file
   * @returns File content
   *
   * @example
   * ```ts
   * const sandbox = await Sandbox.create()
   * const content = await sandbox.downloadFile('/home/user/file.txt')
   * ```
   */
  async downloadFile(remotePath: string, format?: DownloadFileFormat) {
    remotePath = encodeURIComponent(remotePath)

    // TODO: Ensure the this is bound in this function
    const response = await fetch(`${this.fileURL}?path=${remotePath}`)
    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Failed to download file '${remotePath}': ${text}`)
    }

    switch (format) {
      case 'base64':
        return Buffer.from(await response.arrayBuffer()).toString('base64')
      case 'blob':
        return await response.blob()
      case 'buffer':
        return Buffer.from(await response.arrayBuffer())
      case 'arraybuffer':
        return await response.arrayBuffer()
      case 'text':
        return await response.text()
      default:
        return await response.arrayBuffer()
    }
  }

  protected override async _open(opts: CallOpts) {
    await super._open(opts)

    const portsHandler = this.onScanPorts
      ? (ports: { State: string; Ip: string; Port: number }[]) =>
        this.onScanPorts?.(
          ports.map((p) => ({ ip: p.Ip, port: p.Port, state: p.State })),
        )
      : undefined

    await this._handleSubscriptions(
      portsHandler
        ? this._subscribe(codeSnippetService, portsHandler, 'scanOpenedPorts')
        : undefined,
    )

    return this
  }
}
