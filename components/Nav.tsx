'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Games', href: '/games' },
  { label: 'Open Source', href: '/open-source' },
  { label: 'Team', href: '/team' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-gray-900 dark:text-white text-sm font-semibold tracking-widest hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
        >
          BONOBO GAMES
        </Link>
        <div className="flex items-center gap-7 text-sm">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors ${
                pathname.startsWith(href)
                  ? 'text-lime-600 dark:text-lime-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
