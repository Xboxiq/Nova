import { useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';

const spring = 'cubic-bezier(0.34,1.45,0.64,1)';

function RitualCard({ onEnter, onLeave, title, desc, children }: { onEnter: () => void; onLeave: () => void; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      className="i-card"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: '28px 20px', boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'transform 340ms cubic-bezier(0.22,1,0.36,1), box-shadow 340ms' }}
    >
      <div style={{ position: 'relative', width: 64, height: 64, display: 'grid', placeItems: 'center' }}>{children}</div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 14.5, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>{desc}</div>
      </div>
    </div>
  );
}

function VfCorner({ hover, x, y, anchor }: { hover: boolean; x: number; y: number; anchor: React.CSSProperties }) {
  return (
    <span style={{ position: 'absolute', width: 13, height: 13, ...anchor, transform: hover ? `translate(${x}px,${y}px)` : 'none', transition: `transform 360ms ${spring}` }}>
      <span style={{ position: 'absolute', ...(anchor.top !== undefined ? { top: 0 } : { bottom: 0 }), ...(anchor.left !== undefined ? { left: 0 } : { right: 0 }), width: 13, height: 2, background: 'var(--accent)', borderRadius: 2 }} />
      <span style={{ position: 'absolute', ...(anchor.top !== undefined ? { top: 0 } : { bottom: 0 }), ...(anchor.left !== undefined ? { left: 0 } : { right: 0 }), width: 2, height: 13, background: 'var(--accent)', borderRadius: 2 }} />
    </span>
  );
}

export function IconLab() {
  const [hov, setHov] = useState<string | null>(null);

  return (
    <Section label="Icon lab">
      <SectionHeader eyebrow="09 · ICON LAB" title="Icon presentation rituals">
        Four ways to stage an icon beyond the flat tile. Each is a hover ritual — one per surface, chosen once per project. Hover each card.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 20 }}>
        {/* ORBIT */}
        <RitualCard onEnter={() => setHov('orbit')} onLeave={() => setHov(null)} title="Orbit" desc="Electron speeds up on hover">
          <div style={{ position: 'absolute', inset: 0, animation: `spin ${hov === 'orbit' ? 1 : 4.2}s linear infinite` }}>
            <span style={{ position: 'absolute', top: 0, left: '50%', marginLeft: -3, width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
          </div>
          <div style={{ position: 'absolute', inset: 6, borderRadius: '50%', border: '1px dashed var(--border-strong)' }} />
          <div style={{ width: 40, height: 40, borderRadius: '50%', display: 'grid', placeItems: 'center', background: `color-mix(in srgb, var(--accent) ${hov === 'orbit' ? 16 : 10}%, transparent)`, transform: hov === 'orbit' ? 'scale(1.1)' : 'none', transition: `transform 320ms ${spring}, background 250ms` }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /></svg>
          </div>
        </RitualCard>

        {/* VIEWFINDER */}
        <RitualCard onEnter={() => setHov('vf')} onLeave={() => setHov(null)} title="Viewfinder" desc="Corners close in to focus">
          <VfCorner hover={hov === 'vf'} x={5} y={5} anchor={{ top: 0, left: 0 }} />
          <VfCorner hover={hov === 'vf'} x={-5} y={5} anchor={{ top: 0, right: 0 }} />
          <VfCorner hover={hov === 'vf'} x={5} y={-5} anchor={{ bottom: 0, left: 0 }} />
          <VfCorner hover={hov === 'vf'} x={-5} y={-5} anchor={{ bottom: 0, right: 0 }} />
          <span style={{ transform: hov === 'vf' ? 'scale(1.12)' : 'none', transition: `transform 360ms ${spring}`, display: 'inline-flex' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.6" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
          </span>
        </RitualCard>

        {/* STRATA */}
        <RitualCard onEnter={() => setHov('strata')} onLeave={() => setHov(null)} title="Strata" desc="Icon lifts off its squircle plate">
          <div style={{ position: 'absolute', inset: 6, borderRadius: '38%', background: 'linear-gradient(165deg, color-mix(in srgb, var(--accent) 16%, transparent), color-mix(in srgb, var(--accent) 7%, transparent))', border: '1px solid color-mix(in srgb, var(--accent) 22%, transparent)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.45)', transform: hov === 'strata' ? 'scale(0.94)' : 'none', transition: `transform 380ms ${spring}` }} />
          <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', color: 'var(--accent)', transform: hov === 'strata' ? 'translateY(-5px) scale(1.08)' : 'none', filter: hov === 'strata' ? 'drop-shadow(0 7px 7px color-mix(in srgb, var(--accent) 38%, transparent))' : 'drop-shadow(0 1px 1px color-mix(in srgb, var(--accent) 30%, transparent))', transition: `transform 380ms ${spring}, filter 380ms` }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8z" /></svg>
          </span>
        </RitualCard>

        {/* BEACON */}
        <RitualCard onEnter={() => setHov('beacon')} onLeave={() => setHov(null)} title="Beacon" desc="Sonar rings — live things only">
          {hov === 'beacon' && (
            <>
              <span style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: '1.5px solid var(--accent)', animation: 'beacon 1.4s cubic-bezier(0.22,1,0.36,1) infinite' }} />
              <span style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: '1.5px solid var(--accent)', animation: 'beacon 1.4s cubic-bezier(0.22,1,0.36,1) 0.7s infinite' }} />
            </>
          )}
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--accent-soft)', display: 'grid', placeItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.8 5.5 1.8 5.5H4.2S6 14 6 9.5z" /><path d="M10 18.5a2 2 0 0 0 4 0" /></svg>
          </div>
        </RitualCard>
      </div>
    </Section>
  );
}
