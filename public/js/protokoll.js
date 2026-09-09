/* Verhalten der Protokollseite.
   Bewusst eine eigene Datei statt eines eingebetteten Blocks: Astro bettet
   kleine Skripte in die Seite ein, und die Content-Security-Policy
   (script-src 'self') verbietet genau das. Extern bleibt die Richtlinie streng. */

/* Der Vorher/Nachher-Schalter ist entfallen: die Messwerte stehen als feste
   Tabelle im Projektblatt M-1, wo sie hergehören. Es bleibt genau ein
   interaktives Element auf der Seite, der Wissensgraph. */

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

  const beiZeiger = (e) => {
    const r = leinwand.getBoundingClientRect();
    zeige(treffer(e.clientX - r.left, e.clientY - r.top));
  };

  // Zeiger fuer Maus. Tippen fuer das Telefon: ohne pointerdown waere der
  // Graph auf genau dem Geraet eine Tapete, auf dem die meisten ihn oeffnen.
  leinwand.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') beiZeiger(e); });
  leinwand.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') zeige(-1); });
  leinwand.addEventListener('pointerdown', (e) => { beiZeiger(e); e.preventDefault(); });

  // Tastatur: mit Pfeilen durch die Knoten, absteigend nach Verbindungsgrad.
  leinwand.addEventListener('keydown', (e) => {
    const n = daten.nodes.length;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') zeige((aktiv + 1) % n);
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') zeige((aktiv <= 0 ? n : aktiv) - 1);
    else if (e.key === 'Home') zeige(0);
    else if (e.key === 'End') zeige(n - 1);
    else if (e.key === 'Escape') zeige(-1);
    else return;
    e.preventDefault();
  });
  leinwand.addEventListener('blur', () => zeige(-1));

  zeichne();

  let zeitgeber;
  window.addEventListener('resize', () => {
    clearTimeout(zeitgeber);
    zeitgeber = window.setTimeout(zeichne, 120);
  });
}
