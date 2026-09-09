# Bewerbungs-Website — Abdil Karim Bakir

Statische, zweisprachige Website (Deutsch unter `/`, Englisch unter `/en/`).
Gebaut mit [Astro](https://astro.build), ausgeliefert über Cloudflare Pages.

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
prüft in einem Durchgang: Querüberlauf auf 1440 und 390 px, genau eine `h1`,
Alt-Texte an allen Bildern, Konsolenfehler, ob der Vorher/Nachher-Schalter die
Werte tatsächlich umschaltet, und ob Anschrift, Telefonnummer oder
Matrikelnummer irgendwo im gerenderten Text auftauchen.

`tools/serve-mit-headern.mjs` wendet `public/_headers` an. Das ist wichtig: die
Content-Security-Policy verbietet eingebettete Skripte, und Astro bettet kleine
Skripte von sich aus ein. Deshalb liegt das Seitenverhalten bewusst in
`public/js/protokoll.js` statt in einem `<script>`-Block der Komponente. Wer
das zurückbaut, bricht die Seite in Produktion, ohne es lokal zu merken.

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
lädt, ob der Schalter unter der scharfen Content-Security-Policy funktioniert,
und meldet jede Anfrage mit Fehlerstatus. Genau so ist der Bilderfehler
aufgefallen.

## Aufbau

```
src/data/inhalt.ts        Sämtliche Inhalte, zweisprachig, mit Quellenangabe je Zahl
src/data/graph.json       Ausschnitt des Wissensgraphen, Layout vorberechnet
src/styles/protokoll.css  Das Gestaltungssystem
src/components/           Die Seite
public/dokumente/         Lebenslauf und geschwärzte Zeugnisse
public/js/protokoll.js    Verhalten (Schalter, Graph, Einblendung)
tools/                    Prüfwerkzeuge
```

## Regeln für diese Seite

- **Keine Anschrift, keine Telefonnummer, keine Matrikelnummer** — weder im
  Text noch in einer ausgelieferten Datei. `tools/schuss.mjs` prüft das.
- **Jede Zahl trägt ihre Quelle.** Was nicht gemessen wurde, wird als
  schematisch ausgewiesen und nie als Messwert dargestellt.
- Die veröffentlichten Zeugnisse sind geschwärzt: fremde Unterschriften,
  Bankverbindung des Arbeitgebers und die Privatanschrift sind entfernt.
- Die Corporate-Identity-Dateien der Projektron GmbH gehören dem Kunden und
  werden hier nicht veröffentlicht.

## Offene Baustelle

`src/components/Protokoll.astro` enthält 59 Inline-`style`-Attribute mit fest
eingetragenen Schriftgrößen und Farben. Sie umgehen die Token-Ebene aus
`src/styles/protokoll.css` und `DESIGN.md`. Der Detektor meldet das als
54 beratende Befunde:

```bash
"…/impeccable" detect --json src/components/Protokoll.astro src/styles/protokoll.css
```

Sichtbar ist davon nichts — die Werte stimmen, sie stehen nur am falschen Ort.
Wer die Seite weiterbaut, sollte die wiederkehrenden Werte (0.75/0.8125/0.9375
rem, die halbtransparenten Weißtöne auf den grünen Bändern) als benannte Token
ins Stylesheet holen und die Inline-Angaben ersetzen. Das ist ein eigener
Durchgang mit eigener Prüfung, kein Nebenbei-Umbau.

## Quellenunterlagen

Liegen in `.myFilesAndProjects/` und sind bewusst nicht im Repository.
