import { useState } from 'react';

const spring = 'cubic-bezier(0.34,1.45,0.64,1)';
const bouncy = 'cubic-bezier(0.3,2.1,0.5,1)';

function useControllable(controlled: boolean | undefined, defaultValue: boolean, onChange?: (v: boolean) => void) {
  const [internal, setInternal] = useState(defaultValue);
  const value = controlled ?? internal;
  const set = (v: boolean) => { if (controlled === undefined) setInternal(v); onChange?.(v); };
  return [value, set] as const;
}

/* ────────────────────────────────────────────────────────────────────────
   BouncyToggle — jatin-yadav05/bouncy-toggle (design.md §18.1)
   Switch with an exaggerated overshoot spring (480ms). Consumer surfaces
   only — admin keeps the plain §8.2 switch.
──────────────────────────────────────────────────────────────────────── */
export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  'aria-label'?: string;
}

export function BouncyToggle({ checked, defaultChecked = false, onChange, 'aria-label': ariaLabel = 'Toggle' }: ToggleProps) {
  const [on, setOn] = useControllable(checked, defaultChecked, onChange);
  return (
    <button role="switch" aria-checked={on} aria-label={ariaLabel} onClick={() => setOn(!on)} style={{ position: 'relative', width: 58, height: 34, borderRadius: 6, border: 'none', padding: 0, cursor: 'pointer', flex: 'none', background: on ? 'var(--accent)' : 'var(--border-strong)', transition: 'background 260ms' }}>
      <span style={{ position: 'absolute', top: 3, insetInlineStart: on ? 27 : 3, width: 28, height: 28, borderRadius: '50%', background: '#fff', transition: `inset-inline-start 480ms ${bouncy}` }} />
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   CinematicThemeSwitch — daiwiikharihar17147/cinematic-glow-toggle +
   omrohilla6/cinematic-theme-switcher (design.md §18.1)
   92×44 track: day = sky→sand gradient with a glowing sun knob; night =
   indigo gradient, moon knob with an inner-shadow crescent, twinkling
   stars. THE light/dark control on marketing pages.
──────────────────────────────────────────────────────────────────────── */
export function CinematicThemeSwitch({ checked, defaultChecked = false, onChange, 'aria-label': ariaLabel = 'Theme switch' }: ToggleProps) {
  const [night, setNight] = useControllable(checked, defaultChecked, onChange);
  return (
    <button
      role="switch" aria-checked={night} aria-label={ariaLabel} onClick={() => setNight(!night)}
      style={{
        position: 'relative', width: 92, height: 44, borderRadius: 6, border: '1px solid var(--border)', padding: 0, cursor: 'pointer', overflow: 'hidden', flex: 'none',
        background: night ? 'linear-gradient(115deg, oklch(0.22 0.05 274), oklch(0.32 0.06 290))' : 'linear-gradient(115deg, #BFE3FF, #FFE9C4)',
        transition: 'background 560ms',
      }}
    >
      <span aria-hidden style={{ position: 'absolute', inset: 0, opacity: night ? 1 : 0, transition: 'opacity 560ms' }}>
        <span style={{ position: 'absolute', top: 9, insetInlineStart: 14, width: 2.5, height: 2.5, borderRadius: '50%', background: '#fff', animation: 'thinkDots 2.2s ease-in-out infinite' }} />
        <span style={{ position: 'absolute', top: 22, insetInlineStart: 26, width: 2, height: 2, borderRadius: '50%', background: '#fff', animation: 'thinkDots 1.8s ease-in-out 0.4s infinite' }} />
        <span style={{ position: 'absolute', top: 13, insetInlineStart: 36, width: 2, height: 2, borderRadius: '50%', background: '#fff', animation: 'thinkDots 2.6s ease-in-out 0.8s infinite' }} />
      </span>
      <span style={{
        position: 'absolute', top: 4, insetInlineStart: night ? 52 : 4, width: 34, height: 34, borderRadius: '50%',
        background: night ? '#E8ECFF' : '#FFD75E',
        boxShadow: night ? 'inset -4px -3px 0 rgba(140,150,200,0.45)' : 'none',
        transition: `inset-inline-start 560ms ${spring}, background 560ms, box-shadow 560ms`,
      }} />
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   ToggleChips — hero_ui/heroui-toggle-button (design.md §18.1)
   Selectable pills: border-strong → accent fill on select. Multi- or
   single-select. Use for filters and tag pickers.
──────────────────────────────────────────────────────────────────────── */
export interface ToggleChipsProps {
  options: string[];
  /** Controlled selection (indices). */
  value?: number[];
  defaultValue?: number[];
  onChange?: (selected: number[]) => void;
  /** false → radio-style single select. Default true. */
  multiple?: boolean;
}

export function ToggleChips({ options, value, defaultValue = [], onChange, multiple = true }: ToggleChipsProps) {
  const [internal, setInternal] = useState<number[]>(defaultValue);
  const sel = value ?? internal;
  const toggle = (i: number) => {
    const has = sel.includes(i);
    const next = multiple ? (has ? sel.filter((x) => x !== i) : [...sel, i]) : (has ? [] : [i]);
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((label, i) => {
        const on = sel.includes(i);
        return (
          <button
            key={label} onClick={() => toggle(i)} aria-pressed={on} className="i-press-96"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, height: 36, padding: '0 15px', borderRadius: 6, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
              border: on ? '1px solid var(--accent)' : '1px solid var(--border-strong)',
              background: on ? 'var(--accent)' : 'var(--surface)',
              color: on ? 'var(--on-accent)' : 'var(--text-2)',
              transition: 'background 220ms, color 220ms, border-color 220ms, transform 140ms',
            }}
          >
            {on && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>}
            {label}
          </button>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   GlowMenu — uniquesonu/glow-menu (design.md §18.1)
   Pill nav where the active item radiates an accent glow. One glowing
   element per bar — it counts as the accent moment.
──────────────────────────────────────────────────────────────────────── */
export interface GlowMenuProps {
  items: string[];
  active?: number;
  defaultActive?: number;
  onChange?: (index: number) => void;
}

export function GlowMenu({ items, active, defaultActive = 0, onChange }: GlowMenuProps) {
  const [internal, setInternal] = useState(defaultActive);
  const idx = active ?? internal;
  return (
    <nav style={{ display: 'inline-flex', gap: 6, padding: 6, borderRadius: 6, background: 'var(--bg-deep)', border: '1px solid var(--border)' }}>
      {items.map((label, i) => (
        <button
          key={label}
          onClick={() => { if (active === undefined) setInternal(i); onChange?.(i); }}
          className={i === idx ? undefined : 'i-soft-text'}
          style={{
            border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: '9px 16px', borderRadius: 6,
            background: i === idx ? 'var(--accent)' : 'transparent',
            color: i === idx ? 'var(--on-accent)' : 'var(--text-2)',
            boxShadow: 'none',
            transition: 'background 220ms, color 220ms, box-shadow 220ms',
          }}
        >{label}</button>
      ))}
    </nav>
  );
}
