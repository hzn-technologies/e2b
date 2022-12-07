import * as boxen from 'boxen'
import * as chalk from 'chalk'

export function getAPIKey() {
  const apiKey = process.env.DEVBOOK_KEY
  if (!apiKey) {
    const errorBox = boxen.default(
      `Cannot find env var ${chalk.default.bold(
        'DEVBOOK_KEY',
      )}\n\nVisit https://dash.usedevbook.com/settings to get your API key then run this CLI with the env var set.`,
      {
        width: 70,
        float: 'center',
        padding: 0.5,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'redBright',
      },
    )
    console.error(errorBox)
  } else {
    return apiKey
  }
}
