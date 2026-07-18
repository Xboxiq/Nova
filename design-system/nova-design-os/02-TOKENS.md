# 02. Tokens

## Source of truth

- `DESIGN.md` frontmatter: الطبقة المعيارية المختصرة.
- `tokens/tokens.json`: المصدر الآلي الكامل.
- `tokens/tokens.css`: output جاهز للويب.
- `.impeccable/design.json`: extensions للحركة والظلال والـbreakpoints.

لا تُكرّر القيم يدويًا داخل المكوّنات. إذا احتاجت المنصة SwiftUI أو Flutter أو React Native، تُحوّل `tokens.json` إلى format محلي مع الحفاظ على الأسماء semantic.

## Naming model

يعمل النظام بثلاث طبقات:

1. **Primitive:** قيمة خام مثل `cobalt.600` أو `space.4`.
2. **Semantic:** معنى سياقي مثل `color.action.primary` أو `surface.canvas`.
3. **Component:** تخصيص محدود مثل `button.primary.background`.

المكوّن يستهلك semantic tokens أولًا. لا يستهلك primitive إلا إذا كان visual asset متخصصًا ومُوثقًا.

## Theme colors

### Light: Cobalt Day

| Semantic token | Value | الاستخدام |
|---|---:|---|
| `--nova-canvas` | `#F3F7F8` | page/app canvas |
| `--nova-surface` | `#FFFFFF` | primary surface |
| `--nova-surface-quiet` | `#EAF0F2` | nested/grouped surface |
| `--nova-surface-raised` | `#FBFDFD` | floating tools |
| `--nova-ink` | `#10242E` | primary text |
| `--nova-ink-secondary` | `#455E68` | secondary text |
| `--nova-ink-tertiary` | `#5D747D` | metadata/placeholder مع فحص التباين على السطح الهادئ |
| `--nova-border` | `#D6E1E4` | standard border |
| `--nova-border-strong` | `#B8C9CE` | selected/divider strong |
| `--nova-action` | `#0068D9` | primary action |
| `--nova-action-hover` | `#005EC6` | hover |
| `--nova-action-pressed` | `#004EA8` | pressed |
| `--nova-action-soft` | `#DCEEFF` | selected/quiet |
| `--nova-action-ink` | `#004F9E` | text/icon on soft action surface |
| `--nova-success` | `#0B704B` | success text/icon |
| `--nova-success-soft` | `#E6F6EF` | success background |
| `--nova-warning` | `#9A5C08` | warning text/icon |
| `--nova-warning-soft` | `#FFF3D9` | warning background |
| `--nova-danger` | `#C43B4D` | destructive/error |
| `--nova-danger-soft` | `#FFECEF` | error background |
| `--nova-info` | `#1769AA` | info/link when not primary |
| `--nova-info-soft` | `#E7F3FC` | info background |

### Dark: Petrol Night

| Semantic token | Value | الاستخدام |
|---|---:|---|
| `--nova-canvas` | `#0D1B22` | lifted petrol canvas |
| `--nova-surface` | `#122833` | primary surface |
| `--nova-surface-quiet` | `#19343F` | nested/selected surface |
| `--nova-surface-raised` | `#21414F` | floating tools |
| `--nova-ink` | `#F3FAFB` | primary text |
| `--nova-ink-secondary` | `#C0D0D4` | secondary text |
| `--nova-ink-tertiary` | `#91A8AF` | metadata مع AA على raised surface |
| `--nova-border` | `#294955` | standard border |
| `--nova-border-strong` | `#3D6270` | selected/divider strong |
| `--nova-action` | `#70B7FF` | primary action/focus |
| `--nova-action-hover` | `#89C4FF` | hover |
| `--nova-action-pressed` | `#57A7F6` | pressed |
| `--nova-action-soft` | `#103A57` | selected/quiet |
| `--nova-action-ink` | `#A8D4FF` | text/icon on soft surface |
| `--nova-success` | `#67D8AA` | success |
| `--nova-success-soft` | `#173B32` | success background |
| `--nova-warning` | `#F2BE70` | warning |
| `--nova-warning-soft` | `#44331D` | warning background |
| `--nova-danger` | `#FF909D` | destructive/error |
| `--nova-danger-soft` | `#4A2530` | error background |
| `--nova-info` | `#77C9F5` | info/link |
| `--nova-info-soft` | `#143B50` | info background |

## Expressive palette

ليست semantic ولا primary. تُستعمل في artwork والـcharts بعد فحص contrast.

| Name | Value | شخصية |
|---|---:|---|
| Mint Beam | `#37CDB0` | نمو وطاقة هادئة |
| Coral Pulse | `#FF8068` | حركة ولفت نظر إنساني |
| Amber Ray | `#F4B342` | دفء وتقدم |
| Sky Signal | `#5DBBF0` | معلومات وتدفق |
| Frost Light | `#BEEAFF` | ضوء وانكسار مادي |

الحد الطبيعي: Cobalt وظيفي + expressive color واحد في surface واحدة. atmospheric artwork واحد يمكنه مزج Ice/Mint/Coral/Amber بتدرج مضبوط، وcharts تتجاوز ذلك فقط مع palette موثقة وأنماط/line styles بديلة.

## Typography tokens

| Token | Size | Weight | Line height | الاستخدام |
|---|---:|---:|---:|---|
| `display-2xl` | `clamp(56px, 7vw, 96px)` | 650 | 1.00 | campaign/launch فقط |
| `display-xl` | `clamp(40px, 6vw, 88px)` | 650 | 1.02 | hero |
| `headline-lg` | `clamp(32px, 4vw, 56px)` | 650 | 1.10 | section lead |
| `headline-md` | `clamp(28px, 3vw, 48px)` | 650 | 1.15 | page/section |
| `title-lg` | 24px | 650 | 1.30 | page/card title |
| `title-md` | 20px | 650 | 1.35 | component title |
| `body-lg` | 18px | 400 | 1.65 | lead/editorial |
| `body-md` | 16px | 400 | 1.60 | default body |
| `body-sm` | 14px | 400 | 1.50 | compact/data |
| `label-md` | 13px | 600 | 1.35 | labels |
| `label-sm` | 12px | 600 | 1.35 | metadata فقط |

Arabic font metrics قد تجعل السطر أطول. اجعل `line-height` أعلى بمقدار 0.05–0.12 عند الحاجة بدل تصغير الخط.

## Spacing

4px هو base unit، لكن لا يعني أن كل قيمة يجب أن تكون مضاعفًا صغيرًا.

| Token | Value | الاستخدام |
|---|---:|---|
| `space-0.5` | 2px | optical correction فقط |
| `space-1` | 4px | icon/text micro gap |
| `space-2` | 8px | compact control gap |
| `space-3` | 12px | field internals |
| `space-4` | 16px | base gap |
| `space-5` | 20px | compact card padding |
| `space-6` | 24px | standard card padding |
| `space-8` | 32px | large group |
| `space-10` | 40px | section sub-gap |
| `space-12` | 48px | section gap product |
| `space-16` | 64px | section gap content |
| `space-20` | 80px | marketing chapter |
| `space-24` | 96px | hero/editorial chapter |
| `space-28` | 112px | product chapter transition |
| `space-32` | 128px | major editorial separation |

Composition aliases:

| Token | Value | الاستخدام |
|---|---:|---|
| `gutter-page` | `clamp(20px, 3.5vw, 64px)` | page inline gutter |
| `section-space` | `clamp(88px, 8vw, 144px)` | major chapter rhythm |
| `section-space-compact` | `clamp(64px, 6vw, 104px)` | dense/product chapter |
| `copy-gap` | `clamp(20px, 2vw, 32px)` | heading-to-body grouping |
| `card-inset` | `clamp(20px, 2.2vw, 32px)` | responsive surface inset |

### Density modes

- `comfortable`: card 24–32px، control 44–48px، row 52–64px.
- `compact`: card 16–20px، control 36–40px desktop only، row 40–48px.
- `spacious`: card 32–48px، control 48–52px، section 80–128px.

لا يُصغّر touch target عند تبديل density على الجوال.

## Shape

| Token | Value | الدور |
|---|---:|---|
| `radius-control` | 10px | buttons، compact icon controls |
| `radius-field` | 16px | fields، list regions |
| `radius-card` | 24px | standard cards |
| `radius-feature` | 32px | dialogs، hero/spotlight |
| `radius-pill` | 999px | segmented controls، small filters، dock shell |

الـpill ليس default button. اختياره يعني control قصير أو مجموعة مستمرة أو chrome عائم.

## Control and icon geometry

| Token family | Values | الاستخدام |
|---|---|---|
| `control-size` | 36, 44, 52, 60px | compact, standard, large, commit |
| `hit-min` | 44px | minimum touch-critical target |
| `icon-size` | 16, 20, 24, 32px | optical glyph sizes |
| `icon-container` | 32, 40, 48, 64px | tonal, outline, glass, and feature tiles |

لا تكبّر glyph بنسبة container نفسها: كلما كبرت الحاوية تزداد المساحة الداخلية كي تبقى الأيقونة هادئة بصريًا.

## Borders and focus

- border: `1px`، ولا يُستخدم `2px` إلا selected/high-contrast state.
- divider: `1px` مع inset منطقي عندما لا ينبغي أن يقطع surface كاملًا.
- focus: `2px solid var(--nova-focus)` مع `2px` offset.
- focus لا يختفي على mouse click إذا كان يساعد على فهم الحالة؛ `:focus-visible` هو الافتراضي.

## Elevation

| Token | Value | الدور |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgb(18 21 40 / 4%), 0 8px 24px rgb(18 21 40 / 6%)` | sticky row/tool |
| `shadow-md` | `0 12px 36px rgb(18 21 40 / 10%)` | popover/dock |
| `shadow-lg` | `0 28px 90px rgb(18 21 40 / 18%)` | dialog/spotlight |
| `shadow-dark` | `0 18px 54px rgb(5 8 22 / 28%)` | dark floating surface |

الظل لا يحدد grouping. إذا اختفى الظل يجب أن تبقى البنية مفهومة بالسطح والحد والمسافة.

## Motion

| Token | Value | الدور |
|---|---:|---|
| `motion-instant` | 90ms | press/highlight |
| `motion-fast` | 160ms | hover، icon change |
| `motion-base` | 240ms | state transition |
| `motion-slow` | 360ms | popover/sheet/dialog |
| `motion-scene` | 480ms | shared layout/hero |
| `motion-press` | 90ms | pointer-down response |
| `motion-control` | 180ms | control color/state |
| `motion-disclosure` | 260ms | anchored popover/reveal |
| `motion-route` | 420ms | shared-axis navigation |

Easing:

- `ease-standard`: `cubic-bezier(.2,.8,.2,1)`
- `ease-enter`: `cubic-bezier(.16,1,.3,1)`
- `ease-exit`: `cubic-bezier(.4,0,1,1)`
- spring default: damping ratio 1.0، response 0.4s.
- momentum spring: damping 0.8، response 0.3–0.4s، بعد flick/drag فقط.

## Layout and layers

| Token | Value |
|---|---:|
| `content-reading` | 720px |
| `content-form` | 880px |
| `content-standard` | 1200px |
| `content-wide` | 1512px |
| `sidebar` | 264px |
| `rail` | 72px |
| `topbar` | 64px |
| `mobile-nav` | 64px + safe area |

Z-index scale:

- base 0
- sticky 100
- dropdown 300
- dock 400
- overlay 600
- modal 700
- toast 900
- command palette 1000

لا تُنشأ قيم عشوائية مثل 99999. كل portal ينتمي إلى layer واضحة.

## Theme switching

1. يتبع `prefers-color-scheme` عند أول زيارة.
2. اختيار المستخدم المكتوب `light|dark|system` يتغلب عليه.
3. يُضبط `color-scheme` قبل render لتجنب flash.
4. charts، illustrations، shadows، scrims، وimages تُضبط لكل theme، لا background/text فقط.
5. انتقال theme لا يحرّك كل عنصر؛ crossfade قصير 160–240ms، وبدون brightness flash.

## Migration from current NOVA tokens

التنفيذ الحالي يحتفظ بتوكناته إلى أن تبدأ migration مقصودة. المطابقة الأساسية:

| Current | Design OS |
|---|---|
| `--canvas` | `--nova-canvas` |
| `--surface` | `--nova-surface` |
| `--surface-quiet` | `--nova-surface-quiet` |
| `--text` | `--nova-ink` |
| `--text-secondary` | `--nova-ink-secondary` |
| `--border` | `--nova-border` |
| `--accent` | `--nova-action` |
| `--accent-soft` | `--nova-action-soft` |

يجب أن تتم migration في PR منفصل مع screenshots للوضعين و390px، ولا يُخلط نصف النظام القديم ونصف الجديد داخل component واحدة.
