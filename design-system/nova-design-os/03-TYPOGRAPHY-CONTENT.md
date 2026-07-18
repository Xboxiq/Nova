# 03. Typography and Content

## Font stack

### Product UI

```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "IBM Plex Sans Arabic",
  "IBM Plex Sans", "Segoe UI", Tahoma, Arial, sans-serif;
```

- **SF Pro عبر system stack:** الواجهة الأصلية على iPhone وiPad وmacOS دون توزيع ملفات Apple.
- **IBM Plex Sans Arabic:** الواجهة العربية الذاتية الاستضافة خارج Apple، من IBM وليست Google Font.
- **IBM Plex Sans:** المقابل اللاتيني cross-platform، مع Geist Mono للكود فقط.

الأوزان المعتمدة أربعة فقط: `400` regular، `550` medium، `650` semibold، و`750` bold. استخدم توكنز `--nova-weight-*` بدل القيم المتفرقة.

### Editorial Arabic

لا توجد عائلة serif افتراضية. إذا احتاج المنتج صوتًا تحريريًا حقيقيًا، تُختار عائلة عربية مرخّصة في page override ولا تُستخدم في الأزرار أو الجداول أو labels.

### Code and telemetry

`Geist Mono Variable, ui-monospace, SFMono-Regular, Consolas, monospace` للكود، IDs، timestamps، وقراءات live. لا يُستخدم ليجعل المنتج “تقنيًا” بلا وظيفة.

## قواعد العربية

1. لا تطبق negative tracking على العربية.
2. لا تضغط line-height كي يطابق Latin card بصريًا؛ وسّع البطاقة أو استخدم layout مرنًا.
3. اختبر حروفًا ذات صعود ونزول وتشكيل: `يُفضّل، مسؤولية، إحصاءات، ١٢٣٤٥`.
4. لا تقطع الكلمة العربية بـhyphen آليًا.
5. تجنب justified text في الواجهات؛ يخلق فراغات سيئة.
6. لا تجعل English term داخل السطر يقلب الترتيب. استخدم `bdi` أو `dir="ltr"` للقيم المناسبة.
7. punctuation العربية تتبع لغة الجملة، لا لغة التطبيق العامة.
8. icon اتجاهي مثل arrow/back ينعكس؛ icon عالمي مثل search أو play أو check لا ينعكس.

## Scale and usage

| Role | Mobile | Desktop | Max lines | ملاحظات |
|---|---:|---:|---:|---|
| Hero display | 40–56px | 64–88px | 2–3 | marketing only |
| Page headline | 28–36px | 36–48px | 2 | اسم الصفحة/الفصل |
| Section title | 24–28px | 28–36px | 2 | يقود مجموعة واضحة |
| Card title | 18–20px | 18–24px | 2 | لا يتنافس مع page title |
| Lead | 18px | 18–20px | 4–6 | max 60ch |
| Body | 16px | 16px | مفتوح | max 75ch |
| Compact | 14px | 14px | حسب السياق | data/table/helper |
| Label | 13px | 13px | 1–2 | visible label |
| Metadata | 12px | 12–13px | 1 | ليس body copy |

## Optical rules

- Latin display: tracking بين `-0.02em` و`-0.045em` حسب الحجم.
- Arabic: tracking `normal`، والوزن 550–750 حسب الدور، مع حصر 750 في emphasis نادر بدل ضغط الحروف.
- body: لا يقل line-height العربي عن 1.55 غالبًا.
- الأرقام في KPIs تستخدم `font-variant-numeric: tabular-nums lining-nums`.
- currency والـunit أصغر بدرجة واحدة فقط، وليسا رماديين غير مقروءين.
- baseline الأيقونة مع النص تُصحح بصريًا 1px عند الحاجة، لا بتحريك كل icon بقيمة مختلفة.

## Text hierarchy without decoration

ترتيب الأدوات المسموح قبل إضافة لون أو effect:

1. ترتيب المحتوى.
2. المسافة.
3. الحجم.
4. الوزن.
5. اللون semantic.
6. style خاص نادر.

لا تستخدم gradient text، italic عشوائي، serif word داخل heading، أو all caps للتعويض عن hierarchy ضعيفة.

## Voice and tone

### الشخصية

- مباشر لكن غير جاف.
- ذكي دون jargon.
- مطمئن في الحالات الحساسة.
- محدد في الأفعال والنتائج.
- عربي طبيعي، لا ترجمة حرفية لتركيب إنجليزي.

### Microcopy formula

`Action + Object + Optional consequence`

- جيد: `احفظ التغييرات`، `أرسل الدعوة`، `نزّل التقرير`.
- ضعيف: `متابعة`، `تنفيذ`، `انقر هنا` عندما لا يوضح النتيجة.

### Error formula

`ما المشكلة + لماذا إن عُرف + كيف تُحل`

مثال: `تعذر حفظ البريد لأن الاتصال انقطع. تحقق من الشبكة وحاول مرة أخرى.`

لا تستخدم `حدث خطأ ما` إلا عندما لا توجد معلومات أكثر، ومع ذلك أضف action أو support path.

### Empty state formula

`What is empty + why it matters + first useful action`

مثال: `لا توجد تقارير بعد. أنشئ أول تقرير لتبدأ مقارنة الأداء أسبوعيًا.`

لا تجعل الرسم يستهلك المساحة بينما النص لا يشرح الخطوة التالية.

### Success formula

`What completed + durable result + next/undo`

مثال: `نُشر التقرير وأصبح متاحًا للفريق. عرض التقرير · تراجع`

## Labels and controls

- الزر يصف الفعل، العنوان يصف المكان، tab يصف المحتوى، toggle يصف الحالة عند التشغيل.
- toggle label لا يكون فعلًا غامضًا. استخدم `إشعارات البريد` ثم state/description.
- icon-only button يحتاج `aria-label` وtooltip عند desktop إذا لم يكن الرمز عالميًا.
- badge يصف status أو category قصيرًا، لا جملة ولا CTA.
- helper text يسبق الخطأ إذا كان يمنع الخطأ المتوقع.

## Numbers, dates, and currency

- احفظ القيمة الآلية منفصلة عن النص المعروض.
- استخدم `Intl.NumberFormat` و`Intl.DateTimeFormat`.
- اسمح باختيار Arabic-Indic أو Western digits حسب سياق المنتج، ولا تخلطهما داخل جدول واحد.
- استخدم `bdi` للقيم مثل emails، IDs، IBAN، tracking numbers، وcrypto addresses.
- الموجب والسالب لا يُفهمان باللون وحده؛ أضف sign وlabel/icon.
- لا تختصر رقمًا يحتاج قرارًا ماليًا. `1.2M` يصلح summary، والقيمة الكاملة تظهر في detail/tooltip.
- timezone ظاهر عندما تؤثر في الموعد أو السجل.

## Truncation and wrapping

- لا truncate العنوان الأساسي أو error أو قيمة مالية حاسمة.
- أسماء الصفوف يمكن ellipsis بعد توفير title/tooltip أو detail view accessible.
- الأزرار تسمح بسطرين على mobile بدل تقليص النص إلى حجم غير مقروء، إلا في bottom dock حيث يجب اختيار label أقصر.
- long URLs وIDs تستخدم `overflow-wrap:anywhere` داخل containers.
- parallel cards تحاذي action region من خلال layout، لا بقص النص إلى طول مصطنع.

## Content inventory before layout

اكتب لكل صفحة:

| مستوى | المحتوى |
|---|---|
| Primary | المهمة أو القرار الأساسي |
| Supporting | ما يحتاجه المستخدم لاتخاذ القرار |
| Operational | filters، status، metadata، help |
| Exceptional | error، empty، loading، permission denied |
| Optional | education، upsell، illustration |

إذا ازدحم السطح، تُنقل Optional أولًا، ثم تُكشف Operational تدريجيًا. لا يُخفى Primary.

## Localization QA strings

اختبر على الأقل:

- عنوان عربي طويل: `إدارة الصلاحيات ومساحات العمل المشتركة`
- اسم قصير: `نور`
- اسم طويل: `شركة الحلول الرقمية المتقدمة للخدمات`
- رقم: `١٢٬٣٤٥٫٦٧ د.ع` و`$12,345.67`
- حالة خطأ: `تعذر إكمال العملية بسبب انتهاء صلاحية الجلسة`
- Mixed direction: `تمت دعوة user@example.com إلى مساحة NOVA-2026`
- plural: حالة 0، 1، 2، 3–10، 11+ حسب قواعد العربية.

## Content quality checklist

- [ ] كل CTA يصف نتيجة واضحة.
- [ ] labels مرئية ولا يعتمد الحقل على placeholder.
- [ ] لا توجد metrics أو شهادات مصطنعة.
- [ ] الحالات الأربع مكتوبة: loading، empty، error، success.
- [ ] النص العربي طبيعي ومراجع في layout حقيقي.
- [ ] English fragments معزولة directionally.
- [ ] الأرقام والتواريخ والعملات محلية وقابلة للفهم.
- [ ] لا يوجد body أصغر من 14px.
- [ ] لا توجد جملة مهمة مقتطعة بلا بديل.
