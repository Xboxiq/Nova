import { useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import { BlobStat, ComplianceScreen, CurveCard, DocFolder, GlassRecipe, ReviewTrack, VITALS, VitalsScreen } from '../../components/glasswork';
import { MeshSurface } from '../../components/mesh';

export function Glasswork() {
  return (
    <Section label="Glasswork">
      <SectionHeader eyebrow="38 · GLASSWORK" title="وصفةٌ مكتوبة على اللوح، فصارت رموزًا لا أرقامًا">
        في هذه الدفعة شريحةٌ ليست تصميمًا بل <b>وصفة</b>: ضبابُ خلفية ٢٠، وحدٌّ أبيض بشفافية ٣٥٪، وظلٌّ ناعم إزاحته ٨ وضبابه ٣٠ بشفافية ١٢٪، وإضاءةٌ علوية بسمك ١، وظلٌّ داخليّ ٠/١/٨ بشفافية ٢٠٪، وتعبئةٌ شفافة ٢٥٪. ومن سُلِّم الأرقام <b>سمّاها</b> ولم يكتبها (§٢٧) — لأن تطبيقَين مختلفَين في الدفعة، تطبيقُ امتثالٍ قانونيّ على حقلٍ زُمُرّديّ وتطبيقُ ترطيبٍ على حقلٍ مائيّ، هما <b>نفس الزجاجة</b> على أرضيتَين، ولو كُتبت الأرقام في كل موضعٍ لتباعدا في أسبوع.
      </SectionHeader>

      <SpecList>
        <SpecRow name="pane(): الوصفة الست، خمس رموز ودالّة" specimen={<GlassRecipe />}>
          الشريحة نفسها مرسومةً <b>من الرموز التي توثّقها</b> — إن تغيّر رمزٌ تغيّرت معه، وذاك وحده ما يجعل العيّنة تستحقّ البقاء. ولمَ لم تُستعمل <code>glass()</code> الموجودة؟ لأنها شيءٌ آخر: رقاقةٌ تطفو على الشبكة المصوّرة بضبابِ ١٤ وحدٍّ ٢٤٪، مضبوطةٌ لأرضيةٍ داكنة. وهذه وصفةُ المرجع نفسها بضبابِ ٢٠ وحدٍّ ٣٥٪، وعليها أن تبقى مقروءةً على أرضيةٍ فاتحة. زجاجتان ووظيفتان، والاثنتان مسمّاتان — لا دالّةٌ واحدة بعلمٍ لا يُقرأ. ومقبض <code>lift</code> الوحيد لأن ظلَّين ناعمَين متراكبَين يُقرآن دخانًا لا عمقًا.
        </SpecRow>

        <SpecRow name="DocFolder: العدد مُشتَقّ، والصحيفة تُنتقى" bare specimen={<DocFolder />}>
          مِروحةٌ من ثلاث صحائف وراء مجلّد زجاجيّ، وكلُّ صحيفةٍ زرٌّ حقيقيّ: انتقِها تتقدّم، والسطر الأسفل يتبعها. و«١٢ Doc» ليست رقمًا مُمرَّرًا — هي مجموع صفحات الصحائف، و«٤» طولُ قائمة الوجوه. مجلَّدٌ يمكن أن يُخبَر بمجموعٍ لا يحمله <b>سيُخبَر به</b>. والحقل صيغةُ شبكةٍ جديدة تلتفّ في الاتجاه المعاكس لِـ<code>run</code>: الفاتح عند الرأس والمشبَع عند الأرض، لأن الزجاج يطفو في النصف الأعلى ولا يُقرأ زجاجًا إلا على أرضيةٍ باهتة تحته.
        </SpecRow>

        <SpecRow name="ReviewTrack: النقط نصفٌ لم يحدث بعد" specimen={(
          <MeshSurface variant="sage" radius="var(--r-panel)" style={{ padding: 26, width: '100%', maxWidth: 380 }}>
            <div style={{ borderRadius: 'var(--r-block)', padding: 16, background: 'var(--pane-fill)', border: '1px solid var(--pane-stroke)', backdropFilter: 'blur(var(--pane-blur))' }}>
              <ReviewTrack stages={['Intake', 'Legal Review', 'Internal Board', 'Signed']} at={1} />
            </div>
          </MeshSurface>
        )}>
          يرسم المرجع هذا الخطّ نصفًا مصمتًا ونصفًا منقّطًا، والمثلّث حيث يلتقيان. وهذا هو <b>نفس</b> التمييز الذي تقيمه §١٥-ب للتهشير: المصمت ما حدث، والمنقّط ما عُدّ ولم يتحقّق، والعلامة هي الحدّ بينهما. فلا النصف المنقّط زينةٌ ولا موضعُ المثلّث أسلوب — هو <code>المرحلة ÷ (المراحل − ١)</code> ولا شيء غيره.
        </SpecRow>

        <SpecRow name="ComplianceScreen: العين مفتاح، والترويسة تتبعه" bare specimen={<ComplianceScreen />}>
          أربعة سطورٍ على الحقل الزمرّديّ، ولكلٍّ منها <b>مفتاحُ عين</b>: اقلِبه فيتغيّر عدّاد «مقروء» في الترويسة. ترويسةٌ تطبع رقمًا ثابتًا ليست قراءةً بل تعليقٌ مكتوب. والسطر المنتقى وحده يفتح مسارَ مراجعته، وموضعُ مرحلته يأتي من اسم المرحلة لا من رقمٍ ثانٍ يمكن أن يخالفه. والبريد بين <code>bdi</code> لأنه قراءةٌ لاتينية داخل نصٍّ عربيّ.
        </SpecRow>

        <SpecRow name="CurveCard: المنحنى قراءة، وخطّ النقط متوسّطها" specimen={(
          <MeshSurface variant="aqua" radius="var(--r-panel)" style={{ padding: 26, width: '100%', display: 'grid', placeItems: 'center' }}>
            <CurveCard />
          </MeshSurface>
        )}>
          سبع قراءاتٍ للأسبوع، والمنحنى مُشتقٌّ منها بمنعطفاتٍ مقيَّدة على منتصف المسافة الرأسية — قيدٌ يمنع المنحنى أن يعلو فوق أعلى قراءة، إذ منحنًى يقوس فوق أكبر نقطةٍ يرسم رقمًا لم يقِسه أحد. وخطّ النقط <b>متوسّط الأسبوع</b>: خطٌّ مرجعيّ عند رقمٍ لم يُقَس هو ديكور. وأقراص الأيام مجموعةُ اختيار بتنقُّلٍ سهميّ يتبع اتجاه الكتابة، والسهم «إلى الأمام» في العربية هو الأيسر.
        </SpecRow>

        <SpecRow name="BlobStat: ثلاثة أقراص، والاختيار يقود الرسم" bare specimen={<BlobRow />}>
          هذه أقراصُ اختيارٍ لا بطاقات. في المرجع ثلاثةٌ منها في صفٍّ تحت رسمٍ واحد، والشيء الوحيد الذي يمكن أن يعنيه ذلك الترتيب هو أن <b>الرسم يُظهر ما تنتقيه</b>. وسهمُ الفرق مُشتقّ من القراءة السابقة: الشرطة المسطّحة تعني «لا تغيّر»، وهي حالةٌ لا رمزٌ يُزيَّن به. وهذا الصفّ نفسه يعمل: العَرض لا يضع ضابطًا ميتًا على الصفحة، وذاك ثمنُ ما قاله المالك بعد الدفعة الماضية.
        </SpecRow>

        <SpecRow name="VitalsScreen: الشاشة كاملةً" bare specimen={<VitalsScreen />}>
          الشاشة تجمع الثلاثة: انتقِ مقياسًا فيتبدّل المنحنى وخطّ المتوسط وسبعُ القراءات معه، وانتقِ يومًا فتتبعه الأقراص الثلاثة كلّها — لأن اليوم واحدٌ للشاشة لا لكل بطاقة. وزرّ «+» يسجّل قراءةً للمقياس المنتقى ويقولها في منطقةٍ حيّة. وهذا هو الفرق الذي طلبه المالك بعد الدفعة السابقة: هذه ليست صورةً بل شيءٌ يُستعمل.
        </SpecRow>
      </SpecList>
    </Section>
  );
}

/* The row is stateful because the alternative is a dead control on the page, and
   a dead control is the exact defect the owner caught in the last batch. Eight
   lines, and the specimen demonstrates the component's real contract. */
function BlobRow() {
  const [at, setAt] = useState(0);
  return (
    <MeshSurface variant="aqua" radius="var(--r-panel)" style={{ padding: 26, width: '100%', display: 'grid', gap: 12 }}>
      <div role="radiogroup" aria-label="Metric" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {VITALS.map((v, i) => (
          <BlobStat key={v.key} vital={v} day={3} on={i === at} tabIndex={i === at ? 0 : -1} onPick={() => setAt(i)} />
        ))}
      </div>
      <p data-blob-says="" aria-live="polite" style={{ margin: 0, fontSize: 12, color: 'rgba(15,42,30,0.62)' }}>
        <bdi dir="ltr">{VITALS[at].label} — {VITALS[at].week[3]} {VITALS[at].unit}</bdi>
      </p>
    </MeshSurface>
  );
}
