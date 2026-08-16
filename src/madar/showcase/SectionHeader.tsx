import type { ReactNode } from 'react';

export function SectionHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--accent-ink)' }}>{eyebrow}</div>
      <h2 style={{ fontSize: 30, lineHeight: '38px', fontWeight: 600, letterSpacing: '-0.015em', margin: '10px 0 8px' }}>{title}</h2>
      <p style={{ fontSize: 15.5, lineHeight: '24px', color: 'var(--text-2)', maxWidth: 640, margin: '0 0 28px' }}>{children}</p>
    </>
  );
}

export function Section({ label, maxWidth = 1160, padding = '88px 32px 0', children }: { label: string; maxWidth?: number; padding?: string; children: ReactNode }) {
  return (
    <section data-screen-label={label} style={{ maxWidth, margin: '0 auto', padding }}>
      {children}
    </section>
  );
}
