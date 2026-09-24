// Prueft jede ausgelieferte Seite mit axe auf Barrieren (WCAG 2.1 A und AA).
//
// axe wird dabei nicht als <script> eingehaengt -- das verbietet die
// Content-Security-Policy dieser Seite (script-src 'self'). @axe-core/playwright
// schiebt den Prueftext ueber die Browser-Schnittstelle hinein, daran kommt die
// Richtlinie nicht heran. Genau so wird die Seite auch im Betrieb geprueft:
// mit ihren echten Kopfzeilen.
//
// Die Wordle-Demo wird zusaetzlich im benutzten Zustand geprueft, sonst saehe
// die Pruefung nur ein leeres Formular.
//
// Aufruf: node tools/barriere-test.mjs [basis-url]
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const BASIS = process.argv[2] ?? 'http://127.0.0.1:4400';
const REGELN = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const SEITEN = [
  '/', '/en/',
  '/projekte/spesenkonfigurator/', '/projekte/reflowtask/', '/projekte/wordle/', '/en/projects/wordle/',
  '/datenschutz/', '/impressum/', '/revisionsstand/', '/404.html',
];

const browser = await chromium.launch();
// Mit "Bewegung reduzieren": sonst misst axe mitten in der Einblendung des
// Kopfes und meldet Kontraste von Elementen, die gerade bei 20 % Deckkraft
// stehen -- ein Befund, den kein Besucher je sieht.
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
const befund = {};
const fehler = [];

async function pruefe(name, seite) {
  const { violations } = await new AxeBuilder({ page: seite }).withTags(REGELN).analyze();
  befund[name] = violations.length
    ? violations.map((v) => `${v.id} (${v.impact}, ${v.nodes.length}x): ${v.nodes[0].target.join(' ')}`)
    : 'ok';
  if (violations.length) fehler.push(`${name}: ${befund[name].join(' | ')}`);
}

for (const pfad of SEITEN) {
  const p = await ctx.newPage();
  await p.goto(BASIS + pfad, { waitUntil: 'networkidle' });
  await pruefe(pfad, p);
  await p.close();
}

// Die Demo im Betrieb: ein Wort eingetragen, Farben gesetzt, Treffer sichtbar.
{
  const p = await ctx.newPage();
  await p.goto(BASIS + '/projekte/wordle/', { waitUntil: 'networkidle' });
  await p.locator('.wd-zeile').nth(0).locator('.wd-wort').fill('slate');
  const marken = p.locator('.wd-zeile').nth(0).locator('.wd-marke');
  await marken.nth(2).click();
  await marken.nth(4).click();
  await marken.nth(4).click();
  await p.waitForFunction(() => document.querySelectorAll('.wd-liste').length === 2, null, { timeout: 15000 });
  await pruefe('/projekte/wordle/ (Demo benutzt)', p);
  await p.close();
}

await browser.close();
console.log(JSON.stringify({ regeln: REGELN, befund, fehler }, null, 1));
