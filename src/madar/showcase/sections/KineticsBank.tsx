import { useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import {
  PushButton, SquishButton, RubberBandSlider, DragToDismissCard, NumberScrubber,
  SpeedDialFab, ReorderableList, IconMorphSwap, OdometerNumber, Typewriter,
  EkgPath, SegmentLoader, UndoSnackbar, Stagger,
} from '../../components';

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22, padding: 24, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>;
}
function Rule() { return <div style={{ height: 1, background: 'var(--border)' }} />; }
function Hint({ children, mb = 12 }: { children: React.ReactNode; mb?: number }) {
  return <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: mb }}>{children}</div>;
}

function UndoDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Undo snackbar — 3s visible window</span>
        <button onClick={() => setVisible(true)} className="i-soft" style={{ height: 30, padding: '0 14px', borderRadius: 999, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Delete item</button>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', minHeight: 64 }}>
        <UndoSnackbar visible={visible} message="تم حذف الدرس" undoLabel="تراجع" onUndo={() => setVisible(false)} onExpire={() => setVisible(false)} />
      </div>
    </div>
  );
}

export function KineticsBank() {
  return (
    <Section label="Kinetics bank">
      <SectionHeader eyebrow="18 · KINETICS BANK" title="The full Kinetics catalog: imported">
        The remaining physics vocabulary from kinetics.colorion.co (design.md §19.1), each an importable component: colored-edge push, squish, rubber-band slider, drag-to-dismiss, scrubber, reorder, speed dial, icon morph, odometer, typewriter, EKG dot, segment loader, undo snackbar, stagger.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
        {/* press family + sliders */}
        <Card>
          <div>
            <Hint>Push & squish — asymmetric press physics</Hint>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <PushButton>Push · colored edge</PushButton>
              <SquishButton>Squish me</SquishButton>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 10 }}>down 60–80ms ease-out · up 500ms spring</div>
          </div>
          <Rule />
          <div>
            <Hint mb={4}>Rubber-band slider — 32% overshoot past the ends</Hint>
            <RubberBandSlider />
          </div>
          <Rule />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div><div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Number scrubber</div><div style={{ fontSize: 12, color: 'var(--text-3)' }}>drag horizontally · 1px = 1</div></div>
            <NumberScrubber />
          </div>
        </Card>

        {/* drag interactions */}
        <Card>
          <div>
            <Hint>Drag to dismiss — fling past 100px, else spring back</Hint>
            <DragToDismissCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent-soft)', color: 'var(--accent)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.8 5.5 1.8 5.5H4.2S6 14 6 9.5z" /><path d="M10 18.5a2 2 0 0 0 4 0" /></svg>
                </span>
                <span style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontSize: 13.5, fontWeight: 600 }}>تذكير — درس الرياضيات</span>
                  <span style={{ display: 'block', fontSize: 12, color: 'var(--text-3)' }}>Swipe me either way</span>
                </span>
              </div>
            </DragToDismissCard>
          </div>
          <Rule />
          <div>
            <Hint>Reorderable list — neighbors glide on midpoint swap</Hint>
            <ReorderableList items={['التصميم — الأساسيات', 'الألوان وعلم النفس', 'الحركة والفيزياء', 'قواعد RTL']} />
          </div>
        </Card>

        {/* status & text motion */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-3)' }}>TOTAL ORDERS</div>
              <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em', marginTop: 2 }}>
                <OdometerNumber value={12480} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>odometer — counts up once in view</div>
            </div>
            <SpeedDialFab actions={[
              { label: 'New booking', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M4 10h16M9 3v4M15 3v4" /></svg> },
              { label: 'New customer', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5" /></svg> },
              { label: 'New note', icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4l6 6-10 10H4v-6L14 4z" /></svg> },
            ]} />
          </div>
          <Rule />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div><div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Icon morph swap</div><div style={{ fontSize: 12, color: 'var(--text-3)' }}>blur-rotate crossfade · 300ms</div></div>
            <IconMorphSwap
              iconA={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6l8 6-8 6V6z" /></svg>}
              iconB={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 5v14M15 5v14" /></svg>}
              aria-label="Play / pause"
            />
          </div>
          <Rule />
          <div>
            <Hint mb={8}>Typewriter — 55ms type · 30ms delete · 1.1s hold</Hint>
            <Typewriter phrases={['Calm platforms.', 'منصات هادئة.', 'Physics, not fireworks.']} />
          </div>
          <Rule />
          <div>
            <Hint mb={8}>EKG dot — travels the path · live signals only</Hint>
            <EkgPath />
          </div>
        </Card>

        {/* loaders + snackbar + stagger */}
        <Card>
          <div>
            <Hint mb={14}>Segment loader — determinate phases, 120ms stagger</Hint>
            <SegmentLoader segments={4} done={3} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--text-3)', marginTop: 8 }}>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>تجهيز</span><span style={{ color: 'var(--accent)', fontWeight: 600 }}>تغليف</span><span style={{ color: 'var(--accent)', fontWeight: 600 }}>تحميل</span><span>تسليم</span>
            </div>
          </div>
          <Rule />
          <UndoDemo />
          <Rule />
          <div>
            <Hint>Stagger entrance — 90ms apart, once, on scroll into view</Hint>
            <Stagger>
              {['Design tokens locked', 'Motion curves tuned', 'RTL verified'].map((s) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: 'var(--surface-2)', fontSize: 13, fontWeight: 600 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                  {s}
                </div>
              ))}
            </Stagger>
          </div>
        </Card>
      </div>
    </Section>
  );
}
