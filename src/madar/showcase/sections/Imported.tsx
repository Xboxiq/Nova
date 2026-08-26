import { useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import { AnimatedDrawer } from '@/components/ui/animated-drawer';
import EnterpriseAIPipeline from '@/components/ui/ai-agent-pipeline';
import SendMessageButton from '@/components/ui/send-message-button';
import { YieldCard } from '@/components/ui/yield-card';
import { BookmarkToggle } from '@/components/ui/bookmark-toggle';

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

        <SpecRow name="YieldCard: حدٌّ متدرِّجٌ من طبقةٍ خلفَ الطبقة" bare specimen={
          /* `dir="ltr"`: نصٌّ إنجليزيٌّ كامل، ولا خاصّيّةَ فيزيائيّةَ هنا — لكن
             محاذاةَ فقرتَي البطاقة تنقلبُ تحت RTL فتصير اللافتةُ يمينًا والأيقونةُ
             يمينًا وبينهما فراغُ أربعِ مئةِ بكسل. سطحٌ كُتِب LTR، يُعرَض كواحد. */
          /* أرضٌ داكنة، كإطارِ خطِّ الأنابيب: البطاقةُ أرضُها <code>#080509</code>
             ونصُّها أبيض، فهي مكتوبةٌ لصفحةٍ داكنةٍ بلا لبس. وهذا <b>عرضٌ</b> لا
             تعديلٌ في المكوّن — والفرقُ ليس ذوقًا: حلقةُ التدرُّج تبدأ بـ<code>1px</code>
             داخلَ صندوقِ الحدّ (فـ<code>-inset-px</code> يُحسَبُ من صندوقِ الحشو)،
             فيبقى بكسلٌ واحدٌ خارجَها يُظهِرُ ما تحت البطاقة. على أرضٍ داكنةٍ لا يُرى،
             وعلى أرضِنا الفاتحة يصيرُ شعرةً بيضاءَ حولَ بطاقةٍ سوداء. */
          <div className="flex w-full justify-center bg-[#050406] py-10" dir="ltr">
            <YieldCard />
          </div>
        }>
          هذا أوّلُ ملفٍّ يصلُ <b>سليمًا تمامًا</b> مع عرضِه — لا وسمَ مأكولًا، ولا مَسارَ SVG منقوصًا — وبنيةُ shadcn والكنيةُ <code>@/</code> وTailwind كانت كلُّها جاهزةً من الدفعات السابقة، فلم يبقَ إلا النسخُ إلى <code>src/components/ui/yield-card.tsx</code> بلا تبعيّةٍ واحدةٍ جديدة. <b>والحيلةُ فيه واحدة</b>: الحدُّ المتدرِّج. الأبُ يحملُ <code>border-2 border-transparent</code> و<code>backgroundClip: padding-box</code> — فتدرُّجُه الأسودُ يتوقّفُ عند صندوقِ الحشو وتبقى الحاشيةُ الثنائيّةُ <b>شفّافةً فعلًا</b> — وخلفَه طبقةٌ بـ<code>-inset-px</code> و<code>-z-10</code> تحملُ تدرُّجًا بزاويةِ <code>71deg</code> من <code>#110e0e</code> إلى ذهبِ <code>#afa220</code>. فما يُرى «حدًّا» ليس حدًّا: هو <b>طبقةٌ خلفَ ثقبٍ في الطبقة</b>. وهذا يعملُ فقط لأن الأبَ <code>relative</code> بـ<code>z-index: auto</code> — أي لا يفتحُ سياقَ تراكُم — فيجوزُ للابن السالبِ أن يهبطَ تحت خلفيّةِ أبيه. ولو أُضيف <code>z-0</code> إلى الأب لاختفى الحدُّ كلُّه. <b>وقد قِيس</b>: الحاشيةُ عند منتصفِ الحافّة اليسرى ذهبيّة.
        </SpecRow>

        <SpecRow name="BookmarkToggle: بنيةٌ استُخرِجت من المُركِّبات، ومفتاحٌ لم يكن يوجد" bare specimen={
          /* أرضٌ بيضاء، مختارةٌ بالقياس لا بالذوق. حالتا الأداة أبيضُ وأسود، فقِيست
             ثلاثُ أرضياتٍ لكلتَيهما:
                 #ffffff  سكون 1.48:1   حفظ 13.64:1
                 #e5e5ea  سكون 1.18:1   حفظ 11.09:1
                 #1c1c1e  سكون 11.53:1  حفظ  1.10:1
             فلا أرضَ تحملُ الحالتَين فوق 3:1 — وهذه خاصّيّةُ التصميم لا خاصّيّةُ
             الأرض، وهي مسجَّلةٌ في IMPORTED.md لا مُصلَحةٌ صمتًا. واختِيرت البيضاءُ
             لثلاثة: أفضلُ رقمٍ للسكون بين الفاتحتَين، وأنّ اللوحَ الداخليَّ #f5f5f7
             هو رمادُ صفحةِ آبل نفسُه — فوضعُه على #f5f5f7 أو #e5e5ea يُذيبُه في
             الصفحة — وأنّ ما يجبُ أن تُبلِّغَه أداةُ قلبٍ هو **تغيُّرُ** الحالة، وذاك
             13.64:1. و dir=ltr لأن الشكلَ متماثلٌ لكن الكَنسةَ المضيئةَ تجري بزاويةِ
             35deg من اليسار، وهي حركةٌ ذاتُ يد. */
          <div className="flex w-full items-center justify-center gap-10 bg-white py-12 text-neutral-900" dir="ltr">
            <BookmarkToggle label="Bookmark this article" />
          </div>
        }>
          وصلَ هذا الملفُّ <b>CSS خالصًا</b>: لا وسمَ واحدًا، ولا مكوّنًا، ولا غلافًا. ومع ذلك فالبنيةُ <b>ليست تخمينًا</b> — المُركِّباتُ تهجّيها بالضبط، ولا شجرةَ ثانيةً تُرضيها كلَّها: <code>~ .bookmark-shadow</code> و<code>~ .ripple-ring</code> يجعلانهما <b>شقيقَي</b> المربّع، و<code>.bookmark-shadow .bookmark-shape</code> يضعُ الشكلَ <b>داخلَ</b> الظلّ، و<code>.bookmark-shape .bookmark-inner</code> و<code>.highlight-sweep</code> يضعانهما داخلَ الشكل. فتَعيَّنَ كلُّ عنصر. و<code>.bookmark-toggle</code> <b>لافتة</b>: عندها <code>cursor: pointer</code>، وهي السلفُ الوحيدُ المُمكِنُ للمربّع، ومربّعٌ بلا صندوقٍ مرئيٍّ يُقادُ بلافتتِه أو لا يُقادُ أبدًا.
          <br /><br />
          <b>والتغييرُ الوحيدُ الذي لا يُزيحُ بكسلًا هو الفرقُ بين أن يعمل وألّا يعمل:</b> الكودُ يكتبُ للمربّع <code>display: none</code>. وذاك <b>لا يُخفي أداةً، يحذفها</b>: خارجَ شجرةِ الوصول، خارجَ ترتيبِ الجدولة، لا يُركَّزُ عليه ولا يُنطَق. فالسبيلُ الوحيدُ لقلبِه فأرةٌ على اللافتة. قِيس قبلَ التغيير: <b>صفرُ محطّاتِ جدولة</b>. فحلَّ محلَّه <b>القصُّ المخفيُّ بصريًّا</b> — بكسلٌ واحدٌ مقصوص، مطلقُ الموضعِ فلا أثرَ له في تخطيطِ اللافتة — فبقي الصندوقُ مخفيًّا كما كان، <b>وصار قابلًا للتركيز والنطق</b>. ولم يتغيّر في الإشارةِ المرسومةِ شيء.
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
              ['isolate على الغلاف', 'أُضيف', 'بلا سياقِ تراكُمٍ لا يُرسَم الحدُّ أصلًا'],
              ['<p> عنوانًا للبطاقة', 'حرفيًّا', 'لا ترقيمَ عنواناتٍ، والسياقُ يعطيه'],
              ['display:none على المربّع', 'استُبدِل', 'يحذفُ الأداةَ لا يخفيها'],
              ['حلقةُ تركيزٍ للإشارة', 'أُضيف', 'صار للتركيزِ مكانٌ يهبطُ فيه'],
              ['breathe اللانهائيّة', 'أُوقِفت', 'عند تقليلِ الحركة وحدَه'],
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
