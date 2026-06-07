import { GitBranch, ShieldAlert, Wrench } from 'lucide-react'

export function InfoCardsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8 lg:pb-20">
      <div className="grid gap-4 lg:grid-cols-3">
        <article className="min-w-0 rounded-[22px] bg-ink-900 p-6 shadow-panel">
          <ShieldAlert className="h-6 w-6 text-ember-300" aria-hidden="true" />
          <h3 className="mt-5 font-display text-2xl font-black text-cream-50">Terms warning</h3>
          <p className="pretty mt-3 text-sm leading-6 text-cream-400">
            Custom clients like TestCord violate Discord's Terms of Service. So use it at your own risk, we're not responsible for anything that happens to you.
          </p>
        </article>

        <article className="min-w-0 rounded-[22px] bg-ink-900 p-6 shadow-panel">
          <GitBranch className="h-6 w-6 text-gold-300" aria-hidden="true" />
          <h3 className="mt-5 font-display text-2xl font-black text-cream-50">Fork lineage</h3>
          <p className="pretty mt-3 text-sm leading-6 text-cream-400">
            Credits flow through Equicord, Vencord. TestCord should feel like its own messy branch, not a pasted fork page.
          </p>
        </article>

        <article className="min-w-0 rounded-[22px] bg-ink-900 p-6 shadow-panel">
          <Wrench className="h-6 w-6 text-plum-300" aria-hidden="true" />
          <h3 className="mt-5 font-display text-2xl font-black text-cream-50">Community support</h3>
          <p className="pretty mt-3 text-sm leading-6 text-cream-400">
            Commits, changes, chatting, and support happen through the linked Discord community.
          </p>
        </article>
      </div>
    </section>
  )
}
