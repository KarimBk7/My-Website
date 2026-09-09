---
name: Prüfprotokoll — Bakir
description: An acceptance-test protocol on a person; every claim carries a measured value and a named source.
colors:
  papier: "#f6f6f3"
  papier-tief: "#ecece7"
  tinte: "#111318"
  tinte-2: "#4a4e55"
  tinte-3: "#6f747c"
  gruen: "#1d5c44"
  gruen-tief: "#164734"
  gruen-band: "#e6ede9"
  gruen-linie: "#a9c2b6"
  gruen-auf-band: "#a8c8ba"
  rot: "#a3231c"
  rot-band: "#f6e9e8"
  haar: "#cdcec8"
  haar-stark: "#a9aaa3"
typography:
  display:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(2.35rem, 1.1rem + 4.7vw, 4.5rem)"
    fontVariation: "'wdth' 112, 'wght' 700"
    lineHeight: 0.94
    letterSpacing: "-0.032em"
  headline:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1.2rem + 1.4vw, 2.4rem)"
    fontVariation: "'wdth' 108, 'wght' 650"
    lineHeight: 1.1
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 1.05rem + 1.15vw, 2rem)"
    fontVariation: "'wdth' 106, 'wght' 640"
    lineHeight: 1.1
    letterSpacing: "-0.018em"
  body:
    fontFamily: "Archivo Variable, system-ui, sans-serif"
    fontSize: "clamp(0.975rem, 0.93rem + 0.22vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "'tnum' 1"
  label:
    fontFamily: "Spline Sans Mono Variable, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.08em"
  metric:
    fontFamily: "Spline Sans Mono Variable, ui-monospace, monospace"
    fontSize: "clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "'tnum' 1"
  measure:
    fontFamily: "Spline Sans Mono Variable, ui-monospace, monospace"
    fontSize: "1.0625rem"
    fontWeight: 600
    fontFeature: "'tnum' 1"
  citation:
    fontFamily: "Spline Sans Mono Variable, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
rounded:
  none: "0"
spacing:
  hair: "1px"
  xs: "0.4rem"
  sm: "0.7rem"
  md: "1.25rem"
  split: "clamp(1.5rem, 4vw, 3rem)"
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  section: "clamp(3rem, 7vw, 5.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.gruen-tief}"
    rounded: "{rounded.none}"
    padding: "0.8rem 1.35rem"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.gruen-tief}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "currentColor"
    rounded: "{rounded.none}"
    padding: "0.8rem 1.35rem"
  chip-verified:
    backgroundColor: "{colors.gruen-band}"
    textColor: "{colors.gruen-tief}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.2rem 0.5rem"
  chip-schematic:
    backgroundColor: "{colors.rot-band}"
    textColor: "{colors.rot}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.2rem 0.5rem"
  sheet-number:
    backgroundColor: "transparent"
    textColor: "{colors.gruen}"
    typography: "{typography.citation}"
    rounded: "{rounded.none}"
    padding: "0.15rem 0.5rem"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.tinte-2}"
    typography: "{typography.citation}"
    rounded: "{rounded.none}"
    padding: "0.25rem 0.55rem"
  table-row-compact:
    backgroundColor: "transparent"
    textColor: "{colors.tinte}"
    rounded: "{rounded.none}"
    padding: "0.6rem 1rem 0.6rem 0"
  table-row-hover:
    backgroundColor: "{colors.gruen-band}"
    textColor: "{colors.tinte}"
  stamp:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.1rem"
    width: "min(15rem, 100%)"
---

# Design System: Prüfprotokoll — Bakir

## Overview

**Creative North Star: "The Acceptance Protocol"**

The page is a German acceptance-and-measurement record (Prüfprotokoll) rendered for the screen. Its personality is that of a signed inspection document: cool paper ground, hairline rules, right angles, and a measured value standing where a portrait would normally stand. Nothing is asserted without a number and a named source beside it, and the visual system exists to make that pairing legible at a glance — the number in mono, its provenance in a smaller mono line directly beside or beneath it.

Density is chosen over whitespace. Rows sit close, tables and field grids carry hairline dividers rather than gaps, and sections are separated by a single 1px rule instead of empty space. One continuous vertical hairline threads the whole main column, so scrolling reads as running down a form rather than paging through cards. The page is committed to light (`color-scheme: light`), chosen from the use scene — a recruiter, mid-morning, in an office or on a train — not from category habit.

The page is not merely quiet; it is inert. The shipped build loads no JavaScript at all: the only `<script>` element in the German homepage is `application/ld+json`, which is data, not code. There is no `button`, `canvas`, `input`, `form`, `details` or `tabindex` anywhere in the markup — every control on the page is a link. Proof is delivered by static, comparable numbers rather than by a performance, and the reader's whole interaction is scrolling and following links. The German homepage ships at roughly 42 KB. Two records now describe a page that no longer exists: the surface direction contract at .impeccable/surfaces/src-pages-index-astro.md still specifies a first viewport built on a load slider and a two-trace curve, with raises referencing a live control and an illuminated active state, and PRODUCT.md's Positioning still claims the site documents how he works with AI coding agents. Neither is in the build. The build is the record; both of those are stale and were left unedited.

The build refuses two arrangements the category ships by default: the dark-mode developer hero with gradient and "Hi, I'm …", and the whitespace-and-huge-grotesk minimal portfolio. It also carries zero shadows and zero rounded containers: `border-radius: 0` appears exactly once in the shipped CSS, on the focus ring, and no other radius value exists anywhere.

**Key Characteristics:**
- Cool protocol paper with near-black ink; committed to light, no dark mode.
- Inspection green in full-bleed bands; stamp red used only semantically.
- Hairline rules at 1px; right angles only, without exception; no shadows, no rounded cards.
- Archivo (wght + wdth) for text, Spline Sans Mono for every measured value, protocol number and field label.
- Tabular numerals globally; numbers are meant to be compared down a column.
- Zero JavaScript and zero interactive elements; motion is three hover/focus transitions and nothing else.

## Colors

A two-signal palette on cool paper: green means checked, red means not measured or defective, and nothing else carries hue.

### Primary
- **Inspection Green** (`{colors.gruen}`): the committed colour. Carries full-bleed bands — the protocol head and the release footer — and marks anything verified: list bullets, the sheet number, the improvement factor under an after-value, the opening and closing quotation marks of a testimonial, link underlines on hover, `::selection`, focus rings, the scrollbar thumb on hover, and the browser theme colour.
- **Inspection Green Deep** (`{colors.gruen-tief}`): text on light stamps and buttons sitting inside a green band; the readable counterpart to the band itself.
- **Green Wash** (`{colors.gruen-band}`) and **Green Hairline** (`{colors.gruen-linie}`): the evidence chip's fill and border, the measurement-row hover tint, the sheet-number border, the link underline at rest.
- **Green-on-Band** (`{colors.gruen-auf-band}`): field labels printed inside a green band, where ink 3 would fail.

### Secondary
- **Stamp Red** (`{colors.rot}`) and **Stamp Wash** (`{colors.rot-band}`): reserved for exactly two meanings — "schematic, not measured" and defects. In the shipped page it appears in exactly two places: the single schematic chip in the compact measurement table, and the defects block with its bullets and warning line. It is never decorative, and never a hover, brand or emphasis colour.

### Neutral
- **Protocol Paper** (`{colors.papier}`): page ground, the fill of light buttons sitting on green, and the cells of the topic map.
- **Paper Deep** (`{colors.papier-tief}`): the recessed scrollbar trough and the border cutting its thumb.
- **Ink** (`{colors.tinte}`): body text, the skip link's fill, and the 2px rule that opens a table, a numeric row or a quote block.
- **Ink 2** (`{colors.tinte-2}`) / **Ink 3** (`{colors.tinte-3}`): running prose, then field labels, units, source citations and captions.
- **Hairline** (`{colors.haar}`) / **Hairline Strong** (`{colors.haar-stark}`): the 1px rule vocabulary — the vertical thread, section dividers, field-grid and table rows, image frames, tag borders, the scrollbar thumb.

### Named Rules
**The Two-Signal Rule.** Only two hues carry meaning: green for verified, red for schematic-or-defective. Everything else is paper, ink or hairline. A third accent means the system has been broken.

**The Red-Is-A-Claim Rule.** Red states a defect or an unmeasured figure. If red would appear without an accompanying "not measured" or "defect" statement, use ink instead.

**The Never-By-Hue-Alone Rule.** Every state carries its own words. The schematic value renders as a chip whose label spells the state out, inside a 1px red border on red wash; the defects block is titled and its warning line is written, not merely coloured. Removing colour must not remove meaning — a red fill with no words in it is not a state.

## Typography

**Display Font:** Archivo Variable (with `system-ui, sans-serif`)
**Body Font:** Archivo Variable
**Label/Mono Font:** Spline Sans Mono Variable (with `ui-monospace, monospace`)

**Character:** A grotesk that can be stretched, set against a mono that never varies. Archivo's width axis is pushed at display sizes so headings read as stamped rather than merely large; Spline Sans Mono holds every number, label and citation so measurements always look like readings taken off an instrument.

### Hierarchy
- **Display** (`wdth` 112 / `wght` 700, line-height 0.94): the subject's name in the protocol head. One per page.
- **Headline** (`wdth` 108 / `wght` 650): section titles.
- **Title** (`wdth` 106 / `wght` 640): measurement-sheet titles; drops to 1.125rem for block headings inside a sheet.
- **Body** (400, line-height 1.55): running prose in ink 2, capped at 68ch; secondary prose drops to 0.9375rem.
- **Label** (mono 500, `0.08em`, uppercase, ink 3): field names in the two-column field grid, table column heads, the caption line above a sub-block. By count, the most-used class in the shipped page.
- **Metric** (mono 600): the numbers in the wide metric row, over a 0.9375rem label and a 0.8125rem source line.
- **Measure** (mono 600, `white-space: nowrap`): values in the compact measurement table and the compact key-figure row. Units ride along at `0.75em` / 400 in ink 3.
- **Citation** (mono 400, ink 3): source names, tags, the sheet number, the metadata-strip values and the language picker.

### Named Rules
**The Width-Axis Rule.** Archivo must be imported from `@fontsource-variable/archivo/standard.css`. Only that entry ships the `wdth` axis (`font-stretch: 62% 125%`); the package default carries weight alone, and every `font-variation-settings: 'wdth' …` above silently collapses to normal width.

**The Label-Beside-Value Rule.** A field label sits in the left column of a field grid beside its value, or as a table column head — never floating above a heading. The protocol form gives labels a functional place, so the page needs no kicker or eyebrow.

**The Tabular-Numbers Rule.** `font-variant-numeric: tabular-nums` and `'tnum' 1` are set on `body` and re-asserted on every measured value. Numbers in a column must align on the digit.

## Layout

A single centred column, `max-width: 78rem`, with an inline gutter of `clamp(1rem, 4vw, 3.5rem)`. Everything shares that container, including the full-bleed green bands, whose colour runs edge to edge while their content stays on the measure.

Sections take `clamp(3rem, 7vw, 5.5rem)` of block padding and are separated by a single 1px hairline, never by whitespace alone. The first section under the metadata strip is shortened to `clamp(1.75rem, 3.2vw, 2.5rem)`: the strip already divides, and a second large gap beneath it would be a double rule.

One continuous vertical hairline sits one pixel inside the left gutter and runs the full length of `main`, threading every section. It is suppressed below 52rem, where the gutter is too narrow to carry it.

Internal rhythm comes from four repeated grids: the two-column field grid (`minmax(9rem, 15rem)` label column plus a fluid value column, collapsing to one column below 40rem); the auto-fit two-up split (`repeat(auto-fit, minmax(min(24rem, 100%), 1fr))`); the compact key-figure and topic-map rows (`minmax(min(13rem, 100%), 1fr)`); and the wide metric row (`minmax(min(10.5rem, 100%), 1fr)`). The image row runs at `minmax(min(16rem, 100%), 1fr)` and lets a very wide plate span the full track. Vertical stacks are driven by one custom property, `--l`, defaulting to 1.25rem.

Breakpoints are few and each has a reason: 54rem (protocol head becomes one column), 52rem (thread hidden), 46rem (the compact measurement table stacks, its header dropped), 40rem (field grid stacks). A print stylesheet strips the bands to white, hides the language picker and skip link, tightens section padding to 1.5rem and prevents sections from breaking across pages.

### Named Rules
**The Density Rule.** Related information is separated by a hairline, not by space. When a block needs breathing room, reach for a rule and tighter padding before reaching for a larger gap.

**The Table-Stacks-Whole Rule.** Below 46rem a measurement table does not scroll sideways and does not shrink its type: it becomes blocks, one per record, header dropped, each block closed by a hairline. A measured value must never be truncated to fit.

## Elevation & Depth

The system is flat by construction: the shipped CSS contains no `box-shadow` at all, in any form. Depth is expressed three ways — full-bleed green bands against paper ground; 1px hairlines plus the heavier 2px ink rule that opens a table, a numeric row or a quote block; and the recessed paper-deep fill of the scrollbar trough. Nothing on the page is layered over anything else; the skip link is the only positioned overlay, and it is off-screen until focused.

The only lift in the system is the 2px hover translate on a button, and it is motion, not shadow.

### Named Rules
**The No-Shadow Rule.** Paper does not cast shadows on itself. `box-shadow` is not part of this system in any form — soft, hard-offset or inset.

## Shapes

Right angles only, without exception. `border-radius: 0` is declared once, on the focus ring, and no other radius value — no `50%`, no pill, no soft corner — appears anywhere in the shipped stylesheet. Every container, chip, button, tag and frame ships square.

The form language is drawn rather than filled: 1px borders on tags, chips, images, map cells and the defects block; 2px borders on the release stamp, table headers and the quote block's opening rule; and a 0.5rem × 1px green dash serving as the list bullet, turning red inside the defects block. The build ships no gradient and no pattern fill of any kind. Icons are inline SVG at 15px on a 1.8 stroke, never a glyph font.

## Components

### Buttons
Every button in this system is an anchor; there is no `<button>` element on the page.
- **Shape:** square, inline flex with a 0.6rem gap for its inline SVG icon.
- **Primary:** paper fill on the green band, deep-green text, padding `0.8rem 1.35rem`, `font-variation-settings: 'wdth' 104, 'wght' 640`.
- **Hover / Focus:** background to `#ffffff` and `translateY(-2px)` over 0.34s `cubic-bezier(0.16, 1, 0.3, 1)`; `:active` returns to 0. Focus is a 2px green outline offset 2px.
- **Outline variant:** transparent fill, 1px `currentColor` border, `rgba(0,0,0,0.04)` hover; on the green footer the border becomes `rgba(255,255,255,0.6)`.

### Chips
- **Evidence chip:** mono 0.6875rem uppercase at `0.05em`, green wash fill, green hairline border, deep-green text — the base state.
- **Schematic / open level:** the same chip with red border, red wash and red text, plus a text label naming the value as schematic. This is the only chip instance the shipped page renders, in the "before" column of the compact measurement table.
- **Tags:** mono 0.75rem, transparent fill, 1px hairline-strong border, ink 2 text, in a wrapping 0.4rem-gap row. The topic map uses the same tag at 0.6875rem.

### Cards / Containers
- **Corner Style:** square throughout.
- **Background:** paper; `#ffffff` only behind images.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** 1px hairline-strong for image frames; 1px stamp red for the defects block on red wash; 1px hairline for the topic map, whose 1px grid gap shows the border colour through as internal rules; 2px white-alpha for the release stamp on the green band.
- **Internal Padding:** `clamp(1.1rem, 3vw, 1.75rem)` for the defects block, 1rem for map cells, `0.85rem 1.1rem` for the release stamp.

### Navigation
The language picker sits at the right end of the metadata strip: mono 0.75rem, 1px hairline boxes, ink 2 text; the current language is filled green with white text and marked `aria-current="true"`. There is no persistent site nav; the skip link is the only other navigation chrome, parked above the viewport in ink and sliding in on focus. Both are links, and together with the document buttons they are the page's entire control surface.

### Field Grid (signature)
The document's structural unit and by a wide margin its most repeated one: a hairline-topped stack of rows, each a two-column grid of mono uppercase label and value, divided by 1px rules. It carries master data, career stations, sheet headers, quote sources and footer contact rows. On the green footer the same grid runs with white-alpha rules.

### Compact Measurement Table (signature)
The proof, at rest. A four-column table — check point / before / after / source — inside the project sheet the numbers came from, opened by a 2px ink rule beneath mono uppercase column heads and divided by hairlines at `0.6rem 1rem 0.6rem 0`. The before-value is either a mono figure with its unit or, where no measurement exists, the schematic chip; the after-value is set at `'wght' 620` with the improvement factor beneath it at 0.75rem in inspection green; the source column is mono 0.75rem in ink 3 and wraps rather than truncates. The load condition repeats in small mono under each check point, so no row depends on the caption to be read. Rows tint to green wash on hover over 0.34s. Below 46rem the table becomes blocks. The measurements sit in the sheet they came from, not in a section of their own.

### Metric and Key-Figure Rows
Two densities of one idea. The wide metric row opens with a 2px ink rule and sets its numbers at `clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)` over a 0.9375rem label and a 0.8125rem source; the shipped page uses it once. The compact key-figure row opens with a hairline and runs value and label on one baseline at 1.0625rem, with the source wrapping to a full-width third line at 0.8125rem; it carries the remaining sheets.

### Named Rules
**The Still-Page Rule.** There is no authored motion sequence and no per-section entrance animation. The shipped stylesheet transitions exactly three things, each a direct answer to the pointer or the keyboard: the button's lift and fill, the measurement row's hover tint, and the skip link sliding into view. An identical fade on every section is a habit, not a design; adding one would be the first decorative motion in the system.

**The Transform-Only Rule.** Animate `transform` and `background`, at `0.34s cubic-bezier(0.16, 1, 0.3, 1)` — the system's single duration and single curve. Never animate `width` or `height`.

**The Reduced-Motion-Blanket Rule.** One global `@media (prefers-reduced-motion: reduce)` block sets `scroll-behavior: auto` and collapses every animation and transition duration to `0.01ms` on `*`, `*::before` and `*::after`. The blanket is deliberate rather than rule-by-rule: one forgotten transition voids the promise, and that had already happened here once. New motion inherits the guarantee automatically.

**The No-Script Rule.** The page ships zero JavaScript, and every state it shows is reachable through semantic HTML and CSS alone. Behaviour is not the default answer on this surface; if something can be a link, a table, a `srcset` or a print stylesheet, it is one.

**The External-Script Rule (forward-looking).** If behaviour is ever added, it must load as an external file under `public/` via a module `src` with `is:inline` — never as a component `<script>`. `public/_headers` sets `script-src 'self'` with no `unsafe-inline`, and Astro inlines small component scripts, so an inlined script is silently blocked in production while every local check stays green. This rule constrains the next script; it does not describe the present build, which loads none.

**The Pre-Generated-Image Rule.** Images are not handled by `astro:assets`. `tools/bilder.mjs` writes WebP variants into `public/media/`, `src/data/bilder.json` records their sizes and filenames, and the page ships plain `<img srcset sizes>` inside a 1px hairline-strong frame; very wide plates span the full image row. The Cloudflare Worker build rewrote `<Image>` to a runtime `/_image` endpoint the static deployment does not serve: seven images returned 404 in production while every local check was green.

## Do's and Don'ts

### Do:
- **Do** put every number beside its source: mono value, then a smaller mono citation in ink 3.
- **Do** use green for anything verified and red only for "schematic, not measured" or a defect, always with a text label.
- **Do** separate with 1px hairlines, and open a table or numeric row with a 2px ink rule.
- **Do** import Archivo from `@fontsource-variable/archivo/standard.css` so the `wdth` axis exists.
- **Do** set display type with `font-variation-settings: 'wdth' …, 'wght' …` rather than `font-weight` alone.
- **Do** theme browser surfaces from the palette: green `::selection`, green focus outlines (2px, offset 2px), thin scrollbars on a paper-deep track, tabular numerals.
- **Do** keep new work light; `color-scheme: light` is a decision taken from the use scene.
- **Do** put a measurement in the sheet it came from, in as few columns as it needs.
- **Do** stack a table into blocks below 46rem rather than shrinking or truncating its values.
- **Do** reach for semantic HTML and CSS before script; the page currently needs none.
- **Do** give any surface added later a keyboard path and a visible focus ring, as every link on the page has.

### Don't:
- **Don't** add `box-shadow` in any form; this system has none.
- **Don't** round corners. `border-radius: 0`, with no exception anywhere in the build.
- **Don't** float a label or eyebrow above a heading; labels belong beside their value in the field grid.
- **Don't** introduce a third hue, or use red for emphasis, hover or decoration.
- **Don't** let colour alone carry a state: pair it with a text label.
- **Don't** animate `width` or `height`, and don't add per-section entrance animations.
- **Don't** put behaviour in a component `<script>`; the shipped CSP forbids inline script.
- **Don't** replace the global reduced-motion block with per-rule gates.
- **Don't** route images through `astro:assets` or `<Image>`; use the pre-generated manifest.
- **Don't** publish a postal address, phone number or matriculation number, or republish a client's corporate identity assets, in the artifact or any file it serves.
