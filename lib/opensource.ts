export type ProjectStatus = 'released' | 'in progress' | 'experimental'

export type OpenSourceProject = {
  slug: string
  title: string
  status: ProjectStatus
  // Short blurb for the listing cards.
  description: string
  // Public repository URL (cards link out).
  repoUrl: string
  // Optional one-word tags shown on the card (e.g. platform).
  tags?: string[]
  // Optional upstream this project was forked / based on.
  forkOf?: {
    label: string
    url: string
  }
}

// Single source of truth for free / open-source software contributions —
// same pattern as lib/games, but cards point at GitHub rather than detail pages.
export const projects: OpenSourceProject[] = [
  {
    slug: 'agent-terminal',
    title: 'Agent Terminal for Grok Build',
    status: 'released',
    description:
      'A Home Assistant Supervisor add-on that runs the xAI Grok Build CLI in a browser terminal inside Home Assistant — web UI via ingress, tmux session persistence, direct access to /config, and optional ha-mcp integration.',
    repoUrl: 'https://github.com/BONOBOGAMES/agent-terminal',
    tags: ['Home Assistant', 'MIT'],
    forkOf: {
      label: 'heytcass/home-assistant-addons',
      url: 'https://github.com/heytcass/home-assistant-addons',
    },
  },
]
