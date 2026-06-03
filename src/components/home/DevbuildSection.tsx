import { TerminalPanel } from './TerminalPanel'

export function DevbuildSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20" id="devbuild">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-gold-200">Devbuild path</p>
          <h2 className="balance mt-3 font-display text-4xl font-black tracking-[-0.035em] text-cream-50 sm:text-5xl">
            For people comfortable living from source.
          </h2>
          <p className="pretty mt-5 max-w-lg text-lg leading-8 text-cream-400">
            We recommend Git, Node.js LTS, pnpm, then build and inject. Keep this section practical; no fake cross-platform download buttons.
          </p>
        </div>
        <TerminalPanel />
      </div>
    </section>
  )
}
