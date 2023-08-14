/* eslint-disable @typescript-eslint/no-explicit-any */
type LogID = string | (() => string)

class Logger {
  constructor(public readonly logID: LogID, public readonly isEnabled = false) {}

  error(...args: any[]) {
    console.error(`\x1b[31m[${this.id()} ERROR]\x1b[0m`, ...args)
  }

  log(...args: any[]) {
    if (this.isEnabled) {
      console.log(`\x1b[36m[${this.id()}]\x1b[0m`, ...args)
    }
  }

  private id() {
    if (typeof this.logID === 'function') return this.logID()
    return this.logID
  }
}

export default Logger
