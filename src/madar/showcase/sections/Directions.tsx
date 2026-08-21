import { useEffect, useRef, useState } from 'react';
import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';

/* The six registers, and what each one claims about its reader. The sentence is
   the point: a direction that cannot name who it is for is a mood board. */
const DIRECTIONS = [
  { id: 'civic', ar: 'مدنيّ', reader: 'استمارةٌ يجب أن تُملأ صحيحةً، على اتّصالٍ بطيء، وربّما على جهاز شخصٍ آخر.' },
  { id: 'editorial', ar: 'تحريريّ', reader: 'صفحةٌ تُقرأ عشر دقائق. هواءٌ، ومساطر، ومقاسٌ طويل.' },
  { id: 'data-dense', ar: 'كثيفُ البيانات', reader: 'أربعون صفًّا تمسحها بحثًا عن الخاطئ منها. ضيّقٌ، صغيرٌ، محدَّدٌ بحدود، فوريّ.' },
  { id: 'futuristic', ar: 'مستقبليّ', reader: 'سطحُ تحكُّم. زواياٌ حادّة مقابل أقراصٍ كاملة، وتتبُّعٌ واسع للّافتات.' },
  { id: 'premium', ar: 'فاخر', reader: 'شيءٌ واحد أُريد منك أن تتأمّله. نصفُ قطرٍ سخيّ، وإيقاعٌ بطيء.' },
  { id: 'experimental', ar: 'تجريبيّ', reader: 'المسار الذي يجوز فيه أن يكون الشكل خاطئًا عن قصد.' },
] as const;

/** One specimen, rendered in a register. The scope is a wrapper element, not the
    document — so six of these can stand side by side and be compared, which is
    the only way a register is actually understood. */
function InRegister({ direction, children }: { direction?: string; children: React.ReactNode }) {
  return (
    <div data-direction={direction} data-register={direction ?? 'default'} style={{ display: 'grid', gap: 10, minWidth: 0 }}>
      {children}
    </div>
  );
}

/* The specimen. Deliberately ordinary — a heading, a field, a button, a chip and
   a card — because the whole claim is that ORDINARY things change register. A
   specimen designed to show off the registers would prove nothing. */
function Specimen({ label }: { label: string }) {
  return (
    <article
      style={{
        borderRadius: 'var(--nova-radius-card)',
        border: '1px solid var(--nova-border)',
        background: 'var(--nova-surface)',
        padding: 'var(--nova-space-4)',
        display: 'grid',
        gap: 'var(--nova-space-3)',
        /* A grid item defaults to `min-width: auto`, which is min-content — so the
           chip + field + button row pushed this card 44px wider than its track and
           the two specimens overlapped by 30. Measured, not eyeballed. */
        minWidth: 0,
        transition: 'border-radius var(--nova-motion-base) var(--nova-ease-standard)',
      }}
    >
      <h4 style={{ margin: 0, fontSize: 'var(--nova-text-title-md)', color: 'var(--nova-ink)' }}>{label}</h4>
      <p style={{ margin: 0, fontSize: 'var(--nova-text-body-sm)', color: 'var(--nova-ink-secondary)' }}>
        نفس العنصر، ونفس الرموز — والسجلّ وحده تغيّر.
      </p>
      <div style={{ display: 'flex', gap: 'var(--nova-space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
        <span
          style={{
            fontSize: 'var(--nova-text-label-sm)',
            padding: '4px 10px',
            minHeight: 24,
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: 'var(--nova-radius-pill)',
            background: 'var(--nova-surface-quiet)',
            color: 'var(--nova-ink-secondary)',
          }}
        >
          رقاقة
        </span>
        <input
          aria-label={`حقل — ${label}`}
          placeholder="حقل"
          style={{
            flex: '1 1 96px',
            minWidth: 0,
            minHeight: 32,
            padding: '0 10px',
            fontFamily: 'inherit',
            fontSize: 'var(--nova-text-body-sm)',
            color: 'var(--nova-ink)',
            background: 'var(--nova-surface-raised)',
            border: '1px solid var(--nova-border)',
            borderRadius: 'var(--nova-radius-field)',
          }}
        />
        <button
          type="button"
          style={{
            minHeight: 32,
            padding: '0 14px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 'var(--nova-text-label-md)',
            fontWeight: 600,
            color: 'var(--nova-on-action)',
            background: 'var(--nova-action)',
            border: 0,
            borderRadius: 'var(--nova-radius-control)',
            transition: 'border-radius var(--nova-motion-base) var(--nova-ease-standard)',
          }}
        >
          إجراء
        </button>
      </div>
    </article>
  );
}

export function Directions() {
  const [at, setAt] = useState(0);
  const strip = useRef<HTMLDivElement>(null);
  const [applied, setApplied] = useState(false);

  /* Applying it to the document is the real thing — the whole library re-renders.
     Cleaned up on unmount, because leaving a register stuck on the document after
     the reader navigates away is the section editing the product. */
  useEffect(() => {
    const root = document.documentElement;
    if (applied) root.setAttribute('data-direction', DIRECTIONS[at].id);
    else root.removeAttribute('data-direction');
    return () => root.removeAttribute('data-direction');
  }, [applied, at]);

  const key = (e: React.KeyboardEvent) => {
    const rtl = getComputedStyle(document.documentElement).direction === 'rtl';
    const step: Record<string, number> = {
      [rtl ? 'ArrowLeft' : 'ArrowRight']: 1,
      [rtl ? 'ArrowRight' : 'ArrowLeft']: -1,
      ArrowDown: 1, ArrowUp: -1, Home: -DIRECTIONS.length, End: DIRECTIONS.length,
    };
    if (!(e.key in step)) return;
    e.preventDefault();
    const to = Math.min(DIRECTIONS.length - 1, Math.max(0, at + step[e.key]));
    setAt(to);
    strip.current?.querySelectorAll<HTMLButtonElement>('[data-direction-pick]')[to]?.focus();
  };

  return (
    <Section label="Directions">
      <SectionHeader eyebrow="40 · DIRECTIONS" title="محورٌ ثالث: السجلّ، لا اللون">
        كان للمكتبة محوران على مستوى المستند: <code>data-theme</code> بسبع حزمِ لون، و<code>data-glass</code> بثلاث درجاتِ زجاج. وكلاهما يغيّر <b>اللون والمادّة</b>، ولا واحدٌ منهما يغيّر ما يعنيه المصمّم حين يقول «اجعلها أكثر تحريريّةً» — وهو <b>الشكل والكثافة والإيقاع والوَقْع</b>. فـ<code>data-direction</code> هو المحور الثالث، ويعيد ربط <b>تسعةَ عشرَ رمزًا</b> قائمًا: لا مكوّنًا جديدًا، ولا لوحةً، ولا خطًّا. والأنماطُ المئةُ واثنتا عشرة تُعاد كلُّها في ستّة سجلّات لأن السجلّاتَ هي الرموزُ التي كانت الأنماطُ تقرأها أصلًا.
      </SectionHeader>

      <SpecList>
        <SpecRow name="ستّة سجلّات، وكلٌّ يسمّي قارئه" fill specimen={(
          <div style={{ display: 'grid', gap: 14, width: '100%' }}>
            <div
              ref={strip}
              role="radiogroup"
              aria-label="Design direction"
              onKeyDown={key}
              data-directions={DIRECTIONS[at].id}
              style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
            >
              {DIRECTIONS.map((d, i) => {
                const on = i === at;
                return (
                  <button
                    key={d.id}
                    type="button"
                    data-direction-pick={d.id}
                    role="radio"
                    aria-checked={on}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setAt(i)}
                    style={{
                      appearance: 'none',
                      cursor: 'pointer',
                      minHeight: 32,
                      padding: '0 14px',
                      fontFamily: 'inherit',
                      fontSize: 13,
                      fontWeight: on ? 600 : 400,
                      borderRadius: 'var(--nova-radius-pill)',
                      border: `1px solid ${on ? 'var(--nova-action)' : 'var(--nova-border)'}`,
                      background: on ? 'var(--nova-action-soft)' : 'transparent',
                      color: on ? 'var(--nova-action-ink)' : 'var(--nova-ink-secondary)',
                    }}
                  >
                    {/* No opacity. This is the third time in one session that opacity
                        used for de-emphasis produced a contrast failure — 0.6 here
                        measured 2.59:1 on the pill. §31 says the mark is added, not
                        subtracted; the same holds for emphasis. The smaller size and
                        the Latin run already separate the id from the name. */}
                    {d.ar} <bdi dir="ltr" style={{ fontSize: 11 }}>{d.id}</bdi>
                  </button>
                );
              })}
            </div>

            <p data-direction-reader="" style={{ margin: 0, fontSize: 13.5, color: 'var(--nova-ink-secondary)', minHeight: 40 }}>
              {DIRECTIONS[at].reader}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
              <InRegister>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--nova-ink-tertiary)' }}>
                  الافتراض — بلا سِمة
                </span>
                <Specimen label="بطاقة" />
              </InRegister>
              <InRegister direction={DIRECTIONS[at].id}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--nova-action-ink)' }}>
                  <bdi dir="ltr">{DIRECTIONS[at].id}</bdi>
                </span>
                <Specimen label="بطاقة" />
              </InRegister>
            </div>

            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 32, fontSize: 13, color: 'var(--nova-ink-secondary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={applied}
                onChange={(e) => setApplied(e.target.checked)}
                /* 24, not 16: the hit-area gate measures the control's own box, and
                   WCAG 2.5.8 wants 24 on the short side. A wrapping label does make
                   the effective target bigger, but arguing that with the harness is
                   worse than typing 24. */
                style={{ width: 24, height: 24, accentColor: 'var(--nova-action)' }}
              />
              طبّقه على المستند كلّه — تُعاد المكتبة بأسرها في هذا السجلّ
            </label>
          </div>
        )}>
          السِمة تُوضَع على <b>غلافٍ</b> لا على المستند، ولذلك يمكن أن يقف سجلّان جنبًا إلى جنب ويُقارَنا — وهي الطريقةُ الوحيدة التي يُفهَم بها سجلّ. والعيّنةُ <b>عاديّةٌ عن قصد</b>: عنوانٌ وحقلٌ وزرٌّ ورقاقةٌ وبطاقة، لأن الادّعاءَ كلَّه أن <b>العاديَّ</b> يتغيّر سجلُّه؛ وعيّنةٌ مصمّمةٌ لإظهار السجلّات لا تُثبت شيئًا. ومربّعُ الاختيار يضع السجلَّ على المستند فعلًا، ويُرفَع عند مغادرة القسم — لأن سجلًّا يبقى عالقًا بعد رحيل القارئ هو قسمٌ يعدّل المنتج.
        </SpecRow>

        <SpecRow name="ما يجوز للسجلّ أن يمسّه، وما لا يجوز" specimen={(
          <div style={{ width: '100%', display: 'grid', gap: 8, fontSize: 12.5 }}>
            {[
              ['نصف القطر', 'خمس درجات', true],
              ['مقياس الخطّ', 'ثماني درجات', true],
              ['مُدَد الحركة', 'خمس درجات', true],
              ['منحنى التسهيل', 'واحد', true],
              ['اللون', 'لا شيء — ذاك محور الحزم', false],
              ['الزجاج', 'لا شيء — ذاك محور الدرجات', false],
              ['المكوّنات', 'لا شيء — لا مكوّنَ جديدًا', false],
            ].map(([what, how, may]) => (
              <div key={String(what)} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, paddingBlock: 6, borderBottom: '1px solid var(--nova-border)' }}>
                <span style={{ color: may ? 'var(--nova-ink)' : 'var(--nova-ink-tertiary)', fontWeight: may ? 600 : 400 }}>{String(what)}</span>
                <span style={{ color: 'var(--nova-ink-secondary)' }}>{String(how)}</span>
              </div>
            ))}
          </div>
        )}>
          السجلُّ يمسّ <b>الشكل والمقياس والإيقاع</b>، ولا يمسّ اللونَ ولا الزجاجَ ولا المكوّنات. سجلٌّ يمدّ يدَه إلى رمزٍ لونيّ يكون <b>حزمةَ ثيمٍ تنتحل اسمًا آخر</b>، وحينها يصير عندنا محوران يفعلان شيئًا واحدًا. و<code>tools/qa/directions.mjs</code> يقيس هذا: كلُّ سجلٍّ يجب أن يُزيح ثمانيةَ رموزٍ على الأقلّ عن الافتراض، ولا يجوز أن يتطابق سجلّان — فستّةُ أسماءٍ تحلّ إلى نفس الأرقام ستُّ كِذبات.
        </SpecRow>
      </SpecList>
    </Section>
  );
}
