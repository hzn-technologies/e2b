import { Fragment, useState } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import {
  Zap,
  ListEnd,
  X,
  Menu,
} from 'lucide-react'
import { usePostHog } from 'posthog-js/react'

import { projects, deployments } from 'db/prisma'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import AgentListItem from './AgentListItem'

const navigation = [
  {
    name: 'Deployed Agents',
    href: '/',
    icon: Zap,
    current: true,
  },
  {
    name: 'Run Queue',
    href: '/runs',
    icon: ListEnd,
    current: false,
  },
]

const statuses = {
  disabled: 'text-gray-500 bg-gray-100/10',
  enabled: 'text-green-400 bg-green-400/10',
}

export interface Props {
  projects: (projects & { deployments: deployments[] })[]
}

export default function AgentOverview({ projects }: Props) {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const posthog = usePostHog()

  async function signOut() {
    await supabaseClient.auth.signOut()
    posthog?.reset(true)
    router.push('/sign')
  }

  function selectAgent(e: any, projectID: string) {
    e.preventDefault()
    posthog?.capture('selected deployed agent', { projectID: projectID })
    router.push(`/${projectID}`)
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

  console.log('projects with deployments', projectsWithDeployments)

  return (
    <div className="overflow-hidden">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <X className="text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                  {/* Logo */}
                  {/* <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div> */}
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={clsx(
                                  item.current
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                              >
                                <item.icon size={14} aria-hidden="true" />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="-mx-6 mt-auto">
                        <div
                          className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white"
                        >
                          <button
                            className="text-sm font-semibold text-white"
                            onClick={signOut}
                          >
                            Log out
                          </button>
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
          {/* Logo */}
          {/* <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
          </div> */}
          <nav className="flex flex-1 flex-col py-[22px]">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={clsx(
                          item.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                          'group flex gap-x-3 rounded-md px-2 py-1 text-sm leading-6 font-semibold flex items-center'
                        )}
                      >
                        <item.icon size={16} className="shrink-0" aria-hidden="true" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <div
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white"
                >
                  <button
                    className="text-sm font-semibold text-white"
                    onClick={signOut}
                  >
                    Log out
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="xl:pl-72">
        {/* Mobile menu icon */}
        <div className="xl:hidden sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Menu aria-hidden="true" />
          </button>
        </div>

        <main className="overflow-hidden">
          <header className="flex items-center justify-between border-b border-white/5 p-4 sm:p-6 lg:px-8">
            <h1 className="text-2xl font-semibold leading-7 text-white">Deployed Agents</h1>
          </header>

          {/* Deployment list */}
          <ul role="list" className="px-4 sm:px-6 lg:px-8 space-y-4 overflow-auto">
            {projectsWithDeployments.map(p => (
              <li
                key={p.project.id}
              >
                <Link
                  href={p.project.id}
                  onClick={(e) => selectAgent(e, p.project.id)}
                >
                  <AgentListItem
                    agent={p}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div >
  )
}
