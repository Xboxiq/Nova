import { Section, SectionHeader } from '../SectionHeader';
import { OutageCompare } from '../../components/outage';

function Cell({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
        padding: 24, display: 'flex', flexDirection: 'column', gap: 18,
      }}
    >
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)' }}>{title}</div>
        <p style={{ margin: '6px 0 0', fontSize: 12.5, lineHeight: 1.6, color: 'var(--text-2)' }}>{note}</p>
      </div>
      <div style={{ display: 'grid', placeItems: 'center' }}>{children}</div>
    </div>
  );
}

export function Outage() {
  return (
    <Section label="Outage">
      <SectionHeader eyebrow="34 · OUTAGE" title="التقاطع هو المعلومة">
        انقطعت الكهرباء. والسؤال ليس «متى» — ذاك خطّ زمني بنيناه سلفًا — بل «العيب عندي أم عند الشبكة؟». وهذا جوابٌ لا يوجد في أيٍّ من المسارَين، بل في تقاطعهما. فالرسم يجب أن يُظهر التقاطع، لا أن يترك القارئ يقارن مخطّطَين من ذاكرته.
      </SectionHeader>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20, alignItems: 'start' }}>
        <Cell
          title="Grid fault: انقطع عندك وعند الحيّ"
          note="مسارَان على محور واحد، والرابطة بينهما مرسومة حيث يتقاطعان — والرابطة هي الحكم لا زينةً بجانبه. والحكم مُشتَقّ من التقاطعات لا مكتوبًا يدًا: كل انقطاع عندك له نظير عند الحيّ، فالعيب خارج البيت."
        >
          <OutageCompare />
        </Cell>

        <Cell
          title="Premises fault: انقطع عندك والحيّ يعمل"
          note="انقطاع واحد بلا نظير يقلب الحكم كلّه — وهذا هو سبب رسم التقاطع: الفرق بين «بلّغ الشركة» و«افحص قاطعك» عرضُ ثلاث بكسلات لا يراها من ينظر إلى مسار واحد. والتاريخ محايد اللون، والملوّن هو ما لم ينتهِ بعد."
        >
          <OutageCompare
            yours={[{ from: 19.1, to: 19.7 }, { from: 20.6, to: 21.9 }, { from: 22.9, to: 23.2 }]}
            area={[{ from: 19.05, to: 19.8 }]}
          />
        </Cell>
      </div>
    </Section>
  );
}
