import { useMemo, useState } from 'react'
import { useLivePlugins } from '../hooks/useLivePlugins'
import { formatAuthors, formatDate, getPluginSource } from '../lib/pluginUtils'
import type { SortMode, TestCordPlugin } from '../lib/types'
import { PluginResultCard } from '../components/plugins/PluginResultCard'
import { PluginSourceModal } from '../components/plugins/PluginSourceModal'
import { PluginToolbar } from '../components/plugins/PluginToolbar'

export function PluginsPage() {
  const { error, isLoading, lastUpdated, plugins, refresh } = useLivePlugins()
  const [query, setQuery] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>('name')
  const [sourcePlugin, setSourcePlugin] = useState<TestCordPlugin | null>(null)

  const visiblePlugins = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return plugins
      .filter(plugin => {
        if (!normalizedQuery) return true

        const haystack = [
          plugin.name,
          plugin.description,
          formatAuthors(plugin),
          getPluginSource(plugin),
          plugin.filePath,
          plugin.dirName,
          ...(plugin.tags ?? []),
          ...(plugin.commands?.map(command => `${command.name} ${command.description ?? ''}`) ?? []),
        ].join(' ').toLowerCase()

        return haystack.includes(normalizedQuery)
      })
      .sort((a, b) => {
        if (sortMode === 'source') {
          return getPluginSource(a).localeCompare(getPluginSource(b)) || a.name.localeCompare(b.name)
        }

        if (sortMode === 'author') {
          return formatAuthors(a).localeCompare(formatAuthors(b)) || a.name.localeCompare(b.name)
        }

        if (sortMode === 'commands') {
          return Number(Boolean(b.hasCommands)) - Number(Boolean(a.hasCommands)) || a.name.localeCompare(b.name)
        }

        if (sortMode === 'patches') {
          return Number(Boolean(b.hasPatches)) - Number(Boolean(a.hasPatches)) || a.name.localeCompare(b.name)
        }

        if (sortMode === 'required') {
          return Number(Boolean(b.required)) - Number(Boolean(a.required)) || a.name.localeCompare(b.name)
        }

        if (sortMode === 'default') {
          return Number(Boolean(b.enabledByDefault)) - Number(Boolean(a.enabledByDefault)) || a.name.localeCompare(b.name)
        }

        if (sortMode === 'modified') {
          return Number(Boolean(b.isModified)) - Number(Boolean(a.isModified)) || a.name.localeCompare(b.name)
        }

        if (sortMode === 'tags') {
          return (b.tags?.length ?? 0) - (a.tags?.length ?? 0) || a.name.localeCompare(b.name)
        }

        return a.name.localeCompare(b.name)
      })
  }, [plugins, query, sortMode])

  const sourceCounts = useMemo(() => {
    return plugins.reduce<Record<string, number>>((acc, plugin) => {
      const source = getPluginSource(plugin)
      acc[source] = (acc[source] ?? 0) + 1
      return acc
    }, {})
  }, [plugins])

  return (
    <main>
      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-gold-200">Live plugin index</p>
              <h1 className="balance mt-3 font-display text-5xl font-black tracking-[-0.05em] text-cream-50 sm:text-7xl">
                TestCord plugins, pulled live.
              </h1>
              <p className="pretty mt-6 max-w-2xl text-lg leading-8 text-cream-400">
                This page reads TestCord's generated plugin JSON, refreshes every 30 seconds, and exposes author, source, description, commands, tags, and source path.
              </p>
            </div>

            <div className="grid gap-3 rounded-[26px] bg-ink-900 p-4 shadow-panel sm:grid-cols-3">
              {[
                ['Total', plugins.length.toLocaleString()],
                ['TestCord', (sourceCounts.TestCord ?? 0).toLocaleString()],
                ['With commands', plugins.filter(plugin => plugin.hasCommands).length.toLocaleString()],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[18px] bg-ink-950 px-4 py-3">
                  <div className="text-xs font-black uppercase tracking-[0.12em] text-cream-500">{label}</div>
                  <div className="mt-1 font-display text-3xl font-black text-cream-50 tabular-nums">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <PluginToolbar
            query={query}
            refresh={() => void refresh()}
            setQuery={setQuery}
            setSortMode={setSortMode}
            sortMode={sortMode}
          />

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-bold text-cream-500">
            {isLoading && <span>Loading plugin data...</span>}
            {lastUpdated && <span className="tabular-nums">Last refresh: {formatDate(lastUpdated.toISOString())}</span>}
            <span>{visiblePlugins.length.toLocaleString()} shown</span>
            {error && <span className="text-ember-300">Load error: {error}</span>}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visiblePlugins.map(plugin => (
            <PluginResultCard key={`${plugin.name}-${plugin.filePath ?? plugin.dirName}`} onViewSource={setSourcePlugin} plugin={plugin} />
          ))}
        </div>
      </section>

      <PluginSourceModal plugin={sourcePlugin} onClose={() => setSourcePlugin(null)} />
    </main>
  )
}
