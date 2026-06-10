export type Member = {
  name: string
  nickname?: string
  role: string
  avatar: string
  avatarHighRes?: string
  email?: string
}

// Single source of truth for the team, the same way lib/games holds games.
export const members: Member[] = [
  {
    name: 'Gábor Simon',
    nickname: 'Sala',
    role: 'Founder, developer',
    avatar: '/gabor-avatar.png',
    avatarHighRes: '/sala.png',
    email: 'gsm@bonobo.games',
  },
]

// Studio contact inbox. Not live yet, so it must NOT render publicly — keep
// this null until the mailbox exists, then set it to 'contact@bonobo.games'.
export const studioEmail: string | null = null
