// Statischer Server, der public/_headers wirklich anwendet.
// Damit lässt sich die Content-Security-Policy vor dem Deploy prüfen,
// statt sie erst in der Produktion zu entdecken.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';

const WURZEL = 'dist';
const PORT = Number(process.argv[2] ?? 4399);

// _headers parsen: Blöcke aus Pfadmuster + eingerückten Kopfzeilen.
const regeln = [];
for (const zeile of readFileSync('public/_headers', 'utf8').split(/\r?\n/)) {
  if (!zeile.trim() || zeile.trimStart().startsWith('#')) continue;
  if (!/^\s/.test(zeile)) { regeln.push({ muster: zeile.trim(), kopf: [] }); continue; }
  const i = zeile.indexOf(':');
  regeln.at(-1)?.kopf.push([zeile.slice(0, i).trim(), zeile.slice(i + 1).trim()]);
}
const passt = (muster, pfad) =>
  muster.endsWith('/*') ? pfad.startsWith(muster.slice(0, -1)) : muster === '/*' || muster === pfad;

const TYPEN = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.mp4': 'video/mp4',
};

createServer(async (req, res) => {
  let pfad = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (pfad.endsWith('/')) pfad += 'index.html';
  const datei = join(WURZEL, normalize(pfad).replace(/^(\.\.[/\\])+/, ''));
  try {
    if (!(await stat(datei)).isFile()) throw new Error('kein File');
    const inhalt = await readFile(datei);
    res.setHeader('Content-Type', TYPEN[extname(datei)] ?? 'application/octet-stream');
    for (const r of regeln) if (passt(r.muster, pfad)) for (const [k, v] of r.kopf) res.setHeader(k, v);
    res.end(inhalt);
  } catch {
    res.statusCode = 404;
    res.end('404');
  }
}).listen(PORT, '127.0.0.1', () => console.log(`http://127.0.0.1:${PORT}`));
