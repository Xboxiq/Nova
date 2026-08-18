import { useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import {
  MagneticButton, HoldToConfirm, SlideToUnlock, ElasticCounter, PinInput,
  KeycapButton, SlidingGradientButton, ScrambleText, UnderlineLink,
} from '../../components';

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>;
}
function Rule() { return <div style={{ height: 1, background: 'var(--border)' }} />; }
function Hint({ children }: { children: React.ReactNode }) { return <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: 12 }}>{children}</div>; }

export function PhysicsLab() {
  const [scramTrigger, setScramTrigger] = useState(0);

  return (
    <Section label="Physics lab">
      <SectionHeader eyebrow="16 · PHYSICS LAB" title="Motion that has weight">
        Spring-physics interactions from the Kinetics vocabulary — tuned curves, not guessed durations. Every demo is the reusable component from <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>src/components</code>: drag, hold, type, press.
      </SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
        {/* magnetic + keycap + gradient slide */}
        <Card>
          <div>
            <Hint>Magnetic button — pulled toward the cursor</Hint>
            <div style={{ display: 'grid', placeItems: 'center', height: 110, borderRadius: 6, border: '1.5px dashed var(--border)', background: 'var(--bg-deep)' }}>
              <MagneticButton>Hover near me</MagneticButton>
            </div>
          </div>
          <Rule />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div><div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Keycap press</div><div style={{ fontSize: 12, color: 'var(--text-3)' }}>real bottom edge · 90ms</div></div>
            <KeycapButton>K</KeycapButton>
          </div>
          <Rule />
          <div>
            <Hint>Sliding gradient — 3-stop loop, position glides</Hint>
            <SlidingGradientButton>Hover — the light travels</SlidingGradientButton>
          </div>
        </Card>

        {/* hold + slide + counter */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <HoldToConfirm />
            <div><div style={{ fontSize: 14.5, fontWeight: 600 }}>Hold to confirm</div><div style={{ fontSize: 12.5, color: 'var(--text-3)', lineHeight: '18px' }}>Ring fills over 900ms — release early to cancel. The honest destructive control.</div></div>
          </div>
          <Rule />
          <div>
            <Hint>Slide to unlock — 85% latch, rubber return</Hint>
            <SlideToUnlock />
          </div>
          <Rule />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div><div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Elastic counter</div><div style={{ fontSize: 12, color: 'var(--text-3)' }}>bumps + overshoots · tap it</div></div>
            <ElasticCounter />
          </div>
        </Card>

        {/* pin + scramble + underline + curves */}
        <Card>
          <div>
            <Hint>PIN input — pops and auto-advances (type)</Hint>
            <PinInput />
          </div>
          <Rule />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Scramble reveal</span>
              <button onClick={() => setScramTrigger((t) => t + 1)} className="i-soft" style={{ height: 30, padding: '0 14px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Decode</button>
            </div>
            <ScrambleText text="MADAR DESIGN" trigger={scramTrigger} />
          </div>
          <Rule />
          <div>
            <Hint>Underline draw — scaleX from the start edge</Hint>
            <UnderlineLink>Read the full design.md reference</UnderlineLink>
          </div>
          <Rule />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: '20px', color: 'var(--text-2)', background: 'var(--bg-deep)', borderRadius: 6, padding: '14px 16px' }} dir="ltr">
            <div><span style={{ color: 'var(--accent)' }}>spring</span>  cubic-bezier(0.34, 1.56, 0.64, 1)</div>
            <div><span style={{ color: 'var(--accent)' }}>glide</span>   cubic-bezier(0.16, 1.00, 0.30, 1)</div>
            <div><span style={{ color: 'var(--accent)' }}>draw</span>    cubic-bezier(0.65, 0.00, 0.35, 1)</div>
            <div><span style={{ color: 'var(--accent)' }}>drop-in</span> cubic-bezier(0.18, 1.25, 0.40, 1)</div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
