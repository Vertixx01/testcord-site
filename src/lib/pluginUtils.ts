import { repoName, repoOwner, repoUrl } from './constants'
import type { TestCordPlugin } from './types'

function normalizePluginName(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function normalizePathName(path: string) {
  return path
    .replace(/^\/+/, '')
    .split('/')
    .pop()
    ?.replace(/\.[cm]?[tj]sx?$/, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '') ?? ''
}

const pluginFamilyAliases: Record<string, string> = {
  autocorrectnc: 'autocorrect',
  bigfileuploadenhanced: 'bigfileupload',
  boo: 'ghosted',
  cancelfriendrequestnc: 'cancelfriendrequest',
  classhighlighter: 'elementhighlighter',
  concatenatedmodules: 'concatenatedcomponentextractor',
  crashhandlerenhanced: 'crashhandler',
  deraculfollouser: 'followvoiceuser',
  followuserbt: 'followvoiceuser',
  followvoiceuserextand: 'followvoiceuser',
  grammar: 'polishwording',
  messageloggerenhanced: 'messagelogger',
  messagescheduler: 'messagescheduler',
  pendingfriendrequest: 'cancelfriendrequest',
  repeatmessage: 'repeatmessages',
  scheduledmessages: 'messagescheduler',
  timealog: 'timedelete',
  translateplus: 'translate',
  vcnarratorcustom: 'vcnarrator',
  viewrawvariant: 'viewraw',
}

const preferredPluginPaths: Record<string, string> = {
  bigfileupload: 'src/testcordplugins/BigFileUploadEnhanced',
  crashhandler: 'src/testcordplugins/crashHandlerEnhanched',
  enablestereo: 'src/testcordplugins/EnableStereo',
  followvoiceuser: 'src/testcordplugins/followVoiceUser-advanced',
  messagelogger: 'src/equicordplugins/messageLoggerEnhanced',
}

function getPluginFamilyKey(plugin: TestCordPlugin) {
  const name = normalizePluginName(plugin.name)
  const pathName = normalizePathName(plugin.filePath ?? plugin.dirName ?? '')
  return pluginFamilyAliases[name] ?? pluginFamilyAliases[pathName] ?? name
}

export function getPluginSource(plugin: TestCordPlugin) {
  const path = plugin.filePath ?? plugin.dirName ?? ''

  if (path.includes('src/testcordplugins')) return 'TestCord'
  if (path.includes('src/equicordplugins')) return 'Equicord'
  if (path.includes('src/plugins/_core') || plugin.dirName?.startsWith('_core')) return 'Vencord Core'
  if (path.includes('src/plugins')) return 'Vencord'
  return 'Unknown'
}

export function getPluginSourceUrl(plugin: TestCordPlugin) {
  const path = plugin.filePath ?? plugin.dirName
  if (!path) return repoUrl
  return `${repoUrl}/tree/main/${path.replace(/^\/+/, '')}`
}

export function getPluginRawSourceUrl(plugin: TestCordPlugin) {
  const path = plugin.filePath ?? plugin.dirName
  if (!path) return ''
  return `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${path.replace(/^\/+/, '')}`
}

export function getPluginRawSourceCandidates(plugin: TestCordPlugin) {
  const path = plugin.filePath ?? plugin.dirName
  if (!path) return []

  const cleanPath = path.replace(/^\/+/, '')
  const baseUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main`

  if (/\.[cm]?[tj]sx?$/.test(cleanPath)) {
    return [`${baseUrl}/${cleanPath}`]
  }

  return [
    `${baseUrl}/${cleanPath}/index.ts`,
    `${baseUrl}/${cleanPath}/index.tsx`,
    `${baseUrl}/${cleanPath}.ts`,
    `${baseUrl}/${cleanPath}.tsx`,
  ]
}

export function getPluginSourcePath(plugin: TestCordPlugin) {
  return plugin.filePath ?? plugin.dirName ?? ''
}

export function formatAuthors(plugin: TestCordPlugin) {
  const authors = plugin.authors?.map(author => author.name).filter(Boolean) ?? []
  return authors.length ? authors.join(', ') : 'Unknown'
}

export function formatRoundedPluginCount(count: number) {
  if (!count) return 'Live'
  const step = 50
  return `${Math.max(step, Math.floor(count / step) * step)}+`
}

export function dedupePlugins(plugins: TestCordPlugin[]) {
  return [...plugins.reduce<Map<string, TestCordPlugin[]>>((groups, plugin) => {
    const key = getPluginFamilyKey(plugin)
    groups.set(key, [...(groups.get(key) ?? []), plugin])
    return groups
  }, new Map()).values()].map(group => {
    if (group.length === 1) return group[0]

    const testCordPlugins = group.filter(plugin => getPluginSource(plugin) === 'TestCord')
    const candidates = testCordPlugins.length ? testCordPlugins : group
    const pluginName = getPluginFamilyKey(group[0])

    return candidates.toSorted((a, b) => {
      const aPath = a.filePath ?? a.dirName ?? ''
      const bPath = b.filePath ?? b.dirName ?? ''
      const preferredPath = preferredPluginPaths[pluginName]
      const aPreferred = Number(aPath === preferredPath)
      const bPreferred = Number(bPath === preferredPath)
      const aMatchesName = Number(normalizePathName(aPath) === pluginName)
      const bMatchesName = Number(normalizePathName(bPath) === pluginName)

      return (
        bPreferred - aPreferred ||
        bMatchesName - aMatchesName ||
        Number(Boolean(b.required)) - Number(Boolean(a.required)) ||
        Number(Boolean(b.enabledByDefault)) - Number(Boolean(a.enabledByDefault)) ||
        aPath.length - bPath.length ||
        aPath.localeCompare(bPath)
      )
    })[0]
  })
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function shortCommitMessage(message: string) {
  return message.split('\n')[0]?.trim() || 'Untitled commit'
}
