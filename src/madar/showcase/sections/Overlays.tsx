import { useEffect, useRef, useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';

function MenuRow({ children, danger, shortcut }: { children: React.ReactNode; danger?: boolean; shortcut?: string }) {
  return (
    <div className={danger ? 'i-danger-soft' : 'i-surface2'} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 36, borderRadius: 6, padding: '0 12px', fontSize: 14, color: danger ? 'var(--danger)' : undefined, cursor: 'pointer' }}>
      {children}
      {shortcut && <span style={{ marginInlineStart: 'auto', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>{shortcut}</span>}
    </div>
  );
}

export function Overlays() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = () => {
    clearTimeout(toastTimer.current);
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 4000);
  };

  return (
    <Section label="Overlays">
      <SectionHeader eyebrow="07 · OVERLAYS" title="Modal · toast · palette · menu">
        Overlays scale up from 0.96 with a 560ms settle. The buttons below are live.
      </SectionHeader>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <button onClick={() => setModalOpen(true)} className="i-lift i-press-97" style={{ height: 44, padding: '0 22px', borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>Open modal</button>
        <button onClick={showToast} className="i-lift i-press-97" style={{ height: 44, padding: '0 22px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>Show toast</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
        {/* command palette (static) */}
        <div style={{ borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 52, padding: '0 18px', borderBottom: '1px solid var(--border)', color: 'var(--text-3)' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            <span style={{ fontSize: 15, flex: 1 }}>Type a command or search…</span>
            <span style={{ fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 7px' }}>ESC</span>
          </div>
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-3)', padding: '8px 12px 4px' }}>QUICK ACTIONS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, height: 40, borderRadius: 6, padding: '0 12px', background: 'var(--accent-soft)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>Create new project<span style={{ marginInlineStart: 'auto', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>C</span>
            </div>
            <div className="i-surface2-text" style={{ display: 'flex', alignItems: 'center', gap: 11, height: 40, borderRadius: 6, padding: '0 12px', fontSize: 14, color: 'var(--text-2)', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5" /></svg>Invite a member<span style={{ marginInlineStart: 'auto', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>I</span>
            </div>
            <div className="i-surface2-text" style={{ display: 'flex', alignItems: 'center', gap: 11, height: 40, borderRadius: 6, padding: '0 12px', fontSize: 14, color: 'var(--text-2)', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></svg>Switch theme…<span style={{ marginInlineStart: 'auto', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>T</span>
            </div>
          </div>
        </div>

        {/* popover menu + tooltip + bottom sheet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', padding: 8, maxWidth: 240 }}>
            <MenuRow shortcut="⌘R">Rename</MenuRow>
            <MenuRow shortcut="⌘D">Duplicate</MenuRow>
            <MenuRow>Share…</MenuRow>
            <div style={{ height: 1, background: 'var(--border)', margin: '6px 10px' }} />
            <MenuRow danger>Delete project</MenuRow>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, padding: 4 }}>
            <span style={{ background: 'var(--ink)', color: 'var(--on-ink)', fontSize: 12, fontWeight: 500, padding: '6px 12px', borderRadius: 6, }}>Tooltip — 400ms delay, rises 2px</span>
            <button style={{ height: 40, padding: '0 18px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Hover target</button>
          </div>
          <div style={{ borderRadius: '6px 6px 0 0', border: '1px solid var(--border)', borderBottom: 'none', background: 'var(--surface)', padding: '12px 20px 20px' }}>
            <div style={{ width: 36, height: 4, borderRadius: 6, background: 'var(--border-strong)', margin: '0 auto 14px' }} />
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Bottom sheet</div>
            <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: '20px' }}>Mobile quick tasks slide from the bottom edge — grabber on top, drag or tap the scrim to dismiss.</div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div onClick={() => setModalOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'oklch(0.2 0.03 260 / 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, animation: 'overlayIn 340ms cubic-bezier(0.22,1,0.36,1)' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 480, background: 'var(--surface)', color: 'var(--text)', borderRadius: 6, padding: 28, animation: 'modalIn 560ms cubic-bezier(0.22,1,0.36,1)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>Invite a member</div>
              <button aria-label="Close" onClick={() => setModalOpen(false)} className="i-soft-text" style={{ width: 32, height: 32, borderRadius: 6, border: 'none', background: 'var(--surface-2)', color: 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-2)', margin: '0 0 20px', lineHeight: '21px' }}>They'll get an email with a join link. Roles can change later.</p>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
              <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Email address</span>
              <input placeholder="name@company.com" className="i-input" style={{ height: 44, borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface-2)', color: 'var(--text)', padding: '0 14px', fontSize: 15 }} />
            </label>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setModalOpen(false)} className="i-soft" style={{ height: 44, padding: '0 20px', borderRadius: 6, border: 'none', background: 'transparent', color: 'var(--text)', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setModalOpen(false)} className="i-lift i-press-97" style={{ height: 44, padding: '0 22px', borderRadius: 6, border: 'none', background: 'var(--ink)', color: 'var(--on-ink)', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'transform 220ms' }}>Send invite</button>
            </div>
          </div>
        </div>
      )}

      {toastVisible && (
        <div style={{ position: 'fixed', top: 74, left: '50%', transform: 'translateX(-50%)', zIndex: 110, display: 'flex', alignItems: 'center', gap: 11, padding: '11px 18px', borderRadius: 6, background: 'var(--glass)', backdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', WebkitBackdropFilter: 'blur(var(--glass-blur)) saturate(var(--glass-sat))', border: '1px solid var(--border)', boxShadow: 'inset 0 1px 0 var(--glass-hl)', animation: 'toastIn 340ms cubic-bezier(0.34,1.45,0.64,1)' }}>
          <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--success-soft)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
          </span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Changes saved — auto-dismisses in 4s</span>
        </div>
      )}
    </Section>
  );
}
