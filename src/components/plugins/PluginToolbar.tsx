import { RefreshCw, Search, SlidersHorizontal } from 'lucide-react'
import type { SortMode } from '../../lib/types'

const sortOptions = [
  ['name', 'Name'],
  ['source', 'Source'],
  ['author', 'Author'],
  ['commands', 'Commands'],
] as [SortMode, string][]

export function PluginToolbar({
  query,
  refresh,
  setQuery,
  setSortMode,
  sortMode,
}: {
  query: string
  refresh: () => void
  setQuery: (query: string) => void
  setSortMode: (mode: SortMode) => void
  sortMode: SortMode
}) {
  return (
    <div className="mt-8 grid gap-4 rounded-[26px] bg-ink-900 p-4 shadow-panel lg:grid-cols-[1fr_auto] lg:items-center">
      <label className="relative block min-w-0">
        <span className="sr-only">Search plugins</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cream-500" aria-hidden="true" />
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          className="min-h-12 w-full rounded-2xl bg-ink-950 py-3 pl-12 pr-4 text-base font-bold text-cream-50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)] outline-none transition-[box-shadow] duration-200 placeholder:text-cream-500 focus:shadow-[inset_0_0_0_2px_rgba(255,181,111,0.8)]"
          placeholder="Search name, author, source, description..."
          type="search"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {sortOptions.map(([mode, label]) => (
          <button
            key={mode}
            type="button"
            onClick={() => setSortMode(mode)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-black transition-[background-color,color,transform] duration-200 active:scale-[0.96] ${
              sortMode === mode ? 'bg-cream-100 text-ink-950' : 'bg-ink-950 text-cream-300 hover:bg-ink-800'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={refresh}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ember-500 px-4 text-sm font-black text-ink-950 transition-[background-color,transform] duration-200 hover:bg-ember-400 active:scale-[0.96]"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Refresh
        </button>
      </div>
    </div>
  )
}
