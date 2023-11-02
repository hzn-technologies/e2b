import * as commander from 'commander'

import { buildCommand } from './build'
import { listCommand } from './list'
import { shellCommand } from './shell'
import { initCommand } from './init'

export const templateCommand = new commander.Command('template')
  .description('Manage E2B sandbox templates')
  .addCommand(buildCommand)
  .addCommand(listCommand)
  .addCommand(shellCommand)
  .addCommand(initCommand)
