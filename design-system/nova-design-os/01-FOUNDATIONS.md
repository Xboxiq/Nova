# 01. Foundations

## الهدف

هذا الملف يحدد طريقة التفكير قبل الألوان والمكوّنات. لا تُحل مشكلة معلوماتية بمؤثر بصري، ولا تُحوّل مكتبة الإلهام إلى واجهة قبل معرفة المهمة والسياق.

## Creative North Star

**The Luminous Instrument - الأداة المضيئة**

الأداة الجيدة تختفي أثناء العمل، تكشف حالتها عند الحاجة، وتستجيب كما لو كانت مرتبطة مباشرة بيد المستخدم. “المضيئة” لا تعني glow دائمًا، بل وضوح المسار، خفة السطح، وإشارة دقيقة تقود النظر.

### صفات الهوية

- **Calm confidence:** هدوء بلا برود، وثقة بلا صراخ.
- **Spatial clarity:** كل طبقة ومجموعة لها سبب ومكان.
- **Tactile response:** press وdrag وsheet تستجيب فورًا وباستمرارية.
- **Arabic fluency:** العربية أصل معماري لا ترجمة لاحقة.
- **Selective wonder:** لحظة واحدة مدهشة، وبقية الشاشة تخدمها.
- **Operational honesty:** لا أرقام أو شهادات أو حالات مصطنعة.

### Anti-references

- SaaS template عام بلون بنفسجي/أزرق.
- glassmorphism يغطي كل شيء.
- luxury زائف قائم على نص صغير ومساحة فارغة بلا مضمون.
- dashboard مزدحم لأن “الاحتراف” فُهم على أنه عدد widgets.
- Apple clone يستخدم blur وpill من دون سلوك أو صرامة.
- Notion clone يحوّل كل شيء إلى blocks بلا hierarchy.
- Vercel clone يختزل الهوية في الأبيض والأسود وGeist.

## المبدأ الأعلى: Purpose before style

قبل أي تصميم، أجب بجملة واحدة عن كل سؤال:

1. من المستخدم في هذه اللحظة؟
2. ما المهمة التي جاء لينجزها؟
3. ما القرار الأصعب داخل المهمة؟
4. ما المعلومة التي تمنحه الثقة؟
5. ما الحالة التي يجب أن يتذكرها بعد الانتهاء؟

إذا لم توجد إجابات، يُبنى wireframe محتوى فقط. لا يُختار gradient أو card pattern أو motion preset بعد.

## Design Registers

### 1. Product Register

لـSaaS، settings، forms، workflow، tools.

- Variance: 4–6
- Motion: 3–5
- Density: 5–7
- Surfaces: opaque/tonal
- Signature: interaction أو state transition واحد
- ممنوع: hero treatment داخل شاشة عمل، زخرفة على كل control

### 2. Editorial Register

لـmarketing، قصص، case studies، onboarding narrative.

- Variance: 6–8
- Motion: 4–6
- Density: 3–5
- Surfaces: canvas + image/type-led sections
- Signature: artwork، typography، أو atmospheric composition
- ممنوع: تكرار feature cards المتساوية وCTA pair الجاهز

### 3. Data Register

لـanalytics، finance، operations، admin، monitoring.

- Variance: 3–5
- Motion: 2–4
- Density: 7–9
- Surfaces: hairlines، tables، aligned cards
- Signature: chart annotation أو live status واحد
- ممنوع: bounce، glass فوق data، donut لكل رقم

### 4. Immersive Register

لـshowcase، launch، gallery، visual selection.

- Variance: 7–9
- Motion: 6–8
- Density: 2–4
- Surfaces: stage + one artifact
- Signature: Cover Flow، spatial object، shader، cinematic transition
- ممنوع: استخدامه في مهمة متكررة أو شاشة إدارة

## قاعدة المزج

اختَر Register أساسيًا واحدًا. يمكن استعارة حركة أو سطح واحد من Register ثانوي إذا حقق واحدًا من الآتي:

- يوضح العلاقة المكانية.
- يشرح تغير الحالة.
- يقلل زمن القرار.
- يبني ثقة في إجراء حساس.
- يقدم هوية مرتبطة بمحتوى حقيقي.

“يبدو جميلًا” وحدها ليست مبررًا كافيًا.

## Design Dials

### DESIGN_VARIANCE

يقيس مقدار الاختلاف في composition، الأحجام، silhouette، والتوازن.

- 1–3: متماثل، شبكي، utility.
- 4–6: تباين مدروس، مناسب للمنتج.
- 7–8: art direction قوي مع بنية واضحة.
- 9–10: تجريبي، لا يُستخدم إلا في surface قصير ومحدد.

### MOTION_INTENSITY

يقيس عدد العناصر المتحركة، المسافة، الاستمرارية، والفيزياء.

- 1–3: state feedback فقط.
- 4–6: transitions + shared spatial cues.
- 7–8: gesture physics أو scene choreography.
- 9–10: تجربة عرض كاملة، مع نسخة reduced-motion مستقلة.

### VISUAL_DENSITY

يقيس كمية المعلومات والقرارات في viewport، لا مجرد صغر المسافات.

- 1–3: story/gallery.
- 4–6: content/product.
- 7–8: data/admin.
- 9–10: expert console مع personalization وvirtualization.

## قوانين UX كأداة قرار

| القانون | قاعدة NOVA | مثال تطبيقي |
|---|---|---|
| Jakob’s Law | حافظ على mental model المألوف | cart يبقى cart، dialog يغلق بـEscape، back يتصرف كتاريخ تنقل |
| Hick’s Law | قلل الخيارات الفعلية في لحظة القرار | recommended option، filters، steps، search |
| Fitts’s Law | كبّر الهدف وقرّبه من أثره | action في row نفسها، bottom CTA داخل thumb zone |
| Proximity | المسافة لغة علاقة | helper/error مع field، لا في banner بعيد |
| Common Region | boundary تعني مجموعة حقيقية | card لخدمة أو وحدة بيانات، لا لكل فقرة |
| Von Restorff | عنصر واحد يكسر الإيقاع | primary action أو selected plan فقط |
| Doherty Threshold | feedback دون انتظار إدراكي | pressed خلال 100ms، optimistic state عند الأمان |
| Goal Gradient | التقدم يقرّب النهاية | step name + percent + next action |
| Peak-End | النهاية تصوغ الذاكرة | receipt واضح، success هادئ، undo متاح |
| Tesler’s Law | النظام يحمل التعقيد قدر الإمكان | defaults ذكية مع advanced section، لا حذف الخيارات الضرورية |

## Color psychology

الألوان تُستخدم كإشارات سلوكية، لا كادعاءات نفسية قطعية.

| العائلة | الإحساس المقصود | الاستخدام | المحاذير |
|---|---|---|---|
| Cobalt | تركيز، وضوح، ثقة عملية | action، selection، focus | إذا انتشر على كل surface يفقد دلالته |
| Petrol Navy | عمق هادئ واستقرار | dark canvas، enterprise regions | لا يقترب من الأسود الخانق |
| Mint/Green | تقدم وسلامة | success، earned، positive delta | لا يعني “انقر هنا” |
| Coral/Red | انتباه وخطر بشري | destructive، overdue، anomaly | لا يُستخدم كزينة |
| Amber | حذر ودفء | warning، pending، highlight محدود | يجب تمييزه عن success |
| Sky/Ice | معلومات وحركة وانكسار ضوئي | info، link، secondary data، glass caustic | لا يتحول إلى glow عام |

## Signature grammar

كل منتج جديد يختار ثلاث طبقات فقط:

1. **One signature artifact:** رسم، جسم 3D، chart مميز، أو interaction.
2. **One atmospheric field:** grain خفيف، color wash، light falloff، أو void.
3. **One bespoke silhouette:** cap، arch، dock، cutout، أو split card.

ثم تُمنع بقية الحيل من منافستها. الهوية تنشأ من التكرار المنضبط لهذه القواعد، لا من كثرة الاختلاف.

## Illustration direction

- الرسوم تشرح مفهومًا أو حالة، ولا تملأ الفراغ.
- أسلوب NOVA الافتراضي: أشكال ناعمة شبه هندسية، ضوء ملوّن محدود، حواف واضحة، وخامة grain دقيقة.
- الـ3D يكون “object with purpose”: ملف، أداة، مخطط، جهاز، أو رمز خدمة. لا blobs عامة.
- داخل product UI، الرسم لا يتجاوز 35% من card إلا في empty/onboarding/spotlight.
- لكل رسم alt text يصف المعنى، أو `aria-hidden` إذا كان زخرفيًا بالكامل.
- تُجهّز نسخة dark مستقلة لا مجرد خفض brightness.

## قرار الهوية لأي مشروع جديد

اكتب قبل التنفيذ:

```yaml
creative_north_star: "اسم استعارة واحدة"
register: product | editorial | data | immersive
dials: { variance: 6, motion: 4, density: 7 }
dominant_emotion: calm | confidence | momentum | curiosity
signature_artifact: "شيء مرتبط بالمنتج"
atmosphere: "نوع واحد فقط"
hero_or_primary_task: "العمل الأساسي"
anti_references:
  - "ثلاثة أشياء يجب ألا يشبهها"
```

لا يبدأ high-fidelity قبل اكتمال هذه الكتلة.
