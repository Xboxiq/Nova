import { Section, SectionHeader } from '../SectionHeader';
import {
  ConsumptionBand,
  MeterFace,
  TariffLadder,
  UsageStrip,
  useLiveReading,
} from '../../components/energy';

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
      <div style={{ display: 'grid', placeItems: 'center' }}>{children}</div>
    </div>
  );
}

export function Energy() {
  const reading = useLiveReading();

  return (
    <Section label="Energy">
      <SectionHeader eyebrow="32 · ENERGY" title="القراءة والاستهلاك">
        رقمٌ وحده ليس معلومة. «412 ك.و.س» لا يقول شيئًا حتى تعرف أن هذا البيت يستقرّ عادةً بين 260 و380، وأن الكيلوواط التالي يدخل شريحة أغلى. هذه العائلة تعرض القراءة كجهاز يُقرأ، والاستهلاك مقابل معتاده هو لا مقابل صفر.
      </SectionHeader>

      <div style={{ display: 'grid', gap: 20 }}>
        <UsageStrip />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
          <Cell
            title="Meter Face — العدّاد جهازٌ يُقرأ"
            note="النافذة غائرة تحت الوجه لا مرسومة عليه، وحافّتها الداخلية هي ما يجعلها نافذة. والأسطوانات تدور حين يتغيّر الرقم — الحركة آلة تعمل لا نصّ يُستبدل، ورقم الكسر على أسطوانة بلون مختلف كما في العدّادات الحقيقية."
          >
            <MeterFace reading={reading} tier={3} />
          </Cell>

          <Cell
            title="Consumption Band — مقابل معتادك أنت"
            note="المدى المعتاد مخطّط لأنه بيانات، لا فراغ. وحين تخرج القراءة منه تُضيء حافة البطاقة السفلية بلون الحكم — ولا تُضيء ما دامت داخله، فالتوهّج هنا حالة لا زينة."
          >
            <ConsumptionBand />
          </Cell>

          <Cell
            title="Tariff Ladder — أين يبدأ الأغلى"
            note="لكل شريحة لونها الثابت: نفسه في ختم العدّاد، ونفسه هنا، ونفسه في أي موضع تُسمّى فيه شريحة. يتعلّمه القارئ مرّة فيقرأ به بلا مفتاح في كل بطاقة."
          >
            <TariffLadder />
          </Cell>
        </div>
      </div>
    </Section>
  );
}
