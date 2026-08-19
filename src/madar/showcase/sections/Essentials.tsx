import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import {
  DataTable, Drawer, ToastDemo, FileDropzone, EmptyState, Banner, RangeSlider,
} from '../../components';
import type { Column } from '../../components';

/* A titled panel so each essential surface reads as one library artifact. */
function Panel({ title, note, children }: { title: string; note?: string; children: React.ReactNode; span?: number }) {
  return (
    <SpecRow name={title} specimen={children} fill>{note}</SpecRow>
  );
}

interface Member extends Record<string, string | number> { name: string; role: string; tasks: number; rate: number; }
const COLS: Column<Member>[] = [
  { key: 'name', label: 'الاسم', sortable: true },
  { key: 'role', label: 'الدور', sortable: true },
  { key: 'tasks', label: 'المهام', align: 'end', sortable: true },
  { key: 'rate', label: 'الإنجاز', align: 'end', sortable: true, render: (r) => `${r.rate}%` },
];
const ROWS: Member[] = [
  { name: 'سارة', role: 'تصميم', tasks: 42, rate: 96 },
  { name: 'محمد', role: 'هندسة', tasks: 58, rate: 91 },
  { name: 'ليان', role: 'منتج', tasks: 31, rate: 88 },
  { name: 'عمر', role: 'بيانات', tasks: 47, rate: 93 },
];

export function Essentials() {
  return (
    <Section label="Essentials">
      <SectionHeader eyebrow="26 · ESSENTIALS" title="The structural app surfaces">
        The pieces that make the library production-complete: a sortable, selectable data table; a slide-in drawer; a toast stack; a drag-and-drop dropzone; empty states; status banners; and a dual-handle range. All tokenized, theme-aware, and mirrored under RTL with logical properties only.
      </SectionHeader>

      <SpecList>
        <Panel title="DataTable" note="ترتيب بالنقر على الترويسة · تحديد صفوف · RTL" span={2}>
          <DataTable columns={COLS} rows={ROWS} selectable initialSort="tasks" />
        </Panel>

        <Panel title="Banners" note="أربع نبرات · قابلة للإغلاق">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            <Banner tone="success" title="تم النشر">نُشر الإصدار الجديد للجميع.</Banner>
            <Banner tone="warning">مساحة التخزين شارفت على الامتلاء.</Banner>
            <Banner tone="danger" dismissible={false}>تعذّر الاتصال بالخادم.</Banner>
          </div>
        </Panel>

        <Panel title="Drawer · Toast" note="لوحة منزلقة من الحافة · مكدّس تنبيهات">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Drawer>
              <p style={{ margin: '0 0 12px' }}>لوحة جانبية كاملة تنزلق من الحافة المنطقية، فتنعكس تلقائياً في RTL.</p>
              <RangeSlider prefix="$" defaultLow={20} defaultHigh={80} />
            </Drawer>
            <ToastDemo />
          </div>
        </Panel>

        <Panel title="FileDropzone" note="سحب وإفلات · قائمة ملفات">
          <FileDropzone />
        </Panel>

        <Panel title="RangeSlider" note="مقبضان · مسار ممتلئ · RTL">
          <RangeSlider prefix="$" min={0} max={1000} step={10} defaultLow={200} defaultHigh={720} />
        </Panel>

        <Panel title="EmptyState" note="أيقونة · عنوان · وصف · إجراء" span={2}>
          <div style={{ width: '100%' }}><EmptyState /></div>
        </Panel>
      </SpecList>
    </Section>
  );
}
