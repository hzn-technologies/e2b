import * as yup from 'yup'
import * as toml from '@iarna/toml'
import * as fsPromise from 'fs/promises'
import * as fs from 'fs'
import * as path from 'path'

import { asFormattedSandboxTemplate, asLocalRelative } from 'src/utils/format'

export const configName = 'e2b.toml'

const configCommentHeader = `# This is a config for E2B sandbox template

`

export const configSchema = yup.object({
  name: yup.string(),
  id: yup.string().required(),
  dockerfile: yup.string().required(),
  start_cmd: yup.string(),
})

export type E2BConfig = yup.InferType<typeof configSchema>;

export async function loadConfig(configPath: string) {
  const tomlRaw = await fsPromise.readFile(configPath, 'utf-8')
  const config = toml.parse(tomlRaw)
  return (await configSchema.validate(config)) as E2BConfig
}

export async function saveConfig(
  configPath: string,
  config: E2BConfig,
  overwrite?: boolean,
) {
  try {
    if (!overwrite) {
      const configExists = fs.existsSync(configPath)
      if (configExists) {
        throw new Error(
          `Config already exists on path ${asLocalRelative(configPath)}`,
        )
      }
    }

    const validatedConfig: any = await configSchema.validate(config, {
      stripUnknown: true,
    })

    const tomlRaw = toml.stringify(validatedConfig)
    await fsPromise.writeFile(configPath, configCommentHeader + tomlRaw)
  } catch (err: any) {
    throw new Error(
      `E2B sandbox template config ${asFormattedSandboxTemplate(
        {
          envID: config.id,
        },
        configPath,
      )} cannot be saved: ${err.message}`,
    )
  }
}

export async function deleteConfig(configPath: string) {
  await fsPromise.unlink(configPath)
}

export function getConfigPath(root: string) {
  return path.join(root, configName)
}
