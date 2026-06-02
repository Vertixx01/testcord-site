import { DevbuildSection } from '../components/home/DevbuildSection'
import { HeroSection } from '../components/home/HeroSection'
import { InfoCardsSection } from '../components/home/InfoCardsSection'
import { InstallSection } from '../components/home/InstallSection'
import { PluginIntroSection } from '../components/home/PluginIntroSection'
import { RecentCommitsSection } from '../components/home/RecentCommitsSection'

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <PluginIntroSection />
      <RecentCommitsSection />
      <InstallSection />
      <DevbuildSection />
      <InfoCardsSection />
    </main>
  )
}
