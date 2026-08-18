import { Section, SectionHeader } from '../SectionHeader';
import {
  AllocationBar,
  BillDocument,
  ConsumptionBand,
  LoadComb,
  MeterFace,
  TariffLadder,
  UsageStrip,
  useLiveReading,
} from '../../components/energy';
import { MiniBarChart } from '../../components/charts';

function Cell({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6,
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
            title="Meter Face: العدّاد جهازٌ يُقرأ"
            note="النافذة غائرة تحت الوجه لا مرسومة عليه، وحافّتها الداخلية هي ما يجعلها نافذة. والأسطوانات تدور حين يتغيّر الرقم — الحركة آلة تعمل لا نصّ يُستبدل، ورقم الكسر على أسطوانة بلون مختلف كما في العدّادات الحقيقية."
          >
            <MeterFace reading={reading} tier={3} />
          </Cell>

          <Cell
            title="Consumption Band: مقابل معتادك أنت"
            note="المدى المعتاد مخطّط لأنه بيانات، لا فراغ. وحين تخرج القراءة منه تُضيء حافة البطاقة السفلية بلون الحكم — ولا تُضيء ما دامت داخله، فالتوهّج هنا حالة لا زينة."
          >
            <ConsumptionBand />
          </Cell>

          <Cell
            title="Tariff Ladder: أين يبدأ الأغلى"
            note="لكل شريحة لونها الثابت: نفسه في ختم العدّاد، ونفسه هنا، ونفسه في أي موضع تُسمّى فيه شريحة. يتعلّمه القارئ مرّة فيقرأ به بلا مفتاح في كل بطاقة."
          >
            <TariffLadder />
          </Cell>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20, alignItems: 'start' }}>
          <Cell
            title="Monthly vs Target: الخطّ المرجعي"
            note="سقف الميزانية مرسوم على مقياس الأعمدة نفسه لا مكتوبًا تحتها، ومتقطّعًا لأنه خطّ إنشاء لا بيانات. والأشهر التي بلغته هي وحدها التي تحمل لون الحكم — الباقي هادئ."
          >
            <div style={{ width: '100%', maxWidth: 360 }}>
              <MiniBarChart
                height={120}
                target={{ value: 400, label: '400 ك.و.س', tone: 'var(--danger)' }}
                data={[
                  { label: 'يناير', value: 318 },
                  { label: 'فبراير', value: 296 },
                  { label: 'مارس', value: 344 },
                  { label: 'أبريل', value: 402 },
                  { label: 'مايو', value: 468 },
                  { label: 'يونيو', value: 412 },
                ]}
              />
            </div>
          </Cell>

          <Cell
            title="Allocation: المقيس والمتوقَّع والمتبقّي"
            note="المستهلك مصمت لأنه مقيس، والمتوقّع مخطّط بلونه نفسه لأنه لم يُقَس بعد، والمتبقّي مخطّط بالمحايد. والحالتان معروضتان معًا لأن السلوك عند التجاوز هو ما يُختبر: الشريط يمتدّ ويظهر خطّ المخصّص، ولا يُعاد قياسه لإخفاء التجاوز."
          >
            <div style={{ display: 'grid', gap: 22, width: '100%' }}>
              <AllocationBar />
              <AllocationBar budget={450} projected={78} />
            </div>
          </Cell>

          <Cell
            title="Bill: المستند الذي يستلمه العميل"
            note="الفاتورة مستند: ورقة لها حافة، وورقة تحتها تحمل السُمك بزاوية موضوعة لا محسوبة. والتخريم عند المَفصِل لأنه يقول «هذا الجزء ينفصل» — فلا يظهر في فاتورة مسدَّدة، إذ لا شيء فيها ينفصل. والحالتان معروضتان لأن الفرق بينهما بنيةٌ لا لون."
          >
            <div style={{ display: 'grid', gap: 26, width: '100%', placeItems: 'center' }}>
              <BillDocument />
              <BillDocument paid previous={75835.6} current={76130.4} cycle="1 يونيو – 30 يونيو" />
            </div>
          </Cell>

          <Cell
            title="Load Comb: المقدار المعدود يُرسم معدودًا"
            note="عمودٌ بطول ١٩٠ بكسل يقول «أكثر من ذاك». تسع عشرة شرطة كلٌّ منها عشرة كيلوواط تقول «مئة وتسعون» ويمكن عدّها. والشرطة الأخيرة قصيرة حين لا تكتمل وحدتها، فالكسر جزء من القراءة لا تقريبٌ يخفيه الرسم."
          >
            <LoadComb />
          </Cell>
        </div>
      </div>
    </Section>
  );
}
