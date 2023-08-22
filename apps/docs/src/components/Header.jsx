import { forwardRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MobileNavigation, useIsInsideMobileNavigation, useMobileNavigationStore, } from '@/components/MobileNavigation'
import { MobileSearch, Search } from '@/components/Search'
import { Auth } from '@/components/Auth';
import { IconsExtra } from '@/components/IconsExtra';
import { HeaderSeparator } from '@/components/HeaderUtils';

function TopLevelNavItem({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

export const Header = forwardRef(function Header({ className }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore()
  let isInsideMobileNavigation = useIsInsideMobileNavigation()

  let { scrollY } = useScroll()
  let bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
  let bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

  return (
    <motion.div
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80',
        !isInsideMobileNavigation &&
        'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-zinc-900'
          : 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]'
      )}
      style={{
        '--bg-opacity-light': bgOpacityLight,
        '--bg-opacity-dark': bgOpacityDark,
      }}
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
          'bg-zinc-900/7.5 dark:bg-white/7.5'
        )}
      />
      <Search />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        <Link href="/" aria-label="Home">
          {/* <Logo className="h-6" /> */}
          <h1 className="font-tile font-bold text-xl">E2B</h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-6">
            <TopLevelNavItem href="https://discord.gg/U7KEcGErtQ"><IconsExtra.Discord className="h-5 w-5 fill-current" /></TopLevelNavItem>
            <TopLevelNavItem href="https://twitter.com/e2b_dev"><IconsExtra.Twitter className="h-5 w-5 fill-current" /></TopLevelNavItem>
            <TopLevelNavItem href="https://github.com/e2b-dev/e2b"><IconsExtra.GitHub className="h-5 w-5 fill-current" /></TopLevelNavItem>
          </ul>
        </nav>
        <HeaderSeparator />
        <MobileSearch />
        <div className="hidden min-[540px]:contents">
          <Auth />
        </div>
      </div>
    </motion.div>
  )
})
