import { useLayoutEffect, useRef, useState } from 'react';

const glide = 'cubic-bezier(0.16,1,0.3,1)';

/* ────────────────────────────────────────────────────────────────────────
   ToolbarDock — ruixen.ui/toolbar-dock (design.md §18.3)
   Horizontal glass rail whose accent pill glides AND stretches between
   different-width tools (§19.1 tab pill glide: animate position + width
   from real measurements). The active tool absorbs its label. RTL-safe:
   the pill is measured from the logical start edge.
──────────────────────────────────────────────────────────────────────── */
export interface Tool {
  label: string;
  icon: React.ReactNode;
}
export interface ToolbarDockProps {
  tools: Tool[];
  active?: number;
  defaultActive?: number;
  onChange?: (index: number) => void;
  /** Set true when rendered under dir="rtl" so the pill measures from the right edge. */
  rtl?: boolean;
}

export function ToolbarDock({ tools, active, defaultActive = 0, onChange, rtl = false }: ToolbarDockProps) {
  const [internal, setInternal] = useState(defaultActive);
  const idx = active ?? internal;
  const [pill, setPill] = useState({ x: 0, w: 0 });
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const wrap = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = btns.current[idx];
    const w = wrap.current;
    if (el && w) {
      const eb = el.getBoundingClientRect();
      const wb = w.getBoundingClientRect();
      setPill({ x: rtl ? wb.right - eb.right : eb.left - wb.left, w: eb.width });
    }
  }, [idx, rtl, tools.length]);

  return (
    <div ref={wrap} style={{ position: 'relative', display: 'inline-flex', gap: 4, padding: 6, borderRadius: 18, background: 'var(--glass)', backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', border: '1px solid var(--border)', boxShadow: 'var(--shadow-2), inset 0 1px 0 var(--glass-hl)' }}>
      <span style={{ position: 'absolute', top: 6, bottom: 6, insetInlineStart: pill.x, width: pill.w, borderRadius: 12, background: 'var(--accent)', boxShadow: 'var(--shadow-1)', transition: `inset-inline-start 400ms ${glide}, width 400ms ${glide}` }} />
      {tools.map((t, i) => (
        <button
          key={t.label}
          ref={(el) => { btns.current[i] = el; }}
          onClick={() => { if (active === undefined) setInternal(i); onChange?.(i); }}
          aria-label={t.label}
          aria-pressed={idx === i}
          style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 7, height: 40, padding: idx === i ? '0 14px' : '0 11px', borderRadius: 12, border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, color: idx === i ? 'var(--on-accent)' : 'var(--text-2)', transition: 'color 300ms' }}
        >
          <span style={{ display: 'inline-flex' }}>{t.icon}</span>
          {idx === i && <span>{t.label}</span>}
        </button>
      ))}
    </div>
  );
}
