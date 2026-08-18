import type { CSSProperties, ReactNode } from 'react';
import { AvatarStack } from './social';

/* ────────────────────────────────────────────────────────────────────────
   Hero layouts — five composition patterns for a landing hero, rebuilt on
   Madar tokens. Every one recolors with the theme, mirrors under dir="rtl",
   and needs ZERO external assets: the "image" areas are generative visuals
   (token-derived gradient meshes + grain). Pass `children` or an <img> to
   any visual slot to drop in real art.

   Patterns: Split · Product · Immersive · Display word · Gallery scatter.
──────────────────────────────────────────────────────────────────────── */

const EASE = 'cubic-bezier(0.22,1,0.36,1)';

/* A star/asterisk brand mark, matching the reference wireframes. */
function StarMark({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" aria-hidden>
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
    </svg>
  );
}

/* ── HeroVisual — a generative, asset-free image surface. Five moods, each
      derived from the theme accent so it recolors everywhere. Override by
      passing children (e.g. a real <img style={{width:'100%'}} />). */
export type HeroVisualMood = 'bloom' | 'mesh' | 'ridge' | 'aurora' | 'grid';
export interface HeroVisualProps {
  mood?: HeroVisualMood;
  radius?: number;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  label?: string;
  /** Real art: when set, an <img> is rendered instead of the generative mood. */
  src?: string;
  alt?: string;
}
const MOODS: Record<HeroVisualMood, string> = {
  bloom:
    'radial-gradient(60% 70% at 62% 42%, oklch(from var(--accent) 0.72 0.2 h / 0.95), transparent 62%),' +
    'radial-gradient(50% 60% at 30% 74%, oklch(from var(--accent) 0.55 0.18 calc(h + 60) / 0.85), transparent 60%),' +
    'linear-gradient(140deg, var(--ink), oklch(from var(--ink) calc(l + 0.06) c h))',
  mesh:
    'radial-gradient(45% 55% at 22% 26%, oklch(from var(--accent) 0.78 0.16 calc(h - 30) / 0.9), transparent 60%),' +
    'radial-gradient(50% 55% at 82% 30%, oklch(from var(--accent) 0.7 0.18 calc(h + 50) / 0.85), transparent 62%),' +
    'radial-gradient(60% 60% at 55% 90%, oklch(from var(--accent) 0.62 0.17 calc(h + 120) / 0.8), transparent 60%),' +
    'var(--surface-2)',
  ridge:
    'repeating-linear-gradient(115deg, oklch(from var(--accent) 0.5 0.14 h / 0.16) 0 2px, transparent 2px 9px),' +
    'linear-gradient(160deg, oklch(from var(--accent) 0.4 0.14 h), var(--ink))',
  aurora:
    'radial-gradient(70% 80% at 20% 0%, oklch(from var(--accent) 0.6 0.2 h), transparent 55%),' +
    'radial-gradient(60% 70% at 90% 100%, oklch(from var(--accent) 0.55 0.2 calc(h + 80)), transparent 55%),' +
    'linear-gradient(180deg, oklch(0.24 0.06 274), oklch(0.16 0.05 274))',
  grid:
    'linear-gradient(oklch(from var(--accent) 0.6 0.1 h / 0.14) 1px, transparent 1px) 0 0 / 34px 34px,' +
    'linear-gradient(90deg, oklch(from var(--accent) 0.6 0.1 h / 0.14) 1px, transparent 1px) 0 0 / 34px 34px,' +
    'radial-gradient(70% 90% at 50% 20%, oklch(from var(--accent) 0.6 0.16 h / 0.5), transparent 60%),' +
    'var(--bg-deep)',
};
export function HeroVisual({ mood = 'mesh', radius = 20, style, className, children, label, src, alt }: HeroVisualProps) {
  const hasArt = !!src;
  return (
    <div
      className={className}
      style={{ position: 'relative', overflow: 'hidden', borderRadius: radius, background: hasArt ? 'var(--surface-2)' : MOODS[mood], backgroundColor: 'var(--surface-2)', ...style }}
    >
      {/* real art when provided; otherwise the generative mood surface (an
          explicit, labelled placeholder slot — pass `src` to drop in art) */}
      {hasArt && <img src={src} alt={alt ?? ''} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
      {!hasArt && <span aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.5, mixBlendMode: 'overlay', backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")" }} />}
      {label && !children && !hasArt && <span style={{ position: 'absolute', insetInlineStart: 14, bottom: 12, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)' }}>{label}</span>}
      {children}
    </div>
  );
}

/* ── HeroNav — the shared top bar: mark + links + one CTA. tone switches it
      for a light page vs. a dark/immersive one. Absolute when `overlay`. */
export interface HeroNavProps {
  brand?: string;
  links?: string[];
  cta?: string;
  tone?: 'light' | 'dark';
  overlay?: boolean;
  pill?: boolean;
}
export function HeroNav({ brand = 'Madar', links = ['الرئيسية', 'الموارد', 'المزايا', 'تواصل'], cta = 'ابدأ الآن', tone = 'light', overlay = false, pill = false }: HeroNavProps) {
  const fg = tone === 'dark' ? 'rgba(255,255,255,0.92)' : 'var(--text)';
  const muted = tone === 'dark' ? 'rgba(255,255,255,0.7)' : 'var(--text-2)';
  return (
    <div style={{ position: overlay ? 'absolute' : 'relative', insetInlineStart: 0, insetInlineEnd: 0, top: overlay ? 0 : undefined, zIndex: 5, display: 'flex', alignItems: 'center', gap: 20, padding: overlay ? '20px 24px' : '4px 2px' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, color: fg, fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em', flex: 'none' }}>
        <StarMark size={20} color={tone === 'dark' ? '#fff' : 'var(--accent)'} />{brand}
      </span>
      <nav style={{ display: 'flex', gap: 22, marginInlineStart: 'auto', marginInlineEnd: 'auto', fontSize: 13.5, color: muted, flexWrap: 'wrap' }}>
        {links.map((l) => <a key={l} href="#" className="i-text" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 500 }}>{l}</a>)}
      </nav>
      <button className="i-press-97 i-lift" style={{ flex: 'none', height: 38, padding: '0 18px', borderRadius: 6, border: tone === 'dark' ? 'none' : '1px solid var(--border-strong)', background: tone === 'dark' ? '#fff' : 'var(--ink)', color: tone === 'dark' ? '#111' : 'var(--on-ink)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: pill ? 'var(--shadow-1)' : 'none', transition: `transform 200ms ${EASE}` }}>{cta}</button>
    </div>
  );
}

const SHELL: CSSProperties = { position: 'relative', borderRadius: 6, border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--surface)', };

/* ── 1 · SplitStatsHero — text block beside an image block, a stats row
      spanning the base. The classic two-column launch hero. */
export interface HeroStat { value: string; label: string; }
export interface SplitStatsHeroProps {
  eyebrow?: string;
  title?: ReactNode;
  sub?: string;
  cta?: string;
  stats?: HeroStat[];
  mood?: HeroVisualMood;
  links?: string[];
}
export function SplitStatsHero({
  eyebrow = 'أمان', title = <>الأمان مدمج في <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>كل طبقة</em> من النظام</>,
  sub = 'مهندَس ليبقى صامداً ومسيطَراً عليه وغير قابل للاختراق تحت الضغط.',
  cta = 'نظام آمن', stats = [{ value: '312', label: 'عميل' }, { value: '99.4%', label: 'رضا' }, { value: '$4.2M+', label: 'إيرادات' }],
  mood = 'bloom', links,
}: SplitStatsHeroProps) {
  return (
    <div style={{ ...SHELL, background: 'var(--ink)', color: 'var(--on-ink)', border: 'none', padding: 24 }}>
      <HeroNav tone="dark" cta={cta} links={links} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 28, alignItems: 'center', marginTop: 40 }}>
        <div>
          {eyebrow && <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'oklch(from var(--accent) 0.75 0.18 h)' }}>{eyebrow}</span>}
          <h2 style={{ fontSize: 'clamp(30px,4.4vw,48px)', lineHeight: 1.05, fontWeight: 700, letterSpacing: '-0.03em', margin: '14px 0 16px' }}>{title}</h2>
          <p style={{ fontSize: 15, lineHeight: '24px', color: 'rgba(255,255,255,0.76)', maxWidth: '42ch', margin: '0 0 24px' }}>{sub}</p>
          <button className="i-press-97 i-lift" style={{ height: 46, padding: '0 22px', borderRadius: 6, border: 'none', background: 'var(--accent)', color: 'var(--on-accent)', fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, transition: `transform 200ms ${EASE}` }}>
            {cta}<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
        <HeroVisual mood={mood} radius={18} style={{ aspectRatio: '4 / 3', minHeight: 240 }} />
      </div>
      <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', marginTop: 30, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.14)' }}>
        {stats.map((s) => (
          <div key={s.label} style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{s.value}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 2 · ProductHero — left headline + inline CTA over a wide product /
      dashboard frame. For dashboards, screenshots, app shots. */
export interface ProductHeroProps {
  title?: ReactNode;
  sub?: string;
  cta?: string;
  proof?: string;
  links?: string[];
  children?: ReactNode; // the dashboard/product visual
}
export function ProductHero({
  title = <>ابنِ أنظمة تتحرك <br />على تلقائها</>, sub = 'حوِّل المهام الفوضوية إلى أنظمة ذكية تفكر وتتفاعل وتتحسّن تلقائياً.',
  cta = 'جرّبه مجاناً', proof = '300+ فريق راضٍ', links, children,
}: ProductHeroProps) {
  return (
    <div style={{ ...SHELL, padding: 24 }}>
      <HeroNav cta={cta} pill links={links} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, alignItems: 'end', margin: '30px 0 22px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
            <AvatarStack names={['ن', 'م', 'س']} size={26} />
            <span style={{ fontSize: 12.5, color: 'var(--text-3)', fontWeight: 500 }}>{proof}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', lineHeight: 1.06, fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>{title}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 14.5, lineHeight: '23px', color: 'var(--text-2)', maxWidth: '40ch', margin: 0 }}>{sub}</p>
          <button className="i-press-97 i-lift" style={{ alignSelf: 'start', height: 44, padding: '0 22px', borderRadius: 6, border: 'none', background: 'var(--accent)', color: 'var(--on-accent)', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: `transform 200ms ${EASE}` }}>{cta}</button>
        </div>
      </div>
      <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-deep)' }}>
        {/* colored corner blobs peeking behind the frame, like the reference */}
        <span aria-hidden style={{ position: 'absolute', insetInlineEnd: -30, bottom: -30, width: 140, height: 140, background: 'oklch(from var(--accent) 0.65 0.2 calc(h + 120))', filter: 'blur(34px)', opacity: 0.5 }} />
        <div style={{ position: 'relative' }}>{children ?? <ProductFrame />}</div>
      </div>
    </div>
  );
}

/* A stylized dashboard frame used as the default ProductHero visual. */
function ProductFrame() {
  const bars = [42, 30, 15, 8, 5];
  const rings = ['var(--accent)', 'oklch(from var(--accent) 0.7 0.18 calc(h + 60))', 'oklch(from var(--accent) 0.7 0.18 calc(h + 140))', 'var(--surface-2)'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 0, background: 'var(--surface)', minHeight: 220 }}>
      <div style={{ borderInlineEnd: '1px solid var(--border)', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}><span style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--accent)' }} /><span style={{ fontSize: 12, fontWeight: 700 }}>Nexus</span></div>
        {['اللوحة', 'المهام', 'الوكلاء', 'التحليلات', 'الفريق'].map((t, i) => (
          <span key={t} style={{ fontSize: 11.5, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? 'var(--text)' : 'var(--text-3)', background: i === 0 ? 'var(--surface-2)' : 'transparent', borderRadius: 6, padding: '5px 8px' }}>{t}</span>
        ))}
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 12 }}>
          {[['1,248', 'مهام نشطة'], ['34,892', 'مكتملة'], ['56', 'وكلاء'], ['98.4%', 'نجاح']].map(([v, l]) => (
            <div key={l} style={{ border: '1px solid var(--border)', borderRadius: 6, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
              <div style={{ fontSize: 15, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 8 }}>
          <div style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 10 }}>عمليات سير العمل</div>
            <svg viewBox="0 0 200 70" style={{ width: '100%', height: 70 }} preserveAspectRatio="none">
              <path d="M0 55 C 30 50, 40 20, 70 28 S 120 60, 150 30 200 22 200 22" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M0 55 C 30 50, 40 20, 70 28 S 120 60, 150 30 200 22 L200 70 L0 70 Z" fill="oklch(from var(--accent) 0.7 0.16 h / 0.14)" />
            </svg>
          </div>
          <div style={{ border: '1px solid var(--border)', borderRadius: 6, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4 }}>التوزيع</div>
            {bars.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: rings[i] ?? 'var(--surface-2)', flex: 'none' }} />
                <span style={{ height: 5, borderRadius: 3, background: rings[i] ?? 'var(--surface-2)', width: `${b * 1.6}%` }} />
                <span style={{ fontSize: 10, color: 'var(--text-3)', marginInlineStart: 'auto', fontVariantNumeric: 'tabular-nums' }}>{b}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 3 · ImmersiveHero — full-bleed visual, nav overlaid, headline anchored
      bottom-start with social proof, support copy + CTA bottom-end. */
export interface ImmersiveHeroProps {
  title?: ReactNode;
  sub?: string;
  cta?: string;
  proof?: string;
  mood?: HeroVisualMood;
  links?: string[];
  children?: ReactNode;
}
export function ImmersiveHero({
  title = <>تعلّم عند العمق <br />الذي يهمّ</>, sub = 'نساعد الشركات والفرق على تحويل أفكار الذكاء المعقّدة إلى منتجات واضحة وقابلة للاستخدام دون تعقيد.',
  cta = 'ابدأ تجربة مجانية', proof = '300+ شخص راضٍ', mood = 'aurora', links = ['الرئيسية', 'الموارد', 'المزايا', 'تواصل'], children,
}: ImmersiveHeroProps) {
  return (
    <HeroVisual mood={mood} radius={26} style={{ minHeight: 440, display: 'flex', flexDirection: 'column' }}>
      {children}
      <HeroNav overlay tone="dark" cta={cta} pill links={links} />
      <div style={{ position: 'relative', zIndex: 3, marginTop: 'auto', padding: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, alignItems: 'end', background: 'linear-gradient(0deg, rgba(0,0,0,0.5), transparent)' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, marginBottom: 14 }}>
            <AvatarStack names={['أ', 'ن', 'ر']} size={26} />
            <span style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>{proof}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(30px,4.6vw,50px)', lineHeight: 1.04, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', margin: 0 }}>{title}</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'start' }}>
          <p style={{ fontSize: 13.5, lineHeight: '21px', color: 'rgba(255,255,255,0.78)', maxWidth: '38ch', margin: 0 }}>{sub}</p>
          <button className="i-press-97 i-lift" style={{ height: 44, padding: '0 22px', borderRadius: 6, border: 'none', background: '#fff', color: '#111', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: `transform 200ms ${EASE}` }}>{cta}</button>
        </div>
      </div>
    </HeroVisual>
  );
}

/* ── 4 · DisplayWordHero — an oversized wordmark with a focal visual
      breaking through the center letters. Editorial, brand-forward. */
export interface DisplayWordHeroProps {
  word?: string;
  cta?: string;
  footStart?: string;
  footEnd?: string;
  mood?: HeroVisualMood;
  links?: string[];
  children?: ReactNode;
}
export function DisplayWordHero({
  word = 'ORBIT', cta = 'نظام آمن', footStart = 'كل سير عمل، مترابط بذكاء.', footEnd = 'عمل يدوي أقل. ناتج أكثر معنى.',
  mood = 'bloom', links = ['الرئيسية', 'الموارد', 'المزايا', 'تواصل'], children,
}: DisplayWordHeroProps) {
  return (
    <div style={{ ...SHELL, background: 'var(--ink)', color: 'var(--on-ink)', border: 'none', padding: 24, minHeight: 440, display: 'flex', flexDirection: 'column' }}>
      <HeroNav tone="dark" cta={cta} pill links={links} />
      <div style={{ position: 'relative', flex: 1, display: 'grid', placeItems: 'center', margin: '20px 0' }}>
        <div aria-hidden style={{ fontSize: 'clamp(72px,17vw,190px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, color: '#fff', userSelect: 'none', textAlign: 'center', width: '100%' }}>{word}</div>
        <HeroVisual mood={mood} radius={18} style={{ position: 'absolute', top: '50%', insetInlineStart: '50%', transform: 'translate(-50%,-46%)', width: 'min(29%, 210px)', aspectRatio: '3 / 4' }} />
        {children}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', color: 'rgba(255,255,255,0.66)', fontSize: 13, lineHeight: '19px' }}>
        <span style={{ maxWidth: '22ch' }}>{footStart}</span>
        <span style={{ maxWidth: '22ch', textAlign: 'end' }}>{footEnd}</span>
      </div>
    </div>
  );
}

/* ── 5 · GalleryScatterHero — a centered headline with image tiles scattered
      around it, museum-wall style. Playful, portfolio / creative. Tiles use
      logical offsets so the scatter mirrors cleanly under RTL. */
export interface ScatterTile { start: number; top: number; size: number; mood: HeroVisualMood; }
export interface GalleryScatterHeroProps {
  title?: ReactNode;
  cta?: string;
  footStart?: string;
  footEnd?: string;
  tiles?: ScatterTile[];
  links?: string[];
}
const DEFAULT_TILES: ScatterTile[] = [
  { start: 6, top: 8, size: 92, mood: 'bloom' },
  { start: 20, top: 46, size: 74, mood: 'mesh' },
  { start: 12, top: 76, size: 86, mood: 'ridge' },
  { start: 34, top: 22, size: 70, mood: 'grid' },
  { start: 30, top: 84, size: 78, mood: 'aurora' },
  { start: 58, top: 80, size: 82, mood: 'bloom' },
  { start: 66, top: 20, size: 72, mood: 'mesh' },
  { start: 78, top: 52, size: 96, mood: 'ridge' },
  { start: 86, top: 12, size: 68, mood: 'grid' },
  { start: 90, top: 78, size: 80, mood: 'aurora' },
];
export function GalleryScatterHero({
  title = <>حيث يلتقي الذكاء <br />بالجَمال.</>, cta = 'ابدأ الآن', footStart = 'منتجات رقمية راقية، مصمَّمة بنيّة.',
  footEnd = 'مصنوعة للشركات الناشئة التي تبني الجيل القادم من البرمجيات.', tiles = DEFAULT_TILES, links,
}: GalleryScatterHeroProps) {
  return (
    <div style={{ ...SHELL, padding: 24, minHeight: 520, display: 'flex', flexDirection: 'column' }}>
      <HeroNav cta={cta} links={links} />
      <div style={{ position: 'relative', flex: 1, marginTop: 16 }}>
        {tiles.map((t, i) => (
          <HeroVisual
            key={i} mood={t.mood} radius={10}
            style={{ position: 'absolute', insetInlineStart: `${t.start}%`, top: `${t.top}%`, width: t.size, height: t.size * 1.18, transform: `rotate(${((i % 3) - 1) * 3}deg)` }}
          />
        ))}
        <div style={{ position: 'absolute', insetInlineStart: '50%', top: '46%', transform: 'translate(-50%,-50%)', textAlign: 'center', zIndex: 4, background: 'radial-gradient(60% 120% at 50% 50%, var(--surface) 55%, transparent)', padding: '10px 24px' }}>
          <h2 style={{ fontSize: 'clamp(26px,3.6vw,42px)', lineHeight: 1.08, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>{title}</h2>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginTop: 16, color: 'var(--text-3)', fontSize: 12.5, lineHeight: '18px' }}>
        <span style={{ maxWidth: '24ch' }}>{footStart}</span>
        <span style={{ maxWidth: '26ch', textAlign: 'end' }}>{footEnd}</span>
      </div>
    </div>
  );
}
