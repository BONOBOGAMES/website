import type { Metadata } from 'next'

export type GameStatus = 'in progress' | 'coming soon' | 'released'

export type Game = {
  slug: string
  title: string
  status: GameStatus
  // Short blurb for the listing cards.
  description: string
  // Detail page copy.
  tagline: string
  intro: string
  features: string[]
  // <head> description for the detail page.
  metaDescription: string
}

// Single source of truth for every game. Each component reads only the
// fields it needs: the listing cards use title/status/description, the
// detail page uses tagline/intro/features, metadata uses metaDescription.
export const games: Game[] = [
  {
    slug: 'pieceful',
    title: 'Pieceful',
    status: 'in progress',
    description:
      'A calm puzzle game about placing pieces, not racing the clock. No falling blocks. No countdown. Just you and the board.',
    tagline: 'A puzzle game without the panic',
    intro:
      'Tetromino-style puzzle game — but without the stress. No falling blocks, no ticking clock. You place pieces at your own pace; the challenge is in the puzzle, not the pressure.',
    features: [
      'Tetromino pieces on a 2D grid',
      'Your move, your pace — no time limit',
      'Goal: clear the board',
      'Clean, minimal visuals',
    ],
    metaDescription: 'A calm puzzle game about placing pieces, not racing the clock.',
  },
  {
    slug: 'arrows',
    title: 'Arrows',
    status: 'in progress',
    description:
      'A quiet little puzzle about letting things go, one at a time. Pull each arrow and it slides away — but only if the path ahead is clear. Strategy, but the soft kind.',
    tagline: 'A quiet little puzzle about letting things go, one at a time',
    intro:
      'Arrows is a board of small intentions, each one pointing somewhere, each one waiting for its turn to leave. There is no clock here, no one tapping their foot — just you, the grid, and the order in which things are meant to go. Pull an arrow and it slides away in the direction it always wanted, but only if the path ahead is clear. It’s strategy, but the soft kind. The kind you play to slow down, not to win.',
    features: [
      'Clear the board by removing every arrow, one at a time, without ever letting two collide',
      'Each arrow leaves in the direction it points — your only job is choosing the order',
      'Three hearts hold your mistakes; spend them all and the level begins again',
      'No timer ever rushes you — the puzzle waits as long as you need',
      'A hint is there for when the board stops making sense',
      'Levels alternate between knots that make you think and ones that simply let you breathe',
      'Thousands of handcrafted boards, all in a calm black-and-white world made for unwinding',
    ],
    metaDescription: 'A quiet little puzzle about letting things go, one at a time.',
  },
  {
    slug: 'chirpy',
    title: 'Chirpy',
    status: 'coming soon',
    description:
      'A simple bird, a simple world, an infinite journey. Help Chirpy flap, glide, and walk through a world that never stops — keeping his joy and freedom alive.',
    tagline: 'A simple bird, a simple world, an infinite journey',
    intro:
      'Chirpy is a simple bird, living in a simple world. He loves nature and all the things the universe can offer. He likes to fly and walk, just for fun — not because it’s his job or duty, but because he’s born a bird, and that’s what birds do. Being free and happy and exploring the beauty of the world is everything to him. He never stops, until he finally does. And then it all starts over.',
    features: [
      'Escort Chirpy through his infinite journey',
      'Trigger him to flap his wings — to start flying, or to rise higher',
      'He always glides lower and lower until he reaches the ground, then he walks',
      'Chirpy stops for anything he can’t fly through, until you help him get around',
      'Happiness is granted when he touches nature, or simply flies and walks freely',
      'The world never stops — only Chirpy does, when he faces an obstacle and needs a hand',
      'The longer he stays blocked while life goes on, the closer he gets to the end of joy',
    ],
    metaDescription: 'A simple bird, a simple world, and an infinite journey of joy and freedom.',
  },
]

// Path to a game's detail page.
export const gameHref = (slug: string) => `/games/${slug}`

export function getGame(slug: string): Game {
  const game = games.find((g) => g.slug === slug)
  if (!game) throw new Error(`Unknown game: ${slug}`)
  return game
}

// Neighbours for the pager, wrapping around so both arrows always work.
export function getAdjacentGames(slug: string): { prev: Game; next: Game } {
  const n = games.length
  const i = games.findIndex((g) => g.slug === slug)
  return {
    prev: games[(i - 1 + n) % n],
    next: games[(i + 1) % n],
  }
}

// <head> metadata for a game's detail page.
export function gameMetadata(slug: string): Metadata {
  const game = getGame(slug)
  return {
    title: `${game.title} — BONOBO GAMES`,
    description: game.metaDescription,
  }
}
