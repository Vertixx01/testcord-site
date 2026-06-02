import { Terminal } from 'lucide-react'
import { terminalLines } from '../../lib/constants'

export function TerminalPanel() {
  return (
    <div className="rounded-[26px] bg-ink-950 p-3 shadow-[0_32px_100px_rgba(0,0,0,0.38)]">
      <div className="rounded-[18px] bg-ink-900 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-ember-500" />
            <span className="h-3 w-3 rounded-full bg-gold-300" />
            <span className="h-3 w-3 rounded-full bg-plum-400" />
          </div>
          <span className="font-mono text-xs text-cream-500">testcord devbuild</span>
        </div>
        <div className="space-y-3 p-4">
          {terminalLines.map(([line, tag]) => (
            <div
              key={line}
              className="grid min-w-0 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl bg-ink-950 px-3.5 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
            >
              <Terminal className="h-4 w-4 text-ember-300" aria-hidden="true" />
              <code className="truncate font-mono text-[13px] text-cream-100">{line}</code>
              <span className="rounded-full bg-cream-100 px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-[0.08em] text-ink-950">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
