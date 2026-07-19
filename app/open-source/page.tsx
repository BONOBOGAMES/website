import type { Metadata } from 'next'
import { projects } from '@/lib/opensource'

export const metadata: Metadata = {
  title: 'Open Source — BONOBO GAMES',
}

export default function OpenSourcePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
      <h1 className="text-3xl font-bold mb-2">Open Source</h1>
      <p className="text-gray-500 mb-16">
        Free tools and public software. Fork them, run them, make them yours.
      </p>

      <div className="space-y-4">
        {projects.map(({ slug, title, status, description, repoUrl, tags, forkOf }) => (
          <div
            key={slug}
            className="border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:border-gray-300 dark:hover:border-white/25 transition-colors group"
          >
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h2 className="text-xl font-semibold group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                  {title}
                </h2>
                <span className="text-xs bg-lime-600/10 dark:bg-lime-400/10 text-lime-600 dark:text-lime-400 border border-lime-600/20 dark:border-lime-400/20 px-2 py-0.5 rounded-full">
                  {status}
                </span>
                {tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                {description}
              </p>
            </a>
            {forkOf && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Fork of{' '}
                <a
                  href={forkOf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                >
                  {forkOf.label}
                </a>
              </p>
            )}
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 dark:text-gray-500 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors"
            >
              View on GitHub →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
