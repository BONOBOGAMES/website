'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, type ReactNode } from 'react'
import { getAdjacentGames, type Game } from '@/lib/games'
import GamePager from './GamePager'

type GameDetailProps = {
  slug: string
  title: string
  status: string
  tagline: string
  intro: ReactNode
  features: string[]
}

// How far content travels when it leaves / arrives (past the viewport edge).
const OFF = '110%'
// Tells the next page which way it was paged so it can slide in to match.
const DIR_KEY = 'gamePagerDir'

export default function GameDetail({ slug, title, status, tagline, intro, features }: GameDetailProps) {
  const router = useRouter()
  const controls = useAnimationControls()
  const { prev, next } = getAdjacentGames(slug)

  // Entrance: if we arrived via the pager, slide in from the side the new
  // content should come from; otherwise just settle in with a soft fade.
  // Runs exactly once per mount — the direction is consumed from
  // sessionStorage, so React StrictMode's double effect invocation (dev)
  // must not run it twice, or the second pass would miss the (now removed)
  // direction and strand the slide-in half-way.
  const entered = useRef(false)
  useEffect(() => {
    if (entered.current) return
    entered.current = true
    const dir = sessionStorage.getItem(DIR_KEY)
    sessionStorage.removeItem(DIR_KEY)
    if (dir === 'next' || dir === 'prev') {
      // Explicit [from, to] keyframes — animating in a single start avoids the
      // set()/start() race that otherwise strands the content at the offset.
      const from = dir === 'next' ? OFF : `-${OFF}`
      controls.start({ x: [from, '0%'], opacity: [0, 1] }, { duration: 0.45, ease: [0.22, 1, 0.36, 1] })
    } else {
      controls.start({ opacity: [0, 1], y: [8, 0] }, { duration: 0.3, ease: 'easeOut' })
    }
  }, [controls])

  // Shoot the current content off-screen (opposite the arrow, to clear room),
  // remember the direction, then navigate.
  const leave = (dir: 1 | -1, target: Game) => {
    sessionStorage.setItem(DIR_KEY, dir === 1 ? 'next' : 'prev')
    controls
      .start(
        { x: dir === 1 ? `-${OFF}` : OFF, opacity: 0 },
        { duration: 0.32, ease: [0.5, 0, 0.75, 0] },
      )
      .then(() => router.push(target.href))
  }

  return (
    <>
      <motion.div
        animate={controls}
        initial={{ opacity: 0 }}
        className="max-w-2xl mx-auto px-6 pt-32 pb-24"
      >
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
      </motion.div>

      <GamePager prev={prev} next={next} onLeave={leave} />
    </>
  )
}
