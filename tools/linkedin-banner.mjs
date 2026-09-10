// Erzeugt das LinkedIn-Titelbild nach linkedin-banner.png.
//
// Format: 1584 x 396 -- das ist die Groesse, die LinkedIn erwartet.
// Wichtig ist die Sperrflaeche: das Profilbild liegt als Kreis UEBER dem
// Banner, unten links, und auf dem Telefon beschneidet LinkedIn zusaetzlich
// die Raender. Alles Lesbare gehoert deshalb in die rechten zwei Drittel und
// aus der unteren linken Ecke heraus.
//
// Mit --pruef wird zusaetzlich linkedin-banner-pruefung.png geschrieben: das
// gleiche Bild mit eingezeichnetem Profilbildkreis und Telefon-Beschnitt,
// damit man sieht, ob etwas verdeckt wird.
//
// Farben und Schrift stammen aus derselben Quelle wie die Website -- wer vom
// Profil auf die Seite klickt, soll dasselbe Haus betreten.
//
// Aufruf: node tools/linkedin-banner.mjs [--pruef]
import { chromium } from 'playwright';
import { readdirSync } from 'node:fs';

const schrift = readdirSync('dist/_astro').find(
  (f) => f.startsWith('archivo-latin-standard') && f.endsWith('.woff2'),
);
if (!schrift) {
  console.error('Archivo nicht in dist/_astro gefunden -- zuerst "npm run build" laufen lassen.');
  process.exit(1);
}

const pruef = process.argv.includes('--pruef');

const kraft = 'Backend · Web · Cloud · Hardware';
const label = 'Software Engineering';
const adresse = 'my-website.abdilkarimb.workers.dev';
/* Dieselben drei Belege wie auf der Vorschaukarte der Website. Aendert sich
   dort eine Zahl, gehoert sie hier nachgezogen. */
const belege = [
  ['34×', 'schneller unter Last'],
  ['4', 'belegte Projekte'],
  ['2', 'Arbeitszeugnisse'],
];

const seite = `<!doctype html><meta charset="utf-8">
<style>
  @font-face { font-family: A; src: url('http://127.0.0.1:4400/_astro/${schrift}') format('woff2');
               font-weight: 100 900; font-stretch: 62% 125%; font-display: block; }
  * { margin: 0; box-sizing: border-box; }
  body { width: 1584px; height: 396px; background: #1d5c44; color: #fff;
         font-family: A, system-ui, sans-serif; position: relative; overflow: hidden; }

  /* Feiner Raster-Anklang wie das Millimeterpapier eines Messprotokolls --
     so schwach, dass er nur als Textur wirkt, nicht als Muster. */
  .raster { position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px);
    background-size: 44px 44px; }

  .inhalt { position: absolute; left: 500px; right: 96px; top: 0; bottom: 0;
            display: flex; flex-direction: column; justify-content: center; gap: 22px; }
  .label { font-family: ui-monospace, monospace; font-size: 19px; letter-spacing: .22em;
           text-transform: uppercase; color: rgba(255,255,255,.7); }
  .kraft { font-size: 55px; font-weight: 700; font-stretch: 92%; letter-spacing: -.015em;
           line-height: 1.05; }
  .belege { display: flex; gap: 54px; border-top: 2px solid rgba(255,255,255,.28); padding-top: 20px; }
  .beleg b { display: block; font-size: 33px; font-weight: 700; line-height: 1; }
  .beleg span { display: block; margin-top: 6px; font-size: 16px; color: rgba(255,255,255,.78); }
  .adr { position: absolute; right: 96px; bottom: 38px;
         font-family: ui-monospace, monospace; font-size: 17px; color: rgba(255,255,255,.72); }

  /* Nur fuer die Pruefausgabe: Profilbildkreis und Telefon-Beschnitt. */
  .sperr { position: absolute; left: 96px; bottom: -76px; width: 300px; height: 300px;
           border-radius: 50%; background: rgba(220,60,50,.45); border: 3px solid #ff5a4d; }
  .schnitt { position: absolute; inset: 0 0 0 0; border-left: 3px dashed #ff5a4d;
             border-right: 3px dashed #ff5a4d; margin: 0 68px; }
</style>
<div class="raster"></div>
<div class="inhalt">
  <div class="label">${label}</div>
  <div class="kraft">${kraft}</div>
  <div class="belege">
    ${belege.map(([w, l]) => `<div class="beleg"><b>${w}</b><span>${l}</span></div>`).join('')}
  </div>
</div>
<div class="adr">${adresse}</div>
${pruef ? '<div class="sperr"></div><div class="schnitt"></div>' : ''}`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: 1 });
await p.setContent(seite, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(400);
const datei = pruef ? 'linkedin-banner-pruefung.png' : 'linkedin-banner.png';
await p.screenshot({ path: datei });
await b.close();
console.log('geschrieben:', datei);
