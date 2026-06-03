import { useState } from 'react'
import { ArrowUpRight, GitBranch, GitCommitHorizontal, RefreshCw } from 'lucide-react'
import { useRecentCommits } from '../../hooks/useRecentCommits'
import { formatDate, shortCommitMessage } from '../../lib/pluginUtils'

export function RecentCommitsSection() {
  const [branch, setBranch] = useState('main')
  const { branches, branchesError, commits, error, isLoading, lastUpdated, refresh } = useRecentCommits(branch)

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20" id="commits">
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-gold-200">Recent commits</p>
          <h2 className="balance mt-3 font-display text-4xl font-black tracking-[-0.035em] text-cream-50 sm:text-5xl">
            Latest repo movement.
          </h2>
          <p className="pretty mt-5 max-w-lg text-lg leading-8 text-cream-400">
            Pulled from the TestCord commits API, so the page tracks the newest source changes without waiting for a site deploy.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-cream-500">
            <label className="relative min-w-44">
              <span className="sr-only">Commit branch</span>
              <GitBranch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-500" aria-hidden="true" />
              <select
                value={branch}
                onChange={event => setBranch(event.target.value)}
                className="min-h-11 w-full appearance-none rounded-full bg-ink-900 py-2 pl-10 pr-8 font-black text-cream-100 shadow-panel outline-none transition-[box-shadow] duration-200 focus:shadow-[inset_0_0_0_2px_rgba(255,181,111,0.8)]"
              >
                {(branches.length ? branches : [{ name: branch, commit: { sha: '', url: '' } }]).map(item => (
                  <option key={item.name} value={item.name}>{item.name}</option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => void refresh()}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-900 px-4 font-black text-cream-100 shadow-panel transition-[background-color,transform] duration-200 hover:bg-ink-800 active:scale-[0.96]"
            >
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Refresh commits
            </button>
            {lastUpdated && <span className="tabular-nums">Updated {formatDate(lastUpdated.toISOString())}</span>}
            {branchesError && <span className="text-ember-300">Branches failed: {branchesError}</span>}
          </div>
        </div>

        <div className="grid gap-3">
          {isLoading && (
            <div className="rounded-[22px] bg-ink-900 p-6 text-sm font-bold text-cream-400 shadow-panel">
              Loading recent commits...
            </div>
          )}

          {error && (
            <div className="rounded-[22px] bg-ink-900 p-6 text-sm font-bold text-ember-300 shadow-panel">
              Commits failed to load: {error}
            </div>
          )}

          {commits.map(commit => {
            const authorName = commit.author?.login || commit.commit.author.name
            const authorUrl = commit.author?.html_url

            return (
              <a
                key={commit.sha}
                href={commit.html_url}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-4 rounded-[22px] bg-ink-900 p-5 shadow-panel transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-ink-800 sm:grid-cols-[1fr_auto]"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-cream-100 px-3 py-1 font-mono text-xs font-black text-ink-950">
                      <GitCommitHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                      {commit.sha.slice(0, 7)}
                    </span>
                    <span className="font-mono text-xs text-cream-500">
                      {authorUrl ? (
                        <span>{authorName}</span>
                      ) : (
                        authorName
                      )}
                    </span>
                  </div>
                  <h3 className="mt-3 truncate font-display text-2xl font-black tracking-[-0.02em] text-cream-50">
                    {shortCommitMessage(commit.commit.message)}
                  </h3>
                  <p className="mt-1 text-sm text-cream-500">
                    Committed {formatDate(commit.commit.author.date)}
                  </p>
                </div>
                <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cream-100 px-4 text-sm font-black text-ink-950 transition-transform duration-200 group-active:scale-[0.96]">
                  Open commit
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
