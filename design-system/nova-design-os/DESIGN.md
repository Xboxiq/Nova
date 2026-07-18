---
name: NOVA Design OS
description: Arabic-first Luminous Mineral product system with Apple-like physical glass, precise product behavior, and a cobalt, ice, mint, coral, and petrol identity.
colors:
  primary: "#0068D9"
  light-canvas: "#F3F7F8"
  light-surface: "#FFFFFF"
  light-surface-quiet: "#EAF0F2"
  light-ink: "#10242E"
  light-ink-secondary: "#455E68"
  light-border: "#D6E1E4"
  cobalt-strong: "#004EA8"
  cobalt-soft: "#DCEEFF"
  dark-canvas: "#0D1B22"
  dark-surface: "#122833"
  dark-surface-quiet: "#19343F"
  dark-ink: "#F3FAFB"
  dark-ink-secondary: "#C0D0D4"
  dark-border: "#294955"
  dark-action: "#70B7FF"
  success: "#0B704B"
  warning: "#9A5C08"
  danger: "#C43B4D"
  info: "#1769AA"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, IBM Plex Sans Arabic, IBM Plex Sans, sans-serif"
    fontSize: "88px"
    fontWeight: 650
    lineHeight: 1.02
    letterSpacing: "normal"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Display, IBM Plex Sans Arabic, IBM Plex Sans, sans-serif"
    fontSize: "48px"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "normal"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, IBM Plex Sans Arabic, IBM Plex Sans, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, IBM Plex Sans Arabic, IBM Plex Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0px"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, IBM Plex Sans Arabic, IBM Plex Sans, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 650
    lineHeight: 1.35
    letterSpacing: "0px"
  mono:
    fontFamily: "Geist Mono Variable, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  control: "10px"
  field: "16px"
  card: "24px"
  feature: "32px"
  pill: "999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
  20: "80px"
  24: "96px"
components:
  app-light:
    backgroundColor: "{colors.light-canvas}"
    textColor: "{colors.light-ink}"
    width: "100%"
  panel-light:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.card}"
    padding: "24px"
  panel-light-quiet:
    backgroundColor: "{colors.light-surface-quiet}"
    textColor: "{colors.light-ink-secondary}"
    rounded: "{rounded.field}"
    padding: "16px"
  separator-light:
    backgroundColor: "{colors.light-border}"
    height: "1px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.light-surface}"
    rounded: "{rounded.control}"
    padding: "12px 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-strong}"
    textColor: "{colors.light-surface}"
    rounded: "{rounded.control}"
    padding: "12px 18px"
    height: "44px"
  selection-light:
    backgroundColor: "{colors.cobalt-soft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  button-secondary:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.control}"
    padding: "12px 18px"
    height: "44px"
  input:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    height: "48px"
  card:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.card}"
    padding: "24px"
  dialog:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.feature}"
    padding: "24px"
  dock:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.feature}"
    padding: "8px"
    height: "64px"
  app-dark:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-ink}"
    width: "100%"
  panel-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.card}"
    padding: "24px"
  panel-dark-quiet:
    backgroundColor: "{colors.dark-surface-quiet}"
    textColor: "{colors.dark-ink-secondary}"
    rounded: "{rounded.field}"
    padding: "16px"
  separator-dark:
    backgroundColor: "{colors.dark-border}"
    height: "1px"
  button-primary-dark:
    backgroundColor: "{colors.dark-action}"
    textColor: "{colors.dark-canvas}"
    rounded: "{rounded.control}"
    padding: "12px 18px"
    height: "44px"
  status-success:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.success}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  status-warning:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.warning}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  status-danger:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.danger}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
  status-info:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.info}"
    rounded: "{rounded.control}"
    padding: "8px 12px"
---

# NOVA Design OS

## Overview

**Creative North Star: "The Luminous Instrument - الأداة المضيئة"**

NOVA يتعامل مع الواجهة كأداة دقيقة تبدو هادئة عند السكون، حية عند اللمس، ومميزة في لحظة واحدة محسوبة. روح Apple تظهر في السببية والمواد والحركة، وروح Notion في وضوح المحتوى وقابلية التركيب، وروح Vercel في الانضباط الطباعي والهيكلي؛ لكن اللون، الإيقاع، الرسوم، والـRTL يصنعون هوية NOVA المستقلة.

هذه ليست مكتبة مؤثرات. كل شاشة تختار Register واحدًا: Product أو Editorial أو Data أو Immersive. يُستعمل الأسلوب المألوف لإنجاز المهمة، وتُحجز الجِدّة للـsignature artifact أو انتقال مهم. البساطة تعني إزالة الاحتكاك لا إخفاء السياق.

**Design Read:** مرجع تصميم معياري، product-first، عربي أولًا، يجمع صرامة التنفيذ مع لحظة بصرية مؤلفة بوضوح.

| Dial | Default | مجال التعديل |
|---|---:|---|
| `DESIGN_VARIANCE` | 7/10 | 4 للـadmin، 6 للمنتج، 7 للتسويق، 8 لمشهد عرض واحد |
| `MOTION_INTENSITY` | 5/10 | 2 للبيانات الكثيفة، 5 للمنتج، 7 لتجربة immersive مؤقتة |
| `VISUAL_DENSITY` | 6/10 | 4 للمحتوى، 6 للمنتج، 8 للجداول والعمليات |

**Key Characteristics:**

- Arabic-first مع LTR كامل، واستخدام logical properties بدل قلب الواجهة يدويًا.
- هرمية قبل الزينة؛ محتوى حقيقي قبل ornament.
- لون Cobalt واحد للإجراء والتركيز، مع ألوان semantic لا تنافسه.
- سطح افتراضي opaque/tonal؛ glass وglow والـgradient حالات خاصة مكتوبة السبب.
- مكوّنات React/TypeScript، وأيقونات Phosphor من `react-icons/pi` داخل React.
- كل تفاعل يملك حالات keyboard وtouch وreduced motion.
- كل صفحة تملك سببًا بصريًا واحدًا يمكن تسميته؛ بقية الشاشة تخدمه.

**قوانين UX التي تحكم القرارات:**

- **Jakob’s Law:** تبقى navigation، forms، checkout، dialogs مألوفة. الاختلاف في الصياغة لا في كسر النموذج الذهني.
- **Hick’s Law:** البحث والفلاتر والتدرج المرحلي يقللون الاختيارات المرئية؛ لا تُعرض لوحة خيارات كاملة في أول خطوة.
- **Fitts’s Law:** الإجراء قريب من الشيء الذي يؤثر فيه، ومساحة اللمس لا تقل عن 44×44px.
- **Law of Proximity/Common Region:** الحواف والبطاقات تعني مجموعة حقيقية، لا مجرد رغبة في ملء الفراغ.
- **Von Restorff Effect:** عنصر واحد مميز في المجموعة؛ إذا كان كل شيء يلمع فلا شيء مهم.
- **Doherty Threshold:** feedback مرئي خلال 100ms، وحالة انتظار مفهومة قبل 400ms.
- **Goal-Gradient Effect:** الـonboarding والـcheckout والعمليات الطويلة تُظهر التقدم والخطوة التالية.
- **Aesthetic-Usability Effect:** الجمال يبني الثقة لكنه لا يعفي من الاختبار؛ لا يسمح بإخفاء مشكلة استخدام.

المستندات التفصيلية في [README.md](./README.md) جزء مكمل من المرجع. عند التعارض، توكنات هذا الملف وقواعد Accessibility تتقدمان.

## Colors

الهوية الضوئية مبنية على Cobalt Day بارد ومضيء نهارًا، وPetrol Night مرفوع ليلًا بدل الأسود الثقيل. Cobalt هو الإشارة الوظيفية النادرة، بينما Ice/Mint/Coral/Amber تشكّل حقول الضوء والبيانات.

### Primary

- **Signal Cobalt** (`#0068D9`): الإجراء الأساسي والتركيز والاختيار في light.
- **Night Sky** (`#70B7FF`): الإجراء والتركيز في dark.

### Neutral

- **Mineral Cloud** (`#F3F7F8`): canvas النهاري.
- **Petrol Night** (`#0D1B22`): canvas الليلي المرفوع.
- **Deep Ink** (`#10242E`): النص الأساسي نهارًا.
- **Moon Ink** (`#F3FAFB`): النص الأساسي ليلًا.

### Light — Cobalt Day

| Token | Value | الدور |
|---|---|---|
| `light-canvas` | `#F3F7F8` | خلفية التطبيق؛ باردة وخفيفة حتى لا تبدو beige template |
| `light-surface` | `#FFFFFF` | البطاقات والحقول والـdialogs |
| `light-surface-quiet` | `#EAF0F2` | تجميع هادئ، صفوف محددة، nested regions |
| `light-ink` | `#10242E` | النص والعناصر عالية الأهمية |
| `light-ink-secondary` | `#455E68` | وصف ومعلومات ثانوية |
| `light-border` | `#D6E1E4` | hairlines والفصل البنيوي |
| `cobalt` | `#0068D9` | primary action، focus، selection |
| `cobalt-strong` | `#004EA8` | pressed وhigh-emphasis |
| `cobalt-soft` | `#DCEEFF` | selected quiet surface، لا body text طويل |

### Dark — Petrol Night

| Token | Value | الدور |
|---|---|---|
| `dark-canvas` | `#0D1B22` | خلفية ليلية petrol مرفوعة، ليست سوداء |
| `dark-surface` | `#122833` | السطح الأساسي |
| `dark-surface-quiet` | `#19343F` | nested/selected surface |
| `dark-ink` | `#F3FAFB` | النص الأساسي |
| `dark-ink-secondary` | `#C0D0D4` | النص الثانوي |
| `dark-border` | `#294955` | حدود بنيوية مرئية بلا توهج |
| `dark-action` | `#70B7FF` | action/focus في الوضع الليلي |

### Semantic and expressive color

- `success #0B704B`, `warning #9A5C08`, `danger #C43B4D`, `info #1769AA` في light، مع مقابلات أفتح في dark كما يحدد [02-TOKENS.md](./02-TOKENS.md).
- Ice وMint وCoral وAmber وSky ألوان **expressive** للرسوم والبيانات وحقول الضوء، لا تُستخدم بدل semantic ولا لإعادة تلوين كل أيقونة.
- الـgradient المسموح: انتقال tonal داخل نفس العائلة، أو atmospheric artwork متعدد الألوان داخل مساحة واحدة. لا يُستخدم gradient خلف كل CTA أو عنوان.

**The Cobalt Ration Rule.** لا يتجاوز اللون الأساسي تقريبًا 10% من الشاشة الوظيفية. قيمة اللون في ندرته.

**The Two-Accent Ceiling.** في المشهد الوظيفي الواحد يوجد Cobalt + لون semantic أو expressive واحد فقط. atmospheric artwork واحد يمكنه مزج Ice/Mint/Coral/Amber، والـchart يحتاج palette موثقة.

**The Color Is Not Meaning Rule.** الحالة تُعبّر بالنص أو الأيقونة أو الشكل مع اللون، لا باللون وحده.

## Typography

**UI/Display:** Apple system fonts أولًا، ثم IBM Plex Sans Arabic وIBM Plex Sans ذاتية الاستضافة.  
**Editorial Arabic:** لا عائلة افتراضية؛ تُضاف فقط بقرار تحريري موثّق.  
**Mono:** Geist Mono للقيم والكود والـtelemetry، لا للنثر.

**Display Font:** SF Pro Display through the Apple system stack, with IBM Plex Sans Arabic / IBM Plex Sans fallback  
**Body Font:** SF Pro Text through the Apple system stack, with IBM Plex Sans Arabic / IBM Plex Sans fallback  
**Label/Mono Font:** Geist Mono for code and telemetry only

الطابع واضح، هادئ، ودقيق. العناوين تملك حضورًا بالوزن والفراغ، لا بتلوين الكلمات أو تركيب serif عشوائي داخل sans. العربية تُضبط بصريًا بذاتها ولا ترث tracking لاتينيًا.

### Hierarchy

- **Display** (650, `clamp(40px, 6vw, 88px)`, 1.02): marketing hero أو رقم رئيسي واحد.
- **Headline** (650, `clamp(28px, 3vw, 48px)`, 1.15): عنوان فصل.
- **Title** (600–650, 20–24px, 1.35): card/page title.
- **Body** (400, 16px, 1.6): عرض السطر 45–75ch.
- **Compact** (400, 14px, 1.5): جداول وmetadata، وليس نص قراءة طويلًا.
- **Label** (600, 13px, 1.35): sentence case. Uppercase للاتيني في telemetry فقط.
- **Numeric** (500–650, contextual size, tabular): للمقارنات، الجداول، العدادات، والـcharts.

**The Arabic Tracking Rule.** `letter-spacing: normal` للعربية. تُطبق قيم tracking السالبة للـLatin فقط عبر selectors واعية باللغة.

**The Two-Family Rule.** لا يزيد السطح الواحد على عائلتي خط، والثانية يجب أن تؤدي وظيفة محددة: editorial أو code.

**The Meaning-Before-Scale Rule.** الحجم يعكس البنية لا الرغبة في “شكل فاخر”. لا hero headline في صفحة إعدادات، ولا 12px body لإجبار المحتوى داخل card.

## Elevation

NOVA **tonal-first**. العمق يبدأ بتغيير السطح والحد قبل الظل. الظلال محيطية، واسعة، ومنخفضة opacity؛ لا تُستعمل لكل card. المواد الشفافة طبقة وظيفية عائمة، وليست خلفية افتراضية.

### Surface ladder

1. **Canvas:** مستوى الصفحة.
2. **Quiet:** تجميع داخلي أو selected region.
3. **Surface:** card/field عادي، غالبًا بحد 1px.
4. **Raised:** popover، sticky tool، floating dock.
5. **Modal:** dialog/sheet مع scrim وعزل focus.

### Shadow vocabulary

- **Hairline** (`box-shadow: none`): `1px` border + tonal difference. افتراضي للبطاقات والحقول.
- **Float** (`box-shadow: 0 12px 36px rgb(18 21 40 / 10%)`): dropdown وdock.
- **Dialog** (`box-shadow: 0 28px 90px rgb(18 21 40 / 18%)`): modal كبير.
- **Dark Float** (`box-shadow: 0 18px 54px rgb(5 8 22 / 28%)`): floating surface في dark.
- **Focus** (`box-shadow: 0 0 0 2px var(--nova-focus)`): ring صريح مع offset 2px؛ لا يعتبر decoration.

### Material rules

- Glass مسموح للـnavigation، toolbar، dock، sheet header، وtransient overlay حين يوجد محتوى خلفه يبرر blur.
- Apple-like glass ليس `rgba + blur` فقط. تركيبته الإلزامية: translucent fill + bright top specular + shaded lower edge + localized caustic + ambient shadow + real chromatic field خلف السطح.
- السطح الأكبر يستخدم blur أقوى وظلًا أعمق، بينما control الصغير يملك حافة أوضح واستجابة press فورية `scale(.96–.98)`.
- الـvibrancy محكومة: النص عالي التباين يبقى فوق الزجاج، ولا يُستخدم glass لحمل body طويل فوق خلفية غير متوقعة.
- لا يتراكم سطحان زجاجيان فاتحان فوق بعضهما.
- عند `prefers-reduced-transparency` يتحول glass إلى surface opaque بحد واضح.
- الـglow لا يحدد حدود عنصر وظيفي؛ يُستخدم خلف signature artifact أو لحالة live واحدة.
- foil/iridescence/shader داخل media أو preview فقط، ولا يحمل نص body.

**The Flat-by-Default Rule.** الرفع يظهر عند فتح popover أو سحب sheet أو تفعيل tool، لا كزينة دائمة لكل شيء.

## Components

كل مكوّن يبدأ من semantic HTML أو primitive accessible، ثم يُصاغ بتوكنات NOVA. مخرجات 21st.dev وshadcn مصادر تركيب لا source of truth، ولا تُنسخ كما هي.

### Buttons

- **Primary:** Cobalt tonal، ارتفاع 44px، radius 10px، label فعل محدد. واحد في كل action region.
- **Secondary:** surface + border، نفس الارتفاع والوزن، لا ينافس primary.
- **Ghost:** للـtoolbar والصفوف؛ مساحة النقر كاملة حتى إن كان بصريًا خفيفًا.
- **Danger:** لا يصبح أحمر ممتلئًا إلا في خطوة تأكيد تدميرية واضحة.
- **Press:** feedback على pointer-down، `scale(.98)` لمدة 90–120ms؛ لا bounce بلا زخم.
- **Loading:** يحافظ على العرض ويُظهر label حالة؛ لا spinner وحيد مجهول.

### Fields and forms

- label مرئي فوق أو بجانب الحقل، helper/error ملاصق، وfocus ring غير معتمد على border color وحده.
- ارتفاع قياسي 48px؛ 44px حد أدنى للجوال. compact 36–40px داخل desktop data grid فقط.
- validation على blur أو عند الانتقال للخطوة التالية؛ لا يُعاقب المستخدم بالأخطاء أثناء أول حرف.
- autocomplete/select/date/number/OTP تحافظ على semantics والكيبورد المناسب و`inputmode`.
- multi-step يعرض اسم الخطوة الحالية والمتبقي؛ progress ليس نقاطًا زخرفية فقط.

### Cards

- card تعني grouping أو summary أو action boundary حقيقي.
- anatomy: optional label → title/value → supporting context → visualization/media → action.
- لا يلزم كل card بجميع الأجزاء، ولا تُلف فقرة واحدة في card تلقائيًا.
- الأنواع المعتمدة: Base، Metric، Service، Task، Media، Profile، Data، Spotlight، Split، Empty.
- الـSpotlight أو gradient card واحدة في viewport؛ البقية quiet.

### Navigation

- Desktop product: side rail 240–280px + page header/command surface.
- Marketing: top nav بسيط حتى 5 روابط؛ CTA واحدة.
- Mobile: bottom navigation من 3–5 وجهات ثابتة؛ الأيقونة + label للحالة الفعالة.
- Floating dock خيار للمهام المحدودة، وليس بديلًا عن IA معقدة.
- tabs حتى 5 peers؛ أكثر من ذلك يتحول إلى list/sidebar/search.
- command palette يسرّع ولا يخفي المسار العادي.

### Dialogs, sheets, and popovers

- dialog لمهمة modal حقيقية، sheet للمهام المحمولة أو السياقية، popover لاختيارات قصيرة مرتبطة بمصدر.
- الحركة تنطلق من trigger أو الحافة المنطقية نفسها، والخروج يعكس مسار الدخول.
- focus يدخل أول عنصر مناسب، يُحصر، ويعود إلى trigger عند الإغلاق.
- background يُعطّل ويُوسم، وEscape يعمل ما لم تكن عملية حرجة غير قابلة للإلغاء.
- header بصري atmospheric ممكن في onboarding/install dialog، لكن المحتوى والزر يبقيان واضحين ومباشرين.

### Data and admin

- KPI = قيمة + label + context/period + delta موصوف، لا رقم كبير مزيف.
- line للزمن، bar للمقارنة، bullet للتقدم نحو هدف، table للدقة والكثافة.
- كل chart يملك labels/legend وقيمة نصية وبديل table أو summary عند الحاجة.
- admin shell يضم breadcrumbs فقط عند عمق 3+، saved views، filters، bulk actions، empty/error/loading، وسجل تدقيق للعمليات الحساسة.
- role/access UI يشرح الصلاحية والآثار ولا يعتمد على toggle غامض.

### Signature patterns

- **Atmospheric Cap:** مساحة لونية/رسومية أعلى dialog أو card كبير، واحدة فقط، بلا نص طويل فوقها.
- **Luminous Ledger:** بطاقة metric بخلفية expressive محكومة، مع بيانات واضحة تحتها.
- **Adaptive Dock:** dock يتسع للحالة الفعالة ويحافظ على labels وsafe area.
- **Dynamic Status Island:** لحالة مؤقتة عالية الأهمية؛ لا يتحول إلى container دائم لكل notification.
- **Cover Flow:** للاختيار البصري المحدود مع keyboard/touch/reduced-motion؛ لا لقوائم الإنتاج اليومية.
- **Swipe to Commit:** لمراجعة/إرسال عالي الثقة على الموبايل مع button fallback وUndo/receipt.

## Do's and Don'ts

### Do

- **Do** ابدأ بالمهمة، الجمهور، السياق، وRegister قبل رسم أي surface.
- **Do** اكتب Design Read واحدًا واضبط الدials الثلاثة لكل صفحة.
- **Do** استخدم tokens.css أو توليدًا من tokens.json، ولا تزرع raw hex داخل المكوّنات.
- **Do** اجعل المحتوى ظاهرًا افتراضيًا؛ الحركة تعززه ولا تفتح بوابة للوصول إليه.
- **Do** اختبر 390px، RTL، LTR، keyboard، zoom 200%، dark، reduced motion، وreduced transparency.
- **Do** اجعل كل حالة async تشرح: ماذا يحدث، كم يمكن الانتظار، وما الذي يستطيع المستخدم فعله.
- **Do** استخدم Phosphor من `react-icons/pi` في React وبوزن بصري واحد داخل السطح.
- **Do** حاذِ أعمدة المقارنة، decimal points، chart baselines، وعناوين البطاقات المتوازية.
- **Do** امنح كل مشروع signature artifact واحدًا متصلًا بقصته أو بياناته.
- **Do** استعمل gradient/glass/glow/3D بعد كتابة وظيفته وfallback الخاص به.
- **Do** ابحث في 21st.dev قبل كتابة pattern شائع، ثم أعد بناءه على توكنات NOVA وسماته الدلالية.
- **Do** سجّل الاستثناء في page override بدل تغيير النظام بصمت.

### Don't

- **Don't** تنسخ Apple أو Notion أو Vercel أو أي registry component بصريًا؛ استخرج المبدأ ثم أعد تأليفه.
- **Don't** تستخدم purple-to-blue gradient كخلفية افتراضية أو gradient text كبديل عن hierarchy.
- **Don't** تجعل ثلاث بطاقات متطابقة هي الحل التلقائي لكل section.
- **Don't** تضع كل icon داخل مربع ملون، أو كل label داخل pill، أو كل card على shadow.
- **Don't** تجمع glass + glow + foil + animated border + 3D في سطح واحد.
- **Don't** تستخدم fake browser window، fake code، fake metrics، fake urgency، أو fabricated social proof.
- **Don't** تجعل hover الطريق الوحيد للفعل أو المعلومة، ولا تزيل focus ring.
- **Don't** تستخدم placeholder بدل label، ولا تعرض error في أعلى الصفحة بعيدًا عن الحقل.
- **Don't** تحرك width/height في data UI أو تقفل الإدخال أثناء transition؛ الحركة التفاعلية يجب أن تكون interruptible.
- **Don't** تطبق negative letter-spacing على العربية، أو تقلب icons غير اتجاهية في RTL.
- **Don't** تجعل dark mode أسودًا خانقًا أو neon؛ استخدم Petrol Night وسلم surfaces واضحًا.
- **Don't** تستعمل body text أصغر من 14px أو touch target أصغر من 44px في مسار الجوال الأساسي.
- **Don't** تعتمد على اللون أو animation وحدهما للدلالة على error/success/selection.
- **Don't** تضف زرّي CTA متساويين افتراضيًا؛ استخدم primary واحدًا وبديلًا هادئًا عند الحاجة الحقيقية.
- **Don't** تعتبر النظافة وحدها هوية؛ أضف تفصيلًا مؤلفًا واحدًا، ثم احمِ هدوء ما حوله.
