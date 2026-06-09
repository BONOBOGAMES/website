import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Games — BONOBO GAMES',
}

const games = [
  {
    title: 'Pieceful',
    href: '/games/pieceful',
    status: 'in progress',
    description:
      'A calm puzzle game about placing pieces, not racing the clock. No falling blocks. No countdown. Just you and the board.',
  },
  {
    title: 'Arrows',
    href: '/games/arrows',
    status: 'coming soon',
    description:
      'A quiet little puzzle about letting things go, one at a time. Pull each arrow and it slides away — but only if the path ahead is clear. Strategy, but the soft kind.',
  },
]

export default function GamesPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
      <h1 className="text-3xl font-bold mb-2">Games</h1>
      <p className="text-gray-500 mb-16">Small games. Made with care. No rush.</p>

      <div className="space-y-4">
        {games.map(({ title, href, status, description }) => (
          <Link
            key={href}
            href={href}
            className="block border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:border-gray-300 dark:hover:border-white/25 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-xl font-semibold group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                {title}
              </h2>
              <span className="text-xs bg-lime-600/10 dark:bg-lime-400/10 text-lime-600 dark:text-lime-400 border border-lime-600/20 dark:border-lime-400/20 px-2 py-0.5 rounded-full">
                {status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
