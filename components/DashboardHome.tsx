import {
  useState,
} from 'react'


import { useRouter } from 'next/router'
import { usePostHog } from 'posthog-js/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { deployments, projects } from 'db/prisma'
import AgentList from 'components/AgentList'
import AgentRunsList from 'components/AgentRunsList'
import AgentLogsList from 'components/AgentLogsList'


export interface Props {
  projects: (projects & { deployments: deployments[] })[]
}

function DashboardHome({
  projects,
}: Props) {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const posthog = usePostHog()

  const view = router.query.view as string | undefined
  const selectedAgentInstanceID = router.query.projectID as string | undefined
  const selectedLogFileID = router.query.fileID as string | undefined

  async function signOut() {
    await supabaseClient.auth.signOut()
    posthog?.reset(true)
    router.push('/sign')
  }

  function selectAgent(e: any, projectID: string) {
    e.preventDefault()
    posthog?.capture('selected deployed agent', { projectID: projectID })
    router.push(`/?view=runs&projectID=${projectID}`, undefined, { shallow: true })
  }

  const projectsWithDeployments = projects
    .filter(p => {
      if (p.deployments.length !== 1) return false

      const deployment = p.deployments[0]
      const auth = deployment.auth as any
      if (!auth) return false
      return deployment.enabled
    })
    .map(p => ({
      project: p,
      deployment: p.deployments[0],
    }))

  return (
    <>
      {view === 'deployed' ? (
        <AgentList
          agents={projectsWithDeployments}
          onSelectAgent={selectAgent}
        />
      ) : view === 'runs' ? (
        <AgentRunsList
          allDeployedAgents={projectsWithDeployments}
          initialSelectedAgentID={selectedAgentInstanceID}
        />
      ) : view === 'logs' ? (
        <AgentLogsList
          logFiles={[
            { name: '0', id: 'id-0' },
            { name: '1', id: 'id-1' },
          ]}
          initialSelectedLogFileID={selectedLogFileID}
        />
      ) : (
        <span>404</span>
      )}
    </>
  )
}

export default DashboardHome