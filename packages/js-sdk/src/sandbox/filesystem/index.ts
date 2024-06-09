import { PlainMessage } from '@bufbuild/protobuf'
import {
  createPromiseClient,
  Transport,
  PromiseClient,
  ConnectError,
  Code,
} from '@connectrpc/connect'

import { ConnectionConfig, defaultUsername, Username, ConnectionOpts } from '../../connectionConfig'
import { EnvdApiClient } from '../../envd/api'
import { Filesystem as FilesystemService } from '../../envd/filesystem/filesystem_connect'
import {
  EntryInfo as FsEntryInfo,
} from '../../envd/filesystem/filesystem_pb'
import { WatchHandle, FilesystemEvent } from './watchHandle'

export type EntryInfo = PlainMessage<FsEntryInfo>

export interface FilesystemRequestOpts extends Partial<Pick<ConnectionOpts, 'requestTimeoutMs'>> {
  user?: Username
}

export class Filesystem {
  private readonly rpc: PromiseClient<typeof FilesystemService>
  private readonly envdApi: EnvdApiClient

  constructor(
    transport: Transport,
    envdApiUrl: string,
    private readonly connectionConfig: ConnectionConfig,
  ) {
    this.envdApi = new EnvdApiClient({ apiUrl: envdApiUrl })
    this.rpc = createPromiseClient(FilesystemService, transport)
  }

  async read(path: string, opts?: FilesystemRequestOpts & { format?: 'text' }): Promise<string>
  async read(path: string, opts?: FilesystemRequestOpts & { format: 'bytes' }): Promise<Uint8Array>
  async read(path: string, opts?: FilesystemRequestOpts & { format: 'blob' }): Promise<Blob>
  async read(path: string, opts?: FilesystemRequestOpts & { format: 'stream' }): Promise<ReadableStream<Uint8Array>>
  async read(path: string, opts?: FilesystemRequestOpts & { format?: 'text' | 'stream' | 'bytes' | 'blob' }): Promise<unknown> {
    const format = opts?.format ?? 'text'

    const response = await this.envdApi.api.GET('/files/{path}', {
      params: {
        path: {
          path,
        },
        query: {
          username: opts?.user || defaultUsername,
        },
      },
      parseAs: format === 'bytes' ? 'arrayBuffer' : format,
      signal: this.connectionConfig.getSignal(opts?.requestTimeoutMs),
    })

    if (format === 'bytes') {
      return new Uint8Array(response.data as ArrayBuffer)
    }

    return response.data
  }

  async write(path: string, data: string | ArrayBuffer | Blob | ReadableStream, opts?: FilesystemRequestOpts): Promise<void> {
    const blob = await new Response(data).blob()

    await this.envdApi.api.POST('/files/{path}', {
      params: {
        path: {
          path,
        },
        query: {
          username: opts?.user || defaultUsername,
        },
      },
      bodySerializer() {
        const fd = new FormData()

        fd.append('file', blob)

        return fd
      },
      body: {},
      signal: this.connectionConfig.getSignal(opts?.requestTimeoutMs),
    })
  }

  async list(path: string, opts?: FilesystemRequestOpts): Promise<EntryInfo[]> {
    const res = await this.rpc.list({
      path,
      user: {
        selector: {
          case: 'username',
          value: opts?.user || defaultUsername,
        },
      },
    }, {
      signal: this.connectionConfig.getSignal(opts?.requestTimeoutMs),
    })

    return res.entries
  }

  async makeDir(path: string, opts?: FilesystemRequestOpts): Promise<void> {
    await this.rpc.makeDir({
      path,
      user: {
        selector: {
          case: 'username',
          value: opts?.user || defaultUsername,
        },
      },
    }, {
      signal: this.connectionConfig.getSignal(opts?.requestTimeoutMs),
    })
  }

  async remove(path: string, opts?: FilesystemRequestOpts): Promise<void> {
    await this.rpc.remove({
      path,
      user: {
        selector: {
          case: 'username',
          value: opts?.user || defaultUsername,
        },
      },
    }, {
      signal: this.connectionConfig.getSignal(opts?.requestTimeoutMs),
    })
  }

  async exists(path: string, opts?: FilesystemRequestOpts): Promise<boolean> {
    try {
      await this.rpc.stat({
        path,
        user: {
          selector: {
            case: 'username',
            value: opts?.user || defaultUsername,
          },
        },
      }, {
        signal: this.connectionConfig.getSignal(opts?.requestTimeoutMs),
      })

      return true
    } catch (err) {
      const connectErr = ConnectError.from(err)

      if (connectErr.code === Code.NotFound) {
        return false
      }

      throw err
    }
  }

  async watch(path: string, onEvent: (event: FilesystemEvent) => void | Promise<void>, opts?: FilesystemRequestOpts & { timeout?: number, iterator?: boolean }): Promise<WatchHandle> {
    const requestTimeoutMs = opts?.requestTimeoutMs ?? this.connectionConfig.requestTimeoutMs

    const controller = new AbortController()

    const reqTimeout = requestTimeoutMs
      ? setTimeout(() => {
        controller.abort()
      }, requestTimeoutMs)
      : undefined

    const events = this.rpc.watch({
      path,
      user: {
        selector: {
          case: 'username',
          value: opts?.user || defaultUsername,
        },
      },
    }, {
      signal: controller.signal,
      timeoutMs: opts?.timeout ?? 60_000,
    })

    clearTimeout(reqTimeout)

    return new WatchHandle(
      () => controller.abort(),
      events,
      onEvent,
      opts?.iterator,
    )
  }
}
