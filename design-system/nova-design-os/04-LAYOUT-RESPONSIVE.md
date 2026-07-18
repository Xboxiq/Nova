# 04. Layout and Responsive Systems

## Layout philosophy

الـlayout يحول الأولوية إلى مسافة ومحاذاة. لا يبدأ من “كم card نضع؟” بل من علاقة المحتوى: تسلسل، مقارنة، مراقبة، اختيار، أو تحرير.

## Canvas and containers

| Container | Max width | Use |
|---|---:|---|
| Reading | 720px | articles، policies، help |
| Form | 880px | onboarding، settings، checkout |
| Standard | 1200px | product pages، marketing sections |
| Wide | 1512px | admin، component gallery، complex data |

Page gutters:

- 320–479px: 16px
- 480–767px: 20px
- 768–1199px: 24px
- 1200px+: 32px
- cinematic/editorial يمكن أن يصل 48px لكن ليس داخل dense admin.

استخدم `padding-inline` و`margin-inline` و`inset-inline` دائمًا.

## Grid

### Standard 12-column

- Desktop: 12 columns، gap 24px.
- Tablet: 8 columns، gap 20px.
- Mobile: 4 columns، gap 16px.
- Content لا يلزم أن يملأ الأعمدة كلها. reading text يبقى محدود العرض داخل canvas واسع.

### Data grid

- Sidebar منفصل، content grid 12 columns.
- KPI cards من 3–4 columns حسب عرض container، لا viewport فقط.
- chart رئيسي 8–9 columns، context rail 3–4 columns.
- الجدول يمتد بعرض region ويستخدم horizontal scroll فقط عندما تستحيل إعادة التركيب؛ أول عمود action/identity يبقى sticky عند الحاجة.

### Bento with purpose

يسمح بـbento عندما تختلف الوحدات فعليًا في القيمة أو نوع المحتوى. لا تُعطى card حجمًا أكبر لمجرد كسر التماثل.

- primary feature: span 7–8.
- secondary proof: span 4–5.
- compact utility: span 3–4.
- mobile: ترتيب reading priority، لا ترتيب CSS المرئي فقط.

## Responsive strategy

الـbreakpoints إشارات لا تصميمات منفصلة:

| Breakpoint | Intent |
|---|---|
| 390px | اختبار الهاتف الأساسي |
| 480px | large phone/small fold |
| 768px | tablet/compact laptop |
| 1024px | full product shell يبدأ |
| 1280px | wide data/product |
| 1536px | max-wide composition |

المكوّن يستخدم container queries عندما يعتمد على عرضه المحلي. page shell فقط يعتمد viewport media queries.

## Responsive transformations

لا يعني responsive تصغير كل شيء.

| Desktop pattern | Mobile transformation |
|---|---|
| sidebar | drawer أو bottom sheet + top trigger |
| 3-column compare | horizontal snap مع labels ثابتة، أو stack مع summary أولًا |
| table | priority columns + row detail sheet، أو cards عند انخفاض الدقة المطلوبة |
| split hero | text أولًا ثم artifact؛ لا overlay إذا أضر القراءة |
| toolbar | primary action ثابت + overflow menu للأقل استخدامًا |
| modal | full-width bottom sheet أو full-screen flow |
| hover details | visible summary + tap detail |
| tabs كثيرة | select/list navigation |
| filter rail | filter sheet مع count وClear/Apply |

## Page archetypes

### 1. Task page

```text
Page header: title + context + one primary action
Optional status/steps
Primary work region
Supporting details or activity
```

مناسب لـcreate/edit/review. لا hero ولا marketing copy.

### 2. Overview dashboard

```text
Context bar: scope + period + saved view
KPI strip: 2–5 metrics
Primary trend/comparison
Secondary operational cards
Recent activity/table
```

السؤال الأساسي للوحة يجب أن يكون معروفًا. dashboard ليست مخزن widgets.

### 3. Settings

```text
Settings navigation
Section title + consequence
Grouped fields
Inline save state or sticky save bar if edits span sections
```

تظهر unsaved changes بوضوح، ويحذر الخروج عند وجود loss حقيقي فقط.

### 4. Admin/access

```text
Breadcrumb + page title + scope
Search/filter/saved view
Role summary
Permission matrix or member table
Audit context + destructive area separated
```

صلاحيات حساسة تشرح الأثر باللغة، ولا تختزل إلى grid من checkboxes بلا context.

### 5. Marketing/landing

```text
Compact navigation
Hero: one claim + one primary action + signature artifact
Proof close to claim
3–5 narrative chapters with varied composition
Decision section
Plain footer
```

لا يُستخدم النموذج الجاهز: pill eyebrow + huge gradient heading + CTA pair + three feature cards + logo cloud + testimonials + gradient CTA.

### 6. Onboarding/multi-step

```text
Progress and exit/safety
One decision per step
Preview or helper near the decision
Primary action near thumb/reading end
Save/resume state
```

يجب أن يجيب: أين أنا؟ كم بقي؟ هل يمكن الرجوع؟ هل حُفظت بياناتي؟

### 7. Gallery/catalog

```text
Search + filters + view switch
Curated/featured region
Masonry or grid based on content ratio
Persistent metadata and source
Preview detail
```

لا تُجبر كل preview على نسبة واحدة إذا كانت طبيعتها مختلفة.

## Alignment rules

- النص العربي يبدأ من inline-start، والأرقام في جداول المقارنة يمكن أن تُحاذى decimal بصريًا.
- actions المتوازية في cards تُحاذى في نهاية المنطقة دون fixed card height أعمى.
- KPI label/value/delta تستخدم baseline مشتركة.
- parallel comparison columns تتطابق في row structure حتى عند غياب قيمة: استخدم placeholder دلالي لا فراغًا محيرًا.
- لا يُلصق النص بالحافة: 16px الحد الأدنى داخل compact surface، و24px الافتراضي للبطاقات.

## Layering and overflow

- لا تستخدم `overflow:hidden` على parent إلا إذا كان القص جزءًا من silhouette ومع اختبار focus/shadow/menu.
- أي عنصر يتجاوز container يجب أن يملك “clear the cut”: clip مقصود، mask، أو مساحة تمنع القطع العرضي.
- dropdown/popover يدخل portal عندما قد يُقص أو يتعارض مع stacking context.
- sticky header يحجز مساحته ولا يغطي anchor target؛ استخدم `scroll-margin-block-start`.
- modals وtoasts وcommand palette تتبع layer scale في tokens.

## Safe areas and mobile viewport

```css
padding-block-end: calc(16px + env(safe-area-inset-bottom));
padding-inline-start: max(16px, env(safe-area-inset-left));
padding-inline-end: max(16px, env(safe-area-inset-right));
```

- استخدم `100dvh` للواجهات الكاملة مع fallback، لا `100vh` وحده.
- input لا يُغطى بالكيبورد؛ scroll active field إلى view.
- bottom dock يحترم safe area ولا يغطي آخر محتوى؛ أضف content inset مساويًا لارتفاعه.

## Density and personalization

- density preference يمكن أن تكون user setting في admin/data فقط.
- compact لا يخفض font body تحت 14px ولا touch targets على touch devices.
- expert users يمكنهم تثبيت columns، حفظ views، وإخفاء widgets غير المهمة.
- default يبقى قابلًا للفهم دون تخصيص.

## Layout QA

- [ ] 320px دون horizontal overflow غير مقصود.
- [ ] 390px مع safe area وmobile keyboard.
- [ ] 768px لا تقع الصفحة بين mobile وdesktop بشكل مكسور.
- [ ] 1024px sidebar لا تترك content ضيقًا جدًا.
- [ ] 1440–1536px لا تتمدد القراءة إلى سطور طويلة.
- [ ] 200% zoom دون فقد وظيفة أو overlap.
- [ ] RTL وLTR لهما ترتيب DOM منطقي واحد.
- [ ] focus لا يُقص بـoverflow أو sticky layers.
- [ ] cards المتوازية لا تُشوّه محتواها لأجل تماثل مصطنع.
- [ ] آخر محتوى مرئي فوق bottom nav/dock.

