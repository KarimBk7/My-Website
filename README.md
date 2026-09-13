# Portfolio — Abdil Karim Bakir

My application website: **https://my-website.abdilkarimb.workers.dev** ([English](https://my-website.abdilkarimb.workers.dev/en/))

![Head of the site: name, photo, availability, contact](src/assets/media/kachel-website.png)

The page is designed as a German *Prüfprotokoll*, an acceptance test record: every claim sits next to a measured value and its source. Four projects each have their own sheet with key figures, screenshots or a clip, and for the headline result, the code before and after the change.

## Highlights

- **Static and bilingual.** Built with [Astro](https://astro.build); German at `/`, English at `/en/`, one detail page per project. All text comes from a single source, `src/data/inhalt.ts`.
- **No framework in the browser.** One JavaScript file of about 5 KB (gzip) adds the contents panel, scroll reveal, counters, an image dialog and video playback. Everything works without it.
- **Strict Content-Security-Policy** (`script-src 'self'`), security headers from `public/_headers`, no cookies, no trackers, no third-party requests. Fonts are self-hosted.
- **Accessible motion.** Clips play only while visible, can be paused and opened full screen, and stay still under "reduce motion".
- **Checked in a real browser.** Playwright scripts in `tools/` test layout, contents panel, image dialog, video, links and contact, both locally and against the live site, and scan every page except the legal notice for personal data that must not be published.
- **Hosting:** Cloudflare Worker with static assets, deployed on every push to `main`.

**Stack:** Astro, TypeScript, CSS, Cloudflare Workers, sharp, ffmpeg, Playwright.

---

*Ab hier: Entwicklerdokumentation auf Deutsch.*

## Entwickeln

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # schreibt nach dist/
npm run preview    # baut nichts, liefert nur dist/ aus
```

## Prüfen

```bash
npm run build
node tools/serve-mit-headern.mjs 4400     # liefert dist/ MIT den echten Kopfzeilen aus
node tools/schuss.mjs http://127.0.0.1:4400
```

`tools/schuss.mjs` legt Bildschirmaufnahmen unter `.impeccable/review/` ab und
prüft in einem Durchgang: Querüberlauf auf 1440 und 390 px, Konsolenfehler, die
Messtabelle auf dem Blatt M-1, und auf jeder Seite außer dem Impressum genau
eine `h1`, das `alt`-Attribut an allen Bildern und ob Anschrift,
Telefonnummer oder Matrikelnummer im gerenderten Text auftauchen. Die Muster
dafür stehen in `.sperrmuster.json` (nicht im Repository).

Weitere Prüfungen, alle mit `[basis-url]` als optionalem Argument:

| Skript | Prüft |
| --- | --- |
| `tools/register-test.mjs` | Inhaltsverzeichnis auf Desktop und Telefon, Zählwerk, Seite ohne JavaScript |
| `tools/lupe-test.mjs` | Bilddialog: Öffnen, Fokus, Schließen, Fallback ohne Skript |
| `tools/video-test.mjs` | Video: nur im Bild, Pause, Vollbild, reduzierte Bewegung, Fehlerfälle (läuft in Edge wegen H.264) |
| `tools/links-test.mjs` | Downloads, Außenlinks in neuem Tab mit `noopener` |
| `tools/kontakt-test.mjs` | Kontaktknopf kopiert die Adresse und zeigt die Rückmeldung |

`tools/serve-mit-headern.mjs` wendet `public/_headers` an — die Vorschau von
Astro tut das nicht, und die Content-Security-Policy fällt sonst erst in
Produktion auf.

**Das gesamte Seitenverhalten liegt in `public/js/register.js`** —
Inhaltsverzeichnis, Auftritt beim Scrollen, Zählwerk, Kontaktrückmeldung,
Bilddialog und Videosteuerung. Bewusst eine eigene
Datei: die Richtlinie setzt `script-src 'self'` ohne `unsafe-inline`, und
Astro bettet kleine `<script>`-Blöcke aus Komponenten von sich aus in die
Seite ein — so ein Skript wird in Produktion stillschweigend blockiert, und
lokal merkt man nichts. `tools/live.mjs` prüft deshalb nicht nur, dass das
Skript da ist, sondern dass es **lief**: es setzt als Erstes `data-js` auf
`<html>`, und die Prüfung meldet, wenn das Attribut fehlt.

Ohne JavaScript bleibt die Seite vollständig benutzbar: Verzeichnis offen,
alle Inhalte sichtbar, Zahlen stehen fest.

`tools/lupe.mjs <url> <selektor> <datei>` nimmt einzelne Elemente auf.

## Deployment

Ausgerollt über Cloudflare als Worker mit statischen Assets:
**https://my-website.abdilkarimb.workers.dev**

Jeder Push auf `main` löst einen neuen Build aus. Build command `npm run build`,
Ausgabe `dist`, Umgebungsvariable **`NODE_VERSION` = `22.16.0`**.

Die Node-Version ist nicht optional: Astro 7 verlangt mindestens 22.12.0
(siehe `engines` in der `package.json`). Ohne Vorgabe wählt Cloudflare eine
ältere Version, und der Build bricht ab.

### Zwei Fallen, die schon zugeschnappt sind

**Bilder.** `astro.config.mjs` setzt `output: 'static'` und den sharp-Bilddienst
ausdrücklich. Ohne das erzeugte der Cloudflare-Build die Bilder erst beim Abruf
über einen Endpunkt `/_image`, den die statische Auslieferung nicht bedient:
lokal waren alle Bilder da, live antworteten sieben mit 404. Wer diese beiden
Zeilen entfernt, holt den Fehler zurück — und sieht ihn lokal nicht.

**Adresse.** Bei einer eigenen Domain an drei Stellen ändern, sonst zeigen
Canonical-Links, hreflang und Sitemap ins Leere:

- `astro.config.mjs` → `site`
- `public/robots.txt` → `Sitemap:`
- `public/sitemap.xml` → alle `loc` und `hreflang`

### Nach jedem Deploy prüfen

```bash
node tools/live.mjs https://my-website.abdilkarimb.workers.dev/
```

Prüft die ausgerollte Seite statt des lokalen Builds: Statuscode, ob die
Sicherheitskopfzeilen aus `public/_headers` wirklich ankommen, ob jedes Bild
lädt, ob das Skript unter der scharfen Content-Security-Policy gelaufen ist,
ob die Messtabelle auf M-1 vollständig ist, und meldet jede Anfrage mit
Fehlerstatus. Genau so ist der Bilderfehler
aufgefallen.

## Aufbau

```
src/data/inhalt.ts                 Sämtliche Inhalte, zweisprachig
src/data/bilder.json               Manifest der vorberechneten Bilder (aus tools/bilder.mjs)
src/data/bild.ts                   Bild- und Pfadhelfer
src/styles/                        Das Gestaltungssystem (protokoll.css, register.css)
src/components/Protokoll.astro     Startseite mit Projektkacheln
src/components/Blatt.astro         Ein Projektblatt in voller Länge
src/components/ProjektSeite.astro  Rahmen der Projektseiten
src/components/Rechtsseite.astro   Rahmen von Impressum und Datenschutz
src/pages/                         /, /en/, /projekte/<id>/, /en/projects/<id>/, Rechtsseiten
public/js/register.js              Das einzige Skript
public/dokumente/                  Lebenslauf (DE/EN) und geschwärzte Zeugnisse
public/media/                      WebP-Varianten, Videos, Vorschaubild
tools/                             Prüf-, Bild-, Video- und Kachelwerkzeuge
DESIGN.md                          Gestaltungssystem als Dokument
```

## Regeln für diese Seite

- **Keine Telefonnummer, keine Matrikelnummer** — weder im Text noch in einer
  ausgelieferten Datei. Die Anschrift steht ausschließlich im Impressum
  (`/impressum/`, `/en/legal-notice/`, beide mit `noindex`).
  `tools/schuss.mjs` prüft alle übrigen Seiten.
- **Jede Zahl trägt ihre Quelle.** Was nicht gemessen wurde, wird als
  schematisch ausgewiesen und nie als Messwert dargestellt.
- Die veröffentlichten Zeugnisse sind geschwärzt: fremde Unterschriften,
  Bankverbindung des Arbeitgebers und die Privatanschrift sind entfernt.
- Die Corporate-Identity-Dateien der Projektron GmbH gehören dem Kunden und
  werden hier nicht veröffentlicht.

## Offene Baustelle

Die Komponenten enthalten zusammen rund 60 Inline-`style`-Attribute mit fest
eingetragenen Schriftgrößen und Farben. Sie umgehen die Token-Ebene aus
`src/styles/protokoll.css` und `DESIGN.md`. Der Detektor meldet sie als
beratende Befunde:

```bash
"…/impeccable" detect --json src/components/*.astro src/styles/protokoll.css
```

Sichtbar ist davon nichts — die Werte stimmen, sie stehen nur am falschen Ort.
Wer die Seite weiterbaut, sollte die wiederkehrenden Werte (0.75/0.8125/0.9375
rem, die halbtransparenten Weißtöne auf den grünen Bändern) als benannte Token
ins Stylesheet holen und die Inline-Angaben ersetzen. Das ist ein eigener
Durchgang mit eigener Prüfung, kein Nebenbei-Umbau.

## Quellenunterlagen

Liegen in `.myFilesAndProjects/` und sind bewusst nicht im Repository.
