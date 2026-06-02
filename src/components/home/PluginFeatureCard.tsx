import type { PluginFeature } from '../../lib/constants'

export function PluginFeatureCard({ card }: { card: PluginFeature }) {
  const Icon = card.icon

  return (
    <article className="group min-w-0 rounded-[22px] bg-ink-900 p-6 shadow-panel transition-[background-color,transform] duration-200 hover:-translate-y-1 hover:bg-ink-800">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ember-500 text-ink-950 shadow-[0_14px_30px_rgba(222,102,0,0.25)]">
        <Icon className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
      </div>
      <h3 className="balance mt-6 font-display text-2xl font-black tracking-[-0.02em] text-cream-50">{card.title}</h3>
      <p className="pretty mt-3 text-sm leading-6 text-cream-400">{card.detail}</p>
    </article>
  )
}
