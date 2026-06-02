import { useEffect, useState } from 'react'
import { commitsApiUrl } from '../lib/constants'
import type { RecentCommit } from '../lib/types'

export function useRecentCommits() {
  const [commits, setCommits] = useState<RecentCommit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const refresh = async () => {
    setError('')

    try {
      const response = await fetch(commitsApiUrl)

      if (!response.ok) {
        throw new Error(`GitHub returned ${response.status}`)
      }

      const data = await response.json() as RecentCommit[]
      setCommits(data)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load commits')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const initial = window.setTimeout(() => void refresh(), 0)
    const interval = window.setInterval(() => void refresh(), 45_000)

    return () => {
      window.clearTimeout(initial)
      window.clearInterval(interval)
    }
  }, [])

  return { commits, error, isLoading, lastUpdated, refresh }
}
