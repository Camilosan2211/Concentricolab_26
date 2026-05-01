---
name: Concéntrico Lab
description: >
  Design system for Concéntrico Lab — a multidisciplinary digital laboratory
  combining UX/UI design, AI, and automation. Dark-first, bilingual (ES/EN),
  and built around structured visual depth through aurora glows, glass
  surfaces, and a precision grid aesthetic.
colors:
  primary: "#5170FF"
  primary-lt: "#828AFF"
  accent: "#FF6D4D"
  tech: "#41EAFF"
  surface-dark: "#00031F"
  surface-dark2: "#020425"
  surface-light: "#F8F7F4"
  surface-light2: "#EEF1FF"
  on-dark: "#F5F5F0"
  on-dark-muted: "#0A0A18"
typography:
  display:
    fontFamily: Cal Sans
    fontSize: 72px
    fontWeight: "400"
    lineHeight: 80px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Cal Sans
    fontSize: 52px
    fontWeight: "400"
    lineHeight: 64px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Cal Sans
    fontSize: 40px
    fontWeight: "400"
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Cal Sans
    fontSize: 28px
    fontWeight: "400"
    lineHeight: 36px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 22px
  label-lg:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: "700"
    lineHeight: 16px
    letterSpacing: 0.12em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: "700"
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.625rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  full: 9999px
spacing:
  unit: 8px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  container: 1200px
  section-y: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 16px 32px
    height: 52px
  button-primary-hover:
    backgroundColor: "#4060ee"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  button-ghost-hover:
    backgroundColor: "rgba(81, 112, 255, 0.08)"
    textColor: "{colors.primary}"
  glass-card:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.lg}"
    padding: 40px
  glass-card-blue:
    backgroundColor: "rgba(81, 112, 255, 0.08)"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.lg}"
    padding: 40px
  tag-pill:
    backgroundColor: "rgba(81, 112, 255, 0.08)"
    textColor: "{colors.primary-lt}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 8px 16px
  input-field:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 14px 20px
    height: 52px
  social-chip:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.md}"
    padding: 12px 8px
---

## Overview

Concéntrico Lab is a **multidisciplinary digital laboratory** from Bogotá, Colombia. The visual language reflects the studio's core methodology: building systems from the problem outward in concentric layers — from user to system, from design to automation.

The UI personality is **precision-meets-warmth**: dark, structured, and technically rigorous, but never cold. The brand's electric blue commands hierarchy; coral provides a pulse of human warmth. Every surface hints at depth — aurora glow layers, glass panels floating over near-black space, a perspective grid anchoring the hero.

The design is **dark-first** and **dual-mode** (dark/light). Components must behave correctly in both modes; dark mode is the canonical identity. The site is bilingual (ES/EN) by default — layout and type sizing never shift between languages.

The emotional target is: **premium technical tool**, not a decorative portfolio. The UI should feel like a well-engineered cockpit, not a gallery.

## Colors

The palette is built around two protagonist colors — blue and coral — with white and cyan as supporting roles. Never use all three chromatic accents simultaneously on the same surface.

- **Primary `#5170FF`:** Electric blue. Used for CTAs, interactive elements, links, focus rings, grid lines, and any element demanding immediate attention. The dominant accent.
- **Primary Light `#828AFF`:** Softer blue used in gradients, badge text, and secondary accent layers. Never as a standalone CTA color.
- **Accent `#FF6D4D`:** Warm coral. Signals human warmth and key moments of emphasis. Every composition should include at least one element in coral — whether a highlighted word, a glow, or an icon.
- **Tech `#41EAFF`:** Cyan for minimal technical sparks — progress bars, data highlights, decorative micro-details only. Use sparingly.
- **Surface Dark `#00031F`:** The primary dark background. Near-black with a deep blue undertone — never pure black.
- **Surface Dark 2 `#020425`:** Subtle secondary dark layer, used for footer containers and inner surfaces.
- **Surface Light `#F8F7F4`:** Warm off-white for light mode backgrounds. The underlying warmth prevents a sterile feel.
- **Surface Light 2 `#EEF1FF`:** Very pale blue-white for light mode secondary surfaces and accents.
- **On Dark `#F5F5F0`:** Body text on dark backgrounds. Warm white with slight cream offset.
- **On Dark Muted `#0A0A18`:** Body text on light backgrounds — near-black with a cool undertone.

**Gradient recipes (normative):**
- Hero text gradient: `linear-gradient(135deg, #5170FF 0%, #828AFF 55%, #FF6D4D 100%)`
- Progress/data bar: `linear-gradient(90deg, #5170FF, #41EAFF, #FF6D4D)`
- Coral text gradient: `linear-gradient(135deg, #FF6D4D 0%, #FF9B7A 100%)`
- Glow blue: `radial-gradient(ellipse, rgba(81,112,255,0.20) 0%, transparent 60%)`
- Glow coral: `radial-gradient(ellipse, rgba(255,109,77,0.16) 0%, transparent 56%)`
- Footer separator: `linear-gradient(to right, transparent, rgba(81,112,255,0.22), transparent)`

## Typography

Two families. No exceptions.

**Cal Sans** (weight 400) anchors all display and heading hierarchy — section titles, hero headlines, manifesto statements, and the brand name itself. Its geometric, editorial character communicates the studio's design roots. Use at large sizes; never use Cal Sans at body size.

**Inter** (weights 400–700) handles all functional text — body copy, labels, UI elements, captions, badges, and metadata. Its neutral precision complements Cal Sans without competing.

**Geist Variable** is imported in the codebase as the general UI sans-serif variable font for the component layer, but Cal Sans + Inter are the brand-forward combination for content surfaces.

**Scale in practice:**
- `display` (72px, Cal Sans) — hero single-line impact (desktop only)
- `headline-lg` (52px, Cal Sans) — hero multi-line, section hero statements
- `headline-md` (40px, Cal Sans) — primary section headings
- `headline-sm` (28px, Cal Sans) — card titles, sub-section heads
- `body-lg` (18px, Inter) — lead paragraphs, manifesto body
- `body-md` (16px, Inter) — standard body copy
- `body-sm` (14px, Inter) — card descriptions, form labels, metadata
- `label-lg` (12px, Inter 700, +0.12em tracking, uppercase) — section supertitles, badge labels
- `label-sm` (11px, Inter 700, +0.1em tracking, uppercase) — fine metadata, footer columns, sub-labels

**Rules:**
- Uppercase labels are always `letter-spacing: 0.10–0.12em`. Optical tracking, not decoration.
- Text selection highlight: `rgba(81,112,255,0.30)` background, white foreground.
- On dark glass surfaces, increase font weight by one tier for sub-12px labels.

## Layout

The layout follows a **centered max-width column** model with fluid section padding.

- **Max container width:** 1200px (`max-w-[1200px] mx-auto`). Footer uses 1400px as outer wrapper for the glass container.
- **Horizontal padding:** 24px (`px-6`) at all breakpoints. Responsive text sizing via Tailwind responsive prefixes (`sm:`, `md:`, `lg:`).
- **Section vertical rhythm:** 96px top and bottom (`py-24`). Tighter sections use 80px (`py-20`).
- **Spacing base unit:** 8px. All component gaps, padding, and margins are multiples of 8.
- **Grid system:** Two-column `md:grid-cols-2` for paired content blocks (e.g., Connect section cards). Three-column for footer links on desktop.
- **Hero:** Full viewport height (`min-h-screen`), flex column, centered content with a perspective grid plane and aurora glow layers as z-indexed background stack.
- **Overflow management:** All sections use `overflow-hidden` to contain aurora glows and glow orbs without layout bleed.

## Elevation & Depth

Depth is constructed from **light physics, not darkness**. The background is deep space; components float above it as glass panels illuminated by ambient light sources (the aurora glows).

**The depth stack (bottom → top):**

1. **Layer 0 — Base surface:** `#00031F` — the void. Absorbs all light not explicitly produced.
2. **Layer 1 — Aurora / glow orbs:** `filter: blur(46–92px)`, opacity 0.12–0.22. Animated radial gradients in primary and accent colors drifting slowly, producing the impression of a luminous atmosphere.
3. **Layer 2 — Grid plane:** Hero perspective grid at `rotateX(52deg)` — technical depth anchor.
4. **Layer 3 — Standard glass (`.glass`):** `background: rgba(255,255,255,0.04)` + `border: 1px solid rgba(255,255,255,0.08)` + `backdrop-filter: blur(16px)`. The primary card surface.
5. **Layer 4 — Blue-tinted glass (`.glass-blue`):** `background: rgba(81,112,255,0.08)` + `border: 1px solid rgba(81,112,255,0.18)` + `backdrop-filter: blur(14px)`. Used for discipline tags, nav highlights, and feature badges.
6. **Layer 5 — Glows on elements:** `box-shadow: 0 0 36px rgba(81,112,255,0.30)` (blue) and `0 0 36px rgba(255,109,77,0.25)` (coral). Applied to primary buttons and key interactive elements.

**Rules:**
- Every glass surface must have a 1px border. The border defines the glass — without it the element has no edges in the dark space.
- Never use `backdrop-filter` below `blur(12px)` — the frosting effect collapses.
- Box shadows from buttons and hovers should always be directionally upward on hover (translate-y: -2px to -4px) to simulate physical lift.
- A global film-grain overlay at `opacity: 0.024` (mix-blend-mode: soft-light) adds tactile texture without impacting readability.

## Shapes

The shape language is **round-edged geometry** — hexagons, circles, and rectangles with friendly radii. Sharp corners do not appear anywhere in the UI.

- **`rounded-full` (9999px):** Primary CTAs (pill buttons), tag chips, discipline badges, and all small circular indicators.
- **`rounded-lg` (1.5rem / 24px):** Glass cards — the main content containers.
- **`rounded-md` (1rem / 16px):** Input fields, secondary buttons, social link chips, and smaller interactive containers.
- **`rounded-xl` (2rem / 32px):** Large footer container glass panel.
- **`rounded-sm` (4px):** Scrollbar thumb only.

The logo (hexagon with concentric circles) is the geometric anchor of the entire visual system. Hexagonal geometry and concentric-circle motifs are the brand's owned shapes — they appear in the logo, in grid line spacing, and as conceptual references in content layout.

**Do not mix sharp and round within the same component.** The interior of every card, input, and button must match its container's radius family.

## Components

### Button — Primary

The primary call-to-action. Always electric blue, always pill-shaped. Carries a blue glow on idle and an upward lift on hover.

```
backgroundColor: #5170FF
textColor: #ffffff
font: Inter 14px 600
rounded: 9999px
padding: 16px 32px (desktop), 14px 24px (mobile)
height: 52px
glow: box-shadow 0 0 36px rgba(81,112,255,0.30)
hover: translateY(-4px), box-shadow 0 16px 48px rgba(81,112,255,0.55)
transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1)
```

Never use coral as a button background. Coral is a semantic emphasis color, not an action color.

### Button — Ghost

Secondary actions. Glass-surfaced with a subtle blue border. Transforms to blue-tinted glass on hover.

```
backgroundColor: rgba(255, 255, 255, 0.04)
border: 1px solid rgba(81, 112, 255, 0.20)
textColor: {colors.on-dark}
rounded: {rounded.md}
padding: 14px 20px
hover backgroundColor: rgba(81, 112, 255, 0.08)
hover border: rgba(81, 112, 255, 0.40)
```

### Glass Card

The primary content container. Dark translucent panel floating over the aurora background. Used for product cards, newsletter blocks, contact sections, and stat grids.

```
backgroundColor: rgba(255, 255, 255, 0.04)
border: 1px solid rgba(255, 255, 255, 0.08)
backdrop-filter: blur(16px)
rounded: {rounded.lg}
padding: 40px (desktop), 32px (mobile)
```

The blue-variant card (`glass-blue`) uses `rgba(81,112,255,0.08)` background and `rgba(81,112,255,0.18)` border. Use for feature highlights and navigation active states.

### Tag Pill / Discipline Badge

Used for discipline tags (UX/UI Design, Automation, Branding, etc.) and metadata labels. Always blue-tinted, always pill-shaped, always uppercase label typography.

```
backgroundColor: rgba(81, 112, 255, 0.08)
border: 1px solid rgba(81, 112, 255, 0.18)
textColor: {colors.primary-lt}
font: Inter 12px 700, tracking 0.07em, uppercase
rounded: {rounded.full}
padding: 8px 16px
```

### Input Field

Form input for the newsletter subscription. Inherits glass appearance, transitions to blue border on focus.

```
backgroundColor: transparent (over glass card)
border: 1px solid rgba(255, 255, 255, 0.10)
focus border: rgba(81, 112, 255, 0.50)
textColor: {colors.on-dark}
placeholder: rgba(255, 255, 255, 0.30)
font: Inter 14px 400
rounded: {rounded.md}
padding: 14px 20px
height: 52px
```

### Section Supertitle (Label)

A micro-label that appears above every primary section heading to orient the reader. Always uppercase, always tracking-wide, always muted opacity.

```
font: Inter 12px 700
letterSpacing: 0.12em
textTransform: uppercase
textColor: rgba(255, 255, 255, 0.30) [dark] / rgba(0, 0, 0, 0.35) [light]
```

Used as a semantic signal — it tells the reader what type of content follows before the headline lands.

### Hero Headline (Gradient Text)

The primary hero text treatment. A multi-stop linear gradient clipped to the text, flowing from blue through light blue into coral.

```
background: linear-gradient(135deg, #5170FF 0%, #828AFF 55%, #FF6D4D 100%)
-webkit-background-clip: text
-webkit-text-fill-color: transparent
font: Cal Sans, headline-lg or display scale
```

Applied to a `<span>` wrapping the key phrase within a larger headline. Never apply to an entire paragraph — only to a single meaningful phrase per heading.

## Do's and Don'ts

- **Do** always include at least one coral element per composition — a highlighted word, a glow, a label color. Without coral the palette reads as cold tech.
- **Do** use `filter: blur()` on glow orbs — never `box-shadow` for ambient background lighting.
- **Do** add `overflow-hidden` to every section to contain glow elements.
- **Do** lift interactive elements on hover (`translateY(-2px)` minimum) — the glass surfaces should feel physically responsive.
- **Do** use Cal Sans for all headings and Inter for all body. No other families in production.
- **Don't** use pure black (`#000000`) anywhere. The darkest permissible surface is `#00031F`.
- **Don't** activate more than two chromatic accents (blue, coral, cyan) on the same visual surface simultaneously.
- **Don't** omit the `1px border` on glass cards — without it the frosted panel has no definition against the dark background.
- **Don't** recreate or modify the logo with generative AI tools. The Illustrator source file is authoritative.
- **Don't** reduce `backdrop-filter: blur()` below 12px — the glass effect collapses into a muddy semi-transparent layer.
- **Don't** apply gradient text to full paragraphs or labels — gradient text is reserved for hero highlight phrases (one per heading, maximum).
- **Don't** use uppercase label text without `letter-spacing: 0.10em` minimum — untracked uppercase reads as cramped and amateurish at small sizes.
- **Do** maintain `max-w-[1200px]` for content and `max-w-[1400px]` for outer glass wrappers only.
- **Don't** use Poppins on the web — it is strictly the social media / Canva brand font.
