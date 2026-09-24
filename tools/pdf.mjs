// Druckt das Portfolio-PDF aus der gebauten Seite (/druck/ und /en/print/).
//
// Kein zweiter Satz Inhalte, kein Layoutprogramm: gedruckt wird dieselbe
// Seite, die auch im Browser steht, mit den Druckregeln aus protokoll.css.
// Ein neues Projekt in src/data/inhalt.ts erscheint damit ohne weiteres
// Zutun im Dokument -- diese Datei muss dafuer nicht angefasst werden.
//
// Vorher bauen und ausliefern:
//   npx astro build
//   node tools/serve-mit-headern.mjs 4400
//   node tools/pdf.mjs
import { chromium } from 'playwright';
import { readFile, stat } from 'node:fs/promises';

const BASIS = process.argv[2] ?? 'http://127.0.0.1:4400';
const BOEGEN = [
  { pfad: '/druck/', datei: 'public/dokumente/projektportfolio-abdil-karim-bakir.pdf' },
  { pfad: '/en/print/', datei: 'public/dokumente/project-portfolio-abdil-karim-bakir.pdf' },
];

// Die Zahl der Blaetter steht in den Inhalten, nicht hier: faellt eines aus
// dem Druckbogen heraus (ein Fehler in einer Bedingung, ein Blatt ohne
// Nummer), bricht der Lauf ab, statt ein lueckenhaftes PDF auszuliefern.
const soll = (await readFile('src/data/inhalt.ts', 'utf8')).match(/^\s{4}nr: 'M-\d+',$/gm)?.length ?? 0;
if (!soll) throw new Error('Keine Blattnummern in src/data/inhalt.ts gefunden');

const browser = await chromium.launch();
// Ohne "Bewegung reduzieren" stehen die eingeblendeten Zeilen beim Druck
// noch auf halber Deckkraft.
const ctx = await browser.newContext({ reducedMotion: 'reduce' });
const bericht = [];

for (const bogen of BOEGEN) {
  const seite = await ctx.newPage();
  await seite.goto(BASIS + bogen.pfad, { waitUntil: 'networkidle' });

  const blaetter = await seite.locator('.blatt').count();
  if (blaetter !== soll) throw new Error(`${bogen.pfad}: ${blaetter} Blaetter, erwartet ${soll}`);

  // Zwei Dinge, die der Druck von sich aus nicht loest: Bilder mit
  // loading="lazy" laedt der Browser erst beim Scrollen, und ein <video>
  // druckt je nach Fassung eine leere Flaeche. Beides wird vor dem Druck
  // im DOM begradigt -- lieber hier als mit einer Sonderfassung der
  // Komponente, die dann zwei Zustaende haette.
  await seite.evaluate(() => {
    for (const v of document.querySelectorAll('video')) {
      const img = document.createElement('img');
      img.src = v.poster;
      img.alt = v.getAttribute('aria-label') ?? '';
      img.style.width = '100%';
      v.replaceWith(img);
    }
    for (const i of document.querySelectorAll('img')) i.loading = 'eager';
  });
  await seite.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 30000 });

  await seite.emulateMedia({ media: 'print' });
  await seite.pdf({
    path: bogen.datei,
    format: 'A4',
    /* Chromium legt beim Drucken die Papierbreite als Fensterbreite aus: A4
       abzueglich der Raender sind rund 700 px, und damit griffen im Dokument
       die Handy-Regeln der Seite -- die Messtabelle zerfiel in gestapelte
       Karten, die Zweispalter wurden einspaltig. Der Massstab gibt der
       Auslegung rund 930 px (58 rem) und damit dieselbe Darstellung wie auf
       dem Bildschirm; der Text wird dabei kleiner, nicht anders. */
    scale: 0.75,
    printBackground: false,
    margin: { top: '14mm', bottom: '16mm', left: '13mm', right: '13mm' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="width:100%;margin:0 13mm;font-family:Arial,sans-serif;font-size:8pt;color:#666;
        display:flex;justify-content:space-between;border-top:.5pt solid #bbb;padding-top:3mm">
      <span>Abdil Karim Bakir</span>
      <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
    </div>`,
  });
  await seite.close();
  bericht.push({ bogen: bogen.pfad, datei: bogen.datei, blaetter, kb: Math.round((await stat(bogen.datei)).size / 1024) });
}

await browser.close();
console.log(JSON.stringify({ basis: BASIS, boegen: bericht }, null, 1));
