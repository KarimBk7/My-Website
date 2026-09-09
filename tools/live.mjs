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

// Der Schalter ist das Herzstueck: wenn die Richtlinie das Skript blockiert,
// faellt genau er aus, und zwar lautlos.
const vorher = await seite.locator('.messtabelle tbody tr').first().locator('[data-rolle="wert"]').innerText();
await seite.locator('#schalter button[data-stand="vorher"]').click();
await seite.waitForTimeout(250);
const nachher = await seite.locator('.messtabelle tbody tr').first().locator('[data-rolle="wert"]').innerText();

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
  schalterWechselt: vorher !== nachher,
  auffaellig,
}, null, 2));
