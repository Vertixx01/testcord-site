import { useState } from 'react'
import { ArrowUpRight, Check, Download, X } from 'lucide-react'
import { platformNotes, repoUrl, windowsInstallerUrl } from '../../lib/constants'
import type { Platform } from '../../lib/types'
import { PlatformSwitch } from './PlatformSwitch'

export function InstallSection() {
  const [platform, setPlatform] = useState<Platform>('Windows')
  const selectedPlatform = platformNotes[platform]

  return (
    <section className="border-y border-white/[0.07] bg-cream-100 text-ink-950" id="install">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-ember-700">Install status</p>
          <h2 className="balance mt-3 font-display text-4xl font-black tracking-[-0.035em] sm:text-5xl">
            Be honest about the platform story.
          </h2>
          <p className="pretty mt-5 max-w-lg text-lg leading-8 text-ink-600">
            The repo currently points normal users to a Windows CLI installer. macOS and Linux are not presented as finished desktop installers yet.
          </p>
        </div>

        <div className="min-w-0 rounded-[26px] bg-ink-950 p-4 text-cream-100 shadow-[0_24px_70px_rgba(13,16,13,0.22)]">
          <PlatformSwitch platform={platform} setPlatform={setPlatform} />
          <div className="mt-4 rounded-[20px] bg-ink-900 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-2xl font-black text-cream-50">{selectedPlatform.label}</p>
                <p className="pretty mt-2 text-sm leading-6 text-cream-400">{selectedPlatform.detail}</p>
              </div>
              {selectedPlatform.active ? (
                <Check className="h-6 w-6 shrink-0 text-gold-300" aria-hidden="true" />
              ) : (
                <X className="h-6 w-6 shrink-0 text-ember-300" aria-hidden="true" />
              )}
            </div>

            {selectedPlatform.active ? (
              <a
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ember-500 px-5 text-sm font-black text-ink-950 transition-[background-color,transform] duration-200 hover:bg-ember-400 active:scale-[0.96]"
                href={windowsInstallerUrl}
              >
                Download Windows CLI
                <Download className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <a
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cream-100 px-5 text-sm font-black text-ink-950 transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.96]"
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Follow repo updates
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
