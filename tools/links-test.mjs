// Prueft das tatsaechliche VERHALTEN der Links, nicht nur ihre Attribute:
// Aussenlinks muessen einen neuen Tab oeffnen, Dateien muessen herunterladen
// statt zu navigieren, und interne Sprungmarken duerfen beides nicht tun.
//
// Ein target="_blank" im Quelltext beweist nichts -- ein zweiter Klick auf
// denselben Link, ein abgefangenes Ereignis oder eine falsche Verschachtelung
// koennen es wirkungslos machen. Deshalb wird hier geklickt.
//
// Aufruf: node tools/links-test.mjs [basis-url]
import { chromium } from 'playwright';

const BASIS = process.argv[2] ?? 'http://127.0.0.1:4400';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true });
const p = await ctx.newPage();
const fehler = [];
p.on('pageerror', (e) => fehler.push(e.message));
await p.goto(BASIS + '/', { waitUntil: 'networkidle' });
const erg = {};

// Lebenslauf im Kopf: laedt herunter, die Seite bleibt stehen.
const [dl] = await Promise.all([
  p.waitForEvent('download', { timeout: 8000 }),
  p.locator('.kopf a[download]').first().click(),
]);
erg.lebenslauf = { datei: dl.suggestedFilename(), seiteBlieb: p.url().replace(BASIS, '') === '/' };

// Beide Profilmarken oeffnen je einen neuen Tab.
erg.profile = [];
for (const i of [0, 1]) {
  const [neu] = await Promise.all([
    ctx.waitForEvent('page', { timeout: 8000 }),
    p.locator('.marken-paar a').nth(i).click(),
  ]);
  await neu.waitForLoadState('domcontentloaded').catch(() => {});
  erg.profile.push(neu.url());
  await neu.close();
}

// Zeugnisse laden herunter.
erg.zeugnisse = [];
for (const i of [0, 1]) {
  const [d] = await Promise.all([
    p.waitForEvent('download', { timeout: 8000 }),
    p.locator('.befund a[download]').nth(i).click(),
  ]);
  erg.zeugnisse.push(d.suggestedFilename());
}

// Gegenprobe im ausgelieferten HTML: kein Aussenlink ohne neuen Tab, kein
// Dateilink ohne download, und keine interne Marke mit einem der beiden.
Object.assign(erg, await p.evaluate(() => {
  const a = [...document.querySelectorAll('a[href]')];
  const ist = (x) => x.getAttribute('href') ?? '';
  return {
    aussenOhneTab: a.filter((x) => /^https?:/.test(ist(x)) && x.target !== '_blank').map(ist),
    dateiOhneDownload: a.filter((x) => ist(x).startsWith('/dokumente/') && !x.hasAttribute('download')).map(ist),
    interneMitTab: a.filter((x) => /^(#|\/$|\/en\/$|mailto:)/.test(ist(x)) && x.target === '_blank').map(ist),
    aussenOhneNoopener: a.filter((x) => x.target === '_blank' && !x.rel.includes('noopener')).map(ist),
  };
}));

console.log(JSON.stringify({ ...erg, fehler }, null, 1));
await b.close();
