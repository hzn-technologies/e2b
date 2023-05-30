import { GitHubClient } from './client'

export function parseRepoName(fullName: string) {
  const [owner, repo] = fullName.split('/')
  return { owner, repo }
}

export async function createRepo({ client, name, org, isPrivate }: {
  client: GitHubClient,
  name: string,
  /**
   * If specifified the repo will be created in the org
   */
  org?: string,
  /**
   * If true the repo will be private
   */
  isPrivate?: boolean,
}) {
  if (org) {
    const { data } = await client.repos.createInOrg({
      org,
      name,
      private: isPrivate,
      auto_init: true,
    })
    return { repositoryID: data.id }
  }

  const { data } = await client.repos.createForAuthenticatedUser({
    name,
    private: isPrivate,
    auto_init: true,
  })

  return { repositoryID: data.id }
}
