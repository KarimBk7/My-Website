// Prüft die Bedienung des Inhaltsverzeichnisses und das Zählwerk.
// Aufruf: node tools/register-test.mjs [basis-url]
import { chromium } from 'playwright';

const BASIS = process.argv[2] ?? 'http://127.0.0.1:4400';
const browser = await chromium.launch();
const ergebnis = {};
const fehler = [];

/* --- Desktop: standardmäßig offen, zuklappbar, merkt sich die Wahl -------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => fehler.push('desktop: ' + e.message));
  await p.goto(BASIS + '/', { waitUntil: 'networkidle' });

  ergebnis.desktopStandard = await p.evaluate(() => document.documentElement.dataset.register);
  ergebnis.registerSichtbar = await p.locator('#register').isVisible();

  await p.locator('.register .klappe').click();
  await p.waitForTimeout(450);
  ergebnis.nachKlickZu = await p.evaluate(() => document.documentElement.dataset.register);
  ergebnis.griffSichtbar = await p.locator('.register-griff').isVisible();

  // Neu laden: die Wahl muss erhalten bleiben.
  await p.reload({ waitUntil: 'networkidle' });
  ergebnis.nachNeuladen = await p.evaluate(() => document.documentElement.dataset.register);

  // Wieder aufklappen und einen Sprung testen.
  await p.locator('.register-griff').click();
  await p.waitForTimeout(450);
  const ziel = 'h-kaiju';
  await p.locator(`#register a[href="#${ziel}"]`).click();
  // Weiches Scrollen abwarten, statt eine feste Wartezeit zu raten -- sonst
  // misst der Test die Seite mitten in der Bewegung und meldet einen Fehler,
  // den es nicht gibt.
  await p.waitForFunction(() => {
    const jetzt = Math.round(window.scrollY);
    if (window.__letzterStand === jetzt) return true;
    window.__letzterStand = jetzt;
    return false;
  }, null, { timeout: 8000, polling: 150 });
  ergebnis.sprungTrefferOben = await p.evaluate((id) => {
    const el = document.getElementById(id);
    return el ? Math.round(el.getBoundingClientRect().top) : null;
  }, ziel);
  ergebnis.aktiverEintrag = await p.evaluate(
    () => document.querySelector('#register a[aria-current="true"]')?.getAttribute('href') ?? null,
  );
  // Steht ein Projekt im Licht, muss der Elternknoten "Projekte" mitmarkiert
  // sein -- sonst weiss man beim Scrollen nicht mehr, wo man ist.
  ergebnis.elternMitmarkiert = await p.evaluate(
    () => !!document.querySelector('#register .hat-kinder[data-kind-aktiv]'),
  );
  await p.locator('#register').screenshot({ path: '.impeccable/review/pruef-register-aktiv.png' });

  // Zählwerk: der sichtbare Endstand muss exakt der Zahl aus den Daten
  // entsprechen. Erst zur Zahl scrollen, dann das Auslaufen abwarten.
  await p.evaluate(() => document.querySelector('[data-zahl]')?.scrollIntoView({ block: 'center' }));
  await p.waitForFunction(
    () => {
      const el = document.querySelector('[data-zahl]');
      return el && Number(el.textContent.replace(/[^\d]/g, '')) === Number(el.dataset.zahl);
    },
    null,
    { timeout: 5000 },
  ).catch(() => {});
  ergebnis.zaehlwerk = await p.evaluate(() => {
    const el = document.querySelector('[data-zahl]');
    if (!el) return null;
    const soll = Number(el.dataset.zahl);
    const ist = Number(el.textContent.replace(/[^\d]/g, ''));
    return { soll, ist, stimmt: soll === ist };
  });
  await ctx.close();
}

/* --- Telefon: standardmäßig zu, öffnet als Überlagerung ------------------- */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => fehler.push('mobil: ' + e.message));
  await p.goto(BASIS + '/', { waitUntil: 'networkidle' });

  ergebnis.mobilStandard = await p.evaluate(() => document.documentElement.dataset.register);
  await p.locator('.register-griff').click();
  await p.waitForTimeout(450);
  ergebnis.mobilNachKlick = await p.evaluate(() => document.documentElement.dataset.register);
  ergebnis.mobilRegisterSichtbar = await p.locator('#register').isVisible();

  // Nach einem Sprung muss die Überlagerung wieder zugehen.
  await p.locator('#register a[href="#h-befunde"]').click();
  await p.waitForTimeout(600);
  ergebnis.mobilNachSprung = await p.evaluate(() => document.documentElement.dataset.register);
  await ctx.close();
}

/* --- Ohne JavaScript: alles muss sichtbar und benutzbar bleiben ----------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto(BASIS + '/', { waitUntil: 'load' });
  ergebnis.ohneJs = await p.evaluate(() => ({
    registerSichtbar: !!document.querySelector('#register'),
    versteckteAufbauElemente: [...document.querySelectorAll('.aufbau')]
      .filter((el) => getComputedStyle(el).opacity === '0').length,
    kennzahlSichtbar: document.querySelector('[data-zahl]')?.textContent.trim() || null,
  }));
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify({ ...ergebnis, fehler }, null, 2));
