# 07. Cards, Data, Dashboards, and Admin

## Cards are information contracts

البطاقة ليست radius + shadow. هي حدود فهم أو قرار. قبل استخدامها اسأل: ما الذي يصبح أوضح عندما يُجمع هذا المحتوى؟ إذا كانت الإجابة “يبدو أجمل”، استخدم spacing أو divider بدلًا منها.

## Card anatomy

```text
Optional eyebrow/status
Title or metric
Supporting context / time range
Primary content: text, media, visualization, or controls
Optional footer: action, comparison, provenance
```

الـheader والfooter ليسا إلزاميين. لا تضع action في corner صغير إذا كان جوهر البطاقة.

## Card families

### 1. Base card

- surface + hairline.
- 24px padding، radius 24px.
- grouping عادي، بلا shadow افتراضي.

### 2. Service card

- اسم الخدمة، outcome، proof/context، action.
- illustration مرتبطة بالخدمة، لا icon tile عامة.
- يمكن أن تختلف silhouette أو ratio بين الخدمات المهمة والثانوية.

### 3. Metric card

- label، value، period، delta/context.
- mini chart اختياري إذا يضيف trend لا مجرد ornament.
- delta = sign + text + semantic color.
- الرقم يستخدم tabular numerals.

### 4. Data card

- question-led title: `كيف تغيّر الدخل؟` أفضل من `الدخل` عند الحاجة.
- controls لا تزيد عن 2 داخل header؛ البقية في context menu/filter panel.
- chart، legend، annotation، summary/accessible fallback.

### 5. Task card

- status، task، owner/due، next action.
- progress يظهر كقيمة ونص، لا bar وحده.
- overdue منفصل عن destructive.

### 6. Profile card

- identity، role، trust/status، action.
- expansion يضيف detail ذات قيمة؛ لا يخفي الأساس عند collapsed.

### 7. Media card

- image/video/artifact هو dominant.
- metadata والـaction لا ينافسانه.
- aspect ratio محجوز لمنع CLS.

### 8. Spotlight card

- واحدة في viewport أو section.
- background expressive أو atmospheric cap.
- claim/value واضح فوق contrast ثابت.
- supporting surfaces حولها quiet.

### 9. Split card

- نصف معلومات ونصف preview/illustration.
- mobile يصبح stack حسب priority.
- لا overlay text فوق art إلا مع contrast ثابت ومختبر.

### 10. Empty/education card

- يشرح capability أو الخطوة التالية.
- illustration صغيرة أو object واحد.
- CTA واحدة؛ secondary docs link عند الحاجة.

## Card composition patterns

### Luminous Ledger

مستوحاة من بطاقة finance المرفوعة: atmospheric field محدود أعلى card، ثم earned/spent أو target/actual على سطح أبيض/كحلي واضح.

- الجزء الملوّن يحمل metric رئيسية فقط.
- التفاصيل تكون على surface محايدة لضمان القراءة.
- لا تستخدم halftone/mesh نفسه في كل card.

### Operational Quartet

مستوحاة من واجهة الأجهزة: 2×2 controls على mobile أو 4 columns desktop.

- كل tile يمثل جهازًا/حالة/shortcut حقيقيًا.
- اللون يعبّر عن category/status مع icon وlabel.
- off state لا يصبح invisible.
- control المتكرر يمكن long-press للتفاصيل مع زر واضح بديل.

### Comparative Pair

بطاقتان متجاورتان لقياسين مختلفين كما في dashboard المرجعي.

- نفس الفترة والمحاور أو تبرير الاختلاف.
- labels والقيم والمحاور محاذاة.
- bar للمقارنة الفئوية، step/line للزمن.
- زر `عرض التفاصيل` لا يكرر نفسه داخل كل card إذا يمكن أن يكون card clickable مع affordance واضح.

### Progress Rail

مجموعة progress bars أو stages مثل parking/payroll references.

- label + value على السطر نفسه.
- bars بنفس scale إذا كانت قابلة للمقارنة.
- colors لا تتحول إلى rainbow بلا معنى؛ semantic أو category palette موثقة.

### Journey Timeline

لـonboarding، order tracking، career path.

- current، completed، upcoming، blocked states.
- mobile vertical غالبًا أفضل؛ desktop horizontal إذا 3–5 steps قصيرة.
- كل node keyboard/touch accessible إذا كان قابلًا للفتح.

## Dashboard architecture

### سؤال واحد قبل الـwidgets

اكتب: `بعد 10 ثوانٍ في هذه اللوحة، يجب أن يعرف المستخدم ______.`

كل widget لا يخدم الإجابة أو action التالي يُحذف أو ينقل إلى detail.

### Recommended hierarchy

1. **Scope:** account/workspace، period، saved view.
2. **Health:** 2–5 KPIs فقط.
3. **Change:** trend/comparison رئيسي.
4. **Cause:** breakdown أو segment.
5. **Action:** alerts، tasks، exceptions.
6. **Evidence:** activity/table/export.

### KPI rules

- القيمة دون baseline أو time range ناقصة.
- percent change يوضح المقارنة: `مقارنة بالأسبوع الماضي`.
- no fake precision: لا `84.378%` إن لم يحتج القرار.
- currency/unit موجودة ولا تعتمد على icon.
- real-time value يعلن update بشكل throttled ولا يسرق focus.

## Chart selection

| سؤال المستخدم | النمط | لا تستخدمه عندما |
|---|---|---|
| كيف تغيّر عبر الزمن؟ | Line/area | أقل من 4 نقاط؛ استخدم stat |
| أي فئة أكبر؟ | Sorted bar | أكثر من 50؛ استخدم table |
| أين نحن مقابل الهدف؟ | Bullet chart | لا يوجد target حقيقي |
| ما نسبة الجزء من الكل؟ | 100% stacked/waffle | أكثر من 5 فئات أو الدقة أهم |
| ما التوزيع؟ | Histogram/box plot | الجمهور لا يفهمه دون شرح |
| أين anomaly؟ | Line + shape marker + annotation | color-only highlight |
| ما المتوقع؟ | Actual solid + forecast dashed + confidence band | لا يوجد baseline/uncertainty صادق |
| ما القيمة الدقيقة؟ | Table | لا تحول كل شيء إلى chart |

### Chart accessibility

- title يصف insight أو السؤال.
- visible values عندما الدقة مهمة.
- series تختلف باللون + dash/shape.
- legend keyboard/touch accessible إذا تفاعلية.
- tooltip ليس الطريق الوحيد للبيانات.
- data table أو summary متاح.
- real-time chart يملك pause.
- reduced motion يوقف scrolling/streaming animation.

### Palette

- single-series: Cobalt + neutral grid.
- comparison: Cobalt + Sky أو Mint، مع line style مختلف.
- warning/anomaly: Coral/Red + shape/label.
- positive/negative finance: Green/Coral مع sign والنص.
- لا تستخدم red-to-green gradient وحده بسبب color vision.

## Table system

### Anatomy

- title/context.
- search، filters، saved views.
- column headers + sort state.
- rows + selection + contextual actions.
- pagination/infinite policy واضحة.
- density switch اختياري للخبراء.

### Rules

- sort indicator + `aria-sort`.
- numeric columns aligned consistently، tabular figures.
- row action visible on focus؛ ليس hover-only.
- bulk bar يظهر بعد selection ويحافظ على count.
- destructive bulk action يحتاج summary وتأكيد حسب reversibility.
- sticky header عندما table أطول من viewport، مع contrast edge.
- virtualization عند آلاف rows مع قياس واختبار screen reader strategy.
- empty search يختلف عن empty dataset.
- export يوضح format وscope/time range.

### Mobile table transformation

الأولوية:

1. identity + primary value/status.
2. row detail sheet للحقول الباقية.
3. actions في overflow أو swipe enhancement مع visible fallback.
4. horizontal scroll فقط إذا المقارنة بين الأعمدة هي المهمة، مع first column sticky وedge cue.

## Admin shell

### Core regions

- workspace/account switch.
- primary navigation.
- global search/command.
- page context + permissions.
- filters/saved views.
- work surface.
- activity/audit/support.

### Admin principles

- **Explain scope:** هل التغيير على user، team، workspace، أم organization؟
- **Preview impact:** عدد المتأثرين، البيانات المحذوفة، أو الصلاحيات المكتسبة.
- **Reversibility first:** Undo أو grace period قبل modal confirmation عندما ممكن.
- **Auditability:** من فعل ماذا ومتى، مع timezone/source.
- **Least privilege:** default role أقل صلاحية مناسبة، لا admin تلقائي.
- **Safe defaults:** dangerous permissions off، integrations scoped.

## Access and roles

### Role list

- role name + short outcome.
- member count.
- scope.
- system/custom badge.
- last modified + owner.

### Permission editor

- group by domain/user task، لا API endpoint.
- `View`, `Create`, `Edit`, `Delete`, `Manage` hierarchy عند ملاءمته.
- dependent permissions تظهر relation وتطلب تأكيدًا قبل auto-enable.
- custom changes summary قبل save.
- search/filter للمئات من permissions.
- compare role side-by-side مع aligned rows.

### Member access flow

1. identify member/invitee.
2. choose role/recommended default.
3. optional exceptions advanced.
4. review scope and expiry.
5. commit + receipt/audit event.

### Sensitive actions

- suspend ≠ delete ≠ remove from workspace.
- label يصف النتيجة الدقيقة.
- typed confirmation آخر حل للعمليات غير القابلة للتراجع وعالية الخطر فقط.
- لا تجعل danger zone مجرد card حمراء تجذب الانتباه دائمًا؛ ضعها في نهاية settings مع boundary واضح.

## Filters and saved views

- top 2–4 filters visible، البقية في filter panel.
- كل filter يظهر applied state وclear path.
- result count يتحدث مباشرة.
- saved view تحفظ filters + sort + columns + density، وتوضح private/shared.
- URL يعكس shareable state عندما آمن.
- `Reset` يعيد default known، و`Clear` يزيل القيود؛ لا تخلطهما.

## Loading, empty, error, stale

| State | Dashboard/table response |
|---|---|
| First load | skeleton مطابق + page shell ثابت |
| Refresh | data تبقى مع progress subtle، لا blank screen |
| Partial error | card/section retry محلي مع باقي الصفحة |
| Empty dataset | explanation + first setup action |
| Empty filter | query/filter summary + clear action |
| Stale | timestamp + refresh/reconnect status |
| Offline | cached data label + unavailable actions |

## Data performance

- downsample أكثر من 1000 نقطة في SVG؛ Canvas/WebGL للأحجام الأكبر.
- لا تعيد render لكل live tick؛ batch/throttle.
- reserve chart dimensions لتجنب CLS.
- lazy-load charts أسفل fold، لكن لا تؤخر KPI الأساسية.
- لا تضع blur/shader خلف table scrolling.
- profile قبل memoization؛ لا تضف complexity بلا قياس.

## Dashboard and admin QA

- [ ] سؤال اللوحة الأساسي مكتوب.
- [ ] كل KPI له period/baseline.
- [ ] chart مختار حسب سؤال لا حسب شكله.
- [ ] بديل نصي/جدولي متاح.
- [ ] filters قابلة للمشاركة/الإلغاء بوضوح.
- [ ] tables تعمل بالكيبورد وRTL.
- [ ] scope والآثار واضحة في admin.
- [ ] access يعتمد least privilege وله audit trail.
- [ ] loading/partial error/empty/stale/offline مصممة.
- [ ] mobile لا يحول البيانات إلى cards عشوائية تفقد المقارنة.
