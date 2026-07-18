# 06. Components and States

## Component contract

كل مكوّن production-ready يحدد:

- purpose وnon-goals.
- anatomy وslots.
- variants وsizes.
- controlled/uncontrolled API إن لزم.
- keyboard/touch behavior.
- states كاملة.
- RTL وlocalization.
- motion وreduced-motion.
- loading/performance.
- analytics events إن كانت مطلوبة.
- tests وvisual examples.

قالب التنفيذ في [templates/COMPONENT-SPEC.md](./templates/COMPONENT-SPEC.md).

## State matrix

| State | المطلوب |
|---|---|
| Default | المعنى والفعل واضحان دون شرح خارجي |
| Hover | enhancement فقط، لا content حصري |
| Focus-visible | ring واضح وcontrast مناسب |
| Active/Pressed | feedback فوري على pointer-down |
| Selected | shape/label/semantic state، لا لون وحده |
| Disabled | سبب أو شرط عند الحاجة؛ ليس opacity منخفضة جدًا |
| Read-only | قابل للقراءة والنسخ، غير قابل للتحرير |
| Loading | يحافظ على geometry ويشرح العملية |
| Empty | يوضح ما المفقود وأول فعل مفيد |
| Error | message محلية + recovery |
| Success | نتيجة ثابتة + next/undo |
| Offline | ما المتاح محليًا وما ينتظر sync |
| Permission denied | يشرح الصلاحية والمسار الممكن |

## Buttons

### Variants

- **Primary:** فعل واحد محوري داخل region.
- **Secondary:** بديل حقيقي أو action أقل أهمية.
- **Ghost:** toolbars، rows، contextual controls.
- **Quiet:** tinted background دون border، لـselected/low emphasis.
- **Danger:** حذف/إلغاء/سحب صلاحية.
- **Link:** انتقال داخل نص، لا submit.

### Sizes

| Size | Visual height | Touch area | Use |
|---|---:|---:|---|
| Compact | 36px | 44px عند touch | dense desktop toolbar |
| Standard | 44px | 44px | default |
| Large | 52px | 52px | hero/mobile commit |
| Icon | 40px visual | 44×44px | utility |

### Rules

- label فعل محدد.
- icon قبل/بعد النص حسب المعنى والاتجاه، وليس دائمًا في الطرف نفسه.
- loading يحفظ label أو يحوله إلى `جارٍ الحفظ…` مع spinner صغير.
- لا disabled button بلا تفسير إذا كان شرط التمكين غير واضح.
- gradient border/button special variant واحدة في campaign أو showcase؛ لا primary العام.
- shatter/glow/cinematic button demo-only أو celebratory، وليس checkout/admin.

### Action hierarchy and split actions

- region واحدة تملك primary واحدًا؛ الباقي secondary أو quiet حسب الأثر.
- split action يعني فعلًا افتراضيًا واضحًا وسهمًا يكشف بدائل من العائلة نفسها، لا تجميع أفعال عشوائية.
- loading يحافظ على عرض الزر ويوقف التكرار، ثم يتحول إلى نتيجة success ثابتة قبل الرجوع.
- destructive action لا يستعير لون primary، ويحتاج confirm عندما لا يوجد Undo أو عندما يتأثر أكثر من كيان.
- state layer يضاف فوق المادة؛ لا تُخفّض opacity للنص كي توحي بالضغط.

## V7 authored adaptive patterns

| Pattern | Contract | Required fallback |
|---|---|---|
| Context Ribbon | يبقى مرتبطًا بالعنصر المحدد ويعرض الأوامر المشتركة أولًا | toolbar ثابتة بلا blur عند reduced transparency |
| Signal Lens | scrubber + قيمة صريحة + previous/next للوحة المفاتيح | تحديث فوري بلا انتقال عند reduced motion |
| Flow Constellation | label وicon وstate لكل عقدة؛ العلاقة مفهومة دون اللون | قائمة خطوات خطية عند المساحات الأضيق إن تعذر الرسم |
| Notification Stack | الملخص لا يخفي العدد؛ الفتح والأرشفة قابلان للوصول | قائمة مسطحة عند reduced motion |
| Range Composer | يسمح بالسحب والخطوات الدقيقة والقيم الجاهزة | حقل رقمي أو stepper عند عدم دعم range |
| Guided Empty State | يشرح سبب الفراغ ويقدم 1–3 بدايات حقيقية | نص وفعل أساسي بلا رسم |
| Fold Deck | عنوان كل طبقة يبقى ظاهرًا، وطبقة واحدة مفتوحة | accordion دلالي عمودي على الهاتف |
| Adaptive Inspector | quick افتراضي وadvanced عند الطلب مع preview مباشر | حقول مكتوبة تحفظ نفس القيم دون المعاينة |

- كل نمط يحفظ state محليًا في المعرض ولا يدّعي persistence أو بيانات إنتاجية.
- الزجاج web approximation وليس تنفيذ Apple أصليًا؛ يحتفظ بتباين مستقل عن blur.
- الأشكال غير المتناظرة تستخدم لتمييز الحاوية أو اتجاه الفتح، لا كزخرفة متكررة على كل بطاقة.

## Icon containers

| Variant | المعنى | أين يُستخدم |
|---|---|---|
| Glass | أداة عائمة فوق خلفية حقيقية | dock، overlay، floating utility |
| Tonal | حالة selected/semantic | dashboard، list، settings |
| Outline | أداة محايدة أو low emphasis | toolbar، table utilities |
| Drawn | نبرة تحريرية أو sketch artifact | ideation، onboarding illustration |

- استخدم Phosphor فقط داخل surface واحدة، واختر regular أو thin حسب النبرة.
- container 32/40/48/64px يقابل glyph 16/20/24/32px.
- الأيقونة وحدها تحتاج accessible name؛ tooltip enhancement وليس الاسم الوحيد.
- glass دون content خلفه يصبح translucent fill عاديًا ولا يحقق استعارة المادة.

## Toggle, switch, checkbox, radio

### Switch

- يغير setting فورًا، ويصف label الحالة عندما يكون ON.
- لا يستخدم لقرار يتطلب Save أو عواقب كبيرة.
- track + thumb + optional status text؛ لا يعتمد اللون وحده.
- press area تشمل label عندما لا يسبب ذلك تفعيلًا عرضيًا.

### Checkbox

- اختيار متعدد أو acknowledgment.
- mixed state موثق.
- label clickable، helper تابع.

### Radio / Liquid radio

- اختيار واحد من قائمة واضحة.
- liquid animation تُحجز لـ2–4 خيارات في expressive product؛ reduced motion يصبح fill فوريًا.
- لا تتحرك indicator بين rows بعيدة إذا سببت confusion.

### Toggle button

- `aria-pressed` للحالة الثنائية action-like.
- icon + tooltip/label.
- لا يحل محل checkbox في form متعدد.

## Inputs

### Text input

- label دائم.
- optional prefix/suffix لا يسرق مساحة النص.
- clear button فقط عند وجود قيمة، مع accessible name.
- `autocomplete` و`inputmode` و`type` صحيحة.
- character count قبل الوصول إلى limit، لا بعد تجاوزه فقط.

### Number field

- يسمح بالكتابة المباشرة، stepper، min/max.
- الأزرار لا تمنع keyboard أو wheel safety.
- units واضحة خارج القيمة الخام.
- financial values لا تُصحح بصمت أثناء الكتابة؛ تُنسق on blur.

### Textarea

- min 3 rows، auto-grow إلى حد ثم scroll.
- resize لا يُمنع على desktop إلا مع بديل.

### Search

- role/search semantics.
- clear، loading، result count، recent/empty.
- debounce لا يمنع pressed feedback؛ 150–300ms حسب API.

## Select, listbox, autocomplete

- native select مقبول للخيارات البسيطة على mobile.
- custom listbox يطبق keyboard model كاملًا.
- autocomplete يميز selected value عن query.
- multiple select يعرض 1–3 chips ثم `+N` مع summary accessible؛ لا يملأ الحقل بعشرات pills.
- group labels non-selectable.
- async options تملك loading، retry، empty، وstale states.

## Date and time

- calendar picker للمهام البصرية والتواريخ النسبية.
- wheel picker للجوال والوقت/التاريخ المحدود، مع direct entry بديل عندما الدقة مهمة.
- locale يبدأ الأسبوع والتنسيق حسب اختيار المستخدم.
- unavailable dates لها سبب في tooltip/helper، لا gray فقط.
- range يعرض start/end والنطاق نصيًا.
- timezone ظاهر للمواعيد المشتركة.

## OTP and verification

- input واحد semantic أو مجموعة تدير paste/backspace بشكل صحيح.
- يسمح paste الكامل وpassword manager/autofill.
- لا ينتقل focus بطريقة تمنع التصحيح.
- resend يعرض timer واضحًا ولا يخدع المستخدم.
- error لا يمسح القيمة كاملة.
- الأرقام تُقرأ بشكل مفهوم للقارئ الصوتي.

## File and image upload

- button واضح + drag/drop enhancement.
- تقبل `accept` المناسب وتشرح الحجم/النوع قبل الفشل.
- preview، progress، cancel، retry، remove.
- image crop/edit اختياري بعد upload، لا قبل اختيار الملف.
- drop zone لا تكون الطريق الوحيدة على touch أو keyboard.
- فشل ملف واحد لا يمسح باقي batch.

## Avatar picker

- upload، initials/generated، أو preset موثوق.
- crop circle/square preview حسب الاستخدام الحقيقي.
- alt/identity لا يعتمد على الصورة وحدها.
- لا تُرسل الصورة قبل consent/action واضح إذا كانت حساسة.

## Form and fieldset

- fieldset/legend لمجموعة قرار حقيقية.
- form sections بعناوين ووصف consequence.
- errors summary اختياري للform الطويل مع links إلى الحقول، بالإضافة إلى error محلية.
- sticky save bar يظهر فقط بعد dirty state.
- autosave يوضح `جارٍ الحفظ` ثم `تم الحفظ`، ويحذر عند الفشل.
- Enter submits عندما متوقع، ولا يرسل multiline أو destructive flow عرضيًا.

## Stepper and multistep forms

- 3–7 steps ideal؛ أكثر يُجمع إلى chapters.
- اسم الخطوة الحالية أهم من أرقام الدوائر.
- الخطوات المكتملة قابلة للعودة إذا آمن.
- data تُحفظ تدريجيًا.
- summary/review قبل commit الحساس.
- progress يظل نصيًا عند reduced motion وsmall screens.

## Menus and dropdowns

- menu للأوامر، listbox للقيم، navigation menu للروابط. لا تستخدم pattern واحدًا للجميع.
- destructive items مفصولة بصريًا وموسومة.
- submenu يتجنب التأخير ويستخدم safe pointer corridor.
- mobile يتحول إلى sheet إذا كانت الخيارات كثيرة أو تحتاج وصفًا.
- activity dropdown ليس menu أوامر فقط؛ يحتاج list semantics وتاريخ/حالة.

## Dialog

- انظر [05-NAVIGATION-SHELLS.md](./05-NAVIGATION-SHELLS.md).
- origin-aware transition.
- max width حسب المحتوى: 400 alert، 560 form، 720 review، 960 complex.
- max height مع scroll region واضحة وheader/footer ثابتين إذا لزم.
- close لا يُقص ولا يختفي داخل artwork cap.

## Toast, banner, inline feedback

| Pattern | Use |
|---|---|
| Inline | field أو section issue يحتاج إصلاحًا |
| Banner | حالة تؤثر في الصفحة أو account |
| Toast | تأكيد عابر أو undo سريع |
| Modal | قرار لا يمكن تأجيله أو خطر حقيقي |

- toast 4–6s للمعلومات، persistent مع action عند الحاجة.
- لا auto-dismiss للأخطاء التي تتطلب قراءة أو إصلاحًا.
- live regions لا تعلن تحديثات متكررة بشكل مزعج.

## Progress and loaders

- determinate progress عندما الحجم/الخطوات معروفة.
- skeleton يشبه geometry النهائي ويحجز المساحة.
- spinner لمهمة قصيرة ومحلية.
- logo trace loader للـlaunch أو brand moment فقط، لا كل route.
- shimmer خفيف ومحدود؛ لا يتحرك عند reduced motion.
- estimated arrival يعرض range وconfidence/context، لا وقتًا دقيقًا مزيفًا.

## Copy code button

- button داخل code block header أو inline-end.
- state: `نسخ` → `تم النسخ` لمدة 1.5–2s.
- ينسخ النص الخام لا line numbers.
- fallback selection عند Clipboard API failure.
- success announced politely؛ لا confetti.

## Theme switcher

- `system/light/dark` أفضل من binary عندما المنتج متعدد الأجهزة.
- binary toggle مقبول إذا system غير مطلوب.
- icon يتغير مع label/tooltip.
- cinematic sun/moon transition showcase-only؛ production variant 240ms بدون full-page sweep.
- اختيار المستخدم محفوظ ويُطبق قبل paint.

## Profile and display cards

- avatar، identity، status، one primary action، optional details.
- animated expansion يحافظ على anchor ولا يقفز layout المجاور.
- status online لا يعتمد على green dot وحده.
- لا تعرض معلومات شخصية غير لازمة لمجرد ملء card.

## Checkout and transaction commit

- summary واضح: item/recipient، amount، fees، arrival، payment method.
- editable fields تظهر affordance حقيقية.
- swipe-to-commit إضافة ثقة على mobile، لكن button/assistive fallback ضروري.
- رسوم الشبكة/السرعة slider يعرض الزمن والكلفة مع recommended range.
- confirmation ينتج receipt/reference وUndo عند إمكانه، لا success animation فقط.

## Component QA

- [ ] كل state في الجدول ممثلة أو مستبعدة بسبب موثق.
- [ ] semantics صحيحة وليست `div` مع click.
- [ ] keyboard model مطابق للنمط.
- [ ] touch targets والمسافات كافية.
- [ ] focus مرئي ويعود بعد overlays.
- [ ] labels والأخطاء والـhelper مترابطة.
- [ ] RTL، long text، zoom، dark مختبرة.
- [ ] content لا يعتمد على hover/motion/color وحده.
- [ ] async state لا يغيّر geometry بلا سبب.
- [ ] reduced motion/transparency لها fallback.
