// Prueft die Wordle-Demo auf Blatt M-5 im Browser.
//
// Die Sollwerte stammen NICHT aus derselben Rechnung: sie wurden mit einem
// eigenen Python-Skript ueber dieselben Wortlisten bestimmt, das die Regeln
// des Spiels unabhaengig nachbildet (Doppelbuchstaben eingeschlossen -- der
// Fall "geese" deckt genau das ab). Stimmt der Browser damit ueberein, rechnet
// er richtig und bestaetigt sich nicht selbst.
//
// Aufruf: node tools/wordle-test.mjs [basis-url]
import { chromium } from 'playwright';

const BASIS = process.argv[2] ?? 'http://127.0.0.1:4400';
const PFAD = '/projekte/wordle/';
const FAELLE = [
  { zeilen: [['slate', 'xxyxg']], loesungen: 31, rateworte: 166, erstes: 'abide' },
  { zeilen: [['crane', 'xgxxy'], ['pilot', 'xxxxx']], loesungen: 7, rateworte: 33, erstes: 'fresh' },
  { zeilen: [['geese', 'ygxxg']], loesungen: 5, rateworte: 13, erstes: 'hedge' },
];

const browser = await chromium.launch();
const erg = {};
const fehler = [];

/* --- Mit Skript: rechnet die Demo richtig? ------------------------------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => fehler.push('Skriptfehler: ' + e.message));
  p.on('console', (m) => { if (m.type() === 'error') fehler.push('Konsole: ' + m.text()); });
  await p.goto(BASIS + PFAD, { waitUntil: 'networkidle' });

  erg.sichtbar = await p.locator('[data-wordle]').isVisible();
  erg.hinweisWeg = (await p.locator('[data-wordle-ohne]').count()) === 0;

  erg.faelle = [];
  for (const fall of FAELLE) {
    // Eingaben zuruecksetzen, dann Wort tippen und die Farben klicken
    await p.evaluate(() => document.querySelectorAll('.wd-wort').forEach((f) => { f.value = ''; f.dispatchEvent(new Event('input')); }));
    for (const [z, [wort, farben]] of fall.zeilen.entries()) {
      const zeile = p.locator('.wd-zeile').nth(z);
      await zeile.locator('.wd-wort').fill(wort);
      for (let i = 0; i < 5; i++) {
        const soll = farben[i];
        const marke = zeile.locator('.wd-marke').nth(i);
        // x ist der Startzustand, y ein Klick weiter, g zwei
        for (let k = 0; k < { x: 0, y: 1, g: 2 }[soll]; k++) await marke.click();
      }
    }
    await p.waitForFunction(() => document.querySelectorAll('.wd-liste').length === 2, null, { timeout: 15000 });
    const gelesen = await p.evaluate(() => {
      const listen = [...document.querySelectorAll('.wd-liste')];
      return {
        loesungen: Number(listen[0].querySelector('.wd-zahl').textContent),
        rateworte: Number(listen[1].querySelector('.wd-zahl').textContent),
        erstes: listen[0].querySelector('li')?.textContent ?? null,
      };
    });
    const stimmt = gelesen.loesungen === fall.loesungen && gelesen.rateworte === fall.rateworte && gelesen.erstes === fall.erstes;
    if (!stimmt) fehler.push(`${fall.zeilen.map((z) => z.join(' ')).join(' + ')}: ${JSON.stringify(gelesen)} statt ${JSON.stringify({ loesungen: fall.loesungen, rateworte: fall.rateworte, erstes: fall.erstes })}`);
    erg.faelle.push({ eingabe: fall.zeilen.map((z) => z.join(' ')).join(' + '), ...gelesen, stimmt });
  }

  // Die Listen duerfen erst geladen werden, wenn jemand die Demo benutzt.
  const anfragen = [];
  const p2 = await ctx.newPage();
  p2.on('request', (r) => { if (r.url().includes('/daten/')) anfragen.push(r.url()); });
  await p2.goto(BASIS + PFAD, { waitUntil: 'networkidle' });
  erg.listenErstBeiBedarf = anfragen.length === 0;
  if (!erg.listenErstBeiBedarf) fehler.push('Wortlisten werden ungefragt geladen: ' + anfragen.join(', '));
  await ctx.close();
}

/* --- Ohne Skript: Hinweis statt totem Formular ---------------------------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto(BASIS + PFAD, { waitUntil: 'load' });
  erg.ohneSkript = await p.evaluate(() => ({
    kastenVersteckt: document.querySelector('[data-wordle]').hidden,
    hinweisSichtbar: !!document.querySelector('[data-wordle-ohne]'),
  }));
  if (!erg.ohneSkript.kastenVersteckt || !erg.ohneSkript.hinweisSichtbar) fehler.push('Ohne Skript: ' + JSON.stringify(erg.ohneSkript));
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify({ ...erg, fehler }, null, 1));
