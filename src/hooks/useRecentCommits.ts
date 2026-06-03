import { useCallback, useEffect, useState } from 'react'
import { branchesApiUrl, repoName, repoOwner } from '../lib/constants'
import type { RecentCommit, RepoBranch } from '../lib/types'

function commitsApiUrl(branch: string) {
  return `https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=6&sha=${encodeURIComponent(branch)}`
}

export function useRecentCommits(branch: string) {
  const [branches, setBranches] = useState<RepoBranch[]>([])
  const [commits, setCommits] = useState<RecentCommit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [branchesError, setBranchesError] = useState('')

  const refresh = useCallback(async () => {
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(commitsApiUrl(branch))

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
  }, [branch])

  const refreshBranches = useCallback(async () => {
    try {
      const response = await fetch(branchesApiUrl)

      if (!response.ok) {
        throw new Error(`GitHub returned ${response.status}`)
      }

      const data = await response.json() as RepoBranch[]
      setBranches(data)
      setBranchesError('')
    } catch (err) {
      setBranchesError(err instanceof Error ? err.message : 'Could not load branches')
    }
  }, [])

  useEffect(() => {
    const initial = window.setTimeout(() => void refreshBranches(), 0)
    return () => window.clearTimeout(initial)
  }, [refreshBranches])

  useEffect(() => {
    const initial = window.setTimeout(() => void refresh(), 0)
    const interval = window.setInterval(() => void refresh(), 45_000)

    return () => {
      window.clearTimeout(initial)
      window.clearInterval(interval)
    }
  }, [refresh])

  return { branches, branchesError, commits, error, isLoading, lastUpdated, refresh }
}
