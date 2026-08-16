import { useEffect, useState } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   Scroll-reactive page chrome — Jahez pattern library (§17.5).
   These react to scroll, so they expose a `scrolled` prop plus a
   `useScrolled` hook that watches the window (or a passed element).
──────────────────────────────────────────────────────────────────────── */

/** True once the page has scrolled past `threshold` px. Pass a scroll
    container ref for embedded scroll regions; defaults to the window. */
export function useScrolled(threshold = 40, target?: React.RefObject<HTMLElement | null>) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el: HTMLElement | Window = target?.current ?? window;
    const read = () => {
      const y = el === window ? window.scrollY : (el as HTMLElement).scrollTop;
      setScrolled(y > threshold);
    };
    read();
    el.addEventListener('scroll', read, { passive: true });
    return () => el.removeEventListener('scroll', read);
  }, [threshold, target]);
  return scrolled;
}

/* ── CompactNav — a floating pill nav that shrinks padding / gap / font
      past a scroll threshold, in one 320ms transition on all properties. */
export interface CompactNavProps {
  brand: React.ReactNode;
  links: string[];
  cta?: React.ReactNode;
  /** Controlled compact state. Omit to watch window scroll. */
  scrolled?: boolean;
}

export function CompactNav({ brand, links, cta, scrolled: controlled }: CompactNavProps) {
  const auto = useScrolled(40);
  const on = controlled ?? auto;
  return (
    <nav style={{
      display: 'inline-flex', alignItems: 'center', gap: on ? 10 : 18,
      padding: on ? '7px 8px 7px 16px' : '11px 11px 11px 20px', borderRadius: 999,
      background: 'var(--glass)', backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))',
      border: '1px solid var(--border)', boxShadow: on ? 'var(--shadow-2), inset 0 1px 0 var(--glass-hl)' : 'var(--shadow-1), inset 0 1px 0 var(--glass-hl)',
      transition: 'gap 320ms cubic-bezier(0.22,1,0.36,1), padding 320ms cubic-bezier(0.22,1,0.36,1), box-shadow 320ms',
    }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: on ? 14 : 15.5, marginInlineEnd: 'auto', transition: 'font-size 320ms' }}>{brand}</span>
      <span style={{ display: 'inline-flex', gap: 2 }}>
        {links.map((l, i) => (
          <a key={l} href="#" className={i === 0 ? undefined : 'i-soft-text'} style={{ textDecoration: 'none', color: i === 0 ? 'var(--text)' : 'var(--text-2)', fontSize: on ? 12.5 : 13.5, fontWeight: i === 0 ? 600 : 500, padding: on ? '6px 11px' : '7px 14px', borderRadius: 999, background: i === 0 ? 'var(--accent-soft)' : undefined, transition: 'font-size 320ms, padding 320ms' }}>{l}</a>
        ))}
      </span>
      {cta && (
        <button className="i-lift i-press-96" style={{ height: on ? 32 : 36, padding: on ? '0 13px' : '0 16px', borderRadius: 999, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit', fontSize: on ? 12.5 : 13.5, fontWeight: 600, cursor: 'pointer', transition: 'height 320ms, padding 320ms, font-size 320ms' }}>{cta}</button>
      )}
    </nav>
  );
}

/* ── ProgressiveNavbar — transparent over the hero, frosts (blur + bg +
      shadow) once scrolled past a point. For dark-hero pages. */
export interface ProgressiveNavbarProps {
  brand: React.ReactNode;
  links: string[];
  scrolled?: boolean;
  /** Text color while transparent (over a dark hero). Defaults to white. */
  restingColor?: string;
}

export function ProgressiveNavbar({ brand, links, scrolled: controlled, restingColor = '#fff' }: ProgressiveNavbarProps) {
  const auto = useScrolled(40);
  const on = controlled ?? auto;
  const fg = on ? 'var(--text)' : restingColor;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 18, padding: '12px 20px', borderRadius: 16,
      background: on ? 'var(--glass)' : 'transparent',
      backdropFilter: on ? 'blur(var(--glass-blur)) saturate(var(--glass-sat))' : 'none', WebkitBackdropFilter: on ? 'blur(var(--glass-blur)) saturate(var(--glass-sat))' : 'none',
      borderBottom: on ? '1px solid var(--border)' : '1px solid transparent',
      boxShadow: on ? 'var(--shadow-2)' : 'none', color: fg,
      transition: 'background 360ms, backdrop-filter 360ms, box-shadow 360ms, border-color 360ms, color 360ms',
    }}>
      <span style={{ fontWeight: 700, fontSize: 15, marginInlineEnd: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8 }}>{brand}</span>
      <nav style={{ display: 'flex', gap: 4 }}>
        {links.map((l) => <a key={l} href="#" style={{ textDecoration: 'none', color: 'inherit', opacity: 0.85, fontSize: 13.5, fontWeight: 500, padding: '7px 12px', borderRadius: 999 }}>{l}</a>)}
      </nav>
    </div>
  );
}

/* ── BucketGlyph — the CSS 3D bucket illustration: elliptical body, top
      rim, curved handle, tokenized so it themes with the accent. */
export function BucketGlyph({ size = 72, count }: { size?: number; count?: number }) {
  const w = size, h = size * 0.86;
  return (
    <span style={{ position: 'relative', width: w, height: h, display: 'inline-block' }}>
      <span aria-hidden style={{ position: 'absolute', top: h * 0.14, insetInline: '18%', height: h * 0.75, background: 'linear-gradient(180deg, oklch(from var(--accent) calc(l + 0.06) c h), var(--accent) 60%, oklch(from var(--accent) calc(l - 0.1) c h))', borderRadius: `0 0 ${w * 0.32}px ${w * 0.32}px / 0 0 ${h * 0.5}px ${h * 0.5}px`, boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.3), var(--shadow-2)' }} />
      <span aria-hidden style={{ position: 'absolute', top: h * 0.07, insetInline: '13%', height: h * 0.2, background: 'oklch(from var(--accent) calc(l + 0.1) c h)', borderRadius: '50%', boxShadow: 'inset 0 -3px 6px rgba(0,0,0,0.2)' }} />
      <span aria-hidden style={{ position: 'absolute', top: '-4%', insetInline: '26%', height: h * 0.4, border: '3px solid var(--accent)', borderBottom: 'none', borderRadius: `${w * 0.3}px ${w * 0.3}px 0 0`, opacity: 0.85 }} />
      {count != null && <span style={{ position: 'absolute', insetInline: 0, top: '46%', textAlign: 'center', color: 'var(--on-accent)', fontSize: size * 0.26, fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{count}</span>}
    </span>
  );
}
