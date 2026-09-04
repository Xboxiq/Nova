import { Section, SectionHeader } from '../SectionHeader';
import { MotionConfig } from 'framer-motion';
import { SpecList, SpecRow } from '../SpecRow';
import { SkyThemeToggle } from '@/components/ui/sky-theme-toggle';
import { FlexProductCard } from '@/components/ui/flex-product-card';
import { PayIconsButton } from '@/components/ui/pay-icons-button';
import { GeneratingRingLoader } from '@/components/ui/generating-ring-loader';
import { KeyboardLoader } from '@/components/ui/keyboard-loader';
import { KineticBadge } from '@/components/ui/kinetic-badge';
import { BallRingLoader } from '@/components/ui/ball-ring-loader';
import { NeonPowerSwitch } from '@/components/ui/neon-power-switch';
import { LaunchingLoader } from '@/components/ui/launching-loader';
import { SystemProgressPanel } from '@/components/ui/system-progress-panel';
import { CouponTearOff } from '@/components/ui/coupon-tear-off';
import { LandscapeThemeSwitch } from '@/components/ui/landscape-theme-switch';
import { WheelSelector } from '@/components/ui/wheel-selector';
import { SolarCollapseLoader } from '@/components/ui/solar-collapse-loader';
import { AddressCopyButton } from '@/components/ui/address-copy-button';
import { NestedCubeScene } from '@/components/ui/nested-cube-scene';
import { BrutalMarqueeLink } from '@/components/ui/brutal-marquee-link';
import { PrintstreamSidebar } from '@/components/ui/printstream-sidebar';
import { PerspectiveBatteryCard } from '@/components/ui/perspective-battery-card';
import { GalaxySpaceButton } from '@/components/ui/galaxy-space-button';
import { LavaHaloButton } from '@/components/ui/lava-halo-button';
import { LiquidGlassLoader } from '@/components/ui/liquid-glass-loader';
import { CharSwapJoinButton } from '@/components/ui/char-swap-join-button';
import { LiquidGlassGenerateButton } from '@/components/ui/liquid-glass-generate-button';
import { CornerBracketOfferButton } from '@/components/ui/corner-bracket-offer-button';
import { FifteenZoneBatteryCard } from '@/components/ui/fifteen-zone-battery-card';
import { ElectricCookButton } from '@/components/ui/electric-cook-button';
import { SunsetGrayscaleButton } from '@/components/ui/sunset-grayscale-button';
import { TreeFolder, TreeItem, TreeSection, TreeView } from '@/components/ui/animated-file-tree';
import { Download, Palette, Type } from 'lucide-react';
import FraudCard from '@/components/ui/fraud-card';
import FlameWrap from '@/components/canvasui/FlameWrap';
import UploadProgress from '@/components/aicanvas/upload-progress';
import PolaroidStack from '@/components/aicanvas/polaroid-stack';
import GlassNotification from '@/components/aicanvas/glass-notification';
import GlassToggle from '@/components/aicanvas/glass-toggle';
import GlassSlider from '@/components/aicanvas/glass-slider';
import GlassDock from '@/components/aicanvas/glass-dock';
import GlassModal from '@/components/aicanvas/glass-modal';
import TextBlurReveal from '@/components/aicanvas/text-blur-reveal';
import GlassCard from '@/components/aicanvas/glass-card';
import GlassTags from '@/components/aicanvas/glass-tags';
import GlassTabBar from '@/components/aicanvas/glass-tab-bar';
import GlassNavbar from '@/components/aicanvas/glass-navbar';
import NoiseField from '@/components/aicanvas/noise-field';
import NeonClock from '@/components/aicanvas/neon-clock';
import GlitchButton from '@/components/aicanvas/glitch-button';
import FlipCalendar from '@/components/aicanvas/flip-calendar';
import BlindPullToggle from '@/components/aicanvas/blind-pull-toggle';
import TagaToggle from '@/components/aicanvas/taga-toggle';
import NoiseBg from '@/components/aicanvas/noise-bg';
import GlassUserMenu from '@/components/aicanvas/glass-user-menu';
import GlassSidebar from '@/components/aicanvas/glass-sidebar';
import GlassProgress from '@/components/aicanvas/glass-progress';
import TravelDeck from '@/components/aicanvas/traveldeck';
import { DirectionStepper } from '@/components/nova/direction-stepper';
import ParticleSphere from '@/components/aicanvas/particle-sphere';

/* The demo's own four rows, unchanged — including `gamil.com`, which is the
   typo-domain the card exists to flag and not one of mine. */
const BLOCKED_EMAILS = [
  { email: 'bad_actor+1@gamil.com', time: 'Aug 9 at 14:09' },
  { email: 'spammer123@mailor.com', time: 'Aug 10 at 11:23' },
  { email: 'fake+prmo@tempmail.com', time: 'Aug 11 at 09:45' },
  { email: 'bot@disposablemail.org', time: 'Aug 12 at 16:02' },
];

export function Imported3() {
  return (
    <Section label="Imported III">
      <SectionHeader eyebrow="44 · IMPORTED III" title="العَودةُ إلى الدفعةِ الأولى: ما بقيَ منها، وما تقولُه المُحدِّداتُ عن عددِه">
        الدفعةُ الثالثةُ أُتِمَّت خمسَ عشرةَ من خمسَ عشرة، فعادَ العملُ إلى <b>الثمانِ والعشرينَ الباقيةِ من الدفعةِ الأولى</b>. وأكثرُ ما في هذه الموجةِ سؤالٌ واحدٌ مُتكرِّر: <b>كم عنصرًا؟</b> — والجوابُ في كلِّ مرّةٍ في الـCSS لا في الوسمِ المفقود: في <code>nth-child</code>، أو في حسابِ <code>--i</code>، أو في مجموعِ شَرطِ التقطيع. <b>وفي واحدةٍ منها كان الجوابُ «تسعٌ لعشرةٍ»، وذاك قاعدةٌ لم تُكتَب.</b>
      </SectionHeader>

      <SpecList>
        <SpecRow name="أصغرُ رفعةٍ في السجلّ: ٩٩١ بايت تُسمّي سبعةَ أجزاءٍ ولا ترسمُ واحدًا" bare specimen={
          <div className="flex w-full flex-wrap items-center justify-center gap-12 rounded-2xl bg-[#eef2f6] px-6 py-12" dir="ltr">
            <SkyThemeToggle label="Night mode" />
            <PayIconsButton />
          </div>
        }>
          <b>كلُّ قاعدةٍ في مفتاحِ السماءِ من الشكلِ <code>#toggle:checked + svg #part</code></b>، والأجزاءُ سبعة: <code>#container</code> و<code>#patches</code> و<code>#stars</code> و<code>#button</code> و<code>#sun</code> و<code>#moon</code> و<code>#cloud</code>. <b>وما يفعلُه كلٌّ منها مُصرَّحٌ به</b>: السماءُ تُعتِم، والمِقبضُ ينزلقُ، والشمسُ تخبو والقمرُ يظهر، والسُّحبُ تذهبُ والنجومُ تأتي.
          <br /><br />
          <b>و<code>#patches</code> هي الدليل:</b> مذكورةٌ في قائمةِ الانتقالِ <b>ولا قاعدةَ حالةٍ لها إطلاقًا</b>. وجزءٌ يَنتقِلُ ولا يتغيّرُ أبدًا <b>لا بدَّ أن يكونَ ابنًا لشيءٍ يتغيّر</b> — فهي حُفَرُ القمرِ، تركبُ شفافيّتَه وذُكِرت في القائمةِ لتُسايِرَه في التّيسير. <b>والاستدلالُ نفسُه يضعُ الشمسَ والقمرَ داخلَ <code>#button</code></b>: لا تتحرّكانِ أبدًا، والمِقبضُ يتحرّك — <b>ووجهٌ يبقى وراءَ مِقبضٍ انزلقَ عنه خطأٌ</b>. فالـCSS يُسمّي الأجزاءَ، <b>والتعشيقُ هو ما لا يقولُه عنها</b>.
          <br /><br />
          <code>translate(28px, 2.333px)</code> — <b>ثمانيةٌ وعشرون أفقيًّا وثُلثُ بكسلٍ رأسيًّا</b>. والمُركَّبةُ الرأسيّةُ ليست تناظُرًا بل <b>أحدًا يُزيحُ المِقبضَ بعينِه ويُبقي الرقم</b>. والمُعرِّفاتُ الحرفيّةُ بقيت: <b>نسختانِ على صفحةٍ تُنتِجانِ مُعرِّفاتٍ مكرَّرة</b> — والقواعدُ سليمةٌ لأن styled-components يَحصُرُها في شجرتِها، <b>لكنّ المستندَ يصيرُ باطلًا</b>. مُعلَنٌ لا مُغيَّرٌ صامتًا، وفي العارضةِ نسخةٌ واحدة.
          <br /><br />
          <b>وزرُّ الدفعِ فيه مِفتاحُ إطفاءٍ يُنجيه أنه كُتِبَ أوّلًا:</b> <code>.pay-btn:hover .icon {'{'} animation: none {'}'}</code> كان سيُطفئُ حركةَ كلِّ أيقونةٍ في الزرّ — <b>وهو مكتوبٌ قبلَ القواعدِ الأربعِ التي تُعلِّقُ الحركات</b>. والتخصيصُ متساوٍ (زائفةٌ واحدةٌ وصنفانِ في كلٍّ)، <b>فيحسِمُ ترتيبُ المستند</b>، فتغلِبُ الأربعُ المتأخِّرة. <b>انقُلْ ذاك السطرَ إلى آخرِ الملفِّ فتتوقّفُ الأداةُ كلُّها</b> — ويجبُ قولُه لأنه يبدو بقيّةً مهجورة. <b>والدَّورةُ في الإطاراتِ لا في التأخيرات:</b> <code>iconRotate</code> مدّتُه ٢٫٥ ثانية <b>والأيقونةُ ظاهرةٌ من ٥٪ إلى ١٥٪ فقط</b> — أي ربعَ ثانيةٍ من كلِّ دورة. وأربعٌ بفواصلِ نصفِ ثانيةٍ تملأُ ثانيتَين من الدَّورة، <b>فيبقى نصفُ ثانيةٍ من العدمِ بالقصد</b>. و<code>visibility</code> مُحرَّكٌ مع <code>opacity</code> في كلِّ إطارٍ <b>وليس تكرارًا</b>: الأوّلُ لا يُستَبيَنُ بينَ القيمِ بل يَقفِزُ عند حدِّ الإطار، <b>فيُخرِجُ الأيقوناتَ المخفيّةَ من اختبارِ الإصابةِ لا من الرؤيةِ فقط</b>. خاصّيّتانِ لعملَين.
        </SpecRow>

        <SpecRow name="بطاقةٌ تقصُّ سِعرَها وزرَّيها، وحاشيتانِ مقطوعتانِ باليدِ لتتساوى كلمتانِ" bare specimen={
          <div className="flex w-full flex-wrap items-start justify-center gap-16 rounded-2xl bg-[#f6f7f9] px-6 pb-72 pt-8" dir="ltr">
            <FlexProductCard />
          </div>
        }>
          <b>القياساتُ تحسِمُ البنية:</b> <code>.price</code> عند <code>top: 9.6em</code>، و<code>.btn1</code> عند <code>14.8em</code>، و<code>.btn2</code> عند <code>15.5em</code> — داخلَ بطاقةٍ ارتفاعُها <code>7.5em</code> وعليها <code>overflow: hidden</code>. <b>فالسِّعرُ وكِلا الزرَّينِ مقصوصانِ تمامًا في السكون</b> — لا مُخفَيَينِ ولا شفّافَين: <b>خارجَ الصندوق</b>. والتمريرُ يُنمي البطاقةَ إلى <code>23em</code> فيَصِلان. <b>فالبطاقةُ إفصاحٌ حالتُه المُغلَقةُ قَصّ.</b>
          <br /><br />
          <b>و<code>.card:hover + .glasses</code> أخٌ <em>مُتاخِم</em></b>، فالنظّارتانِ <b>خارجَ</b> البطاقة — ولذلك تستطيعانِ أن تكبُرا فوقَ حدودِها — ثم تُجذَبانِ عليها بـ<code>top: -4em; left: 9.5em</code>. <b>فالمُركِّبُ يُملي الوسمَ والإزاحاتُ تنقُضُه.</b>
          <br /><br />
          <b>و<code>.btn1</code> حاشيتُه <code>6.9em</code> يمنةً ويسرةً و<code>.btn2</code> حاشيتُه <code>5.1em</code>:</b> زرّانِ بحاشيتَينِ مختلفتَين، <b>لأن «Buy» أقصرُ من «Add to Cart» وأرادَ صاحبُهما شريطَين بعَرضٍ واحد</b>. و٦٫٩ و٥٫١ ليستا من سُلَّم، <b>بل هما ما جعلَ الاثنَين يتساويان</b>.
          <br /><br />
          <b>و<code>rotateX(360deg)</code> بلا <code>perspective</code> دورةٌ كاملةٌ تنتهي حيثُ بدأت — وليست لاغيةً</b>، لأنها <b>تمرُّ بالتسعينَ حيثُ جيبُ التمامِ صفر</b>: فتنضغِطُ النظّارتانِ إلى لا شيءٍ ثم تعودان. <b>الإسقاطُ المتوازي نفسُه الذي جاء في زرِّ المستندات، مقصودًا هنا لا عَرَضًا.</b>
          <br /><br />
          <b>وإضافةٌ واحدةٌ هي الفرقُ بين أن يعملَ وألّا يعمل:</b> الزرّانِ عنصرانِ تفاعُليّانِ حقيقيّانِ يجلسانِ خارجَ قَصّ. <b>فيَنتقِلُ مستخدمُ لوحةِ المفاتيحِ إلى زرٍّ ليس على الشاشة، مرّتَين.</b> وهنا <b>أبناءٌ قابلونَ للتركيز</b>، فـ<code>:focus-within</code> هو الجوابُ الصادقُ لا <code>tabindex</code> — ويُطابِقُ كلَّ قاعدةِ تمريرٍ حرفًا بحرف.
        </SpecRow>

        <SpecRow name="ثلاثُ مُحمِّلاتٍ، وثلاثةُ أجوبةٍ عن سؤالِ «كم؟»" bare specimen={
          <div className="flex w-full flex-col items-center gap-14 py-12" dir="ltr">
            <div className="flex w-full flex-wrap items-center justify-center gap-16 rounded-2xl px-6 py-12" style={{ background: 'radial-gradient(120% 120% at 30% 10%, #221b3a 0%, #0b0a14 60%, #05050a 100%)' }}>
              <GeneratingRingLoader />
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-20 rounded-2xl bg-[#f1f1f1] px-6 py-12">
              <KeyboardLoader />
              <BallRingLoader />
              <KineticBadge />
            </div>
          </div>
        }>
          <b>حَلَقةُ «Generating» خلفيّتُها شفّافة، وكلُّ بكسلٍ فيها من ثلاثةِ ظلالٍ داخليّة</b> تتحرّكُ معًا: أبيضٌ ثم بنفسجيٌّ ثم أزرقٌ عميقٌ عند الصِّفر، وأبيضٌ ثم قِرمِزيٌّ ثم نيليٌّ عند النصف. <b>والدَّورانُ هو ما يَلطُخُها والظلالُ هي ما يُلوِّنُها</b>، ولا شيءَ آخرَ في الملفِّ يطلي شيئًا. <b>وانتهاءُ الدورةِ عند <code>450deg</code> لا <code>90deg</code> مقصود:</b> ثلاثُمئةٍ وستّون درجةَ سفرٍ في كلِّ دورة، <b>فالحلقةُ بلا وَصلٍ يَقطَع</b>. وعددُ الحروفِ من المُحدِّدات: <code>nth-child(1)</code> إلى <code>(10)</code>، <b>و«Generating» عشرةُ أحرف</b>. و<code>border-radius: 50ch</code> على الحرفِ <b>ميّت</b>: كتلةٌ سطريّةٌ من نصٍّ بلا خلفيّةٍ ولا حدٍّ — <b>فلا صندوقَ لنصفِ قطرٍ يُدوِّرَه</b>.
          <br /><br />
          <b>ومُحمِّلُ لوحةِ المفاتيحِ ثمانٍ من كتلِه الثلاثَ عشرةَ موجودةٌ سلفًا في هذا المستودع</b> — قِيست بالمقارنةِ المُطبَّعةِ مع <code>code-loader</code> من رفعةٍ أقدمَ بالخطِّ نفسِه: المسارُ والسيّارةُ والسَّمْكُ ٢٫٥ و<code>25 75</code> و<code>borderMove</code> كلُّها حرفًا بحرف. <b>الهيكلُ نفسُه، والخمسُ الجديدةُ تستبدِلُ ما كان يرسمُه بلوحةِ مفاتيحَ تكتُب.</b> و<code>25 + 75 = 100</code> والإزاحةُ تقطعُ مئةً، <b>فـ<code>pathLength={'{'}100{'}'}</code></b>.
          <br /><br />
          <b>والكتابةُ ليست التعاقُبَ الذي تبدو عليه.</b> ثلاثُ قواعدَ تتراكب — <code>2n</code> و<code>3n</code> و<code>4n</code> — <b>وتخصيصُها متساوٍ، فيحسِمُ ترتيبُ المستند</b>. وباحتسابِها لاثنَي عشرَ مفتاحًا: المفتاحُ الرابعُ يُطابِقُ <code>2n</code> و<code>4n</code> <b>فتغلِبُ الأخيرةُ (0.45s)</b>؛ والسادسُ يُطابِقُ <code>2n</code> و<code>3n</code> <b>فتغلِبُ الثانيةُ (0.3s)</b>؛ والثانيَ عشرَ يُطابِقُ الثلاثَ <b>فيأخذُ 0.45s</b>. <b>فالمفاتيحُ لا تتموَّجُ من اليسارِ إلى اليمين، بل تشتعِلُ في أربعِ مجموعاتٍ مبثوثةٍ على اللوحة — وذاك ما يجعلُها تُقرأُ كتابةً لا موجة.</b> <b>والنمطُ حادثةُ حسابٍ صادَفَ أن تبدوَ صحيحة.</b> وعددُ المفاتيحِ هو الشيءُ الوحيدُ الذي لا يُثبِّتُه الـCSS: <code>4n</code> يحتاجُ أربعةً على الأقلِّ ولا شيءَ يَحُدُّه، <b>واثنا عشرَ اختيارٌ لأنه أصغرُ عددٍ يُشغِّلُ التراكُبَاتِ الثلاثةَ كلَّها</b> — <b>مُصرَّحٌ به لأنه اختيارٌ لا قراءة</b>.
          <br /><br />
          <b>وحَلَقةُ الكُرات: تسعُ دَورانات، وعشرُ كُرات.</b> <code>.loader:nth-child(2..9)</code> من ٢٠ إلى ١٦٠ بخُطوةِ عشرين، والأوّلُ بلا قاعدةٍ فهو عضوُ الصِّفر: <b>تسعةُ مساراتٍ تمتدُّ صفرًا إلى ١٦٠</b>. <b>وذاك نصفُ دورةٍ فقط وهو صحيح</b>: كلُّ مسارٍ <b>قضيبٌ ١٣em، أي قُطرٌ لا نصفَ قطر</b> — فتسعةُ أقطارٍ بينها عشرونَ درجةً تُغطّي كلَّ الجهاتِ سلفًا، <b>وتدويرُ واحدٍ إلى ١٨٠ يُعيدُه فوقَ الأوّل</b>. و<code>.loaderA</code> تأخُذُ القواعدَ الثمانيَ عينَها — <b>والكُراتُ <code>ball0</code> إلى <code>ball9</code>: عشر</b>. <b>فالحاويةُ العاشرةُ بلا <code>nth-child(10)</code>، فتجلسُ غيرَ مُدارةٍ إلى جانبِ الأولى</b>: كُرَتانِ على القُطرِ نفسِه تفرِقُ بينهما ١٫٨ ثانيةٍ في الطَّور. <b>ويُقرأُ حسنًا، وهو على الأغلبِ قاعدةٌ لم تُكتَب لا تصميم.</b> بقيَ كما سُلِّم <b>ومُسمًّى</b>، لأن «تسعَ دَوراناتٍ لعشرِ كُرات» ممّا يُجبَرُ صامتًا.
          <br /><br />
          <b>وشارةُ الدَّورانِ لا تُسرِّعُ عند التمريرِ بل تَقفِز:</b> <code>spinSlow 10s</code> تصيرُ <code>spinSlow 3s</code> — <b>الاسمُ نفسُه بمدّةٍ جديدة</b>. وتغييرُ مدّةِ حركةٍ جاريةٍ <b>لا يُعيدُها ولا يُيسِّرُ إلى السرعةِ الجديدة</b>: تُبقي الحركةُ <b>زمنَها</b> الحاليَّ وتُعيدُ حسابَ التقدُّمِ على المدّةِ الجديدة. <b>ففي الثانيةِ الخامسةِ من عَشرٍ تكونُ الشارةُ عند ١٨٠ درجة، ولحظةَ صيرورةِ المدّةِ ثلاثًا تُقرأُ الخمسُ نفسُها ١٫٦٧ دورةٍ فتقفِزُ إلى ٢٤٠ وتُكمِلُ أسرع</b>. <b>فالسرعةُ حقيقيّةٌ والتسليمُ الناعمُ ليس.</b> وذاك من صاحبِه فبقي — <b>لكنه ممّا «يُصلِحُه» من يفترضُ أن انتقالًا نُسِي، فسُمِّي</b>.
          <br /><br />
          <b>وثلاثُ رفعاتٍ حتى الآنَ تُسمّي خطوطًا لا يُحمِّلُها هذا المستودع</b> — Inter وClash Display وOswald — <b>وثلاثتُها تصِلُ عبرَ <code>@import</code> إلى مُضيفِ خطوط</b>، وجِسرُ هذا المستودعِ يُصرِّحُ أنه <b>لا يُدخِلُ مُضيفَ خطوطٍ خارجيًّا</b>. فالاستيرادُ لم يُحمَل والأسماءُ تسقُطُ إلى بديلِها. <b>وOswald موجودٌ حِزمةً محلّيّةً، وإضافتُه سطرُ تثبيتٍ وسطرُ استيراد — لكنه قرارُ تبعيّةٍ فهو للمالك</b>، لا شيءٌ يُدَسُّ داخلَ مكوّن.
        </SpecRow>
        <SpecRow name="الموجةُ العاشرة: أربعةُ أرقامٍ في شَرطِ تقطيعٍ كلُّها قياس، ولوحةٌ أرقامُها لا تتّفق" bare specimen={
          <div className="flex w-full flex-col items-center gap-14 py-12" dir="ltr">
            <div className="flex w-full flex-wrap items-center justify-center gap-16 rounded-2xl bg-[#23262c] px-6 py-14">
              <NeonPowerSwitch label="Power" />
              <LaunchingLoader />
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-16 rounded-2xl bg-[#0e0e10] px-6 py-4">
              <SystemProgressPanel />
            </div>
            <div className="flex w-full flex-wrap items-start justify-center gap-16 rounded-2xl bg-[#cfc7b4] px-6 pb-40 pt-8">
              <CouponTearOff />
            </div>
          </div>
        }>
          <b>مفتاحُ النيون لا يرسمُ شكلَيه — يُصرِّحُ بطولَيهما إلى منزلتَين عشريّتَين، والأرقامُ مضبوطة:</b>
          <br /><br />
          <code>0 104.26 0</code> ← <code>52.13 0 52.13</code> · و<code>52.13 × 2 = 104.26</code> بالضبط.
          <br />
          <code>0 90.32 0 54.19</code> ← <code>45.16 0 45.16 54.19</code> · و<code>45.16 × 2 = 90.32</code> بالضبط.
          <br /><br />
          <b>فحالةُ الإطفاءِ في كلٍّ منهما فُرجةٌ واحدةٌ بطولِ الشكلِ كلِّه — لا شيءَ مرسوم — وحالةُ الإشعالِ شَرطتانِ نصفُ كلٍّ، تتلاقيانِ في الوسط.</b> فالنيونُ لا يخبو ولا يَكنِس: <b>ينمو إلى الداخلِ من الطرفَين معًا</b>، ولذلك الانتقالُ على <code>stroke-dasharray</code> لا على الشفافيّة.
          <br /><br />
          <b>والقيمةُ الرابعةُ هي التي تُفصِحُ عن الهندسة:</b> <code>54.19</code> ذَيلٌ ثابتٌ في الحالتَين، فالمرسومُ <code>90.32</code> من <code>90.32 + 54.19 = 144.51</code> — <b>خمسةُ أثمان، أي ٢٢٥ درجة</b>. و<code>144.51</code> مُحيطًا تعني نصفَ قطرٍ <b><code>22.999</code></b>. <b>فصاحبُ الكودِ حسبَ دائرةً نصفُ قطرِها ٢٣ وكتبَ مُحيطَها.</b> فنيونُ المِقبضِ <b>قوسٌ ٢٢٥ درجةً من دائرةٍ <code>r = 23</code></b>، ولا يحتاجُ <code>pathLength</code> لأن الهندسةَ الحقيقيّةَ تُستَرَدّ. <b>أمّا مسارُ القاعدةِ فلا يُستَرَدُّ كذلك</b> — <code>104.26</code> لا تُطابِقُ مُحيطَ أيِّ صندوقٍ في الملفّ — فرُسِمَ شكلًا و<b>نُظِّمَ بـ<code>pathLength={'{'}104.26{'}'}</code></b>. <b>وذاك مُصرَّحٌ به لأنه الموضعُ الوحيدُ هنا الذي أُعلِنَ فيه رقمٌ ولم يُعلَنِ الشكلُ وراءَه.</b>
          <br /><br />
          <b>و<code>steps(1, end)</code> على شفافيّةِ القوسِ ذَهابًا و<code>steps(1, start)</code> عَودةً تفصيلةٌ تُحفَظ:</b> خطوةٌ واحدةٌ في النهايةِ تُبقي القوسَ مرئيًّا طولَ الانسحابِ كلِّه ويختفي في اللحظةِ الأخيرة، وخطوةٌ في البدايةِ تُظهِرُه فورًا ثم يُرسَم. <b>فالشَّرطُ يتحرّكُ ناعمًا تحتَ شفافيّةٍ تَقفِز.</b> و<code>.switch__text</code> — <b>صاحبُ الكودِ شحنَ مخفيَّه البصريَّ بنفسِه</b>: أوّلُ رفعةٍ في هذا السجلِّ تأتي باسمٍ مُعلَنٍ صحيحٍ سلفًا، <b>فلم يُضَفْ له شيء</b>.
          <br /><br />
          <b>ومُحمِّلُ «LAUNCHING» شقيقُ مُحمِّلِ «Generating»:</b> <b>إحدى عشرةَ</b> من كتلِه الثمانِ والعشرينَ <b>مُطابِقةٌ حرفًا بحرف</b> — الغلافُ والقرصُ الدائرُ وقواعدُ التأخيرِ العشرُ وأساسُ الحرف. والفرقُ لوحةُ الألوانِ وتمويهٌ على كلِّ حرفٍ وظلُّ نصٍّ في الإطاراتِ وسبعُ نجوم. <b>والعددُ زائدٌ بواحد:</b> عشرُ قواعدِ تأخيرٍ لكلمةٍ <b>تسعةُ أحرف</b>. <b>والعاشرةُ لا تُطابِقُ شيئًا</b> — الشكلُ نفسُه الذي جاء في طابعةِ الفواتير (اثنتا عشرةَ لأحدَ عشرَ)، في رفعةٍ لا صلةَ لها بها: <b>سِلسلةُ تأخيرٍ كُتِبت لرقمٍ مستديرٍ لا للكلمة</b>. و<b>نجومُه تُثبِتُ نقطةً</b>: كلٌّ منها <code>transform: translate(...)</code> <b>و<code>scale</code> منفصلة</b> — خاصّيّتانِ لا تحويلٌ مركَّب، ولذلك <b>لا يمحو المقياسُ الموضع</b>؛ ولو كُتِبت <code>transform: translate(...) scale(...)</code> لَابتلعَ إطارُ الحركةِ الاثنَين. <b>وهو نقيضُ ما وقعَ في نقطةِ زرِّ «متاحٌ لمشروع» حيثُ أكلت الحركةُ الموضع.</b>
          <br /><br />
          <b>ولوحةُ التقدُّمِ أوّلُ رفعةٍ في السجلِّ كلِّه تأتي بكتلةِ حركةٍ مخفَّفةٍ من عندِها</b> — تُسمّي حركاتِها اللانهائيّةَ الثلاثَ وتُطفئُها — <b>وبنقطةِ توقُّفٍ عند ٦٠٠ بكسل تُعيدُ شبكتَها من ثلاثةِ أعمدةٍ إلى اثنَين</b>. وكلُّ رفعةٍ أُخرى تركت الأمرَين للمُستهلِك. <b>فلم يُضَف لأيٍّ منهما شيء.</b>
          <br /><br />
          <b>ثم حسابُها، وهو نقيضُ حسابِ طابعةِ الفواتير:</b> تلك كانت مضبوطةً إلى القِرش، <b>وهذه ليست</b>. <code>13 + 352 = 365</code>، و<code>13 / 365 = 3.5616%</code> — <b>واللوحةُ تطبعُ <code>4.00%</code> و<code>.progress-line</code> عَرضُه <code>4%</code></b>. وأربعةٌ في المئةِ من ٣٦٥ هي <b>14.6</b> يومًا. <b>فالشريطُ والنسبةُ يتّفقانِ معًا ويخالفانِ عددَ الأيّامِ بـ٠٫٤٤ من نقطة.</b> نُقِلت كما سُلِّمت، <b>فهي أرقامُ صاحبِها وأحدُها خاطئ — وأيُّها هو سؤالٌ لا يُجيبُه إلا هو</b>. و<code>.progress-particles</code> <b>ليست عناصرَ إطلاقًا</b>: تدرُّجٌ شعاعيٌّ واحدٌ مُبلَّطٌ <code>8px</code> و<code>background-position</code> يتحرّكُ من صفرٍ إلى مئةٍ في عشرينَ ثانية — <b>عنصرٌ واحدٌ وتدرُّجٌ واحدٌ ولا وسم</b>.
          <br /><br />
          <b>وحافّةُ القسيمةِ المُخرَّمةُ أطرفُ قناعٍ في السجلّ:</b> تدرُّجٌ <b>مخروطيٌّ</b> شفّافٌ من ١٣٥ إلى ٢٢٤٫٥ درجةً ومُعتِمٌ فيما بقي، <b>مُبلَّطٌ <code>5px × 5px</code></b> على خطِّ القَطع. <b>وإسفينٌ شفّافٌ بزاويةِ تسعينَ يُشيرُ إلى الأعلى، مربَّعاتُه الخمسُ مكرَّرةً، صفٌّ من الثُّقوبِ المثلَّثة.</b> فالحافّةُ ليست صورةً ولا حدًّا ولا تدرُّجًا خطّيًّا مكرَّرًا: <b>تدرُّجٌ مخروطيٌّ واحدٌ مُبلَّطٌ نحوَ أربعٍ وأربعينَ مرّةً على ورقةٍ ٢٠٩ بكسل</b>. <b>وخُطواتُ نصفِ الدرجةِ (١٣٥ إلى ١٣٥٫٥) ضبطُ تنعيمِ الحواف</b> — والوقفةُ الحادّةُ كانت ستَرتَجِف. و<code>.cutter</code> يستخدمُ البناءَ عينَه بـ<code>mix-blend-mode: screen</code> ليطلي حافّةً مُضاءةً على الثُّقوبِ نفسِها، <b>فتُقرأُ ورقًا مقطوعًا لا شكلًا نُهِشَ منه</b>.
          <br /><br />
          <b>والشَّدُّ على مرحلتَين، وثانيتُهما تركيز:</b> <code>:hover</code> يجذبُ الورقةَ ٤٦ بكسل، و<code>:focus</code> يجذبُها ٨٤ ويُخفي الرمز. <b>فالتمريرُ يقطعُها جزئيًّا والتنشيطُ يُخرِجُها</b>. وذاك تدرُّجٌ مقصودٌ <b>يشترطُ أن تكونَ الورقةُ قابلةً للتركيز</b> — ولذلك <code>border: none</code> و<code>cursor: pointer</code> عليها: <b>هي زِرٌّ، والـCSS يقولُ ذلك بلا أن يقولَه</b>. و<code>:has(.paper:hover) .sec {'{'} animation-iteration-count: 1 {'}'}</code> — <b>الاهتزازُ لا يتوقّفُ ميّتًا بل يُتِمُّ دورتَه الحاليّةَ ثم يقف</b>: تعيينُ العددِ لا حالةِ التشغيلِ هو ما يجعلُه <b>يَحُلُّ لا يَجمُد</b>.
        </SpecRow>

        <SpecRow name="الموجةُ الحاديةَ عشرة: سماءٌ ضِعفُ نافذتِها تُقلَبُ رأسًا على عَقِب، وعجلةٌ مِحورُها خارجَ الشاشة" bare specimen={
          <div className="flex w-full flex-col items-center gap-14 py-12" dir="ltr">
            <div className="flex w-full flex-wrap items-center justify-center gap-16 rounded-2xl bg-[#eaf1f7] px-6 py-14">
              <LandscapeThemeSwitch label="Night mode" />
              <AddressCopyButton />
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-16 rounded-2xl bg-[#08080c] px-6 py-14">
              <WheelSelector label="Tier" />
              <SolarCollapseLoader />
              <NestedCubeScene />
            </div>
          </div>
        }>
          <b>أذكى ميكانيكيّةٍ في هذه الدفعةِ مُصرَّحٌ بها في تصريحَين:</b> <code>.sky-vault {'{'} height: 200% {'}'}</code> و<code>input:checked … .sky-vault {'{'} transform: rotate(180deg) {'}'}</code>. <b>فالقُبّةُ ضِعفُ ارتفاعِ القُرصِ التسعينَ</b>، والشمسُ عند <code>top: 12px</code> والقمرُ عند <code>bottom: 12px</code> — <b>فالشمسُ في النصفِ المرئيِّ والقمرُ مُعلَّقٌ في النصفِ الذي تحتَ الإطار، خارجَ النظر</b>. والتأشيرُ لا يُخبي واحدًا ويُظهِرُ الآخر: <b>يُدوِّرُ السماءَ كلَّها نصفَ دورةٍ، فيصعدُ القمرُ إلى النافذةِ والشمسُ تغيبُ منها</b>. تحويلٌ واحد، جسدان، ميكانيكا سماويّةٌ حقيقيّة. <b>والقمرُ يحملُ <code>rotate(180deg)</code> من عندِه، وتلك التفصيلةُ هي دليلُ القراءة</b>: بعدَ أن تدورَ القُبّةُ يكونُ مقلوبًا، <b>فهو مُدارٌ سلفًا ليصعدَ قائمًا</b>. ولا شيءَ آخرَ في الملفِّ يحتاجُ ذلك، <b>لأن لا شيءَ آخرَ يعبُرُ الأُفُق</b>.
          <br /><br />
          <b>وأعدادُه كلُّها في أسماءِ أصنافِه:</b> ثلاثُ حُفَرٍ، وسُحابتان، وأربعُ نجوم، وجبلان، وثلاثُ أشجار. <b>وكلُّ جبلٍ حيلةُ المثلَّثِ بالحدود</b> — <code>border-left/right: 24px solid transparent</code> و<code>border-bottom: 42px solid</code> — <b>ولذلك انتقالُ الليلِ يُحرِّكُ <code>border-bottom-color</code> لا <code>background</code></b>: مثلَّثٌ من حدودٍ لا خلفيّةَ له تُغيَّر. والأشجارُ <code>clip-path: polygon()</code> بأحدَ عشرَ نقطةً لكلٍّ منها، <b>والثالثةُ تُعطى تدرُّجَها الأدكنَ و<code>z-index: 5</code></b> — شجرةٌ أمامَ اثنتَين، من تجاوُزٍ واحد.
          <br /><br />
          <b>وعجلةُ الاختيارِ مِحورُها خارجَ اللوحة:</b> <code>transform-origin: 280px center</code> على لافتةٍ عند <code>left: 40px</code> داخلَ لوحٍ عَرضُه ٢٠٠ <b>يضعُ المِحورَ ٢٨٠ بكسل يمينَ صندوقِ اللافتةِ نفسِه — خارجَ اللوحِ تمامًا</b>. فاللافتاتُ لا تدورُ في مكانِها بل <b>تتأرجَحُ على قوسٍ مركزُه خارجَ الشاشة</b>، وذاك ما يجعلُ ثلاثةَ سطورٍ تُقرأُ <b>ثلاثةَ مواضعَ على عجلةٍ واحدةٍ كبيرة</b> لا ثلاثَ كلماتٍ تدور. <b>خاصّيّةٌ واحدةٌ وهي الوهمُ كلُّه.</b>
          <br /><br />
          <b>وهدفُ اللمسِ هو أطرفُ ما فيها:</b> <code>.next-trigger</code> غِطاءٌ كاملٌ عند <code>z-index: -1</code> — لا يُبلَغ. ثم <code>:has(#value-N:checked) #trigger-for-N {'{'} z-index: 100 {'}'}</code>: <b>واحدٌ فقط يعلو في أيِّ لحظةٍ، وهو الذي يخصُّ القيمةَ الحاليّة</b>. وكلُّ مُشغِّلٍ لافتةٌ تُشيرُ إلى <b>القيمةِ التالية</b>، فلمسةٌ في أيِّ موضعٍ <b>تُقدِّمُ العجلةَ خُطوةً وتُسلِّمُ الطبقةَ العُلوى للمُشغِّلِ التالي</b>. <b>مِفتاحٌ دوّارٌ بثلاثةِ مواضعَ، بلا سكربت، من ثلاثِ مُبادلاتِ <code>z-index</code>.</b> و<code>display: none</code> على مُدخَلاتِه — <b>الثامنةُ في هذا السجلّ</b>.
          <br /><br />
          <b>ونظامُ الانهيارِ الشمسيُّ مشهدانِ في حلقةٍ رُباعيّةِ الثواني، والقطعُ بينهما بتصغيرِ كلِّ شيءٍ إلى الصِّفر:</b> لا خبوَ ولا شفافيّة — <b>الشمسُ والمداراتُ الثلاثةُ والنجمُ كلُّها تُحرِّكُ عَرضَها وارتفاعَها إلى صفرٍ عند علامةِ ٥٠٪ والثقبُ الأسودُ وقُرصاه ينمُوانِ من الصِّفرِ في اللحظةِ عينِها</b>. فتغييرُ المشهدِ <b>انهيار</b>: الأوّلُ يَنطوي على نفسِه والثاني يخرُجُ من النقطةِ ذاتِها. <b>والمداراتُ الثلاثةُ لا تدورُ بالقدرِ نفسِه:</b> <code>360deg</code> و<code>250deg</code> و<code>170deg</code> في الأربعينَ في المئةِ عينِها — <b>فتخرُجُ الكواكبُ الثلاثةُ من الطَّورِ عيانًا</b>، اختلافُ دورةٍ مُعبَّرًا عنه بثلاثةِ أرقامٍ لا ثلاثِ مُدَد. <b>وقُرصُ التراكُمِ عنصرانِ وقَصّتان:</b> النصفُ الأسفلُ من حَلَقةٍ والنصفُ الأعلى من أُخرى، <b>بميلَينِ مختلفَين (٧٠ و٥٥ درجة) ولونَين مختلفَين</b> — <b>وهكذا تُرسَمُ حَلَقةٌ تمرُّ أمامَ كُرةٍ وخلفَها بعنصرَين مسطَّحَين</b>: القريبُ هو المُضيءُ والبعيدُ هو المُعتِم، وفرقُ الخمسةَ عشرَ درجةً يمنعُهما من الالتقاءِ على خطٍّ مستقيم. و<code>#planet</code> يُحرِّكُ <code>z-index</code> من ١ إلى ٠ عند ٧١٪ <b>فيمرُّ خلفَ الثقبِ في منتصفِ قوسِه</b> — والـ<code>z-index</code> يُحرَّكُ عددًا صحيحًا <b>فيَقفِزُ ولا يَستَبين، وهو بالضبط ما يحتاجُه الحَجْب</b>.
          <br /><br />
          <b>وزرُّ نسخِ العنوانِ مَسحُه من تحريكِ <code>inset</code> لا من تحويلٍ ولا قَصّ:</b> <code>inset: 0 50%</code> صندوقٌ منطوٍ إلى خطٍّ رأسيٍّ في الوسط، و<code>inset: 0 0%</code> الصندوقُ كاملًا. <b>فالإطارُ لا يتمدّدُ ولا يُقَصّ — حافّتاه تُحرَّكانِ متباعِدَتَين، فيبقى الحدُّ بكسلًا واحدًا طولَ الطريق</b> بدلَ أن يَغلُظَ كما كان <code>scaleX</code> سيفعل. <b>ولذلك <code>inset</code> لا <code>transform</code>: حدٌّ مُمدَّدٌ حدٌّ غليظ.</b> <b>وخبوُه ليس خبوًا:</b> <code>txt-in</code> هو <code>90% {'{'} opacity: 0 {'}'} 100% {'{'} opacity: 1 {'}'}</code> على نصفِ ثانية — <b>فاللافتةُ الداخلةُ خفيّةٌ ٤٥٠ مِلّي ثم تظهرُ في الخمسينَ الأخيرة</b>. تُقرأُ منحنًى فتبدو خبوًا؛ <b>وتُقاسُ فتكونُ قطعًا بانتظارٍ طويلٍ أمامَه</b>. <b>ورسالةُ التأكيدِ في الـCSS لا في الوسم:</b> <code>content: "Address copied"</code> عند <code>z-index: -1</code> بتمويهِ ١٦ — <b>كلمةٌ مموَّهةٌ خلفَ الزرِّ تَحِدُّ وهي تصعَد</b>. <b>وذاك السالبُ رابعُ طبقةٍ في هذا السجلِّ تهرُبُ من حاويتِها</b>: الزرُّ <code>position: absolute</code> والغلافُ <code>relative</code> <b>وكلاهما بـ<code>z-index: auto</code>، فلا واحدٌ منهما يُنشئُ سياقَ تراصُف</b>.
          <br /><br />
          <b>ومشهدُ المكعّبَين فيه أربعةُ تأخيراتٍ سالبةٍ تُشغِّلُ حركةً واحدةً على أربعةِ وجوهٍ بأربعةِ أطوار:</b> <code>0</code> و<code>-0.75</code> و<code>-0.5</code> و<code>-0.25</code> من المدّة. <b>والتأخيرُ السالبُ لا يَنتظِر — يبدأُ الحركةَ وهي في منتصفِها سلفًا</b>. فقائمةُ إطاراتٍ واحدةٌ تجري على أربعةِ وجوهٍ بأطوارٍ تفرِقُ رُبعًا، <b>فيسافرُ التمويهُ حولَ المكعّب</b>. وأربعةُ تأخيراتٍ موجبةٍ كانت ستُموِّهَ الأوّلَ ثم الثاني ثم فَراغًا؛ <b>والسالبةُ تجعلُه متّصلًا من الإطارِ الأوّل</b>. و<code>face-top</code> و<code>face-bottom</code> <code>animation: none</code> — <b>فالتمويهُ يطوفُ الجوانبَ وحدَها، إذ مكعّبٌ مرئيٌّ من أعلاه لا أُفُقَ فيه ليُعبَر</b>. <b>و<code>clamp()</code> حاجزُ صاحبِه وقد وثَّقَه:</b> كلُّ خاصّيّةٍ قابلةٍ للضبطِ تُستعمَلُ داخلَ <code>clamp</code> <b>والتعليقُ يُعطي المجال</b> — فالمَقابضُ لا تُدارُ إلى مشهدٍ مكسور. <b>وذاك نادرٌ في هذا السجلِّ بما يكفي ليُسمّى:</b> أكثرُ الرفعاتِ تقرأُ خاصّيّةً خامًا وتثِقُ بالمُستهلِك.
        </SpecRow>

        <SpecRow name="زائفةٌ واحدةٌ لعملَين، وسالبٌ خامسٌ يهرُبُ في اللحظةِ التي يُرى فيها" bare specimen={
          <div className="flex w-full flex-col items-center gap-10 py-8" dir="ltr">
            <div className="flex w-full flex-wrap items-center justify-center gap-16 rounded-2xl bg-[#f2f3f5] px-6 py-14">
              <BrutalMarqueeLink />
              <PrintstreamSidebar />
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-16 rounded-2xl bg-[#0e0f0e] px-6 py-14">
              <PerspectiveBatteryCard />
              <GalaxySpaceButton />
            </div>
          </div>
        }>
          <b>أَبيَنُ عيبٍ في هذه الموجةِ اسمُه واحدٌ مكتوبٌ مرّتَين:</b> الشريطُ الجانبيُّ يكتبُ <code>.vtab.active::after</code> شريطًا رماديًّا عَرضُه ٣ بكسل على الحافّة، <b>ثم يكتبُ <code>.vtab::after</code> مرّةً أُخرى في الملفِّ نفسِه</b> لمَسحةِ تدرُّجٍ مخروطيٍّ مموَّهةٍ عند <code>opacity: 0</code>. <b>وللعنصرِ زائفةٌ واحدةٌ لا اثنتان</b> — فيَدمِجُ التتالي التصريحَينِ تصريحًا تصريحًا: الهندسةُ من قاعدةِ <code>.active</code> الأخصّ، <b>و<code>opacity: 0</code> و<code>filter: blur(16px)</code> مُصرَّحانِ في القاعدةِ الأساسِ وحدَها فلا يُنقُضهما شيء</b>. <b>فشريطُ التبويبِ النشطِ لا يُرسَمُ أبدًا</b> — قِيسَ على الصفحةِ لا استُنتِج. وحُمِلَ كما هو: النشاطُ ما زالَ محمولًا على الخلفيّةِ واللونِ ولونِ الحدّ <b>وثلاثتُها تُرسَم</b>، والعلاجُ سطرٌ واحدٌ (<code>opacity: 1; filter: none</code>) وهو للمالك.
          <br /><br />
          <b>وزرُّ الفضاءِ ستٌّ وعشرونَ نجمةً من عنصرَين:</b> <code>.galaxy::before</code> فيه اثنتا عشرةَ إزاحةً في <code>box-shadow</code> و<code>::after</code> فيه أربعَ عشرة، <b>ونقطةٌ واحدةٌ ٢×٢ تُكرِّرُ نفسَها بالظلال</b>. وكلاهما <code>z-index: -1</code> — <b>وهذه دعوًى لي ماتت في القياسِ الذي كان سيُثبِتُها</b>. القراءةُ الأولى: خامسُ سالبٍ يهرُب، وأوّلُ واحدٍ هروبُه <em>مشروط</em>، إذ <code>opacity: var(--active)</code> يُنشئُ السياقَ <b>فقط ما دامَ أقلَّ من واحد — أي فقط حينَ تكونُ النجومُ غيرَ مرئيّة</b>؛ فوُضِعَ <code>isolation: isolate</code> علاجًا. <b>وثلاثُ صُوَرٍ للزرِّ نفسِه، والنجومُ مُظهَرةٌ قسرًا، حسمَتِ الأمر:</b>
          <br />
          <code>isolation: isolate → 8701a6e4</code> · <code>isolation: auto → 8701a6e4</code> · <code>translate: none → 770320c0</code>
          <br />
          <b>فالتصريحُ لا يُغيّرُ بايتًا واحدًا، والتغييرُ يظهرُ حينَ يُنزَعُ <code>translate</code>.</b> و<code>.galaxy</code> يُصرِّحُ <code>translate: -50% -50%</code> ليتوسَّط، <b>و<code>translate</code> إحدى خاصّيّاتِ التحويلِ المُفرَدة، والعنصرُ المُحوَّلُ سياقُ تراصُفٍ</b> — فهو سياقٌ منذ البداية، <b>بلا شرطٍ ولا علاقةَ للشفافيّةِ به. والنجومُ لم تهرُبْ قطّ.</b> فحُذِفَ السطرُ: <b>مُخالفةٌ للرفعةِ بلا أثرٍ مَقيس، والرفعةُ كانت مُحِقّةً بدونِه</b>. <b>والخاصّيّةُ عينُها تُجيبُ اللغزَ الآخرَ في الملفّ</b>: <code>translate</code> على <code>.text</code> هو ما يجعلُ النسبةَ فيه تُحسَبُ على اللافتة. <b>كلمةٌ واحدةٌ للتوسيطِ مرّتَين، تحسِمُ في صَمتٍ أمرَين لا يُقرَأُ أنها تحسِمُهما.</b>
          <br /><br />
          <b>وحالتُه كلُّها رقمٌ واحدٌ بين الصِّفرِ والواحد:</b> <code>--active</code> يُقرأُ في التشبُّعِ وفي الإضاءةِ وفي موضعِ التدرُّجِ وفي انتشارِ التوهُّجِ وفي <code>scale</code> وفي إضاءةِ اللافتةِ وفي شفافيّةِ المجرّة. <b>لا صنفَ حالةٍ ولا كتلةَ حالةٍ ثانية.</b> و<b>قاعدةٌ تبدو تسريبًا وهي لاغية</b>: <code>body:has(button:is(:hover, :focus-visible))</code> — <b>على <code>body</code>، تُطابِقُ أيَّ زرٍّ في المستند</b>، وفي عارضةٍ فيها مئاتُ الأزرارِ تُقرأُ تسريبًا؛ فحُصِرَت. <b>ثم أُعيدَت صيغةُ الرفعةِ في اختبارِ نَقضٍ وأُمِرَّ الفأرُ على تبويبٍ يبعُدُ ثلاثةَ أقسام:</b>
          <br />
          <code>المحصورة → --active 0</code> · <code>قاعدةُ الرفعة → --active 0</code>
          <br />
          <b>متطابقتان: القاعدةُ لا تبلُغُ الزرَّ في أيِّ صيغة</b>، لأن <code>.space-button</code> <b>يُصرِّحُ <code>--active: 0</code> على نفسِه، والخاصّيّةُ المُصرَّحةُ على العنصرِ تغلِبُ الموروثةَ من سلفِه</b>. <b>وهو درسُ <code>--bg</code> في الموجةِ السادسةِ مقروءًا بالمقلوب</b>: هناك ابتلعَتِ الخاصّيّةُ المحلّيّةُ بديلًا كان يُنتظَرُ وصولُه، <b>وهنا تبتلعُ نَقضًا من سلفٍ كان يُنتظَرُ وصولُه</b> — قاعدةُ تتالٍ واحدةٌ ونتيجتانِ متعاكستان. <b>فهدفُها الحيُّ الوحيدُ أخواها اللذانِ لا يُصرِّحانِ بها — والقاعدةُ التي تليها تُغطّيهما سلفًا. لاغيةٌ مرّتَين.</b>
          <br /><br />
          <b>ونجومُه الساقطتانِ ميّتتان بالقياس، والسببُ خاصّيّةٌ لا تُقرأُ تحويلًا:</b> <code>.text::before</code> و<code>::after</code> عند <code>top: -290%</code>، و<code>.text</code> عنصرُ مرونةٍ <code>position: static</code> — <b>فالقراءةُ البديهيّةُ أن النسبةَ تُحسَبُ على الزرّ، و<code>offsetParent</code> يُوافِقُ عليها ويقولُ «الزرّ»</b>. <b>والقياسُ يقولُ غيرَ ذلك</b>: <code>top</code> يُحسَبُ <code>-95.69px</code> — <b>وهي ٢٩٠٪ من ارتفاعِ اللافتةِ (٣٣) لا من ارتفاعِ الزرِّ (٧٣٫٣١، ونسبتُه ‎-212.61)</b>. و<code>.text</code> يحملُ <code>translate: 2% -6%</code>، <b>و<code>translate</code> تحويلٌ، والعنصرُ المُحوَّلُ كتلةٌ حاوية لأبنائِه المُطلَقةِ ولو كان <code>static</code></b> — <b>فيختلفُ <code>offsetParent</code> عن الكتلةِ الحاويةِ الحقيقيّة، والثانيةُ هي التي تُحاسِب</b>. والنتيجةُ قَصٌّ على الحالَين: اللافتةُ ١٨٫١٨ تحتَ حدِّ الزرّ، <b>فالنجمةُ ٧٧٫٥١ فوقَه، والزرُّ <code>overflow: hidden</code></b>. <b>ولا تصريحَ واحدًا يُنجيهما دونَ فتحِ قَصِّ الزرِّ</b>، فحُمِلَتا كما هما. <b>و<code>:active</code> على <code>.galaxy</code> أطرفُ ما فيه:</b> السمةُ تُضبَطُ على المُنشَّطِ <b>وأسلافِه</b>، و<code>.galaxy</code> أخٌ للافتةِ لا سلفٌ لها — <b>فيَشتعِلُ الدورانُ إن وقعَ الضغطُ على حاشيةِ الزرِّ ولا يشتعلُ إن وقعَ على الكلمة</b>. زرٌّ واحدٌ بحركتَي ضغطٍ بحسبِ موضعِ الإصبع.
          <br /><br />
          <b>ورابعُ بطاقاتِ البطاريّةِ في هذه الرفعاتِ أوّلُ واحدةٍ يبقى سالبُها في مكانِه:</b> <code>.s_path</code> عند <code>z-index: -1</code>، <b>و<code>.card-container</code> يُصرِّحُ <code>perspective: 1500px</code> — و<code>perspective</code> غيرُ <code>none</code> يُنشئُ سياقَ تراصُف</b>. فالتصريحُ الذي يُحرِّكُ الكاميرا هو نفسُه ما يمنعُ الخلفيّةَ من السقوطِ خلفَ الصفحة. <b>وميكانيكيّتُها ليست تحويلًا بل عَينًا:</b> المَنظورُ ينزلُ من <code>1500px</code> إلى <code>1000px</code> عندَ التمرير، <b>فالـ<code>rotateY(16deg)</code> نفسُه يُقرأُ دَورةً أقوى دونَ أن يتغيّرَ رقمُ الدَّوران</b>. ولا شيءَ آخرَ في هذه الرفعاتِ يُحرِّكُ الكاميرا. <b>وأشرطتُها الستّةُ ليست ٦٠ بكسلًا:</b> السِّلسِلةُ مَقيسةٌ لا مُقدَّرة: البطاقةُ ٣٠٠، وحدّاها ٢ يُبقيانِ صندوقَ حاشيةٍ ٢٩٦، و<code>.main_card</code> <code>width: 100%</code> منه، وحاشيتُه <code>2rem</code> تُبقي <b>٢٣٢</b>، والصفُّ يُورَثُها كاملة. <b>ستٌّ في ستّينَ وخمسُ فواصلَ ٣٫٢ تطلُبُ ٣٧٦ منها</b>، وعناصرُ المرونةِ تتقلَّصُ افتراضًا <b>فيُحسَبُ الشريطُ ٣٦٫٠١٥٦ — ويُرسَمُ ٢٥٫٢١، لأن الحاويةَ تُصغِّرُ كلَّ شيءٍ بـ٠٫٧</b>. <b>ثلاثةُ عروضٍ لتصريحٍ واحد: ٦٠ طُلِبت، و٣٦ حُسِبت، و٢٥ تُرى.</b> الستّونَ حدٌّ أعلى لا يتحقّقُ أبدًا، <b>ولذلك يُقرأُ الصفُّ مُنتظِمًا لا مقطوعًا</b>.
          <br /><br />
          <b>وأمّا زرُّ المَعرِضِ الوَحشيُّ فحسابُه في عددِ لافتاتِه:</b> <code>translateX(-50%)</code> على مسارٍ <code>width: max-content</code> <b>لا يكونُ حلقةً متّصلةً إلا إن كان نصفُه الثاني نسخةَ الأوّل</b> — فالنصفُ الواحدُ لا يُختار، <b>والـ٥٠٪ تفرِضُ نصفَين</b>، ووسمُ الرفعةِ يكتبُ «Let's Talk» أربعَ مرّاتٍ <b>فتلك اثنتانِ لكلِّ نصف</b>. و<code>gap: 1.25rem</code> مع <code>padding-right: 1.25rem</code> على النصفِ <b>هو ما يُخفي الحدَّ</b>: الفاصلُ داخلَ النصفِ والفاصلُ عبرَ الخَتمِ عشرونَ بكسلًا سواء. <b>وظلُّه هو مسافةُ سفرِه:</b> <code>6px 6px 0 0</code> مع <code>translate(6px, 6px)</code> و<code>box-shadow: none</code> — <b>الزرُّ ينزلُ على ظلِّه بعينِه</b>، والضغطُ يأتي بعدَ أن يَحُلَّ. <b>وخطُّه لا يُحمَّلُ لسببٍ في الرفعةِ نفسِها:</b> <code>@import url("s://api.fontshare.com/…")</code> — <b>المُخطَّطُ <code>s://</code> لا <code>https://</code></b>، فالاستيرادُ باطلٌ حتى حيثُ المُضيفُ متاح. <b>وثلاثُ إضافاتٍ: حلقةُ تركيزٍ (الرفعةُ تكتبُ <code>outline: none</code> على رابطٍ ولا تُعطي بديلًا)، و<code>:focus-visible</code> بجانبِ <code>:hover</code> في قاعدتَي المُبادلة (وإلّا فالوجهُ الثاني لا يُبلَغُ من لوحةِ المفاتيحِ إطلاقًا)، و<code>aria-hidden</code> على المسار</b> — لا على الرابطِ كلِّه: <b>الزينةُ تُخفى، والاسمُ لا يُخفى أبدًا</b>، وذاك درسُ الموجةِ التاسعة.
        </SpecRow>

        <SpecRow name="حرفٌ يُرسَمُ ثلاثَ مرّاتٍ، وثلاثيّةُ أبعادٍ مُعلَنةٌ أربعًا تُحسَبُ مُسطَّحة" bare specimen={
          <div className="flex w-full flex-col items-center gap-12 py-8" dir="ltr">
            <div className="flex w-full flex-wrap items-center justify-center gap-16 rounded-2xl bg-[#f3f0fa] px-6 py-16">
              <LiquidGlassLoader />
              <CharSwapJoinButton />
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-16 rounded-2xl bg-[#0b0b0d] px-6 py-16">
              <LavaHaloButton />
            </div>
          </div>
        }>
          <b>زرُّ الانضمامِ يرسمُ كلَّ حرفٍ ثلاثَ مرّات:</b> <code>span</code> شفّافُ اللونِ يحفظُ القياسَ ويقومُ بالتنسيق، و<code>::before</code> نسخةٌ داخلةٌ راكنةٌ فوقَه عند <code>translateY(-100%)</code> بشفافيّةِ صفر، و<code>::after</code> نسخةٌ خارجةٌ ساكنة. <b>والمُبادلةُ هما يتبادَلانِ الموضعَ والـ<code>span</code> مِسطرتُهما</b>. <b>ولذلك النصُّ في <code>data-label</code> لا في عُقدةِ نصّ:</b> السمةُ تُقرأُ من زائفتَين في وقتٍ واحد، <b>وعُقدةُ النصِّ لا تكونُ في موضعَين</b>.
          <br /><br />
          <b>والابنُ الخامسُ هو الفراغ:</b> <code>.char span:nth-child(5) {'{'} margin-left: 5px {'}'}</code> — قاعدةٌ واحدةٌ بلا قيدِ حالة. <b>والحالةُ الأولى «JoinToday» والثانيةُ «JoinNow»، وكلتاهما تنكسِرُ بعدَ أربعةِ أحرف</b> — فالخامسُ هو الـT هنا والـN هناك، <b>والخمسةُ بكسلات هي فراغُ الكلمةِ في الحالَين</b>. وذلك صحيحٌ فقط لأن اللافتتَين تتّفِقانِ في موضعِ الكَسر: <b>بدِّلْ «Join» بـ«Sign up» فتضعُ القاعدةُ فراغًا في وسطِ كلمة، بصَمت</b>.
          <br /><br />
          <b>والسهمُ يخرجُ من الزرِّ ويعودُ من الجهةِ الأُخرى:</b> <code>@keyframes arrow</code> — <code>translateX(60px)</code> وشفافيّةُ صفرٍ عند ٥٠٪، و<code>translateX(-200px)</code> وهو خفيٌّ عند ٥١٪، و<code>-128px</code> ظاهرًا عند المئة. <b>فواحدٌ في المئةِ من المدّةِ يُنجِزُ الانتقالَ الآنيَّ تحتَ غطاءِ الشفافيّة</b>: يطيرُ يمنةً، ويُقطَعُ إلى خارجِ اليسار، ويعودُ ماشيًا إلى مَركنِه. و<code>resetArrow</code> الرحلةُ نفسُها بلا خروج. <b>ودَشّتانِ مُصرَّحتان:</b> <code>150 480</code> فطولُ اللفّةِ ٤٨٠، و<code>60 60</code> فطولُها ٦٠ — <b>والدَّشّةُ تنقُصُ من ٦٠ إلى ٢ وهي تسير، وهكذا يصيرُ الخطُّ شرارة</b>. والرسمانِ مُستَنتَجان: <b>الـCSS يقولُ أينَ يجلسانِ وكم طولُهما، ولا يقولُ غيرَ ذلك</b>.
          <br /><br />
          <b>وقاعدةٌ لا تفعلُ شيئًا:</b> <code>.button:hover .words {'{'} opacity: 1 {'}'}</code> و<code>.words span {'{'} animation-play-state: running {'}'}</code> — <b>و<code>.words</code> لا قاعدةَ أساسٍ لها في الملفِّ إطلاقًا</b>، فلا شفافيّةَ تُرفَعُ منها — وقِيسَت في السكونِ واحدًا. <b>وأبناؤها لهم حركةٌ فعلًا</b> (<code>charAppear</code> من <code>.char.state-1 span</code>) <b>وقِيسَت <code>running</code> في السكون</b>، فتشغيلُها لا يُغيّرُ شيئًا كذلك. <b>لاغيتانِ لسببَين مختلفَين</b>، والقاعدةُ العاملةُ على العنصرِ نفسِه هي <code>:active {'{'} opacity: 0 {'}'}</code>. و<code>animation-play-state: paused</code> يظهرُ <b>أربعَ مرّاتٍ حالةَ أساس</b> — على مَسحةِ الإطارِ وعلى قُضبانِ السهمِ الثلاثة — و<code>:hover</code> يُشغِّلُها كلَّها في قاعدةٍ واحدة: <b>أرخصُ سبيلٍ إلى حركةِ تمريرٍ تبدأُ فورًا وتحفظُ طَورَها بينَ التمريرَين</b>.
          <br /><br />
          <b>والمُحمِّلُ الزجاجيُّ أوّلُ رفعةٍ في هذا السجلِّ تأتي بجوابِها عن تقليلِ الحركة — وهو جوابُ هذا المستودعِ عينُه:</b> <code>animation-duration: 0.01ms</code> و<code>animation-iteration-count: 1</code>، لا <code>animation: none</code>. <b>الأسلوبُ نفسُه الذي في <code>tokens.css:326</code>، وُصِلَ إليه استقلالًا.</b> وكلُّ رفعةٍ أُخرى تركَتِ المسألةَ للبطّانيّة.
          <br /><br />
          <b>وثلاثيّةُ أبعادِه مُعلَنةٌ أربعَ مرّاتٍ وتُحسَبُ مُسطَّحة:</b> <code>perspective: 72em</code> و<code>preserve-3d</code> على الجذرِ، و<code>preserve-3d</code> على القِشرة، و<code>translateZ(0.6em)</code> على الكُرةِ داخلَها. <b>والقِشرةُ تُصرِّحُ <code>overflow: hidden</code> أيضًا — و<code>overflow</code> غيرُ <code>visible</code> يُجبِرُ <code>transform-style</code> أن <em>يُستَعمَلَ</em> <code>flat</code></b>، فهي خاصّيّةُ تجميعٍ ولا يكونُ التجميعُ سياقًا ثلاثيَّ الأبعاد. <b>وهذه لا تُقاسُ بالطريقِ البديهيّ:</b> <code>getComputedStyle</code> يظلُّ يقولُ <code>preserve-3d</code>، لأن التسطيحَ يُغيّرُ القيمةَ <em>المُستَعمَلةَ</em> لا المحسوبة، <b>والكُرةُ يظلُّ تحويلُها <code>matrix3d</code> كاملًا</b>. والقراءةُ التي تحسِمُ هي العَرضُ المرسوم: تحتَ مَنظورِ ١١٥٢، عنصرٌ أقربُ بـ٩٫٦ يكونُ أعرضَ بنسبةِ ١١٥٢/١١٤٢٫٤ — <b>وقِيسَ والحركتانِ مُجمَّدتان لئلّا يُلوِّثَ إطارُ <code>scale</code> القراءة:</b>
          <br />
          <code>translateZ(0.6em) → 40.797px</code> · <code>translateZ(0) → 40.797px</code> · <code>لو عمِلَ البُعدُ → 41.140px</code>
          <br />
          <b>فالبُعدُ الثالثُ يُعلَنُ أربعًا ويحدُثُ مرّةً واحدة</b>: في <code>rotateX(6deg) rotateY(-4deg)</code> عندَ التمرير، وهو دَورانٌ يُقرأُ ولو سُطِّحَ ابنُه.
          <br /><br />
          <b>و<code>content</code> يُحرَّكُ، وهو ليس ممّا يُحرَّك:</b> <code>@keyframes ll-ellipsis</code> يخطو بـ<code>content</code> عبرَ «» و«.» و«..» و«...» بـ<code>steps(4, end)</code>. <b>وهذا ثاني <code>content</code> في هذا السجلّ</b> — والأوّلُ كان مُصرَّحًا على عنصرٍ غيرِ زائفٍ فيُحسَبُ ولا يُرسَمُ أبدًا. <b>وهذا يعمل</b>: كروميوم يُستَبينُ <code>content</code> استبانةً مُنفصِلةً على الزائفات. <b>ولذلك لم تُترَكِ اللافتةُ تتكلَّمُ عن نفسِها</b>: منطقةٌ حيّةٌ نصُّها يتغيّرُ أربعَ مرّاتٍ في الثانيةِ منطقةٌ لا تسكُت، <b>فثُبِّتَ الاسمُ بـ<code>aria-label</code></b> — فيَسمعُ القارئُ «Loading» مرّةً وتبقى النقاطُ صورة.
          <br /><br />
          <b>وزرُّ الحُمَمِ أوّلُ رفعةٍ هنا تُصرِّحُ <code>isolation: isolate</code> بنفسِها.</b> أربعُ رفعاتٍ قبلَها أَنزَلَت طبقةً سالبةً خلفَ الصفحةِ كلِّها، وكلٌّ أُصلِحَت بتصريحٍ واحدٍ زِيد. <b>وهذه تحملُه سلفًا، وتحتاجُه</b>: طبقتانِ سالبتان — <code>::before</code> عند <code>-2</code> و<code>.blob1</code> عند <code>-1</code>. <b>وأصابَ صاحبُها الحالةَ الثانيةَ أيضًا</b>: <code>.inner</code> <code>position: relative; z-index: 2</code>، <b>وعنصرٌ مُوضَعٌ بـ<code>z-index</code> رقميٍّ سياقُ تراصُف</b>، فبقيَ <code>.inner::before</code> عند <code>-1</code> في مكانِه بلا زيادة. <b>وهالتُه داخليّةٌ كلُّها:</b> <code>inset: -120%</code> بتمويهِ ٣٤ داخلَ <code>overflow: hidden</code> — <b>فدورانُ الاثنتَي عشرةَ ثانيةً يحدُثُ كلُّه داخلَ كبسولة</b>، والذي يخرُجُ هو <code>box-shadow</code> وحدَه لأنه لا يُقَصّ. <b>والتمريرُ لا يُضيفُ حركةً بل يُنصِّفُ خمسَ مُدَد:</b> ٦←٣٫٢ و١٢←٧ و٥٫٥←٢٫٢ و٨←٤٫٥ و١٠←٥٫٥. <b>وتغييرُ المدّةِ على حركةٍ جارية يحفظُ كسرَ التقدُّم، فلا يُستأنَفُ شيء</b> — يزدادُ الزرُّ إلحاحًا فقط، <b>ولذلك يُقرأُ التمريرُ حرارةً لا أثرًا جديدًا يبدأ</b>. والانتقالاتُ الحيلةُ نفسُها معكوسة: ٩٠٠–١١٠٠ مِلّي على <code>cubic-bezier(0.16, 1, 0.3, 1)</code>، و<code>:active</code> يَنقُضُ المدّةَ إلى ١٤٠–١٨٠. <b>فالضغطُ حادٌّ والإفلاتُ بطيء، من رقمَين.</b>
        </SpecRow>

        <SpecRow name="قيمةٌ أُكِلَت لأنها تُشبِهُ وَسمًا، ونقطةُ تحكُّمٍ رابعةٌ عند ٢٫٥" bare specimen={
          <div className="flex w-full flex-wrap items-center justify-center gap-24 rounded-2xl bg-[#d9e3f0] px-16 py-20" dir="ltr">
            <LiquidGlassGenerateButton />
            <CornerBracketOfferButton />
          </div>
        }>
          <b>أوّلُ ما في الرفعةِ 53 قاعدتانِ لا تعملانِ كما وصَلَتا:</b> <code>@property --angle-1 {'{'} syntax: ""; initial-value: -75deg {'}'}</code> ومثلُها لـ<code>--angle-2</code>. <b>و<code>syntax: ""</code> ليس واصفًا صحيحًا، والواصفُ الباطلُ يُبطِلُ قاعدةَ <code>@property</code> كلَّها فتُطرَح</b> — فتبقى الخاصّيّتانِ غيرَ مُسجَّلتَين، <b>فلا <code>initial-value</code> يُطبَّقُ ولا واحدةٌ منهما تُستَبان</b>. <b>والملفُّ يَنقُلُ كلتَيهما في <code>transition</code></b>: <code>--angle-1 500ms ease</code> على الإطار، و<code>--angle-2</code> على اللمعة. <b>والخاصّيّاتُ غيرُ المُسجَّلةِ لا تُستَبانُ بل تَقفِز</b> — فحركتا هذا الزرِّ الأساسيّتانِ كانتا ستكونانِ قَطعَين آنيَّين.
          <br /><br />
          <b>والواصفُ هو <code>"&lt;angle&gt;"</code>، وهذا استدلالٌ من قرائنَ لا تخمين:</b> <code>initial-value: -75deg</code> زاويةٌ ولا تصِحُّ إلا لواصفِ زاوية، <b>والخاصّيّتانِ تُستعمَلانِ حصرًا داخلَ <code>conic-gradient(from …)</code> و<code>linear-gradient(&lt;angle&gt;, …)</code></b>، <b>وهذه الرفعةُ وصلَت عبرَ تحويلٍ إلى ماركداون أكلَ كلَّ وَسمٍ في الملفّ</b> — الوسمُ كلُّه ذهبَ وبقيَت كلمةٌ واحدة — <b>فواصفٌ قيمتُه مكتوبةٌ بينَ قوسَي زاويةٍ هو بالضبط ما يبلَعُه ذاك التحويل</b>. <b>وهذا صنفٌ جديدٌ من الفقدِ في هذا السجلّ: لا عنصرٌ مفقود، بل <em>قيمةٌ</em> مفقودةٌ لأنها تُشبِهُ وَسمًا.</b> و<code>src/demos.css:1844</code> يكتبُ الواصفَ نفسَه بالصيغةِ نفسِها.
          <br /><br />
          <b>و<code>:root</code> وجبَ نقلُه:</b> الرفعةُ تُصرِّحُ ثلاثَ خاصّيّاتٍ عليه، <b>و<code>:root</code> في ورقةٍ محصورةٍ يصيرُ مُحدِّدَ سليلٍ لا يُطابِقُ أبدًا</b> — و<code>--anim--hover-time</code> يُقرأُ في تسعِ انتقالات، <b>واسمٌ غيرُ مُصرَّحٍ داخلَ <code>var()</code> يُبطِلُ التصريحَ عندَ حسابِ القيمة</b>، فكانت انتقالاتُ الملفِّ كلُّها ستُطرَح. <b>و<code>--global--size</code> مُصرَّحٌ ولا يُقرأُ أبدًا</b>، حُمِلَ ميتًا.
          <br /><br />
          <b>وضغطُه يُميلُ الزرَّ ولا مَنظورَ في الملفِّ إطلاقًا:</b> <code>rotate3d(1, 0, 0, 25deg)</code> بإسقاطٍ متوازٍ <b>انضغاطٌ رأسيٌّ مقدارُه <code>cos(25deg) = 0.9063</code> بالضبط</b> — ثالثُ دَورانٍ متوازٍ في هذا السجلّ، بعدَ زرِّ المستنداتِ (عَرَضًا) وبطاقةِ المُنتَجِ (قصدًا). <b>وحدُّه قِناعٌ مرّتَين:</b> <code>mask-composite: exclude</code> مع قِناعَين يُبقي ما هو <b>خارجَ</b> صندوقِ المحتوى — أي حَلقةَ الحاشية — <b>فيرسمُ التدرُّجَ المخروطيَّ ثم يطرحُ الوسَط، فيصيرُ حدًّا بتدرُّجٍ مخروطيّ</b>. اصطلاحٌ واحدٌ لعملَين. و<code>999vw</code> نصفَ قُطر: <b>على صفحةٍ ١٤٤٠ ذاك أربعةَ عشرَ مترًا</b>، فيَقصُرُ إلى كبسولةٍ عندَ كلِّ عَرضٍ بلا استعلامٍ واحد.
          <br /><br />
          <b>وإضافتُه الواحدةُ هي التي تُهِمّ:</b> <code>all: unset</code> على الزرّ. <b>وتصريحُ المُؤلِّفِ يغلِبُ ورقةَ العاملِ أيًّا كان التخصيص</b>، فيُرَدُّ <code>outline-style</code> إلى ابتدائِه <code>none</code> <b>وتذهبُ معه حلقةُ التركيزِ التي يرسمُها العامِل</b> — وقِيسَ على الصفحة: الزرُّ المُركَّزُ لا يرسمُ شيئًا. والتمريرُ قياسٌ ٢٫٥٪ وظلّ، <b>وليس ذاك مُؤشِّرَ تركيز</b>.
          <br /><br />
          <b>وزرُّ العَرضِ يُفرِطُ من داخلِ المُنحنى:</b> <code>cubic-bezier(0, 0, 0, 2.5)</code> — <b>والزوجُ الثاني محورُ الخَرجِ وهو غيرُ محدود</b>، فالـ٢٫٥ تعني أن الانتقالَ يسافرُ مِثلَي مسافتِه ونصفًا ثم يعودُ ليَحُلّ. <b>وذاك سببُ نَبضِ الأدراجِ وقَفزِ الحواشي</b>: لا إطارَ إفراطٍ في الملفّ، <b>رقمٌ واحدٌ في مُنحنًى واحدٍ يُعادُ استعمالُه في كلِّ انتقالٍ عبرَ خاصّيّةٍ مُخصَّصة</b>.
          <br /><br />
          <b>وأربعُ حواشٍ رسمةٌ واحدةٌ مُدارةٌ أربعًا:</b> الدَّوراناتُ تحسِمُ ما يجبُ أن تكونَ الرسمةُ عليه — <b>الحاشيةُ عند <code>rotate(0deg)</code> أسفلُ يسارَ، فالشكلُ الأساسُ قوسٌ سُفليٌّ يساريّ، والثلاثُ الأُخرى تتبَع</b>. <b>و<code>nth-of-type</code> يعُدُّ الوسومَ</b>، والملفُّ يعتمدُ عليه أربعَ مرّاتٍ، <b>فالأربعُ <code>svg</code> يجبُ أن تكونَ وحدَها بينَ أخواتِها</b> — وهي كذلك: أربعُ <code>svg</code> وعنصرانِ وزرّ. <b>وموجةٌ عاشرةٌ فقدَت نجمةً كاملةً لإخطاءِ هذا.</b>
          <br /><br />
          <b>وخلفيّةٌ كُتِبَت مرّتَين والثانيةُ تغلِب:</b> <code>.btn-drawer</code> يُصرِّحُ الاختصارَ <code>background: …, var(--btn-color)</code> — <b>والاختصارُ يَرُدُّ <code>background-color</code> إلى لونِ طبقتِه الأخيرة</b> — ثم يكتبُ في السطرِ التالي <code>background-color: #fbff13</code>. <b>فالأدراجُ ليست لونَ الزرِّ <code>#d8ff7c</code> بل أصفرَ أبهى، والسببُ الوحيدُ ترتيبُ التصريح.</b> وقِيسَ على الصفحة.
          <br /><br />
          <b>ونصٌّ بلا لون:</b> <code>color: #5550</code> — أربعُ خاناتٍ وشفافيّتُها صفر — مع <code>-webkit-text-fill-color: transparent</code>، والحروفُ المرئيّةُ من <code>background-clip: text</code>. <b>فالتباينُ الذي يُقاسُ هو تباينُ التدرُّجِ لا تباينُ اللون:</b> <code>#444</code> على <code>#d8ff7c</code> يُساوي <b>8.59</b> و<code>#000a</code> يُركَّبُ فيبلُغُ <b>7.10</b> — <b>وحُسِبا لأن <code>color: transparent</code> هو بالضبط شكلُ عيب</b>. <b>وتَعشيقٌ أصليٌّ وتصريحٌ بعدَه:</b> كلتا كتلتَي الحالةِ تكتُبُ <code>--corner-color</code> عاريًا <b>بعدَ</b> قواعدَ مُعشَّقة، <b>وذاك مسموحٌ اليومَ وكانت المُحرِّكاتُ الأقدمُ تطرحُه</b> — فقِيسَ لا فُرِض. <b>و<code>:focus-visible</code> في الرفعةِ نفسِها بجانبِ <code>:hover</code> في الكتلتَين — أوّلُ رفعةٍ في هذا السجلِّ تكتبُها من عندِها</b>، ولذلك لم تُزَدْ حلقةُ تركيزٍ: الحالةُ المُركَّزةُ تُخرِجُ لافتتَين وتدفعُ أربعَ حواشٍ ستًّا وثلاثينَ بكسلًا وتُكبِّرُ الزرّ.
        </SpecRow>

        <SpecRow name="خمسةَ عشرَ نطاقًا، ورقمٌ مكتوبٌ بمسافتَي إزاحة" bare specimen={
          <div className="flex w-full flex-wrap items-center justify-center gap-16 rounded-2xl bg-[#0f0f12] px-6 py-10" dir="ltr">
            <FifteenZoneBatteryCard />
          </div>
        }>
          <b>خمسةَ عشرَ عنصرًا خفيًّا هي شبكةُ ثلاثةٍ في خمسة:</b> كلُّ <code>.area:nth-child(N):hover</code> يضبِطُ <code>rotateX</code> من <code>{'{'}-15، 0، +15{'}'}</code> و<code>rotateY</code> من <code>{'{'}15، 7، 0، -7، -15{'}'}</code>، <b>والحاويةُ <code>grid-template-columns: repeat(5, 1fr)</code> — فالخمسةَ عشرَ عنصرًا <em>هي</em> تلك الشبكة</b>. وبطاقةُ التسعةِ نطاقاتٍ في هذا السجلِّ فعلَت الشيءَ نفسَه ثلاثةً في ثلاثة؛ <b>وهذه تقرأُ المؤشِّرَ بضِعفِ الدقّةِ عَرضًا، بلا سكربت، من خمسةَ عشرَ قاعدةَ تمريرٍ ومُركِّبِ الأخوّة</b>.
          <br /><br />
          <b>وكلُّ نطاقٍ يُحرِّكُ الضوءَ أيضًا:</b> قُرصانِ مموَّهانِ عَرضُهما ٥٠٪، والصفوفُ عند <code>top: -20% / 22% / 66%</code> والأعمدةُ عند <code>right: 70% / 47.5% / 25% / 2.5% / -20%</code>. <b>والأعمدةُ مُتسلسِلةٌ حسابيّةٌ تامّة — كلُّ خُطوةٍ ‎-22.5٪ بالضبط — والصفوفُ ليست كذلك</b>: من ‎-20 إلى 22 اثنتانِ وأربعون، ومن 22 إلى 66 أربعٌ وأربعون. <b>نقطتانِ من خمسٍ بقاعدةٍ وثلاثٌ باليد.</b>
          <br /><br />
          <b>و«69» مسافتا إزاحةٍ لا رقمٌ مكتوب:</b> <code>text-scroll-6</code> هو <code>translateY(-600%)</code> و<code>text-scroll-9</code> هو <code>-900%</code>، <b>وكلُّ خانةٍ بارتفاعِ رقمٍ واحدٍ داخلَ نافذةِ ٤٨ بكسلًا مقصوصة</b> — فالستُّمئةُ تحِلُّ على الفهرسِ ٦ والتسعُمئةِ على ٩. <b>وطولُ البَكَرَتَين يتبَعُ من ذلك</b>: الأولى تحتاجُ سبعةَ أرقامٍ على الأقلِّ وفيها ثمانية، والثانيةُ تحتاجُ عشرةً وفيها إحدى عشرة. <b>والفائضُ للقِناع</b> — تلاشٍ رأسيٌّ في الطرفَين، <b>وبَكَرَةٌ لا رقمَ فوقَ هدفِها ولا تحتَه كانت ستتلاشى إلى العدمِ في اللحظةِ التي تتوقَّفُ فيها</b>. وقِيسَ بعدَ استقرارِهما:
          <br />
          <code>«01234567» → ‎-288px / 48 → الفهرس 6 → «6»</code> · <code>«01234567890» → ‎-432px / 48 → الفهرس 9 → «9»</code>
          <br />
          <b>والنطاقاتُ الثلاثةُ الوُسطى لا تُبلَغ:</b> البطاقةُ <code>position: absolute</code> وتأتي بعدَ الخمسةَ عشر، <b>فتأخُذُ المؤشِّرَ حيثُ تتقاطعُ معها</b>. وباختبارِ النقطةِ في مركزِ كلِّ خليّة: <b>اثنتا عشرةَ من الخمسةَ عشرَ تبلُغُ نطاقَها، و٧ و٨ و٩ — ثلاثُ الصفِّ الأوسطِ الوُسطى — تُصيبُ البطاقةَ</b>. والثامنُ هو <code>rotateX(0) rotateY(0)</code> فلا يُفقَدُ من الدَّورانِ شيء؛ <b>والمفقودُ موضعُ قُرصِه، <code>top: 22%</code> مع <code>right: 25%</code>، ولا يكتبُه نطاقٌ آخر</b>. <b>وذاك بنيويٌّ لا نتيجةَ قياسٍ اختَرتُه</b>: أيُّ بطاقةٍ مُتوسِّطةٍ فوقَ شبكةِ ثلاثةٍ في خمسةٍ تُغطّي الخلايا التي تحتَها.
          <br /><br />
          <b>والأشرطةُ والرقمُ لا يتّفِقان:</b> أربعةٌ تُحرَّكُ إلى <code>width: 100%</code> والخامسُ إلى <code>14%</code> — <b>أي <code>(4 + 0.14) / 5 = 82.8٪</code> من الصفّ</b>، واللافتةُ تقولُ ٦٩. <b>والـ٦٩ الوحيدةُ في صفِّ الأشرطةِ عَلامةُ توقُّفٍ في قِناعِه</b> — <code>rgba(0,0,0,1) 69%</code> — <b>وهي تلاشٍ لا مستوى</b>. ثانيةَ مرّةٍ في هذا السجلِّ تتناقضُ أرقامُ أداةٍ مع نفسِها، بعدَ لوحِ التقدُّمِ (٤٫٠٠٪ مقابلَ ١٣/٣٦٥).
          <br /><br />
          <b>و<code>pathLength</code> في صورتِه المُعَيَّرة:</b> <code>stroke-dasharray: 1; stroke-dashoffset: 1</code> يُرسَمُ إلى <code>0.23</code>. <b>ودَشّةٌ وإزاحةٌ بواحدٍ تعنيانِ أن طولَ المسارِ <em>هو</em> واحد</b> — <code>pathLength="1"</code> — <b>و٠٫٢٣ باقيةً تعني ٧٧٪ مرسومة</b>. وكلُّ زوجِ دَشّةٍ قبلَها في هذا السجلِّ احتاجَ قِسمة؛ <b>وهذا كسرٌ سلفًا</b>. <b>والقاعدةُ لا تُخاطِبُ الخطَّ أصلًا</b>: <code>&amp; {'>'} :last-child</code> هو عنصرُ <code>svg</code> لا <code>path</code> داخلَه، <b>فالحركةُ تجري على الغلافِ والرسمُ طبقتَين أسفل</b>. <b>وتعمَلُ لأن <code>stroke-dasharray</code> و<code>stroke-dashoffset</code> خاصّيّتانِ مَوروثتان</b>: وقِيسَ — الـ<code>svg</code> يحملُ <code>animation-name: drawLine</code> و<code>stroke-dashoffset: 0.23px</code>، والـ<code>path</code> يحملُ <code>animation-name: none</code> مع <code>1px</code> و<code>0.23px</code> موروثتَين عنه. <b>سبعٌ وسبعونَ في المئةِ من مسارٍ رسمَتها قاعدةٌ لا تُسمّيه.</b>
          <br /><br />
          <b>ومُحدِّدٌ يُملي وَسمًا:</b> <code>.content:first-of-type</code> — <b>و<code>:first-of-type</code> يعُدُّ الوسوم</b>، فلا يُطابِقُ إلا إن كان أوّلُ <code>.content</code> أوّلَ عنصرٍ من وسمِه بينَ أبناءِ الجسم، <b>أي أن <code>.battery-level-text</code> الذي يسبِقُه يجبُ أن يكونَ وَسمًا <em>آخر</em></b>. <b>فالمُحدِّدُ هو الذي يقولُ للوسمِ ما يكون</b>: هنا <code>.battery-level-text</code> <code>span</code> (وهو <code>display: flex</code> على أيِّ حال) والصفوفُ الثلاثةُ <code>div</code>. <b>ولو كُتِبَت كلُّها <code>div</code> لَما طابَقَتِ القاعدةُ شيئًا</b> — ثالثةَ مرّةٍ في هذا السجلِّ يحسِمُ فيها <code>-of-type</code> ما كان يُنتظَرُ من صنفٍ أن يحسِمَه.
          <br /><br />
          <b>ولمعةٌ تُسافِرُ من قَصٍّ وخمسةِ تأخيرات:</b> <code>inset(0 100% 0 0)</code> إلى <code>inset(0 10% 0 10%)</code> عند ٥٪ إلى <code>inset(0 0 0 100%)</code> عند ١٠٪، <b>ثم تُثبَتُ تسعينَ في المئةِ من حلقةِ ثانيتَين</b> — فتَعبُرُ الشريطَ في ٢٠٠ مِلّي ويَنتظِرُ ١٨٠٠. <b>وحاشيةُ الحبرِ نصفُ شفافيّة:</b> <code>#eee</code> على <code>#212121</code> بشفافيّةِ ٠٫٥ يُركَّبُ <code>#888888</code>، <b>وقِيسَ ٤٫٥٤ — فوقَ الحدِّ بأربعةِ أجزاءٍ من مئة</b>. وحُسِبَ لا فُرِض، <b>لأن حبرًا نصفَ شفّافٍ على أرضٍ داكنةٍ هو الموضعُ الذي وجدَ فيه هذا السجلُّ فشلًا مرّتَين</b>.
        </SpecRow>

        <SpecRow name="ستَّةَ عشرَ مُرشِّحًا في دفترِ تقليب، وخانتانِ لكلِّ حرفٍ لأن الحركتَين لا تجتمعان" bare specimen={
          <div className="flex w-full flex-wrap items-center justify-center gap-16 rounded-2xl bg-[#07070c] px-6 py-24" dir="ltr">
            <ElectricCookButton />
          </div>
        }>
          <b>الحدُّ الكهربيُّ ستَّةَ عشرَ مُرشِّحًا لا مُرشِّحًا واحدًا مُحرَّكًا:</b> <code>@keyframes turbulentSwap</code> يخطو <code>filter: url(#turbulent-displace-N)</code> من صفرٍ إلى خمسةَ عشرَ <b>بفواصلَ ٦٫٢٥٪ بالضبط — وستَّةَ عشرَ في ٦٫٢٥ مئة</b>. <b>و<code>filter</code> لا يُستَبانُ استبانةً ناعمةً بينَ مَرجعَي <code>url()</code></b>، فهذا <b>دفترُ تقليب</b>: ستَّةَ عشرَ خريطةَ إزاحةٍ مُنفصِلةً بالترتيبِ على ١٫٥ ثانية، نحوَ ٩٣ مِلّي لكلٍّ. <b>وتحريكُ <code>seed</code> لمُرشِّحٍ واحدٍ كان سيحتاجُ SMIL أو سكربتًا؛ وستَّةَ عشرَ مُرشِّحًا وقائمةَ إطاراتٍ لا يحتاجانِ واحدًا منهما.</b> والمُرشِّحاتُ مُستَنتَجةٌ، <b>والـCSS يقولُ عنها الكثير</b>: ستَّةَ عشرَ بالضبط، لا تختلفُ إلا بالفهرس، تُطبَّقُ على صندوقٍ لا يرسمُ إلا <code>border: 2px solid white</code>، والنتيجةُ اسمُها إزاحةٌ مُضطربة. <b>فذاك <code>feTurbulence</code> إلى <code>feDisplacementMap</code> والبَذرةُ وحدَها تتغيّر.</b>
          <br /><br />
          <b>و<code>--d</code> يُقرأُ ولا يُصرَّحُ في أيِّ موضع:</b> <code>@keyframes particleMove</code> يفتحُ بـ<code>transform: translateX(var(--d)) …</code>، <b>واسمٌ غيرُ مُصرَّحٍ داخلَ <code>var()</code> يُبطِلُ التصريحَ كلَّه عندَ حسابِ القيمة</b> — <b>فإطارُ الصِّفرِ لا تحويلَ فيه إطلاقًا</b>: الجُزيئاتُ لا تطيرُ من <code>--d</code>، بل تظهرُ في موضعِها النهائيِّ وتتحرّكُ شفافيّتُها وحدَها. <b>و<code>--t</code> يُقرأُ <code>var(--t, 0)</code> ببديل — فصاحبُها كان يُفكِّرُ في هذا الفشلِ عينِه سطرًا واحدًا قبلَه.</b> <b>وأُثبِتَ بإعطائِه</b>: بلا <code>--d</code> لا مُركِّبةَ إزاحةٍ في الإطارِ إطلاقًا، ومع <code>--d: 40px</code> يحملُ الإطارُ نفسُه <code>matrix(0.468877, -0.379651, 0.468877, 0.379651, 34.6642, 0)</code> — <b>إزاحةَ ٣٤٫٦٦ وميلًا آخر</b>. فالقراءتانِ تختلفان، <b>فتحويلُ الإطارِ لا يَنفُذُ إلا إن حُلَّ <code>--d</code>، وهو في الرفعةِ لا يُحَلُّ أبدًا</b>.
          <br /><br />
          <b>وفاصلةٌ واحدةٌ شاردةٌ تجعلُ الزرَّ يَنقُلُ كلَّ شيء:</b> <code>transition: background-color, 0.5s linear, box-shadow 0.5s ease, transform 0.5s ease</code>. <b>والفاصلةُ بعدَ <code>background-color</code> تُنهي البندَ الأوّل، فالبندُ الثاني <code>0.5s linear</code> بلا خاصّيّةٍ مُسمّاة — أي <code>all</code></b>. وقِيسَ:
          <br />
          <code>transition-property: background-color, all, box-shadow, transform</code> · <code>duration: 0s, 0.5s, 0.5s, 0.5s</code>
          <br />
          <b>فالخاصّيّةُ الوحيدةُ التي سمّاها صاحبُها أوّلًا هي الوحيدةُ التي لا تَنتقِل، وكلُّ ما عداها يَنتقِل.</b> <b>وانكشفَت عَرَضًا</b>: حلقةُ التركيزِ المُضافةُ رجعَت ٢ بكسل من ثلاثةٍ ولونًا في منتصفِ الطريق، <b>لأن <code>all</code> كان يُستَبينُ الإطارَ أيضًا</b>.
          <br /><br />
          <b>وفاصلةٌ واحدةٌ شاردةٌ تجعلُ الزرَّ يَنقُلُ كلَّ شيء:</b> <code>transition: background-color, 0.5s linear, box-shadow 0.5s ease, transform 0.5s ease</code>. <b>والفاصلةُ بعدَ <code>background-color</code> تُنهي البندَ الأوّل، فالبندُ الثاني <code>0.5s linear</code> بلا خاصّيّةٍ مُسمّاة — أي <code>all</code></b>. وقِيسَ:
          <br />
          <code>transition-property: background-color, all, box-shadow, transform</code> · <code>duration: 0s, 0.5s, 0.5s, 0.5s</code>
          <br />
          <b>فالخاصّيّةُ الوحيدةُ التي سمّاها صاحبُها أوّلًا هي الوحيدةُ التي لا تَنتقِلُ (صفرٌ)، وكلُّ ما عداها يَنتقِل.</b> <b>وانكشفَت عَرَضًا</b>: حلقةُ التركيزِ المُضافةُ رجعَت ٢ بكسل من ثلاثةٍ ولونًا في منتصفِ الطريق، <b>لأن <code>all</code> كان يُستَبينُ الإطارَ أيضًا</b>.
          <br /><br />
          <b>وخانتانِ لكلِّ حرفٍ لأن الحركتَين لا تجتمعان:</b> <code>.text p.state-1 &gt; span</code> يُجري <code>appear</code>، و<code>.text span &gt; span</code> يُجري <code>waveText</code>. <b>وعنصرٌ واحدٌ لا يحملُهما، لأن كلَّ قاعدةٍ تضبِطُ اختصارَ <code>animation</code> كلَّه فتغلِبُ الأخصُّ غَلَبةً تامّة</b> — فكلُّ حرفٍ خانةٌ خارجةٌ تَقدَمُ وخانةٌ داخلةٌ تتموَّج. <b>والموجةُ بتأخيرٍ سالبٍ</b> — <code>calc(var(--i) * -0.13s)</code> — <b>فتبدأُ كلُّ حرفٍ في منتصفِ دَورتِه لا مُنتظِرةً: التموُّجُ جارٍ سلفًا في الإطارِ الأوّل</b>. و<code>animation-play-state: paused</code> سكونًا، <b>فيحفظُ طَورَه بينَ التمريرَين</b>.
          <br /><br />
          <b>وفراغُ الكلمةِ يتنقّلُ بينَ الحالتَين:</b> <code>.state-1 span:nth-child(3)</code> و<code>.state-2 span:nth-child(5)</code> — <b>«GetStarted» تنكسِرُ بعدَ ثلاثةٍ و«Let'sCook!» بعدَ خمسة</b>. وبخلافِ زرِّ الانضمامِ في الموجةِ الثانيةَ عشرةَ — <b>حيثُ خدَمَ <code>nth-child(5)</code> واحدٌ اللافتتَينِ لأنهما تتّفِقانِ في موضعِ الكَسر</b> — هذا الملفُّ يحتاجُ فهرسَين ويكتبُهما.
          <br /><br />
          <b>ومربّعُ اختيارٍ بلا <code>display: none</code>:</b> <code>.area input {'{'} opacity: 0; width: 0; height: 0 {'}'}</code>. <b>وثمانِ رفعاتٍ في هذا السجلِّ أخفَت مُدخَلًا بـ<code>display: none</code>، وذاك يُخرِجُه من ترتيبِ الانتقالِ إخراجًا</b>. <b>وهذه لا تفعل</b>: مُدخَلٌ ٠×٠ بشفافيّةِ صفرٍ ما زالَ قابلًا للتركيزِ وللتشغيلِ من لوحةِ المفاتيح، وهو داخلَ <code>&lt;label&gt;</code> يلُفُّ الأداةَ كلَّها. <b>وتلك هي الصيغةُ الصحيحةُ للنمَط، وصلَت إليها الرفعةُ من عندِها.</b>
          <br /><br />
          <b>و<code>stroke-dasharray: 0 173</code> مع <code>stroke-dashoffset: 174</code>:</b> دَشّةُ صفرٍ وفُرجةُ ١٧٣ لا ترسمُ شيئًا — <b>وذاك السكون — وطولُ اللفّةِ ١٧٣</b>، أي <code>pathLength=173</code>. <b>و<code>splashFeedback</code> يُحرِّكُها إلى <code>10 110</code> بإزاحةِ ٨٠ — فيتغيّرُ دَورُ نمطِ الدَّشِّ نفسُه في الطريق</b>، وذاك ما يُحوِّلُ الحَلَقةَ إلى شَتاتِ عَلاماتٍ. <b>و<code>splashFeedback</code> و<code>splashFeedback2</code> جسدُهما واحدٌ واسمُهما اثنان.</b>
          <br /><br />
          <b>وثلاثُ إضافات:</b> <code>aria-label</code> على المُدخَلِ — <b>وإلّا كان اسمُه حصيلةَ عشرينَ خانةَ حرفٍ من اللافتتَين معًا</b>، لأن الـ<code>label</code> يلُفُّهما كلتَيهما. <b>وخاناتُ الحروفِ والجُزيئاتُ والقوسُ والسائلُ مُخفاةٌ عن المُساعِدات</b>. <b>و<code>outline: none</code> مكتوبٌ على <code>.button</code> وهو ليس العنصرَ القابلَ للتركيز — المُدخَلُ هو</b>، فحلقةُ العامِلِ باقيةٌ عليه؛ <b>لكن المُدخَلَ ٠×٠ بشفافيّةِ صفرٍ فتلك الحلقةُ لا تُرى</b> — فقاعدةُ <code>:focus-visible</code> على المُدخَلِ ترسمُها على الزرِّ، <b>وهو العنصرُ الذي يستطيعُ مستخدمُ لوحةِ المفاتيحِ أن يراه</b>.
        </SpecRow>

        <SpecRow name="ثلاثةٌ وخمسونَ مسارًا، وحُكمٌ لي يُسحَب" bare specimen={
          <div className="flex w-full items-center justify-center rounded-2xl bg-[#141014]" dir="ltr">
            <SunsetGrayscaleButton />
          </div>
        }>
          <b>هذا الملفُّ بقيَ غيرَ مُنفَّذٍ خمسَ موجاتٍ على موقفٍ مكتوبٍ في هذا السجلّ:</b> «ثلاثةٌ وخمسونَ مسارًا لا تُستَنتَج، إنشاؤها <em>رسمُ لوحةٍ جديدةٍ لا تنفيذُ واحدة</em>». <b>وذاك حُكمٌ كُتِبَ من نظرةٍ إلى المُحدِّدِ <code>path:nth-child(53)</code> ولا يَصمُدُ لقراءةِ الباقي.</b> فالـCSS يُسمّي <b>ستَّةَ فهارسَ مُفرَدةٍ ونطاقَين، ويقولُ ما هو كلُّ واحدٍ منها</b>:
          <br />
          <code>1</code> ظلٌّ داكنٌ + <code>swayLeft</code> + <code>transform-origin: 15% 100%</code> → النخلةُ اليُسرى · <code>2</code> → اليُمنى · <code>3</code> <code>sunPulse</code> و<code>translateY(-2px)</code> تمريرًا → الشمس · <code>16</code> ظلٌّ بلا حركة → تلّ · <code>45</code> و<code>53</code> ظلٌّ داخلَ نطاقِ <code>n+30</code> وفَرديّانِ فيبقُبّان → عمودا رَصيف · <code>n+30</code> → الماء · وما بقيَ → خطوطُ السماء
          <br />
          <b>فالعددُ مُصرَّحٌ، وكلُّ دورٍ مُصرَّح، والباقي أُسرتانِ مُتماثِلتان</b>: خمسٌ وعشرونَ خطَّ سماءٍ واثنانِ وعشرونَ خطَّ ماء. <b>وذاك تنفيذٌ لا رسم.</b> وتعليقُ الرفعةِ يُسمّي الأُسَرَ صراحةً: «Palm trees, hills, pier paths» و«Sun, clouds, sky lines» و«Water reflection / wave highlights».
          <br /><br />
          <b>و<code>transform-origin: 15% 100%</code> يُصدِّقُ القراءة:</b> النِّسَبُ على عنصرِ SVG تُحسَبُ على <code>transform-box: view-box</code> افتراضًا، <b>فـ١٥٪ و٨٥٪ من عَرضِ الـviewBox هما موضعا الشجرتَين — الحافّةُ اليُسرى والحافّةُ اليُمنى — والمئةُ من ارتفاعِه قاعدتُهما</b>. فالمِحورُ ليس زينةً بل <b>صاحبُ الملفِّ يقولُ لنا أين الشجرتان</b>.
          <br /><br />
          <b>وسبعُ خاصّيّاتٍ مُصرَّحةٍ لا تُقرأُ ولا مرّةً واحدة:</b> <code>--bg</code> و<code>--text</code> و<code>--accent</code> و<code>--accent-strong</code> و<code>--danger</code> و<code>--secondary</code> على <code>:root</code>، و<code>--ambient</code> بـ<code>color-mix()</code> على الزرّ. <b>سابِعةٌ في ملفٍّ واحد — سجلٌّ لهذا السجلّ</b>. و<code>--bg</code> بخاصّةٍ اسمٌ يُصرِّحُه مُضيفُ هذا المستودعِ نفسُه، <b>فلم يُحمَلْ على مُحدِّدٍ مَوروثٍ هنا</b>.
          <br /><br />
          <b>وستُّ واصفاتٍ أُكِلَت — نفسُ فقدِ الموجةِ الرابعةَ عشرة — وهنا ليست ترفًا بل الزرَّ كلَّه:</b> <b>لا واحدةٌ من الستِّ مُصرَّحةٌ في حالةِ السكونِ إطلاقًا</b> — <code>--tilt</code> غيرُ مُصرَّحٍ في أيِّ موضعٍ خارجَ تسجيلِه، والخمسُ الأُخرى لا تظهرُ إلا في <code>:hover</code> و<code>:active</code> والإطارات. <b>فقِيَمُ السكونِ كلُّها من <code>initial-value</code>، وهو لا يُطبَّقُ إلا إن صحَّ التسجيل</b> — وإن لم يصِحَّ فكلُّ تصريحٍ يقرأُها في السكونِ باطلٌ عندَ حسابِ القيمة: <b>التحويلُ يسقُط، والهالةُ تسقُط، واللمعةُ تسقُط، والانتقالاتُ لا تُستَبان</b>. <b>فمَظهرُ هذا الزرِّ في السكونِ يَنهارُ بلا الواصفات.</b> وقِيسَ بها: <b>الستُّ كلُّها تُحَلُّ في السكونِ</b> — <code>135deg</code> و<code>0</code> و<code>35%</code> و<code>18%</code> و<code>-30%</code> و<code>40%</code> — <b>واسمُ ضبطٍ غيرُ مُسجَّلٍ يرجعُ سِلسِلةً خالية</b>. <b>وقِيسَ بنَزعِ <code>--tilt</code>، وذاك هو المقصود:</b>
          <br />
          <code>::before background-image: conic-gradient(from 135deg, …)</code> بها · <code>none</code> بلا
          <br />
          <b>اسمٌ واحدٌ لا يُحَلُّ فلا هالةَ أصلًا.</b> وأُعيدَت من قِيَمِها الابتدائيّةِ نفسِها فحسمَتها فردًا فردًا: <code>&lt;angle&gt;</code> لـ<code>--tilt</code>، و<code>&lt;number&gt;</code> لـ<code>--lift</code>، و<code>&lt;percentage&gt;</code> للأربعِ الباقية.
          <br /><br />
          <b>وواحدةٌ منها مكسورةٌ على الوجهَين، وتلك للمؤلِّف:</b> <code>calc(var(--scan) * 1%)</code> و<code>--scan: -30%</code>. <b>ونسبةٌ في نسبةٍ ليست حسابًا صحيحًا</b>، و<code>--scan</code> لا يصِحُّ أن يكونَ <code>&lt;number&gt;</code> بدلًا من ذلك <b>لأن <code>-30%</code> تصيرُ قيمةً ابتدائيّةً باطلةً فيسقُطُ التسجيل</b>. <b>فبأيِّ وجهٍ سُجِّلَ يسقُطُ ذاك التصريحُ وحدَه</b>، وتَرجِعُ مواضعُ الطبقاتِ الثلاثِ إلى <code>0% 0%</code> — <b>والأولى والثالثةُ تُريدانِ ذلك بعينِه، فالخسارةُ المرئيّةُ هي المَسحةُ وحدَها</b>. والعلاجُ محرفٌ واحد: <code>calc(var(--scan) * 1)</code>.
          <br /><br />
          <b>وزائفةٌ لا وجودَ لها إلا في استعلامِ وسائط:</b> <code>.scene::before</code> يظهرُ مرّةً واحدةً في الملفِّ كلِّه، <b>داخلَ <code>@media (prefers-reduced-motion: reduce)</code></b>، يضبِطُ <code>opacity: 0.35</code>. <b>ولا شيءَ في أيِّ موضعٍ يُصرِّحُ لها <code>content</code>، فالنَّقضُ لا شيءَ لديه يَنقُضُه.</b> <b>وما أُرِيدَ إخفاؤُه ليس في الملفِّ الذي وصَل.</b>
          <br /><br />
          <b>والزرُّ رماديٌّ حتى تلمِسَه:</b> <code>filter: grayscale(100%) brightness(0.9)</code> أساسًا، و<code>grayscale(0%)</code> تمريرًا، <b>على <code>1200ms</code> — أبطأُ انتقالٍ في هذا السجلِّ كلِّه، والوحيدُ الذي المُنتقِلُ فيه هو <em>لوحةُ الألوانِ كلُّها</em></b>. وقِيسَ: <code>grayscale(1) brightness(0.9)</code> سكونًا، وقائمةُ مُدَدٍ من سبعةِ بنودٍ آخرُها <code>1.2s</code>. <b>والمساراتُ ثلاثةٌ وخمسونَ عَدًّا، وامتلاؤُها بالفهارسِ عينِها التي سمّاها الـCSS:</b> <code>خمسةٌ داكنةٌ [1, 2, 16, 45, 53]</code> · <code>ستٌّ وعشرونَ ذهبيّةٌ [3…29]</code> · <code>اثنتانِ وعشرونَ برتقاليّةٌ [30…52]</code>، <b>ومِحورا النخلتَين <code>34.5px 72px</code> و<code>195.5px 72px</code> — أي ١٥٪ و٨٥٪ من ٢٣٠ بالضبط</b>. <b>ومواضعُ طبقاتِ <code>::after</code> الثلاثِ كلُّها <code>0% 0%</code>، فسقوطُ <code>calc(-30% * 1%)</code> مَقيسٌ لا مُستَنتَج.</b> فالغروبُ موجودٌ في السكونِ ولا لونَ له. <b>وذاك <code>filter</code> يعملُ عملًا بنيويًّا أيضًا</b>: مُرشِّحٌ غيرُ <code>none</code> يُنشئُ سياقَ تراصُف، <b>وهو ما يُبقي <code>::before</code> عند <code>z-index: -2</code> داخلَ الزرّ</b>. <b>وأربعُ خاصّيّاتٍ مختلفةٍ أدَّت هذا العملَ في هذا السجلّ — <code>isolation</code> و<code>perspective</code> و<code>translate</code> والآنَ <code>filter</code> — وواحدةٌ منها فقط كُتِبَت له.</b>
        </SpecRow>

        <SpecRow name="شجرةٌ تختارُ بلَوحةِ المفاتيحِ ولا تُطلِقُ نقرة، ومُضيفٌ بلا إعادةِ ضبطٍ يُعيدُ الصفوفَ أزرارَ نظامِ تشغيل" bare specimen={
          <div className="flex w-full items-start justify-center rounded-2xl bg-[var(--color-background)] px-6 py-10" dir="ltr">
            <div className="w-full max-w-[240px] rounded-lg bg-[var(--color-card)] py-2">
              <TreeView variant="line" activeColor="text-orange-600 dark:text-orange-500" defaultSelectedId="announcement">
                <TreeSection title="Getting Started" defaultExpanded={true}>
                  <TreeItem id="installation" label="Installation" icon={Download} />
                </TreeSection>

                <TreeSection title="Foundations" defaultExpanded={true}>
                  <TreeItem id="color" label="Color" icon={Palette} />
                  <TreeItem id="typography" label="Typography" icon={Type} />
                </TreeSection>

                <TreeSection title="Base" defaultExpanded={true}>
                  <TreeItem id="announcement" label="Announcement" />
                  <TreeItem id="avatar" label="Avatar" />
                  <TreeItem id="badge" label="Badge" />
                  <TreeItem id="breadcrumb" label="Breadcrumb" />

                  <TreeFolder id="buttons-folder" label="Buttons" defaultExpanded={false}>
                    <TreeItem id="button" label="Button" />
                    <TreeItem id="button-group" label="Button Group" />
                    <TreeItem id="icon-button" label="Icon Button" />
                    <TreeItem id="link-button" label="Link Button" />
                  </TreeFolder>

                  <TreeItem id="carousel" label="Carousel" badge="NEW" />
                  <TreeItem id="checkbox" label="Checkbox" />
                  <TreeItem id="chip" label="Chip" />
                  <TreeItem id="close-button" label="Close Button" />
                  <TreeItem id="date-picker" label="Date Picker" />
                  <TreeItem id="divider" label="Divider" />
                  <TreeItem id="dropdown" label="Dropdown" />

                  <TreeFolder id="forms-folder" label="Form Controls" defaultExpanded={false}>
                    <TreeItem id="input" label="Input" />
                    <TreeItem id="input-otp" label="Input OTP" badge="NEW" />
                    <TreeItem id="file-upload" label="File Upload" badge="NEW" />
                    <TreeItem id="radio" label="Radio" />
                  </TreeFolder>

                  <TreeItem id="notification" label="Notification" badge="NEW" />
                  <TreeItem id="pagination" label="Pagination" />
                </TreeSection>
              </TreeView>
            </div>
          </div>
        }>
          <b>خمسةُ خِلافاتٍ عن الرفعةِ كما وصَلَت، كلُّها مُلجِئةٌ لا اختياريّة، وتُعلَنُ واحدةً واحدة.</b>
          <br /><br />
          <b>الأوّلُ يُسقِطُ الترجمة:</b> <code>AnimatePresence</code> مُستورَدٌ ولا يُرسَمُ أبدًا، و<code>noUnusedLocals</code> مُفعَّلٌ هنا. <b>والثاني يُسقِطُ المُدقِّق:</b> <code>TreeViewProps extends HTMLAttributes</code> ثمّ يُعيدُ إعلانَ <code>onSelect</code> بتوقيعِ <code>(id: string) =&gt; void</code> — و<code>HTMLAttributes</code> يُعلِنُه <code>ReactEventHandler</code>. <b>وذاك تعارُضٌ لا امتداد: TS2430 تحتَ أيِّ إعدادٍ صارم</b>، والعلاجُ <code>Omit&lt;…, "onSelect"&gt;</code> ولا يُغيِّرُ شيئًا وقتَ التشغيل.
          <br /><br />
          <b>والثالثُ عيبٌ حقيقيٌّ لا اصطلاحُ مستودع:</b> الطَيُّ بـ<code>grid-rows-[0fr]</code> مع <code>aria-hidden</code>، <b>والأزرارُ داخلَ صفٍّ بارتفاعٍ صِفريٍّ تبقى في تَرتيبِ التنقُّل</b> — قِيسَ: <b>ثمانيةُ أزرارٍ داخلَ مُجلَّدَينِ مطويَّين</b>. و<code>aria-hidden</code> فوقَ ما يُركَّزُ عليه هو <code>aria-hidden-focus</code> عندَ axe، <b>وهو عيبٌ في ذاتِه: مستخدمُ لَوحةِ المفاتيحِ يدخُلُ مُجلَّدًا مطويًّا ويقفُ على عناصرَ قيلَ لقارئِ الشاشةِ إنّها غيرُ موجودة</b>. و<code>inert</code> كلمةٌ واحدةٌ أقوى: تُخرِجُه من التَّرتيبِ <b>ومن شجرةِ الإتاحةِ معًا</b>، ولا يتغيّرُ مَظهرٌ واحد.
          <br /><br />
          <b>والرابعُ فَرقُ مُضيفٍ لا خطأَ رفعة، وهو أثقلُها أثرًا:</b> <code>src/tailwind.css</code> يقولُ في سطرِه الثاني «utilities only, deliberately without preflight»، ويَعُدُّ <code>preflight.css</code> في سطرِ العشرينَ <b>غيرَ مُستورَد</b>. وكلُّ مكوِّنِ Tailwind مكتوبٌ على تلكَ الأرضيّة. <b>فبلا إعادةِ الضبطِ ظهرَ كلُّ صفٍّ زرَّ نظامِ تشغيل</b>، مَقيسًا قبلَ العلاج:
          <br />
          <code>border 2px outset rgb(0, 0, 0)</code> · <code>background rgb(239, 239, 239)</code> · <code>appearance auto</code> — <b>ولا قاعدةَ واحدةٌ في أوراقِ الأنماطِ تُطابِقُه</b>: تلكَ قِيَمُ وكيلِ المستخدِمِ نفسِها.
          <br /><br />
          <b>وثلاثةٌ ممّا قرأتُه أوّلَ مرّةٍ كان خطأً مِنّي، ولا أثرَ له في العلاج:</b> <code>font: -apple-system</code> بدا خطَّ نظام، <b>وهو أوّلُ عائلةٍ في مِكدَسِ هذا المستودعِ نفسِه</b> — <code>-apple-system, BlinkMacSystemFont, "SF Pro Text", "IBM Plex Sans Arabic"…</code> — <b>مُتطابِقٌ على الزرِّ وأبيه و<code>body</code></b>، فالخطُّ لم يكن خاطئًا قطّ. و<code>border-radius: 5px</code> هو <code>--radius-md</code> الذي يُخرِجُه هذا المستودعُ إلى <code>var(--nova-radius-field)</code>. <b>فالناقصُ ثلاثةُ تصريحاتٍ لا ستّة.</b>
          <br /><br />
          <b>والخامسُ حُكمُ <code>axe</code> لا رأيي:</b> <code>aria-required-children</code> سقطَ في <b>ستٍّ من الحُزَمِ السبع</b>، لأن <code>role="tree"</code> لا يملِكُ إلا <code>treeitem</code> و<code>group</code>، <b>وكلُّ قِسمٍ وكلُّ مُجلَّدٍ يُسلِّمُه <code>&lt;div&gt;</code> عاريًا</b>. فوُضِعَ <code>role="none"</code> على الأغلفةِ البِنيويّةِ الستّ، <b>فخرجَت من الشجرةِ ولم يتغيّرْ تخطيطٌ واحد</b>، وصارَ زرُّ القِسمِ <code>treeitem</code> — <b>وهو ما يفعلُه أصلًا: يُوسِّعُ ويَطوي ويحملُ <code>aria-expanded</code></b>.
          <br /><br />
          <b>وشارةُ «NEW» تسقُطُ في <code>night</code> وحدَها:</b> <code>#51a2ff</code> على <code>#34456a</code> = <b>3.61</b> عندَ 10px عريض، والمطلوبُ 4.5 — <b>عُقدتان، والحُزَمُ الستُّ الأُخرى تعبُر</b>. والزوجُ أزرقُ <b>مُصلَّدٌ لا رُكنيّ</b> (<code>text-blue-600 dark:text-blue-400</code>)، <b>ولا شيءَ لي فيه لأحذفَه</b> — فحُمِلَ على الإعفاءِ المُسمّى الذي في هذا المستودعِ لهذه الحالةِ بعينِها: <b>الرقمُ مطبوع، وأيُّ زوجٍ آخَرَ ما يزالُ يُسقِط، والقرارُ للمالك</b>. <code>REFERENCE-CONTRAST.md</code> يُسجِّلُه، والعَدُّ ١٩٤ من ٣٠٠.
          <br /><br />
          <b>وأخطرُ ما في الرفعةِ ليس خِلافًا بل قِياسًا: تختارُ بلَوحةِ المفاتيحِ ولا تُطلِقُ نقرة.</b> <code>handleKeyDown</code> يعترضُ <code>Enter</code> و<code>Space</code> ويستدعي <code>preventDefault()</code> ثمّ <code>onSelect</code> — <b>والعُنصرُ <code>&lt;button&gt;</code>، وهو يُفعَّلُ بهما أصلًا</b>. فالمنعُ يُلغي التفعيلَ الأصليَّ الذي كان سيُنتِجُ <code>click</code>. وقِيسَ <b>بضَغطاتٍ حقيقيّةٍ عبرَ المُتصفِّحِ لا بأحداثٍ مُصطنَعة</b> (والمُصطنَعُ لا يُنتِجُ فِعلًا افتراضيًّا أصلًا، فلا يُثبِتُ شيئًا):
          <br />
          <code>Enter → 0 نقرة</code> · <code>Space → 0 نقرة</code> · <code>نقرةُ فأرة → 1</code> · <b>و<code>aria-selected</code> انتقلَ إلى «Avatar» في الحالتَين</b>
          <br />
          <b>فالاختيارُ يعمل، ومُستهلِكٌ يُمرِّرُ <code>onClick</code> يحصُلُ عليه بالفأرةِ ولا يحصُلُ عليه بلَوحةِ المفاتيحِ أبدًا.</b> والعلاجُ حَذفُ المُعالِجِ كلِّه: الزرُّ يفعلُ ما يفعلُه بلا مُساعَدة. <b>وتُرِكَ كما هو لأنه سلوكُ الرفعة، وهذا موضِعُ ذِكرِه.</b>
          <br /><br />
          <b>وثمانيةَ عشرَ مَوقِفَ تنقُّلٍ في شجرةٍ واحدة.</b> نَمَطُ الشجرةِ في WAI-ARIA يُحدِّدُ <b>واحدًا</b> ثمّ أسهُمًا. وقِيسَ: <code>26</code> عُنصرَ شجرةٍ، <code>18</code> منها يُبلَغُ بـ<code>Tab</code> (والثمانيةُ الباقيةُ داخلَ <code>inert</code>)، و<code>aria-level</code> على <b>صِفرٍ من ٢٦</b>. <b>وهذا النِّصفُ المُتساهِلُ من نَمَطٍ رأيتُ نِصفَه القاسيَ في هذا المستودعِ نفسِه: هناكَ كان واحدٌ يُبلَغُ من ٤٥، وهنا ثمانيةَ عشرَ حيثُ يُرادُ واحد.</b>
          <br /><br />
          <b>والسِّتَّةَ عشرَ في <code>child.offsetTop + 16</code> نِصفُ ارتفاعِ الصفّ.</b> قِيسَ: <code>ارتفاعُ الصفِّ 32</code> · <code>مَوضِعُ أوّلِ مِرفَقٍ 16</code> · <code>النِّصفُ 16</code>. <b>فـ<code>h-8</code> مكتوبٌ مرّتَين: مرّةً صِنفًا ومرّةً رقمًا في ملفِّ TypeScript</b> — بدِّلْه إلى <code>h-9</code> فتُشيرُ كلُّ المَرافِقِ فوقَ المركزِ ببكسِلَين، ولا شيءَ يُنبِّه. <b>والعلاجُ قراءةُ الارتفاعِ من الصندوقِ لا كتابتُه.</b>
          <br /><br />
          <b>والرسمُ كلُّه بخصائصَ فيزيائيّةٍ لا منطقيّة:</b> <code>pl-8</code> و<code>left-[12.5px]</code> و<code>text-left</code> و<code>ml-auto</code>. <b>وفي مستودعٍ عربيٍّ أوّلًا هذا يعني أنّ الإزاحةَ تنتقلُ إلى الطَّرَفِ الخَلفيِّ في RTL بينما يبقى الخطُّ عندَ <code>left: 12.5px</code></b> — <b>فتنفصِلُ الخطوطُ عن الصفوفِ التي تصِلُها</b>. والعارضةُ تُعلِنُ <code>dir="ltr"</code> كما تفعلُ لكلِّ رفعةٍ مرسومةٍ للاتّجاهِ اللاتينيِّ، <b>فما قِستُه هو LTR وحدَه، وهذا استنتاجٌ من التصريحاتِ لا قياسٌ ــ ويُقالُ كذلك</b>. والعلاجُ <code>ps-8</code> و<code>start-[12.5px]</code> و<code>text-start</code> و<code>ms-auto</code>.
          <br /><br />
          <b>وما يعملُ يعملُ جيّدًا:</b> الخطُّ المُضاءُ يتبَعُ الاختيارَ فِعلًا — قِيسَ المسارُ قبلَ وبعد: <code>M0.5 0 V11 Q0.5 16 5.5 16 H11.5</code> ثمّ <code>V113.1 Q0.5 118.1 …</code> بسُمكِ <code>1.5</code> مقابلَ <code>1</code> للخطوطِ الساكنة. <b>والمَرافِقُ مرسومةٌ بمُنحنى تربيعيٍّ واحدٍ لكلِّ صفٍّ من عَمودٍ واحد</b>، و<code>ResizeObserver</code> يُعيدُ الحسابَ عندَ كلِّ تغيُّرِ ارتفاع، <b>فطَيُّ مُجلَّدٍ يُعيدُ رسمَ الشجرةِ كلِّها بلا حالةٍ إضافيّة</b>.
        </SpecRow>

        <SpecRow name="بطاقةٌ وصلَت بلا الـCSS الذي يُحرِّكُها، وتُبدِّلُ حالتَها بالنقرِ وحدَه" bare specimen={
          <div className="flex w-full items-start justify-center rounded-2xl bg-[var(--color-background)] px-6 py-10" dir="ltr">
            <FraudCard blockedEmails={BLOCKED_EMAILS} />
          </div>
        }>
          <b>ثلاثةُ أصنافٍ مُسمّاةٍ ولا واحدٌ منها مُعرَّف:</b> <code>clbeam-container</code> و<code>clbeam</code> و<code>clbeam-line-1</code>. و<code>grep -rn clbeam src/</code> <b>لا يُعيدُ شيئًا سوى هذا الملفِّ نفسِه</b>. وليسَت زينةً: الدائرةُ الحمراءُ التي كانت تُحرِّكُها <b>ساكنةٌ عند <code>cx=0 cy=0</code></b>، ولا تُرى إلا حيثُ تتقاطعُ مع قِناعٍ مقصوصٍ من الخطّ — <b>فبلا قاعدةٍ تُحرِّكُها يكونُ أثرُ البطاقةِ المُميَّزُ لطخةً ساكنةً عندَ رأسِ السِّلك. الـCSS لم يصِلْ مع المكوِّن.</b>
          <br /><br />
          <b>فالحركةُ أدناه مكتوبةٌ هنا، وتقولُ ذلك عن نفسِها.</b> وهي أصغرُ ما يُحقِّقُ ما يقصِدُه الوَسمُ صراحةً — <b>شُعاعٌ يسري في السِّلك</b> — ومَقودُها <code>offset-path</code> <b>الذي يتبَعُ المسارَ الحقيقيَّ لا يُقارِبُه بإزاحتَين</b>. <b>وقِيسَ أنه يسري:</b> <code>offsetDistance</code> من <code>25.675%</code> إلى <code>48.325%</code> في تِسعِ مئةِ جُزءٍ من الثانية.
          <br /><br />
          <b>والمسارُ صارَ ثابتًا واحدًا.</b> الرفعةُ كتبَت الإحداثيّاتِ <b>مرّتَين</b> — للخطِّ المرئيِّ وللقِناع — <b>وإعطاءُ الشُّعاعِ نسخةً ثالثةً هو كيفَ يبدأُ رسمٌ في مُناقَضةِ نفسِه</b>. فتصريحٌ واحدٌ وثلاثةُ قُرّاء، <b>وذاك يَطوي ازدواجَ الرفعةِ أيضًا لا يزيدُ عليه</b>.
          <br /><br />
          <b>وبطانيّةُ الحركةِ المُخفَّضةِ في هذا المستودعِ CSS</b> — <code>animation-duration: 1ms</code> — <b>ولا تبلُغُ حركةً تُدِيرُها JavaScript إطارًا إطارًا</b>. فشُعاعٌ لانهائيٌّ كان سيظلُّ يسري لقارئٍ طلبَ السكون. و<code>useReducedMotion</code> هو ما تنشُرُه المكتبةُ لهذا بعينِه. <b>مَقيسٌ:</b> <code>offsetDistance: 0%</code> <b>ولا يتحرّك</b>، والدوّارةُ المُنقَّطةُ كذلك.
          <br /><br />
          <b>والبطاقةُ كلُّها كانت تُبدَّلُ بالنقرِ على <code>&lt;div&gt;</code>: بلا دَورٍ، وبلا <code>tabIndex</code>، وبلا مُعالِجِ مِفتاح.</b> فكلُّ قارئٍ على لَوحةِ المفاتيحِ لا يرى إلا الحالةَ المُغلَقة — <b>وهي الحالةُ التي تُخفي الأربعةَ صفوفًا التي وُجِدَت البطاقةُ لعَرضِها</b>. فصارَت <code>role="button"</code> بـ<code>tabIndex</code> و<code>aria-expanded</code> واسمٍ، <b>و<code>Enter</code> و<code>Space</code> يُبدِّلانِ كما يُبدِّلُ النقر</b>. ومَقيسٌ: <code>aria-expanded</code> <code>false → true</code> عندَ التركيز، ثمّ <code>false</code> بعدَ <code>Enter</code>.
          <br /><br />
          <b>والتدرُّجُ المُتتابِعُ يعملُ فِعلًا، وقِيسَ في طَيرانِه</b> — أربعةُ عناوينَ بريدٍ في لحظةٍ واحدةٍ بعدَ ثانيةٍ من الفتح:
          <br />
          <code>مُغلَق</code> — الأربعةُ عندَ <code>0</code> و<code>blur(10px)</code>، والأوقاتُ <code>0</code> و<code>blur(5px)</code>، والصُّلبانُ <code>0</code>
          <br />
          <code>مفتوح</code> — <code>1.00 · 1.00 · 0.83 · 0.00</code> <b>والضبابُ يتبَعُ: 0 · 0 · 1.70px · 10px</b>
          <br />
          <code>مُغلَقٌ ثانيةً</code> — <code>0 · 0 · 0.12 · 0.15</code>، يَنحلُّ بالترتيبِ نفسِه
          <br />
          <b>وذاك <code>staggerChildren: 0.08</code> و<code>delayChildren: 0.15</code> مرئيَّينِ رقمًا.</b>
          <br /><br />
          <b>وزوجٌ واحدٌ في البطاقةِ كان لِزامًا عليَّ إصلاحُه لا حَملُه:</b> العنوانُ <code>text-primary</code>، وهو <code>--color-primary</code> الذي يُخرِجُه هذا المستودعُ إلى <code>--nova-action</code> — <b>تعبئةُ العائلةِ لا حِبرُها</b> — على أرضٍ تُصلِّدُها الرفعةُ <code>bg-neutral-50</code>. <b>مَقيسًا: 5.05 في الحُزمةِ الافتراضيّةِ و<code>2.25</code> في mint</b> التي إجراؤُها أخضرُ مائيٌّ فاتح. <b>والأرضُ للمؤلِّفِ والحِبرُ لي، فقولُ «لا شيءَ لي في الزوجِ» لا يصِحُّ هنا</b> — فصارَ <code>--nova-action-ink</code>، <b>وهو التصحيحُ نفسُه المُطبَّقُ في أربعةَ عشرَ موضِعًا آخَرَ في هذا المستودعِ اليوم</b>.
          <br /><br />
          <b>وزوجانِ حُمِلا لأنّ نِصفَيهما كِليهما للمؤلِّف:</b> <code>#737373</code> على <code>#f5f5f5</code> بـ<b>4.34</b>، وعلى <code>#171717</code> بـ<b>3.78</b> — لافِظةٌ وطابَعُ وقت. <b>الرقمُ مطبوعٌ والقرارُ للمالك</b>، والعِلاجُ <code>text-neutral-600 dark:text-neutral-400</code> ويَحسِمُ الاثنَين.
          <br /><br />
          <b>وثلاثةٌ قرأتُها خطأً وسُحِبَت قبلَ أن تُكتَب:</b> ظننتُ العنوانَ والوصفَ <b>غائبَينِ عن الرَّسم</b> من صورةٍ التقطتُها، <b>والقياسُ يقولُ صندوقًا <code>316×21</code> بنسبةِ 5.05</b>؛ وظننتُ <code>text-white</code> على الحاويةِ يُبيِّضُ نصًّا، <b>والعَدُّ صِفرٌ من عُقَدِ النصِّ كلِّها</b>؛ وقرأتُ أوّلَ بريدٍ بشفافيّةِ <code>1</code> في الحالةِ المُغلَقةِ — <b>وكان ذاك عنوانَ البطاقةِ نفسَه، لا أوّلَ صفّ</b>. <b>عاشرُ خطأِ مُحدِّدٍ غيرِ مُرسًى في هذا العمل، وأُرسِيَ فانقلبَ الجوابُ.</b>
        </SpecRow>

        <SpecRow name="أوّلُ رفعةٍ في هذا السجلِّ تُجيبُ عن الحركةِ المُخفَّضةِ قبلَ أن أسألَ" bare specimen={
          <div className="flex w-full items-center justify-center rounded-2xl bg-[#0b0d12] px-6 py-24" dir="ltr">
            <FlameWrap radius={16} height={150} className="w-[260px]">
              <div className="rounded-2xl border border-white/10 bg-[#14171f] p-6 text-white">
                <p className="text-[11px] uppercase tracking-widest text-white/50">Canvas UI</p>
                <p className="mt-2 text-lg font-semibold">Flame Wrap</p>
                <p className="mt-1 text-xs text-white/60">WebGL2 over html-in-canvas.</p>
              </div>
            </FlameWrap>
          </div>
        }>
          <b>هذه لم تُرسَلْ نصًّا بل أُمرًا:</b> <code>npx shadcn@latest add @canvas-ui/flame-wrap-react</code>. <b>والأداةُ حلَّت الاسمَ وكتبَت ملفًّا واحدًا وأضافَت السِّجِلَّ إلى <code>components.json</code> بنفسِها:</b> <code>"@canvas-ui": "https://canvasui.dev/r/{'{'}name{'}'}.json"</code> — <b>وأُبقيَ لأنه يُسجِّلُ من أينَ جاءَ المكوِّن</b>. وثمانِ مئةٍ وثلاثةٌ وعشرونَ سطرًا: مُظلِّلُ WebGL2 كامل، بضجيجِ سِمبلِكس وحرَكيّةٍ مُضطربةٍ وشَرَرٍ وسُخامٍ وجَمرٍ وتفحيمٍ، على <code>html-in-canvas</code>.
          <br /><br />
          <b>وأوّلُ ما قِيسَ هو أنّ المِيزةَ الأساسيّةَ غيرُ موجودةٍ في هذا المُتصفِّح:</b>
          <br />
          <code>webgl2: true</code> · <b><code>htmlInCanvasApi: false</code></b> — <code>drawElementImage</code> و<code>requestPaint</code> لا وجودَ لهما
          <br />
          <b>فالمسارُ الذي يعملُ فِعلًا هو المسارُ الاحتياطيّ</b>: قماشُ المصدرِ <code>display: none</code>، والمحتوى يُرسَمُ في الـDOM عاديًّا، والنارُ طبقةٌ فوقَه بـ<code>aria-hidden</code> و<code>pointer-events: none</code>. <b>وقِيسَ أنه يعمل: <code>contentVisible: true</code> والنصُّ يُقرأُ كما كُتِب.</b> <b>وذاك أفضلُ ما في الرفعة: تدهورٌ لَبِقٌ مبنيٌّ باختبارِ مِيزةٍ لا بتخمينِ مُتصفِّح</b> — <code>supportsHtmlInCanvas()</code> يسألُ عن الدالّتَينِ بالاسمِ ثمّ يُقرِّر.
          <br /><br />
          <b>وهي أوّلُ رفعةٍ في هذا السجلِّ كلِّه تُجيبُ عن الحركةِ المُخفَّضةِ من نفسِها.</b> ثمانٍ وتسعونَ رفعةً قبلَها إمّا تجاهلَتها أو تركَتها لبطانيّةِ الـCSS — <b>وبطانيّةٌ لا تبلُغُ حلقةَ <code>requestAnimationFrame</code></b>. وهذه تسألُ <code>matchMedia</code>، وتُصغي إلى <code>change</code>، <b>وتُخرِجُ نفسَها من الحلقةِ لا تُبطِئُها</b>:
          <br />
          <code>if (reducedMotion && !contentDirty) {'{'} running = false; return; {'}'}</code>
          <br />
          <b>مَقيسًا: إطارٌ ساكنٌ واحدٌ مرسومٌ ثمّ توقُّف</b> — النارُ حاضرةٌ شكلًا وغائبةٌ حركةً، وهو الجوابُ الصحيحُ بعينِه.
          <br /><br />
          <b>وثلاثُ عِناياتٍ أُخرى نادرةٌ في هذا السجلّ:</b> <code>IntersectionObserver</code> يُوقِفُ الحلقةَ حينَ يخرُجُ العُنصرُ من الشاشة؛ و<code>ResizeObserver</code> على القماشِ <b>وعلى المحتوى معًا</b> لا على أحدِهما؛ و<code>destroy()</code> يُفرِغُ كلَّ ما حجَزَه — نسيجًا وبرنامجًا ومُظلِّلَينِ ومَخزنًا — <b>ويفصِلُ المُراقِبَينِ ويُزيلُ مُستمِعَ استعلامِ الوسائط</b>. <b>وتَسريبُ سياقِ WebGL هو ما تفعلُه أكثرُ مكوِّناتِ الشيدر، وهذه لا تفعلُه.</b>
          <br /><br />
          <b>وثلاثةٌ تُقالُ ولا تُلمَس، لأنها المؤلِّفُ لا العيب:</b>
          <br />
          <b>١.</b> اللونُ الافتراضيُّ <code>[0.31, 0.54, 1]</code> — <b>أزرقٌ</b>، لمكوِّنٍ اسمُه «لِفافةُ اللهب». <b>ليس عيبًا، لكنّه يستحقُّ الذِّكرَ لمن يُدخِلُه متوقِّعًا برتقاليًّا.</b>
          <br />
          <b>٢.</b> <code>style={'{'}{'{'} position: "relative", ...style {'}'}{'}'}</code> — <b>ومُستهلِكٌ يُمرِّرُ <code>position</code> في <code>style</code> يَغلِبُ ويكسِرُ القِماشَينِ المُطلَقَين</b>. سطرٌ واحد، وعِلاجُه عَكسُ التَّرتيب.
          <br />
          <b>٣.</b> لا مُعالِجَ لـ<code>webglcontextlost</code>: <b>بعدَ فَقدِ السياقِ تستمرُّ الحلقةُ تُصدِرُ نداءاتِ GL إلى سياقٍ ميّت.</b>
          <br /><br />
          <b>وخطأٌ في مِسباري، حاديَ عشرَ في هذا العمل، وسُحِبَ قبلَ أن يُكتَب:</b> قرأتُ بِكسِلاتِ قماشِ الخَرجِ بـ<code>readPixels</code> فعادَت أصفارًا كلُّها، <b>فكِدتُ أُبلِغُ أنّ النارَ لا تُرسَم</b>. والسببُ أنّ السياقَ لا يُنشَأُ بـ<code>preserveDrawingBuffer</code>، <b>فمَخزنُ الرسمِ يُمسَحُ بعدَ التركيبِ والقراءةُ بعدَه لا تعني شيئًا</b>. <b>والصورةُ هي الحُكم</b>، وهي تُظهِرُ حَدًّا أزرقَ مُنصهِرًا يُعانِقُ الحرفَ الأعلى والحافّتَين. <b>ولا يُبلَّغُ عن عيبٍ لأنّ أداةَ قياسٍ عادَت صِفرًا.</b>
          <br /><br />
          <b>والسِّجِلُّ في وحدةِ التحكُّمِ تحذيراتٌ لا أخطاء</b> — «الرجوعُ التلقائيُّ إلى WebGL البرمجيِّ» و«توقُّفُ المُعالِجِ عندَ <code>ReadPixels</code>» — <b>وكِلاهما من هذه البيئةِ لا من المكوِّن</b>، و<code>RUNTIME_ERRORS</code> يَعُدُّ الأخطاءَ وحدَها فبقيَ صِفرًا. <b>و<code>console.error</code> الوحيدُ في الملفِّ عندَ فشلِ ترجمةِ المُظلِّلِ — ولم يُطلَقْ.</b>
        </SpecRow>

        <SpecRow name="مُحاكِي رَفعٍ يُبدِّلُ داكنَه بمِفتاحٍ لا وجودَ له في هذا المُضيف" bare specimen={
          /* `[&>div]:min-h-0` is specimen-side, not a change to the upload: the
             component's root is `min-h-screen`, so it ships a full-page frame and
             would make this row a viewport tall. */
          <div data-upload-specimen="" className="w-full [&>div]:min-h-0" dir="ltr">
            <UploadProgress />
          </div>
        }>
          <b>هذه أيضًا أمرٌ لا نصّ</b>، ورابطُها يحملُ <b>رمزًا سِريًّا</b> في سلسلةِ الاستعلام. <b>ففُتِّشَت الشجرةُ كلُّها عن الرمزِ قبلَ أيِّ إيداع</b>: <code>grep</code> على السلسلةِ نفسِها وعلى النَّمَطِ <code>aic_[a-f0-9]{'{'}16,{'}'}</code> — <b>ولا أثرَ في ملفٍّ واحد</b>. والأداةُ لم تُودِعْ الرابطَ (بخِلافِ سِجِلٍّ مُسمّى، الذي يحتاجُ مَدخلًا في <code>components.json</code>)، <b>لكنّ الفَحصَ هو الذي يُثبِتُ ذلك لا الافتراض</b>. وأضافَت اعتمادًا واحدًا: <code>@phosphor-icons/react</code>.
          <br /><br />
          <b>وأربعةُ خِلافاتٍ، كلُّها مُلجِئة:</b>
          <br /><br />
          <b>١.</b> <code>subtitle</code> مُحسوبٌ ولا يُقرأُ أبدًا، <b>وJSX يُعيدُ بناءَ الجملةِ نفسِها سطريًّا بعدَه</b> — تنفيذانِ لعبارةٍ واحدةٍ أحدُهما ميّت، و<code>noUnusedLocals</code> يُسقِطُ البِناء. <b>حُذِفَ الميّتُ لا المُستعمَل.</b>
          <br /><br />
          <b>٢.</b> <b>أربعةُ أزرارٍ بلا اسمٍ مُتاحٍ إطلاقًا</b> — مَقيسًا <code>named: 0 من 4</code>، و<code>axe</code> يُبلِغُ <code>button-name x4</code>. <b>زرٌّ لافِظتُه كلُّها زُجاجٌ بحجمِ 15px يُنطَقُ «زِرّ» ولا شيءَ غير</b>، فإيقافُ الرَّفعِ وإعادتُه وتوسيعُه وإلغاؤُه أربعةُ أزرارٍ متطابقةٌ لمن لا يُبصِر. وصارَ <code>label</code> <b>مطلوبًا لا اختياريًّا</b>: اسمٌ اختياريٌّ اسمٌ يُنسى عندَ أوّلِ استدعاءٍ تالٍ.
          <br /><br />
          <b>٣. وأطرفُها: المكوِّنُ يحملُ آليّتَينِ للوضعِ الداكنِ، وهذا المُضيفُ يُشغِّلُ واحدةً منهما فقط.</b> <code>useDarkMode</code> يسألُ عن صنفِ <code>.dark</code> على جِذرِ المستند، <b>وهذا المستودعُ يُبدِّلُ بـ<code>data-theme</code></b> — و<code>src/tailwind.css</code> يقولُها في سطرِه السابعِ والأربعين: «not the <code>.dark</code> class Tailwind assumes». <b>لكنّ أصنافَ <code>dark:</code> في الملفِّ نفسِه تعملُ</b>، لأنّ المستودعَ يَصِلُ ذلكَ المُتغيِّرَ بـ<code>[data-theme]</code>. <b>والنتيجةُ مَقيسةٌ في حُزمةِ <code>night</code>:</b>
          <br />
          <code>إطارُ الصفحة → rgb(26, 26, 25)</code> <b>داكنٌ (من CSS)</b> · <code>أرضُ البطاقة → rgb(241, 241, 240)</code> <b>فاتحةٌ (من JS)</b> · <code>لونُ العنوان → rgb(26, 26, 24)</code>
          <br />
          <b>بطاقةٌ فاتحةٌ على صفحةٍ داكنة: مكوِّنٌ واحدٌ مشقوقٌ من نِصفِه.</b> فزِيدَ لِسؤالِ الدالّةِ مصدرٌ ثالث — <b>مِفتاحُ هذا المُضيفِ الحقيقيّ</b> — <b>وهذا وفاءٌ بمتطلَّبِ الرفعةِ لا تغييرٌ له</b>: وظيفةُ الدالّةِ كلُّها «اعرِفْ هل نحنُ داكنون». <b>وبعدَه: أرضُ البطاقةِ <code>rgb(38, 38, 35)</code> والعنوانُ <code>rgb(241, 241, 236)</code>.</b>
          <br /><br />
          <b>٤. وإعادةُ ضبطِ الأزرارِ مرّةً ثانية — وهذا يجعلُها نَمَطًا لا حادثة.</b> <code>2px outset rgb(0, 0, 0)</code> و<code>appearance: auto</code>، مَقيسًا على أزرارِ هذه البطاقةِ كما قِيسَ على صفوفِ شجرةِ الملفّاتِ قبلَها. <b>وأيُّ رفعةٍ مكتوبةٍ لـTailwind تَنزِلُ هنا تحتاجُ هذه التصريحاتِ الثلاثة</b>، وقولُها مرّةً أرخصُ من إعادةِ اكتشافِها لكلِّ مكوِّن.
          <br /><br />
          <b>وثلاثةٌ تُقالُ ولا تُلمَس:</b> <code>min-h-screen</code> على الجِذرِ — <b>مكوِّنٌ يشحَنُ إطارَ صفحةٍ كامل</b> (والعارضةُ تُبطِلُه بمُحدِّدٍ على الغِلافِ لا بتعديلِ الرفعة)؛ و<code>useState([0, 0, 0])</code> بجوارِ <code>FILES</code> ذاتِ الثلاثة — <b>مصدرانِ لطولٍ واحد</b>، وإضافةُ ملفٍّ رابعٍ تُعطي <code>undefined</code>؛ و<code>#6366f1</code> — <b>نِيليُّ Tailwind الافتراضيُّ</b>، وماسِحُ هذا المستودعِ لا يُبلِغُ عنه (لأنه يُطارِدُ التدرُّجاتِ النيليّةَ لا التعبئةَ الواحدة) <b>لكنّه يستحقُّ الذِّكرَ لأنه أشهرُ عَلاماتِ الافتراضيّ</b>.
          <br /><br />
          <b>وأهمُّ ما أخرجَته هذه الرفعةُ ليس فيها: بوّابةُ الغِلافِ كانت تقيسُ إطارًا لم يَستقِرّ.</b> فبلَّغَ <code>axe</code> عن عنوانِ البطاقةِ <code>#e2e2d9</code> على <code>#e8e8e0</code> بنسبةِ <b>1.05</b> — <b>زوجٌ لا وجودَ له في المكوِّن</b>. وأُخِذَت ستُّ عيّناتٍ على مدى ستِّ ثوانٍ: <b><code>rgb(26, 26, 24)</code> على <code>rgb(241, 241, 240)</code> ثابتًا، أي نحوَ 13:1</b>. <b>فالمُخالَفةُ كانت القياسَ لا الكود.</b>
          <br /><br />
          <b>والبطانيّةُ في البوّابةِ تُجمِّدُ CSS ولا تبلُغُ حركةً تكتُبُ أنماطًا سَطريّةً كلَّ إطار</b> — وثلاثٌ من الرفعاتِ الأربعِ الأخيرةِ تفعلُ ذلك بعينِه. <b>فصارَت البوّابةُ تنتظرُ سكونَ الأنماطِ السَّطريّةِ نفسِها</b>: بَصمةٌ لكلِّ <code>[style]</code> في اللَّوح، وعيّنتانِ متطابقتانِ بفاصلِ 160ms. <b>ورَكضتانِ بعدَها متطابقتانِ حرفيًّا: <code>AXE=0</code> و<code>AXE=0</code>، والرماديّاتُ 201 و201 — والزوجُ الوهميُّ اختفى.</b> <b>والقِسمُ الذي لا يَسكُنُ أبدًا يُسمّى في <code>STILL_MOVING</code> بدلًا من أن يُخفى.</b>
        </SpecRow>

        <SpecRow name="تسعةُ آلافِ نقطةٍ بنصفِ ميغابايت، ولوحٌ صارَ أرضيَّةَ التخطيطِ بدلًا من أن يُقاسَ به" bare specimen={
          <div data-sphere-specimen="" className="flex w-full items-center justify-center rounded-2xl bg-black px-6 py-8" dir="ltr">
            {/* fluid on purpose: a fixed box cannot exercise the resize question,
                and the first probe that used one measured nothing and looked like
                a pass. */}
            <div className="aspect-square w-full max-w-[380px]">
              <ParticleSphere />
            </div>
          </div>
        }>
          <b>تسعةُ آلافِ نقطةٍ على كُرةٍ واحدة، وأغلى رفعةٍ نزلَت هنا.</b> فقبلَها كانت حِزمةُ الجافاسكربت <code>2,306,894</code> بايت وبعدَها <code>2,825,402</code> — <b>زيادةُ 518,508 بايت، أي نحوَ 506 كيلوبايت و22.5٪</b> — و<code>Imported3</code> وحدَها صارَت <code>922,538</code> بايت، <b>أكبرَ قِطعةٍ في البِناءِ كلِّه</b>. وهذا رقمٌ يُذكَرُ لا يُخفى: مالِكُ المستودعِ هو مَن يُقرِّرُ أتستحقُّ كُرةٌ نِصفَ ميغابايت.
          <br /><br />
          <b>١. والرفعةُ لم تكن تُبنى أصلًا.</b> فقد جاءَت بـ<code>three</code> ولم تَجِئْ بأنواعِه، فسقطَ <code>tsc</code> بـ<code>TS7016</code> — <b>عَطَبٌ قاتلٌ للبِناءِ لا رأيٌ في الذوق</b> — فنُزِّلَ <code>@types/three</code> تبعيّةَ تطوير، وعادَ البِناءُ أخضرَ من أوّلِ رَكضةٍ بعدَها.
          <br /><br />
          <b>٢. والكُرةُ كانت تدورُ إلى الأبدِ ولو طلبَ القارئُ السكون — وهذا مَقيسٌ لا مُفترَض.</b> صورتانِ للِّوحِ بفاصلِ 700ms تختلفانِ تحتَ <code>reduce</code> كما تختلفانِ بدونِه: <code>MOTION moved: true</code> و<code>REDUCED moved: true</code>. <b>وبطانيّةُ هذا المستودعِ في <code>tokens.css</code> هي <code>animation-duration: 1ms</code> — أي CSS، ولا يدَ لها على حَلقةِ <code>requestAnimationFrame</code></b>، فلم يكن في المشروعِ كلِّه ما يوقِفُها. <b>وبعدَ الوصل: <code>MOTION moved: true</code> و<code>REDUCED moved: false</code>.</b> وإطارٌ واحدٌ يُرسَمُ في الحالَتَين — <b>كُرةٌ ساكنةٌ خيرٌ من مُربَّعٍ أسود</b> — والمُستمِعُ يعني أنّ تغييرَ التفضيلِ يعملُ بلا إعادةِ تحميل.
          <br /><br />
          <b>٣. وأصعبُ ما في هذه الرفعةِ أنّ قياسي الأوّلَ لها كان لا يقيسُ شيئًا.</b> فقد قرأتُ في الكودِ أنّ <code>W</code> و<code>H</code> يُؤخَذانِ مرّةً عندَ التركيبِ ولا يُعادُ سؤالُهما، ثم اختبرتُ ذلك في غِلافٍ ثابتِ المقاس — <b>وصندوقٌ ثابتٌ لا شيءَ فيه يَتغيَّر، فرجعَ الاختبارُ بنجاحٍ كاذب</b>. فصارَت العيّنةُ هنا مائعةً بالقصد. وعلى خمسةِ عُروضٍ — 1440 و900 و600 و420 و360 — <b>بَقِيَ مُخزَّنُ الرَّسمِ وصندوقُ CSS كِلاهما <code>380x380</code> في كلِّ واحدٍ منها</b>، فلم تَعُدِ الكُرةُ شيئًا يُقاسُ بالتخطيطِ بل صارَت أرضيَّتَه: <b>عندَ 360 قِيسَ صندوقُ العيّنةِ 428 داخلَ عمودٍ عرضُه 270 — طَفَحٌ مِقدارُه 158 بكسلًا</b>.
          <br /><br />
          <b>ولا بوّابةَ عندَنا تَلتقِطُ ذلك.</b> فحَرَسُ الطَّفحِ يقرأُ <code>document.documentElement.scrollWidth</code>، <b>وهو يُساوي <code>innerWidth</code> عندَ كلِّ عَرض (360 = 360)</b> لأنّ سَلَفًا يَقُصُّ الزائد — <b>فالكَسرُ صامتٌ، وهذا سببُ إصلاحِه لا مُجرَّدِ الإبلاغِ عنه</b>. والوصلُ جُزآن، لأنّ أحدَهما وحدَه يَعقِد: <b>المُراقِبُ وحدَه لا يُجدي</b> — فالحاوي لا يَتَّسِعُ إلا بعَرضِ أوسَعِ أبنائِه، وأوسعُهم لوحٌ عرضُه 380، فيُبلِّغُ 380 إلى الأبد. <b>فإخراجُ اللَّوحِ من التدفُّقِ يَفُكُّ الحَلقة</b>: يصيرُ عرضُ الحاوي من أبيه، فيقرأُه المُراقِبُ، فيَتبَعُه المُخزَّن. <b>والقياسُ بعدَ الوصلِ: 380 ثم 380 ثم 380 ثم 282 ثم 222 — والصندوقُ يُساوي عمودَه، والطَّفحُ زال.</b>
          <br /><br />
          <b>٤. ولَقطةُ الوصولِ للعيّنةِ أرَت <code>{'{"role":"Canvas","name":""}'}</code></b> — عُقدةٌ بلا اسمٍ لا تُنطِقُ شيئًا وليست إلا ضجيجًا لقارئِ الشاشة. والكُرةُ زينة، <b>وجارُها في <code>canvasui/FlameWrap</code> يُخفي لوحَه بالطريقةِ نفسِها</b>، فأُخفِيَت — <b>وبعدَها: <code>{'{"role":"generic","name":""}'}</code> والعُقدةُ ذهبَت.</b>
          <br /><br />
          <b>وما فيها حسنٌ يُقالُ كما يُقالُ العَطَب:</b> <code>new THREE.WebGLRenderer</code> ملفوفٌ بـ<code>try</code> — <b>إطارٌ فارغٌ خيرٌ من صفحةٍ ساقطة</b> — والتفكيكُ كامل: <code>geo</code> و<code>mat</code> و<code>sprite</code> ثم <code>forceContextLoss()</code> ثم <code>dispose()</code>، <b>والمُتصفِّحُ يمنَحُ نحوَ ستةَ عشرَ سياقًا للصفحةِ الواحدة</b>، فالتركيبُ المُتكرِّرُ بلا هذا يُنفِدُها.
          <br /><br />
          <b>وثلاثةٌ تُقالُ ولا تُلمَس:</b> <code>t += 0.004</code> — <b>الدَّورةُ مَشدودةٌ إلى معدَّلِ الإطاراتِ لا إلى الزمن</b>، فلوحٌ بـ120Hz يدورُ ضِعفَ سُرعةِ لوحٍ بـ60؛ ولا تَبويبَ على الظُّهور — <b>الحَلقةُ تركُضُ وإن كان القِسمُ خارجَ الشاشة</b>؛ ولونُ المَحوِ <code>0x000000</code> صريحًا — <b>الكُرةُ تَفترِضُ أرضًا سوداءَ ولا تسألُ الحُزمة</b>، ولذلك أُلبِسَت هنا <code>bg-black</code> و<code>dir=&quot;ltr&quot;</code> على الغِلافِ بدلًا من تعديلِ الرفعة.
        </SpecRow>

        <SpecRow name="خمسُ صُوَرٍ فوريّة، وكودُ تكيُّفٍ سليمٌ لم يكن ليعملَ أبدًا حتى زِيدَت كلمة" bare specimen={
          /* `min-w-0`: the specimen cell is a grid item, and a grid item's automatic
             minimum size is its content, so the 462px stage pinned this column at
             462 even at a 360px viewport — which is also why the upload's own
             ResizeObserver never fired. One class hands the column its real width
             back and the author's scaling starts working.
             `MotionConfig`: same mechanism section one uses, because framer writes
             inline transforms per frame and the CSS blanket cannot reach them. */
          <MotionConfig reducedMotion="user">
            <div data-polaroid-specimen="" className="w-full min-w-0 [&>div]:min-h-0" dir="ltr">
              <PolaroidStack />
            </div>
          </MotionConfig>
        }>
          <b>أرخصُ رفعةٍ في هذه الدفعةِ بعدَ أغلاها.</b> فالكُرةُ قبلَها كلَّفَت نحوَ 506 كيلوبايت، وهذه كلَّفَت <code>3,278</code> بايتًا فقط — من <code>2,833,333</code> إلى <code>2,836,611</code> — <b>لأنّ <code>framer-motion</code> كان في الحِزمةِ أصلًا</b>. وحينَ يُعادُ استخدامُ ما هو موجودٌ يكونُ هذا هو الحساب.
          <br /><br />
          <b>١. والرفعةُ كانت تفتحُ طلبًا إلى طرفٍ ثالثٍ عندَ كلِّ تركيب.</b> <code>&lt;style&gt;@import url(fonts.googleapis.com/...Caveat...)&lt;/style&gt;</code> داخلَ المكوِّنِ نفسِه، والطلبُ مَقيسٌ لا مُستنتَج: <b>يَنطلِقُ فعلًا، وبعدَ الحذفِ يرجعُ المِسبارُ بـ<code>[]</code> وبصِفرِ وسومِ نمط</b>. <b>وهذا التطبيقُ لا يُحمِّلُ أيَّ خطٍّ خارجيٍّ في أيِّ موضع</b> — لا رابطَ في <code>index.html</code> ولا <code>@font-face</code> في الأنماطِ المشحونة — <b>فحملُ هذا يجعلُ مكوِّنًا أوّلَ مَن يُدخِلُ مُضيفًا خارجيًّا، وذاك قرارُ خصوصيّةٍ وتبعيّةٍ يملِكُه المالِكُ لا بطاقةٌ تُقرِّرُه من داخلِها</b>. فلم يُحمَل، و<code>'Caveat'</code> تسقُطُ إلى بديلِها المُصرَّحِ <code>cursive</code>. <b>وهي رابعُ خطٍّ تُسمِّيه رفعةٌ ولا يُحمَّلُ هنا</b> بعدَ Inter وClash Display وOswald، <b>ويُسجَّلُ ولا يُستبدَل</b>.
          <br /><br />
          <b>ودرسٌ في القياسِ نفسِه: <code>document.fonts.check()</code> لا يصلُحُ للحُكمِ هنا.</b> فقد رجعَ بـ<code>true</code> قبلَ الحذفِ وبعدَه، <b>ورجعَ بـ<code>true</code> أيضًا لأُسرةٍ مُختلَقةٍ اسمُها <code>NoSuchFaceZZZ</code></b> — فهو يُجيبُ «لا شيءَ مُعلَّق» لا «الخطُّ حاضر». <b>وسِجلُّ الشَّبكةِ هو الدليل، لا هذه الدالّة.</b> وفي هذه الحاويةِ يُقاسُ <code>Caveat</code> و<code>cursive</code> و<code>serif</code> ثلاثتُها 181 بكسلًا للكلمةِ نفسِها، <b>أي أنّ فَرقَ البديلِ لا يُرى هنا أصلًا</b> — ويُرى على جهازِ المالِكِ لا في هذه العُلبة.
          <br /><br />
          <b>٢. والمكوِّنُ كلُّه كان للفأرةِ وحدَها، والقياسُ صريح:</b> <code>FOCUSABLE_IN_SPECIMEN 0</code>، ولا <code>role</code> في أيِّ موضع، و<code>Enter</code> لا يُغيِّرُ شيئًا في حينِ أنّ نَقرةً بالفأرةِ تُغيِّرُ التخطيط. <b>والبطاقاتُ هي التفاعُل، فصارَت أزرارًا حقيقيّة</b> — و<code>Enter</code> و<code>Space</code> يأتيانِ مع العُنصرِ بلا كود، و<code>aria-pressed</code> يحمِلُ حالةَ الاختيارِ التي كانت ظِلًّا وتكبيرًا فقط. <b>وبعدَه: خمسُ محطّاتِ تنقُّل، و<code>ENTER_FANS_OUT</code>، و<code>aria-pressed</code> يقرأُ <code>false,false,true,false,false</code>، والاختيارُ بلوحةِ المفاتيحِ يرفعُ البطاقةَ <code>matrix(1.4, 0, 0, 1.4, 0, -28)</code> — أي ما تفعلُه الفأرةُ بالحرف.</b>
          <br /><br />
          <b>والجِذرُ بقيَ <code>div</code> بقَصد.</b> فإعطاؤه دورَ زِرٍّ كذلك يُعشِّشُ ستَّةَ عناصرَ تحكُّمٍ في واحد، <b>أي مُقايضةُ عَطَبٍ في لوحةِ المفاتيحِ بعَطَبٍ في ARIA</b>. فصارَ <code>Escape</code> يُعيدُ الرَّصف — <b>والجِذرُ يسمَعُ المِفتاحَ بلا أن يكونَ مُستقبِلًا للتركيز، لأنّ الزرَّ المُركَّزَ عليه من نَسلِه</b> — و<code>ESCAPE_RESTACKS</code> مَقيسٌ صحيحًا. وحَلقةُ التركيزِ نجَت من إعادةِ الضبط: <code>solid 3px</code>، مَقيسةً لا مَفروضة، والزرُّ نظيفٌ من زينةِ المُتصفِّح: <code>appearance: none</code> و<code>border 0</code> و<code>padding 0</code>.
          <br /><br />
          <b>٣. وأجملُ ما في هذه الرفعةِ أنّها تحمِلُ كودَ تكيُّفٍ لم يكن ليعملَ أبدًا.</b> فالمؤلِّفُ كتبَ <code>ResizeObserver</code> يقيسُ العَرضَ ويُصغِّرُ المَسرحَ بنِسبةِ <code>min(1, clientWidth / 462)</code> — <b>وهو صحيحٌ تمامًا وميْتٌ تمامًا</b>: على 1440 و900 و600 و420 و360 بقيَ المَسرحُ 462 في الخمسةِ كلِّها. <b>والسببُ أنّ خانةَ العيّنةِ عُنصرٌ في شِبكة، وأصغرُ مقاسٍ تلقائيٍّ لعُنصرِ الشِّبكةِ هو مُحتواه</b>، فثبَّتَ المَسرحُ ذو الـ462 عمودَه على 462 <b>حتى في نافذةٍ عرضُها 360 — أي 102 بكسلًا طَفحًا داخلَ عمودٍ عرضُه 270</b>. <b>وحَرَسُ الطَّفحِ أعمى عنه</b> لأنّ <code>scrollWidth</code> يُساوي <code>innerWidth</code> (360 = 360) — سَلَفٌ يَقُصُّ الزائد. <b>وكلمةٌ واحدةٌ — <code>min-w-0</code> — أعادَت للعمودِ عَرضَه الحقيقيَّ فبدأَ كودُ المؤلِّفِ يعمل: على 420 صارَ الجِذرُ 330 والمَسرحُ 236، وعلى 360 صارَ 270 و158.</b> ولا حرفَ في المكوِّنِ مسَّته هذه الكلمة.
          <br /><br />
          <b>٤. والنوابضُ كانت تعملُ رغمَ طلبِ تقليلِ الحركة</b> — إطاراتٌ وسطى مُختلفةٌ بفاصلِ 60ms و200ms. <b>والحلُّ كان موجودًا في هذا المستودعِ منذُ القِسمِ الأوّل</b>: <code>MotionConfig reducedMotion=&quot;user&quot;</code> حولَ العيّنة، <b>لأنّ framer يكتُبُ تحويلاتٍ سَطريّةً كلَّ إطارٍ ولا تبلُغُها بطانيّةُ CSS</b>. وبعدَه: <b>الحالةُ النهائيّةُ تُطبَّقُ فورًا والإطاراتُ الوسطى تختفي</b> — أي انتقالٌ بلا رحلة، وهو المطلوبُ بالضبط.
          <br /><br />
          {/* the record quotes the value it is describing. anti-slop-ignore-next-line 04 */}
          <b>وقاعدةُ «لا بنَفسجيَّ على أسود» أوقعَت هذه الرفعة</b>: <code>#8B5CF6</code>. <b>والذي أوقعَته ليس سِمةً ولا سَطحًا ولا لونَ تأكيد، بل واحدٌ من خمسةِ تدرُّجاتِ صُوَرٍ داخلَ نموذجِ بولارويد</b> — Sunset وOcean وDream وGolden وMist. <b>فاستُثنِيَ في موضعِه بعُرفِ الماسِحِ نفسِه</b> (<code>anti-slop-ignore-next-line</code>) <b>لا بتوسيعِ القاعدةِ على الجميعِ ولا بإعادةِ تلوينِ لوحةِ المؤلِّف</b>. <b>واختُبِرَ الاستثناءُ بالتخريبِ مرّتَين: بنَفسجيٌّ غيرُ مُستثنًى في سطرٍ آخرَ يُسقِطُ القاعدةَ، وإبعادُ سطرِ الاستثناءِ سطرًا واحدًا يُسقِطُها كذلك</b> — فهو بعَرضِ سطرٍ واحدٍ لا أكثر.
          <br /><br />
          <b>وخطأٌ في قياسي يُسجَّلُ كما تُسجَّلُ العُيوب:</b> أوّلُ قراءةٍ لتباينِ التعليقِ رجعَت <code>1.13</code>، <b>وهي هَراء</b>. فالقيمةُ المَحسوبةُ جاءَت <code>lab(47.8878 1.65477 -5.77283)</code> <b>ومُساعِدي قرأَ مُكوِّناتِ lab كأنها أحمرُ وأخضرُ وأزرق</b> — وهذا العَطَبُ بعينُه سبقَ في هذه الدفعة. <b>وبعدَ تمريرِ اللونِ على لوحِ رَسمٍ ليُحوِّلَه المُتصفِّحُ بنفسِه: <code>rgb(113, 113, 123)</code> على <code>rgb(9, 9, 11)</code> بنسبةِ 4.12</b>، واسمُ البطاقةِ <code>rgb(63, 63, 70)</code> على أبيضَ بنسبةِ 10.44.
          <br /><br />
          <b>و4.12 محمولٌ في المسموحِ المُسمّى، لكنّه يختلفُ في نوعِه عن الأربعةِ قبلَه فيُقالُ بصوتٍ عالٍ:</b> تلكَ زينةٌ — شارةٌ وطابعُ وقتٍ وسطرٌ مُساند — <b>وهذا نصُّ التشغيل</b>. «click to fan out» هو كيفَ يعرِفُ القارئُ أنّ الرَّصفَ يفعلُ شيئًا أصلًا. <b>ونِصفا الزوجِ كِلاهما للمؤلِّف</b> (zinc-500 على zinc-950 الخاصِّ بالمكوِّن، ولا يدَ للسِّماتِ فيه) <b>فالقاعدةُ تُطبَّقُ كما طُبِّقَت أربعَ مرّات، لكنّ المالِكَ يُوازِنُ هذه وهو يعلمُ أنها تعليماتٌ لا حاشية</b>. <b>والعِلاجُ كلمةٌ: <code>text-zinc-400</code> يُصعِدُها إلى 5.9.</b>
          <br /><br />
          <b>وفائدةٌ أخيرةٌ للبوّابةِ نفسِها: هذا الزوجُ كان موجودًا دائمًا ولم تكن البوّابةُ تراه.</b> فقبلَ <code>min-w-0</code> لم يكن تصغيرُ المؤلِّفِ يعمل، <b>فكان الرَّصفُ يُغطّي التعليقَ في كلِّ عَرض</b>. والآنَ يُبلَّغُ عنه في حالتَي 390 ولا يُبلَّغُ في حالتَي 1440، <b>والألوانُ لم تتغيَّرْ بينَهما</b> — فالعُنصرُ فوقَ مَركزِ التعليقِ عندَ 1440 بطاقةٌ بيضاءُ صَلبة، وعندَ 390 حاويةُ المَسرحِ الشفّافة. <b>فالرقمُ كان سيَظهرُ ويَغيبُ مع التخطيطِ لولا أن سُمِّيَ.</b>
          <br /><br />
          <b>وسبعةُ <code>{'{}'}</code> حُذِفَت</b> — بقايا تعليقاتٍ نزَعَ السِّجلُّ نُصوصَها وأبقى أقواسَها، لا تَرسِمُ شيئًا ولا تعني شيئًا.
        </SpecRow>

        <SpecRow name="زُجاجٌ بلا أرضٍ يُضبِّبُها، وحُكمٌ لي تسحَبُه لَقطةٌ لا تَستقِرّ" bare specimen={
          /* `min-w-0` for the same reason as the row above: the cell is a grid item,
             and this panel is a hard 360px. `MotionConfig` because framer writes
             inline transforms per frame, out of the CSS blanket's reach. */
          <MotionConfig reducedMotion="user">
            <div data-glass-specimen="" className="w-full min-w-0 [&>div]:min-h-0" dir="ltr">
              <GlassNotification />
            </div>
          </MotionConfig>
        }>
          <b>رفعةٌ أرضُها ليست عندَها.</b> فالزُّجاجُ يحتاجُ ما يُضبِّبُه خلفَه، <b>وما خلفَه كان صورةً مربوطةً بشبكةِ توصيلٍ خارجيّة</b> (<code>ik.imagekit.io</code>). <b>والصورةُ لا تصِل: الطلبُ يَنطلِقُ ثمّ لا يعودُ شيء</b> — لا استجابةً ولا حتى حدَثَ فشل — <b>و<code>naturalWidth</code> صِفرٌ و<code>complete</code> كاذبةٌ بعدَ اثنتَي عشرةَ ثانية</b>. فالذي كان يُرسَمُ صندوقٌ داكنٌ مُسطَّح، <b>أي أنّ فكرةَ اللَّوحِ الزُّجاجيِّ كلَّها — شيءٌ يستحقُّ التضبيبَ خلفَه — كانت غائبة</b>.
          <br /><br />
          <b>وقد رفعتُ هذا القرارَ إلى المالكِ أوّلًا، ثمّ حسَمَه المالكُ بنفسِه فتغيَّرَ ما في هذا المكوِّن.</b> فأوّلَ مرّةٍ لم أحمِلِ الصورةَ، على الحُجّةِ نفسِها التي رُدَّ بها خطُّ جوجل في الرفعةِ قبلَها، <b>وقلتُ إنّ القرارَ قرارُه</b>. <b>ثمّ سمّى المالكُ تلكَ الصورةَ بعينِها بيدِه في مواصفةِ المكوِّنِ التالي — وذلك هو الجواب.</b> فصارَت محمولةً، والأرضُ المحلّيّةُ باقيةٌ تحتَها: <b>الصورةُ تُغطّي التَّفتُّحاتِ عندَ <code>opacity-60</code> حيثُ تصِل، والتَّفتُّحاتُ تحمِلُ الزُّجاجَ حيثُ لا تصِل</b> — فلا مَحذوفَ ولا مُستبدَل.
          <br /><br />
          <b>والأهمُّ أنّ التَّفتُّحاتَ عادَت زاهيةً، وهذا هو التصحيحُ الذي يَعني شيئًا.</b> فقد كنتُ خفَّفتُها هنا لأُنجِيَ تباينَ النصِّ فوقَها، <b>وتلكَ بالضبطِ هي الحركةُ التي تَقتُلُ الزُّجاج: ضبِّبْ حقلًا داكنًا مُسطَّحًا فلن تُخرِجَ إلا حقلًا داكنًا مُسطَّحًا</b>. <b>فالوُضوحُ محلُّه المادّةُ لا الدنيا التي خلفَها</b>: صارَت طبقةُ التضبيبِ تحمِلُ سِتارةً داكنةً من عندِها — تضبيبٌ ثمّ إشباعٌ ثمّ صَبغ — <b>فالعالَمُ خلفَ البطاقةِ يُبقي لونَه، وللتضبيبِ بِنيةٌ يَلطُخُها، وجَوفُ البطاقةِ داكنٌ بما يَكفي للقراءةِ عليه</b>. والأحبارُ المرفوعةُ قِيسَت على الأرضِ الزاهيةِ الجديدةِ في مواضِعِها الحقيقيّة: <b>العنوانُ 8.09 والنصُّ 6.09 والوقتُ 4.95 وأيقونةُ الصَّرفِ 10.41</b> — كلُّها تَعبُر.
          <br /><br />
          <b>وأربعةُ أحبارٍ تسقُطُ على الأرضِ التي تُصرِّحُ بها الرفعةُ نفسُها، قبلَ أيِّ استبدال.</b> مُركَّبةً فوقَ <code>#1A1A19</code> وفوقَ الـ6٪ بيضاءَ التي تُصلِّدُها البطاقة:
          <br /><br />
          <code>message · white/40 → 3.64</code> · <code>time · white/25 → 2.27</code> · <code>Reset · white/30 → 2.71</code> · <code>X · white/30 → 2.54</code>
          <br /><br />
          <b>والعنوانُ عندَ 11.08 والترويسةُ عندَ 6.94 يَعبُرانِ بلا مساس.</b> والساقِطاتُ مُحتوًى — <b>نصُّ الإشعارِ نفسُه، والزرُّ الذي يَصرِفُه</b> — <b>ولا بوّابةَ عندَنا تراها:</b> <code>axe</code> يرجعُ بـ<b>سبعَ عشرةَ عُقدةً «غيرِ محسومة»</b> لهذا المكوِّن («تعذَّرَ تحديدُ لونِ الخلفيّةِ بسببِ تدرُّج»، «يُغطّيها عُنصرٌ آخر») <b>وبصِفرِ مُخالَفات</b>.
          <br /><br />
          <b>وهنا يَنكسِرُ المِسطَرةُ التي حَكَمتُ بها أربعَ مرّاتٍ قبلَها.</b> فقاعدةُ هذا الملفِّ أنّ الزوجَ إذا كان طرفاه للمؤلِّفِ يُحمَلُ في مسموحٍ مُسمًّى ويُطبَعُ رقمُه ليَقرِّرَ المالك — <b>وتلك آلةٌ تحتاجُ رقمًا تَطبعُه البوّابة، ولا رقمَ هنا</b>. فالخيارُ لم يكن بينَ الحملِ والإصلاح، بل <b>بينَ الإصلاحِ وبينَ أن تُشحَنَ بلا قياسٍ أصلًا</b>. فرُفِعَت إلى <code>white/70</code> و<code>white/60</code> و<code>white/60</code> و<code>white/50</code>، <b>وهي تَعبُرُ 4.5 (و3 للأيقونة) على الأرضِ المُسطَّحةِ وعندَ أسطعِ نقطةٍ في التَّفتُّحِ المحلّيِّ معًا</b>، <b>وتُبقي تدرُّجَ المؤلِّف: العنوانُ فوقَ النصِّ فوقَ الوقت</b>. والقيمُ الأصليّةُ مكتوبةٌ في المكوِّنِ ليَرُدَّها مَن شاءَ بكلمة.
          <br /><br />
          <b>وحُكمٌ لي يُسحَب، وهو أهمُّ ما في هذه الرفعة.</b> فقد قرأتُ أنّ طبقةَ التضبيبِ عندَ <code>z-[-1]</code> داخلَ أبٍ عليه <code>isolate</code> — <b>وهذا في العادةِ يعني مُرشِّحَ خلفيّةٍ بلا خلفيّةٍ يُرشِّحُها</b> — ثمّ قِستُ فوجدتُ لقطتَينِ تختلفانِ فكتبتُ أنّ التضبيبَ يعمل. <b>وذلك الدليلُ لا يَصمُد:</b> <code>backdrop-filter</code> يُنقَشُ نقشًا غيرَ مُستقِرٍّ في هذا المتصفِّحِ المقطوعِ الرأس، <b>ولَقَطاتٌ لنفسِ المنطقةِ دونَ تغييرِ حرفٍ رجعَت بيضاءَ بالكامل، ثمّ رماديّةً مُتدرِّجةً بالنِّطاقات (5,6,9 ثمّ 70 ثمّ 126 ثمّ 143)، ثمّ داكنةً صحيحة</b>. <b>فالقولُ الصادقُ أضيَق: التصريحُ مُطبَّقٌ وغيرُ مَعدومٍ في النمطِ المحسوب، وأمّا هل يُضبِّبُ بصَريًّا فلم يُحسَمْ بلَقطةٍ تُقارَنُ بلَقطة.</b> والطبقةُ تُركَت كما كُتِبَت حرفًا بحرف.
          <br /><br />
          <b>وقد حُسِمَ السؤالُ بعدَها في الرفعةِ التاليةِ بتجربةٍ مضبوطة، وهي جوابُ ما تركتُه معلَّقًا هنا:</b> نمطٌ مُخطَّطٌ عاليُ التردُّدِ يُزرَعُ خلفَ اللَّوح، <b>ثمّ يُقاسُ انحرافُ الضياءِ داخلَ اللَّوحِ وخارجَه في لَقطةٍ واحدةٍ — فتُقارَنُ منطقتانِ في نفسِ نقشةِ الرَّسمِ لا لَقطتانِ متعاقبتان</b>، وذاك ما يُبطِلُ عدمَ الاستقرارِ الذي أفسدَ حُكمي. <b>والسِّتارةُ عندَ 0.66 يُتوقَّعُ منها حسابيًّا أن تُبقي 0.42 من التبايُن، والقياسُ بلا تضبيبٍ أعطى 0.425</b> — أي أنّ الحسابَ والقياسَ يتصادقان. <b>ومع التضبيب: 0.244</b>، أي 43٪ أقلَّ ممّا تُفسِّرُه السِّتارةُ وحدَها. <b>فالتضبيبُ يعمل، ومُثبَتٌ لا مُدَّعًى.</b> وأمّا لَقَطاتُ هذه البطاقةِ بعينِها فبقيَت غيرَ مُستقِرّةٍ (رجعَت <code>sd 0</code> ومتوسِّطًا 246 أي بيضاءَ مُسطَّحة)، <b>فبناؤها هو البناءُ نفسُه، لكنّ الإثباتَ يُنسَبُ إلى موضعِ حُصولِه لا إلى غيرِه</b>.
          <br /><br />
          <b>وهدفُ الصَّرفِ كان 20×20 بكسلًا أمامَ حدٍّ أدناه 24×24.</b> والمقاسُ المرئيُّ للمؤلِّفِ فبقيَ، <b>ومُدَّت مِنطقةُ اللَّمسِ خلفَه بعُنصرٍ زائفٍ شفّاف</b> — والمَقيسُ بعدَها <b>24×24 بالضبط</b>: بكسلانِ من كلِّ جهة، لا أربعة، <b>لأنّ الجيرانَ يَحُدّونَه</b> — أي أنه يُلامِسُ الحدَّ ولا يَفضُلُ عنه، وهذا يُقالُ كما هو.
          <br /><br />
          <b>وتقليلُ الحركةِ ثَبَتَ بقياسٍ ثالثٍ بعدَ أن أفسدَ قياسانِ قبلَه الحُكم.</b> فأوّلُ مِسبارٍ قارنَ لَقَطاتٍ أثناءَ الصَّرف، <b>وعددُ البطاقاتِ يتغيَّرُ بينَ العيّنتَين، فكان يُقارِنُ عناصرَ مختلفةً بعناصرَ مختلفة</b>. فقِيسَت حركةُ الدخولِ بدلًا منها، والعددُ فيها ثابت: <b>بلا تفضيلٍ تبدأُ البطاقاتُ عندَ <code>x=60</code> وتَمُرُّ بحالاتٍ وسطى؛ ومع <code>reduce</code> تُقرأُ <code>0,0,0,0,0</code> في كلِّ عيّنة</b> — أي قَفزةٌ إلى السكونِ بلا رحلة.
          <br /><br />
          <b>وعَشَرةُ <code>{'{}'}</code> حُذِفَت</b> — بقايا تعليقاتٍ نزَعَ السِّجلُّ نُصوصَها، وهي الرفعةُ الثانيةُ على التوالي التي تصِلُ بها.
          <br /><br />
          <b>وثلاثٌ تُقالُ ولا تُلمَس:</b> <code>min-h-screen</code> على الجِذرِ — والعارضةُ تُبطِلُه بمُحدِّدٍ على الغِلاف؛ <b>وشارةُ العدَدِ بحجمِ 9px</b> — تَعبُرُ التباينَ لكنّها صغيرةٌ إلى حَدٍّ يستحقُّ الذِّكر؛ <b>ولوحٌ عرضُه 360 صُلبًا</b>، وقد قِيسَ فوَجَدتُه يَنكمِشُ مع العمودِ (330 عندَ 420، و270 عندَ 360) لأنه عُنصرٌ مَرِنٌ يَقبَلُ الانكماش، <b>فلا طَفحَ: <code>scrollWidth</code> يُساوي <code>innerWidth</code> عندَ كلِّ عَرض</b>.
        </SpecRow>

        <SpecRow name="الوُضوحُ محلُّه المادّةُ لا الدنيا خلفَها: سِتارةٌ داكنةٌ تُنجِي الزُّجاجَ من التسطيح" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-toggle-specimen="" className="w-full min-w-0 [&>div]:min-h-0" dir="ltr">
              <GlassToggle />
            </div>
          </MotionConfig>
        }>
          <b>«لم يُطبَّقِ الزُّجاجُ بشكلٍ احترافيّ» — والمُلاحَظةُ صحيحةٌ، والسببُ مكتوبٌ بالأرقام.</b> فالزُّجاجُ ليس اللَّوح، بل <b>العَلاقةُ بينَ اللَّوحِ وما خلفَه</b>. وفي الرفعةِ قبلَ هذه خفَّفتُ الأرضَ لأُنجِيَ تباينَ النصِّ فوقَها، <b>وذاك يَقتُلُ الأثرَ من أصلِه: ضبِّبْ حقلًا مُسطَّحًا فلن تُخرِجَ إلا حقلًا مُسطَّحًا</b>. <b>فالوُضوحُ محلُّه المادّةُ لا الدنيا خلفَها</b>: الأرضُ تبقى زاهية، وطبقةُ التضبيبِ تحمِلُ سِتارةً داكنةً من عندِها — <code>blur(24px)</code> ثمّ <code>saturate(1.6)</code> ثمّ صَبغٌ عندَ <code>rgba(14,12,16,0.66)</code>. <b>وهي الإضافةُ الوحيدةُ إلى الطبقةِ المُواصَفة، وهي التي جعلَت <code>rgba(255,255,255,0.06)</code> و<code>white/60</code> مقروءَينِ بلا أن يُمَسَّ أيٌّ منهما.</b>
          <br /><br />
          <b>والتضبيبُ نفسُه أُثبِتَ هنا بتجربةٍ مضبوطةٍ بعدَ أن عجزتُ عن إثباتِه قبلَها.</b> فاللَّقطةُ المُقارَنةُ بلَقطةٍ لا تصلُحُ في هذا المتصفِّح، <b>فزُرِعَ نمطٌ مُخطَّطٌ عاليُ التردُّدِ خلفَ اللَّوح، وقِيسَ انحرافُ الضياءِ داخلَه وخارجَه في لَقطةٍ واحدة</b> — منطقتانِ في نقشةِ رَسمٍ واحدةٍ لا لَقطتانِ متعاقبتان، وهذا ما يُبطِلُ عدمَ الاستقرار. <b>والسِّتارةُ عندَ 0.66 يُتوقَّعُ منها حسابيًّا أن تُبقيَ 0.42 من التبايُن، والقياسُ بلا تضبيبٍ أعطى 0.425</b> — الحسابُ والقياسُ يتصادقان، والخارجُ ثابتٌ عندَ <code>sd 127.38</code> في الرَّكضتَين. <b>ومع التضبيب: 0.244، أي 43٪ أقلَّ ممّا تُفسِّرُه السِّتارةُ وحدَها. فهو يُضبِّبُ فِعلًا.</b>
          <br /><br />
          <b>والصورةُ المطلوبةُ بالاسمِ محمولةٌ كما طُلِبَت، ولا تصِلُ في هذه البيئة:</b> <code>naturalWidth</code> صِفرٌ و<code>complete</code> كاذبةٌ بعدَ اثنتَي عشرةَ ثانية. <b>فرُسِمَت أرضٌ محلّيّةٌ تحتَها</b> — الصورةُ تُغطّيها عندَ <code>opacity-60</code> حيثُ تصِل، والأرضُ تحمِلُ الزُّجاجَ حيثُ لا تصِل. <b>لا مَحذوفَ ولا مُستبدَل.</b>
          <br /><br />
          <b>ومِفتاحٌ لا يُجيبُ إلا الفأرةَ ليس مِفتاحًا.</b> فالصفوفُ <code>role=&quot;switch&quot;</code> مع <code>aria-checked</code>، مُسمّاةً بلافِظتِها عبرَ <code>aria-labelledby</code>، <b>فيَأتي <code>Space</code> و<code>Enter</code> مع العُنصرِ بلا كود، وتُنطَقُ الحالةُ بدلًا من أن تُلوَّنَ فقط</b>. والمَقيسُ: <b>خمسةُ مفاتيح، و<code>aria-checked</code> يقرأُ <code>true,true,false,false,true</code>، والأسماءُ من اللافِظاتِ نفسِها، و<code>Space</code> يَقلِبُ ثمّ <code>Enter</code> يَقلِبُ عائدًا</b>. <b>وسطرُ On/Off مُخفًى عن قارئِ الشاشة</b> لأنّ <code>aria-checked</code> يقولُه، <b>وسماعُه مرّتَينِ أسوأُ من ألّا يُرى مرّةً</b>.
          <br /><br />
          <b>والمِقبضُ يَقفِزُ حينَ يُطلَبُ تقليلُ الحركة، لا يَسير.</b> فـ<code>useSpring</code> قيمةُ حركةٍ لا تبلُغُها بطانيّةُ CSS، <b>فيُحرَّكُ بـ<code>jump()</code> عندَ <code>reduce</code></b>. <b>والقياسُ: بلا تفضيلٍ يُقرأُ المِقبضُ عندَ 24 ثمّ 11 ثمّ 3 ثمّ 2 — أي حالاتٌ وسطى؛ ومع <code>reduce</code> يُقرأُ 26 ثمّ 2 وكفى — الطَّرفانِ ولا شيءَ بينَهما.</b> <b>وأوّلُ عيّنةٍ في الحالتَين هي ما قبلَ النَّقر، فمُجرَّدُ عَدِّ القيمِ المُختلِفةِ لا يُفرِّقُ بينَهما — والفارقُ هو وُجودُ الوسَطِ لا عددُ القيم.</b>
          <br /><br />
          <b>والألوانُ الخمسةُ قِيسَ كلٌّ منها في موضِعِه لا في أسوأِ موضعٍ في اللَّوح، وهذا فَرقٌ يُغيِّرُ الحُكم.</b> فأوّلُ قياسٍ قرَنَ كلَّ لونٍ بأسطعِ شريحةٍ في اللَّوحِ فأسقطَ ثلاثةً منها — <b>وثلاثتُها كانت تجلِسُ في الصفوفِ السُّفلى حيثُ الجَوفُ أدكَن</b>. وبعدَ القياسِ في المواضِعِ الحقيقيّة:
          <br /><br />
          <code>Dark Mode 5.13</code> · <code>Notifications 7.53</code> · <code>Auto-Update 9.95</code> · <code>Analytics 6.98</code> · <code>Haptic 5.16</code>
          <br /><br />
          <b>وكلُّها تَعبُر، والترويسةُ 7.51 واللافِظةُ 5.00.</b> وكان أضيقُها <code>Dark Mode</code> عندَ 4.51 — <b>أي فوقَ الحدِّ بواحدٍ من مئة، وذلك ليس عُبورًا بل مُلامَسة</b> — فعُمِّقَتِ السِّتارةُ من 0.58 إلى 0.66 <b>فصارَ 5.13، والدنيا خلفَ اللَّوحِ لم تَخفُتْ بشيء</b>.
          <br /><br />
          <b>وسطرُ «Off» يُقاسُ 1.45 ولا يُمكِنُه أن يَعبُرَ على أيِّ أرضٍ كانت</b> — فشَفافيّتُه المُركَّبةُ 0.125، <b>وحتى فوقَ الأسودِ الخالصِ لا يُعطي إلا 1.31</b>. وقد بقيَ كما وُصِف، <b>لأنّ حالةَ المِفتاحِ محمولةٌ ثلاثَ مرّاتٍ أُخرى: لونُ المَسار، وموضِعُ المِقبض، و<code>aria-checked</code></b> — فالسَّطرُ زينةٌ مُكرَّرةٌ لا خبَرٌ وحيد، <b>وهذا يُقالُ برقمِه ليَقرِّرَ المالكُ لا ليُخفى</b>.
          <br /><br />
          <b>وManrope مُسمّاةٌ أوّلَ الرَّتَلِ كما طُلِبَت، وخلفَها عائلةُ الواجهةِ الخاصّةُ بالمشروع.</b> فهذا التطبيقُ لا يُحمِّلُ مُضيفَ خطوطٍ خارجيًّا — <b>وأربعُ رفعاتٍ سمَّت وجهًا لا يَحمِلُه</b> — <b>فالذي يُرسَمُ هنا هو «الخطُّ الافتراضيُّ للمشروع» الذي يقولُه قِسمُ الطِّباعةِ في المواصَفةِ نفسِها.</b>
          <br /><br />
          <b>وثلاثٌ تُقالُ ولا تُلمَس:</b> <code>min-h-screen</code> على الجِذرِ — <b>وهو مُصرَّحٌ في المواصفةِ بسببِه: المصدرُ يَشحَنُ <code>h-full</code> لأنّ العارضةَ الأصليّةَ تُعطيه إطارًا مَقيسًا، واللَّصقُ المُنفرِدُ يحتاجُ ارتفاعًا حقيقيًّا وإلا انطبقَ الجِذرُ وأخذَ طبقاتِه المُطلَقةَ معَه</b> — والعارضةُ عندَنا تُبطِلُه بمُحدِّدٍ على الغِلافِ لا بتعديلِ المواصفة؛ <b>ولَوحٌ عرضُه 320 صُلبًا</b> يَنكمِشُ مع العمودِ إلى 270 عندَ 360 لأنه عُنصرٌ مَرِن، <b>فلا طَفحَ عندَ أيِّ عَرض</b>؛ و<b>خمسةُ صفوفٍ تَبنِي خمسَ نوابضَ مُستقِلّة</b>، وهو ما تَقتضيه القواعدُ: <b>الخُطّافاتُ لا تُنادى في حَلقة</b>، فالصَّفُّ مكوِّنٌ في الملفِّ نفسِه لا مِلفٌّ ثانٍ ولا خُطّافٌ مُنتزَع.
        </SpecRow>

        <SpecRow name="لوحةُ مفاتيحَ سليمةٌ ومَهجورة: سَطرٌ يُعيدُ التركيزَ الذي أكلَه preventDefault" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-slider-specimen="" className="w-full min-w-0 [&>div]:min-h-0" dir="ltr">
              <GlassSlider />
            </div>
          </MotionConfig>
        }>
          <b>أفضلُ رفعةٍ وصلَت في هذه الدفعة، ويُقالُ ذلك بالصَّراحةِ نفسِها التي تُقالُ بها العُيوب.</b> فالمَسارُ يأتي <code>role=&quot;slider&quot;</code> مع <code>aria-valuemin</code> و<code>max</code> و<code>now</code>، ويُجيبُ الأسهُمَ و<code>Home</code> و<code>End</code>، ويَحمِلُ حَلقةَ تركيز، ويُنظِّفُ مُستمِعاتِ النافذةِ عندَ الفَكّ، وهدفُ لَمسِه 44×44. <b>أربعةٌ من الخمسةِ التي اضطُرَّت الرفعاتُ الأربعُ قبلَها أن تُعطاها، جاءَت بها هذه من عندِها.</b>
          <br /><br />
          <b>ومع ذلك كان كلُّ ذلك الدعمِ لا يُبلَغُ بالحركةِ التي يفعلُها الإنسانُ فعلًا — وهذه أهمُّ مُخالَفةٍ في الرفعة.</b> فـ<code>onPointerDown</code> يُنادي <code>preventDefault()</code>، <b>وهو صحيحٌ لمنعِ التحديدِ وتمريرِ اللمس، لكنّه يمنَعُ معَه التركيزَ الذي كانت الضَّغطةُ ستَنقُلُه</b>. <b>والقياسُ صريح: نَقرةٌ في وسَطِ «Brightness» تُعطي 50، ثمّ <code>activeElement</code> ما زالَ زِرَّ القِسم، و<code>ArrowRight</code> يُبقيها 50</b>. <b>وبتركيزِ المَسارِ برمجيًّا: 50 ثمّ 52 ثمّ 100 عندَ <code>End</code></b> — أي أنّ لوحةَ المفاتيحِ سليمةٌ ومَهجورة. <b>وسَطرٌ واحدٌ — تركيزُ المَسارِ داخلَ المُعالِج — يُحوِّلُ «مَشحونٌ ولا يُبلَغ» إلى «يعمل»: بعدَه <code>activeElement</code> هو المَسارُ نفسُه، و<code>ArrowRight</code> يُحرِّكُ 50 إلى 51.</b>
          <br /><br />
          <b>والمادّةُ عُومِلَت بالدرسِ الذي كلَّفَ هذا القِسمَ رفعتَين.</b> فطبقةُ التضبيبِ المُواصَفةُ لم يكن لها تعبئةٌ من عندِها — <b>تضبيبٌ وحدَه، وجَوفُ اللَّوحِ يأخُذُ أيَّ سُطوعٍ تُعطيه الأرض</b> — فصارَت تحمِلُ سِتارةً داكنة. <b>والأرضُ تبقى زاهيةً كما هي، لأنّ تخفيفَها هو الخطأُ المُسجَّلُ في هذا القِسمِ مرّةً واحدةً وتَكفي.</b>
          <br /><br />
          <b>والتباينُ قِيسَ لكلِّ سطرٍ في موضِعِه، وسقطَ واحدٌ فقط:</b> لافِظةُ الصفِّ الأوّلِ عندَ <b>4.47</b> — <b>وهو الصفُّ الجالِسُ تحتَ قِمّةِ التَّفتُّح، أي العَطَبُ نفسُه الذي ظهرَ في الرفعةِ قبلَها وفي المكانِ نفسِه</b>. فعُمِّقَتِ السِّتارةُ من 0.66 إلى 0.76 <b>فصارَت 4.86</b>، والباقي:
          <br /><br />
          <code>Display 9.38</code> · <code>Brightness 4.86 / 72 → 5.28</code> · <code>Contrast 5.08 / 45 → 6.29</code> · <code>Warmth 5.30 / 60 → 9.22</code> · <code>Saturation 5.30 / 55 → 7.20</code>
          <br /><br />
          <b>وقراءةٌ أُخرى لي كانت مُلوَّثةً فسُحِبَت:</b> أوّلُ قياسٍ أعطى لافِظةَ «Contrast» عندَ 11.22، <b>وهي شَفافيّةُ 0.85 لا 0.5 — أي أنّ المُؤشِّرَ كان واقفًا فوقَ الصفِّ فقاسَ حالةَ التحويم لا الحالةَ الأصليّة</b>. <b>فأُوقِفَ المُؤشِّرُ بعيدًا وأُعيدَ القياس: 5.08 على الشَّفافيّةِ الصحيحة.</b>
          <br /><br />
          <b>ونابِضُ المِقبضِ يُتجاوَزُ عندَ طلبِ تقليلِ الحركة، لا يُخفَّف.</b> فـ<code>useSpring</code> قيمةُ حركةٍ لا تبلُغُها بطانيّةُ CSS، <b>فيُربَطُ المِقبضُ بالتحويلِ مُباشرةً و<code>useSpring</code> يُتجاوَز</b> — والخُطّافانِ يُنادَيانِ في كلِّ رسم، والمُتغيِّرُ هو المربوطُ لا المُستدعى. <b>والقياس: بلا تفضيلٍ يُقرأُ المِقياسُ 1 ثمّ 1.151 ثمّ 1.336 ثمّ 1.348 — بل يَتجاوَزُ هدفَه 1.3 ويرتَدُّ، وهذا نابِضٌ يعملُ بالضبطِ كما وُصِف (صَلابةُ 400 وتخميدُ 20)؛ ومع <code>reduce</code>: 1 ثمّ 1.3 وكفى.</b>
          <br /><br />
          <b>والصورةُ المطلوبةُ بالاسمِ محمولةٌ ولا تصِل</b> (<code>naturalWidth</code> صِفر) <b>فأرضٌ محلّيّةٌ تحتَها</b> — الصورةُ فوقَها عندَ <code>opacity-60</code> حيثُ تصِل. <b>وستُّ <code>{'{}'}</code> حُذِفَت</b>، وهي الرفعةُ الثالثةُ على التوالي.
          <br /><br />
          <b>وثلاثٌ تُقالُ ولا تُلمَس:</b> <code>min-h-screen</code> مُصرَّحٌ في المواصفةِ بسببِه فيُبطَلُ بمُحدِّدٍ على الغِلاف؛ <b>ولَوحٌ <code>w-[calc(100%-32px)] max-w-[360px]</code></b> قِيسَ فوَجَدتُه يَنكمِشُ إلى 298 عندَ 420 وإلى 238 عندَ 360 <b>فلا طَفحَ عندَ أيِّ عَرض</b>؛ و<b>التحويمُ مربوطٌ بالصَّفِّ كلِّه لا بالمَسارِ وحدَه</b>، فالمُرورُ على اللافِظةِ يُضيءُ المَسار — <b>والمواصَفةُ لا تُحدِّدُ صاحبَ التحويم، فبقيَ كما وصلَ</b>.
        </SpecRow>

        <SpecRow name="تسعُ محطّاتٍ فارغةٍ في ترتيبِ التنقُّل، ومِسبارٌ يقرأُ قبلَ أن يُرسَم" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-dock-specimen="" className="w-full min-w-0 [&>div]:min-h-0" dir="ltr">
              <GlassDock />
            </div>
          </MotionConfig>
        }>
          <b>العَطَبُ الأوّلُ ليس الذي توقَّعتُه، والقياسُ هو الذي صحَّحَ التوقُّع.</b> فعناصرُ الرَّصيفِ <code>motion.div</code> عليها <code>cursor-pointer</code> و<code>whileTap</code>، <b>وأوّلُ قراءةٍ لي: «تسعةُ أشياءَ تبدو قابلةً للضَّغطِ بلا مسلَكٍ للوحةِ المفاتيح»</b>. <b>والقياسُ أدَقُّ من ذلك وأسوأ: <code>framer-motion</code> يُدخِلُ العُنصرَ الذي يَحمِلُ <code>whileTap</code> في ترتيبِ التنقُّلِ من عندِه</b>، فوصلَت الشارّاتُ التسعُ <code>&lt;div tabindex=&quot;0&quot;&gt;</code> بـ<code>role: null</code> و<code>aria-label: null</code> و<code>text: &quot;&quot;</code>. <b>أي أنها تسعُ محطّاتِ تنقُّلٍ أصلًا، وكلُّ واحدةٍ منها لا تُنطِقُ شيئًا على الإطلاق.</b> <b>وهذا أسوأُ من أن تكونَ غيرَ قابلةٍ للوصول</b>: غيرُ القابلِ للوصولِ ناقصٌ فحسْب، <b>وأمّا هذه فتسعُ محطّاتٍ فارغةٍ يمشي فيها المُتنقِّلُ بلوحةِ المفاتيحِ ليخرُجَ من الرَّصيف</b>.
          <br /><br />
          <b>والذي يُسمّي العُنصرَ وحيدٌ: التلميحُ — وهو يُكشَفُ بـ<code>group-hover</code> وحدَه.</b> <b>ونصُّه في شجرةِ الوصولِ على أيِّ حال</b>، لأنّ <code>opacity: 0</code> يُخفي عن العَينِ لا عن قارئِ الشاشة — <b>فتسعُ كلماتٍ سائبةٍ تُقرَأُ بلا صاحِب</b>. فصارَت الشارّةُ <code>&lt;button&gt;</code> حقيقيًّا يحمِلُ لافِظتَه اسمًا مقروءًا، <b>والتلميحُ <code>aria-hidden</code></b> لأنّ الاسمَ يقولُه، <b>والرَّصيفُ <code>role=&quot;toolbar&quot;</code></b> فتُعلَنُ التسعُ جماعةً واحدةً لا تسعةَ غُرَباء. <b>والمَقيسُ بعدَه: تسعةُ أزرارٍ بأسماءِ Energy وLove وJoy وComfort وNature وDreams وRest وPassion وPeace، و<code>Tab</code> يَمشي داخلَ الرَّصيفِ بالأسماء.</b> ولا مُعالِجَ ضَغطٍ في المواصفةِ كلِّها، <b>فالضَّغطةُ ما زالَت تفعلُ ما كانت تفعلُه: انسحاقُ <code>whileTap</code> ولا شيءَ غيرُه</b>.
          <br /><br />
          <b>وأهمُّ ما في هذه الرفعةِ خطأٌ لي كِدتُ أشحَنُه، ومِسبارٌ هو المُتَّهَمُ لا Tailwind.</b> فقد أضفتُ كَشفَ التلميحِ عندَ التركيزِ بـ<code>group-focus-within</code>، ثمّ قِستُ فرجعَ <code>opacity: 0</code>. <b>فبحثتُ في CSS المَبنيّةِ فوجدتُ القاعدةَ موجودةً، ووجدتُ الجماعةَ تُطابِقُ <code>:focus-within</code> فعلًا، والحِسابُ يقولُ إنّ نوعيّتَها (0,2,0) تَغلِبُ <code>.opacity-0</code></b> — ومع ذلك رجعَ صِفرًا. <b>فكتبتُ في المكوِّنِ أنّ الأداةَ «مُولَّدةٌ ولا تعمل» وربطتُ الكَشفَ بحالةِ React في ستّةِ أسطر.</b>
          <br /><br />
          <b>والسببُ كان في مِسباري: كنتُ أقرأُ النمطَ المحسوبَ في نفسِ الشَّوطِ الذي أُنادي فيه <code>focus()</code>.</b> <b>فبفاصلِ 350ms صارَ القياس: في السكونِ 0، وبعدَ التركيزِ 1، والجارُ يبقى 0، والتركيزُ إذا انتقلَ أخفى الأوّلَ وأظهرَ الرابع، وبعدَ <code>blur</code> يعودُ 0.</b> <b>ثمّ نُزِعَتِ الحالةُ وأُعيدَ المُحدِّدُ الخالِصُ فأعطى الأرقامَ نفسَها حرفًا بحرف</b> — <b>فحُذِفَت الستّةُ أسطر، وسُحِبَ الحُكمُ على Tailwind، والإصلاحُ كان للمِسبارِ لا للكود.</b>
          <br /><br />
          <b>والأيقوناتُ التسعُ حُسِبَت ولم تُلمَس، وهذا يُقالُ برقمِه لا بالنَّظَر.</b> فـ<code>${'{color}'}18</code> غِشاءٌ بنسبةِ 9.4٪ من اللونِ فوقَ مادّةِ الرَّصيف، <b>فكلُّ حَرفٍ يجلِسُ على شيءٍ قريبٍ من دُكنةِ الرَّصيفِ نفسِها</b>: <code>Peace 3.60</code> أضيقُها، ثمّ <code>Love</code> و<code>Passion</code> عندَ 4.11، فـ<code>Rest 4.47</code> و<code>Joy 4.61</code> و<code>Comfort 5.18</code> و<code>Nature 6.30</code> و<code>Energy</code> و<code>Dreams</code> عندَ 6.71. <b>وكلُّها تَعبُرُ الـ3 التي يحتاجُها الحَرف</b>، فلا شيءَ يُصلَح.
          <br /><br />
          <b>وقياسٌ آخرُ لي بَطَلَ فاستُبدِلَ بالحِساب:</b> أوّلُ محاولةٍ لتباينِ الأيقوناتِ أخذَت لَقَطاتِ بكسل، <b>فرجعَت الأرضياتُ التسعُ كلُّها <code>rgb(243,247,248)</code> — أي رقمٌ واحدٌ لتسعِ شارّاتٍ في تسعةِ مواضع</b>. <b>وتسعُ شارّاتٍ لا تشتَرِكُ في أرضٍ واحدة</b>، فالصفحةُ كانت قد انزلَقَت أثناءَ خُطواتِ التحويمِ والتنقُّلِ قبلَ العيّنة، فوقعَ القَصُّ على أرضِ الصفحةِ الفاتحة. <b>فتُرِكَ البكسلُ وحُسِبَتِ الأعدادُ من القيمِ المُصرَّحة، وهي هنا مَعلومةٌ بالكامل.</b>
          <br /><br />
          <b>والتلميحُ احتاجَ السِّتارةَ أكثرَ من اللَّوحِ نفسِه، لأنه يَطفو فوقَ الرَّصيفِ لا عليه.</b> فغِشاؤه المُواصَفُ <code>rgba(255,255,255,0.1)</code> فوقَ تَفتُّحٍ ساطعٍ يُنزِلُ <code>text-white/90</code> إلى نحوِ <b>2.6</b> أمامَ 4.5. <b>فأُبقيَ الغِشاءُ المُواصَفُ كما هو حرفًا، وزِيدَت سِتارةٌ تحتَه</b> — والحِسابُ يُعطي نحوَ <b>8.6</b>.
          <br /><br />
          <b>وتقليلُ الحركةِ يُتجاوَزُ به النابِضُ لا يُخفَّف:</b> بلا تفضيلٍ يُقرأُ عَرضُ الشارّةِ الأولى 44 ثمّ 55 ثمّ 55 ثمّ 67 ثمّ 68 — <b>مُرورٌ بحالاتٍ وسطى</b>؛ ومع <code>reduce</code>: <b>68 في كلِّ عيّنة، أي وُصولٌ بلا رحلة</b>. والتكبيرُ نفسُه سليمٌ في الحالتَين: <b>44 في السكون، و68 و58 و47 عندَ التحويمِ من اليَسار</b> — و68 هي 44×1.55 بالضبط.
          <br /><br />
          <b>وثلاثٌ تُقالُ ولا تُلمَس:</b> <code>min-h-screen</code> مُصرَّحٌ في المواصفةِ بسببِه فيُبطَلُ بمُحدِّدٍ على الغِلاف؛ <b>والرَّصيفُ عرضُه 494 ثابتًا عندَ كلِّ نافذة</b>، والغِلافُ المُثبَّتُ في الرفعةِ نفسِها <code>overflow-x-auto</code> بشريطِ تمريرٍ مُخفًى — <b>فهو مِنطقةُ تمريرٍ بالقَصد، و<code>scrollWidth</code> يُساوي <code>innerWidth</code> عندَ كلِّ عَرضٍ فلا طَفحَ في الصفحة</b>؛ و<b>الشارّاتُ تُشيرُ إلى الضَّغطِ ولا تُنفِّذُ شيئًا</b> لأنّ المواصفةَ لا تُعطي مُعالِجًا، <b>وزِرٌّ بلا أثرٍ أصدَقُ من <code>div</code> يَتظاهَرُ بالضَّغط</b>.
        </SpecRow>

        <SpecRow name="زِرٌّ لا تَبلُغُه أدواتُ Tailwind، وتَدرُّجٌ لا يَعبُرُه حِبرٌ واحد" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-modal-specimen="" className="w-full min-w-0 [&>div]:min-h-0" dir="ltr">
              <GlassModal />
            </div>
          </MotionConfig>
        }>
          <b>هذه الرفعةُ تصِلُ أحسنَ من مواصفتِها في ثلاثةِ مواضع، ويُقالُ ذلك أوّلًا:</b> زِرُّ الإغلاقِ يأتي بـ<code>type=&quot;button&quot;</code> و<code>aria-label</code> و<code>onClick</code> حقيقيٍّ يَصرِفُ البطاقةَ عبرَ <code>AnimatePresence</code>، <b>والعَرضُ مكتوبٌ <code>min(340px, calc(100vw - 2rem))</code> حيثُ طلبَتِ المواصفةُ 340 جامدةً</b>.
          <br /><br />
          <b>وأهمُّ ما أخرجَته: عَطَبٌ في هذا المستودعِ لا في الرفعة.</b> فزِرّا النَّصِّ ظهَرا بلونٍ خطأٍ وحَجمٍ خطأٍ ووَزنٍ خطأ — <b><code>text-white</code> و<code>text-sm</code> و<code>font-semibold</code> تَسقُطُ ثلاثتُها معًا</b>. وليس السببَ غيابَ Preflight ولا المُتصفِّح. <b>والقياسُ: نفسُ الأصنافِ الثلاثةِ على <code>div</code> وعلى <code>button</code> داخلَ هذه البطاقةِ بعينِها</b>:
          <br /><br />
          <code>div → rgb(255,255,255) · 14px · 600</code> — <code>button → rgb(16,36,46) · 16px · 400</code>
          <br /><br />
          <b>وزِرٌّ عارٍ بلا أصنافٍ يقرأُ الأرقامَ نفسَها.</b> والسببُ إعادةُ الضبطِ الخاصّةُ بالمشروعِ في <code>src/styles.css</code>: <code>button {'{'} color: inherit {'}'}</code> و<code>button, input, textarea, select {'{'} font: inherit {'}'}</code>. <b>وهاتانِ القاعدتانِ غيرُ مُطبَّقتَينِ في طبقة (unlayered)، والأنماطُ غيرُ المُطبَّقةِ في طبقةٍ تَغلِبُ كلَّ ما في الطبقات</b> — وأدواتُ Tailwind كلُّها في <code>@layer utilities</code>. <b>و<code>rgb(16,36,46)</code> هو <code>--nova-ink</code> واصلًا عبرَ ذلك <code>inherit</code>.</b>
          <br /><br />
          <b>فالنتيجةُ قاعدةٌ تُكتَبُ للمستودعِ كلِّه: على <code>&lt;button&gt;</code> في هذا المشروعِ لا يُمكِنُ ضَبطُ لونِ النصِّ ولا خطِّه بأداةِ Tailwind أصلًا</b> — تُضبَطُ سَطريًّا أو لا تُضبَط. <b>وهذه أوّلُ رفعةٍ في الدفعةِ فيها نصٌّ داخلَ زِرّ</b>، ولذلك لم تُظهِرْها أربعُ رفعاتٍ قبلَها: أزرارُها كلُّها أيقونات. <b>وبعدَ الضبطِ السَّطريِّ: الحِبرُ أبيضُ فعلًا عندَ 14px ووَزنِ 600.</b>
          <br /><br />
          <b>ثمّ ظهرَ أنّ المُشكِلةَ في التَّدرُّجِ لا في الحِبر.</b> فقِياسُ الأبيضِ على طرَفَي القُرصِ أعطى <b>3.68 على الكَهرَمانِ و6.84 على الأحمر</b>. وحِسابُ المدى كلِّه فوقَ جَوفِ البطاقة:
          <br /><br />
          <code>كَهرَمانٌ أساس rgb(197,125,44) → أبيض 3.30 · داكن 5.28</code>
          <br />
          <code>أحمرُ أساس rgb(142,44,34) → أبيض 8.29 · داكن 2.10</code>
          <br />
          <code>كَهرَمانُ تحويم rgb(232,164,75) → أبيض 2.13 · داكن 8.17</code>
          <br />
          <code>أحمرُ تحويم rgb(193,64,41) → أبيض 5.21 · داكن 3.34</code>
          <br /><br />
          <b>ولا حِبرَ واحدًا يَعبُرُ هذا التَّدرُّج.</b> الأبيضُ يسقُطُ على طرفَي الكَهرَمان، والداكنُ يسقُطُ على طرفَي الأحمر، <b>لأنّ المدى يمتَدُّ من ضياءِ 0.10 إلى 0.27، والأبيضُ يحتاجُ 0.183 على الأكثرِ والأسودُ يحتاجُ 0.235 على الأقلّ</b>. <b>فتبديلُ لونِ النصِّ لا يُصلِحُ شيئًا؛ المدى نفسُه هو الذي يجبُ أن يَضيق.</b> فبَقيَتِ الأصباغُ والاتجاهُ والطرفُ الأحمرُ كما كُتِبَت حرفًا، <b>ولم يُمَسَّ إلا الطرفُ الكَهرَمانيُّ ليَنفُذَ منه دُكنةُ البطاقةِ أكثر: 0.75 و0.90 صارَتا 0.56</b> — وهي أعلى شَفافيّةٍ يَعبُرُ الأبيضُ عندَها 4.5 على الأفتحِ منهما. <b>وبعدَه: 5.34 و7.21، والتحويمُ ما زالَ يُفتِح لأنّ لونَه هو الأفتحُ عندَ الشَّفافيّةِ نفسِها.</b>
          <br /><br />
          <b>والوَصفُ كان 3.58 عندَ <code>text-white/40</code> على البطاقةِ المُسطَّحةِ قبلَ أيِّ أرض</b> — أي يسقُطُ بشروطِ الرفعةِ نفسِها — <b>وهو الجُملةُ التي تشرَحُ ما يفعلُه المُنتَج، فرُفِعَ لا أُبلِغَ عنه</b>: بعدَه 6.67. والبطاقةُ <code>role=&quot;dialog&quot;</code> مُسمّاةً بعُنوانِها عبرَ <code>aria-labelledby</code>، <b>ولا <code>aria-modal</code> بقصد</b>: لا شيءَ محبوسٌ هنا والصفحةُ خلفَها تعمَلُ كاملة، <b>وادِّعاءُ غيرِ ذلك يَحبِسُ قارئَ الشاشةِ في عيّنةٍ واحدةٍ من ثلاثين</b>.
          <br /><br />
          <b>وبوّابةُ التشغيلِ سقطَت، وكان السببُ صورةَ الخلفيّةِ لا مكوِّنًا.</b> فالبوّابةُ تُسقِطُ الرَّكضةَ على <b>أيِّ</b> خطأِ وحدةِ تحكُّم، <b>وصورةُ المُضيفِ الخارجيِّ تفشَلُ هنا فشلًا غيرَ مُستقِرّ: تارةً تُعلَّقُ بلا صوت، وتارةً تموتُ بـ<code>ERR_CONNECTION_RESET</code> فيُسجِّلُ المُتصفِّحُ خطأً</b> — فسقطَت رَكضةٌ ونَجَت التي بعدَها على البِناءِ نفسِه.
          <br /><br />
          <b>وحَصرُ المسموحِ كان أدَقَّ مما يبدو:</b> نصُّ المُتصفِّحِ هو <code>Failed to load resource: net::ERR_CONNECTION_RESET</code> <b>ولا يَحمِلُ العُنوانَ أصلًا</b> — فمُرشِّحٌ مكتوبٌ على النَّصِّ وحدَه يَبلَعُ كلَّ انقطاعٍ في الصفحةِ من أيِّ مُضيف. <b>فلا يُكتَمُ النصُّ إلا إذا فشِلَ في الصفحةِ نفسِها طلبٌ إلى ذلك المُضيفِ بالذات</b> (وحدَثُ <code>requestfailed</code> يُسمّيه)، <b>والحُكمُ يُؤخَّرُ إلى آخرِ الحالةِ حتى لا يتعلَّقَ بأيِّ الحدثَينِ وصلَ أوّلًا</b>. <b>والمَكتومُ يُعَدُّ ويُطبَعُ في <code>OFFLINE_ASSET_ERRORS</code>.</b>
          <br /><br />
          <b>واختُبِرَ بالتخريب:</b> فُحِصَ المُسنَدُ على خمسِ حالاتٍ نصّيّة — <b>و404 لا يُكتَم</b> لأنه رابطٌ مكسورٌ حقًّا لا شبكةٌ غائبة — <b>ثمّ وُجِّهَتِ الصورةُ إلى مُضيفٍ آخرَ غيرِ مسموحٍ فأعطَت <code>ERR_TUNNEL_CONNECTION_FAILED</code>، ولم تُكتَم، وسقطَتِ البوّابة</b>. فالمسموحُ بعَرضِ مُضيفٍ واحدٍ لا أكثر.
          <br /><br />
          <b>وفشلٌ ثانٍ ظهرَ في قِسمٍ لم أمسَسْه، وكِدتُ أُسجِّلُه «لا أعرِفُ سببَه».</b> فرابطُ «الانتقال إلى المحتوى» بُلِّغَ عنه بعيدًا 77 بكسلًا عن جِسمٍ يَقُصّ، <b>وعَدُّ التفاعُلاتِ كان 81 في تلكَ الرَّكضةِ و80 في ثلاثٍ بعدَها على بِناءٍ لم يتغيَّرْ فيه حرف</b>. فكتبتُ أوّلًا أنه عَطَبٌ في البوّابةِ لم أستطِعْ إعادةَ إنتاجِه.
          <br /><br />
          <b>ثمّ أعادَ نفسَه، ومعَه الدليل: الرَّكضةُ التي سقطَت هي الرَّكضةُ التي كُتِمَ فيها ثلاثةُ أخطاءِ صورة.</b> فالطلبُ الفاشلُ لا يفشَلُ في اللحظةِ نفسِها كلَّ مرّة — <b>تارةً يُعلَّقُ صامتًا، وتارةً يموتُ مُتأخِّرًا فيُحرِّكُ التخطيطَ والتمريرَ في أثناءِ ما تقيسُ البوّابةُ</b> — فتَعُدُّ وحدةَ تحكُّمٍ زائدةً تابعةً للغِلافِ، ثمّ تَحكُمُ عليها بأنها مقطوعة. <b>فلم يكن الفشلانِ فشلَين، بل عَرَضَين لسببٍ واحد.</b>
          <br /><br />
          <b>والعِلاجُ لم يكن كَتمَ العَرَض، بل إزالةَ التذبذُبِ نفسِه:</b> صارَتِ البوّابتانِ <b>تَرفُضانِ الطلبَ إلى ذلك المُضيفِ فورًا وبالطريقةِ نفسِها في كلِّ رَكضة</b>. <b>ولا يُخفي هذا شيئًا</b> — المُضيفُ لا يُبلَغُ على أيِّ حال، ومسلَكُ «الصورةُ وصلَت» لا وُجودَ له في هذه البيئةِ ليُختبَر — <b>والذي يُزال هو التوقيتُ لا الحقيقة</b>. <b>وبعدَه: ثلاثُ رَكضاتٍ للتشغيلِ متطابقةٌ (80 تفاعُلًا وواحدٌ مكتومٌ وok)، ورَكضتانِ للبوّابةِ الكبيرةِ متطابقتانِ حرفًا بحرف، و<code>RUNTIME_ERRORS=0</code> في كِلتَيهما</b> — <b>وفشلُ رابطِ التخطّي اختفى معَه، وذاك هو إثباتُ أنّ السببَ كان هو.</b>
          <br /><br />
          <b>وعَدَدُ المكتومِ نفسُه كان يتذبذَبُ فثُبِّت:</b> طُبِعَ أوّلًا 50 ثمّ 45 على بِناءٍ واحد، <b>لأنّ العَدَّ كان يَحسِبُ مرّاتِ الرَّسمِ لا الأسبابَ</b> — والرسائلُ كلُّها رسالةٌ واحدة. <b>فصارَ العَدُّ للرسائلِ المُتمايِزة: «1» في كلِّ رَكضة.</b>
          <br /><br />
          <b>وتقليلُ الحركةِ مَقيسٌ على دَورانِ زِرِّ الإغلاق:</b> بلا تفضيلٍ <code>0 → 21 → 66 → 86 → 90</code>، ومع <code>reduce</code> <code>0 → 90</code> وكفى. <b>وأمّا دُخولُ البطاقةِ فلم أقِسْه</b>: عيّناتي وقعَت قبلَ أن يُركَّبَ اللَّوحُ المُؤجَّلُ فرجعَت فارغة، <b>فلا يُذكَرُ إلا ما قِيس</b>.
          <br /><br />
          <b>وثلاثٌ تُقالُ ولا تُلمَس:</b> الصَّرفُ يُزيلُ البطاقةَ ولا سبيلَ لإرجاعِها من داخلِ المكوِّنِ لأنّ المواصفةَ لا تُعطي إعادةَ فتح — <b>والعيّنةُ تَشفي نفسَها: البطاقاتُ 1 ثمّ 0 بعدَ الإغلاقِ ثمّ 1 بعدَ الخروجِ من القِسمِ والعودةِ إليه</b>، لأنّ اللَّوحَ يُعادُ تركيبُه فيُعادُ <code>useState(true)</code>؛ و<code>padding: 12px 6px</code> — <b>الرأسيُّ من <code>py-3</code> والأُفقيُّ 6px من المُتصفِّح</b>، ولا يُرى لأنّ الزِّرَّ بعَرضٍ كامل؛ و<b>تسعُ <code>{'{}'}</code> حُذِفَت</b>، وهي الرابعةُ على التوالي.
        </SpecRow>

        <SpecRow name="الضبابُ يَبقى والسَّفَرُ يُنزَع: تقليلُ الحركةِ كما يُقاسُ لا كما يُفترَض" bare specimen={
          /* The upload's root carries no ground of its own — the original preview
             frame supplies one — and its words are white. So the ground is supplied
             here rather than by editing the upload. */
          <MotionConfig reducedMotion="user">
            <div data-reveal-specimen="" className="w-full min-w-0 rounded-2xl bg-black [&>div]:min-h-0" dir="ltr">
              <TextBlurReveal />
            </div>
          </MotionConfig>
        }>
          <b>هذه الرفعةُ تُثبِتُ اكتشافَ الرفعةِ قبلَها بدلًا من أن تُضيفَ اكتشافًا جديدًا، وذاك أنفعُ.</b> فـ<code>text-white</code> و<code>text-sm</code> و<code>font-semibold</code> على زِرِّ الدعوةِ سقطَت ثلاثتُها مرّةً أُخرى: <b>المَقيسُ <code>rgb(16,36,46)</code> عندَ 16px ووَزنِ 400</b>. <b>والسببُ إعادةُ الضبطِ غيرُ المُطبَّقةِ في طبقةٍ في <code>src/styles.css</code></b> — <code>button {'{'} color: inherit {'}'}</code> و<code>font: inherit</code> — <b>وهي تَغلِبُ كلَّ أدواتِ Tailwind لأنّ الأدواتَ في <code>@layer utilities</code></b>. <b>مكوِّنانِ متتاليانِ بالسببِ نفسِه، فهذه خاصّيّةُ المستودعِ لا مُصادَفة: على <code>&lt;button&gt;</code> هنا يُضبَطُ لونُ النصِّ وخطُّه سَطريًّا أو لا يُضبَطُ أبدًا.</b>
          <br /><br />
          <b>وإصلاحُ الحِبرِ وحدَه لم يَكفِ، لأنّ القُرصَ أفتحُ من أن يَحمِلَ الأبيض.</b> والقياسُ على طرَفَيه، بالحِبرِ الذي شُحِنَ وبالأبيضِ الذي طُلِب:
          <br /><br />
          <code>طرفٌ بنفسجيّ rgb(140,82,255) → داكن 3.63 · أبيض 4.41</code>
          <br />
          <code>طرفٌ نيليّ rgb(100,94,255) → داكن 3.49 · أبيض 4.58</code>
          <br /><br />
          <b>أي أنّ الأبيضَ يَعبُرُ في النِّصفِ النيليِّ ويَسقُطُ في البنفسجيِّ عندَ 14px.</b> فبَقيَتِ الأصباغُ والاتجاهُ، <b>ونزلَ كلُّ طرَفٍ درجةً واحدةً على سُلَّمِه</b> — <code>violet-500 → violet-600</code> و<code>indigo-500 → indigo-600</code> — <b>وهو أصغرُ تغييرٍ يَحمِلُ الأبيضَ على القُرصِ كلِّه. وبعدَه: 5.91 و6.39.</b>
          <br /><br />
          <b>وقراءةٌ لي بَطَلَت للمرّةِ الثالثةِ في هذه الدفعةِ بالعِلّةِ نفسِها:</b> أوّلُ قياسٍ للنصِّ الفَرعيِّ رجعَ <b>1.20</b>، <b>والقيمةُ المحسوبةُ كانت <code>lab(65.6464 1.53497 -5.42429)</code> فقرأَ مُساعِدي مُكوِّناتِ lab كأنها أحمرُ وأخضرُ وأزرق</b>. <b>وبتمريرِ اللونِ على لوحِ رَسمٍ ليُحوِّلَه المُتصفِّحُ: <code>rgb(159,159,169)</code> على <code>rgb(5,4,16)</code> بنسبةِ 7.76 — يَعبُر.</b> <b>والدرسُ أنّ العِلّةَ المُسجَّلةَ مرّتَينِ لا تُغلَقُ بالتسجيل، فصارَت دالّةُ الحلِّ نفسُها تُستدعى في كلِّ مِسبار.</b>
          <br /><br />
          <b>وتقليلُ الحركةِ هنا أدَقُّ من «يعمل / لا يعمل»، والقياسُ يُظهِرُ التمييزَ الصحيح:</b> <b>بلا تفضيل</b> يمُرُّ إزاحةُ الكلمةِ الأولى بـ<code>22 → 2 → 1 → 0</code> والضبابُ بأربعِ قيَمٍ وسطى؛ <b>ومع <code>reduce</code></b> تُقرأُ الإزاحةُ <code>22 → 0</code> فقط — <b>أي طرَفانِ بلا سَفَر</b> — <b>والضبابُ يَستمِرُّ في التحرُّكِ بخمسِ قيَم</b>. <b>وهذا هو المطلوبُ بالضبط</b>: المُحرِّكُ الدهليزيُّ (الانتقالُ في المكان) يُنزَع، والأثرُ الذي ليس حركةً (الضبابُ والتلاشي) يَبقى. <b>و<code>MotionConfig</code> يُعطِّلُ التحويلاتِ ولا يُعطِّلُ المُرشِّحات، وهذا فَرقٌ يُقاسُ لا يُفترَض.</b>
          <br /><br />
          <b>والخطُّ لم يُنَصَّبْ، وهذا قرارُ تبعيّةٍ لا ذَوق.</b> فالمواصفةُ تطلُبُ Geist Pixel Circle من حُزمةِ <code>geist</code> عبرَ <code>--font-geist-pixel-circle</code>، <b>والمُتغيِّرُ غيرُ مُعرَّفٍ هنا (قِيسَ فارغًا)</b> فالتصريحُ باطلٌ والكلماتُ تُوَرِّثُ. <b>وتنصيبُ حُزمةٍ قرارٌ يملِكُه المالِكُ</b> كما كانَ Oswald في رفعةٍ سابقة، <b>فتُرِكَ المُتغيِّرُ كما كُتِبَ حرفًا والبديلُ يُرسَم</b> — <b>وهو «الخطُّ الافتراضيُّ للمشروع» الذي يطلُبُه قِسمُ الطِّباعةِ في المواصفةِ نفسِها</b>. وهو خامسُ وجهٍ تُسمّيه رفعةٌ ولا يُحمَل.
          <br /><br />
          <b>وعَلامتانِ من عَلاماتِ «الرَّكاكةِ» تُسمَّيانِ ولا تُمحَيان، لأنهما التصميمُ نفسُه:</b> الماسِحُ الاستشاريُّ يُبلِّغُ <code>slop 01 indigo→violet gradient</code> على القُرص، و<code>slop 02 gradient-clip headline</code> على الكلمتَينِ المُبرَزتَين. <b>والبوّابةُ الصُّلبةُ تُفوِّضُ التدرُّجاتِ إلى ذلك الماسِحِ الاستشاريّ</b> — فلا شيءَ يَسقُطُ في البِناء — <b>والمستودعُ يَحمِلُ 1099 إشارةً في 24 مجموعةً أصلًا، فيها مكوِّناتٌ سابقةٌ في <code>ui/</code></b>. <b>فهما مُتّسِقتانِ مع ما هو موجودٌ لا شاذّتانِ عنه، وتُسمَّيانِ بأسماءِ الماسِحِ نفسِه ليَراهُما المالِك.</b>
          <br /><br />
          <b>وثلاثٌ صغيرةٌ:</b> الزِّرُّ كان بلا <code>type</code> فكانَ <code>submit</code> بالوِراثة — <b>غيرُ ضارٍّ هنا وعَطَبٌ حقيقيٌّ أوّلَ مرّةٍ يوضَعُ في نموذج</b> — فصارَ <code>type=&quot;button&quot;</code>؛ و<b>خمسُ <code>{'{}'}</code> حُذِفَت</b> وهي الخامسةُ على التوالي؛ <b>والجِذرُ لا يَحمِلُ أرضًا من عندِه</b> لأنّ إطارَ العَرضِ الأصليَّ يُعطيها، <b>فأعطَتها العارضةُ على الغِلافِ لا بتعديلِ الرفعة</b> — ولولاها لَوقعَت كلماتٌ بيضاءُ على صفحةٍ فاتحة. <b>والدعوةُ بلا مُعالِج</b>، فهي زِرٌّ مُسمًّى لا يفعلُ شيئًا.
        </SpecRow>

        <SpecRow name="حُدودٌ تدورُ إلى الأبدِ وتَسكُنُ عندَ الطلب: مَقيسةً لا مَظنونة" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-card-specimen="" className="w-full min-w-0 [&>div]:min-h-0" dir="ltr">
              <GlassCard />
            </div>
          </MotionConfig>
        }>
          <b>ثلاثُ رفعاتٍ وصلَت معًا، وأهمُّ ما فيها أنّ بوّابةً رأَت ما لم يَرَه مِسباري.</b> وهذه أوّلُها. <b>وحُدودُها الدائرةُ تدورُ إلى الأبد</b> — <code>repeat: Infinity</code> على عشرينَ ثانية — <b>وهو الشيءُ الوحيدُ في الثلاثةِ الذي تُسمّيه WCAG صريحًا</b>. وهو مَحلولٌ أصلًا، <b>وقِيسَ لا افتُرِض: بلا تفضيلٍ تُقرأُ الحُدودُ 58 ثمّ 64 ثمّ 70 ثمّ 76 ثمّ 82 درجة؛ ومع <code>reduce</code> تُقرأُ صِفرًا في العيّناتِ الخمسِ كلِّها</b>. و<code>MotionConfig</code> يَبلُغُها لأنّ الدَّورانَ تحويل. <b>فلا شيءَ يُغيَّرُ، ويُسجَّلُ لأنّ حركةً أبديّةً هي بالضبطِ ما يستحقُّ القارئُ دليلًا عليه.</b>
          <br /><br />
          <b>والوصفُ سقطَ:</b> <code>text-white/40</code> فوقَ جِسمِ البطاقةِ يُقاسُ <b>3.30</b> أمامَ 4.5 — <b>وهو الجُملةُ التي تقولُ ما تفعلُه الميزة، فرُفِعَ إلى 0.65 لا أُبلِغَ عنه: 5.87 بعدَه</b>. والعُنوانُ 8.66 ولافِظةُ الدعوةِ 5.93 يَعبُرانِ بلا مساس. <b>والصورةُ محمولةٌ ولا تصِلُ (<code>naturalWidth</code> صِفر) فأرضٌ محلّيّةٌ تحتَها، وجِسمُ البطاقةِ يَحمِلُ سِتارةً داكنةً تحتَ غِشائِه الأبيضِ المُواصَف</b> — والأرضُ تبقى زاهية. <b>والدعوةُ كانت بلا <code>type</code></b> فكانت <code>submit</code> بالوِراثة. <b>وخمسُ <code>{'{}'}</code> حُذِفَت.</b> <b>ويُقالُ ولا يُلمَس: البطاقةُ كلُّها <code>cursor-pointer</code> بلا مُعالِجٍ عليها</b>، فهي تُعلِنُ ضَغطةً لا يُنفِّذُها إلا زِرُّها.
        </SpecRow>

        <SpecRow name="أداةُ قياسٍ صُحِّحَت: حِبرٌ شفّافٌ يُركَّبُ فوقَ أرضِه لا فوقَ السَّواد" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-tags-specimen="" className="w-full min-w-0 [&>div]:min-h-0" dir="ltr">
              <GlassTags />
            </div>
          </MotionConfig>
        }>
          <b>اثنتا عشرةَ حُبَّةً تُبدَّلُ، ولا شيءَ يقولُ ذلك.</b> كلُّ واحدةٍ <code>&lt;button&gt;</code> حقيقيٌّ بلافِظتِه نصًّا — <b>وقِيسَ: الاثنتا عشرةَ كلُّها تُسمّي نفسَها</b> — <b>لكنّ <code>aria-pressed</code> كان غائبًا، فحالةُ الاختيارِ كانت لونًا وتوهُّجًا وعَلامةَ صحٍّ ولا شيءَ يُقرَأ</b>. فصارَت محمولةً على الواصِفة. <b>والصحُّ والنُّقطةُ <code>aria-hidden</code></b> لأنّهما يقولانِ ما تقولُه الواصِفةُ، ومرّتانِ أسوأُ من مرّة. و<code>type=&quot;button&quot;</code> كان غائبًا عن الاثنتَي عشرة، <b>وثلاثُ <code>{'{}'}</code> حُذِفَت.</b>
          <br /><br />
          <b>وأنفعُ ما في هذه الرفعةِ قياسٌ لي بَطَلَ فصُحِّحَت أداتي به.</b> فقد قِستُ لافِظةَ الحُبّةِ الخامِلةَ عندَ <code>rgba(255,255,255,0.5)</code> فرجعَت <b>3.63</b>، <b>ثمّ حسَبتُها فرجعَت 4.76 — والرقمانِ لا يجتمعان</b>. <b>والعِلّةُ في مُساعِدي: كان يُحِلُّ الحِبرَ الشفّافَ فوقَ الأسودِ لا فوقَ السَّطحِ الذي يجلِسُ عليه فعلًا</b>، فالأبيضُ بنِصفِ شفافيّةٍ يصيرُ <code>rgb(128,128,128)</code> والحقيقةُ <code>rgb(149,149,149)</code>. <b>فصارَ التركيبُ يجري فوقَ الأرضِ المَقيسةِ نفسِها، وهذا يُصلِحُ كلَّ قياسٍ للأحبارِ الشفّافةِ بعدَه.</b>
          <br /><br />
          <b>ثمّ سقطَت اللافِظةُ مرّةً أُخرى لسببٍ هو أنا:</b> أرضي الزاهيةُ أسطَعَتِ الحُبّةَ فصارَ 0.5 المُواصَفُ يُقاسُ <b>4.13</b>. <b>ونِصفُ الزوجِ لي هذه المرّة، فالذي يَنزِلُ هو أرضي لا قيمةُ المؤلِّف</b>: عُمِّقَتِ السِّتارةُ من 0.66 إلى 0.80 <b>فصارَ 4.83، وقيمةُ المواصفةِ باقيةٌ كما هي</b>.
        </SpecRow>

        <SpecRow name="رَماديُّ ButtonFace على زُجاجٍ داكن: بوّابةٌ رأَت ما فوَّتَه مِسباري" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-tabbar-specimen="" className="w-full min-w-0 [&>div]:min-h-0" dir="ltr">
              <GlassTabBar />
            </div>
          </MotionConfig>
        }>
          <b>هذه أسوأُ الثلاثةِ رقمًا، وفيها الدرسُ كلُّه.</b> فالتَّبويباتُ الخامِلةُ كانت <code>rgba(255,255,255,0.32)</code> — <b>مَقيسةً 2.83 فوقَ سَطحِ القُرصِ أمامَ 4.5 للافِظةٍ بحجمِ 10px</b> — <b>وأربعةٌ من خمسةٍ خامِلةٌ في كلِّ لحظة، أي أنّ ذلك مُعظَمُ الأداةِ مُعظَمَ الوقت</b>. فرُفِعَت إلى 0.55 فصارَت 5.48. والتحويمُ كان سليمًا عندَ 6.95 فلم يُمَسّ.
          <br /><br />
          <b>ولونٌ نشِطٌ واحدٌ سقطَ وأربعةٌ عبَرَت، فتحرَّكَ واحدٌ فقط:</b> <code>Explore 5.70</code> و<code>Create 7.72</code> و<code>Messages 4.96</code> و<code>Profile 5.47</code> — <b>و<code>Home #3A86FF</code> عندَ 4.18</b>. فنزلَ الأزرقُ درجةً إلى <code>#60A5FA</code> فصارَ 5.73، <b>وهو أزرقُ نفسُه لمن يَنظُر</b>. <b>والأيقونةُ بحجمِ 20px بذلكَ اللونِ كانت عابِرةً أصلًا على حَدِّها (3)</b> — الساقِطةُ هي اللافِظةُ بحجمِ 10px، <b>واللونُ واحدٌ لهما فقيمةٌ واحدةٌ تُصلِحُ الاثنتَين</b>.
          <br /><br />
          <b>وخمسُ تَبويباتٍ فيها واحدٌ نشِطٌ ولا شيءَ يُظهِرُه.</b> <b>وهي ليست تَبويباتٍ فوقَ ألواح — لا ألواحَ هنا —</b> فـ<code>role=&quot;tablist&quot;</code> ادِّعاءُ بِنيةٍ غيرِ موجودة، <b>ويَعِدُ فوقَ ذلك بتنقُّلٍ بالأسهُمِ لا يُنفِّذُه المكوِّن</b>. <b>فـ<code>aria-pressed</code> يقولُ الحقيقةَ كما هي: واحدٌ من خمسةِ أزرارٍ مُختارٌ الآن.</b>
          <br /><br />
          <b>وأهمُّ ما في هذه الدفعةِ كلِّها: البوّابةُ التقطَت عَطَبًا فوَّتَه مِسباري، وكِدتُ أُصلِحُ نَظَرَ البوّابةِ مكانَ العَطَب.</b> فقد أبلغَ <code>axe</code> عن خمسِ عُقَدٍ في ستِّ حُزَمٍ: <code>#f8f8f8 على #efefef بنسبةِ 1.08</code>. <b>وأنا كنتُ قِستُ بكسلًا داخلَ القُرصِ فرجعَ 4.83، فقرَأتُ الفارقَ على أنّ البوّابةَ عَمياءُ عن سِتارةٍ لا تستطيعُ الوُصولَ إليها</b> (وذلكَ صحيحٌ في نفسِه: <code>axe</code> يَحسِمُ لونَ النصِّ بالمُرورِ على أسلافِه، وطبقةٌ عندَ <code>z-[-1]</code> ليست سَلَفًا) <b>فنقَلتُ السِّتارةَ لتُرى</b>. <b>ثمّ لم يتغيَّرْ شيء.</b>
          <br /><br />
          <b>فقرأتُ سِلسِلةَ الخلفيّاتِ فوقَ اللافِظةِ فوجدتُ الزِّرَّ نفسَه بـ<code>background-color: rgb(239,239,239)</code></b> — <b><code>ButtonFace</code>، رَمادِيُّ المُتصفِّحِ الفاتح</b>. فهذه التَّبويباتُ لا تُصرِّحُ بخلفيّةٍ لها، <b>وإعادةُ ضبطِ هذا المشروعِ تُغطّي اللونَ والمُؤشِّرَ والخطَّ ولا تُغطّي الخلفيّة</b>. <b>والبكسلُ حَكَم: داخلَ التَّبويبِ <code>rgb(239,239,239)</code> وحولَه في القُرصِ <code>rgb(86,58,47)</code></b> — <b>أي خمسةُ مُستطيلاتٍ رماديّةٍ فاتحةٍ جالِسةٌ على زُجاجٍ داكن، عَطَبٌ مَرئيٌّ لا وَهمُ بوّابة</b>. <b>وقياسي كان الأعمى: كنتُ آخُذُ البكسلَ من القُرصِ بينَ التَّبويباتِ حيثُ لا يَرسُمُ زِرٌّ شيئًا.</b>
          <br /><br />
          <b>فأُضيفَ <code>bg-transparent</code> (مع إعادةِ ضبطِ الزِّرِّ المُعتادة) فصارَ البكسلُ داخلَ التَّبويبِ <code>rgb(81,57,47)</code> مُطابِقًا لقُرصِه، و<code>AXE</code> رجعَ صِفرًا.</b> <b>ونَقلُ السِّتارةِ بقيَ لأنه صحيحٌ لسببِه الخاصّ</b> — بوّابةٌ لا تَرى الأرضَ لا تستطيعُ الحُكمَ على النصِّ فوقَها — <b>لكنّ الفشلَ الذي أبلغَته كان حقيقيًّا، والدرسُ أنّ اختلافَ رقمِ البوّابةِ عن رقمي ليس بالضرورةِ خطأً في البوّابة.</b>
          <br /><br />
          <b>ووصلَت أحسنَ من مواصفتِها في موضع:</b> القُرصُ مكتوبٌ <code>w-[min(380px,calc(100vw-2rem))]</code> حيثُ طلبَتِ المواصفةُ 380 جامدة. <b>وثلاثُ <code>{'{}'}</code> حُذِفَت.</b>
        </SpecRow>

        <SpecRow name="خطآنِ مُستقِلّانِ يتّفِقانِ على جوابٍ خطأ، وشَفافيّةٌ لا تُنقَلُ بينَ مكوِّنَين" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-navbar-specimen="" className="w-full min-w-0 [&>div]:min-h-0" dir="ltr">
              <GlassNavbar />
            </div>
          </MotionConfig>
        }>
          <b>ثالثُ مكوِّنٍ على التوالي تَحكُمُ فيه إعادةُ ضبطِ هذا المستودعِ على الأزرار، وأوّلُ مرّةٍ يُخفيها عنّي قياسانِ اثنانِ في وقتٍ واحد.</b>
          <br /><br />
          <b>فكلُّ زِرٍّ هنا يَرسُمُ <code>ButtonFace</code> — رَماديَّ المُتصفِّحِ — ما لم يُقَلْ له غيرُ ذلك، والمَقيسُ أنّ عناصرَ التنقُّلِ تَحسِبُ <code>rgb(239,239,239)</code>.</b> <b>وقياسايَ الأوّلانِ فوَّتاه، وهذا هو الجُزءُ الذي يستحقُّ التسجيل.</b> <b>الأوّل:</b> سَردُ الأنماطِ المحسوبةِ كان طويلًا فخرجَت عناصرُ التنقُّلِ من الجُزءِ الذي قرأتُه فعلًا، <b>فبَنيتُ حُكمًا على الثلاثةِ التي رأيتُها</b>. <b>والثاني:</b> مِسبارُ البكسلِ أخذَ نُقطةً على 3 بكسلاتٍ من زاويةِ الزِّرِّ العُلويّةِ اليُسرى — <b>والحُبَّةُ <code>rounded-full</code>، فتلكَ النُّقطةُ خارجَ الشكلِ المَرسومِ فرجعَت بلونِ الشريطِ خلفَه، داكنًا مُطمئِنًا</b>. <b>وخطآنِ مُستقِلّانِ يتّفِقانِ على جوابٍ واحدٍ خطأ: هكذا بالضبطِ يَنجو الجوابُ الخطأ.</b>
          <br /><br />
          <b>ولونُ النصِّ وخطُّه على الزِّرِّ لا تَبلُغُهما أداةُ Tailwind في هذا المشروع</b> — <code>button {'{'} color: inherit {'}'}</code> و<code>font: inherit</code> غيرُ مُطبَّقتَينِ في طبقةٍ فتَغلِبانِ <code>@layer utilities</code>. <b>والمَقيسُ على الدعوتَينِ وعلى زِرِّ القائمة: <code>rgb(16,36,46)</code> عندَ 16px ووَزنِ 400</b> بدلًا من أبيضَ عندَ 14px ووَزنِ 600 — <b>وأيقونةُ القائمةِ مرسومةٌ بـ<code>currentColor</code> فوَرِثَت ذلك الحِبرَ الداكنَ على حُبّةٍ بيضاءَ شفّافة</b>. فضُبِطَت سَطريًّا. <b>وبعدَه: 14px ووَزنُ 600 وأبيضُ صريح، والقائمةُ لها اسمٌ «Open menu» و<code>aria-expanded</code>.</b>
          <br /><br />
          <b>والتَّدرُّجُ نفسُه الذي في رفعةِ النافذةِ المِنبَثِقة، وبالفَخِّ نفسِه — لكنّ القيمةَ التي أثبَتَتها هناك لم تَكفِ هنا.</b> فأعَدتُ استخدامَ 0.56 <b>فقِيسَ 4.49 — أقلُّ من الحدِّ بواحدٍ من مئة</b> — <b>لأنّ الأرضَ هنا أسطعُ من جَوفِ تلكَ البطاقة</b>. <b>والدرسُ أنّ الشَّفافيّةَ التي تَعبُرُ خاصّيّةُ الزوجِ لا خاصّيّةُ اللون</b>، فلا تُنقَلُ من مكوِّنٍ إلى مكوِّنٍ بلا إعادةِ قياس. <b>وتعميقُ سِتارةِ الشريطِ من 0.66 إلى 0.80 لم يُحرِّكِ الزِّرَّ إلا قليلًا</b> — غِشاءٌ بـ56٪ لا يُنفِذُ إلا 44٪ من الأرض — <b>فنزَلَت أطرافُ الكَهرَمانِ إلى 0.50 كذلك، فصارَ 5.25</b>.
          <br /><br />
          <b>والسِّتارةُ كانت مطلوبةً على أيِّ حال:</b> عندَ 0.66 كانت لافِظةُ التنقُّلِ الخامِلةُ تُقاسُ 3.36، <b>وذاك فشلٌ سبَبُه أرضي الزاهيةُ لا الرفعة، فالأرضُ هي التي تَنزِلُ لا قيمةُ المؤلِّف</b>.
          <br /><br />
          <b>وقياسٌ ثالثٌ لي بَطَلَ في الطريق:</b> بعدَ الإصلاحِ رجعَت اللافِظةُ 3.68 وأرضُها <code>rgb(78,70,69)</code> — <b>رماديّةٌ في حينِ أنّ سَطحَ الشريطِ دافئ</b> — <b>أي أنّ العيّنةَ كانت واقعةً على الحُروفِ نفسِها فخَلَطَت حِبرَها بأرضِها</b>. <b>فأُخِذَتِ الأرضُ من حاشيةِ الزِّرِّ الداخليّةِ (<code>px-5</code>) بعيدًا عن أيِّ حَرف: 4.64 و4.54 و4.55 للثلاثةِ الخامِلة، و8.68 للنشِطة.</b>
          <br /><br />
          <b>وتُقالُ بصَراحةٍ: الخامِلاتُ تَعبُرُ بهوامِشَ ضيّقةٍ جدًّا — أربعةٌ وخمسةُ أجزاءٍ من مئةٍ فوقَ الحدّ.</b> <b>ولم أُعمِّقِ السِّتارةَ أكثرَ طلبًا للهامِش، لأنّ إغراقَ الزُّجاجِ في السَّوادِ هو بعينِه ما نُبِّهتُ عليه في هذا القِسم</b> — <b>ويُضافُ تحذيرٌ لا أستطيعُ قياسَه: حينَ تَصِلُ الصورةُ على جهازِ المالِكِ تتغيَّرُ الأرضُ وتتحرَّكُ هذه الأرقامُ معَها، وهذه اللافِظةُ تجلِسُ قريبًا من الخطّ.</b>
          <br /><br />
          <b>و<code>aria-current=&quot;page&quot;</code> لا <code>aria-pressed</code>:</b> هذا <code>&lt;nav&gt;</code>، <b>ومعنى الإبرازِ فيه «أنتَ هنا» لا «هذا مضغوط»</b> — وقد قِيسَ ظُهورُ الواصِفةِ عندَ النَّقر. <b>ومنارةُ الشَّعارِ تدورُ إلى الأبدِ وتَسكُنُ عندَ الطلب: 44 ثمّ 50 ثمّ 56 ثمّ 63 بلا تفضيل، وصِفرٌ في كلِّ عيّنةٍ مع <code>reduce</code>.</b> <b>وإحدى عشرةَ <code>{'{}'}</code> حُذِفَت</b>، وهي أكبرُ عددٍ في الدفعة.
        </SpecRow>

        <SpecRow name="حركةٌ لا يَطلُبُها أحدٌ تُوقَف، وحركةٌ تَصنَعُها اليَدُ تَبقى" bare specimen={
          /* This one cannot take the `min-h-0` neutralisation alone. Its root IS the
             measured container and its canvas is absolutely positioned, so zeroing
             the height collapses the root and takes the canvas with it — which is
             exactly what the upload's own note warns about. The wrapper supplies a
             real, fluid height instead. */
          <div data-noise-specimen="" className="aspect-[16/9] w-full min-w-0 [&>div]:h-full [&>div]:min-h-0" dir="ltr">
            <NoiseField />
          </div>
        }>
          <b>أنظفُ رفعةٍ وصلَت في هذه الدفعةِ كلِّها، ويُقالُ ذلك أوّلًا وبالتفصيل:</b> مقاسُ اللَّوحِ صحيحٌ بنِسبةِ البكسل، و<code>ResizeObserver</code> يُعيدُ بناءَ الشَّبكةِ <b>مع الحفاظِ على زاويةِ كلِّ سَهمٍ وطَورِه عبرَ خريطةٍ مُفتاحُها <code>gx,gy</code></b> فلا تَقفِزُ الحقلةُ عندَ تغييرِ المقاس، والتفكيكُ كامل، وفيها لمسٌ للشاشاتِ لم تطلُبْه المواصفة، <b>ولا <code>{'{}'}</code> واحدةً من بقايا التعليقاتِ المَنزوعة</b> — وهي أوّلُ رفعةٍ في الدفعةِ تصِلُ بلا واحدةٍ منها.
          <br /><br />
          <b>١. والحقلةُ كانت تَرسُمُ أرضَها الفاتحةَ في كلِّ حُزمةٍ داكنة.</b> فاختبارُها للدُّكنةِ <code>classList.contains('dark')</code>، <b>وهذا المشروعُ لا يَحمِلُ صَنفَ <code>dark</code> أصلًا — يُبدِّلُ بـ<code>data-theme</code> وقيمتانِ من سَبعِه داكنتان</b>. والقياسُ: مع <code>data-theme=&quot;night&quot;</code> ثمّ <code>&quot;dark&quot;</code> حسَبَ الجِذرُ <code>rgb(245,241,234)</code> — <b>أي <code>#F5F1EA</code>، القيمةَ الفاتحة</b> — و<code>classList.contains('dark')</code> كاذبةٌ في الحُزَمِ الثلاثِ جميعًا. <b>فكانتِ الأسهُمُ تُرسَمُ داكنةً على فاتحٍ والصفحةُ حولَها داكنة.</b> <b>فزِيدَ <code>data-theme</code> إلى الاختبارِ وإلى ما يُراقِبُه المُلاحِظ، والاختباراتُ الأصليّةُ باقيةٌ لأنها هي التي تُشغِّلُ المكوِّنَ خارجَ هذا المستودع.</b> <b>وبعدَه: <code>night</code> و<code>dark</code> تُعطيانِ <code>rgb(17,15,12)</code>، والفاتحةُ باقيةٌ على حالِها.</b>
          <br /><br />
          <b>٢. والحَلقةُ لا تتوقَّفُ أبدًا:</b> <code>t += 0.004</code> كلَّ إطار، والحالةُ الخامِلةُ تَنسابُ حتى بلا مُؤشِّر. <b>وبطانيّةُ هذا المستودعِ CSS — <code>animation-duration: 1ms</code> — ولا يدَ لها على حَلقةِ <code>requestAnimationFrame</code></b> كما كان في كُرةِ الجُزَيئات، <b>و<code>MotionConfig</code> لا يُجدي هنا لأنّ لا شيءَ في هذا المكوِّنِ من framer</b>. والقياسُ قبلَ الوصل: <b>لَقطتانِ للَّوحِ بفاصلِ 700ms تختلفانِ بَصمَتُهما تحتَ <code>reduce</code> كما تختلفانِ بدونِه</b>.
          <br /><br />
          <b>فصارَ التفضيلُ يُقرأُ في JS، والنتيجةُ ثلاثُ حالاتٍ قِيسَت كلُّها:</b> <b>في السكونِ تحتَ <code>reduce</code>: بَصمتانِ متطابقتان</b> — لا انسياب؛ <b>وبعدَ حركةِ المُؤشِّر: البَصمةُ تتغيَّر</b> — أي أنّ الأسهُمَ تُجيبُ اليَدَ؛ <b>وبالمُؤشِّرِ ثابتًا بعدَها: متطابقتانِ مرّةً أُخرى</b>. <b>فالذي أُوقِفَ هو الحركةُ التي لا يَطلُبُها أحد، لا الحركةُ التي يَصنَعُها القارئُ بيدِه</b> — وإطارٌ واحدٌ يُرسَمُ على أيِّ حال، <b>لأنّ حقلَ أسهُمٍ ساكنٍ هو العيّنة، ومُستطيلٌ فارغٌ جوابٌ أسوأ</b>.
          <br /><br />
          <b>٣. ولَقطةُ الوصولِ أرَت <code>{'{"role":"Canvas","name":""}'}</code></b> — عُقدةً لا تُنطِقُ شيئًا. والحقلةُ زينة، <b>فأُخفِيَت كما أُخفِيَ لوحُ الكُرةِ ولوحُ FlameWrap</b>، والعُقدةُ ذهبَت.
          <br /><br />
          <b>وغِلافُ العيّنةِ هنا لا يَقبَلُ ما قَبِلَته الرفعاتُ قبلَه، وهذا مكتوبٌ في مُلاحَظةِ الرفعةِ نفسِها:</b> جِذرُها هو الحاويةُ المَقيسةُ ولوحُها مُطلَقُ الموضِع، <b>فتصفيرُ الارتفاعِ يُطبِقُ الجِذرَ ويأخُذُ اللَّوحَ معَه</b>. <b>فأعطاه الغِلافُ ارتفاعًا حقيقيًّا مائعًا (<code>aspect-[16/9]</code>) بدلًا من التصفيرِ وحدَه</b>، والمَقيسُ بعدَه: الغِلافُ والجِذرُ واللَّوحُ ثلاثتُها <code>634x357</code>، ومُخزَّنُ الرَّسمِ مِثلُها.
          <br /><br />
          <b>ويُقالُ ولا يُلمَس: الأثرُ كلُّه للمُؤشِّرِ ولا مُكافِئَ له في لوحةِ المفاتيح</b> — <b>وهذا صادقٌ للزينة: ليس هنا شيءٌ يُشغَّل، بل شيءٌ يُنظَرُ إليه</b>.
        </SpecRow>

        <SpecRow name="ساعةٌ لا تقولُ الوقت: الوَمضُ يُسكَّنُ والثوانيةُ تَعُدّ" bare specimen={
          <div data-clock-specimen="" className="w-full min-w-0 py-6 [&>div]:min-h-0" dir="ltr">
            <NeonClock />
          </div>
        }>
          <b>ساعةٌ لا تقولُ الوقت. وهذا أوّلُ ما قاسَه المِسبارُ وأهمُّ ما في الرفعة.</b> فالأرقامُ مرسومةٌ مُضلَّعاتِ SVG، <b>فهي لا تُوجَدُ نصًّا</b>: لَقطةُ الوصولِ ترجعُ صفًّا من عُقَدِ <code>image</code> بلا أسماء، <b>ونصُّ الحاويةِ كلُّه قِيسَ <code>&quot;AMPMSUNMONTUEWEDTHUFRISATSEPTEMBER 3, 2026&quot;</code></b> — <b>أسماءُ الأيّامِ فيه والتاريخُ فيه، والوقتُ ليس فيه</b>. <b>أي أنّ قارئَ الشاشةِ يُخبِرُك بالتاريخِ ولا يُخبِرُك كم الساعة.</b>
          <br /><br />
          <b>فصارَت الساعةُ تُسمّي نفسَها:</b> <code>role=&quot;img&quot;</code> و<code>aria-label</code> يَحمِلُ الساعةَ والدقيقةَ والثانيةَ والفترةَ واليومَ والتاريخَ بصيغةٍ مقروءة. <b>والمَقيسُ بعدَه: <code>&quot;8:18:51 AM, Thursday, September 3, 2026&quot;</code>.</b> <b>وليست مِنطقةً حَيّةً بقصد</b> — <b>ساعةٌ تُعلِنُ نفسَها كلَّ ثانيةٍ لا تُستعمَل</b> — <b>فالاسمُ موضوعٌ ليُسأَلَ عنه لا ليُقاطِع</b>.
          <br /><br />
          <b>وأسماءُ الأيّامِ الخامِلةُ قِيسَت 2.03 أمامَ 4.5</b>، مُركَّبةً على أرضِ الساعةِ نفسِها <b>وطبقةُ نُقَطِ الـLCD فوقَها في مكانِها</b> — وهي الصَّفُّ الذي يقولُ لك أيُّ يومٍ هذا، <b>فرُفِعَت شَفافيّتُها من 0.28 إلى 0.56، أدنى قيمةٍ تَعبُرُ هنا: 4.56 مَقيسةً بعدَها</b>. <b>والتاريخُ الباهتُ عندَ 0.65 فُحِصَ في الرَّكضةِ نفسِها فعبَرَ عندَ 5.94 فتُرِكَ.</b>
          <br /><br />
          <b>وقراءةٌ لي بَطَلَت في الطريق ويُقالُ رقمُها:</b> أوّلُ قياسٍ لذلكَ التاريخِ رجعَ <b>1.26</b> وأرضُه <code>rgb(243,247,248)</code> — <b>أي أنّ العيّنةَ سقطَت أسفلَ صندوقِ الساعةِ الداكنِ على الصفحةِ الفاتحةِ خلفَه</b>. <b>فالرقمُ كان رقمي لا رقمَ الرفعة</b>، وأُعيدَ القياسُ بأرضٍ مأخوذةٍ من داخلِ الصندوقِ فوقَ كلِّ صَفّ.
          <br /><br />
          <b>وتقليلُ الحركةِ هنا يُقسَمُ بما تَخدُمُه الحركةُ لا بوجودِها:</b> <b>الوقتُ يَستمِرُّ</b> — <b>ساعةٌ تتوقَّفُ ليست ساعةً أهدأَ بل ساعةً مُعطَّلة، واستثناءُ WCAG نفسُه للحركةِ الجَوهريّة</b> — <b>والنُّقطتانِ الوامِضتانِ ليستا جَوهريّةً</b>: زينةٌ تَخفُقُ مرّتَينِ في الثانيةِ ما دامَتِ الصفحةُ مفتوحة. <b>والمَقيسُ قبلَ الوصل: تتغيَّرُ تحتَ <code>reduce</code> كما تتغيَّرُ بدونِه. وبعدَه: النُّقطتانِ ثابتتانِ مُضاءتان، والثوانيةُ تَعُدُّ كما تَعُدّ.</b>
          <br /><br />
          <b>وستُّ <code>{'{}'}</code> حُذِفَت.</b> <b>و<code>&quot;Courier New&quot;</code> رَتَلٌ نِظاميٌّ فلا يُجلَبُ منه شيءٌ من الخارج</b>، وقِسمُ الطِّباعةِ في المواصفةِ راضٍ بذلك. <b>وحالةُ ما قبلَ أوّلِ تِكّةٍ تَحمِلُ <code>min-h-screen</code> في حينِ أنّ المُشحونَ يَحمِلُ <code>h-full</code></b> — تفاوُتٌ في الرفعةِ نفسِها — <b>والغِلافُ يُبطِلُ الأوّلَ بمُحدِّدٍ، والمَقيسُ أنّ الجِذرَ 143 بكسلًا بارتفاعِ مُحتواه فلا قَفزةَ تخطيطٍ عندَ التركيب</b>.
        </SpecRow>

        <SpecRow name="تشويشٌ يُعيدُ تسميةَ الزِّرّ، ومُؤشِّرٌ ساكنٌ يُفسِدُ قراءتَين" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-glitch-specimen="" className="w-full min-w-0 py-8 [&>div]:min-h-0" dir="ltr">
              <GlitchButton />
            </div>
          </MotionConfig>
        }>
          <b>التشويشُ كان يُعيدُ تسميةَ الأداةِ نفسِها، وهذا أوّلُ ما قِيس.</b> فاللافِظةُ هي نصُّ الزِّرّ، <b>فبينَما تتشوَّشُ يتشوَّشُ معَها الاسمُ المقروءُ للزِّرّ</b> — والمَقيسُ من شجرةِ الوصولِ في ثلاثِ لحظاتٍ بعدَ التحويم:
          <br /><br />
          <code>&amp;*@?=&gt;%?=$</code> → <code>INITIALI&gt;&gt;</code> → <code>INITIALIZE</code>
          <br /><br />
          <b>أي أنّ الشيءَ الوحيدَ الذي يُسمّي هذه الأداةَ لسَبعِ مئةِ مِللي ثانيةٍ عَلاماتُ ترقيمٍ عَشوائيّة.</b> <b>فثُبِّتَ الاسمُ بـ<code>aria-label</code> وأُخفِيَ النصُّ المُتشوِّشُ عن الشجرة</b>: الأثرُ للعَينِ كما هو حرفًا، <b>والزِّرُّ يُسمّى INITIALIZE في كلِّ لحظةٍ من الرحلة</b> — والمَقيسُ بعدَه: الاسمُ ثابتٌ في اللحظاتِ الثلاثِ كلِّها.
          <br /><br />
          <b>و<code>text-lg font-semibold font-mono</code> سقطَت ثلاثتُها.</b> والمَقيسُ على الزِّرّ: <b>16px ووَزنُ 400 و<code>-apple-system</code></b> — لا 18px ولا 600 ولا أُحاديُّ العَرض. <b>وإعادةُ ضبطِ هذا المشروعِ غيرُ المُطبَّقةِ في طبقةٍ (<code>button {'{'} font: inherit {'}'}</code>) تَغلِبُ كلَّ أداةِ Tailwind، وهذا رابعُ مكوِّنٍ في الدفعةِ يُظهِرُها</b> — فضُبِطَت سَطريًّا، <b>و<code>tracking-widest</code> يَنجو لأنّ اختصارَ <code>font</code> لا يُصفِّرُ تباعُدَ الحروف، وهذا فُحِصَ لا افتُرِض</b>.
          <br /><br />
          <b>واختبارُ الدُّكنةِ <code>classList.contains('dark')</code> وهذا المشروعُ يُبدِّلُ بـ<code>data-theme</code>:</b> المَقيسُ أنّ <code>night</code> كان يُعطي <code>rgb(245,241,234)</code> — الأرضَ الفاتحة — <b>وبعدَ الوصل: <code>rgb(17,15,12)</code></b>. والاختباراتُ الأصليّةُ باقيةٌ لأنها هي التي تُشغِّلُه خارجَ هذا المستودع.
          <br /><br />
          <b>والتشويشُ كان يَجري رغمَ طلبِ تقليلِ الحركة:</b> أربعةَ عشرَ إطارًا من أربعةَ عشرَ مُشوَّشةً تحتَ <code>reduce</code>، كما بدونِه. <b>و<code>MotionConfig</code> لا يَبلُغُه: هذه حَلقةُ <code>requestAnimationFrame</code> تُحرِّكُ حالةَ React لا حركةَ framer</b>. <b>فصارَت اللافِظةُ تَصِلُ مَحلولةً تحتَ التفضيل: صِفرٌ من أربعةَ عشرَ. والتوهُّجُ والأقواسُ باقيةٌ، لأنّ تغييرَ اللونِ ليس حركة.</b>
          <br /><br />
          <b>وملاحظةٌ على قياسِ هذه الرفعةِ بعينِها، لأنها كلَّفَت ثلاثةَ مَسابِر:</b> أوّلُ قراءتَينِ لي قالتا إنّ التوهُّجَ مُضاءٌ في السكونِ وإنّ التشويشَ لا يَعملُ أصلًا. <b>وكِلتاهُما نفسُ الوَهم: النَّقرةُ تترُكُ مُؤشِّرَ Playwright حيثُ نَقَرَت، ثمّ التمريرُ يُدخِلُ هذا الزِّرَّ تحتَ ذلك المُؤشِّرِ الساكن</b> — <b>فيَنطلِقُ <code>mouseenter</code> وتَنتهي رحلةُ السبعِ مئةِ مِللي ثانيةٍ قبلَ أوّلِ قراءة</b>. <b>وإيقافُ المُؤشِّرِ بعيدًا قبلَ القياسِ يُعطي <code>shadow: &quot;none&quot;</code> في السكونِ وحَلًّا نظيفًا:</b> <code>I&gt;*&amp;%??+?@</code> ثمّ <code>IN~=^!@!??</code> ثمّ <code>INI=^^?^=&gt;</code> ثمّ <code>INIT?!+++%</code>. <b>والدرسُ أنّ حالةَ المُؤشِّرِ تَبقى بينَ الأفعالِ، وأنّ قراءتَينِ خاطئتَينِ عن سببٍ واحدٍ تُقنِعانِ أكثرَ من واحدة.</b>
          <br /><br />
          <b>و<code>type=&quot;button&quot;</code> كان غائبًا، و<code>{'{}'}</code> واحدةٌ حُذِفَت.</b> <b>ولافِظةُ الحُزمةِ الفاتحةِ قِيسَت 5.82 فعبَرَت</b>، والرَّتَلُ الأُحاديُّ نِظاميٌّ فلا يُجلَبُ من الخارجِ شيء.
        </SpecRow>

        <SpecRow name="تقويمٌ لا يُفتَحُ إلا بفأرة، وإرشادٌ مَقروءٌ بنسبةٍ 1.57" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-flip-specimen="" className="w-full min-w-0 py-8 [&>div]:min-h-0" dir="ltr">
              <FlipCalendar />
            </div>
          </MotionConfig>
        }>
          <b>البطاقةُ أداةٌ تُحدِّدُ قيمةً من واحدٍ إلى واحدٍ وثلاثين، ومُدخَلُها الوحيدُ كان <code>drag=&quot;y&quot;</code></b> — أي فأرةً ولا شيءَ سواها. والمَقيسُ على المُشحونِ كما وَرد: <b><code>tabIndex</code> سالبُ واحد، ولا <code>role</code>، ولا اسمٌ، وبعدَ أربعةِ مفاتيحَ — سهمٌ للأعلى وسهمٌ للأسفلَ و<code>PageDown</code> ومسافةٌ — اليومُ لا يزالُ <code>01</code></b>. <b>فصارَت <code>spinbutton</code></b>، وهو الدّورُ الموجودُ لهذا بعينِه: رَقمٌ في مدىً، <b>معَ <code>tabIndex={'{'}0{'}'}</code> والأسهمِ الأربعة</b>. <b>والمَقيسُ بعدَهُ بلوحةِ مفاتيحَ حقيقيةٍ: <code>Tab</code> يحلُّ عليها، وثلاثُ ضَرباتٍ للأعلى تُعطي <code>04</code>، وخمسٌ للأسفلَ تَلفُّ فتُعطي <code>30</code></b>. والسّحبُ لم يُمسَس.
          <br /><br />
          <b>ولا تحتاجُ حلقةَ تركيزٍ من عندِي</b>: <b><code>src/styles.css:87</code> يحملُ قاعدةَ <code>[tabindex]:focus-visible</code> غيرَ مُطبَّقةٍ في طبقة</b>، فلحطةَ يأخذُ العُنصرُ <code>tabindex</code> يُطوِّقُهُ المشروعُ — <b>والمَقيسُ تحتَ <code>Tab</code>: <code>3px solid</code> بإزاحةِ <code>3px</code></b>. <b>ومحاولتي الأولى أضافَت <code>focus-visible:outline-2</code> و<code>outline-offset-4</code> ولونًا سَطريًّا، فخسِرَت الأداتانِ للقاعدةِ غيرِ المُطبَّقةِ وربِحَ اللونُ لأنّهُ سَطريٌّ فحَجَبَ <code>--nova-focus</code> نفسَه</b> — <b>فحُذِفَت الثلاثُ</b>. وهذه أُختُ الإعادةِ غيرِ المُطبَّقةِ على الأزرارِ التي طاردَت هذه الدفعةَ كلَّها.
          <br /><br />
          <b>واليومُ كان يُعلَنُ مرتَين</b>: النِّصفانِ كلاهُما يرسُمُ الرَّقم، <b>فشجرةُ الوصولِ تحمِلُ عُقدتَي <code>text &quot;01&quot;</code> ولا شيءَ يقولُ أيُّهُما القيمة</b> — <b>وثلاثًا أثناءَ الطَّيِّ، حينَ تُركِّبُ الورقةُ نُسختَها</b>. فأُخفِيَ النِّصفانِ عن الشجرة، <b>والقيمةُ تُحمَلُ مرةً واحدةً بـ<code>aria-valuenow</code> و<code>aria-valuetext</code></b>. <b>والمَقيسُ بعدَه: عُقدةٌ واحدةٌ — <code>spinbutton</code> اسمُها Day of month وقيمتُها <code>01</code> ومداها من 1 إلى 31 — ولا عُقدةَ نَصٍّ واحدة</b>.
          <br /><br />
          <b>ولونا الإرشادِ مقلوبان</b>: <code>#3a3530</code> رماديٌّ داكنٌ وكان على الأرضِ <b>الداكنة</b>، و<code>#C8C2B8</code> رماديٌّ فاتحٌ وكان على <b>الفاتحة</b>. <b>والمَقيسُ: <code>rgb(200,194,184)</code> على <code>rgb(245,241,234)</code> يُعطي 1.57</b> — <b>وهذا النَّصُّ وحدَهُ ما يُخبِرُكَ أنَّ البطاقةَ تتحرَّكُ أصلًا</b>. <b>وبتبديلِهما لا أكثرَ — بلا لونٍ جديدٍ واحدٍ — صارَت النِّسبةُ 10.77 على الفاتحةِ و 10.81 على الداكنة</b>.
          <br /><br />
          <b>والطَّيُّ كان يَجري بكامِلِ سرعتِه تحتَ <code>prefers-reduced-motion: reduce</code></b>: المَقيسُ معَ التفضيل: <b>ثلاثةَ عشرَ إطارًا من ستةَ عشرَ تدور، وخطُّ المَسحِ يكنُسُ من 46px إلى 266px، ومصفوفةُ المَيلِ حيّةٌ تحتَ المُأشِر</b> — مطابقًا للا تفضيلٍ (أحدَ عشرَ من ستةَ عشرَ، والفرقُ ارتجاجُ مُعاينةٍ لا أكثر). <b>و<code>MotionConfig</code> لا يبلُغُ شيءًا من هذا، لأنَّ <code>animate(value, to)</code> دالةٌ حُرّةٌ بلا سياقِ مكوِّن، والإعدادُ لا يحكُمُ إلاّ خواصَّ عُنصرِ <code>motion</code> نفسِه</b>. <b>واليومُ يتغيّرُ تحتَ التفضيلِ كما كان — فهذا غرضُ الأداةِ كلُّه — لكنّهُ يصِلُ بلا قلبِ صفحة</b>. <b>والمَقيسُ بعدَه: صِفرٌ من ستةَ عشرَ إطارًا فيه ورقةٌ، والقيمةُ مع ذلك تتقدَّمُ إلى <code>02</code>، ومصفوفةُ البطاقةِ عادَت <code>matrix</code> ثنائيَّةً — الثَّلاثُ درجاتٍ السّاكنةُ وحدَها بلا مَيل</b>.
          <br /><br />
          <b>وواحدٌ مقروءٌ ولم يُصلَح، وذلك قرارٌ لا أتّخِذُهُ وحدي: <code>perspective: 140</code> لا يفعلُ شيءًا.</b> فهو على الورقةِ نفسِها، <b>و<code>perspective</code> في CSS يُطبَّقُ على أبناءِ العُنصرِ لا على تحويلِهِ هو</b>، وابنُ الورقةِ الوحيدُ بلا تحويلٍ ثلاثيٍ، <b>فقلبُ الصَّفحةِ يُرسَمُ انسِحاقًا رأسيًّا مُسطَحًا</b>. <b>والمَقيسُ عبرَ طَيَّةٍ كاملةٍ: الارتفاعُ المُرسَمُ يبقى <code>offsetHeight × |cos θ|</code> زائدًا ثابتًا مقدارُهُ 13.3px — ثابتًا في حدودِ ثُلثي بكسلٍ من <code>cos θ = 1.00</code> إلى <code>0.06</code></b> — <b>وهذا قانونُ جيبِ التمامِ المُسطَّحُ حرفًا</b>. (والثابتُ هو <code>rotate: 3deg</code> الخاصُّ بالبطاقةِ يُنفِخُ صُندوقَ ابنِها المحوريَّ: <code>260 × sin 3° = 13.6</code>. <b>وليس عُمقًا؛ العُمقُ ينمو معَ الزّاوية</b>.) <b>و<code>transformPerspective</code> هي الخاصيّةُ التي تُطبَّقُ على تحويلِ العُنصرِ نفسِه، وجرَّبتُها عندَ 140 المطلوبةِ — فانتفخَت الورقةُ إلى 187px من 107px، أي 1.75 مرّةً، ودَفَعَت 20.5px خارجَ حافةِ البطاقةِ العليا، حيثُ يقُصُّ <code>overflow-hidden</code> أعلى الأرقامِ لعدّةِ إطارات</b>. <b>فــ140 لم تُعايَر أبدًا، لأنَّها لم يكُن لها أثرٌ يُعايَر</b>. <b>ومُبادلةُ انسِحاقٍ مُسطَحٍ ببالونٍ مقصوصٍ ليسَ تحسينًا، واختيارُ رَقمٍ أخرَ قرارُ المالِكِ لا قراري — فتُرِكَت كما وَردَت حرفًا</b>.
          <br /><br />
          <b>وثلاثَ عشرةَ <code>{'{}'}</code> حُذِفَت، واختبارُ الدُّكنةِ وُصِلَ بـ<code>data-theme</code></b>: <b>المَقيسُ أنَّ <code>dark</code> و<code>night</code> كليهما يُعطي الأرضَ <code>rgb(17,15,12)</code> بعدَ أن كان <code>rgb(245,241,234)</code></b>.
          <br /><br />
          <b>وملاحقةٌ على قياسِ هذه الرفعة، فقد أخطأتُ فيها ثلاثَ مرّات</b>. <b>أوّلًا: أوّلُ تمريرٍ بلا تفضيلٍ قالَ إنَّ السّحبَ لا يفعلُ شيءًا أصلًا — صِفرٌ من أربعةَ عشرَ واليومُ <code>01</code> — في حينِ أنَّ تمريرَ التقليلِ في النَّصِّ نفسِه قلبَ إلى <code>02</code></b>. سياقانِ، نَصٌّ واحدٌ، جوابانِ متناقضانِ، <b>والذي ادَّعى أقلَّ كان لي: تمريرُ اللا تفضيلِ كان قد أجرى ثلاثةَ مسابِرَ قبلَه، فيها ضَربةُ <code>Space</code> تُمرِّرُ الصَّفحةَ و<code>focus()</code> على عُنصرٍ لا يقبَلُ التركيز</b>. <b>وقصُّ النَّصِّ إلى تركيبٍ وإيقافِ مُأشِرٍ وسحبٍ وقراءةٍ — ثلاثَ مرّاتٍ — يُعطي <code>01</code> إلى <code>02</code> في كلِّ مرّة</b>. والقراءةُ الأولى مسحوبة.
          <br /><br />
          <b>وثانيًا: ضَبَطتُ <code>data-theme</code> وقرأتُ النمطَ المحسوبَ في التِّكّةِ نفسِها</b>، وهي تقرأُ النمطَ القديم، <b>لأنَّ ردَّ المُراقِبِ مُهمةٌ مِجهريةٌ وإعادةَ رسمِ React متأخِّرةٌ عنها</b> — <b>فبدا إصلاحُ <code>data-theme</code> مُعطَّلًا وليسَ كذلك</b>. وهذا نفسُ خطأِ <code>group-focus-within</code> في رفعةٍ سابقة. <b>وثالثًا: قرأتُ لونَ حلقةِ التركيزِ بمُعينٍ يأخُذُ <code>color(srgb 0.039 0.447 0.921 / 0.74)</code> فيقرأُ الكُسورَ من صِفرٍ إلى واحدٍ بايتاتٍ من صِفرٍ إلى 255</b> — وهو نفسُ الخطأِ الذي جعلَ ألوانَ <code>lab()</code> تُقرأُ شبهَ سوداءَ ثلاثَ مرّاتٍ في هذه الدفعة. <b>والحلقةُ رمزُ المشروعِ نفسُهُ ومُبوَّبٌ أصلًا، فلم يُدّعَ لها رَقمٌ هنا بدلًا من أن يُدّعى خطأً</b>.
        </SpecRow>

        <SpecRow name="زِرٌّ بلا اسمٍ يحوي ستَّ صُوَرٍ بلا اسم، وحَبلٌ لا تبلُغُهُ لوحةُ مفاتيح" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-blind-specimen="" className="w-full min-w-0 py-8 [&>div]:min-h-0" dir="ltr">
              <BlindPullToggle />
            </div>
          </MotionConfig>
        }>
          <b>الزِّرُّ كان بلا اسم، وفي جَوفِهِ ستةُ أشياءَ بلا اسمٍ كذلك.</b> والمَقيسُ على المُشحونِ كما وَرد، من شجرةِ الوصول: <b><code>button &quot;&quot;</code> تحمِلُ ستَّ عُقَدِ <code>image &quot;&quot;</code></b> — <b>فالأيقونةُ تُرسَمُ مرةً لكلِّ شَريحةٍ، وهذا هو عملُ السِّتارةِ نفسُه</b>، لكنَّ قارئَ الشاشةِ يَلقى أداةً بلا اسمٍ مملوءةً بصُوَرٍ بلا أسماء. <b>فأُخفِيَت رُكامةُ الشَّرائحِ كلُّها عن الشجرةِ بسِمةٍ واحدةٍ تكفي السِّتَّ</b>، <b>وحمَلَ الزِّرُّ <code>aria-label</code> و<code>aria-pressed</code></b> — وهذا هو الشَّكلُ الصادقُ لأداةٍ لها حالةٌ من عندِها. <b>والمَقيسُ بعدَه: عُقدةٌ واحدةٌ، <code>button</code> اسمُها Night mode ومَضغوطةٌ، ولا عُقدةَ صورةٍ واحدة</b>، <b>و<code>aria-pressed</code> يَنقلِبُ إلى <code>false</code> بعدَ النَّقرة</b>.
          <br /><br />
          <b>والحَبلُ كان أداةً ثانيةً لا يَبلُغُها إلا فأرة</b>: <code>&lt;div&gt;</code> عليهِ <code>onClick</code>، والمَقيسُ: <b><code>tabIndex</code> سالبُ واحد، ولا دَورَ ولا اسم، و<code>cursor: pointer</code>، و<code>Tab</code> بعدَ الزِّرِّ يَحُلُّ في مكانٍ آخرَ تمامًا</b>. <b>وهو يفعلُ ما يفعلُهُ الزِّرُّ حرفًا، فلا يحتاجُ أن يصيرَ أداةً ثانيةً — بل أن يَكُفَّ عن التظاهُرِ بأنّهُ كذلك</b>. <b>فأُخفِيَ عن الشجرة، وبقيَ اختصارُ المُأشِرِ للفأرة</b>. والحكمةُ أنَّ إضافةَ دَورٍ وتركيزٍ لأداةٍ مُكرَّرةٍ تُضيفُ محطةَ جدولٍ لا تفعلُ شيئًا جديدًا؛ والحذفُ من الشجرةِ أصدقُ من الإضافةِ إليها.
          <br /><br />
          <b>و<code>type=&quot;button&quot;</code> كان غائبًا</b> — المَقيسُ <code>null</code> — <b>فداخلَ استمارةٍ يُرسِلُها هذا المُبدِّل</b>.
          <br /><br />
          <b>واختبارُ الدُّكنةِ <code>classList.contains('dark')</code> وهذا المشروعُ يُبدِّلُ بـ<code>data-theme</code></b>. <b>والمَقيسُ بانتظارٍ بعدَ كتابةِ السِّمة</b> — <b>فالقراءةُ في التِّكّةِ نفسِها تقرأُ النمطَ القديم، وهو خطأٌ كلَّفني نتيجةً سالبةً كاذبةً في الرفعةِ السابقة</b> — <b><code>data-theme=&quot;night&quot;</code> كان يُعطي الأرضَ الفاتحةَ <code>rgb(237,234,229)</code></b>، <b>وبعدَ الوصل: <code>dark</code> و<code>night</code> كِلاهُما <code>rgb(17,15,12)</code></b>.
          <br /><br />
          <b>وتقليلُ الحركة، وهذا يَسلُكُ سُلوكًا مُخالِفًا لكلِّ <code>animate()</code> آخرَ في هذه الدفعة.</b> <b>فـ<code>useAnimate</code> يُعطي دالةً مَنسوبةً إلى المكوِّن، فهي <b>ترى</b> <code>MotionConfig</code></b> — والمَقيسُ: <b>أربعةَ عشرَ إطارًا من عشرينَ في وسَطِ الانسِحاقِ بلا تفضيلٍ، مُقابلَ صِفرٍ معَه</b>. <b>لكنّ المُشحونَ تحتَ التفضيلِ لا يَتخطّى الخُطوةَ بل يَقفِزُ إلى قيمتِها النهائية: <code>scaleY</code> يَبلُغُ صِفرًا رغمَ ذلك</b>. <b>فكلُّ شَريحةٍ تَختفي وتعودُ في إطارٍ واحد</b> — <b>والمَقيسُ 35 و36 مِللي ثانيةٍ من النَّقرةِ إلى تغيُّرِ الأيقونة، مُقابلَ 441 و436 بلا تفضيل</b> — <b>والحَبلُ يَقفِزُ من 14px إلى 31px في اللحظةِ نفسِها</b>. <b>وهذا وَميضٌ، وهو الشيءُ الأوحدُ الذي وُجِدَ التفضيلُ ليَمنَعَه</b> — <b>فتُخطَّت الرِّقصةُ كلُّها: 1.7 و2.2 مِللي ثانية، و<code>scaleY</code> لا يُفارِقُ الواحدَ، والحَبلُ لا يُفارِقُ 14px</b>. <b>والنَّمَطُ يَتغيَّرُ كما كان، لأنَّ ذلك غرضُ الأداة</b>.
          <br /><br />
          <b>وأوّلَ مرةٍ كتبتُ أنَّ التفضيلَ يُكلِّفُ المُبدِّلَ 630 مِللي ثانية. وهو لا يُكلِّفُه.</b> <b>ذلك الرَّقمُ كان أرضيَّةَ مِسباري نفسِه، فقد عايَنَ عشرينَ إطارًا قبلَ أن يبدأَ يبحثُ عن تغيُّرِ الأيقونة؛ والمكوِّنُ لم يكُن بطيئًا قطُّ</b>. <b>وقياسُ الكُمونِ وحدَهُ — مُوقَّتًا داخلَ الصفحةِ بـ<code>MutationObserver</code>، بلا حَلقةِ مُعاينةٍ ولا رِحلةِ ذَهابٍ وإيابٍ أمامَه — يُعطي الخمسةَ والثلاثينَ أعلاه</b>. <b>فالعَيبُ وَميضٌ لا انتظار</b>، والدَّعوى الأولى مسحوبة.
          <br /><br />
          <b>واثنانِ مقروءانِ ولم يُصلَحا.</b> <b>الأوّلُ: المُبدِّلُ لا يُبدِّلُ شيئًا.</b> فهو مُقدَّمٌ كأداةِ نَمَطٍ داكنٍ وفاتح، <b>والنَّقرُ عليهِ يُغيِّرُ أيقونتَهُ ولا شيءَ سِواها: المَقيسُ قبلَ النَّقرةِ وبعدَها أنَّ <code>data-theme</code> بقيَ <code>light</code>، وقائمةَ الأصنافِ بقِيَت فارغةً، وأرضَ المكوِّنِ نفسِها بقِيَت <code>rgb(237,234,229)</code></b>. <b>وهذا ما تطلُبُهُ المواصفةُ حرفًا — خُطوتُها الرابعةُ «اقلِبْ toggleDark» ولا أكثر</b> — <b>ووَصلُ نموذَجٍ بنَمَطِ الصفحةِ يَدَعُ مَعروضًا واحدًا يُعيدُ صَبغَ المَعرِضِ كلِّه</b>. <b>و<code>aria-pressed</code> يَنقُلُ حالةَ الأداةِ نفسِها وهي صادقة؛ وأمّا أنَّ الحالةَ لا تُحرِّكُ شيئًا فقرارُ المالِك</b>.
          <br /><br />
          <b>والثاني: المَقاسُ المُستجيبُ لا يَحُلُّ إلا على أحدِ حدَّي القَصّ.</b> فـ<code>size = clamp(48, min(w, h) × 0.2, 80)</code> <b>يَقيسُ الجِذرَ، وارتفاعُ الجِذرِ هو ارتفاعُ مُحتواهُ متى لم يكُن <code>min-h-screen</code></b>. <b>والمَقيسُ في هذا المَعرِض: الجِذرُ 634×70، و<code>min(w,h) × 0.2 = 14</code>، فيُقَصُّ صُعودًا إلى 48</b>. <b>وقائمًا بذاتِهِ معَ <code>min-h-screen</code> يكونُ <code>min(w, viewport) × 0.2</code> فيُقَصُّ هُبوطًا إلى 80</b>. <b>فالصيغةُ مِفتاحٌ بينَ 48 و80 لا مُنحدَرٌ بينَهُما</b>. تُرِكَت كما وَصَفَتها المواصفة.
          <br /><br />
          <b>ولا أثرَ لبَقايا <code>{'{}'}</code> هذه المرّة، ولا قَفزةَ تركيبٍ كذلك.</b> <b>فقد توقَّعتُ أن يُرسَمَ الزِّرُّ عندَ <code>MAX_SIZE</code> ثَمانينَ قبلَ أن يُصحِّحَهُ <code>ResizeObserver</code> إلى 48، فعايَنتُ كلَّ إطارٍ من قبلِ تركيبِ القِسمِ لأمسِكَها</b> — <b>فقرأَ كلُّ إطارٍ 48</b>. <b>فسُحِبَ الظَّنُّ وتُرِكَ <code>useEffect</code> على حالِه</b>، وهذه ثالثةُ دَعوىً أُسقِطُها لأنَّ القياسَ لم يُسنِدْها.
        </SpecRow>

        <SpecRow name="فَمٌ ادَّعَت المواصفةُ أنّهُ يَنسابُ فقاسَ قِيمتَين، وحلقةُ تركيزٍ أسكَتَها سَطرٌ واحد" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-taga-specimen="" className="w-full min-w-0 py-8 [&>div]:min-h-0" dir="ltr">
              <TagaToggle />
            </div>
          </MotionConfig>
        }>
          <b>هذه أحسنُ الرَّفعاتِ تكوينًا حتى الآن</b>: تَصِلُ وفيها <code>type=&quot;button&quot;</code> و<code>role=&quot;switch&quot;</code> و<code>aria-checked</code> مَوضوعةً في مواضِعِها، <b>والمَقيسُ أنّ <code>Space</code> و<code>Enter</code> كِلَيهما يَعمَلُ: <code>aria-checked</code> من <code>false</code> إلى <code>true</code> والإبهامُ من <code>x=3</code> إلى <code>x=21</code> ثمّ عودًا</b>. فما يلي ليسَ إصلاحَ خَرابٍ بل تدقيقُ ما بقي.
          <br /><br />
          <b>و<code>outline: 'none'</code> سَطريٌّ على المِضمار، فالمُبدِّلُ تَبلُغُهُ لوحةُ المفاتيحِ ولا يُظهِرُ شيئًا حينَ تَبلُغُه.</b> والمَقيسُ: <b><code>Tab</code> يَحُلُّ عليه، والحلقةُ المحسوبةُ <code>0px</code> و<code>none</code></b>. <b>وهذا المشروعُ يُطوِّقُ التركيزَ من <code>src/styles.css:87</code>، لكنّ تلكَ قاعدةُ مُؤلِّفٍ غيرُ مُطبَّقةٍ في طبقةٍ، والنمطُ السَّطريُّ يَغلِبُها</b> — <b>وهذا هو الموضِعُ الأوحدُ في تَتالي هذا المستودعِ الذي يَقدِرُ فيهِ مكوِّنٌ أن يُسكِتَ النظامَ</b>. <b>فحُذِفَ السَّطرُ، وعادَت الحلقةُ: <code>3px solid</code> بإزاحةِ <code>3px</code></b>.
          <br /><br />
          <b>و<code>aria-label=&quot;Toggle&quot;</code> يُسمّي نوعَ الأداةِ لا الأداة.</b> فمعَ <code>role=&quot;switch&quot;</code> كان يُعلَنُ «Toggle، مُبدِّل، مُطفأ» — <b>وهذا لا يُخبِرُ المُستمِعَ بشيءٍ لم يَعرِفْه</b>. <b>والوَجهُ هو موضوعُ هذه الأداةِ كلُّه، فسُمِّيَت به</b>. <b>وكانَ الوَجهُ نفسُهُ عُقدةَ <code>image</code> بلا اسمٍ في الشجرة، فأُخفي</b>، لأنّ <code>aria-checked</code> يَحمِلُ الحالةَ التي يَرسُمُها أصلًا. <b>والمَقيسُ بعدَه: <code>switch</code> اسمُها Mood ولا عُقدةَ صورةٍ واحدة</b>.
          <br /><br />
          <b>واختبارُ الدُّكنةِ <code>classList.contains('dark')</code>.</b> والمَقيسُ بانتظارٍ بعدَ الكتابة: <b><code>light</code> و<code>dark</code> و<code>night</code> ثلاثتُها تُعطي الأرضَ الفاتحةَ <code>rgb(237,234,229)</code> والمِضمارَ الرماديَّ نفسَه</b>. <b>وإضافةُ صِنفِ <code>dark</code> غيَّرَت الاثنَين، وهكذا تَعمَلُ الرفعةُ خارجَ هذا المستودعِ، فبقيَ الاختبارُ الأصليُّ جانبَ الجديد</b>. <b>وبعدَ الوصل: <code>dark</code> و<code>night</code> كِلاهُما أرضٌ <code>rgb(17,15,12)</code> ومِضمارٌ <code>rgb(212,150,10)</code></b>.
          <br /><br />
          <b>ونابِضُ الإبهامِ يتجاهلُ تقليلَ الحركة</b>: هذه <code>animate()</code> المُستوردةُ الحُرّةُ لا المَنسوبةُ من <code>useAnimate</code>، <b>فلا يَراها <code>MotionConfig</code></b> — <b>والمَقيسُ ثلاثةَ عشرَ موضِعًا مُتمايزًا للإبهامِ بلا تفضيلٍ، وتسعةً معَه</b>. <b>فصارَ يَقفِزُ: المَقيسُ بعدَه قيمتانِ فقط، <code>[3, 21]</code>، مُقابلَ ثلاثةَ عشرَ بلا تفضيل</b>. <b>وتَلاشي العَينَينِ مَتروكٌ على حاله: <code>scale</code> فيهِ تحويلٌ و<code>MotionConfig</code> يُسقِطُهُ أصلًا، والباقي مُبادلةُ عَتامةٍ في 160 مِللي ثانيةٍ وهيَ نفسُها الحالةُ تَصيرُ مَرئيّة</b>.
          <br /><br />
          <b>والفَمُ لا يَنسابُ، ومُلاحظةُ المواصفةِ نفسِها تقولُ إنّهُ يَنساب.</b> فقولُها «لأنّ كِلَيهما يتشارَكُ بِنيةَ M+Q فإنّ Framer Motion يُبدِّلُ بينَهُما بسَلاسةٍ» <b>غيرُ صحيح</b>: <b>فـframer يُحرِّكُ <code>pathLength</code> و<code>pathOffset</code> و<code>pathSpacing</code>، ولا يُحرِّكُ سِمةَ <code>d</code> أبدًا</b>، <b>فـ<code>transition={'{'} duration: 0.28 {'}'}</code> على ذلك المَسارِ لا يَحكُمُ شيئًا</b>. <b>والمَقيسُ بمُعايَنةِ <code>d</code> في كلِّ إطارٍ من داخلِ الصفحة، معَ تثبيتِ القيمةِ الأولى قبلَ النَّقرةِ وإطلاقِ النَّقرةِ في الإطارِ الثالث: قيمتانِ في سبعينَ إطارًا</b> — <b>مُسطَّحٌ في الإطارِ صِفرٍ وباسِمٌ في الرابعِ ولا شيءَ بينَهُما</b> — <b>في حينِ أنّ <code>x</code> الإبهامِ في الصفحةِ نفسِها وعلى السبعينَ إطارًا نفسِها أخذَ إحدى عشرةَ قيمة</b>. <b>فالمِسبارُ لم يكُن هو المُشكِلة</b>.
          <br /><br />
          <b>ولأنّ المَسارَينِ يتشاركانِ بِنيةَ أوامِرِهما حقًّا، تكفي قيمةُ حركةٍ واحدةٌ لتُدرِّجَ الأرقامَ الثلاثةَ المُختلِفة، و<code>thumbX</code> يَكنُسُ المدى الصحيحَ سَلَفًا</b> — <b>فصارَت الاِبتسامةُ تَنمو معَ انسِيابِ الإبهام، وهذا ما كانَت المواصفةُ تَصِفُه</b>. <b>والمَقيسُ بعدَه: عشرُ قِيَمٍ مُتمايزةٍ بدلًا من قيمتَين</b> — <code>0.4300</code> ثمّ <code>0.2156</code> ثمّ <code>0.1500</code> للطَّرَفَين، ونُقطةُ التحكُّمِ <code>0.4300</code> ثمّ <code>0.4836</code> ثمّ <code>0.5000</code>.
          <br /><br />
          <b>وواحدٌ مقروءٌ ولم يُصلَح، لأنّ اللَّوحةَ لَوحةُ المُؤلِّف: حُدودُ الأداةِ نفسِها باهِتة.</b> والمَقيسُ للمِضمارِ في وَجهِ الأرضِ وللإبهامِ في وَجهِ المِضمار، في الحالتَينِ وفي الحُزمتَين: <b>فاتحةٌ مُطفأةٌ 2.38 و2.86، وفاتحةٌ مُشتعِلةٌ 1.36 و1.63، وداكنةٌ مُطفأةٌ 2.02 و9.47، وداكنةٌ مُشتعِلةٌ 7.44 و2.57</b>. <b>فخَمسٌ من هذه الثمانِ تحتَ الثلاثةِ التي يطلُبُها WCAG 1.4.11 لحَدِّ أداةِ واجهة، وأبهتُها الإبهامُ الأبيضُ على المِضمارِ الأصفرِ عندَ 1.63</b>. <b>ولا بوّابةَ في هذا المستودعِ تَقيسُ الأزواجَ غيرَ النصِّيّة</b> — <b>فـaxe يعودُ نظيفًا و<code>REFERENCE_GREY_CONTRAST</code> يَعُدُّ النَّصَّ — فهذا يُشحَنُ غيرَ مَقيسٍ بشيءٍ إلا هذه المُلاحظة</b>. <b>والحالةُ نفسُها لا تَلتبِسُ أبدًا: الإبهامُ يتحرَّكُ، والوَجهُ يَنتقِلُ من عَينَي × إلى ابتسامةٍ عندَ 10.23 في وَجهِ أرضِه. إنّما الحَوافُّ هي اللَّيِّنة.</b>
          <br /><br />
          <b>وظَنٌّ فُحِصَ وأُسقِط، وستُّ <code>{'{}'}</code> حُذِفَت.</b> <b>توقَّعتُ أنّ <code>useTransform(thumbX, [offX, onX], [offTrack, onTrack])</code> جَمَّدَ الألوانَ الفاتحةَ في أوّلِ رَسمٍ، لأنّ <code>pageIsDark</code> يبدأُ <code>false</code> والأثرُ يُصحِّحُهُ بعدَ ذلك</b>. <b>وإضافةُ صِنفِ <code>dark</code> نقلَت المِضمارَ من <code>rgb(158,152,144)</code> إلى <code>rgb(74,69,64)</code> — فهو يُعيدُ الاِشتِقاق</b>، ولا شيءَ يُصلَح. وهذه رابعةُ دَعوىً أُسقِطُها في هذه الدفعةِ لأنّ القياسَ لم يُسنِدْها، <b>والفَرقُ بينَ الظَّنِّ والعَيبِ قياسٌ واحدٌ لا أكثر</b>.
        </SpecRow>

        <SpecRow name="حَقلٌ لا يَرسُمُ شيئًا تحتَ غِلافِنا، ودَعوى لي هَدَمَها القياسُ مرّتَين" bare specimen={
          <div data-noisebg-specimen="" className="w-full min-w-0 py-8 [&>div]:min-h-[380px]" dir="ltr">
            <NoiseBg />
          </div>
        }>
          <b>هذا النموذَجُ لا يَرسُمُ شيئًا بالمَرّةِ تحتَ الغِلافِ الذي تستعمِلُهُ كلُّ رفعةٍ أخرى في هذا القِسم، ومُقدِّمةُ المواصفةِ نفسُها تتوقَّعُ ذلك</b>: «أو يَنهارُ الجِذرُ ويسحَبُ معَهُ طبقاتِهِ المُطلَقة». <b>فكِلا ابنَيهِ <code>absolute inset-0</code>، فلا مُحتوى في مَسارِ التخطيطِ للجِذرِ أصلًا</b>. <b>والمَقيسُ بـ<code>[&amp;&gt;div]:min-h-0</code> المُعتاد: ارتفاعُ الجِذرِ صِفر، وارتفاعُ اللوحِ صِفر، و<code>build()</code> يَخرُجُ عندَ <code>if (!cw || !ch) return</code>، واللوحُ باقٍ على مَقاسِ 300×150 الافتراضيِّ لم يُمَسّ، وصِفرُ بكسلٍ مُضاء</b>. <b>فأُعطيَ الغِلافُ <code>min-h-[380px]</code></b> — <b>والمكوِّنُ على صَوابٍ والغِلافُ كان على خطأ، وهذا عكسُ الاتِّجاهِ المُعتادِ هنا فحُقَّ أن يُقال</b>. والمَقيسُ بعدَه: اللوحُ 634×380، و5,942 بكسلًا مُضاءً في السكونِ و51,301 عندَ التحويم.
          <br /><br />
          <b>واختبارُ الدُّكنةِ <code>classList.contains('dark')</code></b>: المَقيسُ بانتظارٍ بعدَ الكتابةِ أنّ <code>light</code> و<code>dark</code> و<code>night</code> ثلاثتَها تُعطي الأرضَ الفاتحةَ <code>rgb(245,241,234)</code>. <b>وهنا مَوضِعانِ يُصلَحانِ لا واحد: <code>isDark</code> للرَّسمِ و<code>isDarkRef</code> لحَلقةِ الإطارات</b> — <b>وهذا حَدْسٌ حسَنٌ من الرفعةِ نفسِها، ويَسهُلُ إصلاحُ نِصفِه</b>. وبعدَ الوصل: <code>dark</code> و<code>night</code> كِلاهُما <code>rgb(17,15,12)</code>.
          <br /><br />
          <b>ولا واحدةَ من اللافِظتَينِ كانت مقروءة، والحُزمةُ الداكنةُ للرفعةِ نفسِها تقولُ ما يجبُ أن يكونَ الحدُّ.</b> المَقيسُ مُركَّبًا على كلِّ أرض:
          <br /><br />
          <code>&quot;Noise&quot;</code> — فاتحةٌ <code>rgba(28,25,22,0.45)</code> ‏<b>2.83</b>، داكنةٌ <code>rgba(255,255,255,0.45)</code> ‏<b>4.53</b>
          <br />
          <code>&quot;hover to illuminate&quot;</code> — فاتحةٌ <code>0.22</code> ‏<b>1.58</b>، داكنةٌ <code>0.18</code> ‏<b>1.69</b>
          <br /><br />
          <b>فاللافِظةُ الداكنةُ عندَ 4.53 هي المُؤلِّفُ يَختارُ المَقروئيّة؛ والفاتحةُ هي الشِّفافيّةُ نفسُها على أرضٍ أخرى فتَهوي إلى 2.83</b>. <b>فهذا حَدُّهُ هو مُطبَّقًا باطِّراد، لا ذَوقي مَفروضًا</b>. <b>وأمّا الإرشادُ فلا أُختَ ناجحةَ له، لكنّهُ عندَ 1.58 الجُملةُ الوحيدةُ التي تُخبِرُكَ أنّ الحَقلَ يُجيبُ المُأشِرَ ولا تُقرأُ بحال</b> — <b>وهو عَينُ عَيبِ حَبلِ الرفعةِ السابقةِ الذي قِيسَ 1.57</b>. <b>وأصغرُ شِفافيّةٍ تَعبُرُ 4.5 حُلَّت عَدَديًّا لا حَدسًا: 0.61 على الأرضِ الفاتحةِ و0.45 على الداكنة</b> — <b>واللافِظتانِ تستعمِلانِها الآن فتُعطيانِ 4.55 و4.53</b>.
          <br /><br />
          <b>وهذا يُسطِّحُ فَرقَ الشِّفافيّةِ بينَ اللافِظةِ والإرشاد.</b> <b>والتَّراتُبُ يَنجو في الإشارتَينِ التي تَحمِلانِهِ أحسنَ على أيِّ حال — 22px/700 في وَجهِ 11px/600 كبيرةً بتباعُدٍ واسِعٍ — والرَّجعةُ رَقمانِ إن كانَت البَهتةُ مطلوبةً</b>.
          <br /><br />
          <b>وأربعةٌ مُسجَّلةٌ ولم تُصلَح.</b> <b>الأوّلُ: مَخزَنُ الجِيرانِ تَربيعيٌّ ويُعادُ بناؤُهُ في كلِّ ردٍّ للتَّحجيم</b> — والمَقيسُ عندَ هذا المَقاس: <b>240,920 بكسلَ لَوحٍ، و2,008 نُقطةً، و2,015,028 مُقارنةَ مَسافةٍ تُنتِجُ 30,116 زوجًا، في 9.7 مِللي ثانية</b>. <b>ومَحدودٌ بـ<code>MAX_DOTS</code>، فأسوأُ حالٍ 3,000 نُقطةٍ و4.5 مليونِ مُقارنة، لكنّهُ يَجري مرةً لكلِّ إشعارِ <code>ResizeObserver</code> والسَّحبُ يُرسِلُ كثيرًا</b>. <b>والثاني: حَلقةُ الإطاراتِ لا تتوقَّفُ أبدًا</b> — لا بوّابةَ ظُهور، <b>فتَظَلُّ ترسُمُ 2,008 نُقطةٍ وحتى 30,116 قِطعةَ خَطٍّ والقِسمُ مُمرَّرٌ خارجَ الرؤية</b>. <b>واللِّسانُ المُخفيُّ يُخنِقُ rAF، وأمّا مُجرَّدُ الخُروجِ عن الشاشةِ فلا</b>. وهذا نفسُ ما سُجِّلَ لرفعةِ الكُرةِ وتُرِكَ كما تُرِك، فيَتَّفِقُ الاثنان.
          <br /><br />
          <b>والثالثُ: تقليلُ الحركةِ لا يحتاجُ شيئًا هنا، وهذه نتيجةٌ لا إغفال.</b> فكلُّ لَوحٍ آخرَ في هذه الدفعةِ كان لهُ انسِياقٌ ذاتيٌّ يُوقَف؛ <b>وهذا الحَقلُ لا يتحرَّكُ إلا جوابًا للمُأشِر، والقراءةُ المُقرَّرةُ في هذه الدفعةِ أنّ جوابَ المُأشِرِ يَبقى والانسِياقَ يَتوقَّف</b>. والتَّسهيلُ <code>d.b += 0.16 × (tgt − d.b)</code> مُنحدَرٌ لا حركةٌ في المكان.
          <br /><br />
          <b>والرابعُ هو الدَّعوى التي اضطُرِرتُ أن أتخلّى عنها، وهي أهمُّ ما في هذه الرفعة.</b> <b><code>PEAK_A = 0.14</code> <b>أدنى</b> من كِلتا الشِّفافيّتَينِ الأساسِ — 0.18 داكنةً و0.28 فاتحةً — <b>فـ<code>baseA + (PEAK_A − baseA) × d.b</code> يُنزِلُ حَدَّ الشِّفافيّةِ نُزولًا حينَ تُضاءُ النُّقطة</b>، على مكوِّنٍ لافِظتُهُ «hover to illuminate»</b>. <b>والحِسابُ لا يُشَكُّ فيه. أمّا ما أكَّدتُهُ عنه — أنّ النُّقَطَ تَخبو قُربَ المُأشِرِ — فباطِل</b>.
          <br /><br />
          <b>ومِسبارانِ قالا ذلك.</b> <b>مُعدَّلُ شِفافيّةٍ على قُرصٍ قُطرُهُ 120 بكسلًا قرأَ 0.357 بلا تحويمٍ في وَجهِ 20.18 معَه — وهذا يَقيسُ <b>تَغطيةَ</b> خُطوطِ الوَصلِ لا شِفافيّةَ أيِّ نُقطة</b>. <b>وذُروةُ شِفافيّةٍ قرأَت 45 في وَجهِ 179 — وهذا يَقيسُ 30,116 قِطعةَ خَطٍّ <b>تتراكَمُ</b> على البكسلاتِ نفسِها</b>. <b>فأزَلتُ مَصدَرَ اللَّبسِ بدلًا من مُجادلتِه — <code>NEIGHBOUR_D = 0</code> وإعادةُ بناءٍ، فلا خُطوطَ أصلًا — وقِستُ مُعدَّلَ أسطَعِ خَمسينَ بكسلًا في القُرصِ نفسِه</b>:
          <br /><br />
          داكنةً <b>23.8 ← 33.7</b> (+41٪) — فاتحةً <b>37.0 ← 38.7</b> (+4.6٪)
          <br /><br />
          <b>فالنُّقَطُ تَسطَعُ <b>أكثر</b>، لأنّ <code>sz</code> يَنمو من 0.8 إلى 1.4 في اللحظةِ نفسِها، ومُستطيلُ 1.4 بكسلٍ يُكثِّفُ شِفافيّتَهُ في بكسلاتٍ كامِلةٍ حيثُ يَنشُرُها مُستطيلُ 0.8 على أربعة</b>. <b>وأرقامُ السكونِ تُصادِقُ على النموذَج: <code>0.28 × 0.64</code> من تَغطيةٍ دُونَ البكسلِ تتوقَّعُ 46 والمَقيسُ 45، و<code>0.18 × 0.64</code> تتوقَّعُ 29 والمَقيسُ 29</b>. <b>فالأثرُ يَعمَل</b>.
          <br /><br />
          <b>وما هو صحيحٌ أصغرُ من ذلك بكثيرٍ ويَستحِقُّ الحِبرَ مع ذلك: في الحُزمةِ <b>الفاتحةِ</b> لا تُجيبُ النُّقَطُ إلا بالكادِ — +4.6٪ — وما تراهُ قُربَ المُأشِرِ خُطوطٌ في جُملَتِه.</b> <b>وتغييرُ الصيغةِ إلى <code>baseA + PEAK_A × d.b</code> يَجعَلُ الحُزمتَينِ تَسطَعانِ كما ينبغي</b> — <b>لكنّ لا تَناظُرًا مقدارُهُ +4.6٪ ليسَ أثرًا مَكسورًا، وإعادةُ صَبغِ حَقلِ المُؤلِّفِ على هذه البَيِّنةِ ذَوقي لا عَيبُه</b>. تُرِكَت كما وَردَت حرفًا. <b>وهذه خامسةُ دَعوىً أُسقِطُها في هذه الدفعة، والثانيةُ التي أسقطَها القياسُ <b>مرّتَين</b> قبلَ أن أتَّرُكَها</b>.
        </SpecRow>

        <SpecRow name="زُجاجٌ يَنهارُ إلى 1.49 حينَ تُحمَّلُ الصُّورة، وقائمةٌ لا يُغلِقُها مِفتاح" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-usermenu-specimen="" className="w-full min-w-0 py-8 [&>div]:min-h-[700px]" dir="ltr">
              <GlassUserMenu />
            </div>
          </MotionConfig>
        }>
          <b>أوّلُ ما يُقال: السِّجِلُّ شحَنَ شيئًا أحسنَ من المواصفةِ المكتوبة.</b> فالمواصفةُ تُضِعُ اللَّوحَ عندَ <code>left-full top-0 ml-2</code> فيَفتَحُ يَمينًا، <b>والملَفُّ المُنَزَّلُ يَفتَحُهُ أسفلَ ووسَطًا</b>. <b>والمُختارُ المَشحونُ هو الصحيح: لَوحٌ يَفتَحُ يَمينًا يُغادِرُ الشاشةَ على عَرضٍ ضيِّق، ويَفتَحُ في الجِهةِ الخطأِ تمامًا تحتَ <code>data-direction=&quot;rtl&quot;</code> وهذا المشروعُ مَبنيٌّ لها</b>. فتُرِكَ كما شُحِن، والخِلافُ بينَ النَّصِّ والكودِ سُجِّلَ ولم يُحَلَّ لصالحِ النَّثر.
          <br /><br />
          <b>والزُّجاجُ لم يكُن يفعلُ شيئًا للمَقروئيّة، وهذا هو العَيبُ الذي قيلَ لهذه الدفعةِ باسمِه.</b> فمِلءُ اللَّوحِ <code>rgba(255,255,255,0.08)</code> — <b>غِشاءٌ فاتِح</b> — فوقَ صُورةِ زَهرةٍ بُرتقاليّة. <b>والمَحسوبُ فوقَ ما تكونُ عليهِ تلكَ الصُّورةُ في أسطَعِ مواضِعِها، قريبًا من <code>[240,180,90]</code>: الغِشاءُ وحدَهُ يُخلِّفُ أرضًا <code>[241,186,103]</code>، ولافِظاتُ العُناصرِ عليها عندَ <code>rgba(255,255,255,0.70)</code> تَقيسُ <b>1.49</b>، وعندَ 0.80 لا تَبلُغُ إلا <b>1.58</b></b>. <b>أي أنّ نَصَّ اللَّوحِ لا يُقرأُ بالضَّبطِ حيثُ تكونُ الصُّورةُ أجملَ ما تكون</b>.
          <br /><br />
          <b>فحاجِزٌ داكنٌ وُضِعَ <b>تحتَ</b> غِشاءِ المُؤلِّف، على العُنصرِ الذي يَنحدِرُ منه النَّصُّ</b> — وهو بِناءُ رفعتَي البطاقةِ وشَريطِ التَّصفُّحِ نفسُهُ في هذه الدفعة — <b>فحَمَلَ اللافِظاتِ نفسَها عندَ 7.34 فوقَ تلكَ الرُّقعةِ السّاطِعةِ و9.59 فوقَ أرضِ الموقِعِ نفسِه. الأرضُ تَبقى زاهيةً، والمادّةُ هي التي تَحمِلُ النَّصّ.</b> والمِقبَضُ نالَ العِلاجَ نفسَهُ للعِلّةِ نفسِها.
          <br /><br />
          <b>والاختبارُ الذي أتاحَهُ غِيابُ الصُّورة:</b> صَبَغتُ الجِذرَ بأسطَعِ رُقعةٍ في الزَّهرةِ وأعَدتُ القياسَ على النَّصِّ نفسِه. <b>والأرضُ المُحاجَزةُ صارَت <code>[59,46,31]</code> بدلًا من <code>[241,186,103]</code></b> — <b>فالحاجِزُ يَعمَلُ، مُثبَتًا لا مُدَّعىً</b>.
          <br /><br />
          <b>والمِقبَضُ لم يكُن يُعلِنُ شيئًا:</b> المَقيسُ <code>aria-expanded</code> و<code>aria-haspopup</code> و<code>aria-controls</code> ثلاثتُها <code>null</code>، و<code>type</code> كذلك <b>فداخلَ استمارةٍ يُرسِلُها</b>. فوُضِعَت الأربعُ، و<code>id</code> على اللَّوحِ ليُشارَ إليه. <b>وصورةُ الوَجهِ كانت <code>alt={'{'}USER.name{'}'}</code> فيُقالُ الاسمُ مرّتَين — فصارَت <code>alt=&quot;&quot;</code></b>، والاسمُ نَصُّ الزِّرِّ أصلًا.
          <br /><br />
          <b>ولم تكُن ثَمّةَ وَسيلةٌ لإغلاقِها من لوحةِ مفاتيح.</b> المَقيسُ: <b><code>Escape</code> لا يُغيِّرُ شيئًا، والتنقُّلُ من آخِرِ عُنصرٍ يَخرُجُ من القائمةِ المفتوحةِ مُباشرةً إلى رَوابِطِ تَذييلِ الصفحةِ</b> — «Profile وSettings وTeam وBilling وLog Out ثمّ رابطانِ عربيّان» — <b>واللَّوحُ ما زالَ مفتوحًا خَلفَها</b>. <b>فصارَ <code>Escape</code> يُغلِقُها ويُعيدُ التركيزَ إلى المِقبَض، وخُروجُ التركيزِ من الحاوِيةِ يُغلِقُها كذلك</b>. والمَقيسُ بعدَه: <code>aria-expanded</code> يَصيرُ <code>false</code> بعدَ 150 مِللي ثانيةٍ من <code>Escape</code> والتركيزُ على المِقبَض، و<code>Enter</code> يُعيدُ الفَتح، والتنقُّلُ في العَناصِرِ الخَمسةِ يُبقيها مفتوحةً، <b>والنَّقلةُ التي تُغادِرُ الحاوِيةَ تُغلِقُها</b>.
          <br /><br />
          <b>ولم أُضِفْ <code>role=&quot;menu&quot;</code> عن قَصد.</b> فذلكَ الدَّورُ وَعدٌ بتنقُّلٍ بمفاتيحِ الأسهُمِ ومَحطةِ جَدولٍ واحدة، والوفاءُ به حقًّا كودٌ أكثرُ بكثيرٍ مما تحتاجُهُ هذه. <b>وجُملةٌ من أزرارٍ عاديّةٍ داخلَ مُنسدِلٍ مَبلوغةٌ ومُعلَنةٌ وصالِحةٌ للعملِ أصلًا</b> — والمَقيسُ أنّ الخَمسةَ كلَّها في جَدولِ التنقُّلِ بترتيبِ القراءة. <b>فالثُّغرةُ لم تكُن الدَّورَ يومًا، بل الإغلاق.</b>
          <br /><br />
          <b>ونَصّانِ لم يكونا يُقرآن.</b> المَقيسُ على أرضِ الموقِع: <b>عَناوينُ المَجموعاتِ عندَ <code>rgba(255,255,255,0.25)</code> أعطَت <b>2.25</b>، و«Log Out» عندَ <code>rgba(255,90,90,0.70)</code> أعطَت <b>2.92</b></b>. <b>وللعَناوينِ حُلَّت أصغرُ شِفافيّةٍ تَبلُغُ 4.5 عَدَديًّا فوقَ الأرضَينِ كِلتَيهما: 0.47 على أرضِ الموقِعِ و<b>0.56</b> فوقَ الرُّقعةِ السّاطِعة — فاستُعمِلَت 0.56 لتَصمُدَ في الحالَين</b>. والمَقيسُ بعدَه: <b>6.44 و5.29</b>.
          <br /><br />
          <b>وأمّا «Log Out» فسَقفٌ لا إصلاح.</b> <b><code>rgba(255,90,90,a)</code> لا تَبلُغُ 4.5 فوقَ اللَّوحِ المُحاجَزِ عندَ <b>أيِّ</b> شِفافيّة</b> — حُلَّت على المدى كلِّهِ فعادَت بلا شيء — <b>لأنّ <code>#FF5A5A</code> ليسَ بعيدًا كِفايةً عن رَماديٍّ مُتوسِّط</b>. <b>فأُخِذَ إلى أقصى ما يُتيحُهُ لونُ المُؤلِّفِ نفسُه، شِفافيّةَ 1.0، وطُبِعَ موضِعُ توقُّفِه بدلًا من تَجميلِه: 6.25 على أرضِ الموقِعِ و<b>4.31</b> فوقَ الرُّقعةِ السّاطِعة</b>. <b>وتحويلُهُ يعني تغييرَ أحمرِهم، وذلك قرارُ المالِك</b>. وشارَتُهُ أمرٌ آخرُ وتَعبُرُ الـ3:1 التي يحتاجُها غيرُ النَّصّ.
          <br /><br />
          <b>وتقليلُ الحركة:</b> اللَّوحُ يُحرِّكُ <code>filter: blur(4px)</code>، <b>و<code>MotionConfig</code> يُعطِّلُ التحويلاتِ لا المُرشِّحات</b> — والمَقيسُ <b>خمسةَ عشرَ حالًا مُتمايزًا من مُرشِّحٍ وعَتامةٍ تحتَ <code>reduce</code> في وَجهِ اثنَي عشرَ بدونِه</b>، وهي الحركةُ نفسُها. <b>وتَدرُّجُ العَناصِرِ عَتامةٌ أيضًا فلا يُمَسّ</b>. فصارَ اللَّوحُ يَظهَرُ بلا ضَبابٍ والعَناصِرُ تَصِلُ مَعًا: <b>ثمانيةُ أحوالٍ كلُّها <code>filter: none</code></b> في وَجهِ ثلاثةَ عشرَ فيها ضَباب. <b>و<code>x: '-50%'</code> باقٍ في كلِّ صِيغةٍ لأنّهُ <b>مَوضِعُ</b> اللَّوحِ لا حركتُه، وإسقاطُهُ يَدفَعُهُ نِصفَ عَرضِهِ جانِبًا</b>.
          <br /><br />
          <b>وثمانِ <code>{'{}'}</code> حُذِفَت</b> — <b>عَددتُها عَشرًا أوّلًا لأنّ <code>grep -c</code> يَعُدُّ الأسطُرَ لا المُطابَقات، ومُعالِجَي النَّقرِ الخامِلَينِ <code>onClick={'{'}() =&gt; {'{}'}{'}'}</code> يَحمِلانِ النَّمَطَ كذلك</b>. <b>والعَناصِرُ الخَمسةُ خامِلةٌ ومُسجَّلةٌ كذلك، كثلاثِ رَفَعاتٍ سابقةٍ في هذه الدفعةِ وللسببِ نفسِه</b>.
          <br /><br />
          <b>وملاحظةٌ على القياسِ، لأنّهُ كلَّفَ جَدولَي تباينٍ خاطئَينِ قبلَ صحيحٍ واحد.</b> <b>Tailwind الرابعُ يُصدِرُ <code>text-white/80</code> على هيئةِ <code>oklab(0.999994 … / 0.8)</code>، ومُعينِي قرأَ تلكَ المُكوِّناتِ من صِفرٍ إلى واحدٍ بايتاتٍ من صِفرٍ إلى 255</b> — <b>وهو نفسُ الخطأِ الذي جعلَ ألوانَ <code>lab()</code> تُقرأُ شبهَ سوداءَ ثلاثَ مرّاتٍ في هذه الدفعة، في ثَوبٍ جديد</b>. <b>فأبلغَ عن اسمِ المِقبَضِ 1.43 وهو 9.51</b>.
          <br /><br />
          <b>فأعَدتُ كِتابةَ المُعينِ ليَصبُغَ كلَّ لونٍ ويقرأَ البكسلَ رَجعًا — وهذا لا يُبالي بأيِّ صِياغةٍ وَصَلَ اللونُ — <b>فأخطأتُ مرّةً أُخرى</b>، إذ قَسَمتُ على الشِّفافيّةِ ظَنًّا أنّ <code>ImageData</code> مَضروبٌ سَلَفًا. وهو ليسَ كذلك بالمواصفة</b>. <b>والذي أمسَكَها في تمريرةٍ واحدةٍ فحصٌ ذاتيٌّ على ستةِ ألوانٍ أجوِبَتُها معلومةٌ استِقلالًا: <code>rgba(255,255,255,0.5)</code> عادَت 508</b>. <b>وذلك الفحصُ الذاتيُّ يَجري الآنَ قبلَ كلِّ جَدولٍ في هذا المِرقَب، وهو السببُ الأوحدُ في أنّ هذا الجَدولَ يُوثَقُ به</b>.
          <br /><br />
          <b>وسابِعةً: قراءتي الأولى قالَت إنّ مُعالِجَ <code>Escape</code> الجديدَ لا يفعلُ شيئًا</b>، لأنّي عَددتُ الأزرارَ بعدَ 500 مِللي ثانيةٍ من المِفتاحِ <b>و<code>AnimatePresence</code> ما زالَ يُبقي اللَّوحَ مُركَّبًا لِخُروجِه</b>. <b>و<code>aria-expanded</code> يَسكُنُ المِقبَضَ الذي لا يُفَكُّ أبدًا، وكان قد انقلبَ فِعلًا</b>. <b>وهذه سابعةُ دَعوىً في هذه الدفعةِ صَنَعَتها مُعايَنتي أنا لا الكود.</b>
        </SpecRow>

        <SpecRow name="ثمانِ حَلقاتِ تركيزٍ أسكَتَها سَطران، ولافِظاتٌ تَهوي إلى 1.48" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-sidebar-specimen="" className="w-full min-w-0 py-8 [&>div]:min-h-[480px]" dir="ltr">
              <GlassSidebar />
            </div>
          </MotionConfig>
        }>
          <b>أسماءُ هذه الرفعةِ صحيحةٌ سَلَفًا</b> — كلُّ زِرِّ تَصفُّحٍ يحمِلُ <code>aria-label={'{'}item.label{'}'}</code> ولافِظةُ المِفتاحِ تتغيَّرُ بحالتِه — <b>فما يلي كلُّ ما عَدا ذلك</b>.
          <br /><br />
          <b>و<code>outline: 'none'</code> سَطريٌّ على الزِّرَّينِ، فيُسكِتُ حَلقةَ التركيزِ على الأدواتِ <b>الثمانِ</b>.</b> والمَقيسُ بالتركيزِ فِعلًا على أوّلِ عُنصرِ تَصفُّح: <b>الحلقةُ المحسوبةُ <code>0px</code> و<code>none</code></b>. <b>وهذه ثانيةُ رفعةٍ على التَّوالي تَمُدُّ يدَها عبرَ التَّتالي فتُطفِئُ النظام</b>، لأنّ قاعدةَ <code>src/styles.css:87</code> غيرُ مُطبَّقةٍ في طبقةٍ والنمطُ السَّطريُّ يَغلِبُها. <b>فحُذِفَ من الاثنَين — والمَقيسُ بعدَه: <code>3px solid</code> بإزاحةِ <code>3px</code></b>.
          <br /><br />
          <b>والزُّجاجُ لم يَحمِلْ شيئًا، كالرفعةِ التي قبلَه.</b> <b>والمَقيسُ بإجبارِ الجِذرِ على أسطَعِ رُقعةٍ في الزَّهرةِ الوَرديّة: الأرضُ <code>[241,184,203]</code>، ولافِظاتُ التَّصفُّحِ الساكِنةُ عليها عندَ <code>rgba(255,255,255,0.75)</code> تَقيسُ <b>1.48</b></b>. <b>وحاجِزٌ داكنٌ تحتَ غِشاءِ المُؤلِّفِ يَنقُلُ اللافِظاتِ نفسَها إلى <b>8.00</b> والتلميحَ إلى <b>15.02</b></b>، والأرضُ تَبقى زاهية. <b>واللَّوحُ والتلميحُ كِلاهُما يستعمِلُ <code>GLASS_STYLE</code> فتَكفيهِما نُقلةٌ واحدة</b>.
          <br /><br />
          <b>ولافِظةُ العُنصرِ النَّشِطِ كانت تُرسَمُ بلونِ العُنصرِ نفسِه، وأربعةٌ من الألوانِ السَّبعةِ لا تُقرأ.</b> والمَحلولُ فوقَ اللَّوحِ المُحاجَزِ عندَ أسطَعِ الزَّهرة: <b><code>#3A86FF</code> لا يَبلُغُ إلا 3.10 عندَ العَتامةِ التامّة، و<code>#FF5C8A</code> 3.68، و<code>#B388FF</code> 4.05، و<code>#FF7B54</code> 4.22 — ولا واحدٌ منها يَبلُغُ 4.5 عندَ <b>أيِّ</b> شِفافيّة</b>، و<code>#3A86FF</code> قِيسَ 2.07 كما شُحِن. والثلاثةُ الباقيةُ تَقدِر (<code>#06D6A0</code> عندَ 0.85، و<code>#FFBE0B</code> عندَ 0.76، و<code>#C9A96E</code> عندَ 0.95).
          <br /><br />
          <b>فبدلًا من أربعِ لافِظاتٍ لا تُقرأُ أو تَفاوُتٍ من عُنصرٍ لعُنصر، ذَهَبَت لافِظةُ النَّشِطِ إلى <code>rgba(255,255,255,0.95)</code>، واللونُ بقيَ يفعلُ ما يُحسِنُهُ أصلًا: صَبغَ بَلاطةِ الأيقونة، وهي غيرُ نَصٍّ فلا تُدينُ إلا بـ3:1 لا 4.5</b>. <b>فالألوانُ على البَلاطاتِ والحَشواتِ لا على الحُروف، وهذا هو الاستِنتاجُ كلُّه</b>. والمَقيسُ بعدَه: النَّشِطُ <b>11.82</b> والساكِنُ <b>8.00</b> فوقَ الرُّقعةِ السّاطِعة.
          <br /><br />
          <b>وأيُّ عُنصرٍ نَشِطٌ كان مَرئيًّا وغيرَ مَقولٍ:</b> فوُضِعَ <code>aria-current</code> على الصَّفِّ النَّشِط، <b>و<code>aria-expanded</code> على المِفتاحِ كذلك، لأنّ لافِظةً يتغيَّرُ نَصُّها ليسَت كحالةٍ يستطيعُ قارئُ الشاشةِ أن يَسألَ عنها</b>. والمَقيسُ: <code>false</code> ثمّ <code>true</code> بعدَ النَّقر.
          <br /><br />
          <b>وتلميحُ السِّكّةِ المَطويّةِ هو المَوضِعُ الوحيدُ الذي يُقرأُ فيهِ مَعنى الأيقونةِ لِمَن يَرى، وكان يَظهَرُ بالتحويمِ وحدَه.</b> والمَقيسُ: بالتركيزِ على أوّلِ عُنصرٍ والسِّكّةُ مَطويّةٌ، <b>لا تلميحَ في الشَّجَرةِ أصلًا</b>. <b>فصارَ يَظهَرُ بالتركيزِ كذلك — والمَقيسُ بعدَه: «Home»</b>. <b>وقارئُ الشاشةِ لم يكُن مَحصورًا هنا يومًا، فالـ<code>aria-label</code> كان صحيحًا دائمًا. هذا لِمَن يَرى الشاشةَ ولا يستعمِلُ فأرة.</b>
          <br /><br />
          <b>والعَرضُ <code>useSpring</code>، و<code>MotionConfig</code> لا يَبلُغُه</b> — <b>والمَقيسُ أربعةَ عشرَ عَرضًا مُتمايزًا تحتَ <code>reduce</code> في وَجهِ أحدَ عشرَ بدونِه، وهي الحركةُ نفسُها</b>. <b>فصارَ يَقفِزُ تحتَ التفضيل: قيمتانِ <code>[64, 220]</code> في وَجهِ عَشرٍ بلا تفضيل</b>. <b>واثنتا عشرةَ <code>{'{}'}</code> حُذِفَت، و<code>type=&quot;button&quot;</code> كان غائبًا عن الاثنَين.</b>
        </SpecRow>

        <SpecRow name="أربعةُ أشرِطةٍ بلا دَورِ تَقدُّم، وأربعةُ ألوانٍ لا تَصلُحُ نَصًّا" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-progress-specimen="" className="w-full min-w-0 py-8 [&>div]:min-h-[400px]" dir="ltr">
              <GlassProgress />
            </div>
          </MotionConfig>
        }>
          <b>هذا أحسنُ ملَفٍّ في الدَّفعةِ كلِّها في الأشياءِ التي تَفسُدُ عادةً</b>: <b><code>useReducedMotion()</code> مَوصولٌ سَلَفًا بانتقالِ العَرضِ وبالنَّبضِ كِلَيهما</b>، وزِرُّ الإعادةِ يحمِلُ <code>aria-label=&quot;Replay animation&quot;</code>، <b>ولا <code>outline: none</code> سَطريّ</b>، وكلُّ مُؤقِّتٍ يُلغى في التَّنظيف. فأربعةُ تفاوُتاتٍ لا أكثر.
          <br /><br />
          <b>أربعةُ أشرِطةِ تَقدُّمٍ ولا دَلالةَ تَقدُّمٍ واحدة.</b> المَقيسُ: <b>عَددُ <code>[role=&quot;progressbar&quot;]</code> صِفر</b>. <b>فقارئُ الشاشةِ يَلقى «STORAGE» و«72٪» سِلسِلَتَينِ لا رابِطَ بينَهُما تَجلِسانِ مُتجاوِرتَين، ولا شيءَ يقولُ إنّ الثانيةَ قيمةُ الأولى، ولا شيءَ يُقرأُ أصلًا والرَّقمُ لا يزالُ يَعُدُّ صاعدًا من صِفر</b>. <b>فكلُّ مِضمارٍ صارَ <code>progressbar</code> بـ<code>aria-label</code> و<code>aria-valuenow</code> و<code>valuemin</code> و<code>valuemax</code>، وصَفُّ اللافِظةِ المَرئيُّ أُخفيَ عن الشَّجَرةِ فيُعلَنُ الزَّوجُ مرّةً لا مرّتَين</b>. والمَقيسُ بعدَه: أربعةٌ، بأسمائِها وقِيَمِها.
          <br /><br />
          <b>والزُّجاجُ لم يَحمِلْ شيئًا، ثالثةً في ثلاثِ رَفَعات.</b> <code>rgba(255,255,255,0.06)</code> فوقَ زَهرةٍ بُرتقاليّة: <b>بإجبارِ الجِذرِ على أسطَعِ رُقعةٍ فيها تَصيرُ الأرضُ <code>[241,184,203]</code>، فتَقيسُ لافِظاتُ الأشرِطةِ <b>1.24</b> والنِّسَبُ <b>من 1.02 إلى 1.53</b></b>. <b>وحاجِزٌ داكنٌ تحتَ الغِشاءِ يَنقُلُ الأرضَ إلى <code>[59,46,53]</code></b>.
          <br /><br />
          <b>وكِلا النَّصَّينِ كان لا يزالُ يَسقُطُ معَ الحاجِزِ قائمًا، فحُلَّ كِلاهُما عَدَديًّا.</b> <b>اللافِظاتُ عندَ <code>rgba(255,255,255,0.40)</code> أعطَت 3.78 على أرضِ الموقِعِ و3.16 فوقَ الرُّقعةِ السّاطِعة؛ وأصغرُ شِفافيّةٍ تَبلُغُ 4.5 هي 0.46 و0.55 — فاستُعمِلَت <b>0.55</b></b>. والمَقيسُ بعدَه: <b>6.22 و5.08</b>.
          <br /><br />
          <b>والنِّسَبُ كانت <code>${'{'}color{'}'}88</code> — لونُ الشَّريطِ نفسُهُ عندَ شِفافيّةِ 0.53</b> — <b>فقاسَت 2.15 و2.37 و3.23 و3.57 على أرضِ الموقِعِ، ومن 1.02 إلى 1.53 فوقَ الزَّهرة</b>. <b>واثنانِ من الأربعةِ لا يُقرآنِ نَصًّا <b>بحال</b>: المَحلولُ فوقَ اللَّوحِ المُحاجَزِ عندَ أسطَعِ الزَّهرة، <code>#3A86FF</code> لا يَبلُغُ إلا 3.10 عندَ العَتامةِ التامّةِ و<code>#FF5C8A</code> 3.68، ولا شِفافيّةَ تَبلُغُ 4.5</b>. و<code>#06D6A0</code> يحتاجُ 0.85 و<code>#FFBE0B</code> يحتاجُ 0.76.
          <br /><br />
          <b>والقِراءةُ بَيانٌ لا زِينة</b> — <b>فبدلًا من رَقمَينِ لا يُقرآنِ أو تَفاوُتٍ من شَريطٍ لشَريط، ذَهَبَت النِّسَبُ إلى <code>rgba(255,255,255,0.75)</code></b>. <b>والتَّرميزُ اللَّونيُّ لم يُفقَد: هو في الحَشوةِ التي يَجلِسُ كلُّ رَقمٍ فوقَها، وهي غيرُ نَصٍّ فتُدينُ بـ3:1 لا 4.5</b>. <b>ألوانٌ على الحَشواتِ لا على الحُروف — وهو نفسُ الاستِنتاجِ الذي بَلَغَتهُ السِّكّةُ من الحِسابِ نفسِه</b>. والمَقيسُ بعدَه: <b>10.83 على أرضِ الموقِعِ و8.00 فوقَ الرُّقعةِ السّاطِعة</b>.
          <br /><br />
          <b>وعَشرُ <code>{'{}'}</code> حُذِفَت، و<code>type=&quot;button&quot;</code> كان غائبًا.</b>
        </SpecRow>

        <SpecRow name="رِزمةٌ لا تُقلَبُ إلا بفأرة، ورابِعُ إرشادٍ لا يُقرأ" bare specimen={
          <MotionConfig reducedMotion="user">
            <div data-deck-specimen="" className="w-full min-w-0 py-8 [&>div]:min-h-[360px]" dir="ltr">
              <TravelDeck />
            </div>
          </MotionConfig>
        }>
          <b>هذه أوّلُ رفعةٍ تَصِلُ بلا مواصفةٍ مكتوبةٍ بالمَرّة</b> — سَطرُ التنزيلِ وحدَه. <b>فحُكِمَ عليها بمُقاييسِها هي وبقواعِدِ هذا المشروع، ولا مَرجِعَ يُرجَعُ إليهِ عندَ خِلاف</b>.
          <br /><br />
          <b>والرِّزمةُ لا تُدارُ بغيرِ فأرة.</b> والمَقيسُ: <b>صِفرُ أزرار، وصِفرُ عَناصرَ تَقبَلُ التركيز، و<code>cursor</code> يقرأُ <code>default, default, grab</code> على البِطاقاتِ الثلاث</b>، <b>و<code>Tab</code> و<code>Space</code> و<code>ArrowDown</code> و<code>Enter</code> تترُكُ ترتيبَ الطَّبَقاتِ كما كان حرفًا</b>. <b>فالطريقُ الوحيدُ إلى الوِجهةِ الثانيةِ كان سَحبَ البِطاقةِ العُليا عن الكَومة</b>.
          <br /><br />
          <b>فصارَت البِطاقةُ الأماميّةُ أداةً بدَورِ زِرٍّ و<code>tabIndex={'{'}0{'}'}</code> واسمٍ يقولُ أيَّ وِجهةٍ هي، و<code>Enter</code> أو <code>Space</code> يفعلانِ ما يفعلُهُ السَّحب</b>. والمَقيسُ بعدَه: <b><code>Tab</code> يَحُلُّ على البِطاقةِ الأماميّةِ وحَلقةُ التركيزِ <code>3px solid</code>، و<code>Enter</code> يَنقُلُ الرِّزمةَ من <code>Bali</code> إلى <code>Swiss Alps</code>، و<code>Space</code> منها إلى <code>Maafushi</code></b>. <b>والسَّحبُ لم يُمَسّ، والمَسارانِ يَمُرّانِ بدالّةٍ واحدةٍ فلا يَقدِرانِ أن يَختلِفا على مَعنى «التالي»</b>. <b>والبِطاقتانِ الخَلفيّتانِ أُخفِيَتا عن الشَّجَرة</b>، لأنّ إعلانَ ثلاثِ وِجهاتٍ وواحدةٌ فقط قابِلةٌ للعملِ ضَجيج، وكلُّ واحدةٍ تُقرأُ حينَ تَصِلُ إلى المُقدِّمة.
          <br /><br />
          <b>ونَصّانِ لم يكونا يُقرآن، وكِلاهُما حُلَّ عَدَديًّا لا حَدسًا.</b> <b>سَطرُ البَلَدِ عندَ <code>rgba(255,255,255,0.45)</code> قاسَ <b>4.21</b> على أرضِ البِطاقةِ <code>[42,40,37]</code></b> — تحتَ الحَدِّ بقليل — <b>و0.48 أصغرُ شِفافيّةٍ تَعبُرُ 4.5، فتُعطي 4.54</b>. <b>والإرشادُ «swipe down to shuffle» قاسَ <b>1.83</b> على الأرضِ الفاتحةِ و<b>2.21</b> على الداكنة؛ ويحتاجُ 0.55 و0.45، فيُعطي 4.61 و4.54</b>.
          <br /><br />
          <b>وهذا رابِعُ إرشادِ تشغيلٍ في هذه الدفعةِ يكونُ غيرَ مقروء</b> — بعدَ 1.57 في تقويمِ القَلب، و1.58 في حَقلِ التشويش، و2.25 في قائمةِ المُستخدِم — <b>وهو أكثرُ عَيبٍ تَكرارًا في سَبعٍ وعشرينَ رفعة</b>. <b>والنَّمَطُ واحدٌ في كلِّ مرّة: النَّصُّ الذي يُخبِرُ بكيفيّةِ الاستعمالِ يُصمَّمُ باهِتًا لأنّهُ ثانَويٌّ في الشكل، وهو أوَّليٌّ في الوَظيفة.</b>
          <br /><br />
          <b>وعَدَدُ الفَنادِقِ يَتصاعَدُ من صِفر، وهو <b>رَقمٌ</b> لا زِينة.</b> <b>و<code>useCountUp</code> يُحرِّكُهُ بـ<code>setInterval</code>، ولا بَطّانيّةَ CSS ولا <code>MotionConfig</code> تَبلُغُه</b> — <b>والمَقيسُ على البِطاقةِ <b>الأماميّةِ</b> ومن قبلِ تركيبِ القِسم: ثمانيةٌ وثلاثونَ وتِسعةٌ وثلاثونَ قيمةً مُتمايزةً تَكنُسُ من صِفرٍ إلى 250 تحتَ <code>reduce</code>، في وَجهِ إحدى وعشرينَ وثلاثٍ وعشرينَ بدونِه</b> — وهي الحركةُ نفسُها مُعايَنةً على نافِذةٍ أُخرى. <b>فصارَ العَدُّ يَصِلُ كامِلًا تحتَ التفضيل: قيمتانِ <code>["0","250"]</code> في وَجهِ سَبعٍ وعشرينَ بلا تفضيل</b>. <b>وهو نفسُ الفَصلِ الذي بَلَغتُهُ في رفعةِ السّاعة: الوَقتُ جَوهريٌّ والتِّكّةُ ليسَت</b>.
          <br /><br />
          <b>واختبارُ الدُّكنةِ <code>classList.contains('dark')</code> — سابِعُ رفعةٍ على التَّوالي.</b> المَقيسُ أنّ <code>light</code> و<code>dark</code> و<code>night</code> ثلاثتَها أعطَت الأرضَ الفاتحةَ <code>rgb(245,241,234)</code>، وبعدَ الوصل: <code>rgb(17,15,12)</code>.
          <br /><br />
          <b>وتِسعُ <code>{'{}'}</code> حُذِفَت، والدالّةُ المُصدَّرةُ كانت تُسمّى <code>FloatingCards</code> في ملَفٍّ اسمُهُ <code>traveldeck.tsx</code></b> — فسُمِّيَت بما يُطابِق.
          <br /><br />
          <b>وواحدٌ مُسجَّلٌ ولم يُصلَح: الدائرةُ الليموناويّةُ وفيها سَهمٌ تُشبِهُ زِرًّا تمامًا وهي <code>div</code> بلا مُعالِج.</b> خامِلةٌ كالشاراتِ والدَّعواتِ في أربعِ رَفَعاتٍ سابقة، وتُرِكَت مِثلَها. وتَباينُها هو سليمٌ: <code>#1A1A19</code> على <code>#BECF5D</code> يَقيسُ 10.18.
          <br /><br />
          <b>وملاحظةٌ على قياسِ العَدّاد، لأنّ مُحاولتي الأولى قرأَت قيمةً صحيحةً وبلا مَعنى.</b> <b>عايَنتُ أوّلَ <code>span</code> يُطابِقُ سِلسِلةَ أرقامٍ فحَصَلتُ على <code>0</code> في كلِّ إطارٍ من التمريرَتَين، وكِدتُ أكتُبُ أنّ التَّصاعُدَ لا يَحدُثُ أصلًا</b>. <b>وهو يَحدُث: ذلكَ الـ<code>span</code> يخُصُّ بِطاقةً في <b>مُؤخِّرِ</b> الكَومة، حيثُ <code>active={'{'}isFront &amp;&amp; !isExiting{'}'}</code> يُبقيها على صِفرٍ بحقّ</b>. <b>والبِطاقةُ الأماميّةُ كانت قد أتَمَّت عَدَّها قبلَ أوّلِ قراءةٍ لي بزَمَنٍ طَويلٍ، بعدَ 1.6 ثانيةٍ من التمرير</b>. <b>وقراءةُ البِطاقةِ الأعلى <code>zIndex</code> معَ تنصيبِ المُعايِنِ قبلَ تركيبِ القِسمِ تُعطي الأرقامَ أعلاه</b>. <b>وهذه ثامِنةُ دَعوىً في هذه الدفعةِ صَنَعَتها مُعايَنتي لا الكود</b>.
        </SpecRow>

        <SpecRow name="أوّلُ مكوِّنٍ في الدَّفعةِ يَعرِفُ الاتّجاه — ومِحوَرُهُ منطقيٌّ لا يَسار" bare specimen={
          <div data-stepper-specimen="" className="flex w-full min-w-0 flex-col gap-8 py-6">
            <div data-stepper-rtl="" dir="rtl">
              <DirectionStepper
                label="مراحلُ الرفعة"
                steps={['التنزيل', 'القياس', 'الإصلاح', 'البوّابات', 'الإيداع']}
                hint="الأسهُمُ تتبعُ اتّجاهَ القراءة: اليسارُ يتقدَّم"
              />
            </div>
            <div data-stepper-ltr="" dir="ltr">
              <DirectionStepper
                label="Upload stages"
                steps={['Install', 'Measure', 'Fix', 'Gates', 'Commit']}
                hint="Arrows follow reading order: Right advances"
              />
            </div>
          </div>
        }>
          <b>هذا ليسَ رفعةً. هذا أوّلُ شيءٍ صَنَعناهُ من الدَّفعةِ نفسِها.</b>
          <br /><br />
          <b>والسببُ مَقيسٌ لا مَذوق:</b> ثمانٍ وعشرونَ رفعةً نُفِّذَت وقِيسَت وسُجِّلَت، <b>ولا واحدةٌ منها تَصمُدُ في الاتّجاهِ الذي يَرسُمُ بهِ هذا المشروع</b>. <b>و<code>Imported3.tsx</code> يحمِلُ <b>تسعةً وثلاثينَ</b> غِلافَ <code>dir=&quot;ltr&quot;</code>، واحدًا لكلِّ نموذَج، كتبتُها كلَّها بيدي لأمنعَ كلَّ مَشحونٍ من الانكسار</b>. <b>وفي الملفّاتِ الأربعةِ والعشرينَ المُشحونةِ: <b>صِفرُ</b> خاصيّةٍ منطقيّةٍ بينَها جميعًا</b> — عَشرةٌ تطلُبُ <code>left-…</code>، وسبعةٌ <code>right-…</code>، وخمسةٌ تُحرِّكُ <code>x: -8</code>، وأربعةٌ تربِطُ <code>ArrowRight</code> بـ«إلى الأمام».
          <br /><br />
          <b>وفي المُقابِل: <code>index.html</code> يفتَحُ على <code>&lt;html lang=&quot;ar&quot; dir=&quot;rtl&quot;&gt;</code>، و<code>src/styles.css</code> يحمِلُ <b>ستًّا وأربعينَ</b> خاصيّةً منطقيّةً وإلى جانبِ كلِّ لاتناظُرٍ تجاوُزَ <code>[dir=&quot;ltr&quot;]</code></b>. <b>فالنظامُ كان مُصيبًا من أوّلِه، والتغذيةُ لم تكُنْ قطّ</b>. <b>ومَسحُ 21st.dev — أربعةُ آلافٍ ومئةُ مكوِّن — أعطى الثُّغرةَ نفسَها: أبطالٌ ومُظلِّلاتٌ وتدرُّجاتٌ وبِطاقاتُ دُخول، ولا شيءَ يَعرِفُ اتّجاهًا</b>. <b>وقانونُنا نفسُهُ كان فيهِ اثنانِ وثلاثونَ بابًا ولا بابٌ واحدٌ عن الاتّجاه</b> — <b>فصارَ <code>§33</code></b>.
          <br /><br />
          <b>والهِندسةُ تُعلَنُ ولا تُوضَع.</b> المِضمارُ والمَحشوُّ وكلُّ بَلاطةٍ على المِحورِ الداخليِّ (<code>inset-inline-start</code> و<code>inline-size</code> و<code>padding-inline</code>)، <b>فالمِسطرةُ كلُّها تَنعكِسُ بقاعدةٍ واحدةٍ بلا تجاوُزِ <code>[dir]</code> واحدٍ وبلا قياسٍ في React</b>. <b>والمَقيسُ بالكودِ نفسِهِ في الاتّجاهَين: المَحشوُّ يَنمو <code>0 → 317 → 634</code> مُثبَّتًا عندَ <code>fromRight: 0</code> في <code>rtl</code> و<code>fromLeft: 0</code> في <code>ltr</code></b>.
          <br /><br />
          <b>والمفاتيحُ من الهندسة، وهذا نِصفُ القانونِ الذي تُخطئُهُ التغذيةُ كلُّها.</b> ففي ترتيبِ القراءةِ من اليمينِ إلى اليسار <b>الخُطوةُ التاليةُ إلى اليسار</b>. <b>والمَقيسُ: في <code>rtl</code> ضَربتانِ من <code>ArrowLeft</code> تُقدِّمانِ إلى الخُطوةِ الثالثة، وفي <code>ltr</code> تَرتدّانِ وتَتوقّفانِ عندَ الأولى؛ و<code>ArrowRight</code> بالعكسِ تمامًا</b>. <b>والاتّجاهُ يُقرأُ من <code>direction</code> المُحتسَبةِ للمِضمارِ نفسِهِ <b>لحظةَ وُصولِ المِفتاح</b></b>:
          <br /><br />
          <code>const rtl = getComputedStyle(e.currentTarget).direction === 'rtl'</code>
          <br /><br />
          <b>سَطرٌ واحدٌ حيثُ يُحتاج، ولا يُمكِنُ أن يَبلى.</b> <b>ومُسوَّدتي الأولى حَفِظَتهُ في <code>useState</code> خَلفَ <code>MutationObserver</code> على <code>&lt;html&gt;</code> — أحدَ عشرَ سَطرًا كانت ستُخطئُ داخلَ شجرةٍ فرعيّةٍ تنقلِبُ وحدَها</b>، وهو نفسُ خطأِ تخزينِ <code>prefers-reduced-motion</code> عندَ التركيبِ بدلَ قراءتِهِ عندَ الحدَث، وقد كلَّفَ ثلاثَ رَفَعاتٍ في هذه الدفعة. <b>فحُذِفَت الأحدَ عشرَ</b>.
          <br /><br />
          <b>ويَرسُمُ برُموزِ النظام، فلا يَسألُ عن الحُزمةِ أبدًا.</b> <b>وأكثرُ عَيبٍ تَكرارًا في التغذيةِ كان سَبعَ رَفَعاتٍ على التَّوالي تَسألُ <code>classList.contains('dark')</code> في مستودَعٍ لا صِنفَ <code>dark</code> فيه</b>. <b>وذلكَ السؤالُ لا يَلزَمُ إلا مكوِّنًا يحمِلُ سُتَّ عَشْريّاتٍ مُثبَّتة</b>. <b>و<code>var(--nova-ink)</code> مُجابٌ سَلَفًا في الحُزَمِ السَّبعِ كلِّها وفي الداكنتَينِ منها</b>. <b>والمَقيسُ أنّ الرُّموزَ الأحدَ عشرَ التي استعملتُها تَنحَلُّ كلُّها فِعلًا</b> (<code>--nova-ink</code> إلى <code>#10242e</code>، و<code>--nova-action</code> إلى <code>#0068d9</code>، …) — <b>فلا <code>var()</code> ميّتةً واحدة، وهذا فُحِصَ لا افتُرِض</b>.
          <br /><br />
          <b>والإرشادُ يقولُ أيَّ المفاتيحِ تَعمَل، وهو مقروء.</b> <b>وأكثرُ عَيبٍ تَكرارًا في الدَّفعةِ كلِّها كان إرشادَ تشغيلٍ لا يُقرأ — 1.57 و1.58 و2.25 و1.83</b>. <b>وهذا <code>--nova-ink-secondary</code>، رَمزٌ تُبقيهِ بوّابةُ التباينِ في المستودَعِ فوقَ AA في كلِّ حُزمة</b>. <b>والمَقيسُ في الحُزَمِ السَّبعِ كلِّها: الإرشادُ من <b>6.06</b> إلى <b>11.04</b>، ولافِظةُ النَّشِطِ من 12.66 إلى 16.61، والساكِنةُ من 4.92 إلى 8.01</b> — فلا يَقدِرُ أن يَهوي إلى 1.57.
          <br /><br />
          <b>والخُطوةُ هي القيمةُ والانسِيابُ هو الزِّينة.</b> <b>والمَقيسُ قبلَ المُعالَجة: <code>transition: inline-size 0.24s</code> يَجري كما هو تحتَ <code>reduce</code></b>، <b>لأنّ بَطّانيّةَ هذا المستودَعِ عندَ <code>styles.css:2150</code> تُسمّي خَمسَ مُحدِّداتٍ ولا تُصفِّرُ انتقالًا واحدًا</b>. <b>والمَقيسُ بعدَها: <code>transition: none</code>، وبعدَ 80 مِللي ثانيةٍ من قَفزةٍ إلى الخُطوةِ الرابعةِ يكونُ المَحشوُّ عندَ <b>476</b> — الهَدَفُ بالضَّبط — في حينِ أنّهُ بلا تفضيلٍ لا يزالُ عندَ 382 في الطريق</b>. <b>المَقصَدُ نفسُه، بلا رِحلة.</b>
          <br /><br />
          <b>وأمرٌ يَستحِقُّ نظرَكَ ولم أتّخِذْهُ وحدي:</b> هذه المُدَدُ رُموزٌ أصلًا — <code>--nova-motion-base</code> و<code>--nova-motion-fast</code> وثلاثةٌ غيرُها. <b>وسَطرٌ واحدٌ داخلَ تلكَ الكُتلةِ القائمةِ يُعيدُ تعريفَ الخَمسةِ إلى <code>1ms</code> يُكرِمُ التفضيلَ لكلِّ مكوِّنٍ في المكتبةِ يقرأُها، بدلًا من واحدٍ واحدٍ في كلِّ ملَفّ</b>. <b>وذلك تغييرُ سُلوكٍ على مُستوى النظامِ تحتَ التفضيل، فهو قرارُك</b> — فسُجِّلَ هنا وعالَجَ هذا الملَفُّ نفسَهُ وحدَه.
          <br /><br />
          <b>وبوّابتانِ جديدتانِ وُلِدَتا من هذه الدَّفعةِ ودَخَلَتا <code>qa:source</code>، وكِلتاهُما تَعبُرُ اليومَ وتُثبِّتُ إصلاحًا طُبِّقَ بيدي مرّاتٍ:</b>
          <br /><br />
          <b><code>focus-ring-intact</code></b> — <b>يَرفُضُ <code>outline: 'none'</code> السَّطريَّ رَفضًا مُطلَقًا</b>، لأنّهُ المَوضِعُ الأوحدُ في تَتالي هذا المستودَعِ الذي يَغلِبُ منهُ مكوِّنٌ قاعدةَ التركيزِ غيرَ المُطبَّقةِ ولا يُمكِنُ الرَّدُّ عليه؛ <b>ويَسمَحُ بـ<code>outline: none</code> في وَرَقةِ نَمَطٍ شَرطَ أن يُعلِّقَ الملَفُّ شيئًا على <code>:focus</code></b> — وهناكَ تَسكُنُ الحالاتُ المَشروعة: <code>char-swap-join-button</code> يُلغي الحلقةَ ويَجعَلُ التركيزَ آلةَ حالٍ مَرئيّةً كامِلة. <b>وثلاثُ مُسوخٍ أثبَتَتهُ: إعادةُ الشكلِ السَّطريّ، وتحويلُ كلِّ <code>:focus</code> إلى <code>:hover</code>، <b>ونَصٌّ في تعليقٍ يَدَّعي حلقةً لا يَملِكُها الكود</b> — والثالثةُ أُمسِكَت لأنّ التعليقاتَ تُقشَرُ قبلَ الفحص</b>.
          <br /><br />
          <b><code>theme-detection</code></b> — <b>لا يَحرُمُ اختبارَ الصِّنف؛ يَشتَرِطُ أن يَسألَ الملَفُّ الذي يَسألُهُ عن <code>data-theme</code> أيضًا</b>، لأنّ الاختبارَ الأصليَّ هو ما يُشغِّلُ هذه المكوِّناتِ خارجَ مستودَعِنا. <b>ويُمسِكُ نِصفَ الإصلاحِ كذلك: <code>noise-bg</code> كان يَحفَظُ الجَوابَ مرّتَينِ — <code>isDark</code> للرَّسمِ و<code>isDarkRef</code> لحَلقةِ الإطارات — وإصلاحُ واحدٍ منهُما يَترُكُ اللَّوحَ يَرسُمُ اللونَ الخطأ</b>. <b>ومُسختانِ أثبَتَتاه: رَدُّ <code>flip-calendar</code> إلى اختبارِ الصِّنفِ وحدَه، وتَركُ مَسارٍ واحدٍ يُجيبُ وحدَه في <code>noise-bg</code></b>.
          <br /><br />
          <b>وهذه تاسِعةُ دَعوىً في الدَّفعةِ يُسقِطُها الفَحصُ:</b> عَدَدتُ أبوابَ القانونِ إحدىً وثلاثينَ فكتبتُ هذا <code>§32</code>، <b>وكانَ <code>§32</code> مأخوذًا</b> — لأنّ بحثي جَرى على <code>§NN</code> والأبوابُ مَرقومةٌ <code>### NN.</code>. فصارَ <code>§33</code>.
        </SpecRow>

      </SpecList>
    </Section>
  );
}
