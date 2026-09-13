// Prüft die ausgerollte Seite, nicht den lokalen Build.
// Aufruf: node tools/live.mjs https://beispiel.tld/
//
// Der Unterschied zu tools/schuss.mjs: hier zaehlen echte Netzantworten,
// die tatsaechlich ausgelieferten Kopfzeilen und die Ladezeit ueber die
// Leitung. Lokal richtig heisst nicht ausgerollt richtig.
import { chromium } from 'playwright';

const ZIEL = process.argv[2];
if (!ZIEL) {
  console.error('Aufruf: node tools/live.mjs <url>');
  process.exit(1);
}
const basis = ZIEL.endsWith('/') ? ZIEL : ZIEL + '/';

const browser = await chromium.launch();
const seite = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const auffaellig = [];
seite.on('response', (r) => { if (r.status() >= 400) auffaellig.push(`${r.status()}  ${r.url()}`); });
seite.on('requestfailed', (r) => auffaellig.push(`ABBRUCH ${r.failure()?.errorText ?? ''}  ${r.url()}`));
seite.on('console', (m) => { if (m.type() === 'error') auffaellig.push(`KONSOLE  ${m.text()}`); });
seite.on('pageerror', (e) => auffaellig.push(`SKRIPTFEHLER  ${e.message}`));

const start = Date.now();
const antwort = await seite.goto(basis, { waitUntil: 'load', timeout: 60000 });
const ladezeit = Date.now() - start;

// Alles anfassen, damit auch die verzoegert geladenen Bilder wirklich kommen.
await seite.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.8) {
    scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 150));
  }
  scrollTo(0, 0);
});
await seite.waitForTimeout(6000);

const bilder = await seite.evaluate(() =>
  [...document.images].map((i) => ({
    ok: i.complete && i.naturalWidth > 0,
    src: (i.currentSrc || i.src).replace(location.origin, ''),
  })),
);

// Die Messwerte im Projektblatt M-1 (eigene Seite): vier Zeilen, die nicht
// gemessene markiert. Eigener Tab, damit die Pruefungen der Startseite
// unten weiter auf der Startseite laufen.
const blatt = await seite.context().newPage();
blatt.on('response', (r) => { if (r.status() >= 400) auffaellig.push(`${r.status()}  ${r.url()}`); });
blatt.on('pageerror', (e) => auffaellig.push(`SKRIPTFEHLER M-1  ${e.message}`));
await blatt.goto(basis + 'projekte/spesenkonfigurator/', { waitUntil: 'load', timeout: 60000 });
const messwerte = await blatt.evaluate(() => {
  const zeilen = [...document.querySelectorAll('.messtabelle--kompakt tbody tr')];
  return {
    zeilen: zeilen.length,
    schematischMarkiert: document.querySelectorAll('.messtabelle--kompakt .stufe--offen').length,
  };
});

// Genau ein Skript darf auf der Seite liegen, und zwar als eigene Datei --
// unter script-src 'self' faellt ein eingebettetes Skript lautlos aus.
// Entscheidend ist nicht, dass es da steht, sondern dass es LIEF: das Skript
// setzt als Erstes data-js auf <html>. Fehlt das Attribut, wurde es blockiert.
const skript = await seite.evaluate(() => {
  const alle = [...document.querySelectorAll('script')].filter((s) => s.type !== 'application/ld+json');
  return {
    anzahl: alle.length,
    quellen: alle.map((s) => s.getAttribute('src') ?? '(eingebettet)'),
    gelaufen: 'js' in document.documentElement.dataset,
    registerStand: document.documentElement.dataset.register ?? '(nicht gesetzt)',
  };
});

const kopf = antwort.headers();
const erwartet = ['content-security-policy', 'x-content-type-options', 'x-frame-options', 'referrer-policy'];

await browser.close();

console.log(JSON.stringify({
  ziel: basis,
  status: antwort.status(),
  ladezeitMs: ladezeit,
  kopfzeilenFehlen: erwartet.filter((k) => !kopf[k]),
  bilder: { gesamt: bilder.length, geladen: bilder.filter((b) => b.ok).length,
            fehlend: bilder.filter((b) => !b.ok).map((b) => b.src) },
  skript,
  messwerte,
  auffaellig,
}, null, 2));
