import { Section, SectionHeader } from '../SectionHeader';

function Swatch({ token, desc, css }: { token: string; desc: string; css: React.CSSProperties }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 10, }}>
      <div style={{ height: 56, borderRadius: 6, border: '1px solid var(--border)', ...css }} />
      <div style={{ padding: '10px 6px 4px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{token}</div>
        <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{desc}</div>
      </div>
    </div>
  );
}

function StatusChip({ token, label }: { token: string; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 6, background: `var(--${token}-soft)`, color: `var(--${token})`, fontSize: 13, fontWeight: 600 }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${token})` }} />{label}
    </span>
  );
}

export function ColorTokens() {
  return (
    <Section label="Color tokens">
      <SectionHeader eyebrow="01 · FOUNDATIONS" title="Color tokens">
        Semantic tokens only — swap the theme above and every swatch below recolors itself. Canvas is always tinted, never pure white or black.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 14 }}>
        <Swatch token="--bg" desc="Page canvas" css={{ background: 'var(--bg)' }} />
        <Swatch token="--bg-deep" desc="Sidebars · wells" css={{ background: 'var(--bg-deep)' }} />
        <Swatch token="--surface" desc="Cards · sheets" css={{ background: 'var(--surface)' }} />
        <Swatch token="--surface-2" desc="Inputs · nesting" css={{ background: 'var(--surface-2)' }} />
        <Swatch token="--accent" desc="Meaning, not noise" css={{ background: 'var(--accent)', border: 'none' }} />
        <Swatch token="--accent-soft" desc="Chips · hovers" css={{ background: 'var(--accent-soft)', border: 'none' }} />
        <Swatch token="--ink" desc="Primary actions" css={{ background: 'var(--ink)', border: 'none' }} />
        <Swatch token="--text" desc="Never 100% black" css={{ background: 'var(--text)', border: 'none' }} />
        <Swatch token="--text-2" desc="Secondary copy" css={{ background: 'var(--text-2)', border: 'none' }} />
        <Swatch token="--border" desc="1px hairlines" css={{ background: 'repeating-linear-gradient(90deg, var(--border) 0 8px, transparent 8px 16px)' }} />
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
        <StatusChip token="success" label="Success" />
        <StatusChip token="warning" label="Warning" />
        <StatusChip token="danger" label="Danger" />
        <StatusChip token="info" label="Info" />
      </div>
    </Section>
  );
}
