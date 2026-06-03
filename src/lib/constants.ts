import { Flame, PackageCheck, PlugZap } from 'lucide-react'
import type { Platform, PlatformInstaller } from './types'

export const repoOwner = 'TestcordDev'
export const repoName = 'TestCord'
export const repoUrl = `https://github.com/${repoOwner}/${repoName}`
export const discordUrl = 'https://discord.gg/EMDpkV57gW'
export const latestReleaseDownloadUrl = `${repoUrl}/releases/download/latest`
export const windowsInstallerUrl = `${latestReleaseDownloadUrl}/Testcord_installer_cli.exe`
export const windowsGuiInstallerUrl = `${latestReleaseDownloadUrl}/Testcord_installer.exe`
export const linuxCliInstallerUrl = `${latestReleaseDownloadUrl}/Testcord_installer_cli-linux-x11-wayland`
export const linuxGuiInstallerUrl = `${latestReleaseDownloadUrl}/Testcord_installer-linux-x11-wayland`
export const linuxWaylandInstallerUrl = `${latestReleaseDownloadUrl}/Testcord_installer-wayland`
export const linuxX11InstallerUrl = `${latestReleaseDownloadUrl}/Testcord_installer-x11`
export const pluginIndexUrl = '/plugins'
export const releasesUrl = `${repoUrl}/releases`
export const readmeUrl = `${repoUrl}#readme`
export const equicordUrl = 'https://github.com/Equicord/Equicord'
export const vencordUrl = 'https://github.com/Vendicated/Vencord'
export const thororenUrl = 'https://github.com/thororen1234'
export const dxrx99Url = 'https://github.com/dxrx99'
export const mixiruriUrl = 'https://github.com/Mixiruri'
export const x2bUrl = 'https://github.com/x2b1'
export const vertixxUrl = 'https://github.com/Vertixx01'
export const licenseUrl = `${repoUrl}/blob/main/LICENSE`
export const livePluginsUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}-Builds/main/plugins.json`
export const fallbackPluginsUrl = `${repoUrl}/releases/download/latest/plugins.json`
export const commitsApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=6`
export const branchesApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/branches?per_page=100`
export const nymUrl = 'https://nym.com/pricing?ref=7dYnQHTWE5F'
export const kofiUrl = 'https://ko-fi.com/x2bkaneki'

export const platformNotes: Record<Platform, { detail: string; installers: PlatformInstaller[]; label: string }> = {
  Windows: {
    label: 'Windows installers available',
    detail: 'Use the CLI installer for terminals or the GUI installer if you want the click-through flow.',
    installers: [
      { label: 'CLI', href: windowsInstallerUrl },
      { label: 'GUI', href: windowsGuiInstallerUrl },
    ],
  },
  macOS: {
    label: 'No macOS installer',
    detail: 'We do not ship a native macOS installer right now, but you can still use TestCord through Goofcord or build it from source.',
    installers: [],
  },
  Linux: {
    label: 'Linux installers available',
    detail: 'Pick the combined x11/Wayland build for broad compatibility, or use the display-server-specific installer.',
    installers: [
      { label: 'CLI x11 & Wayland', href: linuxCliInstallerUrl },
      { label: 'GUI x11 & Wayland', href: linuxGuiInstallerUrl },
      { label: 'Wayland only', href: linuxWaylandInstallerUrl },
      { label: 'x11 only', href: linuxX11InstallerUrl },
    ],
  },
}

export const pluginCards = [
  {
    title: 'Live plugin count',
    detail: 'A huge plugin set pulled from the generated GitHub plugin JSON, then deduped for a cleaner index.',
    icon: PackageCheck,
  },
  {
    title: 'No plugin gatekeeping',
    detail: 'We lean into user choice: you decide which plugins are worth running.',
    icon: PlugZap,
  },
  {
    title: 'Less stable, more fun',
    detail: 'We are honest about the tradeoff: experimental energy over conservative polish.',
    icon: Flame,
  },
]

export type PluginFeature = (typeof pluginCards)[number]

export const terminalLines = [
  [`git clone ${repoUrl}`, 'clone'],
  ['pnpm install --frozen-lockfile', 'deps'],
  ['pnpm build', 'build'],
  ['pnpm inject', 'inject'],
] as const
