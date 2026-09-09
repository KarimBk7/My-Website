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
  };
  window.addEventListener('scroll', () => {
    if (!angefragt) { angefragt = true; requestAnimationFrame(aktualisiere); }
  }, { passive: true });
  aktualisiere();
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
