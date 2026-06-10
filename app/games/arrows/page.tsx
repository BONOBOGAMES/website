import type { Metadata } from 'next'
import GameDetail from '@/components/GameDetail'

export const metadata: Metadata = {
  title: 'Arrows — BONOBO GAMES',
  description: 'A quiet little puzzle about letting things go, one at a time.',
}

const features = [
  'Clear the board by removing every arrow, one at a time, without ever letting two collide',
  'Each arrow leaves in the direction it points — your only job is choosing the order',
  'Three hearts hold your mistakes; spend them all and the level begins again',
  'No timer ever rushes you — the puzzle waits as long as you need',
  'A hint is there for when the board stops making sense',
  'Levels alternate between knots that make you think and ones that simply let you breathe',
  'Thousands of handcrafted boards, all in a calm black-and-white world made for unwinding',
]

export default function ArrowsPage() {
  return (
    <GameDetail
      slug="arrows"
      title="Arrows"
      status="coming soon"
      tagline="A quiet little puzzle about letting things go, one at a time"
      intro={
        <>
          Arrows is a board of small intentions, each one pointing somewhere, each one waiting for its
          turn to leave. There is no clock here, no one tapping their foot — just you, the grid, and the
          order in which things are meant to go. Pull an arrow and it slides away in the direction it
          always wanted, but only if the path ahead is clear. It&apos;s strategy, but the soft kind. The
          kind you play to slow down, not to win.
        </>
      }
      features={features}
    />
  )
}
