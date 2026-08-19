import { useState } from 'react';

/* ────────────────────────────────────────────────────────────────────────
   ListBox — hero_ui/heroui-list-box (design.md §18.2)
   Options described by an icon tile + title + description; the selected
   row gets the accent tile, soft fill, and a check.
──────────────────────────────────────────────────────────────────────── */
export interface ListBoxOption {
  title: string;
  description: string;
  icon: React.ReactNode;
}
export interface ListBoxProps {
  options: ListBoxOption[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
}

export function ListBox({ options, value, defaultValue = 0, onChange }: ListBoxProps) {
  const [internal, setInternal] = useState(defaultValue);
  const sel = value ?? internal;
  return (
    <div role="listbox" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {options.map((o, i) => {
        const on = sel === i;
        return (
          <div
            key={o.title}
            role="option"
            aria-selected={on}
            onClick={() => { if (value === undefined) setInternal(i); onChange?.(i); }}
            className={on ? undefined : 'i-surface2'}
            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 6, background: on ? 'var(--accent-soft)' : undefined, cursor: 'pointer', transition: 'background 140ms' }}
          >
            <span style={{ width: 36, height: 36, borderRadius: 6, background: on ? 'var(--accent)' : 'var(--surface-2)', color: on ? 'var(--on-accent)' : 'var(--text-2)', display: 'grid', placeItems: 'center', flex: 'none', transition: 'background 140ms, color 140ms' }}>{o.icon}</span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 600 }}>{o.title}</span>
              <span style={{ display: 'block', fontSize: 12, color: 'var(--text-2)' }}>{o.description}</span>
            </span>
            {on && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>}
          </div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   ActivityDropdown — minhxthanh/activity-dropdown (design.md §18.2)
   Avatar + verb + timestamp rows; unread rows carry a start-aligned
   accent dot. For notification bells.
──────────────────────────────────────────────────────────────────────── */
export interface ActivityItem {
  /** e.g. <><b>سارة</b> approved your request</> */
  content: React.ReactNode;
  initials: string;
  /** Avatar tint token: 'accent' | 'info' | 'warning' | 'success' | 'danger'. */
  tint?: string;
  time: string;
  unread?: boolean;
}

export function ActivityDropdown({ items }: { items: ActivityItem[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map((it, i) => (
        <div key={i} className="i-surface2" style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 10px', borderRadius: 6, transition: 'background 140ms', cursor: 'pointer' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: it.unread ? 'var(--accent)' : 'transparent', flex: 'none' }} />
          <span style={{ width: 30, height: 30, borderRadius: '50%', background: `var(--${it.tint ?? 'accent'}-soft)`, display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700, flex: 'none' }}>{it.initials}</span>
          <span style={{ flex: 1, fontSize: 13, lineHeight: '18px', color: it.unread ? undefined : 'var(--text-2)' }}>{it.content}</span>
          <span style={{ fontSize: 11.5, color: 'var(--text-3)', flex: 'none' }}>{it.time}</span>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   EventCard — vaib215/event-manager (design.md §18.2)
   Title + status badge, iconed detail rows, capacity bar with tabular
   percentage, ink CTA + ghost secondary. Bookings, classes, appointments.
──────────────────────────────────────────────────────────────────────── */
export interface EventDetail { icon: React.ReactNode; text: React.ReactNode; }
export interface EventCardProps {
  title: React.ReactNode;
  status?: { label: string; tone: 'success' | 'warning' | 'danger' | 'info' };
  details: EventDetail[];
  /** 0–1 capacity. Omit to hide the bar. */
  capacity?: number;
  capacityLabel?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
}

export function EventCard({ title, status, details, capacity, capacityLabel, primaryLabel = 'Enroll', secondaryLabel = 'Details', onPrimary, onSecondary }: EventCardProps) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
        {status && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 6, background: `var(--${status.tone}-soft)`, color: `var(--${status.tone})`, fontSize: 12, fontWeight: 600, flex: 'none' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: `var(--${status.tone})` }} />{status.label}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5, color: 'var(--text-2)' }}>
        {details.map((d, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-flex', color: 'var(--accent)', flex: 'none' }}>{d.icon}</span>{d.text}
          </span>
        ))}
      </div>
      {capacity != null && (
        <>
          <div style={{ height: 6, borderRadius: 6, background: 'var(--surface-2)', margin: '16px 0 6px' }}>
            <div style={{ width: `${Math.round(capacity * 100)}%`, height: 6, borderRadius: 6, background: 'var(--accent)', transition: 'width 560ms cubic-bezier(0.22,1,0.36,1)' }} />
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-3)', marginBottom: 16, fontVariantNumeric: 'tabular-nums' }}>{capacityLabel ?? `${Math.round(capacity * 100)}% capacity`}</div>
        </>
      )}
      <div style={{ display: 'flex', gap: 10, marginTop: capacity == null ? 16 : 0 }}>
        <button onClick={onPrimary} className="i-lift i-press-97" style={{ flex: 1, height: 40, borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>{primaryLabel}</button>
        <button onClick={onSecondary} className="i-soft" style={{ height: 40, padding: '0 16px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>{secondaryLabel}</button>
      </div>
    </div>
  );
}
