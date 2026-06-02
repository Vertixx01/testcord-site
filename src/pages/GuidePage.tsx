import type { ReactNode } from 'react'
import { ArrowUpRight, Check, Code2, Download, PlugZap, ShieldAlert, Terminal } from 'lucide-react'
import { discordUrl, readmeUrl, repoUrl, windowsInstallerUrl } from '../lib/constants'
import { SyntaxCodeBlock } from '../components/shared/SyntaxCodeBlock'

const installSteps = [
  {
    title: '1. Pick an install path',
    body: 'Windows users can use the CLI installer. macOS does not currently have an installer in the README. Linux packaging is still in progress, so source/devbuild is the realistic path.',
    command: null,
  },
  {
    title: '2. Install the source dependencies',
    body: 'For a devbuild, install Git, Node.js LTS, and pnpm. The README warns that the global pnpm install may need admin/root, but later TestCord commands should not run from an admin/root terminal.',
    command: 'npm i -g pnpm',
  },
  {
    title: '3. Clone TestCord',
    body: 'Clone the main repository and move into it before installing packages.',
    command: 'git clone https://github.com/x2b1/TestCord\ncd TestCord',
  },
  {
    title: '4. Install, build, and inject',
    body: 'Install dependencies with the frozen lockfile, build the desktop/web bundles, then inject TestCord into your Discord desktop client.',
    command: 'pnpm install --frozen-lockfile\npnpm build\npnpm inject',
  },
]

const usageTips = [
  'Open Discord after injection and look for the Vencord/TestCord settings area.',
  'Use the plugin search to find a plugin by name, tag, command, author, or description.',
  'Plugins with patches usually need a Discord restart after toggling.',
  'Riskier plugins should be treated carefully. The README explicitly warns custom clients violate Discord Terms of Service.',
  'If something breaks, disable the most recent plugin first, then run a repair/uninject flow from source if needed.',
]

const pluginChecklist = [
  'Create a folder under src/testcordplugins/<pluginName>/',
  'Export default definePlugin({ ... }) from index.ts or index.tsx',
  'Set name, description, tags, and authors',
  'Use TestcordDevs if the author exists in src/utils/constants.ts',
  'Add settings with definePluginSettings when users need options',
  'Use commands for slash-command style behavior',
  'Use patches only when you need to change Discord bundled modules',
  'Run pnpm generatePluginJson to validate plugin metadata',
  'Run pnpm build or pnpm dev before injecting/testing',
]

function CodeBlock({ children, language = 'bash' }: { children: string; language?: 'bash' | 'typescript' }) {
  return <SyntaxCodeBlock className="mt-4" language={language}>{children}</SyntaxCodeBlock>
}

function SectionCard({
  children,
  icon,
  id,
  eyebrow,
  title,
}: {
  children: ReactNode
  eyebrow: string
  icon: ReactNode
  id: string
  title: string
}) {
  return (
    <section className="min-w-0 scroll-mt-24 rounded-[28px] bg-ink-900 p-5 shadow-panel sm:p-7" id={id}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ember-500 text-ink-950 shadow-[0_14px_30px_rgba(222,102,0,0.25)]">
          {icon}
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gold-200">{eyebrow}</p>
          <h2 className="balance mt-1 font-display text-3xl font-black tracking-[-0.03em] text-cream-50 sm:text-4xl">{title}</h2>
        </div>
      </div>
      <div className="mt-7 min-w-0">{children}</div>
    </section>
  )
}

export function GuidePage() {
  return (
    <main>
      <section className="border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-gold-200">TestCord guide</p>
          <h1 className="balance mt-3 max-w-4xl font-display text-5xl font-black tracking-[-0.05em] text-cream-50 sm:text-7xl">
            Install it, use it, build plugins for it.
          </h1>
          <p className="pretty mt-6 max-w-3xl text-lg leading-8 text-cream-400">
            A practical guide for TestCord users and plugin makers, based on the current README and the plugin structure in `src/testcordplugins`.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ember-500 px-6 text-sm font-black text-ink-950 transition-[background-color,transform] duration-200 hover:bg-ember-400 active:scale-[0.96]"
              href={windowsInstallerUrl}
            >
              Download Windows CLI
              <Download className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink-900 px-6 text-sm font-black text-cream-100 shadow-panel transition-[background-color,transform] duration-200 hover:bg-ink-800 active:scale-[0.96]"
              href={repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open repository
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="top-24 min-w-0 h-fit rounded-[24px] bg-ink-900 p-4 shadow-panel lg:sticky">
          <p className="px-2 text-xs font-black uppercase tracking-[0.18em] text-cream-500">On this page</p>
          <nav className="mt-3 grid gap-1 text-sm font-bold text-cream-400">
            {[
              ['Install TestCord', '#installing'],
              ['Use plugins', '#using-plugins'],
              ['Make plugins', '#making-plugins'],
              ['Safety notes', '#safety'],
            ].map(([label, href]) => (
              <a key={href} className="min-h-10 rounded-xl px-2 py-2 transition-colors duration-150 hover:bg-ink-800 hover:text-cream-100" href={href}>
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="grid min-w-0 gap-6">
          <SectionCard eyebrow="Installation" icon={<Download className="h-6 w-6" aria-hidden="true" />} id="installing" title="Install TestCord">
            <div className="grid gap-4">
              {installSteps.map(step => (
                <article key={step.title} className="min-w-0 rounded-2xl bg-ink-950 p-4">
                  <h3 className="font-display text-xl font-black text-cream-50">{step.title}</h3>
                  <p className="pretty mt-2 text-sm leading-6 text-cream-400">{step.body}</p>
                  {step.command && <CodeBlock>{step.command}</CodeBlock>}
                </article>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-cream-100 p-4 text-ink-950">
              <p className="font-black">Web extension build</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-ink-700">
                Use `pnpm buildWeb`, then install the generated ZIP from `dist` through your browser's custom-extension flow. Firefox ZIPs require Firefox Developer Edition per the README.
              </p>
              <CodeBlock>{'pnpm buildWeb'}</CodeBlock>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Daily use" icon={<PlugZap className="h-6 w-6" aria-hidden="true" />} id="using-plugins" title="Use TestCord plugins">
            <div className="grid gap-3">
              {usageTips.map(tip => (
                <div key={tip} className="flex gap-3 rounded-2xl bg-ink-950 p-4 text-sm font-bold leading-6 text-cream-300">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                  <p>{tip}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream-100 px-4 text-sm font-black text-ink-950 transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.96]" href="/plugins">
                Browse live plugin list
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-950 px-4 text-sm font-black text-cream-100 transition-[background-color,transform] duration-200 hover:bg-ink-800 active:scale-[0.96]" href={discordUrl} target="_blank" rel="noreferrer">
                Ask in Discord
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Development" icon={<Code2 className="h-6 w-6" aria-hidden="true" />} id="making-plugins" title="Make plugins for TestCord">
            <p className="pretty text-sm leading-6 text-cream-400">
              TestCord plugins follow the Vencord-style `definePlugin` contract. The generated plugin list reads metadata from each plugin's entry file, so keep name, description, authors, tags, commands, and patches easy to parse.
            </p>

            <div className="mt-5 grid gap-3">
              {pluginChecklist.map(item => (
                <div key={item} className="flex gap-3 rounded-2xl bg-ink-950 p-4 text-sm font-bold leading-6 text-cream-300">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-7 font-display text-2xl font-black text-cream-50">Minimal plugin skeleton</h3>
            <CodeBlock language="typescript">{`import { TestcordDevs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "MyPlugin",
    description: "Explain what your plugin does in one clear sentence.",
    tags: ["Utility"],
    authors: [TestcordDevs.x2b],

    start() {
        console.log("MyPlugin started");
    },

    stop() {
        console.log("MyPlugin stopped");
    }
});`}</CodeBlock>

            <h3 className="mt-7 font-display text-2xl font-black text-cream-50">Settings and commands pattern</h3>
            <CodeBlock language="typescript">{`import { ApplicationCommandInputType } from "@api/Commands";
import { definePluginSettings } from "@api/Settings";
import { TestcordDevs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";

const settings = definePluginSettings({
    enabledMessage: {
        type: OptionType.STRING,
        description: "Message used by the command",
        default: "Hello from TestCord"
    }
});

export default definePlugin({
    name: "MyCommandPlugin",
    description: "Adds a small command with user settings.",
    tags: ["Commands", "Utility"],
    authors: [TestcordDevs.x2b],
    settings,
    commands: [{
        name: "mycommand",
        description: "Run my TestCord command",
        inputType: ApplicationCommandInputType.BUILT_IN,
        execute: () => console.log(settings.store.enabledMessage)
    }]
});`}</CodeBlock>

            <h3 className="mt-7 font-display text-2xl font-black text-cream-50">Validate before shipping</h3>
            <CodeBlock>{`pnpm generatePluginJson
pnpm build
pnpm inject`}</CodeBlock>
          </SectionCard>

          <SectionCard eyebrow="Safety" icon={<ShieldAlert className="h-6 w-6" aria-hidden="true" />} id="safety" title="Know the risk">
            <p className="pretty text-sm leading-6 text-cream-400">
              The README says using TestCord, Equicord, or Vencord violates Discord's Terms of Service. Treat custom clients and especially risky automation plugins with care. If a plugin sends bulk messages, bypasses limits, handles tokens, or changes account behavior, test cautiously and understand what it does before enabling it.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream-100 px-4 text-sm font-black text-ink-950 transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.96]" href={readmeUrl} target="_blank" rel="noreferrer">
                Read upstream README
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-950 px-4 text-sm font-black text-cream-100 transition-[background-color,transform] duration-200 hover:bg-ink-800 active:scale-[0.96]" href={repoUrl} target="_blank" rel="noreferrer">
                Inspect source
                <Terminal className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </SectionCard>
        </div>
      </div>
    </main>
  )
}
