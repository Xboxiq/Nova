import { useEffect, useRef, useState } from 'react';

const spring = 'cubic-bezier(0.34,1.45,0.64,1)';

/* ────────────────────────────────────────────────────────────────────────
   PublishButton — rafa-porto/publish-button (design.md §18.1)
   3-state machine: idle → working → success. Width-locked so the label
   swap never makes the button jump. Success fill morphs to --success with
   a colored halo, then auto-returns to idle.
──────────────────────────────────────────────────────────────────────── */
export interface PublishButtonProps {
  /** Runs on click. If it returns a promise, "working" lasts until it settles; otherwise 1400ms. */
  onAction?: () => void | Promise<void>;
  idleLabel?: string;
  workingLabel?: string;
  doneLabel?: string;
  /** Locked width, px. Size it to your longest label. */
  width?: number;
  /** How long the success state shows before returning to idle (ms). */
  doneMs?: number;
}

export function PublishButton({
  onAction, idleLabel = 'Publish', workingLabel = 'Publishing…', doneLabel = 'Published',
  width = 150, doneMs = 1600,
}: PublishButtonProps) {
  const [state, setState] = useState<'idle' | 'working' | 'done'>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const click = async () => {
    if (state !== 'idle') return;
    setState('working');
    if (onAction) {
      try { await onAction(); } catch { setState('idle'); return; }
      setState('done');
    } else {
      await new Promise((r) => timers.current.push(setTimeout(r, 1400)));
      setState('done');
    }
    timers.current.push(setTimeout(() => setState('idle'), doneMs));
  };

  return (
    <button
      onClick={click}
      className="i-press-97"
      style={{
        width, height: 44, borderRadius: 999, border: 'none', fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600,
        cursor: state === 'idle' ? 'pointer' : 'default',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: state === 'done' ? 'var(--success)' : 'var(--ink)',
        color: state === 'done' ? '#fff' : 'var(--on-ink)',
        boxShadow: state === 'done' ? '0 8px 20px oklch(0.68 0.145 158 / 0.35)' : 'var(--shadow-1)',
        transition: 'background 340ms, box-shadow 340ms, transform 140ms',
      }}
    >
      {state === 'idle' && (<>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        {idleLabel}
      </>)}
      {state === 'working' && (<>
        <span style={{ width: 15, height: 15, borderRadius: '50%', border: '2px solid currentColor', borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
        {workingLabel}
      </>)}
      {state === 'done' && (<>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
        {doneLabel}
      </>)}
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   CopyCodeButton — minhxthanh/copy-code-button (design.md §18.1)
   Dark code chip + icon-only copy button whose glyph morphs to a green
   check. Actually copies `code` to the clipboard.
──────────────────────────────────────────────────────────────────────── */
export interface CopyCodeButtonProps {
  code: string;
  /** Confirmation duration, ms. */
  confirmMs?: number;
}

export function CopyCodeButton({ code, confirmMs = 1800 }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(t.current), []);

  const click = async () => {
    try { await navigator.clipboard.writeText(code); } catch { /* clipboard blocked — still confirm visually */ }
    clearTimeout(t.current);
    setCopied(true);
    t.current = setTimeout(() => setCopied(false), confirmMs);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderRadius: 12, background: 'oklch(0.22 0.03 274)', padding: '12px 14px' }} dir="ltr">
      <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: 'oklch(0.85 0.02 270)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{code}</code>
      <button
        aria-label={copied ? 'Copied' : 'Copy'}
        onClick={click}
        className="i-press-92"
        style={{ flex: 'none', width: 32, height: 32, borderRadius: 9, border: '1px solid rgba(255,255,255,0.14)', background: copied ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.08)', color: 'oklch(0.9 0.01 270)', cursor: 'pointer', display: 'grid', placeItems: 'center', transition: 'background 220ms' }}
      >
        {copied
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="oklch(0.78 0.14 158)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a1 1 0 0 1 1-1h10" /></svg>}
      </button>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
   ShatterButton — koustubhayadiyala36/shatter-button (design.md §18.1)
   On press the button squashes to 0.86 while 12 mixed square/round
   particles burst outward and fade (620ms ease-out). For
   destructive-but-fun actions — never real deletes.
──────────────────────────────────────────────────────────────────────── */
export interface ShatterButtonProps {
  children: React.ReactNode;
  onAction?: () => void;
}

export function ShatterButton({ children, onAction }: ShatterButtonProps) {
  const [shatter, setShatter] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(t.current), []);

  const parts = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const d = 46 + (i % 3) * 16;
    return {
      position: 'absolute' as const, top: '50%', left: '50%',
      width: 5 + (i % 3) * 2, height: 5 + (i % 3) * 2,
      borderRadius: i % 2 ? 2 : '50%',
      background: i % 3 === 0 ? 'var(--accent)' : 'var(--ink)',
      '--dx': Math.cos(a) * d + 'px', '--dy': Math.sin(a) * d + 'px',
      '--rot': i * 65 + 'deg', pointerEvents: 'none' as const,
      animation: 'burst 620ms cubic-bezier(0.22,1,0.36,1) forwards',
    } as React.CSSProperties;
  });

  const click = () => {
    if (shatter) return;
    setShatter(true);
    onAction?.();
    t.current = setTimeout(() => setShatter(false), 680);
  };

  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        onClick={click}
        style={{
          height: 44, padding: '0 24px', borderRadius: 999, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)',
          fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600, cursor: 'pointer', position: 'relative',
          transform: shatter ? 'scale(0.86)' : 'none', opacity: shatter ? 0.35 : 1,
          transition: `transform 620ms ${spring}, opacity 300ms`,
        }}
      >{children}</button>
      {shatter && parts.map((s, i) => <span key={i} style={s} />)}
    </span>
  );
}
