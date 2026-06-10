'use client'

import { motion, useAnimationControls } from 'framer-motion'
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
  const controls = useAnimationControls()
  const isLeft = side === 'left'

  const handle = () => {
    // The arrow shoots off its own edge as the page change begins.
    controls.start(
      { x: isLeft ? '-150%' : '150%', opacity: 0 },
      { duration: 0.32, ease: [0.5, 0, 0.75, 0] },
    )
    onActivate()
  }

  return (
    <div
      className={`fixed top-1/2 z-40 -translate-y-1/2 ${isLeft ? 'left-0' : 'right-0'}`}
    >
      <motion.button
        type="button"
        onClick={handle}
        animate={controls}
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
