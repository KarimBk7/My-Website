/* Der Wordle-Solver, als Fassung fuer den Browser.
 *
 * Eigene Datei und kein eingebetteter Block: die Content-Security-Policy
 * erlaubt nur Skripte von dieser Seite (script-src 'self').
 *
 * Unterschied zur Windows-Fassung (M-5): dort traegt man die Bedingungen
 * selbst ein -- gruene Buchstaben, gelbe, wie oft ein Buchstabe vorkommt.
 * Hier gibt man ein, was das Spiel zeigt: das geratene Wort und die Farben.
 * Die Bedingungen leitet der Rechner daraus ab, auch die Anzahl je Buchstabe.
 *
 * Die Wortlisten (90 KB) werden erst geladen, wenn jemand die Demo benutzt.
 */

const ORT = document.querySelector('[data-wordle]');
if (ORT) starte(ORT);

/* ------------------------------------------------------------ Kern */

/** Leitet aus geratenen Woertern samt Farben die Bedingungen ab.
 *  zeilen: [{ wort: 'slate', farben: 'gybxx' }] -- g gruen, y gelb, x grau. */
export function bedingungen(zeilen) {
  const fest = Array(5).fill(null);
  const verboten = Array.from({ length: 5 }, () => new Set());
  const mindestens = new Map();
  const genau = new Map();

  for (const { wort, farben } of zeilen) {
    if (!wort || wort.length !== 5) continue;
    // Wie oft ist ein Buchstabe in DIESEM Rateversuch gruen oder gelb?
    const gezaehlt = new Map();
    for (let i = 0; i < 5; i++) {
      const b = wort[i];
      if (farben[i] === 'g') { fest[i] = b; gezaehlt.set(b, (gezaehlt.get(b) ?? 0) + 1); }
      else if (farben[i] === 'y') { verboten[i].add(b); gezaehlt.set(b, (gezaehlt.get(b) ?? 0) + 1); }
      else verboten[i].add(b); // grau: an dieser Stelle steht er jedenfalls nicht
    }
    for (const [b, n] of gezaehlt) mindestens.set(b, Math.max(mindestens.get(b) ?? 0, n));
    // Ein grauer Buchstabe heisst: mehr als die gefaerbten gibt es nicht.
    for (let i = 0; i < 5; i++) {
      if (farben[i] !== 'x') continue;
      const b = wort[i];
      const n = gezaehlt.get(b) ?? 0;
      genau.set(b, Math.min(genau.get(b) ?? n, n));
    }
  }
  return { fest, verboten, mindestens, genau };
}

/** Passt ein Wort zu den Bedingungen? */
export function passt(wort, { fest, verboten, mindestens, genau }) {
  for (let i = 0; i < 5; i++) {
    if (fest[i]) { if (wort[i] !== fest[i]) return false; }
    else if (verboten[i].has(wort[i])) return false;
  }
  const zaehle = (b) => { let n = 0; for (const z of wort) if (z === b) n++; return n; };
  for (const [b, n] of mindestens) if (zaehle(b) < n) return false;
  for (const [b, n] of genau) if (zaehle(b) !== n) return false;
  return true;
}

/** Treffer, die Woerter mit den meisten verschiedenen Buchstaben zuerst --
 *  die schliessen beim naechsten Raten am meisten aus. */
export function suche(woerter, bed) {
  return woerter.filter((w) => passt(w, bed)).sort((a, b) => new Set(b).size - new Set(a).size);
}

/* ------------------------------------------------- Oberflaeche */

function starte(ort) {
  const T = JSON.parse(ort.dataset.texte);
  const ZEILEN = 6;
  const FARBEN = ['x', 'y', 'g'];
  const eingabe = ort.querySelector('[data-wordle-eingabe]');
  const ausgabe = ort.querySelector('[data-wordle-ausgabe]');
  const knopf = ort.querySelector('[data-wordle-start]');
  // Der Hinweis steht ausserhalb des Kastens: ohne Skript soll er sichtbar
  // sein, waehrend der Kasten versteckt bleibt.
  const hinweis = document.querySelector('[data-wordle-ohne]');
  const zustand = Array.from({ length: ZEILEN }, () => ({ wort: '', farben: 'xxxxx' }));
  let listen = null;

  // Ohne Skript bleibt der Hinweis stehen und das Feld versteckt; jetzt umgekehrt.
  hinweis?.remove();
  ort.hidden = false;

  for (let z = 0; z < ZEILEN; z++) eingabe.append(zeile(z));
  zeige();

  function zeile(z) {
    const reihe = document.createElement('div');
    reihe.className = 'wd-zeile';
    const feld = document.createElement('input');
    feld.className = 'wd-wort';
    feld.maxLength = 5;
    feld.autocapitalize = 'off';
    feld.autocomplete = 'off';
    feld.spellcheck = false;
    feld.setAttribute('aria-label', `${T.wortZeile} ${z + 1}`);
    // Nur die erste Zeile traegt das Beispiel; in allen sechs waere es Laerm.
    if (z === 0) feld.placeholder = T.platzhalter;
    feld.addEventListener('input', () => {
      feld.value = feld.value.toLowerCase().replace(/[^a-z]/g, '').slice(0, 5);
      zustand[z].wort = feld.value;
      // Leeres Feld heisst: diese Zeile gilt nicht mehr, auch nicht ihre Farben.
      if (!feld.value) zustand[z].farben = 'xxxxx';
      marken.forEach((m, i) => { m.textContent = feld.value[i] ?? ''; setzeMarke(m, z, i); });
      if (feld.value.length === 5) reihe.nextElementSibling?.querySelector('input')?.focus();
      rechne();
    });
    reihe.append(feld);

    const marken = [];
    const kasten = document.createElement('div');
    kasten.className = 'wd-marken';
    for (let i = 0; i < 5; i++) {
      const m = document.createElement('button');
      m.type = 'button';
      m.className = 'wd-marke';
      m.addEventListener('click', () => {
        const jetzt = FARBEN.indexOf(zustand[z].farben[i]);
        const neu = FARBEN[(jetzt + 1) % FARBEN.length];
        zustand[z].farben = zustand[z].farben.slice(0, i) + neu + zustand[z].farben.slice(i + 1);
        setzeMarke(m, z, i);
        rechne();
      });
      marken.push(m);
      kasten.append(m);
      setzeMarke(m, z, i);
    }
    reihe.append(kasten);
    return reihe;
  }

  function setzeMarke(m, z, i) {
    const f = zustand[z].farben[i];
    m.dataset.farbe = f;
    const b = zustand[z].wort[i];
    m.disabled = !b;
    m.setAttribute('aria-label', b ? `${b.toUpperCase()}: ${T.farben[f]} — ${T.wechseln}` : T.leer);
  }

  knopf.addEventListener('click', rechne);

  async function rechne() {
    const zeilen = zustand.filter((z) => z.wort.length === 5);
    if (!zeilen.length) { zeige(); return; }
    if (!listen) {
      knopf.disabled = true;
      knopf.textContent = T.lade;
      try {
        const [a, b] = await Promise.all([
          fetch('/daten/wordle-loesungen.txt').then((r) => r.text()),
          fetch('/daten/wordle-rateworte.txt').then((r) => r.text()),
        ]);
        listen = { loesungen: a.split(/\s+/).filter(Boolean), rateworte: b.split(/\s+/).filter(Boolean) };
      } catch {
        ausgabe.innerHTML = '';
        ausgabe.append(absatz(T.fehler));
        return;
      } finally {
        knopf.disabled = false;
        knopf.textContent = T.start;
      }
    }
    const bed = bedingungen(zeilen);
    zeige(suche(listen.loesungen, bed), suche(listen.rateworte, bed), listen);
  }

  function zeige(loesungen, rateworte, alle) {
    ausgabe.innerHTML = '';
    if (!loesungen) { ausgabe.append(absatz(T.leerText)); return; }
    ausgabe.append(
      liste(T.loesungen, loesungen, alle.loesungen.length, 'wd-loesungen'),
      liste(T.rateworte, rateworte, alle.rateworte.length, ''),
    );
  }

  function liste(titel, woerter, gesamt, klasse) {
    const kasten = document.createElement('div');
    kasten.className = `wd-liste ${klasse}`;
    const kopf = document.createElement('h3');
    kopf.innerHTML = `${titel} <span class="wd-zahl">${woerter.length}</span>`;
    kopf.append(` ${T.von} ${gesamt.toLocaleString(document.documentElement.lang)}`);
    kasten.append(kopf);
    if (!woerter.length) { kasten.append(absatz(T.nichts)); return kasten; }
    const ul = document.createElement('ul');
    for (const w of woerter.slice(0, 60)) {
      const li = document.createElement('li');
      li.textContent = w;
      ul.append(li);
    }
    kasten.append(ul);
    if (woerter.length > 60) kasten.append(absatz(`… ${T.weitere.replace('{n}', woerter.length - 60)}`));
    return kasten;
  }

  function absatz(text) {
    const p = document.createElement('p');
    p.className = 'wd-hinweis';
    p.textContent = text;
    return p;
  }
}
