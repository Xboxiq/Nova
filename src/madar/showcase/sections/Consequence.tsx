import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import {
  ElasticSwitch,
  MarqueeFrame,
  PerimeterProgress,
  ReceiptPrinter,
  ShredConfirm,
} from '../../components/consequence';

function Cell({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <SpecRow name={title} specimen={children}>{note}</SpecRow>
  );
}

export function Consequence() {
  return (
    <Section label="Consequence">
      <SectionHeader eyebrow="30 · CONSEQUENCE" title="ضوابط تُظهر أثرها بنفسها">
        نتيجة الفعل تخصّ الضابط الذي سبّبه، لا إشعارًا في زاوية أخرى من الشاشة. حذف يُتلف أمامك، تصدير يُخرج الورقة، مفتاح يعطي تحت الإصبع، وحدّ يمتلئ أثناء العمل. المستخدم لا يحتاج أن ينظر بعيدًا ليعرف ما حدث.
      </SectionHeader>

      <SpecList>
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
      </SpecList>
    </Section>
  );
}
