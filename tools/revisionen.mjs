// Schreibt die Aenderungshistorie aus Git nach src/data/revisionen.json.
//
// Warum eine Datei und nicht direkt aus Git beim Bauen: der Build bei
// Cloudflare bekommt die Historie nicht zuverlaessig mit (flache Klone), und
// eine Seite, die je nach Build-Umgebung anders aussieht, ist keine gute
// Seite. Die Datei wird mitcommittet und vor einem Release neu erzeugt.
//
// Aufruf: node tools/revisionen.mjs [anzahl]
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const ANZAHL = Number(process.argv[2] ?? 60);
const TRENNER = '';

const roh = execFileSync('git', [
  'log', `-n${ANZAHL}`, '--no-merges', '--date=short',
  `--pretty=format:%h${TRENNER}%ad${TRENNER}%s`,
], { encoding: 'utf8' });

const eintraege = roh.split('\n').filter(Boolean).map((zeile) => {
  const [kurz, datum, betreff] = zeile.split(TRENNER);
  return { kurz, datum, betreff };
});

const erste = execFileSync('git', ['log', '--reverse', '--date=short', '--pretty=format:%ad'], { encoding: 'utf8' })
  .split('\n')[0];
const gesamt = Number(execFileSync('git', ['rev-list', '--count', '--no-merges', 'HEAD'], { encoding: 'utf8' }).trim());

writeFileSync('src/data/revisionen.json', JSON.stringify({
  stand: new Date().toISOString().slice(0, 10),
  seit: erste,
  gesamt,
  eintraege,
}, null, 2) + '\n', 'utf8');

console.log(`revisionen.json: ${eintraege.length} von ${gesamt} Eintraegen, seit ${erste}`);
