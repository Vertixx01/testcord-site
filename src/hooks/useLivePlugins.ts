import { useEffect, useState } from 'react'
import { fallbackPluginsUrl, livePluginsUrl } from '../lib/constants'
import { dedupePlugins, getPluginSource } from '../lib/pluginUtils'
import type { TestCordPlugin } from '../lib/types'

export function useLivePlugins() {
  const [plugins, setPlugins] = useState<TestCordPlugin[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const refresh = async () => {
    setError('')

    try {
      const cacheBust = `?t=${Date.now()}`
      let response = await fetch(`${livePluginsUrl}${cacheBust}`)

      if (!response.ok) {
        response = await fetch(`${fallbackPluginsUrl}${cacheBust}`)
      }

      if (!response.ok) {
        throw new Error(`GitHub returned ${response.status}`)
      }

      const data = await response.json() as TestCordPlugin[]
      setPlugins(
        dedupePlugins(data.filter(plugin => plugin.name && getPluginSource(plugin) !== 'Vencord Core'))
          .sort((a, b) => a.name.localeCompare(b.name))
      )
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load plugins')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const initial = window.setTimeout(() => void refresh(), 0)
    const interval = window.setInterval(() => void refresh(), 30_000)

    return () => {
      window.clearTimeout(initial)
      window.clearInterval(interval)
    }
  }, [])

  return { error, isLoading, lastUpdated, plugins, refresh }
}
