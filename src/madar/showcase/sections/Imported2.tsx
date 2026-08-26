import { Section, SectionHeader } from '../SectionHeader';
import { SpecList, SpecRow } from '../SpecRow';
import { IosSegmentedTabs } from '@/components/ui/ios-segmented-tabs';
import { GliderTabs } from '@/components/ui/glider-tabs';
import { LoveHeartCheckbox } from '@/components/ui/love-heart-checkbox';
import { JuicySwitch } from '@/components/ui/juicy-switch';
import { StarCloudSwitch } from '@/components/ui/star-cloud-switch';
import { PbAiButton } from '@/components/ui/pb-ai-button';
import { SweepProductCard } from '@/components/ui/sweep-product-card';
import { GroupIconButton } from '@/components/ui/group-icon-button';
import { FrostedClickCard } from '@/components/ui/frosted-click-card';
import { SalesStatCard } from '@/components/ui/sales-stat-card';
import { SpinBorderButton } from '@/components/ui/spin-border-button';
import { GlowNotificationCard } from '@/components/ui/glow-notification-card';
import { CopyTooltipButton } from '@/components/ui/copy-tooltip-button';
import { LiquidMetaballToggle } from '@/components/ui/liquid-metaball-toggle';
import { GenerateLettersButton } from '@/components/ui/generate-letters-button';
import { SwipeConfirm } from '@/components/ui/swipe-confirm';
import { TiltBatteryCard } from '@/components/ui/tilt-battery-card';
import { AvailableForButton } from '@/components/ui/available-for-button';
import { FoldCubeLoader } from '@/components/ui/fold-cube-loader';
import { GlowProgressBar } from '@/components/ui/glow-progress-bar';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { PrintPageButton } from '@/components/ui/print-page-button';
import { EditIconButton } from '@/components/ui/edit-icon-button';
import { GlassCopyButton } from '@/components/ui/glass-copy-button';
import { StarRatingRadio } from '@/components/ui/star-rating-radio';
import { DeleteTooltipButton } from '@/components/ui/delete-tooltip-button';
import { WalletHoverCard } from '@/components/ui/wallet-hover-card';
import { ArchiveIconButton } from '@/components/ui/archive-icon-button';
import { SaveSlideButton } from '@/components/ui/save-slide-button';
import { NotAllowedButton } from '@/components/ui/not-allowed-button';
import { RotateCheckCheckbox } from '@/components/ui/rotate-check-checkbox';
import { ResetPasswordCard } from '@/components/ui/reset-password-card';
import { RankingCard } from '@/components/ui/ranking-card';
import { LogoutExpandButton } from '@/components/ui/logout-expand-button';
import { DocumentsStackButton } from '@/components/ui/documents-stack-button';
import { ContinueApplicationButton } from '@/components/ui/continue-application-button';
import { RealismButton } from '@/components/ui/realism-button';
import { ShieldLockLoader } from '@/components/ui/shield-lock-loader';
import { InkBlotCheckbox } from '@/components/ui/ink-blot-checkbox';
import { ArchiveGrowButton } from '@/components/ui/archive-grow-button';
import { CollapsingSearch } from '@/components/ui/collapsing-search';
import { HasActionButtons } from '@/components/ui/has-action-buttons';
import { DraughtsmanButton } from '@/components/ui/draughtsman-button';
import { ShredderButton } from '@/components/ui/shredder-button';
import { NeoSpectrumToggle } from '@/components/ui/neo-spectrum-toggle';
import { UiverseTiltCard } from '@/components/ui/uiverse-tilt-card';

export function Imported2() {
  return (
    <Section label="Imported II">
      <SectionHeader eyebrow="43 · IMPORTED II" title="دفعةٌ من خمسٍ وأربعين: ما بُني، وما لم يُبنَ، ولماذا">
        وصلت خمسٌ وأربعون رفعةً في رسالةٍ واحدة. وأوّلُ عملٍ فيها لم يكن كتابةَ كود بل <b>فرزًا بالقياس</b>: <b>ستٌّ بلا CSS إطلاقًا</b> (شظايا وسمٍ فقط: «LET'S TALK»، «Star on GitHub»، «Explore»، «GET STARTED»، شجرةُ مجلَّدات، «Explore»)، و<b>اثنتانِ متطابقتانِ حرفًا بحرف</b> إحداهما بالأخرى، و<b>اثنتانِ مبنيّتانِ سلفًا</b> في هذا المستودع — الأولى تطابقُ <code>code-loader</code> في كتلها الستَّ عشرة كلِّها، والثانية تطابقُ <code>glass-checkbox</code> في سبعٍ من ثمانٍ، والفرقُ الوحيدُ هو <code>display: block</code> الذي أضفتُه ووثّقتُه. فبقيت <b>ستٌّ وثلاثون أداةً متمايزة</b>، تُبنى في دفعاتٍ <b>كلُّ دفعةٍ مقيسةٌ ومودَعةٌ وحدَها</b> — لا في زعمٍ واحدٍ بستٍّ وثلاثين.
      </SectionHeader>

      <SpecList>
        <SpecRow name="شريطانِ مُقسَّمان: الإبهامُ يُحصي الأزرار" bare specimen={
          <div className="flex w-full flex-col items-center gap-8 py-10" dir="ltr">
            <IosSegmentedTabs label="Range" />
            <div className="rounded-3xl bg-[#f6f8fd] px-6 py-8">
              <GliderTabs label="Section" />
            </div>
          </div>
        }>
          العددُ في كلٍّ منهما <b>يُقرأُ من الإبهامِ لا من الوسم</b>: الأوّلُ إبهامُه <code>calc(25% - 4px)</code> ويزحفُ <code>0/100/200/300%</code> — فأربعة؛ والثاني إبهامُه <code>50px</code> ويزحفُ <code>0/100/200%</code> — فثلاثة. وكلاهما يخفي مُدخَلاتِه بـ<code>display: none</code>، وكلاهما <b>بلا <code>name</code></b>: أي أن الأزرارَ في كلٍّ منهما <b>لا تستثني بعضَها</b> — تُشعَلُ كلُّها ولا تُطفأ. فالقصُّ المخفيُّ بصريًّا حلَّ محلَّ الحذف، والاسمُ يُولَّدُ بـ<code>useId</code>. <b>والأوّلُ يبني كلَّ شيءٍ على مُعرِّفاتٍ حرفيّةٍ</b> (<code>#cc-tab-day</code>) وهي عامّةٌ للمستند، فنسختانِ على صفحةٍ تتنازعان — بقيت كما كُتِبت، <b>ومُعلَنة</b>.
        </SpecRow>

        <SpecRow name="ثلاثةُ مفاتيحَ، وثلاثُ حِيَلٍ في ظلٍّ واحد" bare specimen={
          <div className="flex w-full flex-wrap items-center justify-center gap-12 bg-[#101014] py-12" dir="ltr">
            <LoveHeartCheckbox label="Like" />
            <JuicySwitch label="Enabled" />
            <StarCloudSwitch label="Night mode" />
          </div>
        }>
          <b>القلب</b> أرخصُ رسمٍ في السجلّ: صندوقٌ <code>10×8</code> بزاويتَين مستديرتَين، و<code>::after</code> منه مُدارٌ <code>90deg</code>، وابنٌ بحدَّين — ثلاثُ قطعٍ تصيرُ قلبًا حين يُدارُ الكلُّ <code>-45deg</code>. <b>والمفتاحُ الأخضر</b> تعليقاتُه بالروسيّة، وأفضلُ حيلةٍ فيه تسمّيها: «<span dir="ltr">ЭФФЕКТ СЛИПАНИЯ</span>» — أثرُ الالتصاق. عند الضغط يتمدّدُ الإبهامُ إلى <b>عرضِ المسارِ كلِّه</b> ويصيرُ نصفُ قطرِه نصفَ قطرِ المسار: فالضغطُ لا يُزلِقُ قرصًا، بل <b>يمطُّه حتى يصيرَ الحبّةَ كلَّها</b> ثم يُفلِتُه عند الطرف. <b>والثالثُ</b> يرسمُ القمرَ بظلٍّ داخليٍّ واحد: <code>inset 8px -4px 0 0 #fff</code> يأكلُ هلالًا من مربّع، وعند الحفظ يصيرُ <code>inset 15px -4px 0 15px #ffcf48</code> — انتشارٌ واسعٌ يملأُ الصندوقَ شمسًا. <b>تصريحٌ واحدٌ يحوّلُ هلالًا إلى قرص.</b>
        </SpecRow>

        <SpecRow name="زرٌّ وبطاقةٌ وبَلاطةٌ: ما تقولُه الطبقاتُ عن الوسم" bare specimen={
          <div className="flex w-full flex-wrap items-center justify-center gap-10 bg-[#0a0714] px-6 py-12" dir="ltr">
            <PbAiButton>Generate AI</PbAiButton>
            <SweepProductCard />
            <GroupIconButton label="Group" />
          </div>
        }>
          <code>.pb-ai-button span {'{'} z-index: 3 {'}'}</code> يُثبِتُ أنّ اللافتةَ <b>span</b> لا نصٌّ عارٍ: عليها أن تعلوَ الطبقتَين الزائفتَين. <b>والبطاقةُ</b> كلُّ أثرِها دائرةٌ <code>32px</code> مركونةٌ خارجَ الزاويةِ بـ<code>z-index: -1</code>، تتمدّدُ <b>ثمانيًا وعشرين ضعفًا</b> عند التمرير: <code>32 × 28 = 896px</code>، وهو سببُ امتلاءِ بطاقةٍ سقفُها <code>300×320</code> تمامًا — الدائرةُ لا تحتاجُ إلا أن تسبقَ القُطر. <b>والبَلاطةُ</b> حيلتُها في المُحدِّد: <code>svg:last-child {'{'} position: absolute {'}'}</code> — أيقونتانِ متطابقتانِ تتراكبان، وعند الضغطِ <b>تُقلِعُ الأخيرةُ وحدَها</b> فيبدو الشكلُ منفصلًا عن نفسه. واسمُ الصنفِ بقي بإملاءِ صاحبِه: <code>icon-conatiner</code>.
          <br /><br />
          <b>وثلاثُ إضافاتٍ:</b> <code>type="button"</code> للزرِّ الذي لا نوعَ له؛ و<code>href</code> حقيقيٌّ للبطاقةِ التي كُتِبت <code>&lt;a&gt;</code> بلا مقصد — <b>ورابطٌ بلا مقصدٍ لا يُركَّزُ عليه ولا يُنطَق</b>؛ و<code>&lt;button&gt;</code> للبَلاطةِ التي كانت <code>&lt;div&gt;</code> بـ<code>cursor: pointer</code>. <b>وحلقةُ تركيزِ البطاقةِ تفعلُ أكثرَ من الظهور:</b> تُشغِّلُ الكَنسةَ أيضًا، لأن التمريرَ وحدَه يُبيِّضُ النصَّ — فبلا ذلك يقرأُ مستخدمُ لوحةِ المفاتيح <b>نصًّا داكنًا على أرضٍ داكنة</b>.
        </SpecRow>
        <SpecRow name="الموجةُ الثانية: مُرشِّحاتٌ مفقودة، ومِزلاجٌ بنقطةٍ مكانَ فاصلة" bare specimen={
          <div
            className="flex w-full flex-wrap items-center justify-center gap-10 px-6 py-12"
            style={{ background: 'radial-gradient(120% 120% at 22% 8%, #24304d 0%, #0d1120 52%, #06070d 100%)' }}
            dir="ltr"
          >
            <FrostedClickCard>Click me</FrostedClickCard>
            <SpinBorderButton>Button</SpinBorderButton>
            <GlowNotificationCard />
            <SalesStatCard />
          </div>
        }>
          <b>البطاقةُ المُثلَّجة</b> ثلاثُ قواعدَ ولا شيءَ مفقود، وأجودُ ما فيها الضغطُ: <code>scale(0.95) rotateZ(1.7deg)</code> — ضغطةٌ <b>تَميلُ</b> أيضًا، فتُقرأُ بطاقةً تُدفَعُ لا صندوقًا يصغُر. و<code>backdrop-filter</code> فيها يحتاجُ ما يُشوِّشه، فوُضِعت على أرضٍ متدرِّجةٍ لا مسطّحة.
          <br /><br />
          <b>وزرُّ الحدِّ الدائرِ يفقدُ ثلاثةَ مُرشِّحات:</b> <code>url(#unopaq)</code> و<code>#unopaq2</code> و<code>#unopaq3</code> — <b>والاسمُ يقولُ ما تفعل</b>: «فكُّ الشفافيّة». فتمويهُ تدرُّجٍ حادٍّ يُسقِطُ ألفاءَه، ومضاعفةُ الألفاءِ تُعيدُ الحافّةَ الناعمةَ شريطًا صُلبًا من اللون. فكلُّ واحدٍ <code>feColorMatrix</code> لا شيءَ فيه خارجَ صفِّ الألفاء، والثلاثُ درجاتٍ تُطابِقُ أسماءَ الطبقاتِ الثلاث: <code>blur</code> ثم <code>intense</code> ثم <code>inside</code>. <b>المضاعِفاتُ منّي، والميكانيكيّةُ ما يطلبُه الـCSS بالاسم.</b>
          <br /><br />
          <b>وفيه خطأٌ نحويٌّ حقيقيٌّ بقي كما سُلِّم:</b> <code>@keyframes woah {'{'} 0%. to {'{'} … </code> — <b>نقطةٌ مكانَ فاصلة</b>. فقائمةُ المُحدِّدِ تصيرُ باطلةً ويُسقِطُ المتصفِّحُ الكتلةَ كلَّها، فلا يبقى إلا خطوةُ <code>50%</code>. <b>وقِيس</b>: الحركةُ ما زالت تجري <code>1 → 0.75 → 1</code>، لأن الـ<code>0%</code> و<code>100%</code> الغائبتَين تسقطانِ إلى النمطِ الأساسيِّ وهو <code>scale: 1</code>. <b>فالخطأُ غيرُ ضارٍّ، وهو خطأُ صاحبِه، فبقي — مع القياسِ بدلَ التصحيحِ الصامت.</b>
          <br /><br />
          <b>وبطاقةُ التنبيه:</b> الرفعتانِ <code>67</code> و<code>68</code> تحملانِ CSS <b>متطابقًا حرفًا بحرف</b> (١٥٠٣ محرفًا بعد التطبيع)، والثانيةُ تزيدُ كلماتٍ غيرَ مُنسَّقة. <b>فأداةٌ واحدة.</b> وطبقاتُها يُعيِّنُها <code>z-index</code>: اللوحُ الداخليُّ عند <code>2</code>، والقضيبُ المتدرِّجُ عند <code>4</code>، وهالةٌ بينهما عند <code>3</code>، وأخرى تحتَ الكلِّ عند <code>1</code> — <b>ضوءانِ، واحدٌ فوقَ السطحِ وواحدٌ تحتَه</b>. <b>والميكانيكيّةُ التي لا يستطيعُ الـCSS توفيرَها:</b> الهالتانِ <code>20rem</code> بـ<code>translate(-50%, -50%)</code> و<b>بلا <code>top</code> ولا <code>left</code></b> — فتتمركزانِ على أصلِ العنصرِ: لطخةٌ في الزاوية. وتدرُّجٌ شعاعيٌّ مُزاحٌ بنصفِ حجمِه هو <b>بصمةُ ضوءٍ يتبعُ المؤشِّر</b>، ولا ورقةَ أنماطٍ تُحرِّكُه. فخاصّيّتانِ مخصَّصتانِ من مِقبضِ <code>pointermove</code>، والتدرُّجاتُ والأحجامُ والطبقاتُ <b>لم تُلمَس</b>.
          <br /><br />
          <b>وبطاقةُ المبيعات فيها رقمانِ لا يشتقُّ أحدُهما الآخر:</b> النصُّ يقولُ <code>20%</code> والشريطُ يملأُ <code>76%</code>. وفي الرفعِ كلاهما حرفيٌّ فلا تناقُضَ بعد — لكن كأداةٍ سيكون، <b>فعرضُ الشريطِ صار خاصّيّةً وافتراضُها ٧٦ بالضبط</b>. مُعلَنٌ لا مُوفَّقٌ صمتًا. و<code>role="img"</code> باسمٍ على الشريط، إذ شريطٌ محتواه <code>div</code> ملوَّنٌ <b>لا يقولُ شيئًا</b> لقارئٍ، والرقمُ بجانبِه رقمٌ آخر.
        </SpecRow>

        <SpecRow name="الموجةُ الثالثة: أربعةُ عيوبٍ حقيقيّة، وثلاثُ حِيَلٍ تستحقُّ القراءة" bare specimen={
          <div className="flex w-full flex-col items-center gap-12 bg-[#0b0d12] px-6 py-12" dir="ltr">
            <div className="flex flex-wrap items-center justify-center gap-14">
              <CopyTooltipButton value="npm i nova-ui-react-library" />
              <LiquidMetaballToggle label="Liquid" />
              <GenerateLettersButton />
            </div>
            <div className="flex flex-wrap items-start justify-center gap-10">
              <TiltBatteryCard />
              <SwipeConfirm />
            </div>
          </div>
        }>
          <b>أحدُ هذه الملفّاتِ يحملُ أحدَّ عَيبِ وصولٍ في السجلِّ كلِّه.</b> كلُّ قواعدِ «تمَّ النسخ» في زرِّ النسخِ مبنيّةٌ على <code>:focus:not(:focus-visible)</code> — أي «مُركَّزٌ بطريقةٍ لا يرى المتصفِّحُ أنها تستحقُّ حلقة»، وذاك عمليًّا يعني <b>مُركَّزًا بالفأرة</b>. فتبدُّلُ التلميحِ إلى «Copied!»، وإخفاءُ أيقونةِ الحافظة، وظهورُ علامةِ الصحّ — <b>ثلاثتُها تحدثُ بالنقرِ ولا تحدثُ أبدًا بلوحةِ المفاتيح</b>. اضغطِ الزرَّ بـEnter فيُنسَخُ النصُّ <b>بلا أيِّ تأكيد</b>: الشيءُ الوحيدُ الذي وُجِدت الأداةُ لتقولَه <b>مُطفأٌ لمستخدمِ لوحةِ المفاتيح بالبناء</b>. فذاك لم يُبقَ حرفيًّا، إذ ليس مظهرًا بل <b>غيابَ رجعِ الفعل</b>: خاصّيّةُ <code>data-copied</code> من المِقبضِ تقودُ القواعدَ الثلاثَ نفسَها، فتأتي الحالةُ <b>مما حدث</b> لا من كيفيّةِ التركيز. ومسارُ الفأرةِ لم يُلمَس. وفيه أيضًا <code>visibility: 0</code> — وليست قيمةً صحيحةً — فكان التلميحُ شفّافًا <b>وما زال في شجرةِ الوصول</b>.
          <br /><br />
          <b>ومفتاحُ الكرةِ السائلة</b> أذكى ما في الدفعة: لا إبهامَ ولا مسار، بل <b>عنصرٌ واحد</b> عنصرُه الزائفُ يحملُ قرصَين، والاندماجُ اللزِجُ من <code>filter: blur(0.66em) contrast(20)</code>. فالتمويهُ يحوّلُ كلَّ قرصٍ إلى مُنحدَرٍ ناعم، و<code>contrast(20)</code> يسحقُ المُنحدَرَ إلى حافّةٍ حادّةٍ من جديد — <b>فحيثُ يتراكبُ تمويهانِ يُقرآنِ كتلةً واحدة، وحيثُ لا يتراكبانِ يُقرآنِ قرصَين</b>. وتلك الدالّتانِ <b>هما</b> الكرةُ الفوقيّة. وحلقةُ تركيزِه وُضِعت على غلافٍ <b>خارجَ المُرشِّح</b>، إذ <code>contrast(20)</code> كان سيسحقُها مع كلِّ شيءٍ آخر.
          <br /><br />
          <b>وزرُّ الحروف</b> حالتُه مبنيّةٌ على <code>:focus</code> لا على <code>:active</code> ولا على صنف — فالانتقالُ كلُّه إلى «Generating» يقعُ <b>لحظةَ التركيزِ ولو بـTab</b>، قبل أن يُضغَطَ شيء. وذاك اختيارُ صاحبِه فبقي، <b>لكنه يعني أن التركيزَ و«بدأ العمل» إشارةٌ واحدةٌ هنا</b> — وهو ما يجبُ معرفتُه قبل وصلِه بشيءٍ حقيقيّ.
          <br /><br />
          <b>وبطاقةُ الإمالة</b> ثالثةُ بطاقاتِ البطّاريّةِ في هذه الرفعات، <b>وليست مكرَّرةً</b>. بنيتَها تُثبِتُها <b>تسعُ مناطقِ تمريرٍ خفيّة</b> عند <code>translateZ(600px)</code> على شبكةِ ٣×٣ — <b>قراءةُ موضعِ مؤشِّرٍ مبنيّةٌ بلا سكربت</b>: تسعةُ صناديقَ تنوبُ عن تسعِ جهات. <b>وشيئانِ يحتاجُهما الـCSS ولا يُعلِنُهما:</b> <code>--z</code> تُقرأُ <b>ستَّ مرّات</b> وتُعلَنُ صفرًا — ومتغيّرٌ غيرُ مُعلَنٍ داخلَ <code>calc()</code> يُبطِلُ التصريحَ كلَّه، فكانت <b>ستُّ تحويلاتٍ ستُسقَطُ جميعًا</b>؛ ونصفُ قطرِ الحدِّ المرسوم، إذ <code>0 0 360 0</code> و<code>dashoffset: 360</code> يقولانِ إن الدورةَ ٣٦٠ وحدة — فـ<code>pathLength={'{'}360{'}'}</code>.
          <br /><br />
          <b>وزرُّ التمريرِ يحملُ ثلاثةَ عيوب.</b> الأوّل: الموجتانِ <code>url("data:image/svg+xml;utf8,")</code> — <b>فارغتانِ تمامًا</b>، فـ«الماءُ الجاري» صورتانِ خاليتانِ تنزلقانِ فوقَ تدرُّجٍ مسطَّح: الحركةُ تجري ولا شيءَ يتحرّك. والثاني: <code>:active</code> على مربّعٍ <code>display: none</code> <b>لا يقعُ أبدًا</b>، فحالةُ الضغطِ كلُّها ميّتة — فرُبِطت بـ<code>:active</code> على المِقبضِ المرئيّ، وهو ما يُضغَطُ فعلًا. والثالث: <code>~ .container</code> يطلبُ حاويةً <b>أختًا تاليةً</b> للمربّع، والمربّعُ <b>داخلَها</b> — <b>كودٌ ميّت</b>، بقي غيرَ مُطابِقٍ كما سُلِّم.
        </SpecRow>

        <SpecRow name="ثلاثُ إطاراتِ سكونٍ: واحدةٌ صحيحةٌ وواحدةٌ يُصحِّحُها ما يُحرِّكُها وواحدةٌ فارغة" bare specimen={
          <div className="flex w-full flex-col items-center gap-10 px-6 py-12" style={{ background: 'radial-gradient(120% 120% at 78% 6%, #1f2a44 0%, #0b1020 58%, #05060c 100%)' }} dir="ltr">
            <AvailableForButton />
            <FoldCubeLoader />
            <GlowProgressBar label="Upload" />
          </div>
        }>
          <b>ثلاثتُها ذاتُ حركةٍ لا نهائيّة، فالسؤالُ الواحدُ فيها: ما الذي يُرى حين تُزالُ الحركة؟</b> وبطانيّةُ هذا المستودعِ لا تُجمِّدُ ولا تحذف: <code>{'{'} animation-duration: 1ms !important; animation-iteration-count: 1 !important {'}'}</code> في <code>tokens.css</code> — <b>مَرّةٌ واحدةٌ في مِلّي واحدة</b>. <b>وثلاثتُها أجابت جوابًا مختلفًا، وقِيست كلُّها.</b>
          <br /><br />
          <b>شريطُ التقدُّمِ صحيحٌ بلا لمسة:</b> <code>width: 40%</code> في الأساس و<code>@keyframes grow</code> ينتهي عند <code>40%</code> — <b>الأساسُ وآخرُ إطارٍ متّفقان</b>، فيرتاحُ الشريطُ عند القيمةِ نفسِها التي كان يقصدُها. وعددُ الجُزيئاتِ <b>يُقرأُ من المُحدِّدات</b>: خمسُ قواعدِ <code>:nth-child</code>، ولا وسمَ في الرفعةِ يُعَدُّ منه.
          <br /><br />
          <b>وزرُّ «متاحٌ لمشروع» احتاجَ ثلاثَ قياساتٍ ليُقالَ صحيحًا:</b> <code>.circle .dot</code> أساسُه <code>transform: translate(-50%, -50%)</code>، والنقطةُ <b>مركَّزةٌ سلفًا</b> بمركزةِ الفلِكس — فذاك التحويلُ يدفعُها ٦ بكسل. <b>وبإطفاءِ الحركةِ في موضعِها تُقاسُ <code>dx -6, dy -6</code>؛ وبتشغيلِها <code>0, 0</code></b> — لأن <code>dot-keys</code> يَستبدِلُ <code>transform</code> في كلِّ إطار. <b>أي أن الحركةَ هي ما يُصحِّحُ الموضعَ الذي يُخطئُه الأساس.</b> <b>ثم جاءَ جوابُ الحركةِ المخفَّفةِ مخالفًا لما يُنبِئُ به شكلُ البطانيّة:</b> مَرّةٌ واحدةٌ في مِلّي واحدةٍ بـ<code>fill-mode: none</code> كانت ستُعيدُ الأساسَ ومعه الخطأُ السّتّة — <b>وقِيس فلم تُعِدْه</b>: النقطةُ تقرأُ <code>matrix(1, 0, 0, 1, 0, 0)</code> وتجلسُ في المركز، أي أن الإطارَ الأخيرَ يبقى مُطبَّقًا، <b>وذاك ثبَتَ حتى بحذفِ إبطالي من الورقةِ الحيّة</b>. فبقيَ الإبطالُ ثلاثةَ أسطُرٍ لا لأنه حامِل، بل لأن «المُحرِّكَ يُصادِفُ أن يُبقيَ آخرَ إطار» <b>ليس إطارَ سكونٍ يُعتمَدُ عليه</b>.
          <br /><br />
          <b>وفيه عَيبٌ ثانٍ لا يُصلَح:</b> <code>@keyframes outline-keys</code> يفتحُ بـ<code>outline: solid 20px var(--color)</code>، و<code>--color</code> <b>غيرُ مُعلَنةٍ في الرفعةِ كلِّها</b> — ومتغيّرٌ غيرُ مُعلَنٍ يُبطِلُ التصريحَ عند حسابِ القيمة، فيُسقَطُ الإطارُ الأوّلُ ذاك الحدَّ. و<code>.outline</code> <b>لا خلفيّةَ له ولا حدَّ ولا محتوى</b>: فهو صندوقٌ ١٦ بكسل يتقلَّصُ ويخبو <b>وهو لا يطلي شيئًا على الإطلاق</b>. <b>الحلقةُ المتوسِّعةُ التي وُجِدت الأداةُ لتُظهِرَها لا تُرسَمُ أبدًا.</b> وبقيت كما هي، فالخاصّيّةُ المفقودةُ خاصّيّةُ صاحبِها — <b>مُسمَّاةً هنا بدلَ أن تُوَرَّدَ صامتة</b>.
          <br /><br />
          <b>ومُحمِّلُ المكعّبات</b> يفرقُ عن أصلِه بشيئَين كلاهما بقي: <code>animation-delay</code> مُعلَنٌ للأربعةِ (<code>0.3s</code> إلى <code>1.2s</code>) و<code>animation-fill-mode</code> <b>غيرُ مُعلَن</b> — وحركةٌ مؤجَّلةٌ بلا وضعِ ملءٍ تطلي <b>نمطَها الأساسيّ</b> حتى تبدأ، والأساسُ هنا <code>opacity: 1</code> بلا دوران. <b>فيُفتَحُ المُحمِّلُ كتلةً صُلبةً ٤٠×٤٠ من أربعةِ مربّعاتٍ</b> ولا يبدأُ الطيُّ إلا بعدَ ١٢٠٠ مِلّي. و<code>both</code> كانت ستُثبِتُها على إطارِ الصفرِ وهو <code>opacity: 0</code>. والأصلُ يُدوِّرُ كلَّ مكعّبٍ ٩٠ درجةً ليطوفَ الطيُّ حولَ المربّع؛ <b>وهذه النسخةُ تُعيِّنُ <code>transform-origin</code> ولا تُدوِّرُ</b>، فتطوي الأربعةُ على محورٍ واحدٍ من أربعةِ مفاصل. <b>وإضافةٌ واحدةٌ فيه هي الفرقُ بين أن يعملَ وألّا يعمل:</b> لا دورَ له ولا اسم — <b>ومُحمِّلٌ لا تستطيعُ تقنيّةٌ مُساعِدةٌ الإبلاغَ عنه ليس مؤشِّرَ حالة</b>.
        </SpecRow>

        <SpecRow name="خمسٌ صغيرة: سهمٌ خارجَ القصّ، وقرصٌ تُمركِزُه مواصفةُ الفلِكس، وتقييمٌ يمتلئُ بالمقلوب" bare specimen={
          <div className="flex w-full flex-col items-center gap-12 py-12" dir="ltr">
            <div className="flex w-full flex-wrap items-center justify-center gap-10 rounded-2xl bg-[#f4f6f9] px-6 py-10">
              <GetStartedButton />
              <PrintPageButton />
              <StarRatingRadio label="Rate this" />
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-10 rounded-2xl px-6 py-10" style={{ background: 'conic-gradient(from 210deg at 30% 20%, #0f766e 0deg, #0ea5e9 100deg, #f59e0b 200deg, #e11d48 290deg, #0f766e 360deg)' }}>
              <EditIconButton label="Edit" />
              <GlassCopyButton value="npm i nova-ui-react-library" />
            </div>
          </div>
        }>
          <b>زرُّ «GET STARTED» سهمُه لا يخبو بل يَنزلِق داخلَ قَصِّه:</b> <code>.btn-front svg</code> مطلقٌ عند <code>left: 100%</code> و<code>.btn-front</code> عليه <code>overflow: hidden</code> — <b>فالسهمُ يبدأُ خارجَ اللوحِ تمامًا ومقصوصٌ بالكامل</b>، والتمريرُ ينقلُه إلى <code>80%</code> فيدخلُ من الحافّةِ اليمنى. وطبقتاه هما ما يجعلُه مفتاحًا ماديًّا: <code>.btn-back</code> هو المقبسُ، و<code>.btn-front</code> لوحٌ مرفوعٌ <code>-6px</code> منه، <b>والفجوةُ الأربعُ يملؤها <code>box-shadow</code> بإزاحةٍ رأسيّةٍ ٤ وتمويهٍ ٤ بلونِ <code>#84d2dd</code> — لونِ المقبسِ نفسِه</b> — فلا يطفو اللوحُ فوقَ فراغٍ بل يجلسُ على حافّةٍ سماويّة. ثم يدفعُ التمريرُ المقبسَ <b>نزولًا</b> ٤ واللوحَ <b>صعودًا</b> إلى ٨ في اللحظةِ ذاتِها: <b>ارتفاعُ بكسلَين يصيرُ انفصالَ اثنَي عشر من تمريرةٍ واحدة.</b> <b>ووسمُه لا يَصِحُّ كما سُلِّم:</b> <code>&lt;p&gt;</code> محتوى انسيابيٌّ و<code>&lt;button&gt;</code> لا يقبلُ إلا محتوى عباريًّا — فصار الوسمُ <code>&lt;span&gt;</code>، والمُحدِّدُ الوحيدُ الذي سمّى <code>p</code> يُسمّي صنفًا. والحاويةُ هي الزرُّ، إذ <b><code>:hover</code> و<code>:active</code> يَسريانِ إلى الأسلاف</b> — وزرٌّ داخلَ زرٍّ لا يَصِحّ.
          <br /><br />
          <b>وزرُّ التعديلِ يحملُ تفصيلةً في المواصفةِ تُقاسُ ولا تُفترَض:</b> <code>::before</code> فيه <code>200%</code> مربّعًا — ١١٠×١١٠ داخلَ زرٍّ ٥٥ — مطلقٌ <b>بلا <code>top</code> ولا <code>left</code></b>. وابنٌ مطلقٌ لحاويةِ فلِكس يأخذُ موضعَه الساكنَ <b>كأنه العنصرُ المرنُ الوحيد</b>، فيُمركِزُه <code>justify-content: center</code> — <b>لا يذهبُ إلى الزاوية</b>. فينمو القرصُ المموَّهُ من الوسط. <b>و<code>::after</code> أذكى:</b> قضيبٌ ٢٥×١٫٥ عند <code>left: -5px</code> بـ<code>scaleX(0)</code> وأصلُه <code>left</code>؛ والتمريرُ ينقلُه إلى <code>0</code> <b>ويقلبُ الأصلَ إلى <code>right</code></b> — نموٌّ من اليسارِ مع انزلاقٍ يمينًا والأصلُ يُقلَبُ في منتصفِ الانتقال: <b>فيُقرأُ خطًّا يَرسمُه القلمُ لا شريطًا يُكشَف</b>. وثلاثةُ <code>z-index</code> تحسمُ الرَّصَّ: القرصُ ١، والخطُّ ٢، والقلمُ ٣ — <b>فيمرُّ الخطُّ تحتَ سِنِّ القلمِ وفوقَ الهالة</b>. <b>وهو زرٌّ بأيقونةٍ وحدَها</b>، فبلا اسمٍ يُنطَقُ «زِرّ» ولا شيءَ غيرُها.
          <br /><br />
          <b>وزرُّ النسخِ الزجاجيُّ يُعلِنُ حالتَه الثانيةَ ولا يستطيعُ الوصولَ إليها:</b> <code>.copied-text</code> و<code>.copied-icon</code> مُعلَنانِ <b>ولا مُحدِّدَ في الرفعةِ كلِّها يُطبِّقُهما</b> — لا <code>:checked</code> ولا خاصّيّةَ ولا أُخوّة. فهما صاحبُ الكودِ يقولُ لك كيفَ تبدو الحالةُ الثانيةُ ويتركُ لك المفتاح. <b>و<code>stroke</code> لا <code>fill</code></b> على أيقونةِ التأكيد، وهو ما يُثبِتُ أنّ أيقوناتِه مرسومةٌ بالخطِّ لا مملوءة. و<code>backdrop-filter: blur(10px)</code> <b>لا شيءَ له ليموِّهَه على أرضٍ مسطَّحة</b> — على الأبيضِ هو أبيض؛ فوُضِع على أرضٍ مخروطيّةٍ صاخبة.
          <br /><br />
          <b>وزرُّ الطباعةِ عمودٌ ٢٠ بكسل مقسومٌ نصفَين:</b> الأعلى <code>align-items: flex-end</code> فتجلسُ الطابعةُ على خطِّ القسمة، والأسفلُ <code>flex-start</code> فتبدأُ الورقةُ من الخطِّ نفسِه؛ ثم تُدفَعُ الطابعةُ <code>translateY(4px)</code> <b>عبرَه</b> — <b>وهي الأختُ الأسبقُ فتطلي الورقةُ فوقَها</b>، فتُقرأُ الورقةُ خارجةً من الشَّقِّ لا جالسةً تحتَه. والتمريرُ يرفعُها من ١٠ إلى ١٦ بأصلٍ <code>top</code>: <b>فتُغذَّى نزولًا من حافّةٍ ثابتة.</b>
          <br /><br />
          <b>والتقييمُ بالنجومِ يمتلئُ في الاتّجاهِ الخاطئ، وأربعُ قواعدَ فيه لا تطلي شيئًا.</b> <code>.radio &gt; input:checked + label ~ label &gt; svg</code> و<code>.radio input:checked ~ label svg</code> كلتاهما تُشعِلانِ كلَّ لافتةٍ <b>تَلي</b> المختارة: فاختيارُ الثانيةِ يُشعِلُ من الثانيةِ إلى الخامسةِ <b>ويُبقي الأولى مُعتِمة</b> — عكسُ كلِّ تقييمٍ بالنجوم. وبقي، فالأداةُ ما زالت تُبلِّغُ القيمةَ الصحيحة و<b>الطِّلاءُ وحدَه معكوسٌ وهو طِلاءُ صاحبِه</b>. وأربعُ قواعدَ تُعيِّنُ <code>fill</code> على <b>اللافتة</b>، <b>وليست ميّتةً بالتحليل</b>: عند تمريرٍ حقيقيٍّ تحسبُ اللافتةُ <code>fill: rgb(255, 158, 11)</code> فعلًا. لكنها <b>لا تُرى</b>: اللافتةُ لا تطلي هندسةً تُملأ، والوريثُ الوحيدُ الذي كان سيَستلِمُ القيمةَ له قاعدةٌ مباشرةٌ خاصّة — <b>فقِيس والثالثةُ مختارةٌ والثانيةُ ممرَّرٌ عليها: اللافتةُ <code>rgb(255, 158, 11)</code> ورسمُها <code>rgb(255, 167, 35)</code>، لونانِ مختلفان.</b> فالقيمةُ المُوَرَّثةُ لا تصلُ أبدًا. وقِيست <b>بتمريرِ مؤشِّرٍ حقيقيّ</b> لا بحدَثٍ مُرسَل، إذ <code>mouseover</code> المُرسَلُ <b>لا يُطابِقُ <code>:hover</code> إطلاقًا</b> — وذاك أبطلَ محاولتي الأولى. <b>وتفصيلةٌ صغيرةٌ تسقطُ من القياسِ نفسِه:</b> بالثالثةِ مختارةً تستقرُّ الألوانُ <code>#666, #666, #ffa723, #ff9e0b, #ff9e0b</code> — <b>فالنجمةُ المختارةُ بلونٍ يخالفُ التاليتَين، ولا شيءَ في الـCSS يقولُ ذلك قصدًا</b>: <code>.radio &gt; input:checked + label ~ label &gt; svg</code> يحملُ عنصرًا أكثرَ في مُحدِّدِه من <code>.radio input:checked ~ label svg</code> فيغلبُ في الرابعةِ والخامسة، وفي الثالثةِ يتعادلانِ <b>فيحسمُ ترتيبُ المستند</b> لصالحِ <code>#ffa723</code> الأخيرة. <b>والثالثُ هو الفرقُ بين أن يعملَ وألّا يعمل:</b> لا <code>name</code> للمُدخَلات — <b>وخمسُ إذاعاتٍ بلا اسمٍ مشترَكٍ خمسُ إذاعاتٍ مستقلّة</b>: لا تستثني بعضَها، فتُشعَلُ كلُّها ولا تُطفأُ واحدة. و<code>useId</code> يُوفِّرُ الاسم. ولافتاتُها لا تحملُ إلا رسمًا، <b>فلا اسمَ لأيٍّ منها</b>. والمُدخَلاتُ بقيت <code>appearance: none</code> مطلقةً كما كُتِبت: <b>إذاعةٌ منزوعةُ المظهرِ لا تطلي صندوقًا</b>، فهي خفيّةٌ بلا أن تُحذَفَ من شجرةِ الوصول — وهو الشيءُ الوحيدُ الذي كان <code>display: none</code> سيُكلِّفُه.
        </SpecRow>

        <SpecRow name="الموجةُ الخامسة: تلميحٌ لا يُرى إلا حين يتوقّفُ الزرُّ عن القصّ، وأسماءُ مجموعاتٍ هي المواصفةُ كلُّها" bare specimen={
          <div className="flex w-full flex-col items-center gap-12 py-12" dir="ltr">
            <div className="flex w-full flex-wrap items-center justify-center gap-12 rounded-2xl bg-[#eef1f6] px-6 py-12">
              <DeleteTooltipButton />
              <ArchiveIconButton />
              <SaveSlideButton />
              <NotAllowedButton />
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-10 rounded-2xl bg-[#1b1b21] px-6 py-10">
              <RotateCheckCheckbox label="Remember me" />
            </div>
          </div>
        }>
          <b>زرُّ الحذفِ تلميحُه له سببانِ مستقلّانِ لألّا يُرى:</b> <code>overflow: hidden</code> على زرٍّ ٤٠×٤٠، والتلميحُ عند <code>top: -40px</code> — <b>خارجَه تمامًا</b> — و<code>opacity: 0</code> فوقَ ذلك. والتمريرُ يقلبُ الاثنَين معًا: <code>overflow: visible</code> على الزرِّ و<code>opacity: 1</code> على التلميح. <b>وحذفُ أيٍّ منهما يُبقي التلميحَ خفيًّا</b> — وهو ما يجبُ معرفتُه قبلَ أن «يُبسِّطَ» أحدٌ قاعدةَ التمرير. وسهمُه <code>::before</code> مربّعٌ ١٠ مُدارٌ ٤٥ عند <code>bottom: -10%</code>، <b>ونسبتُه من صندوقٍ لا من حافّتِه</b>: عشرةٌ من مئةٍ في ٣٠ بكسل ثلاثةٌ. <b>وأُضيف <code>:focus-visible</code> إلى القاعدتَين نفسِهما</b>، لأن التلميحَ كان بالتمريرِ وحدَه فكان مستخدمُ لوحةِ المفاتيح يرى الأيقونةَ ولا شيءَ غيرَها.
          <br /><br />
          <b>وزرُّ الأرشفةِ لا يقولُ ما رسمُه أصلًا — يقولُ كيف تتحرّكُ أربعةُ أجزاءٍ منه، ويُسمّيها:</b> <code>toremainasis</code> يصعدُ من <code>37%</code> إلى <code>22%</code> فهو غطاءُ الصندوق؛ و<code>toshrink</code> يهبطُ إلى <code>55%</code> فهو الورقةُ الداخلة؛ و<code>tocome</code> و<code>tocome2</code> <b>أصلُهما <code>scale(0)</code></b> — أي «هذا الجزءُ غيرُ مرسومٍ بعد» — وتحويلُ التمريرِ <b>بلا مقياسٍ إطلاقًا</b> فيعودانِ إلى الواحدِ ضِمنًا. وزمناهما ٠٫٤٥ و٠٫٤ <b>مفترِقان</b>، فيُقرآنِ تعاقُبًا لا مجموعة. <b>والأسماءُ الأربعةُ هي المواصفةُ كلُّها.</b> وفيه لونانِ يشتركانِ في الأرقامِ الثلاثةِ نفسِها بترتيبَين: <code>rgb(37, 61, 100)</code> للقرصِ المموَّه و<code>rgb(37, 100, 61)</code> للتمرير — <b>أزرقٌ وأخضرٌ من الأرقامِ عينِها</b>، وكلاهما بقي. وكلُّ أبعادِه كسورُ بكسل (٧٦٫٥، ٢٢٫١، ٥٫١، ٨٫٥، ١٧): <b>تصميمٌ بأعدادٍ صحيحةٍ مضروبٌ في ٠٫٨٥.</b>
          <br /><br />
          <b>وزرُّ الحفظِ ثلاثُ قواعدَ تصنعُ الإيماءةَ كلَّها:</b> اللافتةُ تخبو، والأيقونةُ تنزلقُ <code>translateX(1.2em)</code>، وغلافُها يتمدّدُ <code>scale(1.25)</code>. <b>والـ<code>1.2em</code> ليست تقديرًا</b>: عند <code>font-size: 20px</code> هي ٢٤ بكسل، وهو ما تقيسُه كلمةُ «Save» مع هامشِها <code>0.3em</code> — <b>فالأيقونةُ لا تتحرّكُ بجوارِ اللافتةِ بل إلى مكانِها، واللافتةُ ذهبت قبلَ أن تصل</b>. وفيه <code>transition</code> مُعلَنٌ مرّتَين بزمنَين مختلفَين، فيغلبُ التمريرُ ذَهابًا والأساسُ عَودةً: <b>إيماءةٌ غيرُ متناظرةٍ بالقصد</b>. و<code>font-weight: 1000</code> قيمةٌ صحيحةٌ فعلًا — حدُّ النطاقِ الأعلى — فبقيت.
          <br /><br />
          <b>وزرُّ «Not allowed!» يقولُ إنه لا يُضغَط، ثم يُنسِّقُ ما يحدثُ عند ضغطِه.</b> <code>cursor: not-allowed</code> بلا خاصّيّةِ <code>disabled</code> هو الفكرةُ كلُّها: المؤشِّرُ يقولُ لا والمستندُ يقولُ نعم — <b>وزرٌّ مُعطَّلٌ حقًّا لا يُطلِقُ <code>:hover</code> إطلاقًا، وكلُّ أثرٍ في الرفعةِ على التمرير</b>. فبقيَ زرًّا فاعلًا، إذ إضافةُ <code>disabled</code> كانت ستحذفُ الحركةَ التي وُجِدت الأداةُ لأجلِها. <b>وفيه خطأٌ نحويٌّ حقيقيّ:</b> <code>transition: all 0.3s ease cubic-bezier(...)</code> — <b>دالّتا توقيتٍ في مُختصَرٍ واحد</b> — فيُسقِطُ المتصفِّحُ التصريحَ، <b>فالزرُّ نفسُه بلا انتقالٍ أصلًا</b> وإنما عنصرُه الزائفُ والرسمُ وحدَهما. والحمرةُ تبدأُ من <code>translate: 0 105%</code> لا <code>100%</code>: <b>خمسةٌ في المئةِ زائدةٌ حتى لا يكونَ في بداءةِ الصعودِ خيط</b>.
          <br /><br />
          <b>ومربّعُ الاختيارِ يصيرُ صحًّا بدَورةِ ٤٥ وبأن يكفَّ عن رسمِ نفسِه:</b> <code>:checked ~ .checkmark</code> يفعلُ شيئَين — <code>rotate(45deg)</code> و<code>border: none</code>. فالصندوقُ لا يتحوّلُ صحًّا، بل <b>يُخلي الطريقَ ويترُكُ عنصرَه الزائفَ وحدَه ظاهرًا</b>؛ وذاك الزائفُ حدَّانِ من مستطيل (<code>border-width: 0 2.5px 2.5px 0</code>) أي <b>زاويةٌ قائمة</b>، وزاويةٌ قائمةٌ داخلَ أبٍ مُدارٍ ٤٥ هي صَحّ. <b>فالدَّورةُ في الأبِ والشكلُ في الابن، ولذلك لا يُشبِهُ أيٌّ منهما وحدَه شيئًا.</b> ورفعتانِ (144911 و144934) تحملانِ هذا الـCSS <b>متطابقًا حرفًا بحرف</b> — فأداةٌ واحدة. <b>ووسمُه لا يَصِحُّ كما يُوحي:</b> تعليقُ صاحبِه يُسمّي <code>.checkbox-btn</code> «اللافتة» وفيه قاعدةٌ لـ<code>label</code> داخلَه — <b>ولافتةٌ داخلَ لافتةٍ لا تَصِحُّ والداخلةُ تسرِقُ الرابطة</b>. فصارت الحاويةُ غلافًا عاديًّا واللافتةُ واحدةً موصولةً بـ<code>for</code>.
        </SpecRow>

        <SpecRow name="قرصانِ بالحجمِ نفسِه أحدُهما يكبُرُ أربعًا، وشكلٌ واحدٌ يكبُرُ تسعًا، وبطاقةٌ تُخفي أرقامًا حقيقيّةً خلفَ تمريرة" bare specimen={
          <div className="flex w-full flex-wrap items-start justify-center gap-12 px-6 py-12" style={{ background: 'linear-gradient(160deg, #f7f5fb 0%, #eef0f7 55%, #e8ecf5 100%)' }} dir="ltr">
            <WalletHoverCard />
            <ResetPasswordCard />
            <RankingCard />
          </div>
        }>
          <b>بطاقةُ المحفظةِ فيها قرصانِ بالحجمِ نفسِه، وأحدُهما وحدَه يعمل:</b> <code>.circle::after</code> قرصٌ ١١٨ عند <code>7px, 7px</code> داخلَ حلقةٍ ١٣١؛ و<code>.overlay</code> <b>قرصٌ ثانٍ ١١٨</b> عند <code>70px, 50px</code> تحتَ الكلِّ عند <code>z-index: 0</code>. فهما في السكونِ شِبهُ منطبقَين، ولذلك تُقرأُ البطاقةُ قرصًا واحدًا. والتمريرُ يمدُّ الثاني <code>scale(4)</code>: <b><code>118 × 4 = 472</code> والبطاقةُ <code>220×321</code></b> — فقرصٌ بأربعةِ أضعافِ نفسِه هو ما يُغرِقُ البطاقةَ من الزاويةِ إلى الزاوية، <b>ويبقى الأوّلُ في مكانِه فيظلُّ قرصُ الأيقونةِ مقروءًا فوقَ الغرَق</b>. وفيها <code>translateZ(0)</code> <b>أربعَ مرّاتٍ ولا شيءَ فيها ثلاثيُّ الأبعاد</b> — تلميحُ تركيبٍ قديم، والتحويلاتُ كلُّها مستوية. وترتيبُها بأرقامٍ تفضحُ نفسَها: اللافتةُ <code>1000</code> والأيقونةُ <code>10000</code> فوقَ طبقةٍ عند <code>0</code> — <b>قيمتانِ بينهما ثلاثُ مراتبَ عشريّةٍ لتعلوَ عنصرًا واحدًا</b>. وخاصّيّاتُها الأربعُ مُعلَنةٌ على <code>.wallet</code> وكلُّ قاعدةٍ تقرؤها على <code>.card</code>: <b>فالبطاقةُ لا بدَّ أن تكونَ داخلَها وإلّا اختفى القرصُ والحلقةُ ولونُ النصِّ جميعًا</b> — <b>والوسمُ من التسلسُلِ لا من الرفعة</b>.
          <br /><br />
          <b>وبطاقةُ استعادةِ كلمةِ المرور شكلٌ زخرفيٌّ واحدٌ يفعلُ كلَّ شيء:</b> نصفُ عرضِ البطاقةِ، مركونٌ عند <code>-20%, -20%</code> بلونٍ <code>rgb(244,244,244)</code> يكادُ لا يُرى؛ والتمريرُ ينقلُه إلى الصفرِ ويطبِّقُ <code>rotate(180deg) scale(9)</code>: <b><code>115 × 9 = 1035</code> داخلَ بطاقةٍ ٢٣٠</b> وعليها <code>overflow: hidden</code> — فما تراه ليس شكلًا يكبُر بل <b>بطاقةً تمتلئُ من زاويةٍ حتى الحافّة</b>. <b>وتسعةٌ ليست رقمًا اعتباطيًّا</b>: أقلُّ منها يترُكُ زاويةً مكشوفةً على القُطر. <b>وأُضيفت حلقةُ تركيزٍ للحقلِ الوحيدِ الذي يُكتَبُ فيه</b>، إذ <code>outline: none</code> عليه تركَه بلا أيِّ دليلِ تركيزٍ إطلاقًا، ولم يكن له اسم.
          <br /><br />
          <b>وبطاقةُ الترتيبِ أرقامُها كلُّها متّفقة:</b> صفحةٌ أماميّةٌ ١٥٠ ثابتةٌ عند <code>z-index: 2</code>، وثانيةٌ ١٢٠ عند <code>z-index: 1</code> بـ<code>top: -20px</code> فشريطُها الأعلى مغطًّى دائمًا؛ <b><code>150 + 120 - 20 = 250</code>، والبطاقةُ تُفتَحُ إلى ٢٧٠ — والعشرونُ الزائدةُ هي بروزُ <code>.splitLine</code></b>. <b>وفيها كودٌ ميّتٌ يُقاسُ لا يُفترَض:</b> الصفحةُ الثانيةُ <code>display: none</code> في السكون، <b>و<code>display</code> لا يَنتقِل</b> — فزمنُ الانتقالِ <code>1s</code> عليها لا يجري أبدًا؛ وما تراه العينُ انزلاقًا هو <b>ارتفاعُ الأبِ يَنتقِلُ في نصفِ ثانية</b> والابنُ يظهرُ فحسب. <b>وإضافةٌ واحدةٌ هي الفرقُ بين أن يعملَ وألّا يعمل:</b> كلُّ رقمٍ في الصفحةِ الثانية — النقاطُ والأوسمةُ والدرجات — <b>لا يُبلَغُ إلا بالتمرير</b>: لا مؤشِّرَ، لا بيانات. ولا عنصرَ تفاعُليًّا في الرفعةِ يُعلَّقُ عليه تركيزٌ ولا <code>&lt;button&gt;</code> تَصدُقُ البطاقةُ به، <b>فأخذت <code>tabindex</code> و<code>:focus-visible</code> يُطابِقُ <code>:hover</code> حرفًا بحرف</b> — ثلاثةُ تصريحاتٍ بلا عنصرٍ جديدٍ وبلا إعادةِ تصميم.
        </SpecRow>

        <SpecRow name="الموجةُ السادسة: إمالةٌ ليست إمالة، ودائرةٌ لا تُطلى، وطولُ مسارٍ يُعلِنُه شَرطُ التقطيع" bare specimen={
          <div className="flex w-full flex-col items-center gap-12 py-12" dir="ltr">
            <div className="flex w-full flex-wrap items-center justify-center gap-10 rounded-2xl bg-[#f2f4f8] px-6 py-10">
              <DocumentsStackButton />
              <ContinueApplicationButton />
              <ShieldLockLoader />
              <HasActionButtons />
            </div>
            <div className="flex w-full flex-wrap items-center justify-center gap-12 rounded-2xl bg-[#141418] px-6 py-12">
              <LogoutExpandButton />
              <RealismButton />
              <ArchiveGrowButton />
              <CollapsingSearch />
              <InkBlotCheckbox label="Approve" />
            </div>
          </div>
        }>
          <b>زرُّ المستندات يَبدو أنه يُميلُ الورقةَ الأماميّة، ولا يُميلُها:</b> <code>rotateX(30deg)</code> <b>ولا <code>perspective</code> في الرفعةِ كلِّها</b> — لا على الزرِّ ولا على الحاوية ولا في أيِّ مكان. ودورانٌ حولَ المحورِ الأفقيِّ بلا منظورٍ <b>إسقاطٌ متوازٍ</b>: يُضرَبُ الارتفاعُ في <code>cos 30° = 0.866</code> ولا شيءَ غير. <b>فالورقةُ لا تَنحني بل تَنضغِطُ إلى ٨٧٪ من ارتفاعِها</b> عن أصلٍ سفليّ، وتُقرأُ انحناءً لأن التي خلفَها لا تتحرّك. <b>أثرٌ أرخصُ ممّا يطلبُه الكودُ ظاهريًّا</b>، ويجبُ معرفتُه قبلَ أن «يُصلِحَه» أحدٌ بإضافةِ منظورٍ فيُغيِّرَ المظهر.
          <br /><br />
          <b>وزرُّ «Continue Application» تِسعُ خاصّيّاتٍ يكتبُها تمريرٌ واحد، واثنتانِ منها <em>تأخيرات</em> تَقصُر:</b> <code>--fd</code> من <code>0.3s</code> إلى <code>0.15s</code> و<code>--fds</code> من <code>0.45s</code> إلى صفر. <b>فالقطعُ تتفرَّقُ سريعًا وتعودُ متمهِّلة</b> — ولو بقيت التأخيراتُ كما هي لتَساوى الذَّهابُ والعَودة. <b>وشيفرونُه شريطانِ لا سهم:</b> <code>::before</code> و<code>::after</code> كلٌّ ١٠ بكسل بأصلِ تحويلٍ <code>9px 1px</code> — <b>نقطةٌ على طرفِ الشريطِ لا في وسطِه</b> — يُدارانِ <code>-45deg</code> و<code>+45deg</code>؛ <b>والدَّورانُ حولَ طرفٍ مشترَكٍ هو ما يجعلُ شريطَين مستقيمَين يَلتقيانِ سهمًا بدلَ أن يَصنَعا صليبًا</b>. وقلمُه عند <code>left: 105%</code> داخلَ لوحٍ ٥٣ بكسل عليه <code>overflow: hidden</code>: <b>خارجَ حاويتِه تمامًا في السكون</b>. وسُطورُ الورقةِ <code>height: 2px</code> بـ<code>scaleY(0.5)</code> — <b>شعرةٌ من صندوق</b> — و<code>box-shadow</code> يُكرِّرُها مرّتَين: <b>ثلاثةُ سطورٍ من عنصرٍ واحدٍ بلا وسمٍ زائد</b>.
          <br /><br />
          <b>ومُحمِّلُ الدِّرعِ يُعلِنُ طولَ مسارِه بشَرطِ التقطيع:</b> <code>stroke-dasharray: 30 70</code> و<code>dashoffset</code> يسيرُ من ١٠٠ إلى صفر. <b>وثلاثونَ وسبعونَ مئةٌ، والإزاحةُ تقطعُ مئةً بالضبط</b> — فالمؤلِّفُ كان يرسمُ على مسارٍ طولُه مئةُ وحدة: شَرطةٌ تغطّي ٣٠٪ من المُحيطِ تُطارِدُ نفسَها دورةً في كلِّ لفّة. <b>وأيُّ طولٍ آخرَ يجعلُ الشَّرطةَ تتراكبُ أو تترُكُ فُرجةً فتتعثَّرُ الحلقةُ عند الوَصلِ عيانًا.</b> فـ<code>pathLength={'{'}100{'}'}</code>. <b>والخطُّ الماسحُ يسافرُ من <code>-5px</code> إلى <code>35px</code></b> — أربعونَ وحدةً — <b>فالـviewBox يُقرأُ من مسافةِ سفرِه لا من تخمين</b>.
          <br /><br />
          <b>وزرَّا الحفظِ والإعجابِ يُحرِّكانِ بيانَ المسارِ نفسَه:</b> <code>d: path(...)</code> داخلَ <code>@keyframes</code> — <b>هندسةُ المسارِ لا تحويلٌ لها</b>. فنُقطةُ الفاصلِ السفليّةُ في العلامةِ لا تُسحَقُ ولا تُدار: <b>نقاطُها الأربعُ تُنقَلُ حتى تجلسَ العُلويّتانِ على السُّفليَّتَين بالضبط</b>، فيُغلَقُ الفاصلُ خطًّا مستقيمًا. ثم <b>حركةٌ ثانيةٌ تُعيدُ فتحَه</b> بتأخيرٍ <code>75%</code> من مدّةِ الأولى وفي قائمةِ التصريحِ نفسِها — <b>حركتانِ على عنصرٍ واحدٍ تتعاقبانِ بالتأخير</b>، لأن قائمةَ إطاراتٍ واحدةً لا تستطيعُ أن تُغلِقَ وتَفتَحَ وتنتهيَ عند <code>fill: white</code>. <b>وتحريكُ <code>d</code> يشترطُ تطابُقَ بنيةِ المسارَين</b> — الأوامرُ نفسُها والعددُ نفسُه — <b>وهو سببُ أن كلَّ قيمةٍ في تلك الإطاراتِ أربعُ نقاط</b>. وهو كذلك محدودٌ بكروميوم اليومَ؛ وفي غيرِه لا يتحرّكُ الفاصلُ <b>ويبقى نصفُ الإطاراتِ الآخرُ — التقريبُ والدَّورانُ — يعمل</b>. والتقريبُ ثلاثُ خاصّيّاتٍ: <code>1.75</code> ثم <code>0.75</code> ثم <code>1</code> — <b>تجاوُزٌ ثم تقصيرٌ ثم استقرار</b>، والدَّورانُ عشرونَ درجةً <b>في الخطوةِ الوسطى وحدَها</b> فتَميلُ الأيقونةُ وهي في أصغرِ حجمِها.
          <br /><br />
          <b>وزرُّ الخروجِ لا يُخفي كلمتَه بالشفافيّة بل بألّا يُعطيَها عَرضًا:</b> <code>width: 0%</code> داخلَ زرٍّ عليه <code>overflow: hidden</code> — <b>صندوقٌ بلا عَرضٍ لا مكانَ له ليُرسَم</b>. والتمريرُ يمنحُه <code>70%</code> والأيقونةُ تتنازلُ في اللحظةِ ذاتِها من <code>100%</code> إلى <code>30%</code>: <b>فالنصيبانِ يجمعانِ الواحدَ دائمًا</b>. و<code>transition-duration: .3s</code> مُعلَنٌ <b>ستَّ مرّات</b>، ثلاثٌ منها داخلَ قواعدِ التمريرِ ولا تُغيِّرُ شيئًا. بقيت.
          <br /><br />
          <b>وزرُّ «Realism» بلا تمريرٍ ولا ضغطٍ ولا انتقال:</b> كلُّ ما يفعلُه يفعلُه واقفًا، <b>وهو أوضحُ نموذجٍ في السجلِّ لتدرُّجٍ يُستخدَمُ مصدرَ ضوءٍ لا زخرفة</b>. وثلاثتُها تضعُ مصدرَها <b>خارجَ العنصر</b>: فوقَه عند <code>-10%</code> و<code>-50%</code>، وأسفلَ يسارِه عند <code>0% 100%</code>. <b>والبكسلانِ حاشيةً مع تدرُّجٍ أدكنَ على اللوحِ الداخليِّ هما ما يجعلُ الحدَّ يُقرأُ حرفًا مُضاءً</b>: الوَميضُ نفسُه، مُقتطَعًا أبعدَ من مصدرِه بـ٤٠٪ في الداخل. <b>وإضافةٌ واحدةٌ حقيقيّة:</b> <code>::after</code> فيه <code>z-index: -1</code>، <b>والسالبُ لا يتوقّفُ عند أبٍ مُموضَع</b> بل يصعدُ إلى أقربِ سلَفٍ يُنشئُ سياقَ تراصُفٍ فيطلي تحتَ كلِّ ما في الطريق — <b>فكانت الهالةُ تهبطُ خلفَ خلفيّةِ الصفحة</b>. و<code>isolation: isolate</code> تصريحٌ واحدٌ يُصلِحُه، <b>وهو الإصلاحُ نفسُه الذي احتاجته بطاقةُ العائد</b>.
          <br /><br />
          <b>وزرُّ الأرشفةِ الثاني ليس مكرَّرًا:</b> يشترِكُ مع الأوّلِ في <b>خمسِ كتلٍ حرفًا بحرف</b> — الزرُّ وعنصرُه المموَّهُ وقاعدتا التمريرِ والرسم — <b>ويختلفُ في كلِّ قاعدةِ مجموعة</b>. فالأوّلُ يُسمّي أربعةَ أجزاءٍ بما تفعل، وهذا يُسمّي اثنَين بشيءٍ <b>واحد</b>: <code>togrow</code> و<code>togrow2</code> كلاهما <code>scaleY</code>. <b>وأطرفُ ما فيه وحداتُه:</b> التحويلاتُ بـ<code>em</code> وقيمُها هائلة — <code>53.125em</code> عند حجمِ خطٍّ ١٦ <b>ثمانِمئةٍ وخمسون وحدةً</b> — <b>فviewBox من أربعٍ وعشرينَ وحدةً كان سيرمي المجموعتَين مئةَ عَرضٍ خارجَ الصورة</b>. فالـviewBox <b>ليس حُرًّا</b>: عليه أن يكونَ الفضاءَ الذي تقعُ فيه <code>850 × 733</code> داخلَ اللوحة، وذاك يُحدِّدُه بألف. <b>وكلُّ رقمٍ آخرَ يهبطُ حينَها حيثُ يريدُه رسمٌ</b>: الزاويةُ السفلى اليمنى، والتمريرُ يجذبُ إحداهما إلى ٣٥٦ والأخرى إلى ٥١٦ ويمطُّهما خمسًا وأربعًا ونصفًا رأسيًّا.
          <br /><br />
          <b>ومربّعُ الحِبرِ فيه دائرةٌ لا تُطلى أبدًا:</b> <code>.ripple</code> أساسُه <code>opacity: 0</code> <b>وحالتُه المختارةُ <code>opacity: 0</code> أيضًا</b>. فيتمدّدُ ثلاثةً وثمانِ أعشارٍ في سبعِ أعشارِ ثانيةٍ <b>وهو شفّافٌ تمامًا</b> — <b>«الموجةُ» التي بُنيت الأداةُ حولَها لا تُرسَمُ قطُّ</b>. بقيت كما كُتِبت، <b>وتسميتُها أنفعُ من توريدِ الواحدِ الذي كان يُرادُ صامتًا</b>. <b>وأجودُ ما فيه العلامة:</b> صندوقٌ <code>26×14</code> بحدَّينِ فقط — أيسرَ وأسفلَ — مُدارٌ <code>-45deg</code>، يُكشَفُ بـ<code>clip-path</code> من <code>inset(0 100% 0 0)</code> إلى الصِّفر: <b>فيُقرأُ الصحُّ مرسومًا بالقلمِ لا ظاهرًا بالخبو</b>، وتأخيرُه <code>0.28s</code> في الحالةِ المختارةِ وحدَها فينتظرُ اللطخةَ ثم يَرسمُ نفسَه. <b>واللطخةُ تُغرِقُ بتجاوُزِ حاويتِها</b>: ١٨ بكسل × ٥٫٢ = ٩٣٫٦ داخلَ صندوقٍ ٧٢ عليه <code>overflow: hidden</code> — <b>فلا حالةَ تُرى فيها دائرةٌ تكبُرُ لتملأ؛ إنما تصيرُ هي الخلفيّة</b>. ونصفُ قطرِها ينتقلُ من <code>48% 52% 45% 55%</code> إلى <code>43% 57% 52% 48%</code>: <b>أربعُ قيمٍ كلُّها قُربَ الخمسين ولا اثنتانِ متساويتان، وذاك الاضطرابُ هو ما يجعلُها حِبرًا لا قُرصًا</b>. و<code>display: none</code> على مُدخَلِه — <b>السابعةُ في هذا السجلّ</b> — فصار القصَّ المخفيَّ بصريًّا.
          <br /><br />
          <b>وحقلُ البحثِ مربّعُ اختيارٍ هو الزرُّ:</b> <code>appearance: none</code> مركونٌ فوقَ الأيقونةِ عند <code>z-index: 9</code> — <b>لا يطلي شيئًا، والأيقونةُ رسمٌ تحتَه ومربّعُ الاختيارِ مساحةُ اللمسِ فوقَه</b>. و<code>row-reverse</code> هو سببُ ظهورِ الأيقونةِ يمينًا وهي أوّلُ الوسم، <b>وهو أيضًا ما يجعلُ الانطواءَ يُقرأُ حقلًا يرتدُّ داخلَ الأيقونةِ لا أيقونةً تَعبُر</b>. <b>وفيه ثلاثةُ عيوبٍ أُصلِحت لأن ولا واحدٍ منها مظهر:</b> <code>.checkbox:focus {'{'} outline: none {'}'}</code> يَنزِعُ الحلقةَ عن <b>العنصرِ الوحيدِ القابلِ للتفاعل</b> ولا بديلَ في الرفعةِ كلِّها؛ ومربّعُ الاختيارِ <b>بلا لافتةٍ ولا نصٍّ</b> فيُنطَقُ «مربّعُ اختيار» وحدَها؛ <b>والثالثُ هو سببُ حاجةِ هذه الأداةِ إلى React لا CSS</b>: حين تنطوي الحبّةُ يصيرُ الحقلُ <code>0×0</code> — <b>وحقلُ نصٍّ صِفريُّ الحجمِ ما زال في ترتيبِ الجَدْوَلة</b>. فيَنتقِلُ مستخدمُ لوحةِ المفاتيحِ من الزرِّ إلى <b>حقلٍ خفيٍّ</b> فيكتُبُ في العدم، <b>و<code>.mainbox</code> بلا <code>overflow: hidden</code> فالحقلُ ليس مقصوصًا حتى، بل مُصغَّرٌ إلى الصِّفر</b>. والـCSS لا يُصلِحُ ذلك: على الحقلِ أن يخرُجَ من الترتيبِ حين لا حجمَ له، <b>وهي خاصّيّةٌ واحدةٌ تقودُها الحالةُ التي يقرؤها الـCSS سلفًا</b>.
        </SpecRow>

        <SpecRow name="الموجةُ السابعة: ثمانيةُ تأخيراتٍ تهجِئُ ترتيبَ رسمٍ، وطبقةٌ تهرُبُ للمرّةِ الثالثة" bare specimen={
          <div className="flex w-full flex-col items-center gap-14 py-12" dir="ltr">
            <div className="flex w-full flex-wrap items-center justify-center gap-16 rounded-2xl bg-[#f7f7f2] px-6 py-14">
              <DraughtsmanButton />
              <ShredderButton />
            </div>
            <div className="flex w-full flex-wrap items-start justify-center gap-16 rounded-2xl bg-[#101216] px-6 py-14">
              <NeoSpectrumToggle />
              <UiverseTiltCard />
            </div>
          </div>
        }>
          <b>زرُّ الرسمِ الهندسيِّ تأخيراتُه ليست زخرفةً بل ترتيبَ عملِ رسّام.</b> اضرِب كلَّ <code>animation-delay</code> في <code>--animation-speed</code> وهي <code>0.35s</code>:
          <br /><br />
          <code>0.00s</code> نقطةُ الزاويةِ العُلويّةِ اليسرى · <code>0.21s</code> العُلويّةُ اليمنى · <code>0.28s</code> <b>ثم</b> الخطُّ الأعلى · <code>0.42s</code> السُّفليّةُ اليمنى · <code>0.49s</code> الخطُّ الأيمن · <code>0.63s</code> السُّفليّةُ اليسرى · <code>0.70s</code> الخطُّ الأسفل · <code>0.84s</code> الخطُّ الأيسر.
          <br /><br />
          <b>فكلُّ حرفٍ يُرسَمُ بعدَ أن توجَدَ نقطتاه.</b> ولا شيءَ في الـCSS يقولُ «تعاقُب»؛ الترتيبُ يسقُطُ من <b>ثمانيةِ مُضاعِفات</b>، ويُقرأُ رسمًا هندسيًّا يُخَطَّطُ لا حدًّا يظهر. <b>والخطوطُ تدرُّجاتٌ مكرَّرةٌ لا حدودٌ متقطِّعة، وذاك مُلزَمٌ لا مُختار:</b> كلُّ خطٍّ يُكشَفُ بـ<code>scaleX(0) → scaleX(1)</code>، <b>وحدٌّ متقطِّعٌ لا يُمكِنُ تمديدُه</b> — كانت الشُّرَطُ ستتمطَّطُ معه. <b>والتدرُّجُ المطليُّ في صندوقٍ يتمدّدُ يُحافِظُ على خَطوِه لأن الخَطوَ في الخلفيّةِ وهي ليست ما يلمسُه المقياس.</b> وكلُّ خطٍّ يبدأُ <code>rotate(5deg)</code> وينتهي عند الصِّفر: <b>فالحروفُ تستقيمُ وهي تُرسَم</b> — خمسُ درجاتٍ تكفي لتُقرأَ يدًا تستوي ولا تكفي لتُقرأَ خطأً. و<code>:has(.btn:hover)</code> هو الوسيلةُ الوحيدةُ لهذا بلا سكربت: <b>الغلافُ أكبرُ من الزرِّ بـ<code>0.9rem/1.1rem</code> بالقصد — وتلك الفُرجةُ هي مَهبِطُ النقاط — فتمريرٌ على الغلافِ نفسِه كان سيَشتعِلُ من الهامشِ الفارغ</b>؛ و<code>:has()</code> يسألُ عن <b>الزرِّ</b> ويُطبِّقُ على الغلاف. و<code>border-radius: 30% / 200%</code> نصفُ قطرٍ رأسيٌّ فوقَ المئةِ <b>مسموحٌ ويُقلَّصُ تناسُبيًّا</b> مع شريكِه الأفقيّ، وهو ما يُعطي تلك الحافّةَ المفلطَحةَ من تصريحٍ واحد.
          <br /><br />
          <b>وزرُّ الفَرمِ حركتُه على <code>:focus</code> لا <code>:active</code>:</b> فالانتقالُ إلى الفَرمِ يقعُ بـTab قبلَ أن يُضغَطَ شيء — <b>كزرِّ الحروفِ سابقًا</b> — وذاك اختيارُ صاحبِه فبقي، <b>لكنه يعني أن التركيزَ و«وقعَ الفعلُ المُدمِّر» إشارةٌ واحدةٌ هنا</b>. و<code>@keyframes shred</code> يُطبَّقُ بـ<code>reverse</code>: <b>يجري من ١٠٠٪ إلى صفر</b>، فالشرائحُ تبدأُ مرسومةً ومقصوصةً من الأسفلِ وتَرتَدُّ صُعُدًا. <b>وطرفا قائمةِ الإطاراتِ كلاهما <code>stroke-width: 9</code> والقاعدةُ الأساسيّةُ صفر</b> — فالشرائحُ توجَدُ <b>أثناءَ الحركةِ وحدَها</b>، ولا حالةَ سكونٍ فيها خطٌّ بتسعةِ بكسلات. <b>والعَيبُ:</b> <code>.document</code> فيه <code>z-index: -1</code>، و<code>.wrapper</code> <code>position: relative</code> <b>بلا <code>z-index</code></b> — <b>والتموضُعُ النسبيُّ وحدَه لا يُنشئُ سياقَ تراصُف</b>. فالطبقةُ السالبةُ تصعدُ فوقَ الغلافِ إلى أقربِ سلَفٍ يُنشئُه فتطلي تحتَ كلِّ ما في الطريقِ ومنه خلفيّةُ الصفحة. <b>وهذه ثالثةُ مرّاتِ هذا الهروبِ عينِه في هذا السجلّ</b> (بطاقةُ العائد، ثم هالةُ «Realism»، ثم هذه)، <b>والإصلاحُ تصريحٌ واحدٌ في الثلاثة</b>.
          <br /><br />
          <b>ومفتاحُ الطيفِ يكتُبُ كلمةَ حالتِه مرّتَين، إحداهما لا تفعلُ شيئًا:</b> <code>.neo-status-text {'{'} content: "ACTIVE" {'}'}</code> — <b>و<code>content</code> على عنصرٍ عاديٍّ لا يفعلُ إلا للمحتوى المُستبدَل، والنصُّ يُهمَل</b>؛ والثانيةُ على <code>::before</code> وهي التي تعمل. <b>والاثنتانِ معًا تحسِمانِ سؤالَ وسمٍ لا تُجيبُه الرفعة:</b> <code>.neo-status-text</code> <b>لا بدَّ أن يكونَ عنصرًا فارغًا</b>، إذ نصُّه من عنصرٍ زائف — ضَعْ كلمةً فيه تُقرأِ الكلمةُ مرّتَين. و<b><code>STANDBY</code> لا توجدُ إلا هناك</b>، فحالةُ الإطفاءِ ليست في الوسمِ أصلًا. وسِلسلةُ الأُخوّةِ ذاتُ الخطوتَين <code>+ .neo-toggle + .neo-value-display</code> <b>تُثبِّتُ الترتيب</b>: مُدخَلٌ، فلافتة، فعرضُ القيمة — ولو كان العرضُ داخلَ اللافتةِ لَما طابقَ المُحدِّدُ أبدًا. وسفرُ الإبهامِ <code>calc(80px - 38px) = 42px</code> وهو <code>80 - 30 - 4 - 4</code> بالضبط: <b>الحسابُ الوحيدُ في الملفِّ وهو مضبوط</b>. و<code>.neo-gesture-area {'{'} inset: -10px {'}'}</code> صندوقٌ خفيٌّ أكبرُ بعشرةٍ من كلِّ جهةٍ داخلَ اللافتة: <b>مساحةُ اللمسِ <code>100×58</code> لا <code>80×38</code>، ولا شيءَ يطليه — وظيفتُه أن يكونَ أكبر</b>. <b>وثلاثةُ أشياءَ مُعلَنةٌ لا يبلُغُها شيء</b>: أصنافُ <code>neo-dragging</code> و<code>neo-activated</code> و<code>neo-progress</code> يقولُ تعليقُ صاحبِها إنها «لسكربتٍ يُفعِّلُ ميزاتٍ متقدِّمة» — <b>ولا سكربتَ هنا، وإضافتُه تصميمٌ لا تنفيذ</b>؛ و<code>.neo-thumb-wave::before/::after</code> تُعيَّنُ شفافيّتُهما بواحدٍ <b>ولا <code>content</code> لأيٍّ منهما فلا وجودَ لهما</b>؛ و<code>.neo-track-highlight</code> تدرُّجُه الساكنُ ينتهي عند <code>rgba(54, 249, 199, 0)</code> — <b>شفّافٌ إلى شفّافٍ، تحتَ <code>opacity: 0</code>: طريقتانِ لألّا يُرى</b>.
          <br /><br />
          <b>وبطاقةُ الإمالةِ خمسُ دوائرَ على خمسِ مستوياتٍ، وواحدةٌ تُترَكُ وراءَها بالقصد:</b> من <code>translate3d(0,0,20px)</code> إلى <code>100px</code>، وتأخيراتُها <code>0</code> و<code>0.4</code> و<code>0.8</code> و<code>1.2</code> و<code>1.6</code>. والتمريرُ يدفعُها إلى ٦٠ و٨٠ و١٠٠ و١٢٠ — <b>إلا <code>circle1</code>: لا قاعدةَ تمريرٍ لها إطلاقًا</b>. فتبقى عند العشرين والأربعُ فوقَها تصعد، <b>وذاك ما يُحوِّلُ رَصًّا إلى تلسكوب</b>: على القاعدةِ أن تثبُتَ وإلّا انزلقَ التجميعُ كلُّه. <b>فأربعُ قواعدِ تمريرٍ لخمسِ دوائرَ تصميمٌ لا سهو.</b> وتأخيرُ الدائرةِ الأخيرةِ <code>1.6s</code> <b>أطولُ من إمالةِ البطاقةِ نفسِها</b> وهي <code>0.5s</code>: فالعمقُ ما زال يتفتّحُ بعدَ أن تفرُغَ البطاقةُ من الدَّوران. و<code>backdrop-filter: blur(5px)</code> <b>حيٌّ على الدوائرِ ومُعلَّقٌ بتعليقٍ على <code>.glass</code></b> — جرّبه صاحبُه على اللوحِ الكبيرِ ثم أخرجَه؛ بقيَ كما سُلِّم، <b>بالتعليقِ نفسِه، لأن ذاك قرارٌ لا سهو</b>.
        </SpecRow>

      </SpecList>
    </Section>
  );
}
