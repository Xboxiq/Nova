import { Section, SectionHeader } from '../SectionHeader';

function Row({ token, children, style }: { token: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
      <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', width: 88, flex: 'none' }}>{token}</span>
      <span style={style}>{children}</span>
    </div>
  );
}

export function Typography() {
  return (
    <Section label="Typography">
      <SectionHeader eyebrow="02 · FOUNDATIONS" title="Type: bilingual by birth">
        Instrument Sans for Latin, IBM Plex Sans Arabic for Arabic — one stack, the browser resolves the script. Arabic gets +10% line-height and zero negative tracking.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20, alignItems: 'start' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 28, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Row token="display 60" style={{ fontSize: 44, lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.03em' }}>Calm by default</Row>
          <Row token="h1 40" style={{ fontSize: 32, lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.02em' }}>Page titles set the tone</Row>
          <Row token="h3 22" style={{ fontSize: 22, lineHeight: '30px', fontWeight: 600, letterSpacing: '-0.01em' }}>Card titles carry hierarchy</Row>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
            <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', width: 88, flex: 'none' }}>body 15.5</span>
            <span style={{ fontSize: 15.5, lineHeight: '24px', color: 'var(--text-2)', maxWidth: '46ch' }}>Body copy stays under sixty-five characters per line, wraps pretty, and never center-aligns past two lines.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
            <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', width: 88, flex: 'none' }}>mono tnum</span>
            <span style={{ fontSize: 15.5, fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>1,284.06 SAR · 03:47:12</span>
          </div>
        </div>
        <div dir="rtl" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div dir="ltr" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--accent)' }}>RTL · ARABIC</div>
          <div style={{ fontSize: 34, lineHeight: 1.25, fontWeight: 600 }}>إنتاجية هادئة لعقولٍ مركّزة</div>
          <p style={{ fontSize: 15.5, lineHeight: '27px', color: 'var(--text-2)', margin: 0 }}>
            النص العربي يحصل على ارتفاع سطر أعلى بعشرة بالمئة، ولا يُسمح بأي تقارب سالب بين الحروف. الأرقام في الجداول تبقى غربية للوضوح.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="i-lift" style={{ height: 40, padding: '0 20px', borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>ابدأ الآن</button>
            <button className="i-soft" style={{ height: 40, padding: '0 18px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>اعرف المزيد</button>
          </div>
        </div>
      </div>
    </Section>
  );
}
