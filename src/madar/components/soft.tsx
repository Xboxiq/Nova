/* ────────────────────────────────────────────────────────────────────────
   The Soft Vocabulary — Liquid Soft dialect primitives (design.md §17.0/§17.2)
   Bright flat brand, never gradient mesh. Consumer surfaces only; admin
   stays on flat --accent-soft tiles. Never both dialects on one screen.
──────────────────────────────────────────────────────────────────────── */

/** Soft palette hues shipped as tonal triples: fill gradient, ambient
    colored shadow, pale tint chip. */
export const SOFT_HUES = {
  orange: { a: '#FF8A4A', b: '#F36A1F', shadow: 'rgba(243,106,31,0.35)', tint: '#FFEFE3' },
  green: { a: '#2DCB7E', b: '#15976A', shadow: 'rgba(21,151,106,0.35)', tint: '#E2F7EC' },
  blue: { a: '#4FA3FF', b: '#1670E0', shadow: 'rgba(22,112,224,0.35)', tint: '#E4F0FF' },
  violet: { a: '#B287FF', b: '#7C4DFF', shadow: 'rgba(124,77,255,0.35)', tint: '#EFE7FF' },
  ink: { a: '#3C3C3F', b: '#0A0A0B', shadow: 'rgba(10,10,11,0.4)', tint: '#EBEAE6' },
} as const;
export type SoftHue = keyof typeof SOFT_HUES;

/* ── SquircleIcon — THE Soft icon container: radius 30% of size, glyph at
      50%, inset light top + dark bottom. `variant="fill"` for active or
      featured, `variant="tint"` for resting. */
export interface SquircleIconProps {
  hue?: SoftHue;
  size?: 22 | 28 | 36 | 48 | 64;
  variant?: 'fill' | 'tint';
  children: React.ReactNode;
}

export function SquircleIcon({ hue = 'blue', size = 48, variant = 'fill', children }: SquircleIconProps) {
  const h = SOFT_HUES[hue];
  return (
    <span style={{
      width: size, height: size, borderRadius: size * 0.3, display: 'grid', placeItems: 'center', flex: 'none',
      ...(variant === 'fill'
        ? { background: `linear-gradient(180deg, ${h.a}, ${h.b})`, color: '#fff', boxShadow: `inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.18)` }
        : { background: h.tint, color: h.b, border: '1px solid var(--border)' }),
    }}>
      <span style={{ display: 'inline-flex', width: size * 0.5, height: size * 0.5, alignItems: 'center', justifyContent: 'center' }}>{children}</span>
    </span>
  );
}

/* ── SpecularOrb — 3D orb (§17.2): radial fill light→mid→deep at 28%/26%,
      inset white crescent top, dark crescent bottom, colored halo, and a
      tiny elliptical highlight. Step numbers, plan pickers, status. */
const ORB_PALETTES: Record<Exclude<SoftHue, 'ink'>, [string, string, string, string]> = {
  blue: ['#6FB3FF', '#1E88FF', '#0E58B4', 'rgba(30,136,255,0.4)'],
  green: ['#A6E8C0', '#2DCB7E', '#0F7D51', 'rgba(45,203,126,0.4)'],
  violet: ['#C4A6FF', '#7C4DFF', '#4A21B8', 'rgba(124,77,255,0.4)'],
  orange: ['#FFC49B', '#F36A1F', '#B04510', 'rgba(243,106,31,0.4)'],
};

export function SpecularOrb({ hue = 'blue', size = 48, children }: { hue?: Exclude<SoftHue, 'ink'>; size?: number; children?: React.ReactNode }) {
  const [light, mid, deep] = ORB_PALETTES[hue];
  return (
    <span style={{
      position: 'relative', width: size, height: size, borderRadius: '50%', flex: 'none',
      background: `radial-gradient(at 28% 26%, ${light} 0%, ${mid} 55%, ${deep} 100%)`,
      boxShadow: `inset 9px 9px 20px rgba(255,255,255,0.55), inset -5px -5px 14px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(255,255,255,0.18)`,
      display: 'grid', placeItems: 'center', color: '#fff', fontSize: size * 0.31, fontWeight: 700,
    }}>
      {children}
      <span style={{ position: 'absolute', top: size * 0.08, insetInlineStart: size * 0.15, width: size * 0.31, height: size * 0.19, borderRadius: '50%', background: 'radial-gradient(at 50% 50%, rgba(255,255,255,0.9), transparent 70%)' }} />
    </span>
  );
}

/* ── BurstSeal — 12-point star seal (§17.2), gradient fill + glyph on top.
      "Verified" and "premium" badges. */
function burstPoints(cx: number, cy: number, rOut: number, rIn: number) {
  const pts: string[] = [];
  for (let i = 0; i < 24; i++) {
    const r = i % 2 === 0 ? rOut : rIn;
    const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`);
  }
  return pts.join(' ');
}

export function BurstSeal({ hue = 'blue', size = 52, children }: { hue?: Exclude<SoftHue, 'ink'>; size?: number; children?: React.ReactNode }) {
  const h = SOFT_HUES[hue];
  const id = `burst-${hue}`;
  return (
    <span style={{ position: 'relative', width: size, height: size, display: 'grid', placeItems: 'center', flex: 'none' }}>
      <svg width={size} height={size} viewBox="0 0 64 64">
        <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={h.a} /><stop offset="1" stopColor={h.b} /></linearGradient></defs>
        <polygon points={burstPoints(32, 32, 30, 24)} fill={`url(#${id})`} />
      </svg>
      <span style={{ position: 'absolute', color: '#fff', display: 'inline-flex' }}>
        {children ?? <svg width={size * 0.38} height={size * 0.38} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>}
      </span>
    </span>
  );
}

/* ── MemojiAvatar — pastel ring around a gradient face, palette picked by
      name hash (§17.2). People without photos; never gray initial eggs. */
const MEMOJI_PALETTES: [string, string, string][] = [
  ['#FFD9C2', '#FFA37D', '#E5613A'],
  ['#C8F0D6', '#A6E8C0', '#2DCB7E'],
  ['#DCD2FA', '#B287FF', '#7C4DFF'],
  ['#C8DEFF', '#8FD0FF', '#1670E0'],
  ['#FFE3EF', '#FF9DC6', '#E0447F'],
];

export function MemojiAvatar({ name, size = 46 }: { name: string; size?: number }) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.codePointAt(0)!) >>> 0;
  const [ring, faceA, faceB] = MEMOJI_PALETTES[hash % MEMOJI_PALETTES.length];
  const face = size * 0.72;
  return (
    <span title={name} style={{ width: size, height: size, borderRadius: 6, background: ring, display: 'grid', placeItems: 'center', flex: 'none' }}>
      <span style={{ width: face, height: face, borderRadius: 6, background: `linear-gradient(135deg, ${faceA}, ${faceB})`, boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.18)' }} />
    </span>
  );
}
