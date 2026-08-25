import { useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import { AnimatedDrawer } from '@/components/ui/animated-drawer';
import EnterpriseAIPipeline from '@/components/ui/ai-agent-pipeline';
import SendMessageButton from '@/components/ui/send-message-button';

/* The pipeline runs sixteen infinite animations: eleven SVG `animateMotion` dots
   and five framer loops. Reduced motion is not a design preference, it is what
   someone with a vestibular disorder needs in order to look at the page at all —
   so it is honoured HERE rather than by editing the component, which stays exactly
   as it was supplied.

   Two mechanisms, because the two animation systems do not share one:
     · `MotionConfig reducedMotion="user"` makes every framer animation inside the
       subtree follow the OS setting. One wrapper, no props changed.
     · SVG SMIL ignores CSS and `MotionConfig` both, so the SVG's own timeline is
       paused. `pauseAnimations()` on the `<svg>` and not `endElement()` on each
       `animateMotion`: `endElement` no-ops on an animation that has not begun
       yet, and eight of these eleven start on a delay — measured, the dots were
       still moving under reduced motion until this changed. Pausing the document
       timeline holds regardless of what has started, and `unpauseAnimations`
       makes it reversible when the reader turns the preference back off. */
function Calm({ children }: { children: React.ReactNode }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      host.current?.querySelectorAll('svg').forEach((svg) => {
        const doc = svg as SVGSVGElement;
        if (query.matches) doc.pauseAnimations?.();
        else doc.unpauseAnimations?.();
      });
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  return (
    <div ref={host} style={{ display: 'contents' }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </div>
  );
}

export function Imported() {
  return (
    <Section label="Imported">
      <SectionHeader eyebrow="42 · IMPORTED" title="كودٌ مستورَد، مُنفَّذٌ بمتطلّباته لا بمتطلّباتنا">
        أرسل المالك كودًا مرجعيًّا وأمر أن يُنفَّذ <b>كما تنصّ متطلّباته</b>، بلا تقييدٍ بشروط هذا المستودع. فثُبِّتت تبعيّاتُه — <code>vaul</code> و<code>react-use-measure</code> و<code>motion</code> و<code>lucide-react</code> و<code>framer-motion</code> و<code>styled-components</code>، بل وأُسرةُ <code>Ubuntu</code> التي يطلبها أحدُها بالاسم — وثُبِّت Tailwind، وبُقيَت أصنافُه ونصفُ أقطارِه وألوانُه <b>حرفيًّا</b> كما هي، حتى حيث تخالف قانونَنا. والمخالفاتُ مسجَّلةٌ في <code>design-system/IMPORTED.md</code> لا مخفيّة.
      </SectionHeader>

      <SpecList>
        <SpecRow name="AnimatedDrawer: الارتفاعُ يتحرّك إلى المشهد" bare specimen={
          <div className="flex w-full justify-center py-4">
            <AnimatedDrawer />
          </div>
        }>
          الملفُّ المرفوع كان تحويلَ نصٍّ غنيّ إلى markdown، والمحوِّلُ أكلَ <b>كلَّ وسمِ JSX</b> كأنه HTML: لا <code>Drawer.Root</code>، ولا <code>button</code>، ولا <code>h2</code>. فالبنيةُ أُعيد بناؤها من الخصائص الباقية — <b>وليست تخمينًا</b>: اجتماعُ <code>h-64</code> على المحتوى، و<code>useMeasure</code> على العنصر الداخليّ، و<code>motion</code> مستوردةً، و<code>Drawer.Content asChild</code> يُهجّي ميكانيكيّةً واحدةً بالضبط — <b>ارتفاعُ الدرج يتحرّك إلى الارتفاع المقيس للمشهد الظاهر</b>. و<code>h-64</code> ارتفاعُ السكون، و<code>asChild</code> يسلّم العنصرَ لـ<code>motion.div</code>. وذاك سببُ استيراد <code>useMeasure</code> أصلًا.
        </SpecRow>

        <SpecRow name="EnterpriseAIPipeline: ستّةَ عشرَ حركةً لانهائية، ورسمٌ يقرأ نفسه" bare specimen={
          /* The demo's own framing — `bg-black p-8`, centred — kept as sent. The
             overflow wrapper is added, not substituted: the component is a fixed
             `w-[620px]`, and at 390px that is 230 pixels of horizontal document
             scroll. Wide content scrolls inside its own container; the component's
             width is untouched. */
          <div
            className="flex min-h-[400px] w-full items-center justify-center bg-black p-8"
            style={{ overflowX: 'auto', overscrollBehaviorX: 'contain' }}
            /* A scrollable region a keyboard cannot reach is a region a keyboard
               cannot scroll — axe's `scrollable-region-focusable`, and it was
               right: the component is 620px wide inside a 300px box at 390px, so
               without a tab stop the right-hand third of it is unreachable
               without a mouse. */
            tabIndex={0}
            role="group"
            aria-label="Agent pipeline, scrollable"
            /* `dir="ltr"`, the same ruling as the drawer and for a sharper reason:
               the SVG's coordinates are fixed, so the diagram does NOT mirror,
               while the HTML chrome around it does. Under RTL the flow arrow ran
               left to right while the header and the stat row read right to left —
               the component disagreeing with itself. Its author wrote an LTR
               surface; it renders as one. */
            dir="ltr"
          >
            {/* `shrink-0` because a flex item may shrink below its declared width,
                and this one declares 620. It is belt-and-braces rather than a fix:
                I first added it against a "538px" reading, then measured the right
                element and found 620 at both 1100 and 390 — the probe had been
                measuring the SVG's parent, not the component. The reading was
                wrong, not the code, and the line stays because it is correct
                anyway. */}
            <div className="shrink-0">
              <Calm>
                <EnterpriseAIPipeline />
              </Calm>
            </div>
          </div>
        }>
          وصل هذا الملفُّ <b>سليمًا</b> — بكلّ وسومه — فنُسِخ حرفيًّا إلى المسار الذي تطلبه التعليمات: <code>src/components/ui/ai-agent-pipeline.tsx</code>. وبنيةُ shadcn والكنيةُ <code>@/</code> كانتا جاهزتَين من الدفعة السابقة، فلم يبقَ إلا <code>framer-motion</code>. وثلاثةُ أشياء أُضيفت ولا واحدٌ منها يغيّر بكسلًا: <code>role="img"</code> ووصفٌ للرسم — إذ كان تسعةَ عشرَ نصًّا داخل SVG بلا اسمٍ للشكل كلّه؛ و<code>aria-live</code> على سطر السجلّ المتبدّل كلَّ ٢٧٠٠ms؛ و<b>احترامُ تفضيل تقليل الحركة</b> — وهو ليس ذوقًا بل ما يحتاجه صاحبُ اضطرابٍ دهليزيّ لينظر إلى الصفحة أصلًا. وتلك الثالثةُ في <b>العَرض</b> لا في المكوّن، وبآليّتَين لأن النظامَين لا يتشاركان واحدة: <code>MotionConfig</code> لحركات framer، و<code>endElement()</code> لأن SMIL في SVG لا يسمع CSS ولا MotionConfig.
        </SpecRow>

        <SpecRow name="Send Message: صفيحةٌ داخليّةٌ تُضغَط، وطائرةٌ تُقلِع عند التركيز" bare specimen={
          /* `dir="ltr"`: `.send-icon { margin-right: 5px }` خاصّيّةٌ فيزيائيّة لا
             منطقيّة، فهي لا تنقلب. تحت RTL يقع الفراغُ بين الأيقونة والحافّة لا
             بينها وبين النصّ — والأيقونةُ تلتصق بكلمة Send. وصاحبُ الكود كتب سطحًا
             LTR، فيُعرَض كواحد. ولم تُبدَّل الخاصّيّةُ بـ`margin-inline-end` لأن
             ذاك تصحيحُ تصميمٍ لا تشغيلُه. */
          <div className="flex w-full justify-center py-6" dir="ltr">
            <SendMessageButton />
          </div>
        }>
          هذا الملفُّ الثالثُ الذي يأكلُ محوِّلُ النصِّ الغنيّ وسومَه — لكنه أكلها <b>وأبقى ما يكفي</b>: الـCSS كاملًا (مكرَّرًا مرّتَين)، ومَسارَي الـ<code>path</code> سليمَين حرفًا حرفًا. فالبنيةُ ليست تخمينًا. و<b>ثلاثُ حِيَلٍ</b> في هذا الكود تستحقّ أن تُقرأ: نصفُ قطرِ الصفيحةِ الداخليّة <code>30px</code> <b>أكبرُ</b> من نصفِ قطرِ الزرِّ <code>12px</code> — فتنحسرُ زواياها داخل <code>overflow: hidden</code> وتبدو الصفيحةُ لينةً داخل إطارٍ حادّ. وعند التمرير تتّسعُ حدودُها من <code>3px</code> إلى <code>1px</code> بينما يكبرُ هامشُها من <code>2px</code> إلى <code>5px</code> — أي أنها <b>تتقلّصُ صافيًا</b>: صفيحةٌ تُضغَط. وعند التركيز تدورُ الطائرةُ <code>-40deg</code>: تُقلِع.
        </SpecRow>

        <SpecRow name="ما بقي حرفيًّا، وما أُضيف" specimen={
          <div className="grid w-full gap-2 text-[12.5px]">
            {[
              ['أصنافُ Tailwind', 'حرفيًّا', 'هي هندسةُ المكوّن لا زينته'],
              ['rounded-[36px] · rounded-3xl', 'حرفيًّا', 'يخالف سُلَّمَنا'],
              ['bg-red-50 / text-red-600', 'حرفيًّا', 'زوجُ حالةٍ بصبغةٍ واحدة'],
              ['bg-sky-400', 'حرفيًّا', 'لونٌ خارج الرموز'],
              ['المفتاح "pharse"', 'حرفيًّا', 'مُعرِّفٌ داخليّ، وتصحيحُه صمتًا إعادةُ كتابة'],
              ['border-radius: 30px', 'حرفيًّا', 'خارج سُلَّمِنا التساعيّ، وهو الحيلة'],
              ['margin-right', 'حرفيًّا', 'فيزيائيّة، فعُرِضت LTR لا صُحِّحت'],
              ['ظلٌّ بتمويهِ 44px', 'حرفيًّا', 'أوسعُ من كلِّ depth-* عندنا'],
              ['<button type="button">', 'أُضيف', 'الكودُ يهجّي <a>، ولا مقصدَ له'],
              ['Drawer.Title / Description', 'أُضيف', 'vaul يطلب اسمًا للحوار'],
              ['aria-label على الإغلاق', 'أُضيف', 'زرٌّ محتواه أيقونةٌ بلا اسم'],
              ['العودة إلى default عند الإغلاق', 'أُضيف', 'درجٌ يتذكّر قرارًا تُرك'],
            ].map(([what, how, why]) => (
              <div key={what} className="grid grid-cols-[1.4fr_0.6fr_1.4fr] gap-2 border-b border-neutral-200 pb-1.5 dark:border-neutral-800">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{what}</span>
                <span className={how === 'حرفيًّا' ? 'text-neutral-600 dark:text-neutral-400' : 'text-sky-700 dark:text-sky-400'}>{how}</span>
                <span className="text-neutral-600 dark:text-neutral-400">{why}</span>
              </div>
            ))}
          </div>
        }>
          الفرقُ بين <b>تنفيذٍ</b> و<b>إعادةِ كتابة</b> هو هذا الجدول. ما بقي حرفيًّا بقي حتى حيث يخالف — لأن المطلوب كان تنفيذَ متطلّباته لا متطلّباتنا. وما أُضيف <b>لا يغيّر تصميمًا</b>: كلُّه الفرقُ بين أن يعمل وألّا يعمل. و<b>لم يُنزَع شيء</b>.
        </SpecRow>
      </SpecList>
    </Section>
  );
}
