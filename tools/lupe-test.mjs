// Prueft die Bildlupe im Betrieb: oeffnet sie, zeigt sie die grosse Fassung,
// schliesst sie per Escape und per Hintergrundklick, kehrt der Fokus zurueck
// -- und bleibt der Link ohne Skript ein brauchbarer Link?
//
// Aufruf: node tools/lupe-test.mjs [basis-url]
import { chromium } from 'playwright';

const BASIS = process.argv[2] ?? 'http://127.0.0.1:4400';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
const p = await ctx.newPage();
const fehler = [];
p.on('pageerror', (e) => fehler.push(e.message));
await p.goto(BASIS + '/projekte/spesenkonfigurator/', { waitUntil: 'networkidle' });
const erg = {};

const lupe = p.locator('#lupe');
erg.vorherOffen = await lupe.evaluate((d) => d.open);

// Ein kleines Bild waehlen -- dort ist der Gewinn am groessten.
const ziel = p.locator('a[data-lupe]').nth(1);
erg.angezeigtVorher = await ziel.locator('img').evaluate((i) => i.getBoundingClientRect().width);
await ziel.click();
await p.waitForTimeout(500);

erg.offen = await lupe.evaluate((d) => d.open);
erg.imBild = await lupe.locator('img').evaluate((i) => ({
  quelle: i.currentSrc.split('/').pop(),
  angezeigt: Math.round(i.getBoundingClientRect().width),
  nativ: i.naturalWidth,
  geladen: i.complete && i.naturalWidth > 0,
}));
erg.bildunterschrift = (await lupe.locator('.lupe-bu').textContent())?.slice(0, 40);
erg.masszeile = await lupe.locator('.lupe-mass').textContent();
// Fokus muss im Dialog liegen, nicht mehr auf der Seite dahinter.
erg.fokusImDialog = await p.evaluate(() => document.activeElement?.closest('#lupe') !== null);

// Escape schliesst (kommt vom Browser, nicht von uns).
await p.keyboard.press('Escape');
await p.waitForTimeout(400);
erg.nachEscape = await lupe.evaluate((d) => d.open);
erg.fokusZurueck = await p.evaluate(() => document.activeElement?.hasAttribute('data-lupe'));

// Hintergrundklick schliesst ebenfalls.
await ziel.click();
await p.waitForTimeout(400);
await p.mouse.click(20, 20);
await p.waitForTimeout(400);
erg.nachHintergrundklick = await lupe.evaluate((d) => d.open);

// Klick auf das Bild selbst darf NICHT schliessen.
await ziel.click();
await p.waitForTimeout(400);
await lupe.locator('img').click();
await p.waitForTimeout(300);
erg.bildklickHaeltOffen = await lupe.evaluate((d) => d.open);
await p.keyboard.press('Escape');

await ctx.close();

// Ohne Skript: der Link muss die Bilddatei in einem neuen Tab oeffnen.
const c2 = await b.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
const p2 = await c2.newPage();
await p2.goto(BASIS + '/projekte/spesenkonfigurator/', { waitUntil: 'load' });
const l = p2.locator('a[data-lupe]').nth(1);
erg.ohneJs = {
  href: (await l.getAttribute('href'))?.split('/').pop(),
  ziel: await l.getAttribute('target'),
  dialogVersteckt: !(await p2.locator('#lupe').isVisible()),
};
await b.close();

console.log(JSON.stringify({ ...erg, fehler }, null, 1));
