/* Verhalten der Protokollseite: Inhaltsverzeichnis, Auftritt, Zählwerk.

   Eigene Datei, kein eingebetteter Block: die Content-Security-Policy
   (script-src 'self') verbietet eingebettete Skripte, und Astro bettet kleine
   Skripte von sich aus ein. So ein Skript fällt in Produktion lautlos aus --
   genau das ist diesem Projekt schon einmal passiert.

   Ohne JavaScript bleibt die Seite vollständig benutzbar: Verzeichnis offen,
   alle Inhalte sichtbar, Zahlen stehen fest. Das Skript fügt nur hinzu. */

const html = document.documentElement;
html.dataset.js = '';

const BREIT = matchMedia('(min-width: 64rem)');
const RUHIG = matchMedia('(prefers-reduced-motion: reduce)');

/* --- Inhaltsverzeichnis ------------------------------------------------- */
const register = document.getElementById('register');
if (register) {
  const SCHLUESSEL = 'register';
  const lesen = () => { try { return localStorage.getItem(SCHLUESSEL); } catch { return null; } };
  const merken = (v) => { try { localStorage.setItem(SCHLUESSEL, v); } catch { /* privater Modus */ } };
  const klappen = [...document.querySelectorAll('[data-klappe]')];

  const setze = (stand, speichern = true) => {
    html.dataset.register = stand;
    klappen.forEach((b) => b.setAttribute('aria-expanded', String(stand === 'auf')));
    if (speichern && BREIT.matches) merken(stand);
  };

  // Standard: auf dem Desktop offen (oder wie zuletzt gemerkt), auf dem
  // Telefon zu -- dort würde die Spalte den halben Bildschirm belegen.
  setze(BREIT.matches ? (lesen() ?? 'auf') : 'zu', false);
  BREIT.addEventListener('change', (e) => setze(e.matches ? (lesen() ?? 'auf') : 'zu', false));

  klappen.forEach((b) => b.addEventListener('click', () => setze(html.dataset.register === 'auf' ? 'zu' : 'auf')));
  document.querySelector('.register-schleier')?.addEventListener('click', () => setze('zu'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !BREIT.matches && html.dataset.register === 'auf') setze('zu');
  });

  // Auf dem Telefon nach dem Sprung wieder schließen, sonst verdeckt die
  // Überlagerung genau die Stelle, zu der man gerade gesprungen ist.
  const links = [...register.querySelectorAll('a[href^="#"]')];
  links.forEach((a) => a.addEventListener('click', () => { if (!BREIT.matches) setze('zu', false); }));

  /* Aktiven Abschnitt markieren: die letzte Überschrift, die das obere
     Drittel des Sichtfelds passiert hat. Ein Scroll-Listener mit
     requestAnimationFrame reicht -- ein Intersection Observer auf einzeilige
     Überschriften wäre unzuverlässig. */
  const ziele = links.map((a) => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  let angefragt = false;
  const aktualisiere = () => {
    angefragt = false;
    const grenze = window.innerHeight * 0.32;
    let aktiv = ziele[0];
    for (const z of ziele) if (z.getBoundingClientRect().top <= grenze) aktiv = z;
    // Am Seitenende gewinnt der letzte Eintrag, sonst bleibt er unerreichbar.
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) aktiv = ziele[ziele.length - 1];
    links.forEach((a) => a.setAttribute('aria-current', a.getAttribute('href') === '#' + aktiv.id ? 'true' : 'false'));

    // Steht ein Unterpunkt im Licht, bleibt sein Elternknoten mitmarkiert --
    // sonst verliert man beim Scrollen durch die Projekte den Ort.
    register.querySelectorAll('.hat-kinder').forEach((li) => {
      const trifft = !!li.querySelector('.kinder a[aria-current="true"]');
      li.toggleAttribute('data-kind-aktiv', trifft);
    });
  };
  window.addEventListener('scroll', () => {
    if (!angefragt) { angefragt = true; requestAnimationFrame(aktualisiere); }
  }, { passive: true });
  aktualisiere();
}

/* --- Kontakt: sichtbare Rückmeldung -------------------------------------- */
// Ein mailto-Link ist stumm, wenn kein Mailprogramm eingerichtet ist: man
// klickt, und es passiert nichts Sichtbares. Deshalb wandert die Adresse beim
// Klick zusätzlich in die Zwischenablage, und darunter erscheint eine Zeile,
// die das bestätigt und die Adresse zeigt. Damit führt der Knopf in jedem Fall
// zu etwas -- auch dort, wo das Betriebssystem nichts öffnet.
const kontakte = document.querySelectorAll('a[data-kontakt]');
for (const a of kontakte) {
  const hinweis = a.closest('.kontakt')?.querySelector('.kontakt-hinweis');
  if (!hinweis) continue;
  const adresse = a.dataset.kontakt;
  // Die Texte kommen aus inhalt.ts, wie jeder andere Text der Seite.
  const { kopiert, adresse: nurAdresse } = hinweis.dataset;
  let zeitgeber;

  a.addEventListener('click', async () => {
    // Kein preventDefault: wer ein Mailprogramm hat, soll es geöffnet bekommen.
    let text = `${nurAdresse}: ${adresse}`;
    try {
      await navigator.clipboard.writeText(adresse);
      text = `${kopiert}: ${adresse}`;
    } catch {
      // Zwischenablage verweigert (kein sicherer Kontext, kein Recht):
      // dann bleibt die Adresse wenigstens sichtbar und markierbar.
    }
    hinweis.textContent = text;
    hinweis.dataset.sichtbar = '';
    clearTimeout(zeitgeber);
    zeitgeber = setTimeout(() => {
      delete hinweis.dataset.sichtbar;
      hinweis.textContent = '';
    }, 6000);
  });
}

/* --- Aufbau beim Scrollen ------------------------------------------------ */
// Zeilen, Bilder und Kennwerte erscheinen, wenn sie ins Bild kommen -- gestaffelt,
// wie ein Protokoll, das Zeile für Zeile ausgefüllt wird. Nur unterhalb der
// Falz; der Kopf tritt über reine CSS-Animation auf und braucht kein Skript.
const aufbau = [...document.querySelectorAll('.aufbau')];
if (aufbau.length) {
  // Was beim Start schon im Bild ist, wird sofort und synchron als sichtbar
  // markiert -- im selben Durchlauf wie data-js, also vor dem naechsten Bild.
  // Sonst blitzt es kurz auf, verschwindet und faehrt dann ein.
  const hoehe = window.innerHeight;
  const spaeter = aufbau.filter((el) => {
    if (el.getBoundingClientRect().top < hoehe) { el.classList.add('da'); return false; }
    return true;
  });
  if (spaeter.length) {
    const io = new IntersectionObserver((eintraege) => {
      for (const e of eintraege) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('da');
        io.unobserve(e.target);
      }
    }, { rootMargin: '0px 0px -6% 0px' });
    spaeter.forEach((el) => io.observe(el));
  }
}

/* --- Zählwerk ------------------------------------------------------------ */
// Kennzahlen laufen einmal von 0 auf ihren Wert hoch, sobald sie im Bild sind.
// Der Endstand ist exakt die Zahl aus den Daten; Präfix und Suffix bleiben.
const zaehler = document.querySelectorAll('[data-zahl]');
if (zaehler.length && !RUHIG.matches) {
  const gebiet = html.lang === 'en' ? 'en-GB' : 'de-DE';
  const DAUER = 950;
  const io = new IntersectionObserver((eintraege) => {
    for (const e of eintraege) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target;
      const ziel = Number(el.dataset.zahl);
      const vor = el.dataset.praefix ?? '';
      const nach = el.dataset.suffix ?? '';
      if (!Number.isFinite(ziel)) continue;
      const start = performance.now();
      const schritt = (t) => {
        const p = Math.min(1, (t - start) / DAUER);
        const k = 1 - Math.pow(1 - p, 3);            // weich auslaufend
        el.textContent = vor + Math.round(ziel * k).toLocaleString(gebiet) + nach;
        if (p < 1) requestAnimationFrame(schritt);
      };
      requestAnimationFrame(schritt);
    }
  }, { threshold: 0.6 });
  zaehler.forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------- Bildlupe */
/* Klick auf ein Bild zeigt es gross im nativen <dialog>. Der Link darunter
   bleibt ein echter Link: ohne dieses Skript oeffnet er die Bilddatei in
   einem neuen Tab, weshalb hier preventDefault() nur laeuft, wenn der Dialog
   auch wirklich verfuegbar ist. */
const lupe = document.getElementById('lupe');
if (lupe && typeof lupe.showModal === 'function') {
  const figur = lupe.querySelector('.lupe-figur');
  const bu = lupe.querySelector('.lupe-bu');
  const mass = lupe.querySelector('.lupe-mass');
  let ausloeser = null;
  let bild = null;

  for (const a of document.querySelectorAll('a[data-lupe]')) {
    a.addEventListener('click', (e) => {
      // Modifizierte Klicks gehoeren dem Browser: neuer Tab, Speichern unter.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      ausloeser = a;
      // Das Bild entsteht erst hier und verschwindet beim Schliessen wieder.
      // So enthaelt die Seite nie ein <img>, das kein Bild laedt.
      bild = new Image();
      bild.src = a.href;
      bild.alt = a.dataset.bu ?? '';
      figur.prepend(bild);
      bu.textContent = a.dataset.bu ?? '';
      // Masse aus dem Bildmanifest, nicht vom Vorschaubild: dessen
      // naturalWidth ist 0, solange es als lazy-Bild nicht geladen ist, und
      // faellt dann auf die ANGEZEIGTE Breite zurueck -- 292 statt 872.
      mass.textContent = a.dataset.w ? `${a.dataset.w} × ${a.dataset.h}` : '';
      lupe.showModal();
    });
  }

  // Klick auf den Hintergrund schliesst. Das <dialog> selbst fuellt das ganze
  // Fenster, deshalb zaehlt nur ein Treffer ausserhalb der Bildflaeche.
  lupe.addEventListener('click', (e) => {
    if (!e.target.closest('.lupe-figur, .lupe-schliessen')) lupe.close();
  });

  // Fokus zurueck auf das Bild, von dem aus geoeffnet wurde.
  lupe.addEventListener('close', () => {
    if (bild) { bild.remove(); bild = null; }
    if (ausloeser) { ausloeser.focus(); ausloeser = null; }
  });
}

/* --------------------------------------------------------- Bewegtes Bild */
/* Im HTML steht das Video mit Bedienleiste und ohne autoplay. Erst hier wird
   es zum stummen Endlos-Clip -- und nur, wenn niemand "Bewegung reduzieren"
   eingestellt hat. Die Seite verspricht, dass sich jede Bewegung abschalten
   laesst; ein fest verdrahtetes autoplay wuerde genau das brechen.
   Gespielt wird nur, solange das Video im Bild ist: ausserhalb kostet es
   Akku und Rechenzeit, ohne dass es jemand sieht. Der Knopf haelt es an
   (WCAG 2.2.2), und eine bewusste Pause gilt, bis wieder gedrueckt wird --
   auch wenn man weg- und zurueckscrollt. */
for (const v of document.querySelectorAll('video[data-video]')) {
  const knopf = v.parentElement.querySelector('[data-video-knopf]');
  v.muted = true; // Browser spielen nur stumme Videos ohne Klick ab
  if (RUHIG.matches || !knopf) continue; // Bedienleiste bleibt, Besucher entscheidet

  v.removeAttribute('controls');
  knopf.hidden = false;
  let angehalten = false;
  let sichtbar = false;

  /* Wenn das Video nicht spielen kann, faellt es auf das Standbild zurueck,
     statt einen Pausenknopf ueber einem stehenden Bild zu zeigen. Drei Faelle:
     - NotSupportedError / Fehler an der <source>: nicht abspielbar (Netz-
       fehler, fehlender Decoder). Standbild bleibt, ohne Bedienelement.
       Safari ist KEIN solcher Fall -- kein Range-Worker noetig, siehe
       tools/video-test.mjs.
     - NotAllowedError: Autoplay ist gesperrt (etwa im iOS-Stromsparmodus).
       Die Bedienleiste kommt zurueck, damit man selbst starten kann.
     - AbortError: ein play() wurde durch pause() unterbrochen, weil jemand
       weggescrollt hat. Normalbetrieb, kein Fehler.
     Fehler an <source> steigen nicht zum <video> auf, deshalb der eigene
     Lauscher an der Quelle. */
  const io = new IntersectionObserver(([e]) => { sichtbar = e.isIntersecting; abspielen(); }, { threshold: 0.25 });
  const aufgeben = (bedienleiste) => {
    io.disconnect();
    v.pause(); // sonst "versucht" das Element weiter zu spielen, obwohl nichts kommt
    knopf.hidden = true;
    if (bedienleiste) v.setAttribute('controls', '');
  };
  const abspielen = () => {
    if (!sichtbar || angehalten) { v.pause(); return; }
    v.play().catch((f) => {
      if (f.name === 'NotAllowedError') aufgeben(true);
      else if (f.name === 'NotSupportedError') aufgeben(false);
    });
  };
  v.querySelector('source')?.addEventListener('error', () => aufgeben(false));
  io.observe(v);
  knopf.addEventListener('click', () => {
    angehalten = !angehalten;
    knopf.setAttribute('aria-pressed', String(angehalten));
    abspielen();
  });
}
