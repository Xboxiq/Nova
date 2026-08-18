import { Section, SectionHeader } from '../SectionHeader';
import { SpecShelf } from '../SpecRow';

function SquircleTile({ gradient, children }: { gradient: string; children: React.ReactNode }) {
  return (
    <span style={{ width: 46, height: 46, borderRadius: 6, background: gradient, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.18)`, display: 'grid', placeItems: 'center', color: '#fff' }}>{children}</span>
  );
}

function Orb({ from, mid, to, children }: { from: string; mid: string; to: string; children: React.ReactNode }) {
  return (
    <span style={{ position: 'relative', width: 48, height: 48, borderRadius: '50%', background: `radial-gradient(at 28% 26%, ${from} 0%, ${mid} 55%, ${to} 100%)`, boxShadow: `inset 9px 9px 20px rgba(255,255,255,0.55), inset -5px -5px 14px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(255,255,255,0.18)`, display: 'grid', placeItems: 'center', color: '#fff', fontSize: 15, fontWeight: 700 }}>
      {children}
      <span style={{ position: 'absolute', top: 4, insetInlineStart: 7, width: 15, height: 9, borderRadius: '50%', background: 'radial-gradient(at 50% 50%, rgba(255,255,255,0.9), transparent 70%)' }} />
    </span>
  );
}

function Memoji({ ring, grad }: { ring: string; grad: string }) {
  return (
    <span style={{ width: 46, height: 46, borderRadius: 6, background: ring, display: 'grid', placeItems: 'center' }}>
      <span style={{ width: 33, height: 33, borderRadius: 6, background: grad, boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.18)' }} />
    </span>
  );
}

export function SoftVocabulary() {
  return (
    <Section label="Soft vocabulary">
      <SectionHeader eyebrow="11 · SOFT VOCABULARY" title="The consumer dialect: Liquid Soft">
        A warmer sub-language for consumer surfaces: squircle tonal icons, specular orbs, flat brand + halo. One dialect per screen — never mixed with admin flat tiles.
      </SectionHeader>
      <SpecShelf>
        {/* squircle tonal system */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 16 }}>Squircle tonal triple — fill · shadow · tint</div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {[
              { grad: 'linear-gradient(180deg,#FF8A4A,#F36A1F)', shadow: 'rgba(243,106,31,0.35)', tint: '#FFEFE3', icon: <path d="M12 5v14M5 12h14" /> },
              { grad: 'linear-gradient(180deg,#2DCB7E,#15976A)', shadow: 'rgba(21,151,106,0.35)', tint: '#E2F7EC', icon: <path d="M5 13l4 4L19 7" />, sw: 2.4 },
              { grad: 'linear-gradient(180deg,#4FA3FF,#1670E0)', shadow: 'rgba(22,112,224,0.35)', tint: '#E4F0FF', icon: <path d="M4 11l8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8z" /> },
              { grad: 'linear-gradient(180deg,#B287FF,#7C4DFF)', shadow: 'rgba(124,77,255,0.35)', tint: '#EFE7FF', icon: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5" /></> },
              { grad: 'linear-gradient(180deg,#3C3C3F,#0A0A0B)', shadow: 'rgba(10,10,11,0.4)', tint: '#EBEAE6', icon: <path d="M4 7h16M4 12h16M4 17h16" /> },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <SquircleTile gradient={s.grad}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={s.sw ?? 1.8} strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </SquircleTile>
                <span style={{ width: 20, height: 8, borderRadius: 6, background: s.tint, border: '1px solid var(--border)' }} />
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 14 }}>radius 30% · glyph 50% · inset light top + dark bottom</div>
        </div>

        {/* orbs + burst seal */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 16 }}>Specular orbs + burst seal</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Orb from="#6FB3FF" mid="#1E88FF" to="#0E58B4">1</Orb>
            <Orb from="#A6E8C0" mid="#2DCB7E" to="#0F7D51">2</Orb>
            <Orb from="#C4A6FF" mid="#7C4DFF" to="#4A21B8">3</Orb>
            <span style={{ width: 1, height: 40, background: 'var(--border)' }} />
            <span style={{ position: 'relative', width: 52, height: 52, display: 'grid', placeItems: 'center' }}>
              <svg width="52" height="52" viewBox="0 0 64 64">
                <defs><linearGradient id="mdBurst" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4FA3FF" /><stop offset="1" stopColor="#1670E0" /></linearGradient></defs>
                <polygon points="32,2 38.2,8.8 47,6 49,15 58,17 55.2,25.8 62,32 55.2,38.2 58,47 49,49 47,58 38.2,55.2 32,62 25.8,55.2 17,58 15,49 6,47 8.8,38.2 2,32 8.8,25.8 6,17 15,15 17,6 25.8,8.8" fill="url(#mdBurst)" />
              </svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute' }}><path d="M5 13l4 4L19 7" /></svg>
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 18, alignItems: 'center' }}>
            <Memoji ring="#FFD9C2" grad="linear-gradient(135deg,#FFA37D,#E5613A)" />
            <Memoji ring="#C8F0D6" grad="linear-gradient(135deg,#A6E8C0,#2DCB7E)" />
            <Memoji ring="#DCD2FA" grad="linear-gradient(135deg,#B287FF,#7C4DFF)" />
            <Memoji ring="#C8DEFF" grad="linear-gradient(135deg,#8FD0FF,#1670E0)" />
            <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Memoji avatars — hash-picked, no photos</span>
          </div>
        </div>

        {/* hero card flat + halo */}
        <div style={{ borderRadius: 6, padding: 24, color: '#fff', position: 'relative', background: 'radial-gradient(120% 80% at 30% 20%, oklch(from var(--accent) calc(l + 0.1) c h) 0%, var(--accent) 55%, oklch(from var(--accent) calc(l - 0.12) c h) 100%)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)', }}>
          <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, letterSpacing: '0.06em', color: 'var(--on-accent)' }}>WALLET BALANCE</div>
          <div style={{ fontSize: 36, fontWeight: 700, marginTop: 8, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', color: 'var(--on-accent)' }}>12,480 <span style={{ fontSize: 15, fontWeight: 600, opacity: 0.7 }}>SAR</span></div>
          <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
            <button className="i-lift" style={{ height: 38, padding: '0 18px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px) saturate(1.5)', WebkitBackdropFilter: 'blur(10px) saturate(1.5)', color: '#0A0A09', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>Top up</button>
            <button className="i-lift" style={{ height: 38, padding: '0 18px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px) saturate(1.4)', WebkitBackdropFilter: 'blur(12px) saturate(1.4)', color: 'var(--on-accent)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>History</button>
          </div>
          <div style={{ fontSize: 11.5, opacity: 0.65, marginTop: 16, color: 'var(--on-accent)' }}>Flat brand + halo — one per screen · glass buttons live over color</div>
        </div>

        {/* glow card */}
        <div style={{ position: 'relative', borderRadius: 6, background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: 20 }}>
          <div aria-hidden style={{ position: 'absolute', left: 12, right: 12, bottom: -22, height: 60, background: 'radial-gradient(at 50% 0%, oklch(from var(--accent) l c h / 0.55) 0%, transparent 70%)', filter: 'blur(20px)' }} />
          <div style={{ position: 'relative', padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Upgrade to Growth</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>Unlimited services, roles and audit log.</div>
          </div>
          <button className="i-brightness" style={{ position: 'relative', width: '100%', height: 52, border: 'none', background: 'linear-gradient(180deg, oklch(from var(--accent) calc(l + 0.06) c h), var(--accent) 80%, oklch(from var(--accent) calc(l + 0.08) c h))', borderRadius: '0 0 6px 6px', display: 'grid', placeItems: 'center', color: 'var(--on-accent)', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'filter 220ms' }}>Continue</button>
        </div>

        {/* aurora card */}
        <div style={{ position: 'relative', borderRadius: 6, background: '#0E0E10', overflow: 'hidden', padding: 24, color: '#fff', minHeight: 180 }}>
          <span aria-hidden style={{ position: 'absolute', bottom: '-25%', insetInline: '-15%', height: '85%', background: 'radial-gradient(ellipse at 50% 90%, oklch(from var(--accent) calc(l + 0.12) c h) 0%, oklch(from var(--accent) calc(l - 0.15) c h) 28%, transparent 60%)', filter: 'blur(28px)', opacity: 0.92 }} />
          <div style={{ position: 'relative', textAlign: 'center', paddingTop: 26 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', opacity: 0.6 }}>NEW</div>
            <div style={{ fontWeight: 600, fontSize: 20, marginTop: 8 }}>Aurora surface</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.66)', marginTop: 6, lineHeight: '20px' }}>Volumetric glow rises from below.<br />Dark premium moments only.</div>
          </div>
        </div>

        {/* liquid metal + liquid glass */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Premium-only buttons</div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="i-lift i-press-97" style={{ height: 46, padding: '0 26px', borderRadius: 6, color: '#0A0A0B', border: '1px solid rgba(10,10,11,0.35)', background: 'conic-gradient(from 180deg at 50% 50%, #C8C8D0 0%, #FFF 12%, #8A8A95 35%, #4D4D55 55%, #FFF 70%, #B0B0B8 90%, #C8C8D0 100%)', boxShadow: '0 1px 0 rgba(255,255,255,0.6) inset', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'transform 220ms' }}>Liquid metal</button>
          </div>
          <div style={{ borderRadius: 6, padding: 16, background: 'linear-gradient(135deg, oklch(from var(--accent) l c calc(h - 30)), oklch(from var(--accent) calc(l - 0.08) c calc(h + 30)))' }}>
            <button className="i-lift i-press-97" style={{ height: 44, padding: '0 24px', borderRadius: 6, color: '#fff', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.38)', backdropFilter: 'blur(14px) saturate(1.7)', WebkitBackdropFilter: 'blur(14px) saturate(1.7)', boxShadow: 'inset 0 1.5px 0 rgba(255,255,255,0.55), 0 0 0 1px rgba(255,80,200,0.14), 0 0 0 2px rgba(120,200,255,0.10)', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>Liquid glass</button>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.75)', marginTop: 10 }}>Chromatic edge rings · only over color or photo</div>
          </div>
        </div>
      </SpecShelf>
    </Section>
  );
}
