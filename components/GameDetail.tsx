'use client'

import { motion, type Variants } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { getAdjacentGames, getGame, gameHref, type Game } from '@/lib/games'
import GamePager from './GamePager'

// How far content travels when it leaves / arrives (past the viewport edge).
const OFF = '110%'
// Tells the next page which way it was paged so it can slide in to match.
const DIR_KEY = 'gamePagerDir'

// Declarative variants animate reliably (an imperative start can silently miss
// its target and leave the content invisible). initial -> 'visible' plays the
// entrance on mount; a pager click flips to an exit variant.
const variants: Variants = {
  enterNext: { opacity: 0, x: OFF },
  enterPrev: { opacity: 0, x: `-${OFF}` },
  enterNeutral: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    x: '0%',
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exitNext: { opacity: 0, x: `-${OFF}`, transition: { duration: 0.32, ease: [0.5, 0, 0.75, 0] } },
  exitPrev: { opacity: 0, x: OFF, transition: { duration: 0.32, ease: [0.5, 0, 0.75, 0] } },
}

export default function GameDetail({ slug }: { slug: string }) {
  const router = useRouter()
  const game = getGame(slug)
  const { prev, next } = getAdjacentGames(slug)

  // Direction we arrived from (consumed once, client-only) — drives the
  // initial variant so the content slides in from the matching side.
  const [enterDir] = useState<'next' | 'prev' | null>(() => {
    if (typeof window === 'undefined') return null
    const d = sessionStorage.getItem(DIR_KEY)
    sessionStorage.removeItem(DIR_KEY)
    return d === 'next' || d === 'prev' ? d : null
  })
  const [leaving, setLeaving] = useState<'next' | 'prev' | null>(null)
  const pendingHref = useRef<string | null>(null)

  const initial =
    enterDir === 'next' ? 'enterNext' : enterDir === 'prev' ? 'enterPrev' : 'enterNeutral'
  const animate = leaving === 'next' ? 'exitNext' : leaving === 'prev' ? 'exitPrev' : 'visible'

  // Shoot the current content off-screen (opposite the arrow, to clear room),
  // remember the direction, then navigate once the exit animation finishes.
  const leave = (dir: 1 | -1, target: Game) => {
    pendingHref.current = gameHref(target.slug)
    sessionStorage.setItem(DIR_KEY, dir === 1 ? 'next' : 'prev')
    setLeaving(dir === 1 ? 'next' : 'prev')
  }

  return (
    <>
      <motion.div
        variants={variants}
        initial={initial}
        animate={animate}
        onAnimationComplete={(def) => {
          if ((def === 'exitNext' || def === 'exitPrev') && pendingHref.current) {
            router.push(pendingHref.current)
          }
        }}
        className="max-w-2xl mx-auto px-6 pt-32 pb-24"
      >
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{game.title}</h1>
          <span className="text-xs bg-lime-600/10 dark:bg-lime-400/10 text-lime-600 dark:text-lime-400 border border-lime-600/20 dark:border-lime-400/20 px-2 py-0.5 rounded-full">
            {game.status}
          </span>
        </div>
        <p className="text-gray-500 mb-14">{game.tagline}</p>

        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-14">{game.intro}</p>

        <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-5">What to expect</h2>
        <ul className="space-y-3 mb-16">
          {game.features.map((f) => (
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
      </motion.div>

      <GamePager prev={prev} next={next} onLeave={leave} />
    </>
  )
}
