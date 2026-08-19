import { useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import { SpecShelf } from '../SpecRow';
import {
  Popover, FrostedTooltip, SelectField, DropdownMenu, AlertDialog, WelcomeModal,
  CommandBarTrigger, KbdButton, SpotlightButton, MessageDock,
  AiLoader, FluxLoader, SyncProgressPanel, PulseRadar, MetricRing, RangeBar, LogsTable,
  ReactionBar, CommentThread, LiveCursorLabel, TeamSection,
  AssigneeUser, AvatarBadge, AvatarStack, YearsTimeline,
  SplitCard, GradientMeshCard, PinnedNote,
  WorkflowSteps, OnboardingChecklist, ChecklistRow, NumberedFeatures, BigStatRow,
  HeadlineChip, ConfigRow, FooterNewsletter, IconClusterNetwork, TimeField, ColorPicker,
  GradientPaletteGrid, DuotoneImage, IconMarquee, FileCard, EditorialCard,
  OdometerNumber, CompactNav, ProgressiveNavbar, BucketGlyph,
} from '../../components';

function Card({ children, pad = 24 }: { children: React.ReactNode; pad?: number }) {
  return <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: pad, display: 'flex', flexDirection: 'column', gap: 18 }}>{children}</div>;
}
function Rule() { return <div style={{ height: 1, background: 'var(--border)' }} />; }
function Hint({ children, mb = 12 }: { children: React.ReactNode; mb?: number }) {
  return <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-2)', marginBottom: mb }}>{children}</div>;
}

const CLUSTER_ICONS = [
  <svg key="1" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>,
  <svg key="2" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17V7l8 5 8-5v10" /></svg>,
  <svg key="3" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><path d="M4 19V9M10 19V5M16 19v-8M21 19H3" /></svg>,
  <svg key="4" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-5.5 8-5.5s8 2 8 5.5" /></svg>,
  <svg key="5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg>,
];

const MARQUEE_TILES = ['سل', 'جز', 'مد', 'وس', 'تع', 'رك'].map((t, i) => (
  <span key={t} style={{ width: 44, height: 44, borderRadius: 6, background: `var(--${['accent', 'info', 'warning', 'success', 'danger', 'accent'][i]}-soft)`, color: `var(--${['accent', 'info', 'warning', 'success', 'danger', 'accent'][i]})`, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 14, flex: 'none' }}>{t}</span>
));

export function PatternAtlas() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [progress, setProgress] = useState(0.64);

  return (
    <Section label="Pattern atlas">
      <SectionHeader eyebrow="20 · PATTERN ATLAS" title="The full source-library sweep">
        The rest of the 95-pattern Jahez catalog plus the remaining lab pieces, every one an importable component. This completes the source libraries: overlays, feedback, social, commerce, layout.
      </SectionHeader>

      <SpecShelf>
        {/* overlays & triggers */}
        <Card>
          <Hint mb={0}>Overlays: popover · tooltip · select · dropdown · dialogs</Hint>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <Popover trigger="Open popover">
              <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>مشاركة المشروع</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: '19px' }}>يغلق بالنقر خارج اللوحة، والسهم يربطه بالزر.</div>
            </Popover>
            <FrostedTooltip tip="تلميح مجمّد بسهم مطابق">
              <button className="i-soft" style={{ height: 38, padding: '0 16px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Hover me</button>
            </FrostedTooltip>
            <DropdownMenu items={[
              { label: 'Rename', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4l6 6-10 10H4v-6L14 4z" /></svg> },
              { label: 'Duplicate', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a1 1 0 0 1 1-1h10" /></svg> },
              { label: 'Delete project', danger: true, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg> },
            ]} />
          </div>
          <SelectField options={['Riyadh (GMT+3)', 'Dubai (GMT+4)', 'Cairo (GMT+2)', 'London (GMT+1)']} />
          <CommandBarTrigger />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <KbdButton kbd="⌘S">Save draft</KbdButton>
            <SpotlightButton>Spotlight follows</SpotlightButton>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => setAlertOpen(true)} className="i-danger-soft" style={{ height: 38, padding: '0 16px', borderRadius: 6, border: '1px solid var(--danger)', background: 'transparent', color: 'var(--danger)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Alert dialog</button>
            <button onClick={() => setWelcomeOpen(true)} className="i-soft" style={{ height: 38, padding: '0 16px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Welcome modal</button>
          </div>
        </Card>

        {/* feedback */}
        <Card>
          <Hint mb={0}>Feedback: loaders · flux · sync · radar · rings · ranges</Hint>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            <AiLoader kind="dots" /><AiLoader kind="spinner" /><AiLoader kind="pulse" /><AiLoader kind="line" />
          </div>
          <Rule />
          <div>
            <FluxLoader progress={progress} phases={['تجهيز', 'تغليف', 'تحميل', 'تسليم']} />
            <button onClick={() => setProgress((p) => (p >= 0.99 ? 0.18 : Math.min(p + 0.18, 1)))} className="i-soft" style={{ marginTop: 12, height: 30, padding: '0 14px', borderRadius: 6, border: '1px solid var(--border-strong)', background: 'var(--surface)', color: 'var(--text)', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Advance</button>
          </div>
          <Rule />
          <SyncProgressPanel fileName="tokens-mint-v2.fig" fileMeta="8.4 MB · Figma" progress={progress} />
          <Rule />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 10 }}>
            <PulseRadar><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.4" /></svg></PulseRadar>
            <MetricRing value={73} unit="%" label="SLA" size={100} />
          </div>
          <Rule />
          <div>
            <Hint mb={14}>Range bar — deal window</Hint>
            <RangeBar start={0.22} end={0.74} startLabel="12 Jul" endLabel="28 Jul" />
          </div>
        </Card>

        {/* social */}
        <Card>
          <Hint mb={0}>Social: thread · reactions · cursors · people</Hint>
          <CommentThread
            root={{ name: 'سارة العلي', text: 'التصميم النهائي جاهز للمراجعة — الثيم الليلي صار أعمق بكثير.', time: '2h' }}
            reply={{ name: 'Omar Khalid', text: 'اعتمدناه. أرسلي نسخة الـ RTL.', time: '1h' }}
            typingName="لينا"
          />
          <ReactionBar reactions={[{ emoji: '👍', count: 4, mine: true }, { emoji: '🎉', count: 2 }, { emoji: '🚀', count: 7 }]} />
          <Rule />
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <LiveCursorLabel name="نورة" color="oklch(0.62 0.15 293)" />
            <LiveCursorLabel name="Adam" color="oklch(0.66 0.15 245)" />
            <AvatarBadge name="ريم القحطاني" badge={3} />
            <AvatarBadge name="Yousef" badge="online" />
            <AvatarStack names={['سارة العلي', 'Omar Khalid', 'Lina Aziz']} more={4} />
          </div>
          <Rule />
          <AssigneeUser people={['نورة المطيري', 'Omar Khalid', 'ريم القحطاني']} />
          <Rule />
          <MessageDock onSend={() => undefined} />
        </Card>

        {/* commerce & content */}
        <Card>
          <SplitCard
            media={<DuotoneImage><div style={{ width: '100%', height: '100%', minHeight: 110, background: 'repeating-linear-gradient(45deg, #888 0 8px, #ccc 8px 16px)' }} /></DuotoneImage>}
            title="دورة التصوير الليلي"
            text="Duotone media column zooms on hover."
          />
        </Card>

        {/* structure: workflow, onboarding, checklist, config */}
        <Card>
          <Hint mb={0}>Workflow connector + wait capsules</Hint>
          <WorkflowSteps stages={[
            { title: 'استلام الطلب', meta: 'تلقائي', wait: '~2 min' },
            { title: 'التجهيز في المطبخ', meta: 'يدوي', wait: '~14 min' },
            { title: 'خروج المندوب', meta: 'تلقائي' },
          ]} />
          <Rule />
          <OnboardingChecklist
            title="ابدئي الآن"
            steps={['أنشئي المتجر', 'أضيفي أول منتج', 'فعّلي الدفع الإلكتروني', 'شاركي الرابط']}
            current={2}
            footer={<>الخطة: Growth · اكتمل <b style={{ fontVariantNumeric: 'tabular-nums' }}>2/4</b></>}
          />
          <Rule />
          <div>
            <ChecklistRow ok>شهادة SSL فعّالة</ChecklistRow>
            <ChecklistRow ok>النسخ الاحتياطي اليومي يعمل</ChecklistRow>
            <ChecklistRow ok={false}>مفتاح API منتهي الصلاحية</ChecklistRow>
          </div>
          <Rule />
          <div>
            <ConfigRow label="المنطقة الزمنية" value="GMT+3 · Riyadh" />
            <ConfigRow label="حد الطلبات" value="1,200 / يوم" />
            <ConfigRow label="الإصدار" value="2.4.1" />
          </div>
        </Card>

        {/* data + files + time */}
        <Card>
          <Hint mb={0}>Logs table — rows expand</Hint>
          <LogsTable rows={[
            { time: '14:02', method: 'POST', path: '/api/orders', code: 201, detail: 'order_id: ord_8842 · latency 38ms · region me-central' },
            { time: '14:01', method: 'GET', path: '/api/menu?branch=12', code: 200 },
            { time: '13:58', method: 'POST', path: '/api/payments/capture', code: 402, detail: 'card_declined: insufficient_funds · retried 0' },
          ]} />
          <Rule />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <FileCard name="عقد الشراكة" meta="2.1 MB · أمس" ext="PDF" />
            <FileCard name="Q3-numbers" meta="840 KB · اليوم" ext="XLS" />
          </div>
          <Rule />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <Hint mb={4}>Time field</Hint>
              <TimeField />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <Hint mb={4}>iOS color picker</Hint>
              <ColorPicker />
            </div>
          </div>
        </Card>

        {/* premium surfaces */}
        <Card>
          <Hint mb={0}>Gradient mesh + noise — one KPI max per screen</Hint>
          <GradientMeshCard>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', opacity: 0.85 }}>GMV THIS MONTH</div>
            <div style={{ fontSize: 34, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', marginTop: 6 }}><OdometerNumber value={481260} /> <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.8 }}>SAR</span></div>
          </GradientMeshCard>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'start' }}>
            <PinnedNote>
              <div style={{ fontSize: 13, fontWeight: 700 }}>ملاحظة مثبّتة</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, lineHeight: '18px' }}>لوح فلّين بدبوس حقيقي.</div>
            </PinnedNote>
            <EditorialCard overline="خدمة اليوم" title={<>جلسة تصوير المنتجات</>} meta="من 320 SAR" />
          </div>
        </Card>

        {/* marketing blocks */}
        <Card>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.35 }}>
            نبني <HeadlineChip icon={<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>}>أسرع</HeadlineChip> منصة توصيل في المنطقة
          </div>
          <Rule />
          <BigStatRow stats={[{ value: '99.4%', label: 'التوافر' }, { value: '38ms', label: 'زمن الاستجابة' }, { value: '4.9', label: 'تقييم المتجر' }]} />
          <Rule />
          <NumberedFeatures items={[
            { title: 'اربط متجرك', text: 'استيراد المنتجات من سلة أو زد في دقيقة.' },
            { title: 'فعّل الأسطول', text: 'مناديب المنطقة يظهرون تلقائياً حسب الضغط.' },
            { title: 'تابع لحظياً', text: 'كل طلب على الخريطة من المطبخ إلى الباب.' },
          ]} />
          <Rule />
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <IconClusterNetwork nodes={CLUSTER_ICONS} />
          </div>
        </Card>

        {/* people + timeline + gradients */}
        <Card>
          <Hint mb={0}>Team section</Hint>
          <TeamSection members={[
            { name: 'نورة المطيري', role: 'مديرة التصميم' },
            { name: 'Omar Khalid', role: 'Frontend lead' },
            { name: 'ريم القحطاني', role: 'باحثة تجربة' },
          ]} />
          <Rule />
          <Hint mb={0}>Years timeline</Hint>
          <YearsTimeline stations={[
            { year: '2026', title: 'مدار v1.0', text: 'خمسة ثيمات، لغتان، ومكتبة 100+ مكوّن.' },
            { year: '2025', title: 'أول نموذج', text: 'التوكنز والزجاجيات الثلاث.' },
            { year: '2024', title: 'الفكرة', text: 'مرجع واحد بدل التصفح المتناثر.' },
          ]} />
          <Rule />
          <Hint mb={0}>Curated gradients — tap to copy CSS</Hint>
          <GradientPaletteGrid />
        </Card>
      </SpecShelf>

      {/* scroll-reactive chrome (shown in both states side by side) + bucket */}
      <SpecShelf>
        <Card>
          <Hint mb={0}>Compact nav — resting vs. scrolled (shrinks 320ms)</Hint>
          <div style={{ display: 'grid', placeItems: 'center', padding: 16, borderRadius: 6, background: 'var(--bg-deep)' }}>
            <CompactNav scrolled={false} brand={<>Madar</>} links={['Home', 'Features', 'Docs']} cta="Get started" />
          </div>
          <div style={{ display: 'grid', placeItems: 'center', padding: 16, borderRadius: 6, background: 'var(--bg-deep)' }}>
            <CompactNav scrolled brand={<>Madar</>} links={['Home', 'Features', 'Docs']} cta="Get started" />
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>In a real page these read window scroll via <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>useScrolled()</code>.</div>
        </Card>

        <Card>
          <Hint mb={0}>Progressive navbar — transparent over hero, frosts on scroll</Hint>
          <div style={{ borderRadius: 6, overflow: 'hidden', background: 'linear-gradient(150deg, color-mix(in srgb, var(--accent) 45%, #14141a), color-mix(in srgb, var(--accent) 12%, #0e0e12))', padding: 8 }}>
            <ProgressiveNavbar scrolled={false} brand={<>Bridge</>} links={['المنتج', 'الأسعار', 'الدعم']} />
          </div>
          <ProgressiveNavbar scrolled brand={<>Bridge</>} links={['المنتج', 'الأسعار', 'الدعم']} />
        </Card>

        <Card>
          <Hint mb={0}>Bucket glyph — tokenized CSS 3D illustration</Hint>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', justifyContent: 'center', padding: 8 }}>
            <BucketGlyph count={12} />
            <BucketGlyph size={54} count={3} />
            <BucketGlyph size={44} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', textAlign: 'center' }}>Recolors with the theme accent.</div>
        </Card>
      </SpecShelf>

      {/* marquee + footer full width */}
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '18px 24px', }}>
          <IconMarquee>{MARQUEE_TILES}</IconMarquee>
        </div>
        <FooterNewsletter
          note="نرسل ملخصاً واحداً شهرياً. لا رسائل غيره."
          columns={[
            { title: 'المنتج', links: ['المكونات', 'الثيمات', 'الحركة', 'التسعير'] },
            { title: 'المصادر', links: ['design.md', 'بنك الأنماط', 'مختبر الفيزياء'] },
            { title: 'الشركة', links: ['من نحن', 'الوظائف', 'تواصل'] },
          ]}
        />
      </div>

      <AlertDialog
        open={alertOpen} onClose={() => setAlertOpen(false)}
        title="حذف المشروع نهائياً؟"
        description="سيُحذف «متجر الرياض» وكل طلباته. لا يمكن التراجع عن هذا الإجراء."
        confirmLabel="حذف نهائي" cancelLabel="إلغاء"
      />
      <WelcomeModal
        open={welcomeOpen} onClose={() => setWelcomeOpen(false)}
        icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" /></svg>}
        title="أهلاً بك في مدار"
        description="نظام تصميم ثنائي اللغة بخمسة ثيمات ومكتبة تتجاوز مئة مكوّن. خذ جولة الدقيقتين."
      />
    </Section>
  );
}
