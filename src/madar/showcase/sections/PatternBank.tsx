import { useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import { GradientHeadline, GradientShimmerText } from '../../components';

const spring = 'cubic-bezier(0.34,1.45,0.64,1)';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function DayPicker() {
  const [days, setDays] = useState([false, true, true, false, true, false, false]);
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {DAY_LABELS.map((label, i) => (
        <button
          key={label}
          className="i-press-94"
          onClick={() => setDays((d) => d.map((v, j) => (j === i ? !v : v)))}
          style={{
            width: 42, height: 42, borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600,
            border: days[i] ? '1px solid var(--accent)' : '1px solid var(--border-strong)',
            background: days[i] ? 'var(--accent)' : 'var(--surface-2)',
            color: days[i] ? 'var(--on-accent)' : 'var(--text-2)',
            transition: 'background 220ms, color 220ms, border-color 220ms, transform 140ms',
          }}
        >{label}</button>
      ))}
    </div>
  );
}

const XTABS = [
  { label: 'Home', icon: <path d="M4 11l8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8z" /> },
  { label: 'Orders', icon: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></> },
  { label: 'Search', icon: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></> },
  { label: 'Profile', icon: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5" /></> },
];

function ExpandableTabs() {
  const [xt, setXt] = useState(0);
  return (
    <div style={{ display: 'inline-flex', gap: 4, padding: 5, borderRadius: 6, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      {XTABS.map((t, i) => (
        <button
          key={t.label}
          onClick={() => setXt(i)}
          style={{
            display: 'inline-flex', alignItems: 'center', height: 42, padding: '0 14px', borderRadius: 6, border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, background: xt === i ? 'var(--accent-soft)' : 'transparent', color: xt === i ? 'var(--accent)' : 'var(--text-2)',
            transition: 'background 340ms, color 340ms',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{t.icon}</svg>
          <span style={{ maxWidth: xt === i ? 90 : 0, opacity: xt === i ? 1 : 0, overflow: 'hidden', whiteSpace: 'nowrap', paddingInlineStart: xt === i ? 8 : 0, transition: `max-width 340ms ${spring}, opacity 240ms, padding 340ms ${spring}` }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

const RAIL_ICONS = [
  <path key="a" d="M4 11l8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8z" />,
  <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
  <path key="c" d="M4 19V9M10 19V5M16 19v-8M21 19H3" />,
  <><path d="M4 7h16M4 12h16M4 17h16" /><circle cx="9" cy="7" r="1.8" fill="currentColor" stroke="none" /><circle cx="15" cy="12" r="1.8" fill="currentColor" stroke="none" /><circle cx="8" cy="17" r="1.8" fill="currentColor" stroke="none" /></>,
];
const RAIL_LABELS = ['Dashboard', 'Grid', 'Reports', 'Settings'];

function SideRail() {
  const [rail, setRail] = useState(0);
  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', gap: 6, padding: 6, borderRadius: 6, background: 'oklch(0.22 0.035 274)' }}>
      <span style={{ position: 'absolute', insetInlineStart: 6, top: 6 + rail * 50, width: 44, height: 44, borderRadius: 6, background: 'var(--accent)', transition: `top 340ms ${spring}` }} />
      {RAIL_ICONS.map((icon, i) => (
        <button
          key={i}
          aria-label={RAIL_LABELS[i]}
          onClick={() => setRail(i)}
          style={{ position: 'relative', zIndex: 1, width: 44, height: 44, borderRadius: 6, border: 'none', background: 'none', cursor: 'pointer', display: 'grid', placeItems: 'center', color: rail === i ? 'var(--on-accent)' : 'var(--text-3)', transition: 'color 340ms' }}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
        </button>
      ))}
    </div>
  );
}

const MARQUEE_ITEMS = [
  { label: 'سل', token: 'accent' }, { label: 'جز', token: 'info' }, { label: 'مد', token: 'warning' }, { label: 'وس', token: 'success' }, { label: 'تع', token: 'danger' },
];

export function PatternBank() {
  return (
    <Section label="Pattern bank">
      <SectionHeader eyebrow="12 · PATTERN BANK" title="Merged pattern bank">
        Highlights from the 85-pattern compendium (design.md §17). The day picker, tabs and rail are live — click them.
      </SectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* status strip + gradient headline / flux loader + day picker */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', borderRadius: 6, background: 'oklch(0.2 0.03 274)', color: 'oklch(0.95 0.005 270)', fontSize: 13, fontWeight: 500 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'oklch(0.75 0.15 158)', animation: 'pulseDot 1.8s ease-in-out infinite', flex: 'none' }} />
              All systems normal · deploys resume at 14:00
              <button aria-label="Dismiss" style={{ marginInlineStart: 'auto', width: 22, height: 22, borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: 'inherit', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, }}>
              <GradientHeadline>Gradient headline</GradientHeadline>
              <GradientShimmerText style={{ marginTop: 10 }}>Text shimmer — one line max</GradientShimmerText>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Flux loader — phased progress</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>64%</span>
            </div>
            <div style={{ position: 'relative', height: 10, borderRadius: 6, background: 'var(--surface-2)', overflow: 'hidden' }}>
              <div style={{ width: '64%', height: 10, borderRadius: 6, background: 'linear-gradient(90deg, var(--accent), oklch(from var(--accent) calc(l + 0.1) c h), var(--accent))', backgroundSize: '200% 100%', animation: 'fluxSlide 1.8s linear infinite' }} />
              {[25, 50, 75].map((p) => <span key={p} style={{ position: 'absolute', top: 2, bottom: 2, insetInlineStart: `${p}%`, width: 2, borderRadius: 2, background: 'var(--surface)' }} />)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-3)', marginTop: 10 }}>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>تجهيز</span><span style={{ color: 'var(--accent)', fontWeight: 600 }}>تغليف</span><span style={{ color: 'var(--text-2)', fontWeight: 600 }}>تحميل</span><span>تسليم</span>
            </div>
            <div style={{ height: 1, background: 'var(--border)', margin: '18px 0' }} />
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 12 }}>Day picker — recurring schedules</div>
            <DayPicker />
          </div>
        </div>

        {/* expandable tabs + dock / side rail + marquee + pass */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 14 }}>Expandable tabs — active one absorbs space</div>
            <ExpandableTabs />
            <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 14 }}>Mobile glass dock — raised CTA breaks the edge</div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 60, borderRadius: 6, background: 'var(--glass)', backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', border: '1px solid var(--border)', boxShadow: 'inset 0 1px 0 var(--glass-hl)', maxWidth: 340, marginTop: 26 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8z" /></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
              <button aria-label="Create" className="i-press-94" style={{ width: 54, height: 54, borderRadius: 6, border: '4px solid var(--bg)', background: 'var(--ink)', color: 'var(--on-ink)', cursor: 'pointer', display: 'grid', placeItems: 'center', marginTop: -30, transition: 'transform 220ms cubic-bezier(0.34,1.45,0.64,1)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              </button>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.8 5.5 1.8 5.5H4.2S6 14 6 9.5z" /><path d="M10 18.5a2 2 0 0 0 4 0" /></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5" /></svg>
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, display: 'flex', gap: 24 }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 14 }}>Side rail — pill slides</div>
              <SideRail />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 14 }}>Infinite marquee — edge-faded, ≥40s/loop</div>
              <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}>
                <div style={{ display: 'flex', gap: 14, width: 'max-content', animation: 'marqueeX 42s linear infinite' }}>
                  {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((it, i) => (
                    <span key={i} style={{ width: 44, height: 44, borderRadius: 6, background: `var(--${it.token}-soft)`, color: `var(--${it.token})`, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14, flex: 'none' }}>{it.label}</span>
                  ))}
                </div>
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', margin: '20px 0 12px' }}>Pass — perforated ticket</div>
              <div style={{ borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface-2)', overflow: 'hidden', maxWidth: 300 }}>
                <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 34, height: 34, borderRadius: 6, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>
                  </span>
                  <span>
                    <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>حجز — درس الرياضيات</span>
                    <span style={{ display: 'block', fontSize: 11.5, color: 'var(--text-3)' }}>Sun 12 Jul · 4:30 PM</span>
                  </span>
                </div>
                <div style={{ position: 'relative', height: 1, borderTop: '1.5px dashed var(--border-strong)', margin: '0 8px' }}>
                  <span style={{ position: 'absolute', top: -7, insetInlineStart: -15, width: 14, height: 14, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)' }} />
                  <span style={{ position: 'absolute', top: -7, insetInlineEnd: -15, width: 14, height: 14, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)' }} />
                </div>
                <div style={{ padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>NO. 0417</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 9px', borderRadius: 6, background: 'var(--success-soft)', color: 'var(--success)', fontSize: 11.5, fontWeight: 600 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--success)' }} />Confirmed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
