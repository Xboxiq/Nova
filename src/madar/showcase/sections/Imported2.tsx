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
      </SpecList>
    </Section>
  );
}
