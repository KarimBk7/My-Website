// Rendert die Kachelbilder fuer Projekte ohne eigene Aufnahme aus der Seite
// selbst: M-3 zeigt seine Themenlandkarte, M-4 den Kopf dieser Seite. Beides
// sind echte Ausschnitte, keine Illustrationen -- die Kachel zeigt, was hinter
// ihr steht.
//
// Laeuft gegen den gebauten Stand (serve-mit-headern.mjs), schreibt PNGs nach
// src/assets/media; danach macht `node tools/bilder.mjs` die WebP-Fassungen.
// Neu ausfuehren, wenn sich Kopf oder Themenlandkarte sichtbar aendern.
//
// M-1 nimmt statt eines Seitenausschnitts ein Bild aus seinem Video (bei 9 s:
// gefuellte Tabelle, gelb markierte Warnung, offene Auswahlliste):
//   ffmpeg -ss 9 -i public/media/projektron-ablauf.mp4 -frames:v 1 -vf scale=1200:-1 src/assets/media/kachel-spesenkonfig.png
// M-2 nutzt das Standbild seines Videos (kaiju-spiel) unveraendert.
//
// Aufruf: node tools/kacheln.mjs [basis-url]
import { chromium } from 'playwright';

const BASIS = process.argv[2] ?? 'http://127.0.0.1:4400';
const BREITE = 1200;
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: BREITE, height: Math.round(BREITE * 9 / 16) }, reducedMotion: 'reduce' });
const p = await ctx.newPage();

// M-4: der Seitenkopf, wie ihn ein Besucher als Erstes sieht
await p.goto(BASIS + '/', { waitUntil: 'networkidle' });
await p.screenshot({ path: 'src/assets/media/kachel-website.png' });

// M-3: Kennwerte und Themenlandkarte, im Seitenverhaeltnis der Kachel.
// Vorher ganz nach unten scrollen, damit alle Zeilen eingeblendet sind.
await p.setViewportSize({ width: BREITE, height: 1400 });
await p.goto(BASIS + '/projekte/lernrepo/', { waitUntil: 'networkidle' });
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await p.waitForTimeout(500);
const r = await p.evaluate(() => {
  const k = document.querySelector('.kennwerte').closest('.stapel').getBoundingClientRect();
  return { x: k.x + scrollX, y: k.y + scrollY, width: k.width };
});
const rand = 32;
await p.screenshot({
  path: 'src/assets/media/kachel-lernrepo.png',
  clip: { x: r.x - rand, y: r.y - 12, width: r.width + 2 * rand, height: Math.round((r.width + 2 * rand) * 9 / 16) },
  fullPage: true,
});
await b.close();
console.log('geschrieben: src/assets/media/kachel-website.png, kachel-lernrepo.png');
