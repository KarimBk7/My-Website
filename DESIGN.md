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
  measure:
    fontFamily: "Spline Sans Mono Variable, ui-monospace, monospace"
    fontSize: "clamp(1.15rem, 0.9rem + 1vw, 1.75rem)"
    fontWeight: 600
    fontFeature: "'tnum' 1"
rounded:
  none: "0"
  dot: "50%"
spacing:
  hair: "1px"
  xs: "0.4rem"
  sm: "0.7rem"
  md: "1.25rem"
  lg: "1.75rem"
  xl: "clamp(1.5rem, 4vw, 3rem)"
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
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.tinte-2}"
    rounded: "{rounded.none}"
    padding: "0.25rem 0.55rem"
  switch-segment:
    backgroundColor: "{colors.papier-tief}"
    textColor: "{colors.tinte-2}"
    rounded: "{rounded.none}"
    padding: "0.62rem 1.5rem"
  switch-segment-active:
    backgroundColor: "{colors.gruen}"
    textColor: "#ffffff"
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

The build refuses two arrangements the category ships by default: the dark-mode developer hero with gradient and "Hi, I'm …", and the whitespace-and-huge-grotesk minimal portfolio. It also carries zero shadows and zero rounded containers: the only radius in the shipped CSS is the `50%` dot in the graph legend.

**Key Characteristics:**
- Cool protocol paper with near-black ink; committed to light, no dark mode.
- Inspection green in full-bleed bands; stamp red used only semantically.
- Hairline rules at 1px; right angles only; no shadows, no rounded cards.
- Archivo (wght + wdth) for text, Spline Sans Mono for every measured value, protocol number and field label.
- Tabular numerals globally; numbers are meant to be compared down a column.
- Exactly one authored motion moment: the throw of the switch.

## Colors

A two-signal palette on cool paper: green means checked, red means not measured or defective, and nothing else carries hue.

### Primary
- **Inspection Green** (`{colors.gruen}`): the committed colour. Carries full-bleed bands — the protocol head, the release footer, the active half of the throw switch, the graph status readout — and marks anything verified: measurement bars, list bullets, the sheet number, link underlines on hover, `::selection`, focus rings, and the browser theme colour.
- **Inspection Green Deep** (`{colors.gruen-tief}`): text on light stamps sitting inside a green band; the readable counterpart to the band itself.
- **Green Wash** (`{colors.gruen-band}`) and **Green Hairline** (`{colors.gruen-linie}`): the verified chip's fill and border, the measurement row hover, link underline at rest.
- **Green-on-Band** (`{colors.gruen-auf-band}`): field labels printed inside a green band, where ink 3 would fail.

### Secondary
- **Stamp Red** (`{colors.rot}`) and **Stamp Wash** (`{colors.rot-band}`): reserved for exactly two meanings — "schematic, not measured" and defects. It appears on the hatched measurement bar, the open-state chip, the trace's dashed open line, and the defects block. It is never decorative, and never a hover, brand or emphasis colour.

### Neutral
- **Protocol Paper** (`{colors.papier}`): page ground, and the fill of light buttons sitting on green.
- **Paper Deep** (`{colors.papier-tief}`): recessed surfaces — the switch track, the scrollbar trough.
- **Ink** (`{colors.tinte}`): body text, and the 2px rule that opens a table or a numeric row.
- **Ink 2** (`{colors.tinte-2}`) / **Ink 3** (`{colors.tinte-3}`): running prose, then field labels, units, source citations and captions.
- **Hairline** (`{colors.haar}`) / **Hairline Strong** (`{colors.haar-stark}`): the 1px rule vocabulary — section dividers, field-grid rows, image frames, tag borders.

### Named Rules
**The Two-Signal Rule.** Only two hues carry meaning: green for verified, red for schematic-or-defective. Everything else is paper, ink or hairline. A third accent means the system has been broken.

**The Red-Is-A-Claim Rule.** Red states a defect or an unmeasured figure. If red would appear without an accompanying "not measured" or "defect" statement, use ink instead.

**The Never-By-Hue-Alone Rule.** Every state carries a text label, and the schematic state additionally carries a 135° hatch (`repeating-linear-gradient(135deg, var(--rot) 0 4px, transparent 4px 8px)`) plus a 1px red outline. Removing colour must not remove meaning.

## Typography

**Display Font:** Archivo Variable (with `system-ui, sans-serif`)
**Body Font:** Archivo Variable
**Label/Mono Font:** Spline Sans Mono Variable (with `ui-monospace, monospace`)

**Character:** A grotesk that can be stretched, set against a mono that never varies. Archivo's width axis is pushed at display sizes so headings read as stamped rather than merely large; Spline Sans Mono holds every number, label and citation so measurements always look like readings taken off an instrument.

### Hierarchy
- **Display** (`wdth` 112 / `wght` 700, `clamp(2.35rem, 1.1rem + 4.7vw, 4.5rem)`, line-height 0.94): the subject's name in the protocol head. One per page.
- **Headline** (`wdth` 108 / `wght` 650, `clamp(1.6rem, 1.2rem + 1.4vw, 2.4rem)`): section titles.
- **Title** (`wdth` 106 / `wght` 640, `clamp(1.35rem, 1.05rem + 1.15vw, 2rem)`): measurement-sheet titles and sub-blocks; drops to 1.125rem for block headings inside a sheet.
- **Body** (400, `clamp(0.975rem, 0.93rem + 0.22vw, 1.0625rem)`, line-height 1.55): running prose in ink 2, capped at 68ch; secondary prose drops to 0.9375rem and 62ch.
- **Label** (mono 500, 0.6875rem, `0.08em`, uppercase, ink 3): field names in the two-column field grid, table column heads, block captions.
- **Measure** (mono 600, `clamp(1.15rem, 0.9rem + 1vw, 1.75rem)`, `white-space: nowrap`): the Istwert. Units ride along at `0.75em` / 400 in ink 3. Metric rows use the same mono at `clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)`.

### Named Rules
**The Width-Axis Rule.** Archivo must be imported from `@fontsource-variable/archivo/standard.css`. Only that entry ships the `wdth` axis (`font-stretch: 62% 125%`); the package default carries weight alone, and every `font-variation-settings: 'wdth' …` above silently collapses to normal width.

**The Label-Beside-Value Rule.** A field label sits in the left column of a field grid beside its value, or as a table column head — never floating above a heading. The protocol form gives labels a functional place, so the page needs no kicker or eyebrow.

**The Tabular-Numbers Rule.** `font-variant-numeric: tabular-nums` and `'tnum' 1` are set on `body` and re-asserted on every measured value. Numbers in a column must align on the digit.

## Layout

A single centred column, `max-width: 78rem`, with an inline gutter of `clamp(1rem, 4vw, 3.5rem)`. Everything shares that container, including the full-bleed green bands, whose colour runs edge to edge while their content stays on the measure.

Sections take `clamp(3rem, 7vw, 5.5rem)` of block padding and are separated by a single 1px hairline, never by whitespace alone. The first section under the metadata strip is deliberately shortened to `clamp(1.75rem, 3.2vw, 2.5rem)` so the instrument — the switch, the trace and the measurement table — is reachable without scrolling; the proof, not the heading over it, occupies the first viewport.

One continuous vertical hairline sits one pixel inside the left gutter and runs the full length of `main`, threading every section. It is suppressed below 52rem, where the gutter is too narrow to carry it.

Internal rhythm comes from three repeated grids: the two-column field grid (`minmax(9rem, 15rem)` label column plus a fluid value column, collapsing to one column below 40rem); the auto-fit two-up split (`repeat(auto-fit, minmax(min(24rem, 100%), 1fr))`); and the auto-fit metric row (`minmax(min(13rem, 100%), 1fr)`). Vertical stacks are driven by one custom property, `--l`, defaulting to 1.25rem.

Breakpoints are few and each has a reason: 54rem (protocol head becomes one column), 52rem (thread hidden), 40rem (field grid stacks). A print stylesheet strips the bands to white, hides the switch, language picker and skip link, and prevents sections from breaking across pages.

### Named Rules
**The Density Rule.** Related information is separated by a hairline, not by space. When a block needs breathing room, reach for a rule and tighter padding before reaching for a larger gap.

## Elevation & Depth

The system is flat by construction: the shipped CSS contains no `box-shadow` at all. Depth is expressed three ways — full-bleed green bands against paper ground; 1px hairlines and the heavier 2px ink rule that opens a table or a numeric row; and the recessed paper-deep fill of the switch track and scrollbar trough. Layering inside the switch is done with `isolation: isolate` and z-index, not with shading.

The only lift in the system is the 2px hover translate on a button, and it is motion, not shadow.

### Named Rules
**The No-Shadow Rule.** Paper does not cast shadows on itself. `box-shadow` is not part of this system in any form — soft, hard-offset or inset.

## Shapes

Right angles only. `border-radius: 0` is asserted on focus rings, and every container, chip, button, tag and frame ships square. The single exception in the shipped build is the 0.6rem `50%` dot in the graph legend, and each dot is paired with a text label.

The form language is drawn rather than filled: 1px borders on tags, chips, images and frames; 2px borders on the stamp block and table headers; a 6px-high measurement bar; and a 135° hatch as the only pattern. Icons are inline SVG at 9–15px, never a glyph font.

## Components

### Buttons
- **Shape:** square (`border-radius: 0`), inline flex with a 0.6rem gap for its inline SVG icon.
- **Primary:** paper fill on the green band, deep-green text, padding `0.8rem 1.35rem`, `font-variation-settings: 'wdth' 104, 'wght' 640`.
- **Hover / Focus:** background to `#ffffff` and `translateY(-2px)` over 0.34s `cubic-bezier(0.16, 1, 0.3, 1)`; `:active` returns to 0. Focus is a 2px green outline offset 2px.
- **Outline variant:** transparent fill, 1px `currentColor` border, `rgba(0,0,0,0.04)` hover; on the green footer the border becomes `rgba(255,255,255,0.6)`.

### Chips
- **Verified level:** mono 0.6875rem uppercase, green wash fill, green hairline border, deep-green text, with a 9px inline SVG mark.
- **Schematic / open level:** the same chip with red border, red wash and red text, plus an explicit text label. Toggled from script by class, never by colour alone.
- **Tags:** mono 0.75rem, transparent fill, 1px hairline-strong border, ink 2 text, in a wrapping 0.4rem-gap row.

### Cards / Containers
- **Corner Style:** square throughout.
- **Background:** paper; `#ffffff` only inside instrument frames (trace, graph, images).
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** 1px hairline-strong for instrument frames; 1px stamp red for the defects block on red wash.
- **Internal Padding:** `clamp(1.1rem, 3vw, 1.75rem)` for the defects block, `0.9rem 1rem 0.5rem` for the trace frame, 1rem for map cells.

### Navigation
The language picker sits at the right end of the metadata strip: mono 0.75rem, 1px hairline boxes, ink 2 text; the current language is filled green with white text and marked `aria-current="true"`. There is no persistent site nav; the skip link is the only other navigation chrome, parked above the viewport in ink and sliding in on focus.

### Field Grid (signature)
The document's structural unit: a hairline-topped stack of rows, each a two-column grid of mono uppercase label and value, divided by 1px rules. It carries master data, career stations, sheet headers, quote sources and footer contact rows. On the green footer the same grid runs with white-alpha rules.

### Test Bench (signature)
The one interactive instrument. A two-segment throw switch (before / after) built as an inline grid over a 50%-wide green slider that translates on `data-stand`; the state change re-labels the switch, retargets the SVG trace's two series (active trace opaque and green, the other held at 0.3–0.45 opacity so both readings stay visible), and rewrites every measurement row's value, bar and level chip.

### Measurement Bar (signature)
A 6px green rule under each Istwert, scaled by `transform: scaleX(var(--f))` from `transform-origin: left center`, with `--f` written by script as the interface between markup and behaviour. Length is on a logarithmic scale so a value of 1 stays visible. The schematic variant replaces the fill with the red hatch, adds a 1px red outline, and is pinned to `transform: none` because a hatch must not be stretched.

### Named Rules
**The One-Moment Rule.** Exactly one authored motion moment exists: the throw of the switch and the values, bars and traces that move with it. There is no per-section entrance animation — an identical fade on every section is a habit, not a design.

**The Transform-Only Rule.** Animate `transform`, `opacity` and (on the trace) `stroke`. Never animate `width`, `height` or `stroke-width`; the bar scales, it does not resize. Every transition is gated by `@media (prefers-reduced-motion: reduce)`.

**The External-Script Rule.** Behaviour lives in `public/js/protokoll.js`, loaded with `is:inline`. The shipped CSP in `public/_headers` sets `script-src 'self'` and Astro inlines small component scripts; moving this code into a component `<script>` breaks the page in production only.

## Do's and Don'ts

### Do:
- **Do** put every number beside its source: mono value, then a smaller mono citation in ink 3.
- **Do** use green for anything verified and red only for "schematic, not measured" or a defect, always with a text label.
- **Do** separate with 1px hairlines, and open a table or numeric row with a 2px ink rule.
- **Do** import Archivo from `@fontsource-variable/archivo/standard.css` so the `wdth` axis exists.
- **Do** set display type with `font-variation-settings: 'wdth' …, 'wght' …` rather than `font-weight` alone.
- **Do** theme browser surfaces from the palette: green `::selection`, green focus outlines (2px, offset 2px), thin scrollbars on a paper-deep track, tabular numerals.
- **Do** keep new work light; `color-scheme: light` is a decision taken from the use scene.
- **Do** animate with `transform` / `opacity` at `0.34s cubic-bezier(0.16, 1, 0.3, 1)`, and always ship the reduced-motion escape.
- **Do** keep the first section short so the instrument stays above the fold.

### Don't:
- **Don't** add `box-shadow` in any form; this system has none.
- **Don't** round corners. `border-radius: 0` everywhere except the legend dot.
- **Don't** float a label or eyebrow above a heading; labels belong beside their value in the field grid.
- **Don't** introduce a third hue, or use red for emphasis, hover or decoration.
- **Don't** let colour alone carry a state: pair it with a text label, and with the hatch for the schematic case.
- **Don't** animate `width`, `height` or `stroke-width`, and don't add per-section entrance animations.
- **Don't** move behaviour into a component `<script>`; the shipped CSP forbids inline script.
- **Don't** publish a postal address, phone number or matriculation number, or republish a client's corporate identity assets, in the artifact or any file it serves.
