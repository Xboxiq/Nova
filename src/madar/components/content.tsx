import { useState } from 'react';
import { SPRING } from './physics';

/* ────────────────────────────────────────────────────────────────────────
   Content surfaces & marketing blocks — Jahez pattern library + Icons &
   Cards Lab (pricing, cards, lists, footers, pickers, layout systems).
──────────────────────────────────────────────────────────────────────── */

const NOISE_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`;

export interface PricePlan { name: string; price: string; period?: string; note?: string; }

/* ── SplitCard — image column zooms slightly on hover, link nudges. */
export function SplitCard({ media, title, text, linkLabel = 'اقرأ المزيد' }: { media: React.ReactNode; title: React.ReactNode; text: React.ReactNode; linkLabel?: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} tabIndex={0} onFocus={() => setHov(true)} onBlur={() => setHov(false)} style={{ display: 'grid', gridTemplateColumns: '110px 1fr', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '100%', minHeight: 110, transform: hov ? 'scale(1.07)' : 'scale(1)', transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1)' }}>{media}</div>
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 14.5, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: '19px', marginTop: 4, flex: 1 }}>{text}</div>
        <span className="i-chevron" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 700, color: 'var(--accent)', marginTop: 8, transform: hov ? 'translateX(3px)' : 'none', transition: 'transform 260ms' }}>
          {linkLabel}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d="M9 6l6 6-6 6" /></svg>
        </span>
      </div>
    </div>
  );
}

/* ── GradientMeshCard — animated mesh + fractalNoise grain + inner glow
      border. Max ONE KPI per admin screen. */
export function GradientMeshCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 6, overflow: 'hidden', color: '#fff', padding: 22,
      background: [
        'radial-gradient(80% 90% at 15% 15%, color-mix(in srgb, var(--accent) 85%, #fff) 0%, transparent 60%)',
        'radial-gradient(80% 90% at 85% 80%, color-mix(in srgb, var(--accent) 55%, var(--info)) 0%, transparent 62%)',
      ].join(', ') + ', oklch(from var(--accent) calc(l - 0.22) c h)',
      backgroundSize: '170% 170%, 160% 160%, auto', animation: 'meshDrift 12s ease-in-out infinite',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.22)',
    }}>
      <span aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: NOISE_URI, mixBlendMode: 'overlay', opacity: 0.5 }} />
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}

/* ── PinnedNote — tilted cork-board card with a top pin. */
export function PinnedNote({ children, tilt = -2 }: { children: React.ReactNode; tilt?: number }) {
  return (
    <div style={{ position: 'relative', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px 6px 6px 6px', padding: '30px 18px 16px', transform: `rotate(${tilt}deg)` }}>
      <span style={{ position: 'absolute', top: -9, left: '50%', marginLeft: -9, width: 18, height: 18, borderRadius: '50%', background: 'var(--accent)', boxShadow: 'inset 0 -2px 3px rgba(0,0,0,0.25)', }} />
      {children}
    </div>
  );
}

/* ── WorkflowSteps — stage cards joined vertically with a wait-time
      capsule floating on the connector. */
export interface WorkflowStage { title: React.ReactNode; meta?: React.ReactNode; wait?: string; }

export function WorkflowSteps({ stages }: { stages: WorkflowStage[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      {stages.map((s, i) => (
        <div key={i}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', }}>
            <span style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800, flex: 'none', fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>
            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600 }}>{s.title}</span>
            {s.meta && <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{s.meta}</span>}
          </div>
          {i < stages.length - 1 && (
            <div style={{ position: 'relative', height: 34, display: 'grid', placeItems: 'center' }}>
              <span style={{ position: 'absolute', insetBlock: 0, width: 2, background: 'var(--border)', borderRadius: 2 }} />
              {s.wait && <span style={{ position: 'relative', padding: '3px 10px', borderRadius: 6, background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: 10.5, fontWeight: 700, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>{s.wait}</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── OnboardingChecklist — "get started" card: connected steps, current
      highlighted, plan/progress footer. */
export function OnboardingChecklist({ title, steps, current, footer }: { title: React.ReactNode; steps: string[]; current: number; footer?: React.ReactNode }) {
  return (
    <div style={{ borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden' }}>
      <div style={{ padding: '16px 18px 6px', fontSize: 15, fontWeight: 700 }}>{title}</div>
      <div style={{ padding: '8px 18px 16px' }}>
        {steps.map((s, i) => {
          const done = i < current, active = i === current;
          return (
            <div key={s} style={{ display: 'flex', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', flex: 'none', display: 'grid', placeItems: 'center', background: done ? 'var(--success)' : active ? 'var(--accent)' : 'var(--surface-2)', border: done || active ? 'none' : '1.5px solid var(--border-strong)', boxShadow: active ? '0 0 0 4px var(--accent-soft)' : 'none' }}>
                  {done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>}
                  {active && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--on-accent)' }} />}
                </span>
                {i < steps.length - 1 && <span style={{ width: 2, height: 18, background: done ? 'var(--success)' : 'var(--border)', borderRadius: 2 }} />}
              </div>
              <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: done ? 'var(--text-3)' : active ? 'var(--text)' : 'var(--text-2)', textDecoration: done ? 'line-through' : 'none', paddingTop: 1 }}>{s}</span>
            </div>
          );
        })}
      </div>
      {footer && <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border)', background: 'var(--bg-deep)', fontSize: 12, color: 'var(--text-2)' }}>{footer}</div>}
    </div>
  );
}

/* ── ChecklistRow — a check seal or a warning triangle beside text.

   anti-slop-ui #16 and #25 ban a checkmark used as a bullet in a feature list.
   This is not that: `ok` is a real boolean and the false branch draws a warning
   triangle, so the glyph reports which of two states the row is in. A bullet
   would be the same mark on every row, saying nothing. The ruling is recorded in
   design-system/ANTI-SLOP-30.md and kept here beside the code it governs. */
export function ChecklistRow({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', fontSize: 13.5 }}>
      {ok
        ? <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--success-soft)', display: 'grid', placeItems: 'center', flex: 'none' }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></span>
        : <span style={{ width: 20, height: 20, borderRadius: 6, background: 'var(--warning-soft)', display: 'grid', placeItems: 'center', flex: 'none' }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 16.5v.5M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg></span>}
      <span style={{ color: ok ? 'var(--text)' : 'var(--text-2)' }}>{children}</span>
    </div>
  );
}

/* ── NumberedFeatures — huge faded serif-ish numerals beside short copy. */
export function NumberedFeatures({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {items.map((it, i) => (
        <div key={it.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 40, fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums', color: 'color-mix(in srgb, var(--accent) 30%, transparent)', letterSpacing: '-0.02em', flex: 'none', width: 56 }}>{String(i + 1).padStart(2, '0')}</span>
          <span>
            <span style={{ display: 'block', fontSize: 14.5, fontWeight: 600 }}>{it.title}</span>
            <span style={{ display: 'block', fontSize: 13, color: 'var(--text-2)', lineHeight: '19px', marginTop: 2 }}>{it.text}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── BigStatRow — huge mono numbers + labels, hairline separated. */
export function BigStatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      {stats.map((s, i) => (
        <div key={s.label} style={{ flex: 1, textAlign: 'center', padding: '6px 12px', borderInlineStart: i ? '1px solid var(--border)' : 'none' }}>
          <div style={{ fontSize: 30, fontWeight: 700, fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }} dir="ltr">{s.value}</div>
          <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-3)', marginTop: 4 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── HeadlineChip — a colored chip living inside the big headline text. */
export function HeadlineChip({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, verticalAlign: 'middle', padding: '0.08em 0.5em', borderRadius: 6, background: 'var(--accent)', color: 'var(--on-accent)', fontSize: '0.62em', fontWeight: 700, transform: 'translateY(-0.06em)' }}>
      {icon}{children}
    </span>
  );
}

/* ── ConfigRow — start-aligned label, end-aligned value capsule. */
export function ConfigRow({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 13.5 }}>
      <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>{label}</span>
      <span style={{ padding: '4px 12px', borderRadius: 6, background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: 12.5, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
    </div>
  );
}

/* ── FooterNewsletter — link columns + a capture row at the bottom. */
export function FooterNewsletter({ columns, note }: { columns: { title: string; links: string[] }[]; note?: React.ReactNode }) {
  return (
    <footer style={{ borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', padding: '26px 26px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(130px,1fr))`, gap: 20 }}>
        {columns.map((c) => (
          <div key={c.title}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-3)', marginBottom: 10 }}>{c.title}</div>
            {c.links.map((l) => <a key={l} href="#" className="i-text" style={{ display: 'block', fontSize: 13.5, color: 'var(--text-2)', textDecoration: 'none', padding: '4px 0', transition: 'color 160ms' }}>{l}</a>)}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
        <input placeholder="بريدك للنشرة الشهرية" className="i-input" style={{ flex: 1, minWidth: 200, height: 42, borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface-2)', color: 'var(--text)', padding: '0 16px', fontFamily: 'inherit', fontSize: 13.5 }} />
        <button className="i-lift i-press-97" style={{ height: 42, padding: '0 20px', borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>اشتراك</button>
        {note && <span style={{ width: '100%', fontSize: 11.5, color: 'var(--text-3)' }}>{note}</span>}
      </div>
    </footer>
  );
}

export function MasonryColumns({ children, columns = 3, gap = 14 }: { children: React.ReactNode; columns?: number; gap?: number }) {
  return <div style={{ columnCount: columns, columnGap: gap }}>{children}</div>;
}
export function MasonryItem({ children }: { children: React.ReactNode }) {
  return <div style={{ breakInside: 'avoid', marginBottom: 14, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', padding: 16 }}>{children}</div>;
}

/* ── IconClusterNetwork — SVG lines from a fixed hub to each node. */
export function IconClusterNetwork({ nodes, size = 190 }: { nodes: React.ReactNode[]; size?: number }) {
  const c = size / 2;
  const r = size / 2 - 26;
  const pos = nodes.map((_, i) => {
    const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    return [c + Math.cos(a) * r, c + Math.sin(a) * r] as const;
  });
  return (
    <span style={{ position: 'relative', width: size, height: size, display: 'inline-block' }}>
      <svg width={size} height={size} style={{ position: 'absolute', inset: 0 }}>
        {pos.map(([x, y], i) => <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="3 4" />)}
      </svg>
      {pos.map(([x, y], i) => (
        <span key={i} style={{ position: 'absolute', left: x - 17, top: y - 17, width: 34, height: 34, borderRadius: 6, background: 'var(--surface)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', color: 'var(--text-2)' }}>{nodes[i]}</span>
      ))}
      <span style={{ position: 'absolute', left: c - 23, top: c - 23, width: 46, height: 46, borderRadius: 6, background: 'var(--accent)', color: 'var(--on-accent)', display: 'grid', placeItems: 'center', }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /></svg>
      </span>
    </span>
  );
}

/* ── TimeField — segmented hh/mm boxes with arrow stepping + wrap. */
export function TimeField({ defaultHour = 16, defaultMinute = 30 }: { defaultHour?: number; defaultMinute?: number }) {
  const [h, setH] = useState(defaultHour);
  const [m, setM] = useState(defaultMinute);
  const Seg = ({ value, set, max }: { value: number; set: (n: number) => void; max: number }) => (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <button aria-label="Up" onClick={() => set((value + 1) % (max + 1))} className="i-soft-text" style={{ width: 40, height: 20, border: 'none', background: 'none', color: 'var(--text-3)', cursor: 'pointer', borderRadius: 6, display: 'grid', placeItems: 'center' }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg></button>
      <span style={{ width: 48, height: 46, borderRadius: 6, background: 'var(--surface-2)', border: '1px solid var(--border-strong)', display: 'grid', placeItems: 'center', fontSize: 19, fontWeight: 700, fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>{String(value).padStart(2, '0')}</span>
      <button aria-label="Down" onClick={() => set((value - 1 + max + 1) % (max + 1))} className="i-soft-text" style={{ width: 40, height: 20, border: 'none', background: 'none', color: 'var(--text-3)', cursor: 'pointer', borderRadius: 6, display: 'grid', placeItems: 'center' }}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg></button>
    </span>
  );
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }} dir="ltr">
      <Seg value={h} set={setH} max={23} />
      <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-3)' }}>:</span>
      <Seg value={m} set={setM} max={59} />
    </span>
  );
}

/* ── ColorPicker — iOS-style: preview + hue slider + swatch grid with
      scale + colored ring on select. */
const SWATCHES = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#00C7BE', '#30B0C7', '#007AFF', '#5856D6', '#AF52DE', '#FF2D55'];

export function ColorPicker({ onChange }: { onChange?: (color: string) => void }) {
  const [sel, setSel] = useState(6);
  const [hue, setHue] = useState(210);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 42, height: 42, borderRadius: 6, background: SWATCHES[sel], boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)' }} />
        <div style={{ flex: 1 }}>
          <input
            type="range" min={0} max={360} value={hue} aria-label="Hue"
            onChange={(e) => setHue(Number(e.target.value))}
            /* a hue slider's track is the colour circle itself: its six primaries, not neon accents */
            /* anti-slop-ignore-next-line 29 */
            style={{ width: '100%', height: 12, borderRadius: 6, appearance: 'none', WebkitAppearance: 'none', background: 'linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)', outline: 'none', cursor: 'pointer' }}
          />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 7 }}>
        {SWATCHES.map((c, i) => (
          <button
            key={c} aria-label={c}
            onClick={() => { setSel(i); onChange?.(c); }}
            style={{ aspectRatio: '1', borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer', background: c, transform: sel === i ? 'scale(1.22)' : 'scale(1)', boxShadow: sel === i ? `0 0 0 2px var(--surface), 0 0 0 4.5px ${c}` : 'none', transition: `transform 300ms ${SPRING}, box-shadow 200ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── CURATED_GRADIENTS — the only legal gradient sources (§17.7): named
      2-hue pairs within ±20-28° of a base hue. */
export const CURATED_GRADIENTS = [
  { name: 'Sunset Punch', css: 'linear-gradient(135deg, #FF8A4A, #E0447F)' },
  { name: 'Arctic Mint', css: 'linear-gradient(135deg, #58D5C9, #4FA3FF)' },
  { name: 'Royal Velvet', css: 'linear-gradient(135deg, #7C4DFF, #B287FF)' },
  { name: 'Desert Dawn', css: 'linear-gradient(135deg, #FFC49B, #FF8A4A)' },
  { name: 'Deep Lagoon', css: 'linear-gradient(135deg, #1670E0, #00B3A4)' },
  { name: 'Rose Quartz', css: 'linear-gradient(135deg, #FF9DC6, #B287FF)' },
  { name: 'Ember Glow', css: 'linear-gradient(135deg, #F36A1F, #E0447F)' },
  { name: 'Sage Field', css: 'linear-gradient(135deg, #2DCB7E, #58D5C9)' },
] as const;

export function GradientPaletteGrid() {
  const [copied, setCopied] = useState(-1);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
      {CURATED_GRADIENTS.map((g, i) => (
        <button
          key={g.name}
          onClick={async () => { try { await navigator.clipboard.writeText(`background: ${g.css};`); } catch { /* blocked */ } setCopied(i); setTimeout(() => setCopied(-1), 1200); }}
          className="i-lift"
          style={{ border: 'none', padding: 0, cursor: 'pointer', borderRadius: 6, overflow: 'hidden', background: 'var(--surface)', transition: 'transform 220ms', textAlign: 'center' }}
        >
          <span style={{ display: 'block', height: 44, background: g.css }} />
          <span style={{ display: 'block', fontSize: 10, fontWeight: 700, padding: '5px 4px', color: copied === i ? 'var(--accent)' : 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>{copied === i ? 'COPIED' : g.name}</span>
        </button>
      ))}
    </div>
  );
}

/* ── DuotoneImage — two-color any imagery: luminosity + screen layers. */
export function DuotoneImage({ children, tint = 'var(--accent)' }: { children: React.ReactNode; tint?: string }) {
  return (
    <span style={{ position: 'relative', display: 'block', borderRadius: 6, overflow: 'hidden' }}>
      {children}
      <span aria-hidden style={{ position: 'absolute', inset: 0, background: 'var(--ink)', mixBlendMode: 'saturation' }} />
      <span aria-hidden style={{ position: 'absolute', inset: 0, background: tint, mixBlendMode: 'screen', opacity: 0.55 }} />
    </span>
  );
}

/* ── IconMarquee — duplicated list loops via translateX(-50%), edge fades,
      zero JS. ≥40s per loop. */
export function IconMarquee({ children, seconds = 42 }: { children: React.ReactNode[]; seconds?: number }) {
  return (
    <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}>
      <div style={{ display: 'flex', gap: 14, width: 'max-content', animation: `marqueeX ${seconds}s linear infinite` }}>
        {children}{children}
      </div>
    </div>
  );
}

/* ── FileCard — folded colored corner by format (PDF red, XLS green…). */
const FILE_TONES: Record<string, string> = { PDF: '#E5484D', DOC: '#3E82F7', XLS: '#2DCB7E', FIG: '#B287FF', ZIP: '#F5A623' };

export function FileCard({ name, meta, ext }: { name: string; meta: string; ext: keyof typeof FILE_TONES | string }) {
  const tone = FILE_TONES[ext] ?? 'var(--accent)';
  return (
    <div className="i-lift-shadow" style={{ position: 'relative', width: 150, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', padding: '16px 14px 12px', overflow: 'hidden', transition: 'transform 220ms, box-shadow 220ms' }}>
      <span aria-hidden style={{ position: 'absolute', top: 0, insetInlineEnd: 0, width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 26px 26px 0', borderColor: `transparent ${tone} transparent transparent` }} />
      <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: 6, background: `${tone}1e`, color: tone, fontSize: 10, fontWeight: 800, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>{ext}</span>
      <div style={{ fontSize: 13, fontWeight: 700, marginTop: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>{meta}</div>
    </div>
  );
}

/* ── EditorialCard — App-Store feature: full-bleed backdrop, overline +
      display title overlaid. */
export function EditorialCard({ overline, title, meta, background }: { overline: string; title: React.ReactNode; meta?: React.ReactNode; background?: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} tabIndex={0} onFocus={() => setHov(true)} onBlur={() => setHov(false)} style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', minHeight: 210, cursor: 'pointer', display: 'flex', alignItems: 'flex-end', boxShadow: hov ? 'var(--shadow-3)' : 'var(--shadow-1)', transition: 'box-shadow 340ms' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: background ?? 'linear-gradient(160deg, color-mix(in srgb, var(--accent) 55%, #1c1c22), color-mix(in srgb, var(--accent) 20%, #101014))', transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform 700ms cubic-bezier(0.22,1,0.36,1)' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.55))' }} />
      <div style={{ position: 'relative', padding: 20, color: '#fff' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', opacity: 0.75 }}>{overline}</div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.2, marginTop: 4 }}>{title}</div>
        {meta && <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>{meta}</div>}
      </div>
    </div>
  );
}
