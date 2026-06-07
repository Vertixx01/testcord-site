import { useEffect, type ReactNode } from 'react'
import { ArrowUpRight, Download, ExternalLink, Heart } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  discordUrl,
  dxrx99Url,
  equicordUrl,
  kofiUrl,
  licenseUrl,
  mixiruriUrl,
  nymUrl,
  pluginIndexUrl,
  readmeUrl,
  releasesUrl,
  repoUrl,
  vencordUrl,
  vertixxUrl,
  x2bUrl,
} from '../../lib/constants'
import { DiscordIcon, GithubIcon, KofiIcon, LogoMark, NymIcon } from '../shared/BrandIcons'

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ left: 0, top: 0 })
      return
    }

    const id = location.hash.slice(1)
    const element = document.getElementById(id)
    element?.scrollIntoView({ block: 'start' })
  }, [location.hash, location.pathname])

  return null
}

export function SiteLayout() {
  return (
    <div className="min-h-dvh overflow-x-hidden bg-ink-950 text-cream-200">
      <ScrollToHash />
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-ink-950/84 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-h-11 items-center gap-3" aria-label="TestCord home">
            <LogoMark />
            <span className="font-display text-xl font-black tracking-[-0.02em] text-cream-50">TestCord</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-bold text-cream-500 md:flex" aria-label="Main">
            <Link className="inline-flex min-h-11 items-center px-1 transition-colors duration-150 hover:text-cream-100" to="/plugins">
              Plugins
            </Link>
            <Link className="inline-flex min-h-11 items-center px-1 transition-colors duration-150 hover:text-cream-100" to="/guide">
              Guide
            </Link>
            <Link className="inline-flex min-h-11 items-center px-1 transition-colors duration-150 hover:text-cream-100" to="/#commits">
              Commits
            </Link>
            <Link className="inline-flex min-h-11 items-center px-1 transition-colors duration-150 hover:text-cream-100" to="/#install">
              Install
            </Link>
            <a className="inline-flex min-h-11 items-center gap-1.5 transition-colors duration-150 hover:text-cream-100" href={repoUrl} target="_blank" rel="noreferrer">
              GitHub <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </nav>

          <Link
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream-100 px-4 text-sm font-black text-ink-950 shadow-[0_12px_28px_rgba(0,0,0,0.24)] transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.96]"
            to="/#install"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download
          </Link>
        </div>
      </header>

      <Outlet />

      <footer className="border-t border-white/[0.07] bg-ink-950/70">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 border-b border-white/[0.07] pb-12 sm:grid-cols-2 lg:grid-cols-4">
            <FooterColumn
              title="Product"
              links={[
                { label: 'Features', to: '/#plugins' },
                { label: 'Plugins', to: '/plugins' },
                { label: 'Installation', to: '/#install' },
                { label: 'Guide', to: '/guide' },
                { label: 'Releases', href: releasesUrl },
              ]}
            />
            <FooterColumn
              title="Resources"
              links={[
                { label: 'README', href: readmeUrl },
                { label: 'Plugin Index', to: pluginIndexUrl },
                { label: 'Equicord', href: equicordUrl },
                { label: 'Vencord', href: vencordUrl },
              ]}
            />
            <FooterColumn
              title="Community"
              links={[
                { label: 'Discord Server', href: discordUrl, icon: <DiscordIcon className="h-4 w-4" /> },
                { label: 'GitHub', href: repoUrl, icon: <GithubIcon className="h-4 w-4" /> },
                { label: 'Ko-fi', href: kofiUrl, icon: <KofiIcon className="h-4 w-4" /> },
                { label: "x2b's Nym ref", href: nymUrl, icon: <NymIcon className="h-4 w-4 invert brightness-75" /> },
              ]}
            />
            <FooterColumn
              title="Legal"
              links={[
                { label: 'License (GPL-3.0)', href: licenseUrl },
                { label: 'Discord ToS warning', to: '/guide#safety' },
                { label: 'Project disclaimer', href: readmeUrl },
              ]}
            />
          </div>

          <div className="mt-10 rounded-[24px] bg-ink-900 p-5 shadow-panel sm:p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-cream-100">Credits</p>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 text-sm font-bold text-cream-500 min-[480px]:grid-cols-2 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3 sm:text-base">
              <CreditLink href={x2bUrl} label="x2b" role="Owner" tone="text-ember-300" />
              <CreditLink href={mixiruriUrl} label="Mixiruri" role="Co-owner" tone="text-ember-300" />
              <CreditLink href={dxrx99Url} label="dxrx99" role="Co-owner" tone="text-ember-300" />
              <CreditLink href={vertixxUrl} label="Vertixx" role="Website Dev" tone="text-emerald-500" />
              <CreditLink href={vencordUrl} label="Vendicated" role="Vencord" tone="text-plum-300" />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 text-sm text-cream-500 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <LogoMark />
              <span>TestCord is not affiliated with Discord, Equicord, or Vencord.</span>
            </div>
            <span className="inline-flex items-center gap-1">
              Made for the big plugin pile <Heart className="h-3.5 w-3.5 fill-ember-500 text-ember-500" aria-hidden="true" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

type FooterLink = {
  href?: string
  icon?: ReactNode
  label: string
  to?: string
}

function FooterColumn({ links, title }: { links: FooterLink[]; title: string }) {
  return (
    <div>
      <h2 className="font-mono text-sm font-black uppercase tracking-[0.18em] text-cream-100">{title}</h2>
      <div className="mt-6 grid gap-3">
        {links.map(link => {
          const className = 'inline-flex min-h-10 min-w-10 w-fit items-center gap-2 text-base font-bold text-cream-500 transition-colors duration-150 hover:text-cream-100'

          if (link.to) {
            return (
              <Link key={link.label} className={className} to={link.to}>
                {link.icon}
                {link.label}
              </Link>
            )
          }

          return (
            <a key={link.label} className={className} href={link.href} target="_blank" rel="noreferrer">
              {link.icon}
              {link.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}

function CreditLink({ href, label, role, tone }: { href: string; label: string; role: string; tone: string }) {
  return (
    <a className="inline-flex min-h-10 items-center gap-1 transition-colors duration-150 hover:text-cream-100" href={href} target="_blank" rel="noreferrer">
      <span className={tone}>{label}</span>
      <span>({role})</span>
      <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
    </a>
  )
}
