import type { ReactNode } from 'react'

type GameDetailProps = {
  title: string
  status: string
  tagline: string
  intro: ReactNode
  features: string[]
}

export default function GameDetail({ title, status, tagline, intro, features }: GameDetailProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <span className="text-xs bg-lime-600/10 dark:bg-lime-400/10 text-lime-600 dark:text-lime-400 border border-lime-600/20 dark:border-lime-400/20 px-2 py-0.5 rounded-full">
          {status}
        </span>
      </div>
      <p className="text-gray-500 mb-14">{tagline}</p>

      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-14">{intro}</p>

      <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-5">What to expect</h2>
      <ul className="space-y-3 mb-16">
        {features.map((f) => (
          <li key={f} className="flex gap-3 text-gray-700 dark:text-gray-300">
            <span className="text-lime-600 dark:text-lime-400 select-none">—</span>
            {f}
          </li>
        ))}
      </ul>

      <p className="text-gray-500 text-sm border-t border-gray-200 dark:border-white/10 pt-8">
        Follow along on{' '}
        <a href="https://x.com/bonobogames_hun" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          X
        </a>{' '}
        or{' '}
        <a href="https://www.reddit.com/user/GSM_BONOBO/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          Reddit
        </a>
        , or write to{' '}
        <a href="mailto:gsm@bonobo.games" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
          gsm@bonobo.games
        </a>
        .
      </p>
    </div>
  )
}
