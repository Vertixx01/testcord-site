import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { discordUrl, platformNotes, pluginIndexUrl, repoUrl } from '../../lib/constants'
import { useDetectedPlatform } from '../../hooks/useDetectedPlatform'
import { DiscordIcon, GithubIcon } from '../shared/BrandIcons'

export function HeroSection({ pluginCountDisplay }: { pluginCountDisplay: string }) {
  const detectedPlatform = useDetectedPlatform()
  const detectedInstallers = platformNotes[detectedPlatform].installers
  const primaryInstaller = detectedInstallers[0]

  return (
    <section className="hero-slab relative border-b border-white/[0.07]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
        <div className="flex max-w-2xl flex-col justify-center">
          <p className="mb-5 w-fit rounded-full bg-ink-900 px-3.5 py-2 text-sm font-black text-gold-200 shadow-[inset_0_0_0_1px_rgba(246,195,79,0.22)]">
            Equicord fork. Vencord lineage. TestCord chaos.
          </p>

          <h1 className="balance font-display text-[clamp(3.5rem,11.5vw,8rem)] font-black leading-[0.86] tracking-[-0.055em] text-cream-50">
            {pluginCountDisplay} plugins, no committee.
          </h1>

          <p className="pretty mt-7 max-w-xl text-lg leading-8 text-cream-300 sm:text-xl">
            TestCord is the less-stable, more-fun Discord client mod fork for people who want the giant plugin pile and the freedom to pick what runs.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            {primaryInstaller ? (
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ember-500 px-6 text-sm font-black text-ink-950 shadow-[0_18px_38px_rgba(222,102,0,0.24)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-ember-400 hover:shadow-[0_22px_44px_rgba(222,102,0,0.3)] active:scale-[0.96]"
                href={primaryInstaller.href}
              >
                {detectedPlatform} {primaryInstaller.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ember-500 px-6 text-sm font-black text-ink-950 shadow-[0_18px_38px_rgba(222,102,0,0.24)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-ember-400 hover:shadow-[0_22px_44px_rgba(222,102,0,0.3)] active:scale-[0.96]"
                to="/#install"
              >
                macOS install route
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink-900 px-6 text-sm font-bold text-cream-100 shadow-panel transition-[background-color,transform] duration-200 hover:bg-ink-800 active:scale-[0.96]"
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              View source
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-3">
            {[
              [pluginCountDisplay, 'plugins'],
              ['GPL', 'licensed'],
              ['Win', 'installer'],
            ].map(([value, label]) => (
              <div key={label} className="min-w-0 rounded-2xl bg-ink-900 px-4 py-3 shadow-panel">
                <dt className="text-xs font-bold text-cream-500">{label}</dt>
                <dd className="mt-1 font-display text-2xl font-black text-cream-50 tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="poster-card min-w-0 rounded-[30px] bg-cream-100 p-4 text-ink-950 shadow-[0_40px_110px_rgba(0,0,0,0.42)]">
            <div className="grid gap-4 rounded-[22px] bg-ink-950 p-4 text-cream-100 sm:grid-cols-[0.85fr_1.15fr]">
              <div className="min-w-0 rounded-[20px] bg-ember-600 p-4">
                <img
                  className="product-image aspect-square w-full rounded-[18px] object-cover"
                  src="/testcord-icon.png"
                  alt="TestCord logo from the GitHub repository"
                  width="1024"
                  height="1024"
                />
              </div>

              <div className="flex min-w-0 flex-col justify-between gap-5 rounded-[20px] bg-ink-900 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-ember-300">plugin stance</p>
                  <h2 className="balance mt-2 font-display text-4xl font-black tracking-[-0.04em] text-cream-50">
                    Less stable. More fun.
                  </h2>
                </div>
                <div className="grid gap-2">
                  {['No rules on plugin additions', 'You choose what is comfortable', 'Community commits and support'].map((item) => (
                    <div key={item} className="flex min-h-11 items-center gap-3 rounded-2xl bg-ink-950 px-3 text-sm font-bold text-cream-200">
                      <Check className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-cream-100 px-3 text-sm font-black text-ink-950 transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.96]"
                    href={discordUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <DiscordIcon className="h-4 w-4" />
                    Discord
                  </a>
                  <Link
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-ember-500 px-3 text-sm font-black text-ink-950 transition-[background-color,transform] duration-200 hover:bg-ember-400 active:scale-[0.96]"
                    to={pluginIndexUrl}
                  >
                    Plugins
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
