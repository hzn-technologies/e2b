import { ConnectError, Code } from '@connectrpc/connect'

import { FilesystemError } from '.'
import { TimeoutError } from '../../connectionConfig'
import {
  EventType,
  WatchDirResponse,
} from '../../envd/filesystem/filesystem_pb'

export enum FilesystemEventType {
  CHMOD = 'chmod',
  CREATE = 'create',
  REMOVE = 'remove',
  RENAME = 'rename',
  WRITE = 'write',
}

function mapEventType(type: EventType) {
  switch (type) {
    case EventType.CHMOD:
      return FilesystemEventType.CHMOD
    case EventType.CREATE:
      return FilesystemEventType.CREATE
    case EventType.REMOVE:
      return FilesystemEventType.REMOVE
    case EventType.RENAME:
      return FilesystemEventType.RENAME
    case EventType.WRITE:
      return FilesystemEventType.WRITE
  }
}

export interface FilesystemEvent {
  name: string
  type: FilesystemEventType
}

export class WatchHandle {
  private readonly _wait: Promise<void>

  constructor(
    private readonly handleStop: () => void,
    private readonly events: AsyncIterable<WatchDirResponse>,
    private readonly onEvent?: (event: FilesystemEvent) => void | Promise<void>,
    private readonly onExit?: (err?: Error) => void | Promise<void>,
  ) {
    this._wait = this.handleEvents()
  }

  async stop() {
    this.handleStop()
  }

  private async* iterateEvents() {
    try {
      for await (const event of this.events) {
        switch (event.event.case) {
          case 'filesystem':
            yield event.event
            break
        }
      }
    } catch (err) {
      if (err instanceof ConnectError) {
        switch (err.code) {
          case Code.Canceled:
            throw new TimeoutError(
              `Error watching filesystem: ${err.message}. This is likely due to exceeding 'requestTimeoutMs' — that can be passed as options when watching filesystem. It can `,
            )
          case Code.DeadlineExceeded:
            throw new TimeoutError(
              `Error watching filesystem: ${err.message}. This is likely due to exceeding 'timeoutMs' — the total time the watching can be active. It can be modified by passing 'timeoutMs' to the watch function. Use '0' to disable the timeout.`,
            )
          default:
            throw new FilesystemError(err.message)
        }
      }
      throw err
    } finally {
      this.stop()
    }
  }

  private async handleEvents() {
    try {
      for await (const event of this.iterateEvents()) {
        const eventType = mapEventType(event.value.type)
        if (eventType === undefined) {
          continue
        }

        this.onEvent?.({
          name: event.value.name,
          type: eventType,
        })
      }
      this.onExit?.()
    } catch (err) {
      this.onExit?.(err as Error)
    }
  }
}
