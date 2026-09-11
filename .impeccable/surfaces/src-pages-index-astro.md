---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/en/index.astro"]
---

Scope: the single-page bilingual application site at `/` (DE default) and `/en/` (EN mirror). There are no project detail routes; each project is a measurement sheet on the one page. Visitor mode: **Persuade**.

Audience: a recruiter or hiring manager in Berlin, semi-technical, skimming under a minute, often on a phone, comparing candidates in adjacent tabs. Secondary: the engineer who opens it afterwards and looks deeper — including the public repository the page links to. Action: send an email; secondary, download the CV. Proof: four projects with measured outcomes (the fourth is the site itself), the code of the change behind the headline number, two employment references. Constraints: static, served as a Cloudflare Worker with static assets; contact surface email, GitHub and LinkedIn; no phone number or postal address anywhere in the artifact or the files it serves; grades and the transcript never published; Projektron's corporate identity assets never republished.

## Direction contract

THESIS: The page is an acceptance test protocol on a person. Every claim carries an Istwert and a named source; nothing is asserted without a measurement beside it. It refuses the two arrangements this category always ships: the dark-mode developer hero with gradient, mono type and "Hi, I'm …", and its mirror image, the whitespace-and-huge-grotesk minimal portfolio. The measured value is the proof, not the name.

OWN-WORLD: Cool protocol white ground (#F6F6F3), ink #111318. Committed colour: inspection green #1D5C44 carrying full-bleed bands — the protocol head and the release footer — and marking everything verified. Prüfstempel red #A3231C is reserved semantically for "schematic / not measured" and the defective state, never used decoratively; every state is also carried by a text label, never by hue alone. Archivo (wght + wdth variable, Expanded at display sizes) for all text; Spline Sans Mono for measured values, protocol numbers, field labels and quoted code. Hairline rules at 1px, right-angled corners only, no rounded cards; the only shadow belongs to the one control that floats over the text. A register column on the left works as the binder's tab index.

STORY: The visitor understands within one viewport who this is, what he builds, and that he is available now. They believe it because every number sits beside its source and method, the headline improvement is shown down to the four lines of code that produced it, and each sheet carries a sign-off stamp stating a recorded fact. They act from the head or the release footer: a mailto with a prefilled subject that also copies the address, or the CV download.

FIRST VIEWPORT: Full-bleed green protocol head band: left, "Bakir, Abdil Karim" set in Archivo Expanded at the largest scale on the page, the GitHub and LinkedIn marks beside it, and a short positioning line; right, the identity block — a small photograph captioned "Lichtbild" next to a stamped release block with two fields, FREIGEGEBEN FÜR / Software Engineering · Backend, Web, Cloud, Hardware and VERFÜGBAR / Ab sofort · Werkstudent in Teilzeit — with "Kontakt aufnehmen" as a solid stamp and "Lebenslauf als PDF" as an outline stamp beneath. Under the band, a metadata strip on white: PRÜFLING, PROTOKOLL-NR, STAND, PRÜFSTELLEN (Freie Universität Berlin · Projektron GmbH · Lesto Branto GmbH · LUM GmbH), SPRACHE DE/EN. Then the four work fields, each with its evidence.

FORM: Prüfprotokoll (German acceptance and measurement record). Position 1 of 7 on my grounded list, carried as IMPECCABLE'S PICK against the roll's assigned candidate 5, Leistungsschild; the user chose it on the decision page, and a user-pinned direction beats the roll. Seed key 4393b76e. Raises carried over from the declined challengers: one live control remaps the whole page (variable-font specimen); density courage over whitespace-as-elegance (TDR sleeve); an illuminated active state does the wayfinding (arcade marquee); one continuous rule threads the page (neon circuit); every number sits beside its source citation (kiln shelf).

FINISH: unreviewed and undocumented is unfinished; every build ends with verification against the published site, an updated DESIGN.md and sidecar, and every shipping raster and clip carrying its provenance.

## Revisions

Changes to the original contract, each on the user's decision unless noted. Recorded so the history of the direction stays readable.

- **The PRÜFLAST instrument was removed** (user, September 2026). The first viewport no longer carries a load slider or a two-trace curve; the measurements moved, shortened, into the measurement sheet they came from, with the measuring method named. The "one live control remaps the whole page" raise is therefore retired.
- **The "working with AI agents" section was removed** (user). The site's own sheet now notes in one sentence that it was built in dialogue with an AI agent; there is no method section.
- **A fourth project, the site itself, was added**, with its repository linked.
- **The page gained behaviour and motion** (user asked for more energy and for interactive projects): a register column, the head writing itself on load, rows filling in on scroll, counters, a full-size plate dialog and one gameplay clip. The page stays complete without script.
- **A photograph now exists** and sits in the head as a form field. The earlier note that none exists is obsolete.
- **The continuous vertical rule** is hidden while the register column is open, where the column's edge takes its place.
- **Hosting:** the site runs as a Cloudflare Worker with static assets, not on Cloudflare Pages.

## Unresolved

- Custom domain not chosen; the `workers.dev` subdomain is printed in both CVs, the LinkedIn banner and the link preview until then.
- The Projektron report "before" figure is schematic, not measured, and must render as a labelled chip wherever it appears.
- A clip of the Spesenkonfigurator loading 10,000 rows would complete the moving-plate evidence; it needs a recording.
