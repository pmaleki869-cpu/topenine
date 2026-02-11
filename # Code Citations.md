# Code Citations

## License: unknown
https://github.com/tomhendra/tomhendra.dev/blob/b3be6f584522afffc665dd33f41ecbc07a98671b/app/styles/shared/sizes.css

```
File creation is disabled. Here is the complete specification:

---

# UI Visual System Specification v3.0

**Classification:** Master UI Specification — Greenfield Design  
**Platform:** High-trust automotive / industrial e-commerce  
**Horizon:** 2025–2027  
**Status:** Normative  
**Last revised:** 2026-02-10  

---

## Executive Summary

This document defines the complete visual system for a precision-class automotive parts e-commerce platform. It is designed from first principles, anchored to zero legacy decisions, and informed by deep analysis of the highest-performing visual systems in industrial e-commerce (McMaster-Carr, DigiKey, FCP Euro), enterprise design systems (IBM Carbon, Adobe Spectrum, Atlassian), and OEM automotive catalogs (Toyota Parts, Grainger).

The system is built on three invariants:

1. **Restraint over expression.** Every visual element must earn its presence. No decorative color, no ornamental typography, no gratuitous motion.
2. **Information density without chaos.** The platform must present thousands of technical products with absolute clarity. Visual calm under data load is the primary design constraint.
3. **Authority through precision.** Trust is communicated through spatial consistency, typographic discipline, and functional color — never through promotional language or trend-following aesthetics.

This is not a brand guideline. It is a structural specification for an interface that must remain credible under audit in five years.

---

## 1. Visual Intelligence Summary

### 1.1 Research Synthesis

Analysis of 13 platforms across automotive parts, industrial catalogs, and enterprise design systems reveals three tiers of visual maturity:

**Tier 1 — Structural Excellence (reference-grade)**

| Platform | Core Lesson |
|---|---|
| McMaster-Carr | Typography IS the entire design system. Two font weights, one accent color, zero promotional elements. Visual calm under 85,000+ SKU density. 8px spacing grid with mathematical precision. The gold standard for information-dense commerce. |
| IBM Carbon | Role-based color with interaction-state math (hover = half-step, active = two steps). Productive vs. Expressive type sets. 2x grid with 16-column system at large breakpoints. Token architecture that scales across products. |
| Adobe Spectrum | 11 grays per theme, each with a defined role. Major second type scale (1.125x). Platform-aware sizing (desktop vs. mobile as separate scales). Semantic token naming with 3-part structure. |

**Tier 2 — Professional Competence (selective adoption)**

| Platform | Core Lesson |
|---|---|
| FCP Euro | Best-in-class enthusiast auto parts UI. Manufacturer logos as trust anchors. Lifetime guarantee as persistent visual element. Badge system with clear hierarchy (OE > OEM > Aftermarket). Moderate density, well-managed. |
| Grainger | Corporate-professional industrial catalog. Dual navigation (search + browse). Content marketing integration. Weakness: CTA color = brand color, reducing functional clarity. |
| DigiKey | 17.6M products with parametric search. Color is purely informational. Manufacturer logos constrained to 155x30px — remarkable sizing discipline. Authorized distribution messaging counters counterfeit anxiety. |
| Atlassian | Token-based color with emphasis levels (subtlest to boldest). 8px spacing base. Three body font weights with strict usage rules. |

**Tier 3 — Cautionary (patterns to study, not replicate)**

| Platform | Lesson |
|---|---|
| RockAuto | Proves "ugly-trustworthy" works for power users. Not a replicable model, but the underlying insight matters: promotional noise destroys trust in this market. |
| Pelican Parts | Technical depth creates trust. Warm backgrounds differentiate. But dated execution undermines credibility for new visitors. |
| Toyota OEM | Corporate restraint is correct, but sterile execution crosses into "government form" territory. Vehicle selector UI demonstrates how formality can become friction. |
| Car Builder Solutions | Shopify-standard execution with dark theme. Review-wall trust model. Demonstrates how template reliance is visible to informed buyers. |

### 1.2 Reusable Patterns That Scale

These patterns appear across all high-trust platforms and should be adopted:

1. **Typography-first hierarchy.** The best systems (McMaster, Carbon) use font size and weight as primary organizational tools, with color as secondary reinforcement.
2. **8px spatial grid.** McMaster, Carbon, Atlassian, and Spectrum all converge on 8px as the base spatial unit. This is not optional.
3. **Role-based color with no decorative usage.** Every platform that achieves "authority" feel uses color to carry meaning, never for decoration.
4. **Two-weight discipline.** Regular + Semibold (or Medium) handles 90% of cases. Bold is reserved for price display and critical status indicators.
5. **Progressive density disclosure.** Category-level pages are spacious; product-detail pages are dense. The system breathes differently at different depths.
6. **Manufacturer identity as trust proxy.** FCP Euro and DigiKey both use brand logos as trust signals. The host platform stays visually neutral; the product brands carry credibility.
7. **Persistent trust strip.** FCP Euro, Grainger, and DigiKey all maintain a persistent trust bar (shipping, returns, warranty). This is industry standard for a reason.

### 1.3 Patterns That Must Be Rejected

| Pattern | Why It Fails |
|---|---|
| Hero carousels | Zero information density. McMaster proves they are unnecessary. Data shows carousel interaction rates below 1% after slide 1. |
| Promotional color gradients | Signal consumer retail, not industrial authority. No tier-1 reference platform uses gradients. |
| Badge proliferation (3+ per card) | FCP Euro's weakness. More than one badge per product card creates visual noise and dilutes the hierarchy of the badge system itself. |
| Dark theme for product catalogs | Car Builder Solutions demonstrates this: dark backgrounds reduce image contrast for product photography and increase reading fatigue for specification text. |
| Animated transitions between states | Motion attracts attention, which is a cost. In a catalog with hundreds of items, micro-animations compete with the user's scanning behavior. |
| Rounded corners > 8px | Excessive rounding signals "friendly consumer app." Industrial authority requires geometric precision. 4-6px radius maximum. |
| Shadow depth > 1 level | Multiple shadow depths create ambiguity about spatial hierarchy. One shadow value, applied consistently. |
| Inline star ratings on product cards | Star ratings are meaningful for consumer products with subjective quality. OEM parts are either correct or incorrect. Fit/no-fit replaces like/dislike. |

---

## 2. Visual Positioning Doctrine

### 2.1 What the UI Must Immediately Communicate

**Mechanical precision.** The interface itself must feel engineered, not designed. Spacing must be mathematically consistent. Alignment must be absolute. The visual system should suggest that the same rigor applied to the interface was applied to the parts catalog.

**Authority and scale.** The platform must feel like it contains thousands of products without showing them all at once. This is communicated through structured navigation, consistent component patterns, and confident whitespace — not through "Browse 600+ products!" messaging.

**Reliability under complexity.** When a user is on a product page with 15 specification rows, 3 compatibility notes, and a pricing block, the interface must remain calm. No element should compete for attention. The hierarchy must be self-evident without scanning.

### 2.2 What It Must Never Communicate

- **Template usage.** No Shopify defaults. No Bootstrap 5 card shadows. No generic icon libraries used without curation. If an informed buyer can identify the template, the platform has failed.
- **Cheapness.** No gradient buttons. No 2px border radius on oversized elements. No uppercase body text. No excessive exclamation marks in UI copy.
- **Over-decoration.** No decorative dividers. No ornamental icons. No background patterns. No floating shapes. If an element does not carry information or aid navigation, it does not exist.
- **Lifestyle branding.** No mood photography. No aspirational copy. No "experience the difference" language. The parts are mechanical objects; the UI should reflect their nature.

### 2.3 Emotional Calibration

| Axis | Left (preferred) | Right (avoided) |
|---|---|---|
| Tone | Calm | Exciting |
| Information | Clarity | Personality |
| Aesthetics | Restraint | Expressiveness |
| Density | Confident | Sparse |
| Typography | Neutral | Characterful |
| Color | Functional | Decorative |
| Layout | Predictable | Surprising |
| Motion | Static | Animated |

This system targets the intersection of **McMaster-Carr's information purity** and **FCP Euro's product merchandising** — technical precision with enough visual warmth to support product photography, but never enough to suggest lifestyle retail.

---

## 3. Typography System

### 3.1 Font Selection

**Primary typeface: Inter**

Rationale:
- Variable font with optical sizing (opsz 14–32), enabling automatic micro-adjustments for text vs. display contexts
- 147 language scripts including Latin, Cyrillic, Greek, Arabic — essential for UAE/GCC audience
- Tabular number feature (`tnum`) critical for price columns and specification tables
- Tall x-height optimized for screen legibility at 13-16px body sizes
- Disambiguation features (`ss02`, `cv08`, `cv05`, slashed zero) prevent misreading of OEM part numbers (O vs 0, I vs l vs 1)
- Used by Figma, GitHub, Linear, and Vercel's own documentation — proven at scale in technical interfaces
- 100-900 weight range with three master designs (100, 400, 900) ensuring quality at every interpolation point
- Open Font License — no licensing constraints

**Monospace companion: Inter's tabular features (preferred) or JetBrains Mono (fallback)**

Used exclusively for: OEM part numbers, SKU codes, engine codes, specification values.

**Font stack:**
```
--font-sans: 'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', ui-monospace, monospace;
```

**Rejected alternatives and reasons:**

| Font | Rejection Reason |
|---|---|
| Geist Sans | Vercel-ecosystem association. Fewer language scripts than Inter. No optical sizing axis. |
| IBM Plex Sans | Strong IBM brand association. Mathematical scale is rigid. Three-font-family system (Sans + Serif + Mono) is over-specified for this use case. |
| Roboto | Google Material association. Humanist proportions are too warm for industrial context. |
| Helvetica Neue | No variable font support. No tabular numbers feature. License cost. |
| System fonts only | Inconsistent rendering across devices undermines visual precision. Unacceptable for a system that claims mechanical rigor. |

### 3.2 Type Scale

The scale uses a **1.200 ratio (minor third)** — the same mathematical discipline used by IBM Carbon, adapted for e-commerce density requirements.

Base size: 15px (desktop) / 16px (mobile)

| Token | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 11px / 1.45 | 12px / 1.45 | 400-500 | Microcopy, timestamps, tertiary labels |
| `text-sm` | 13px / 1.5 | 14px / 1.5 | 400-500 | Secondary text, filter labels, metadata |
| `text-base` | 15px / 1.6 | 16px / 1.6 | 400 | Body text, descriptions, form inputs |
| `text-md` | 18px / 1.45 | 18px / 1.45 | 500-600 | Subheadings, card titles, section labels |
| `text-lg` | 21px / 1.35 | 21px / 1.35 | 600 | Page section headings |
| `text-xl` | 26px / 1.3 | 24px / 1.3 | 600 | Page titles |
| `text-2xl` | 31px / 1.2 | 28px / 1.25 | 600 | Hero headings, primary page titles |
| `text-3xl` | 37px / 1.15 | 32px / 1.2 | 600-700 | Landing page titles only |

**Line-height rationale:** Larger text gets tighter line-height (1.15-1.3) because heading text is read as a unit. Body text gets looser line-height (1.5-1.6) because paragraphs require inter-line scanning.

### 3.3 Weight Discipline

The system uses exactly three weights:

| Weight | Token | Permitted Uses | Forbidden Uses |
|---|---|---|---|
| Regular (400) | `font-normal` | Body text, descriptions, form inputs, table cells, secondary labels | Never for headings, CTAs, or prices |
| Medium (500) | `font-medium` | Navigation items, card titles, form labels, breadcrumbs, tertiary headings | Never for body paragraphs, never for primary headings |
| Semibold (600) | `font-semibold` | Page headings, section titles, prices, primary CTAs, critical status text | Never for body text, never for more than 2 consecutive lines |

**Bold (700) is restricted.** It is permitted only for:
- Primary page hero headings at `text-2xl` or larger
- Price display when the price is the primary focus of a component (e.g., PDP price block)
- "Out of Stock" status when it is the only status indicator visible

Bold at body text sizes creates visual aggression that undermines calm.

### 3.4 OpenType Feature Requirements

```css
font-feature-settings:
  'liga' 1,    /* Standard ligatures */
  'calt' 1,    /* Contextual alternates */
  'tnum' 1,    /* Tabular numbers — critical for price alignment */
  'zero' 1,    /* Slashed zero — prevents O/0 confusion in part numbers */
  'ss02' 1;    /* Disambiguation set — I/l/1 differentiation */
```

These features are non-negotiable for a platform that displays OEM part numbers. The difference between part number `1OI0` and `lO10` is a wrong-part shipment.

### 3.5 Typography Failure Cases

| Failure | Why It Fails | Prevention |
|---|---|---|
| Bold body text | Creates visual shouting. Undermines calm. | Lint rule: no `font-bold` below `text-md` |
| ALL CAPS body text | Reduces legibility by 10-15%. Feels hostile. | Uppercase permitted only for badges, overline labels, and button text at `text-xs` / `text-sm` |
| Centered body paragraphs | Ragged left edges destroy readability after 2 lines | Center alignment only for hero headings and single-line display text |
| More than 3 font sizes on one screen | Creates visual noise. Signals lack of system. | Maximum 4 scale levels per viewport (e.g., heading + subhead + body + micro) |
| Inconsistent number formatting | Prices misalign in grids. Specification columns wobble. | Tabular numbers (`tnum`) mandatory for all numeric content |
| Product names longer than 2 lines | Card layouts break. Visual rhythm destroyed. | `line-clamp-2` on all card-level product names. Full name on PDP only. |
| Italic for emphasis in UI | Inter's italic is a true italic with different letter shapes. Emphasis should use weight, not style. | Italic permitted only for: placeholder text, technical term definitions, legal/disclaimer copy |

### 3.6 Letter-Spacing Rules

| Context | Letter-spacing | Rationale |
|---|---|---|
| Uppercase labels and badges | +0.04em to +0.06em | Compensates for reduced inter-character whitespace in caps |
| Heading text at `text-xl`+ | -0.01em to -0.02em | Tightens large text for visual cohesion |
| Body text | 0 (normal) | Inter is designed for zero tracking at body sizes |
| Monospace/part numbers | 0 (normal) | Tabular alignment handles spacing |
| Price display | 0 (normal) | Tabular numbers handle alignment |

---

## 4. Color System

### 4.1 Design Principles

This color system follows four laws:

1. **Color must carry meaning.** If a color does not indicate status, hierarchy, or function, it does not belong.
2. **Neutral foundation, functional accents.** The interface is 90%+ neutral tones. Color appears sparingly and deliberately.
3. **Contrast first, brand second.** WCAG AA (4.5:1 for text) is the minimum. AAA (7:1) is the target for body text.
4. **One primary action color.** The entire system has exactly one color that means "primary interactive element." This color appears on primary buttons, active states, and links. Nothing else.

### 4.2 Neutral Foundation

The neutral palette provides the structural canvas. It is the most important palette in the system because it occupies 90% of viewport pixels.

| Token | Value | Role | Contrast vs White |
|---|---|---|---|
| `--neutral-950` | `#0C1220` | Deepest text, primary headings | 18.2:1 |
| `--neutral-900` | `#111827` | Primary body text | 16.4:1 |
| `--neutral-800` | `#1E293B` | Secondary headings, strong labels | 12.6:1 |
| `--neutral-700` | `#334155` | Tertiary text, active navigation | 8.2:1 |
| `--neutral-600` | `#475569` | Muted text, placeholders | 5.9:1 |
| `--neutral-500` | `#64748B` | Disabled text, captions | 4.3:1 |
| `--neutral-400` | `#94A3B8` | Placeholder text, decorative borders | 2.7:1 |
| `--neutral-300` | `#CBD5E1` | Dividers, inactive borders | 1.7:1 |
| `--neutral-200` | `#E2E8F0` | Card borders, input borders | 1.4:1 |
| `--neutral-100` | `#F1F5F9` | Alternate section backgrounds, filter panels | 1.1:1 |
| `--neutral-50` | `#F8FAFC` | Subtle surface differentiation | 1.05:1 |
| `--neutral-0` | `#FFFFFF` | Primary surface | 1:1 |

**Chromatic temperature:** The neutral scale carries a cool-slate undertone (blue-gray). This is intentional:
- Cool neutrals signal precision and professionalism (medical equipment, engineering tools)
- Warm neutrals signal comfort and hospitality (unacceptable for industrial context)
- Pure gray (zero saturation) feels dead on screen — slight chromatic bias prevents this

### 4.3 Functional Colors

Each functional color has exactly one semantic role. No color serves two meanings.

#### 4.3.1 Primary Action — Indigo-Blue

| Token | Value | Use |
|---|---|---|
| `--action-600` | `#4338CA` | Primary buttons, primary links, active tab indicators |
| `--action-700` | `#3730A3` | Hover state for primary action |
| `--action-800` | `#312E81` | Active/pressed state |
| `--action-100` | `#E0E7FF` | Selected state backgrounds (e.g., active filter chip) |
| `--action-50` | `#EEF2FF` | Hover backgrounds on selectable rows/cards |

**Why indigo-blue, not pure blue:** Pure blue (#0066CC or #2563EB range) is overused to the point of generic association with "link" and "button." Indigo-blue (#4338CA) provides:
- Stronger distinction from informational blue (used for notes/info callouts)
- Higher perceived authority (deeper, more serious tone)
- Better contrast ratios against white at the same perceived brightness
- No association with any specific platform or framework

**Why not red, orange, or green for primary action:**
- Red = error/danger in every mature design system. Using red for primary CTAs creates semantic collision.
- Orange = warning state. Same collision problem.
- Green = success/positive state. "Add to cart" being green works until you also need "In Stock" green — the two meanings compete.

#### 4.3.2 Status Colors

| Status | Token | Value | Exclusive Use |
|---|---|---|---|
| Success / In Stock | `--status-success-600` | `#059669` | "In Stock" indicator, successful form submission, order confirmed |
| Success background | `--status-success-50` | `#ECFDF5` | Success message background |
| Warning / Low Stock | `--status-warning-600` | `#D97706` | "Low Stock" indicator, form validation warnings, attention-needed states |
| Warning background | `--status-warning-50` | `#FFFBEB` | Warning message background |
| Error / Out of Stock | `--status-error-600` | `#DC2626` | "Out of Stock" indicator, form errors, destructive action confirmation |
| Error background | `--status-error-50` | `#FEF2F2` | Error message background |
| Sale / Price reduction | `--status-sale-600` | `#EA580C` | Sale badge, struck-through price color, price reduction indicator |

**WhatsApp — third-party brand color (special case):**

| Token | Value | Use |
|---|---|---|
| `--brand-whatsapp` | `#25D366` | WhatsApp FAB button only |
| `--brand-whatsapp-dark` | `#128C7E` | WhatsApp button hover only |

This green is never used for any other purpose. It is not a system color; it is a third-party brand constant.

#### 4.3.3 Informational Color

| Token | Value | Use |
|---|---|---|
| `--info-600` | `#0284C7` | Informational callouts, help text badges, tooltip borders |
| `--info-50` | `#F0F9FF` | Informational banner backgrounds |

### 4.4 Color Application Rules

**Rule 1: Maximum 2 chromatic colors per viewport.** At any screen position, the user should see at most 2 non-neutral colors. A product card may show a Sale badge (orange) and an "In Stock" indicator (green). Adding a third color (e.g., a blue "New" badge) violates this rule.

**Rule 2: Neutral is the default. Color is the exception.** Borders are neutral. Backgrounds are neutral. Text is neutral. Only elements that carry semantic meaning receive color.

**Rule 3: Color intensity matches importance.**
- `600` values: primary states, buttons, badges (high importance)
- `100` values: background tints, selected states (medium importance)
- `50` values: hover states, subtle indicators (low importance)

**Rule 4: No color-only communication.** Every color-coded element must also communicate its meaning through text, icon shape, or position. "In Stock" is green text reading "In stock" — not a green dot alone.

**Rule 5: Hover and active states follow mathematical steps.**
- Hover = one step darker (600 → 700)
- Active = two steps darker (600 → 800)
- Disabled = neutral-400 with 50% opacity

This matches IBM Carbon's interaction-state math and ensures predictable state transitions.

### 4.5 Color Misuse Prevention

| Misuse | Correction |
|---|---|
| Using action color for non-interactive elements | Action color is reserved for elements that respond to user input |
| Using success green for promotional "GO" messaging | Success green means a system state (in stock, confirmed), never marketing emphasis |
| Using red for brand emphasis or visual "pop" | Red means error or out-of-stock. No exceptions. |
| Coloring section headers for visual variety | Section headers are neutral-900. Color variation between sections destroys hierarchy consistency. |
| Using background color to signal section changes | Alternate surfaces use neutral-50 / neutral-100 only. No colored section backgrounds except for system banners (error, success, info). |
| Applying opacity to create color variants | Use the defined token steps. Opacity creates inconsistent contrast ratios across surfaces. |
| Using WhatsApp green for success/in-stock | WhatsApp green is a brand constant. System success green is a different value serving a different semantic role. |

---

## 5. Layout, Grid, and Rhythm Laws

### 5.1 Grid System

**Base unit: 8px.** Every spatial value in the system is a multiple of 8. No exceptions.

This aligns with McMaster-Carr, IBM Carbon, Atlassian, and Adobe Spectrum. The convergence of four independent world-class design systems on 8px is not coincidence — it maps cleanly to common screen densities, halves/doubles cleanly, and produces visually harmonious relationships.

**Column system:**

| Breakpoint | Token | Width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | `--bp-sm` | 0-639px | 4 | 16px | 16px |
| Tablet | `--bp-md` | 640-1023px | 8 | 24px | 24px |
| Desktop | `--bp-lg` | 1024-1279px | 12 | 24px | 32px |
| Wide | `--bp-xl` | 1280-1535px | 12 | 32px | Auto (centered) |
| Ultrawide | `--bp-2xl` | 1536px+ | 12 | 32px | Auto (centered) |

**Maximum content width: 1280px.**

Rationale:
- McMaster-Carr uses ~1200-1400px. FCP Euro uses ~1280px. Carbon's max breakpoint is 1584px but content rarely fills it.
- 1280px on a 1920px monitor provides ~320px of margin on each side — enough peripheral calm to prevent the interface from feeling like a spreadsheet.
- At 15px body text with 1.6 line-height, a 1280px container with proper column splits ensures body text never exceeds ~80 characters per line.

**Narrow content width: 720px.** For long-form text pages (About, FAQ, Returns, Privacy). Human reading cognition degrades above ~75 characters per line. At 15px, 720px produces approximately 65-70 characters per line.

### 5.2 Spacing Scale

All spacing values are multiples of the 8px base unit:

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Dense inline spacing (icon-to-text gap inside buttons) |
| `--space-2` | 8px | Tight component internal padding, gap between related items |
| `--space-3` | 12px | Standard inline padding, small card padding |
| `--space-4` | 16px | Default component padding, form field spacing |
| `--space-5` | 20px | Card internal padding on mobile |
| `--space-6` | 24px | Card internal padding on desktop, gap between cards in grid |
| `--space-8` | 32px | Section internal padding (small sections) |
| `--space-10` | 40px | Section internal padding (standard) |
| `--space-12` | 48px | Section gap on mobile |
| `--space-16` | 64px | Section gap on desktop |
| `--space-20` | 80px | Major page section separation |
| `--space-24` | 96px | Hero section vertical padding |

**The 4px exception:** `--space-1` (4px) is the only non-8px value. It exists for micro-spacing inside dense components. It is not permitted for layout-level spacing.

### 5.3 Vertical Rhythm

**Section separation follows a two-tier model:**

1. **Within-section spacing:** Components inside a section are separated by `--space-4` to `--space-8` (16-32px). This creates visual grouping.
2. **Between-section spacing:** Sections are separated by `--space-16` (64px) on desktop and `--space-12` (48px) on mobile. This creates clear content boundaries.

**Surface alternation for section differentiation:** Consecutive sections alternate between `--neutral-0` (white) and `--neutral-50` (off-white) backgrounds. This is the only permitted method of visual section separation. No colored backgrounds. No decorative dividers. No gradient transitions.

### 5.4 Alignment Absolutes

**What must always align:**

| Element | Alignment Rule |
|---|---|
| Product card edges in a grid | Left edges form a perfect vertical line. No staggered or masonry layouts. |
| Price text across cards in the same row | Prices must appear at the same vertical position across horizontally-adjacent cards. Requires consistent card height management. |
| Section headings | Left-aligned to the container edge. Never centered (except hero). Never indented. |
| Table columns | Right-aligned for numeric data. Left-aligned for text data. |
| Form labels and inputs | Labels above inputs (stacked). Never inline for multi-field forms. |
| Navigation items | Baseline-aligned within horizontal navigation bars. |
| Badge position on product cards | Top-left corner. Consistent X/Y offset. Never top-right, never bottom. |

**What must never float:**

| Element | Constraint |
|---|---|
| CTAs in cards | Pinned to card bottom via flexbox. Never floating at varying heights across a row. |
| Prices in cards | Must share vertical alignment across grid siblings. |
| Product images | Fixed aspect ratio (4:3 or 1:1). Never variable-height images that break grid alignment. |
| Sidebar filters | Aligned to the top of the product grid. Scroll independently only via `position: sticky`. |

### 5.5 Product Image Aspect Ratios

| Context | Ratio | Rationale |
|---|---|---|
| Product card thumbnail | 4:3 | Landscape orientation accommodates engine parts that are typically wider than tall. Provides consistent card height. |
| PDP primary image | 1:1 | Square format provides maximum image area. Standard for e-commerce detail views. |
| Category/vehicle tile | 16:9 | Landscape banner proportion for navigation tiles. |
| Trust/brand logo | Constrained to max 160px x 32px | Prevents logo size competition. Following DigiKey's 155x30px constraint model. |

All product images must use `object-fit: contain` with a neutral background (neutral-50 or white). Never crop. Never stretch. Parts have irregular shapes; forcing them into a fill creates visual dishonesty.

---

## 6. Component Visual System

### 6.1 Design Principles for Components

1. **Each component has exactly one visual purpose.** A badge communicates status. A button triggers action. A card contains a sellable entity. No component serves mixed roles.
2. **Component variants are additive, not multiplicative.** A button has 3 variants (primary, secondary, ghost). Not 9 (3 variants x 3 sizes) unless each combination serves a distinct, documentable purpose.
3. **Visual consistency over expressive variety.** All cards look like cards. All buttons look like buttons. Consistency across 600+ product pages is worth more than novelty on any single page.

### 6.2 Buttons

Three variants. No gradients. No shadows. No icons by default (icons are optional additions).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--action-600` | `--neutral-0` (white) | none | One per viewport section. "Add to cart", primary CTA. |
| Secondary | transparent | `--neutral-800` | 1px `--neutral-300` | Supporting actions. "View details", "Clear filters". |
| Ghost | transparent | `--action-600` | none | Tertiary actions. "Show more", inline text actions. |

**Button sizing:**

| Size | Height | Padding (H) | Font | Radius | Use |
|---|---|---|---|---|---|
| Small | 32px | 12px | `text-sm` / 500 | 4px | Dense contexts: table rows, filter chips, inline actions |
| Default | 40px | 16px | `text-base` / 500 | 6px | Standard forms, card CTAs, page-level actions |
| Large | 48px | 24px | `text-base` / 600 | 6px | Hero CTAs, full-width mobile actions, checkout |

**Button states:**

| State | Change | Duration |
|---|---|---|
| Hover | Background one step darker (600 → 700) | 150ms ease |
| Active | Background two steps darker (600 → 800) | 0ms (instant) |
| Focus | 2px ring in `--action-600` with 3px offset | 0ms (instant) |
| Disabled | Opacity 0.4. Cursor not-allowed. | -- |
| Loading | Text replaced by spinner (same dimensions). No layout shift. | -- |

**Button rules:**
- Full uppercase text only at `text-sm` or smaller.
- Sentence case for all default and large buttons ("Add to cart", not "ADD TO CART" or "Add To Cart").
- Maximum label length: 3 words for primary, 4 words for secondary.
- Icon-only buttons require `aria-label` and minimum 40px touch target.

### 6.3 Cards

**Product card (PLP context):**

| Zone | Content | Styling |
|---|---|---|
| Image zone | Product photo, 4:3 ratio, `object-fit: contain`, neutral-50 bg | No border on image. Card border contains everything. |
| Badge zone | Maximum 1 badge (priority: Sale > Out of Stock > New) | Top-left, 8px inset from card edge. |
| Category overline | Category name | `text-xs`, uppercase, `--neutral-500`, letter-spacing +0.05em |
| Product name | Truncated to 2 lines | `text-sm`, `font-medium`, `--neutral-900`, `line-clamp-2` |
| Price zone | Price or "Request price" | `text-lg`, `font-semibold`, `--neutral-900` for price. `text-sm`, `--neutral-500` for request. |
| CTA zone | Button pinned to bottom | Primary "Add to cart" if purchasable. Secondary "View details" if not. |

Card specification:
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Shadow: `0 1px 3px rgba(0,0,0,0.06)` — one value only
- Hover: shadow transitions to `0 2px 8px rgba(0,0,0,0.1)` over 200ms
- Internal padding: `--space-4` (16px) below image zone

**Information card (non-product context):**

Used for: trust strip items, feature callouts, contact methods, vehicle/model selection tiles.

- Background: `--neutral-0` or `--neutral-50`
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Padding: `--space-6` (24px)
- No shadow (differentiates from product cards which are "interactive objects")
- Hover (if interactive): border transitions to `--neutral-400`

### 6.4 Badges

Badges communicate a single status. One badge per product. Maximum 2 badges visible in any single viewport quadrant.

| Badge | Background | Text | Use |
|---|---|---|---|
| Sale | `--status-sale-600` | white | Product with validated price reduction |
| Out of Stock | `--neutral-200` | `--neutral-600` | Product not currently available |
| Low Stock | `--status-warning-50` | `--status-warning-600` | 5 or fewer units |
| New | `--neutral-900` | white | Products added in the last 30 days |
| OEM | `--action-100` | `--action-600` | Genuine OEM verification marker |

Badge specification:
- Font: `text-xs`, `font-medium`, uppercase, letter-spacing +0.05em
- Padding: 4px 8px
- Radius: 4px
- No icons inside badges. Text only.

**Badge priority (when multiple apply):** Sale > Out of Stock > Low Stock > New > OEM. Only the highest-priority badge is shown.

### 6.5 Tables

Used for: specification tables on PDP, order history, comparison views.

| Element | Style |
|---|---|
| Header row | Background: `--neutral-100`. Text: `text-xs`, `font-semibold`, uppercase, `--neutral-600` |
| Body rows | Alternating `--neutral-0` / `--neutral-50`. Text: `text-sm`, `font-normal`, `--neutral-800` |
| Cell padding | 12px vertical, 16px horizontal |
| Borders | Horizontal only: 1px solid `--neutral-200`. No vertical borders. |
| Numeric cells | Right-aligned, tabular numbers enabled |
| Text cells | Left-aligned |

**Table rules:**
- No rounded corners on tables.
- No hover row highlighting unless the table is interactive (clickable rows).
- Maximum 6 columns on desktop. More than 6 requires a different pattern.
- On mobile: tables of 4+ columns become stacked key-value pairs. Never horizontal-scroll tables.

### 6.6 Filters

**Filter sidebar specification:**

| Element | Style |
|---|---|
| Container | Background: `--neutral-100`. Border-radius: 6px. Padding: `--space-5` (20px). Border: 1px solid `--neutral-200`. |
| Section label | `text-xs`, `font-semibold`, uppercase, `--neutral-600`, letter-spacing +0.05em |
| Section spacing | `--space-6` (24px) between filter sections |
| Filter option (text) | `text-sm`, `font-normal`, `--neutral-800` |
| Filter option (active) | Background: `--action-100`. Text: `--action-600`. `font-medium`. |
| Checkbox | 16px x 16px. Border: 1px `--neutral-400`. Checked: `--action-600` fill with white checkmark. |
| Count badge | `text-xs`, `--neutral-500`, inline after option text |
| Clear action | `text-xs`, `--status-sale-600`, `font-medium`. Right-aligned to section label. |

**Filter rules:**
- Maximum 6 filter sections visible without scrolling.
- Collapsible sections for sections beyond the 6th.
- "Clear all" action visible whenever any filter is active.
- Active filter count displayed in the filter header (mobile toggle).

### 6.7 Status Indicators

| Status | Visual | Text | Color |
|---|---|---|---|
| In Stock | 8px filled circle + text | "In stock" | `--status-success-600` |
| Low Stock | 8px filled circle + text | "Low stock -- X remaining" | `--status-warning-600` |
| Out of Stock | 8px filled circle + text | "Out of stock" | `--status-error-600` |
| On Request | 8px open circle (border only) + text | "Price on request" | `--neutral-500` |

Specification:
- Circle and text baseline-aligned
- 8px gap between circle and text
- Text: `text-sm`, `font-medium`
- Never use status indicators without text labels

---

## 7. Mobile Visual Discipline

### 7.1 Density Rules

**Maximum items per initial viewport (above the fold):**

| Page | Maximum Items | Rationale |
|---|---|---|
| Homepage hero | 1 primary CTA, 1 secondary CTA | Focus determines conversion. |
| Product grid | 4 products (2x2) | More than 4 makes the grid feel like a feed, not a catalog. |
| Filter panel | 4 filter sections visible | Remaining behind accordion. |
| PDP above fold | Image + name + price + primary CTA | All other content below fold by design. |
| Navigation | 5 primary categories visible | Remaining behind "All categories" link. |

**Text truncation logic:**

| Element | Mobile Rule |
|---|---|
| Product name | `line-clamp-2` |
| Category name | `line-clamp-1` |
| Product description | Hidden on card level. Visible only on PDP. |
| OEM part number | Full display — never truncate technical identifiers |
| Price | Full display — never truncate or abbreviate currency |
| Breadcrumb | Parent > Current only. |

### 7.2 Thumb Safety

**Tap target discipline:**

| Element | Minimum Size | Minimum Spacing |
|---|---|---|
| Buttons | 44px height | 8px between adjacent buttons |
| Navigation links | 44px touch area | 4px visual separation |
| Filter options | 44px touch area | 0px visual (padding creates touch area) |
| Card (as tap target) | Full card is tappable | 12px gap between cards |
| Close/dismiss buttons | 44px x 44px touch area | 8px from container edge |
| Checkbox/radio | 44px x 44px touch area | 8px between options |

**Edge avoidance:**
- No interactive elements within 16px of screen left/right edges
- Bottom sticky CTAs must respect `env(safe-area-inset-bottom)`
- Swipe-gesture-dependent interactions are forbidden

### 7.3 Visual Calm Under Scroll

**Sticky element restraint:**

| Permitted Sticky Elements | Max Height | Condition |
|---|---|---|
| Header (simplified) | 56px | Collapses from full header on scroll |
| Bottom CTA bar (PDP only) | 64px (including safe area) | Only when "Add to cart" scrolls out of view |
| Filter toggle (PLP only) | 44px | Only when scrolled past organic filter entry point |

**Maximum combined sticky height: 120px.** Preserves 75%+ of viewport for scrollable content on a 640px-tall screen.

**Forbidden sticky elements:** Trust strip, search bar, "Back to top" buttons, persistent cookie/consent banners.

**Motion minimization:**
- No parallax scrolling
- No entrance animations on scroll (fade-in, slide-up)
- No loading skeleton animations that loop indefinitely
- Permitted motion: button state transitions (150ms), card hover shadow (200ms), modal open/close (200ms ease-out)
- Maximum individual animation duration: 300ms

### 7.4 Mobile Component Adaptations

| Component | Desktop | Mobile Adaptation |
|---|---|---|
| Product grid | 3-4 columns | 2 columns. Card padding reduces to `--space-3`. |
| Filter sidebar | Persistent left column | Overlay panel, full width, z-index above content. |
| Product card CTA | Text button | Can reduce to icon-only cart button (44px minimum). |
| Specification table | Horizontal columns | Stacked key-value pairs. |
| Breadcrumb | Full path | Parent > Current only. |
| Navigation | Horizontal category bar | Hamburger with category tree. Slide-in from left, 200ms. |
| Trust strip | 4-item horizontal bar | 2x2 grid or horizontal scroll (no auto-scroll). |
| Footer | 4-column grid | Single column accordion (collapsed by default). |

---

## 8. Anti-Pattern Registry

### Critical (must never ship)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| C-01 | More than 1 badge per product card | Dilutes status hierarchy. |
| C-02 | Color-only communication (no text/icon pairing) | Accessibility failure for 8% of male users with color vision deficiency. |
| C-03 | Price displayed as "0.00" or "0 AED" | Signals data error. Destroys trust. Show "Price on request" instead. |
| C-04 | Bold weight on body text paragraphs | Visual aggression. Undermines calm authority. |
| C-05 | Interactive element below 44px touch target on mobile | WCAG 2.5.8 failure. Causes mis-taps. |
| C-06 | More than 120px of combined sticky elements on mobile | Consumes >25% of viewport. Content claustrophobia. |
| C-07 | Sale badge on product with no genuine price reduction | `sale_price` must be > 0 AND < `regular_price` AND `regular_price` > 0. Anything else is visual fraud. |

### Major (resolve within sprint)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| M-01 | More than 3 font sizes in a single viewport | Visual noise. Signals template origin. |
| M-02 | Centered body text beyond 1 line | Ragged left edges destroy readability. |
| M-03 | Inconsistent card heights in a product grid row | Breaks alignment. Creates visual wobble. |
| M-04 | Shadow with more than 1 definition (multi-layered) | Ambiguous depth hierarchy. |
| M-05 | Using system success-green for WhatsApp buttons | Semantic collision between system status and brand identity. |
| M-06 | Inline star ratings on automotive parts | OEM parts are correct-fit or wrong-fit, not subjectively rated. |
| M-07 | Auto-playing carousels | <1% engagement after slide 1. Motion competes with scanning. |
| M-08 | Decorative dividers | Information should be separated by space, not decoration. |

### Minor (track for refinement)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| m-01 | Using border-radius > 6px on cards/buttons | Exceeds industrial precision tolerance. |
| m-02 | Title Case on buttons ("Add To Cart") | Sentence case is correct. Title case signals template default. |
| m-03 | Generic placeholder images for products | Low-effort appearance destroys product credibility. |
| m-04 | Footer with more than 4 columns on desktop | Column proliferation signals content governance failure. |
| m-05 | Newsletter popup on first visit | Zero precedent in tier-1 industrial platforms. |
| m-06 | Opacity for disabled states below 0.4 | Text becomes unreadable. |

---

## Appendix A: Token Reference

```
/* Surfaces */
--surface-primary:     var(--neutral-0);
--surface-secondary:   var(--neutral-50);
--surface-tertiary:    var(--neutral-100);
--surface-card:        var(--neutral-0);
--surface-overlay:     rgba(12, 18, 32, 0.5);

/* Text */
--text-primary:        var(--neutral-900);
--text-secondary:      var(--neutral-600);
--text-tertiary:       var(--neutral-500);
--text-inverse:        var(--neutral-0);
--text-disabled:       var(--neutral-400);

/* Borders */
--border-default:      var(--neutral-200);
--border-strong:       var(--neutral-400);
--border-focus:        var(--action-600);
--border-error:        var(--status-error-600);

/* Interactive */
--interactive-primary:        var(--action-600);
--interactive-primary-hover:  var(--action-700);
--interactive-primary-active: var(--action-800);

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0,0,0,0.04);
--shadow-md:  0 1px 3px rgba(0,0,0,0.06);
--shadow-lg:  0 2px 8px rgba(0,0,0,0.1);

/* Spacing */
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 
```


## License: unknown
https://github.com/tomhendra/tomhendra.dev/blob/b3be6f584522afffc665dd33f41ecbc07a98671b/app/styles/shared/sizes.css

```
File creation is disabled. Here is the complete specification:

---

# UI Visual System Specification v3.0

**Classification:** Master UI Specification — Greenfield Design  
**Platform:** High-trust automotive / industrial e-commerce  
**Horizon:** 2025–2027  
**Status:** Normative  
**Last revised:** 2026-02-10  

---

## Executive Summary

This document defines the complete visual system for a precision-class automotive parts e-commerce platform. It is designed from first principles, anchored to zero legacy decisions, and informed by deep analysis of the highest-performing visual systems in industrial e-commerce (McMaster-Carr, DigiKey, FCP Euro), enterprise design systems (IBM Carbon, Adobe Spectrum, Atlassian), and OEM automotive catalogs (Toyota Parts, Grainger).

The system is built on three invariants:

1. **Restraint over expression.** Every visual element must earn its presence. No decorative color, no ornamental typography, no gratuitous motion.
2. **Information density without chaos.** The platform must present thousands of technical products with absolute clarity. Visual calm under data load is the primary design constraint.
3. **Authority through precision.** Trust is communicated through spatial consistency, typographic discipline, and functional color — never through promotional language or trend-following aesthetics.

This is not a brand guideline. It is a structural specification for an interface that must remain credible under audit in five years.

---

## 1. Visual Intelligence Summary

### 1.1 Research Synthesis

Analysis of 13 platforms across automotive parts, industrial catalogs, and enterprise design systems reveals three tiers of visual maturity:

**Tier 1 — Structural Excellence (reference-grade)**

| Platform | Core Lesson |
|---|---|
| McMaster-Carr | Typography IS the entire design system. Two font weights, one accent color, zero promotional elements. Visual calm under 85,000+ SKU density. 8px spacing grid with mathematical precision. The gold standard for information-dense commerce. |
| IBM Carbon | Role-based color with interaction-state math (hover = half-step, active = two steps). Productive vs. Expressive type sets. 2x grid with 16-column system at large breakpoints. Token architecture that scales across products. |
| Adobe Spectrum | 11 grays per theme, each with a defined role. Major second type scale (1.125x). Platform-aware sizing (desktop vs. mobile as separate scales). Semantic token naming with 3-part structure. |

**Tier 2 — Professional Competence (selective adoption)**

| Platform | Core Lesson |
|---|---|
| FCP Euro | Best-in-class enthusiast auto parts UI. Manufacturer logos as trust anchors. Lifetime guarantee as persistent visual element. Badge system with clear hierarchy (OE > OEM > Aftermarket). Moderate density, well-managed. |
| Grainger | Corporate-professional industrial catalog. Dual navigation (search + browse). Content marketing integration. Weakness: CTA color = brand color, reducing functional clarity. |
| DigiKey | 17.6M products with parametric search. Color is purely informational. Manufacturer logos constrained to 155x30px — remarkable sizing discipline. Authorized distribution messaging counters counterfeit anxiety. |
| Atlassian | Token-based color with emphasis levels (subtlest to boldest). 8px spacing base. Three body font weights with strict usage rules. |

**Tier 3 — Cautionary (patterns to study, not replicate)**

| Platform | Lesson |
|---|---|
| RockAuto | Proves "ugly-trustworthy" works for power users. Not a replicable model, but the underlying insight matters: promotional noise destroys trust in this market. |
| Pelican Parts | Technical depth creates trust. Warm backgrounds differentiate. But dated execution undermines credibility for new visitors. |
| Toyota OEM | Corporate restraint is correct, but sterile execution crosses into "government form" territory. Vehicle selector UI demonstrates how formality can become friction. |
| Car Builder Solutions | Shopify-standard execution with dark theme. Review-wall trust model. Demonstrates how template reliance is visible to informed buyers. |

### 1.2 Reusable Patterns That Scale

These patterns appear across all high-trust platforms and should be adopted:

1. **Typography-first hierarchy.** The best systems (McMaster, Carbon) use font size and weight as primary organizational tools, with color as secondary reinforcement.
2. **8px spatial grid.** McMaster, Carbon, Atlassian, and Spectrum all converge on 8px as the base spatial unit. This is not optional.
3. **Role-based color with no decorative usage.** Every platform that achieves "authority" feel uses color to carry meaning, never for decoration.
4. **Two-weight discipline.** Regular + Semibold (or Medium) handles 90% of cases. Bold is reserved for price display and critical status indicators.
5. **Progressive density disclosure.** Category-level pages are spacious; product-detail pages are dense. The system breathes differently at different depths.
6. **Manufacturer identity as trust proxy.** FCP Euro and DigiKey both use brand logos as trust signals. The host platform stays visually neutral; the product brands carry credibility.
7. **Persistent trust strip.** FCP Euro, Grainger, and DigiKey all maintain a persistent trust bar (shipping, returns, warranty). This is industry standard for a reason.

### 1.3 Patterns That Must Be Rejected

| Pattern | Why It Fails |
|---|---|
| Hero carousels | Zero information density. McMaster proves they are unnecessary. Data shows carousel interaction rates below 1% after slide 1. |
| Promotional color gradients | Signal consumer retail, not industrial authority. No tier-1 reference platform uses gradients. |
| Badge proliferation (3+ per card) | FCP Euro's weakness. More than one badge per product card creates visual noise and dilutes the hierarchy of the badge system itself. |
| Dark theme for product catalogs | Car Builder Solutions demonstrates this: dark backgrounds reduce image contrast for product photography and increase reading fatigue for specification text. |
| Animated transitions between states | Motion attracts attention, which is a cost. In a catalog with hundreds of items, micro-animations compete with the user's scanning behavior. |
| Rounded corners > 8px | Excessive rounding signals "friendly consumer app." Industrial authority requires geometric precision. 4-6px radius maximum. |
| Shadow depth > 1 level | Multiple shadow depths create ambiguity about spatial hierarchy. One shadow value, applied consistently. |
| Inline star ratings on product cards | Star ratings are meaningful for consumer products with subjective quality. OEM parts are either correct or incorrect. Fit/no-fit replaces like/dislike. |

---

## 2. Visual Positioning Doctrine

### 2.1 What the UI Must Immediately Communicate

**Mechanical precision.** The interface itself must feel engineered, not designed. Spacing must be mathematically consistent. Alignment must be absolute. The visual system should suggest that the same rigor applied to the interface was applied to the parts catalog.

**Authority and scale.** The platform must feel like it contains thousands of products without showing them all at once. This is communicated through structured navigation, consistent component patterns, and confident whitespace — not through "Browse 600+ products!" messaging.

**Reliability under complexity.** When a user is on a product page with 15 specification rows, 3 compatibility notes, and a pricing block, the interface must remain calm. No element should compete for attention. The hierarchy must be self-evident without scanning.

### 2.2 What It Must Never Communicate

- **Template usage.** No Shopify defaults. No Bootstrap 5 card shadows. No generic icon libraries used without curation. If an informed buyer can identify the template, the platform has failed.
- **Cheapness.** No gradient buttons. No 2px border radius on oversized elements. No uppercase body text. No excessive exclamation marks in UI copy.
- **Over-decoration.** No decorative dividers. No ornamental icons. No background patterns. No floating shapes. If an element does not carry information or aid navigation, it does not exist.
- **Lifestyle branding.** No mood photography. No aspirational copy. No "experience the difference" language. The parts are mechanical objects; the UI should reflect their nature.

### 2.3 Emotional Calibration

| Axis | Left (preferred) | Right (avoided) |
|---|---|---|
| Tone | Calm | Exciting |
| Information | Clarity | Personality |
| Aesthetics | Restraint | Expressiveness |
| Density | Confident | Sparse |
| Typography | Neutral | Characterful |
| Color | Functional | Decorative |
| Layout | Predictable | Surprising |
| Motion | Static | Animated |

This system targets the intersection of **McMaster-Carr's information purity** and **FCP Euro's product merchandising** — technical precision with enough visual warmth to support product photography, but never enough to suggest lifestyle retail.

---

## 3. Typography System

### 3.1 Font Selection

**Primary typeface: Inter**

Rationale:
- Variable font with optical sizing (opsz 14–32), enabling automatic micro-adjustments for text vs. display contexts
- 147 language scripts including Latin, Cyrillic, Greek, Arabic — essential for UAE/GCC audience
- Tabular number feature (`tnum`) critical for price columns and specification tables
- Tall x-height optimized for screen legibility at 13-16px body sizes
- Disambiguation features (`ss02`, `cv08`, `cv05`, slashed zero) prevent misreading of OEM part numbers (O vs 0, I vs l vs 1)
- Used by Figma, GitHub, Linear, and Vercel's own documentation — proven at scale in technical interfaces
- 100-900 weight range with three master designs (100, 400, 900) ensuring quality at every interpolation point
- Open Font License — no licensing constraints

**Monospace companion: Inter's tabular features (preferred) or JetBrains Mono (fallback)**

Used exclusively for: OEM part numbers, SKU codes, engine codes, specification values.

**Font stack:**
```
--font-sans: 'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', ui-monospace, monospace;
```

**Rejected alternatives and reasons:**

| Font | Rejection Reason |
|---|---|
| Geist Sans | Vercel-ecosystem association. Fewer language scripts than Inter. No optical sizing axis. |
| IBM Plex Sans | Strong IBM brand association. Mathematical scale is rigid. Three-font-family system (Sans + Serif + Mono) is over-specified for this use case. |
| Roboto | Google Material association. Humanist proportions are too warm for industrial context. |
| Helvetica Neue | No variable font support. No tabular numbers feature. License cost. |
| System fonts only | Inconsistent rendering across devices undermines visual precision. Unacceptable for a system that claims mechanical rigor. |

### 3.2 Type Scale

The scale uses a **1.200 ratio (minor third)** — the same mathematical discipline used by IBM Carbon, adapted for e-commerce density requirements.

Base size: 15px (desktop) / 16px (mobile)

| Token | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 11px / 1.45 | 12px / 1.45 | 400-500 | Microcopy, timestamps, tertiary labels |
| `text-sm` | 13px / 1.5 | 14px / 1.5 | 400-500 | Secondary text, filter labels, metadata |
| `text-base` | 15px / 1.6 | 16px / 1.6 | 400 | Body text, descriptions, form inputs |
| `text-md` | 18px / 1.45 | 18px / 1.45 | 500-600 | Subheadings, card titles, section labels |
| `text-lg` | 21px / 1.35 | 21px / 1.35 | 600 | Page section headings |
| `text-xl` | 26px / 1.3 | 24px / 1.3 | 600 | Page titles |
| `text-2xl` | 31px / 1.2 | 28px / 1.25 | 600 | Hero headings, primary page titles |
| `text-3xl` | 37px / 1.15 | 32px / 1.2 | 600-700 | Landing page titles only |

**Line-height rationale:** Larger text gets tighter line-height (1.15-1.3) because heading text is read as a unit. Body text gets looser line-height (1.5-1.6) because paragraphs require inter-line scanning.

### 3.3 Weight Discipline

The system uses exactly three weights:

| Weight | Token | Permitted Uses | Forbidden Uses |
|---|---|---|---|
| Regular (400) | `font-normal` | Body text, descriptions, form inputs, table cells, secondary labels | Never for headings, CTAs, or prices |
| Medium (500) | `font-medium` | Navigation items, card titles, form labels, breadcrumbs, tertiary headings | Never for body paragraphs, never for primary headings |
| Semibold (600) | `font-semibold` | Page headings, section titles, prices, primary CTAs, critical status text | Never for body text, never for more than 2 consecutive lines |

**Bold (700) is restricted.** It is permitted only for:
- Primary page hero headings at `text-2xl` or larger
- Price display when the price is the primary focus of a component (e.g., PDP price block)
- "Out of Stock" status when it is the only status indicator visible

Bold at body text sizes creates visual aggression that undermines calm.

### 3.4 OpenType Feature Requirements

```css
font-feature-settings:
  'liga' 1,    /* Standard ligatures */
  'calt' 1,    /* Contextual alternates */
  'tnum' 1,    /* Tabular numbers — critical for price alignment */
  'zero' 1,    /* Slashed zero — prevents O/0 confusion in part numbers */
  'ss02' 1;    /* Disambiguation set — I/l/1 differentiation */
```

These features are non-negotiable for a platform that displays OEM part numbers. The difference between part number `1OI0` and `lO10` is a wrong-part shipment.

### 3.5 Typography Failure Cases

| Failure | Why It Fails | Prevention |
|---|---|---|
| Bold body text | Creates visual shouting. Undermines calm. | Lint rule: no `font-bold` below `text-md` |
| ALL CAPS body text | Reduces legibility by 10-15%. Feels hostile. | Uppercase permitted only for badges, overline labels, and button text at `text-xs` / `text-sm` |
| Centered body paragraphs | Ragged left edges destroy readability after 2 lines | Center alignment only for hero headings and single-line display text |
| More than 3 font sizes on one screen | Creates visual noise. Signals lack of system. | Maximum 4 scale levels per viewport (e.g., heading + subhead + body + micro) |
| Inconsistent number formatting | Prices misalign in grids. Specification columns wobble. | Tabular numbers (`tnum`) mandatory for all numeric content |
| Product names longer than 2 lines | Card layouts break. Visual rhythm destroyed. | `line-clamp-2` on all card-level product names. Full name on PDP only. |
| Italic for emphasis in UI | Inter's italic is a true italic with different letter shapes. Emphasis should use weight, not style. | Italic permitted only for: placeholder text, technical term definitions, legal/disclaimer copy |

### 3.6 Letter-Spacing Rules

| Context | Letter-spacing | Rationale |
|---|---|---|
| Uppercase labels and badges | +0.04em to +0.06em | Compensates for reduced inter-character whitespace in caps |
| Heading text at `text-xl`+ | -0.01em to -0.02em | Tightens large text for visual cohesion |
| Body text | 0 (normal) | Inter is designed for zero tracking at body sizes |
| Monospace/part numbers | 0 (normal) | Tabular alignment handles spacing |
| Price display | 0 (normal) | Tabular numbers handle alignment |

---

## 4. Color System

### 4.1 Design Principles

This color system follows four laws:

1. **Color must carry meaning.** If a color does not indicate status, hierarchy, or function, it does not belong.
2. **Neutral foundation, functional accents.** The interface is 90%+ neutral tones. Color appears sparingly and deliberately.
3. **Contrast first, brand second.** WCAG AA (4.5:1 for text) is the minimum. AAA (7:1) is the target for body text.
4. **One primary action color.** The entire system has exactly one color that means "primary interactive element." This color appears on primary buttons, active states, and links. Nothing else.

### 4.2 Neutral Foundation

The neutral palette provides the structural canvas. It is the most important palette in the system because it occupies 90% of viewport pixels.

| Token | Value | Role | Contrast vs White |
|---|---|---|---|
| `--neutral-950` | `#0C1220` | Deepest text, primary headings | 18.2:1 |
| `--neutral-900` | `#111827` | Primary body text | 16.4:1 |
| `--neutral-800` | `#1E293B` | Secondary headings, strong labels | 12.6:1 |
| `--neutral-700` | `#334155` | Tertiary text, active navigation | 8.2:1 |
| `--neutral-600` | `#475569` | Muted text, placeholders | 5.9:1 |
| `--neutral-500` | `#64748B` | Disabled text, captions | 4.3:1 |
| `--neutral-400` | `#94A3B8` | Placeholder text, decorative borders | 2.7:1 |
| `--neutral-300` | `#CBD5E1` | Dividers, inactive borders | 1.7:1 |
| `--neutral-200` | `#E2E8F0` | Card borders, input borders | 1.4:1 |
| `--neutral-100` | `#F1F5F9` | Alternate section backgrounds, filter panels | 1.1:1 |
| `--neutral-50` | `#F8FAFC` | Subtle surface differentiation | 1.05:1 |
| `--neutral-0` | `#FFFFFF` | Primary surface | 1:1 |

**Chromatic temperature:** The neutral scale carries a cool-slate undertone (blue-gray). This is intentional:
- Cool neutrals signal precision and professionalism (medical equipment, engineering tools)
- Warm neutrals signal comfort and hospitality (unacceptable for industrial context)
- Pure gray (zero saturation) feels dead on screen — slight chromatic bias prevents this

### 4.3 Functional Colors

Each functional color has exactly one semantic role. No color serves two meanings.

#### 4.3.1 Primary Action — Indigo-Blue

| Token | Value | Use |
|---|---|---|
| `--action-600` | `#4338CA` | Primary buttons, primary links, active tab indicators |
| `--action-700` | `#3730A3` | Hover state for primary action |
| `--action-800` | `#312E81` | Active/pressed state |
| `--action-100` | `#E0E7FF` | Selected state backgrounds (e.g., active filter chip) |
| `--action-50` | `#EEF2FF` | Hover backgrounds on selectable rows/cards |

**Why indigo-blue, not pure blue:** Pure blue (#0066CC or #2563EB range) is overused to the point of generic association with "link" and "button." Indigo-blue (#4338CA) provides:
- Stronger distinction from informational blue (used for notes/info callouts)
- Higher perceived authority (deeper, more serious tone)
- Better contrast ratios against white at the same perceived brightness
- No association with any specific platform or framework

**Why not red, orange, or green for primary action:**
- Red = error/danger in every mature design system. Using red for primary CTAs creates semantic collision.
- Orange = warning state. Same collision problem.
- Green = success/positive state. "Add to cart" being green works until you also need "In Stock" green — the two meanings compete.

#### 4.3.2 Status Colors

| Status | Token | Value | Exclusive Use |
|---|---|---|---|
| Success / In Stock | `--status-success-600` | `#059669` | "In Stock" indicator, successful form submission, order confirmed |
| Success background | `--status-success-50` | `#ECFDF5` | Success message background |
| Warning / Low Stock | `--status-warning-600` | `#D97706` | "Low Stock" indicator, form validation warnings, attention-needed states |
| Warning background | `--status-warning-50` | `#FFFBEB` | Warning message background |
| Error / Out of Stock | `--status-error-600` | `#DC2626` | "Out of Stock" indicator, form errors, destructive action confirmation |
| Error background | `--status-error-50` | `#FEF2F2` | Error message background |
| Sale / Price reduction | `--status-sale-600` | `#EA580C` | Sale badge, struck-through price color, price reduction indicator |

**WhatsApp — third-party brand color (special case):**

| Token | Value | Use |
|---|---|---|
| `--brand-whatsapp` | `#25D366` | WhatsApp FAB button only |
| `--brand-whatsapp-dark` | `#128C7E` | WhatsApp button hover only |

This green is never used for any other purpose. It is not a system color; it is a third-party brand constant.

#### 4.3.3 Informational Color

| Token | Value | Use |
|---|---|---|
| `--info-600` | `#0284C7` | Informational callouts, help text badges, tooltip borders |
| `--info-50` | `#F0F9FF` | Informational banner backgrounds |

### 4.4 Color Application Rules

**Rule 1: Maximum 2 chromatic colors per viewport.** At any screen position, the user should see at most 2 non-neutral colors. A product card may show a Sale badge (orange) and an "In Stock" indicator (green). Adding a third color (e.g., a blue "New" badge) violates this rule.

**Rule 2: Neutral is the default. Color is the exception.** Borders are neutral. Backgrounds are neutral. Text is neutral. Only elements that carry semantic meaning receive color.

**Rule 3: Color intensity matches importance.**
- `600` values: primary states, buttons, badges (high importance)
- `100` values: background tints, selected states (medium importance)
- `50` values: hover states, subtle indicators (low importance)

**Rule 4: No color-only communication.** Every color-coded element must also communicate its meaning through text, icon shape, or position. "In Stock" is green text reading "In stock" — not a green dot alone.

**Rule 5: Hover and active states follow mathematical steps.**
- Hover = one step darker (600 → 700)
- Active = two steps darker (600 → 800)
- Disabled = neutral-400 with 50% opacity

This matches IBM Carbon's interaction-state math and ensures predictable state transitions.

### 4.5 Color Misuse Prevention

| Misuse | Correction |
|---|---|
| Using action color for non-interactive elements | Action color is reserved for elements that respond to user input |
| Using success green for promotional "GO" messaging | Success green means a system state (in stock, confirmed), never marketing emphasis |
| Using red for brand emphasis or visual "pop" | Red means error or out-of-stock. No exceptions. |
| Coloring section headers for visual variety | Section headers are neutral-900. Color variation between sections destroys hierarchy consistency. |
| Using background color to signal section changes | Alternate surfaces use neutral-50 / neutral-100 only. No colored section backgrounds except for system banners (error, success, info). |
| Applying opacity to create color variants | Use the defined token steps. Opacity creates inconsistent contrast ratios across surfaces. |
| Using WhatsApp green for success/in-stock | WhatsApp green is a brand constant. System success green is a different value serving a different semantic role. |

---

## 5. Layout, Grid, and Rhythm Laws

### 5.1 Grid System

**Base unit: 8px.** Every spatial value in the system is a multiple of 8. No exceptions.

This aligns with McMaster-Carr, IBM Carbon, Atlassian, and Adobe Spectrum. The convergence of four independent world-class design systems on 8px is not coincidence — it maps cleanly to common screen densities, halves/doubles cleanly, and produces visually harmonious relationships.

**Column system:**

| Breakpoint | Token | Width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | `--bp-sm` | 0-639px | 4 | 16px | 16px |
| Tablet | `--bp-md` | 640-1023px | 8 | 24px | 24px |
| Desktop | `--bp-lg` | 1024-1279px | 12 | 24px | 32px |
| Wide | `--bp-xl` | 1280-1535px | 12 | 32px | Auto (centered) |
| Ultrawide | `--bp-2xl` | 1536px+ | 12 | 32px | Auto (centered) |

**Maximum content width: 1280px.**

Rationale:
- McMaster-Carr uses ~1200-1400px. FCP Euro uses ~1280px. Carbon's max breakpoint is 1584px but content rarely fills it.
- 1280px on a 1920px monitor provides ~320px of margin on each side — enough peripheral calm to prevent the interface from feeling like a spreadsheet.
- At 15px body text with 1.6 line-height, a 1280px container with proper column splits ensures body text never exceeds ~80 characters per line.

**Narrow content width: 720px.** For long-form text pages (About, FAQ, Returns, Privacy). Human reading cognition degrades above ~75 characters per line. At 15px, 720px produces approximately 65-70 characters per line.

### 5.2 Spacing Scale

All spacing values are multiples of the 8px base unit:

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Dense inline spacing (icon-to-text gap inside buttons) |
| `--space-2` | 8px | Tight component internal padding, gap between related items |
| `--space-3` | 12px | Standard inline padding, small card padding |
| `--space-4` | 16px | Default component padding, form field spacing |
| `--space-5` | 20px | Card internal padding on mobile |
| `--space-6` | 24px | Card internal padding on desktop, gap between cards in grid |
| `--space-8` | 32px | Section internal padding (small sections) |
| `--space-10` | 40px | Section internal padding (standard) |
| `--space-12` | 48px | Section gap on mobile |
| `--space-16` | 64px | Section gap on desktop |
| `--space-20` | 80px | Major page section separation |
| `--space-24` | 96px | Hero section vertical padding |

**The 4px exception:** `--space-1` (4px) is the only non-8px value. It exists for micro-spacing inside dense components. It is not permitted for layout-level spacing.

### 5.3 Vertical Rhythm

**Section separation follows a two-tier model:**

1. **Within-section spacing:** Components inside a section are separated by `--space-4` to `--space-8` (16-32px). This creates visual grouping.
2. **Between-section spacing:** Sections are separated by `--space-16` (64px) on desktop and `--space-12` (48px) on mobile. This creates clear content boundaries.

**Surface alternation for section differentiation:** Consecutive sections alternate between `--neutral-0` (white) and `--neutral-50` (off-white) backgrounds. This is the only permitted method of visual section separation. No colored backgrounds. No decorative dividers. No gradient transitions.

### 5.4 Alignment Absolutes

**What must always align:**

| Element | Alignment Rule |
|---|---|
| Product card edges in a grid | Left edges form a perfect vertical line. No staggered or masonry layouts. |
| Price text across cards in the same row | Prices must appear at the same vertical position across horizontally-adjacent cards. Requires consistent card height management. |
| Section headings | Left-aligned to the container edge. Never centered (except hero). Never indented. |
| Table columns | Right-aligned for numeric data. Left-aligned for text data. |
| Form labels and inputs | Labels above inputs (stacked). Never inline for multi-field forms. |
| Navigation items | Baseline-aligned within horizontal navigation bars. |
| Badge position on product cards | Top-left corner. Consistent X/Y offset. Never top-right, never bottom. |

**What must never float:**

| Element | Constraint |
|---|---|
| CTAs in cards | Pinned to card bottom via flexbox. Never floating at varying heights across a row. |
| Prices in cards | Must share vertical alignment across grid siblings. |
| Product images | Fixed aspect ratio (4:3 or 1:1). Never variable-height images that break grid alignment. |
| Sidebar filters | Aligned to the top of the product grid. Scroll independently only via `position: sticky`. |

### 5.5 Product Image Aspect Ratios

| Context | Ratio | Rationale |
|---|---|---|
| Product card thumbnail | 4:3 | Landscape orientation accommodates engine parts that are typically wider than tall. Provides consistent card height. |
| PDP primary image | 1:1 | Square format provides maximum image area. Standard for e-commerce detail views. |
| Category/vehicle tile | 16:9 | Landscape banner proportion for navigation tiles. |
| Trust/brand logo | Constrained to max 160px x 32px | Prevents logo size competition. Following DigiKey's 155x30px constraint model. |

All product images must use `object-fit: contain` with a neutral background (neutral-50 or white). Never crop. Never stretch. Parts have irregular shapes; forcing them into a fill creates visual dishonesty.

---

## 6. Component Visual System

### 6.1 Design Principles for Components

1. **Each component has exactly one visual purpose.** A badge communicates status. A button triggers action. A card contains a sellable entity. No component serves mixed roles.
2. **Component variants are additive, not multiplicative.** A button has 3 variants (primary, secondary, ghost). Not 9 (3 variants x 3 sizes) unless each combination serves a distinct, documentable purpose.
3. **Visual consistency over expressive variety.** All cards look like cards. All buttons look like buttons. Consistency across 600+ product pages is worth more than novelty on any single page.

### 6.2 Buttons

Three variants. No gradients. No shadows. No icons by default (icons are optional additions).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--action-600` | `--neutral-0` (white) | none | One per viewport section. "Add to cart", primary CTA. |
| Secondary | transparent | `--neutral-800` | 1px `--neutral-300` | Supporting actions. "View details", "Clear filters". |
| Ghost | transparent | `--action-600` | none | Tertiary actions. "Show more", inline text actions. |

**Button sizing:**

| Size | Height | Padding (H) | Font | Radius | Use |
|---|---|---|---|---|---|
| Small | 32px | 12px | `text-sm` / 500 | 4px | Dense contexts: table rows, filter chips, inline actions |
| Default | 40px | 16px | `text-base` / 500 | 6px | Standard forms, card CTAs, page-level actions |
| Large | 48px | 24px | `text-base` / 600 | 6px | Hero CTAs, full-width mobile actions, checkout |

**Button states:**

| State | Change | Duration |
|---|---|---|
| Hover | Background one step darker (600 → 700) | 150ms ease |
| Active | Background two steps darker (600 → 800) | 0ms (instant) |
| Focus | 2px ring in `--action-600` with 3px offset | 0ms (instant) |
| Disabled | Opacity 0.4. Cursor not-allowed. | -- |
| Loading | Text replaced by spinner (same dimensions). No layout shift. | -- |

**Button rules:**
- Full uppercase text only at `text-sm` or smaller.
- Sentence case for all default and large buttons ("Add to cart", not "ADD TO CART" or "Add To Cart").
- Maximum label length: 3 words for primary, 4 words for secondary.
- Icon-only buttons require `aria-label` and minimum 40px touch target.

### 6.3 Cards

**Product card (PLP context):**

| Zone | Content | Styling |
|---|---|---|
| Image zone | Product photo, 4:3 ratio, `object-fit: contain`, neutral-50 bg | No border on image. Card border contains everything. |
| Badge zone | Maximum 1 badge (priority: Sale > Out of Stock > New) | Top-left, 8px inset from card edge. |
| Category overline | Category name | `text-xs`, uppercase, `--neutral-500`, letter-spacing +0.05em |
| Product name | Truncated to 2 lines | `text-sm`, `font-medium`, `--neutral-900`, `line-clamp-2` |
| Price zone | Price or "Request price" | `text-lg`, `font-semibold`, `--neutral-900` for price. `text-sm`, `--neutral-500` for request. |
| CTA zone | Button pinned to bottom | Primary "Add to cart" if purchasable. Secondary "View details" if not. |

Card specification:
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Shadow: `0 1px 3px rgba(0,0,0,0.06)` — one value only
- Hover: shadow transitions to `0 2px 8px rgba(0,0,0,0.1)` over 200ms
- Internal padding: `--space-4` (16px) below image zone

**Information card (non-product context):**

Used for: trust strip items, feature callouts, contact methods, vehicle/model selection tiles.

- Background: `--neutral-0` or `--neutral-50`
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Padding: `--space-6` (24px)
- No shadow (differentiates from product cards which are "interactive objects")
- Hover (if interactive): border transitions to `--neutral-400`

### 6.4 Badges

Badges communicate a single status. One badge per product. Maximum 2 badges visible in any single viewport quadrant.

| Badge | Background | Text | Use |
|---|---|---|---|
| Sale | `--status-sale-600` | white | Product with validated price reduction |
| Out of Stock | `--neutral-200` | `--neutral-600` | Product not currently available |
| Low Stock | `--status-warning-50` | `--status-warning-600` | 5 or fewer units |
| New | `--neutral-900` | white | Products added in the last 30 days |
| OEM | `--action-100` | `--action-600` | Genuine OEM verification marker |

Badge specification:
- Font: `text-xs`, `font-medium`, uppercase, letter-spacing +0.05em
- Padding: 4px 8px
- Radius: 4px
- No icons inside badges. Text only.

**Badge priority (when multiple apply):** Sale > Out of Stock > Low Stock > New > OEM. Only the highest-priority badge is shown.

### 6.5 Tables

Used for: specification tables on PDP, order history, comparison views.

| Element | Style |
|---|---|
| Header row | Background: `--neutral-100`. Text: `text-xs`, `font-semibold`, uppercase, `--neutral-600` |
| Body rows | Alternating `--neutral-0` / `--neutral-50`. Text: `text-sm`, `font-normal`, `--neutral-800` |
| Cell padding | 12px vertical, 16px horizontal |
| Borders | Horizontal only: 1px solid `--neutral-200`. No vertical borders. |
| Numeric cells | Right-aligned, tabular numbers enabled |
| Text cells | Left-aligned |

**Table rules:**
- No rounded corners on tables.
- No hover row highlighting unless the table is interactive (clickable rows).
- Maximum 6 columns on desktop. More than 6 requires a different pattern.
- On mobile: tables of 4+ columns become stacked key-value pairs. Never horizontal-scroll tables.

### 6.6 Filters

**Filter sidebar specification:**

| Element | Style |
|---|---|
| Container | Background: `--neutral-100`. Border-radius: 6px. Padding: `--space-5` (20px). Border: 1px solid `--neutral-200`. |
| Section label | `text-xs`, `font-semibold`, uppercase, `--neutral-600`, letter-spacing +0.05em |
| Section spacing | `--space-6` (24px) between filter sections |
| Filter option (text) | `text-sm`, `font-normal`, `--neutral-800` |
| Filter option (active) | Background: `--action-100`. Text: `--action-600`. `font-medium`. |
| Checkbox | 16px x 16px. Border: 1px `--neutral-400`. Checked: `--action-600` fill with white checkmark. |
| Count badge | `text-xs`, `--neutral-500`, inline after option text |
| Clear action | `text-xs`, `--status-sale-600`, `font-medium`. Right-aligned to section label. |

**Filter rules:**
- Maximum 6 filter sections visible without scrolling.
- Collapsible sections for sections beyond the 6th.
- "Clear all" action visible whenever any filter is active.
- Active filter count displayed in the filter header (mobile toggle).

### 6.7 Status Indicators

| Status | Visual | Text | Color |
|---|---|---|---|
| In Stock | 8px filled circle + text | "In stock" | `--status-success-600` |
| Low Stock | 8px filled circle + text | "Low stock -- X remaining" | `--status-warning-600` |
| Out of Stock | 8px filled circle + text | "Out of stock" | `--status-error-600` |
| On Request | 8px open circle (border only) + text | "Price on request" | `--neutral-500` |

Specification:
- Circle and text baseline-aligned
- 8px gap between circle and text
- Text: `text-sm`, `font-medium`
- Never use status indicators without text labels

---

## 7. Mobile Visual Discipline

### 7.1 Density Rules

**Maximum items per initial viewport (above the fold):**

| Page | Maximum Items | Rationale |
|---|---|---|
| Homepage hero | 1 primary CTA, 1 secondary CTA | Focus determines conversion. |
| Product grid | 4 products (2x2) | More than 4 makes the grid feel like a feed, not a catalog. |
| Filter panel | 4 filter sections visible | Remaining behind accordion. |
| PDP above fold | Image + name + price + primary CTA | All other content below fold by design. |
| Navigation | 5 primary categories visible | Remaining behind "All categories" link. |

**Text truncation logic:**

| Element | Mobile Rule |
|---|---|
| Product name | `line-clamp-2` |
| Category name | `line-clamp-1` |
| Product description | Hidden on card level. Visible only on PDP. |
| OEM part number | Full display — never truncate technical identifiers |
| Price | Full display — never truncate or abbreviate currency |
| Breadcrumb | Parent > Current only. |

### 7.2 Thumb Safety

**Tap target discipline:**

| Element | Minimum Size | Minimum Spacing |
|---|---|---|
| Buttons | 44px height | 8px between adjacent buttons |
| Navigation links | 44px touch area | 4px visual separation |
| Filter options | 44px touch area | 0px visual (padding creates touch area) |
| Card (as tap target) | Full card is tappable | 12px gap between cards |
| Close/dismiss buttons | 44px x 44px touch area | 8px from container edge |
| Checkbox/radio | 44px x 44px touch area | 8px between options |

**Edge avoidance:**
- No interactive elements within 16px of screen left/right edges
- Bottom sticky CTAs must respect `env(safe-area-inset-bottom)`
- Swipe-gesture-dependent interactions are forbidden

### 7.3 Visual Calm Under Scroll

**Sticky element restraint:**

| Permitted Sticky Elements | Max Height | Condition |
|---|---|---|
| Header (simplified) | 56px | Collapses from full header on scroll |
| Bottom CTA bar (PDP only) | 64px (including safe area) | Only when "Add to cart" scrolls out of view |
| Filter toggle (PLP only) | 44px | Only when scrolled past organic filter entry point |

**Maximum combined sticky height: 120px.** Preserves 75%+ of viewport for scrollable content on a 640px-tall screen.

**Forbidden sticky elements:** Trust strip, search bar, "Back to top" buttons, persistent cookie/consent banners.

**Motion minimization:**
- No parallax scrolling
- No entrance animations on scroll (fade-in, slide-up)
- No loading skeleton animations that loop indefinitely
- Permitted motion: button state transitions (150ms), card hover shadow (200ms), modal open/close (200ms ease-out)
- Maximum individual animation duration: 300ms

### 7.4 Mobile Component Adaptations

| Component | Desktop | Mobile Adaptation |
|---|---|---|
| Product grid | 3-4 columns | 2 columns. Card padding reduces to `--space-3`. |
| Filter sidebar | Persistent left column | Overlay panel, full width, z-index above content. |
| Product card CTA | Text button | Can reduce to icon-only cart button (44px minimum). |
| Specification table | Horizontal columns | Stacked key-value pairs. |
| Breadcrumb | Full path | Parent > Current only. |
| Navigation | Horizontal category bar | Hamburger with category tree. Slide-in from left, 200ms. |
| Trust strip | 4-item horizontal bar | 2x2 grid or horizontal scroll (no auto-scroll). |
| Footer | 4-column grid | Single column accordion (collapsed by default). |

---

## 8. Anti-Pattern Registry

### Critical (must never ship)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| C-01 | More than 1 badge per product card | Dilutes status hierarchy. |
| C-02 | Color-only communication (no text/icon pairing) | Accessibility failure for 8% of male users with color vision deficiency. |
| C-03 | Price displayed as "0.00" or "0 AED" | Signals data error. Destroys trust. Show "Price on request" instead. |
| C-04 | Bold weight on body text paragraphs | Visual aggression. Undermines calm authority. |
| C-05 | Interactive element below 44px touch target on mobile | WCAG 2.5.8 failure. Causes mis-taps. |
| C-06 | More than 120px of combined sticky elements on mobile | Consumes >25% of viewport. Content claustrophobia. |
| C-07 | Sale badge on product with no genuine price reduction | `sale_price` must be > 0 AND < `regular_price` AND `regular_price` > 0. Anything else is visual fraud. |

### Major (resolve within sprint)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| M-01 | More than 3 font sizes in a single viewport | Visual noise. Signals template origin. |
| M-02 | Centered body text beyond 1 line | Ragged left edges destroy readability. |
| M-03 | Inconsistent card heights in a product grid row | Breaks alignment. Creates visual wobble. |
| M-04 | Shadow with more than 1 definition (multi-layered) | Ambiguous depth hierarchy. |
| M-05 | Using system success-green for WhatsApp buttons | Semantic collision between system status and brand identity. |
| M-06 | Inline star ratings on automotive parts | OEM parts are correct-fit or wrong-fit, not subjectively rated. |
| M-07 | Auto-playing carousels | <1% engagement after slide 1. Motion competes with scanning. |
| M-08 | Decorative dividers | Information should be separated by space, not decoration. |

### Minor (track for refinement)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| m-01 | Using border-radius > 6px on cards/buttons | Exceeds industrial precision tolerance. |
| m-02 | Title Case on buttons ("Add To Cart") | Sentence case is correct. Title case signals template default. |
| m-03 | Generic placeholder images for products | Low-effort appearance destroys product credibility. |
| m-04 | Footer with more than 4 columns on desktop | Column proliferation signals content governance failure. |
| m-05 | Newsletter popup on first visit | Zero precedent in tier-1 industrial platforms. |
| m-06 | Opacity for disabled states below 0.4 | Text becomes unreadable. |

---

## Appendix A: Token Reference

```
/* Surfaces */
--surface-primary:     var(--neutral-0);
--surface-secondary:   var(--neutral-50);
--surface-tertiary:    var(--neutral-100);
--surface-card:        var(--neutral-0);
--surface-overlay:     rgba(12, 18, 32, 0.5);

/* Text */
--text-primary:        var(--neutral-900);
--text-secondary:      var(--neutral-600);
--text-tertiary:       var(--neutral-500);
--text-inverse:        var(--neutral-0);
--text-disabled:       var(--neutral-400);

/* Borders */
--border-default:      var(--neutral-200);
--border-strong:       var(--neutral-400);
--border-focus:        var(--action-600);
--border-error:        var(--status-error-600);

/* Interactive */
--interactive-primary:        var(--action-600);
--interactive-primary-hover:  var(--action-700);
--interactive-primary-active: var(--action-800);

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0,0,0,0.04);
--shadow-md:  0 1px 3px rgba(0,0,0,0.06);
--shadow-lg:  0 2px 8px rgba(0,0,0,0.1);

/* Spacing */
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 
```


## License: unknown
https://github.com/tomhendra/tomhendra.dev/blob/b3be6f584522afffc665dd33f41ecbc07a98671b/app/styles/shared/sizes.css

```
File creation is disabled. Here is the complete specification:

---

# UI Visual System Specification v3.0

**Classification:** Master UI Specification — Greenfield Design  
**Platform:** High-trust automotive / industrial e-commerce  
**Horizon:** 2025–2027  
**Status:** Normative  
**Last revised:** 2026-02-10  

---

## Executive Summary

This document defines the complete visual system for a precision-class automotive parts e-commerce platform. It is designed from first principles, anchored to zero legacy decisions, and informed by deep analysis of the highest-performing visual systems in industrial e-commerce (McMaster-Carr, DigiKey, FCP Euro), enterprise design systems (IBM Carbon, Adobe Spectrum, Atlassian), and OEM automotive catalogs (Toyota Parts, Grainger).

The system is built on three invariants:

1. **Restraint over expression.** Every visual element must earn its presence. No decorative color, no ornamental typography, no gratuitous motion.
2. **Information density without chaos.** The platform must present thousands of technical products with absolute clarity. Visual calm under data load is the primary design constraint.
3. **Authority through precision.** Trust is communicated through spatial consistency, typographic discipline, and functional color — never through promotional language or trend-following aesthetics.

This is not a brand guideline. It is a structural specification for an interface that must remain credible under audit in five years.

---

## 1. Visual Intelligence Summary

### 1.1 Research Synthesis

Analysis of 13 platforms across automotive parts, industrial catalogs, and enterprise design systems reveals three tiers of visual maturity:

**Tier 1 — Structural Excellence (reference-grade)**

| Platform | Core Lesson |
|---|---|
| McMaster-Carr | Typography IS the entire design system. Two font weights, one accent color, zero promotional elements. Visual calm under 85,000+ SKU density. 8px spacing grid with mathematical precision. The gold standard for information-dense commerce. |
| IBM Carbon | Role-based color with interaction-state math (hover = half-step, active = two steps). Productive vs. Expressive type sets. 2x grid with 16-column system at large breakpoints. Token architecture that scales across products. |
| Adobe Spectrum | 11 grays per theme, each with a defined role. Major second type scale (1.125x). Platform-aware sizing (desktop vs. mobile as separate scales). Semantic token naming with 3-part structure. |

**Tier 2 — Professional Competence (selective adoption)**

| Platform | Core Lesson |
|---|---|
| FCP Euro | Best-in-class enthusiast auto parts UI. Manufacturer logos as trust anchors. Lifetime guarantee as persistent visual element. Badge system with clear hierarchy (OE > OEM > Aftermarket). Moderate density, well-managed. |
| Grainger | Corporate-professional industrial catalog. Dual navigation (search + browse). Content marketing integration. Weakness: CTA color = brand color, reducing functional clarity. |
| DigiKey | 17.6M products with parametric search. Color is purely informational. Manufacturer logos constrained to 155x30px — remarkable sizing discipline. Authorized distribution messaging counters counterfeit anxiety. |
| Atlassian | Token-based color with emphasis levels (subtlest to boldest). 8px spacing base. Three body font weights with strict usage rules. |

**Tier 3 — Cautionary (patterns to study, not replicate)**

| Platform | Lesson |
|---|---|
| RockAuto | Proves "ugly-trustworthy" works for power users. Not a replicable model, but the underlying insight matters: promotional noise destroys trust in this market. |
| Pelican Parts | Technical depth creates trust. Warm backgrounds differentiate. But dated execution undermines credibility for new visitors. |
| Toyota OEM | Corporate restraint is correct, but sterile execution crosses into "government form" territory. Vehicle selector UI demonstrates how formality can become friction. |
| Car Builder Solutions | Shopify-standard execution with dark theme. Review-wall trust model. Demonstrates how template reliance is visible to informed buyers. |

### 1.2 Reusable Patterns That Scale

These patterns appear across all high-trust platforms and should be adopted:

1. **Typography-first hierarchy.** The best systems (McMaster, Carbon) use font size and weight as primary organizational tools, with color as secondary reinforcement.
2. **8px spatial grid.** McMaster, Carbon, Atlassian, and Spectrum all converge on 8px as the base spatial unit. This is not optional.
3. **Role-based color with no decorative usage.** Every platform that achieves "authority" feel uses color to carry meaning, never for decoration.
4. **Two-weight discipline.** Regular + Semibold (or Medium) handles 90% of cases. Bold is reserved for price display and critical status indicators.
5. **Progressive density disclosure.** Category-level pages are spacious; product-detail pages are dense. The system breathes differently at different depths.
6. **Manufacturer identity as trust proxy.** FCP Euro and DigiKey both use brand logos as trust signals. The host platform stays visually neutral; the product brands carry credibility.
7. **Persistent trust strip.** FCP Euro, Grainger, and DigiKey all maintain a persistent trust bar (shipping, returns, warranty). This is industry standard for a reason.

### 1.3 Patterns That Must Be Rejected

| Pattern | Why It Fails |
|---|---|
| Hero carousels | Zero information density. McMaster proves they are unnecessary. Data shows carousel interaction rates below 1% after slide 1. |
| Promotional color gradients | Signal consumer retail, not industrial authority. No tier-1 reference platform uses gradients. |
| Badge proliferation (3+ per card) | FCP Euro's weakness. More than one badge per product card creates visual noise and dilutes the hierarchy of the badge system itself. |
| Dark theme for product catalogs | Car Builder Solutions demonstrates this: dark backgrounds reduce image contrast for product photography and increase reading fatigue for specification text. |
| Animated transitions between states | Motion attracts attention, which is a cost. In a catalog with hundreds of items, micro-animations compete with the user's scanning behavior. |
| Rounded corners > 8px | Excessive rounding signals "friendly consumer app." Industrial authority requires geometric precision. 4-6px radius maximum. |
| Shadow depth > 1 level | Multiple shadow depths create ambiguity about spatial hierarchy. One shadow value, applied consistently. |
| Inline star ratings on product cards | Star ratings are meaningful for consumer products with subjective quality. OEM parts are either correct or incorrect. Fit/no-fit replaces like/dislike. |

---

## 2. Visual Positioning Doctrine

### 2.1 What the UI Must Immediately Communicate

**Mechanical precision.** The interface itself must feel engineered, not designed. Spacing must be mathematically consistent. Alignment must be absolute. The visual system should suggest that the same rigor applied to the interface was applied to the parts catalog.

**Authority and scale.** The platform must feel like it contains thousands of products without showing them all at once. This is communicated through structured navigation, consistent component patterns, and confident whitespace — not through "Browse 600+ products!" messaging.

**Reliability under complexity.** When a user is on a product page with 15 specification rows, 3 compatibility notes, and a pricing block, the interface must remain calm. No element should compete for attention. The hierarchy must be self-evident without scanning.

### 2.2 What It Must Never Communicate

- **Template usage.** No Shopify defaults. No Bootstrap 5 card shadows. No generic icon libraries used without curation. If an informed buyer can identify the template, the platform has failed.
- **Cheapness.** No gradient buttons. No 2px border radius on oversized elements. No uppercase body text. No excessive exclamation marks in UI copy.
- **Over-decoration.** No decorative dividers. No ornamental icons. No background patterns. No floating shapes. If an element does not carry information or aid navigation, it does not exist.
- **Lifestyle branding.** No mood photography. No aspirational copy. No "experience the difference" language. The parts are mechanical objects; the UI should reflect their nature.

### 2.3 Emotional Calibration

| Axis | Left (preferred) | Right (avoided) |
|---|---|---|
| Tone | Calm | Exciting |
| Information | Clarity | Personality |
| Aesthetics | Restraint | Expressiveness |
| Density | Confident | Sparse |
| Typography | Neutral | Characterful |
| Color | Functional | Decorative |
| Layout | Predictable | Surprising |
| Motion | Static | Animated |

This system targets the intersection of **McMaster-Carr's information purity** and **FCP Euro's product merchandising** — technical precision with enough visual warmth to support product photography, but never enough to suggest lifestyle retail.

---

## 3. Typography System

### 3.1 Font Selection

**Primary typeface: Inter**

Rationale:
- Variable font with optical sizing (opsz 14–32), enabling automatic micro-adjustments for text vs. display contexts
- 147 language scripts including Latin, Cyrillic, Greek, Arabic — essential for UAE/GCC audience
- Tabular number feature (`tnum`) critical for price columns and specification tables
- Tall x-height optimized for screen legibility at 13-16px body sizes
- Disambiguation features (`ss02`, `cv08`, `cv05`, slashed zero) prevent misreading of OEM part numbers (O vs 0, I vs l vs 1)
- Used by Figma, GitHub, Linear, and Vercel's own documentation — proven at scale in technical interfaces
- 100-900 weight range with three master designs (100, 400, 900) ensuring quality at every interpolation point
- Open Font License — no licensing constraints

**Monospace companion: Inter's tabular features (preferred) or JetBrains Mono (fallback)**

Used exclusively for: OEM part numbers, SKU codes, engine codes, specification values.

**Font stack:**
```
--font-sans: 'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', ui-monospace, monospace;
```

**Rejected alternatives and reasons:**

| Font | Rejection Reason |
|---|---|
| Geist Sans | Vercel-ecosystem association. Fewer language scripts than Inter. No optical sizing axis. |
| IBM Plex Sans | Strong IBM brand association. Mathematical scale is rigid. Three-font-family system (Sans + Serif + Mono) is over-specified for this use case. |
| Roboto | Google Material association. Humanist proportions are too warm for industrial context. |
| Helvetica Neue | No variable font support. No tabular numbers feature. License cost. |
| System fonts only | Inconsistent rendering across devices undermines visual precision. Unacceptable for a system that claims mechanical rigor. |

### 3.2 Type Scale

The scale uses a **1.200 ratio (minor third)** — the same mathematical discipline used by IBM Carbon, adapted for e-commerce density requirements.

Base size: 15px (desktop) / 16px (mobile)

| Token | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 11px / 1.45 | 12px / 1.45 | 400-500 | Microcopy, timestamps, tertiary labels |
| `text-sm` | 13px / 1.5 | 14px / 1.5 | 400-500 | Secondary text, filter labels, metadata |
| `text-base` | 15px / 1.6 | 16px / 1.6 | 400 | Body text, descriptions, form inputs |
| `text-md` | 18px / 1.45 | 18px / 1.45 | 500-600 | Subheadings, card titles, section labels |
| `text-lg` | 21px / 1.35 | 21px / 1.35 | 600 | Page section headings |
| `text-xl` | 26px / 1.3 | 24px / 1.3 | 600 | Page titles |
| `text-2xl` | 31px / 1.2 | 28px / 1.25 | 600 | Hero headings, primary page titles |
| `text-3xl` | 37px / 1.15 | 32px / 1.2 | 600-700 | Landing page titles only |

**Line-height rationale:** Larger text gets tighter line-height (1.15-1.3) because heading text is read as a unit. Body text gets looser line-height (1.5-1.6) because paragraphs require inter-line scanning.

### 3.3 Weight Discipline

The system uses exactly three weights:

| Weight | Token | Permitted Uses | Forbidden Uses |
|---|---|---|---|
| Regular (400) | `font-normal` | Body text, descriptions, form inputs, table cells, secondary labels | Never for headings, CTAs, or prices |
| Medium (500) | `font-medium` | Navigation items, card titles, form labels, breadcrumbs, tertiary headings | Never for body paragraphs, never for primary headings |
| Semibold (600) | `font-semibold` | Page headings, section titles, prices, primary CTAs, critical status text | Never for body text, never for more than 2 consecutive lines |

**Bold (700) is restricted.** It is permitted only for:
- Primary page hero headings at `text-2xl` or larger
- Price display when the price is the primary focus of a component (e.g., PDP price block)
- "Out of Stock" status when it is the only status indicator visible

Bold at body text sizes creates visual aggression that undermines calm.

### 3.4 OpenType Feature Requirements

```css
font-feature-settings:
  'liga' 1,    /* Standard ligatures */
  'calt' 1,    /* Contextual alternates */
  'tnum' 1,    /* Tabular numbers — critical for price alignment */
  'zero' 1,    /* Slashed zero — prevents O/0 confusion in part numbers */
  'ss02' 1;    /* Disambiguation set — I/l/1 differentiation */
```

These features are non-negotiable for a platform that displays OEM part numbers. The difference between part number `1OI0` and `lO10` is a wrong-part shipment.

### 3.5 Typography Failure Cases

| Failure | Why It Fails | Prevention |
|---|---|---|
| Bold body text | Creates visual shouting. Undermines calm. | Lint rule: no `font-bold` below `text-md` |
| ALL CAPS body text | Reduces legibility by 10-15%. Feels hostile. | Uppercase permitted only for badges, overline labels, and button text at `text-xs` / `text-sm` |
| Centered body paragraphs | Ragged left edges destroy readability after 2 lines | Center alignment only for hero headings and single-line display text |
| More than 3 font sizes on one screen | Creates visual noise. Signals lack of system. | Maximum 4 scale levels per viewport (e.g., heading + subhead + body + micro) |
| Inconsistent number formatting | Prices misalign in grids. Specification columns wobble. | Tabular numbers (`tnum`) mandatory for all numeric content |
| Product names longer than 2 lines | Card layouts break. Visual rhythm destroyed. | `line-clamp-2` on all card-level product names. Full name on PDP only. |
| Italic for emphasis in UI | Inter's italic is a true italic with different letter shapes. Emphasis should use weight, not style. | Italic permitted only for: placeholder text, technical term definitions, legal/disclaimer copy |

### 3.6 Letter-Spacing Rules

| Context | Letter-spacing | Rationale |
|---|---|---|
| Uppercase labels and badges | +0.04em to +0.06em | Compensates for reduced inter-character whitespace in caps |
| Heading text at `text-xl`+ | -0.01em to -0.02em | Tightens large text for visual cohesion |
| Body text | 0 (normal) | Inter is designed for zero tracking at body sizes |
| Monospace/part numbers | 0 (normal) | Tabular alignment handles spacing |
| Price display | 0 (normal) | Tabular numbers handle alignment |

---

## 4. Color System

### 4.1 Design Principles

This color system follows four laws:

1. **Color must carry meaning.** If a color does not indicate status, hierarchy, or function, it does not belong.
2. **Neutral foundation, functional accents.** The interface is 90%+ neutral tones. Color appears sparingly and deliberately.
3. **Contrast first, brand second.** WCAG AA (4.5:1 for text) is the minimum. AAA (7:1) is the target for body text.
4. **One primary action color.** The entire system has exactly one color that means "primary interactive element." This color appears on primary buttons, active states, and links. Nothing else.

### 4.2 Neutral Foundation

The neutral palette provides the structural canvas. It is the most important palette in the system because it occupies 90% of viewport pixels.

| Token | Value | Role | Contrast vs White |
|---|---|---|---|
| `--neutral-950` | `#0C1220` | Deepest text, primary headings | 18.2:1 |
| `--neutral-900` | `#111827` | Primary body text | 16.4:1 |
| `--neutral-800` | `#1E293B` | Secondary headings, strong labels | 12.6:1 |
| `--neutral-700` | `#334155` | Tertiary text, active navigation | 8.2:1 |
| `--neutral-600` | `#475569` | Muted text, placeholders | 5.9:1 |
| `--neutral-500` | `#64748B` | Disabled text, captions | 4.3:1 |
| `--neutral-400` | `#94A3B8` | Placeholder text, decorative borders | 2.7:1 |
| `--neutral-300` | `#CBD5E1` | Dividers, inactive borders | 1.7:1 |
| `--neutral-200` | `#E2E8F0` | Card borders, input borders | 1.4:1 |
| `--neutral-100` | `#F1F5F9` | Alternate section backgrounds, filter panels | 1.1:1 |
| `--neutral-50` | `#F8FAFC` | Subtle surface differentiation | 1.05:1 |
| `--neutral-0` | `#FFFFFF` | Primary surface | 1:1 |

**Chromatic temperature:** The neutral scale carries a cool-slate undertone (blue-gray). This is intentional:
- Cool neutrals signal precision and professionalism (medical equipment, engineering tools)
- Warm neutrals signal comfort and hospitality (unacceptable for industrial context)
- Pure gray (zero saturation) feels dead on screen — slight chromatic bias prevents this

### 4.3 Functional Colors

Each functional color has exactly one semantic role. No color serves two meanings.

#### 4.3.1 Primary Action — Indigo-Blue

| Token | Value | Use |
|---|---|---|
| `--action-600` | `#4338CA` | Primary buttons, primary links, active tab indicators |
| `--action-700` | `#3730A3` | Hover state for primary action |
| `--action-800` | `#312E81` | Active/pressed state |
| `--action-100` | `#E0E7FF` | Selected state backgrounds (e.g., active filter chip) |
| `--action-50` | `#EEF2FF` | Hover backgrounds on selectable rows/cards |

**Why indigo-blue, not pure blue:** Pure blue (#0066CC or #2563EB range) is overused to the point of generic association with "link" and "button." Indigo-blue (#4338CA) provides:
- Stronger distinction from informational blue (used for notes/info callouts)
- Higher perceived authority (deeper, more serious tone)
- Better contrast ratios against white at the same perceived brightness
- No association with any specific platform or framework

**Why not red, orange, or green for primary action:**
- Red = error/danger in every mature design system. Using red for primary CTAs creates semantic collision.
- Orange = warning state. Same collision problem.
- Green = success/positive state. "Add to cart" being green works until you also need "In Stock" green — the two meanings compete.

#### 4.3.2 Status Colors

| Status | Token | Value | Exclusive Use |
|---|---|---|---|
| Success / In Stock | `--status-success-600` | `#059669` | "In Stock" indicator, successful form submission, order confirmed |
| Success background | `--status-success-50` | `#ECFDF5` | Success message background |
| Warning / Low Stock | `--status-warning-600` | `#D97706` | "Low Stock" indicator, form validation warnings, attention-needed states |
| Warning background | `--status-warning-50` | `#FFFBEB` | Warning message background |
| Error / Out of Stock | `--status-error-600` | `#DC2626` | "Out of Stock" indicator, form errors, destructive action confirmation |
| Error background | `--status-error-50` | `#FEF2F2` | Error message background |
| Sale / Price reduction | `--status-sale-600` | `#EA580C` | Sale badge, struck-through price color, price reduction indicator |

**WhatsApp — third-party brand color (special case):**

| Token | Value | Use |
|---|---|---|
| `--brand-whatsapp` | `#25D366` | WhatsApp FAB button only |
| `--brand-whatsapp-dark` | `#128C7E` | WhatsApp button hover only |

This green is never used for any other purpose. It is not a system color; it is a third-party brand constant.

#### 4.3.3 Informational Color

| Token | Value | Use |
|---|---|---|
| `--info-600` | `#0284C7` | Informational callouts, help text badges, tooltip borders |
| `--info-50` | `#F0F9FF` | Informational banner backgrounds |

### 4.4 Color Application Rules

**Rule 1: Maximum 2 chromatic colors per viewport.** At any screen position, the user should see at most 2 non-neutral colors. A product card may show a Sale badge (orange) and an "In Stock" indicator (green). Adding a third color (e.g., a blue "New" badge) violates this rule.

**Rule 2: Neutral is the default. Color is the exception.** Borders are neutral. Backgrounds are neutral. Text is neutral. Only elements that carry semantic meaning receive color.

**Rule 3: Color intensity matches importance.**
- `600` values: primary states, buttons, badges (high importance)
- `100` values: background tints, selected states (medium importance)
- `50` values: hover states, subtle indicators (low importance)

**Rule 4: No color-only communication.** Every color-coded element must also communicate its meaning through text, icon shape, or position. "In Stock" is green text reading "In stock" — not a green dot alone.

**Rule 5: Hover and active states follow mathematical steps.**
- Hover = one step darker (600 → 700)
- Active = two steps darker (600 → 800)
- Disabled = neutral-400 with 50% opacity

This matches IBM Carbon's interaction-state math and ensures predictable state transitions.

### 4.5 Color Misuse Prevention

| Misuse | Correction |
|---|---|
| Using action color for non-interactive elements | Action color is reserved for elements that respond to user input |
| Using success green for promotional "GO" messaging | Success green means a system state (in stock, confirmed), never marketing emphasis |
| Using red for brand emphasis or visual "pop" | Red means error or out-of-stock. No exceptions. |
| Coloring section headers for visual variety | Section headers are neutral-900. Color variation between sections destroys hierarchy consistency. |
| Using background color to signal section changes | Alternate surfaces use neutral-50 / neutral-100 only. No colored section backgrounds except for system banners (error, success, info). |
| Applying opacity to create color variants | Use the defined token steps. Opacity creates inconsistent contrast ratios across surfaces. |
| Using WhatsApp green for success/in-stock | WhatsApp green is a brand constant. System success green is a different value serving a different semantic role. |

---

## 5. Layout, Grid, and Rhythm Laws

### 5.1 Grid System

**Base unit: 8px.** Every spatial value in the system is a multiple of 8. No exceptions.

This aligns with McMaster-Carr, IBM Carbon, Atlassian, and Adobe Spectrum. The convergence of four independent world-class design systems on 8px is not coincidence — it maps cleanly to common screen densities, halves/doubles cleanly, and produces visually harmonious relationships.

**Column system:**

| Breakpoint | Token | Width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | `--bp-sm` | 0-639px | 4 | 16px | 16px |
| Tablet | `--bp-md` | 640-1023px | 8 | 24px | 24px |
| Desktop | `--bp-lg` | 1024-1279px | 12 | 24px | 32px |
| Wide | `--bp-xl` | 1280-1535px | 12 | 32px | Auto (centered) |
| Ultrawide | `--bp-2xl` | 1536px+ | 12 | 32px | Auto (centered) |

**Maximum content width: 1280px.**

Rationale:
- McMaster-Carr uses ~1200-1400px. FCP Euro uses ~1280px. Carbon's max breakpoint is 1584px but content rarely fills it.
- 1280px on a 1920px monitor provides ~320px of margin on each side — enough peripheral calm to prevent the interface from feeling like a spreadsheet.
- At 15px body text with 1.6 line-height, a 1280px container with proper column splits ensures body text never exceeds ~80 characters per line.

**Narrow content width: 720px.** For long-form text pages (About, FAQ, Returns, Privacy). Human reading cognition degrades above ~75 characters per line. At 15px, 720px produces approximately 65-70 characters per line.

### 5.2 Spacing Scale

All spacing values are multiples of the 8px base unit:

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Dense inline spacing (icon-to-text gap inside buttons) |
| `--space-2` | 8px | Tight component internal padding, gap between related items |
| `--space-3` | 12px | Standard inline padding, small card padding |
| `--space-4` | 16px | Default component padding, form field spacing |
| `--space-5` | 20px | Card internal padding on mobile |
| `--space-6` | 24px | Card internal padding on desktop, gap between cards in grid |
| `--space-8` | 32px | Section internal padding (small sections) |
| `--space-10` | 40px | Section internal padding (standard) |
| `--space-12` | 48px | Section gap on mobile |
| `--space-16` | 64px | Section gap on desktop |
| `--space-20` | 80px | Major page section separation |
| `--space-24` | 96px | Hero section vertical padding |

**The 4px exception:** `--space-1` (4px) is the only non-8px value. It exists for micro-spacing inside dense components. It is not permitted for layout-level spacing.

### 5.3 Vertical Rhythm

**Section separation follows a two-tier model:**

1. **Within-section spacing:** Components inside a section are separated by `--space-4` to `--space-8` (16-32px). This creates visual grouping.
2. **Between-section spacing:** Sections are separated by `--space-16` (64px) on desktop and `--space-12` (48px) on mobile. This creates clear content boundaries.

**Surface alternation for section differentiation:** Consecutive sections alternate between `--neutral-0` (white) and `--neutral-50` (off-white) backgrounds. This is the only permitted method of visual section separation. No colored backgrounds. No decorative dividers. No gradient transitions.

### 5.4 Alignment Absolutes

**What must always align:**

| Element | Alignment Rule |
|---|---|
| Product card edges in a grid | Left edges form a perfect vertical line. No staggered or masonry layouts. |
| Price text across cards in the same row | Prices must appear at the same vertical position across horizontally-adjacent cards. Requires consistent card height management. |
| Section headings | Left-aligned to the container edge. Never centered (except hero). Never indented. |
| Table columns | Right-aligned for numeric data. Left-aligned for text data. |
| Form labels and inputs | Labels above inputs (stacked). Never inline for multi-field forms. |
| Navigation items | Baseline-aligned within horizontal navigation bars. |
| Badge position on product cards | Top-left corner. Consistent X/Y offset. Never top-right, never bottom. |

**What must never float:**

| Element | Constraint |
|---|---|
| CTAs in cards | Pinned to card bottom via flexbox. Never floating at varying heights across a row. |
| Prices in cards | Must share vertical alignment across grid siblings. |
| Product images | Fixed aspect ratio (4:3 or 1:1). Never variable-height images that break grid alignment. |
| Sidebar filters | Aligned to the top of the product grid. Scroll independently only via `position: sticky`. |

### 5.5 Product Image Aspect Ratios

| Context | Ratio | Rationale |
|---|---|---|
| Product card thumbnail | 4:3 | Landscape orientation accommodates engine parts that are typically wider than tall. Provides consistent card height. |
| PDP primary image | 1:1 | Square format provides maximum image area. Standard for e-commerce detail views. |
| Category/vehicle tile | 16:9 | Landscape banner proportion for navigation tiles. |
| Trust/brand logo | Constrained to max 160px x 32px | Prevents logo size competition. Following DigiKey's 155x30px constraint model. |

All product images must use `object-fit: contain` with a neutral background (neutral-50 or white). Never crop. Never stretch. Parts have irregular shapes; forcing them into a fill creates visual dishonesty.

---

## 6. Component Visual System

### 6.1 Design Principles for Components

1. **Each component has exactly one visual purpose.** A badge communicates status. A button triggers action. A card contains a sellable entity. No component serves mixed roles.
2. **Component variants are additive, not multiplicative.** A button has 3 variants (primary, secondary, ghost). Not 9 (3 variants x 3 sizes) unless each combination serves a distinct, documentable purpose.
3. **Visual consistency over expressive variety.** All cards look like cards. All buttons look like buttons. Consistency across 600+ product pages is worth more than novelty on any single page.

### 6.2 Buttons

Three variants. No gradients. No shadows. No icons by default (icons are optional additions).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--action-600` | `--neutral-0` (white) | none | One per viewport section. "Add to cart", primary CTA. |
| Secondary | transparent | `--neutral-800` | 1px `--neutral-300` | Supporting actions. "View details", "Clear filters". |
| Ghost | transparent | `--action-600` | none | Tertiary actions. "Show more", inline text actions. |

**Button sizing:**

| Size | Height | Padding (H) | Font | Radius | Use |
|---|---|---|---|---|---|
| Small | 32px | 12px | `text-sm` / 500 | 4px | Dense contexts: table rows, filter chips, inline actions |
| Default | 40px | 16px | `text-base` / 500 | 6px | Standard forms, card CTAs, page-level actions |
| Large | 48px | 24px | `text-base` / 600 | 6px | Hero CTAs, full-width mobile actions, checkout |

**Button states:**

| State | Change | Duration |
|---|---|---|
| Hover | Background one step darker (600 → 700) | 150ms ease |
| Active | Background two steps darker (600 → 800) | 0ms (instant) |
| Focus | 2px ring in `--action-600` with 3px offset | 0ms (instant) |
| Disabled | Opacity 0.4. Cursor not-allowed. | -- |
| Loading | Text replaced by spinner (same dimensions). No layout shift. | -- |

**Button rules:**
- Full uppercase text only at `text-sm` or smaller.
- Sentence case for all default and large buttons ("Add to cart", not "ADD TO CART" or "Add To Cart").
- Maximum label length: 3 words for primary, 4 words for secondary.
- Icon-only buttons require `aria-label` and minimum 40px touch target.

### 6.3 Cards

**Product card (PLP context):**

| Zone | Content | Styling |
|---|---|---|
| Image zone | Product photo, 4:3 ratio, `object-fit: contain`, neutral-50 bg | No border on image. Card border contains everything. |
| Badge zone | Maximum 1 badge (priority: Sale > Out of Stock > New) | Top-left, 8px inset from card edge. |
| Category overline | Category name | `text-xs`, uppercase, `--neutral-500`, letter-spacing +0.05em |
| Product name | Truncated to 2 lines | `text-sm`, `font-medium`, `--neutral-900`, `line-clamp-2` |
| Price zone | Price or "Request price" | `text-lg`, `font-semibold`, `--neutral-900` for price. `text-sm`, `--neutral-500` for request. |
| CTA zone | Button pinned to bottom | Primary "Add to cart" if purchasable. Secondary "View details" if not. |

Card specification:
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Shadow: `0 1px 3px rgba(0,0,0,0.06)` — one value only
- Hover: shadow transitions to `0 2px 8px rgba(0,0,0,0.1)` over 200ms
- Internal padding: `--space-4` (16px) below image zone

**Information card (non-product context):**

Used for: trust strip items, feature callouts, contact methods, vehicle/model selection tiles.

- Background: `--neutral-0` or `--neutral-50`
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Padding: `--space-6` (24px)
- No shadow (differentiates from product cards which are "interactive objects")
- Hover (if interactive): border transitions to `--neutral-400`

### 6.4 Badges

Badges communicate a single status. One badge per product. Maximum 2 badges visible in any single viewport quadrant.

| Badge | Background | Text | Use |
|---|---|---|---|
| Sale | `--status-sale-600` | white | Product with validated price reduction |
| Out of Stock | `--neutral-200` | `--neutral-600` | Product not currently available |
| Low Stock | `--status-warning-50` | `--status-warning-600` | 5 or fewer units |
| New | `--neutral-900` | white | Products added in the last 30 days |
| OEM | `--action-100` | `--action-600` | Genuine OEM verification marker |

Badge specification:
- Font: `text-xs`, `font-medium`, uppercase, letter-spacing +0.05em
- Padding: 4px 8px
- Radius: 4px
- No icons inside badges. Text only.

**Badge priority (when multiple apply):** Sale > Out of Stock > Low Stock > New > OEM. Only the highest-priority badge is shown.

### 6.5 Tables

Used for: specification tables on PDP, order history, comparison views.

| Element | Style |
|---|---|
| Header row | Background: `--neutral-100`. Text: `text-xs`, `font-semibold`, uppercase, `--neutral-600` |
| Body rows | Alternating `--neutral-0` / `--neutral-50`. Text: `text-sm`, `font-normal`, `--neutral-800` |
| Cell padding | 12px vertical, 16px horizontal |
| Borders | Horizontal only: 1px solid `--neutral-200`. No vertical borders. |
| Numeric cells | Right-aligned, tabular numbers enabled |
| Text cells | Left-aligned |

**Table rules:**
- No rounded corners on tables.
- No hover row highlighting unless the table is interactive (clickable rows).
- Maximum 6 columns on desktop. More than 6 requires a different pattern.
- On mobile: tables of 4+ columns become stacked key-value pairs. Never horizontal-scroll tables.

### 6.6 Filters

**Filter sidebar specification:**

| Element | Style |
|---|---|
| Container | Background: `--neutral-100`. Border-radius: 6px. Padding: `--space-5` (20px). Border: 1px solid `--neutral-200`. |
| Section label | `text-xs`, `font-semibold`, uppercase, `--neutral-600`, letter-spacing +0.05em |
| Section spacing | `--space-6` (24px) between filter sections |
| Filter option (text) | `text-sm`, `font-normal`, `--neutral-800` |
| Filter option (active) | Background: `--action-100`. Text: `--action-600`. `font-medium`. |
| Checkbox | 16px x 16px. Border: 1px `--neutral-400`. Checked: `--action-600` fill with white checkmark. |
| Count badge | `text-xs`, `--neutral-500`, inline after option text |
| Clear action | `text-xs`, `--status-sale-600`, `font-medium`. Right-aligned to section label. |

**Filter rules:**
- Maximum 6 filter sections visible without scrolling.
- Collapsible sections for sections beyond the 6th.
- "Clear all" action visible whenever any filter is active.
- Active filter count displayed in the filter header (mobile toggle).

### 6.7 Status Indicators

| Status | Visual | Text | Color |
|---|---|---|---|
| In Stock | 8px filled circle + text | "In stock" | `--status-success-600` |
| Low Stock | 8px filled circle + text | "Low stock -- X remaining" | `--status-warning-600` |
| Out of Stock | 8px filled circle + text | "Out of stock" | `--status-error-600` |
| On Request | 8px open circle (border only) + text | "Price on request" | `--neutral-500` |

Specification:
- Circle and text baseline-aligned
- 8px gap between circle and text
- Text: `text-sm`, `font-medium`
- Never use status indicators without text labels

---

## 7. Mobile Visual Discipline

### 7.1 Density Rules

**Maximum items per initial viewport (above the fold):**

| Page | Maximum Items | Rationale |
|---|---|---|
| Homepage hero | 1 primary CTA, 1 secondary CTA | Focus determines conversion. |
| Product grid | 4 products (2x2) | More than 4 makes the grid feel like a feed, not a catalog. |
| Filter panel | 4 filter sections visible | Remaining behind accordion. |
| PDP above fold | Image + name + price + primary CTA | All other content below fold by design. |
| Navigation | 5 primary categories visible | Remaining behind "All categories" link. |

**Text truncation logic:**

| Element | Mobile Rule |
|---|---|
| Product name | `line-clamp-2` |
| Category name | `line-clamp-1` |
| Product description | Hidden on card level. Visible only on PDP. |
| OEM part number | Full display — never truncate technical identifiers |
| Price | Full display — never truncate or abbreviate currency |
| Breadcrumb | Parent > Current only. |

### 7.2 Thumb Safety

**Tap target discipline:**

| Element | Minimum Size | Minimum Spacing |
|---|---|---|
| Buttons | 44px height | 8px between adjacent buttons |
| Navigation links | 44px touch area | 4px visual separation |
| Filter options | 44px touch area | 0px visual (padding creates touch area) |
| Card (as tap target) | Full card is tappable | 12px gap between cards |
| Close/dismiss buttons | 44px x 44px touch area | 8px from container edge |
| Checkbox/radio | 44px x 44px touch area | 8px between options |

**Edge avoidance:**
- No interactive elements within 16px of screen left/right edges
- Bottom sticky CTAs must respect `env(safe-area-inset-bottom)`
- Swipe-gesture-dependent interactions are forbidden

### 7.3 Visual Calm Under Scroll

**Sticky element restraint:**

| Permitted Sticky Elements | Max Height | Condition |
|---|---|---|
| Header (simplified) | 56px | Collapses from full header on scroll |
| Bottom CTA bar (PDP only) | 64px (including safe area) | Only when "Add to cart" scrolls out of view |
| Filter toggle (PLP only) | 44px | Only when scrolled past organic filter entry point |

**Maximum combined sticky height: 120px.** Preserves 75%+ of viewport for scrollable content on a 640px-tall screen.

**Forbidden sticky elements:** Trust strip, search bar, "Back to top" buttons, persistent cookie/consent banners.

**Motion minimization:**
- No parallax scrolling
- No entrance animations on scroll (fade-in, slide-up)
- No loading skeleton animations that loop indefinitely
- Permitted motion: button state transitions (150ms), card hover shadow (200ms), modal open/close (200ms ease-out)
- Maximum individual animation duration: 300ms

### 7.4 Mobile Component Adaptations

| Component | Desktop | Mobile Adaptation |
|---|---|---|
| Product grid | 3-4 columns | 2 columns. Card padding reduces to `--space-3`. |
| Filter sidebar | Persistent left column | Overlay panel, full width, z-index above content. |
| Product card CTA | Text button | Can reduce to icon-only cart button (44px minimum). |
| Specification table | Horizontal columns | Stacked key-value pairs. |
| Breadcrumb | Full path | Parent > Current only. |
| Navigation | Horizontal category bar | Hamburger with category tree. Slide-in from left, 200ms. |
| Trust strip | 4-item horizontal bar | 2x2 grid or horizontal scroll (no auto-scroll). |
| Footer | 4-column grid | Single column accordion (collapsed by default). |

---

## 8. Anti-Pattern Registry

### Critical (must never ship)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| C-01 | More than 1 badge per product card | Dilutes status hierarchy. |
| C-02 | Color-only communication (no text/icon pairing) | Accessibility failure for 8% of male users with color vision deficiency. |
| C-03 | Price displayed as "0.00" or "0 AED" | Signals data error. Destroys trust. Show "Price on request" instead. |
| C-04 | Bold weight on body text paragraphs | Visual aggression. Undermines calm authority. |
| C-05 | Interactive element below 44px touch target on mobile | WCAG 2.5.8 failure. Causes mis-taps. |
| C-06 | More than 120px of combined sticky elements on mobile | Consumes >25% of viewport. Content claustrophobia. |
| C-07 | Sale badge on product with no genuine price reduction | `sale_price` must be > 0 AND < `regular_price` AND `regular_price` > 0. Anything else is visual fraud. |

### Major (resolve within sprint)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| M-01 | More than 3 font sizes in a single viewport | Visual noise. Signals template origin. |
| M-02 | Centered body text beyond 1 line | Ragged left edges destroy readability. |
| M-03 | Inconsistent card heights in a product grid row | Breaks alignment. Creates visual wobble. |
| M-04 | Shadow with more than 1 definition (multi-layered) | Ambiguous depth hierarchy. |
| M-05 | Using system success-green for WhatsApp buttons | Semantic collision between system status and brand identity. |
| M-06 | Inline star ratings on automotive parts | OEM parts are correct-fit or wrong-fit, not subjectively rated. |
| M-07 | Auto-playing carousels | <1% engagement after slide 1. Motion competes with scanning. |
| M-08 | Decorative dividers | Information should be separated by space, not decoration. |

### Minor (track for refinement)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| m-01 | Using border-radius > 6px on cards/buttons | Exceeds industrial precision tolerance. |
| m-02 | Title Case on buttons ("Add To Cart") | Sentence case is correct. Title case signals template default. |
| m-03 | Generic placeholder images for products | Low-effort appearance destroys product credibility. |
| m-04 | Footer with more than 4 columns on desktop | Column proliferation signals content governance failure. |
| m-05 | Newsletter popup on first visit | Zero precedent in tier-1 industrial platforms. |
| m-06 | Opacity for disabled states below 0.4 | Text becomes unreadable. |

---

## Appendix A: Token Reference

```
/* Surfaces */
--surface-primary:     var(--neutral-0);
--surface-secondary:   var(--neutral-50);
--surface-tertiary:    var(--neutral-100);
--surface-card:        var(--neutral-0);
--surface-overlay:     rgba(12, 18, 32, 0.5);

/* Text */
--text-primary:        var(--neutral-900);
--text-secondary:      var(--neutral-600);
--text-tertiary:       var(--neutral-500);
--text-inverse:        var(--neutral-0);
--text-disabled:       var(--neutral-400);

/* Borders */
--border-default:      var(--neutral-200);
--border-strong:       var(--neutral-400);
--border-focus:        var(--action-600);
--border-error:        var(--status-error-600);

/* Interactive */
--interactive-primary:        var(--action-600);
--interactive-primary-hover:  var(--action-700);
--interactive-primary-active: var(--action-800);

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0,0,0,0.04);
--shadow-md:  0 1px 3px rgba(0,0,0,0.06);
--shadow-lg:  0 2px 8px rgba(0,0,0,0.1);

/* Spacing */
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 
```


## License: unknown
https://github.com/tomhendra/tomhendra.dev/blob/b3be6f584522afffc665dd33f41ecbc07a98671b/app/styles/shared/sizes.css

```
File creation is disabled. Here is the complete specification:

---

# UI Visual System Specification v3.0

**Classification:** Master UI Specification — Greenfield Design  
**Platform:** High-trust automotive / industrial e-commerce  
**Horizon:** 2025–2027  
**Status:** Normative  
**Last revised:** 2026-02-10  

---

## Executive Summary

This document defines the complete visual system for a precision-class automotive parts e-commerce platform. It is designed from first principles, anchored to zero legacy decisions, and informed by deep analysis of the highest-performing visual systems in industrial e-commerce (McMaster-Carr, DigiKey, FCP Euro), enterprise design systems (IBM Carbon, Adobe Spectrum, Atlassian), and OEM automotive catalogs (Toyota Parts, Grainger).

The system is built on three invariants:

1. **Restraint over expression.** Every visual element must earn its presence. No decorative color, no ornamental typography, no gratuitous motion.
2. **Information density without chaos.** The platform must present thousands of technical products with absolute clarity. Visual calm under data load is the primary design constraint.
3. **Authority through precision.** Trust is communicated through spatial consistency, typographic discipline, and functional color — never through promotional language or trend-following aesthetics.

This is not a brand guideline. It is a structural specification for an interface that must remain credible under audit in five years.

---

## 1. Visual Intelligence Summary

### 1.1 Research Synthesis

Analysis of 13 platforms across automotive parts, industrial catalogs, and enterprise design systems reveals three tiers of visual maturity:

**Tier 1 — Structural Excellence (reference-grade)**

| Platform | Core Lesson |
|---|---|
| McMaster-Carr | Typography IS the entire design system. Two font weights, one accent color, zero promotional elements. Visual calm under 85,000+ SKU density. 8px spacing grid with mathematical precision. The gold standard for information-dense commerce. |
| IBM Carbon | Role-based color with interaction-state math (hover = half-step, active = two steps). Productive vs. Expressive type sets. 2x grid with 16-column system at large breakpoints. Token architecture that scales across products. |
| Adobe Spectrum | 11 grays per theme, each with a defined role. Major second type scale (1.125x). Platform-aware sizing (desktop vs. mobile as separate scales). Semantic token naming with 3-part structure. |

**Tier 2 — Professional Competence (selective adoption)**

| Platform | Core Lesson |
|---|---|
| FCP Euro | Best-in-class enthusiast auto parts UI. Manufacturer logos as trust anchors. Lifetime guarantee as persistent visual element. Badge system with clear hierarchy (OE > OEM > Aftermarket). Moderate density, well-managed. |
| Grainger | Corporate-professional industrial catalog. Dual navigation (search + browse). Content marketing integration. Weakness: CTA color = brand color, reducing functional clarity. |
| DigiKey | 17.6M products with parametric search. Color is purely informational. Manufacturer logos constrained to 155x30px — remarkable sizing discipline. Authorized distribution messaging counters counterfeit anxiety. |
| Atlassian | Token-based color with emphasis levels (subtlest to boldest). 8px spacing base. Three body font weights with strict usage rules. |

**Tier 3 — Cautionary (patterns to study, not replicate)**

| Platform | Lesson |
|---|---|
| RockAuto | Proves "ugly-trustworthy" works for power users. Not a replicable model, but the underlying insight matters: promotional noise destroys trust in this market. |
| Pelican Parts | Technical depth creates trust. Warm backgrounds differentiate. But dated execution undermines credibility for new visitors. |
| Toyota OEM | Corporate restraint is correct, but sterile execution crosses into "government form" territory. Vehicle selector UI demonstrates how formality can become friction. |
| Car Builder Solutions | Shopify-standard execution with dark theme. Review-wall trust model. Demonstrates how template reliance is visible to informed buyers. |

### 1.2 Reusable Patterns That Scale

These patterns appear across all high-trust platforms and should be adopted:

1. **Typography-first hierarchy.** The best systems (McMaster, Carbon) use font size and weight as primary organizational tools, with color as secondary reinforcement.
2. **8px spatial grid.** McMaster, Carbon, Atlassian, and Spectrum all converge on 8px as the base spatial unit. This is not optional.
3. **Role-based color with no decorative usage.** Every platform that achieves "authority" feel uses color to carry meaning, never for decoration.
4. **Two-weight discipline.** Regular + Semibold (or Medium) handles 90% of cases. Bold is reserved for price display and critical status indicators.
5. **Progressive density disclosure.** Category-level pages are spacious; product-detail pages are dense. The system breathes differently at different depths.
6. **Manufacturer identity as trust proxy.** FCP Euro and DigiKey both use brand logos as trust signals. The host platform stays visually neutral; the product brands carry credibility.
7. **Persistent trust strip.** FCP Euro, Grainger, and DigiKey all maintain a persistent trust bar (shipping, returns, warranty). This is industry standard for a reason.

### 1.3 Patterns That Must Be Rejected

| Pattern | Why It Fails |
|---|---|
| Hero carousels | Zero information density. McMaster proves they are unnecessary. Data shows carousel interaction rates below 1% after slide 1. |
| Promotional color gradients | Signal consumer retail, not industrial authority. No tier-1 reference platform uses gradients. |
| Badge proliferation (3+ per card) | FCP Euro's weakness. More than one badge per product card creates visual noise and dilutes the hierarchy of the badge system itself. |
| Dark theme for product catalogs | Car Builder Solutions demonstrates this: dark backgrounds reduce image contrast for product photography and increase reading fatigue for specification text. |
| Animated transitions between states | Motion attracts attention, which is a cost. In a catalog with hundreds of items, micro-animations compete with the user's scanning behavior. |
| Rounded corners > 8px | Excessive rounding signals "friendly consumer app." Industrial authority requires geometric precision. 4-6px radius maximum. |
| Shadow depth > 1 level | Multiple shadow depths create ambiguity about spatial hierarchy. One shadow value, applied consistently. |
| Inline star ratings on product cards | Star ratings are meaningful for consumer products with subjective quality. OEM parts are either correct or incorrect. Fit/no-fit replaces like/dislike. |

---

## 2. Visual Positioning Doctrine

### 2.1 What the UI Must Immediately Communicate

**Mechanical precision.** The interface itself must feel engineered, not designed. Spacing must be mathematically consistent. Alignment must be absolute. The visual system should suggest that the same rigor applied to the interface was applied to the parts catalog.

**Authority and scale.** The platform must feel like it contains thousands of products without showing them all at once. This is communicated through structured navigation, consistent component patterns, and confident whitespace — not through "Browse 600+ products!" messaging.

**Reliability under complexity.** When a user is on a product page with 15 specification rows, 3 compatibility notes, and a pricing block, the interface must remain calm. No element should compete for attention. The hierarchy must be self-evident without scanning.

### 2.2 What It Must Never Communicate

- **Template usage.** No Shopify defaults. No Bootstrap 5 card shadows. No generic icon libraries used without curation. If an informed buyer can identify the template, the platform has failed.
- **Cheapness.** No gradient buttons. No 2px border radius on oversized elements. No uppercase body text. No excessive exclamation marks in UI copy.
- **Over-decoration.** No decorative dividers. No ornamental icons. No background patterns. No floating shapes. If an element does not carry information or aid navigation, it does not exist.
- **Lifestyle branding.** No mood photography. No aspirational copy. No "experience the difference" language. The parts are mechanical objects; the UI should reflect their nature.

### 2.3 Emotional Calibration

| Axis | Left (preferred) | Right (avoided) |
|---|---|---|
| Tone | Calm | Exciting |
| Information | Clarity | Personality |
| Aesthetics | Restraint | Expressiveness |
| Density | Confident | Sparse |
| Typography | Neutral | Characterful |
| Color | Functional | Decorative |
| Layout | Predictable | Surprising |
| Motion | Static | Animated |

This system targets the intersection of **McMaster-Carr's information purity** and **FCP Euro's product merchandising** — technical precision with enough visual warmth to support product photography, but never enough to suggest lifestyle retail.

---

## 3. Typography System

### 3.1 Font Selection

**Primary typeface: Inter**

Rationale:
- Variable font with optical sizing (opsz 14–32), enabling automatic micro-adjustments for text vs. display contexts
- 147 language scripts including Latin, Cyrillic, Greek, Arabic — essential for UAE/GCC audience
- Tabular number feature (`tnum`) critical for price columns and specification tables
- Tall x-height optimized for screen legibility at 13-16px body sizes
- Disambiguation features (`ss02`, `cv08`, `cv05`, slashed zero) prevent misreading of OEM part numbers (O vs 0, I vs l vs 1)
- Used by Figma, GitHub, Linear, and Vercel's own documentation — proven at scale in technical interfaces
- 100-900 weight range with three master designs (100, 400, 900) ensuring quality at every interpolation point
- Open Font License — no licensing constraints

**Monospace companion: Inter's tabular features (preferred) or JetBrains Mono (fallback)**

Used exclusively for: OEM part numbers, SKU codes, engine codes, specification values.

**Font stack:**
```
--font-sans: 'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', ui-monospace, monospace;
```

**Rejected alternatives and reasons:**

| Font | Rejection Reason |
|---|---|
| Geist Sans | Vercel-ecosystem association. Fewer language scripts than Inter. No optical sizing axis. |
| IBM Plex Sans | Strong IBM brand association. Mathematical scale is rigid. Three-font-family system (Sans + Serif + Mono) is over-specified for this use case. |
| Roboto | Google Material association. Humanist proportions are too warm for industrial context. |
| Helvetica Neue | No variable font support. No tabular numbers feature. License cost. |
| System fonts only | Inconsistent rendering across devices undermines visual precision. Unacceptable for a system that claims mechanical rigor. |

### 3.2 Type Scale

The scale uses a **1.200 ratio (minor third)** — the same mathematical discipline used by IBM Carbon, adapted for e-commerce density requirements.

Base size: 15px (desktop) / 16px (mobile)

| Token | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 11px / 1.45 | 12px / 1.45 | 400-500 | Microcopy, timestamps, tertiary labels |
| `text-sm` | 13px / 1.5 | 14px / 1.5 | 400-500 | Secondary text, filter labels, metadata |
| `text-base` | 15px / 1.6 | 16px / 1.6 | 400 | Body text, descriptions, form inputs |
| `text-md` | 18px / 1.45 | 18px / 1.45 | 500-600 | Subheadings, card titles, section labels |
| `text-lg` | 21px / 1.35 | 21px / 1.35 | 600 | Page section headings |
| `text-xl` | 26px / 1.3 | 24px / 1.3 | 600 | Page titles |
| `text-2xl` | 31px / 1.2 | 28px / 1.25 | 600 | Hero headings, primary page titles |
| `text-3xl` | 37px / 1.15 | 32px / 1.2 | 600-700 | Landing page titles only |

**Line-height rationale:** Larger text gets tighter line-height (1.15-1.3) because heading text is read as a unit. Body text gets looser line-height (1.5-1.6) because paragraphs require inter-line scanning.

### 3.3 Weight Discipline

The system uses exactly three weights:

| Weight | Token | Permitted Uses | Forbidden Uses |
|---|---|---|---|
| Regular (400) | `font-normal` | Body text, descriptions, form inputs, table cells, secondary labels | Never for headings, CTAs, or prices |
| Medium (500) | `font-medium` | Navigation items, card titles, form labels, breadcrumbs, tertiary headings | Never for body paragraphs, never for primary headings |
| Semibold (600) | `font-semibold` | Page headings, section titles, prices, primary CTAs, critical status text | Never for body text, never for more than 2 consecutive lines |

**Bold (700) is restricted.** It is permitted only for:
- Primary page hero headings at `text-2xl` or larger
- Price display when the price is the primary focus of a component (e.g., PDP price block)
- "Out of Stock" status when it is the only status indicator visible

Bold at body text sizes creates visual aggression that undermines calm.

### 3.4 OpenType Feature Requirements

```css
font-feature-settings:
  'liga' 1,    /* Standard ligatures */
  'calt' 1,    /* Contextual alternates */
  'tnum' 1,    /* Tabular numbers — critical for price alignment */
  'zero' 1,    /* Slashed zero — prevents O/0 confusion in part numbers */
  'ss02' 1;    /* Disambiguation set — I/l/1 differentiation */
```

These features are non-negotiable for a platform that displays OEM part numbers. The difference between part number `1OI0` and `lO10` is a wrong-part shipment.

### 3.5 Typography Failure Cases

| Failure | Why It Fails | Prevention |
|---|---|---|
| Bold body text | Creates visual shouting. Undermines calm. | Lint rule: no `font-bold` below `text-md` |
| ALL CAPS body text | Reduces legibility by 10-15%. Feels hostile. | Uppercase permitted only for badges, overline labels, and button text at `text-xs` / `text-sm` |
| Centered body paragraphs | Ragged left edges destroy readability after 2 lines | Center alignment only for hero headings and single-line display text |
| More than 3 font sizes on one screen | Creates visual noise. Signals lack of system. | Maximum 4 scale levels per viewport (e.g., heading + subhead + body + micro) |
| Inconsistent number formatting | Prices misalign in grids. Specification columns wobble. | Tabular numbers (`tnum`) mandatory for all numeric content |
| Product names longer than 2 lines | Card layouts break. Visual rhythm destroyed. | `line-clamp-2` on all card-level product names. Full name on PDP only. |
| Italic for emphasis in UI | Inter's italic is a true italic with different letter shapes. Emphasis should use weight, not style. | Italic permitted only for: placeholder text, technical term definitions, legal/disclaimer copy |

### 3.6 Letter-Spacing Rules

| Context | Letter-spacing | Rationale |
|---|---|---|
| Uppercase labels and badges | +0.04em to +0.06em | Compensates for reduced inter-character whitespace in caps |
| Heading text at `text-xl`+ | -0.01em to -0.02em | Tightens large text for visual cohesion |
| Body text | 0 (normal) | Inter is designed for zero tracking at body sizes |
| Monospace/part numbers | 0 (normal) | Tabular alignment handles spacing |
| Price display | 0 (normal) | Tabular numbers handle alignment |

---

## 4. Color System

### 4.1 Design Principles

This color system follows four laws:

1. **Color must carry meaning.** If a color does not indicate status, hierarchy, or function, it does not belong.
2. **Neutral foundation, functional accents.** The interface is 90%+ neutral tones. Color appears sparingly and deliberately.
3. **Contrast first, brand second.** WCAG AA (4.5:1 for text) is the minimum. AAA (7:1) is the target for body text.
4. **One primary action color.** The entire system has exactly one color that means "primary interactive element." This color appears on primary buttons, active states, and links. Nothing else.

### 4.2 Neutral Foundation

The neutral palette provides the structural canvas. It is the most important palette in the system because it occupies 90% of viewport pixels.

| Token | Value | Role | Contrast vs White |
|---|---|---|---|
| `--neutral-950` | `#0C1220` | Deepest text, primary headings | 18.2:1 |
| `--neutral-900` | `#111827` | Primary body text | 16.4:1 |
| `--neutral-800` | `#1E293B` | Secondary headings, strong labels | 12.6:1 |
| `--neutral-700` | `#334155` | Tertiary text, active navigation | 8.2:1 |
| `--neutral-600` | `#475569` | Muted text, placeholders | 5.9:1 |
| `--neutral-500` | `#64748B` | Disabled text, captions | 4.3:1 |
| `--neutral-400` | `#94A3B8` | Placeholder text, decorative borders | 2.7:1 |
| `--neutral-300` | `#CBD5E1` | Dividers, inactive borders | 1.7:1 |
| `--neutral-200` | `#E2E8F0` | Card borders, input borders | 1.4:1 |
| `--neutral-100` | `#F1F5F9` | Alternate section backgrounds, filter panels | 1.1:1 |
| `--neutral-50` | `#F8FAFC` | Subtle surface differentiation | 1.05:1 |
| `--neutral-0` | `#FFFFFF` | Primary surface | 1:1 |

**Chromatic temperature:** The neutral scale carries a cool-slate undertone (blue-gray). This is intentional:
- Cool neutrals signal precision and professionalism (medical equipment, engineering tools)
- Warm neutrals signal comfort and hospitality (unacceptable for industrial context)
- Pure gray (zero saturation) feels dead on screen — slight chromatic bias prevents this

### 4.3 Functional Colors

Each functional color has exactly one semantic role. No color serves two meanings.

#### 4.3.1 Primary Action — Indigo-Blue

| Token | Value | Use |
|---|---|---|
| `--action-600` | `#4338CA` | Primary buttons, primary links, active tab indicators |
| `--action-700` | `#3730A3` | Hover state for primary action |
| `--action-800` | `#312E81` | Active/pressed state |
| `--action-100` | `#E0E7FF` | Selected state backgrounds (e.g., active filter chip) |
| `--action-50` | `#EEF2FF` | Hover backgrounds on selectable rows/cards |

**Why indigo-blue, not pure blue:** Pure blue (#0066CC or #2563EB range) is overused to the point of generic association with "link" and "button." Indigo-blue (#4338CA) provides:
- Stronger distinction from informational blue (used for notes/info callouts)
- Higher perceived authority (deeper, more serious tone)
- Better contrast ratios against white at the same perceived brightness
- No association with any specific platform or framework

**Why not red, orange, or green for primary action:**
- Red = error/danger in every mature design system. Using red for primary CTAs creates semantic collision.
- Orange = warning state. Same collision problem.
- Green = success/positive state. "Add to cart" being green works until you also need "In Stock" green — the two meanings compete.

#### 4.3.2 Status Colors

| Status | Token | Value | Exclusive Use |
|---|---|---|---|
| Success / In Stock | `--status-success-600` | `#059669` | "In Stock" indicator, successful form submission, order confirmed |
| Success background | `--status-success-50` | `#ECFDF5` | Success message background |
| Warning / Low Stock | `--status-warning-600` | `#D97706` | "Low Stock" indicator, form validation warnings, attention-needed states |
| Warning background | `--status-warning-50` | `#FFFBEB` | Warning message background |
| Error / Out of Stock | `--status-error-600` | `#DC2626` | "Out of Stock" indicator, form errors, destructive action confirmation |
| Error background | `--status-error-50` | `#FEF2F2` | Error message background |
| Sale / Price reduction | `--status-sale-600` | `#EA580C` | Sale badge, struck-through price color, price reduction indicator |

**WhatsApp — third-party brand color (special case):**

| Token | Value | Use |
|---|---|---|
| `--brand-whatsapp` | `#25D366` | WhatsApp FAB button only |
| `--brand-whatsapp-dark` | `#128C7E` | WhatsApp button hover only |

This green is never used for any other purpose. It is not a system color; it is a third-party brand constant.

#### 4.3.3 Informational Color

| Token | Value | Use |
|---|---|---|
| `--info-600` | `#0284C7` | Informational callouts, help text badges, tooltip borders |
| `--info-50` | `#F0F9FF` | Informational banner backgrounds |

### 4.4 Color Application Rules

**Rule 1: Maximum 2 chromatic colors per viewport.** At any screen position, the user should see at most 2 non-neutral colors. A product card may show a Sale badge (orange) and an "In Stock" indicator (green). Adding a third color (e.g., a blue "New" badge) violates this rule.

**Rule 2: Neutral is the default. Color is the exception.** Borders are neutral. Backgrounds are neutral. Text is neutral. Only elements that carry semantic meaning receive color.

**Rule 3: Color intensity matches importance.**
- `600` values: primary states, buttons, badges (high importance)
- `100` values: background tints, selected states (medium importance)
- `50` values: hover states, subtle indicators (low importance)

**Rule 4: No color-only communication.** Every color-coded element must also communicate its meaning through text, icon shape, or position. "In Stock" is green text reading "In stock" — not a green dot alone.

**Rule 5: Hover and active states follow mathematical steps.**
- Hover = one step darker (600 → 700)
- Active = two steps darker (600 → 800)
- Disabled = neutral-400 with 50% opacity

This matches IBM Carbon's interaction-state math and ensures predictable state transitions.

### 4.5 Color Misuse Prevention

| Misuse | Correction |
|---|---|
| Using action color for non-interactive elements | Action color is reserved for elements that respond to user input |
| Using success green for promotional "GO" messaging | Success green means a system state (in stock, confirmed), never marketing emphasis |
| Using red for brand emphasis or visual "pop" | Red means error or out-of-stock. No exceptions. |
| Coloring section headers for visual variety | Section headers are neutral-900. Color variation between sections destroys hierarchy consistency. |
| Using background color to signal section changes | Alternate surfaces use neutral-50 / neutral-100 only. No colored section backgrounds except for system banners (error, success, info). |
| Applying opacity to create color variants | Use the defined token steps. Opacity creates inconsistent contrast ratios across surfaces. |
| Using WhatsApp green for success/in-stock | WhatsApp green is a brand constant. System success green is a different value serving a different semantic role. |

---

## 5. Layout, Grid, and Rhythm Laws

### 5.1 Grid System

**Base unit: 8px.** Every spatial value in the system is a multiple of 8. No exceptions.

This aligns with McMaster-Carr, IBM Carbon, Atlassian, and Adobe Spectrum. The convergence of four independent world-class design systems on 8px is not coincidence — it maps cleanly to common screen densities, halves/doubles cleanly, and produces visually harmonious relationships.

**Column system:**

| Breakpoint | Token | Width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | `--bp-sm` | 0-639px | 4 | 16px | 16px |
| Tablet | `--bp-md` | 640-1023px | 8 | 24px | 24px |
| Desktop | `--bp-lg` | 1024-1279px | 12 | 24px | 32px |
| Wide | `--bp-xl` | 1280-1535px | 12 | 32px | Auto (centered) |
| Ultrawide | `--bp-2xl` | 1536px+ | 12 | 32px | Auto (centered) |

**Maximum content width: 1280px.**

Rationale:
- McMaster-Carr uses ~1200-1400px. FCP Euro uses ~1280px. Carbon's max breakpoint is 1584px but content rarely fills it.
- 1280px on a 1920px monitor provides ~320px of margin on each side — enough peripheral calm to prevent the interface from feeling like a spreadsheet.
- At 15px body text with 1.6 line-height, a 1280px container with proper column splits ensures body text never exceeds ~80 characters per line.

**Narrow content width: 720px.** For long-form text pages (About, FAQ, Returns, Privacy). Human reading cognition degrades above ~75 characters per line. At 15px, 720px produces approximately 65-70 characters per line.

### 5.2 Spacing Scale

All spacing values are multiples of the 8px base unit:

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Dense inline spacing (icon-to-text gap inside buttons) |
| `--space-2` | 8px | Tight component internal padding, gap between related items |
| `--space-3` | 12px | Standard inline padding, small card padding |
| `--space-4` | 16px | Default component padding, form field spacing |
| `--space-5` | 20px | Card internal padding on mobile |
| `--space-6` | 24px | Card internal padding on desktop, gap between cards in grid |
| `--space-8` | 32px | Section internal padding (small sections) |
| `--space-10` | 40px | Section internal padding (standard) |
| `--space-12` | 48px | Section gap on mobile |
| `--space-16` | 64px | Section gap on desktop |
| `--space-20` | 80px | Major page section separation |
| `--space-24` | 96px | Hero section vertical padding |

**The 4px exception:** `--space-1` (4px) is the only non-8px value. It exists for micro-spacing inside dense components. It is not permitted for layout-level spacing.

### 5.3 Vertical Rhythm

**Section separation follows a two-tier model:**

1. **Within-section spacing:** Components inside a section are separated by `--space-4` to `--space-8` (16-32px). This creates visual grouping.
2. **Between-section spacing:** Sections are separated by `--space-16` (64px) on desktop and `--space-12` (48px) on mobile. This creates clear content boundaries.

**Surface alternation for section differentiation:** Consecutive sections alternate between `--neutral-0` (white) and `--neutral-50` (off-white) backgrounds. This is the only permitted method of visual section separation. No colored backgrounds. No decorative dividers. No gradient transitions.

### 5.4 Alignment Absolutes

**What must always align:**

| Element | Alignment Rule |
|---|---|
| Product card edges in a grid | Left edges form a perfect vertical line. No staggered or masonry layouts. |
| Price text across cards in the same row | Prices must appear at the same vertical position across horizontally-adjacent cards. Requires consistent card height management. |
| Section headings | Left-aligned to the container edge. Never centered (except hero). Never indented. |
| Table columns | Right-aligned for numeric data. Left-aligned for text data. |
| Form labels and inputs | Labels above inputs (stacked). Never inline for multi-field forms. |
| Navigation items | Baseline-aligned within horizontal navigation bars. |
| Badge position on product cards | Top-left corner. Consistent X/Y offset. Never top-right, never bottom. |

**What must never float:**

| Element | Constraint |
|---|---|
| CTAs in cards | Pinned to card bottom via flexbox. Never floating at varying heights across a row. |
| Prices in cards | Must share vertical alignment across grid siblings. |
| Product images | Fixed aspect ratio (4:3 or 1:1). Never variable-height images that break grid alignment. |
| Sidebar filters | Aligned to the top of the product grid. Scroll independently only via `position: sticky`. |

### 5.5 Product Image Aspect Ratios

| Context | Ratio | Rationale |
|---|---|---|
| Product card thumbnail | 4:3 | Landscape orientation accommodates engine parts that are typically wider than tall. Provides consistent card height. |
| PDP primary image | 1:1 | Square format provides maximum image area. Standard for e-commerce detail views. |
| Category/vehicle tile | 16:9 | Landscape banner proportion for navigation tiles. |
| Trust/brand logo | Constrained to max 160px x 32px | Prevents logo size competition. Following DigiKey's 155x30px constraint model. |

All product images must use `object-fit: contain` with a neutral background (neutral-50 or white). Never crop. Never stretch. Parts have irregular shapes; forcing them into a fill creates visual dishonesty.

---

## 6. Component Visual System

### 6.1 Design Principles for Components

1. **Each component has exactly one visual purpose.** A badge communicates status. A button triggers action. A card contains a sellable entity. No component serves mixed roles.
2. **Component variants are additive, not multiplicative.** A button has 3 variants (primary, secondary, ghost). Not 9 (3 variants x 3 sizes) unless each combination serves a distinct, documentable purpose.
3. **Visual consistency over expressive variety.** All cards look like cards. All buttons look like buttons. Consistency across 600+ product pages is worth more than novelty on any single page.

### 6.2 Buttons

Three variants. No gradients. No shadows. No icons by default (icons are optional additions).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--action-600` | `--neutral-0` (white) | none | One per viewport section. "Add to cart", primary CTA. |
| Secondary | transparent | `--neutral-800` | 1px `--neutral-300` | Supporting actions. "View details", "Clear filters". |
| Ghost | transparent | `--action-600` | none | Tertiary actions. "Show more", inline text actions. |

**Button sizing:**

| Size | Height | Padding (H) | Font | Radius | Use |
|---|---|---|---|---|---|
| Small | 32px | 12px | `text-sm` / 500 | 4px | Dense contexts: table rows, filter chips, inline actions |
| Default | 40px | 16px | `text-base` / 500 | 6px | Standard forms, card CTAs, page-level actions |
| Large | 48px | 24px | `text-base` / 600 | 6px | Hero CTAs, full-width mobile actions, checkout |

**Button states:**

| State | Change | Duration |
|---|---|---|
| Hover | Background one step darker (600 → 700) | 150ms ease |
| Active | Background two steps darker (600 → 800) | 0ms (instant) |
| Focus | 2px ring in `--action-600` with 3px offset | 0ms (instant) |
| Disabled | Opacity 0.4. Cursor not-allowed. | -- |
| Loading | Text replaced by spinner (same dimensions). No layout shift. | -- |

**Button rules:**
- Full uppercase text only at `text-sm` or smaller.
- Sentence case for all default and large buttons ("Add to cart", not "ADD TO CART" or "Add To Cart").
- Maximum label length: 3 words for primary, 4 words for secondary.
- Icon-only buttons require `aria-label` and minimum 40px touch target.

### 6.3 Cards

**Product card (PLP context):**

| Zone | Content | Styling |
|---|---|---|
| Image zone | Product photo, 4:3 ratio, `object-fit: contain`, neutral-50 bg | No border on image. Card border contains everything. |
| Badge zone | Maximum 1 badge (priority: Sale > Out of Stock > New) | Top-left, 8px inset from card edge. |
| Category overline | Category name | `text-xs`, uppercase, `--neutral-500`, letter-spacing +0.05em |
| Product name | Truncated to 2 lines | `text-sm`, `font-medium`, `--neutral-900`, `line-clamp-2` |
| Price zone | Price or "Request price" | `text-lg`, `font-semibold`, `--neutral-900` for price. `text-sm`, `--neutral-500` for request. |
| CTA zone | Button pinned to bottom | Primary "Add to cart" if purchasable. Secondary "View details" if not. |

Card specification:
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Shadow: `0 1px 3px rgba(0,0,0,0.06)` — one value only
- Hover: shadow transitions to `0 2px 8px rgba(0,0,0,0.1)` over 200ms
- Internal padding: `--space-4` (16px) below image zone

**Information card (non-product context):**

Used for: trust strip items, feature callouts, contact methods, vehicle/model selection tiles.

- Background: `--neutral-0` or `--neutral-50`
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Padding: `--space-6` (24px)
- No shadow (differentiates from product cards which are "interactive objects")
- Hover (if interactive): border transitions to `--neutral-400`

### 6.4 Badges

Badges communicate a single status. One badge per product. Maximum 2 badges visible in any single viewport quadrant.

| Badge | Background | Text | Use |
|---|---|---|---|
| Sale | `--status-sale-600` | white | Product with validated price reduction |
| Out of Stock | `--neutral-200` | `--neutral-600` | Product not currently available |
| Low Stock | `--status-warning-50` | `--status-warning-600` | 5 or fewer units |
| New | `--neutral-900` | white | Products added in the last 30 days |
| OEM | `--action-100` | `--action-600` | Genuine OEM verification marker |

Badge specification:
- Font: `text-xs`, `font-medium`, uppercase, letter-spacing +0.05em
- Padding: 4px 8px
- Radius: 4px
- No icons inside badges. Text only.

**Badge priority (when multiple apply):** Sale > Out of Stock > Low Stock > New > OEM. Only the highest-priority badge is shown.

### 6.5 Tables

Used for: specification tables on PDP, order history, comparison views.

| Element | Style |
|---|---|
| Header row | Background: `--neutral-100`. Text: `text-xs`, `font-semibold`, uppercase, `--neutral-600` |
| Body rows | Alternating `--neutral-0` / `--neutral-50`. Text: `text-sm`, `font-normal`, `--neutral-800` |
| Cell padding | 12px vertical, 16px horizontal |
| Borders | Horizontal only: 1px solid `--neutral-200`. No vertical borders. |
| Numeric cells | Right-aligned, tabular numbers enabled |
| Text cells | Left-aligned |

**Table rules:**
- No rounded corners on tables.
- No hover row highlighting unless the table is interactive (clickable rows).
- Maximum 6 columns on desktop. More than 6 requires a different pattern.
- On mobile: tables of 4+ columns become stacked key-value pairs. Never horizontal-scroll tables.

### 6.6 Filters

**Filter sidebar specification:**

| Element | Style |
|---|---|
| Container | Background: `--neutral-100`. Border-radius: 6px. Padding: `--space-5` (20px). Border: 1px solid `--neutral-200`. |
| Section label | `text-xs`, `font-semibold`, uppercase, `--neutral-600`, letter-spacing +0.05em |
| Section spacing | `--space-6` (24px) between filter sections |
| Filter option (text) | `text-sm`, `font-normal`, `--neutral-800` |
| Filter option (active) | Background: `--action-100`. Text: `--action-600`. `font-medium`. |
| Checkbox | 16px x 16px. Border: 1px `--neutral-400`. Checked: `--action-600` fill with white checkmark. |
| Count badge | `text-xs`, `--neutral-500`, inline after option text |
| Clear action | `text-xs`, `--status-sale-600`, `font-medium`. Right-aligned to section label. |

**Filter rules:**
- Maximum 6 filter sections visible without scrolling.
- Collapsible sections for sections beyond the 6th.
- "Clear all" action visible whenever any filter is active.
- Active filter count displayed in the filter header (mobile toggle).

### 6.7 Status Indicators

| Status | Visual | Text | Color |
|---|---|---|---|
| In Stock | 8px filled circle + text | "In stock" | `--status-success-600` |
| Low Stock | 8px filled circle + text | "Low stock -- X remaining" | `--status-warning-600` |
| Out of Stock | 8px filled circle + text | "Out of stock" | `--status-error-600` |
| On Request | 8px open circle (border only) + text | "Price on request" | `--neutral-500` |

Specification:
- Circle and text baseline-aligned
- 8px gap between circle and text
- Text: `text-sm`, `font-medium`
- Never use status indicators without text labels

---

## 7. Mobile Visual Discipline

### 7.1 Density Rules

**Maximum items per initial viewport (above the fold):**

| Page | Maximum Items | Rationale |
|---|---|---|
| Homepage hero | 1 primary CTA, 1 secondary CTA | Focus determines conversion. |
| Product grid | 4 products (2x2) | More than 4 makes the grid feel like a feed, not a catalog. |
| Filter panel | 4 filter sections visible | Remaining behind accordion. |
| PDP above fold | Image + name + price + primary CTA | All other content below fold by design. |
| Navigation | 5 primary categories visible | Remaining behind "All categories" link. |

**Text truncation logic:**

| Element | Mobile Rule |
|---|---|
| Product name | `line-clamp-2` |
| Category name | `line-clamp-1` |
| Product description | Hidden on card level. Visible only on PDP. |
| OEM part number | Full display — never truncate technical identifiers |
| Price | Full display — never truncate or abbreviate currency |
| Breadcrumb | Parent > Current only. |

### 7.2 Thumb Safety

**Tap target discipline:**

| Element | Minimum Size | Minimum Spacing |
|---|---|---|
| Buttons | 44px height | 8px between adjacent buttons |
| Navigation links | 44px touch area | 4px visual separation |
| Filter options | 44px touch area | 0px visual (padding creates touch area) |
| Card (as tap target) | Full card is tappable | 12px gap between cards |
| Close/dismiss buttons | 44px x 44px touch area | 8px from container edge |
| Checkbox/radio | 44px x 44px touch area | 8px between options |

**Edge avoidance:**
- No interactive elements within 16px of screen left/right edges
- Bottom sticky CTAs must respect `env(safe-area-inset-bottom)`
- Swipe-gesture-dependent interactions are forbidden

### 7.3 Visual Calm Under Scroll

**Sticky element restraint:**

| Permitted Sticky Elements | Max Height | Condition |
|---|---|---|
| Header (simplified) | 56px | Collapses from full header on scroll |
| Bottom CTA bar (PDP only) | 64px (including safe area) | Only when "Add to cart" scrolls out of view |
| Filter toggle (PLP only) | 44px | Only when scrolled past organic filter entry point |

**Maximum combined sticky height: 120px.** Preserves 75%+ of viewport for scrollable content on a 640px-tall screen.

**Forbidden sticky elements:** Trust strip, search bar, "Back to top" buttons, persistent cookie/consent banners.

**Motion minimization:**
- No parallax scrolling
- No entrance animations on scroll (fade-in, slide-up)
- No loading skeleton animations that loop indefinitely
- Permitted motion: button state transitions (150ms), card hover shadow (200ms), modal open/close (200ms ease-out)
- Maximum individual animation duration: 300ms

### 7.4 Mobile Component Adaptations

| Component | Desktop | Mobile Adaptation |
|---|---|---|
| Product grid | 3-4 columns | 2 columns. Card padding reduces to `--space-3`. |
| Filter sidebar | Persistent left column | Overlay panel, full width, z-index above content. |
| Product card CTA | Text button | Can reduce to icon-only cart button (44px minimum). |
| Specification table | Horizontal columns | Stacked key-value pairs. |
| Breadcrumb | Full path | Parent > Current only. |
| Navigation | Horizontal category bar | Hamburger with category tree. Slide-in from left, 200ms. |
| Trust strip | 4-item horizontal bar | 2x2 grid or horizontal scroll (no auto-scroll). |
| Footer | 4-column grid | Single column accordion (collapsed by default). |

---

## 8. Anti-Pattern Registry

### Critical (must never ship)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| C-01 | More than 1 badge per product card | Dilutes status hierarchy. |
| C-02 | Color-only communication (no text/icon pairing) | Accessibility failure for 8% of male users with color vision deficiency. |
| C-03 | Price displayed as "0.00" or "0 AED" | Signals data error. Destroys trust. Show "Price on request" instead. |
| C-04 | Bold weight on body text paragraphs | Visual aggression. Undermines calm authority. |
| C-05 | Interactive element below 44px touch target on mobile | WCAG 2.5.8 failure. Causes mis-taps. |
| C-06 | More than 120px of combined sticky elements on mobile | Consumes >25% of viewport. Content claustrophobia. |
| C-07 | Sale badge on product with no genuine price reduction | `sale_price` must be > 0 AND < `regular_price` AND `regular_price` > 0. Anything else is visual fraud. |

### Major (resolve within sprint)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| M-01 | More than 3 font sizes in a single viewport | Visual noise. Signals template origin. |
| M-02 | Centered body text beyond 1 line | Ragged left edges destroy readability. |
| M-03 | Inconsistent card heights in a product grid row | Breaks alignment. Creates visual wobble. |
| M-04 | Shadow with more than 1 definition (multi-layered) | Ambiguous depth hierarchy. |
| M-05 | Using system success-green for WhatsApp buttons | Semantic collision between system status and brand identity. |
| M-06 | Inline star ratings on automotive parts | OEM parts are correct-fit or wrong-fit, not subjectively rated. |
| M-07 | Auto-playing carousels | <1% engagement after slide 1. Motion competes with scanning. |
| M-08 | Decorative dividers | Information should be separated by space, not decoration. |

### Minor (track for refinement)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| m-01 | Using border-radius > 6px on cards/buttons | Exceeds industrial precision tolerance. |
| m-02 | Title Case on buttons ("Add To Cart") | Sentence case is correct. Title case signals template default. |
| m-03 | Generic placeholder images for products | Low-effort appearance destroys product credibility. |
| m-04 | Footer with more than 4 columns on desktop | Column proliferation signals content governance failure. |
| m-05 | Newsletter popup on first visit | Zero precedent in tier-1 industrial platforms. |
| m-06 | Opacity for disabled states below 0.4 | Text becomes unreadable. |

---

## Appendix A: Token Reference

```
/* Surfaces */
--surface-primary:     var(--neutral-0);
--surface-secondary:   var(--neutral-50);
--surface-tertiary:    var(--neutral-100);
--surface-card:        var(--neutral-0);
--surface-overlay:     rgba(12, 18, 32, 0.5);

/* Text */
--text-primary:        var(--neutral-900);
--text-secondary:      var(--neutral-600);
--text-tertiary:       var(--neutral-500);
--text-inverse:        var(--neutral-0);
--text-disabled:       var(--neutral-400);

/* Borders */
--border-default:      var(--neutral-200);
--border-strong:       var(--neutral-400);
--border-focus:        var(--action-600);
--border-error:        var(--status-error-600);

/* Interactive */
--interactive-primary:        var(--action-600);
--interactive-primary-hover:  var(--action-700);
--interactive-primary-active: var(--action-800);

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0,0,0,0.04);
--shadow-md:  0 1px 3px rgba(0,0,0,0.06);
--shadow-lg:  0 2px 8px rgba(0,0,0,0.1);

/* Spacing */
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 
```


## License: unknown
https://github.com/tomhendra/tomhendra.dev/blob/b3be6f584522afffc665dd33f41ecbc07a98671b/app/styles/shared/sizes.css

```
File creation is disabled. Here is the complete specification:

---

# UI Visual System Specification v3.0

**Classification:** Master UI Specification — Greenfield Design  
**Platform:** High-trust automotive / industrial e-commerce  
**Horizon:** 2025–2027  
**Status:** Normative  
**Last revised:** 2026-02-10  

---

## Executive Summary

This document defines the complete visual system for a precision-class automotive parts e-commerce platform. It is designed from first principles, anchored to zero legacy decisions, and informed by deep analysis of the highest-performing visual systems in industrial e-commerce (McMaster-Carr, DigiKey, FCP Euro), enterprise design systems (IBM Carbon, Adobe Spectrum, Atlassian), and OEM automotive catalogs (Toyota Parts, Grainger).

The system is built on three invariants:

1. **Restraint over expression.** Every visual element must earn its presence. No decorative color, no ornamental typography, no gratuitous motion.
2. **Information density without chaos.** The platform must present thousands of technical products with absolute clarity. Visual calm under data load is the primary design constraint.
3. **Authority through precision.** Trust is communicated through spatial consistency, typographic discipline, and functional color — never through promotional language or trend-following aesthetics.

This is not a brand guideline. It is a structural specification for an interface that must remain credible under audit in five years.

---

## 1. Visual Intelligence Summary

### 1.1 Research Synthesis

Analysis of 13 platforms across automotive parts, industrial catalogs, and enterprise design systems reveals three tiers of visual maturity:

**Tier 1 — Structural Excellence (reference-grade)**

| Platform | Core Lesson |
|---|---|
| McMaster-Carr | Typography IS the entire design system. Two font weights, one accent color, zero promotional elements. Visual calm under 85,000+ SKU density. 8px spacing grid with mathematical precision. The gold standard for information-dense commerce. |
| IBM Carbon | Role-based color with interaction-state math (hover = half-step, active = two steps). Productive vs. Expressive type sets. 2x grid with 16-column system at large breakpoints. Token architecture that scales across products. |
| Adobe Spectrum | 11 grays per theme, each with a defined role. Major second type scale (1.125x). Platform-aware sizing (desktop vs. mobile as separate scales). Semantic token naming with 3-part structure. |

**Tier 2 — Professional Competence (selective adoption)**

| Platform | Core Lesson |
|---|---|
| FCP Euro | Best-in-class enthusiast auto parts UI. Manufacturer logos as trust anchors. Lifetime guarantee as persistent visual element. Badge system with clear hierarchy (OE > OEM > Aftermarket). Moderate density, well-managed. |
| Grainger | Corporate-professional industrial catalog. Dual navigation (search + browse). Content marketing integration. Weakness: CTA color = brand color, reducing functional clarity. |
| DigiKey | 17.6M products with parametric search. Color is purely informational. Manufacturer logos constrained to 155x30px — remarkable sizing discipline. Authorized distribution messaging counters counterfeit anxiety. |
| Atlassian | Token-based color with emphasis levels (subtlest to boldest). 8px spacing base. Three body font weights with strict usage rules. |

**Tier 3 — Cautionary (patterns to study, not replicate)**

| Platform | Lesson |
|---|---|
| RockAuto | Proves "ugly-trustworthy" works for power users. Not a replicable model, but the underlying insight matters: promotional noise destroys trust in this market. |
| Pelican Parts | Technical depth creates trust. Warm backgrounds differentiate. But dated execution undermines credibility for new visitors. |
| Toyota OEM | Corporate restraint is correct, but sterile execution crosses into "government form" territory. Vehicle selector UI demonstrates how formality can become friction. |
| Car Builder Solutions | Shopify-standard execution with dark theme. Review-wall trust model. Demonstrates how template reliance is visible to informed buyers. |

### 1.2 Reusable Patterns That Scale

These patterns appear across all high-trust platforms and should be adopted:

1. **Typography-first hierarchy.** The best systems (McMaster, Carbon) use font size and weight as primary organizational tools, with color as secondary reinforcement.
2. **8px spatial grid.** McMaster, Carbon, Atlassian, and Spectrum all converge on 8px as the base spatial unit. This is not optional.
3. **Role-based color with no decorative usage.** Every platform that achieves "authority" feel uses color to carry meaning, never for decoration.
4. **Two-weight discipline.** Regular + Semibold (or Medium) handles 90% of cases. Bold is reserved for price display and critical status indicators.
5. **Progressive density disclosure.** Category-level pages are spacious; product-detail pages are dense. The system breathes differently at different depths.
6. **Manufacturer identity as trust proxy.** FCP Euro and DigiKey both use brand logos as trust signals. The host platform stays visually neutral; the product brands carry credibility.
7. **Persistent trust strip.** FCP Euro, Grainger, and DigiKey all maintain a persistent trust bar (shipping, returns, warranty). This is industry standard for a reason.

### 1.3 Patterns That Must Be Rejected

| Pattern | Why It Fails |
|---|---|
| Hero carousels | Zero information density. McMaster proves they are unnecessary. Data shows carousel interaction rates below 1% after slide 1. |
| Promotional color gradients | Signal consumer retail, not industrial authority. No tier-1 reference platform uses gradients. |
| Badge proliferation (3+ per card) | FCP Euro's weakness. More than one badge per product card creates visual noise and dilutes the hierarchy of the badge system itself. |
| Dark theme for product catalogs | Car Builder Solutions demonstrates this: dark backgrounds reduce image contrast for product photography and increase reading fatigue for specification text. |
| Animated transitions between states | Motion attracts attention, which is a cost. In a catalog with hundreds of items, micro-animations compete with the user's scanning behavior. |
| Rounded corners > 8px | Excessive rounding signals "friendly consumer app." Industrial authority requires geometric precision. 4-6px radius maximum. |
| Shadow depth > 1 level | Multiple shadow depths create ambiguity about spatial hierarchy. One shadow value, applied consistently. |
| Inline star ratings on product cards | Star ratings are meaningful for consumer products with subjective quality. OEM parts are either correct or incorrect. Fit/no-fit replaces like/dislike. |

---

## 2. Visual Positioning Doctrine

### 2.1 What the UI Must Immediately Communicate

**Mechanical precision.** The interface itself must feel engineered, not designed. Spacing must be mathematically consistent. Alignment must be absolute. The visual system should suggest that the same rigor applied to the interface was applied to the parts catalog.

**Authority and scale.** The platform must feel like it contains thousands of products without showing them all at once. This is communicated through structured navigation, consistent component patterns, and confident whitespace — not through "Browse 600+ products!" messaging.

**Reliability under complexity.** When a user is on a product page with 15 specification rows, 3 compatibility notes, and a pricing block, the interface must remain calm. No element should compete for attention. The hierarchy must be self-evident without scanning.

### 2.2 What It Must Never Communicate

- **Template usage.** No Shopify defaults. No Bootstrap 5 card shadows. No generic icon libraries used without curation. If an informed buyer can identify the template, the platform has failed.
- **Cheapness.** No gradient buttons. No 2px border radius on oversized elements. No uppercase body text. No excessive exclamation marks in UI copy.
- **Over-decoration.** No decorative dividers. No ornamental icons. No background patterns. No floating shapes. If an element does not carry information or aid navigation, it does not exist.
- **Lifestyle branding.** No mood photography. No aspirational copy. No "experience the difference" language. The parts are mechanical objects; the UI should reflect their nature.

### 2.3 Emotional Calibration

| Axis | Left (preferred) | Right (avoided) |
|---|---|---|
| Tone | Calm | Exciting |
| Information | Clarity | Personality |
| Aesthetics | Restraint | Expressiveness |
| Density | Confident | Sparse |
| Typography | Neutral | Characterful |
| Color | Functional | Decorative |
| Layout | Predictable | Surprising |
| Motion | Static | Animated |

This system targets the intersection of **McMaster-Carr's information purity** and **FCP Euro's product merchandising** — technical precision with enough visual warmth to support product photography, but never enough to suggest lifestyle retail.

---

## 3. Typography System

### 3.1 Font Selection

**Primary typeface: Inter**

Rationale:
- Variable font with optical sizing (opsz 14–32), enabling automatic micro-adjustments for text vs. display contexts
- 147 language scripts including Latin, Cyrillic, Greek, Arabic — essential for UAE/GCC audience
- Tabular number feature (`tnum`) critical for price columns and specification tables
- Tall x-height optimized for screen legibility at 13-16px body sizes
- Disambiguation features (`ss02`, `cv08`, `cv05`, slashed zero) prevent misreading of OEM part numbers (O vs 0, I vs l vs 1)
- Used by Figma, GitHub, Linear, and Vercel's own documentation — proven at scale in technical interfaces
- 100-900 weight range with three master designs (100, 400, 900) ensuring quality at every interpolation point
- Open Font License — no licensing constraints

**Monospace companion: Inter's tabular features (preferred) or JetBrains Mono (fallback)**

Used exclusively for: OEM part numbers, SKU codes, engine codes, specification values.

**Font stack:**
```
--font-sans: 'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', ui-monospace, monospace;
```

**Rejected alternatives and reasons:**

| Font | Rejection Reason |
|---|---|
| Geist Sans | Vercel-ecosystem association. Fewer language scripts than Inter. No optical sizing axis. |
| IBM Plex Sans | Strong IBM brand association. Mathematical scale is rigid. Three-font-family system (Sans + Serif + Mono) is over-specified for this use case. |
| Roboto | Google Material association. Humanist proportions are too warm for industrial context. |
| Helvetica Neue | No variable font support. No tabular numbers feature. License cost. |
| System fonts only | Inconsistent rendering across devices undermines visual precision. Unacceptable for a system that claims mechanical rigor. |

### 3.2 Type Scale

The scale uses a **1.200 ratio (minor third)** — the same mathematical discipline used by IBM Carbon, adapted for e-commerce density requirements.

Base size: 15px (desktop) / 16px (mobile)

| Token | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 11px / 1.45 | 12px / 1.45 | 400-500 | Microcopy, timestamps, tertiary labels |
| `text-sm` | 13px / 1.5 | 14px / 1.5 | 400-500 | Secondary text, filter labels, metadata |
| `text-base` | 15px / 1.6 | 16px / 1.6 | 400 | Body text, descriptions, form inputs |
| `text-md` | 18px / 1.45 | 18px / 1.45 | 500-600 | Subheadings, card titles, section labels |
| `text-lg` | 21px / 1.35 | 21px / 1.35 | 600 | Page section headings |
| `text-xl` | 26px / 1.3 | 24px / 1.3 | 600 | Page titles |
| `text-2xl` | 31px / 1.2 | 28px / 1.25 | 600 | Hero headings, primary page titles |
| `text-3xl` | 37px / 1.15 | 32px / 1.2 | 600-700 | Landing page titles only |

**Line-height rationale:** Larger text gets tighter line-height (1.15-1.3) because heading text is read as a unit. Body text gets looser line-height (1.5-1.6) because paragraphs require inter-line scanning.

### 3.3 Weight Discipline

The system uses exactly three weights:

| Weight | Token | Permitted Uses | Forbidden Uses |
|---|---|---|---|
| Regular (400) | `font-normal` | Body text, descriptions, form inputs, table cells, secondary labels | Never for headings, CTAs, or prices |
| Medium (500) | `font-medium` | Navigation items, card titles, form labels, breadcrumbs, tertiary headings | Never for body paragraphs, never for primary headings |
| Semibold (600) | `font-semibold` | Page headings, section titles, prices, primary CTAs, critical status text | Never for body text, never for more than 2 consecutive lines |

**Bold (700) is restricted.** It is permitted only for:
- Primary page hero headings at `text-2xl` or larger
- Price display when the price is the primary focus of a component (e.g., PDP price block)
- "Out of Stock" status when it is the only status indicator visible

Bold at body text sizes creates visual aggression that undermines calm.

### 3.4 OpenType Feature Requirements

```css
font-feature-settings:
  'liga' 1,    /* Standard ligatures */
  'calt' 1,    /* Contextual alternates */
  'tnum' 1,    /* Tabular numbers — critical for price alignment */
  'zero' 1,    /* Slashed zero — prevents O/0 confusion in part numbers */
  'ss02' 1;    /* Disambiguation set — I/l/1 differentiation */
```

These features are non-negotiable for a platform that displays OEM part numbers. The difference between part number `1OI0` and `lO10` is a wrong-part shipment.

### 3.5 Typography Failure Cases

| Failure | Why It Fails | Prevention |
|---|---|---|
| Bold body text | Creates visual shouting. Undermines calm. | Lint rule: no `font-bold` below `text-md` |
| ALL CAPS body text | Reduces legibility by 10-15%. Feels hostile. | Uppercase permitted only for badges, overline labels, and button text at `text-xs` / `text-sm` |
| Centered body paragraphs | Ragged left edges destroy readability after 2 lines | Center alignment only for hero headings and single-line display text |
| More than 3 font sizes on one screen | Creates visual noise. Signals lack of system. | Maximum 4 scale levels per viewport (e.g., heading + subhead + body + micro) |
| Inconsistent number formatting | Prices misalign in grids. Specification columns wobble. | Tabular numbers (`tnum`) mandatory for all numeric content |
| Product names longer than 2 lines | Card layouts break. Visual rhythm destroyed. | `line-clamp-2` on all card-level product names. Full name on PDP only. |
| Italic for emphasis in UI | Inter's italic is a true italic with different letter shapes. Emphasis should use weight, not style. | Italic permitted only for: placeholder text, technical term definitions, legal/disclaimer copy |

### 3.6 Letter-Spacing Rules

| Context | Letter-spacing | Rationale |
|---|---|---|
| Uppercase labels and badges | +0.04em to +0.06em | Compensates for reduced inter-character whitespace in caps |
| Heading text at `text-xl`+ | -0.01em to -0.02em | Tightens large text for visual cohesion |
| Body text | 0 (normal) | Inter is designed for zero tracking at body sizes |
| Monospace/part numbers | 0 (normal) | Tabular alignment handles spacing |
| Price display | 0 (normal) | Tabular numbers handle alignment |

---

## 4. Color System

### 4.1 Design Principles

This color system follows four laws:

1. **Color must carry meaning.** If a color does not indicate status, hierarchy, or function, it does not belong.
2. **Neutral foundation, functional accents.** The interface is 90%+ neutral tones. Color appears sparingly and deliberately.
3. **Contrast first, brand second.** WCAG AA (4.5:1 for text) is the minimum. AAA (7:1) is the target for body text.
4. **One primary action color.** The entire system has exactly one color that means "primary interactive element." This color appears on primary buttons, active states, and links. Nothing else.

### 4.2 Neutral Foundation

The neutral palette provides the structural canvas. It is the most important palette in the system because it occupies 90% of viewport pixels.

| Token | Value | Role | Contrast vs White |
|---|---|---|---|
| `--neutral-950` | `#0C1220` | Deepest text, primary headings | 18.2:1 |
| `--neutral-900` | `#111827` | Primary body text | 16.4:1 |
| `--neutral-800` | `#1E293B` | Secondary headings, strong labels | 12.6:1 |
| `--neutral-700` | `#334155` | Tertiary text, active navigation | 8.2:1 |
| `--neutral-600` | `#475569` | Muted text, placeholders | 5.9:1 |
| `--neutral-500` | `#64748B` | Disabled text, captions | 4.3:1 |
| `--neutral-400` | `#94A3B8` | Placeholder text, decorative borders | 2.7:1 |
| `--neutral-300` | `#CBD5E1` | Dividers, inactive borders | 1.7:1 |
| `--neutral-200` | `#E2E8F0` | Card borders, input borders | 1.4:1 |
| `--neutral-100` | `#F1F5F9` | Alternate section backgrounds, filter panels | 1.1:1 |
| `--neutral-50` | `#F8FAFC` | Subtle surface differentiation | 1.05:1 |
| `--neutral-0` | `#FFFFFF` | Primary surface | 1:1 |

**Chromatic temperature:** The neutral scale carries a cool-slate undertone (blue-gray). This is intentional:
- Cool neutrals signal precision and professionalism (medical equipment, engineering tools)
- Warm neutrals signal comfort and hospitality (unacceptable for industrial context)
- Pure gray (zero saturation) feels dead on screen — slight chromatic bias prevents this

### 4.3 Functional Colors

Each functional color has exactly one semantic role. No color serves two meanings.

#### 4.3.1 Primary Action — Indigo-Blue

| Token | Value | Use |
|---|---|---|
| `--action-600` | `#4338CA` | Primary buttons, primary links, active tab indicators |
| `--action-700` | `#3730A3` | Hover state for primary action |
| `--action-800` | `#312E81` | Active/pressed state |
| `--action-100` | `#E0E7FF` | Selected state backgrounds (e.g., active filter chip) |
| `--action-50` | `#EEF2FF` | Hover backgrounds on selectable rows/cards |

**Why indigo-blue, not pure blue:** Pure blue (#0066CC or #2563EB range) is overused to the point of generic association with "link" and "button." Indigo-blue (#4338CA) provides:
- Stronger distinction from informational blue (used for notes/info callouts)
- Higher perceived authority (deeper, more serious tone)
- Better contrast ratios against white at the same perceived brightness
- No association with any specific platform or framework

**Why not red, orange, or green for primary action:**
- Red = error/danger in every mature design system. Using red for primary CTAs creates semantic collision.
- Orange = warning state. Same collision problem.
- Green = success/positive state. "Add to cart" being green works until you also need "In Stock" green — the two meanings compete.

#### 4.3.2 Status Colors

| Status | Token | Value | Exclusive Use |
|---|---|---|---|
| Success / In Stock | `--status-success-600` | `#059669` | "In Stock" indicator, successful form submission, order confirmed |
| Success background | `--status-success-50` | `#ECFDF5` | Success message background |
| Warning / Low Stock | `--status-warning-600` | `#D97706` | "Low Stock" indicator, form validation warnings, attention-needed states |
| Warning background | `--status-warning-50` | `#FFFBEB` | Warning message background |
| Error / Out of Stock | `--status-error-600` | `#DC2626` | "Out of Stock" indicator, form errors, destructive action confirmation |
| Error background | `--status-error-50` | `#FEF2F2` | Error message background |
| Sale / Price reduction | `--status-sale-600` | `#EA580C` | Sale badge, struck-through price color, price reduction indicator |

**WhatsApp — third-party brand color (special case):**

| Token | Value | Use |
|---|---|---|
| `--brand-whatsapp` | `#25D366` | WhatsApp FAB button only |
| `--brand-whatsapp-dark` | `#128C7E` | WhatsApp button hover only |

This green is never used for any other purpose. It is not a system color; it is a third-party brand constant.

#### 4.3.3 Informational Color

| Token | Value | Use |
|---|---|---|
| `--info-600` | `#0284C7` | Informational callouts, help text badges, tooltip borders |
| `--info-50` | `#F0F9FF` | Informational banner backgrounds |

### 4.4 Color Application Rules

**Rule 1: Maximum 2 chromatic colors per viewport.** At any screen position, the user should see at most 2 non-neutral colors. A product card may show a Sale badge (orange) and an "In Stock" indicator (green). Adding a third color (e.g., a blue "New" badge) violates this rule.

**Rule 2: Neutral is the default. Color is the exception.** Borders are neutral. Backgrounds are neutral. Text is neutral. Only elements that carry semantic meaning receive color.

**Rule 3: Color intensity matches importance.**
- `600` values: primary states, buttons, badges (high importance)
- `100` values: background tints, selected states (medium importance)
- `50` values: hover states, subtle indicators (low importance)

**Rule 4: No color-only communication.** Every color-coded element must also communicate its meaning through text, icon shape, or position. "In Stock" is green text reading "In stock" — not a green dot alone.

**Rule 5: Hover and active states follow mathematical steps.**
- Hover = one step darker (600 → 700)
- Active = two steps darker (600 → 800)
- Disabled = neutral-400 with 50% opacity

This matches IBM Carbon's interaction-state math and ensures predictable state transitions.

### 4.5 Color Misuse Prevention

| Misuse | Correction |
|---|---|
| Using action color for non-interactive elements | Action color is reserved for elements that respond to user input |
| Using success green for promotional "GO" messaging | Success green means a system state (in stock, confirmed), never marketing emphasis |
| Using red for brand emphasis or visual "pop" | Red means error or out-of-stock. No exceptions. |
| Coloring section headers for visual variety | Section headers are neutral-900. Color variation between sections destroys hierarchy consistency. |
| Using background color to signal section changes | Alternate surfaces use neutral-50 / neutral-100 only. No colored section backgrounds except for system banners (error, success, info). |
| Applying opacity to create color variants | Use the defined token steps. Opacity creates inconsistent contrast ratios across surfaces. |
| Using WhatsApp green for success/in-stock | WhatsApp green is a brand constant. System success green is a different value serving a different semantic role. |

---

## 5. Layout, Grid, and Rhythm Laws

### 5.1 Grid System

**Base unit: 8px.** Every spatial value in the system is a multiple of 8. No exceptions.

This aligns with McMaster-Carr, IBM Carbon, Atlassian, and Adobe Spectrum. The convergence of four independent world-class design systems on 8px is not coincidence — it maps cleanly to common screen densities, halves/doubles cleanly, and produces visually harmonious relationships.

**Column system:**

| Breakpoint | Token | Width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | `--bp-sm` | 0-639px | 4 | 16px | 16px |
| Tablet | `--bp-md` | 640-1023px | 8 | 24px | 24px |
| Desktop | `--bp-lg` | 1024-1279px | 12 | 24px | 32px |
| Wide | `--bp-xl` | 1280-1535px | 12 | 32px | Auto (centered) |
| Ultrawide | `--bp-2xl` | 1536px+ | 12 | 32px | Auto (centered) |

**Maximum content width: 1280px.**

Rationale:
- McMaster-Carr uses ~1200-1400px. FCP Euro uses ~1280px. Carbon's max breakpoint is 1584px but content rarely fills it.
- 1280px on a 1920px monitor provides ~320px of margin on each side — enough peripheral calm to prevent the interface from feeling like a spreadsheet.
- At 15px body text with 1.6 line-height, a 1280px container with proper column splits ensures body text never exceeds ~80 characters per line.

**Narrow content width: 720px.** For long-form text pages (About, FAQ, Returns, Privacy). Human reading cognition degrades above ~75 characters per line. At 15px, 720px produces approximately 65-70 characters per line.

### 5.2 Spacing Scale

All spacing values are multiples of the 8px base unit:

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Dense inline spacing (icon-to-text gap inside buttons) |
| `--space-2` | 8px | Tight component internal padding, gap between related items |
| `--space-3` | 12px | Standard inline padding, small card padding |
| `--space-4` | 16px | Default component padding, form field spacing |
| `--space-5` | 20px | Card internal padding on mobile |
| `--space-6` | 24px | Card internal padding on desktop, gap between cards in grid |
| `--space-8` | 32px | Section internal padding (small sections) |
| `--space-10` | 40px | Section internal padding (standard) |
| `--space-12` | 48px | Section gap on mobile |
| `--space-16` | 64px | Section gap on desktop |
| `--space-20` | 80px | Major page section separation |
| `--space-24` | 96px | Hero section vertical padding |

**The 4px exception:** `--space-1` (4px) is the only non-8px value. It exists for micro-spacing inside dense components. It is not permitted for layout-level spacing.

### 5.3 Vertical Rhythm

**Section separation follows a two-tier model:**

1. **Within-section spacing:** Components inside a section are separated by `--space-4` to `--space-8` (16-32px). This creates visual grouping.
2. **Between-section spacing:** Sections are separated by `--space-16` (64px) on desktop and `--space-12` (48px) on mobile. This creates clear content boundaries.

**Surface alternation for section differentiation:** Consecutive sections alternate between `--neutral-0` (white) and `--neutral-50` (off-white) backgrounds. This is the only permitted method of visual section separation. No colored backgrounds. No decorative dividers. No gradient transitions.

### 5.4 Alignment Absolutes

**What must always align:**

| Element | Alignment Rule |
|---|---|
| Product card edges in a grid | Left edges form a perfect vertical line. No staggered or masonry layouts. |
| Price text across cards in the same row | Prices must appear at the same vertical position across horizontally-adjacent cards. Requires consistent card height management. |
| Section headings | Left-aligned to the container edge. Never centered (except hero). Never indented. |
| Table columns | Right-aligned for numeric data. Left-aligned for text data. |
| Form labels and inputs | Labels above inputs (stacked). Never inline for multi-field forms. |
| Navigation items | Baseline-aligned within horizontal navigation bars. |
| Badge position on product cards | Top-left corner. Consistent X/Y offset. Never top-right, never bottom. |

**What must never float:**

| Element | Constraint |
|---|---|
| CTAs in cards | Pinned to card bottom via flexbox. Never floating at varying heights across a row. |
| Prices in cards | Must share vertical alignment across grid siblings. |
| Product images | Fixed aspect ratio (4:3 or 1:1). Never variable-height images that break grid alignment. |
| Sidebar filters | Aligned to the top of the product grid. Scroll independently only via `position: sticky`. |

### 5.5 Product Image Aspect Ratios

| Context | Ratio | Rationale |
|---|---|---|
| Product card thumbnail | 4:3 | Landscape orientation accommodates engine parts that are typically wider than tall. Provides consistent card height. |
| PDP primary image | 1:1 | Square format provides maximum image area. Standard for e-commerce detail views. |
| Category/vehicle tile | 16:9 | Landscape banner proportion for navigation tiles. |
| Trust/brand logo | Constrained to max 160px x 32px | Prevents logo size competition. Following DigiKey's 155x30px constraint model. |

All product images must use `object-fit: contain` with a neutral background (neutral-50 or white). Never crop. Never stretch. Parts have irregular shapes; forcing them into a fill creates visual dishonesty.

---

## 6. Component Visual System

### 6.1 Design Principles for Components

1. **Each component has exactly one visual purpose.** A badge communicates status. A button triggers action. A card contains a sellable entity. No component serves mixed roles.
2. **Component variants are additive, not multiplicative.** A button has 3 variants (primary, secondary, ghost). Not 9 (3 variants x 3 sizes) unless each combination serves a distinct, documentable purpose.
3. **Visual consistency over expressive variety.** All cards look like cards. All buttons look like buttons. Consistency across 600+ product pages is worth more than novelty on any single page.

### 6.2 Buttons

Three variants. No gradients. No shadows. No icons by default (icons are optional additions).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--action-600` | `--neutral-0` (white) | none | One per viewport section. "Add to cart", primary CTA. |
| Secondary | transparent | `--neutral-800` | 1px `--neutral-300` | Supporting actions. "View details", "Clear filters". |
| Ghost | transparent | `--action-600` | none | Tertiary actions. "Show more", inline text actions. |

**Button sizing:**

| Size | Height | Padding (H) | Font | Radius | Use |
|---|---|---|---|---|---|
| Small | 32px | 12px | `text-sm` / 500 | 4px | Dense contexts: table rows, filter chips, inline actions |
| Default | 40px | 16px | `text-base` / 500 | 6px | Standard forms, card CTAs, page-level actions |
| Large | 48px | 24px | `text-base` / 600 | 6px | Hero CTAs, full-width mobile actions, checkout |

**Button states:**

| State | Change | Duration |
|---|---|---|
| Hover | Background one step darker (600 → 700) | 150ms ease |
| Active | Background two steps darker (600 → 800) | 0ms (instant) |
| Focus | 2px ring in `--action-600` with 3px offset | 0ms (instant) |
| Disabled | Opacity 0.4. Cursor not-allowed. | -- |
| Loading | Text replaced by spinner (same dimensions). No layout shift. | -- |

**Button rules:**
- Full uppercase text only at `text-sm` or smaller.
- Sentence case for all default and large buttons ("Add to cart", not "ADD TO CART" or "Add To Cart").
- Maximum label length: 3 words for primary, 4 words for secondary.
- Icon-only buttons require `aria-label` and minimum 40px touch target.

### 6.3 Cards

**Product card (PLP context):**

| Zone | Content | Styling |
|---|---|---|
| Image zone | Product photo, 4:3 ratio, `object-fit: contain`, neutral-50 bg | No border on image. Card border contains everything. |
| Badge zone | Maximum 1 badge (priority: Sale > Out of Stock > New) | Top-left, 8px inset from card edge. |
| Category overline | Category name | `text-xs`, uppercase, `--neutral-500`, letter-spacing +0.05em |
| Product name | Truncated to 2 lines | `text-sm`, `font-medium`, `--neutral-900`, `line-clamp-2` |
| Price zone | Price or "Request price" | `text-lg`, `font-semibold`, `--neutral-900` for price. `text-sm`, `--neutral-500` for request. |
| CTA zone | Button pinned to bottom | Primary "Add to cart" if purchasable. Secondary "View details" if not. |

Card specification:
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Shadow: `0 1px 3px rgba(0,0,0,0.06)` — one value only
- Hover: shadow transitions to `0 2px 8px rgba(0,0,0,0.1)` over 200ms
- Internal padding: `--space-4` (16px) below image zone

**Information card (non-product context):**

Used for: trust strip items, feature callouts, contact methods, vehicle/model selection tiles.

- Background: `--neutral-0` or `--neutral-50`
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Padding: `--space-6` (24px)
- No shadow (differentiates from product cards which are "interactive objects")
- Hover (if interactive): border transitions to `--neutral-400`

### 6.4 Badges

Badges communicate a single status. One badge per product. Maximum 2 badges visible in any single viewport quadrant.

| Badge | Background | Text | Use |
|---|---|---|---|
| Sale | `--status-sale-600` | white | Product with validated price reduction |
| Out of Stock | `--neutral-200` | `--neutral-600` | Product not currently available |
| Low Stock | `--status-warning-50` | `--status-warning-600` | 5 or fewer units |
| New | `--neutral-900` | white | Products added in the last 30 days |
| OEM | `--action-100` | `--action-600` | Genuine OEM verification marker |

Badge specification:
- Font: `text-xs`, `font-medium`, uppercase, letter-spacing +0.05em
- Padding: 4px 8px
- Radius: 4px
- No icons inside badges. Text only.

**Badge priority (when multiple apply):** Sale > Out of Stock > Low Stock > New > OEM. Only the highest-priority badge is shown.

### 6.5 Tables

Used for: specification tables on PDP, order history, comparison views.

| Element | Style |
|---|---|
| Header row | Background: `--neutral-100`. Text: `text-xs`, `font-semibold`, uppercase, `--neutral-600` |
| Body rows | Alternating `--neutral-0` / `--neutral-50`. Text: `text-sm`, `font-normal`, `--neutral-800` |
| Cell padding | 12px vertical, 16px horizontal |
| Borders | Horizontal only: 1px solid `--neutral-200`. No vertical borders. |
| Numeric cells | Right-aligned, tabular numbers enabled |
| Text cells | Left-aligned |

**Table rules:**
- No rounded corners on tables.
- No hover row highlighting unless the table is interactive (clickable rows).
- Maximum 6 columns on desktop. More than 6 requires a different pattern.
- On mobile: tables of 4+ columns become stacked key-value pairs. Never horizontal-scroll tables.

### 6.6 Filters

**Filter sidebar specification:**

| Element | Style |
|---|---|
| Container | Background: `--neutral-100`. Border-radius: 6px. Padding: `--space-5` (20px). Border: 1px solid `--neutral-200`. |
| Section label | `text-xs`, `font-semibold`, uppercase, `--neutral-600`, letter-spacing +0.05em |
| Section spacing | `--space-6` (24px) between filter sections |
| Filter option (text) | `text-sm`, `font-normal`, `--neutral-800` |
| Filter option (active) | Background: `--action-100`. Text: `--action-600`. `font-medium`. |
| Checkbox | 16px x 16px. Border: 1px `--neutral-400`. Checked: `--action-600` fill with white checkmark. |
| Count badge | `text-xs`, `--neutral-500`, inline after option text |
| Clear action | `text-xs`, `--status-sale-600`, `font-medium`. Right-aligned to section label. |

**Filter rules:**
- Maximum 6 filter sections visible without scrolling.
- Collapsible sections for sections beyond the 6th.
- "Clear all" action visible whenever any filter is active.
- Active filter count displayed in the filter header (mobile toggle).

### 6.7 Status Indicators

| Status | Visual | Text | Color |
|---|---|---|---|
| In Stock | 8px filled circle + text | "In stock" | `--status-success-600` |
| Low Stock | 8px filled circle + text | "Low stock -- X remaining" | `--status-warning-600` |
| Out of Stock | 8px filled circle + text | "Out of stock" | `--status-error-600` |
| On Request | 8px open circle (border only) + text | "Price on request" | `--neutral-500` |

Specification:
- Circle and text baseline-aligned
- 8px gap between circle and text
- Text: `text-sm`, `font-medium`
- Never use status indicators without text labels

---

## 7. Mobile Visual Discipline

### 7.1 Density Rules

**Maximum items per initial viewport (above the fold):**

| Page | Maximum Items | Rationale |
|---|---|---|
| Homepage hero | 1 primary CTA, 1 secondary CTA | Focus determines conversion. |
| Product grid | 4 products (2x2) | More than 4 makes the grid feel like a feed, not a catalog. |
| Filter panel | 4 filter sections visible | Remaining behind accordion. |
| PDP above fold | Image + name + price + primary CTA | All other content below fold by design. |
| Navigation | 5 primary categories visible | Remaining behind "All categories" link. |

**Text truncation logic:**

| Element | Mobile Rule |
|---|---|
| Product name | `line-clamp-2` |
| Category name | `line-clamp-1` |
| Product description | Hidden on card level. Visible only on PDP. |
| OEM part number | Full display — never truncate technical identifiers |
| Price | Full display — never truncate or abbreviate currency |
| Breadcrumb | Parent > Current only. |

### 7.2 Thumb Safety

**Tap target discipline:**

| Element | Minimum Size | Minimum Spacing |
|---|---|---|
| Buttons | 44px height | 8px between adjacent buttons |
| Navigation links | 44px touch area | 4px visual separation |
| Filter options | 44px touch area | 0px visual (padding creates touch area) |
| Card (as tap target) | Full card is tappable | 12px gap between cards |
| Close/dismiss buttons | 44px x 44px touch area | 8px from container edge |
| Checkbox/radio | 44px x 44px touch area | 8px between options |

**Edge avoidance:**
- No interactive elements within 16px of screen left/right edges
- Bottom sticky CTAs must respect `env(safe-area-inset-bottom)`
- Swipe-gesture-dependent interactions are forbidden

### 7.3 Visual Calm Under Scroll

**Sticky element restraint:**

| Permitted Sticky Elements | Max Height | Condition |
|---|---|---|
| Header (simplified) | 56px | Collapses from full header on scroll |
| Bottom CTA bar (PDP only) | 64px (including safe area) | Only when "Add to cart" scrolls out of view |
| Filter toggle (PLP only) | 44px | Only when scrolled past organic filter entry point |

**Maximum combined sticky height: 120px.** Preserves 75%+ of viewport for scrollable content on a 640px-tall screen.

**Forbidden sticky elements:** Trust strip, search bar, "Back to top" buttons, persistent cookie/consent banners.

**Motion minimization:**
- No parallax scrolling
- No entrance animations on scroll (fade-in, slide-up)
- No loading skeleton animations that loop indefinitely
- Permitted motion: button state transitions (150ms), card hover shadow (200ms), modal open/close (200ms ease-out)
- Maximum individual animation duration: 300ms

### 7.4 Mobile Component Adaptations

| Component | Desktop | Mobile Adaptation |
|---|---|---|
| Product grid | 3-4 columns | 2 columns. Card padding reduces to `--space-3`. |
| Filter sidebar | Persistent left column | Overlay panel, full width, z-index above content. |
| Product card CTA | Text button | Can reduce to icon-only cart button (44px minimum). |
| Specification table | Horizontal columns | Stacked key-value pairs. |
| Breadcrumb | Full path | Parent > Current only. |
| Navigation | Horizontal category bar | Hamburger with category tree. Slide-in from left, 200ms. |
| Trust strip | 4-item horizontal bar | 2x2 grid or horizontal scroll (no auto-scroll). |
| Footer | 4-column grid | Single column accordion (collapsed by default). |

---

## 8. Anti-Pattern Registry

### Critical (must never ship)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| C-01 | More than 1 badge per product card | Dilutes status hierarchy. |
| C-02 | Color-only communication (no text/icon pairing) | Accessibility failure for 8% of male users with color vision deficiency. |
| C-03 | Price displayed as "0.00" or "0 AED" | Signals data error. Destroys trust. Show "Price on request" instead. |
| C-04 | Bold weight on body text paragraphs | Visual aggression. Undermines calm authority. |
| C-05 | Interactive element below 44px touch target on mobile | WCAG 2.5.8 failure. Causes mis-taps. |
| C-06 | More than 120px of combined sticky elements on mobile | Consumes >25% of viewport. Content claustrophobia. |
| C-07 | Sale badge on product with no genuine price reduction | `sale_price` must be > 0 AND < `regular_price` AND `regular_price` > 0. Anything else is visual fraud. |

### Major (resolve within sprint)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| M-01 | More than 3 font sizes in a single viewport | Visual noise. Signals template origin. |
| M-02 | Centered body text beyond 1 line | Ragged left edges destroy readability. |
| M-03 | Inconsistent card heights in a product grid row | Breaks alignment. Creates visual wobble. |
| M-04 | Shadow with more than 1 definition (multi-layered) | Ambiguous depth hierarchy. |
| M-05 | Using system success-green for WhatsApp buttons | Semantic collision between system status and brand identity. |
| M-06 | Inline star ratings on automotive parts | OEM parts are correct-fit or wrong-fit, not subjectively rated. |
| M-07 | Auto-playing carousels | <1% engagement after slide 1. Motion competes with scanning. |
| M-08 | Decorative dividers | Information should be separated by space, not decoration. |

### Minor (track for refinement)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| m-01 | Using border-radius > 6px on cards/buttons | Exceeds industrial precision tolerance. |
| m-02 | Title Case on buttons ("Add To Cart") | Sentence case is correct. Title case signals template default. |
| m-03 | Generic placeholder images for products | Low-effort appearance destroys product credibility. |
| m-04 | Footer with more than 4 columns on desktop | Column proliferation signals content governance failure. |
| m-05 | Newsletter popup on first visit | Zero precedent in tier-1 industrial platforms. |
| m-06 | Opacity for disabled states below 0.4 | Text becomes unreadable. |

---

## Appendix A: Token Reference

```
/* Surfaces */
--surface-primary:     var(--neutral-0);
--surface-secondary:   var(--neutral-50);
--surface-tertiary:    var(--neutral-100);
--surface-card:        var(--neutral-0);
--surface-overlay:     rgba(12, 18, 32, 0.5);

/* Text */
--text-primary:        var(--neutral-900);
--text-secondary:      var(--neutral-600);
--text-tertiary:       var(--neutral-500);
--text-inverse:        var(--neutral-0);
--text-disabled:       var(--neutral-400);

/* Borders */
--border-default:      var(--neutral-200);
--border-strong:       var(--neutral-400);
--border-focus:        var(--action-600);
--border-error:        var(--status-error-600);

/* Interactive */
--interactive-primary:        var(--action-600);
--interactive-primary-hover:  var(--action-700);
--interactive-primary-active: var(--action-800);

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0,0,0,0.04);
--shadow-md:  0 1px 3px rgba(0,0,0,0.06);
--shadow-lg:  0 2px 8px rgba(0,0,0,0.1);

/* Spacing */
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 
```


## License: unknown
https://github.com/tomhendra/tomhendra.dev/blob/b3be6f584522afffc665dd33f41ecbc07a98671b/app/styles/shared/sizes.css

```
File creation is disabled. Here is the complete specification:

---

# UI Visual System Specification v3.0

**Classification:** Master UI Specification — Greenfield Design  
**Platform:** High-trust automotive / industrial e-commerce  
**Horizon:** 2025–2027  
**Status:** Normative  
**Last revised:** 2026-02-10  

---

## Executive Summary

This document defines the complete visual system for a precision-class automotive parts e-commerce platform. It is designed from first principles, anchored to zero legacy decisions, and informed by deep analysis of the highest-performing visual systems in industrial e-commerce (McMaster-Carr, DigiKey, FCP Euro), enterprise design systems (IBM Carbon, Adobe Spectrum, Atlassian), and OEM automotive catalogs (Toyota Parts, Grainger).

The system is built on three invariants:

1. **Restraint over expression.** Every visual element must earn its presence. No decorative color, no ornamental typography, no gratuitous motion.
2. **Information density without chaos.** The platform must present thousands of technical products with absolute clarity. Visual calm under data load is the primary design constraint.
3. **Authority through precision.** Trust is communicated through spatial consistency, typographic discipline, and functional color — never through promotional language or trend-following aesthetics.

This is not a brand guideline. It is a structural specification for an interface that must remain credible under audit in five years.

---

## 1. Visual Intelligence Summary

### 1.1 Research Synthesis

Analysis of 13 platforms across automotive parts, industrial catalogs, and enterprise design systems reveals three tiers of visual maturity:

**Tier 1 — Structural Excellence (reference-grade)**

| Platform | Core Lesson |
|---|---|
| McMaster-Carr | Typography IS the entire design system. Two font weights, one accent color, zero promotional elements. Visual calm under 85,000+ SKU density. 8px spacing grid with mathematical precision. The gold standard for information-dense commerce. |
| IBM Carbon | Role-based color with interaction-state math (hover = half-step, active = two steps). Productive vs. Expressive type sets. 2x grid with 16-column system at large breakpoints. Token architecture that scales across products. |
| Adobe Spectrum | 11 grays per theme, each with a defined role. Major second type scale (1.125x). Platform-aware sizing (desktop vs. mobile as separate scales). Semantic token naming with 3-part structure. |

**Tier 2 — Professional Competence (selective adoption)**

| Platform | Core Lesson |
|---|---|
| FCP Euro | Best-in-class enthusiast auto parts UI. Manufacturer logos as trust anchors. Lifetime guarantee as persistent visual element. Badge system with clear hierarchy (OE > OEM > Aftermarket). Moderate density, well-managed. |
| Grainger | Corporate-professional industrial catalog. Dual navigation (search + browse). Content marketing integration. Weakness: CTA color = brand color, reducing functional clarity. |
| DigiKey | 17.6M products with parametric search. Color is purely informational. Manufacturer logos constrained to 155x30px — remarkable sizing discipline. Authorized distribution messaging counters counterfeit anxiety. |
| Atlassian | Token-based color with emphasis levels (subtlest to boldest). 8px spacing base. Three body font weights with strict usage rules. |

**Tier 3 — Cautionary (patterns to study, not replicate)**

| Platform | Lesson |
|---|---|
| RockAuto | Proves "ugly-trustworthy" works for power users. Not a replicable model, but the underlying insight matters: promotional noise destroys trust in this market. |
| Pelican Parts | Technical depth creates trust. Warm backgrounds differentiate. But dated execution undermines credibility for new visitors. |
| Toyota OEM | Corporate restraint is correct, but sterile execution crosses into "government form" territory. Vehicle selector UI demonstrates how formality can become friction. |
| Car Builder Solutions | Shopify-standard execution with dark theme. Review-wall trust model. Demonstrates how template reliance is visible to informed buyers. |

### 1.2 Reusable Patterns That Scale

These patterns appear across all high-trust platforms and should be adopted:

1. **Typography-first hierarchy.** The best systems (McMaster, Carbon) use font size and weight as primary organizational tools, with color as secondary reinforcement.
2. **8px spatial grid.** McMaster, Carbon, Atlassian, and Spectrum all converge on 8px as the base spatial unit. This is not optional.
3. **Role-based color with no decorative usage.** Every platform that achieves "authority" feel uses color to carry meaning, never for decoration.
4. **Two-weight discipline.** Regular + Semibold (or Medium) handles 90% of cases. Bold is reserved for price display and critical status indicators.
5. **Progressive density disclosure.** Category-level pages are spacious; product-detail pages are dense. The system breathes differently at different depths.
6. **Manufacturer identity as trust proxy.** FCP Euro and DigiKey both use brand logos as trust signals. The host platform stays visually neutral; the product brands carry credibility.
7. **Persistent trust strip.** FCP Euro, Grainger, and DigiKey all maintain a persistent trust bar (shipping, returns, warranty). This is industry standard for a reason.

### 1.3 Patterns That Must Be Rejected

| Pattern | Why It Fails |
|---|---|
| Hero carousels | Zero information density. McMaster proves they are unnecessary. Data shows carousel interaction rates below 1% after slide 1. |
| Promotional color gradients | Signal consumer retail, not industrial authority. No tier-1 reference platform uses gradients. |
| Badge proliferation (3+ per card) | FCP Euro's weakness. More than one badge per product card creates visual noise and dilutes the hierarchy of the badge system itself. |
| Dark theme for product catalogs | Car Builder Solutions demonstrates this: dark backgrounds reduce image contrast for product photography and increase reading fatigue for specification text. |
| Animated transitions between states | Motion attracts attention, which is a cost. In a catalog with hundreds of items, micro-animations compete with the user's scanning behavior. |
| Rounded corners > 8px | Excessive rounding signals "friendly consumer app." Industrial authority requires geometric precision. 4-6px radius maximum. |
| Shadow depth > 1 level | Multiple shadow depths create ambiguity about spatial hierarchy. One shadow value, applied consistently. |
| Inline star ratings on product cards | Star ratings are meaningful for consumer products with subjective quality. OEM parts are either correct or incorrect. Fit/no-fit replaces like/dislike. |

---

## 2. Visual Positioning Doctrine

### 2.1 What the UI Must Immediately Communicate

**Mechanical precision.** The interface itself must feel engineered, not designed. Spacing must be mathematically consistent. Alignment must be absolute. The visual system should suggest that the same rigor applied to the interface was applied to the parts catalog.

**Authority and scale.** The platform must feel like it contains thousands of products without showing them all at once. This is communicated through structured navigation, consistent component patterns, and confident whitespace — not through "Browse 600+ products!" messaging.

**Reliability under complexity.** When a user is on a product page with 15 specification rows, 3 compatibility notes, and a pricing block, the interface must remain calm. No element should compete for attention. The hierarchy must be self-evident without scanning.

### 2.2 What It Must Never Communicate

- **Template usage.** No Shopify defaults. No Bootstrap 5 card shadows. No generic icon libraries used without curation. If an informed buyer can identify the template, the platform has failed.
- **Cheapness.** No gradient buttons. No 2px border radius on oversized elements. No uppercase body text. No excessive exclamation marks in UI copy.
- **Over-decoration.** No decorative dividers. No ornamental icons. No background patterns. No floating shapes. If an element does not carry information or aid navigation, it does not exist.
- **Lifestyle branding.** No mood photography. No aspirational copy. No "experience the difference" language. The parts are mechanical objects; the UI should reflect their nature.

### 2.3 Emotional Calibration

| Axis | Left (preferred) | Right (avoided) |
|---|---|---|
| Tone | Calm | Exciting |
| Information | Clarity | Personality |
| Aesthetics | Restraint | Expressiveness |
| Density | Confident | Sparse |
| Typography | Neutral | Characterful |
| Color | Functional | Decorative |
| Layout | Predictable | Surprising |
| Motion | Static | Animated |

This system targets the intersection of **McMaster-Carr's information purity** and **FCP Euro's product merchandising** — technical precision with enough visual warmth to support product photography, but never enough to suggest lifestyle retail.

---

## 3. Typography System

### 3.1 Font Selection

**Primary typeface: Inter**

Rationale:
- Variable font with optical sizing (opsz 14–32), enabling automatic micro-adjustments for text vs. display contexts
- 147 language scripts including Latin, Cyrillic, Greek, Arabic — essential for UAE/GCC audience
- Tabular number feature (`tnum`) critical for price columns and specification tables
- Tall x-height optimized for screen legibility at 13-16px body sizes
- Disambiguation features (`ss02`, `cv08`, `cv05`, slashed zero) prevent misreading of OEM part numbers (O vs 0, I vs l vs 1)
- Used by Figma, GitHub, Linear, and Vercel's own documentation — proven at scale in technical interfaces
- 100-900 weight range with three master designs (100, 400, 900) ensuring quality at every interpolation point
- Open Font License — no licensing constraints

**Monospace companion: Inter's tabular features (preferred) or JetBrains Mono (fallback)**

Used exclusively for: OEM part numbers, SKU codes, engine codes, specification values.

**Font stack:**
```
--font-sans: 'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', ui-monospace, monospace;
```

**Rejected alternatives and reasons:**

| Font | Rejection Reason |
|---|---|
| Geist Sans | Vercel-ecosystem association. Fewer language scripts than Inter. No optical sizing axis. |
| IBM Plex Sans | Strong IBM brand association. Mathematical scale is rigid. Three-font-family system (Sans + Serif + Mono) is over-specified for this use case. |
| Roboto | Google Material association. Humanist proportions are too warm for industrial context. |
| Helvetica Neue | No variable font support. No tabular numbers feature. License cost. |
| System fonts only | Inconsistent rendering across devices undermines visual precision. Unacceptable for a system that claims mechanical rigor. |

### 3.2 Type Scale

The scale uses a **1.200 ratio (minor third)** — the same mathematical discipline used by IBM Carbon, adapted for e-commerce density requirements.

Base size: 15px (desktop) / 16px (mobile)

| Token | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 11px / 1.45 | 12px / 1.45 | 400-500 | Microcopy, timestamps, tertiary labels |
| `text-sm` | 13px / 1.5 | 14px / 1.5 | 400-500 | Secondary text, filter labels, metadata |
| `text-base` | 15px / 1.6 | 16px / 1.6 | 400 | Body text, descriptions, form inputs |
| `text-md` | 18px / 1.45 | 18px / 1.45 | 500-600 | Subheadings, card titles, section labels |
| `text-lg` | 21px / 1.35 | 21px / 1.35 | 600 | Page section headings |
| `text-xl` | 26px / 1.3 | 24px / 1.3 | 600 | Page titles |
| `text-2xl` | 31px / 1.2 | 28px / 1.25 | 600 | Hero headings, primary page titles |
| `text-3xl` | 37px / 1.15 | 32px / 1.2 | 600-700 | Landing page titles only |

**Line-height rationale:** Larger text gets tighter line-height (1.15-1.3) because heading text is read as a unit. Body text gets looser line-height (1.5-1.6) because paragraphs require inter-line scanning.

### 3.3 Weight Discipline

The system uses exactly three weights:

| Weight | Token | Permitted Uses | Forbidden Uses |
|---|---|---|---|
| Regular (400) | `font-normal` | Body text, descriptions, form inputs, table cells, secondary labels | Never for headings, CTAs, or prices |
| Medium (500) | `font-medium` | Navigation items, card titles, form labels, breadcrumbs, tertiary headings | Never for body paragraphs, never for primary headings |
| Semibold (600) | `font-semibold` | Page headings, section titles, prices, primary CTAs, critical status text | Never for body text, never for more than 2 consecutive lines |

**Bold (700) is restricted.** It is permitted only for:
- Primary page hero headings at `text-2xl` or larger
- Price display when the price is the primary focus of a component (e.g., PDP price block)
- "Out of Stock" status when it is the only status indicator visible

Bold at body text sizes creates visual aggression that undermines calm.

### 3.4 OpenType Feature Requirements

```css
font-feature-settings:
  'liga' 1,    /* Standard ligatures */
  'calt' 1,    /* Contextual alternates */
  'tnum' 1,    /* Tabular numbers — critical for price alignment */
  'zero' 1,    /* Slashed zero — prevents O/0 confusion in part numbers */
  'ss02' 1;    /* Disambiguation set — I/l/1 differentiation */
```

These features are non-negotiable for a platform that displays OEM part numbers. The difference between part number `1OI0` and `lO10` is a wrong-part shipment.

### 3.5 Typography Failure Cases

| Failure | Why It Fails | Prevention |
|---|---|---|
| Bold body text | Creates visual shouting. Undermines calm. | Lint rule: no `font-bold` below `text-md` |
| ALL CAPS body text | Reduces legibility by 10-15%. Feels hostile. | Uppercase permitted only for badges, overline labels, and button text at `text-xs` / `text-sm` |
| Centered body paragraphs | Ragged left edges destroy readability after 2 lines | Center alignment only for hero headings and single-line display text |
| More than 3 font sizes on one screen | Creates visual noise. Signals lack of system. | Maximum 4 scale levels per viewport (e.g., heading + subhead + body + micro) |
| Inconsistent number formatting | Prices misalign in grids. Specification columns wobble. | Tabular numbers (`tnum`) mandatory for all numeric content |
| Product names longer than 2 lines | Card layouts break. Visual rhythm destroyed. | `line-clamp-2` on all card-level product names. Full name on PDP only. |
| Italic for emphasis in UI | Inter's italic is a true italic with different letter shapes. Emphasis should use weight, not style. | Italic permitted only for: placeholder text, technical term definitions, legal/disclaimer copy |

### 3.6 Letter-Spacing Rules

| Context | Letter-spacing | Rationale |
|---|---|---|
| Uppercase labels and badges | +0.04em to +0.06em | Compensates for reduced inter-character whitespace in caps |
| Heading text at `text-xl`+ | -0.01em to -0.02em | Tightens large text for visual cohesion |
| Body text | 0 (normal) | Inter is designed for zero tracking at body sizes |
| Monospace/part numbers | 0 (normal) | Tabular alignment handles spacing |
| Price display | 0 (normal) | Tabular numbers handle alignment |

---

## 4. Color System

### 4.1 Design Principles

This color system follows four laws:

1. **Color must carry meaning.** If a color does not indicate status, hierarchy, or function, it does not belong.
2. **Neutral foundation, functional accents.** The interface is 90%+ neutral tones. Color appears sparingly and deliberately.
3. **Contrast first, brand second.** WCAG AA (4.5:1 for text) is the minimum. AAA (7:1) is the target for body text.
4. **One primary action color.** The entire system has exactly one color that means "primary interactive element." This color appears on primary buttons, active states, and links. Nothing else.

### 4.2 Neutral Foundation

The neutral palette provides the structural canvas. It is the most important palette in the system because it occupies 90% of viewport pixels.

| Token | Value | Role | Contrast vs White |
|---|---|---|---|
| `--neutral-950` | `#0C1220` | Deepest text, primary headings | 18.2:1 |
| `--neutral-900` | `#111827` | Primary body text | 16.4:1 |
| `--neutral-800` | `#1E293B` | Secondary headings, strong labels | 12.6:1 |
| `--neutral-700` | `#334155` | Tertiary text, active navigation | 8.2:1 |
| `--neutral-600` | `#475569` | Muted text, placeholders | 5.9:1 |
| `--neutral-500` | `#64748B` | Disabled text, captions | 4.3:1 |
| `--neutral-400` | `#94A3B8` | Placeholder text, decorative borders | 2.7:1 |
| `--neutral-300` | `#CBD5E1` | Dividers, inactive borders | 1.7:1 |
| `--neutral-200` | `#E2E8F0` | Card borders, input borders | 1.4:1 |
| `--neutral-100` | `#F1F5F9` | Alternate section backgrounds, filter panels | 1.1:1 |
| `--neutral-50` | `#F8FAFC` | Subtle surface differentiation | 1.05:1 |
| `--neutral-0` | `#FFFFFF` | Primary surface | 1:1 |

**Chromatic temperature:** The neutral scale carries a cool-slate undertone (blue-gray). This is intentional:
- Cool neutrals signal precision and professionalism (medical equipment, engineering tools)
- Warm neutrals signal comfort and hospitality (unacceptable for industrial context)
- Pure gray (zero saturation) feels dead on screen — slight chromatic bias prevents this

### 4.3 Functional Colors

Each functional color has exactly one semantic role. No color serves two meanings.

#### 4.3.1 Primary Action — Indigo-Blue

| Token | Value | Use |
|---|---|---|
| `--action-600` | `#4338CA` | Primary buttons, primary links, active tab indicators |
| `--action-700` | `#3730A3` | Hover state for primary action |
| `--action-800` | `#312E81` | Active/pressed state |
| `--action-100` | `#E0E7FF` | Selected state backgrounds (e.g., active filter chip) |
| `--action-50` | `#EEF2FF` | Hover backgrounds on selectable rows/cards |

**Why indigo-blue, not pure blue:** Pure blue (#0066CC or #2563EB range) is overused to the point of generic association with "link" and "button." Indigo-blue (#4338CA) provides:
- Stronger distinction from informational blue (used for notes/info callouts)
- Higher perceived authority (deeper, more serious tone)
- Better contrast ratios against white at the same perceived brightness
- No association with any specific platform or framework

**Why not red, orange, or green for primary action:**
- Red = error/danger in every mature design system. Using red for primary CTAs creates semantic collision.
- Orange = warning state. Same collision problem.
- Green = success/positive state. "Add to cart" being green works until you also need "In Stock" green — the two meanings compete.

#### 4.3.2 Status Colors

| Status | Token | Value | Exclusive Use |
|---|---|---|---|
| Success / In Stock | `--status-success-600` | `#059669` | "In Stock" indicator, successful form submission, order confirmed |
| Success background | `--status-success-50` | `#ECFDF5` | Success message background |
| Warning / Low Stock | `--status-warning-600` | `#D97706` | "Low Stock" indicator, form validation warnings, attention-needed states |
| Warning background | `--status-warning-50` | `#FFFBEB` | Warning message background |
| Error / Out of Stock | `--status-error-600` | `#DC2626` | "Out of Stock" indicator, form errors, destructive action confirmation |
| Error background | `--status-error-50` | `#FEF2F2` | Error message background |
| Sale / Price reduction | `--status-sale-600` | `#EA580C` | Sale badge, struck-through price color, price reduction indicator |

**WhatsApp — third-party brand color (special case):**

| Token | Value | Use |
|---|---|---|
| `--brand-whatsapp` | `#25D366` | WhatsApp FAB button only |
| `--brand-whatsapp-dark` | `#128C7E` | WhatsApp button hover only |

This green is never used for any other purpose. It is not a system color; it is a third-party brand constant.

#### 4.3.3 Informational Color

| Token | Value | Use |
|---|---|---|
| `--info-600` | `#0284C7` | Informational callouts, help text badges, tooltip borders |
| `--info-50` | `#F0F9FF` | Informational banner backgrounds |

### 4.4 Color Application Rules

**Rule 1: Maximum 2 chromatic colors per viewport.** At any screen position, the user should see at most 2 non-neutral colors. A product card may show a Sale badge (orange) and an "In Stock" indicator (green). Adding a third color (e.g., a blue "New" badge) violates this rule.

**Rule 2: Neutral is the default. Color is the exception.** Borders are neutral. Backgrounds are neutral. Text is neutral. Only elements that carry semantic meaning receive color.

**Rule 3: Color intensity matches importance.**
- `600` values: primary states, buttons, badges (high importance)
- `100` values: background tints, selected states (medium importance)
- `50` values: hover states, subtle indicators (low importance)

**Rule 4: No color-only communication.** Every color-coded element must also communicate its meaning through text, icon shape, or position. "In Stock" is green text reading "In stock" — not a green dot alone.

**Rule 5: Hover and active states follow mathematical steps.**
- Hover = one step darker (600 → 700)
- Active = two steps darker (600 → 800)
- Disabled = neutral-400 with 50% opacity

This matches IBM Carbon's interaction-state math and ensures predictable state transitions.

### 4.5 Color Misuse Prevention

| Misuse | Correction |
|---|---|
| Using action color for non-interactive elements | Action color is reserved for elements that respond to user input |
| Using success green for promotional "GO" messaging | Success green means a system state (in stock, confirmed), never marketing emphasis |
| Using red for brand emphasis or visual "pop" | Red means error or out-of-stock. No exceptions. |
| Coloring section headers for visual variety | Section headers are neutral-900. Color variation between sections destroys hierarchy consistency. |
| Using background color to signal section changes | Alternate surfaces use neutral-50 / neutral-100 only. No colored section backgrounds except for system banners (error, success, info). |
| Applying opacity to create color variants | Use the defined token steps. Opacity creates inconsistent contrast ratios across surfaces. |
| Using WhatsApp green for success/in-stock | WhatsApp green is a brand constant. System success green is a different value serving a different semantic role. |

---

## 5. Layout, Grid, and Rhythm Laws

### 5.1 Grid System

**Base unit: 8px.** Every spatial value in the system is a multiple of 8. No exceptions.

This aligns with McMaster-Carr, IBM Carbon, Atlassian, and Adobe Spectrum. The convergence of four independent world-class design systems on 8px is not coincidence — it maps cleanly to common screen densities, halves/doubles cleanly, and produces visually harmonious relationships.

**Column system:**

| Breakpoint | Token | Width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | `--bp-sm` | 0-639px | 4 | 16px | 16px |
| Tablet | `--bp-md` | 640-1023px | 8 | 24px | 24px |
| Desktop | `--bp-lg` | 1024-1279px | 12 | 24px | 32px |
| Wide | `--bp-xl` | 1280-1535px | 12 | 32px | Auto (centered) |
| Ultrawide | `--bp-2xl` | 1536px+ | 12 | 32px | Auto (centered) |

**Maximum content width: 1280px.**

Rationale:
- McMaster-Carr uses ~1200-1400px. FCP Euro uses ~1280px. Carbon's max breakpoint is 1584px but content rarely fills it.
- 1280px on a 1920px monitor provides ~320px of margin on each side — enough peripheral calm to prevent the interface from feeling like a spreadsheet.
- At 15px body text with 1.6 line-height, a 1280px container with proper column splits ensures body text never exceeds ~80 characters per line.

**Narrow content width: 720px.** For long-form text pages (About, FAQ, Returns, Privacy). Human reading cognition degrades above ~75 characters per line. At 15px, 720px produces approximately 65-70 characters per line.

### 5.2 Spacing Scale

All spacing values are multiples of the 8px base unit:

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Dense inline spacing (icon-to-text gap inside buttons) |
| `--space-2` | 8px | Tight component internal padding, gap between related items |
| `--space-3` | 12px | Standard inline padding, small card padding |
| `--space-4` | 16px | Default component padding, form field spacing |
| `--space-5` | 20px | Card internal padding on mobile |
| `--space-6` | 24px | Card internal padding on desktop, gap between cards in grid |
| `--space-8` | 32px | Section internal padding (small sections) |
| `--space-10` | 40px | Section internal padding (standard) |
| `--space-12` | 48px | Section gap on mobile |
| `--space-16` | 64px | Section gap on desktop |
| `--space-20` | 80px | Major page section separation |
| `--space-24` | 96px | Hero section vertical padding |

**The 4px exception:** `--space-1` (4px) is the only non-8px value. It exists for micro-spacing inside dense components. It is not permitted for layout-level spacing.

### 5.3 Vertical Rhythm

**Section separation follows a two-tier model:**

1. **Within-section spacing:** Components inside a section are separated by `--space-4` to `--space-8` (16-32px). This creates visual grouping.
2. **Between-section spacing:** Sections are separated by `--space-16` (64px) on desktop and `--space-12` (48px) on mobile. This creates clear content boundaries.

**Surface alternation for section differentiation:** Consecutive sections alternate between `--neutral-0` (white) and `--neutral-50` (off-white) backgrounds. This is the only permitted method of visual section separation. No colored backgrounds. No decorative dividers. No gradient transitions.

### 5.4 Alignment Absolutes

**What must always align:**

| Element | Alignment Rule |
|---|---|
| Product card edges in a grid | Left edges form a perfect vertical line. No staggered or masonry layouts. |
| Price text across cards in the same row | Prices must appear at the same vertical position across horizontally-adjacent cards. Requires consistent card height management. |
| Section headings | Left-aligned to the container edge. Never centered (except hero). Never indented. |
| Table columns | Right-aligned for numeric data. Left-aligned for text data. |
| Form labels and inputs | Labels above inputs (stacked). Never inline for multi-field forms. |
| Navigation items | Baseline-aligned within horizontal navigation bars. |
| Badge position on product cards | Top-left corner. Consistent X/Y offset. Never top-right, never bottom. |

**What must never float:**

| Element | Constraint |
|---|---|
| CTAs in cards | Pinned to card bottom via flexbox. Never floating at varying heights across a row. |
| Prices in cards | Must share vertical alignment across grid siblings. |
| Product images | Fixed aspect ratio (4:3 or 1:1). Never variable-height images that break grid alignment. |
| Sidebar filters | Aligned to the top of the product grid. Scroll independently only via `position: sticky`. |

### 5.5 Product Image Aspect Ratios

| Context | Ratio | Rationale |
|---|---|---|
| Product card thumbnail | 4:3 | Landscape orientation accommodates engine parts that are typically wider than tall. Provides consistent card height. |
| PDP primary image | 1:1 | Square format provides maximum image area. Standard for e-commerce detail views. |
| Category/vehicle tile | 16:9 | Landscape banner proportion for navigation tiles. |
| Trust/brand logo | Constrained to max 160px x 32px | Prevents logo size competition. Following DigiKey's 155x30px constraint model. |

All product images must use `object-fit: contain` with a neutral background (neutral-50 or white). Never crop. Never stretch. Parts have irregular shapes; forcing them into a fill creates visual dishonesty.

---

## 6. Component Visual System

### 6.1 Design Principles for Components

1. **Each component has exactly one visual purpose.** A badge communicates status. A button triggers action. A card contains a sellable entity. No component serves mixed roles.
2. **Component variants are additive, not multiplicative.** A button has 3 variants (primary, secondary, ghost). Not 9 (3 variants x 3 sizes) unless each combination serves a distinct, documentable purpose.
3. **Visual consistency over expressive variety.** All cards look like cards. All buttons look like buttons. Consistency across 600+ product pages is worth more than novelty on any single page.

### 6.2 Buttons

Three variants. No gradients. No shadows. No icons by default (icons are optional additions).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--action-600` | `--neutral-0` (white) | none | One per viewport section. "Add to cart", primary CTA. |
| Secondary | transparent | `--neutral-800` | 1px `--neutral-300` | Supporting actions. "View details", "Clear filters". |
| Ghost | transparent | `--action-600` | none | Tertiary actions. "Show more", inline text actions. |

**Button sizing:**

| Size | Height | Padding (H) | Font | Radius | Use |
|---|---|---|---|---|---|
| Small | 32px | 12px | `text-sm` / 500 | 4px | Dense contexts: table rows, filter chips, inline actions |
| Default | 40px | 16px | `text-base` / 500 | 6px | Standard forms, card CTAs, page-level actions |
| Large | 48px | 24px | `text-base` / 600 | 6px | Hero CTAs, full-width mobile actions, checkout |

**Button states:**

| State | Change | Duration |
|---|---|---|
| Hover | Background one step darker (600 → 700) | 150ms ease |
| Active | Background two steps darker (600 → 800) | 0ms (instant) |
| Focus | 2px ring in `--action-600` with 3px offset | 0ms (instant) |
| Disabled | Opacity 0.4. Cursor not-allowed. | -- |
| Loading | Text replaced by spinner (same dimensions). No layout shift. | -- |

**Button rules:**
- Full uppercase text only at `text-sm` or smaller.
- Sentence case for all default and large buttons ("Add to cart", not "ADD TO CART" or "Add To Cart").
- Maximum label length: 3 words for primary, 4 words for secondary.
- Icon-only buttons require `aria-label` and minimum 40px touch target.

### 6.3 Cards

**Product card (PLP context):**

| Zone | Content | Styling |
|---|---|---|
| Image zone | Product photo, 4:3 ratio, `object-fit: contain`, neutral-50 bg | No border on image. Card border contains everything. |
| Badge zone | Maximum 1 badge (priority: Sale > Out of Stock > New) | Top-left, 8px inset from card edge. |
| Category overline | Category name | `text-xs`, uppercase, `--neutral-500`, letter-spacing +0.05em |
| Product name | Truncated to 2 lines | `text-sm`, `font-medium`, `--neutral-900`, `line-clamp-2` |
| Price zone | Price or "Request price" | `text-lg`, `font-semibold`, `--neutral-900` for price. `text-sm`, `--neutral-500` for request. |
| CTA zone | Button pinned to bottom | Primary "Add to cart" if purchasable. Secondary "View details" if not. |

Card specification:
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Shadow: `0 1px 3px rgba(0,0,0,0.06)` — one value only
- Hover: shadow transitions to `0 2px 8px rgba(0,0,0,0.1)` over 200ms
- Internal padding: `--space-4` (16px) below image zone

**Information card (non-product context):**

Used for: trust strip items, feature callouts, contact methods, vehicle/model selection tiles.

- Background: `--neutral-0` or `--neutral-50`
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Padding: `--space-6` (24px)
- No shadow (differentiates from product cards which are "interactive objects")
- Hover (if interactive): border transitions to `--neutral-400`

### 6.4 Badges

Badges communicate a single status. One badge per product. Maximum 2 badges visible in any single viewport quadrant.

| Badge | Background | Text | Use |
|---|---|---|---|
| Sale | `--status-sale-600` | white | Product with validated price reduction |
| Out of Stock | `--neutral-200` | `--neutral-600` | Product not currently available |
| Low Stock | `--status-warning-50` | `--status-warning-600` | 5 or fewer units |
| New | `--neutral-900` | white | Products added in the last 30 days |
| OEM | `--action-100` | `--action-600` | Genuine OEM verification marker |

Badge specification:
- Font: `text-xs`, `font-medium`, uppercase, letter-spacing +0.05em
- Padding: 4px 8px
- Radius: 4px
- No icons inside badges. Text only.

**Badge priority (when multiple apply):** Sale > Out of Stock > Low Stock > New > OEM. Only the highest-priority badge is shown.

### 6.5 Tables

Used for: specification tables on PDP, order history, comparison views.

| Element | Style |
|---|---|
| Header row | Background: `--neutral-100`. Text: `text-xs`, `font-semibold`, uppercase, `--neutral-600` |
| Body rows | Alternating `--neutral-0` / `--neutral-50`. Text: `text-sm`, `font-normal`, `--neutral-800` |
| Cell padding | 12px vertical, 16px horizontal |
| Borders | Horizontal only: 1px solid `--neutral-200`. No vertical borders. |
| Numeric cells | Right-aligned, tabular numbers enabled |
| Text cells | Left-aligned |

**Table rules:**
- No rounded corners on tables.
- No hover row highlighting unless the table is interactive (clickable rows).
- Maximum 6 columns on desktop. More than 6 requires a different pattern.
- On mobile: tables of 4+ columns become stacked key-value pairs. Never horizontal-scroll tables.

### 6.6 Filters

**Filter sidebar specification:**

| Element | Style |
|---|---|
| Container | Background: `--neutral-100`. Border-radius: 6px. Padding: `--space-5` (20px). Border: 1px solid `--neutral-200`. |
| Section label | `text-xs`, `font-semibold`, uppercase, `--neutral-600`, letter-spacing +0.05em |
| Section spacing | `--space-6` (24px) between filter sections |
| Filter option (text) | `text-sm`, `font-normal`, `--neutral-800` |
| Filter option (active) | Background: `--action-100`. Text: `--action-600`. `font-medium`. |
| Checkbox | 16px x 16px. Border: 1px `--neutral-400`. Checked: `--action-600` fill with white checkmark. |
| Count badge | `text-xs`, `--neutral-500`, inline after option text |
| Clear action | `text-xs`, `--status-sale-600`, `font-medium`. Right-aligned to section label. |

**Filter rules:**
- Maximum 6 filter sections visible without scrolling.
- Collapsible sections for sections beyond the 6th.
- "Clear all" action visible whenever any filter is active.
- Active filter count displayed in the filter header (mobile toggle).

### 6.7 Status Indicators

| Status | Visual | Text | Color |
|---|---|---|---|
| In Stock | 8px filled circle + text | "In stock" | `--status-success-600` |
| Low Stock | 8px filled circle + text | "Low stock -- X remaining" | `--status-warning-600` |
| Out of Stock | 8px filled circle + text | "Out of stock" | `--status-error-600` |
| On Request | 8px open circle (border only) + text | "Price on request" | `--neutral-500` |

Specification:
- Circle and text baseline-aligned
- 8px gap between circle and text
- Text: `text-sm`, `font-medium`
- Never use status indicators without text labels

---

## 7. Mobile Visual Discipline

### 7.1 Density Rules

**Maximum items per initial viewport (above the fold):**

| Page | Maximum Items | Rationale |
|---|---|---|
| Homepage hero | 1 primary CTA, 1 secondary CTA | Focus determines conversion. |
| Product grid | 4 products (2x2) | More than 4 makes the grid feel like a feed, not a catalog. |
| Filter panel | 4 filter sections visible | Remaining behind accordion. |
| PDP above fold | Image + name + price + primary CTA | All other content below fold by design. |
| Navigation | 5 primary categories visible | Remaining behind "All categories" link. |

**Text truncation logic:**

| Element | Mobile Rule |
|---|---|
| Product name | `line-clamp-2` |
| Category name | `line-clamp-1` |
| Product description | Hidden on card level. Visible only on PDP. |
| OEM part number | Full display — never truncate technical identifiers |
| Price | Full display — never truncate or abbreviate currency |
| Breadcrumb | Parent > Current only. |

### 7.2 Thumb Safety

**Tap target discipline:**

| Element | Minimum Size | Minimum Spacing |
|---|---|---|
| Buttons | 44px height | 8px between adjacent buttons |
| Navigation links | 44px touch area | 4px visual separation |
| Filter options | 44px touch area | 0px visual (padding creates touch area) |
| Card (as tap target) | Full card is tappable | 12px gap between cards |
| Close/dismiss buttons | 44px x 44px touch area | 8px from container edge |
| Checkbox/radio | 44px x 44px touch area | 8px between options |

**Edge avoidance:**
- No interactive elements within 16px of screen left/right edges
- Bottom sticky CTAs must respect `env(safe-area-inset-bottom)`
- Swipe-gesture-dependent interactions are forbidden

### 7.3 Visual Calm Under Scroll

**Sticky element restraint:**

| Permitted Sticky Elements | Max Height | Condition |
|---|---|---|
| Header (simplified) | 56px | Collapses from full header on scroll |
| Bottom CTA bar (PDP only) | 64px (including safe area) | Only when "Add to cart" scrolls out of view |
| Filter toggle (PLP only) | 44px | Only when scrolled past organic filter entry point |

**Maximum combined sticky height: 120px.** Preserves 75%+ of viewport for scrollable content on a 640px-tall screen.

**Forbidden sticky elements:** Trust strip, search bar, "Back to top" buttons, persistent cookie/consent banners.

**Motion minimization:**
- No parallax scrolling
- No entrance animations on scroll (fade-in, slide-up)
- No loading skeleton animations that loop indefinitely
- Permitted motion: button state transitions (150ms), card hover shadow (200ms), modal open/close (200ms ease-out)
- Maximum individual animation duration: 300ms

### 7.4 Mobile Component Adaptations

| Component | Desktop | Mobile Adaptation |
|---|---|---|
| Product grid | 3-4 columns | 2 columns. Card padding reduces to `--space-3`. |
| Filter sidebar | Persistent left column | Overlay panel, full width, z-index above content. |
| Product card CTA | Text button | Can reduce to icon-only cart button (44px minimum). |
| Specification table | Horizontal columns | Stacked key-value pairs. |
| Breadcrumb | Full path | Parent > Current only. |
| Navigation | Horizontal category bar | Hamburger with category tree. Slide-in from left, 200ms. |
| Trust strip | 4-item horizontal bar | 2x2 grid or horizontal scroll (no auto-scroll). |
| Footer | 4-column grid | Single column accordion (collapsed by default). |

---

## 8. Anti-Pattern Registry

### Critical (must never ship)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| C-01 | More than 1 badge per product card | Dilutes status hierarchy. |
| C-02 | Color-only communication (no text/icon pairing) | Accessibility failure for 8% of male users with color vision deficiency. |
| C-03 | Price displayed as "0.00" or "0 AED" | Signals data error. Destroys trust. Show "Price on request" instead. |
| C-04 | Bold weight on body text paragraphs | Visual aggression. Undermines calm authority. |
| C-05 | Interactive element below 44px touch target on mobile | WCAG 2.5.8 failure. Causes mis-taps. |
| C-06 | More than 120px of combined sticky elements on mobile | Consumes >25% of viewport. Content claustrophobia. |
| C-07 | Sale badge on product with no genuine price reduction | `sale_price` must be > 0 AND < `regular_price` AND `regular_price` > 0. Anything else is visual fraud. |

### Major (resolve within sprint)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| M-01 | More than 3 font sizes in a single viewport | Visual noise. Signals template origin. |
| M-02 | Centered body text beyond 1 line | Ragged left edges destroy readability. |
| M-03 | Inconsistent card heights in a product grid row | Breaks alignment. Creates visual wobble. |
| M-04 | Shadow with more than 1 definition (multi-layered) | Ambiguous depth hierarchy. |
| M-05 | Using system success-green for WhatsApp buttons | Semantic collision between system status and brand identity. |
| M-06 | Inline star ratings on automotive parts | OEM parts are correct-fit or wrong-fit, not subjectively rated. |
| M-07 | Auto-playing carousels | <1% engagement after slide 1. Motion competes with scanning. |
| M-08 | Decorative dividers | Information should be separated by space, not decoration. |

### Minor (track for refinement)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| m-01 | Using border-radius > 6px on cards/buttons | Exceeds industrial precision tolerance. |
| m-02 | Title Case on buttons ("Add To Cart") | Sentence case is correct. Title case signals template default. |
| m-03 | Generic placeholder images for products | Low-effort appearance destroys product credibility. |
| m-04 | Footer with more than 4 columns on desktop | Column proliferation signals content governance failure. |
| m-05 | Newsletter popup on first visit | Zero precedent in tier-1 industrial platforms. |
| m-06 | Opacity for disabled states below 0.4 | Text becomes unreadable. |

---

## Appendix A: Token Reference

```
/* Surfaces */
--surface-primary:     var(--neutral-0);
--surface-secondary:   var(--neutral-50);
--surface-tertiary:    var(--neutral-100);
--surface-card:        var(--neutral-0);
--surface-overlay:     rgba(12, 18, 32, 0.5);

/* Text */
--text-primary:        var(--neutral-900);
--text-secondary:      var(--neutral-600);
--text-tertiary:       var(--neutral-500);
--text-inverse:        var(--neutral-0);
--text-disabled:       var(--neutral-400);

/* Borders */
--border-default:      var(--neutral-200);
--border-strong:       var(--neutral-400);
--border-focus:        var(--action-600);
--border-error:        var(--status-error-600);

/* Interactive */
--interactive-primary:        var(--action-600);
--interactive-primary-hover:  var(--action-700);
--interactive-primary-active: var(--action-800);

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0,0,0,0.04);
--shadow-md:  0 1px 3px rgba(0,0,0,0.06);
--shadow-lg:  0 2px 8px rgba(0,0,0,0.1);

/* Spacing */
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 
```


## License: unknown
https://github.com/tomhendra/tomhendra.dev/blob/b3be6f584522afffc665dd33f41ecbc07a98671b/app/styles/shared/sizes.css

```
File creation is disabled. Here is the complete specification:

---

# UI Visual System Specification v3.0

**Classification:** Master UI Specification — Greenfield Design  
**Platform:** High-trust automotive / industrial e-commerce  
**Horizon:** 2025–2027  
**Status:** Normative  
**Last revised:** 2026-02-10  

---

## Executive Summary

This document defines the complete visual system for a precision-class automotive parts e-commerce platform. It is designed from first principles, anchored to zero legacy decisions, and informed by deep analysis of the highest-performing visual systems in industrial e-commerce (McMaster-Carr, DigiKey, FCP Euro), enterprise design systems (IBM Carbon, Adobe Spectrum, Atlassian), and OEM automotive catalogs (Toyota Parts, Grainger).

The system is built on three invariants:

1. **Restraint over expression.** Every visual element must earn its presence. No decorative color, no ornamental typography, no gratuitous motion.
2. **Information density without chaos.** The platform must present thousands of technical products with absolute clarity. Visual calm under data load is the primary design constraint.
3. **Authority through precision.** Trust is communicated through spatial consistency, typographic discipline, and functional color — never through promotional language or trend-following aesthetics.

This is not a brand guideline. It is a structural specification for an interface that must remain credible under audit in five years.

---

## 1. Visual Intelligence Summary

### 1.1 Research Synthesis

Analysis of 13 platforms across automotive parts, industrial catalogs, and enterprise design systems reveals three tiers of visual maturity:

**Tier 1 — Structural Excellence (reference-grade)**

| Platform | Core Lesson |
|---|---|
| McMaster-Carr | Typography IS the entire design system. Two font weights, one accent color, zero promotional elements. Visual calm under 85,000+ SKU density. 8px spacing grid with mathematical precision. The gold standard for information-dense commerce. |
| IBM Carbon | Role-based color with interaction-state math (hover = half-step, active = two steps). Productive vs. Expressive type sets. 2x grid with 16-column system at large breakpoints. Token architecture that scales across products. |
| Adobe Spectrum | 11 grays per theme, each with a defined role. Major second type scale (1.125x). Platform-aware sizing (desktop vs. mobile as separate scales). Semantic token naming with 3-part structure. |

**Tier 2 — Professional Competence (selective adoption)**

| Platform | Core Lesson |
|---|---|
| FCP Euro | Best-in-class enthusiast auto parts UI. Manufacturer logos as trust anchors. Lifetime guarantee as persistent visual element. Badge system with clear hierarchy (OE > OEM > Aftermarket). Moderate density, well-managed. |
| Grainger | Corporate-professional industrial catalog. Dual navigation (search + browse). Content marketing integration. Weakness: CTA color = brand color, reducing functional clarity. |
| DigiKey | 17.6M products with parametric search. Color is purely informational. Manufacturer logos constrained to 155x30px — remarkable sizing discipline. Authorized distribution messaging counters counterfeit anxiety. |
| Atlassian | Token-based color with emphasis levels (subtlest to boldest). 8px spacing base. Three body font weights with strict usage rules. |

**Tier 3 — Cautionary (patterns to study, not replicate)**

| Platform | Lesson |
|---|---|
| RockAuto | Proves "ugly-trustworthy" works for power users. Not a replicable model, but the underlying insight matters: promotional noise destroys trust in this market. |
| Pelican Parts | Technical depth creates trust. Warm backgrounds differentiate. But dated execution undermines credibility for new visitors. |
| Toyota OEM | Corporate restraint is correct, but sterile execution crosses into "government form" territory. Vehicle selector UI demonstrates how formality can become friction. |
| Car Builder Solutions | Shopify-standard execution with dark theme. Review-wall trust model. Demonstrates how template reliance is visible to informed buyers. |

### 1.2 Reusable Patterns That Scale

These patterns appear across all high-trust platforms and should be adopted:

1. **Typography-first hierarchy.** The best systems (McMaster, Carbon) use font size and weight as primary organizational tools, with color as secondary reinforcement.
2. **8px spatial grid.** McMaster, Carbon, Atlassian, and Spectrum all converge on 8px as the base spatial unit. This is not optional.
3. **Role-based color with no decorative usage.** Every platform that achieves "authority" feel uses color to carry meaning, never for decoration.
4. **Two-weight discipline.** Regular + Semibold (or Medium) handles 90% of cases. Bold is reserved for price display and critical status indicators.
5. **Progressive density disclosure.** Category-level pages are spacious; product-detail pages are dense. The system breathes differently at different depths.
6. **Manufacturer identity as trust proxy.** FCP Euro and DigiKey both use brand logos as trust signals. The host platform stays visually neutral; the product brands carry credibility.
7. **Persistent trust strip.** FCP Euro, Grainger, and DigiKey all maintain a persistent trust bar (shipping, returns, warranty). This is industry standard for a reason.

### 1.3 Patterns That Must Be Rejected

| Pattern | Why It Fails |
|---|---|
| Hero carousels | Zero information density. McMaster proves they are unnecessary. Data shows carousel interaction rates below 1% after slide 1. |
| Promotional color gradients | Signal consumer retail, not industrial authority. No tier-1 reference platform uses gradients. |
| Badge proliferation (3+ per card) | FCP Euro's weakness. More than one badge per product card creates visual noise and dilutes the hierarchy of the badge system itself. |
| Dark theme for product catalogs | Car Builder Solutions demonstrates this: dark backgrounds reduce image contrast for product photography and increase reading fatigue for specification text. |
| Animated transitions between states | Motion attracts attention, which is a cost. In a catalog with hundreds of items, micro-animations compete with the user's scanning behavior. |
| Rounded corners > 8px | Excessive rounding signals "friendly consumer app." Industrial authority requires geometric precision. 4-6px radius maximum. |
| Shadow depth > 1 level | Multiple shadow depths create ambiguity about spatial hierarchy. One shadow value, applied consistently. |
| Inline star ratings on product cards | Star ratings are meaningful for consumer products with subjective quality. OEM parts are either correct or incorrect. Fit/no-fit replaces like/dislike. |

---

## 2. Visual Positioning Doctrine

### 2.1 What the UI Must Immediately Communicate

**Mechanical precision.** The interface itself must feel engineered, not designed. Spacing must be mathematically consistent. Alignment must be absolute. The visual system should suggest that the same rigor applied to the interface was applied to the parts catalog.

**Authority and scale.** The platform must feel like it contains thousands of products without showing them all at once. This is communicated through structured navigation, consistent component patterns, and confident whitespace — not through "Browse 600+ products!" messaging.

**Reliability under complexity.** When a user is on a product page with 15 specification rows, 3 compatibility notes, and a pricing block, the interface must remain calm. No element should compete for attention. The hierarchy must be self-evident without scanning.

### 2.2 What It Must Never Communicate

- **Template usage.** No Shopify defaults. No Bootstrap 5 card shadows. No generic icon libraries used without curation. If an informed buyer can identify the template, the platform has failed.
- **Cheapness.** No gradient buttons. No 2px border radius on oversized elements. No uppercase body text. No excessive exclamation marks in UI copy.
- **Over-decoration.** No decorative dividers. No ornamental icons. No background patterns. No floating shapes. If an element does not carry information or aid navigation, it does not exist.
- **Lifestyle branding.** No mood photography. No aspirational copy. No "experience the difference" language. The parts are mechanical objects; the UI should reflect their nature.

### 2.3 Emotional Calibration

| Axis | Left (preferred) | Right (avoided) |
|---|---|---|
| Tone | Calm | Exciting |
| Information | Clarity | Personality |
| Aesthetics | Restraint | Expressiveness |
| Density | Confident | Sparse |
| Typography | Neutral | Characterful |
| Color | Functional | Decorative |
| Layout | Predictable | Surprising |
| Motion | Static | Animated |

This system targets the intersection of **McMaster-Carr's information purity** and **FCP Euro's product merchandising** — technical precision with enough visual warmth to support product photography, but never enough to suggest lifestyle retail.

---

## 3. Typography System

### 3.1 Font Selection

**Primary typeface: Inter**

Rationale:
- Variable font with optical sizing (opsz 14–32), enabling automatic micro-adjustments for text vs. display contexts
- 147 language scripts including Latin, Cyrillic, Greek, Arabic — essential for UAE/GCC audience
- Tabular number feature (`tnum`) critical for price columns and specification tables
- Tall x-height optimized for screen legibility at 13-16px body sizes
- Disambiguation features (`ss02`, `cv08`, `cv05`, slashed zero) prevent misreading of OEM part numbers (O vs 0, I vs l vs 1)
- Used by Figma, GitHub, Linear, and Vercel's own documentation — proven at scale in technical interfaces
- 100-900 weight range with three master designs (100, 400, 900) ensuring quality at every interpolation point
- Open Font License — no licensing constraints

**Monospace companion: Inter's tabular features (preferred) or JetBrains Mono (fallback)**

Used exclusively for: OEM part numbers, SKU codes, engine codes, specification values.

**Font stack:**
```
--font-sans: 'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', ui-monospace, monospace;
```

**Rejected alternatives and reasons:**

| Font | Rejection Reason |
|---|---|
| Geist Sans | Vercel-ecosystem association. Fewer language scripts than Inter. No optical sizing axis. |
| IBM Plex Sans | Strong IBM brand association. Mathematical scale is rigid. Three-font-family system (Sans + Serif + Mono) is over-specified for this use case. |
| Roboto | Google Material association. Humanist proportions are too warm for industrial context. |
| Helvetica Neue | No variable font support. No tabular numbers feature. License cost. |
| System fonts only | Inconsistent rendering across devices undermines visual precision. Unacceptable for a system that claims mechanical rigor. |

### 3.2 Type Scale

The scale uses a **1.200 ratio (minor third)** — the same mathematical discipline used by IBM Carbon, adapted for e-commerce density requirements.

Base size: 15px (desktop) / 16px (mobile)

| Token | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 11px / 1.45 | 12px / 1.45 | 400-500 | Microcopy, timestamps, tertiary labels |
| `text-sm` | 13px / 1.5 | 14px / 1.5 | 400-500 | Secondary text, filter labels, metadata |
| `text-base` | 15px / 1.6 | 16px / 1.6 | 400 | Body text, descriptions, form inputs |
| `text-md` | 18px / 1.45 | 18px / 1.45 | 500-600 | Subheadings, card titles, section labels |
| `text-lg` | 21px / 1.35 | 21px / 1.35 | 600 | Page section headings |
| `text-xl` | 26px / 1.3 | 24px / 1.3 | 600 | Page titles |
| `text-2xl` | 31px / 1.2 | 28px / 1.25 | 600 | Hero headings, primary page titles |
| `text-3xl` | 37px / 1.15 | 32px / 1.2 | 600-700 | Landing page titles only |

**Line-height rationale:** Larger text gets tighter line-height (1.15-1.3) because heading text is read as a unit. Body text gets looser line-height (1.5-1.6) because paragraphs require inter-line scanning.

### 3.3 Weight Discipline

The system uses exactly three weights:

| Weight | Token | Permitted Uses | Forbidden Uses |
|---|---|---|---|
| Regular (400) | `font-normal` | Body text, descriptions, form inputs, table cells, secondary labels | Never for headings, CTAs, or prices |
| Medium (500) | `font-medium` | Navigation items, card titles, form labels, breadcrumbs, tertiary headings | Never for body paragraphs, never for primary headings |
| Semibold (600) | `font-semibold` | Page headings, section titles, prices, primary CTAs, critical status text | Never for body text, never for more than 2 consecutive lines |

**Bold (700) is restricted.** It is permitted only for:
- Primary page hero headings at `text-2xl` or larger
- Price display when the price is the primary focus of a component (e.g., PDP price block)
- "Out of Stock" status when it is the only status indicator visible

Bold at body text sizes creates visual aggression that undermines calm.

### 3.4 OpenType Feature Requirements

```css
font-feature-settings:
  'liga' 1,    /* Standard ligatures */
  'calt' 1,    /* Contextual alternates */
  'tnum' 1,    /* Tabular numbers — critical for price alignment */
  'zero' 1,    /* Slashed zero — prevents O/0 confusion in part numbers */
  'ss02' 1;    /* Disambiguation set — I/l/1 differentiation */
```

These features are non-negotiable for a platform that displays OEM part numbers. The difference between part number `1OI0` and `lO10` is a wrong-part shipment.

### 3.5 Typography Failure Cases

| Failure | Why It Fails | Prevention |
|---|---|---|
| Bold body text | Creates visual shouting. Undermines calm. | Lint rule: no `font-bold` below `text-md` |
| ALL CAPS body text | Reduces legibility by 10-15%. Feels hostile. | Uppercase permitted only for badges, overline labels, and button text at `text-xs` / `text-sm` |
| Centered body paragraphs | Ragged left edges destroy readability after 2 lines | Center alignment only for hero headings and single-line display text |
| More than 3 font sizes on one screen | Creates visual noise. Signals lack of system. | Maximum 4 scale levels per viewport (e.g., heading + subhead + body + micro) |
| Inconsistent number formatting | Prices misalign in grids. Specification columns wobble. | Tabular numbers (`tnum`) mandatory for all numeric content |
| Product names longer than 2 lines | Card layouts break. Visual rhythm destroyed. | `line-clamp-2` on all card-level product names. Full name on PDP only. |
| Italic for emphasis in UI | Inter's italic is a true italic with different letter shapes. Emphasis should use weight, not style. | Italic permitted only for: placeholder text, technical term definitions, legal/disclaimer copy |

### 3.6 Letter-Spacing Rules

| Context | Letter-spacing | Rationale |
|---|---|---|
| Uppercase labels and badges | +0.04em to +0.06em | Compensates for reduced inter-character whitespace in caps |
| Heading text at `text-xl`+ | -0.01em to -0.02em | Tightens large text for visual cohesion |
| Body text | 0 (normal) | Inter is designed for zero tracking at body sizes |
| Monospace/part numbers | 0 (normal) | Tabular alignment handles spacing |
| Price display | 0 (normal) | Tabular numbers handle alignment |

---

## 4. Color System

### 4.1 Design Principles

This color system follows four laws:

1. **Color must carry meaning.** If a color does not indicate status, hierarchy, or function, it does not belong.
2. **Neutral foundation, functional accents.** The interface is 90%+ neutral tones. Color appears sparingly and deliberately.
3. **Contrast first, brand second.** WCAG AA (4.5:1 for text) is the minimum. AAA (7:1) is the target for body text.
4. **One primary action color.** The entire system has exactly one color that means "primary interactive element." This color appears on primary buttons, active states, and links. Nothing else.

### 4.2 Neutral Foundation

The neutral palette provides the structural canvas. It is the most important palette in the system because it occupies 90% of viewport pixels.

| Token | Value | Role | Contrast vs White |
|---|---|---|---|
| `--neutral-950` | `#0C1220` | Deepest text, primary headings | 18.2:1 |
| `--neutral-900` | `#111827` | Primary body text | 16.4:1 |
| `--neutral-800` | `#1E293B` | Secondary headings, strong labels | 12.6:1 |
| `--neutral-700` | `#334155` | Tertiary text, active navigation | 8.2:1 |
| `--neutral-600` | `#475569` | Muted text, placeholders | 5.9:1 |
| `--neutral-500` | `#64748B` | Disabled text, captions | 4.3:1 |
| `--neutral-400` | `#94A3B8` | Placeholder text, decorative borders | 2.7:1 |
| `--neutral-300` | `#CBD5E1` | Dividers, inactive borders | 1.7:1 |
| `--neutral-200` | `#E2E8F0` | Card borders, input borders | 1.4:1 |
| `--neutral-100` | `#F1F5F9` | Alternate section backgrounds, filter panels | 1.1:1 |
| `--neutral-50` | `#F8FAFC` | Subtle surface differentiation | 1.05:1 |
| `--neutral-0` | `#FFFFFF` | Primary surface | 1:1 |

**Chromatic temperature:** The neutral scale carries a cool-slate undertone (blue-gray). This is intentional:
- Cool neutrals signal precision and professionalism (medical equipment, engineering tools)
- Warm neutrals signal comfort and hospitality (unacceptable for industrial context)
- Pure gray (zero saturation) feels dead on screen — slight chromatic bias prevents this

### 4.3 Functional Colors

Each functional color has exactly one semantic role. No color serves two meanings.

#### 4.3.1 Primary Action — Indigo-Blue

| Token | Value | Use |
|---|---|---|
| `--action-600` | `#4338CA` | Primary buttons, primary links, active tab indicators |
| `--action-700` | `#3730A3` | Hover state for primary action |
| `--action-800` | `#312E81` | Active/pressed state |
| `--action-100` | `#E0E7FF` | Selected state backgrounds (e.g., active filter chip) |
| `--action-50` | `#EEF2FF` | Hover backgrounds on selectable rows/cards |

**Why indigo-blue, not pure blue:** Pure blue (#0066CC or #2563EB range) is overused to the point of generic association with "link" and "button." Indigo-blue (#4338CA) provides:
- Stronger distinction from informational blue (used for notes/info callouts)
- Higher perceived authority (deeper, more serious tone)
- Better contrast ratios against white at the same perceived brightness
- No association with any specific platform or framework

**Why not red, orange, or green for primary action:**
- Red = error/danger in every mature design system. Using red for primary CTAs creates semantic collision.
- Orange = warning state. Same collision problem.
- Green = success/positive state. "Add to cart" being green works until you also need "In Stock" green — the two meanings compete.

#### 4.3.2 Status Colors

| Status | Token | Value | Exclusive Use |
|---|---|---|---|
| Success / In Stock | `--status-success-600` | `#059669` | "In Stock" indicator, successful form submission, order confirmed |
| Success background | `--status-success-50` | `#ECFDF5` | Success message background |
| Warning / Low Stock | `--status-warning-600` | `#D97706` | "Low Stock" indicator, form validation warnings, attention-needed states |
| Warning background | `--status-warning-50` | `#FFFBEB` | Warning message background |
| Error / Out of Stock | `--status-error-600` | `#DC2626` | "Out of Stock" indicator, form errors, destructive action confirmation |
| Error background | `--status-error-50` | `#FEF2F2` | Error message background |
| Sale / Price reduction | `--status-sale-600` | `#EA580C` | Sale badge, struck-through price color, price reduction indicator |

**WhatsApp — third-party brand color (special case):**

| Token | Value | Use |
|---|---|---|
| `--brand-whatsapp` | `#25D366` | WhatsApp FAB button only |
| `--brand-whatsapp-dark` | `#128C7E` | WhatsApp button hover only |

This green is never used for any other purpose. It is not a system color; it is a third-party brand constant.

#### 4.3.3 Informational Color

| Token | Value | Use |
|---|---|---|
| `--info-600` | `#0284C7` | Informational callouts, help text badges, tooltip borders |
| `--info-50` | `#F0F9FF` | Informational banner backgrounds |

### 4.4 Color Application Rules

**Rule 1: Maximum 2 chromatic colors per viewport.** At any screen position, the user should see at most 2 non-neutral colors. A product card may show a Sale badge (orange) and an "In Stock" indicator (green). Adding a third color (e.g., a blue "New" badge) violates this rule.

**Rule 2: Neutral is the default. Color is the exception.** Borders are neutral. Backgrounds are neutral. Text is neutral. Only elements that carry semantic meaning receive color.

**Rule 3: Color intensity matches importance.**
- `600` values: primary states, buttons, badges (high importance)
- `100` values: background tints, selected states (medium importance)
- `50` values: hover states, subtle indicators (low importance)

**Rule 4: No color-only communication.** Every color-coded element must also communicate its meaning through text, icon shape, or position. "In Stock" is green text reading "In stock" — not a green dot alone.

**Rule 5: Hover and active states follow mathematical steps.**
- Hover = one step darker (600 → 700)
- Active = two steps darker (600 → 800)
- Disabled = neutral-400 with 50% opacity

This matches IBM Carbon's interaction-state math and ensures predictable state transitions.

### 4.5 Color Misuse Prevention

| Misuse | Correction |
|---|---|
| Using action color for non-interactive elements | Action color is reserved for elements that respond to user input |
| Using success green for promotional "GO" messaging | Success green means a system state (in stock, confirmed), never marketing emphasis |
| Using red for brand emphasis or visual "pop" | Red means error or out-of-stock. No exceptions. |
| Coloring section headers for visual variety | Section headers are neutral-900. Color variation between sections destroys hierarchy consistency. |
| Using background color to signal section changes | Alternate surfaces use neutral-50 / neutral-100 only. No colored section backgrounds except for system banners (error, success, info). |
| Applying opacity to create color variants | Use the defined token steps. Opacity creates inconsistent contrast ratios across surfaces. |
| Using WhatsApp green for success/in-stock | WhatsApp green is a brand constant. System success green is a different value serving a different semantic role. |

---

## 5. Layout, Grid, and Rhythm Laws

### 5.1 Grid System

**Base unit: 8px.** Every spatial value in the system is a multiple of 8. No exceptions.

This aligns with McMaster-Carr, IBM Carbon, Atlassian, and Adobe Spectrum. The convergence of four independent world-class design systems on 8px is not coincidence — it maps cleanly to common screen densities, halves/doubles cleanly, and produces visually harmonious relationships.

**Column system:**

| Breakpoint | Token | Width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | `--bp-sm` | 0-639px | 4 | 16px | 16px |
| Tablet | `--bp-md` | 640-1023px | 8 | 24px | 24px |
| Desktop | `--bp-lg` | 1024-1279px | 12 | 24px | 32px |
| Wide | `--bp-xl` | 1280-1535px | 12 | 32px | Auto (centered) |
| Ultrawide | `--bp-2xl` | 1536px+ | 12 | 32px | Auto (centered) |

**Maximum content width: 1280px.**

Rationale:
- McMaster-Carr uses ~1200-1400px. FCP Euro uses ~1280px. Carbon's max breakpoint is 1584px but content rarely fills it.
- 1280px on a 1920px monitor provides ~320px of margin on each side — enough peripheral calm to prevent the interface from feeling like a spreadsheet.
- At 15px body text with 1.6 line-height, a 1280px container with proper column splits ensures body text never exceeds ~80 characters per line.

**Narrow content width: 720px.** For long-form text pages (About, FAQ, Returns, Privacy). Human reading cognition degrades above ~75 characters per line. At 15px, 720px produces approximately 65-70 characters per line.

### 5.2 Spacing Scale

All spacing values are multiples of the 8px base unit:

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Dense inline spacing (icon-to-text gap inside buttons) |
| `--space-2` | 8px | Tight component internal padding, gap between related items |
| `--space-3` | 12px | Standard inline padding, small card padding |
| `--space-4` | 16px | Default component padding, form field spacing |
| `--space-5` | 20px | Card internal padding on mobile |
| `--space-6` | 24px | Card internal padding on desktop, gap between cards in grid |
| `--space-8` | 32px | Section internal padding (small sections) |
| `--space-10` | 40px | Section internal padding (standard) |
| `--space-12` | 48px | Section gap on mobile |
| `--space-16` | 64px | Section gap on desktop |
| `--space-20` | 80px | Major page section separation |
| `--space-24` | 96px | Hero section vertical padding |

**The 4px exception:** `--space-1` (4px) is the only non-8px value. It exists for micro-spacing inside dense components. It is not permitted for layout-level spacing.

### 5.3 Vertical Rhythm

**Section separation follows a two-tier model:**

1. **Within-section spacing:** Components inside a section are separated by `--space-4` to `--space-8` (16-32px). This creates visual grouping.
2. **Between-section spacing:** Sections are separated by `--space-16` (64px) on desktop and `--space-12` (48px) on mobile. This creates clear content boundaries.

**Surface alternation for section differentiation:** Consecutive sections alternate between `--neutral-0` (white) and `--neutral-50` (off-white) backgrounds. This is the only permitted method of visual section separation. No colored backgrounds. No decorative dividers. No gradient transitions.

### 5.4 Alignment Absolutes

**What must always align:**

| Element | Alignment Rule |
|---|---|
| Product card edges in a grid | Left edges form a perfect vertical line. No staggered or masonry layouts. |
| Price text across cards in the same row | Prices must appear at the same vertical position across horizontally-adjacent cards. Requires consistent card height management. |
| Section headings | Left-aligned to the container edge. Never centered (except hero). Never indented. |
| Table columns | Right-aligned for numeric data. Left-aligned for text data. |
| Form labels and inputs | Labels above inputs (stacked). Never inline for multi-field forms. |
| Navigation items | Baseline-aligned within horizontal navigation bars. |
| Badge position on product cards | Top-left corner. Consistent X/Y offset. Never top-right, never bottom. |

**What must never float:**

| Element | Constraint |
|---|---|
| CTAs in cards | Pinned to card bottom via flexbox. Never floating at varying heights across a row. |
| Prices in cards | Must share vertical alignment across grid siblings. |
| Product images | Fixed aspect ratio (4:3 or 1:1). Never variable-height images that break grid alignment. |
| Sidebar filters | Aligned to the top of the product grid. Scroll independently only via `position: sticky`. |

### 5.5 Product Image Aspect Ratios

| Context | Ratio | Rationale |
|---|---|---|
| Product card thumbnail | 4:3 | Landscape orientation accommodates engine parts that are typically wider than tall. Provides consistent card height. |
| PDP primary image | 1:1 | Square format provides maximum image area. Standard for e-commerce detail views. |
| Category/vehicle tile | 16:9 | Landscape banner proportion for navigation tiles. |
| Trust/brand logo | Constrained to max 160px x 32px | Prevents logo size competition. Following DigiKey's 155x30px constraint model. |

All product images must use `object-fit: contain` with a neutral background (neutral-50 or white). Never crop. Never stretch. Parts have irregular shapes; forcing them into a fill creates visual dishonesty.

---

## 6. Component Visual System

### 6.1 Design Principles for Components

1. **Each component has exactly one visual purpose.** A badge communicates status. A button triggers action. A card contains a sellable entity. No component serves mixed roles.
2. **Component variants are additive, not multiplicative.** A button has 3 variants (primary, secondary, ghost). Not 9 (3 variants x 3 sizes) unless each combination serves a distinct, documentable purpose.
3. **Visual consistency over expressive variety.** All cards look like cards. All buttons look like buttons. Consistency across 600+ product pages is worth more than novelty on any single page.

### 6.2 Buttons

Three variants. No gradients. No shadows. No icons by default (icons are optional additions).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--action-600` | `--neutral-0` (white) | none | One per viewport section. "Add to cart", primary CTA. |
| Secondary | transparent | `--neutral-800` | 1px `--neutral-300` | Supporting actions. "View details", "Clear filters". |
| Ghost | transparent | `--action-600` | none | Tertiary actions. "Show more", inline text actions. |

**Button sizing:**

| Size | Height | Padding (H) | Font | Radius | Use |
|---|---|---|---|---|---|
| Small | 32px | 12px | `text-sm` / 500 | 4px | Dense contexts: table rows, filter chips, inline actions |
| Default | 40px | 16px | `text-base` / 500 | 6px | Standard forms, card CTAs, page-level actions |
| Large | 48px | 24px | `text-base` / 600 | 6px | Hero CTAs, full-width mobile actions, checkout |

**Button states:**

| State | Change | Duration |
|---|---|---|
| Hover | Background one step darker (600 → 700) | 150ms ease |
| Active | Background two steps darker (600 → 800) | 0ms (instant) |
| Focus | 2px ring in `--action-600` with 3px offset | 0ms (instant) |
| Disabled | Opacity 0.4. Cursor not-allowed. | -- |
| Loading | Text replaced by spinner (same dimensions). No layout shift. | -- |

**Button rules:**
- Full uppercase text only at `text-sm` or smaller.
- Sentence case for all default and large buttons ("Add to cart", not "ADD TO CART" or "Add To Cart").
- Maximum label length: 3 words for primary, 4 words for secondary.
- Icon-only buttons require `aria-label` and minimum 40px touch target.

### 6.3 Cards

**Product card (PLP context):**

| Zone | Content | Styling |
|---|---|---|
| Image zone | Product photo, 4:3 ratio, `object-fit: contain`, neutral-50 bg | No border on image. Card border contains everything. |
| Badge zone | Maximum 1 badge (priority: Sale > Out of Stock > New) | Top-left, 8px inset from card edge. |
| Category overline | Category name | `text-xs`, uppercase, `--neutral-500`, letter-spacing +0.05em |
| Product name | Truncated to 2 lines | `text-sm`, `font-medium`, `--neutral-900`, `line-clamp-2` |
| Price zone | Price or "Request price" | `text-lg`, `font-semibold`, `--neutral-900` for price. `text-sm`, `--neutral-500` for request. |
| CTA zone | Button pinned to bottom | Primary "Add to cart" if purchasable. Secondary "View details" if not. |

Card specification:
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Shadow: `0 1px 3px rgba(0,0,0,0.06)` — one value only
- Hover: shadow transitions to `0 2px 8px rgba(0,0,0,0.1)` over 200ms
- Internal padding: `--space-4` (16px) below image zone

**Information card (non-product context):**

Used for: trust strip items, feature callouts, contact methods, vehicle/model selection tiles.

- Background: `--neutral-0` or `--neutral-50`
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Padding: `--space-6` (24px)
- No shadow (differentiates from product cards which are "interactive objects")
- Hover (if interactive): border transitions to `--neutral-400`

### 6.4 Badges

Badges communicate a single status. One badge per product. Maximum 2 badges visible in any single viewport quadrant.

| Badge | Background | Text | Use |
|---|---|---|---|
| Sale | `--status-sale-600` | white | Product with validated price reduction |
| Out of Stock | `--neutral-200` | `--neutral-600` | Product not currently available |
| Low Stock | `--status-warning-50` | `--status-warning-600` | 5 or fewer units |
| New | `--neutral-900` | white | Products added in the last 30 days |
| OEM | `--action-100` | `--action-600` | Genuine OEM verification marker |

Badge specification:
- Font: `text-xs`, `font-medium`, uppercase, letter-spacing +0.05em
- Padding: 4px 8px
- Radius: 4px
- No icons inside badges. Text only.

**Badge priority (when multiple apply):** Sale > Out of Stock > Low Stock > New > OEM. Only the highest-priority badge is shown.

### 6.5 Tables

Used for: specification tables on PDP, order history, comparison views.

| Element | Style |
|---|---|
| Header row | Background: `--neutral-100`. Text: `text-xs`, `font-semibold`, uppercase, `--neutral-600` |
| Body rows | Alternating `--neutral-0` / `--neutral-50`. Text: `text-sm`, `font-normal`, `--neutral-800` |
| Cell padding | 12px vertical, 16px horizontal |
| Borders | Horizontal only: 1px solid `--neutral-200`. No vertical borders. |
| Numeric cells | Right-aligned, tabular numbers enabled |
| Text cells | Left-aligned |

**Table rules:**
- No rounded corners on tables.
- No hover row highlighting unless the table is interactive (clickable rows).
- Maximum 6 columns on desktop. More than 6 requires a different pattern.
- On mobile: tables of 4+ columns become stacked key-value pairs. Never horizontal-scroll tables.

### 6.6 Filters

**Filter sidebar specification:**

| Element | Style |
|---|---|
| Container | Background: `--neutral-100`. Border-radius: 6px. Padding: `--space-5` (20px). Border: 1px solid `--neutral-200`. |
| Section label | `text-xs`, `font-semibold`, uppercase, `--neutral-600`, letter-spacing +0.05em |
| Section spacing | `--space-6` (24px) between filter sections |
| Filter option (text) | `text-sm`, `font-normal`, `--neutral-800` |
| Filter option (active) | Background: `--action-100`. Text: `--action-600`. `font-medium`. |
| Checkbox | 16px x 16px. Border: 1px `--neutral-400`. Checked: `--action-600` fill with white checkmark. |
| Count badge | `text-xs`, `--neutral-500`, inline after option text |
| Clear action | `text-xs`, `--status-sale-600`, `font-medium`. Right-aligned to section label. |

**Filter rules:**
- Maximum 6 filter sections visible without scrolling.
- Collapsible sections for sections beyond the 6th.
- "Clear all" action visible whenever any filter is active.
- Active filter count displayed in the filter header (mobile toggle).

### 6.7 Status Indicators

| Status | Visual | Text | Color |
|---|---|---|---|
| In Stock | 8px filled circle + text | "In stock" | `--status-success-600` |
| Low Stock | 8px filled circle + text | "Low stock -- X remaining" | `--status-warning-600` |
| Out of Stock | 8px filled circle + text | "Out of stock" | `--status-error-600` |
| On Request | 8px open circle (border only) + text | "Price on request" | `--neutral-500` |

Specification:
- Circle and text baseline-aligned
- 8px gap between circle and text
- Text: `text-sm`, `font-medium`
- Never use status indicators without text labels

---

## 7. Mobile Visual Discipline

### 7.1 Density Rules

**Maximum items per initial viewport (above the fold):**

| Page | Maximum Items | Rationale |
|---|---|---|
| Homepage hero | 1 primary CTA, 1 secondary CTA | Focus determines conversion. |
| Product grid | 4 products (2x2) | More than 4 makes the grid feel like a feed, not a catalog. |
| Filter panel | 4 filter sections visible | Remaining behind accordion. |
| PDP above fold | Image + name + price + primary CTA | All other content below fold by design. |
| Navigation | 5 primary categories visible | Remaining behind "All categories" link. |

**Text truncation logic:**

| Element | Mobile Rule |
|---|---|
| Product name | `line-clamp-2` |
| Category name | `line-clamp-1` |
| Product description | Hidden on card level. Visible only on PDP. |
| OEM part number | Full display — never truncate technical identifiers |
| Price | Full display — never truncate or abbreviate currency |
| Breadcrumb | Parent > Current only. |

### 7.2 Thumb Safety

**Tap target discipline:**

| Element | Minimum Size | Minimum Spacing |
|---|---|---|
| Buttons | 44px height | 8px between adjacent buttons |
| Navigation links | 44px touch area | 4px visual separation |
| Filter options | 44px touch area | 0px visual (padding creates touch area) |
| Card (as tap target) | Full card is tappable | 12px gap between cards |
| Close/dismiss buttons | 44px x 44px touch area | 8px from container edge |
| Checkbox/radio | 44px x 44px touch area | 8px between options |

**Edge avoidance:**
- No interactive elements within 16px of screen left/right edges
- Bottom sticky CTAs must respect `env(safe-area-inset-bottom)`
- Swipe-gesture-dependent interactions are forbidden

### 7.3 Visual Calm Under Scroll

**Sticky element restraint:**

| Permitted Sticky Elements | Max Height | Condition |
|---|---|---|
| Header (simplified) | 56px | Collapses from full header on scroll |
| Bottom CTA bar (PDP only) | 64px (including safe area) | Only when "Add to cart" scrolls out of view |
| Filter toggle (PLP only) | 44px | Only when scrolled past organic filter entry point |

**Maximum combined sticky height: 120px.** Preserves 75%+ of viewport for scrollable content on a 640px-tall screen.

**Forbidden sticky elements:** Trust strip, search bar, "Back to top" buttons, persistent cookie/consent banners.

**Motion minimization:**
- No parallax scrolling
- No entrance animations on scroll (fade-in, slide-up)
- No loading skeleton animations that loop indefinitely
- Permitted motion: button state transitions (150ms), card hover shadow (200ms), modal open/close (200ms ease-out)
- Maximum individual animation duration: 300ms

### 7.4 Mobile Component Adaptations

| Component | Desktop | Mobile Adaptation |
|---|---|---|
| Product grid | 3-4 columns | 2 columns. Card padding reduces to `--space-3`. |
| Filter sidebar | Persistent left column | Overlay panel, full width, z-index above content. |
| Product card CTA | Text button | Can reduce to icon-only cart button (44px minimum). |
| Specification table | Horizontal columns | Stacked key-value pairs. |
| Breadcrumb | Full path | Parent > Current only. |
| Navigation | Horizontal category bar | Hamburger with category tree. Slide-in from left, 200ms. |
| Trust strip | 4-item horizontal bar | 2x2 grid or horizontal scroll (no auto-scroll). |
| Footer | 4-column grid | Single column accordion (collapsed by default). |

---

## 8. Anti-Pattern Registry

### Critical (must never ship)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| C-01 | More than 1 badge per product card | Dilutes status hierarchy. |
| C-02 | Color-only communication (no text/icon pairing) | Accessibility failure for 8% of male users with color vision deficiency. |
| C-03 | Price displayed as "0.00" or "0 AED" | Signals data error. Destroys trust. Show "Price on request" instead. |
| C-04 | Bold weight on body text paragraphs | Visual aggression. Undermines calm authority. |
| C-05 | Interactive element below 44px touch target on mobile | WCAG 2.5.8 failure. Causes mis-taps. |
| C-06 | More than 120px of combined sticky elements on mobile | Consumes >25% of viewport. Content claustrophobia. |
| C-07 | Sale badge on product with no genuine price reduction | `sale_price` must be > 0 AND < `regular_price` AND `regular_price` > 0. Anything else is visual fraud. |

### Major (resolve within sprint)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| M-01 | More than 3 font sizes in a single viewport | Visual noise. Signals template origin. |
| M-02 | Centered body text beyond 1 line | Ragged left edges destroy readability. |
| M-03 | Inconsistent card heights in a product grid row | Breaks alignment. Creates visual wobble. |
| M-04 | Shadow with more than 1 definition (multi-layered) | Ambiguous depth hierarchy. |
| M-05 | Using system success-green for WhatsApp buttons | Semantic collision between system status and brand identity. |
| M-06 | Inline star ratings on automotive parts | OEM parts are correct-fit or wrong-fit, not subjectively rated. |
| M-07 | Auto-playing carousels | <1% engagement after slide 1. Motion competes with scanning. |
| M-08 | Decorative dividers | Information should be separated by space, not decoration. |

### Minor (track for refinement)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| m-01 | Using border-radius > 6px on cards/buttons | Exceeds industrial precision tolerance. |
| m-02 | Title Case on buttons ("Add To Cart") | Sentence case is correct. Title case signals template default. |
| m-03 | Generic placeholder images for products | Low-effort appearance destroys product credibility. |
| m-04 | Footer with more than 4 columns on desktop | Column proliferation signals content governance failure. |
| m-05 | Newsletter popup on first visit | Zero precedent in tier-1 industrial platforms. |
| m-06 | Opacity for disabled states below 0.4 | Text becomes unreadable. |

---

## Appendix A: Token Reference

```
/* Surfaces */
--surface-primary:     var(--neutral-0);
--surface-secondary:   var(--neutral-50);
--surface-tertiary:    var(--neutral-100);
--surface-card:        var(--neutral-0);
--surface-overlay:     rgba(12, 18, 32, 0.5);

/* Text */
--text-primary:        var(--neutral-900);
--text-secondary:      var(--neutral-600);
--text-tertiary:       var(--neutral-500);
--text-inverse:        var(--neutral-0);
--text-disabled:       var(--neutral-400);

/* Borders */
--border-default:      var(--neutral-200);
--border-strong:       var(--neutral-400);
--border-focus:        var(--action-600);
--border-error:        var(--status-error-600);

/* Interactive */
--interactive-primary:        var(--action-600);
--interactive-primary-hover:  var(--action-700);
--interactive-primary-active: var(--action-800);

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0,0,0,0.04);
--shadow-md:  0 1px 3px rgba(0,0,0,0.06);
--shadow-lg:  0 2px 8px rgba(0,0,0,0.1);

/* Spacing */
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 
```


## License: unknown
https://github.com/tomhendra/tomhendra.dev/blob/b3be6f584522afffc665dd33f41ecbc07a98671b/app/styles/shared/sizes.css

```
File creation is disabled. Here is the complete specification:

---

# UI Visual System Specification v3.0

**Classification:** Master UI Specification — Greenfield Design  
**Platform:** High-trust automotive / industrial e-commerce  
**Horizon:** 2025–2027  
**Status:** Normative  
**Last revised:** 2026-02-10  

---

## Executive Summary

This document defines the complete visual system for a precision-class automotive parts e-commerce platform. It is designed from first principles, anchored to zero legacy decisions, and informed by deep analysis of the highest-performing visual systems in industrial e-commerce (McMaster-Carr, DigiKey, FCP Euro), enterprise design systems (IBM Carbon, Adobe Spectrum, Atlassian), and OEM automotive catalogs (Toyota Parts, Grainger).

The system is built on three invariants:

1. **Restraint over expression.** Every visual element must earn its presence. No decorative color, no ornamental typography, no gratuitous motion.
2. **Information density without chaos.** The platform must present thousands of technical products with absolute clarity. Visual calm under data load is the primary design constraint.
3. **Authority through precision.** Trust is communicated through spatial consistency, typographic discipline, and functional color — never through promotional language or trend-following aesthetics.

This is not a brand guideline. It is a structural specification for an interface that must remain credible under audit in five years.

---

## 1. Visual Intelligence Summary

### 1.1 Research Synthesis

Analysis of 13 platforms across automotive parts, industrial catalogs, and enterprise design systems reveals three tiers of visual maturity:

**Tier 1 — Structural Excellence (reference-grade)**

| Platform | Core Lesson |
|---|---|
| McMaster-Carr | Typography IS the entire design system. Two font weights, one accent color, zero promotional elements. Visual calm under 85,000+ SKU density. 8px spacing grid with mathematical precision. The gold standard for information-dense commerce. |
| IBM Carbon | Role-based color with interaction-state math (hover = half-step, active = two steps). Productive vs. Expressive type sets. 2x grid with 16-column system at large breakpoints. Token architecture that scales across products. |
| Adobe Spectrum | 11 grays per theme, each with a defined role. Major second type scale (1.125x). Platform-aware sizing (desktop vs. mobile as separate scales). Semantic token naming with 3-part structure. |

**Tier 2 — Professional Competence (selective adoption)**

| Platform | Core Lesson |
|---|---|
| FCP Euro | Best-in-class enthusiast auto parts UI. Manufacturer logos as trust anchors. Lifetime guarantee as persistent visual element. Badge system with clear hierarchy (OE > OEM > Aftermarket). Moderate density, well-managed. |
| Grainger | Corporate-professional industrial catalog. Dual navigation (search + browse). Content marketing integration. Weakness: CTA color = brand color, reducing functional clarity. |
| DigiKey | 17.6M products with parametric search. Color is purely informational. Manufacturer logos constrained to 155x30px — remarkable sizing discipline. Authorized distribution messaging counters counterfeit anxiety. |
| Atlassian | Token-based color with emphasis levels (subtlest to boldest). 8px spacing base. Three body font weights with strict usage rules. |

**Tier 3 — Cautionary (patterns to study, not replicate)**

| Platform | Lesson |
|---|---|
| RockAuto | Proves "ugly-trustworthy" works for power users. Not a replicable model, but the underlying insight matters: promotional noise destroys trust in this market. |
| Pelican Parts | Technical depth creates trust. Warm backgrounds differentiate. But dated execution undermines credibility for new visitors. |
| Toyota OEM | Corporate restraint is correct, but sterile execution crosses into "government form" territory. Vehicle selector UI demonstrates how formality can become friction. |
| Car Builder Solutions | Shopify-standard execution with dark theme. Review-wall trust model. Demonstrates how template reliance is visible to informed buyers. |

### 1.2 Reusable Patterns That Scale

These patterns appear across all high-trust platforms and should be adopted:

1. **Typography-first hierarchy.** The best systems (McMaster, Carbon) use font size and weight as primary organizational tools, with color as secondary reinforcement.
2. **8px spatial grid.** McMaster, Carbon, Atlassian, and Spectrum all converge on 8px as the base spatial unit. This is not optional.
3. **Role-based color with no decorative usage.** Every platform that achieves "authority" feel uses color to carry meaning, never for decoration.
4. **Two-weight discipline.** Regular + Semibold (or Medium) handles 90% of cases. Bold is reserved for price display and critical status indicators.
5. **Progressive density disclosure.** Category-level pages are spacious; product-detail pages are dense. The system breathes differently at different depths.
6. **Manufacturer identity as trust proxy.** FCP Euro and DigiKey both use brand logos as trust signals. The host platform stays visually neutral; the product brands carry credibility.
7. **Persistent trust strip.** FCP Euro, Grainger, and DigiKey all maintain a persistent trust bar (shipping, returns, warranty). This is industry standard for a reason.

### 1.3 Patterns That Must Be Rejected

| Pattern | Why It Fails |
|---|---|
| Hero carousels | Zero information density. McMaster proves they are unnecessary. Data shows carousel interaction rates below 1% after slide 1. |
| Promotional color gradients | Signal consumer retail, not industrial authority. No tier-1 reference platform uses gradients. |
| Badge proliferation (3+ per card) | FCP Euro's weakness. More than one badge per product card creates visual noise and dilutes the hierarchy of the badge system itself. |
| Dark theme for product catalogs | Car Builder Solutions demonstrates this: dark backgrounds reduce image contrast for product photography and increase reading fatigue for specification text. |
| Animated transitions between states | Motion attracts attention, which is a cost. In a catalog with hundreds of items, micro-animations compete with the user's scanning behavior. |
| Rounded corners > 8px | Excessive rounding signals "friendly consumer app." Industrial authority requires geometric precision. 4-6px radius maximum. |
| Shadow depth > 1 level | Multiple shadow depths create ambiguity about spatial hierarchy. One shadow value, applied consistently. |
| Inline star ratings on product cards | Star ratings are meaningful for consumer products with subjective quality. OEM parts are either correct or incorrect. Fit/no-fit replaces like/dislike. |

---

## 2. Visual Positioning Doctrine

### 2.1 What the UI Must Immediately Communicate

**Mechanical precision.** The interface itself must feel engineered, not designed. Spacing must be mathematically consistent. Alignment must be absolute. The visual system should suggest that the same rigor applied to the interface was applied to the parts catalog.

**Authority and scale.** The platform must feel like it contains thousands of products without showing them all at once. This is communicated through structured navigation, consistent component patterns, and confident whitespace — not through "Browse 600+ products!" messaging.

**Reliability under complexity.** When a user is on a product page with 15 specification rows, 3 compatibility notes, and a pricing block, the interface must remain calm. No element should compete for attention. The hierarchy must be self-evident without scanning.

### 2.2 What It Must Never Communicate

- **Template usage.** No Shopify defaults. No Bootstrap 5 card shadows. No generic icon libraries used without curation. If an informed buyer can identify the template, the platform has failed.
- **Cheapness.** No gradient buttons. No 2px border radius on oversized elements. No uppercase body text. No excessive exclamation marks in UI copy.
- **Over-decoration.** No decorative dividers. No ornamental icons. No background patterns. No floating shapes. If an element does not carry information or aid navigation, it does not exist.
- **Lifestyle branding.** No mood photography. No aspirational copy. No "experience the difference" language. The parts are mechanical objects; the UI should reflect their nature.

### 2.3 Emotional Calibration

| Axis | Left (preferred) | Right (avoided) |
|---|---|---|
| Tone | Calm | Exciting |
| Information | Clarity | Personality |
| Aesthetics | Restraint | Expressiveness |
| Density | Confident | Sparse |
| Typography | Neutral | Characterful |
| Color | Functional | Decorative |
| Layout | Predictable | Surprising |
| Motion | Static | Animated |

This system targets the intersection of **McMaster-Carr's information purity** and **FCP Euro's product merchandising** — technical precision with enough visual warmth to support product photography, but never enough to suggest lifestyle retail.

---

## 3. Typography System

### 3.1 Font Selection

**Primary typeface: Inter**

Rationale:
- Variable font with optical sizing (opsz 14–32), enabling automatic micro-adjustments for text vs. display contexts
- 147 language scripts including Latin, Cyrillic, Greek, Arabic — essential for UAE/GCC audience
- Tabular number feature (`tnum`) critical for price columns and specification tables
- Tall x-height optimized for screen legibility at 13-16px body sizes
- Disambiguation features (`ss02`, `cv08`, `cv05`, slashed zero) prevent misreading of OEM part numbers (O vs 0, I vs l vs 1)
- Used by Figma, GitHub, Linear, and Vercel's own documentation — proven at scale in technical interfaces
- 100-900 weight range with three master designs (100, 400, 900) ensuring quality at every interpolation point
- Open Font License — no licensing constraints

**Monospace companion: Inter's tabular features (preferred) or JetBrains Mono (fallback)**

Used exclusively for: OEM part numbers, SKU codes, engine codes, specification values.

**Font stack:**
```
--font-sans: 'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', ui-monospace, monospace;
```

**Rejected alternatives and reasons:**

| Font | Rejection Reason |
|---|---|
| Geist Sans | Vercel-ecosystem association. Fewer language scripts than Inter. No optical sizing axis. |
| IBM Plex Sans | Strong IBM brand association. Mathematical scale is rigid. Three-font-family system (Sans + Serif + Mono) is over-specified for this use case. |
| Roboto | Google Material association. Humanist proportions are too warm for industrial context. |
| Helvetica Neue | No variable font support. No tabular numbers feature. License cost. |
| System fonts only | Inconsistent rendering across devices undermines visual precision. Unacceptable for a system that claims mechanical rigor. |

### 3.2 Type Scale

The scale uses a **1.200 ratio (minor third)** — the same mathematical discipline used by IBM Carbon, adapted for e-commerce density requirements.

Base size: 15px (desktop) / 16px (mobile)

| Token | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 11px / 1.45 | 12px / 1.45 | 400-500 | Microcopy, timestamps, tertiary labels |
| `text-sm` | 13px / 1.5 | 14px / 1.5 | 400-500 | Secondary text, filter labels, metadata |
| `text-base` | 15px / 1.6 | 16px / 1.6 | 400 | Body text, descriptions, form inputs |
| `text-md` | 18px / 1.45 | 18px / 1.45 | 500-600 | Subheadings, card titles, section labels |
| `text-lg` | 21px / 1.35 | 21px / 1.35 | 600 | Page section headings |
| `text-xl` | 26px / 1.3 | 24px / 1.3 | 600 | Page titles |
| `text-2xl` | 31px / 1.2 | 28px / 1.25 | 600 | Hero headings, primary page titles |
| `text-3xl` | 37px / 1.15 | 32px / 1.2 | 600-700 | Landing page titles only |

**Line-height rationale:** Larger text gets tighter line-height (1.15-1.3) because heading text is read as a unit. Body text gets looser line-height (1.5-1.6) because paragraphs require inter-line scanning.

### 3.3 Weight Discipline

The system uses exactly three weights:

| Weight | Token | Permitted Uses | Forbidden Uses |
|---|---|---|---|
| Regular (400) | `font-normal` | Body text, descriptions, form inputs, table cells, secondary labels | Never for headings, CTAs, or prices |
| Medium (500) | `font-medium` | Navigation items, card titles, form labels, breadcrumbs, tertiary headings | Never for body paragraphs, never for primary headings |
| Semibold (600) | `font-semibold` | Page headings, section titles, prices, primary CTAs, critical status text | Never for body text, never for more than 2 consecutive lines |

**Bold (700) is restricted.** It is permitted only for:
- Primary page hero headings at `text-2xl` or larger
- Price display when the price is the primary focus of a component (e.g., PDP price block)
- "Out of Stock" status when it is the only status indicator visible

Bold at body text sizes creates visual aggression that undermines calm.

### 3.4 OpenType Feature Requirements

```css
font-feature-settings:
  'liga' 1,    /* Standard ligatures */
  'calt' 1,    /* Contextual alternates */
  'tnum' 1,    /* Tabular numbers — critical for price alignment */
  'zero' 1,    /* Slashed zero — prevents O/0 confusion in part numbers */
  'ss02' 1;    /* Disambiguation set — I/l/1 differentiation */
```

These features are non-negotiable for a platform that displays OEM part numbers. The difference between part number `1OI0` and `lO10` is a wrong-part shipment.

### 3.5 Typography Failure Cases

| Failure | Why It Fails | Prevention |
|---|---|---|
| Bold body text | Creates visual shouting. Undermines calm. | Lint rule: no `font-bold` below `text-md` |
| ALL CAPS body text | Reduces legibility by 10-15%. Feels hostile. | Uppercase permitted only for badges, overline labels, and button text at `text-xs` / `text-sm` |
| Centered body paragraphs | Ragged left edges destroy readability after 2 lines | Center alignment only for hero headings and single-line display text |
| More than 3 font sizes on one screen | Creates visual noise. Signals lack of system. | Maximum 4 scale levels per viewport (e.g., heading + subhead + body + micro) |
| Inconsistent number formatting | Prices misalign in grids. Specification columns wobble. | Tabular numbers (`tnum`) mandatory for all numeric content |
| Product names longer than 2 lines | Card layouts break. Visual rhythm destroyed. | `line-clamp-2` on all card-level product names. Full name on PDP only. |
| Italic for emphasis in UI | Inter's italic is a true italic with different letter shapes. Emphasis should use weight, not style. | Italic permitted only for: placeholder text, technical term definitions, legal/disclaimer copy |

### 3.6 Letter-Spacing Rules

| Context | Letter-spacing | Rationale |
|---|---|---|
| Uppercase labels and badges | +0.04em to +0.06em | Compensates for reduced inter-character whitespace in caps |
| Heading text at `text-xl`+ | -0.01em to -0.02em | Tightens large text for visual cohesion |
| Body text | 0 (normal) | Inter is designed for zero tracking at body sizes |
| Monospace/part numbers | 0 (normal) | Tabular alignment handles spacing |
| Price display | 0 (normal) | Tabular numbers handle alignment |

---

## 4. Color System

### 4.1 Design Principles

This color system follows four laws:

1. **Color must carry meaning.** If a color does not indicate status, hierarchy, or function, it does not belong.
2. **Neutral foundation, functional accents.** The interface is 90%+ neutral tones. Color appears sparingly and deliberately.
3. **Contrast first, brand second.** WCAG AA (4.5:1 for text) is the minimum. AAA (7:1) is the target for body text.
4. **One primary action color.** The entire system has exactly one color that means "primary interactive element." This color appears on primary buttons, active states, and links. Nothing else.

### 4.2 Neutral Foundation

The neutral palette provides the structural canvas. It is the most important palette in the system because it occupies 90% of viewport pixels.

| Token | Value | Role | Contrast vs White |
|---|---|---|---|
| `--neutral-950` | `#0C1220` | Deepest text, primary headings | 18.2:1 |
| `--neutral-900` | `#111827` | Primary body text | 16.4:1 |
| `--neutral-800` | `#1E293B` | Secondary headings, strong labels | 12.6:1 |
| `--neutral-700` | `#334155` | Tertiary text, active navigation | 8.2:1 |
| `--neutral-600` | `#475569` | Muted text, placeholders | 5.9:1 |
| `--neutral-500` | `#64748B` | Disabled text, captions | 4.3:1 |
| `--neutral-400` | `#94A3B8` | Placeholder text, decorative borders | 2.7:1 |
| `--neutral-300` | `#CBD5E1` | Dividers, inactive borders | 1.7:1 |
| `--neutral-200` | `#E2E8F0` | Card borders, input borders | 1.4:1 |
| `--neutral-100` | `#F1F5F9` | Alternate section backgrounds, filter panels | 1.1:1 |
| `--neutral-50` | `#F8FAFC` | Subtle surface differentiation | 1.05:1 |
| `--neutral-0` | `#FFFFFF` | Primary surface | 1:1 |

**Chromatic temperature:** The neutral scale carries a cool-slate undertone (blue-gray). This is intentional:
- Cool neutrals signal precision and professionalism (medical equipment, engineering tools)
- Warm neutrals signal comfort and hospitality (unacceptable for industrial context)
- Pure gray (zero saturation) feels dead on screen — slight chromatic bias prevents this

### 4.3 Functional Colors

Each functional color has exactly one semantic role. No color serves two meanings.

#### 4.3.1 Primary Action — Indigo-Blue

| Token | Value | Use |
|---|---|---|
| `--action-600` | `#4338CA` | Primary buttons, primary links, active tab indicators |
| `--action-700` | `#3730A3` | Hover state for primary action |
| `--action-800` | `#312E81` | Active/pressed state |
| `--action-100` | `#E0E7FF` | Selected state backgrounds (e.g., active filter chip) |
| `--action-50` | `#EEF2FF` | Hover backgrounds on selectable rows/cards |

**Why indigo-blue, not pure blue:** Pure blue (#0066CC or #2563EB range) is overused to the point of generic association with "link" and "button." Indigo-blue (#4338CA) provides:
- Stronger distinction from informational blue (used for notes/info callouts)
- Higher perceived authority (deeper, more serious tone)
- Better contrast ratios against white at the same perceived brightness
- No association with any specific platform or framework

**Why not red, orange, or green for primary action:**
- Red = error/danger in every mature design system. Using red for primary CTAs creates semantic collision.
- Orange = warning state. Same collision problem.
- Green = success/positive state. "Add to cart" being green works until you also need "In Stock" green — the two meanings compete.

#### 4.3.2 Status Colors

| Status | Token | Value | Exclusive Use |
|---|---|---|---|
| Success / In Stock | `--status-success-600` | `#059669` | "In Stock" indicator, successful form submission, order confirmed |
| Success background | `--status-success-50` | `#ECFDF5` | Success message background |
| Warning / Low Stock | `--status-warning-600` | `#D97706` | "Low Stock" indicator, form validation warnings, attention-needed states |
| Warning background | `--status-warning-50` | `#FFFBEB` | Warning message background |
| Error / Out of Stock | `--status-error-600` | `#DC2626` | "Out of Stock" indicator, form errors, destructive action confirmation |
| Error background | `--status-error-50` | `#FEF2F2` | Error message background |
| Sale / Price reduction | `--status-sale-600` | `#EA580C` | Sale badge, struck-through price color, price reduction indicator |

**WhatsApp — third-party brand color (special case):**

| Token | Value | Use |
|---|---|---|
| `--brand-whatsapp` | `#25D366` | WhatsApp FAB button only |
| `--brand-whatsapp-dark` | `#128C7E` | WhatsApp button hover only |

This green is never used for any other purpose. It is not a system color; it is a third-party brand constant.

#### 4.3.3 Informational Color

| Token | Value | Use |
|---|---|---|
| `--info-600` | `#0284C7` | Informational callouts, help text badges, tooltip borders |
| `--info-50` | `#F0F9FF` | Informational banner backgrounds |

### 4.4 Color Application Rules

**Rule 1: Maximum 2 chromatic colors per viewport.** At any screen position, the user should see at most 2 non-neutral colors. A product card may show a Sale badge (orange) and an "In Stock" indicator (green). Adding a third color (e.g., a blue "New" badge) violates this rule.

**Rule 2: Neutral is the default. Color is the exception.** Borders are neutral. Backgrounds are neutral. Text is neutral. Only elements that carry semantic meaning receive color.

**Rule 3: Color intensity matches importance.**
- `600` values: primary states, buttons, badges (high importance)
- `100` values: background tints, selected states (medium importance)
- `50` values: hover states, subtle indicators (low importance)

**Rule 4: No color-only communication.** Every color-coded element must also communicate its meaning through text, icon shape, or position. "In Stock" is green text reading "In stock" — not a green dot alone.

**Rule 5: Hover and active states follow mathematical steps.**
- Hover = one step darker (600 → 700)
- Active = two steps darker (600 → 800)
- Disabled = neutral-400 with 50% opacity

This matches IBM Carbon's interaction-state math and ensures predictable state transitions.

### 4.5 Color Misuse Prevention

| Misuse | Correction |
|---|---|
| Using action color for non-interactive elements | Action color is reserved for elements that respond to user input |
| Using success green for promotional "GO" messaging | Success green means a system state (in stock, confirmed), never marketing emphasis |
| Using red for brand emphasis or visual "pop" | Red means error or out-of-stock. No exceptions. |
| Coloring section headers for visual variety | Section headers are neutral-900. Color variation between sections destroys hierarchy consistency. |
| Using background color to signal section changes | Alternate surfaces use neutral-50 / neutral-100 only. No colored section backgrounds except for system banners (error, success, info). |
| Applying opacity to create color variants | Use the defined token steps. Opacity creates inconsistent contrast ratios across surfaces. |
| Using WhatsApp green for success/in-stock | WhatsApp green is a brand constant. System success green is a different value serving a different semantic role. |

---

## 5. Layout, Grid, and Rhythm Laws

### 5.1 Grid System

**Base unit: 8px.** Every spatial value in the system is a multiple of 8. No exceptions.

This aligns with McMaster-Carr, IBM Carbon, Atlassian, and Adobe Spectrum. The convergence of four independent world-class design systems on 8px is not coincidence — it maps cleanly to common screen densities, halves/doubles cleanly, and produces visually harmonious relationships.

**Column system:**

| Breakpoint | Token | Width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | `--bp-sm` | 0-639px | 4 | 16px | 16px |
| Tablet | `--bp-md` | 640-1023px | 8 | 24px | 24px |
| Desktop | `--bp-lg` | 1024-1279px | 12 | 24px | 32px |
| Wide | `--bp-xl` | 1280-1535px | 12 | 32px | Auto (centered) |
| Ultrawide | `--bp-2xl` | 1536px+ | 12 | 32px | Auto (centered) |

**Maximum content width: 1280px.**

Rationale:
- McMaster-Carr uses ~1200-1400px. FCP Euro uses ~1280px. Carbon's max breakpoint is 1584px but content rarely fills it.
- 1280px on a 1920px monitor provides ~320px of margin on each side — enough peripheral calm to prevent the interface from feeling like a spreadsheet.
- At 15px body text with 1.6 line-height, a 1280px container with proper column splits ensures body text never exceeds ~80 characters per line.

**Narrow content width: 720px.** For long-form text pages (About, FAQ, Returns, Privacy). Human reading cognition degrades above ~75 characters per line. At 15px, 720px produces approximately 65-70 characters per line.

### 5.2 Spacing Scale

All spacing values are multiples of the 8px base unit:

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Dense inline spacing (icon-to-text gap inside buttons) |
| `--space-2` | 8px | Tight component internal padding, gap between related items |
| `--space-3` | 12px | Standard inline padding, small card padding |
| `--space-4` | 16px | Default component padding, form field spacing |
| `--space-5` | 20px | Card internal padding on mobile |
| `--space-6` | 24px | Card internal padding on desktop, gap between cards in grid |
| `--space-8` | 32px | Section internal padding (small sections) |
| `--space-10` | 40px | Section internal padding (standard) |
| `--space-12` | 48px | Section gap on mobile |
| `--space-16` | 64px | Section gap on desktop |
| `--space-20` | 80px | Major page section separation |
| `--space-24` | 96px | Hero section vertical padding |

**The 4px exception:** `--space-1` (4px) is the only non-8px value. It exists for micro-spacing inside dense components. It is not permitted for layout-level spacing.

### 5.3 Vertical Rhythm

**Section separation follows a two-tier model:**

1. **Within-section spacing:** Components inside a section are separated by `--space-4` to `--space-8` (16-32px). This creates visual grouping.
2. **Between-section spacing:** Sections are separated by `--space-16` (64px) on desktop and `--space-12` (48px) on mobile. This creates clear content boundaries.

**Surface alternation for section differentiation:** Consecutive sections alternate between `--neutral-0` (white) and `--neutral-50` (off-white) backgrounds. This is the only permitted method of visual section separation. No colored backgrounds. No decorative dividers. No gradient transitions.

### 5.4 Alignment Absolutes

**What must always align:**

| Element | Alignment Rule |
|---|---|
| Product card edges in a grid | Left edges form a perfect vertical line. No staggered or masonry layouts. |
| Price text across cards in the same row | Prices must appear at the same vertical position across horizontally-adjacent cards. Requires consistent card height management. |
| Section headings | Left-aligned to the container edge. Never centered (except hero). Never indented. |
| Table columns | Right-aligned for numeric data. Left-aligned for text data. |
| Form labels and inputs | Labels above inputs (stacked). Never inline for multi-field forms. |
| Navigation items | Baseline-aligned within horizontal navigation bars. |
| Badge position on product cards | Top-left corner. Consistent X/Y offset. Never top-right, never bottom. |

**What must never float:**

| Element | Constraint |
|---|---|
| CTAs in cards | Pinned to card bottom via flexbox. Never floating at varying heights across a row. |
| Prices in cards | Must share vertical alignment across grid siblings. |
| Product images | Fixed aspect ratio (4:3 or 1:1). Never variable-height images that break grid alignment. |
| Sidebar filters | Aligned to the top of the product grid. Scroll independently only via `position: sticky`. |

### 5.5 Product Image Aspect Ratios

| Context | Ratio | Rationale |
|---|---|---|
| Product card thumbnail | 4:3 | Landscape orientation accommodates engine parts that are typically wider than tall. Provides consistent card height. |
| PDP primary image | 1:1 | Square format provides maximum image area. Standard for e-commerce detail views. |
| Category/vehicle tile | 16:9 | Landscape banner proportion for navigation tiles. |
| Trust/brand logo | Constrained to max 160px x 32px | Prevents logo size competition. Following DigiKey's 155x30px constraint model. |

All product images must use `object-fit: contain` with a neutral background (neutral-50 or white). Never crop. Never stretch. Parts have irregular shapes; forcing them into a fill creates visual dishonesty.

---

## 6. Component Visual System

### 6.1 Design Principles for Components

1. **Each component has exactly one visual purpose.** A badge communicates status. A button triggers action. A card contains a sellable entity. No component serves mixed roles.
2. **Component variants are additive, not multiplicative.** A button has 3 variants (primary, secondary, ghost). Not 9 (3 variants x 3 sizes) unless each combination serves a distinct, documentable purpose.
3. **Visual consistency over expressive variety.** All cards look like cards. All buttons look like buttons. Consistency across 600+ product pages is worth more than novelty on any single page.

### 6.2 Buttons

Three variants. No gradients. No shadows. No icons by default (icons are optional additions).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--action-600` | `--neutral-0` (white) | none | One per viewport section. "Add to cart", primary CTA. |
| Secondary | transparent | `--neutral-800` | 1px `--neutral-300` | Supporting actions. "View details", "Clear filters". |
| Ghost | transparent | `--action-600` | none | Tertiary actions. "Show more", inline text actions. |

**Button sizing:**

| Size | Height | Padding (H) | Font | Radius | Use |
|---|---|---|---|---|---|
| Small | 32px | 12px | `text-sm` / 500 | 4px | Dense contexts: table rows, filter chips, inline actions |
| Default | 40px | 16px | `text-base` / 500 | 6px | Standard forms, card CTAs, page-level actions |
| Large | 48px | 24px | `text-base` / 600 | 6px | Hero CTAs, full-width mobile actions, checkout |

**Button states:**

| State | Change | Duration |
|---|---|---|
| Hover | Background one step darker (600 → 700) | 150ms ease |
| Active | Background two steps darker (600 → 800) | 0ms (instant) |
| Focus | 2px ring in `--action-600` with 3px offset | 0ms (instant) |
| Disabled | Opacity 0.4. Cursor not-allowed. | -- |
| Loading | Text replaced by spinner (same dimensions). No layout shift. | -- |

**Button rules:**
- Full uppercase text only at `text-sm` or smaller.
- Sentence case for all default and large buttons ("Add to cart", not "ADD TO CART" or "Add To Cart").
- Maximum label length: 3 words for primary, 4 words for secondary.
- Icon-only buttons require `aria-label` and minimum 40px touch target.

### 6.3 Cards

**Product card (PLP context):**

| Zone | Content | Styling |
|---|---|---|
| Image zone | Product photo, 4:3 ratio, `object-fit: contain`, neutral-50 bg | No border on image. Card border contains everything. |
| Badge zone | Maximum 1 badge (priority: Sale > Out of Stock > New) | Top-left, 8px inset from card edge. |
| Category overline | Category name | `text-xs`, uppercase, `--neutral-500`, letter-spacing +0.05em |
| Product name | Truncated to 2 lines | `text-sm`, `font-medium`, `--neutral-900`, `line-clamp-2` |
| Price zone | Price or "Request price" | `text-lg`, `font-semibold`, `--neutral-900` for price. `text-sm`, `--neutral-500` for request. |
| CTA zone | Button pinned to bottom | Primary "Add to cart" if purchasable. Secondary "View details" if not. |

Card specification:
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Shadow: `0 1px 3px rgba(0,0,0,0.06)` — one value only
- Hover: shadow transitions to `0 2px 8px rgba(0,0,0,0.1)` over 200ms
- Internal padding: `--space-4` (16px) below image zone

**Information card (non-product context):**

Used for: trust strip items, feature callouts, contact methods, vehicle/model selection tiles.

- Background: `--neutral-0` or `--neutral-50`
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Padding: `--space-6` (24px)
- No shadow (differentiates from product cards which are "interactive objects")
- Hover (if interactive): border transitions to `--neutral-400`

### 6.4 Badges

Badges communicate a single status. One badge per product. Maximum 2 badges visible in any single viewport quadrant.

| Badge | Background | Text | Use |
|---|---|---|---|
| Sale | `--status-sale-600` | white | Product with validated price reduction |
| Out of Stock | `--neutral-200` | `--neutral-600` | Product not currently available |
| Low Stock | `--status-warning-50` | `--status-warning-600` | 5 or fewer units |
| New | `--neutral-900` | white | Products added in the last 30 days |
| OEM | `--action-100` | `--action-600` | Genuine OEM verification marker |

Badge specification:
- Font: `text-xs`, `font-medium`, uppercase, letter-spacing +0.05em
- Padding: 4px 8px
- Radius: 4px
- No icons inside badges. Text only.

**Badge priority (when multiple apply):** Sale > Out of Stock > Low Stock > New > OEM. Only the highest-priority badge is shown.

### 6.5 Tables

Used for: specification tables on PDP, order history, comparison views.

| Element | Style |
|---|---|
| Header row | Background: `--neutral-100`. Text: `text-xs`, `font-semibold`, uppercase, `--neutral-600` |
| Body rows | Alternating `--neutral-0` / `--neutral-50`. Text: `text-sm`, `font-normal`, `--neutral-800` |
| Cell padding | 12px vertical, 16px horizontal |
| Borders | Horizontal only: 1px solid `--neutral-200`. No vertical borders. |
| Numeric cells | Right-aligned, tabular numbers enabled |
| Text cells | Left-aligned |

**Table rules:**
- No rounded corners on tables.
- No hover row highlighting unless the table is interactive (clickable rows).
- Maximum 6 columns on desktop. More than 6 requires a different pattern.
- On mobile: tables of 4+ columns become stacked key-value pairs. Never horizontal-scroll tables.

### 6.6 Filters

**Filter sidebar specification:**

| Element | Style |
|---|---|
| Container | Background: `--neutral-100`. Border-radius: 6px. Padding: `--space-5` (20px). Border: 1px solid `--neutral-200`. |
| Section label | `text-xs`, `font-semibold`, uppercase, `--neutral-600`, letter-spacing +0.05em |
| Section spacing | `--space-6` (24px) between filter sections |
| Filter option (text) | `text-sm`, `font-normal`, `--neutral-800` |
| Filter option (active) | Background: `--action-100`. Text: `--action-600`. `font-medium`. |
| Checkbox | 16px x 16px. Border: 1px `--neutral-400`. Checked: `--action-600` fill with white checkmark. |
| Count badge | `text-xs`, `--neutral-500`, inline after option text |
| Clear action | `text-xs`, `--status-sale-600`, `font-medium`. Right-aligned to section label. |

**Filter rules:**
- Maximum 6 filter sections visible without scrolling.
- Collapsible sections for sections beyond the 6th.
- "Clear all" action visible whenever any filter is active.
- Active filter count displayed in the filter header (mobile toggle).

### 6.7 Status Indicators

| Status | Visual | Text | Color |
|---|---|---|---|
| In Stock | 8px filled circle + text | "In stock" | `--status-success-600` |
| Low Stock | 8px filled circle + text | "Low stock -- X remaining" | `--status-warning-600` |
| Out of Stock | 8px filled circle + text | "Out of stock" | `--status-error-600` |
| On Request | 8px open circle (border only) + text | "Price on request" | `--neutral-500` |

Specification:
- Circle and text baseline-aligned
- 8px gap between circle and text
- Text: `text-sm`, `font-medium`
- Never use status indicators without text labels

---

## 7. Mobile Visual Discipline

### 7.1 Density Rules

**Maximum items per initial viewport (above the fold):**

| Page | Maximum Items | Rationale |
|---|---|---|
| Homepage hero | 1 primary CTA, 1 secondary CTA | Focus determines conversion. |
| Product grid | 4 products (2x2) | More than 4 makes the grid feel like a feed, not a catalog. |
| Filter panel | 4 filter sections visible | Remaining behind accordion. |
| PDP above fold | Image + name + price + primary CTA | All other content below fold by design. |
| Navigation | 5 primary categories visible | Remaining behind "All categories" link. |

**Text truncation logic:**

| Element | Mobile Rule |
|---|---|
| Product name | `line-clamp-2` |
| Category name | `line-clamp-1` |
| Product description | Hidden on card level. Visible only on PDP. |
| OEM part number | Full display — never truncate technical identifiers |
| Price | Full display — never truncate or abbreviate currency |
| Breadcrumb | Parent > Current only. |

### 7.2 Thumb Safety

**Tap target discipline:**

| Element | Minimum Size | Minimum Spacing |
|---|---|---|
| Buttons | 44px height | 8px between adjacent buttons |
| Navigation links | 44px touch area | 4px visual separation |
| Filter options | 44px touch area | 0px visual (padding creates touch area) |
| Card (as tap target) | Full card is tappable | 12px gap between cards |
| Close/dismiss buttons | 44px x 44px touch area | 8px from container edge |
| Checkbox/radio | 44px x 44px touch area | 8px between options |

**Edge avoidance:**
- No interactive elements within 16px of screen left/right edges
- Bottom sticky CTAs must respect `env(safe-area-inset-bottom)`
- Swipe-gesture-dependent interactions are forbidden

### 7.3 Visual Calm Under Scroll

**Sticky element restraint:**

| Permitted Sticky Elements | Max Height | Condition |
|---|---|---|
| Header (simplified) | 56px | Collapses from full header on scroll |
| Bottom CTA bar (PDP only) | 64px (including safe area) | Only when "Add to cart" scrolls out of view |
| Filter toggle (PLP only) | 44px | Only when scrolled past organic filter entry point |

**Maximum combined sticky height: 120px.** Preserves 75%+ of viewport for scrollable content on a 640px-tall screen.

**Forbidden sticky elements:** Trust strip, search bar, "Back to top" buttons, persistent cookie/consent banners.

**Motion minimization:**
- No parallax scrolling
- No entrance animations on scroll (fade-in, slide-up)
- No loading skeleton animations that loop indefinitely
- Permitted motion: button state transitions (150ms), card hover shadow (200ms), modal open/close (200ms ease-out)
- Maximum individual animation duration: 300ms

### 7.4 Mobile Component Adaptations

| Component | Desktop | Mobile Adaptation |
|---|---|---|
| Product grid | 3-4 columns | 2 columns. Card padding reduces to `--space-3`. |
| Filter sidebar | Persistent left column | Overlay panel, full width, z-index above content. |
| Product card CTA | Text button | Can reduce to icon-only cart button (44px minimum). |
| Specification table | Horizontal columns | Stacked key-value pairs. |
| Breadcrumb | Full path | Parent > Current only. |
| Navigation | Horizontal category bar | Hamburger with category tree. Slide-in from left, 200ms. |
| Trust strip | 4-item horizontal bar | 2x2 grid or horizontal scroll (no auto-scroll). |
| Footer | 4-column grid | Single column accordion (collapsed by default). |

---

## 8. Anti-Pattern Registry

### Critical (must never ship)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| C-01 | More than 1 badge per product card | Dilutes status hierarchy. |
| C-02 | Color-only communication (no text/icon pairing) | Accessibility failure for 8% of male users with color vision deficiency. |
| C-03 | Price displayed as "0.00" or "0 AED" | Signals data error. Destroys trust. Show "Price on request" instead. |
| C-04 | Bold weight on body text paragraphs | Visual aggression. Undermines calm authority. |
| C-05 | Interactive element below 44px touch target on mobile | WCAG 2.5.8 failure. Causes mis-taps. |
| C-06 | More than 120px of combined sticky elements on mobile | Consumes >25% of viewport. Content claustrophobia. |
| C-07 | Sale badge on product with no genuine price reduction | `sale_price` must be > 0 AND < `regular_price` AND `regular_price` > 0. Anything else is visual fraud. |

### Major (resolve within sprint)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| M-01 | More than 3 font sizes in a single viewport | Visual noise. Signals template origin. |
| M-02 | Centered body text beyond 1 line | Ragged left edges destroy readability. |
| M-03 | Inconsistent card heights in a product grid row | Breaks alignment. Creates visual wobble. |
| M-04 | Shadow with more than 1 definition (multi-layered) | Ambiguous depth hierarchy. |
| M-05 | Using system success-green for WhatsApp buttons | Semantic collision between system status and brand identity. |
| M-06 | Inline star ratings on automotive parts | OEM parts are correct-fit or wrong-fit, not subjectively rated. |
| M-07 | Auto-playing carousels | <1% engagement after slide 1. Motion competes with scanning. |
| M-08 | Decorative dividers | Information should be separated by space, not decoration. |

### Minor (track for refinement)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| m-01 | Using border-radius > 6px on cards/buttons | Exceeds industrial precision tolerance. |
| m-02 | Title Case on buttons ("Add To Cart") | Sentence case is correct. Title case signals template default. |
| m-03 | Generic placeholder images for products | Low-effort appearance destroys product credibility. |
| m-04 | Footer with more than 4 columns on desktop | Column proliferation signals content governance failure. |
| m-05 | Newsletter popup on first visit | Zero precedent in tier-1 industrial platforms. |
| m-06 | Opacity for disabled states below 0.4 | Text becomes unreadable. |

---

## Appendix A: Token Reference

```
/* Surfaces */
--surface-primary:     var(--neutral-0);
--surface-secondary:   var(--neutral-50);
--surface-tertiary:    var(--neutral-100);
--surface-card:        var(--neutral-0);
--surface-overlay:     rgba(12, 18, 32, 0.5);

/* Text */
--text-primary:        var(--neutral-900);
--text-secondary:      var(--neutral-600);
--text-tertiary:       var(--neutral-500);
--text-inverse:        var(--neutral-0);
--text-disabled:       var(--neutral-400);

/* Borders */
--border-default:      var(--neutral-200);
--border-strong:       var(--neutral-400);
--border-focus:        var(--action-600);
--border-error:        var(--status-error-600);

/* Interactive */
--interactive-primary:        var(--action-600);
--interactive-primary-hover:  var(--action-700);
--interactive-primary-active: var(--action-800);

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0,0,0,0.04);
--shadow-md:  0 1px 3px rgba(0,0,0,0.06);
--shadow-lg:  0 2px 8px rgba(0,0,0,0.1);

/* Spacing */
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 
```


## License: unknown
https://github.com/tomhendra/tomhendra.dev/blob/b3be6f584522afffc665dd33f41ecbc07a98671b/app/styles/shared/sizes.css

```
File creation is disabled. Here is the complete specification:

---

# UI Visual System Specification v3.0

**Classification:** Master UI Specification — Greenfield Design  
**Platform:** High-trust automotive / industrial e-commerce  
**Horizon:** 2025–2027  
**Status:** Normative  
**Last revised:** 2026-02-10  

---

## Executive Summary

This document defines the complete visual system for a precision-class automotive parts e-commerce platform. It is designed from first principles, anchored to zero legacy decisions, and informed by deep analysis of the highest-performing visual systems in industrial e-commerce (McMaster-Carr, DigiKey, FCP Euro), enterprise design systems (IBM Carbon, Adobe Spectrum, Atlassian), and OEM automotive catalogs (Toyota Parts, Grainger).

The system is built on three invariants:

1. **Restraint over expression.** Every visual element must earn its presence. No decorative color, no ornamental typography, no gratuitous motion.
2. **Information density without chaos.** The platform must present thousands of technical products with absolute clarity. Visual calm under data load is the primary design constraint.
3. **Authority through precision.** Trust is communicated through spatial consistency, typographic discipline, and functional color — never through promotional language or trend-following aesthetics.

This is not a brand guideline. It is a structural specification for an interface that must remain credible under audit in five years.

---

## 1. Visual Intelligence Summary

### 1.1 Research Synthesis

Analysis of 13 platforms across automotive parts, industrial catalogs, and enterprise design systems reveals three tiers of visual maturity:

**Tier 1 — Structural Excellence (reference-grade)**

| Platform | Core Lesson |
|---|---|
| McMaster-Carr | Typography IS the entire design system. Two font weights, one accent color, zero promotional elements. Visual calm under 85,000+ SKU density. 8px spacing grid with mathematical precision. The gold standard for information-dense commerce. |
| IBM Carbon | Role-based color with interaction-state math (hover = half-step, active = two steps). Productive vs. Expressive type sets. 2x grid with 16-column system at large breakpoints. Token architecture that scales across products. |
| Adobe Spectrum | 11 grays per theme, each with a defined role. Major second type scale (1.125x). Platform-aware sizing (desktop vs. mobile as separate scales). Semantic token naming with 3-part structure. |

**Tier 2 — Professional Competence (selective adoption)**

| Platform | Core Lesson |
|---|---|
| FCP Euro | Best-in-class enthusiast auto parts UI. Manufacturer logos as trust anchors. Lifetime guarantee as persistent visual element. Badge system with clear hierarchy (OE > OEM > Aftermarket). Moderate density, well-managed. |
| Grainger | Corporate-professional industrial catalog. Dual navigation (search + browse). Content marketing integration. Weakness: CTA color = brand color, reducing functional clarity. |
| DigiKey | 17.6M products with parametric search. Color is purely informational. Manufacturer logos constrained to 155x30px — remarkable sizing discipline. Authorized distribution messaging counters counterfeit anxiety. |
| Atlassian | Token-based color with emphasis levels (subtlest to boldest). 8px spacing base. Three body font weights with strict usage rules. |

**Tier 3 — Cautionary (patterns to study, not replicate)**

| Platform | Lesson |
|---|---|
| RockAuto | Proves "ugly-trustworthy" works for power users. Not a replicable model, but the underlying insight matters: promotional noise destroys trust in this market. |
| Pelican Parts | Technical depth creates trust. Warm backgrounds differentiate. But dated execution undermines credibility for new visitors. |
| Toyota OEM | Corporate restraint is correct, but sterile execution crosses into "government form" territory. Vehicle selector UI demonstrates how formality can become friction. |
| Car Builder Solutions | Shopify-standard execution with dark theme. Review-wall trust model. Demonstrates how template reliance is visible to informed buyers. |

### 1.2 Reusable Patterns That Scale

These patterns appear across all high-trust platforms and should be adopted:

1. **Typography-first hierarchy.** The best systems (McMaster, Carbon) use font size and weight as primary organizational tools, with color as secondary reinforcement.
2. **8px spatial grid.** McMaster, Carbon, Atlassian, and Spectrum all converge on 8px as the base spatial unit. This is not optional.
3. **Role-based color with no decorative usage.** Every platform that achieves "authority" feel uses color to carry meaning, never for decoration.
4. **Two-weight discipline.** Regular + Semibold (or Medium) handles 90% of cases. Bold is reserved for price display and critical status indicators.
5. **Progressive density disclosure.** Category-level pages are spacious; product-detail pages are dense. The system breathes differently at different depths.
6. **Manufacturer identity as trust proxy.** FCP Euro and DigiKey both use brand logos as trust signals. The host platform stays visually neutral; the product brands carry credibility.
7. **Persistent trust strip.** FCP Euro, Grainger, and DigiKey all maintain a persistent trust bar (shipping, returns, warranty). This is industry standard for a reason.

### 1.3 Patterns That Must Be Rejected

| Pattern | Why It Fails |
|---|---|
| Hero carousels | Zero information density. McMaster proves they are unnecessary. Data shows carousel interaction rates below 1% after slide 1. |
| Promotional color gradients | Signal consumer retail, not industrial authority. No tier-1 reference platform uses gradients. |
| Badge proliferation (3+ per card) | FCP Euro's weakness. More than one badge per product card creates visual noise and dilutes the hierarchy of the badge system itself. |
| Dark theme for product catalogs | Car Builder Solutions demonstrates this: dark backgrounds reduce image contrast for product photography and increase reading fatigue for specification text. |
| Animated transitions between states | Motion attracts attention, which is a cost. In a catalog with hundreds of items, micro-animations compete with the user's scanning behavior. |
| Rounded corners > 8px | Excessive rounding signals "friendly consumer app." Industrial authority requires geometric precision. 4-6px radius maximum. |
| Shadow depth > 1 level | Multiple shadow depths create ambiguity about spatial hierarchy. One shadow value, applied consistently. |
| Inline star ratings on product cards | Star ratings are meaningful for consumer products with subjective quality. OEM parts are either correct or incorrect. Fit/no-fit replaces like/dislike. |

---

## 2. Visual Positioning Doctrine

### 2.1 What the UI Must Immediately Communicate

**Mechanical precision.** The interface itself must feel engineered, not designed. Spacing must be mathematically consistent. Alignment must be absolute. The visual system should suggest that the same rigor applied to the interface was applied to the parts catalog.

**Authority and scale.** The platform must feel like it contains thousands of products without showing them all at once. This is communicated through structured navigation, consistent component patterns, and confident whitespace — not through "Browse 600+ products!" messaging.

**Reliability under complexity.** When a user is on a product page with 15 specification rows, 3 compatibility notes, and a pricing block, the interface must remain calm. No element should compete for attention. The hierarchy must be self-evident without scanning.

### 2.2 What It Must Never Communicate

- **Template usage.** No Shopify defaults. No Bootstrap 5 card shadows. No generic icon libraries used without curation. If an informed buyer can identify the template, the platform has failed.
- **Cheapness.** No gradient buttons. No 2px border radius on oversized elements. No uppercase body text. No excessive exclamation marks in UI copy.
- **Over-decoration.** No decorative dividers. No ornamental icons. No background patterns. No floating shapes. If an element does not carry information or aid navigation, it does not exist.
- **Lifestyle branding.** No mood photography. No aspirational copy. No "experience the difference" language. The parts are mechanical objects; the UI should reflect their nature.

### 2.3 Emotional Calibration

| Axis | Left (preferred) | Right (avoided) |
|---|---|---|
| Tone | Calm | Exciting |
| Information | Clarity | Personality |
| Aesthetics | Restraint | Expressiveness |
| Density | Confident | Sparse |
| Typography | Neutral | Characterful |
| Color | Functional | Decorative |
| Layout | Predictable | Surprising |
| Motion | Static | Animated |

This system targets the intersection of **McMaster-Carr's information purity** and **FCP Euro's product merchandising** — technical precision with enough visual warmth to support product photography, but never enough to suggest lifestyle retail.

---

## 3. Typography System

### 3.1 Font Selection

**Primary typeface: Inter**

Rationale:
- Variable font with optical sizing (opsz 14–32), enabling automatic micro-adjustments for text vs. display contexts
- 147 language scripts including Latin, Cyrillic, Greek, Arabic — essential for UAE/GCC audience
- Tabular number feature (`tnum`) critical for price columns and specification tables
- Tall x-height optimized for screen legibility at 13-16px body sizes
- Disambiguation features (`ss02`, `cv08`, `cv05`, slashed zero) prevent misreading of OEM part numbers (O vs 0, I vs l vs 1)
- Used by Figma, GitHub, Linear, and Vercel's own documentation — proven at scale in technical interfaces
- 100-900 weight range with three master designs (100, 400, 900) ensuring quality at every interpolation point
- Open Font License — no licensing constraints

**Monospace companion: Inter's tabular features (preferred) or JetBrains Mono (fallback)**

Used exclusively for: OEM part numbers, SKU codes, engine codes, specification values.

**Font stack:**
```
--font-sans: 'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', ui-monospace, monospace;
```

**Rejected alternatives and reasons:**

| Font | Rejection Reason |
|---|---|
| Geist Sans | Vercel-ecosystem association. Fewer language scripts than Inter. No optical sizing axis. |
| IBM Plex Sans | Strong IBM brand association. Mathematical scale is rigid. Three-font-family system (Sans + Serif + Mono) is over-specified for this use case. |
| Roboto | Google Material association. Humanist proportions are too warm for industrial context. |
| Helvetica Neue | No variable font support. No tabular numbers feature. License cost. |
| System fonts only | Inconsistent rendering across devices undermines visual precision. Unacceptable for a system that claims mechanical rigor. |

### 3.2 Type Scale

The scale uses a **1.200 ratio (minor third)** — the same mathematical discipline used by IBM Carbon, adapted for e-commerce density requirements.

Base size: 15px (desktop) / 16px (mobile)

| Token | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 11px / 1.45 | 12px / 1.45 | 400-500 | Microcopy, timestamps, tertiary labels |
| `text-sm` | 13px / 1.5 | 14px / 1.5 | 400-500 | Secondary text, filter labels, metadata |
| `text-base` | 15px / 1.6 | 16px / 1.6 | 400 | Body text, descriptions, form inputs |
| `text-md` | 18px / 1.45 | 18px / 1.45 | 500-600 | Subheadings, card titles, section labels |
| `text-lg` | 21px / 1.35 | 21px / 1.35 | 600 | Page section headings |
| `text-xl` | 26px / 1.3 | 24px / 1.3 | 600 | Page titles |
| `text-2xl` | 31px / 1.2 | 28px / 1.25 | 600 | Hero headings, primary page titles |
| `text-3xl` | 37px / 1.15 | 32px / 1.2 | 600-700 | Landing page titles only |

**Line-height rationale:** Larger text gets tighter line-height (1.15-1.3) because heading text is read as a unit. Body text gets looser line-height (1.5-1.6) because paragraphs require inter-line scanning.

### 3.3 Weight Discipline

The system uses exactly three weights:

| Weight | Token | Permitted Uses | Forbidden Uses |
|---|---|---|---|
| Regular (400) | `font-normal` | Body text, descriptions, form inputs, table cells, secondary labels | Never for headings, CTAs, or prices |
| Medium (500) | `font-medium` | Navigation items, card titles, form labels, breadcrumbs, tertiary headings | Never for body paragraphs, never for primary headings |
| Semibold (600) | `font-semibold` | Page headings, section titles, prices, primary CTAs, critical status text | Never for body text, never for more than 2 consecutive lines |

**Bold (700) is restricted.** It is permitted only for:
- Primary page hero headings at `text-2xl` or larger
- Price display when the price is the primary focus of a component (e.g., PDP price block)
- "Out of Stock" status when it is the only status indicator visible

Bold at body text sizes creates visual aggression that undermines calm.

### 3.4 OpenType Feature Requirements

```css
font-feature-settings:
  'liga' 1,    /* Standard ligatures */
  'calt' 1,    /* Contextual alternates */
  'tnum' 1,    /* Tabular numbers — critical for price alignment */
  'zero' 1,    /* Slashed zero — prevents O/0 confusion in part numbers */
  'ss02' 1;    /* Disambiguation set — I/l/1 differentiation */
```

These features are non-negotiable for a platform that displays OEM part numbers. The difference between part number `1OI0` and `lO10` is a wrong-part shipment.

### 3.5 Typography Failure Cases

| Failure | Why It Fails | Prevention |
|---|---|---|
| Bold body text | Creates visual shouting. Undermines calm. | Lint rule: no `font-bold` below `text-md` |
| ALL CAPS body text | Reduces legibility by 10-15%. Feels hostile. | Uppercase permitted only for badges, overline labels, and button text at `text-xs` / `text-sm` |
| Centered body paragraphs | Ragged left edges destroy readability after 2 lines | Center alignment only for hero headings and single-line display text |
| More than 3 font sizes on one screen | Creates visual noise. Signals lack of system. | Maximum 4 scale levels per viewport (e.g., heading + subhead + body + micro) |
| Inconsistent number formatting | Prices misalign in grids. Specification columns wobble. | Tabular numbers (`tnum`) mandatory for all numeric content |
| Product names longer than 2 lines | Card layouts break. Visual rhythm destroyed. | `line-clamp-2` on all card-level product names. Full name on PDP only. |
| Italic for emphasis in UI | Inter's italic is a true italic with different letter shapes. Emphasis should use weight, not style. | Italic permitted only for: placeholder text, technical term definitions, legal/disclaimer copy |

### 3.6 Letter-Spacing Rules

| Context | Letter-spacing | Rationale |
|---|---|---|
| Uppercase labels and badges | +0.04em to +0.06em | Compensates for reduced inter-character whitespace in caps |
| Heading text at `text-xl`+ | -0.01em to -0.02em | Tightens large text for visual cohesion |
| Body text | 0 (normal) | Inter is designed for zero tracking at body sizes |
| Monospace/part numbers | 0 (normal) | Tabular alignment handles spacing |
| Price display | 0 (normal) | Tabular numbers handle alignment |

---

## 4. Color System

### 4.1 Design Principles

This color system follows four laws:

1. **Color must carry meaning.** If a color does not indicate status, hierarchy, or function, it does not belong.
2. **Neutral foundation, functional accents.** The interface is 90%+ neutral tones. Color appears sparingly and deliberately.
3. **Contrast first, brand second.** WCAG AA (4.5:1 for text) is the minimum. AAA (7:1) is the target for body text.
4. **One primary action color.** The entire system has exactly one color that means "primary interactive element." This color appears on primary buttons, active states, and links. Nothing else.

### 4.2 Neutral Foundation

The neutral palette provides the structural canvas. It is the most important palette in the system because it occupies 90% of viewport pixels.

| Token | Value | Role | Contrast vs White |
|---|---|---|---|
| `--neutral-950` | `#0C1220` | Deepest text, primary headings | 18.2:1 |
| `--neutral-900` | `#111827` | Primary body text | 16.4:1 |
| `--neutral-800` | `#1E293B` | Secondary headings, strong labels | 12.6:1 |
| `--neutral-700` | `#334155` | Tertiary text, active navigation | 8.2:1 |
| `--neutral-600` | `#475569` | Muted text, placeholders | 5.9:1 |
| `--neutral-500` | `#64748B` | Disabled text, captions | 4.3:1 |
| `--neutral-400` | `#94A3B8` | Placeholder text, decorative borders | 2.7:1 |
| `--neutral-300` | `#CBD5E1` | Dividers, inactive borders | 1.7:1 |
| `--neutral-200` | `#E2E8F0` | Card borders, input borders | 1.4:1 |
| `--neutral-100` | `#F1F5F9` | Alternate section backgrounds, filter panels | 1.1:1 |
| `--neutral-50` | `#F8FAFC` | Subtle surface differentiation | 1.05:1 |
| `--neutral-0` | `#FFFFFF` | Primary surface | 1:1 |

**Chromatic temperature:** The neutral scale carries a cool-slate undertone (blue-gray). This is intentional:
- Cool neutrals signal precision and professionalism (medical equipment, engineering tools)
- Warm neutrals signal comfort and hospitality (unacceptable for industrial context)
- Pure gray (zero saturation) feels dead on screen — slight chromatic bias prevents this

### 4.3 Functional Colors

Each functional color has exactly one semantic role. No color serves two meanings.

#### 4.3.1 Primary Action — Indigo-Blue

| Token | Value | Use |
|---|---|---|
| `--action-600` | `#4338CA` | Primary buttons, primary links, active tab indicators |
| `--action-700` | `#3730A3` | Hover state for primary action |
| `--action-800` | `#312E81` | Active/pressed state |
| `--action-100` | `#E0E7FF` | Selected state backgrounds (e.g., active filter chip) |
| `--action-50` | `#EEF2FF` | Hover backgrounds on selectable rows/cards |

**Why indigo-blue, not pure blue:** Pure blue (#0066CC or #2563EB range) is overused to the point of generic association with "link" and "button." Indigo-blue (#4338CA) provides:
- Stronger distinction from informational blue (used for notes/info callouts)
- Higher perceived authority (deeper, more serious tone)
- Better contrast ratios against white at the same perceived brightness
- No association with any specific platform or framework

**Why not red, orange, or green for primary action:**
- Red = error/danger in every mature design system. Using red for primary CTAs creates semantic collision.
- Orange = warning state. Same collision problem.
- Green = success/positive state. "Add to cart" being green works until you also need "In Stock" green — the two meanings compete.

#### 4.3.2 Status Colors

| Status | Token | Value | Exclusive Use |
|---|---|---|---|
| Success / In Stock | `--status-success-600` | `#059669` | "In Stock" indicator, successful form submission, order confirmed |
| Success background | `--status-success-50` | `#ECFDF5` | Success message background |
| Warning / Low Stock | `--status-warning-600` | `#D97706` | "Low Stock" indicator, form validation warnings, attention-needed states |
| Warning background | `--status-warning-50` | `#FFFBEB` | Warning message background |
| Error / Out of Stock | `--status-error-600` | `#DC2626` | "Out of Stock" indicator, form errors, destructive action confirmation |
| Error background | `--status-error-50` | `#FEF2F2` | Error message background |
| Sale / Price reduction | `--status-sale-600` | `#EA580C` | Sale badge, struck-through price color, price reduction indicator |

**WhatsApp — third-party brand color (special case):**

| Token | Value | Use |
|---|---|---|
| `--brand-whatsapp` | `#25D366` | WhatsApp FAB button only |
| `--brand-whatsapp-dark` | `#128C7E` | WhatsApp button hover only |

This green is never used for any other purpose. It is not a system color; it is a third-party brand constant.

#### 4.3.3 Informational Color

| Token | Value | Use |
|---|---|---|
| `--info-600` | `#0284C7` | Informational callouts, help text badges, tooltip borders |
| `--info-50` | `#F0F9FF` | Informational banner backgrounds |

### 4.4 Color Application Rules

**Rule 1: Maximum 2 chromatic colors per viewport.** At any screen position, the user should see at most 2 non-neutral colors. A product card may show a Sale badge (orange) and an "In Stock" indicator (green). Adding a third color (e.g., a blue "New" badge) violates this rule.

**Rule 2: Neutral is the default. Color is the exception.** Borders are neutral. Backgrounds are neutral. Text is neutral. Only elements that carry semantic meaning receive color.

**Rule 3: Color intensity matches importance.**
- `600` values: primary states, buttons, badges (high importance)
- `100` values: background tints, selected states (medium importance)
- `50` values: hover states, subtle indicators (low importance)

**Rule 4: No color-only communication.** Every color-coded element must also communicate its meaning through text, icon shape, or position. "In Stock" is green text reading "In stock" — not a green dot alone.

**Rule 5: Hover and active states follow mathematical steps.**
- Hover = one step darker (600 → 700)
- Active = two steps darker (600 → 800)
- Disabled = neutral-400 with 50% opacity

This matches IBM Carbon's interaction-state math and ensures predictable state transitions.

### 4.5 Color Misuse Prevention

| Misuse | Correction |
|---|---|
| Using action color for non-interactive elements | Action color is reserved for elements that respond to user input |
| Using success green for promotional "GO" messaging | Success green means a system state (in stock, confirmed), never marketing emphasis |
| Using red for brand emphasis or visual "pop" | Red means error or out-of-stock. No exceptions. |
| Coloring section headers for visual variety | Section headers are neutral-900. Color variation between sections destroys hierarchy consistency. |
| Using background color to signal section changes | Alternate surfaces use neutral-50 / neutral-100 only. No colored section backgrounds except for system banners (error, success, info). |
| Applying opacity to create color variants | Use the defined token steps. Opacity creates inconsistent contrast ratios across surfaces. |
| Using WhatsApp green for success/in-stock | WhatsApp green is a brand constant. System success green is a different value serving a different semantic role. |

---

## 5. Layout, Grid, and Rhythm Laws

### 5.1 Grid System

**Base unit: 8px.** Every spatial value in the system is a multiple of 8. No exceptions.

This aligns with McMaster-Carr, IBM Carbon, Atlassian, and Adobe Spectrum. The convergence of four independent world-class design systems on 8px is not coincidence — it maps cleanly to common screen densities, halves/doubles cleanly, and produces visually harmonious relationships.

**Column system:**

| Breakpoint | Token | Width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | `--bp-sm` | 0-639px | 4 | 16px | 16px |
| Tablet | `--bp-md` | 640-1023px | 8 | 24px | 24px |
| Desktop | `--bp-lg` | 1024-1279px | 12 | 24px | 32px |
| Wide | `--bp-xl` | 1280-1535px | 12 | 32px | Auto (centered) |
| Ultrawide | `--bp-2xl` | 1536px+ | 12 | 32px | Auto (centered) |

**Maximum content width: 1280px.**

Rationale:
- McMaster-Carr uses ~1200-1400px. FCP Euro uses ~1280px. Carbon's max breakpoint is 1584px but content rarely fills it.
- 1280px on a 1920px monitor provides ~320px of margin on each side — enough peripheral calm to prevent the interface from feeling like a spreadsheet.
- At 15px body text with 1.6 line-height, a 1280px container with proper column splits ensures body text never exceeds ~80 characters per line.

**Narrow content width: 720px.** For long-form text pages (About, FAQ, Returns, Privacy). Human reading cognition degrades above ~75 characters per line. At 15px, 720px produces approximately 65-70 characters per line.

### 5.2 Spacing Scale

All spacing values are multiples of the 8px base unit:

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Dense inline spacing (icon-to-text gap inside buttons) |
| `--space-2` | 8px | Tight component internal padding, gap between related items |
| `--space-3` | 12px | Standard inline padding, small card padding |
| `--space-4` | 16px | Default component padding, form field spacing |
| `--space-5` | 20px | Card internal padding on mobile |
| `--space-6` | 24px | Card internal padding on desktop, gap between cards in grid |
| `--space-8` | 32px | Section internal padding (small sections) |
| `--space-10` | 40px | Section internal padding (standard) |
| `--space-12` | 48px | Section gap on mobile |
| `--space-16` | 64px | Section gap on desktop |
| `--space-20` | 80px | Major page section separation |
| `--space-24` | 96px | Hero section vertical padding |

**The 4px exception:** `--space-1` (4px) is the only non-8px value. It exists for micro-spacing inside dense components. It is not permitted for layout-level spacing.

### 5.3 Vertical Rhythm

**Section separation follows a two-tier model:**

1. **Within-section spacing:** Components inside a section are separated by `--space-4` to `--space-8` (16-32px). This creates visual grouping.
2. **Between-section spacing:** Sections are separated by `--space-16` (64px) on desktop and `--space-12` (48px) on mobile. This creates clear content boundaries.

**Surface alternation for section differentiation:** Consecutive sections alternate between `--neutral-0` (white) and `--neutral-50` (off-white) backgrounds. This is the only permitted method of visual section separation. No colored backgrounds. No decorative dividers. No gradient transitions.

### 5.4 Alignment Absolutes

**What must always align:**

| Element | Alignment Rule |
|---|---|
| Product card edges in a grid | Left edges form a perfect vertical line. No staggered or masonry layouts. |
| Price text across cards in the same row | Prices must appear at the same vertical position across horizontally-adjacent cards. Requires consistent card height management. |
| Section headings | Left-aligned to the container edge. Never centered (except hero). Never indented. |
| Table columns | Right-aligned for numeric data. Left-aligned for text data. |
| Form labels and inputs | Labels above inputs (stacked). Never inline for multi-field forms. |
| Navigation items | Baseline-aligned within horizontal navigation bars. |
| Badge position on product cards | Top-left corner. Consistent X/Y offset. Never top-right, never bottom. |

**What must never float:**

| Element | Constraint |
|---|---|
| CTAs in cards | Pinned to card bottom via flexbox. Never floating at varying heights across a row. |
| Prices in cards | Must share vertical alignment across grid siblings. |
| Product images | Fixed aspect ratio (4:3 or 1:1). Never variable-height images that break grid alignment. |
| Sidebar filters | Aligned to the top of the product grid. Scroll independently only via `position: sticky`. |

### 5.5 Product Image Aspect Ratios

| Context | Ratio | Rationale |
|---|---|---|
| Product card thumbnail | 4:3 | Landscape orientation accommodates engine parts that are typically wider than tall. Provides consistent card height. |
| PDP primary image | 1:1 | Square format provides maximum image area. Standard for e-commerce detail views. |
| Category/vehicle tile | 16:9 | Landscape banner proportion for navigation tiles. |
| Trust/brand logo | Constrained to max 160px x 32px | Prevents logo size competition. Following DigiKey's 155x30px constraint model. |

All product images must use `object-fit: contain` with a neutral background (neutral-50 or white). Never crop. Never stretch. Parts have irregular shapes; forcing them into a fill creates visual dishonesty.

---

## 6. Component Visual System

### 6.1 Design Principles for Components

1. **Each component has exactly one visual purpose.** A badge communicates status. A button triggers action. A card contains a sellable entity. No component serves mixed roles.
2. **Component variants are additive, not multiplicative.** A button has 3 variants (primary, secondary, ghost). Not 9 (3 variants x 3 sizes) unless each combination serves a distinct, documentable purpose.
3. **Visual consistency over expressive variety.** All cards look like cards. All buttons look like buttons. Consistency across 600+ product pages is worth more than novelty on any single page.

### 6.2 Buttons

Three variants. No gradients. No shadows. No icons by default (icons are optional additions).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--action-600` | `--neutral-0` (white) | none | One per viewport section. "Add to cart", primary CTA. |
| Secondary | transparent | `--neutral-800` | 1px `--neutral-300` | Supporting actions. "View details", "Clear filters". |
| Ghost | transparent | `--action-600` | none | Tertiary actions. "Show more", inline text actions. |

**Button sizing:**

| Size | Height | Padding (H) | Font | Radius | Use |
|---|---|---|---|---|---|
| Small | 32px | 12px | `text-sm` / 500 | 4px | Dense contexts: table rows, filter chips, inline actions |
| Default | 40px | 16px | `text-base` / 500 | 6px | Standard forms, card CTAs, page-level actions |
| Large | 48px | 24px | `text-base` / 600 | 6px | Hero CTAs, full-width mobile actions, checkout |

**Button states:**

| State | Change | Duration |
|---|---|---|
| Hover | Background one step darker (600 → 700) | 150ms ease |
| Active | Background two steps darker (600 → 800) | 0ms (instant) |
| Focus | 2px ring in `--action-600` with 3px offset | 0ms (instant) |
| Disabled | Opacity 0.4. Cursor not-allowed. | -- |
| Loading | Text replaced by spinner (same dimensions). No layout shift. | -- |

**Button rules:**
- Full uppercase text only at `text-sm` or smaller.
- Sentence case for all default and large buttons ("Add to cart", not "ADD TO CART" or "Add To Cart").
- Maximum label length: 3 words for primary, 4 words for secondary.
- Icon-only buttons require `aria-label` and minimum 40px touch target.

### 6.3 Cards

**Product card (PLP context):**

| Zone | Content | Styling |
|---|---|---|
| Image zone | Product photo, 4:3 ratio, `object-fit: contain`, neutral-50 bg | No border on image. Card border contains everything. |
| Badge zone | Maximum 1 badge (priority: Sale > Out of Stock > New) | Top-left, 8px inset from card edge. |
| Category overline | Category name | `text-xs`, uppercase, `--neutral-500`, letter-spacing +0.05em |
| Product name | Truncated to 2 lines | `text-sm`, `font-medium`, `--neutral-900`, `line-clamp-2` |
| Price zone | Price or "Request price" | `text-lg`, `font-semibold`, `--neutral-900` for price. `text-sm`, `--neutral-500` for request. |
| CTA zone | Button pinned to bottom | Primary "Add to cart" if purchasable. Secondary "View details" if not. |

Card specification:
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Shadow: `0 1px 3px rgba(0,0,0,0.06)` — one value only
- Hover: shadow transitions to `0 2px 8px rgba(0,0,0,0.1)` over 200ms
- Internal padding: `--space-4` (16px) below image zone

**Information card (non-product context):**

Used for: trust strip items, feature callouts, contact methods, vehicle/model selection tiles.

- Background: `--neutral-0` or `--neutral-50`
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Padding: `--space-6` (24px)
- No shadow (differentiates from product cards which are "interactive objects")
- Hover (if interactive): border transitions to `--neutral-400`

### 6.4 Badges

Badges communicate a single status. One badge per product. Maximum 2 badges visible in any single viewport quadrant.

| Badge | Background | Text | Use |
|---|---|---|---|
| Sale | `--status-sale-600` | white | Product with validated price reduction |
| Out of Stock | `--neutral-200` | `--neutral-600` | Product not currently available |
| Low Stock | `--status-warning-50` | `--status-warning-600` | 5 or fewer units |
| New | `--neutral-900` | white | Products added in the last 30 days |
| OEM | `--action-100` | `--action-600` | Genuine OEM verification marker |

Badge specification:
- Font: `text-xs`, `font-medium`, uppercase, letter-spacing +0.05em
- Padding: 4px 8px
- Radius: 4px
- No icons inside badges. Text only.

**Badge priority (when multiple apply):** Sale > Out of Stock > Low Stock > New > OEM. Only the highest-priority badge is shown.

### 6.5 Tables

Used for: specification tables on PDP, order history, comparison views.

| Element | Style |
|---|---|
| Header row | Background: `--neutral-100`. Text: `text-xs`, `font-semibold`, uppercase, `--neutral-600` |
| Body rows | Alternating `--neutral-0` / `--neutral-50`. Text: `text-sm`, `font-normal`, `--neutral-800` |
| Cell padding | 12px vertical, 16px horizontal |
| Borders | Horizontal only: 1px solid `--neutral-200`. No vertical borders. |
| Numeric cells | Right-aligned, tabular numbers enabled |
| Text cells | Left-aligned |

**Table rules:**
- No rounded corners on tables.
- No hover row highlighting unless the table is interactive (clickable rows).
- Maximum 6 columns on desktop. More than 6 requires a different pattern.
- On mobile: tables of 4+ columns become stacked key-value pairs. Never horizontal-scroll tables.

### 6.6 Filters

**Filter sidebar specification:**

| Element | Style |
|---|---|
| Container | Background: `--neutral-100`. Border-radius: 6px. Padding: `--space-5` (20px). Border: 1px solid `--neutral-200`. |
| Section label | `text-xs`, `font-semibold`, uppercase, `--neutral-600`, letter-spacing +0.05em |
| Section spacing | `--space-6` (24px) between filter sections |
| Filter option (text) | `text-sm`, `font-normal`, `--neutral-800` |
| Filter option (active) | Background: `--action-100`. Text: `--action-600`. `font-medium`. |
| Checkbox | 16px x 16px. Border: 1px `--neutral-400`. Checked: `--action-600` fill with white checkmark. |
| Count badge | `text-xs`, `--neutral-500`, inline after option text |
| Clear action | `text-xs`, `--status-sale-600`, `font-medium`. Right-aligned to section label. |

**Filter rules:**
- Maximum 6 filter sections visible without scrolling.
- Collapsible sections for sections beyond the 6th.
- "Clear all" action visible whenever any filter is active.
- Active filter count displayed in the filter header (mobile toggle).

### 6.7 Status Indicators

| Status | Visual | Text | Color |
|---|---|---|---|
| In Stock | 8px filled circle + text | "In stock" | `--status-success-600` |
| Low Stock | 8px filled circle + text | "Low stock -- X remaining" | `--status-warning-600` |
| Out of Stock | 8px filled circle + text | "Out of stock" | `--status-error-600` |
| On Request | 8px open circle (border only) + text | "Price on request" | `--neutral-500` |

Specification:
- Circle and text baseline-aligned
- 8px gap between circle and text
- Text: `text-sm`, `font-medium`
- Never use status indicators without text labels

---

## 7. Mobile Visual Discipline

### 7.1 Density Rules

**Maximum items per initial viewport (above the fold):**

| Page | Maximum Items | Rationale |
|---|---|---|
| Homepage hero | 1 primary CTA, 1 secondary CTA | Focus determines conversion. |
| Product grid | 4 products (2x2) | More than 4 makes the grid feel like a feed, not a catalog. |
| Filter panel | 4 filter sections visible | Remaining behind accordion. |
| PDP above fold | Image + name + price + primary CTA | All other content below fold by design. |
| Navigation | 5 primary categories visible | Remaining behind "All categories" link. |

**Text truncation logic:**

| Element | Mobile Rule |
|---|---|
| Product name | `line-clamp-2` |
| Category name | `line-clamp-1` |
| Product description | Hidden on card level. Visible only on PDP. |
| OEM part number | Full display — never truncate technical identifiers |
| Price | Full display — never truncate or abbreviate currency |
| Breadcrumb | Parent > Current only. |

### 7.2 Thumb Safety

**Tap target discipline:**

| Element | Minimum Size | Minimum Spacing |
|---|---|---|
| Buttons | 44px height | 8px between adjacent buttons |
| Navigation links | 44px touch area | 4px visual separation |
| Filter options | 44px touch area | 0px visual (padding creates touch area) |
| Card (as tap target) | Full card is tappable | 12px gap between cards |
| Close/dismiss buttons | 44px x 44px touch area | 8px from container edge |
| Checkbox/radio | 44px x 44px touch area | 8px between options |

**Edge avoidance:**
- No interactive elements within 16px of screen left/right edges
- Bottom sticky CTAs must respect `env(safe-area-inset-bottom)`
- Swipe-gesture-dependent interactions are forbidden

### 7.3 Visual Calm Under Scroll

**Sticky element restraint:**

| Permitted Sticky Elements | Max Height | Condition |
|---|---|---|
| Header (simplified) | 56px | Collapses from full header on scroll |
| Bottom CTA bar (PDP only) | 64px (including safe area) | Only when "Add to cart" scrolls out of view |
| Filter toggle (PLP only) | 44px | Only when scrolled past organic filter entry point |

**Maximum combined sticky height: 120px.** Preserves 75%+ of viewport for scrollable content on a 640px-tall screen.

**Forbidden sticky elements:** Trust strip, search bar, "Back to top" buttons, persistent cookie/consent banners.

**Motion minimization:**
- No parallax scrolling
- No entrance animations on scroll (fade-in, slide-up)
- No loading skeleton animations that loop indefinitely
- Permitted motion: button state transitions (150ms), card hover shadow (200ms), modal open/close (200ms ease-out)
- Maximum individual animation duration: 300ms

### 7.4 Mobile Component Adaptations

| Component | Desktop | Mobile Adaptation |
|---|---|---|
| Product grid | 3-4 columns | 2 columns. Card padding reduces to `--space-3`. |
| Filter sidebar | Persistent left column | Overlay panel, full width, z-index above content. |
| Product card CTA | Text button | Can reduce to icon-only cart button (44px minimum). |
| Specification table | Horizontal columns | Stacked key-value pairs. |
| Breadcrumb | Full path | Parent > Current only. |
| Navigation | Horizontal category bar | Hamburger with category tree. Slide-in from left, 200ms. |
| Trust strip | 4-item horizontal bar | 2x2 grid or horizontal scroll (no auto-scroll). |
| Footer | 4-column grid | Single column accordion (collapsed by default). |

---

## 8. Anti-Pattern Registry

### Critical (must never ship)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| C-01 | More than 1 badge per product card | Dilutes status hierarchy. |
| C-02 | Color-only communication (no text/icon pairing) | Accessibility failure for 8% of male users with color vision deficiency. |
| C-03 | Price displayed as "0.00" or "0 AED" | Signals data error. Destroys trust. Show "Price on request" instead. |
| C-04 | Bold weight on body text paragraphs | Visual aggression. Undermines calm authority. |
| C-05 | Interactive element below 44px touch target on mobile | WCAG 2.5.8 failure. Causes mis-taps. |
| C-06 | More than 120px of combined sticky elements on mobile | Consumes >25% of viewport. Content claustrophobia. |
| C-07 | Sale badge on product with no genuine price reduction | `sale_price` must be > 0 AND < `regular_price` AND `regular_price` > 0. Anything else is visual fraud. |

### Major (resolve within sprint)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| M-01 | More than 3 font sizes in a single viewport | Visual noise. Signals template origin. |
| M-02 | Centered body text beyond 1 line | Ragged left edges destroy readability. |
| M-03 | Inconsistent card heights in a product grid row | Breaks alignment. Creates visual wobble. |
| M-04 | Shadow with more than 1 definition (multi-layered) | Ambiguous depth hierarchy. |
| M-05 | Using system success-green for WhatsApp buttons | Semantic collision between system status and brand identity. |
| M-06 | Inline star ratings on automotive parts | OEM parts are correct-fit or wrong-fit, not subjectively rated. |
| M-07 | Auto-playing carousels | <1% engagement after slide 1. Motion competes with scanning. |
| M-08 | Decorative dividers | Information should be separated by space, not decoration. |

### Minor (track for refinement)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| m-01 | Using border-radius > 6px on cards/buttons | Exceeds industrial precision tolerance. |
| m-02 | Title Case on buttons ("Add To Cart") | Sentence case is correct. Title case signals template default. |
| m-03 | Generic placeholder images for products | Low-effort appearance destroys product credibility. |
| m-04 | Footer with more than 4 columns on desktop | Column proliferation signals content governance failure. |
| m-05 | Newsletter popup on first visit | Zero precedent in tier-1 industrial platforms. |
| m-06 | Opacity for disabled states below 0.4 | Text becomes unreadable. |

---

## Appendix A: Token Reference

```
/* Surfaces */
--surface-primary:     var(--neutral-0);
--surface-secondary:   var(--neutral-50);
--surface-tertiary:    var(--neutral-100);
--surface-card:        var(--neutral-0);
--surface-overlay:     rgba(12, 18, 32, 0.5);

/* Text */
--text-primary:        var(--neutral-900);
--text-secondary:      var(--neutral-600);
--text-tertiary:       var(--neutral-500);
--text-inverse:        var(--neutral-0);
--text-disabled:       var(--neutral-400);

/* Borders */
--border-default:      var(--neutral-200);
--border-strong:       var(--neutral-400);
--border-focus:        var(--action-600);
--border-error:        var(--status-error-600);

/* Interactive */
--interactive-primary:        var(--action-600);
--interactive-primary-hover:  var(--action-700);
--interactive-primary-active: var(--action-800);

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0,0,0,0.04);
--shadow-md:  0 1px 3px rgba(0,0,0,0.06);
--shadow-lg:  0 2px 8px rgba(0,0,0,0.1);

/* Spacing */
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```


## License: unknown
https://github.com/tomhendra/tomhendra.dev/blob/b3be6f584522afffc665dd33f41ecbc07a98671b/app/styles/shared/sizes.css

```
File creation is disabled. Here is the complete specification:

---

# UI Visual System Specification v3.0

**Classification:** Master UI Specification — Greenfield Design  
**Platform:** High-trust automotive / industrial e-commerce  
**Horizon:** 2025–2027  
**Status:** Normative  
**Last revised:** 2026-02-10  

---

## Executive Summary

This document defines the complete visual system for a precision-class automotive parts e-commerce platform. It is designed from first principles, anchored to zero legacy decisions, and informed by deep analysis of the highest-performing visual systems in industrial e-commerce (McMaster-Carr, DigiKey, FCP Euro), enterprise design systems (IBM Carbon, Adobe Spectrum, Atlassian), and OEM automotive catalogs (Toyota Parts, Grainger).

The system is built on three invariants:

1. **Restraint over expression.** Every visual element must earn its presence. No decorative color, no ornamental typography, no gratuitous motion.
2. **Information density without chaos.** The platform must present thousands of technical products with absolute clarity. Visual calm under data load is the primary design constraint.
3. **Authority through precision.** Trust is communicated through spatial consistency, typographic discipline, and functional color — never through promotional language or trend-following aesthetics.

This is not a brand guideline. It is a structural specification for an interface that must remain credible under audit in five years.

---

## 1. Visual Intelligence Summary

### 1.1 Research Synthesis

Analysis of 13 platforms across automotive parts, industrial catalogs, and enterprise design systems reveals three tiers of visual maturity:

**Tier 1 — Structural Excellence (reference-grade)**

| Platform | Core Lesson |
|---|---|
| McMaster-Carr | Typography IS the entire design system. Two font weights, one accent color, zero promotional elements. Visual calm under 85,000+ SKU density. 8px spacing grid with mathematical precision. The gold standard for information-dense commerce. |
| IBM Carbon | Role-based color with interaction-state math (hover = half-step, active = two steps). Productive vs. Expressive type sets. 2x grid with 16-column system at large breakpoints. Token architecture that scales across products. |
| Adobe Spectrum | 11 grays per theme, each with a defined role. Major second type scale (1.125x). Platform-aware sizing (desktop vs. mobile as separate scales). Semantic token naming with 3-part structure. |

**Tier 2 — Professional Competence (selective adoption)**

| Platform | Core Lesson |
|---|---|
| FCP Euro | Best-in-class enthusiast auto parts UI. Manufacturer logos as trust anchors. Lifetime guarantee as persistent visual element. Badge system with clear hierarchy (OE > OEM > Aftermarket). Moderate density, well-managed. |
| Grainger | Corporate-professional industrial catalog. Dual navigation (search + browse). Content marketing integration. Weakness: CTA color = brand color, reducing functional clarity. |
| DigiKey | 17.6M products with parametric search. Color is purely informational. Manufacturer logos constrained to 155x30px — remarkable sizing discipline. Authorized distribution messaging counters counterfeit anxiety. |
| Atlassian | Token-based color with emphasis levels (subtlest to boldest). 8px spacing base. Three body font weights with strict usage rules. |

**Tier 3 — Cautionary (patterns to study, not replicate)**

| Platform | Lesson |
|---|---|
| RockAuto | Proves "ugly-trustworthy" works for power users. Not a replicable model, but the underlying insight matters: promotional noise destroys trust in this market. |
| Pelican Parts | Technical depth creates trust. Warm backgrounds differentiate. But dated execution undermines credibility for new visitors. |
| Toyota OEM | Corporate restraint is correct, but sterile execution crosses into "government form" territory. Vehicle selector UI demonstrates how formality can become friction. |
| Car Builder Solutions | Shopify-standard execution with dark theme. Review-wall trust model. Demonstrates how template reliance is visible to informed buyers. |

### 1.2 Reusable Patterns That Scale

These patterns appear across all high-trust platforms and should be adopted:

1. **Typography-first hierarchy.** The best systems (McMaster, Carbon) use font size and weight as primary organizational tools, with color as secondary reinforcement.
2. **8px spatial grid.** McMaster, Carbon, Atlassian, and Spectrum all converge on 8px as the base spatial unit. This is not optional.
3. **Role-based color with no decorative usage.** Every platform that achieves "authority" feel uses color to carry meaning, never for decoration.
4. **Two-weight discipline.** Regular + Semibold (or Medium) handles 90% of cases. Bold is reserved for price display and critical status indicators.
5. **Progressive density disclosure.** Category-level pages are spacious; product-detail pages are dense. The system breathes differently at different depths.
6. **Manufacturer identity as trust proxy.** FCP Euro and DigiKey both use brand logos as trust signals. The host platform stays visually neutral; the product brands carry credibility.
7. **Persistent trust strip.** FCP Euro, Grainger, and DigiKey all maintain a persistent trust bar (shipping, returns, warranty). This is industry standard for a reason.

### 1.3 Patterns That Must Be Rejected

| Pattern | Why It Fails |
|---|---|
| Hero carousels | Zero information density. McMaster proves they are unnecessary. Data shows carousel interaction rates below 1% after slide 1. |
| Promotional color gradients | Signal consumer retail, not industrial authority. No tier-1 reference platform uses gradients. |
| Badge proliferation (3+ per card) | FCP Euro's weakness. More than one badge per product card creates visual noise and dilutes the hierarchy of the badge system itself. |
| Dark theme for product catalogs | Car Builder Solutions demonstrates this: dark backgrounds reduce image contrast for product photography and increase reading fatigue for specification text. |
| Animated transitions between states | Motion attracts attention, which is a cost. In a catalog with hundreds of items, micro-animations compete with the user's scanning behavior. |
| Rounded corners > 8px | Excessive rounding signals "friendly consumer app." Industrial authority requires geometric precision. 4-6px radius maximum. |
| Shadow depth > 1 level | Multiple shadow depths create ambiguity about spatial hierarchy. One shadow value, applied consistently. |
| Inline star ratings on product cards | Star ratings are meaningful for consumer products with subjective quality. OEM parts are either correct or incorrect. Fit/no-fit replaces like/dislike. |

---

## 2. Visual Positioning Doctrine

### 2.1 What the UI Must Immediately Communicate

**Mechanical precision.** The interface itself must feel engineered, not designed. Spacing must be mathematically consistent. Alignment must be absolute. The visual system should suggest that the same rigor applied to the interface was applied to the parts catalog.

**Authority and scale.** The platform must feel like it contains thousands of products without showing them all at once. This is communicated through structured navigation, consistent component patterns, and confident whitespace — not through "Browse 600+ products!" messaging.

**Reliability under complexity.** When a user is on a product page with 15 specification rows, 3 compatibility notes, and a pricing block, the interface must remain calm. No element should compete for attention. The hierarchy must be self-evident without scanning.

### 2.2 What It Must Never Communicate

- **Template usage.** No Shopify defaults. No Bootstrap 5 card shadows. No generic icon libraries used without curation. If an informed buyer can identify the template, the platform has failed.
- **Cheapness.** No gradient buttons. No 2px border radius on oversized elements. No uppercase body text. No excessive exclamation marks in UI copy.
- **Over-decoration.** No decorative dividers. No ornamental icons. No background patterns. No floating shapes. If an element does not carry information or aid navigation, it does not exist.
- **Lifestyle branding.** No mood photography. No aspirational copy. No "experience the difference" language. The parts are mechanical objects; the UI should reflect their nature.

### 2.3 Emotional Calibration

| Axis | Left (preferred) | Right (avoided) |
|---|---|---|
| Tone | Calm | Exciting |
| Information | Clarity | Personality |
| Aesthetics | Restraint | Expressiveness |
| Density | Confident | Sparse |
| Typography | Neutral | Characterful |
| Color | Functional | Decorative |
| Layout | Predictable | Surprising |
| Motion | Static | Animated |

This system targets the intersection of **McMaster-Carr's information purity** and **FCP Euro's product merchandising** — technical precision with enough visual warmth to support product photography, but never enough to suggest lifestyle retail.

---

## 3. Typography System

### 3.1 Font Selection

**Primary typeface: Inter**

Rationale:
- Variable font with optical sizing (opsz 14–32), enabling automatic micro-adjustments for text vs. display contexts
- 147 language scripts including Latin, Cyrillic, Greek, Arabic — essential for UAE/GCC audience
- Tabular number feature (`tnum`) critical for price columns and specification tables
- Tall x-height optimized for screen legibility at 13-16px body sizes
- Disambiguation features (`ss02`, `cv08`, `cv05`, slashed zero) prevent misreading of OEM part numbers (O vs 0, I vs l vs 1)
- Used by Figma, GitHub, Linear, and Vercel's own documentation — proven at scale in technical interfaces
- 100-900 weight range with three master designs (100, 400, 900) ensuring quality at every interpolation point
- Open Font License — no licensing constraints

**Monospace companion: Inter's tabular features (preferred) or JetBrains Mono (fallback)**

Used exclusively for: OEM part numbers, SKU codes, engine codes, specification values.

**Font stack:**
```
--font-sans: 'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', ui-monospace, monospace;
```

**Rejected alternatives and reasons:**

| Font | Rejection Reason |
|---|---|
| Geist Sans | Vercel-ecosystem association. Fewer language scripts than Inter. No optical sizing axis. |
| IBM Plex Sans | Strong IBM brand association. Mathematical scale is rigid. Three-font-family system (Sans + Serif + Mono) is over-specified for this use case. |
| Roboto | Google Material association. Humanist proportions are too warm for industrial context. |
| Helvetica Neue | No variable font support. No tabular numbers feature. License cost. |
| System fonts only | Inconsistent rendering across devices undermines visual precision. Unacceptable for a system that claims mechanical rigor. |

### 3.2 Type Scale

The scale uses a **1.200 ratio (minor third)** — the same mathematical discipline used by IBM Carbon, adapted for e-commerce density requirements.

Base size: 15px (desktop) / 16px (mobile)

| Token | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 11px / 1.45 | 12px / 1.45 | 400-500 | Microcopy, timestamps, tertiary labels |
| `text-sm` | 13px / 1.5 | 14px / 1.5 | 400-500 | Secondary text, filter labels, metadata |
| `text-base` | 15px / 1.6 | 16px / 1.6 | 400 | Body text, descriptions, form inputs |
| `text-md` | 18px / 1.45 | 18px / 1.45 | 500-600 | Subheadings, card titles, section labels |
| `text-lg` | 21px / 1.35 | 21px / 1.35 | 600 | Page section headings |
| `text-xl` | 26px / 1.3 | 24px / 1.3 | 600 | Page titles |
| `text-2xl` | 31px / 1.2 | 28px / 1.25 | 600 | Hero headings, primary page titles |
| `text-3xl` | 37px / 1.15 | 32px / 1.2 | 600-700 | Landing page titles only |

**Line-height rationale:** Larger text gets tighter line-height (1.15-1.3) because heading text is read as a unit. Body text gets looser line-height (1.5-1.6) because paragraphs require inter-line scanning.

### 3.3 Weight Discipline

The system uses exactly three weights:

| Weight | Token | Permitted Uses | Forbidden Uses |
|---|---|---|---|
| Regular (400) | `font-normal` | Body text, descriptions, form inputs, table cells, secondary labels | Never for headings, CTAs, or prices |
| Medium (500) | `font-medium` | Navigation items, card titles, form labels, breadcrumbs, tertiary headings | Never for body paragraphs, never for primary headings |
| Semibold (600) | `font-semibold` | Page headings, section titles, prices, primary CTAs, critical status text | Never for body text, never for more than 2 consecutive lines |

**Bold (700) is restricted.** It is permitted only for:
- Primary page hero headings at `text-2xl` or larger
- Price display when the price is the primary focus of a component (e.g., PDP price block)
- "Out of Stock" status when it is the only status indicator visible

Bold at body text sizes creates visual aggression that undermines calm.

### 3.4 OpenType Feature Requirements

```css
font-feature-settings:
  'liga' 1,    /* Standard ligatures */
  'calt' 1,    /* Contextual alternates */
  'tnum' 1,    /* Tabular numbers — critical for price alignment */
  'zero' 1,    /* Slashed zero — prevents O/0 confusion in part numbers */
  'ss02' 1;    /* Disambiguation set — I/l/1 differentiation */
```

These features are non-negotiable for a platform that displays OEM part numbers. The difference between part number `1OI0` and `lO10` is a wrong-part shipment.

### 3.5 Typography Failure Cases

| Failure | Why It Fails | Prevention |
|---|---|---|
| Bold body text | Creates visual shouting. Undermines calm. | Lint rule: no `font-bold` below `text-md` |
| ALL CAPS body text | Reduces legibility by 10-15%. Feels hostile. | Uppercase permitted only for badges, overline labels, and button text at `text-xs` / `text-sm` |
| Centered body paragraphs | Ragged left edges destroy readability after 2 lines | Center alignment only for hero headings and single-line display text |
| More than 3 font sizes on one screen | Creates visual noise. Signals lack of system. | Maximum 4 scale levels per viewport (e.g., heading + subhead + body + micro) |
| Inconsistent number formatting | Prices misalign in grids. Specification columns wobble. | Tabular numbers (`tnum`) mandatory for all numeric content |
| Product names longer than 2 lines | Card layouts break. Visual rhythm destroyed. | `line-clamp-2` on all card-level product names. Full name on PDP only. |
| Italic for emphasis in UI | Inter's italic is a true italic with different letter shapes. Emphasis should use weight, not style. | Italic permitted only for: placeholder text, technical term definitions, legal/disclaimer copy |

### 3.6 Letter-Spacing Rules

| Context | Letter-spacing | Rationale |
|---|---|---|
| Uppercase labels and badges | +0.04em to +0.06em | Compensates for reduced inter-character whitespace in caps |
| Heading text at `text-xl`+ | -0.01em to -0.02em | Tightens large text for visual cohesion |
| Body text | 0 (normal) | Inter is designed for zero tracking at body sizes |
| Monospace/part numbers | 0 (normal) | Tabular alignment handles spacing |
| Price display | 0 (normal) | Tabular numbers handle alignment |

---

## 4. Color System

### 4.1 Design Principles

This color system follows four laws:

1. **Color must carry meaning.** If a color does not indicate status, hierarchy, or function, it does not belong.
2. **Neutral foundation, functional accents.** The interface is 90%+ neutral tones. Color appears sparingly and deliberately.
3. **Contrast first, brand second.** WCAG AA (4.5:1 for text) is the minimum. AAA (7:1) is the target for body text.
4. **One primary action color.** The entire system has exactly one color that means "primary interactive element." This color appears on primary buttons, active states, and links. Nothing else.

### 4.2 Neutral Foundation

The neutral palette provides the structural canvas. It is the most important palette in the system because it occupies 90% of viewport pixels.

| Token | Value | Role | Contrast vs White |
|---|---|---|---|
| `--neutral-950` | `#0C1220` | Deepest text, primary headings | 18.2:1 |
| `--neutral-900` | `#111827` | Primary body text | 16.4:1 |
| `--neutral-800` | `#1E293B` | Secondary headings, strong labels | 12.6:1 |
| `--neutral-700` | `#334155` | Tertiary text, active navigation | 8.2:1 |
| `--neutral-600` | `#475569` | Muted text, placeholders | 5.9:1 |
| `--neutral-500` | `#64748B` | Disabled text, captions | 4.3:1 |
| `--neutral-400` | `#94A3B8` | Placeholder text, decorative borders | 2.7:1 |
| `--neutral-300` | `#CBD5E1` | Dividers, inactive borders | 1.7:1 |
| `--neutral-200` | `#E2E8F0` | Card borders, input borders | 1.4:1 |
| `--neutral-100` | `#F1F5F9` | Alternate section backgrounds, filter panels | 1.1:1 |
| `--neutral-50` | `#F8FAFC` | Subtle surface differentiation | 1.05:1 |
| `--neutral-0` | `#FFFFFF` | Primary surface | 1:1 |

**Chromatic temperature:** The neutral scale carries a cool-slate undertone (blue-gray). This is intentional:
- Cool neutrals signal precision and professionalism (medical equipment, engineering tools)
- Warm neutrals signal comfort and hospitality (unacceptable for industrial context)
- Pure gray (zero saturation) feels dead on screen — slight chromatic bias prevents this

### 4.3 Functional Colors

Each functional color has exactly one semantic role. No color serves two meanings.

#### 4.3.1 Primary Action — Indigo-Blue

| Token | Value | Use |
|---|---|---|
| `--action-600` | `#4338CA` | Primary buttons, primary links, active tab indicators |
| `--action-700` | `#3730A3` | Hover state for primary action |
| `--action-800` | `#312E81` | Active/pressed state |
| `--action-100` | `#E0E7FF` | Selected state backgrounds (e.g., active filter chip) |
| `--action-50` | `#EEF2FF` | Hover backgrounds on selectable rows/cards |

**Why indigo-blue, not pure blue:** Pure blue (#0066CC or #2563EB range) is overused to the point of generic association with "link" and "button." Indigo-blue (#4338CA) provides:
- Stronger distinction from informational blue (used for notes/info callouts)
- Higher perceived authority (deeper, more serious tone)
- Better contrast ratios against white at the same perceived brightness
- No association with any specific platform or framework

**Why not red, orange, or green for primary action:**
- Red = error/danger in every mature design system. Using red for primary CTAs creates semantic collision.
- Orange = warning state. Same collision problem.
- Green = success/positive state. "Add to cart" being green works until you also need "In Stock" green — the two meanings compete.

#### 4.3.2 Status Colors

| Status | Token | Value | Exclusive Use |
|---|---|---|---|
| Success / In Stock | `--status-success-600` | `#059669` | "In Stock" indicator, successful form submission, order confirmed |
| Success background | `--status-success-50` | `#ECFDF5` | Success message background |
| Warning / Low Stock | `--status-warning-600` | `#D97706` | "Low Stock" indicator, form validation warnings, attention-needed states |
| Warning background | `--status-warning-50` | `#FFFBEB` | Warning message background |
| Error / Out of Stock | `--status-error-600` | `#DC2626` | "Out of Stock" indicator, form errors, destructive action confirmation |
| Error background | `--status-error-50` | `#FEF2F2` | Error message background |
| Sale / Price reduction | `--status-sale-600` | `#EA580C` | Sale badge, struck-through price color, price reduction indicator |

**WhatsApp — third-party brand color (special case):**

| Token | Value | Use |
|---|---|---|
| `--brand-whatsapp` | `#25D366` | WhatsApp FAB button only |
| `--brand-whatsapp-dark` | `#128C7E` | WhatsApp button hover only |

This green is never used for any other purpose. It is not a system color; it is a third-party brand constant.

#### 4.3.3 Informational Color

| Token | Value | Use |
|---|---|---|
| `--info-600` | `#0284C7` | Informational callouts, help text badges, tooltip borders |
| `--info-50` | `#F0F9FF` | Informational banner backgrounds |

### 4.4 Color Application Rules

**Rule 1: Maximum 2 chromatic colors per viewport.** At any screen position, the user should see at most 2 non-neutral colors. A product card may show a Sale badge (orange) and an "In Stock" indicator (green). Adding a third color (e.g., a blue "New" badge) violates this rule.

**Rule 2: Neutral is the default. Color is the exception.** Borders are neutral. Backgrounds are neutral. Text is neutral. Only elements that carry semantic meaning receive color.

**Rule 3: Color intensity matches importance.**
- `600` values: primary states, buttons, badges (high importance)
- `100` values: background tints, selected states (medium importance)
- `50` values: hover states, subtle indicators (low importance)

**Rule 4: No color-only communication.** Every color-coded element must also communicate its meaning through text, icon shape, or position. "In Stock" is green text reading "In stock" — not a green dot alone.

**Rule 5: Hover and active states follow mathematical steps.**
- Hover = one step darker (600 → 700)
- Active = two steps darker (600 → 800)
- Disabled = neutral-400 with 50% opacity

This matches IBM Carbon's interaction-state math and ensures predictable state transitions.

### 4.5 Color Misuse Prevention

| Misuse | Correction |
|---|---|
| Using action color for non-interactive elements | Action color is reserved for elements that respond to user input |
| Using success green for promotional "GO" messaging | Success green means a system state (in stock, confirmed), never marketing emphasis |
| Using red for brand emphasis or visual "pop" | Red means error or out-of-stock. No exceptions. |
| Coloring section headers for visual variety | Section headers are neutral-900. Color variation between sections destroys hierarchy consistency. |
| Using background color to signal section changes | Alternate surfaces use neutral-50 / neutral-100 only. No colored section backgrounds except for system banners (error, success, info). |
| Applying opacity to create color variants | Use the defined token steps. Opacity creates inconsistent contrast ratios across surfaces. |
| Using WhatsApp green for success/in-stock | WhatsApp green is a brand constant. System success green is a different value serving a different semantic role. |

---

## 5. Layout, Grid, and Rhythm Laws

### 5.1 Grid System

**Base unit: 8px.** Every spatial value in the system is a multiple of 8. No exceptions.

This aligns with McMaster-Carr, IBM Carbon, Atlassian, and Adobe Spectrum. The convergence of four independent world-class design systems on 8px is not coincidence — it maps cleanly to common screen densities, halves/doubles cleanly, and produces visually harmonious relationships.

**Column system:**

| Breakpoint | Token | Width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | `--bp-sm` | 0-639px | 4 | 16px | 16px |
| Tablet | `--bp-md` | 640-1023px | 8 | 24px | 24px |
| Desktop | `--bp-lg` | 1024-1279px | 12 | 24px | 32px |
| Wide | `--bp-xl` | 1280-1535px | 12 | 32px | Auto (centered) |
| Ultrawide | `--bp-2xl` | 1536px+ | 12 | 32px | Auto (centered) |

**Maximum content width: 1280px.**

Rationale:
- McMaster-Carr uses ~1200-1400px. FCP Euro uses ~1280px. Carbon's max breakpoint is 1584px but content rarely fills it.
- 1280px on a 1920px monitor provides ~320px of margin on each side — enough peripheral calm to prevent the interface from feeling like a spreadsheet.
- At 15px body text with 1.6 line-height, a 1280px container with proper column splits ensures body text never exceeds ~80 characters per line.

**Narrow content width: 720px.** For long-form text pages (About, FAQ, Returns, Privacy). Human reading cognition degrades above ~75 characters per line. At 15px, 720px produces approximately 65-70 characters per line.

### 5.2 Spacing Scale

All spacing values are multiples of the 8px base unit:

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Dense inline spacing (icon-to-text gap inside buttons) |
| `--space-2` | 8px | Tight component internal padding, gap between related items |
| `--space-3` | 12px | Standard inline padding, small card padding |
| `--space-4` | 16px | Default component padding, form field spacing |
| `--space-5` | 20px | Card internal padding on mobile |
| `--space-6` | 24px | Card internal padding on desktop, gap between cards in grid |
| `--space-8` | 32px | Section internal padding (small sections) |
| `--space-10` | 40px | Section internal padding (standard) |
| `--space-12` | 48px | Section gap on mobile |
| `--space-16` | 64px | Section gap on desktop |
| `--space-20` | 80px | Major page section separation |
| `--space-24` | 96px | Hero section vertical padding |

**The 4px exception:** `--space-1` (4px) is the only non-8px value. It exists for micro-spacing inside dense components. It is not permitted for layout-level spacing.

### 5.3 Vertical Rhythm

**Section separation follows a two-tier model:**

1. **Within-section spacing:** Components inside a section are separated by `--space-4` to `--space-8` (16-32px). This creates visual grouping.
2. **Between-section spacing:** Sections are separated by `--space-16` (64px) on desktop and `--space-12` (48px) on mobile. This creates clear content boundaries.

**Surface alternation for section differentiation:** Consecutive sections alternate between `--neutral-0` (white) and `--neutral-50` (off-white) backgrounds. This is the only permitted method of visual section separation. No colored backgrounds. No decorative dividers. No gradient transitions.

### 5.4 Alignment Absolutes

**What must always align:**

| Element | Alignment Rule |
|---|---|
| Product card edges in a grid | Left edges form a perfect vertical line. No staggered or masonry layouts. |
| Price text across cards in the same row | Prices must appear at the same vertical position across horizontally-adjacent cards. Requires consistent card height management. |
| Section headings | Left-aligned to the container edge. Never centered (except hero). Never indented. |
| Table columns | Right-aligned for numeric data. Left-aligned for text data. |
| Form labels and inputs | Labels above inputs (stacked). Never inline for multi-field forms. |
| Navigation items | Baseline-aligned within horizontal navigation bars. |
| Badge position on product cards | Top-left corner. Consistent X/Y offset. Never top-right, never bottom. |

**What must never float:**

| Element | Constraint |
|---|---|
| CTAs in cards | Pinned to card bottom via flexbox. Never floating at varying heights across a row. |
| Prices in cards | Must share vertical alignment across grid siblings. |
| Product images | Fixed aspect ratio (4:3 or 1:1). Never variable-height images that break grid alignment. |
| Sidebar filters | Aligned to the top of the product grid. Scroll independently only via `position: sticky`. |

### 5.5 Product Image Aspect Ratios

| Context | Ratio | Rationale |
|---|---|---|
| Product card thumbnail | 4:3 | Landscape orientation accommodates engine parts that are typically wider than tall. Provides consistent card height. |
| PDP primary image | 1:1 | Square format provides maximum image area. Standard for e-commerce detail views. |
| Category/vehicle tile | 16:9 | Landscape banner proportion for navigation tiles. |
| Trust/brand logo | Constrained to max 160px x 32px | Prevents logo size competition. Following DigiKey's 155x30px constraint model. |

All product images must use `object-fit: contain` with a neutral background (neutral-50 or white). Never crop. Never stretch. Parts have irregular shapes; forcing them into a fill creates visual dishonesty.

---

## 6. Component Visual System

### 6.1 Design Principles for Components

1. **Each component has exactly one visual purpose.** A badge communicates status. A button triggers action. A card contains a sellable entity. No component serves mixed roles.
2. **Component variants are additive, not multiplicative.** A button has 3 variants (primary, secondary, ghost). Not 9 (3 variants x 3 sizes) unless each combination serves a distinct, documentable purpose.
3. **Visual consistency over expressive variety.** All cards look like cards. All buttons look like buttons. Consistency across 600+ product pages is worth more than novelty on any single page.

### 6.2 Buttons

Three variants. No gradients. No shadows. No icons by default (icons are optional additions).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--action-600` | `--neutral-0` (white) | none | One per viewport section. "Add to cart", primary CTA. |
| Secondary | transparent | `--neutral-800` | 1px `--neutral-300` | Supporting actions. "View details", "Clear filters". |
| Ghost | transparent | `--action-600` | none | Tertiary actions. "Show more", inline text actions. |

**Button sizing:**

| Size | Height | Padding (H) | Font | Radius | Use |
|---|---|---|---|---|---|
| Small | 32px | 12px | `text-sm` / 500 | 4px | Dense contexts: table rows, filter chips, inline actions |
| Default | 40px | 16px | `text-base` / 500 | 6px | Standard forms, card CTAs, page-level actions |
| Large | 48px | 24px | `text-base` / 600 | 6px | Hero CTAs, full-width mobile actions, checkout |

**Button states:**

| State | Change | Duration |
|---|---|---|
| Hover | Background one step darker (600 → 700) | 150ms ease |
| Active | Background two steps darker (600 → 800) | 0ms (instant) |
| Focus | 2px ring in `--action-600` with 3px offset | 0ms (instant) |
| Disabled | Opacity 0.4. Cursor not-allowed. | -- |
| Loading | Text replaced by spinner (same dimensions). No layout shift. | -- |

**Button rules:**
- Full uppercase text only at `text-sm` or smaller.
- Sentence case for all default and large buttons ("Add to cart", not "ADD TO CART" or "Add To Cart").
- Maximum label length: 3 words for primary, 4 words for secondary.
- Icon-only buttons require `aria-label` and minimum 40px touch target.

### 6.3 Cards

**Product card (PLP context):**

| Zone | Content | Styling |
|---|---|---|
| Image zone | Product photo, 4:3 ratio, `object-fit: contain`, neutral-50 bg | No border on image. Card border contains everything. |
| Badge zone | Maximum 1 badge (priority: Sale > Out of Stock > New) | Top-left, 8px inset from card edge. |
| Category overline | Category name | `text-xs`, uppercase, `--neutral-500`, letter-spacing +0.05em |
| Product name | Truncated to 2 lines | `text-sm`, `font-medium`, `--neutral-900`, `line-clamp-2` |
| Price zone | Price or "Request price" | `text-lg`, `font-semibold`, `--neutral-900` for price. `text-sm`, `--neutral-500` for request. |
| CTA zone | Button pinned to bottom | Primary "Add to cart" if purchasable. Secondary "View details" if not. |

Card specification:
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Shadow: `0 1px 3px rgba(0,0,0,0.06)` — one value only
- Hover: shadow transitions to `0 2px 8px rgba(0,0,0,0.1)` over 200ms
- Internal padding: `--space-4` (16px) below image zone

**Information card (non-product context):**

Used for: trust strip items, feature callouts, contact methods, vehicle/model selection tiles.

- Background: `--neutral-0` or `--neutral-50`
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Padding: `--space-6` (24px)
- No shadow (differentiates from product cards which are "interactive objects")
- Hover (if interactive): border transitions to `--neutral-400`

### 6.4 Badges

Badges communicate a single status. One badge per product. Maximum 2 badges visible in any single viewport quadrant.

| Badge | Background | Text | Use |
|---|---|---|---|
| Sale | `--status-sale-600` | white | Product with validated price reduction |
| Out of Stock | `--neutral-200` | `--neutral-600` | Product not currently available |
| Low Stock | `--status-warning-50` | `--status-warning-600` | 5 or fewer units |
| New | `--neutral-900` | white | Products added in the last 30 days |
| OEM | `--action-100` | `--action-600` | Genuine OEM verification marker |

Badge specification:
- Font: `text-xs`, `font-medium`, uppercase, letter-spacing +0.05em
- Padding: 4px 8px
- Radius: 4px
- No icons inside badges. Text only.

**Badge priority (when multiple apply):** Sale > Out of Stock > Low Stock > New > OEM. Only the highest-priority badge is shown.

### 6.5 Tables

Used for: specification tables on PDP, order history, comparison views.

| Element | Style |
|---|---|
| Header row | Background: `--neutral-100`. Text: `text-xs`, `font-semibold`, uppercase, `--neutral-600` |
| Body rows | Alternating `--neutral-0` / `--neutral-50`. Text: `text-sm`, `font-normal`, `--neutral-800` |
| Cell padding | 12px vertical, 16px horizontal |
| Borders | Horizontal only: 1px solid `--neutral-200`. No vertical borders. |
| Numeric cells | Right-aligned, tabular numbers enabled |
| Text cells | Left-aligned |

**Table rules:**
- No rounded corners on tables.
- No hover row highlighting unless the table is interactive (clickable rows).
- Maximum 6 columns on desktop. More than 6 requires a different pattern.
- On mobile: tables of 4+ columns become stacked key-value pairs. Never horizontal-scroll tables.

### 6.6 Filters

**Filter sidebar specification:**

| Element | Style |
|---|---|
| Container | Background: `--neutral-100`. Border-radius: 6px. Padding: `--space-5` (20px). Border: 1px solid `--neutral-200`. |
| Section label | `text-xs`, `font-semibold`, uppercase, `--neutral-600`, letter-spacing +0.05em |
| Section spacing | `--space-6` (24px) between filter sections |
| Filter option (text) | `text-sm`, `font-normal`, `--neutral-800` |
| Filter option (active) | Background: `--action-100`. Text: `--action-600`. `font-medium`. |
| Checkbox | 16px x 16px. Border: 1px `--neutral-400`. Checked: `--action-600` fill with white checkmark. |
| Count badge | `text-xs`, `--neutral-500`, inline after option text |
| Clear action | `text-xs`, `--status-sale-600`, `font-medium`. Right-aligned to section label. |

**Filter rules:**
- Maximum 6 filter sections visible without scrolling.
- Collapsible sections for sections beyond the 6th.
- "Clear all" action visible whenever any filter is active.
- Active filter count displayed in the filter header (mobile toggle).

### 6.7 Status Indicators

| Status | Visual | Text | Color |
|---|---|---|---|
| In Stock | 8px filled circle + text | "In stock" | `--status-success-600` |
| Low Stock | 8px filled circle + text | "Low stock -- X remaining" | `--status-warning-600` |
| Out of Stock | 8px filled circle + text | "Out of stock" | `--status-error-600` |
| On Request | 8px open circle (border only) + text | "Price on request" | `--neutral-500` |

Specification:
- Circle and text baseline-aligned
- 8px gap between circle and text
- Text: `text-sm`, `font-medium`
- Never use status indicators without text labels

---

## 7. Mobile Visual Discipline

### 7.1 Density Rules

**Maximum items per initial viewport (above the fold):**

| Page | Maximum Items | Rationale |
|---|---|---|
| Homepage hero | 1 primary CTA, 1 secondary CTA | Focus determines conversion. |
| Product grid | 4 products (2x2) | More than 4 makes the grid feel like a feed, not a catalog. |
| Filter panel | 4 filter sections visible | Remaining behind accordion. |
| PDP above fold | Image + name + price + primary CTA | All other content below fold by design. |
| Navigation | 5 primary categories visible | Remaining behind "All categories" link. |

**Text truncation logic:**

| Element | Mobile Rule |
|---|---|
| Product name | `line-clamp-2` |
| Category name | `line-clamp-1` |
| Product description | Hidden on card level. Visible only on PDP. |
| OEM part number | Full display — never truncate technical identifiers |
| Price | Full display — never truncate or abbreviate currency |
| Breadcrumb | Parent > Current only. |

### 7.2 Thumb Safety

**Tap target discipline:**

| Element | Minimum Size | Minimum Spacing |
|---|---|---|
| Buttons | 44px height | 8px between adjacent buttons |
| Navigation links | 44px touch area | 4px visual separation |
| Filter options | 44px touch area | 0px visual (padding creates touch area) |
| Card (as tap target) | Full card is tappable | 12px gap between cards |
| Close/dismiss buttons | 44px x 44px touch area | 8px from container edge |
| Checkbox/radio | 44px x 44px touch area | 8px between options |

**Edge avoidance:**
- No interactive elements within 16px of screen left/right edges
- Bottom sticky CTAs must respect `env(safe-area-inset-bottom)`
- Swipe-gesture-dependent interactions are forbidden

### 7.3 Visual Calm Under Scroll

**Sticky element restraint:**

| Permitted Sticky Elements | Max Height | Condition |
|---|---|---|
| Header (simplified) | 56px | Collapses from full header on scroll |
| Bottom CTA bar (PDP only) | 64px (including safe area) | Only when "Add to cart" scrolls out of view |
| Filter toggle (PLP only) | 44px | Only when scrolled past organic filter entry point |

**Maximum combined sticky height: 120px.** Preserves 75%+ of viewport for scrollable content on a 640px-tall screen.

**Forbidden sticky elements:** Trust strip, search bar, "Back to top" buttons, persistent cookie/consent banners.

**Motion minimization:**
- No parallax scrolling
- No entrance animations on scroll (fade-in, slide-up)
- No loading skeleton animations that loop indefinitely
- Permitted motion: button state transitions (150ms), card hover shadow (200ms), modal open/close (200ms ease-out)
- Maximum individual animation duration: 300ms

### 7.4 Mobile Component Adaptations

| Component | Desktop | Mobile Adaptation |
|---|---|---|
| Product grid | 3-4 columns | 2 columns. Card padding reduces to `--space-3`. |
| Filter sidebar | Persistent left column | Overlay panel, full width, z-index above content. |
| Product card CTA | Text button | Can reduce to icon-only cart button (44px minimum). |
| Specification table | Horizontal columns | Stacked key-value pairs. |
| Breadcrumb | Full path | Parent > Current only. |
| Navigation | Horizontal category bar | Hamburger with category tree. Slide-in from left, 200ms. |
| Trust strip | 4-item horizontal bar | 2x2 grid or horizontal scroll (no auto-scroll). |
| Footer | 4-column grid | Single column accordion (collapsed by default). |

---

## 8. Anti-Pattern Registry

### Critical (must never ship)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| C-01 | More than 1 badge per product card | Dilutes status hierarchy. |
| C-02 | Color-only communication (no text/icon pairing) | Accessibility failure for 8% of male users with color vision deficiency. |
| C-03 | Price displayed as "0.00" or "0 AED" | Signals data error. Destroys trust. Show "Price on request" instead. |
| C-04 | Bold weight on body text paragraphs | Visual aggression. Undermines calm authority. |
| C-05 | Interactive element below 44px touch target on mobile | WCAG 2.5.8 failure. Causes mis-taps. |
| C-06 | More than 120px of combined sticky elements on mobile | Consumes >25% of viewport. Content claustrophobia. |
| C-07 | Sale badge on product with no genuine price reduction | `sale_price` must be > 0 AND < `regular_price` AND `regular_price` > 0. Anything else is visual fraud. |

### Major (resolve within sprint)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| M-01 | More than 3 font sizes in a single viewport | Visual noise. Signals template origin. |
| M-02 | Centered body text beyond 1 line | Ragged left edges destroy readability. |
| M-03 | Inconsistent card heights in a product grid row | Breaks alignment. Creates visual wobble. |
| M-04 | Shadow with more than 1 definition (multi-layered) | Ambiguous depth hierarchy. |
| M-05 | Using system success-green for WhatsApp buttons | Semantic collision between system status and brand identity. |
| M-06 | Inline star ratings on automotive parts | OEM parts are correct-fit or wrong-fit, not subjectively rated. |
| M-07 | Auto-playing carousels | <1% engagement after slide 1. Motion competes with scanning. |
| M-08 | Decorative dividers | Information should be separated by space, not decoration. |

### Minor (track for refinement)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| m-01 | Using border-radius > 6px on cards/buttons | Exceeds industrial precision tolerance. |
| m-02 | Title Case on buttons ("Add To Cart") | Sentence case is correct. Title case signals template default. |
| m-03 | Generic placeholder images for products | Low-effort appearance destroys product credibility. |
| m-04 | Footer with more than 4 columns on desktop | Column proliferation signals content governance failure. |
| m-05 | Newsletter popup on first visit | Zero precedent in tier-1 industrial platforms. |
| m-06 | Opacity for disabled states below 0.4 | Text becomes unreadable. |

---

## Appendix A: Token Reference

```
/* Surfaces */
--surface-primary:     var(--neutral-0);
--surface-secondary:   var(--neutral-50);
--surface-tertiary:    var(--neutral-100);
--surface-card:        var(--neutral-0);
--surface-overlay:     rgba(12, 18, 32, 0.5);

/* Text */
--text-primary:        var(--neutral-900);
--text-secondary:      var(--neutral-600);
--text-tertiary:       var(--neutral-500);
--text-inverse:        var(--neutral-0);
--text-disabled:       var(--neutral-400);

/* Borders */
--border-default:      var(--neutral-200);
--border-strong:       var(--neutral-400);
--border-focus:        var(--action-600);
--border-error:        var(--status-error-600);

/* Interactive */
--interactive-primary:        var(--action-600);
--interactive-primary-hover:  var(--action-700);
--interactive-primary-active: var(--action-800);

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0,0,0,0.04);
--shadow-md:  0 1px 3px rgba(0,0,0,0.06);
--shadow-lg:  0 2px 8px rgba(0,0,0,0.1);

/* Spacing */
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```
```


## License: unknown
https://github.com/tomhendra/tomhendra.dev/blob/b3be6f584522afffc665dd33f41ecbc07a98671b/app/styles/shared/sizes.css

```
File creation is disabled. Here is the complete specification:

---

# UI Visual System Specification v3.0

**Classification:** Master UI Specification — Greenfield Design  
**Platform:** High-trust automotive / industrial e-commerce  
**Horizon:** 2025–2027  
**Status:** Normative  
**Last revised:** 2026-02-10  

---

## Executive Summary

This document defines the complete visual system for a precision-class automotive parts e-commerce platform. It is designed from first principles, anchored to zero legacy decisions, and informed by deep analysis of the highest-performing visual systems in industrial e-commerce (McMaster-Carr, DigiKey, FCP Euro), enterprise design systems (IBM Carbon, Adobe Spectrum, Atlassian), and OEM automotive catalogs (Toyota Parts, Grainger).

The system is built on three invariants:

1. **Restraint over expression.** Every visual element must earn its presence. No decorative color, no ornamental typography, no gratuitous motion.
2. **Information density without chaos.** The platform must present thousands of technical products with absolute clarity. Visual calm under data load is the primary design constraint.
3. **Authority through precision.** Trust is communicated through spatial consistency, typographic discipline, and functional color — never through promotional language or trend-following aesthetics.

This is not a brand guideline. It is a structural specification for an interface that must remain credible under audit in five years.

---

## 1. Visual Intelligence Summary

### 1.1 Research Synthesis

Analysis of 13 platforms across automotive parts, industrial catalogs, and enterprise design systems reveals three tiers of visual maturity:

**Tier 1 — Structural Excellence (reference-grade)**

| Platform | Core Lesson |
|---|---|
| McMaster-Carr | Typography IS the entire design system. Two font weights, one accent color, zero promotional elements. Visual calm under 85,000+ SKU density. 8px spacing grid with mathematical precision. The gold standard for information-dense commerce. |
| IBM Carbon | Role-based color with interaction-state math (hover = half-step, active = two steps). Productive vs. Expressive type sets. 2x grid with 16-column system at large breakpoints. Token architecture that scales across products. |
| Adobe Spectrum | 11 grays per theme, each with a defined role. Major second type scale (1.125x). Platform-aware sizing (desktop vs. mobile as separate scales). Semantic token naming with 3-part structure. |

**Tier 2 — Professional Competence (selective adoption)**

| Platform | Core Lesson |
|---|---|
| FCP Euro | Best-in-class enthusiast auto parts UI. Manufacturer logos as trust anchors. Lifetime guarantee as persistent visual element. Badge system with clear hierarchy (OE > OEM > Aftermarket). Moderate density, well-managed. |
| Grainger | Corporate-professional industrial catalog. Dual navigation (search + browse). Content marketing integration. Weakness: CTA color = brand color, reducing functional clarity. |
| DigiKey | 17.6M products with parametric search. Color is purely informational. Manufacturer logos constrained to 155x30px — remarkable sizing discipline. Authorized distribution messaging counters counterfeit anxiety. |
| Atlassian | Token-based color with emphasis levels (subtlest to boldest). 8px spacing base. Three body font weights with strict usage rules. |

**Tier 3 — Cautionary (patterns to study, not replicate)**

| Platform | Lesson |
|---|---|
| RockAuto | Proves "ugly-trustworthy" works for power users. Not a replicable model, but the underlying insight matters: promotional noise destroys trust in this market. |
| Pelican Parts | Technical depth creates trust. Warm backgrounds differentiate. But dated execution undermines credibility for new visitors. |
| Toyota OEM | Corporate restraint is correct, but sterile execution crosses into "government form" territory. Vehicle selector UI demonstrates how formality can become friction. |
| Car Builder Solutions | Shopify-standard execution with dark theme. Review-wall trust model. Demonstrates how template reliance is visible to informed buyers. |

### 1.2 Reusable Patterns That Scale

These patterns appear across all high-trust platforms and should be adopted:

1. **Typography-first hierarchy.** The best systems (McMaster, Carbon) use font size and weight as primary organizational tools, with color as secondary reinforcement.
2. **8px spatial grid.** McMaster, Carbon, Atlassian, and Spectrum all converge on 8px as the base spatial unit. This is not optional.
3. **Role-based color with no decorative usage.** Every platform that achieves "authority" feel uses color to carry meaning, never for decoration.
4. **Two-weight discipline.** Regular + Semibold (or Medium) handles 90% of cases. Bold is reserved for price display and critical status indicators.
5. **Progressive density disclosure.** Category-level pages are spacious; product-detail pages are dense. The system breathes differently at different depths.
6. **Manufacturer identity as trust proxy.** FCP Euro and DigiKey both use brand logos as trust signals. The host platform stays visually neutral; the product brands carry credibility.
7. **Persistent trust strip.** FCP Euro, Grainger, and DigiKey all maintain a persistent trust bar (shipping, returns, warranty). This is industry standard for a reason.

### 1.3 Patterns That Must Be Rejected

| Pattern | Why It Fails |
|---|---|
| Hero carousels | Zero information density. McMaster proves they are unnecessary. Data shows carousel interaction rates below 1% after slide 1. |
| Promotional color gradients | Signal consumer retail, not industrial authority. No tier-1 reference platform uses gradients. |
| Badge proliferation (3+ per card) | FCP Euro's weakness. More than one badge per product card creates visual noise and dilutes the hierarchy of the badge system itself. |
| Dark theme for product catalogs | Car Builder Solutions demonstrates this: dark backgrounds reduce image contrast for product photography and increase reading fatigue for specification text. |
| Animated transitions between states | Motion attracts attention, which is a cost. In a catalog with hundreds of items, micro-animations compete with the user's scanning behavior. |
| Rounded corners > 8px | Excessive rounding signals "friendly consumer app." Industrial authority requires geometric precision. 4-6px radius maximum. |
| Shadow depth > 1 level | Multiple shadow depths create ambiguity about spatial hierarchy. One shadow value, applied consistently. |
| Inline star ratings on product cards | Star ratings are meaningful for consumer products with subjective quality. OEM parts are either correct or incorrect. Fit/no-fit replaces like/dislike. |

---

## 2. Visual Positioning Doctrine

### 2.1 What the UI Must Immediately Communicate

**Mechanical precision.** The interface itself must feel engineered, not designed. Spacing must be mathematically consistent. Alignment must be absolute. The visual system should suggest that the same rigor applied to the interface was applied to the parts catalog.

**Authority and scale.** The platform must feel like it contains thousands of products without showing them all at once. This is communicated through structured navigation, consistent component patterns, and confident whitespace — not through "Browse 600+ products!" messaging.

**Reliability under complexity.** When a user is on a product page with 15 specification rows, 3 compatibility notes, and a pricing block, the interface must remain calm. No element should compete for attention. The hierarchy must be self-evident without scanning.

### 2.2 What It Must Never Communicate

- **Template usage.** No Shopify defaults. No Bootstrap 5 card shadows. No generic icon libraries used without curation. If an informed buyer can identify the template, the platform has failed.
- **Cheapness.** No gradient buttons. No 2px border radius on oversized elements. No uppercase body text. No excessive exclamation marks in UI copy.
- **Over-decoration.** No decorative dividers. No ornamental icons. No background patterns. No floating shapes. If an element does not carry information or aid navigation, it does not exist.
- **Lifestyle branding.** No mood photography. No aspirational copy. No "experience the difference" language. The parts are mechanical objects; the UI should reflect their nature.

### 2.3 Emotional Calibration

| Axis | Left (preferred) | Right (avoided) |
|---|---|---|
| Tone | Calm | Exciting |
| Information | Clarity | Personality |
| Aesthetics | Restraint | Expressiveness |
| Density | Confident | Sparse |
| Typography | Neutral | Characterful |
| Color | Functional | Decorative |
| Layout | Predictable | Surprising |
| Motion | Static | Animated |

This system targets the intersection of **McMaster-Carr's information purity** and **FCP Euro's product merchandising** — technical precision with enough visual warmth to support product photography, but never enough to suggest lifestyle retail.

---

## 3. Typography System

### 3.1 Font Selection

**Primary typeface: Inter**

Rationale:
- Variable font with optical sizing (opsz 14–32), enabling automatic micro-adjustments for text vs. display contexts
- 147 language scripts including Latin, Cyrillic, Greek, Arabic — essential for UAE/GCC audience
- Tabular number feature (`tnum`) critical for price columns and specification tables
- Tall x-height optimized for screen legibility at 13-16px body sizes
- Disambiguation features (`ss02`, `cv08`, `cv05`, slashed zero) prevent misreading of OEM part numbers (O vs 0, I vs l vs 1)
- Used by Figma, GitHub, Linear, and Vercel's own documentation — proven at scale in technical interfaces
- 100-900 weight range with three master designs (100, 400, 900) ensuring quality at every interpolation point
- Open Font License — no licensing constraints

**Monospace companion: Inter's tabular features (preferred) or JetBrains Mono (fallback)**

Used exclusively for: OEM part numbers, SKU codes, engine codes, specification values.

**Font stack:**
```
--font-sans: 'Inter', 'Inter Variable', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', ui-monospace, monospace;
```

**Rejected alternatives and reasons:**

| Font | Rejection Reason |
|---|---|
| Geist Sans | Vercel-ecosystem association. Fewer language scripts than Inter. No optical sizing axis. |
| IBM Plex Sans | Strong IBM brand association. Mathematical scale is rigid. Three-font-family system (Sans + Serif + Mono) is over-specified for this use case. |
| Roboto | Google Material association. Humanist proportions are too warm for industrial context. |
| Helvetica Neue | No variable font support. No tabular numbers feature. License cost. |
| System fonts only | Inconsistent rendering across devices undermines visual precision. Unacceptable for a system that claims mechanical rigor. |

### 3.2 Type Scale

The scale uses a **1.200 ratio (minor third)** — the same mathematical discipline used by IBM Carbon, adapted for e-commerce density requirements.

Base size: 15px (desktop) / 16px (mobile)

| Token | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| `text-xs` | 11px / 1.45 | 12px / 1.45 | 400-500 | Microcopy, timestamps, tertiary labels |
| `text-sm` | 13px / 1.5 | 14px / 1.5 | 400-500 | Secondary text, filter labels, metadata |
| `text-base` | 15px / 1.6 | 16px / 1.6 | 400 | Body text, descriptions, form inputs |
| `text-md` | 18px / 1.45 | 18px / 1.45 | 500-600 | Subheadings, card titles, section labels |
| `text-lg` | 21px / 1.35 | 21px / 1.35 | 600 | Page section headings |
| `text-xl` | 26px / 1.3 | 24px / 1.3 | 600 | Page titles |
| `text-2xl` | 31px / 1.2 | 28px / 1.25 | 600 | Hero headings, primary page titles |
| `text-3xl` | 37px / 1.15 | 32px / 1.2 | 600-700 | Landing page titles only |

**Line-height rationale:** Larger text gets tighter line-height (1.15-1.3) because heading text is read as a unit. Body text gets looser line-height (1.5-1.6) because paragraphs require inter-line scanning.

### 3.3 Weight Discipline

The system uses exactly three weights:

| Weight | Token | Permitted Uses | Forbidden Uses |
|---|---|---|---|
| Regular (400) | `font-normal` | Body text, descriptions, form inputs, table cells, secondary labels | Never for headings, CTAs, or prices |
| Medium (500) | `font-medium` | Navigation items, card titles, form labels, breadcrumbs, tertiary headings | Never for body paragraphs, never for primary headings |
| Semibold (600) | `font-semibold` | Page headings, section titles, prices, primary CTAs, critical status text | Never for body text, never for more than 2 consecutive lines |

**Bold (700) is restricted.** It is permitted only for:
- Primary page hero headings at `text-2xl` or larger
- Price display when the price is the primary focus of a component (e.g., PDP price block)
- "Out of Stock" status when it is the only status indicator visible

Bold at body text sizes creates visual aggression that undermines calm.

### 3.4 OpenType Feature Requirements

```css
font-feature-settings:
  'liga' 1,    /* Standard ligatures */
  'calt' 1,    /* Contextual alternates */
  'tnum' 1,    /* Tabular numbers — critical for price alignment */
  'zero' 1,    /* Slashed zero — prevents O/0 confusion in part numbers */
  'ss02' 1;    /* Disambiguation set — I/l/1 differentiation */
```

These features are non-negotiable for a platform that displays OEM part numbers. The difference between part number `1OI0` and `lO10` is a wrong-part shipment.

### 3.5 Typography Failure Cases

| Failure | Why It Fails | Prevention |
|---|---|---|
| Bold body text | Creates visual shouting. Undermines calm. | Lint rule: no `font-bold` below `text-md` |
| ALL CAPS body text | Reduces legibility by 10-15%. Feels hostile. | Uppercase permitted only for badges, overline labels, and button text at `text-xs` / `text-sm` |
| Centered body paragraphs | Ragged left edges destroy readability after 2 lines | Center alignment only for hero headings and single-line display text |
| More than 3 font sizes on one screen | Creates visual noise. Signals lack of system. | Maximum 4 scale levels per viewport (e.g., heading + subhead + body + micro) |
| Inconsistent number formatting | Prices misalign in grids. Specification columns wobble. | Tabular numbers (`tnum`) mandatory for all numeric content |
| Product names longer than 2 lines | Card layouts break. Visual rhythm destroyed. | `line-clamp-2` on all card-level product names. Full name on PDP only. |
| Italic for emphasis in UI | Inter's italic is a true italic with different letter shapes. Emphasis should use weight, not style. | Italic permitted only for: placeholder text, technical term definitions, legal/disclaimer copy |

### 3.6 Letter-Spacing Rules

| Context | Letter-spacing | Rationale |
|---|---|---|
| Uppercase labels and badges | +0.04em to +0.06em | Compensates for reduced inter-character whitespace in caps |
| Heading text at `text-xl`+ | -0.01em to -0.02em | Tightens large text for visual cohesion |
| Body text | 0 (normal) | Inter is designed for zero tracking at body sizes |
| Monospace/part numbers | 0 (normal) | Tabular alignment handles spacing |
| Price display | 0 (normal) | Tabular numbers handle alignment |

---

## 4. Color System

### 4.1 Design Principles

This color system follows four laws:

1. **Color must carry meaning.** If a color does not indicate status, hierarchy, or function, it does not belong.
2. **Neutral foundation, functional accents.** The interface is 90%+ neutral tones. Color appears sparingly and deliberately.
3. **Contrast first, brand second.** WCAG AA (4.5:1 for text) is the minimum. AAA (7:1) is the target for body text.
4. **One primary action color.** The entire system has exactly one color that means "primary interactive element." This color appears on primary buttons, active states, and links. Nothing else.

### 4.2 Neutral Foundation

The neutral palette provides the structural canvas. It is the most important palette in the system because it occupies 90% of viewport pixels.

| Token | Value | Role | Contrast vs White |
|---|---|---|---|
| `--neutral-950` | `#0C1220` | Deepest text, primary headings | 18.2:1 |
| `--neutral-900` | `#111827` | Primary body text | 16.4:1 |
| `--neutral-800` | `#1E293B` | Secondary headings, strong labels | 12.6:1 |
| `--neutral-700` | `#334155` | Tertiary text, active navigation | 8.2:1 |
| `--neutral-600` | `#475569` | Muted text, placeholders | 5.9:1 |
| `--neutral-500` | `#64748B` | Disabled text, captions | 4.3:1 |
| `--neutral-400` | `#94A3B8` | Placeholder text, decorative borders | 2.7:1 |
| `--neutral-300` | `#CBD5E1` | Dividers, inactive borders | 1.7:1 |
| `--neutral-200` | `#E2E8F0` | Card borders, input borders | 1.4:1 |
| `--neutral-100` | `#F1F5F9` | Alternate section backgrounds, filter panels | 1.1:1 |
| `--neutral-50` | `#F8FAFC` | Subtle surface differentiation | 1.05:1 |
| `--neutral-0` | `#FFFFFF` | Primary surface | 1:1 |

**Chromatic temperature:** The neutral scale carries a cool-slate undertone (blue-gray). This is intentional:
- Cool neutrals signal precision and professionalism (medical equipment, engineering tools)
- Warm neutrals signal comfort and hospitality (unacceptable for industrial context)
- Pure gray (zero saturation) feels dead on screen — slight chromatic bias prevents this

### 4.3 Functional Colors

Each functional color has exactly one semantic role. No color serves two meanings.

#### 4.3.1 Primary Action — Indigo-Blue

| Token | Value | Use |
|---|---|---|
| `--action-600` | `#4338CA` | Primary buttons, primary links, active tab indicators |
| `--action-700` | `#3730A3` | Hover state for primary action |
| `--action-800` | `#312E81` | Active/pressed state |
| `--action-100` | `#E0E7FF` | Selected state backgrounds (e.g., active filter chip) |
| `--action-50` | `#EEF2FF` | Hover backgrounds on selectable rows/cards |

**Why indigo-blue, not pure blue:** Pure blue (#0066CC or #2563EB range) is overused to the point of generic association with "link" and "button." Indigo-blue (#4338CA) provides:
- Stronger distinction from informational blue (used for notes/info callouts)
- Higher perceived authority (deeper, more serious tone)
- Better contrast ratios against white at the same perceived brightness
- No association with any specific platform or framework

**Why not red, orange, or green for primary action:**
- Red = error/danger in every mature design system. Using red for primary CTAs creates semantic collision.
- Orange = warning state. Same collision problem.
- Green = success/positive state. "Add to cart" being green works until you also need "In Stock" green — the two meanings compete.

#### 4.3.2 Status Colors

| Status | Token | Value | Exclusive Use |
|---|---|---|---|
| Success / In Stock | `--status-success-600` | `#059669` | "In Stock" indicator, successful form submission, order confirmed |
| Success background | `--status-success-50` | `#ECFDF5` | Success message background |
| Warning / Low Stock | `--status-warning-600` | `#D97706` | "Low Stock" indicator, form validation warnings, attention-needed states |
| Warning background | `--status-warning-50` | `#FFFBEB` | Warning message background |
| Error / Out of Stock | `--status-error-600` | `#DC2626` | "Out of Stock" indicator, form errors, destructive action confirmation |
| Error background | `--status-error-50` | `#FEF2F2` | Error message background |
| Sale / Price reduction | `--status-sale-600` | `#EA580C` | Sale badge, struck-through price color, price reduction indicator |

**WhatsApp — third-party brand color (special case):**

| Token | Value | Use |
|---|---|---|
| `--brand-whatsapp` | `#25D366` | WhatsApp FAB button only |
| `--brand-whatsapp-dark` | `#128C7E` | WhatsApp button hover only |

This green is never used for any other purpose. It is not a system color; it is a third-party brand constant.

#### 4.3.3 Informational Color

| Token | Value | Use |
|---|---|---|
| `--info-600` | `#0284C7` | Informational callouts, help text badges, tooltip borders |
| `--info-50` | `#F0F9FF` | Informational banner backgrounds |

### 4.4 Color Application Rules

**Rule 1: Maximum 2 chromatic colors per viewport.** At any screen position, the user should see at most 2 non-neutral colors. A product card may show a Sale badge (orange) and an "In Stock" indicator (green). Adding a third color (e.g., a blue "New" badge) violates this rule.

**Rule 2: Neutral is the default. Color is the exception.** Borders are neutral. Backgrounds are neutral. Text is neutral. Only elements that carry semantic meaning receive color.

**Rule 3: Color intensity matches importance.**
- `600` values: primary states, buttons, badges (high importance)
- `100` values: background tints, selected states (medium importance)
- `50` values: hover states, subtle indicators (low importance)

**Rule 4: No color-only communication.** Every color-coded element must also communicate its meaning through text, icon shape, or position. "In Stock" is green text reading "In stock" — not a green dot alone.

**Rule 5: Hover and active states follow mathematical steps.**
- Hover = one step darker (600 → 700)
- Active = two steps darker (600 → 800)
- Disabled = neutral-400 with 50% opacity

This matches IBM Carbon's interaction-state math and ensures predictable state transitions.

### 4.5 Color Misuse Prevention

| Misuse | Correction |
|---|---|
| Using action color for non-interactive elements | Action color is reserved for elements that respond to user input |
| Using success green for promotional "GO" messaging | Success green means a system state (in stock, confirmed), never marketing emphasis |
| Using red for brand emphasis or visual "pop" | Red means error or out-of-stock. No exceptions. |
| Coloring section headers for visual variety | Section headers are neutral-900. Color variation between sections destroys hierarchy consistency. |
| Using background color to signal section changes | Alternate surfaces use neutral-50 / neutral-100 only. No colored section backgrounds except for system banners (error, success, info). |
| Applying opacity to create color variants | Use the defined token steps. Opacity creates inconsistent contrast ratios across surfaces. |
| Using WhatsApp green for success/in-stock | WhatsApp green is a brand constant. System success green is a different value serving a different semantic role. |

---

## 5. Layout, Grid, and Rhythm Laws

### 5.1 Grid System

**Base unit: 8px.** Every spatial value in the system is a multiple of 8. No exceptions.

This aligns with McMaster-Carr, IBM Carbon, Atlassian, and Adobe Spectrum. The convergence of four independent world-class design systems on 8px is not coincidence — it maps cleanly to common screen densities, halves/doubles cleanly, and produces visually harmonious relationships.

**Column system:**

| Breakpoint | Token | Width | Columns | Gutter | Margin |
|---|---|---|---|---|---|
| Mobile | `--bp-sm` | 0-639px | 4 | 16px | 16px |
| Tablet | `--bp-md` | 640-1023px | 8 | 24px | 24px |
| Desktop | `--bp-lg` | 1024-1279px | 12 | 24px | 32px |
| Wide | `--bp-xl` | 1280-1535px | 12 | 32px | Auto (centered) |
| Ultrawide | `--bp-2xl` | 1536px+ | 12 | 32px | Auto (centered) |

**Maximum content width: 1280px.**

Rationale:
- McMaster-Carr uses ~1200-1400px. FCP Euro uses ~1280px. Carbon's max breakpoint is 1584px but content rarely fills it.
- 1280px on a 1920px monitor provides ~320px of margin on each side — enough peripheral calm to prevent the interface from feeling like a spreadsheet.
- At 15px body text with 1.6 line-height, a 1280px container with proper column splits ensures body text never exceeds ~80 characters per line.

**Narrow content width: 720px.** For long-form text pages (About, FAQ, Returns, Privacy). Human reading cognition degrades above ~75 characters per line. At 15px, 720px produces approximately 65-70 characters per line.

### 5.2 Spacing Scale

All spacing values are multiples of the 8px base unit:

| Token | Value | Use |
|---|---|---|
| `--space-1` | 4px | Dense inline spacing (icon-to-text gap inside buttons) |
| `--space-2` | 8px | Tight component internal padding, gap between related items |
| `--space-3` | 12px | Standard inline padding, small card padding |
| `--space-4` | 16px | Default component padding, form field spacing |
| `--space-5` | 20px | Card internal padding on mobile |
| `--space-6` | 24px | Card internal padding on desktop, gap between cards in grid |
| `--space-8` | 32px | Section internal padding (small sections) |
| `--space-10` | 40px | Section internal padding (standard) |
| `--space-12` | 48px | Section gap on mobile |
| `--space-16` | 64px | Section gap on desktop |
| `--space-20` | 80px | Major page section separation |
| `--space-24` | 96px | Hero section vertical padding |

**The 4px exception:** `--space-1` (4px) is the only non-8px value. It exists for micro-spacing inside dense components. It is not permitted for layout-level spacing.

### 5.3 Vertical Rhythm

**Section separation follows a two-tier model:**

1. **Within-section spacing:** Components inside a section are separated by `--space-4` to `--space-8` (16-32px). This creates visual grouping.
2. **Between-section spacing:** Sections are separated by `--space-16` (64px) on desktop and `--space-12` (48px) on mobile. This creates clear content boundaries.

**Surface alternation for section differentiation:** Consecutive sections alternate between `--neutral-0` (white) and `--neutral-50` (off-white) backgrounds. This is the only permitted method of visual section separation. No colored backgrounds. No decorative dividers. No gradient transitions.

### 5.4 Alignment Absolutes

**What must always align:**

| Element | Alignment Rule |
|---|---|
| Product card edges in a grid | Left edges form a perfect vertical line. No staggered or masonry layouts. |
| Price text across cards in the same row | Prices must appear at the same vertical position across horizontally-adjacent cards. Requires consistent card height management. |
| Section headings | Left-aligned to the container edge. Never centered (except hero). Never indented. |
| Table columns | Right-aligned for numeric data. Left-aligned for text data. |
| Form labels and inputs | Labels above inputs (stacked). Never inline for multi-field forms. |
| Navigation items | Baseline-aligned within horizontal navigation bars. |
| Badge position on product cards | Top-left corner. Consistent X/Y offset. Never top-right, never bottom. |

**What must never float:**

| Element | Constraint |
|---|---|
| CTAs in cards | Pinned to card bottom via flexbox. Never floating at varying heights across a row. |
| Prices in cards | Must share vertical alignment across grid siblings. |
| Product images | Fixed aspect ratio (4:3 or 1:1). Never variable-height images that break grid alignment. |
| Sidebar filters | Aligned to the top of the product grid. Scroll independently only via `position: sticky`. |

### 5.5 Product Image Aspect Ratios

| Context | Ratio | Rationale |
|---|---|---|
| Product card thumbnail | 4:3 | Landscape orientation accommodates engine parts that are typically wider than tall. Provides consistent card height. |
| PDP primary image | 1:1 | Square format provides maximum image area. Standard for e-commerce detail views. |
| Category/vehicle tile | 16:9 | Landscape banner proportion for navigation tiles. |
| Trust/brand logo | Constrained to max 160px x 32px | Prevents logo size competition. Following DigiKey's 155x30px constraint model. |

All product images must use `object-fit: contain` with a neutral background (neutral-50 or white). Never crop. Never stretch. Parts have irregular shapes; forcing them into a fill creates visual dishonesty.

---

## 6. Component Visual System

### 6.1 Design Principles for Components

1. **Each component has exactly one visual purpose.** A badge communicates status. A button triggers action. A card contains a sellable entity. No component serves mixed roles.
2. **Component variants are additive, not multiplicative.** A button has 3 variants (primary, secondary, ghost). Not 9 (3 variants x 3 sizes) unless each combination serves a distinct, documentable purpose.
3. **Visual consistency over expressive variety.** All cards look like cards. All buttons look like buttons. Consistency across 600+ product pages is worth more than novelty on any single page.

### 6.2 Buttons

Three variants. No gradients. No shadows. No icons by default (icons are optional additions).

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--action-600` | `--neutral-0` (white) | none | One per viewport section. "Add to cart", primary CTA. |
| Secondary | transparent | `--neutral-800` | 1px `--neutral-300` | Supporting actions. "View details", "Clear filters". |
| Ghost | transparent | `--action-600` | none | Tertiary actions. "Show more", inline text actions. |

**Button sizing:**

| Size | Height | Padding (H) | Font | Radius | Use |
|---|---|---|---|---|---|
| Small | 32px | 12px | `text-sm` / 500 | 4px | Dense contexts: table rows, filter chips, inline actions |
| Default | 40px | 16px | `text-base` / 500 | 6px | Standard forms, card CTAs, page-level actions |
| Large | 48px | 24px | `text-base` / 600 | 6px | Hero CTAs, full-width mobile actions, checkout |

**Button states:**

| State | Change | Duration |
|---|---|---|
| Hover | Background one step darker (600 → 700) | 150ms ease |
| Active | Background two steps darker (600 → 800) | 0ms (instant) |
| Focus | 2px ring in `--action-600` with 3px offset | 0ms (instant) |
| Disabled | Opacity 0.4. Cursor not-allowed. | -- |
| Loading | Text replaced by spinner (same dimensions). No layout shift. | -- |

**Button rules:**
- Full uppercase text only at `text-sm` or smaller.
- Sentence case for all default and large buttons ("Add to cart", not "ADD TO CART" or "Add To Cart").
- Maximum label length: 3 words for primary, 4 words for secondary.
- Icon-only buttons require `aria-label` and minimum 40px touch target.

### 6.3 Cards

**Product card (PLP context):**

| Zone | Content | Styling |
|---|---|---|
| Image zone | Product photo, 4:3 ratio, `object-fit: contain`, neutral-50 bg | No border on image. Card border contains everything. |
| Badge zone | Maximum 1 badge (priority: Sale > Out of Stock > New) | Top-left, 8px inset from card edge. |
| Category overline | Category name | `text-xs`, uppercase, `--neutral-500`, letter-spacing +0.05em |
| Product name | Truncated to 2 lines | `text-sm`, `font-medium`, `--neutral-900`, `line-clamp-2` |
| Price zone | Price or "Request price" | `text-lg`, `font-semibold`, `--neutral-900` for price. `text-sm`, `--neutral-500` for request. |
| CTA zone | Button pinned to bottom | Primary "Add to cart" if purchasable. Secondary "View details" if not. |

Card specification:
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Shadow: `0 1px 3px rgba(0,0,0,0.06)` — one value only
- Hover: shadow transitions to `0 2px 8px rgba(0,0,0,0.1)` over 200ms
- Internal padding: `--space-4` (16px) below image zone

**Information card (non-product context):**

Used for: trust strip items, feature callouts, contact methods, vehicle/model selection tiles.

- Background: `--neutral-0` or `--neutral-50`
- Border: 1px solid `--neutral-200`
- Radius: 6px
- Padding: `--space-6` (24px)
- No shadow (differentiates from product cards which are "interactive objects")
- Hover (if interactive): border transitions to `--neutral-400`

### 6.4 Badges

Badges communicate a single status. One badge per product. Maximum 2 badges visible in any single viewport quadrant.

| Badge | Background | Text | Use |
|---|---|---|---|
| Sale | `--status-sale-600` | white | Product with validated price reduction |
| Out of Stock | `--neutral-200` | `--neutral-600` | Product not currently available |
| Low Stock | `--status-warning-50` | `--status-warning-600` | 5 or fewer units |
| New | `--neutral-900` | white | Products added in the last 30 days |
| OEM | `--action-100` | `--action-600` | Genuine OEM verification marker |

Badge specification:
- Font: `text-xs`, `font-medium`, uppercase, letter-spacing +0.05em
- Padding: 4px 8px
- Radius: 4px
- No icons inside badges. Text only.

**Badge priority (when multiple apply):** Sale > Out of Stock > Low Stock > New > OEM. Only the highest-priority badge is shown.

### 6.5 Tables

Used for: specification tables on PDP, order history, comparison views.

| Element | Style |
|---|---|
| Header row | Background: `--neutral-100`. Text: `text-xs`, `font-semibold`, uppercase, `--neutral-600` |
| Body rows | Alternating `--neutral-0` / `--neutral-50`. Text: `text-sm`, `font-normal`, `--neutral-800` |
| Cell padding | 12px vertical, 16px horizontal |
| Borders | Horizontal only: 1px solid `--neutral-200`. No vertical borders. |
| Numeric cells | Right-aligned, tabular numbers enabled |
| Text cells | Left-aligned |

**Table rules:**
- No rounded corners on tables.
- No hover row highlighting unless the table is interactive (clickable rows).
- Maximum 6 columns on desktop. More than 6 requires a different pattern.
- On mobile: tables of 4+ columns become stacked key-value pairs. Never horizontal-scroll tables.

### 6.6 Filters

**Filter sidebar specification:**

| Element | Style |
|---|---|
| Container | Background: `--neutral-100`. Border-radius: 6px. Padding: `--space-5` (20px). Border: 1px solid `--neutral-200`. |
| Section label | `text-xs`, `font-semibold`, uppercase, `--neutral-600`, letter-spacing +0.05em |
| Section spacing | `--space-6` (24px) between filter sections |
| Filter option (text) | `text-sm`, `font-normal`, `--neutral-800` |
| Filter option (active) | Background: `--action-100`. Text: `--action-600`. `font-medium`. |
| Checkbox | 16px x 16px. Border: 1px `--neutral-400`. Checked: `--action-600` fill with white checkmark. |
| Count badge | `text-xs`, `--neutral-500`, inline after option text |
| Clear action | `text-xs`, `--status-sale-600`, `font-medium`. Right-aligned to section label. |

**Filter rules:**
- Maximum 6 filter sections visible without scrolling.
- Collapsible sections for sections beyond the 6th.
- "Clear all" action visible whenever any filter is active.
- Active filter count displayed in the filter header (mobile toggle).

### 6.7 Status Indicators

| Status | Visual | Text | Color |
|---|---|---|---|
| In Stock | 8px filled circle + text | "In stock" | `--status-success-600` |
| Low Stock | 8px filled circle + text | "Low stock -- X remaining" | `--status-warning-600` |
| Out of Stock | 8px filled circle + text | "Out of stock" | `--status-error-600` |
| On Request | 8px open circle (border only) + text | "Price on request" | `--neutral-500` |

Specification:
- Circle and text baseline-aligned
- 8px gap between circle and text
- Text: `text-sm`, `font-medium`
- Never use status indicators without text labels

---

## 7. Mobile Visual Discipline

### 7.1 Density Rules

**Maximum items per initial viewport (above the fold):**

| Page | Maximum Items | Rationale |
|---|---|---|
| Homepage hero | 1 primary CTA, 1 secondary CTA | Focus determines conversion. |
| Product grid | 4 products (2x2) | More than 4 makes the grid feel like a feed, not a catalog. |
| Filter panel | 4 filter sections visible | Remaining behind accordion. |
| PDP above fold | Image + name + price + primary CTA | All other content below fold by design. |
| Navigation | 5 primary categories visible | Remaining behind "All categories" link. |

**Text truncation logic:**

| Element | Mobile Rule |
|---|---|
| Product name | `line-clamp-2` |
| Category name | `line-clamp-1` |
| Product description | Hidden on card level. Visible only on PDP. |
| OEM part number | Full display — never truncate technical identifiers |
| Price | Full display — never truncate or abbreviate currency |
| Breadcrumb | Parent > Current only. |

### 7.2 Thumb Safety

**Tap target discipline:**

| Element | Minimum Size | Minimum Spacing |
|---|---|---|
| Buttons | 44px height | 8px between adjacent buttons |
| Navigation links | 44px touch area | 4px visual separation |
| Filter options | 44px touch area | 0px visual (padding creates touch area) |
| Card (as tap target) | Full card is tappable | 12px gap between cards |
| Close/dismiss buttons | 44px x 44px touch area | 8px from container edge |
| Checkbox/radio | 44px x 44px touch area | 8px between options |

**Edge avoidance:**
- No interactive elements within 16px of screen left/right edges
- Bottom sticky CTAs must respect `env(safe-area-inset-bottom)`
- Swipe-gesture-dependent interactions are forbidden

### 7.3 Visual Calm Under Scroll

**Sticky element restraint:**

| Permitted Sticky Elements | Max Height | Condition |
|---|---|---|
| Header (simplified) | 56px | Collapses from full header on scroll |
| Bottom CTA bar (PDP only) | 64px (including safe area) | Only when "Add to cart" scrolls out of view |
| Filter toggle (PLP only) | 44px | Only when scrolled past organic filter entry point |

**Maximum combined sticky height: 120px.** Preserves 75%+ of viewport for scrollable content on a 640px-tall screen.

**Forbidden sticky elements:** Trust strip, search bar, "Back to top" buttons, persistent cookie/consent banners.

**Motion minimization:**
- No parallax scrolling
- No entrance animations on scroll (fade-in, slide-up)
- No loading skeleton animations that loop indefinitely
- Permitted motion: button state transitions (150ms), card hover shadow (200ms), modal open/close (200ms ease-out)
- Maximum individual animation duration: 300ms

### 7.4 Mobile Component Adaptations

| Component | Desktop | Mobile Adaptation |
|---|---|---|
| Product grid | 3-4 columns | 2 columns. Card padding reduces to `--space-3`. |
| Filter sidebar | Persistent left column | Overlay panel, full width, z-index above content. |
| Product card CTA | Text button | Can reduce to icon-only cart button (44px minimum). |
| Specification table | Horizontal columns | Stacked key-value pairs. |
| Breadcrumb | Full path | Parent > Current only. |
| Navigation | Horizontal category bar | Hamburger with category tree. Slide-in from left, 200ms. |
| Trust strip | 4-item horizontal bar | 2x2 grid or horizontal scroll (no auto-scroll). |
| Footer | 4-column grid | Single column accordion (collapsed by default). |

---

## 8. Anti-Pattern Registry

### Critical (must never ship)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| C-01 | More than 1 badge per product card | Dilutes status hierarchy. |
| C-02 | Color-only communication (no text/icon pairing) | Accessibility failure for 8% of male users with color vision deficiency. |
| C-03 | Price displayed as "0.00" or "0 AED" | Signals data error. Destroys trust. Show "Price on request" instead. |
| C-04 | Bold weight on body text paragraphs | Visual aggression. Undermines calm authority. |
| C-05 | Interactive element below 44px touch target on mobile | WCAG 2.5.8 failure. Causes mis-taps. |
| C-06 | More than 120px of combined sticky elements on mobile | Consumes >25% of viewport. Content claustrophobia. |
| C-07 | Sale badge on product with no genuine price reduction | `sale_price` must be > 0 AND < `regular_price` AND `regular_price` > 0. Anything else is visual fraud. |

### Major (resolve within sprint)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| M-01 | More than 3 font sizes in a single viewport | Visual noise. Signals template origin. |
| M-02 | Centered body text beyond 1 line | Ragged left edges destroy readability. |
| M-03 | Inconsistent card heights in a product grid row | Breaks alignment. Creates visual wobble. |
| M-04 | Shadow with more than 1 definition (multi-layered) | Ambiguous depth hierarchy. |
| M-05 | Using system success-green for WhatsApp buttons | Semantic collision between system status and brand identity. |
| M-06 | Inline star ratings on automotive parts | OEM parts are correct-fit or wrong-fit, not subjectively rated. |
| M-07 | Auto-playing carousels | <1% engagement after slide 1. Motion competes with scanning. |
| M-08 | Decorative dividers | Information should be separated by space, not decoration. |

### Minor (track for refinement)

| ID | Anti-Pattern | Failure Mode |
|---|---|---|
| m-01 | Using border-radius > 6px on cards/buttons | Exceeds industrial precision tolerance. |
| m-02 | Title Case on buttons ("Add To Cart") | Sentence case is correct. Title case signals template default. |
| m-03 | Generic placeholder images for products | Low-effort appearance destroys product credibility. |
| m-04 | Footer with more than 4 columns on desktop | Column proliferation signals content governance failure. |
| m-05 | Newsletter popup on first visit | Zero precedent in tier-1 industrial platforms. |
| m-06 | Opacity for disabled states below 0.4 | Text becomes unreadable. |

---

## Appendix A: Token Reference

```
/* Surfaces */
--surface-primary:     var(--neutral-0);
--surface-secondary:   var(--neutral-50);
--surface-tertiary:    var(--neutral-100);
--surface-card:        var(--neutral-0);
--surface-overlay:     rgba(12, 18, 32, 0.5);

/* Text */
--text-primary:        var(--neutral-900);
--text-secondary:      var(--neutral-600);
--text-tertiary:       var(--neutral-500);
--text-inverse:        var(--neutral-0);
--text-disabled:       var(--neutral-400);

/* Borders */
--border-default:      var(--neutral-200);
--border-strong:       var(--neutral-400);
--border-focus:        var(--action-600);
--border-error:        var(--status-error-600);

/* Interactive */
--interactive-primary:        var(--action-600);
--interactive-primary-hover:  var(--action-700);
--interactive-primary-active: var(--action-800);

/* Shadows */
--shadow-sm:  0 1px 2px rgba(0,0,0,0.04);
--shadow-md:  0 1px 3px rgba(0,0,0,0.06);
--shadow-lg:  0 2px 8px rgba(0,0,0,0.1);

/* Spacing */
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

---

## Appendix B
```

