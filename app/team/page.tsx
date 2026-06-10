import type { Metadata } from 'next'
import TeamMember from '@/components/TeamMember'
import { members, studioEmail } from '@/lib/team'

export const metadata: Metadata = {
  title: 'Team — BONOBO GAMES',
}

export default function TeamPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
      <h1 className="text-3xl font-bold mb-2">Team</h1>
      <p className="text-gray-500 mb-14">Free to join, free to leave.</p>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-16">
        The cohort is open and flat. No roles, no hierarchy — just people who want to make
        something together.
        {/* Studio contact — only rendered once studioEmail is set (see lib/team). */}
        {studioEmail && (
          <>
            {' '}Interested? Drop a line at{' '}
            <a
              href={`mailto:${studioEmail}`}
              className="text-lime-600 dark:text-lime-400 hover:underline"
            >
              {studioEmail}
            </a>
            .
          </>
        )}
      </p>

      <div className="border-t border-gray-200 dark:border-white/10 pt-8 space-y-8">
        {members.map((member) => (
          <TeamMember key={member.name} {...member} />
        ))}
      </div>
    </div>
  )
}
