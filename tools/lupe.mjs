// Ausschnitte einzelner Elemente. Aufruf: node tools/lupe.mjs <url> <selektor> <datei> [index]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
mkdirSync('.impeccable/review', { recursive: true });

const [, , url, selektor, datei, index = '0'] = process.argv;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle' });

const el = page.locator(selektor).nth(Number(index));
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await el.screenshot({ path: `.impeccable/review/${datei}.png` });
await browser.close();
console.log('ok', datei);
