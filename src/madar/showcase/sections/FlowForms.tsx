import { useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import {
  Stepper, TypeCardPicker, Field, UnsavedChangesBar,
  EstimatedArrival, NumberField, Sparkline, Autocomplete,
} from '../../components';

function StoreIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8l1.5-4h13L20 8M4 8h16M4 8v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8M9 12h6" /></svg>;
}
function AgencyIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M6 21V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v16M10 8h1M13 8h1M10 12h1M13 12h1M10 16h1M13 16h1" /></svg>;
}
function PinIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /></svg>;
}

function GuardCard() {
  const [dirty, setDirty] = useState(false);
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)' }}>
      <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 12 }}>Unsaved-changes guard — type to trigger</div>
      <Field label="" placeholder="Edit the workspace description…" onInput={() => setDirty(true)} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <UnsavedChangesBar visible={dirty} onReset={() => setDirty(false)} onSave={() => setDirty(false)} />
      </div>
    </div>
  );
}

export function FlowForms() {
  return (
    <Section label="Flow and forms">
      <SectionHeader eyebrow="14 · FLOW & FORMS" title="Steppers, guards & live status">
        Multi-step registration, the unsaved-changes guard, delivery ETA and self-drawing charts — all reusable components from <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>src/components</code>.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 20, alignItems: 'start' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 28, boxShadow: 'var(--shadow-1)' }}>
          <Stepper
            steps={[
              {
                label: 'Account',
                content: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <Field label="Full name" placeholder="نورة المطيري" />
                    <Field label="Email" placeholder="you@company.com" />
                  </div>
                ),
              },
              {
                label: 'Workspace',
                content: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <Field label="Workspace name" placeholder="Madar Studio" />
                    <TypeCardPicker options={[{ label: 'Store', icon: <StoreIcon /> }, { label: 'Agency', icon: <AgencyIcon /> }]} />
                  </div>
                ),
              },
              {
                label: 'Team',
                content: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <Field label="Invite teammates" placeholder="emails, comma separated" hint="You can skip this — invites work anytime from Settings." />
                  </div>
                ),
              },
              {
                label: 'Done',
                content: (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingTop: 16 }}>
                    <span style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--success-soft)', display: 'grid', placeItems: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" strokeDasharray={240} style={{ animation: 'drawLine 600ms cubic-bezier(0.22,1,0.36,1) forwards' }} /></svg>
                    </span>
                    <div style={{ fontSize: 17, fontWeight: 600 }}>Workspace ready</div>
                    <div style={{ fontSize: 13.5, color: 'var(--text-2)' }}>مرحباً بك في مدار — كل شيء جاهز.</div>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <GuardCard />
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)' }}>
            <EstimatedArrival minutes={18} progress={0.58} phases={['Picked up', 'On the way', 'Delivered']} />
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Number field</div>
              <NumberField defaultValue={2} max={20} />
            </div>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div><div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Sparkline — draws itself</div><div style={{ fontSize: 20, fontWeight: 600, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>+24.6%</div></div>
              <Sparkline points={[10, 16, 13, 26, 22, 34, 30, 38]} />
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)' }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 12 }}>Autocomplete — type «الري» or a city</div>
            <Autocomplete
              options={['الرياض', 'الريان', 'جدة', 'الدمام', 'مكة المكرمة', 'Dubai', 'Cairo', 'London']}
              placeholder="ابحث عن مدينة…"
              icon={<PinIcon />}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
