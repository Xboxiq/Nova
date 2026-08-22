import { useEffect, useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import { Matrix, type Pack, type Register } from '../../components/matrix';

export function MatrixSection() {
  const [applied, setApplied] = useState<{ pack: Pack; register: Register } | null>(null);

  /* Applying is opt-in and reverted on unmount. A section that leaves the document
     wearing a pack the reader did not choose is a section editing the product —
     the same rule the Directions section holds itself to. */
  useEffect(() => {
    if (!applied) return;
    const root = document.documentElement;
    const prevTheme = root.dataset.theme;
    root.dataset.theme = applied.pack;
    if (applied.register) root.setAttribute('data-direction', applied.register);
    else root.removeAttribute('data-direction');
    return () => {
      if (prevTheme) root.dataset.theme = prevTheme; else delete root.dataset.theme;
      root.removeAttribute('data-direction');
    };
  }, [applied]);

  return (
    <Section label="Matrix">
      <SectionHeader eyebrow="41 · MATRIX" title="ورقةُ تلامسٍ تُراجع نفسها">
        أربعون قسمًا تعرض <b>الأجزاء</b>، ولم يكن شيءٌ يعرض <b>النظام</b>. وبعد أن نزل <code>data-direction</code> صار للمستند ثلاثةُ محاور — سبعُ حزمِ لون، وستّةُ سجلّاتِ شكل، وثلاثُ درجاتِ زجاج — أي <b>مئةٌ وستٌّ وعشرون</b> هيئةً لكل مكوّن، ولا طريقةَ للنظر إليها. وكلُّ نظامِ تصميمٍ في الدنيا فيه هذه الثغرة، وكلُّها تسدّها بالطريقة نفسها: صفحةُ «أسس» تسرد الرموز. وسَردُ الرموز ليس النظام، بل <b>الأبجدية</b>. والناقصُ ورقةُ تلامس: الجداءُ الضربيّ كلُّه في شاشةٍ واحدة، كلُّ خليّةٍ فيها <b>رسمٌ حقيقيّ</b> لا عيّنةَ لون. ثم يصير ممكنًا شيءٌ واحد هو سببُ بناء هذا كلّه: <b>كلُّ خليّةٍ تقيس نفسها وتقول</b>.
      </SectionHeader>

      <SpecList>
        <SpecRow name="تسعٌ وأربعون خليّةً حيّة، وكلٌّ تحكم على نفسها" fill specimen={
          <Matrix onApply={(pack, register) => setApplied({ pack, register })} />
        }>
          كلُّ خليّةٍ تقرأ <b>حبرَها على أرضيتها المرسومة</b> بعدستَين: WCAG لأنه المعيار الذي يُحاكَم إليه المنتج، وAPCA لأن WCAG لا يعرف <b>القطبيّة</b> وأربعٌ من هذه الحزم داكنة. والخليّةُ تطلي أرضيّةَ حزمتها بنفسها — خليّةٌ ترث أرضيّةَ الصفحة تكون تقيس الخلفيّةَ الخطأ، وهو عطبُ <code>SplitDonut</code> نفسه بمحورٍ أوسع. والعدّادُ أعلاه <b>يُقرأ من الخلايا المرسومة</b> لا يُحسَب ثانيًا، فلا يمكن للملخّص أن يخالف ما يلخّصه. والشبكةُ <b>مربّعة</b> عن قصد: العينُ تجد <b>عمودًا</b> يخفق و<b>صفًّا</b> يخفق، والعطبُ في محورٍ يبدو غيرَ العطب في خليّة — وتلك هي القيمةُ التشخيصية كلُّها، وشبكةٌ مشرَّشة تُفقدها.
        </SpecRow>

        <SpecRow name="ولماذا هذا برهانٌ لا معرض" specimen={
          <div style={{ width: '100%', display: 'grid', gap: 10, fontSize: 12.5, color: 'var(--nova-ink-secondary)' }}>
            {[
              ['المعرض', 'يُظهر ما بُني', 'يُصدَّق'],
              ['البرهان', 'يُظهر ما يُخفِق', 'يُفحَص'],
              ['ورقةُ الرموز', 'أبجديّة', 'تُقرأ'],
              ['ورقةُ التلامس', 'النظام', 'يُمسَح بالعين'],
            ].map(([a, b, c]) => (
              <div key={a} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 0.8fr', gap: 10, paddingBlock: 7, borderBottom: '1px solid var(--nova-border)' }}>
                <b style={{ color: 'var(--nova-ink)' }}>{a}</b>
                <span>{b}</span>
                <span style={{ color: 'var(--nova-ink-tertiary)' }}>{c}</span>
              </div>
            ))}
          </div>
        }>
          مقياسٌ في <code>tools/qa/</code> يجد العطبَ حين يُدار. وورقةُ التلامس تجده حين <b>يُنظَر إليها</b>، وهذا فرقٌ في الطبيعة لا في الدرجة: المقياسُ يعرف ما أَمرتَه أن يفحصه، والعينُ على تسعٍ وأربعين خليّةً مرتّبةً ترى ما لم يأمر به أحد. وكلاهما لازم — ولذلك يبقى <code>madar-qa</code> بوّابةً، وتبقى هذه الورقةُ عدسةً.
        </SpecRow>
      </SpecList>
    </Section>
  );
}
