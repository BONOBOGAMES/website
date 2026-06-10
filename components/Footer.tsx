const socials = [
  { label: 'X', href: 'https://x.com/bonobogames_hun' },
  { label: 'Reddit', href: 'https://www.reddit.com/user/GSM_BONOBO/' },
  { label: 'GitHub', href: 'https://github.com/BONOBOGAMES' },
  { label: 'GitLab', href: 'https://gitlab.com/BONOBOGAMES' },
  { label: 'Email', href: 'mailto:gsm@bonobo.games' },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 mt-24 transition-colors duration-300 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <span>© {new Date().getFullYear()} BONOBO GAMES</span>
        <div className="flex gap-6">
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
