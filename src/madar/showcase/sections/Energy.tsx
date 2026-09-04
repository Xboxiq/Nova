import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow, SpecStack } from '../SpecRow';
import { MiniBarChart } from '../../components/charts';
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
import { PrepaidRunway } from '../../components/prepaid';

export function Energy() {
  const reading = useLiveReading();

  return (
    <Section label="Energy">
      <SectionHeader eyebrow="32 · ENERGY" title="القراءة والاستهلاك">
        رقمٌ وحده ليس معلومة. «412 ك.و.س» لا يقول شيئًا حتى تعرف أن هذا البيت يستقرّ عادةً بين 260 و380، وأن الكيلوواط التالي يدخل شريحة أغلى. هذه العائلة تعرض القراءة كجهاز يُقرأ، والاستهلاك مقابل معتاده هو لا مقابل صفر.
      </SectionHeader>

      <SpecList>

      <UsageStrip />

      <SpecRow name="Meter Face: العدّاد جهازٌ يُقرأ" specimen={<MeterFace reading={reading} tier={3} />}>
        النافذة غائرة تحت الوجه لا مرسومة عليه، وحافّتها الداخلية هي ما يجعلها نافذة. والأسطوانات تدور حين يتغيّر الرقم — الحركة آلة تعمل لا نصّ يُستبدل، ورقم الكسر على أسطوانة بلون مختلف كما في العدّادات الحقيقية.
      </SpecRow>

      <SpecRow name="Consumption Band: مقابل معتادك أنت" specimen={<ConsumptionBand />}>
        المدى المعتاد مخطّط لأنه بيانات، لا فراغ. وحين تخرج القراءة منه تُضيء حافة البطاقة السفلية بلون الحكم — ولا تُضيء ما دامت داخله، فالتوهّج هنا حالة لا زينة.
      </SpecRow>

      <SpecRow name="Tariff Ladder: أين يبدأ الأغلى" specimen={<TariffLadder />}>
        لكل شريحة لونها الثابت: نفسه في ختم العدّاد، ونفسه هنا، ونفسه في أي موضع تُسمّى فيه شريحة. يتعلّمه القارئ مرّة فيقرأ به بلا مفتاح في كل بطاقة.
      </SpecRow>

      <SpecRow
        name="Monthly vs Target: الخطّ المرجعي"
        specimen={(
          <div style={{ width: '100%', maxWidth: 340 }}>
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
        )}
      >
        سقف الميزانية مرسوم على مقياس الأعمدة نفسه لا مكتوبًا تحتها، ومتقطّعًا لأنه خطّ إنشاء لا بيانات. والأشهر التي بلغته هي وحدها التي تحمل لون الحكم — الباقي هادئ.
      </SpecRow>

      <SpecRow
        name="Allocation: المقيس والمتوقَّع والمتبقّي"
        specimen={(
          <SpecStack
            items={[
              { label: 'ضمن المخصّص', node: <AllocationBar /> },
              { label: 'متجاوز', node: <AllocationBar budget={450} projected={78} /> },
            ]}
          />
        )}
      >
        المستهلك مصمت لأنه مقيس، والمتوقّع مخطّط بلونه نفسه لأنه لم يُقَس بعد، والمتبقّي مخطّط بالمحايد. والحالتان مكدّستان: العمق من ثلاثة انحدارات — أخفض وأصغر وأخفت — لا من ظلّ (§20). افردهما فتقفان جنبًا إلى جنب.
      </SpecRow>

      <SpecRow
        name="Bill: المستند الذي يستلمه العميل"
        specimen={(
          <SpecStack
            items={[
              { label: 'مستحقّة', node: <BillDocument /> },
              { label: 'مسدَّدة', node: <BillDocument paid previous={75835.6} current={76130.4} cycle="1 يونيو – 30 يونيو" /> },
            ]}
          />
        )}
      >
        الفاتورة مستند: ورقة لها حافة، وورقة تحتها تحمل السُمك بزاوية موضوعة لا محسوبة. والتخريم عند المَفصِل لأنه يقول «هذا الجزء ينفصل» — فلا يظهر في فاتورة مسدَّدة، إذ لا شيء فيها ينفصل.
      </SpecRow>

      <SpecRow name="Load Comb: المقدار المعدود يُرسم معدودًا" specimen={<LoadComb />}>
        عمودٌ بطول ١٩٠ بكسل يقول «أكثر من ذاك». تسع عشرة شرطة كلٌّ منها عشرة كيلوواط تقول «مئة وتسعون» ويمكن عدّها. والشرطة الأخيرة قصيرة حين لا تكتمل وحدتها، فالكسر جزء من القراءة لا تقريبٌ يخفيه الرسم.
      </SpecRow>

      <SpecRow name="Prepaid Runway: الرصيد وقتًا، إلى يوم الشحن" specimen={<PrepaidRunway />}>
        «يكفي ٤٫٣ أيام» جوابٌ بمتوسّط، والأيام ليست سواء: العطلة في البيت تشرب مرّةً ونصفًا. فالمحور هنا كيلوواط، وكل يومٍ خانةٌ بعرض ما يُستهلك فيه عادةً، والرصيد طولٌ مصمتٌ ينتهي على يومٍ مسمّى في وقتٍ من نهاره. ويومُ الشحن علامةٌ على المحور نفسه هو الحُكم: إن انتهى الرصيد قبلها بقيت بينهما فجوةٌ مخطَّطةٌ بلون الخطر طولُها هو النقص بالضبط، وأضاءت حافّة البطاقة. حرّك العلامة يومًا إلى الخلف وتُغلَق الفجوة ويُطفأ الضوء — الحُكم تقاطعٌ لا رقم.
      </SpecRow>
      </SpecList>
    </Section>
  );
}
