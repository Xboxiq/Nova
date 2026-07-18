# 08. Motion and Materials

## Motion philosophy

الحركة سلوك يشرح: feedback، causality، hierarchy، progress، أو spatial continuity. إذا لم تؤد واحدة منها فهي مرشحة للحذف.

## Apple-inspired fluid principles

### 1. Immediate feedback

- visual response على pointer-down خلال 100ms.
- commit على pointer-up عندما يسمح الإلغاء بالسحب بعيدًا.
- لا artificial delay أو animation قبل تنفيذ action.

### 2. Direct manipulation

- العنصر يتبع المؤشر 1:1 مع grab offset الأصلي.
- استخدم Pointer Events و`setPointerCapture`.
- اجمع velocity history، لا آخر نقطة فقط.

### 3. Interruptibility

- المستخدم يستطيع إعادة توجيه sheet/card أثناء الحركة.
- ابدأ من presentation value الحالي لا target القديم.
- لا تقفل input أثناء transition.
- gesture-driven UI تستخدم spring/animation API قابلًا لإعادة الاستهداف، لا keyframe ثابتًا.

### 4. Velocity handoff and projection

- release velocity تنتقل إلى spring.
- target يُختار من projected endpoint، لا release point فقط.
- bounce فقط بعد momentum gesture.

### 5. Spatial consistency

- الدخول والخروج على المسار نفسه.
- popover/menu ينشأ من trigger.
- sheet يعود إلى الحافة التي جاء منها.
- RTL يغير الحافة المنطقية عندما العلاقة navigation-directional.

## Motion vocabulary

| Interaction | Response | Motion |
|---|---:|---|
| Press | 90–120ms | scale .98 + tonal change |
| Hover/focus | 160ms | color/border/opacity |
| Toggle/check | 180–240ms | thumb/check path، no bounce default |
| Popover/menu | 180–240ms | opacity + 4–8px origin-aware transform |
| Tabs | 240ms | indicator position + content crossfade |
| Dialog | 280–360ms | scale .98→1 + opacity + scrim |
| Bottom sheet | spring response .3s | direct tracking + velocity handoff |
| Shared card/detail | 360–480ms | matched geometry when stable |
| Toast | 240ms | edge/origin slide ≤16px + opacity |
| Hero/scene | 480–800ms max | one authored sequence |

Fixed duration describes non-interactive transitions. Gesture motion uses spring parameters.

## Spring defaults

| Use | Damping ratio | Response | Overshoot |
|---|---:|---:|---|
| Reposition | 1.0 | .4s | none |
| Menu/dialog | 1.0 | .3–.4s | none |
| Drawer/sheet release | .8–1.0 | .3s | slight only with momentum |
| Cover Flow/flick | .8 | .4s | velocity-earned |
| Decorative pop | .85 | .35s | rare, celebratory |

Kinetics-style CSS curves يمكن استخدامها لمكوّن بسيط، لكن إذا كان التفاعل interruptible فعليًا استخدم Motion/Framer Motion أو spring engine، لا cubic-bezier متظاهرًا بالفيزياء.

## Animation budget

- Product/Data: عنصران متحركان متزامنان كحد طبيعي.
- Marketing: sequence واحدة dominant، مع بقية العناصر subtle.
- Endless loop: loader أو live signal أو atmospheric artifact واحد فقط.
- لا marquee مستمر للمحتوى الأساسي.
- لا stagger لكل list في كل render؛ أول دخول مختار فقط.
- content visible by default حتى إذا فشل JS أو أوقف المستخدم الحركة.

## Reduced motion

عند `prefers-reduced-motion: reduce`:

- slides/parallax/springs تصبح crossfade 100–200ms أو instant state.
- Cover Flow يتحول إلى scroll-snap/list.
- auto-play، marquee، pulsing، animated gradients تتوقف.
- streaming charts تثبت visual الحركة وتبقي القيمة والتحديث النصي.
- لا يُحذف feedback اللوني/الشكلي الضروري.

## Materials hierarchy

### Opaque

الافتراضي للمنتج والبيانات والنص الطويل. أفضل contrast وأداء وهدوء.

### Tonal

surface ladder متقارب يوضح nesting وselection دون shadows.

### Glass

طبقة chrome عائمة تكشف context خلفها: nav، dock، toolbar، sheet header.

### Liquid glass

نسخة أعلى expressiveness مع refraction/highlight/distortion خفيف. محصورة في:

- showcase button أو dock.
- media preview.
- immersive scene.

لا تستخدم فوق form أو table أو نص حساس.

### Glow

- ambient glow خلف artifact أو live state.
- لا يكون focus ring أو boundary وحيدًا.
- opacity منخفضة، blur كبير، لا neon edge حاد.

### Foil/iridescence

- card preview، credential، collectible، أو premium artifact حقيقي.
- pointer/tilt enhancement مع static gradient fallback.
- no body text فوق منطقة متغيرة contrast.

### Gradient

أنواع معتمدة:

1. **Tonal:** درجتان من نفس hue للزر special أو background quiet.
2. **Atmospheric:** 3–4 color fields blurred/grain داخل artwork.
3. **Data:** scale موثقة مع legend.
4. **Edge:** gradient border لحالة featured واحدة.

ممنوع: gradient text العام، كل CTA، كل card، أو background يغطي كل المنتج.

## Glass recipe

```css
.nova-glass {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: linear-gradient(148deg,
    var(--nova-glass-strong),
    var(--nova-glass) 48%,
    color-mix(in srgb, var(--nova-glass) 70%, var(--nova-glass-caustic)));
  border: 1px solid var(--nova-glass-edge);
  box-shadow: var(--nova-glass-shadow);
  backdrop-filter: blur(28px) saturate(180%) contrast(104%);
}

.nova-glass::before,
.nova-glass::after {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: inherit;
  content: "";
}

.nova-glass > * { position: relative; z-index: 1; }

.nova-glass::before { /* top specular */
  background: linear-gradient(112deg, var(--nova-glass-specular), transparent 28% 68%, var(--nova-glass-caustic));
  mask-image: linear-gradient(to bottom, black, transparent 58%);
}

.nova-glass::after { /* localized caustic + shaded lower edge */
  background: radial-gradient(80% 54% at 12% -6%, var(--nova-glass-caustic), transparent 64%);
  box-shadow: inset 0 0 0 1px var(--nova-glass-edge-shade);
}
```

Requirements:

- contrast يُختبر فوق أغمق وأفتح content محتمل.
- control blur 22–30px، والـmodal الكبير 30–40px عند وجود field خلفه فعلًا؛ لا زيادة بلا حاجة.
- السطح الأكبر يبدو أثقل: opacity/blur/shadow أعلى قليلًا.
- text فوق glass أثقل وأعلى contrast، لا gray رقيق.
- fallback opaque عند عدم دعم `backdrop-filter`.

```css
@media (prefers-reduced-transparency: reduce) {
  .nova-glass {
    background: var(--nova-surface-raised);
    backdrop-filter: none;
  }
}
```

## Atmospheric backgrounds

استخرج من Backgrounds Supply فكرة “عالم واحد منظم”، لا asset عشوائي.

### بناء field أصلي

- base color من theme.
- 1–2 blurred radial fields من expressive palette.
- edge falloff أو vignette خفيفة.
- grain 1–3% لكسر banding.
- contrast-safe quiet zone خلف النص.
- static image/gradient fallback للـshader.

### Placement

- hero، spotlight، modal cap، أو empty state.
- لا يتكرر field نفسه خلف كل section.
- لا يتحرك باستمرار إلا immersive scene ومع reduced-motion.

## Micro-interactions

### Copy

icon morph أو check + label `تم النسخ`، 1.5–2s، بلا toast إضافي غالبًا.

### Save/bookmark

outline→fill + 1.05–1.12 scale one-shot. Bounce أقوى demo-only.

### Toggle

thumb tracks position، label/status updates same frame.

### Number update

tabular digits + vertical crossfade/roll لمسافة صغيرة، مع aria-live throttled.

### Progress

bar transitions width عند تحديث متقطع؛ live fast updates تستخدم transform scaleX أو Canvas.

### Theme

crossfade surfaces، icon morph صغير. لا circular wipe يغطي viewport في المنتج إلا showcase خاص.

## Sound and haptics

- causality: على commit/snap/success الحقيقي.
- harmony: visual + haptic في نفس frame تقريبًا.
- utility: لا vibration لكل tap.
- web vibration optional وغير أساسي.
- sound off افتراضيًا في business products، ويحتاج setting.

## Performance

- animate transform وopacity.
- `will-change` مؤقت قبل الحركة فقط.
- لا blur متحرك على مساحة كبيرة أثناء scroll.
- shader/WebGL يتوقف خارج viewport وداخل background tab.
- reserve layout dimensions.
- 60fps هدف، لكن response latency أهم من animation richness.
- اختبر low-end Android وSafari، لا desktop flagship فقط.

## Motion/material QA

- [ ] كل motion له سبب مسمى.
- [ ] feedback يبدأ على pointer-down.
- [ ] gesture motion 1:1 وقابل للمقاطعة.
- [ ] دخول/خروج spatially symmetric.
- [ ] reduced motion يحافظ على المعنى.
- [ ] glass له contrast وopaque fallback.
- [ ] لا stack لمؤثرات متعددة.
- [ ] no layout shift أو clipped focus/shadow.
- [ ] endless motion عنصر واحد أو أقل.
- [ ] الأداء مختبر أثناء scroll والـinput.
