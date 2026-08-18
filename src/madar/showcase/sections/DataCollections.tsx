import type { ReactNode } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import {
  CATEGORICAL, DonutChart, Gauge, Heatmap, StarRating, ProgressCircle,
  Tabs, Accordion, Breadcrumb, Pagination, KanbanBoard, CalendarMonth, TreeView, TagInput,
} from '../../components';
import type { KanbanColumn, TreeNode } from '../../components';

/* A titled panel so every demo reads as one library artifact. */
function Panel({ title, note, children, span = 1 }: { title: string; note?: string; children: ReactNode; span?: number }) {
  return (
    <div style={{ gridColumn: `span ${span}`, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 22, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
      <div>
        <div style={{ fontSize: 14.5, fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</div>
        {note && <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3 }}>{note}</div>}
      </div>
      {children}
    </div>
  );
}

const KANBAN: KanbanColumn[] = [
  { key: 'todo', title: 'قيد الانتظار', cards: [
    { id: 'k1', title: 'مراجعة الرموز', tone: 'accent' },
    { id: 'k2', title: 'توثيق الألوان', tone: 'warning' },
  ] },
  { key: 'doing', title: 'قيد التنفيذ', cards: [
    { id: 'k3', title: 'قسم البيانات', tone: 'success' },
  ] },
  { key: 'done', title: 'مكتمل', cards: [
    { id: 'k4', title: 'الوضع الزجاجي', tone: 'accent' },
  ] },
];

const TREE: TreeNode[] = [
  { label: 'src', children: [
    { label: 'components', children: [
      { label: 'dataviz.tsx' },
      { label: 'collections.tsx' },
    ] },
    { label: 'styles', children: [
      { label: 'tokens.css' },
      { label: 'interactions.css' },
    ] },
    { label: 'App.tsx' },
  ] },
];

export function DataCollections() {
  return (
    <Section label="Data & Collections">
      <SectionHeader eyebrow="23 · DATA & COLLECTIONS" title="Charts you can read, structures you can browse">
        Data marks follow the dataviz procedure — a fixed colorblind-safe categorical order, legends over color-alone, 2px surface gaps, per-mark hover. Collections cover the structural gaps: tabs, accordion, breadcrumb, pagination, kanban, calendar, tree, tags.
      </SectionHeader>

      {/* ── Data visualization ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
        <Panel title="Donut: حصص الطلبات" note="فئوي · ترتيب ثابت آمن لعمى الألوان + مفتاح دائم">
          <DonutChart
            centerLabel="طلب"
            data={[
              { label: 'توصيل', value: 420 },
              { label: 'استلام', value: 260 },
              { label: 'داخل المطعم', value: 180 },
              { label: 'مجدول', value: 90 },
              { label: 'أخرى', value: 50 },
            ]}
          />
        </Panel>

        <Panel title="Gauge · Progress" note="تسلسلي · قيمة واحدة على مقياس ثابت">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Gauge value={72} label="الأداء" />
            <div style={{ display: 'flex', gap: 16 }}>
              <ProgressCircle value={64} size={72} />
              <ProgressCircle value={91} size={72} />
            </div>
          </div>
        </Panel>

        <Panel title="Rating" note="حالة / تقييم · تفاعلي">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <StarRating value={4} />
            <StarRating value={3} readOnly size={18} />
          </div>
        </Panel>

        <Panel title="Heatmap: نشاط 20 أسبوعاً" note="تسلسلي · لون واحد فاتح→غامق حسب المقدار" span={2}>
          <Heatmap weeks={20} seed={7} />
        </Panel>

        <Panel title="Palette: CATEGORICAL" note="مُتحقَّق منه بـ validate_palette.js (light + Night)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CATEGORICAL.map((c, i) => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5 }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: c, flex: 'none' }} />
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-2)' }}>{c}</span>
                <span style={{ color: 'var(--text-3)', marginInlineStart: 'auto' }}>#{i + 1}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── Collections & navigation ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start', marginTop: 20 }}>
        <Panel title="Tabs" note="خط سفلي ينزلق · RTL آمن">
          <Tabs tabs={['نظرة عامة', 'التحليلات', 'الإعدادات']} />
        </Panel>

        <Panel title="Breadcrumb · Pagination" note="سهام تنعكس تلقائياً في RTL">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Breadcrumb items={['الرئيسية', 'المكتبة', 'البيانات']} />
            <Pagination total={12} defaultValue={4} />
          </div>
        </Panel>

        <Panel title="TagInput" note="رقائق قابلة للإزالة + إدخال حر">
          <TagInput defaultTags={['زجاج', 'حركة', 'RTL']} />
        </Panel>

        <Panel title="Accordion" note="مجموعة أحادية الفتح · 0fr→1fr">
          <Accordion items={[
            { title: 'ما هي مدار؟', body: 'مكتبة تصميم ثنائية اللغة متعددة السمات، مبنية على رموز oklch وخمس سمات وثلاثة مستويات زجاجية.' },
            { title: 'كيف تعمل السمات؟', body: 'كل سمة كتلة [data-theme] واحدة في tokens.css؛ المكوّنات لا تكتب ألواناً خام أبداً.' },
            { title: 'ودعم RTL؟', body: 'خصائص منطقية فقط (insetInlineStart)، فتنجو كل التخطيطات في dir=rtl بلا معالجة خاصة.' },
          ]} />
        </Panel>

        <Panel title="Calendar" note="شبكة شهرية · نقاط أحداث · أسماء عربية">
          <CalendarMonth />
        </Panel>

        <Panel title="TreeView" note="صفوف متداخلة قابلة للطي">
          <TreeView nodes={TREE} />
        </Panel>

        <Panel title="Kanban: اسحب البطاقات بين الأعمدة" note="سحب وإفلات HTML أصلي" span={2}>
          <KanbanBoard columns={KANBAN} />
        </Panel>
      </div>
    </Section>
  );
}
