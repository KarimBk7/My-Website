/* Verhalten der Protokollseite.
   Bewusst eine eigene Datei statt eines eingebetteten Blocks: Astro bettet
   kleine Skripte in die Seite ein, und die Content-Security-Policy
   (script-src 'self') verbietet genau das. Extern bleibt die Richtlinie streng. */

/* --- Prüfstand: Wurfschalter ------------------------------------------- */
const schalter = document.getElementById('schalter');
if (schalter) {
  const tabelle = document.querySelector('.messtabelle');
  const commitFeld = document.getElementById('commit');
  const commits = { vorher: 'de361dd', nachher: '7c59f7b' };
  const englisch = document.documentElement.lang === 'en';
  const gebiet = englisch ? 'en-GB' : 'de-DE';
  const wortGemessen = englisch ? 'measured' : 'gemessen';
  const wortSchematisch = englisch ? 'schematic, not measured' : 'schematisch, nicht gemessen';
  const laenge = (n) => Math.max(2, (Math.log10(n + 1) / Math.log10(10001)) * 100);

  const setze = (stand) => {
    schalter.dataset.stand = stand;
    schalter.querySelectorAll('button').forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.stand === stand)),
    );
    if (commitFeld) commitFeld.textContent = commits[stand];

    tabelle?.querySelectorAll('tbody tr').forEach((tr) => {
      const roh = tr.dataset[stand];
      const text = tr.dataset.vorherText;
      const einheit = tr.dataset.einheit ?? '';
      const wert = tr.querySelector('[data-rolle="wert"]');
      const balken = tr.querySelector('[data-rolle="balken"]');
      const stufe = tr.querySelector('[data-rolle="stufe"]');
      const schematisch = stand === 'vorher' && !roh && !!text;

      if (schematisch) {
        wert.innerHTML = '<span style="font-size:.62em"></span>';
        wert.firstChild.textContent = text;
        balken.style.setProperty('--f', '1');
        balken.dataset.schematisch = 'true';
      } else {
        const n = Number(roh);
        wert.textContent = n.toLocaleString(gebiet);
        if (einheit) {
          const e = document.createElement('span');
          e.className = 'mess-einheit';
          e.textContent = einheit;
          wert.appendChild(e);
        }
        balken.style.setProperty('--f', String(laenge(n) / 100));
        balken.dataset.schematisch = 'false';
      }
      stufe.dataset.schematisch = String(schematisch);
      stufe.classList.toggle('stufe--offen', schematisch);
      stufe.lastChild.textContent = schematisch ? wortSchematisch : wortGemessen;
    });
  };

  schalter.querySelectorAll('button').forEach((b) =>
    b.addEventListener('click', () => setze(b.dataset.stand)),
  );
}

/* --- Einzug: ein Auftritt, einmal -------------------------------------- */
const beobachter = new IntersectionObserver(
  (eintraege) =>
    eintraege.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('da');
        beobachter.unobserve(e.target);
      }
    }),
  { rootMargin: '0px 0px -12% 0px' },
);
document.querySelectorAll('.einzug').forEach((el) => beobachter.observe(el));

/* --- Wissensgraph ------------------------------------------------------- */
const leinwand = document.getElementById('graph');
const rohdaten = document.getElementById('graph-daten');
if (leinwand && rohdaten) {
  const daten = JSON.parse(rohdaten.textContent);
  const status = document.getElementById('graph-status');
  const ctx = leinwand.getContext('2d');
  const farbe = (p) => (p === 'kaiju' ? '#a3231c' : '#1d5c44');
  let punkte = [];
  let aktiv = -1;

  const zeichne = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const breite = leinwand.clientWidth;
    const hoehe = Math.round(breite * 0.52);
    leinwand.width = breite * dpr;
    leinwand.height = hoehe * dpr;
    leinwand.style.height = hoehe + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, breite, hoehe);

    const pad = 26;
    const px = (v) => pad + v * (breite - pad * 2);
    const py = (v) => pad + v * (hoehe - pad * 2);
    punkte = daten.nodes.map((n) => ({ x: px(n.x), y: py(n.y), r: 2.4 + Math.sqrt(n.d) * 1.15, n }));

    ctx.lineWidth = 1;
    for (const [a, b] of daten.edges) {
      const beteiligt = aktiv === a || aktiv === b;
      ctx.strokeStyle = beteiligt ? 'rgba(29,92,68,.75)' : 'rgba(17,19,24,.11)';
      ctx.beginPath();
      ctx.moveTo(punkte[a].x, punkte[a].y);
      ctx.lineTo(punkte[b].x, punkte[b].y);
      ctx.stroke();
    }
    punkte.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, i === aktiv ? p.r + 2 : p.r, 0, Math.PI * 2);
      ctx.fillStyle = farbe(p.n.p);
      ctx.globalAlpha = aktiv === -1 || i === aktiv ? 1 : 0.5;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  };

  const treffer = (mx, my) => {
    let best = -1;
    let dist = 225;
    punkte.forEach((p, i) => {
      const d = (p.x - mx) ** 2 + (p.y - my) ** 2;
      if (d < dist) { dist = d; best = i; }
    });
    return best;
  };

  const zeige = (i) => {
    if (i === aktiv) return;
    aktiv = i;
    status.textContent = i === -1 ? '' : `${daten.nodes[i].l} — ${daten.nodes[i].g} · ${daten.nodes[i].d}`;
    zeichne();
  };

  leinwand.addEventListener('pointermove', (e) => {
    const r = leinwand.getBoundingClientRect();
    zeige(treffer(e.clientX - r.left, e.clientY - r.top));
  });
  leinwand.addEventListener('pointerleave', () => zeige(-1));
  zeichne();

  let zeitgeber;
  window.addEventListener('resize', () => {
    clearTimeout(zeitgeber);
    zeitgeber = window.setTimeout(zeichne, 120);
  });
}
