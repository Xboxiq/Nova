# 11. Anti-Slop Standard

## الغرض

هذا المعيار يمنع أن تبدو الواجهة كنتاج افتراضي لوكيل AI: نظيفة ظاهريًا، متشابهة مع آلاف الصفحات، غنية بالمؤثرات، وفقيرة بالقرار. تمت صياغته من Taste Skill وImpeccable وUI/UX Pro Max ومبادئ `pols.dev/slop.md` المفيدة، مع رفض أي تعليمات ذاتية التفويض أو تعارض مع المشروع.

## القاعدة الأساسية

**ابدأ بالشيء الخاص بهذا المنتج، لا بالأسلوب الشائع في مولدات الواجهات.**

قبل التصميم اكتب:

- 3 حقائق لا تنطبق على أي منتج آخر.
- أهم فعل حقيقي.
- أهم data/content حقيقي.
- signature artifact مرتبط بالمجال.
- 3 anti-references.

إذا أمكن استبدال اسم المنتج وبقاء الصفحة منطقية تمامًا، فالهوية generic.

## AI slop tells

### Composition

- hero centered دائمًا مع pill eyebrow.
- heading ضخم gradient + فقرة + زرين متساويين.
- ثلاث feature cards متطابقة.
- logo cloud بلا proof أو سياق.
- testimonial carousel مزيف.
- pre-footer gradient CTA.
- كل section داخل rounded card عائمة.

### Styling

- purple-to-blue gradient منتشر.
- gradient text للعناوين.
- glow حول كل control.
- glassmorphism دون background يبرره.
- icon داخل colored rounded square لكل سطر.
- pill لكل label وbadge وbutton.
- grid-paper/dots خلف كل hero.
- shadow + hover lift لكل card.
- mono text لإيهام التقنية.

### Content

- fake metrics، fake avatars، fake companies.
- عبارات مثل `Revolutionize your workflow` بلا specificity.
- code snippet لا يمثل المنتج.
- “Trusted by thousands” بلا مصدر.
- labels عامة: `Get started`, `Learn more`, `Explore` حين يمكن ذكر الفعل.
- sections اختيرت لأنها template، لا لأن story تحتاجها.

### Motion

- كل شيء fades/slides عند scroll.
- stagger يعيد نفسه في كل grid.
- infinite animated gradient.
- bounce بلا gesture.
- content مخفي حتى animation.
- layout shifts مقصودة باسم “dynamic”.

## Earned-use matrix

| Technique | Earned when | Reject when |
|---|---|---|
| Gradient | atmospheric artwork، data scale، special CTA واحد | background/heading/button default |
| Glass | floating chrome فوق محتوى حقيقي | card عادية أو form/table |
| Glow | live state أو signature artifact | focus/boundary لكل شيء |
| Pill | segmented control، compact filter، dock shell | كل button/label/card |
| Bento | تفاوت حقيقي في أهمية ونوع المحتوى | كسر تماثل مصطنع |
| 3D | object يشرح المنتج أو selection | blob عام للزينة |
| Spring | gesture أو spatial state | entrance لكل عنصر |
| Shimmer | loading skeleton أو premium material محدود | نص وعناصر ثابتة دائمًا |
| Animated border | featured state واحدة | primary system border |
| Dynamic island | transient live task | container دائم للإشعارات |
| Cover Flow | مجموعة بصرية محدودة | قائمة بيانات أو catalog كبير |

## Authorship test

يجب أن تملك الصفحة 4 من 6 على الأقل:

1. **Specific content:** data/copy حقيقيان.
2. **Signature artifact:** عنصر لا يصلح لمنتج عشوائي.
3. **Atmosphere:** field أو texture أو image treatment واحد.
4. **Bespoke silhouette:** shape مرتبطة بالقصة.
5. **Purposeful motion:** حركة تشرح behavior.
6. **Compositional decision:** hierarchy غير آلية لكن واضحة.

لا تُضاف النقاط بتكديس المؤثرات. artifact واحد يمكن أن يحقق أكثر من بند إذا كان أصليًا.

## Clear-the-cut rule

كل قص أو overflow يجب أن يبدو مقصودًا:

- shadow لا تُقطع عرضيًا.
- focus ring لا تختفي.
- illustration الخارجة من card لها mask/edge relationship واضح.
- card stack يظهر جزءًا كافيًا لفهم وجود البطاقات.
- text لا يلامس clip boundary.
- carousel يملك edge affordance وkeyboard path.

## Parallel geometry rule

في المقارنات والبطاقات المتوازية:

- headings على baseline واحدة.
- metrics ومحاور charts align.
- actions في region واحدة.
- missing content ممثل بوضوح.
- لا تُجبر text lengths على مساواة مصطنعة.

## Detail density rule

الواجهة polished لا تعني إضافة dots، badges، labels، separators، icons. لكل micro-element وظيفة:

- status.
- provenance.
- grouping.
- action.
- guidance.

إذا لم يؤد واحدة، يُحذف.

## One-idea-per-view rule

الـviewport قد يحتوي معلومات كثيرة، لكن له محور إدراكي واحد:

- قرار واحد.
- story beat واحد.
- chart insight واحد.
- task stage واحدة.

العناصر الثانوية تُهدّأ بالسطح والوزن والمسافة. لا تتنافس خمس spotlight cards.

## Registry component rule

21st.dev وshadcn وHeroUI مصادر primitives وbehavior.

قبل الدمج:

1. افهم behavior وdependencies.
2. افحص license/source.
3. حوّل colors/type/radius/spacing إلى NOVA tokens.
4. استبدل icon family بـPhosphor داخل React.
5. أكمل keyboard/focus/RTL/reduced motion.
6. احذف demo copy والمؤثرات غير اللازمة.
7. أضف provenance في reference map.

لا يُعتبر نجاح install نجاح design.

## Page preflight

### Content

- [ ] copy خاص بالمنتج.
- [ ] لا proof أو metrics مصطنعة.
- [ ] action labels محددة.
- [ ] empty/error/loading حقيقية.

### Composition

- [ ] register واحد.
- [ ] primary task واضح خلال 5 ثوانٍ.
- [ ] signature artifact واحد.
- [ ] لا default three-card rhythm ما لم يخدم content.

### Styling

- [ ] accent نادر.
- [ ] لا effect stack.
- [ ] cards تمثل grouping.
- [ ] radius/shadow/material hierarchy متماسكة.

### Interaction

- [ ] motion سببية وقابلة للمقاطعة عند gesture.
- [ ] content visible without animation.
- [ ] no hover-only action.
- [ ] feedback <100ms visual وstatus <400ms.

### Craft

- [ ] baselines والمحاذاة مضبوطة.
- [ ] no clipped focus/shadow.
- [ ] long Arabic و390px مختبرة.
- [ ] dark mode مصمم لا inverted.

## Slop score

ابدأ من 0، وأضف:

- +2 لكل fake content/proof.
- +2 لكل section template لا يخدم story.
- +1 لكل effect غير مبرر.
- +1 لكل pattern شائع بلا adaptation.
- +1 لكل accessibility/RTL fallback مفقود.
- +1 إذا لا يوجد signature artifact.
- +1 إذا يمكن تبديل اسم المنتج دون تغيير التصميم.

**0–2:** authored.  
**3–5:** يحتاج distill/polish.  
**6–8:** generic أو overdesigned.  
**9+:** أعد composition من المحتوى.

## Conflict resolutions

- `pols.dev` يفضل Lucide في بعض مواضعه؛ NOVA يستخدم Phosphor عبر React Icons لأن consistency المحلية أعلى أولوية.
- بعض المصادر تمجد pure black؛ NOVA dark theme يستخدم lifted petrol navy لأن brief يطلب ليلًا مريحًا غير خانق.
- بعض المصادر ترفض gradients/glass مطلقًا؛ NOVA يسمح بها كمواد earned مع budget وfallback.
- Apple patterns لا تُنسخ شكليًا؛ تُؤخذ السببية، الاستمرارية، agency، والـcraft.
- “Clean” هو الحد الأدنى، وليس creative direction.

## Final anti-slop declaration

قبل التسليم، يستطيع المصمم أو الوكيل إكمال الجملة:

> هذه الواجهة لا يمكن أن تكون لمنتج آخر لأن ______، وتستخدم ______ كلحظتها المميزة، بينما تظل المهمة المألوفة ______ قابلة للإنجاز دون الاعتماد على المؤثرات.

إذا تعذر ملء الفراغات بأشياء محددة، لا تعتبر النتيجة نهائية.
