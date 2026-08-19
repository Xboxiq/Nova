import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import { OutageCompare } from '../../components/outage';

export function Outage() {
  return (
    <Section label="Outage">
      <SectionHeader eyebrow="34 · OUTAGE" title="التقاطع هو المعلومة">
        انقطعت الكهرباء. والسؤال ليس «متى» — ذاك خطّ زمني بنيناه سلفًا — بل «العيب عندي أم عند الشبكة؟». وهذا جوابٌ لا يوجد في أيٍّ من المسارَين، بل في تقاطعهما. فالرسم يجب أن يُظهر التقاطع، لا أن يترك القارئ يقارن مخطّطَين من ذاكرته.
      </SectionHeader>

      <SpecList>

      <SpecRow name="Grid fault: انقطع عندك وعند الحيّ" specimen={<OutageCompare />}>
        مسارَان على محور واحد، والرابطة بينهما مرسومة حيث يتقاطعان — والرابطة هي الحكم لا زينةً بجانبه. والحكم مُشتَقّ من التقاطعات لا مكتوبًا يدًا: كل انقطاع عندك له نظير عند الحيّ، فالعيب خارج البيت.
      </SpecRow>

      <SpecRow
        name="Premises fault: انقطع عندك والحيّ يعمل"
        specimen={(
          <OutageCompare
            yours={[{ from: 19.1, to: 19.7 }, { from: 20.6, to: 21.9 }, { from: 22.9, to: 23.2 }]}
            area={[{ from: 19.05, to: 19.8 }]}
          />
        )}
      >
        انقطاع واحد بلا نظير يقلب الحكم كلّه — وهذا هو سبب رسم التقاطع: الفرق بين «بلّغ الشركة» و«افحص قاطعك» عرضُ ثلاث بكسلات لا يراها من ينظر إلى مسار واحد. والتاريخ محايد اللون، والملوّن هو ما لم ينتهِ بعد.
      </SpecRow>
      </SpecList>
    </Section>
  );
}
