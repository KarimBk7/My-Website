// Erzeugt das Vorschaubild fuer Link-Vorschauen (LinkedIn, Slack, Teams,
// WhatsApp) nach public/media/vorschau.png -- 1200x630, das Format, das alle
// diese Dienste erwarten.
//
// Warum ein eigenes Skript und kein Bildprogramm: die Karte zeigt Name, Rolle
// und Adresse. Aendert sich einer dieser Texte in src/data/inhalt.ts, laeuft
// das Bild sonst still auseinander -- hier wird es aus derselben Quelle gebaut.
//
// Aufruf: node tools/vorschaubild.mjs   (nicht im Build; einmal je Textaenderung)
import { chromium } from 'playwright';
import { mkdirSync, readdirSync } from 'node:fs';

// Astro haengt einen Inhalts-Hash an den Schriftdateinamen, der sich bei jedem
// Schriftwechsel aendert. Ihn hier fest einzutragen hiesse, dass das Skript
// beim naechsten Build stumm auf die Ersatzschrift zurueckfaellt.
const schrift = readdirSync('dist/_astro').find(
  (f) => f.startsWith('archivo-latin-standard') && f.endsWith('.woff2'),
);
if (!schrift) {
  console.error('Archivo nicht in dist/_astro gefunden -- zuerst "npm run build" laufen lassen.');
  process.exit(1);
}

const name = 'Bakir,<br>Abdil Karim';
const rolle = 'Software Engineering · Backend, Web, Cloud, Hardware';
const zeile = 'Informatikstudent an der FU Berlin';
const adresse = 'my-website.abdilkarimb.workers.dev';

/* Drei Belege statt einer leeren Bildmitte. Jede Zahl steht so auch auf der
   Seite; aendert sie sich dort, gehoert sie hier nachgezogen. */
const belege = [
  ['34×', 'schneller unter Last'],
  ['4', 'belegte Projekte'],
  ['2', 'Arbeitszeugnisse'],
];

// Die Farben stammen aus src/styles/protokoll.css und muessen dort gleich
// bleiben; die Schrift kommt aus dem gebauten dist/, damit die Karte dieselbe
// Archivo zeigt wie die Seite.
const seite = `<!doctype html><meta charset="utf-8">
<style>
  @font-face { font-family: A; src: url('http://127.0.0.1:4400/_astro/${schrift}') format('woff2');
               font-weight: 100 900; font-stretch: 62% 125%; font-display: block; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #1d5c44; color: #fff;
         font-family: A, system-ui, sans-serif; display: flex; flex-direction: column;
         justify-content: space-between; padding: 68px 76px 60px; }
  .name { font-size: 96px; line-height: .95; font-weight: 700; font-stretch: 88%;
          letter-spacing: -.02em; }
  .zeile { margin-top: 22px; font-size: 28px; font-weight: 400; opacity: .82; }
  .belege { display: flex; gap: 64px; border-top: 2px solid rgba(255,255,255,.28);
            padding-top: 30px; margin-top: 44px; }
  .beleg b { display: block; font-size: 52px; font-weight: 700; line-height: 1; }
  .beleg span { display: block; margin-top: 8px; font-size: 20px; opacity: .78; }
  .fuss { display: flex; justify-content: space-between; align-items: center; gap: 40px; }
  .rolle { border: 2px solid rgba(255,255,255,.55); padding: 14px 20px; font-size: 22px;
           font-weight: 600; white-space: nowrap; }
  .adr { font-family: ui-monospace, monospace; font-size: 21px; opacity: .8; white-space: nowrap; }
</style>
<div>
  <div class="name">${name}</div>
  <div class="zeile">${zeile}</div>
  <div class="belege">
    ${belege.map(([w, l]) => `<div class="beleg"><b>${w}</b><span>${l}</span></div>`).join('')}
  </div>
</div>
<div class="fuss"><div class="rolle">${rolle}</div><div class="adr">${adresse}</div></div>`;

mkdirSync('public/media', { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.setContent(seite, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(400);
await p.screenshot({ path: 'public/media/vorschau.png' });
await b.close();
console.log('geschrieben: public/media/vorschau.png');
