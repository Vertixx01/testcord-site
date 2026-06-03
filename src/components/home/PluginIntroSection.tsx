import { pluginCards } from '../../lib/constants'
import { PluginFeatureCard } from './PluginFeatureCard'

export function PluginIntroSection({ pluginCountDisplay }: { pluginCountDisplay: string }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20" id="plugins">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-ember-300">What it is</p>
          <h2 className="balance mt-3 font-display text-4xl font-black tracking-[-0.035em] text-cream-50 sm:text-5xl">
            A louder fork for people who want the whole plugin drawer open.
          </h2>
        </div>
        <p className="pretty max-w-2xl text-lg leading-8 text-cream-400">
          TestCord is a fork of Equicord, which is a fork of Vencord, with a bigger plugin set and fewer restrictions. This page keeps that messy, community-built energy front and center.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {pluginCards.map((card, index) => (
          <PluginFeatureCard
            key={card.title}
            card={index === 0 ? { ...card, title: `${pluginCountDisplay} plugins` } : card}
          />
        ))}
      </div>
    </section>
  )
}
