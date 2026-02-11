# Header + Hero Entry System Blueprint

## Executive Summary

The current above-the-fold system has five structural problems:

1. **Duplicated search**: A compact `SearchBar` in the header and a large `HeroSearch` in the hero do the same thing. On the homepage, the user sees two search inputs simultaneously. This is indecisive design.
2. **Inflated hero**: `py-16 lg:py-24` creates excessive vertical space for a section that contains one heading, one subheadline, one input, and two trust lines. The hero stretches to fill a landing-page template it does not need.
3. **Redundant trust signals**: Trust claims appear twice above the fold -- once as check-mark items inside the hero (`OEM Genuine Parts`, `1-3 Day UAE Delivery`, `619+ Parts in Stock`) and again in `TrustStrip` immediately below the first product grid. Both lists are nearly identical. Neither is authoritative.
4. **WhatsApp ambiguity**: WhatsApp appears four times in the full page flow -- header icon, hero helper text ("ask us on WhatsApp"), floating button, and footer CTA banner. The header icon has no label and no clear role distinction from the float.
5. **Headline is generic**: "Find Your Part" is a filler heading. The subheadline "Search by part number, engine code, or vehicle name" restates what the input placeholder already communicates. Neither line establishes what TopEngine is or why a mechanic should trust it.

These are not cosmetic issues. They produce decision fatigue, vertical bloat, and a lack of authority. The system below corrects each one.

---

## Phase 1 -- Hierarchy Map

### Element Roles (Exact)

| Element | Role | Current Problem |
|---------|------|-----------------|
| **Logo** | Brand anchor. Identifies TopEngine. Links to homepage. | Correctly sized at h-9. No issue. |
| **Header search** | Quick repeat-access search for non-homepage pages. | Competes with hero search on homepage. Must be suppressed on homepage. |
| **"All Parts" link** | Primary catalog entry. Navigates to /shop. | Styled as `text-disabled` -- reads as inactive. Should be full-contrast nav. |
| **"Vehicles" link** | Secondary catalog entry. Navigates to /vehicles. | Same styling issue. Equally weighted with "All Parts" when it should be secondary. |
| **WhatsApp icon (header)** | Assisted-search escape hatch. | No label. Redundant with floating button. Remove from header entirely. |
| **Hamburger (mobile)** | Opens mobile nav drawer. | Correct. No change. |

### Rebalanced Hierarchy

**Visually dominant (Tier 1):**
- Hero search input. This is the primary action for the entire site. It must be the single loudest element above the fold.

**Visually present (Tier 2):**
- Logo (anchors identity, always visible).
- Headline (contextualizes the search, read once).
- "All Parts" nav link (primary browse path).

**Visually quiet (Tier 3):**
- "Vehicles" nav link (secondary browse path).
- Contextual label above headline (establishes authority once).
- Helper actions below search (browse by vehicle, WhatsApp assist).
- Trust line (single row, below search).

### Elements to Change

| Action | Element | Rationale |
|--------|---------|-----------|
| **Remove** | WhatsApp icon from header | Redundant with persistent floating button. Clutters header with an orphaned green icon. |
| **Suppress** | Header search bar on homepage | Homepage has hero search. Showing both is confusing. Header search appears on all other pages. |
| **Upscale** | "All Parts" nav link | Change from `text-disabled` to `text-inverse/80` with hover to full `text-inverse`. Primary navigation should not look disabled. |
| **Downscale** | "Vehicles" nav link | Keep as-is or slightly lighter than "All Parts" to create visual rank. |
| **Add** | Phone number to header (desktop, right-aligned) | A parts supplier's header should show a phone number. It signals legitimacy. Format: plain text `+971 55 152 1264`, `text-disabled`, 12px. No icon. |

---

## Phase 2 -- Hero Section Rebalance

### Current Content Stack (vertical order)

1. Contextual label: "UAE's OEM Engine Parts Supplier" -- 13px uppercase, muted
2. Headline: "Find Your Part" -- 32/40px bold
3. Subheadline: "Search by part number, engine code, or vehicle name." -- 15/16px
4. Search input -- 52px height, max-w-xl
5. Helper text: "Or browse by vehicle / ask us on WhatsApp" -- 13px
6. Trust line: three check-mark items -- 12px

**Total vertical padding**: `py-16 lg:py-24` = 64px/96px top + bottom = 128px/192px of empty space wrapping ~220px of content.

### Revised Content Stack

1. **Contextual label** (keep, revise copy):
   - Current: "UAE's OEM Engine Parts Supplier"
   - Revised: **"OEM Engine Components -- UAE"**
   - Rationale: Shorter, more technical. Drops "Supplier" (implied). Drops possessive marketing tone.

2. **Headline** (revise):
   - Current: "Find Your Part"
   - Revised: **"Diesel Engine Parts. Sourced Direct."**
   - Rationale: States what TopEngine sells (diesel engine parts, predominantly 1GD/2GD/WL/YD25 -- all diesel). "Sourced Direct" implies OEM supply chain without saying "we are the best." Two short sentences read as confident and factual.

3. **Subheadline** (revise):
   - Current: "Search by part number, engine code, or vehicle name."
   - Revised: **"Toyota, Nissan, Ford, Mitsubishi. Search by OEM number or engine code."**
   - Rationale: Names the four makes immediately (establishes scope). The search-method instruction remains but is tightened. Removes "vehicle name" since that is what the placeholder examples demonstrate.

4. **Search input** (keep, adjust spacing):
   - Reduce `mb-8` above search to `mb-6`.
   - Keep 52px height, max-w-xl, rotating placeholders.
   - The input is the primary object. It must feel like the natural next action after reading the headline.

5. **Helper text** (restructure -- see Phase 3):
   - Two inline links, separated by a middle-dot.
   - Left: "Browse all parts" (links to /shop) -- primary fallback.
   - Right: "Browse by vehicle" (links to /vehicles) -- secondary fallback.
   - WhatsApp removed from this line. It has its own persistent float.

6. **Trust line** (revise -- see Phase 4)

### Vertical Rhythm Rules

| Rule | Value | Rationale |
|------|-------|-----------|
| Hero top padding | `pt-12 lg:pt-16` (48px / 64px) | Reduced from 64px/96px. The header is 56px; hero content should begin closer to it. |
| Hero bottom padding | `pb-12 lg:pb-16` (48px / 64px) | Symmetric with top. Reduced from 64px/96px. |
| Label to headline | `mb-3` (12px) | Reduced from `mb-4`. Tighter coupling. |
| Headline to subheadline | `mb-2` (8px) | Reduced from `mb-3`. These are one thought. |
| Subheadline to search | `mb-6` (24px) | Reduced from `mb-8`. Still a clear break before the input. |
| Search to helper text | `mt-4` (16px) | Reduced from `mt-5`. |
| Helper text to trust line | `mt-5` (20px) | Reduced from `mt-8`. These are both small-text supportive elements. |

**Net effect**: Hero section shrinks by roughly 80-100px total height. Content density increases without feeling cramped. The hero no longer dominates the viewport on desktop -- the product grid peeks above the fold, which is desirable.

---

## Phase 3 -- Search UX Refinement

### Search Intent Modes

The current search input handles all queries identically. The rotating placeholders hint at three distinct intent modes. These should be acknowledged in UX design even if the backend treats them uniformly for now.

| Mode | Signal | Example | Behavior |
|------|--------|---------|----------|
| **Exact lookup** | User types an OEM part number or engine code | `89661-F0B00`, `1GD-FTV` | Should surface exact SKU/tag matches first. Mono-spaced hint styling would reinforce this mode. |
| **Fuzzy search** | User types a part description | `turbocharger`, `crankshaft` | Should surface category/name matches. This is the default assumption. |
| **Assisted entry** | User does not know what to type | (no input) | The helper links below search serve this role: browse catalog, browse by vehicle. |

### Placeholder Rotation (Revised)

Current placeholders mix formats. Revised set should cleanly demonstrate all three modes:

```
"Search: 89661-F0B00"          // OEM number
"Search: 1GD turbocharger"     // Engine code + part name
"Search: Hilux crankshaft"     // Vehicle + part name
"Search: YD25 injector"        // Engine code + part name
"Search: WL alternator"        // Engine code + part name
```

Prefix each with "Search:" to make the input's purpose unambiguous even during the fade transition.

### Helper Actions Below Search (Revised)

Current: `Or browse by vehicle · ask us on WhatsApp`

Problems:
- "Or" is hedging language. The search is the primary action; alternatives should be stated neutrally, not apologetically.
- WhatsApp competes with the floating button and header icon. Three simultaneous WhatsApp entry points above the fold is excessive.

**Revised helper line:**

```
Browse all parts  ·  Browse by vehicle
```

- "Browse all parts" links to `/shop`. This is the primary fallback for users who prefer browsing.
- "Browse by vehicle" links to `/vehicles`. This is the secondary fallback for users who know their vehicle but not the part name.
- Both styled as 13px, `text-dark-text-muted`, underline on hover only, `interactive` color on hover.
- No WhatsApp link here. The floating WhatsApp button is persistent, visible, and labeled ("Chat with us"). It already serves the assisted-entry escape hatch on every page.

### Header Search Suppression on Homepage

The `SearchBar` component in the header must be hidden when the user is on the homepage (`/`), since `HeroSearch` is visible. On all other pages, the header search should remain visible.

Implementation note: Pass a prop or use pathname detection in the Header component. When `pathname === "/"`, render `null` in place of the search bar.

---

## Phase 4 -- Trust Signals Repositioning

### Current State

Trust signals appear twice in the above-the-fold flow:

**Location 1 -- Inside hero (inline check-marks):**
- OEM Genuine Parts
- 1-3 Day UAE Delivery
- 619+ Parts in Stock

**Location 2 -- TrustStrip component (below "In Stock Now" grid):**
- OEM Genuine (icon + label)
- 1-3 Day Delivery (icon + label)
- WhatsApp Support (icon + label)
- 14-Day Returns (icon + label)

Problems:
- Duplication. "OEM Genuine" and "1-3 Day Delivery" appear in both locations.
- "WhatsApp Support" as a trust signal is weak. It is a contact channel, not a quality claim.
- "619+ Parts in Stock" is a vanity metric. The actual number (619) is small for an auto parts catalog. Drawing attention to it may undermine rather than build confidence.
- Icon+label format in TrustStrip is generic. Every e-commerce template uses this pattern. It does not signal authority.

### Revised Trust Hierarchy

**Tier 1 -- Hero trust line (keep, revise to 3 items):**

```
OEM & Genuine Parts  ·  UAE Delivery 1-3 Days  ·  14-Day Returns
```

- Removes "Parts in Stock" count. Not a trust signal; it is a catalog stat.
- Brings "14-Day Returns" up from TrustStrip. Returns policy is a genuine trust signal that reduces purchase anxiety.
- Simple middle-dot separation. No icons. At 12px muted text, icons add visual noise without aiding comprehension.
- Removes all check-mark SVGs. Check marks are a marketing cliche. Plain text reads as more confident.

**Tier 2 -- TrustStrip component (revise or remove):**

Recommendation: **Remove TrustStrip entirely.** Its information is now covered by the hero trust line and is redundant. The `border-y` separator between product grids can be replaced with standard section spacing. If it must remain, reduce to two items that are NOT in the hero line:

```
WhatsApp Support Available  ·  Free Consultation on Part Compatibility
```

These are service-level claims, not quality claims, and belong below the product grid where a user scrolling has already seen the catalog.

### Copy Logic

Trust copy must follow these rules:
- **Factual, not aspirational.** "OEM & Genuine Parts" is a fact about inventory sourcing. "Best Parts in UAE" is aspirational and unverifiable.
- **Specific, not generic.** "UAE Delivery 1-3 Days" is specific. "Fast Shipping" is generic.
- **Short.** Maximum 4 words per trust item. No sentences.

---

## Phase 5 -- Header + Hero Unification

### The Problem

The header and hero currently operate as two visually distinct bands:
- Header: 56px, `bg-surface-inverse` (#0C1220), contains logo + search + nav + WhatsApp icon.
- Hero: `bg-dark-bg` (#0C1220), same color, but perceived as a separate section due to padding reset and content centering.

They share the same background color but have no compositional relationship. The search in the header and the search in the hero are visually unrelated despite doing the same thing.

### Unified Entry-System Blueprint

**Visual Continuity:**
- Header and hero share `bg-surface-inverse` (#0C1220). This is already the case. No change needed to backgrounds.
- Remove any visible boundary between header and hero. Currently there is none (no border-bottom on header), which is correct. Maintain this.
- The transition from header to hero should feel like one continuous dark zone. The user should perceive: dark band = TopEngine entry system. White zone below = catalog content.

**Behavioral Continuity:**
- On homepage: Header shows logo + nav only (no search). Hero shows the large search. The entry sequence is: identity (logo) then action (search). One search, one place.
- On all other pages: Header shows logo + compact search + nav. Hero does not exist. The compact search serves as the persistent search access point.
- On scroll (homepage): When the user scrolls past the hero, the header search should appear (revealed via scroll detection). This gives persistent search access without doubling it on initial load.

**Entry Clarity:**
- A first-time visitor sees: dark header with logo and two nav links, then immediately below, the hero with a clear headline, subheadline, and a prominent search input. The eye path is: logo (who) then headline (what) then search (do). Three steps, top to bottom, no lateral scanning required.
- The helper links below search ("Browse all parts / Browse by vehicle") serve users who do not want to search. They are visible but quiet.
- The floating WhatsApp button serves users who want human help. It is visible in the bottom-right corner on all pages, always.

### Scroll Behavior Specification

| Scroll State | Header Content | Rationale |
|-------------|----------------|-----------|
| Top of homepage (hero visible) | Logo + "All Parts" + "Vehicles" + phone number | Search is in the hero. No duplication. |
| Scrolled past hero (homepage) | Logo + SearchBar + "All Parts" + "Vehicles" + phone number | Hero search scrolled away; header search activates as replacement. |
| Any non-homepage page | Logo + SearchBar + "All Parts" + "Vehicles" + phone number | No hero on these pages; header search is always present. |

Implementation note: Use an IntersectionObserver on the hero section. When the hero exits the viewport, toggle a state that renders the SearchBar in the header. This is a single boolean state change.

---

## Summary of All Changes

### Removals
1. WhatsApp icon from header.
2. Check-mark SVGs from hero trust line.
3. "619+ Parts in Stock" from hero trust line.
4. "ask us on WhatsApp" from hero helper text.
5. "Or" prefix from hero helper text.
6. TrustStrip component (or reduce to 2 non-redundant items).

### Revisions
7. Hero contextual label: "UAE's OEM Engine Parts Supplier" becomes "OEM Engine Components -- UAE".
8. Hero headline: "Find Your Part" becomes "Diesel Engine Parts. Sourced Direct."
9. Hero subheadline: "Search by part number, engine code, or vehicle name." becomes "Toyota, Nissan, Ford, Mitsubishi. Search by OEM number or engine code."
10. Hero helper text: "Or browse by vehicle / ask us on WhatsApp" becomes "Browse all parts / Browse by vehicle".
11. Hero trust line: three check-mark items become three plain-text items: "OEM & Genuine Parts / UAE Delivery 1-3 Days / 14-Day Returns".
12. Hero padding: `py-16 lg:py-24` becomes `pt-12 pb-12 lg:pt-16 lg:pb-16`.
13. Hero internal spacing: tighten `mb-4` to `mb-3`, `mb-3` to `mb-2`, `mb-8` to `mb-6`, `mt-5` to `mt-4`, `mt-8` to `mt-5`.
14. Nav link "All Parts": change `text-disabled` to `text-inverse/80` with hover to `text-inverse`.
15. Placeholder rotation: prefix each with "Search:" and curate 5 examples covering OEM number, engine code + part, vehicle + part.

### Additions
16. Phone number in header (desktop): `+971 55 152 1264`, right-aligned, 12px, `text-disabled`.
17. Scroll-based header search reveal on homepage: SearchBar appears in header when hero scrolls out of viewport.

### Behavioral Changes
18. Header SearchBar hidden on homepage when hero is in viewport.
19. Header SearchBar visible on homepage when hero scrolls out of viewport.
20. Header SearchBar always visible on non-homepage pages (no change from current).

---

## Implementation Sequence

These changes should be implemented in this order to avoid regressions:

1. **Header**: Remove WhatsApp icon. Revise nav link colors. Add phone number.
2. **Header**: Add homepage-aware search suppression (pathname check + IntersectionObserver).
3. **Hero**: Revise all copy (label, headline, subheadline, helper text, trust line).
4. **Hero**: Revise all spacing values.
5. **HeroSearch**: Revise placeholder strings.
6. **TrustStrip**: Remove component or reduce to 2 items.
7. **Verify**: Full-page vertical rhythm check on mobile (375px), tablet (768px), and desktop (1280px).

No new components are introduced. No new dependencies. No new visual patterns. This is a reduction and clarification pass on existing architecture.
