'use client'

import { ReactNode } from 'react'

// Page fades are handled by TransitionOverlay (cover → swap → reveal).
// Content always renders at full opacity so it never pops in or
// double-fades during navigation.
export default function PageTransition({ children }: { children: ReactNode }) {
  return <>{children}</>
}
