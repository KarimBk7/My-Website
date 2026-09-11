// Erzeugt die ausgelieferten Bilder selbst, statt sie Astros Bildpipeline
// zu ueberlassen.
//
// Grund: Cloudflare hat das Projekt als Worker angelegt und dabei einen
// Adapter eingesetzt, dessen Bilddienst die Bilder erst beim Abruf ueber
// /_image erzeugt -- einen Endpunkt, den die statische Auslieferung nicht
// bedient. Lokal war alles gruen, live antworteten alle sieben Bilder mit
// 404. Vorberechnete Dateien plus einfaches <img> haengen von keiner
// Hosting-Eigenheit mehr ab und lassen sich vor dem Deploy nachweisen.
//
// Aufruf: node tools/bilder.mjs
import sharp from 'sharp';
import { readdir, mkdir, writeFile, unlink } from 'node:fs/promises';
import { join, parse } from 'node:path';

const QUELLE = 'src/assets/media';
const ZIEL = 'public/media';
const BREITEN = [800, 1600];

await mkdir(ZIEL, { recursive: true });
// Bildschirmaufnahmen liegen als PNG vor, Fotos als JPEG. Beides wird ohnehin
// zu WebP umgerechnet -- die Quellendung darf nur nicht luegen.
const dateien = (await readdir(QUELLE)).filter((f) => /\.(png|jpe?g)$/i.test(f));
const manifest = {};

for (const datei of dateien) {
  const name = parse(datei).name;
  const bild = sharp(join(QUELLE, datei));
  const { width, height } = await bild.metadata();
  const varianten = [];

  for (const b of BREITEN) {
    // Nie hochskalieren: eine 510 px breite Karte wird nicht schaerfer,
    // wenn man sie auf 1600 aufblaest, nur schwerer.
    const zielBreite = Math.min(b, width);
    const ausgabe = `${name}-${zielBreite}.webp`;
    const info = await sharp(join(QUELLE, datei))
      .resize({ width: zielBreite, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(join(ZIEL, ausgabe));
    varianten.push({ datei: `/media/${ausgabe}`, breite: info.width, kb: Math.round(info.size / 1024) });
    if (zielBreite === width) break; // groesser gibt es nicht
  }

  manifest[name] = {
    breite: width,
    hoehe: height,
    seitenverhaeltnis: Number((width / height).toFixed(4)),
    varianten: varianten.filter((v, i, a) => a.findIndex((x) => x.breite === v.breite) === i),
  };
}

await writeFile('src/data/bilder.json', JSON.stringify(manifest, null, 2) + '\n', 'utf8');

// Verwaiste Varianten entfernen. Ohne diesen Schritt blieb nach jedem
// Bildertausch die alte Fassung liegen und wurde weiter oeffentlich
// ausgeliefert -- sechs alte Projektron-Aufnahmen standen so monatelang
// unverlinkt auf dem Server. Geloescht wird nur .webp: das ist die einzige
// Endung, die dieses Skript erzeugt. vorschau.png und die Videos in
// public/media stammen aus anderen Werkzeugen und bleiben unberuehrt.
const erzeugt = new Set(Object.values(manifest).flatMap((m) => m.varianten.map((v) => v.datei.split('/').pop())));
const verwaist = (await readdir(ZIEL)).filter((f) => f.endsWith('.webp') && !erzeugt.has(f));
for (const f of verwaist) await unlink(join(ZIEL, f));
if (verwaist.length) console.log(`entfernt (keine Quelle mehr): ${verwaist.join(', ')}`);

// Symbol fuer den iPhone-Home-Bildschirm und Safari-Lesezeichen. iOS nutzt
// kein SVG-Favicon und zeigt ohne dieses Bild ein Bildschirmfoto der Seite.
// Aus favicon.svg gerendert, damit beide nie auseinanderlaufen. Die Dichte
// rastert das 32er-SVG direkt in Zielgroesse -- mit der Standarddichte
// entstuenden 32 px, die dann unscharf auf 180 hochgerechnet wuerden.
await sharp('public/favicon.svg', { density: Math.ceil((180 / 32) * 72) })
  .resize(180, 180).flatten({ background: '#1d5c44' }).png().toFile('public/apple-touch-icon.png');

let summe = 0;
for (const [name, m] of Object.entries(manifest)) {
  const teile = m.varianten.map((v) => `${v.breite}px ${v.kb}KB`).join(', ');
  summe += m.varianten.reduce((s, v) => s + v.kb, 0);
  console.log(`${name.padEnd(30)} ${String(m.breite).padStart(5)}x${m.hoehe}  ->  ${teile}`);
}
console.log(`\n${Object.keys(manifest).length} Bilder, ${summe} KB gesamt, Manifest in src/data/bilder.json`);
