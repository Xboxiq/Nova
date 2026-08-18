import { Section, SectionHeader } from '../SectionHeader';
import {
  RippleButton, CursorTrail, PasswordMeter, RotaryKnob, CountdownRing, SkeletonToContent,
  BatteryCharge, SignalBars, BookmarkToggle, WaveLoader, EqualizerBars, NewtonsCradle,
  BouncingBall, NeonGlowPulse, GradientBorderMorph, GlitchText, TextSplitReveal, TextWave,
  FlipCard, CubeRotate3D, ClipWipe, FoldingDoors, BeforeAfter, PagePeel,
} from '../../components';

/* A uniform cell so each of the 24 completion patterns reads as one catalogued tile. */
function Cell({ name, en, children }: { name: string; en: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 18, padding: 20, boxShadow: 'var(--shadow-1)', minHeight: 176 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: '-0.01em' }}>{name}</span>
        <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{en}</span>
      </div>
      <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>{children}</div>
    </div>
  );
}

export function Kinetics99() {
  return (
    <Section label="Kinetics 99">
      <SectionHeader eyebrow="25 · KINETICS 99" title="The completion set: full ckissi/kinetics parity">
        The two dozen patterns that finish the 99-effect Kinetics catalog: ambient loaders, physics toys, text theatrics, and reveals. Every one is tokenized, recolors with the theme, mirrors under RTL, and honours reduced-motion. Ambient loops are the only repeating motion, by design.
      </SectionHeader>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
        <Cell name="نبض اللمس" en="Ripple Feedback"><RippleButton /></Cell>
        <Cell name="أثر المؤشر" en="Cursor Trail"><CursorTrail /></Cell>
        <Cell name="قوة كلمة المرور" en="Password Meter"><PasswordMeter /></Cell>
        <Cell name="مِقبض دوّار" en="Rotary Knob"><RotaryKnob /></Cell>
        <Cell name="حلقة عدّ تنازلي" en="Countdown Ring"><CountdownRing /></Cell>
        <Cell name="هيكل إلى محتوى" en="Skeleton to Content"><SkeletonToContent /></Cell>
        <Cell name="شحن البطارية" en="Battery Charge"><BatteryCharge /></Cell>
        <Cell name="أعمدة الإشارة" en="Signal Bars"><SignalBars /></Cell>
        <Cell name="حفظ" en="Bookmark Toggle"><BookmarkToggle defaultOn /></Cell>
        <Cell name="مُحمّل موجي" en="Wave Loader"><WaveLoader /></Cell>
        <Cell name="معادل صوتي" en="Equalizer Bars"><EqualizerBars /></Cell>
        <Cell name="مهد نيوتن" en="Newton's Cradle"><NewtonsCradle /></Cell>
        <Cell name="كرة قافزة" en="Bouncing Ball"><BouncingBall /></Cell>
        <Cell name="توهّج نيون" en="Neon Glow Pulse"><NeonGlowPulse /></Cell>
        <Cell name="حدّ متدرّج دوّار" en="Gradient Border Morph"><GradientBorderMorph /></Cell>
        <Cell name="نص متعطّل" en="Glitch Text"><GlitchText /></Cell>
        <Cell name="كشف حرفي" en="Text Split Reveal"><TextSplitReveal /></Cell>
        <Cell name="نص متموّج" en="Text Wave"><TextWave /></Cell>
        <Cell name="بطاقة تنقلب" en="Flip Card"><FlipCard /></Cell>
        <Cell name="مكعّب ثلاثي" en="3D Cube Rotate"><CubeRotate3D /></Cell>
        <Cell name="مسح كشفي" en="Clip Wipe"><ClipWipe /></Cell>
        <Cell name="أبواب تُفتح" en="Folding Doors"><FoldingDoors /></Cell>
        <Cell name="قبل / بعد" en="Before / After"><BeforeAfter /></Cell>
        <Cell name="طيّ الزاوية" en="Page Peel"><PagePeel /></Cell>
      </div>
    </Section>
  );
}
