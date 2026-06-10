'use client'

import { motion, type Variants } from 'framer-motion'
import { useState } from 'react'
import type { Game } from '@/lib/games'

type GamePagerProps = {
  prev: Game
  next: Game
  // dir: 1 = next (forward), -1 = prev (back)
  onLeave: (dir: 1 | -1, target: Game) => void
}

export default function GamePager({ prev, next, onLeave }: GamePagerProps) {
  return (
    <>
      <PagerArrow side="left" game={prev} onActivate={() => onLeave(-1, prev)} />
      <PagerArrow side="right" game={next} onActivate={() => onLeave(1, next)} />
    </>
  )
}

function PagerArrow({
  side,
  game,
  onActivate,
}: {
  side: 'left' | 'right'
  game: Game
  onActivate: () => void
}) {
  const isLeft = side === 'left'
  const [leaving, setLeaving] = useState(false)

  // Declarative entrance/exit. initial = off-screen, animate = 'rest' plays the
  // pull-in on mount; clicking flips to the exit variant. Variants animate x
  // reliably (unlike an imperative start whose "from" can be missed).
  const variants: Variants = {
    off: { x: isLeft ? '-135%' : '135%', opacity: 0 },
    rest: {
      x: '0%',
      opacity: 1,
      // easeOutBack overshoots the edge then settles — a gravity-yanked feel.
      transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: isLeft ? 0.1 : 0.16 },
    },
    exit: {
      x: isLeft ? '-150%' : '150%',
      opacity: 0,
      transition: { duration: 0.32, ease: [0.5, 0, 0.75, 0] },
    },
  }

  const handle = () => {
    setLeaving(true)
    onActivate()
  }

  return (
    <div
      className={`fixed top-1/2 z-40 -translate-y-1/2 ${isLeft ? 'left-0' : 'right-0'}`}
    >
      <motion.button
        type="button"
        onClick={handle}
        variants={variants}
        initial="off"
        animate={leaving ? 'exit' : 'rest'}
        aria-label={`${isLeft ? 'Previous' : 'Next'} game: ${game.title}`}
        className={`group flex items-center gap-2 py-5 text-gray-400 transition-colors hover:text-lime-600 dark:hover:text-lime-400 ${
          isLeft ? 'flex-row pl-2 pr-4' : 'flex-row-reverse pl-4 pr-2'
        }`}
      >
        <Chevron isLeft={isLeft} />
        {/* Title hint — hidden on phones so the arrow stays out of the way. */}
        <span className={`hidden md:block ${isLeft ? 'text-left' : 'text-right'}`}>
          <span className="block text-[10px] uppercase tracking-widest text-gray-400">
            {isLeft ? 'Prev' : 'Next'}
          </span>
          <span className="block text-sm font-medium text-gray-600 transition-colors group-hover:text-lime-600 dark:text-gray-300 dark:group-hover:text-lime-400">
            {game.title}
          </span>
        </span>
      </motion.button>
    </div>
  )
}

function Chevron({ isLeft }: { isLeft: boolean }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform ${
        isLeft ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
      }`}
      aria-hidden
    >
      {isLeft ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  )
}
