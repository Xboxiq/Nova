import { useEffect, useRef, useState } from 'react';
import { MemojiAvatar } from './soft';

/* ────────────────────────────────────────────────────────────────────────
   Social & people — Jahez pattern library (reaction bar, comment thread,
   live cursor, testimonial slider, team section, assignee, avatar badge,
   avatar stack, years timeline).
──────────────────────────────────────────────────────────────────────── */

/* ── ReactionBar — emoji chips with counts + a dashed add button. */
export function ReactionBar({ reactions: initial }: { reactions: { emoji: string; count: number; mine?: boolean }[] }) {
  const [rs, setRs] = useState(initial);
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
      {rs.map((r, i) => (
        <button
          key={r.emoji}
          onClick={() => setRs((prev) => prev.map((x, j) => (j === i ? { ...x, mine: !x.mine, count: x.count + (x.mine ? -1 : 1) } : x)))}
          className="i-press-94"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 11px', borderRadius: 6, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600,
            border: r.mine ? '1px solid var(--accent)' : '1px solid var(--border)',
            background: r.mine ? 'var(--accent-soft)' : 'var(--surface-2)',
            color: r.mine ? 'var(--accent)' : 'var(--text-2)',
            transition: 'background 200ms, border-color 200ms, color 200ms, transform 140ms',
          }}
        >
          <span style={{ fontSize: 14 }}>{r.emoji}</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{r.count}</span>
        </button>
      ))}
      <button aria-label="Add reaction" className="i-soft" style={{ width: 30, height: 30, borderRadius: 6, border: '1px dashed var(--border-strong)', background: 'none', color: 'var(--text-3)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );
}

/* ── TypingDots — the three pulsing dots inside a bubble. */
export function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, padding: '9px 13px', borderRadius: '6px 6px 6px 4px', background: 'var(--surface-2)' }}>
      {[0, 0.18, 0.36].map((d) => <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-3)', animation: `thinkDots 1.1s ease-in-out ${d}s infinite` }} />)}
    </span>
  );
}

/* ── CommentThread — root comment + indented reply + typing indicator. */
export interface ThreadComment { name: string; text: React.ReactNode; time: string; }

export function CommentThread({ root, reply, typingName }: { root: ThreadComment; reply?: ThreadComment; typingName?: string }) {
  const Row = ({ c }: { c: ThreadComment }) => (
    <div style={{ display: 'flex', gap: 10 }}>
      <MemojiAvatar name={c.name} size={32} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>{c.name}</span>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{c.time}</span>
        </div>
        <div style={{ fontSize: 13.5, lineHeight: '20px', color: 'var(--text-2)', marginTop: 2 }}>{c.text}</div>
      </div>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Row c={root} />
      {reply && <div style={{ paddingInlineStart: 26, borderInlineStart: '2px solid var(--border)', marginInlineStart: 15 }}><Row c={reply} /></div>}
      {typingName && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingInlineStart: 41 }}>
          <TypingDots />
          <span style={{ fontSize: 11.5, color: 'var(--text-3)' }}>{typingName} تكتب الآن…</span>
        </div>
      )}
    </div>
  );
}

/* ── LiveCursorLabel — colored SVG cursor + name tag at its tip, for
      collaborative canvases. */
export function LiveCursorLabel({ name, color = 'var(--accent)' }: { name: string; color?: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', animation: 'floaty 5s ease-in-out infinite' }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill={color} stroke="#fff" strokeWidth="1.4"><path d="M5 3l14 8-6.5 1.5L9 19 5 3z" /></svg>
      <span style={{ position: 'absolute', top: 16, insetInlineStart: 14, whiteSpace: 'nowrap', padding: '3px 9px', borderRadius: 6, background: color, color: '#fff', fontSize: 11, fontWeight: 700, }}>{name}</span>
    </span>
  );
}

export interface Testimonial { quote: React.ReactNode; name: string; role: string; }

/* ── TeamSection — member rows: avatar + name + role + follow button. */
export interface TeamMember { name: string; role: string; }

export function TeamSection({ members }: { members: TeamMember[] }) {
  const [following, setFollowing] = useState<Set<number>>(new Set());
  return (
    <div style={{ borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden' }}>
      {members.map((m, i) => {
        const on = following.has(i);
        return (
          <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: i ? '1px solid var(--border)' : 'none' }}>
            <MemojiAvatar name={m.name} size={38} />
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>{m.name}</span>
              <span style={{ display: 'block', fontSize: 12, color: 'var(--text-3)' }}>{m.role}</span>
            </span>
            <button
              onClick={() => setFollowing((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; })}
              className="i-press-96"
              style={{ height: 32, padding: '0 14px', borderRadius: 6, fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', border: on ? '1px solid var(--border)' : 'none', background: on ? 'var(--surface)' : 'var(--ink)', color: on ? 'var(--text-2)' : 'var(--on-ink)', transition: 'background 220ms, color 220ms' }}
            >{on ? 'متابَع' : 'متابعة'}</button>
          </div>
        );
      })}
    </div>
  );
}

/* ── AssigneeUser — avatar + name button opening a people picker. */
export function AssigneeUser({ people, defaultIndex = 0 }: { people: string[]; defaultIndex?: number }) {
  const [sel, setSel] = useState(defaultIndex);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={() => setOpen((v) => !v)} className="i-soft" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, padding: '0 12px 0 5px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
        <MemojiAvatar name={people[sel]} size={26} />
        {people[sel]}
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 8px)', insetInlineStart: 0, zIndex: 30, minWidth: 180, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', padding: 5, animation: 'modalIn 300ms cubic-bezier(0.22,1,0.36,1)' }}>
          {people.map((p, i) => (
            <div key={p} onClick={() => { setSel(i); setOpen(false); }} className={i === sel ? undefined : 'i-surface2'} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 9px', borderRadius: 6, fontSize: 13, fontWeight: i === sel ? 700 : 500, background: i === sel ? 'var(--accent-soft)' : undefined, cursor: 'pointer' }}>
              <MemojiAvatar name={p} size={24} />{p}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── AvatarBadge — count / online / alert badge floating over an avatar edge. */
export function AvatarBadge({ name, badge, size = 44 }: { name: string; badge: number | 'online' | 'alert'; size?: number }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <MemojiAvatar name={name} size={size} />
      {badge === 'online' && <span style={{ position: 'absolute', bottom: 1, insetInlineEnd: 1, width: 12, height: 12, borderRadius: '50%', background: 'var(--success)', border: '2.5px solid var(--surface)' }} />}
      {badge === 'alert' && <span style={{ position: 'absolute', top: -2, insetInlineEnd: -2, width: 14, height: 14, borderRadius: '50%', background: 'var(--danger)', border: '2.5px solid var(--surface)' }} />}
      {typeof badge === 'number' && (
        <span style={{ position: 'absolute', top: -5, insetInlineEnd: -5, minWidth: 19, height: 19, padding: '0 5px', borderRadius: 6, background: 'var(--danger)', color: '#fff', fontSize: 10.5, fontWeight: 800, display: 'grid', placeItems: 'center', border: '2px solid var(--surface)', fontVariantNumeric: 'tabular-nums', boxSizing: 'border-box' }}>{badge}</span>
      )}
    </span>
  );
}

/* ── AvatarStack — overlapping circles + a "+N" overflow chip. */
export function AvatarStack({ names, more, size = 32 }: { names: string[]; more?: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex' }}>
      {names.map((n, i) => (
        <span key={n} style={{ marginInlineStart: i ? -size * 0.28 : 0, borderRadius: '50%', border: '2px solid var(--surface)', display: 'inline-flex' }}>
          <MemojiAvatar name={n} size={size} />
        </span>
      ))}
      {more != null && more > 0 && (
        <span style={{ marginInlineStart: -size * 0.28, width: size + 4, height: size + 4, borderRadius: '50%', background: 'var(--surface-2)', border: '2px solid var(--surface)', display: 'inline-grid', placeItems: 'center', fontSize: size * 0.32, fontWeight: 700, color: 'var(--text-2)', boxSizing: 'border-box' }}>+{more}</span>
      )}
    </span>
  );
}

/* ── YearsTimeline — stations on a line: year, title, copy (Aceternity). */
export interface TimelineStation { year: string; title: React.ReactNode; text: React.ReactNode; }

export function YearsTimeline({ stations }: { stations: TimelineStation[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {stations.map((s, i) => (
        <div key={s.year} style={{ display: 'flex', gap: 14 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', flex: 'none', background: i === 0 ? 'var(--accent)' : 'var(--surface)', border: `2.5px solid ${i === 0 ? 'var(--accent)' : 'var(--border-strong)'}`, boxShadow: i === 0 ? '0 0 0 4px var(--accent-soft)' : 'none', marginTop: 4 }} />
            {i < stations.length - 1 && <span style={{ width: 2, flex: 1, background: 'var(--border)', borderRadius: 2 }} />}
          </div>
          <div style={{ paddingBottom: i < stations.length - 1 ? 18 : 0 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, fontFamily: 'var(--font-mono)', color: i === 0 ? 'var(--accent)' : 'var(--text-3)' }}>{s.year}</div>
            <div style={{ fontSize: 14.5, fontWeight: 600, margin: '2px 0' }}>{s.title}</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: '19px' }}>{s.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
