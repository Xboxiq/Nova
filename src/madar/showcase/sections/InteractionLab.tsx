import { Section, SectionHeader } from '../SectionHeader';
import { SpecShelf } from '../SpecRow';
import {
  PublishButton, CopyCodeButton, ShatterButton,
  BouncyToggle, CinematicThemeSwitch, GlowMenu,
  LocationTag, IridescentFoilCard, LogoTraceLoader, AgentDock,
} from '../../components';

export function InteractionLab() {
  return (
    <Section label="Interaction lab">
      <SectionHeader eyebrow="13 · INTERACTION LAB" title="Stateful micro-interactions">
        Buttons and toggles that narrate their own state — every demo here is the reusable component from <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>src/components</code>, live. Publish, copy, shatter, flip the toggles.
      </SectionHeader>
      <SpecShelf>
        {/* stateful buttons */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Publish — a button that reports back</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <PublishButton />
            <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>width locked — no jump</span>
          </div>
          <div style={{ height: 1, background: 'var(--border)' }} />
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Copy code — morphs to confirmation</div>
          <CopyCodeButton code="npm i @madar/tokens" />
          <div style={{ height: 1, background: 'var(--border)' }} />
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Shatter — destructive delight (tap)</div>
          <div><ShatterButton>Clear all</ShatterButton></div>
        </div>

        {/* toggles */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div><div style={{ fontSize: 14.5, fontWeight: 600 }}>Bouncy toggle</div><div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Overshoot spring · 480ms</div></div>
            <BouncyToggle defaultChecked aria-label="Bouncy toggle" />
          </div>
          <div style={{ height: 1, background: 'var(--border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div><div style={{ fontSize: 14.5, fontWeight: 600 }}>Cinematic theme switch</div><div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Sun sets, stars rise · glow knob</div></div>
            <CinematicThemeSwitch aria-label="Theme switch" />
          </div>
          <div style={{ height: 1, background: 'var(--border)' }} />
          <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Glow menu — active item radiates</div>
          <div><GlowMenu items={['Explore', 'Library', 'Saved']} /></div>
          <div style={{ height: 1, background: 'var(--border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <LocationTag label="الرياض، السعودية" />
            <span style={{ fontSize: 12.5, color: 'var(--text-3)' }}>Location tag — live dot</span>
          </div>
        </div>

        {/* foil + trace loader + agent dock */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <IridescentFoilCard>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', color: '#7A6E86' }}>IRIDESCENT FOIL</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#3A3444', marginTop: 8 }}>Founders card · 0001</div>
            <div style={{ fontSize: 13, color: '#8A7F96', marginTop: 4 }}>Holographic sheen shifts on hover. Collectibles, memberships, gift cards.</div>
          </IridescentFoilCard>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, display: 'flex', alignItems: 'center', gap: 18 }}>
            <LogoTraceLoader />
            <div><div style={{ fontSize: 14.5, fontWeight: 600 }}>Logo trace loader</div><div style={{ fontSize: 12.5, color: 'var(--text-3)', lineHeight: '18px' }}>The brand mark draws itself while the app boots — branded waiting, not a spinner.</div></div>
          </div>
          <AgentDock agents={[
            { name: 'Researcher', initial: 'R', gradient: 'linear-gradient(135deg,#7C4DFF,#4FA3FF)', state: 'thinking' },
            { name: 'Writer', initial: 'W', gradient: 'linear-gradient(135deg,#2DCB7E,#15976A)', state: 'idle' },
            { name: 'Reviewer', initial: 'Q', gradient: 'linear-gradient(135deg,#FF8A4A,#F36A1F)', state: 'done' },
          ]} />
        </div>
      </SpecShelf>
    </Section>
  );
}
