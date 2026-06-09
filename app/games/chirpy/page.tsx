import type { Metadata } from 'next'
import GameDetail from '@/components/GameDetail'

export const metadata: Metadata = {
  title: 'Chirpy — BONOBO GAMES',
  description: 'A simple bird, a simple world, and an infinite journey of joy and freedom.',
}

const features = [
  'Escort Chirpy through his infinite journey',
  'Trigger him to flap his wings — to start flying, or to rise higher',
  'He always glides lower and lower until he reaches the ground, then he walks',
  'Chirpy stops for anything he can’t fly through, until you help him get around',
  'Happiness is granted when he touches nature, or simply flies and walks freely',
  'The world never stops — only Chirpy does, when he faces an obstacle and needs a hand',
  'The longer he stays blocked while life goes on, the closer he gets to the end of joy',
]

export default function ChirpyPage() {
  return (
    <GameDetail
      title="Chirpy"
      status="coming soon"
      tagline="A simple bird, a simple world, an infinite journey"
      intro={
        <>
          Chirpy is a simple bird, living in a simple world. He loves nature and all the things the
          universe can offer. He likes to fly and walk, just for fun — not because it&apos;s his job or
          duty, but because he&apos;s born a bird, and that&apos;s what birds do. Being free and happy and
          exploring the beauty of the world is everything to him. He never stops, until he finally
          does. And then it all starts over.
        </>
      }
      features={features}
    />
  )
}
