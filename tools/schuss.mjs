// Bildschirmaufnahmen der gebauten Seite. Ein Durchgang, alle Ansichten.
// Aufruf: node tools/schuss.mjs [basis-url]
import { chromium } from 'playwright';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';

const BASIS = process.argv[2] ?? 'http://127.0.0.1:4321';
const ZIEL = '.impeccable/review';
mkdirSync(ZIEL, { recursive: true });

// Die Sperrmuster stehen NICHT hier. Ein Prüfskript, das die zu schützenden
// Daten im Klartext enthält, veröffentlicht sie selbst, sobald es committet
// wird. Sie liegen in .sperrmuster.json, und die Datei ist gitignoriert.
const SPERRDATEI = '.sperrmuster.json';
const sperrmuster = existsSync(SPERRDATEI) ? JSON.parse(readFileSync(SPERRDATEI, 'utf8')) : null;
if (!sperrmuster) {
  console.error(`WARNUNG: ${SPERRDATEI} fehlt — die Prüfung auf private Daten wurde übersprungen.`);
}

const ANSICHTEN = [
  { name: 'desktop', pfad: '/', width: 1440, height: 900, voll: true },
  { name: 'mobile', pfad: '/', width: 390, height: 844, voll: true },
  { name: 'desktop-hero', pfad: '/', width: 1440, height: 900, voll: false },
  { name: 'mobile-hero', pfad: '/', width: 390, height: 844, voll: false },
  { name: 'desktop-en', pfad: '/en/', width: 1440, height: 900, voll: true },
  { name: 'desktop-1280', pfad: '/', width: 1280, height: 800, voll: false },
  { name: 'projekt-m1', pfad: '/projekte/spesenkonfigurator/', width: 1440, height: 900, voll: true },
  { name: 'projekt-m1-mobile', pfad: '/projekte/spesenkonfigurator/', width: 390, height: 844, voll: true },
];

const browser = await chromium.launch();
const fehler = [];

for (const a of ANSICHTEN) {
  const ctx = await browser.newContext({
    viewport: { width: a.width, height: a.height },
    deviceScaleFactor: 2,
    // Bewegung stilllegen, sonst wird ein noch nicht eingefahrenes Element
    // als fehlendes Element fotografiert.
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') fehler.push(`[${a.name}] ${m.text()}`); });
  page.on('pageerror', (e) => fehler.push(`[${a.name}] ${e.message}`));

  await page.goto(BASIS + a.pfad, { waitUntil: 'networkidle' });
  // Keine Einblendung mehr zu setzen: die Seite hat keine Abschnittsanimation.

  // Bilder tragen loading="lazy" — richtig für echte Besucher, aber eine
  // Ganzseitenaufnahme ohne Scrollen fotografiert sonst leere Rahmen.
  // Einmal durchfahren, warten bis alles geladen ist, zurück nach oben.
  if (a.voll) {
    await page.evaluate(async () => {
      const schritt = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += schritt) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 250));
      window.scrollTo(0, 0);
    });
    await page.waitForFunction(
      () => Array.from(document.images).every((i) => i.complete && i.naturalWidth > 0),
      null,
      { timeout: 20000 },
    );
  }
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${ZIEL}/${a.name}.png`, fullPage: a.voll });

  // Gegenprobe, nur für Ganzseiten: bei Ausschnitten sind Bilder unterhalb
  // des Sichtfelds zu Recht noch nicht geladen.
  if (a.voll) {
    const fehlend = await page.evaluate(
      () => Array.from(document.images).filter((i) => !i.complete || i.naturalWidth === 0).length,
    );
    if (fehlend) fehler.push(`[${a.name}] ${fehlend} Bild(er) beim Auslösen noch nicht geladen`);
  }
  await ctx.close();
}

// Ein paar harte Prüfungen, die kein Bild zeigt -- auf jeder ausgelieferten
// Seite ausser dem Impressum, das die Anschrift absichtlich traegt.
const PRUEFSEITEN = ['/', '/en/', '/datenschutz/', '/en/privacy/',
  ...['spesenkonfigurator', 'kaiju', 'lernrepo', 'website'].flatMap((id) => [`/projekte/${id}/`, `/en/projects/${id}/`])];
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const befund = {};
for (const pfad of PRUEFSEITEN) {
await page.goto(BASIS + pfad, { waitUntil: 'networkidle' });
const b = await page.evaluate((muster) => {
  const doc = document.documentElement;
  const text = document.body.innerText;
  return {
    querUeberlauf: doc.scrollWidth > doc.clientWidth + 1,
    scrollWidth: doc.scrollWidth,
    clientWidth: doc.clientWidth,
    h1: document.querySelectorAll('h1').length,
    // alt="" ist fuer schmueckende Bilder richtig (Kachelbilder: der Link
    // traegt den Namen). Gezaehlt wird nur ein fehlendes Attribut.
    bilderOhneAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
    leereLinks: [...document.querySelectorAll('a')].filter((a) => !a.textContent.trim() && !a.getAttribute('aria-label')).length,
    privateDaten: muster ? muster.filter((m) => text.includes(m)) : 'nicht geprüft',
  };
}, sperrmuster);
// Nur Auffaelliges melden, sonst wird die Ausgabe zur Tapete.
const auffaellig = Object.entries(b).filter(([k, v]) =>
  (k === 'querUeberlauf' && v) || (k === 'h1' && v !== 1) || (['bilderOhneAlt', 'leereLinks'].includes(k) && v) ||
  (k === 'privateDaten' && (!Array.isArray(v) || v.length)));
befund[pfad] = auffaellig.length ? Object.fromEntries(auffaellig) : 'ok';
}
await page.goto(BASIS + '/projekte/spesenkonfigurator/', { waitUntil: 'networkidle' });

// Die Messwerte im Projektblatt M-1: vier Zeilen, und die nicht gemessene
// Angabe muss als solche markiert sein.
const messreihen = await page.locator('.messtabelle--kompakt tbody tr').count();
const schematischMarkiert = await page.locator('.messtabelle--kompakt .stufe--offen').count();

// Mobiler Querüberlauf. Absichtlich WÄHREND der Auftritts-Animationen
// gemessen, nicht danach: ein Element, das kurz über den Rand ragt, erzeugt
// einen aufblitzenden Querbalken, den eine spätere Messung nicht mehr sieht.
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mpage = await mctx.newPage();
await mpage.goto(BASIS + '/', { waitUntil: 'domcontentloaded' });
const mobilFrueh = await mpage.evaluate(() => {
  const d = document.documentElement;
  return { ueberlauf: d.scrollWidth > d.clientWidth + 1, breite: d.scrollWidth };
});
await mpage.waitForLoadState('networkidle');
const mobilUeberlauf = await mpage.evaluate(() => {
  const d = document.documentElement;
  const schuldige = [...document.querySelectorAll('*')]
    .filter((el) => el.getBoundingClientRect().right > d.clientWidth + 1)
    .slice(0, 6)
    .map((el) => el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''));
  return { ueberlauf: d.scrollWidth > d.clientWidth + 1, breite: d.scrollWidth, sicht: d.clientWidth, schuldige };
});

await browser.close();

console.log(JSON.stringify({
  befund,
  messwerte: { zeilen: messreihen, schematischMarkiert },
  mobil: mobilUeberlauf,
  mobilWaehrendAnimation: mobilFrueh,
  konsolenfehler: fehler,
}, null, 2));
