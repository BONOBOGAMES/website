import type { Metadata } from 'next'
import GameDetail from '@/components/GameDetail'

export const metadata: Metadata = {
  title: 'Pieceful — BONOBO GAMES',
  description: 'A calm puzzle game about placing pieces, not racing the clock.',
}

const features = [
  'Tetromino pieces on a 2D grid',
  'Your move, your pace — no time limit',
  'Goal: clear the board',
  'Clean, minimal visuals',
]

export default function PiecefulPage() {
  return (
    <GameDetail
      slug="pieceful"
      title="Pieceful"
      status="in progress"
      tagline="A puzzle game without the panic"
      intro="Tetromino-style puzzle game — but without the stress. No falling blocks, no ticking clock. You place pieces at your own pace; the challenge is in the puzzle, not the pressure."
      features={features}
    />
  )
}
