import { DevbuildSection } from '../components/home/DevbuildSection'
import { HeroSection } from '../components/home/HeroSection'
import { InfoCardsSection } from '../components/home/InfoCardsSection'
import { InstallSection } from '../components/home/InstallSection'
import { PluginIntroSection } from '../components/home/PluginIntroSection'
import { RecentCommitsSection } from '../components/home/RecentCommitsSection'
import { useLivePlugins } from '../hooks/useLivePlugins'
import { formatRoundedPluginCount } from '../lib/pluginUtils'

export function HomePage() {
  const { plugins } = useLivePlugins()
  const pluginCountDisplay = formatRoundedPluginCount(plugins.length)

  return (
    <main>
      <HeroSection pluginCountDisplay={pluginCountDisplay} />
      <PluginIntroSection pluginCountDisplay={pluginCountDisplay} />
      <RecentCommitsSection />
      <InstallSection />
      <DevbuildSection />
      <InfoCardsSection />
    </main>
  )
}
