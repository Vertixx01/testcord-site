import type { Platform } from '../../lib/types'
import { platformNotes } from '../../lib/constants'

export function PlatformSwitch({
  platform,
  setPlatform,
}: {
  platform: Platform
  setPlatform: (platform: Platform) => void
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {(Object.keys(platformNotes) as Platform[]).map((item) => {
        const selected = platform === item

        return (
          <button
            key={item}
            type="button"
            onClick={() => setPlatform(item)}
            className={`min-h-12 rounded-2xl px-4 text-left text-sm font-black transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.96] ${
              selected
                ? 'bg-cream-100 text-ink-950 shadow-[0_16px_32px_rgba(0,0,0,0.2)]'
                : 'bg-ink-900 text-cream-400 shadow-panel hover:bg-ink-800 hover:text-cream-100'
            }`}
            aria-pressed={selected}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}
