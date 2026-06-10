'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

// Pointy-top hexagon (the BONOBO mark), centred in a 50×50 box.
const HEX = 'M25 5 L42.3 15 L42.3 35 L25 45 L7.7 35 L7.7 15 Z'

const ROT_MS = 9000 // full rotation period
const OFF_MS = 1800 // comet lap period

// A brand-shaped loader: a faint hexagon track with a bright lime comet
// segment flowing around it — its length breathing as it travels, the whole
// shape rotating slowly under a soft glow.
export default function Spinner() {
  // Seed the animation from the wall clock so the loader appears at a
  // different phase every time — as if it had been spinning the whole while
  // it was hidden, rather than always restarting from the same spot.
  const [t0] = useState(() => Date.now())
  const rotPhase = ((t0 % ROT_MS) / ROT_MS) * 360
  const offPhase = (t0 % OFF_MS) / OFF_MS

  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 50 50"
      className="text-lime-500 [filter:drop-shadow(0_0_16px_rgba(132,204,22,0.4))]"
      initial={{ rotate: rotPhase }}
      animate={{ rotate: rotPhase + 360 }}
      transition={{ duration: ROT_MS / 1000, repeat: Infinity, ease: 'linear' }}
      aria-hidden
    >
      <path
        d={HEX}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        className="opacity-10"
      />
      <motion.path
        d={HEX}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ pathOffset: [offPhase, offPhase + 1], pathLength: [0.18, 0.5, 0.18] }}
        transition={{
          pathOffset: { duration: OFF_MS / 1000, repeat: Infinity, ease: 'linear' },
          pathLength: { duration: OFF_MS / 1000, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </motion.svg>
  )
}
