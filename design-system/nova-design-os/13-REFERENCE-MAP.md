# 13. Reference Map and Provenance

## سياسة الاستفادة

المراجع هنا مصادر مقارنة وتغذية بصرية. نستخرج مبدأ أو behavior أو composition ثم نعيد تأليفه بهوية NOVA. لا ننسخ brand، assets، copy، أو registry code كما هو.

تاريخ مراجعة المصادر الحية: **2026-07-17**.

## DESIGN.md files supplied by the user

| المرجع | ما نستخرجه | ما لا ننسخه |
|---|---|---|
| Superhuman | cinematic dusk، parchment contrast، violet restraint، glass over hero | palette/brand composition حرفيًا |
| Active Theory | void stage، one WebGL artifact، tiny architectural labels، hairlines | pure black لكل product UI أو التجريب الدائم |
| Seed | one-hue discipline، tonal lift، light display weight | forest/lime identity نفسها |
| Origin Financial | editorial finance، serif/sans registers، chromatic lit-window cards | dark luxury styling لكل dashboard |
| Apple | one lit product، surface steps، material hierarchy، spatial restraint | product silhouettes أو exact nav/chrome |
| Sketch | bone canvas، display type as art، product screenshot as proof | pink/lavender wash العام |
| Authkit | midnight blueprint، iris accent، workhorse/display/mono registers | exact developer-tool appearance |
| Tadfuq Al-Khayr | عمق التوثيق، semantic architecture، source appendix | civic brand، palette، أو domain-specific components |

## Visual references supplied by the user

### Dashboard cards

- white cards on cool gray canvas.
- metric + chart + contextual action.
- comparison alignment بين bar/step charts.
- operational progress وdonut مع visible values.
- الاستفادة: [07-CARDS-DATA-ADMIN.md](./07-CARDS-DATA-ADMIN.md).

### Atmospheric dialogs

- centered modal فوق background dimmed/blurred.
- colored atmospheric cap ثم content surface واضحة.
- single full-width primary action.
- الاستفادة: onboarding/install/connect dialogs فقط.

### Arabic career dashboard

- Arabic-first shell، purple anchor، hero + opportunity card، progress journey، right context rail.
- الاستفادة: hierarchy وRTL grouping.
- المحاذير: لا نكرر saturation البنفسجي في كل surface ولا نكدس cards.

### Dark send/review mobile

- recipient trust، amount review، fees، optional note، swipe commit.
- الاستفادة: transaction review وintentional commit.
- التعديل: Indigo Night بدل black crush، accessible fallback للswipe.

### Finance mobile overview

- expressive net-income card، goal progress، quick actions، transactions.
- الاستفادة: Luminous Ledger وhierarchy.
- التعديل: pattern/gradient واحد، values وstatus accessible.

### Floating bottom dock

- four destinations، active island.
- الاستفادة: Adaptive Dock.
- التعديل: labels، safe area، reduced motion، no content occlusion.

### Crypto fee speed

- usual range + speed/cost slider + fee breakdown.
- الاستفادة: recommended band وdirect cost feedback.
- التعديل: presets أوضح، no rainbow without meaning.

### Energy/device grid

- summary metric، 2×3 device controls، advice/report card.
- الاستفادة: Operational Quartet.
- التعديل: status text مع color، actions واضحة، no tiny metadata.

## Live web sources

| Source | URL | Extract | Guardrail |
|---|---|---|---|
| Kinetics | https://kinetics.colorion.co/ | spring weight، stiffness/damping thinking، React/CSS examples | gesture UI يحتاج engine interruptible، لا fake spring فقط |
| Gradient Buttons | https://gradientbuttons.colorion.co/ | background-position hover، tonal gradient ideas | special CTA واحدة، no default gradient buttons |
| Cover Flow | https://coverflow.ashishgogula.in/ | 1:1 touch، velocity، zero layout shift، keyboard، reduced motion | visual selection limited، not data list |
| Liquid Glass OSS | https://gitlab.com/ogtirth/liquidglass-oss | blur/refraction/highlight vocabulary | chrome/showcase only + opaque fallback |
| Backgrounds Supply | https://www.backgrounds.supply/ | curated atmosphere، grain، portals، iridescence، nocturne worlds | build original token-based fields، respect asset licenses |
| Best Designs on X | https://bestdesignsonx.com/ | curated compositions، masonry/bento، signature artifacts | inspiration is not proof of usability |
| Refero Styles | https://styles.refero.design/ | named visual systems، color/type/shape rationale | extract principles، never clone a site |
| DesignMD | https://designmd.me/ | URL→structured DESIGN.md concept | generated file still needs product audit |
| Open Design | https://open-design.ai/ | composable files، local artifact، brief→direction→output→memory | do not confuse vibe generation with validation |
| DesignMD Supply | https://designmd.supply/ | card anatomy/design references | availability may vary; no dependency |
| getdesign.md | https://getdesign.md/ | reusable design references and comparative catalog | source selection needs rationale |
| Aura | https://aura.build/ | composer/search-led hero، subtle grid، theme control | avoid generic AI-builder styling |
| Neuform | https://neuform.ai/ | templates + reusable DESIGN.md | remix only after content/register choice |
| Hyperbrowser DESIGN.md | https://design-md.hyperbrowser.ai/ | boxed inline-code/neo-brutalist contrast | reject broad neo-brutalist carry-over |
| TypeUI | https://typeui.sh/ | skills + prompts + shared design context + audit | context does not replace source-of-truth tokens |
| Google DESIGN.md | https://github.com/google-labs-code/design.md | YAML tokens + rationale format | main DESIGN.md keeps six standard sections |
| Matt Pocock Skills | https://github.com/mattpocock/skills | skill packaging and engineering workflow | relevance before adding more instruction |
| 21st.dev | https://21st.dev/ | searchable React/shadcn patterns، themes، templates | adapt behavior/tokens/a11y; auth may be required by CLI |
| Laws of UX | https://lawsofux.com/ | Fitts، Hick، Jakob، proximity، aesthetic-usability | laws guide decisions، not post-hoc justification |
| Docker Awesome Compose | https://github.com/docker/awesome-compose | implementation/deployment samples | not a visual design source |

## 21st.dev registry intake

تم تجميع الروابط التي قدمها المستخدم في pattern families. الأسماء أدناه provenance/search keys، وليست مكوّنات معتمدة تلقائيًا.

### Onboarding and forms

- `ravikatiyar162/onboarding-form`
- `ravikatiyar162/registration-stepper`
- `jatin-yadav05/multistep-form`
- `hero_ui/heroui-form`
- `larsen66/heroui-fieldset`
- `starc007/be-ui-otp-input`
- `osiris-balonga/date-wheel-picker`
- `pulseawan/apple-calendar-picker`
- `hero_ui/heroui-number-field`
- `hero_ui/heroui-autocomplete`
- `geekles007/select`
- `geekles007/multiple-select`
- `originui/input`

### Navigation and command surfaces

- `ruixen.ui/toolbar-dock`
- `dqnamo/agent-dock`
- `starc007/be-ui-dynamic-island`
- `uniquesonu/glow-menu`
- `minhxthanh/activity-dropdown`
- `moumensoliman/expanding-search-dock-shadcnui`
- `starc007/be-ui-create-menu`
- `chetanverma16/floating-action-menu`
- `victorwelander/expandable-tabs`
- `larsen66/heroui-tabs`
- `reapollo/heroui-tabs`

### Buttons, switches, and feedback

- `rafa-porto/publish-button`
- `koustubhayadiyala36/shatter-button`
- `Shatlyk1011/gradient-borders-button`
- `easemize/glass-button`
- `easemize/material-design-3-switch`
- `jatin-yadav05/bouncy-toggle`
- `daiwiikharihar17147/cinematic-glow-toggle`
- `omrohilla6/cinematic-theme-switcher`
- `ayushmxxn/theme-toggle`
- `hero_ui/heroui-toggle-button`
- `xubohuah/liquid-radio`
- `minhxthanh/copy-code-button`
- `stvenchg/unsaved-changes`

### Cards, profiles, dashboards, and data

- `vaib215/event-manager`
- `jatin-yadav05/location-tag`
- `jatin-yadav05/skills-showcase`
- `jatin-yadav05/mini-chart`
- `larsen66/animated-sparkline`
- `aghasisahakyan1/animated-profile-card`
- `larsen66/efferd-dashboard-2`
- `Codehagen/display-cards`
- `javierdev0/order-tracking`
- `hedevelope/estimated-arrival`
- `hero_ui/heroui-list-box`

### Media, upload, AI, and checkout

- `kokonutd/avatar-picker`
- `originui/use-image-upload`
- `kokonutd/interactive-checkout`
- `designali-in/ai-gen`
- `originui/dialog`
- `haydenbleasel/announcement`

### Expressive materials and loaders

- `designali-in/glowing-shadow`
- `suraj-xd/liquid-glass`
- `dqnamo/iridescent-foil`
- `mona_biasia/gradient-shimmer`
- `dillionverma/animated-shiny-text`
- `dqnamo/logo-trace-loader`
- `edwinvakayil/dia-text`

### Adaptation order

1. semantics/keyboard.
2. dependency and bundle cost.
3. NOVA token mapping.
4. Phosphor icon replacement.
5. RTL and long Arabic.
6. mobile 390px.
7. reduced motion/transparency.
8. remove demo-only effects.
9. source comment/provenance.

## Skills used in this system

| Skill/source | Role |
|---|---|
| Impeccable Full Mode | context، audit، critique، layout، type، a11y، polish |
| Taste Skill | anti-template direction، audit-first redesign، composition discipline |
| UI/UX Pro Max | searchable UX/a11y/color/type/chart/stack guidance |
| Apple Design | immediate feedback، interruptibility، gesture physics، materials |
| Awesome DESIGN.md | comparative design-language research |
| 21st CLI Use | component discovery before hand-writing |
| React Icons | package gateway; Phosphor family only for React surfaces |
| Laws of UX | interaction rationale and decision constraints |

## Source limitations

- بعض المواقع rendered/interactive ولا توفر نصًا كاملًا لمحركات البحث؛ المبدأ الموثق يُعامل كإلهام لا specification.
- 21st CLI قد يطلب account/API key حتى للبحث. عند عدم توفره، استخدم الروابط/الأسماء التي قدمها المستخدم وابحث عبر الموقع، ولا تدّعِ جلب code.
- assets المدفوعة أو المرخصة مثل background packs لا تُنسخ أو توزع. يُعاد بناء atmosphere أصلي أو يُستخدم asset مرخص صراحة.
- أي source حديث يمكن أن يتغير؛ راجع الرابط قبل اعتماد dependency أو license.

## Provenance rule in code

عند تكييف behavior غير بسيط، أضف تعليقًا قصيرًا أو سجلًا في component docs:

```text
Inspiration: 21st.dev/<author>/<slug> or <source URL>
Adapted: NOVA tokens, Phosphor icons, RTL, keyboard, reduced motion
Code copied: no / yes with license reference
```

لا تضع attribution مرئيًا داخل المنتج إلا إذا تطلبت الرخصة؛ حافظ عليه في docs/source comments.

