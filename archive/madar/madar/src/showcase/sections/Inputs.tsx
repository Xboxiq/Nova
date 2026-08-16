import { useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import { useTheme } from '../../theme/ThemeContext';

function CheckIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--on-accent)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>;
}

function Checkbox({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) {
  return (
    <button onClick={onToggle} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--text)', fontSize: 14.5 }}>
      <span style={{
        width: 20, height: 20, borderRadius: 7, flex: 'none',
        border: checked ? '1.5px solid var(--accent)' : '1.5px solid var(--border-strong)',
        background: checked ? 'var(--accent)' : 'var(--surface-2)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 220ms, border-color 220ms',
      }}>{checked && <CheckIcon />}</span>
      {label}
    </button>
  );
}

export function Inputs() {
  const { rtl } = useTheme();
  const [on, setOn] = useState(true);
  const [c1, setC1] = useState(true);
  const [c2, setC2] = useState(false);
  const [seg, setSeg] = useState(0);
  const m = rtl ? -1 : 1;

  return (
    <Section label="Inputs and forms">
      <SectionHeader eyebrow="04 · CONTROLS" title="Inputs & forms">
        44px fields on surface-2, accent focus rings, errors in words never color alone. The segmented control slides with a spring — try it.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
        {/* text fields */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Workspace name</span>
            <input placeholder="e.g. Madar Studio" className="i-input" style={{ height: 44, borderRadius: 12, border: '1px solid var(--border-strong)', background: 'var(--surface-2)', color: 'var(--text)', padding: '0 14px', fontSize: 15 }} />
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Shown on invoices and invites.</span>
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Email</span>
            <input defaultValue="team@madar" className="i-input-danger" style={{ height: 44, borderRadius: 12, border: '1px solid var(--danger)', background: 'var(--surface-2)', color: 'var(--text)', padding: '0 14px', fontSize: 15 }} />
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--danger)', fontWeight: 500 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16.5v.5" /></svg>
              Enter a complete email address.
            </span>
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 44, borderRadius: 999, border: '1px solid var(--border-strong)', background: 'var(--surface-2)', padding: '0 8px 0 14px', color: 'var(--text-3)' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            <span style={{ fontSize: 14.5, flex: 1 }}>Search anything…</span>
            <span style={{ fontSize: 11.5, fontWeight: 600, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', borderRadius: 6, padding: '3px 7px', background: 'var(--surface)' }}>⌘K</span>
          </div>
        </div>

        {/* switch / checkboxes / segmented */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 600 }}>Weekly digest</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Springy 44×26 switch</div>
            </div>
            <button aria-label="Toggle weekly digest" onClick={() => setOn((v) => !v)} style={{ position: 'relative', width: 44, height: 26, borderRadius: 999, border: 'none', padding: 0, flex: 'none', cursor: 'pointer', background: on ? 'var(--accent)' : 'var(--border-strong)', transition: 'background 220ms' }}>
              <span style={{ position: 'absolute', top: 2, insetInlineStart: on ? 20 : 2, width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.25)', transition: 'inset-inline-start 220ms cubic-bezier(0.34,1.45,0.64,1)' }} />
            </button>
          </div>
          <div style={{ height: 1, background: 'var(--border)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox checked={c1} onToggle={() => setC1((v) => !v)} label="Email me on new orders" />
            <Checkbox checked={c2} onToggle={() => setC2((v) => !v)} label="Weekly summary" />
          </div>
          <div style={{ height: 1, background: 'var(--border)' }} />
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 10 }}>View mode — segmented (Apple style)</div>
            <div style={{ position: 'relative', display: 'inline-flex', background: 'var(--surface-2)', borderRadius: 999, padding: 4, border: '1px solid var(--border)' }}>
              <span style={{ position: 'absolute', top: 4, insetInlineStart: 4, width: 104, height: 32, borderRadius: 999, background: 'var(--surface)', boxShadow: 'var(--shadow-1)', border: '1px solid var(--border)', transform: `translateX(${seg * 104 * m}px)`, transition: 'transform 340ms cubic-bezier(0.34,1.45,0.64,1)' }} />
              {['Overview', 'Board', 'Timeline'].map((label, i) => (
                <button key={label} onClick={() => setSeg(i)} style={{ position: 'relative', zIndex: 1, width: 104, height: 32, border: 'none', background: 'none', fontSize: 13, fontWeight: 600, color: 'var(--text)', cursor: 'pointer', borderRadius: 999 }}>{label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* popover listbox */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Select — popover listbox</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44, borderRadius: 12, border: '1px solid var(--accent)', background: 'var(--surface-2)', padding: '0 14px', fontSize: 15, boxShadow: '0 0 0 3px var(--accent-soft)' }}>
            Riyadh (GMT+3)
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
          </div>
          <div style={{ borderRadius: 16, border: '1px solid var(--border)', background: 'var(--surface)', boxShadow: 'var(--shadow-3)', padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 36, borderRadius: 10, padding: '0 12px', fontSize: 14, background: 'var(--accent-soft)', fontWeight: 600 }}>
              Riyadh (GMT+3)
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
            </div>
            {['Dubai (GMT+4)', 'Cairo (GMT+2)', 'London (GMT+1)'].map((label) => (
              <div key={label} className="i-surface2-text" style={{ display: 'flex', alignItems: 'center', height: 36, borderRadius: 10, padding: '0 12px', fontSize: 14, color: 'var(--text-2)', cursor: 'pointer' }}>{label}</div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
