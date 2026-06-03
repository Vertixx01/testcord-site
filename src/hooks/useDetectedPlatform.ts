import { useState } from 'react'
import type { Platform } from '../lib/types'

function detectPlatform(userAgent: string): Platform {
  const normalized = userAgent.toLowerCase()

  if (normalized.includes('linux')) return 'Linux'
  if (normalized.includes('mac')) return 'macOS'
  return 'Windows'
}

export function useDetectedPlatform() {
  const [platform] = useState<Platform>(() => {
    if (typeof window === 'undefined') return 'Windows'
    return detectPlatform(window.navigator.userAgent)
  })

  return platform
}
