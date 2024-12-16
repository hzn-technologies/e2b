import { Sandbox } from '../src'
import { test as base } from 'vitest'

export const template = 'base_01'

interface SandboxFixture {
  sandbox: Sandbox
  template: string
}

export const sandboxTest = base.extend<SandboxFixture>({
  template,
  sandbox: [
    async ({ }, use) => {
      const sandbox = await Sandbox.create(template)
      try {
        await use(sandbox)
      } finally {
        try {
          await sandbox.kill()
        } catch (err) {
          if (!isDebug) {
            console.warn(
              'Failed to kill sandbox — this is expected if the test runs with local envd.'
            )
          }
        }
      }
    },
    { auto: true },
  ],
})

export const isDebug = process.env.E2B_DEBUG !== undefined

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
