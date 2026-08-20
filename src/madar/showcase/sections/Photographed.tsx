import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import { LoanScreen, LoanWidget, MonthGrid, PaidSplit, ScoreBands, ScoreScreen, StatWidget } from '../../components/credit';
import { MeshSurface, Smear } from '../../components/mesh';

export function Photographed() {
  return (
    <Section label="Photographed">
      <SectionHeader eyebrow="36 · PHOTOGRAPHED" title="سطحٌ يُقرأ فيلمًا، لا رسمًا متجهًا">
        حكم المالك أن تدخل هذه المراجع المكتبة <b>كما هي</b> — نفس الألوان والزوايا والتدرّجات والظلال، بلا تضحية بشيء. فأُسقطت القاعدتان ٠٧ و٠٩، وعُدّلت §١ و§٣، وصار للمكتبة سياسةُ عمقٍ ثانية إلى جانب الأولى لا بدلًا منها. وما يجعل هذا نظامًا لا مزاجًا أربعة: الشبكة <b>خمس بِرَك</b> لا محطّتين فتلتفّ الصبغة ولا تبهت، وحَبٌّ واحد فوق كل شيء، وضوءٌ واحد من فوق يعطي الشفة والتوهّج، ولون تمييزٍ <b>محجوز لما قِيس</b> وحده.
      </SectionHeader>

      <SpecList>
        <SpecRow name="MeshSurface: خمس بِرَك تلتفّ" bare specimen={(
          <div style={{ display: 'grid', gap: 14, width: '100%' }}>
            {(['run', 'green', 'peach', 'light', 'plate', 'olive'] as const).map((v) => (
              <MeshSurface key={v} variant={v} radius="var(--r-panel)" style={{ height: 62, display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: 13 }}>
                {v}
              </MeshSurface>
            ))}
          </div>
        )}>
          تدرّجٌ بمحطّتين يبهت؛ وخمس بِرَك شعاعية فوق منحدرٍ خطّي واحد تجعل الصبغة <b>تلتفّ</b> — أخضر فزيتوني فرمليّ فمشمشيّ فورديّ. وذاك الالتفاف هو القراءة كلّها، ولذلك يأخذ المكوّن <b>اسم صيغة</b> لا لونين: من يُمرّر لونين يحصل على بهوتٍ لا على نظام. والحَبّ طبقةٌ واحدة تخصّ السطح لا كل ابنٍ فيه، وهو السبب الوحيد في أن العائلة تُقرأ فيلمًا لا رسمًا.
        </SpecRow>

        <SpecRow name="LoanWidget: المقياس مُشتَقّ لا مُمرَّر" bare specimen={(
          <div style={{ position: 'relative', padding: 30, borderRadius: 'var(--r-panel)', overflow: 'hidden' }}>
            <Smear tone="figure" />
            <div style={{ position: 'relative', display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
              <LoanWidget tone="green" meter="dots" paid={12340} termMonths={36} paidMonths={23} size={316} />
              <LoanWidget tone="peach" meter="bars" paid={56000} termMonths={48} paidMonths={30} size={316} />
            </div>
          </div>
        )}>
          نفس البطاقة بصيغتَي مقياس: نقاطٌ <b>تَعُدّ</b> الأقساط، وشُرَطٌ <b>تقيس</b> نفس المدى. والمُضاء منها مُشتَقٌّ من الأشهر المدفوعة على المدّة — لا يُمرَّر طولًا، لأن مكوّنًا يمكن أن يُخبَر بطولٍ خاطئ سيُخبَر به. والخلفية بديلٌ معلَن عن تصوير التعريض الطويل في المرجع: كتلة مموّهة وخطوط سحب — الدور نفسه، حقلٌ خارج التركيز يقف عليه جسمٌ حادّ.
        </SpecRow>

        <SpecRow name="StatWidget: أبيضٌ وزجاج، والتحذير حالة" bare specimen={(
          <div style={{ position: 'relative', padding: 30, borderRadius: 'var(--r-panel)', overflow: 'hidden' }}>
            <Smear tone="sky" />
            <div style={{ position: 'relative', display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
              <StatWidget tone="white" title="Payments on Time" value={24} unit={{ of: 38 }} icon="calendar" size={316} />
              <StatWidget tone="glass" title="Credit Utilization" value={23} unit="pct" icon="card" size={316} />
            </div>
          </div>
        )}>
          بطاقةٌ مصمتة وبطاقةٌ زجاجية على الحقل نفسه، والفرق بينهما ليس زينةً: الزجاج يأخذ لونه من تحته فيقول «هذا يطفو»، والمصمت يقول «هذا هو السطح». ومصفوفة النقاط <b>تَعُدّ</b> القراءة فعلًا (§١٥-أ)، والمثلّث الكهرماني حالةٌ تستدعي النظر لا وسمًا يُزيَّن به.
        </SpecRow>

        <SpecRow name="PaidSplit: المدفوع مقابل الباقي، والفاصل قراءة" bare specimen={(
          <MeshSurface variant="run" radius="var(--r-panel)" style={{ padding: 26, width: '100%' }}>
            <PaidSplit paid={12340} total={15000} />
          </MeshSurface>
        )}>
          شريحتان وفاصلٌ بينهما، والاقتران هو المعلومة: المدفوع في مواجهة الباقي. والشريحة المدفوعة وحدها تحمل التمييز — حدٌّ ليمونيّ وتوهّجٌ داخليّ وهالة — لأن لون التمييز في هذه العائلة <b>محجوز لما قِيس</b>. والفاصل نفسه يتدرّج: ليمونيٌّ عند الطرف الذي دُفع، باهتٌ عند الذي لم يُدفع.
        </SpecRow>

        <SpecRow name="MonthGrid: السنة حالاتٌ لا شريط" bare specimen={(
          <MeshSurface variant="run" radius="var(--r-panel)" style={{ padding: 26, width: '100%' }}>
            <MonthGrid />
          </MeshSurface>
        )}>
          هذا ليس <code>DayStrip</code> بأسماء أخرى — فُحِص أوّلًا. ذاك أربعٌ وعشرون خانة على محور زمن، وهذا تقويمُ <b>حالات</b>: مدفوع، مُخفَق، ولم يحِنّ بعد. والمدفوع يحمل العلامة الليمونية بتوهّجها، والمُخفَق حدًّا بلا تعبئة، وما لم يحِنّ يُخفي علامته أصلًا لأنه ليس قياسًا (§١٥-ب).
        </SpecRow>

        <SpecRow name="ScoreBands: القراءة على ثلاثة مدَيات" bare specimen={(
          <div style={{ width: '100%', padding: 26, borderRadius: 'var(--r-panel)', background: 'var(--surface)' }}>
            <ScoreBands score={730} />
          </div>
        )}>
          §١٤ بالمراجع مرسومةً نطاقات: ثلاثة مدَيات مسمّاة، والقراءة تقف على مكانها منها. والمؤشّر — مثلّثٌ على شعرة — <b>موضعه مُشتَقّ</b> من الرقم، فلا يمكن أن يقف في مكانٍ يخالف الرقم المكتوب بجانبه. جرّب أي درجة: النطاق والموضع داخله يتبعانها.
        </SpecRow>

        <SpecRow name="LoanScreen: الشاشة كاملةً، والتبويب شفةٌ لا خطّ" bare specimen={<LoanScreen />}>
          الصور الأربع في المرجع لهذه الشاشة الواحدة، مصوَّرةً بزوايا. والتبويب النشط <b>شفةٌ مرفوعة</b> على الصحيفة تحته لا خطًّا أسفله — ولذلك يُقرأ الاثنان جسمًا واحدًا. والصحيفة زجاجٌ بحدٍّ علويّ مضاء، والشريط الأسفل زرٌّ مصمتٌ للفعل الأوّل وزجاجيٌّ للثاني. والتبويبات تعمل: اضغطها.
        </SpecRow>

        <SpecRow name="ScoreScreen: التوأم الفاتح" bare specimen={<ScoreScreen />}>
          نفس الشبكة مسحوبةً إلى الأبيض تقريبًا، فلا تظهر الصبغة إلا في الأركان — وهذا يثبت أن العائلة نظامٌ لا لونٌ واحد. والحَبّ هنا <code>multiply</code> بشدّةٍ أقلّ لأن الأرضية فاتحة، والرسم يضع الجهتين الأخريين خلف المختارة بحبرٍ أقلّ: نفس المحور، حِبرٌ أخفت.
        </SpecRow>
      </SpecList>
    </Section>
  );
}
