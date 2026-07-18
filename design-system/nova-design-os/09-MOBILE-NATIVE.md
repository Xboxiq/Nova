# 09. Mobile and Native-feeling Web

## Mobile is a context, not a smaller desktop

الهاتف يعني يدًا واحدة، مقاطعات متكررة، كيبورد يغطي نصف الشاشة، اتصالًا متغيرًا، ووقت قرار قصيرًا. تبدأ الأولوية من task completion ثم polish.

## 390px baseline

- viewport الأساسي: 390px.
- gutter: 16px.
- touch target: 44×44px minimum، و48–52px للـprimary.
- gaps بين targets: 8px minimum.
- body: 16px، compact metadata 13–14px.
- bottom nav: 64px + safe area.
- primary CTA قريب من thumb zone دون تغطية content.

اختبر أيضًا 320px وlarge text، لأن نجاح 390px وحده لا يكفي.

## Mobile shell

```text
Safe-area top
Compact header: back/context + one utility
Scrollable content
Optional contextual sticky action
Bottom navigation or task action
Safe-area bottom
```

- لا top bar مزدحمة بـ4 icons.
- title يمكن أن ينتقل داخل content بدل ضغطه في header.
- account/notifications ليست دائمًا في كل screen إذا يمكن الوصول إليها من home/profile.

## Bottom navigation and dock

### Standard bottom navigation

- الأكثر وضوحًا للمنتج متعدد الأقسام.
- 3–5 items، icon + label.
- active state كبيرة بما يكفي دون تغيير positions.

### Floating dock

مناسب لتجربة خفيفة أو 4 destinations ثابتة كما في المرجع المرفوع.

- frosted/opaque capsule with distinct active island.
- label لا تختفي عن الجميع في production إذا كانت icons غير عالمية.
- content bottom padding يساوي dock + 16px.
- لا يطفو فوق keyboard أو checkout commit.

## Cards on mobile

- standard card full-width غالبًا، 16–20px padding.
- لا تكدس card داخل card؛ استخدم sections/dividers.
- hero metric card يمكن أن يملك atmospheric background، لكن detail يبقى readable.
- grid controls 2 columns عندما كل tile بسيط وtouch target كبير؛ otherwise list.
- card action الأساسي في أسفل card/full-width أو واضح قرب المحتوى، لا link صغيرة في corner.

## Finance and transaction patterns

### Finance overview

مستوحى من المرجع: profile/notification خفيف، net income card، goal/progress، quick actions، activity.

- balance/metric لا تُخفى إن كانت الشاشة مخصصة لها، مع privacy toggle اختياري.
- earned/spent signs واضحة.
- progress goal = saved/target + due date + status.
- quick actions 3–4 فقط.
- transaction list تعرض merchant/source، category، date، amount، status.

### Review and send

مستوحى من شاشة الإرسال الداكنة:

- recipient identity/trust.
- amount + conversion.
- fees + arrival.
- optional note.
- commit control ثابت أسفل safe area.
- dark surface مرتفعة وواضحة، لا black-on-black.

### Swipe to commit

- يُستخدم عندما يضيف intentionality إلى action حساس.
- knob يتبع finger 1:1 ويحترم grab offset.
- completion threshold + velocity projection.
- يمكن الرجوع قبل threshold.
- reader/keyboard/button fallback.
- success ينتج receipt، لا مجرد swipe animation.

### Fee/speed control

مستوحى من crypto fee reference:

- presets واضحة: economical/recommended/fast.
- slider enhancement مع usual range وestimated time.
- total cost يظهر دائمًا ويحدث مباشرة.
- warning عند above usual يعتمد text + marker + color.
- لا rainbow gauge إذا كان 3 radio options أوضح.

## Device/control dashboard

مستوحى من energy reference:

- summary metric + change context.
- devices 2-column tiles عندما action binary وسريع.
- on/off state: label + icon/shape + color.
- long-running device يعرض time remaining.
- advice/report region منفصلة عن controls.
- download action يشرح format/date range/size.

## Mobile forms

- one-column دائمًا إلا paired short fields مع سبب.
- input 48–52px.
- `inputmode` مناسب.
- scrolling active field فوق keyboard.
- sticky CTA يتوقف أو يتحرك فوق keyboard دون تغطية helper/error.
- step flow أفضل من long form إذا توجد قرارات مستقلة، لكن لا تقسم كل 3 fields إلى خطوة.
- save/resume تلقائي مع status.

## Pickers

- native date/time/select مفضل عندما يلائم التصميم ويكسب accessibility.
- wheel picker للخيارات المتسلسلة واللمس، مع visible selected row وhaptic snap اختياري.
- calendar للrange/context البصري.
- autocomplete للقوائم الكبيرة.
- avatar/image picker يوضح permissions قبل فتح الكاميرا/الصور.

## Gestures

### Tap

- highlight on down، commit on up.
- hysteresis قرابة 10px لإلغاء tap عند drag.

### Swipe

- enhancement، ليس الطريق الوحيد إلا pattern platform-standard مع تعليم واضح.
- direction aware في RTL عندما المعنى navigation، لا عند physical timeline ثابت.
- swipe actions لها visible discoverability path.

### Drag

- 1:1 tracking.
- pointer capture.
- velocity handoff.
- rubber-band عند الحدود بدل hard stop.
- keyboard/button alternative إذا action ضروري.

### Long press

- shortcut أو preview، لا action أساسي غير قابل للاكتشاف.
- feedback فوري وحسّي اختياري.

## Sheets

- grabber زخرفي لا يكفي؛ sheet يجب أن تملك title/close behavior.
- detents قليلة ومفهومة.
- content scroll لا يتصارع مع drag؛ gesture arbitration واضح.
- parent يُدفع/يُعتم تدريجيًا عند modal sheet.
- non-modal sheet لا يستخدم scrim كاملًا.
- stacked sheets نادرة؛ الأفضل navigation داخل sheet أو full-screen flow.

## Dynamic Island-inspired status

- حالات مناسبة: recording، upload، timer، connection، delivery.
- collapsed value actionable أو informative.
- tap expands، second action explicit.
- لا يطارد المستخدم بين الصفحات إذا انتهت فائدته.
- safe-area/top cutout differences handled؛ الويب لا يفترض iPhone فقط.

## Haptics and sound

- success commit، snap، error مهم فقط.
- `navigator.vibrate` enhancement مع feature detection، ولا يُستخدم لكل button.
- لا sound autoplay.
- setting واضح إن كان sound جزءًا من المنتج.

## Offline and interruption

- draft محفوظ محليًا عند forms الطويلة.
- banner يوضح offline دون تعطيل القراءة.
- queued action يوضح أنه `بانتظار الإرسال` لا `تم`.
- retry idempotent.
- app returns to same meaningful state after backgrounding.
- auth expiration يحفظ draft قدر الإمكان ثم يطلب الدخول.

## Install/PWA considerations

- install prompt contextual بعد value، لا عند أول زيارة.
- app icons/splash colors من theme tokens.
- standalone mode navigation/back tested.
- safe areas applied.
- updates لا تفاجئ المستخدم أثناء task؛ status + refresh action.

## Mobile accessibility

- dynamic type/200% text لا يكسر controls.
- orientation غير مقفلة إلا لسبب ضروري.
- screen reader order يطابق القراءة.
- icon-only controls لها names.
- gesture-only actions لها alternatives.
- reduced motion/transparency/contrast مدعومة.
- charts لا تعتمد hover.
- bottom nav labels لا تختفي بسبب text scaling.

## Mobile QA matrix

| Test | Pass condition |
|---|---|
| 320px | لا overflow وفعل أساسي متاح |
| 390px | layout الأساسي كامل |
| Large text | لا clipping أو overlap |
| Keyboard open | active field/error/CTA مرئية |
| RTL/LTR | order، gestures، icons صحيحة |
| Slow network | progress، cancel، retry |
| Offline | cached/draft/queued states صادقة |
| Reduced motion | لا parallax/spring/loop |
| Screen reader | landmarks، labels، order، state |
| Thumb reach | primary action قريب وآمن |

