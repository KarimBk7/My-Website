// Prüft, dass der Kontaktknopf sichtbar reagiert — auch ohne Mailprogramm.
// Aufruf: node tools/kontakt-test.mjs [basis-url]
import { chromium } from 'playwright';

const BASIS = process.argv[2] ?? 'http://127.0.0.1:4400';
const browser = await chromium.launch();
const ergebnis = {};

// Zwischenablage erlauben, sonst verweigert Chromium den Zugriff still.
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  permissions: ['clipboard-read', 'clipboard-write'],
});
const p = await ctx.newPage();
const fehler = [];
p.on('pageerror', (e) => fehler.push(e.message));

// mailto: würde ein externes Programm anstossen. Die Navigation dorthin
// abfangen, damit der Test nicht am Betriebssystem haengt -- genau der Fall,
// den ein Rechner ohne Mailprogramm ohnehin erlebt.
await p.route('**', (route) =>
  route.request().url().startsWith('mailto:') ? route.abort() : route.continue(),
);

await p.goto(BASIS + '/', { waitUntil: 'networkidle' });

const knopf = p.locator('a[data-kontakt]').first();
const hinweis = p.locator('.kontakt-hinweis').first();

ergebnis.vorKlick = {
  sichtbar: await hinweis.isVisible(),
  text: (await hinweis.textContent())?.trim() || '',
};

await knopf.click();
await p.waitForTimeout(600);

ergebnis.nachKlick = {
  sichtbar: await hinweis.isVisible(),
  text: (await hinweis.textContent())?.trim() || '',
};
ergebnis.adresseImText = ergebnis.nachKlick.text.includes('@');
await p.locator('.kopf').screenshot({ path: '.impeccable/review/pruef-kontakt.png' });
ergebnis.zwischenablage = await p.evaluate(() => navigator.clipboard.readText().catch(() => null));

// Zweiter Knopf im Freigabeblock
const knopf2 = p.locator('a[data-kontakt]').nth(1);
ergebnis.zweiterKnopfVorhanden = (await knopf2.count()) > 0;

await browser.close();

// Ohne JavaScript muss der Link ein gueltiger mailto-Link bleiben.
const b2 = await chromium.launch();
const c2 = await b2.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
const p2 = await c2.newPage();
await p2.goto(BASIS + '/', { waitUntil: 'load' });
ergebnis.ohneJs = {
  href: await p2.locator('a[data-kontakt]').first().getAttribute('href'),
  hinweisVersteckt: !(await p2.locator('.kontakt-hinweis').first().isVisible()),
};
await b2.close();

console.log(JSON.stringify({ ...ergebnis, fehler }, null, 2));
