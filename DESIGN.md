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
  register: "15.5rem"
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
  control-square:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.gruen-tief}"
    rounded: "{rounded.none}"
    size: "1.9rem"
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
  sign-off-stamp:
    backgroundColor: "transparent"
    textColor: "{colors.gruen}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.3rem 0.85rem 0.35rem"
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
  register-item-active:
    backgroundColor: "{colors.gruen-band}"
    textColor: "{colors.gruen-tief}"
    rounded: "{rounded.none}"
    padding: "0.52rem 0.7rem"
  stamp:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.1rem"
    width: "min(15rem, 100%)"
  photograph:
    backgroundColor: "#ffffff"
    rounded: "{rounded.none}"
    width: "8.5rem"
---

# Design System: Prüfprotokoll — Bakir

## Overview

**Creative North Star: "The Acceptance Protocol"**

The page is a German acceptance-and-measurement record (Prüfprotokoll) rendered for the screen. Its personality is that of a signed inspection document: cool paper ground, hairline rules, right angles, a small photograph mounted like a form field, and a measured value beside every claim. Nothing is asserted without a number and a named source next to it, and the visual system exists to make that pairing legible at a glance — the number in mono, its provenance in a smaller mono line directly beside or beneath it.

Density is chosen over whitespace. Rows sit close, tables and field grids carry hairline dividers rather than gaps, and sections are separated by a single 1px rule instead of empty space. A register column on the left works like the tab index of a binder: every section and every measurement sheet is one jump away, and the active entry stays marked while the page scrolls. The page is committed to light (`color-scheme: light`), chosen from the use scene — a recruiter, mid-morning, in an office or on a train — not from category habit.

The page is quiet, not inert. One external script of about 5 KB (gzip) adds behaviour on top of a document that is complete without it: the register opens, closes and follows the reading position; rows fill in as they scroll into view; key figures count up once to their exact value; the contact button confirms that the address was copied; plates open full size in a native dialog; and one gameplay clip plays only while it is in view, with its own pause control. With scripting off, every one of those degrades to the plain document: the register stands open, all content is visible, every number is final, plates link to their files and the clip shows its still frame with native controls.

The build refuses two arrangements the category ships by default: the dark-mode developer hero with gradient and "Hi, I'm …", and the whitespace-and-huge-grotesk minimal portfolio. Its shapes are square without exception, and it carries exactly one shadow, reserved for the one control that floats over the text.

**Key Characteristics:**
- Cool protocol paper with near-black ink; committed to light, no dark mode.
- Inspection green in full-bleed bands; stamp red used only semantically.
- Hairline rules at 1px; right angles only, without exception; one shadow, on a floating control.
- Archivo (wght + wdth) for text, Spline Sans Mono for every measured value, protocol number and field label.
- Tabular numerals globally; numbers are meant to be compared down a column.
- A register column for navigation; motion that fills the protocol in, never loops for its own sake.
- Script only adds: everything is readable, navigable and final without it.

## Colors

A two-signal palette on cool paper: green means checked, red means not measured or defective, and nothing else carries hue.

### Primary
- **Inspection Green** (`{colors.gruen}`): the committed colour. Carries full-bleed bands — the protocol head and the release footer — and marks anything verified: list bullets, the sheet number, the sign-off stamp on each measurement sheet, the improvement factor under an after-value, the "after" code label, the active bar in the register, link underlines on hover, `::selection`, focus rings and the browser theme colour.
- **Inspection Green Deep** (`{colors.gruen-tief}`): text on light stamps, buttons and square controls; the readable counterpart to the band itself.
- **Green Wash** (`{colors.gruen-band}`) and **Green Hairline** (`{colors.gruen-linie}`): the evidence chip's fill and border, the active register entry, the measurement-row hover tint, the sheet-number border and the sign-off stamp's inner rule.
- **Green-on-Band** (`{colors.gruen-auf-band}`): field labels printed inside a green band — the head's "released for" and "available" labels and the footer's field names — where ink 3 would fail.

### Secondary
- **Stamp Red** (`{colors.rot}`) and **Stamp Wash** (`{colors.rot-band}`): reserved for exactly two meanings — "schematic, not measured" and "the defective state". In the shipped page it appears in three places, all on one measurement sheet: the schematic chip in the compact measurement table, the one layer bar and value in the layer measurement that carried the cost, and the "before" label above the code that caused it. It is never decorative, and never a hover, brand or emphasis colour.

### Neutral
- **Protocol Paper** (`{colors.papier}`): page ground, the fill of light buttons and square controls, and the cells of the topic map.
- **Paper Deep** (`{colors.papier-tief}`): the recessed surfaces — the register column, code blocks, the self-assessment block, the empty track behind a layer bar.
- **Ink** (`{colors.tinte}`): body text, the skip link's fill, and the 2px rule that opens a table, a numeric row or a quote block.
- **Ink 2** (`{colors.tinte-2}`) / **Ink 3** (`{colors.tinte-3}`): running prose, then field labels, units, source citations and captions; ink 3 also marks the bullets of the self-assessment block.
- **Hairline** (`{colors.haar}`) / **Hairline Strong** (`{colors.haar-stark}`): the 1px rule vocabulary — section dividers, field-grid and table rows, image frames, tag borders, the register's inner rules.

### Named Rules
**The Two-Signal Rule.** Only two hues carry meaning: green for verified, red for schematic-or-defective. Everything else is paper, ink or hairline. A third accent means the system has been broken.

**The Red-Is-A-Claim Rule.** Red states a defect or an unmeasured figure. If red would appear without an accompanying "not measured" or "defective" statement, use ink instead.

**The Never-By-Hue-Alone Rule.** Every state carries its own words. The schematic value renders as a chip whose label spells the state out; the defective layer is named in its row and the code above it is labelled "before"; the active register entry is also marked `aria-current`. Removing colour must not remove meaning.

## Typography

**Display Font:** Archivo Variable (with `system-ui, sans-serif`)
**Body Font:** Archivo Variable
**Label/Mono Font:** Spline Sans Mono Variable (with `ui-monospace, monospace`)

**Character:** A grotesk that can be stretched, set against a mono that never varies. Archivo's width axis is pushed at display sizes so headings read as stamped rather than merely large; Spline Sans Mono holds every number, label, citation and code line so measurements always look like readings taken off an instrument.

### Hierarchy
- **Display** (`wdth` 112 / `wght` 700, line-height 0.94): the subject's name in the protocol head. One per page.
- **Headline** (`wdth` 108 / `wght` 650): section titles.
- **Title** (`wdth` 106 / `wght` 640): measurement-sheet titles; drops to 1.125rem for block headings inside a sheet.
- **Body** (400, line-height 1.55): running prose in ink 2, capped at 68ch; secondary prose drops to 0.9375rem.
- **Label** (mono 500, `0.08em`, uppercase, ink 3): field names in the field grid, table column heads, the caption line above a sub-block, the photograph's "Lichtbild" line. By count, the most-used class in the shipped page.
- **Metric** (mono 600): the numbers in the wide metric row, over a 0.9375rem label and a 0.8125rem source line.
- **Measure** (mono 600, `white-space: nowrap`): values in the compact measurement table and the compact key-figure row. Units ride along at `0.75em` / 400 in ink 3.
- **Citation** (mono 400, ink 3): source names, tags, the sheet number, the metadata-strip values, the language picker and the code in a before/after pair (0.75rem, 0.6875rem below 30rem so the longest line fits without scrolling).

Captions run at 0.8125rem in ink 3, capped at 60ch — except under a wide plate, where the caption takes the plate's full width so it never ends halfway under the image.

### Named Rules
**The Width-Axis Rule.** Archivo must be imported from `@fontsource-variable/archivo/standard.css`. Only that entry ships the `wdth` axis (`font-stretch: 62% 125%`); the package default carries weight alone, and every `font-variation-settings: 'wdth' …` above silently collapses to normal width.

**The Label-Beside-Value Rule.** A field label sits in the left column of a field grid beside its value, or as a table column head — never floating above a heading. The protocol form gives labels a functional place, so the page needs no kicker or eyebrow.

**The Tabular-Numbers Rule.** `font-variant-numeric: tabular-nums` and `'tnum' 1` are set on `body` and re-asserted on every measured value. Numbers in a column must align on the digit.

## Layout

Above 64rem the page is two columns: a register column of 15.5rem on the left and the protocol on the right. The register's recessed paper-deep ground belongs to the column, not to the navigation inside it: it is painted by a pseudo-element of the layout wrapper over the full height, while the navigation itself sticks to the top and scrolls on its own if it outgrows the viewport. Closing the register gives the protocol the whole width and leaves a square handle to reopen it. Below 64rem the register becomes an overlay over a dimming veil, closed by default and opened from a floating square handle in the lower left.

The protocol column is a single centred measure, `max-width: 78rem`, with an inline gutter of `clamp(1rem, 4vw, 3.5rem)`. Everything shares that container, including the full-bleed green bands, whose colour runs edge to edge while their content stays on the measure. Sections take `clamp(3rem, 7vw, 5.5rem)` of block padding and are separated by a single 1px hairline, never by whitespace alone. One continuous vertical hairline sits one pixel inside the left gutter and threads every section of the protocol; it is suppressed below 52rem, where the gutter is too narrow to carry it, and while the register column is open, whose edge takes its place. The projects lead-in sets its heading and paragraph side by side and hands off to the first sheet without a rule of its own, so it reads as that sheet's preface, not as a band. The four sheets below it are indented by `clamp(1rem, 2.5vw, 2rem)` against a 2px green-hairline bar standing on the gutter line, the page's version of the register's indented group; between two sheets the hairline starts at that bar instead of the page edge, and each sheet number is followed by a mono uppercase citation naming its place, "Projekte · Blatt 2/4".

Internal rhythm comes from a small set of repeated grids: the two-column field grid (label column `minmax(9rem, 15rem)`, narrowed to `minmax(6.5rem, 8.5rem)` when two grids sit side by side, collapsing to one column below 40rem); the auto-fit two-up split (`repeat(auto-fit, minmax(min(24rem, 100%), 1fr))`); the compact key-figure, work-field and topic-map rows (`minmax(min(13rem, 100%), 1fr)`); and the wide metric row. The image row runs in three fixed columns from 52rem; wide plates span the whole row, and the three small plates of a row share one image track and one caption track through `subgrid`, standing bottom-aligned on a common baseline so every caption sits at the same height directly under its image. Vertical stacks are driven by one custom property, `--l`, defaulting to 1.25rem.

Breakpoints are few and each has a reason: 64rem (register becomes a column), 54rem (protocol head becomes one column), 52rem (image row fixed to three columns with shared baselines), 46rem (the compact measurement table stacks, its header dropped; the projects lead-in stacks), 40rem (field grid stacks), 34rem (the sign-off stamp stands upright), 30rem (stacked head buttons take equal width; code drops a size). The print stylesheet turns the bands white with black text, hides the register, its handle, the language picker, the skip link and every script-only control, shows every counted value at its final number, starts each measurement sheet on a new page, and prints the address after every document and repository link.

### Named Rules
**The Density Rule.** Related information is separated by a hairline, not by space. When a block needs breathing room, reach for a rule and tighter padding before reaching for a larger gap.

**The Table-Stacks-Whole Rule.** Below 46rem a measurement table does not scroll sideways and does not shrink its type: it becomes blocks, one per record, header dropped, each block closed by a hairline. A measured value must never be truncated to fit.

**The Reserved-Space Rule.** Every image and video carries its intrinsic `width` and `height`, and every figure in a grid is sized by its track, not by its content. A plate that grows when its file arrives moves every jump target below it; this shipped once and put a register jump 391px off target.

## Elevation & Depth

The document is flat by construction. Depth on the page is expressed three ways — full-bleed green bands against paper ground; 1px hairlines plus the heavier 2px ink rule that opens a table, a numeric row or a quote block; and the recessed paper-deep fill of the register column, code blocks and the self-assessment block.

Only three things genuinely sit above the document, and only they get depth: the register overlay on narrow screens, over a dimming veil; the plate dialog, over a near-opaque ink backdrop (`rgba(17, 19, 24, 0.88)`); and the floating register handle — always on narrow screens, on wide screens while the register is closed — which carries the single shadow in the system. The 2px hover lift on a button is motion, not shadow.

### Shadow Vocabulary
- **Floating handle** (`box-shadow: 0 2px 12px rgba(17, 19, 24, 0.28)`): the square register handle that floats over running text in the lower left corner. Without it the handle lay flat on the text and read as a collision, not a control.

### Named Rules
**The No-Shadow Rule.** Paper does not cast shadows on itself. Nothing that belongs to the document — card, block, plate, stamp, button — carries a `box-shadow` in any form.

**The Only-Floaters-Lift Rule.** Depth is reserved for what actually floats over the page: an overlay, a dialog, a handle above the text. If an element scrolls with the document, it stays flat.

## Shapes

Right angles only, without exception. `border-radius: 0` is declared once, on the focus ring, and no other radius value — no `50%`, no pill, no soft corner — appears anywhere in the shipped stylesheet. Every container, chip, button, control, tag, frame and the photograph ships square.

The form language is drawn rather than filled: 1px borders on tags, chips, images, map cells, code blocks and the self-assessment block; 2px borders on the release stamp, the sign-off stamps, the profile marks, the photograph's frame, table headers and the quote block's opening rule; and a 0.5rem × 1px dash serving as the list bullet, green in running lists and ink 3 inside the self-assessment block. The sign-off stamp is the only element set at an angle (`rotate(-2.5deg)`, at 85% opacity), and it straightens below 34rem, where a tilted box beside a wrapping title becomes a stumble. The build ships no gradient; the only pattern is the faint measuring grid on the generated LinkedIn banner, which lives outside the page. Icons are inline SVG at 14–16px on a 1.6–2.4 stroke — arrow, download tray, magnifier, pause and play, the GitHub and LinkedIn marks — never a glyph font.

## Components

### Buttons
Links that navigate or download are anchors; controls that change state on the page are `<button>` elements.
- **Shape:** square, inline flex with a 0.6rem gap for its inline SVG icon.
- **Primary:** paper fill on the green band, deep-green text, padding `0.8rem 1.35rem`, `font-variation-settings: 'wdth' 104, 'wght' 640`. Carries the contact action; clicking it also copies the address and confirms that in a status line beneath.
- **Hover / Focus:** background to `#ffffff` and `translateY(-2px)` over 0.34s `cubic-bezier(0.16, 1, 0.3, 1)`; `:active` returns to 0. Focus is a 2px green outline offset 2px.
- **Outline variant:** transparent fill, 1px `currentColor` border, `rgba(0,0,0,0.04)` hover; on the green bands the text turns white and the border `rgba(255,255,255,0.6)`. Every link that downloads a document is an outline button with a download-tray icon after its label and the `download` attribute, so the icon's promise and the behaviour agree.
- **Square controls:** the register toggle (2.35rem, three strokes turning into a cross), the dialog's close button, and the magnifier mark and pause toggle on plates (1.9rem, paper fill, hairline-strong border, deep-green glyph). The pause toggle keeps one label and reports its state through `aria-pressed`.

### Chips
- **Evidence chip:** mono 0.6875rem uppercase at `0.05em`, green wash fill, green hairline border, deep-green text — the base state.
- **Schematic / open level:** the same chip with red border, red wash and red text, plus a text label naming the value as schematic. It appears once, in the "before" column of the compact measurement table.
- **Tags:** mono 0.75rem, transparent fill, 1px hairline-strong border, ink 2 text, in a wrapping 0.4rem-gap row. The topic map uses the same tag at 0.6875rem.

### Cards / Containers
- **Corner Style:** square throughout.
- **Background:** paper; paper deep for recessed blocks; `#ffffff` only behind images.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** 1px hairline-strong for image frames; 1px hairline for the self-assessment block on paper deep, and for the work-field grid and topic map, whose 1px grid gap shows the border colour through as internal rules; 2px white-alpha for the release stamp and the photograph on the green band.
- **Internal Padding:** `clamp(1.1rem, 3vw, 1.75rem)` for the self-assessment block, 1rem for map and field cells, `0.85rem 1.1rem` for the release stamp.

### Navigation
- **Register:** entries in 0.9375rem ink 2 with a 2px transparent left edge; the active entry turns green-wash with a green left bar and `'wght' 620`, marked `aria-current="true"`. The projects entry is a group head, and its sheets hang beneath it on a hairline, each led by its sheet number as a small mono box that fills green when active; while a sheet is active its group head stays marked in green hairline. The register's foot repeats the document actions: CV download, contact, GitHub and LinkedIn.
- **Language picker:** at the right end of the metadata strip, mono 0.75rem in 1px hairline boxes; the current language is filled green with white text and marked `aria-current="true"`.
- **Skip link:** parked above the viewport in ink, sliding in on focus.
- Links that leave the site open a new tab, carry `rel="noopener"`, and announce "opens in a new tab" in their accessible name.

### Field Grid (signature)
The document's structural unit and by a wide margin its most repeated one: a hairline-topped stack of rows, each a two-column grid of mono uppercase label and value, divided by 1px rules. It carries master data, career stations, sheet headers, reference sources and footer contact rows. On the green footer the same grid runs with white-alpha rules.

### Protocol Head (signature)
Name in display type with the GitHub and LinkedIn marks beside it as 2px-framed squares, a short positioning line, and on the right the identity block: the photograph (8.5rem, 2px white-alpha frame, saturation lowered a touch so its warm background does not vibrate against the green, captioned "Lichtbild" like the photo field of an official form) next to the release stamp, which carries two fields — what the record is released for, and availability. The stamp's content centres vertically when the photograph makes the block taller. Below them sit the primary contact button and the CV download.

### Compact Measurement Table (signature)
The proof, at rest. A three-column table — check point / before / after — inside the project sheet the numbers came from, opened by a 2px ink rule beneath mono uppercase column heads and divided by hairlines at `0.6rem 1rem 0.6rem 0`. The before-value is either a mono figure with its unit or, where no measurement exists, the schematic chip; the after-value is set at `'wght' 620` with the improvement factor beneath it at 0.75rem in inspection green. The load condition repeats in small mono under each check point, so no row depends on the caption, and a mono line beneath the table names the measuring method. Rows tint to green wash on hover over 0.34s. Below 46rem the table becomes blocks.

### Layer Measurement and Code Pair
Where a number needs its cause shown. Layer bars share one baseline: a mono label, a paper-deep track with a hairline border, a fill in inspection green scaled linearly with `transform: scaleX()`, and the value in mono; the layer that carried the cost fills and reads in stamp red. Beneath it, a before/after pair of code blocks in paper deep with a 1px hairline border, each headed by a boxed mono label — red for "before", green for "after" — and closed by a citation line naming the file and commit. The code is quoted verbatim; only line breaks are set for the column.

### Sign-off Stamp (signature)
One per measurement sheet, opposite its sheet number: an uppercase mono word over a smaller figure divided by a green hairline, inside a 2px inspection-green border, rotated −2.5° at 85% opacity. Every stamp states a fact recorded on the same sheet — delivered, submitted, accepted, published — with its date or count. A stamp without that fact is decoration and is not allowed.

### Plates
Screenshots stand in a 1px hairline-strong frame on white, never upscaled past their native width. Each is an anchor to its own file: without script it opens the image in a new tab; with script it opens full size in a native `<dialog>` over the ink backdrop, with its caption and native dimensions beneath, closed by Escape, the backdrop or the square close button, returning focus to the plate. A magnifier mark in the plate's corner appears on hover and focus and stays visible on touch devices. The one moving plate is a muted, looping H.264 clip with a still first frame as poster: it ships with native controls and no autoplay, and only the script removes the controls and plays it — while it is in view, never under reduced motion, with a pause toggle in the corner, and falling back to the still frame or to native controls if the browser refuses to play.

### Metric and Key-Figure Rows
Two densities of one idea. The wide metric row opens with a 2px ink rule and sets its numbers at `clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)` over a 0.9375rem label and a 0.8125rem source; the shipped page uses it once. The compact key-figure row opens with a hairline and runs value and label on one baseline at 1.0625rem, with the source wrapping to a full-width third line at 0.8125rem; it carries the remaining sheets.

### Named Rules
**The Protocol-Fills-In Rule.** Motion writes the protocol, it does not decorate it. The head enters once on load — name, line, marks, the stamp setting down with its overshoot in the keyframes, the metadata rule drawing across. Below the fold each row, figure and plate fills in as it scrolls into view (opacity and a 12px rise over 0.6s, staggered 55ms), key figures count up once to their exact value, and layer bars grow by scale. Nothing loops except the one gameplay clip, and that only while it is watched.

**The Transform-Only Rule.** Animate `transform`, `opacity` and `background`, on `cubic-bezier(0.16, 1, 0.3, 1)`, the system's single curve, with 0.34s for state changes. Never animate `width` or `height`.

**The Reduced-Motion-Blanket Rule.** One global `@media (prefers-reduced-motion: reduce)` block sets `scroll-behavior: auto` and collapses every animation and transition duration to `0.01ms` on `*`, `*::before` and `*::after`. The blanket is deliberate rather than rule-by-rule: one forgotten transition voids the promise, and that had already happened here once. Script-driven motion honours the same query: the counters do not run and the clip does not play on its own.

**The Script-Adds Rule.** The page must be complete without script. Every state the script creates — an open register, visible rows, final numbers, a full-size plate, a playing clip — has a script-free equivalent in the markup, and content is only hidden for an entrance once the script has announced itself on `<html>`.

**The External-Script Rule.** Behaviour lives in one external module, `/js/register.js`, loaded via `<script type="module" src is:inline>` — never as a component `<script>`. `public/_headers` sets `script-src 'self'` with no `unsafe-inline`, and Astro inlines small component scripts, so an inlined script is silently blocked in production while every local check stays green; this happened once. Texts the script shows come from the content file through data attributes, like every other text on the page.

**The Pre-Generated-Image Rule.** Images are not handled by `astro:assets`. `tools/bilder.mjs` writes WebP variants into `public/media/`, removes variants whose source is gone, renders the touch icon from the favicon, and `src/data/bilder.json` records sizes and filenames; the page ships plain `<img srcset sizes>`. The Cloudflare Worker build once rewrote `<Image>` to a runtime `/_image` endpoint the static deployment does not serve: seven images returned 404 in production while every local check was green. Clips come from `tools/video.mjs`: H.264, no audio track, first frame as poster, `preload="none"`.

## Do's and Don'ts

### Do:
- **Do** put every number beside its source: mono value, then a smaller mono citation in ink 3.
- **Do** use green for anything verified and red only for "schematic, not measured" or a defective state, always with a text label.
- **Do** separate with 1px hairlines, and open a table or numeric row with a 2px ink rule.
- **Do** import Archivo from `@fontsource-variable/archivo/standard.css` so the `wdth` axis exists.
- **Do** set display type with `font-variation-settings: 'wdth' …, 'wght' …` rather than `font-weight` alone.
- **Do** theme browser surfaces from the palette: green `::selection`, green focus outlines (2px, offset 2px), tabular numerals.
- **Do** keep new work light; `color-scheme: light` is a decision taken from the use scene.
- **Do** put a measurement in the sheet it came from, in as few columns as it needs, with its measuring method named.
- **Do** stack a table into blocks below 46rem rather than shrinking or truncating its values.
- **Do** give every image and video its intrinsic `width` and `height`, and size figures by their grid track.
- **Do** build every behaviour as an addition to a complete document, with a keyboard path, a visible focus ring and a script-free fallback.
- **Do** mark downloads with the download-tray icon and the `download` attribute, and open outside links in a new tab that says so.

### Don't:
- **Don't** add `box-shadow` to anything that scrolls with the document; the single shadow belongs to the floating register handle.
- **Don't** round corners. `border-radius: 0`, with no exception anywhere in the build.
- **Don't** float a label or eyebrow above a heading; labels belong beside their value in the field grid.
- **Don't** introduce a third hue, or use red for emphasis, hover or decoration.
- **Don't** let colour alone carry a state: pair it with a text label or `aria-current` / `aria-pressed`.
- **Don't** animate `width` or `height`, and don't add motion that loops or repeats for its own sake.
- **Don't** autoplay moving media without a pause control, outside the viewport, or under reduced motion.
- **Don't** put behaviour in a component `<script>`; the shipped CSP forbids inline script.
- **Don't** replace the global reduced-motion block with per-rule gates.
- **Don't** route images through `astro:assets` or `<Image>`; use the pre-generated manifest.
- **Don't** set a sign-off stamp that does not state a fact recorded on its sheet.
- **Don't** publish a postal address, phone number or matriculation number, or republish a client's corporate identity assets, in the artifact or any file it serves.
