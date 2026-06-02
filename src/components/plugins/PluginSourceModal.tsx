import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Clipboard, Loader2, X } from 'lucide-react'
import { SyntaxCodeBlock } from '../shared/SyntaxCodeBlock'
import { formatAuthors, getPluginRawSourceCandidates, getPluginSourcePath, getPluginSourceUrl } from '../../lib/pluginUtils'
import type { TestCordPlugin } from '../../lib/types'

type PluginSourceModalProps = {
  onClose: () => void
  plugin: TestCordPlugin | null
}

export function PluginSourceModal({ onClose, plugin }: PluginSourceModalProps) {
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!plugin) return

    const activePlugin = plugin
    let ignore = false
    const controller = new AbortController()

    async function loadSource() {
      setCode('')
      setCopied(false)
      setError('')
      setIsLoading(true)

      try {
        const urls = getPluginRawSourceCandidates(activePlugin)
        if (!urls.length) throw new Error('This plugin does not expose a source path.')

        let response: Response | null = null
        for (const url of urls) {
          response = await fetch(`${url}?t=${Date.now()}`, { signal: controller.signal })
          if (response.ok) break
        }

        if (!response?.ok) throw new Error(`GitHub returned ${response?.status ?? 'no response'}`)

        const source = await response.text()
        if (!ignore) setCode(source)
      } catch (err) {
        if (!ignore && err instanceof Error && err.name !== 'AbortError') {
          setError(err.message || 'Could not load plugin source.')
        }
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    void loadSource()

    return () => {
      ignore = true
      controller.abort()
    }
  }, [plugin])

  useEffect(() => {
    if (!plugin) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, plugin])

  if (!plugin) return null

  const sourcePath = getPluginSourcePath(plugin)

  const copyCode = async () => {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div
      aria-labelledby="plugin-source-title"
      aria-modal="true"
      className="fixed inset-0 z-50 grid min-h-dvh place-items-center bg-black/70 px-3 py-4 backdrop-blur-sm sm:px-5"
      role="dialog"
    >
      <button className="absolute inset-0 cursor-default" type="button" aria-label="Close source viewer" onClick={onClose} />

      <div className="relative flex max-h-[92dvh] w-full max-w-6xl min-w-0 flex-col overflow-hidden rounded-[26px] bg-ink-900 shadow-[0_30px_100px_rgba(0,0,0,0.65),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="flex flex-col gap-4 border-b border-white/[0.07] p-4 sm:p-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-gold-200">Plugin source</p>
            <h2 id="plugin-source-title" className="mt-1 truncate font-display text-3xl font-black tracking-[-0.03em] text-cream-50 sm:text-4xl">
              {plugin.name}
            </h2>
            <p className="mt-2 truncate text-sm font-bold text-cream-500">{formatAuthors(plugin)}</p>
            {sourcePath && <p className="mt-2 break-all font-mono text-xs font-bold leading-5 text-cream-500">{sourcePath}</p>}
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            <button
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cream-100 px-4 text-sm font-black text-ink-950 transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50"
              type="button"
              disabled={!code}
              onClick={() => void copyCode()}
            >
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Clipboard className="h-4 w-4" aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <a
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ink-950 px-4 text-sm font-black text-cream-100 transition-[background-color,transform] duration-200 hover:bg-ink-800 active:scale-[0.96]"
              href={getPluginSourceUrl(plugin)}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              className="grid h-11 w-11 place-items-center rounded-full bg-ink-950 text-cream-100 transition-[background-color,transform] duration-200 hover:bg-ink-800 active:scale-[0.96]"
              type="button"
              aria-label="Close source viewer"
              onClick={onClose}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
          {isLoading && (
            <div className="grid min-h-72 place-items-center rounded-2xl bg-ink-950 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
              <div>
                <Loader2 className="mx-auto h-7 w-7 animate-spin text-ember-300" aria-hidden="true" />
                <p className="mt-3 text-sm font-black text-cream-100">Loading plugin source...</p>
              </div>
            </div>
          )}

          {error && !isLoading && (
            <div className="rounded-2xl bg-ink-950 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
              <p className="font-display text-2xl font-black text-cream-50">Could not load source</p>
              <p className="mt-2 text-sm font-bold leading-6 text-cream-400">{error}</p>
              <a
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-cream-100 px-4 text-sm font-black text-ink-950 transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.96]"
                href={getPluginSourceUrl(plugin)}
                target="_blank"
                rel="noreferrer"
              >
                Open on GitHub
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          )}

          {code && !isLoading && (
            <SyntaxCodeBlock className="max-h-none" language="typescript">
              {code}
            </SyntaxCodeBlock>
          )}
        </div>
      </div>
    </div>
  )
}
