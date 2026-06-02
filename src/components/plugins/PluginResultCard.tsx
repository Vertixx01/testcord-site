import { Code2 } from 'lucide-react'
import { formatAuthors, getPluginSource } from '../../lib/pluginUtils'
import type { TestCordPlugin } from '../../lib/types'

export function PluginResultCard({ onViewSource, plugin }: { onViewSource: (plugin: TestCordPlugin) => void; plugin: TestCordPlugin }) {
  const source = getPluginSource(plugin)
  const authors = formatAuthors(plugin)

  return (
    <article className="flex min-w-0 flex-col rounded-[22px] bg-ink-900 p-5 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate font-display text-2xl font-black tracking-[-0.02em] text-cream-50">{plugin.name}</h2>
          <p className="mt-1 truncate text-sm font-bold text-cream-500">{authors}</p>
        </div>
        <span className="shrink-0 rounded-full bg-cream-100 px-3 py-1 text-xs font-black text-ink-950">{source}</span>
      </div>

      <p className="pretty mt-4 line-clamp-4 min-h-24 text-sm leading-6 text-cream-400">
        {plugin.description || 'No description provided in the generated plugin metadata.'}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {plugin.required && <span className="rounded-full bg-gold-300 px-2.5 py-1 text-xs font-black text-ink-950">required</span>}
        {plugin.enabledByDefault && <span className="rounded-full bg-leaf-300 px-2.5 py-1 text-xs font-black text-ink-950">default</span>}
        {plugin.hasCommands && <span className="rounded-full bg-plum-400 px-2.5 py-1 text-xs font-black text-ink-950">commands</span>}
        {plugin.hasPatches && <span className="rounded-full bg-ember-500 px-2.5 py-1 text-xs font-black text-ink-950">patches</span>}
        {plugin.target && <span className="rounded-full bg-ink-950 px-2.5 py-1 text-xs font-black text-cream-300">{plugin.target}</span>}
        {(plugin.tags ?? []).slice(0, 3).map(tag => (
          <span key={tag} className="rounded-full bg-ink-950 px-2.5 py-1 text-xs font-black text-cream-300">{tag}</span>
        ))}
      </div>

      {plugin.commands?.length ? (
        <div className="mt-5 rounded-2xl bg-ink-950 p-3">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-cream-500">Commands</p>
          <div className="mt-2 space-y-2">
            {plugin.commands.slice(0, 2).map(command => (
              <div key={command.name} className="text-sm">
                <code className="font-mono font-bold text-gold-200">/{command.name}</code>
                {command.description && <span className="text-cream-500"> · {command.description}</span>}
              </div>
            ))}
            {plugin.commands.length > 2 && (
              <p className="text-xs font-bold text-cream-500">+{plugin.commands.length - 2} more command(s)</p>
            )}
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => onViewSource(plugin)}
        className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-black text-ember-300 transition-colors duration-150 hover:text-ember-400"
      >
        View source
        <Code2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </article>
  )
}
