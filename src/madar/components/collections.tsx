import { useLayoutEffect, useRef, useState } from 'react';
import { GLIDE } from './physics';

/* ────────────────────────────────────────────────────────────────────────
   Collections & navigation — the structural components a design system
   still needs: Tabs, Accordion, Breadcrumb, Pagination, Kanban, Calendar,
   TreeView, TagInput. All tokenized, RTL-safe.
──────────────────────────────────────────────────────────────────────── */

/* ── Tabs — underline variant, the shared line glides via transform. */
export interface TabsProps {
  tabs: string[];
  value?: number;
  defaultValue?: number;
  onChange?: (i: number) => void;
  rtl?: boolean;
}
export function Tabs({ tabs, value, defaultValue = 0, onChange, rtl = false }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const idx = value ?? internal;
  const [line, setLine] = useState({ x: 0, w: 0 });
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const wrap = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const el = btns.current[idx], w = wrap.current;
    if (el && w) { const eb = el.getBoundingClientRect(), wb = w.getBoundingClientRect(); setLine({ x: rtl ? wb.right - eb.right : eb.left - wb.left, w: eb.width }); }
  }, [idx, rtl, tabs.length]);
  return (
    <div ref={wrap} style={{ position: 'relative', display: 'flex', borderBottom: '1px solid var(--border)' }}>
      <span style={{ position: 'absolute', bottom: -1, insetInlineStart: line.x, width: line.w, height: 2, borderRadius: 2, background: 'var(--accent)', transition: `inset-inline-start 340ms ${GLIDE}, width 340ms ${GLIDE}` }} />
      {tabs.map((t, i) => (
        <button key={t} ref={(el) => { btns.current[i] = el; }} onClick={() => { if (value === undefined) setInternal(i); onChange?.(i); }} className={i === idx ? undefined : 'i-text'} style={{ border: 'none', background: 'none', padding: '0 16px', height: 42, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, color: i === idx ? 'var(--text)' : 'var(--text-2)' }}>{t}</button>
      ))}
    </div>
  );
}

/* ── Accordion — one-open group, grid-rows 0fr→1fr expansion. */
export interface AccordionItem { title: React.ReactNode; body: React.ReactNode; }
export function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderRadius: 16, border: '1px solid var(--border)', overflow: 'hidden', background: 'var(--surface)' }}>
      {items.map((it, i) => (
        <div key={i} style={{ borderTop: i ? '1px solid var(--border)' : 'none' }}>
          <button onClick={() => setOpen(open === i ? -1 : i)} className="i-surface2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '14px 16px', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: 'var(--text)', textAlign: 'start' }}>
            {it.title}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: `transform 300ms ${GLIDE}`, flex: 'none' }}><path d="M6 9l6 6 6-6" /></svg>
          </button>
          <div style={{ display: 'grid', gridTemplateRows: open === i ? '1fr' : '0fr', transition: `grid-template-rows 360ms ${GLIDE}` }}>
            <div style={{ overflow: 'hidden' }}><div style={{ padding: '0 16px 16px', fontSize: 13, color: 'var(--text-2)', lineHeight: '20px' }}>{it.body}</div></div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Breadcrumb — chevrons flip under RTL via i-chevron-dir. */
export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontSize: 13 }}>
      {items.map((it, i) => (
        <span key={it} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {i > 0 && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d="M9 6l6 6-6 6" /></svg>}
          {i === items.length - 1
            ? <span style={{ fontWeight: 600, color: 'var(--text)' }}>{it}</span>
            : <a href="#" className="i-text" style={{ color: 'var(--text-2)', textDecoration: 'none' }}>{it}</a>}
        </span>
      ))}
    </nav>
  );
}

/* ── Pagination — first/prev/pages/next/last with ellipsis. */
export function Pagination({ total, value, defaultValue = 1, onChange }: { total: number; value?: number; defaultValue?: number; onChange?: (p: number) => void }) {
  const [internal, setInternal] = useState(defaultValue);
  const page = value ?? internal;
  const go = (p: number) => { const c = Math.max(1, Math.min(p, total)); if (value === undefined) setInternal(c); onChange?.(c); };
  const pages = new Set([1, total, page, page - 1, page + 1]);
  const list: (number | '…')[] = [];
  let prev = 0;
  for (let i = 1; i <= total; i++) { if (pages.has(i)) { if (i - prev > 1) list.push('…'); list.push(i); prev = i; } }
  const arrow = (dir: 'prev' | 'next', d: string) => (
    <button aria-label={dir} onClick={() => go(page + (dir === 'next' ? 1 : -1))} disabled={dir === 'prev' ? page === 1 : page === total} className="i-soft" style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer', display: 'grid', placeItems: 'center', opacity: (dir === 'prev' ? page === 1 : page === total) ? 0.4 : 1 }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d={d} /></svg>
    </button>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {arrow('prev', 'M15 6l-6 6 6 6')}
      {list.map((p, i) => p === '…'
        ? <span key={`e${i}`} style={{ color: 'var(--text-3)', padding: '0 4px' }}>…</span>
        : <button key={p} onClick={() => go(p)} className={p === page ? undefined : 'i-soft-text'} style={{ width: 36, height: 36, borderRadius: 999, border: 'none', background: p === page ? 'var(--ink)' : 'none', color: p === page ? 'var(--on-ink)' : 'var(--text-2)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontVariantNumeric: 'tabular-nums' }}>{p}</button>)}
      {arrow('next', 'M9 6l6 6-6 6')}
    </div>
  );
}

/* ── KanbanBoard — columns of cards; drag a card to another column. */
export interface KanbanCard { id: string; title: React.ReactNode; tone?: string; }
export interface KanbanColumn { key: string; title: string; cards: KanbanCard[]; }
export function KanbanBoard({ columns: initial }: { columns: KanbanColumn[] }) {
  const [cols, setCols] = useState(initial);
  const [drag, setDrag] = useState<{ card: KanbanCard; from: string } | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const drop = (to: string) => {
    if (!drag) return;
    if (drag.from !== to) {
      setCols((cs) => cs.map((c) => {
        if (c.key === drag.from) return { ...c, cards: c.cards.filter((x) => x.id !== drag.card.id) };
        if (c.key === to) return { ...c, cards: [...c.cards, drag.card] };
        return c;
      }));
    }
    setDrag(null); setOver(null);
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols.length},1fr)`, gap: 12, alignItems: 'start' }}>
      {cols.map((col) => (
        <div
          key={col.key}
          onDragOver={(e) => { e.preventDefault(); setOver(col.key); }}
          onDrop={() => drop(col.key)}
          style={{ borderRadius: 16, background: over === col.key ? 'var(--accent-soft)' : 'var(--bg-deep)', border: `1px solid ${over === col.key ? 'var(--accent)' : 'var(--border)'}`, padding: 10, minHeight: 120, transition: 'background 180ms, border-color 180ms' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 6px 10px' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)' }}>{col.title}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', background: 'var(--surface-2)', borderRadius: 999, padding: '1px 8px', fontVariantNumeric: 'tabular-nums' }}>{col.cards.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {col.cards.map((card) => (
              <div key={card.id} draggable onDragStart={() => setDrag({ card, from: col.key })} onDragEnd={() => { setDrag(null); setOver(null); }} style={{ borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-1)', padding: '10px 12px', cursor: 'grab', opacity: drag?.card.id === card.id ? 0.4 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${card.tone ?? 'accent'})`, flex: 'none' }} />
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{card.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── CalendarMonth — month grid with event dots; select a day. */
const DOW = ['أحد', 'اثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'];
export function CalendarMonth({ year = 2026, month = 6, events = [4, 11, 12, 18, 25], defaultDay = 12, onSelect }: { year?: number; month?: number; events?: number[]; defaultDay?: number; onSelect?: (d: number) => void }) {
  const [sel, setSel] = useState(defaultDay);
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const evt = new Set(events);
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const monthName = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'][month];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontSize: 15, fontWeight: 700 }}>{monthName} {year}</span>
        <span style={{ display: 'inline-flex', gap: 4 }}>
          <button aria-label="prev" className="i-soft" style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--text-2)' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d="M15 6l-6 6 6 6" /></svg></button>
          <button aria-label="next" className="i-soft" style={{ width: 30, height: 30, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--text-2)' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d="M9 6l6 6-6 6" /></svg></button>
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
        {DOW.map((d) => <div key={d} style={{ textAlign: 'center', fontSize: 10.5, fontWeight: 600, color: 'var(--text-3)', paddingBottom: 4 }}>{d}</div>)}
        {cells.map((c, i) => c === null ? <span key={`b${i}`} /> : (
          <button key={c} onClick={() => { setSel(c); onSelect?.(c); }} style={{ position: 'relative', aspectRatio: '1', borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5, fontWeight: sel === c ? 700 : 500, fontVariantNumeric: 'tabular-nums', background: sel === c ? 'var(--accent)' : 'transparent', color: sel === c ? 'var(--on-accent)' : 'var(--text)', transition: `background 200ms ${GLIDE}` }} className={sel === c ? undefined : 'i-surface2'}>
            {c}
            {evt.has(c) && sel !== c && <span style={{ position: 'absolute', bottom: 5, insetInlineStart: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── TreeView — expandable nested rows with connector rails. */
export interface TreeNode { label: string; icon?: React.ReactNode; children?: TreeNode[]; }
function TreeRow({ node, depth }: { node: TreeNode; depth: number }) {
  const [open, setOpen] = useState(depth < 1);
  const hasKids = !!node.children?.length;
  return (
    <div>
      <button onClick={() => hasKids && setOpen((v) => !v)} className="i-surface2" style={{ display: 'flex', alignItems: 'center', gap: 7, width: '100%', border: 'none', background: 'none', cursor: hasKids ? 'pointer' : 'default', fontFamily: 'inherit', fontSize: 13, color: 'var(--text)', padding: '7px 8px', borderRadius: 8, paddingInlineStart: depth * 18 + 8, textAlign: 'start' }}>
        {hasKids
          ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 220ms', flex: 'none' }} className="i-chevron-dir"><path d="M9 6l6 6-6 6" /></svg>
          : <span style={{ width: 13, flex: 'none' }} />}
        <span style={{ display: 'inline-flex', color: hasKids ? 'var(--accent)' : 'var(--text-3)' }}>
          {node.icon ?? (hasKids
            ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" /></svg>
            : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h9l4 4v14H6V3z" /><path d="M14 3v5h5" /></svg>)}
        </span>
        {node.label}
      </button>
      {hasKids && (
        <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: `grid-template-rows 300ms ${GLIDE}` }}>
          <div style={{ overflow: 'hidden' }}>{node.children!.map((c, i) => <TreeRow key={i} node={c} depth={depth + 1} />)}</div>
        </div>
      )}
    </div>
  );
}
export function TreeView({ nodes }: { nodes: TreeNode[] }) {
  return <div>{nodes.map((n, i) => <TreeRow key={i} node={n} depth={0} />)}</div>;
}

/* ── TagInput — chips with remove + free entry. */
export function TagInput({ defaultTags = [], placeholder = 'أضف وسماً…' }: { defaultTags?: string[]; placeholder?: string }) {
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [text, setText] = useState('');
  const add = () => { const t = text.trim(); if (t && !tags.includes(t)) setTags([...tags, t]); setText(''); };
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', minHeight: 44, borderRadius: 12, border: '1px solid var(--border-strong)', background: 'var(--surface-2)', padding: '7px 10px' }}>
      {tags.map((t) => (
        <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 6px 0 11px', borderRadius: 999, background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 12.5, fontWeight: 600 }}>
          {t}
          <button aria-label={`إزالة ${t}`} onClick={() => setTags(tags.filter((x) => x !== t))} style={{ width: 18, height: 18, borderRadius: '50%', border: 'none', background: 'color-mix(in srgb, var(--accent) 22%, transparent)', color: 'var(--accent)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </span>
      ))}
      <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') add(); if (e.key === 'Backspace' && !text && tags.length) setTags(tags.slice(0, -1)); }} placeholder={placeholder} style={{ flex: 1, minWidth: 100, border: 'none', background: 'none', outline: 'none', fontFamily: 'inherit', fontSize: 14, color: 'var(--text)', height: 28 }} />
    </div>
  );
}
