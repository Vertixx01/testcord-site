import type { CSSProperties } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const testCordSyntaxTheme = {
  'pre[class*="language-"]': {
    background: 'transparent',
    color: '#f7ead0',
    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '0.875rem',
    lineHeight: 1.65,
    margin: 0,
    padding: 0,
    textShadow: 'none',
    whiteSpace: 'pre',
  },
  'code[class*="language-"]': {
    background: 'transparent',
    color: '#f7ead0',
    fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    fontSize: '0.875rem',
    lineHeight: 1.65,
    textShadow: 'none',
    whiteSpace: 'pre',
  },
  comment: { color: '#89795d' },
  prolog: { color: '#89795d' },
  doctype: { color: '#89795d' },
  cdata: { color: '#89795d' },
  punctuation: { color: '#c9b184' },
  property: { color: '#f5a65b' },
  tag: { color: '#f5a65b' },
  boolean: { color: '#94d37b' },
  number: { color: '#94d37b' },
  constant: { color: '#94d37b' },
  symbol: { color: '#94d37b' },
  deleted: { color: '#ff8c72' },
  selector: { color: '#f6d77b' },
  'attr-name': { color: '#f6d77b' },
  string: { color: '#f6d77b' },
  char: { color: '#f6d77b' },
  builtin: { color: '#f6d77b' },
  inserted: { color: '#94d37b' },
  operator: { color: '#d2b894' },
  entity: { color: '#d2b894' },
  url: { color: '#d2b894' },
  variable: { color: '#ffb46d' },
  atrule: { color: '#ffb46d' },
  'attr-value': { color: '#ffb46d' },
  function: { color: '#ffb46d' },
  'class-name': { color: '#f7ead0' },
  keyword: { color: '#7fd78a' },
  regex: { color: '#f5a65b' },
  important: { color: '#f5a65b', fontWeight: 700 },
} satisfies Record<string, CSSProperties>

type SyntaxCodeBlockProps = {
  children: string
  className?: string
  language?: 'bash' | 'typescript'
  showLineNumbers?: boolean
}

export function SyntaxCodeBlock({
  children,
  className = '',
  language = 'bash',
  showLineNumbers = language === 'typescript',
}: SyntaxCodeBlockProps) {
  return (
    <div className={`max-w-full overflow-hidden rounded-2xl bg-ink-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07),0_16px_36px_rgba(0,0,0,0.22)] ${className}`}>
      <div className="flex min-h-10 items-center justify-between border-b border-white/[0.06] px-4">
        <span className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-gold-200">{language === 'typescript' ? 'TypeScript' : 'Terminal'}</span>
        <span className="h-2 w-2 rounded-full bg-ember-500 shadow-[0_0_18px_rgba(222,102,0,0.75)]" aria-hidden="true" />
      </div>
      <SyntaxHighlighter
        className="max-w-full overflow-x-auto p-4"
        codeTagProps={{ className: 'block min-w-max' }}
        customStyle={{
          background: 'transparent',
          margin: 0,
          maxHeight: 'inherit',
          maxWidth: '100%',
          overflowX: 'auto',
          padding: '1rem',
        }}
        language={language}
        showLineNumbers={showLineNumbers}
        style={testCordSyntaxTheme}
        wrapLongLines={false}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
