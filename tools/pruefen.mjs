// Faehrt die Pruefskripte hintereinander und macht aus ihren Ausgaben ein
// Urteil: Ende mit 0, wenn alles sauber ist, sonst mit 1.
//
// Die einzelnen Skripte drucken JSON und sind dafuer gebaut, gelesen zu
// werden. In der Werkbank (GitHub Actions) liest niemand -- deshalb sucht
// dieses Skript in jeder Ausgabe nach den Stellen, die einen Fehler bedeuten:
// gefuellte "fehler"-Listen, Konsolenfehler, Querueberlauf, ein Zaehlwerk das
// nicht stimmt, gefundene private Daten, ein Befund der nicht "ok" ist.
//
// video-test.mjs laeuft hier NICHT mit: es braucht Edge wegen H.264, den es
// auf den Linux-Laeufern nicht gibt. Das bleibt eine Pruefung von Hand.
//
// Aufruf: node tools/pruefen.mjs [basis-url]
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const lauf = promisify(execFile);
const BASIS = process.argv[2] ?? 'http://127.0.0.1:4400';
const SKRIPTE = ['schuss.mjs', 'register-test.mjs', 'lupe-test.mjs', 'links-test.mjs', 'kontakt-test.mjs', 'wordle-test.mjs', 'barriere-test.mjs'];

/** Sammelt alles, was in einer Ausgabe nach Fehler aussieht. */
function befunde(wert, pfad = '') {
  if (Array.isArray(wert)) {
    const name = pfad.split('.').pop();
    if (['fehler', 'konsolenfehler', 'auffaellig', 'privateDaten', 'schuldige', 'aussenOhneTab',
         'aussenOhneNoopener', 'interneMitTab', 'dateiOhneDownload', 'fehlend'].includes(name) && wert.length) {
      return [`${pfad}: ${JSON.stringify(wert)}`];
    }
    return wert.flatMap((v, i) => befunde(v, `${pfad}[${i}]`));
  }
  if (wert && typeof wert === 'object') {
    return Object.entries(wert).flatMap(([k, v]) => befunde(v, pfad ? `${pfad}.${k}` : k));
  }
  const name = pfad.split('.').pop();
  if (name === 'ueberlauf' && wert === true) return [`${pfad}: Querueberlauf`];
  if (name === 'querUeberlauf' && wert === true) return [`${pfad}: Querueberlauf`];
  if (name === 'stimmt' && wert === false) return [`${pfad}: stimmt nicht`];
  if (name === 'listenErstBeiBedarf' && wert === false) return [`${pfad}: Wortlisten werden ungefragt geladen`];
  // schuss.mjs meldet je Seite entweder "ok" oder ein Objekt mit dem Befund
  if (pfad.startsWith('befund.') && typeof wert === 'string' && wert !== 'ok') return [`${pfad}: ${wert}`];
  return [];
}

let schlecht = 0;
for (const skript of SKRIPTE) {
  process.stdout.write(`== ${skript} `);
  try {
    const { stdout } = await lauf(process.execPath, [`tools/${skript}`, BASIS], { maxBuffer: 20 * 1024 * 1024 });
    const treffer = befunde(JSON.parse(stdout));
    if (treffer.length) {
      schlecht++;
      console.log('FEHLER');
      treffer.forEach((t) => console.log('   ' + t));
    } else {
      console.log('ok');
    }
  } catch (f) {
    schlecht++;
    console.log('ABBRUCH');
    console.log('   ' + String(f.stderr || f.message).trim().split('\n').slice(0, 6).join('\n   '));
  }
}

console.log(schlecht ? `\n${schlecht} von ${SKRIPTE.length} Pruefungen mit Befund.` : `\nAlle ${SKRIPTE.length} Pruefungen sauber.`);
process.exit(schlecht ? 1 : 0);
