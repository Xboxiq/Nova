import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { SPRING, GLIDE } from './physics';

/* ────────────────────────────────────────────────────────────────────────
   Essentials — the structural app surfaces a complete design system needs:
   DataTable, Drawer, Toast, FileDropzone, EmptyState, Banner, RangeSlider.
   All tokenized, theme-aware, RTL-safe (logical properties throughout).
──────────────────────────────────────────────────────────────────────── */

/* ── DataTable — sortable headers, optional row selection, zebra, RTL. */
export type Cell = string | number;
export interface Column<R> { key: keyof R; label: string; align?: 'start' | 'end'; sortable?: boolean; render?: (row: R) => ReactNode; }
export interface DataTableProps<R> { columns: Column<R>[]; rows: R[]; selectable?: boolean; initialSort?: keyof R; }

export function DataTable<R extends Record<string, Cell>>({ columns, rows, selectable, initialSort }: DataTableProps<R>) {
  const [sort, setSort] = useState<{ key: keyof R; dir: 1 | -1 } | null>(initialSort ? { key: initialSort, dir: 1 } : null);
  const [sel, setSel] = useState<Set<number>>(new Set());
  const sorted = useMemo(() => {
    if (!sort) return rows.map((r, i) => [r, i] as const);
    return rows.map((r, i) => [r, i] as const).sort(([a], [b]) => {
      const av = a[sort.key], bv = b[sort.key];
      return (av < bv ? -1 : av > bv ? 1 : 0) * sort.dir;
    });
  }, [rows, sort]);
  const toggle = (i: number) => setSel((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const allOn = sel.size === rows.length && rows.length > 0;
  const th: React.CSSProperties = { textAlign: 'start', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-3)', padding: '10px 14px', whiteSpace: 'nowrap' };
  const td: React.CSSProperties = { fontSize: 13.5, padding: '11px 14px', color: 'var(--text)', borderTop: '1px solid var(--border)' };
  return (
    <div style={{ overflowX: 'auto', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--surface)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 420 }}>
        <thead>
          <tr>
            {selectable && (
              <th style={{ ...th, width: 40 }}>
                <input type="checkbox" checked={allOn} onChange={() => setSel(allOn ? new Set() : new Set(rows.map((_, i) => i)))} style={{ accentColor: 'var(--accent)', cursor: 'pointer' }} />
              </th>
            )}
            {columns.map((c) => (
              <th key={String(c.key)} style={{ ...th, textAlign: c.align ?? 'start', cursor: c.sortable ? 'pointer' : 'default', userSelect: 'none' }}
                onClick={() => c.sortable && setSort((s) => s?.key === c.key ? { key: c.key, dir: s.dir === 1 ? -1 : 1 } : { key: c.key, dir: 1 })}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  {c.label}
                  {c.sortable && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: sort?.key === c.key ? 1 : 0.3, transform: sort?.key === c.key && sort.dir === -1 ? 'rotate(180deg)' : 'none', transition: `transform 220ms ${GLIDE}` }}><path d="M6 15l6 6 6-6M6 9l6-6 6 6" /></svg>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map(([row, i], vi) => (
            <tr key={i} style={{ background: sel.has(i) ? 'var(--accent-soft)' : vi % 2 ? 'color-mix(in srgb, var(--surface-2) 45%, transparent)' : 'transparent', transition: 'background 160ms' }}>
              {selectable && <td style={{ ...td, textAlign: 'center' }}><input type="checkbox" checked={sel.has(i)} onChange={() => toggle(i)} style={{ accentColor: 'var(--accent)', cursor: 'pointer' }} /></td>}
              {columns.map((c) => <td key={String(c.key)} style={{ ...td, textAlign: c.align ?? 'start', fontVariantNumeric: typeof row[c.key] === 'number' ? 'tabular-nums' : undefined }}>{c.render ? c.render(row) : row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Drawer — a sheet that slides in from an edge over a scrim. Self-driven
      by a trigger button; `side` is logical so it mirrors under RTL. */
export interface DrawerProps { triggerLabel?: string; title?: string; side?: 'end' | 'start' | 'bottom'; children?: ReactNode; }
export function Drawer({ triggerLabel = 'افتح اللوحة', title = 'اللوحة', side = 'end', children }: DrawerProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const isBottom = side === 'bottom';
  const hidden = isBottom ? 'translateY(100%)' : side === 'end' ? 'translateX(calc(var(--dir-sign,1) * 100%))' : 'translateX(calc(var(--dir-sign,1) * -100%))';
  const panelPos: React.CSSProperties = isBottom
    ? { insetInline: 0, bottom: 0, maxHeight: '80%', borderStartStartRadius: 20, borderStartEndRadius: 20 }
    : { insetBlock: 0, [side === 'end' ? 'insetInlineEnd' : 'insetInlineStart']: 0, width: 'min(380px, 86%)' } as React.CSSProperties;
  return (
    <>
      <button onClick={() => setOpen(true)} className="i-press-97 i-lift" style={{ height: 42, padding: '0 20px', borderRadius: 12, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{triggerLabel}</button>
      <div aria-hidden={!open} style={{ position: 'fixed', inset: 0, zIndex: 60, pointerEvents: open ? 'auto' : 'none' }}>
        <div onClick={() => setOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.42)', opacity: open ? 1 : 0, transition: `opacity 320ms ${GLIDE}`, backdropFilter: open ? 'blur(2px)' : 'none' }} />
        <div role="dialog" aria-modal="true" style={{ position: 'absolute', ...panelPos, background: 'var(--surface)', boxShadow: 'var(--shadow-3)', borderInlineStart: side === 'end' ? '1px solid var(--border)' : undefined, borderInlineEnd: side === 'start' ? '1px solid var(--border)' : undefined, transform: open ? 'none' : hidden, transition: `transform 420ms ${SPRING}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
            <b style={{ fontSize: 15.5 }}>{title}</b>
            <button aria-label="إغلاق" onClick={() => setOpen(false)} className="i-soft" style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'var(--surface-2)', color: 'var(--text-2)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
          <div style={{ padding: 18, overflowY: 'auto', fontSize: 14, lineHeight: '22px', color: 'var(--text-2)' }}>{children ?? 'محتوى اللوحة المنزلقة. مرِّر Esc أو انقر الخلفية للإغلاق.'}</div>
        </div>
      </div>
    </>
  );
}

/* ── Toast — a stack of transient messages, spring-in, auto-dismiss. Shown
      here self-contained with a trigger; the same reducer powers a provider. */
export type ToastTone = 'info' | 'success' | 'warning' | 'danger';
interface ToastItem { id: number; tone: ToastTone; text: string; }
const TONE_ICON: Record<ToastTone, ReactNode> = {
  success: <path d="M20 6L9 17l-5-5" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v4h1" /></>,
  warning: <><path d="M12 3l9 16H3z" /><path d="M12 10v4M12 17h.01" /></>,
  danger: <><circle cx="12" cy="12" r="9" /><path d="M15 9l-6 6M9 9l6 6" /></>,
};
const TONE_COLOR: Record<ToastTone, string> = { success: 'var(--success)', info: 'var(--accent)', warning: 'var(--warning)', danger: 'var(--danger)' };
export function ToastDemo() {
  const [items, setItems] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const samples: [ToastTone, string][] = [['success', 'تم الحفظ بنجاح'], ['info', 'مزامنة جارية'], ['warning', 'مساحة التخزين منخفضة'], ['danger', 'فشل الاتصال']];
  const push = () => {
    const [tone, text] = samples[idRef.current % samples.length];
    const id = idRef.current++;
    setItems((xs) => [...xs, { id, tone, text }]);
    setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), 3200);
  };
  return (
    <>
      <button onClick={push} className="i-press-97 i-lift" style={{ height: 42, padding: '0 20px', borderRadius: 12, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>أطلق تنبيهاً</button>
      <div style={{ position: 'fixed', insetInlineEnd: 20, bottom: 20, zIndex: 70, display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none' }}>
        {items.map((t) => (
          <div key={t.id} style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 10, minWidth: 240, padding: '12px 14px', borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-3)', animation: `toastIn 420ms ${SPRING} both` }}>
            <span style={{ width: 26, height: 26, borderRadius: 8, background: `color-mix(in srgb, ${TONE_COLOR[t.tone]} 16%, transparent)`, color: TONE_COLOR[t.tone], display: 'grid', placeItems: 'center', flex: 'none' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{TONE_ICON[t.tone]}</svg>
            </span>
            <span style={{ fontSize: 13.5, fontWeight: 500, flex: 1 }}>{t.text}</span>
            <button aria-label="إغلاق" onClick={() => setItems((xs) => xs.filter((x) => x.id !== t.id))} style={{ border: 'none', background: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: 2, lineHeight: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── FileDropzone — drag-and-drop upload with a growing file list. */
export interface DroppedFile { name: string; size: number; }
export function FileDropzone({ onFiles }: { onFiles?: (f: DroppedFile[]) => void }) {
  const [over, setOver] = useState(false);
  const [files, setFiles] = useState<DroppedFile[]>([]);
  const add = (list: FileList | null) => {
    if (!list) return;
    const next = Array.from(list).map((f) => ({ name: f.name, size: f.size }));
    setFiles((xs) => { const all = [...xs, ...next]; onFiles?.(all); return all; });
  };
  const fmt = (b: number) => b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`;
  const input = useRef<HTMLInputElement | null>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); add(e.dataTransfer.files); }}
        onClick={() => input.current?.click()}
        style={{ display: 'grid', placeItems: 'center', gap: 8, padding: '26px 18px', borderRadius: 14, cursor: 'pointer', border: `1.5px dashed ${over ? 'var(--accent)' : 'var(--border-strong)'}`, background: over ? 'var(--accent-soft)' : 'var(--surface-2)', transition: `background 180ms, border-color 180ms`, textAlign: 'center' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={over ? 'var(--accent)' : 'var(--text-3)'} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ transition: `transform 300ms ${SPRING}`, transform: over ? 'translateY(-3px)' : 'none' }}><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></svg>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-2)' }}>اسحب الملفات هنا أو انقر للاختيار</span>
        <input ref={input} type="file" multiple hidden onChange={(e) => add(e.target.files)} />
      </div>
      {files.map((f, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', animation: `fadeUp 320ms ${GLIDE} both` }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5" /></svg>
          <span style={{ fontSize: 13, fontWeight: 500, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
          <span style={{ fontSize: 11.5, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>{fmt(f.size)}</span>
          <button aria-label="إزالة" onClick={() => setFiles((xs) => xs.filter((_, j) => j !== i))} style={{ border: 'none', background: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: 2, lineHeight: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      ))}
    </div>
  );
}

/* ── EmptyState — the "nothing here yet" surface: icon, title, copy, action. */
export interface EmptyStateProps { title?: string; description?: string; cta?: string; icon?: ReactNode; onAction?: () => void; }
export function EmptyState({ title = 'لا شيء هنا بعد', description = 'ابدأ بإضافة أول عنصر وستظهر القائمة هنا.', cta = 'إضافة عنصر', icon, onAction }: EmptyStateProps) {
  return (
    <div style={{ display: 'grid', placeItems: 'center', gap: 12, textAlign: 'center', padding: '36px 20px', borderRadius: 18, border: '1px dashed var(--border-strong)', background: 'var(--surface-2)' }}>
      <span style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-1)', display: 'grid', placeItems: 'center', color: 'var(--accent)' }}>
        {icon ?? <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l9-4 9 4-9 4-9-4z" /><path d="M3 7v10l9 4 9-4V7" /><path d="M12 11v10" /></svg>}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <b style={{ fontSize: 16, letterSpacing: '-0.01em' }}>{title}</b>
        <span style={{ fontSize: 13.5, color: 'var(--text-3)', maxWidth: '34ch', lineHeight: '20px' }}>{description}</span>
      </div>
      {cta && <button onClick={onAction} className="i-press-97 i-lift" style={{ height: 40, padding: '0 20px', borderRadius: 10, border: 'none', background: 'var(--accent)', color: 'var(--on-accent)', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>{cta}</button>}
    </div>
  );
}

/* ── Banner — inline status message, four tones, dismissible. */
export function Banner({ tone = 'info', title, children, dismissible = true }: { tone?: ToastTone; title?: string; children?: ReactNode; dismissible?: boolean }) {
  const [show, setShow] = useState(true);
  if (!show) return null;
  const c = TONE_COLOR[tone];
  return (
    <div role="status" style={{ display: 'flex', alignItems: 'flex-start', gap: 11, padding: '13px 15px', borderRadius: 12, background: `color-mix(in srgb, ${c} 10%, var(--surface))`, border: `1px solid color-mix(in srgb, ${c} 32%, transparent)` }}>
      <span style={{ color: c, flex: 'none', marginTop: 1 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{TONE_ICON[tone]}</svg>
      </span>
      <div style={{ flex: 1, fontSize: 13.5, lineHeight: '20px' }}>
        {title && <b style={{ display: 'block', marginBottom: 2 }}>{title}</b>}
        <span style={{ color: 'var(--text-2)' }}>{children}</span>
      </div>
      {dismissible && (
        <button aria-label="إغلاق" onClick={() => setShow(false)} style={{ border: 'none', background: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: 2, lineHeight: 0, flex: 'none' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      )}
    </div>
  );
}

/* ── RangeSlider — dual-handle min/max over a filled track, RTL-aware. */
export function RangeSlider({ min = 0, max = 100, defaultLow = 25, defaultHigh = 75, step = 1, prefix = '' }: { min?: number; max?: number; defaultLow?: number; defaultHigh?: number; step?: number; prefix?: string }) {
  const [lo, setLo] = useState(defaultLow);
  const [hi, setHi] = useState(defaultHigh);
  const track = useRef<HTMLDivElement | null>(null);
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  const drag = (which: 'lo' | 'hi') => (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const move = (ev: PointerEvent) => {
      const r = track.current!.getBoundingClientRect();
      const rtl = getComputedStyle(track.current!).direction === 'rtl';
      let ratio = (ev.clientX - r.left) / r.width;
      if (rtl) ratio = 1 - ratio;
      const raw = min + Math.max(0, Math.min(1, ratio)) * (max - min);
      const v = Math.round(raw / step) * step;
      if (which === 'lo') setLo(Math.min(v, hi - step)); else setHi(Math.max(v, lo + step));
    };
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  };
  const Handle = ({ v, on }: { v: number; on: (e: React.PointerEvent) => void }) => (
    <span onPointerDown={on} style={{ position: 'absolute', insetInlineStart: `${pct(v)}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: 'var(--surface)', border: '2px solid var(--accent)', boxShadow: 'var(--shadow-2)', cursor: 'grab', touchAction: 'none' }} />
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 300 }}>
      <div ref={track} style={{ position: 'relative', height: 6, borderRadius: 999, background: 'var(--surface-2)' }}>
        <span style={{ position: 'absolute', insetInlineStart: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%`, top: 0, bottom: 0, background: 'var(--accent)', borderRadius: 999 }} />
        <Handle v={lo} on={drag('lo')} />
        <Handle v={hi} on={drag('hi')} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
        <span>{prefix}{lo}</span>
        <span>{prefix}{hi}</span>
      </div>
    </div>
  );
}
