export type Platform = 'Windows' | 'macOS' | 'Linux'

export type PlatformInstaller = {
  href: string
  label: string
}

export type SortMode = 'name' | 'source' | 'author' | 'commands' | 'patches' | 'required' | 'default' | 'modified' | 'tags'

export type PluginAuthor = {
  id?: string
  name: string
}

export type TestCordPlugin = {
  authors?: PluginAuthor[]
  commands?: { description?: string; name: string }[]
  description?: string
  dirName?: string
  enabledByDefault?: boolean
  filePath?: string
  hasCommands?: boolean
  hasPatches?: boolean
  isModified?: boolean
  name: string
  required?: boolean
  tags?: string[]
  target?: string
}

export type RecentCommit = {
  author?: {
    avatar_url?: string
    html_url?: string
    login?: string
  } | null
  commit: {
    author: {
      date: string
      name: string
    }
    message: string
  }
  html_url: string
  sha: string
}

export type RepoBranch = {
  commit: {
    sha: string
    url: string
  }
  name: string
}
