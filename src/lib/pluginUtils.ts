import { repoUrl } from './constants'
import type { TestCordPlugin } from './types'

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
  return `https://raw.githubusercontent.com/x2b1/TestCord/main/${path.replace(/^\/+/, '')}`
}

export function getPluginRawSourceCandidates(plugin: TestCordPlugin) {
  const path = plugin.filePath ?? plugin.dirName
  if (!path) return []

  const cleanPath = path.replace(/^\/+/, '')
  const baseUrl = 'https://raw.githubusercontent.com/x2b1/TestCord/main'

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

export function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function shortCommitMessage(message: string) {
  return message.split('\n')[0]?.trim() || 'Untitled commit'
}
