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

      </SpecList>
    </Section>
  );
}
