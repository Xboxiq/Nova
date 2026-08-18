import { useEffect, useRef, useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import { SpecShelf } from '../SpecRow';
import { useTheme } from '../../theme/ThemeContext';
import {
  SquircleIcon, SpecularOrb, BurstSeal, MemojiAvatar,
  SelfDrawingIcon, IconOrbitRing, AnimatedStateIcon,
  BlueprintCard, ApertureCard, BreakerCard, MeterDial, TiltedStack3D, FolderCard,
  AuroraMeshHero, CursorSpotlight, GenerateButton, GlowInput,
  AgentTimeline, SwipeableListRow, MagnifyingDock,
} from '../../components';

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>{children}</div>;
}
function Rule() { return <div style={{ height: 1, background: 'var(--border)' }} />; }
function Hint({ children, mb = 12 }: { children: React.ReactNode; mb?: number }) {
  return <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: mb }}>{children}</div>;
}

function StateCycler() {
  const [state, setState] = useState<'loading' | 'success' | 'error'>('loading');
  const t = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  useEffect(() => {
    const order = ['loading', 'success', 'error'] as const;
    let i = 0;
    t.current = setInterval(() => { i = (i + 1) % 3; setState(order[i]); }, 1800);
    return () => clearInterval(t.current);
  }, []);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <AnimatedStateIcon state={state} />
      <span style={{ fontSize: 12.5, color: 'var(--text-2)', fontFamily: 'var(--font-mono)' }}>{state}</span>
    </span>
  );
}

const DOCK_ICONS = [
  <svg key="h" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8z" /></svg>,
  <svg key="g" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></svg>,
  <svg key="s" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>,
  <svg key="b" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.8 5.5 1.8 5.5H4.2S6 14 6 9.5z" /><path d="M10 18.5a2 2 0 0 0 4 0" /></svg>,
  <svg key="u" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5" /></svg>,
  <svg key="c" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>,
];

const RING_ICONS = [
  <svg key="1" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>,
  <svg key="2" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1M16 12h6" /></svg>,
  <svg key="3" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg>,
  <svg key="4" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17V7l8 5 8-5v10" /></svg>,
  <svg key="5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 19V9M10 19V5M16 19v-8M21 19H3" /></svg>,
];

export function LibraryVault() {
  const { rtl } = useTheme();

  return (
    <Section label="Library vault">
      <SectionHeader eyebrow="19 · LIBRARY VAULT" title="Mined from the source libraries">
        Twenty patterns extracted from the four uploaded libraries (Icons &amp; Cards Lab, Liquid Soft, Jahez, v2) and rebuilt as importable components: the Soft primitives, the missing rituals, hero surfaces, and flow patterns. All in <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>src/components</code>.
      </SectionHeader>

      {/* row 1 — aurora hero with generate + glow input inside */}
      <AuroraMeshHero>
        <div style={{ maxWidth: 520 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--accent)' }}>AURORA MESH HERO</div>
          <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.015em', margin: '8px 0 6px' }}>Drifting radials, no video needed</div>
          <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: '21px', margin: '0 0 18px' }}>Two blurred orbs float behind layered gradients that drift 16s per cycle. The whole surface is this screen's single gradient budget.</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <GenerateButton>توليد الوصف بالذكاء</GenerateButton>
            <div style={{ flex: 1, minWidth: 220 }}><GlowInput placeholder="اسأل مدار أي شيء…" /></div>
          </div>
        </div>
      </AuroraMeshHero>

      <SpecShelf>
        {/* soft primitives */}
        <Card>
          <Hint mb={4}>Soft primitives — squircle triple, orbs, seal, memoji</Hint>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <SquircleIcon hue="orange"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg></SquircleIcon>
            <SquircleIcon hue="green"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg></SquircleIcon>
            <SquircleIcon hue="blue" variant="tint"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11l8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8z" /></svg></SquircleIcon>
            <SquircleIcon hue="violet" variant="tint" size={36}><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5" /></svg></SquircleIcon>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <SpecularOrb hue="blue">1</SpecularOrb>
            <SpecularOrb hue="green">2</SpecularOrb>
            <SpecularOrb hue="violet">3</SpecularOrb>
            <span style={{ width: 1, height: 36, background: 'var(--border)' }} />
            <BurstSeal hue="blue" />
            <MemojiAvatar name="نورة المطيري" />
            <MemojiAvatar name="Omar Khalid" />
            <MemojiAvatar name="Lina Aziz" />
          </div>
          <Rule />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Self-drawing ritual — hover the tile</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>strokes draw in 750ms · the 5th icon ritual</div>
            </div>
            <SelfDrawingIcon paths={['M4 11l8-7 8 7v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-8z', 'M9 21v-6h6v6']} />
          </div>
          <Rule />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)' }}>Animated state icons</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>success draws · error shakes · loading orbits</div>
            </div>
            <StateCycler />
          </div>
        </Card>

        {/* rituals: orbit ring + meter + breaker */}
        <Card>
          <Hint mb={0}>Icon orbit ring — integrations, icons stay upright</Hint>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <IconOrbitRing icons={RING_ICONS} />
          </div>
          <Rule />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 12 }}>
            <MeterDial value={82} label="QUALITY" />
            <MeterDial value={47} label="CAPACITY" />
          </div>
          <Rule />
          <BreakerCard title="التجديد التلقائي" description="Breaker — the switch floods the card with color" defaultOn />
        </Card>

        {/* cards: blueprint + aperture + folder */}
        <Card>
          <Hint mb={0}>Blueprint — engineering grid fades in on hover</Hint>
          <BlueprintCard>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 38, height: 38, borderRadius: 6, background: 'var(--info-soft)', color: 'var(--info)', display: 'grid', placeItems: 'center', flex: 'none' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3M16 3v3M8 18v3M16 18v3M3 8h3M3 16h3M18 8h3M18 16h3" /><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
              </span>
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 600 }}>Webhooks API</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-2)' }}>Delivery receipts under 40ms, signed payloads.</div>
              </div>
            </div>
          </BlueprintCard>
          <Rule />
          <Hint mb={0}>Aperture — the iris opens on hover</Hint>
          <ApertureCard cover={<span style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: '0.04em' }}>HOVER TO REVEAL</span>}>
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>عرض الإطلاق</div>
            <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: '20px' }}>خصم 30% للدفعة الأولى من المشتركين، حتى نهاية الشهر.</div>
          </ApertureCard>
          <Rule />
          <Hint mb={0}>Folder — 3-layer CSS drive card</Hint>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <FolderCard name="العقود" meta="14 ملفاً · محدث اليوم" chip="PDF" />
            <FolderCard name="Brand kit" meta="9 files · 128 MB" chip="FIG" />
          </div>
        </Card>

        {/* tilted stack + swipeable + timeline */}
        <Card>
          <Hint mb={0}>Tilted 3D stack — wallets and piles, hover to fan</Hint>
          <TiltedStack3D layers={[
            <div key="a" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13.5, fontWeight: 700 }}>بطاقة مدى</span>
              <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>•••• 4821</span>
            </div>,
            <span key="b" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-2)' }}>Visa · •••• 1177</span>,
            <span key="c" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-3)' }}>Apple Pay</span>,
          ]} />
          <Rule />
          <Hint mb={0}>Swipeable row — drag toward the end edge</Hint>
          <SwipeableListRow rtl={rtl} actionLabel="أرشفة">
            <MemojiAvatar name="سارة العلي" size={34} />
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 13.5, fontWeight: 600 }}>سارة العلي</span>
              <span style={{ display: 'block', fontSize: 12, color: 'var(--text-3)' }}>وصلني الطلب، شكراً لكم!</span>
            </span>
            <span style={{ fontSize: 11, color: 'var(--text-3)', flex: 'none' }}>9:41</span>
          </SwipeableListRow>
          <Rule />
          <Hint mb={0}>Agent timeline — expandable pipeline steps</Hint>
          <AgentTimeline steps={[
            { title: 'قراءة الطلب', state: 'done' },
            { title: 'تحليل المكتبات المرفقة', state: 'done', detail: 'أربع مكتبات، 118 نمطاً مفهرساً.' },
            { title: 'بناء المكونات', state: 'active', detail: 'عشرون مكوناً جديداً قيد التوليد على توكنز مدار.' },
            { title: 'فحص RTL والثيمات', state: 'pending' },
          ]} />
        </Card>
      </SpecShelf>

      {/* row 3 — spotlight + magnifying dock */}
      <SpecShelf>
        <CursorSpotlight>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--accent)' }}>CURSOR SPOTLIGHT</div>
          <div style={{ fontSize: 19, fontWeight: 600, margin: '8px 0 4px' }}>The light follows your pointer</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', maxWidth: '40ch', lineHeight: '20px' }}>A radial gradient recenters on mousemove over a faint dot grid. Tech product pages only.</div>
        </CursorSpotlight>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: 24, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
          <Hint mb={0}>Magnifying dock — scale is a function of distance</Hint>
          <MagnifyingDock icons={DOCK_ICONS} labels={['Home', 'Browse', 'Search', 'Alerts', 'Profile', 'Menu']} />
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>hovered 1.32 · neighbors 1.14 · next 1.05</div>
        </div>
      </SpecShelf>
    </Section>
  );
}
