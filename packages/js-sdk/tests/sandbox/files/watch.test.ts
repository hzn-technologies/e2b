import { expect } from 'vitest'

import { sandboxTest } from '../../setup.js'
import { FilesystemEventType, NotFoundError, SandboxError } from '../../../src'

sandboxTest('watch directory changes', async ({ sandbox }) => {
  const dirname = 'test_watch_dir'
  const filename = 'test_watch.txt'
  const content = 'This file will be watched.'
  const newContent = 'This file has been modified.'

  await sandbox.files.makeDir(dirname)
  await sandbox.files.write(`${dirname}/${filename}`, content)

  let trigger: () => void

  const eventPromise = new Promise<void>((resolve) => {
    trigger = resolve
  })

  const handle = await sandbox.files.watch(dirname, async (event) => {
    if (event.type === FilesystemEventType.WRITE && event.name === filename) {
      trigger()
    }
  })

  await sandbox.files.write(`${dirname}/${filename}`, newContent)

  await eventPromise

  await handle.stop()
})

sandboxTest('watch non-existing directory', async ({ sandbox }) => {
  const dirname = 'non_existing_watch_dir'

  await expect(sandbox.files.watch(dirname, () => {})).rejects.toThrowError(
    NotFoundError
  )
})

sandboxTest('watch file', async ({ sandbox }) => {
  const filename = 'test_watch.txt'
  const content = 'This file will be watched.'
  await sandbox.files.write(filename, content)

  await expect(sandbox.files.watch(filename, () => {})).rejects.toThrowError(
    SandboxError
  )
})
