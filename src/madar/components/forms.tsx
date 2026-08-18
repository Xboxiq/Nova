import { useState } from 'react';

const spring = 'cubic-bezier(0.34,1.45,0.64,1)';

export const inputStyle: React.CSSProperties = {
  height: 44, borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface-2)',
  color: 'var(--text)', padding: '0 14px', fontFamily: 'inherit', fontSize: 15, width: '100%', minWidth: 0, boxSizing: 'border-box',
};

/* ────────────────────────────────────────────────────────────────────────
   Stepper — ravikatiyar162/registration-stepper + jatin-yadav05/
   multistep-form + ravikatiyar162/onboarding-form (design.md §18.2)
   Numbered 34px dots with filling connector bars; done = --success with a
   drawn check, active = accent with a 5px soft ring; each step panel
   fades up 340ms. ≤5 steps.
──────────────────────────────────────────────────────────────────────── */
export interface StepperStep {
  label: string;
  content: React.ReactNode;
}
export interface StepperProps {
  steps: StepperStep[];
  step?: number;
  defaultStep?: number;
  onChange?: (step: number) => void;
  backLabel?: string;
  nextLabel?: string;
  doneLabel?: string;
  onFinish?: () => void;
}

export function Stepper({ steps, step, defaultStep = 0, onChange, backLabel = 'Back', nextLabel = 'Continue', doneLabel = 'Open dashboard', onFinish }: StepperProps) {
  const [internal, setInternal] = useState(defaultStep);
  const cur = step ?? internal;
  const go = (s: number) => { const c = Math.max(0, Math.min(s, steps.length - 1)); if (step === undefined) setInternal(c); onChange?.(c); };

  const dot = (i: number): React.CSSProperties => ({
    width: 34, height: 34, borderRadius: '50%', flex: 'none', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700,
    background: cur > i ? 'var(--success)' : cur === i ? 'var(--accent)' : 'var(--surface-2)',
    color: cur >= i ? 'var(--on-accent)' : 'var(--text-3)',
    border: cur >= i ? 'none' : '1.5px solid var(--border-strong)',
    boxShadow: cur === i ? '0 0 0 5px var(--accent-soft)' : 'none',
    transition: 'background 340ms, box-shadow 340ms, color 340ms',
  });

  const last = cur === steps.length - 1;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        {steps.map((_, i) => (
          <span key={i} style={{ display: 'contents' }}>
            <span style={dot(i)}>
              {cur > i
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" strokeDasharray={240} style={{ animation: 'drawLine 600ms cubic-bezier(0.22,1,0.36,1) forwards' }} /></svg>
                : i + 1}
            </span>
            {i < steps.length - 1 && <span style={{ flex: 1, height: 3, borderRadius: 3, background: cur > i ? 'var(--success)' : 'var(--surface-2)', transition: 'background 340ms' }} />}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--text-3)', fontWeight: 600, marginBottom: 22 }}>
        {steps.map((s) => <span key={s.label}>{s.label}</span>)}
      </div>
      <div style={{ minHeight: 150 }}>
        <div key={cur} style={{ animation: 'fadeUp 340ms cubic-bezier(0.22,1,0.36,1)' }}>{steps[cur].content}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
        {cur > 0 ? <button onClick={() => go(cur - 1)} className="i-soft-text" style={{ height: 40, padding: '0 18px', borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text-2)', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{backLabel}</button> : <span />}
        {!last
          ? <button onClick={() => go(cur + 1)} className="i-lift i-press-97" style={{ height: 40, padding: '0 22px', borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>{nextLabel}</button>
          : <button onClick={() => (onFinish ? onFinish() : go(0))} className="i-lift" style={{ height: 40, padding: '0 22px', borderRadius: 6, border: 'none', background: 'var(--accent)', color: 'var(--on-accent)', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{doneLabel}</button>}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   TypeCardPicker — the selectable type cards of onboarding-form:
   icon + label, accent border on pick.
──────────────────────────────────────────────────────────────────────── */
export interface TypeCardOption { label: string; icon: React.ReactNode; }
export interface TypeCardPickerProps {
  options: TypeCardOption[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
}

export function TypeCardPicker({ options, value, defaultValue = 0, onChange }: TypeCardPickerProps) {
  const [internal, setInternal] = useState(defaultValue);
  const sel = value ?? internal;
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {options.map((o, i) => {
        const on = sel === i;
        return (
          <button
            key={o.label}
            onClick={() => { if (value === undefined) setInternal(i); onChange?.(i); }}
            aria-pressed={on}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 6, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13.5, fontWeight: on ? 600 : 500, textAlign: 'start',
              border: on ? '1.5px solid var(--accent)' : '1px solid var(--border-strong)',
              background: on ? 'var(--accent-soft)' : 'var(--surface)',
              color: on ? 'var(--text)' : 'var(--text-2)',
              transition: 'border-color 220ms, background 220ms',
            }}
          >
            <span style={{ color: on ? 'var(--accent)' : 'currentColor', display: 'inline-flex' }}>{o.icon}</span>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Fieldset — larsen66/heroui-fieldset (design.md §18.2)
   Hairline-bordered group, r-md, legend rides the border as a small chip.
──────────────────────────────────────────────────────────────────────── */
export function Fieldset({ legend, children }: { legend: React.ReactNode; children: React.ReactNode }) {
  return (
    <fieldset style={{ border: '1px solid var(--border-strong)', borderRadius: 6, padding: '18px 18px 20px', margin: 0, minInlineSize: 0 }}>
      <legend style={{ padding: '3px 12px', marginInlineStart: 6, borderRadius: 6, background: 'var(--accent-soft)', color: 'var(--accent)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em' }}>{legend}</legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
    </fieldset>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   NumberField — hero_ui/heroui-number-field (design.md §18.1)
   "− value +" group on --surface-2 with hairline separators and a
   tabular value.
──────────────────────────────────────────────────────────────────────── */
export interface NumberFieldProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export function NumberField({ value, defaultValue = 0, min = 0, max = 99, step = 1, onChange }: NumberFieldProps) {
  const [internal, setInternal] = useState(defaultValue);
  const v = value ?? internal;
  const set = (n: number) => { const c = Math.max(min, Math.min(n, max)); if (value === undefined) setInternal(c); onChange?.(c); };
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface-2)', overflow: 'hidden' }}>
      <button aria-label="Decrease" onClick={() => set(v - step)} disabled={v <= min} className="i-soft-text i-press-90" style={{ width: 38, height: 40, border: 'none', background: 'none', color: 'var(--text-2)', cursor: v <= min ? 'not-allowed' : 'pointer', opacity: v <= min ? 0.4 : 1, fontFamily: 'inherit', fontSize: 16, fontWeight: 600, transition: 'background 140ms' }}>−</button>
      <span style={{ minWidth: 44, textAlign: 'center', fontSize: 15, fontWeight: 700, fontVariantNumeric: 'tabular-nums', borderInline: '1px solid var(--border)', lineHeight: '40px' }}>{v}</span>
      <button aria-label="Increase" onClick={() => set(v + step)} disabled={v >= max} className="i-soft-text i-press-90" style={{ width: 38, height: 40, border: 'none', background: 'none', color: 'var(--text-2)', cursor: v >= max ? 'not-allowed' : 'pointer', opacity: v >= max ? 0.4 : 1, fontFamily: 'inherit', fontSize: 16, fontWeight: 600, transition: 'background 140ms' }}>+</button>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   Autocomplete — hero_ui/heroui-autocomplete (design.md §18.2)
   Focused input + shadow-3 popover; the matched substring is bolded in
   the accent; ↵ hint on the first suggestion. Real filtering.
──────────────────────────────────────────────────────────────────────── */
export interface AutocompleteProps {
  options: string[];
  placeholder?: string;
  onSelect?: (option: string) => void;
  icon?: React.ReactNode;
}

export function Autocomplete({ options, placeholder = 'Search…', onSelect, icon }: AutocompleteProps) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const matches = q ? options.filter((o) => o.toLowerCase().includes(q.toLowerCase())).slice(0, 5) : [];

  const bold = (text: string) => {
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return text;
    return (<>{text.slice(0, i)}<b style={{ color: 'var(--accent)' }}>{text.slice(i, i + q.length)}</b>{text.slice(i + q.length)}</>);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        className="i-input"
        style={inputStyle}
      />
      {open && matches.length > 0 && (
        <div style={{ position: 'absolute', insetInline: 0, top: 'calc(100% + 8px)', zIndex: 20, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', padding: 6 }}>
          {matches.map((m, i) => (
            <div
              key={m}
              onMouseDown={() => { setQ(m); setOpen(false); onSelect?.(m); }}
              className={i === 0 ? undefined : 'i-surface2'}
              style={{ display: 'flex', alignItems: 'center', gap: 10, height: 38, borderRadius: 6, padding: '0 12px', fontSize: 14, cursor: 'pointer', background: i === 0 ? 'var(--accent-soft)' : undefined, color: i === 0 ? undefined : 'var(--text-2)' }}
            >
              {icon && <span style={{ display: 'inline-flex', color: i === 0 ? 'var(--accent)' : 'currentColor' }}>{icon}</span>}
              <span>{bold(m)}</span>
              {i === 0 && <span style={{ marginInlineStart: 'auto', fontSize: 11, color: 'var(--text-3)' }}>↵</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   UnsavedChangesBar — stvenchg/unsaved-changes (design.md §18.2)
   Dark floating pill that slides up on the first edit (480ms spring):
   warning dot + message + Reset (ghost-on-dark) + Save (white). Anchor it
   bottom-center of the edited surface. Never a browser alert.
──────────────────────────────────────────────────────────────────────── */
export interface UnsavedChangesBarProps {
  visible: boolean;
  message?: string;
  resetLabel?: string;
  saveLabel?: string;
  onReset?: () => void;
  onSave?: () => void;
}

export function UnsavedChangesBar({ visible, message = 'Unsaved changes', resetLabel = 'Reset', saveLabel = 'Save', onReset, onSave }: UnsavedChangesBarProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 10px 10px 18px', borderRadius: 6,
      background: 'oklch(0.2 0.03 274)', color: 'oklch(0.95 0.005 270)',      transform: visible ? 'translateY(0)' : 'translateY(16px)', opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none',
      transition: `transform 480ms ${spring}, opacity 300ms`,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'oklch(0.84 0.14 80)', flex: 'none' }} />
      <span style={{ fontSize: 13, fontWeight: 500 }}>{message}</span>
      <button onClick={onReset} style={{ height: 30, padding: '0 13px', borderRadius: 6, border: 'none', background: 'rgba(255,255,255,0.12)', color: 'inherit', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>{resetLabel}</button>
      <button onClick={onSave} className="i-lift" style={{ height: 30, padding: '0 15px', borderRadius: 6, border: 'none', background: '#fff', color: '#111', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>{saveLabel}</button>
    </div>
  );
}

/** Convenience field for building forms fast — label + input on Madar tokens. */
export function Field({ label, hint, style, ...inputProps }: { label?: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label ? <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>{label}</span> : null}
      <input className="i-input" style={{ ...inputStyle, ...style }} {...inputProps} />
      {hint && <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{hint}</span>}
    </label>
  );
}
