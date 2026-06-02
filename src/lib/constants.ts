import { Flame, PackageCheck, PlugZap } from 'lucide-react'
import type { Platform } from './types'

export const repoUrl = 'https://github.com/x2b1/TestCord'
export const discordUrl = 'https://discord.gg/EMDpkV57gW'
export const windowsInstallerUrl = 'https://github.com/x2b1/TestCord/releases/download/latest/Testcord_installer_cli.exe'
export const pluginIndexUrl = 'https://catgirlhentai.online'
export const releasesUrl = 'https://github.com/x2b1/TestCord/releases'
export const readmeUrl = 'https://github.com/x2b1/TestCord#readme'
export const equicordUrl = 'https://github.com/Equicord/Equicord'
export const vencordUrl = 'https://github.com/Vendicated/Vencord'
export const thororenUrl = 'https://github.com/thororen1234'
export const dxrx99Url = 'https://github.com/dxrx99'
export const mixiruriUrl = 'https://github.com/Mixiruri'
export const x2bUrl = 'https://github.com/x2b1'
export const vertixxUrl = 'https://github.com/Vertixx01'
export const licenseUrl = 'https://github.com/x2b1/TestCord/blob/main/LICENSE'
export const livePluginsUrl = 'https://raw.githubusercontent.com/x2b1/TestCord-Builds/main/plugins.json'
export const fallbackPluginsUrl = 'https://github.com/x2b1/TestCord/releases/download/latest/plugins.json'
export const commitsApiUrl = 'https://api.github.com/repos/x2b1/TestCord/commits?per_page=6'
export const nymUrl = 'https://nym.com/pricing?ref=7dYnQHTWE5F'

export const platformNotes: Record<Platform, { label: string; detail: string; active: boolean }> = {
  Windows: {
    label: 'CLI installer available',
    detail: 'Download the latest Testcord_installer_cli.exe from GitHub releases.',
    active: true,
  },
  macOS: {
    label: 'No macOS installer yet',
    detail: 'Said by x2b: Linux installer is coming soon and fuck macOS. README fallback: use Goofcord with TestCord JS.',
    active: false,
  },
  Linux: {
    label: 'Linux installer coming soon',
    detail: 'Said by x2b: Linux installer is coming soon. Until then, use the devbuild/source path.',
    active: false,
  },
}

export const pluginCards = [
  {
    title: '500+ plugins',
    detail: 'A huge plugin set carried forward from the Equicord and Vencord lineage, then pushed further.',
    icon: PackageCheck,
  },
  {
    title: 'No plugin gatekeeping',
    detail: 'TestCord leans into user choice: you decide which plugins are worth running.',
    icon: PlugZap,
  },
  {
    title: 'Less stable, more fun',
    detail: 'The project is honest about its tradeoff: experimental energy over conservative polish.',
    icon: Flame,
  },
]

export type PluginFeature = (typeof pluginCards)[number]

export const terminalLines = [
  ['git clone https://github.com/x2b1/TestCord', 'clone'],
  ['pnpm install --frozen-lockfile', 'deps'],
  ['pnpm build', 'build'],
  ['pnpm inject', 'inject'],
] as const
