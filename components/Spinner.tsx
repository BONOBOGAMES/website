'use client'

import { motion } from 'framer-motion'

// Pointy-top hexagon (the BONOBO mark), centred in a 50×50 box.
const HEX = 'M25 5 L42.3 15 L42.3 35 L25 45 L7.7 35 L7.7 15 Z'

// A brand-shaped loader: a faint hexagon track with a bright lime comet
// segment flowing around it — its length breathing as it travels, the whole
// shape rotating slowly under a soft glow.
export default function Spinner() {
  return (
    <motion.svg
      width="76"
      height="76"
      viewBox="0 0 50 50"
      className="text-lime-500 [filter:drop-shadow(0_0_9px_rgba(132,204,22,0.4))]"
      animate={{ rotate: 360 }}
      transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      aria-hidden
    >
      <path
        d={HEX}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        className="opacity-10"
      />
      <motion.path
        d={HEX}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ pathOffset: [0, 1], pathLength: [0.18, 0.5, 0.18] }}
        transition={{
          pathOffset: { duration: 1.8, repeat: Infinity, ease: 'linear' },
          pathLength: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </motion.svg>
  )
}
