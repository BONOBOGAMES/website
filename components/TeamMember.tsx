'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TeamMemberProps {
  name: string
  nickname?: string
  role: string
  avatar: string
  avatarHighRes?: string
  email?: string
}

export default function TeamMember({ name, nickname, role, avatar, avatarHighRes, email }: TeamMemberProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  const displayName = nickname ? (
    <>
      {name.split(' ')[0]} <span className="text-lime-600 dark:text-lime-400">'{nickname}'</span> {name.split(' ').slice(1).join(' ')}
    </>
  ) : name

  return (
    <>
      <div className="flex items-center gap-6">
        <button
          onClick={() => setIsZoomed(true)}
          className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-lime-600/20 dark:border-lime-400/20 hover:border-lime-600/40 dark:hover:border-lime-400/40 transition-all hover:scale-110 cursor-pointer"
          aria-label={`View ${name}'s photo`}
        >
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
          />
        </button>
        <div>
          <p className="font-semibold text-lg">{displayName}</p>
          <p className="text-gray-500 text-sm mt-1">{role}</p>
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-lime-600 dark:text-lime-400 text-sm mt-1 inline-block hover:underline"
            >
              {email}
            </a>
          )}
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
            style={{ margin: 0, padding: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[32rem] h-[32rem] rounded-full overflow-hidden border-4 border-lime-600/30 dark:border-lime-400/30 shadow-2xl"
            >
              <Image
                src={avatarHighRes || avatar}
                alt={name}
                fill
                className="object-cover"
                quality={100}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
