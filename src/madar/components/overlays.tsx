import { useEffect, useRef, useState } from 'react';
import { GLIDE } from './physics';

/* ────────────────────────────────────────────────────────────────────────
   Overlay primitives — Jahez pattern library (Popover, HeroUI Select /
   Dropdown / Alert Dialog, Welcome Modal, Frosted Tooltip, Command Bar).
──────────────────────────────────────────────────────────────────────── */

function useClickOutside(onOut: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onOut(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onOut]);
  return ref;
}

const panel: React.CSSProperties = {
  position: 'absolute', top: 'calc(100% + 10px)', insetInlineStart: 0, zIndex: 30, minWidth: 200,
  borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface)', boxShadow: 'var(--shadow-3)', padding: 6,
  animation: 'modalIn 340ms cubic-bezier(0.22,1,0.36,1)',
};

/* ── Popover — floating panel beside its trigger, closes on outside click,
      CSS triangle arrow ties it to the button. */
export function Popover({ trigger, children }: { trigger: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="i-soft" style={{ height: 38, padding: '0 16px', borderRadius: 999, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>{trigger}</button>
      {open && (
        <div style={{ ...panel, padding: 14 }}>
          <span style={{ position: 'absolute', top: -6, insetInlineStart: 22, width: 10, height: 10, background: 'var(--surface)', borderTop: '1px solid var(--border)', borderInlineStart: '1px solid var(--border)', transform: 'rotate(45deg)' }} />
          {children}
        </div>
      )}
    </div>
  );
}

/* ── FrostedTooltip — backdrop-blur tip + matching CSS arrow on hover. */
export function FrostedTooltip({ tip, children }: { tip: React.ReactNode; children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  return (
    <span onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <span role="tooltip" style={{
        position: 'absolute', bottom: 'calc(100% + 10px)', insetInlineStart: '50%', transform: on ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(4px)',
        whiteSpace: 'nowrap', padding: '7px 12px', borderRadius: 10, fontSize: 12, fontWeight: 500,
        background: 'var(--glass)', backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))',
        border: '1px solid var(--border)', boxShadow: 'var(--shadow-2), inset 0 1px 0 var(--glass-hl)', color: 'var(--text)',
        opacity: on ? 1 : 0, pointerEvents: 'none', transition: 'opacity 200ms 100ms, transform 200ms 100ms', zIndex: 30,
      }}>
        {tip}
        <span style={{ position: 'absolute', top: '100%', insetInlineStart: '50%', marginInlineStart: -5, width: 10, height: 10, marginTop: -5, background: 'var(--glass)', borderBottom: '1px solid var(--border)', borderInlineEnd: '1px solid var(--border)', transform: 'rotate(45deg)', backdropFilter: 'blur(var(--glass-blur))', WebkitBackdropFilter: 'blur(var(--glass-blur))' }} />
      </span>
    </span>
  );
}

/* ── SelectField — designed replacement for the browser select: border
      colors on open, check on the picked option. */
export function SelectField({ options, defaultValue = 0, onChange }: { options: string[]; defaultValue?: number; onChange?: (i: number) => void }) {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(defaultValue);
  const ref = useClickOutside(() => setOpen(false));
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: 44, borderRadius: 12,
        border: open ? '1px solid var(--accent)' : '1px solid var(--border-strong)', background: 'var(--surface-2)', color: 'var(--text)',
        padding: '0 14px', fontFamily: 'inherit', fontSize: 14.5, cursor: 'pointer', boxShadow: open ? '0 0 0 3px var(--accent-soft)' : 'none', transition: 'border-color 200ms, box-shadow 200ms',
      }}>
        {options[sel]}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 250ms' }}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div role="listbox" style={{ ...panel, insetInline: 0 }}>
          {options.map((o, i) => (
            <div key={o} role="option" aria-selected={i === sel} onClick={() => { setSel(i); setOpen(false); onChange?.(i); }} className={i === sel ? undefined : 'i-surface2'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 38, borderRadius: 9, padding: '0 12px', fontSize: 14, fontWeight: i === sel ? 600 : 400, background: i === sel ? 'var(--accent-soft)' : undefined, cursor: 'pointer' }}>
              {o}
              {i === sel && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── DropdownMenu — the ‹⋯› actions menu: icon rows, danger row separated. */
export interface DropdownItem { label: string; icon?: React.ReactNode; danger?: boolean; onClick?: () => void; }

export function DropdownMenu({ items }: { items: DropdownItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  const safe = items.filter((i) => !i.danger);
  const danger = items.filter((i) => i.danger);
  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button aria-label="Actions" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="i-soft" style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text-2)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>
      </button>
      {open && (
        <div role="menu" style={panel}>
          {safe.map((it) => (
            <div key={it.label} role="menuitem" onClick={() => { it.onClick?.(); setOpen(false); }} className="i-surface2" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 36, borderRadius: 9, padding: '0 12px', fontSize: 13.5, cursor: 'pointer' }}>
              {it.icon && <span style={{ display: 'inline-flex', color: 'var(--text-2)' }}>{it.icon}</span>}{it.label}
            </div>
          ))}
          {danger.length > 0 && <div style={{ height: 1, background: 'var(--border)', margin: '5px 8px' }} />}
          {danger.map((it) => (
            <div key={it.label} role="menuitem" onClick={() => { it.onClick?.(); setOpen(false); }} className="i-danger-soft" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 36, borderRadius: 9, padding: '0 12px', fontSize: 13.5, color: 'var(--danger)', cursor: 'pointer' }}>
              {it.icon && <span style={{ display: 'inline-flex' }}>{it.icon}</span>}{it.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── AlertDialog — destructive confirm: round warning tile above the
      title, danger/cancel pair, scrim closes. */
export interface AlertDialogProps {
  open: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onClose: () => void;
}

export function AlertDialog({ open, title, description, confirmLabel = 'Delete', cancelLabel = 'Cancel', onConfirm, onClose }: AlertDialogProps) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'oklch(0.2 0.03 260 / 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'overlayIn 340ms cubic-bezier(0.22,1,0.36,1)' }}>
      <div onClick={(e) => e.stopPropagation()} role="alertdialog" style={{ width: '100%', maxWidth: 380, background: 'var(--surface)', color: 'var(--text)', borderRadius: 22, boxShadow: 'var(--shadow-4)', padding: 28, textAlign: 'center', animation: 'modalIn 560ms cubic-bezier(0.22,1,0.36,1)' }}>
        <span style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--danger-soft)', display: 'inline-grid', placeItems: 'center', marginBottom: 14 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v5M12 17.5v.5M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
        </span>
        <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</div>
        <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: '20px', margin: '8px 0 22px' }}>{description}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button onClick={onClose} className="i-soft" style={{ height: 42, padding: '0 20px', borderRadius: 999, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{cancelLabel}</button>
          <button onClick={() => { onConfirm?.(); onClose(); }} className="i-lift i-press-97" style={{ height: 42, padding: '0 22px', borderRadius: 999, border: 'none', background: 'var(--danger)', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

/* ── WelcomeModal — first-run: gradient icon well + title + copy + wide CTA. */
export function WelcomeModal({ open, onClose, icon, title, description, ctaLabel = 'ابدأ الآن' }: { open: boolean; onClose: () => void; icon: React.ReactNode; title: React.ReactNode; description: React.ReactNode; ctaLabel?: string }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'oklch(0.2 0.03 260 / 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'overlayIn 340ms cubic-bezier(0.22,1,0.36,1)' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 400, background: 'var(--surface)', borderRadius: 24, boxShadow: 'var(--shadow-4)', overflow: 'hidden', animation: 'modalIn 560ms cubic-bezier(0.22,1,0.36,1)' }}>
        <div style={{ height: 120, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent) 30%, var(--surface)), color-mix(in srgb, var(--accent) 8%, var(--surface)))' }}>
          <span style={{ width: 58, height: 58, borderRadius: 18, background: 'var(--accent)', color: 'var(--on-accent)', display: 'grid', placeItems: 'center', boxShadow: '0 12px 28px color-mix(in srgb, var(--accent) 45%, transparent)' }}>{icon}</span>
        </div>
        <div style={{ padding: '22px 26px 26px', textAlign: 'center' }}>
          <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em' }}>{title}</div>
          <p style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: '21px', margin: '8px 0 20px' }}>{description}</p>
          <button onClick={onClose} className="i-lift i-press-97" style={{ width: '100%', height: 46, borderRadius: 999, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>{ctaLabel}</button>
        </div>
      </div>
    </div>
  );
}

/* ── CommandBarTrigger — the search-shaped ⌘K button that opens a palette. */
export function CommandBarTrigger({ placeholder = 'Type a command or search…', kbd = '⌘K', onClick }: { placeholder?: string; kbd?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="i-focus-ring" style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', height: 44, borderRadius: 999, border: '1px solid var(--border-strong)', background: 'var(--surface-2)', padding: '0 8px 0 14px', color: 'var(--text-3)', fontFamily: 'inherit', fontSize: 14, cursor: 'pointer', transition: 'border-color 200ms' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
      <span style={{ flex: 1, textAlign: 'start' }}>{placeholder}</span>
      <kbd style={{ fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 7px', background: 'var(--surface)' }}>{kbd}</kbd>
    </button>
  );
}

/* ── KbdButton — a button carrying its shortcut as a separate kbd chip. */
export function KbdButton({ children, kbd, onClick }: { children: React.ReactNode; kbd: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="i-lift i-press-97" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, height: 42, padding: '0 8px 0 18px', borderRadius: 999, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>
      {children}
      <kbd style={{ fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)', borderRadius: 7, padding: '4px 8px', background: 'color-mix(in srgb, var(--on-ink) 16%, transparent)', border: '1px solid color-mix(in srgb, var(--on-ink) 22%, transparent)' }}>{kbd}</kbd>
    </button>
  );
}

/* ── SpotlightButton — a light halo follows the pointer inside the button. */
export function SpotlightButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }); }}
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}
      className="i-press-97"
      style={{
        position: 'relative', height: 46, padding: '0 26px', borderRadius: 999, border: '1px solid var(--border-strong)', overflow: 'hidden',
        background: `radial-gradient(120px circle at ${pos.x}% ${pos.y}%, color-mix(in srgb, var(--accent) ${on ? 26 : 0}%, transparent), transparent 70%), var(--surface)`,
        color: 'var(--text)', fontFamily: 'inherit', fontSize: 14.5, fontWeight: 600, cursor: 'pointer', transition: 'background 150ms',
      }}
    >{children}</button>
  );
}

/* ── MessageDock — floating composer: springy pill, send button colors
      once there is text. */
export function MessageDock({ placeholder = 'اكتب رسالتك…', onSend }: { placeholder?: string; onSend?: (text: string) => void }) {
  const [text, setText] = useState('');
  const has = text.trim().length > 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 6, borderRadius: 999, background: 'var(--glass)', backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', border: '1px solid var(--border)', boxShadow: 'var(--shadow-3), inset 0 1px 0 var(--glass-hl)' }}>
      <button aria-label="Attach" className="i-soft" style={{ width: 38, height: 38, borderRadius: 999, border: 'none', background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', display: 'grid', placeItems: 'center', flex: 'none' }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.5l-8.5 8.5a6 6 0 0 1-8.5-8.5L12.5 4a4 4 0 0 1 5.7 5.7L9.7 18.2a2 2 0 0 1-2.9-2.9l7.8-7.8" /></svg>
      </button>
      <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && has) { onSend?.(text); setText(''); } }} placeholder={placeholder} style={{ flex: 1, minWidth: 0, border: 'none', background: 'none', outline: 'none', fontFamily: 'inherit', fontSize: 14, color: 'var(--text)' }} />
      <button
        aria-label="Send" disabled={!has}
        onClick={() => { if (has) { onSend?.(text); setText(''); } }}
        style={{ width: 38, height: 38, borderRadius: 999, border: 'none', flex: 'none', cursor: has ? 'pointer' : 'default', display: 'grid', placeItems: 'center', background: has ? 'var(--accent)' : 'var(--surface-2)', color: has ? 'var(--on-accent)' : 'var(--text-3)', transform: has ? 'scale(1)' : 'scale(0.92)', transition: `background 250ms, color 250ms, transform 350ms ${GLIDE}` }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="i-chevron-dir"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
    </div>
  );
}
