export type Game = {
  slug: string
  title: string
  href: string
  status: string
  description: string
}

// Single source of truth for the catalogue. The listing page and the
// detail-page pager both read this, so their order always matches.
export const games: Game[] = [
  {
    slug: 'pieceful',
    title: 'Pieceful',
    href: '/games/pieceful',
    status: 'in progress',
    description:
      'A calm puzzle game about placing pieces, not racing the clock. No falling blocks. No countdown. Just you and the board.',
  },
  {
    slug: 'arrows',
    title: 'Arrows',
    href: '/games/arrows',
    status: 'coming soon',
    description:
      'A quiet little puzzle about letting things go, one at a time. Pull each arrow and it slides away — but only if the path ahead is clear. Strategy, but the soft kind.',
  },
  {
    slug: 'chirpy',
    title: 'Chirpy',
    href: '/games/chirpy',
    status: 'coming soon',
    description:
      'A simple bird, a simple world, an infinite journey. Help Chirpy flap, glide, and walk through a world that never stops — keeping his joy and freedom alive.',
  },
]

// Neighbours for the pager, wrapping around so both arrows always work.
export function getAdjacentGames(slug: string): { prev: Game; next: Game } {
  const n = games.length
  const i = games.findIndex((g) => g.slug === slug)
  return {
    prev: games[(i - 1 + n) % n],
    next: games[(i + 1) % n],
  }
}
