'use client'

import Image from 'next/image'
import { Children, createContext, isValidElement, useContext, useEffect, useRef, useState } from 'react'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { create } from 'zustand'
import {
  File,
  Terminal,
} from 'lucide-react'

import { CopyButton } from '@/components/CopyButton'
import { LangShort, languageNames } from '@/utils/consts'
import logoNode from '@/images/logos/node.svg'
import logoPython from '@/images/logos/python.svg'

export function getPanelTitle({
  title,
  language,
}: {
  title?: string;
  language?: string;
}) {
  if (title) {
    return title
  }
  if (language && language in languageNames) {
    return languageNames[language]
  }
  return 'Code'
}

function CodePanel({
  children,
  code,
}: {
  children: React.ReactNode;
  code?: string;
  lang?: LangShort;
  isRunnable?: boolean;
}) {
  const child = Children.only(children)
  if (isValidElement(child)) code = (child.props as any).code ?? code // Get code from child if available

  if (!code) {
    throw new Error(
      '`CodePanel` requires a `code` prop, or a child with a `code` prop.',
    )
  }

  return (
    <div className="group relative dark:bg-white/2.5">
      <div
        className="
        absolute
        right-3
        top-[-40px]
      "
      >
      </div>

      <pre className="overflow-x-auto p-4 text-xs text-white">{children}</pre>
      <CopyButton code={code} />
    </div>
  )
}

export function CodeGroupHeader({
  title,
  children,
  selectedIndex,
  isFileName,
  isTerminalCommand,
}: {
  title: string;
  children: React.ReactNode;
  selectedIndex: number;
  isFileName?: boolean;
  isTerminalCommand?: boolean;
}) {
  const hasTabs = Children.count(children) > 1
  if (!title && !hasTabs && !isTerminalCommand) return null

  return (
    <div
      className="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-center justify-between gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">
      <div className="flex flex-col items-start">
        {title && (
          <div>
            {isFileName ? (
              <div className="flex items-center justify-start space-x-2">
                <File
                  className="text-brand-300"
                  size={18}
                  strokeWidth={1}
                />
                <h3 className="text-sm text-gray-500 font-mono">{title}</h3>
              </div>
            ) : isTerminalCommand ? (
              <div className="flex items-center justify-start space-x-2">
                <Terminal
                  className="text-brand-300"
                  size={18}
                  strokeWidth={1}
                />
                {title && (
                  <h3 className="text-sm text-gray-500">{title}</h3>
                )}
              </div>
            ) : (
              <h3 className="pt-3 text-sm text-gray-500 text-brand-400">{title}</h3>
            )}
          </div>
        )}

        {isTerminalCommand && !title && (
          <div className="flex items-center justify-start space-x-2">
            <Terminal
              className="text-brand-300"
              size={18}
              strokeWidth={1}
            />
          </div>
        )}



        {hasTabs && (
          <Tab.List className="-mb-px flex gap-4 text-xs font-medium">
            {Children.map(children, (child, childIndex) => (
              <Tab
                /* Set ID due to bug in Next https://github.com/vercel/next.js/issues/53110 */
                /* Should ne fixed after updating Next to > 13.4.12 */
                id={`code-tab-${childIndex}`}
                className={clsx(
                  'border-b py-3 transition ui-not-focus-visible:outline-none',
                  childIndex === selectedIndex
                    ? 'border-brand-500 text-brand-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-300',
                )}
              >
                <div
                  className="
                  flex
                  items-center
                  px-1
                  gap-1
                "
                >
                  {getPanelTitle(
                    isValidElement(child) ? child.props : {},
                  ).includes('JavaScript') ? (
                    <Image
                      src={logoNode}
                      alt=""
                      className="h-7 w-7"
                      unoptimized
                    />
                  ) : (
                    <Image
                      src={logoPython}
                      alt=""
                      className="h-7 w-7"
                      unoptimized
                    />
                  )}
                  {getPanelTitle(isValidElement(child) ? child.props : {})}
                </div>
              </Tab>
            ))}
          </Tab.List>
        )}
      </div>
    </div>
  )
}

function CodeGroupPanels({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CodePanel>) {
  const hasTabs = Children.count(children) > 1

  /* <INTERNAL> */
  // @ts-ignore
  if (typeof window !== 'undefined' && window.DEBUG_COMPARE_LANGS) {
    return (
      <div className="grid grid-cols-2">
        {Children.map(children, (child) => (
          <CodePanel {...props}>{child}</CodePanel>
        ))}
      </div>
    )
  }
  /* </INTERNAL> */

  if (hasTabs) {
    return (
      <Tab.Panels>
        {/* Set ID due to bug in Next https://github.com/vercel/next.js/issues/53110 */}
        {/* Should ne fixed after updating Next to > 13.4.12 */}
        {Children.map(children, (child, childIndex) => {
          return (
            <Tab.Panel id={`code-tab-${childIndex}`}>
              <CodePanel {...props}>{child}</CodePanel>
            </Tab.Panel>
          )
        })}
      </Tab.Panels>
    )
  }

  return <CodePanel {...props}>{children}</CodePanel>
}

function usePreventLayoutShift() {
  const positionRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    return () => {
      if (typeof rafRef.current !== 'undefined') {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return {
    positionRef,
    preventLayoutShift(callback: () => void) {
      if (!positionRef.current) {
        return
      }

      const initialTop = positionRef.current.getBoundingClientRect().top

      callback()

      rafRef.current = window.requestAnimationFrame(() => {
        const newTop =
          positionRef.current?.getBoundingClientRect().top ?? initialTop
        window.scrollBy(0, newTop - initialTop)
      })
    },
  }
}

const usePreferredLanguageStore = create<{
  preferredLanguages: Array<string>;
  addPreferredLanguage: (language: string) => void;
}>()((set) => ({
  preferredLanguages: [],
  addPreferredLanguage: (language) =>
    set((state) => ({
      preferredLanguages: [
        ...state.preferredLanguages.filter(
          (preferredLanguage) => preferredLanguage !== language,
        ),
        language,
      ],
    })),
}))

export function useTabGroupProps(availableLanguages: Array<string>) {
  const { preferredLanguages, addPreferredLanguage } =
    usePreferredLanguageStore()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const activeLanguage = [...availableLanguages].sort(
    (a, z) => preferredLanguages.indexOf(z) - preferredLanguages.indexOf(a),
  )[0]

  const languageIndex = availableLanguages.indexOf(activeLanguage)
  const newSelectedIndex = languageIndex === -1 ? selectedIndex : languageIndex
  if (newSelectedIndex !== selectedIndex) setSelectedIndex(newSelectedIndex)

  const { positionRef, preventLayoutShift } = usePreventLayoutShift()

  return {
    as: 'div' as const,
    ref: positionRef,
    selectedIndex,
    onChange: (newSelectedIndex: number) => {
      preventLayoutShift(() =>
        addPreferredLanguage(availableLanguages[newSelectedIndex]),
      )
    },
  }
}

const CodeGroupContext = createContext(null)

export function CodeGroup({
  children,
  title,
  isTerminalCommand,
  isFileName,
  path,
  ...props
}: React.ComponentPropsWithoutRef<typeof CodeGroupPanels> & {
  title?: string;
  isTerminalCommand?: boolean;
  isFileName?: boolean;
  path?: string; // For analytics
}) {
  const hasTabs = Children.count(children) > 1
  const containerClassName =
    'not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10'
  const languages =
    Children.map(children, (child) =>
      getPanelTitle(isValidElement(child) ? child.props : {}),
    ) ?? []
  const tabGroupProps = useTabGroupProps(languages)

  const header = (
    <CodeGroupHeader
      title={title}
      selectedIndex={tabGroupProps.selectedIndex}
      isFileName={isFileName}
      isTerminalCommand={isTerminalCommand}
    >
      {children}
    </CodeGroupHeader>
  )
  const panels = <CodeGroupPanels {...props}>{children}</CodeGroupPanels>

  return (
    <CodeGroupContext.Provider
      value={{
        path,
      }}
    >
      {hasTabs ? (
        <Tab.Group {...tabGroupProps} className={containerClassName}>
          {header}
          {panels}
        </Tab.Group>
      ) : (
        <div className={containerClassName}>
          {header}
          {panels}
        </div>
      )}
    </CodeGroupContext.Provider>
  )
}

export function Code({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'code'>) {
  /* <DYNAMIC-API-REPLACEMENT> */
  // let apiKey = useApiKey()
  // if (children.replace && apiKey) children = children.replace(`{{API_KEY}}`, `${apiKey}`)
  /* </DYNAMIC-API-REPLACEMENT> */

  const isGrouped = !!useContext(CodeGroupContext)

  if (isGrouped) {
    if (typeof children !== 'string') {
      throw new Error(
        '`Code` children must be a string when nested inside a `CodeGroup`.',
      )
    }
    return <code {...props} dangerouslySetInnerHTML={{ __html: children }} />
  }

  return <code {...props}>{children}</code>
}

export function Pre({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CodeGroup>) {
  const isGrouped = useContext(CodeGroupContext)

  if (isGrouped) {
    return children
  }

  return <CodeGroup {...props}>{children}</CodeGroup>
}

/**
 * Special Component just for MDX files, processed by Remark
 */
export function CodeGroupAutoload({ children, isRunnable = true }) {
  if (!children) {
    console.warn(
      'CodeGroupAutoload: No children provided - something is wrong with your MDX file',
    )
    return null
  }
  return <CodeGroup isRunnable={isRunnable}>{children}</CodeGroup>
}
