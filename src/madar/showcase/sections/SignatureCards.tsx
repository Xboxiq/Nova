import { useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import { DynamicIsland } from '../../components';

const spring = 'cubic-bezier(0.34,1.45,0.64,1)';
const easeOut = 'cubic-bezier(0.22,1,0.36,1)';

function Label({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-3)', marginBottom: 12 }}>{children}</div>;
}

function DocIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h9l4 4v14H6V3z" /><path d="M14 3v5h5" /></svg>;
}
function GridIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>;
}

function Dossier() {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: 'var(--bg-deep)', border: '1px solid var(--border)', borderRadius: 22, padding: 20, cursor: 'pointer' }}>
      <Label>DOSSIER — sheet slips out of its folder</Label>
      <div style={{ position: 'relative', paddingTop: 14 }}>
        <div style={{ position: 'absolute', top: 0, insetInlineStart: 16, width: 76, height: 22, borderRadius: '8px 8px 0 0', background: 'var(--surface-2)', border: '1px solid var(--border)', borderBottom: 'none' }} />
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 14, boxShadow: hov ? 'var(--shadow-2)' : 'var(--shadow-1)', transform: hov ? 'translateY(-7px) rotate(-1deg)' : 'none', transition: `transform 380ms ${spring}, box-shadow 380ms` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center' }}><DocIcon /></span>
            <span style={{ fontSize: 14.5, fontWeight: 600 }}>عقد الاشتراك السنوي</span>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: '19px' }}>Growth plan · renews 01 Sep 2026<br />Signed by سارة العلي</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 9px', borderRadius: 999, background: 'var(--success-soft)', color: 'var(--success)', fontSize: 11.5, fontWeight: 600 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--success)' }} />Active
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>2,388 SAR</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FannedStack() {
  const [hov, setHov] = useState(false);
  const card = (base: string, fan: string, z: number): React.CSSProperties => ({
    position: 'absolute', inset: 0, borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-2)', zIndex: z,
    transform: hov ? fan : base, transition: `transform 420ms ${spring}`,
  });
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: 'var(--bg-deep)', border: '1px solid var(--border)', borderRadius: 22, padding: 20, cursor: 'pointer' }}>
      <Label>STACK — collection fans open</Label>
      <div style={{ position: 'relative', height: 150, margin: '10px 18px 4px' }}>
        <div style={card('rotate(-4deg) translateY(8px)', 'rotate(-9deg) translate(-30px, -4px)', 1)} />
        <div style={card('rotate(4deg) translateY(8px)', 'rotate(9deg) translate(30px, -4px)', 2)} />
        <div style={card('rotate(0deg)', 'translateY(-10px)', 3)}>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8, height: '100%', boxSizing: 'border-box' }}>
            <span style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center' }}><GridIcon /></span>
            <span style={{ fontSize: 14.5, fontWeight: 600 }}>حزمة الخدمات المنزلية</span>
            <span style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 'auto' }}>8 services · fans on hover</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpatialGlass() {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ background: 'var(--bg-deep)', border: '1px solid var(--border)', borderRadius: 22, padding: 20, cursor: 'pointer', perspective: 800 }}>
      <Label>SPATIAL — layers separate in Z</Label>
      <div style={{
        position: 'relative', height: 150, borderRadius: 18, overflow: 'visible',
        background: 'linear-gradient(150deg, color-mix(in srgb, var(--accent) 22%, var(--surface)), var(--surface-2))',
        border: '1px solid var(--border)', boxShadow: hov ? 'var(--shadow-3)' : 'var(--shadow-1)',
        transform: hov ? 'rotateX(6deg) rotateY(-5deg)' : 'none', transformStyle: 'preserve-3d', transition: `transform 420ms ${easeOut}, box-shadow 420ms`,
      }}>
        <div style={{ position: 'absolute', top: 16, insetInlineStart: 16, width: 40, height: 40, borderRadius: 12, background: 'var(--accent)', color: 'var(--on-accent)', display: 'grid', placeItems: 'center', boxShadow: hov ? '0 14px 24px color-mix(in srgb, var(--accent) 40%, transparent)' : 'var(--shadow-1)', transform: hov ? 'translateZ(56px)' : 'translateZ(0)', transition: `transform 420ms ${easeOut}, box-shadow 420ms` }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6l8 6-8 6V6z" /></svg>
        </div>
        <div style={{ position: 'absolute', insetInline: 14, bottom: 14, borderRadius: 12, padding: '10px 14px', background: 'var(--glass)', backdropFilter: 'blur(14px) saturate(150%)', WebkitBackdropFilter: 'blur(14px) saturate(150%)', border: '1px solid var(--border)', boxShadow: 'inset 0 1px 0 var(--glass-hl)', fontSize: 12.5, fontWeight: 600, transform: hov ? 'translateZ(34px)' : 'translateZ(0)', transition: `transform 420ms ${easeOut}` }}>
          دورة التصوير الاحترافي · 12 درساً
        </div>
      </div>
    </div>
  );
}

function IslandDemo() {
  return (
    <div style={{ background: 'var(--bg-deep)', border: '1px solid var(--border)', borderRadius: 22, padding: 20 }}>
      <Label>ISLAND — pill morphs into a card (tap)</Label>
      <DynamicIsland title="طلبك في الطريق" meta="12 min">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.14)' }}><div style={{ width: '62%', height: 5, borderRadius: 999, background: 'oklch(0.75 0.15 158)' }} /></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, opacity: 0.65 }}><span>المطعم</span><span>السائق أحمد</span><span>منزلك</span></div>
        </div>
      </DynamicIsland>
      <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 14, textAlign: 'center' }}>Live-activity pattern · order tracking, uploads, timers</div>
    </div>
  );
}

export function SignatureCards() {
  return (
    <Section label="Signature cards">
      <SectionHeader eyebrow="10 · SIGNATURE CARDS" title="Cards with a ritual">
        Hero-grade cards — each owns one physical gesture. Use at most one ritual family per page. Hover, and tap the island.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, alignItems: 'start' }}>
        <Dossier />
        <FannedStack />
        <SpatialGlass />
        <IslandDemo />
      </div>
    </Section>
  );
}
