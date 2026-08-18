import { Section, SectionHeader } from '../SectionHeader';
import {
  DotMatrixReadout,
  ElasticSwitch,
  MarqueeFrame,
  PerimeterProgress,
  ReceiptPrinter,
  ShredConfirm,
} from '../../components/consequence';

function Cell({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 22,
        padding: 24, boxShadow: 'var(--shadow-1)', display: 'flex', flexDirection: 'column', gap: 18,
      }}
    >
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{title}</div>
        <p style={{ margin: '6px 0 0', fontSize: 12.5, lineHeight: 1.6, color: 'var(--text-2)' }}>{note}</p>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', minHeight: 150 }}>{children}</div>
    </div>
  );
}

export function Consequence() {
  return (
    <Section label="Consequence">
      <SectionHeader eyebrow="30 · CONSEQUENCE" title="ضوابط تُظهر أثرها بنفسها">
        نتيجة الفعل تخصّ الضابط الذي سبّبه، لا إشعارًا في زاوية أخرى من الشاشة. حذف يُتلف أمامك، تصدير يُخرج الورقة، مفتاح يعطي تحت الإصبع، وحدّ يمتلئ أثناء العمل. المستخدم لا يحتاج أن ينظر بعيدًا ليعرف ما حدث.
      </SectionHeader>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, alignItems: 'start' }}>
        <Cell
          title="Shred Confirm: الحذف الذي تراه"
          note="نافذة التأكيد تسأل «هل أنت متأكد». هذا يُريك الإتلاف ويترك ثانية للتراجع، فالقرار يُتخذ على الأثر لا على الوصف."
        >
          <ShredConfirm />
        </Cell>

        <Cell
          title="Receipt Printer: التصدير يسلّمك الورقة"
          note="«بدأ التنزيل» لا يقول شيئًا. هنا تخرج الورقة من الجهاز، فنتيجة الفعل هي الشيء الذي طلبته."
        >
          <ReceiptPrinter />
        </Cell>

        <Cell
          title="Dot Matrix Readout: قراءة تشغيلية"
          note="حين يقول المؤشر الدوّار أقل مما يجب: مصفوفة تمسح الصفوف، فترى أن النظام حيّ وفي أي مرحلة هو."
        >
          <DotMatrixReadout />
        </Cell>

        <Cell
          title="Elastic Switch: استجابة قبل الحالة"
          note="الإبهام يمطّ المقبض قبل أن تتغيّر الحالة، فيعرف المستخدم أن الضغط سُجّل. المفتاح الذي يقفز فجأة لا يقول ذلك."
        >
          <div style={{ display: 'grid', gap: 16 }}>
            <ElasticSwitch />
            <ElasticSwitch label="النسخ الاحتياطي" defaultOn />
          </div>
        </Cell>

        <Cell
          title="Perimeter Progress: العمل يدور حول زرّه"
          note="شريط تقدّم منفصل يشتّت الانتباه. هنا يمتلئ حدّ الزر نفسه، فالشيء الذي ضغطته هو الذي يخبرك."
        >
          <PerimeterProgress />
        </Cell>

        <Cell
          title="Marquee Frame: التحديد يرسم نفسه"
          note="نقاط الأركان تحطّ أولًا ثم تصل الحواف بينها، فتقرأ المنطقة كأنها التُقطت عمدًا لا كأنها محاطة بخط."
        >
          <MarqueeFrame />
        </Cell>
      </div>
    </Section>
  );
}
