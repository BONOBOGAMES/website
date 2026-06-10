'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const COVER_MS = 200
const REVEAL_MS = 200

export default function TransitionOverlay() {
  const pathname = usePathname()
  const router = useRouter()
  const controls = useAnimationControls()
  const covering = useRef(false)
  const [active, setActive] = useState(false)

  // Intercept internal link clicks: fade to opaque BEFORE navigating,
  // so the content swap happens hidden under the cover.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement)?.closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/') || anchor.target === '_blank') return
      const dest = new URL(anchor.href, location.href)
      if (dest.pathname === pathname) return

      e.preventDefault()
      covering.current = true
      setActive(true)
      controls.start({ opacity: 1 }, { duration: COVER_MS / 1000 }).then(() => {
        router.push(href)
      })
    }
    // Capture phase so we run before next/link's own click handler.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname, router, controls])

  // The new route has rendered under the opaque overlay → reveal it.
  useEffect(() => {
    if (!covering.current) return
    covering.current = false
    controls.set({ opacity: 1 })
    controls.start({ opacity: 0 }, { duration: REVEAL_MS / 1000 }).then(() => setActive(false))
  }, [pathname, controls])

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={controls}
      style={{ pointerEvents: active ? 'auto' : 'none' }}
      className="fixed inset-0 z-30 flex items-center justify-center bg-white dark:bg-black"
    >
      {/* Brand mark shown on the cover so the page-load moment is never blank.
          As a child of the fading overlay it inherits the cover's opacity. */}
      {active && (
        <img
          src="/logo-lime.png"
          alt=""
          width={120}
          height={60}
          className="h-auto w-28 animate-pulse"
        />
      )}
    </motion.div>
  )
}
