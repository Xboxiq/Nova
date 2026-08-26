import { useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import { AnimatedDrawer } from '@/components/ui/animated-drawer';
import EnterpriseAIPipeline from '@/components/ui/ai-agent-pipeline';
import SendMessageButton from '@/components/ui/send-message-button';
import { YieldCard } from '@/components/ui/yield-card';
import { BookmarkToggle } from '@/components/ui/bookmark-toggle';
import { CodeLoader } from '@/components/ui/code-loader';
import { GlassCheckbox } from '@/components/ui/glass-checkbox';
import { InnerGlowButton } from '@/components/ui/inner-glow-button';
import { LessButBetterCard } from '@/components/ui/less-but-better-card';
import { PrinterCard } from '@/components/ui/printer-card';
import { PrismCheckbox } from '@/components/ui/prism-checkbox';
import { DeadboltCheckbox } from '@/components/ui/deadbolt-checkbox';
import { PixelToggle } from '@/components/ui/pixel-toggle';
import { PbAiRadioGroup } from '@/components/ui/pb-ai-radio-group';
import { PbAiCheckboxGroup } from '@/components/ui/pb-ai-checkbox-group';
import { PbAiInput } from '@/components/ui/pb-ai-input';
import { FolderCard } from '@/components/ui/folder-card';
import { Ultimate3dButton } from '@/components/ui/ultimate-3d-button';

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

        <SpecRow name="CodeLoader: بنيةٌ يُثبِتها الحسابُ لا الذوق" bare specimen={
          /* أرضٌ بيضاء: المسارُ #d0d0d0 والسطورُ #666 — لوحةٌ فاتحةٌ بلا لبس.
             و dir=ltr لأن السطورَ الأربعةَ تُكتَبُ من اليسار وطولُ كلٍّ منها معلومٌ
             سلفًا، فقلبُها يجعلُ الإزاحةَ تكشفُ من الطرف الخطأ. */
          <div className="flex w-full items-center justify-center gap-14 bg-white py-12" dir="ltr">
            <CodeLoader label="Loading code" />
          </div>
        }>
          الملفُّ الثاني الذي يصلُ <b>CSS خالصًا</b>، والأوّلُ الذي تُثبِتُ بنيتَه <b>الأرقامُ</b> لا المُركِّباتُ وحدَها. ثلاثةُ قيودٍ تُغلِقُ الشكلَ تمامًا: <code>fill: none</code> و<code>stroke-width</code> على <code>.track</code> و<code>.car</code> يجعلانهما شكلَي SVG؛ و<code>.container {'{'} overflow: visible {'}'}</code> <b>لا يعني شيئًا</b> إلا إذا كان الطلاءُ يفيضُ عن صندوقِ العرض — وذاك ما يفعله طلاءٌ عرضُه <code>2.5</code> على مستطيلٍ ملاصقٍ للحافّة، يفيضُ <code>1.25</code> من كلِّ جهة، فالمستطيلُ <b>غيرُ مُزاح</b>؛ و<code>25 + 75 = 100</code> مع <code>dashoffset: 100 → 0</code> لا يُغلِقُ دورةً إلا إذا كان طولُ المسار <b>مئةً بالضبط</b> — فـ<code>pathLength={'{'}100{'}'}</code> على الشكلَين، وهي القيمةُ الوحيدةُ التي تجعلُ أرقامَ صاحبِ الكود دورةً متّصلةً لا نمطًا يزحفُ بمقدارِ ما صادفَ أن يكون المحيط.
          <br /><br />
          <b>والقيدُ الرابعُ أدقُّها:</b> <code>--len</code> هو <b>الشُّرطةُ والإزاحةُ معًا</b>. فطولُ كلِّ سطرٍ هندسيًّا يجبُ أن يساويَ <code>--len</code> الخاصَّ به بالضبط، وإلا كشفَ الكشفُ أقلَّ من السطر أو أكثر. فـ<code>x2 − x1</code> هي <code>20</code> و<code>14</code> و<code>24</code> و<code>10</code> — <b>وقِيست</b>. و<code>.indent</code> بالأزرق: سطورُ التداخُلِ في كتلةِ الكود.
        </SpecRow>

        <SpecRow name="GlassCheckbox: أوّلُ رفعٍ لم يحذف أداتَه" bare specimen={
          /* أرضٌ داكنةٌ ذاتُ نقشٍ، وهي **شرطُ تشغيلٍ** لا خلفيّةً: الصندوقُ أبيضُ بـ١٢٪
             فوق `backdrop-filter: blur(16px) saturate(180%)`. ومُرشِّحُ الخلفيّةِ لا
             يُرشِّحُ شيئًا فوق أرضٍ مسطّحة — فالزجاجُ يحتاجُ ما يُشوِّشه ليُرى أصلًا. */
          <div
            className="flex w-full items-center justify-center gap-12 py-14"
            style={{
              background:
                'radial-gradient(120% 120% at 18% 12%, #1b3a8f 0%, #0a1030 46%, #05060f 100%)',
            }}
            dir="ltr"
          >
            <GlassCheckbox label="Glass checkbox" />
          </div>
        }>
          هذا أوّلُ رفعٍ يُخفي مربّعَه <b>بالطريقة الصحيحة</b>، ويستحقُّ أن يُقال: <code>opacity: 0</code> مع صندوقٍ صفريٍّ <b>ليس</b> <code>display: none</code>. الأداةُ تبقى في شجرةِ الوصولِ وتبقى قابلةً للتركيز، فتصلُها الجدولةُ والمسافةُ تقلبُها <b>بلا تغييرِ حرفٍ واحد</b>. وقِيس لا افتُرِض.
          <br /><br />
          وبنيتُه تُغلِقُها ثلاثةُ قيود: <code>cursor</code> و<code>user-select</code> على الحاوية يجعلانها <b>لافتة</b>؛ و<code>~ .checkmark</code> يجعلُ الصندوقَ <b>شقيقَ</b> المُدخَل؛ و<code>.checkmark:after</code> يجعلُ علامةَ الصحِّ <b>عنصرًا زائفًا</b> — فلا شيءَ داخلَ الصندوق. و<code>font-size: 20px</code> على الحاويةِ هو <b>أساسُ الـem</b> الذي كُتِبت به كلُّ الأبعاد: <code>1.6em</code> للصندوق، و<code>0.53em</code> لإزاحةِ العلامة، و<code>0.16em</code> لسُمكِها.
          <br /><br />
          <b>والإضافةُ واحدة:</b> الرفعُ لا يكتبُ قاعدةَ تركيزٍ إطلاقًا. وأداةٌ تُدرَكُ بالجدولةِ ولا تُرى <b>أسوأُ</b> من أداةٍ لا تُدرَك — القارئُ داخلَها ولا يعلم. فحلقةٌ على الصندوقِ المرسوم، لا تلمسُ حالةً أخرى.
        </SpecRow>

        <SpecRow name="InnerGlowButton: أيقونةٌ غائبةٌ استُدِلَّ عليها من الحركة" bare specimen={
          <div className="flex w-full items-center justify-center bg-[#0b0f14] py-12" dir="ltr">
            <InnerGlowButton />
          </div>
        }>
          وصلَ الـCSS كاملًا <b>وشظيّةٌ واحدةٌ من الوسم</b> نجت — <code>button class="inner-glow-btn" type="button"{'>'}  Explore Universe</code> — فثبتَ العنصرُ ونوعُه ولافتتُه. والباقي تسمّيه الأصنافُ نفسُها: <code>__text</code> و<code>__icon-wrapper</code> أبناءُ الكتلةِ و<code>__icon</code> داخلَ الغلاف. و<code>space-between</code> مع حشوٍ غيرِ متناظرٍ <code>24px</code> يسارًا و<code>10px</code> يمينًا يقولُ <b>ابنانِ بالضبط</b>: نصٌّ ثم قرصٌ مُعبَّأٌ يوفِّرُ حشوَه بنفسه.
          <br /><br />
          <b>والأيقونةُ ليست في الرفع.</b> فما يقولُه الـCSS عنها: <code>18×18</code> و<code>stroke</code> لا <code>fill</code> — أيقونةُ خطّ. وما يقولُه التصميمُ: الغلافُ يتمدّدُ من قرصٍ <code>36px</code> إلى شقٍّ <code>50px</code> <b>وينزلقُ 4px يمينًا</b> عند التمرير، أي دفعةٌ في <b>اتّجاهٍ واحد</b>، واللافتةُ «Explore Universe». وذاك سهمٌ يشيرُ حيث تذهبُ الحركة. فهي <code>ArrowRight</code> من <code>lucide-react</code> — <b>تبعيّةٌ مثبَّتةٌ سلفًا</b>، ورسمُ سهمٍ جديدٍ بيدي اختراعٌ حيث يُجيبُ المُثبَّت. وهذا <b>الجزءُ الوحيدُ المُستدَلُّ</b> في المكوّن، ومُعلَنٌ لذلك.
        </SpecRow>

        <SpecRow name="LessButBetterCard: مُرشِّحٌ مفقودٌ لا يُتجاهَل، بل يُخفي البطاقة" bare specimen={
          <div className="flex w-full items-center justify-center bg-[#f4f4f5] py-12" dir="ltr">
            <LessButBetterCard />
          </div>
        }>
          الشجرةُ قصيرةٌ والمُحدِّداتُ تُغلِقُها: <code>.wrapper</code> يحملُ <code>:hover</code> ويقصُّ، وفيه <code>.card</code> (لوحُ التدرُّجِ الفائضُ) وفوقَه <code>.title</code> و<code>.desc</code> مُطلَقَي الموضع — وكلتا قاعدتَي التمرير <code>.wrapper:hover .title/.desc</code> فهما سليلا الغلافِ لا البطاقة.
          <br /><br />
          <b>والأصلُ المفقود:</b> <code>filter: url("#noise")</code> يشيرُ إلى مُرشِّحِ SVG بمُعرِّفِ <code>noise</code> <b>لا يوفّرُه الرفعُ إطلاقًا</b>. وكنتُ كتبتُ أنّ إشارةً معلّقةً تمنعُ رسمَ العنصرِ أصلًا فتصيرُ البطاقةُ فارغة — <b>وذاك خطأ، والقياسُ قاله</b>: بحذفِ عنصرِ المُرشِّحِ بقيت البطاقةُ ترسمُ ٨٤ لونًا متمايزًا على ٢٢٥ نقطةٍ ثابتة، أي تُرسَمُ كأن لا مُرشِّح. <b>فالإخفاقُ أهدأُ مما ادّعيتُ، وأسوأُ لذلك</b> — البطاقةُ تبدو تامّةً وهي بلا حبيباتٍ فلا يبحثُ أحد. وتوفيرُ المُرشِّحِ يبقى حامِلًا: بمقارنةِ النقاطِ الـ٢٢٥ نفسِها، <b>٨٢ منها تتغيّر</b>.
          <br /><br />
          <b>وماهيّةُ المُرشِّحِ تُثبِتُها خاصّيّتانِ لا يكتبُهما أحدٌ لغيرِ سبب:</b> <code>110%</code> للأبعاد مع <code>translate: -5% -5%</code>. فتكبيرُ لوحٍ عُشرًا وسحبُه نصفَ ذلك هو <b>الطريقةُ القياسيّةُ لإبقاءِ حوافِّ مُرشِّحِ إزاحةٍ ممزَّقةً خارجَ القصّ</b> — وطبقةُ حبيباتٍ جمعيّةٌ لا تحتاجُ أيًّا منهما. فـ<code>#noise</code> هو <code>feTurbulence</code> يقودُ <code>feDisplacementMap</code>، والعُشرُ الفائضُ هو بالضبط ما يأكلُه <code>scale</code>. <b>الأرقامُ منّي، والميكانيكيّةُ حسابُ الرفعِ نفسِه.</b>
        </SpecRow>

        <SpecRow name="PrinterCard: عشرونَ حركةً في دورةٍ واحدة، وخمسُ حالاتٍ تُنطَقُ معًا" bare specimen={
          <div className="flex w-full items-center justify-center bg-[#0d0d10] py-12" dir="ltr">
            <PrinterCard />
          </div>
        }>
          أكبرُ رفعٍ بلا وسمٍ حتى الآن: دورةٌ واحدةٌ من <code>6.4s</code> تقودُ عشرينَ حركةً لانهائيّة. ومع ذلك فالشجرةُ <b>مُعيَّنةٌ تقريبًا كلُّها</b>، لأن كلَّ جزءٍ مُطلَقُ الموضعِ و<code>left/top</code> الخاصُّ به لا يقعُ في مكانه الصحيحِ إلا تحت أبٍ واحد. مثالٌ محسوب: <code>.printer-body</code> عند <code>top: 14px</code>، و<code>.slot</code> عند <code>top: 5px</code> — والخمسةُ داخلَ <b>الجسم</b>، إذ تحت <code>.printer</code> لكانت <b>فوقَه</b>. وبالاختبارِ نفسِه: اللوحةُ والأزرارُ والمصباحُ والمنافذُ والعلامةُ والدَّرَجُ كلُّها أبناءُ الجسم. وبالمقابل <code>.printer-ambient-shadow</code> بـ<code>z-index: 0</code> والجسمُ بـ<code>2</code>: فهو <b>شقيقٌ</b> تحت <code>.printer</code> لا ابنٌ للجسم، إذ يجبُ أن يكونَ خلفَه.
          <br /><br />
          <b>وعدّانِ لا يُثبِتُهما الـCSS، وهما الحَدْسانِ الوحيدان:</b> الأزرارُ — أقراصٌ ٦px بفواصلَ ٣px تبدأ من ٥٨ والمصباحُ عند ١١٥ تقريبًا، فأيُّ عددٍ من ١ إلى ٨ يسع — فثلاثة؛ والمنافذُ — قضبانُ ١٥×٢ بفواصلَ ٢٫٥ تبدأ من ٣٠ في جسمٍ ٥٨ — فخمسةٌ أكبرُ عددٍ يبقى فوقَ العلامةِ عند ٤٦.
          <br /><br />
          <b>و<code>role="img"</code> هو كلُّ قصّةِ الوصولِ هنا.</b> الكلماتُ الخمسُ للحالة <b>كلُّها في المستند معًا</b> وتُبدَّلُ بالشفافيّة، فقارئُ الشاشةِ يقرأُ «Ready Feeding paper... Printing... Ejecting... Done» في نَفَسٍ واحد: <b>خمسُ حالاتٍ متناقضة، لا واحدةَ منها صحيحة</b>، تصفُ طابعةً لا وجودَ لها. و<code>role="img"</code> يجعلُ الشجرةَ عَرْضيّةً، فتكفُّ الكلماتُ عن أن تُنطَق وتُوصَفُ البطاقةُ مرّةً واحدةً وصفًا صحيحًا.
        </SpecRow>

        <SpecRow name="PrismCheckbox: أوّلُ رفعٍ لم يحتج شيئًا لِلوحةِ المفاتيح" bare specimen={
          /* السُّلَّمُ الثلاثيُّ والحالتانِ الإضافيّتانِ كلُّها معروضة، لا موصوفة:
             §29 يقول إنّ مفتاحًا غيرَ مرسومٍ ادّعاءٌ غيرُ مقيس. فالرفعُ يُعلِنُ
             --small و--large و--icon-only و:disabled، فكلُّها هنا. */
          <div className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-6 bg-[#050810] px-8 py-12" dir="ltr">
            <PrismCheckbox size="small" label="Small" description="26px box" />
            <PrismCheckbox label="Enable feature" description="Activate this option" defaultChecked />
            <PrismCheckbox size="large" label="Large" description="44px box" />
            <PrismCheckbox iconOnly label="Icon only" />
            <PrismCheckbox disabled label="Disabled" description="filter: grayscale(0.85)" />
          </div>
        }>
          أكملُ رفعٍ في هذه الدفعة، <b>وأوّلُ واحدٍ لم يحتج إضافةً واحدةً لِلوحةِ المفاتيح</b>: يُخفي مربّعَه بالقصِّ الصحيح، ويكتبُ <code>:focus-visible</code> بنفسه، ويكتبُ كتلةَ <code>prefers-reduced-motion</code> بنفسه. وشجرتُه تُغلِقُها <b>مُركِّبتانِ استُخدِمتا بقصدٍ مختلف</b>: <code>+ __box</code> <b>ملاصقة</b> فالصندوقُ يلي المُدخَلَ مباشرةً، و<code>~ __content</code> <b>عامّة</b> فالنصُّ يليه <b>بعد</b> الصندوق. ولو كانتا واحدةً لَما تعيّنَ الترتيب.
          <br /><br />
          <b>والشيءُ الوحيدُ الغائب:</b> مسارُ علامةِ الصحّ. وما يقولُه الـCSS عنه — <code>stroke-dasharray: 22</code> و<code>dashoffset: 22</code> إلى صفر — <b>رسمٌ متدرِّج</b>، ورسمٌ متدرِّجٌ لا ينظفُ إلا إذا ساوت الشُّرطةُ طولَ المسار. وعلامةٌ ذاتُ ضلعَين في مربّعِ ٢٢ تقيسُ نحوَ ٢٠٫٥، فوُضِع <code>pathLength={'{'}22{'}'}</code>: يجعلُ الاثنَين والعشرينَ <b>دقيقةً</b> لا قريبة — نفسُ حكمِ <code>pathLength=100</code> في المُحمِّل.
        </SpecRow>

        <SpecRow name="DeadboltCheckbox: خاصّيّةٌ تبدو خطأً وهي التي تُعيِّنُ البنية" bare specimen={
          <div className="flex w-full items-center justify-center gap-12 bg-[#0a0b0d] py-12" dir="ltr">
            <DeadboltCheckbox label="Lock the door" />
          </div>
        }>
          البنيةُ يُعيِّنُها تفصيلٌ واحدٌ يبدو غلطةً: <code>.deadbolt-input {'{'} pointer-events: none {'}'}</code>. <b>مربّعٌ لا يُنقَر</b>، خلفَ إطارٍ يحملُ <code>cursor: pointer</code> — وهذا الاجتماعُ يعملُ تحت <b>ترتيبٍ واحدٍ لا غير</b>: أن يكونَ <code>.deadbolt-checkbox-box</code> <b>لافتةً</b>. فحينئذٍ يُفعِّلُ النقرُ على الإطارِ المُدخَلَ <b>بتفعيلِ اللافتة</b>، ويصيرُ <code>pointer-events: none</code> على مُدخَلٍ صفريٍّ خفيٍّ <b>ترتيبًا لا قتلًا</b>. ولو كان <code>&lt;div&gt;</code> لكانت الأداةُ صورةً: لا يقلبُها إلا لوحةُ مفاتيح. <b>فخاصّيّةٌ تبدو زائدةً هي الدليلُ على العنصر.</b>
          <br /><br />
          والحركةُ مكتوبةٌ كفيزياء: <code>bolt-slam</code> يذهبُ إلى <code>26px</code> ثم يرتدُّ إلى <code>22</code> ثم يستقرُّ على <code>24</code> — <b>تجاوُزٌ ثم ارتدادٌ ثم سكون</b>، وهو ما يفعلُه مِزلاجٌ يُدفَعُ بقوّة. والرجوعُ <code>bolt-retract</code> بمنحنى <code>(0.55, 0, 1, 0.45)</code>: يبدأُ بطيئًا ويُسرِعُ — نابضٌ يُفلَت.
        </SpecRow>

        <SpecRow name="PixelToggle: أربعُ أيقوناتٍ غائبة، والقيودُ تسمّيها كلَّها" bare specimen={
          <div className="flex w-full items-center justify-center gap-12 bg-[#08090c] py-12 text-[15px]" dir="ltr">
            <PixelToggle label="Pixel toggle" />
          </div>
        }>
          هذا الرفعُ يطلبُ <b>أربعَ أيقوناتٍ لا يوفّرُ واحدةً</b> — أكثرُ محتوًى مُستدَلٍّ حتى الآن، فكلٌّ منها مسمًّى. وما يقولُه الـCSS عن كلٍّ: <code>.indicator-on-wrap</code> بـ<code>0.85em</code> و<code>#00ffaa</code> <b>يسارًا</b> باهتةٌ حتى الحفظ — العلامةُ المُوجِبةُ التي يكشفُها القرص؛ و<code>.indicator-off-wrap</code> بـ<code>#ff007f</code> <b>يمينًا</b> ساطعةٌ حتى الحفظ — نقيضُها؛ و<code>.face-sad</code> و<code>.face-happy</code> بـ<code>1.35em</code> ولونٍ واحد. <b>وأربعتُها مقاسةٌ بالـem، ومُلوَّنةٌ عبر <code>color</code>، ومُوسَّطةٌ بالمرونة</b> — وذاك وصفُ SVG مطليٍّ يرثُ <code>currentColor</code>، أربعَ مرّات. فهي <code>Check</code> و<code>X</code> و<code>Frown</code> و<code>Smile</code> من lucide. <b>الاختيارُ لي، والقيودُ للرفع.</b>
          <br /><br />
          و<b>ثلاثةُ أشياءَ أُصلِحت، وكلُّها رأيناها قبلًا في هذه الدفعة:</b> <code>display: none</code> على المربّعِ — <b>للمرّةِ الثالثة</b> — فحلَّ محلَّه القصُّ المخفيُّ بصريًّا؛ و<code>display: block</code> على المسار، إذ هو <code>&lt;span&gt;</code> و<code>width/height</code> لا تنطبقانِ على صندوقٍ سطريّ؛ وحلقةُ تركيزٍ لأن المُدخَلَ صار يُدرَك.
        </SpecRow>

        <SpecRow name="pb-ai: توأمانِ يفترقانِ في ثلاثِ كتلٍ من ستَّ عشرة" bare specimen={
          <div className="flex w-full flex-wrap items-start justify-center gap-8 bg-[#07060d] px-6 py-12" dir="ltr">
            <PbAiRadioGroup legend="AI mode" />
            <PbAiCheckboxGroup legend="AI features" />
          </div>
        }>
          رفعانِ متجاوران، والتشابهُ <b>مقيسٌ لا مُقدَّر</b>: بتطبيعِ النصَّين وإعادةِ تسميةِ radio إلى checkbox، <b>١٣ من ١٦ كتلةَ تصريحٍ مطابِقةٌ حرفًا بحرف</b> — الحاويةُ ولمعانُها وحبيباتُها وحالتا السطحِ ولمعانُه ونسيجُه ورفعُ التمريرِ والضغط. <b>وثلاثُ كتلٍ تفترق، وهي كلُّ الفرق:</b> نصفُ قطرِ السطحِ <code>999px</code> (قرصٌ من عدّة) مقابلَ <code>12px</code> (صندوقٌ يُشعَل أو يُطفأ)؛ والعلامةُ نقطةٌ تتمدّدُ <code>0.4 → 1</code> مقابلَ محرفٍ يمرُّ من الشفافيّةِ إلى الأبيض؛ وقاعدتُها <code>background</code> مقابلَ <code>color</code>.
          <br /><br />
          والملفّانِ <b>منفصلانِ وحرفيّانِ كلاهما</b>. وتوحيدُ الثلاثَ عشرةَ كتلةً في مكانٍ واحدٍ أنظفُ — وهو أيضًا <b>إعادةُ كتابةِ ملفَّي شخصَين في ثالثٍ لم يكتبْه أحدُهما</b>. والمطلوبُ تنفيذُ كلٍّ كما هو، فالتكرارُ <b>مسجَّلٌ لا مُزال</b>.
          <br /><br />
          <b>وشيئانِ لا يستطيعُ الـCSS قولَهما، وأحدُهما يُقرِّرُ إن كانت هذه مجموعةَ راديو أصلًا:</b> <code>name</code> — فمجموعةُ راديو بلا اسمٍ مشترَك <b>ليست مجموعة</b>: كلُّ زرٍّ أداةٌ مستقلّةٌ تُشعَلُ ولا تُطفأ، فتنتهي الثلاثةُ كلُّها مختارةً ولا واحدَ منها يستثني الآخر. ولا تُعبِّرُ ورقةُ أنماطٍ عن ذلك، فالاسمُ يُولَّدُ لكلِّ نسخةٍ بـ<code>useId</code>. <b>والثاني هديّةُ الأوّل:</b> أسهمُ لوحةِ المفاتيح تأتي <b>مع</b> الاسم — فمجموعةٌ مسمّاةٌ محطّةُ جدولةٍ واحدةٌ تتحرّكُ الأسهمُ داخلَها. فلا كودَ تجوالٍ هنا: <b>المِنصّةُ تفعلُه، متى وُجِد الاسم.</b>
        </SpecRow>

        <SpecRow name="PbAiInput: استعلامُ وسائطَ يُخبِرُك بالوسمِ، ثم يكشفُ عن العَيب" bare specimen={
          <div className="flex w-full items-center justify-center bg-[#0a0713] py-12" dir="ltr">
            <PbAiInput />
          </div>
        }>
          <b>استعلامُ الوسائطِ هو ما يُثبِتُ الوسم:</b> <code>@media (max-width: 640px) {'{'} .pb-ai-input-btn span:first-child {'{'} display: none {'}'} {'}'}</code>. قاعدةٌ تُخفي <b>أوّلَ</b> span في الزرِّ تقولُ شيئَين: أن للزرِّ ابنَين على الأقلّ وأنّ الأوّلَ هو <b>الكلمة</b> — فالترتيبُ <code>Create</code> ثمّ <code>✦</code> لا العكس.
          <br /><br />
          <b>وهي أيضًا تكشفُ العَيبَ الذي يحتاجُ إصلاحًا:</b> تحت ٦٤٠px يصيرُ كلُّ محتوى الزرِّ <b>محرفًا زخرفيًّا</b>. وزرٌّ لافتتُه «✦» <b>بلا اسمٍ على الهاتف</b>: يُنطَقُ «زرّ»، ولا تجدُه أوامرُ الصوت. فـ<code>aria-label</code> يحملُ الكلمةَ عبرَ نقطةِ الانكسارِ <b>بلا تكلفةٍ بصريّةٍ واحدة</b>، والشُّهبةُ <code>aria-hidden</code> — فالاسمُ ثابتٌ عند كلِّ عرضٍ لا يتبخّرُ عند ٦٤٠.
          <br /><br />
          <b>وهذا أوّلُ رفعٍ يَنزِعُ التركيزَ فعلًا:</b> <code>outline: none</code> على الحقلِ <b>وعلى الزرّ</b>. فأُعيدَ للاثنَين — والغلافُ يقصُّ (<code>overflow: hidden</code>) فحلقةٌ خارجيّةٌ على الحقلِ تُقتَصّ، ولذلك حلقتُه <code>box-shadow</code> داخليّةٌ وحلقةُ الزرِّ <code>outline</code> بإزاحةٍ سالبة.
        </SpecRow>

        <SpecRow name="FolderCard: أفضلُ رفعٍ سلوكًا بعد البِزم، وأوّلُ من سمّى نفسَه" bare specimen={
          /* أرضٌ بيضاء، وقد كانت #faf7f0 فأخفقَ المِقياس: لونُ المجلَّدِ الخاصُّ
             لعدّادِه — --ink-soft: #7c736a — أعطى 4.34:1 على كريمي، وذاك تحت AA.
             والأرضُ كانت **من عندي** لا من التصميم: على الأبيض يعطي لونُ صاحبِ
             الكودِ نفسُه 4.65:1 فيعبر. فالعَيبُ كان زينتي، فأُزيلت الزينةُ ولم
             يُطلَب سماحٌ للون غيري. */
          <div className="flex w-full items-center justify-center bg-white py-12" dir="ltr">
            <FolderCard title="Documents" count="128 items" />
          </div>
        }>
          بعد <code>PrismCheckbox</code> هذا <b>أفضلُ رفعٍ سلوكًا في السجلِّ كلِّه</b>: يُخفي مُدخَلَه ببكسلٍ لا يحذفُه، ويكتبُ <code>:focus-visible</code> بنفسه، ويكتبُ <code>prefers-reduced-motion</code> بنفسه. <b>فلم يُضَف شيءٌ لِلوحةِ مفاتيحَ ولا لقارئِ شاشة.</b>
          <br /><br />
          و<code>pointer-events: none</code> على المُبدِّلِ يعني ما عناه في المِزلاج: <b>الحاويةُ لافتة</b>. وهنا يُثمِرُ ذلك ثمرةً ثانية — نصُّ العنوانِ <b>داخلَ اللافتة</b>، فيصيرُ «Documents 128 items» <b>اسمَ الأداةِ من تلقاء نفسِه</b>. <b>وهذا أوّلُ رفعٍ في الدفعةِ لم يحتج <code>aria-label</code>، لأن نصَّه هو الذي يعمل.</b>
        </SpecRow>

        <SpecRow name="Ultimate3dButton: مِحيطٌ يدورُ خلفَ نافذةٍ بعرضِ بكسلَين" bare specimen={
          <div className="flex w-full flex-wrap items-center justify-center gap-8 bg-[#0b0b0b] py-14" dir="ltr">
            <Ultimate3dButton>Initialize</Ultimate3dButton>
            <Ultimate3dButton disabled>Initialize</Ultimate3dButton>
          </div>
        }>
          أغنى أداةٍ منفردةٍ في السجلّ: طبقتانِ زائفتانِ على الزرّ، وطبقتانِ على نصِّه، وعنصرُ تمويجٍ، وشيفرونٌ مرسومٌ بالحدود، وخمسُ حالات، ومجموعتا إطارات. <b>والوسمَ يُثبِتُه ما يقرأُه الـCSS منه لا المُركِّبات:</b> <code>content: attr(data-text)</code> — فطبقتا الخللِ تعرضانِ <b>خاصّيّةً</b>، وبلا <code>data-text</code> تعرضانِ النصَّ الفارغَ <b>ويغيبُ التأثيرُ كلُّه صمتًا</b>: لا خطأً ولا صورةً، غيابًا فقط. فاللافتةُ تُحمَلُ مرّتَين من <b>مصدرٍ واحد</b> حتى لا تفترقا.
          <br /><br />
          <b>وترتيبُ الطبقاتِ يستحقُّ القراءةَ، لأنه سببُ كونِ <code>overflow: hidden</code> و<code>z-index: 1</code> حامِلَين لا زينة.</b> الزرُّ سياقُ تراكُم، فالابنُ السالبُ يُرسَمُ <b>فوقَ خلفيّتِه</b>: خلفيّةُ <code>#111</code> ← <code>::before</code> (<code>-2</code>، المخروطُ الدائر) ← <code>::after</code> (<code>-1</code>، مُزاحٌ <code>2px</code>) ← التمويجُ ← النصُّ والأيقونة. و<code>::after</code> مُزاحٌ ببكسلَين، <b>فالمكانُ الوحيدُ الذي يظهرُ فيه المخروطُ هو تلك الحاشيةُ</b>: «تقدُّمُ المِحيط» قرصٌ بعرضِ <code>250%</code> يُرى عبرَ نافذةٍ بعرضِ بكسلَين، و<code>overflow: hidden</code> هو ما يمنعُ القرصَ من الظهورِ في غيرها. <b>وانزِع أيًّا منهما فالنتيجةُ ليست تأثيرًا أضعف، بل صورةٌ أخرى تمامًا.</b>
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
              ['pathLength={100}', 'استُنتِج', 'القيمةُ الوحيدةُ التي تُغلِقُ الدورة'],
              ['role=status للمُحمِّل', 'أُضيف', 'مُحمِّلٌ لا يُنطَق زخرفة'],
              ['نبضةٌ بدل الدوران', 'أُضيف', 'عند تقليلِ الحركة: الإيقافُ تراجُع'],
              ['opacity:0 على المربّع', 'حرفيًّا', 'صحيحٌ أصلًا: يبقى قابلًا للتركيز'],
              ['حلقةُ تركيزٍ للزجاج', 'أُضيف', 'الرفعُ بلا قاعدةِ تركيزٍ إطلاقًا'],
              ['ArrowRight من lucide', 'استُدِلّ', 'الأيقونةُ غائبةٌ، والحركةُ تسمّيها'],
              ['مُرشِّح #noise', 'استُدِلّ', '110% و-5% تهجّيان مُرشِّحَ إزاحة'],
              ['عددُ الأزرارِ والمنافذ', 'حُدِس', 'الـCSS لا يُثبِتُ عددًا'],
              ['role=img للطابعة', 'أُضيف', 'خمسُ حالاتٍ تُنطَقُ معًا بلا هذا'],
              ['ردُّ الألوانِ القسريّة', 'أُضيف', 'العنوانُ المتدرِّجُ يغيبُ تمامًا'],
              ['pathLength={22} للعلامة', 'استُنتِج', 'الشُّرطةُ يجبُ أن تُساوي الطول'],
              ['Check · X · Frown · Smile', 'استُدِلّ', 'أربعُ أيقوناتٍ لا يوفّرُها الرفع'],
              ['pointer-events: none', 'حرفيًّا', 'ويُثبِتُ أنّ الحاويةَ لافتة'],
              ['نسخةٌ مكرَّرةٌ للطابعة', 'لم تُبنَ', '١٠٢ كتلةً مطابِقة؛ نُسِبت لصاحبها'],
              ['name للراديو', 'أُضيف', 'بلا اسمٍ ليست مجموعةً بل ثلاثُ أدوات'],
              ['data-text للخلل', 'أُضيف', 'attr() بلا خاصّيّةٍ يعرضُ لا شيء'],
              ['aria-label للزرِّ ✦', 'أُضيف', 'تحت 640px لا يبقى إلا محرفٌ زخرفيّ'],
              ['outline: none ×٢', 'أُعيدت', 'أوّلُ رفعٍ يَنزِعُ التركيزَ فعلًا'],
              ['١٣ كتلةً مكرَّرةً', 'حرفيًّا', 'التوحيدُ إعادةُ كتابةِ ملفَّي شخصَين'],
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
