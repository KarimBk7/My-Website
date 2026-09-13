// Prueft das erste bewegte Bild der Seite im Betrieb (alle teilen denselben
// Code): spielt es, wenn es im Bild ist, haelt
// es ausserhalb an, laesst es sich per Knopf anhalten -- und bleibt es bei
// "Bewegung reduzieren" und ohne Skript stehen, mit Bedienleiste?
//
// Laeuft in Edge (channel: 'msedge'), nicht im Chromium von Playwright: dem
// fehlt der H.264-Decoder, dort wuerde jedes MP4 scheitern und der Test
// einen Fehler melden, den es auf echten Browsern nicht gibt.
//
// Aufruf: node tools/video-test.mjs [basis-url]
import { chromium } from 'playwright';

const BASIS = process.argv[2] ?? 'http://127.0.0.1:4400';
const b = await chromium.launch({ channel: 'msedge' });
const erg = {};

async function seite(opt = {}) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, ...opt });
  const p = await ctx.newPage();
  const fehler = [];
  p.on('pageerror', (e) => fehler.push(e.message));
  await p.goto(BASIS + '/projekte/spesenkonfigurator/', { waitUntil: 'networkidle' });
  await p.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
  return { ctx, p, fehler };
}
const zustand = (p) => p.evaluate(() => {
  const v = document.querySelector('video[data-video]');
  const k = v.parentElement.querySelector('[data-video-knopf]');
  return { laeuft: !v.paused, zeit: +v.currentTime.toFixed(2), bedienleiste: v.hasAttribute('controls'),
           knopfSichtbar: !k.hidden, gedrueckt: k.getAttribute('aria-pressed') };
});
const hin = (p) => p.evaluate(() => document.querySelector('video[data-video]').scrollIntoView({ block: 'center' }));
const weg = (p) => p.evaluate(() => window.scrollTo(0, 0));

// 1. Normalfall
{
  const { ctx, p, fehler } = await seite();
  // Platz muss vor dem Laden reserviert sein, sonst rutscht die Seite nach.
  erg.platz = await p.evaluate(() => {
    const v = document.querySelector('video[data-video]'); const r = v.getBoundingClientRect();
    return { breite: Math.round(r.width), hoehe: Math.round(r.height), soll: Math.round(r.width * v.height / v.width) };
  });
  erg.obenVorDemScrollen = await zustand(p);        // ausserhalb: darf nicht laufen
  await hin(p); await p.waitForTimeout(1500);
  erg.imBild = await zustand(p);                     // muss laufen
  await p.locator('[data-video-knopf]').first().click(); await p.waitForTimeout(300);
  erg.nachPause = await zustand(p);
  await weg(p); await p.waitForTimeout(300); await hin(p); await p.waitForTimeout(800);
  erg.pauseUeberlebtScrollen = await zustand(p);     // bewusste Pause bleibt
  await p.locator('[data-video-knopf]').first().click(); await p.waitForTimeout(800);
  erg.wiederAn = await zustand(p);
  await weg(p); await p.waitForTimeout(500);
  erg.weggescrollt = await zustand(p);               // muss anhalten
  // Vollbild per Knopf und per Klick aufs Video, beide Male mit Esc zurueck
  const voll = () => p.evaluate(() => {
    const v = document.querySelector('video[data-video]'), g = v.parentElement.querySelector('[data-video-gross]');
    return { rahmenVoll: document.fullscreenElement === v.parentElement, videoBreite: Math.round(v.getBoundingClientRect().width),
             knopfSichtbar: !g.hidden, gedrueckt: g.getAttribute('aria-pressed'), laeuft: !v.paused };
  });
  await hin(p); await p.waitForTimeout(500);
  await p.locator('[data-video-gross]').first().click(); await p.waitForTimeout(800);
  erg.vollbildKnopf = await voll(p);
  await p.locator('[data-video-gross]').first().click(); await p.waitForTimeout(800);
  erg.vollbildZu = await voll(p);
  await p.locator('video[data-video]').first().click(); await p.waitForTimeout(800);
  erg.vollbildKlick = await voll(p);
  // Esc und Zurueck-Geste gehoeren dem Browser; ein per Playwright gedruecktes
  // Esc erreicht sie nicht. Verlassen daher ueber die Schnittstelle.
  await p.evaluate(() => document.exitFullscreen()); await p.waitForTimeout(800);
  erg.nachVerlassen = await voll(p);
  erg.fehler = fehler;
  await ctx.close();
}
// 2. Bewegung reduzieren
{
  const { ctx, p } = await seite({ reducedMotion: 'reduce' });
  await hin(p); await p.waitForTimeout(1200);
  erg.bewegungReduziert = await zustand(p);          // steht, mit Bedienleiste
  await ctx.close();
}
// 3. Datei nicht abspielbar (Netzfehler, fehlender Decoder).
//    Erwartet: Standbild bleibt, kein Knopf.
//
//    Safari gehoert NICHT dazu, und das ist hier festgehalten, damit niemand
//    einen Worker nachruestet: Cloudflare beantwortet Teilanfragen (Range) auf
//    statische Dateien mit 200 und der ganzen Datei statt mit 206 -- auch bei
//    Safari-typischen Anfragen (bytes=0-1, identity, iPhone-Kennung). Aeltere
//    Berichte (cloudflare/kv-asset-handler#63) sagen, iOS spiele Videos dann
//    nicht ab. Am 11.09.2026 auf einem iPhone in Safari geprueft: das Video
//    laeuft. Ein Range-Worker haette die Deploy-Konfiguration geaendert, fuer
//    ein Problem, das nicht auftritt.
{
  const { ctx, p, fehler } = await seite();
  await p.route('**/*.mp4', (r) => r.abort());
  await hin(p); await p.waitForTimeout(1500);
  erg.dateiFehlt = { ...(await zustand(p)), poster: await p.evaluate(() => !!document.querySelector('video[data-video]').poster), fehler };
  await ctx.close();
}
// 4. Autoplay gesperrt (etwa iOS-Stromsparmodus). Erwartet: Bedienleiste
//    zurueck, damit man selbst starten kann.
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  await ctx.addInitScript(() => {
    HTMLMediaElement.prototype.play = function () { return Promise.reject(new DOMException('gesperrt', 'NotAllowedError')); };
  });
  const p = await ctx.newPage();
  await p.goto(BASIS + '/projekte/spesenkonfigurator/', { waitUntil: 'networkidle' });
  await p.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });
  await hin(p); await p.waitForTimeout(800);
  erg.autoplayGesperrt = await zustand(p);
  await ctx.close();
}
// 5. Ohne Skript
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto(BASIS + '/projekte/spesenkonfigurator/', { waitUntil: 'load' });
  erg.ohneSkript = await p.evaluate(() => {
    const v = document.querySelector('video[data-video]');
    return { bedienleiste: v.hasAttribute('controls'), autoplay: v.autoplay, poster: !!v.poster,
             knopfVersteckt: v.parentElement.querySelector('[data-video-knopf]').hidden };
  });
  await ctx.close();
}
await b.close();
console.log(JSON.stringify(erg, null, 1));
