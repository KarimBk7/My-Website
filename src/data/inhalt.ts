/**
 * Alle Inhalte der Seite, zweisprachig.
 *
 * Regel fuer diese Datei: hier steht nur, was in den Quellunterlagen belegt ist
 * (Lebenslauf, Projektportfolio, die beiden Arbeitszeugnisse, die Repository-
 * Dokumentation). Jede Zahl traegt ihre Quelle. Nichts wird geschaetzt.
 * Was nicht gemessen wurde, heisst hier auch nicht "gemessen".
 */

export type Lang = 'de' | 'en';
export const LANGS: Lang[] = ['de', 'en'];

type S = Record<Lang, string>;

/* ------------------------------------------------------------------ Person */

export const person = {
  name: 'Abdil Karim Bakir',
  nachname: 'Bakir',
  vorname: 'Abdil Karim',
  email: 'abdilkarimb@gmail.com',
  github: 'KarimBk7',
  githubUrl: 'https://github.com/KarimBk7',
  ort: 'Berlin',
  stand: '2026-09',
  protokollNr: 'AKB-2026-09',
};

/* ------------------------------------------------------- Prüfstand (Hero) */

/**
 * Die vier Messwerte aus der Performance-Arbeit am Spesenkonfigurator.
 * Pruefast einheitlich 10.000 Zeilen. `vorher: null` heisst: fuer diesen
 * Zustand liegt keine Messung vor, nur eine schematische Angabe.
 */
export const pruefstand = {
  last: { de: '10.000 Zeilen', en: '10,000 rows' },
  stufen: {
    vorher: { de: 'Vorher', en: 'Before' },
    nachher: { de: 'Nachher', en: 'After' },
  },
  commits: { vorher: 'de361dd', nachher: '7c59f7b' },
  zeilen: [
    {
      nr: 'P-01',
      label: {
        de: 'Prüfung nach jeder Änderung',
        en: 'Validation after every edit',
      },
      vorher: 5051,
      nachher: 148,
      einheit: 'ms',
      achse: { de: 'ms', en: 'ms' },
      faktor: '34×',
      gemessen: true,
      quelle: 'docs/PERFORMANCE.md §2.2',
    },
    {
      nr: 'P-02',
      label: { de: 'Datei laden und darstellen', en: 'Load and render the file' },
      vorher: 5000,
      nachher: 600,
      einheit: 'ms',
      achse: { de: 'ms', en: 'ms' },
      faktor: '≈8×',
      gemessen: true,
      quelle: 'docs/PERFORMANCE.md §1 · decisions.md D3',
    },
    {
      nr: 'P-03',
      label: {
        de: 'Prüfbericht bei 10.000 Fehlern',
        en: 'Validation report with 10,000 errors',
      },
      vorher: null,
      vorherText: { de: 'mehrere Minuten', en: 'several minutes' },
      nachher: 283,
      einheit: 'ms',
      achse: { de: 'ms', en: 'ms' },
      faktor: null,
      gemessen: false,
      quelle: 'docs/PERFORMANCE.md §8.2',
    },
    {
      nr: 'P-04',
      label: {
        de: 'Oberflächen-Ereignisse je Prüfdurchlauf',
        en: 'UI events per validation pass',
      },
      vorher: 9600,
      nachher: 1,
      einheit: '',
      achse: { de: 'Ereignisse', en: 'events' },
      faktor: '9600 : 1',
      gemessen: true,
      quelle: 'docs/PERFORMANCE.md §2.2',
    },
  ],
} as const;

/* ------------------------------------------------------------- Stammdaten */

export const stammdaten: { label: S; wert: S }[] = [
  {
    label: { de: 'Studium', en: 'Degree' },
    wert: {
      de: 'B.Sc. Informatik, Freie Universität Berlin, seit 10/2023',
      en: 'B.Sc. Computer Science, Freie Universität Berlin, since 10/2023',
    },
  },
  {
    label: { de: 'Schwerpunkt', en: 'Focus' },
    wert: {
      de: 'Backend als Kern — Java und Datenverarbeitung. Dazu Web, Cloud-Infrastruktur und Hardware.',
      en: 'Backend at the core — Java and data processing. Beyond that: web, cloud infrastructure and hardware.',
    },
  },
  {
    label: { de: 'Standort', en: 'Location' },
    wert: { de: 'Berlin', en: 'Berlin' },
  },
  {
    label: { de: 'Sprachen', en: 'Languages' },
    wert: {
      de: 'Deutsch und Arabisch (Muttersprachen), Englisch C1, Französisch B1',
      en: 'German and Arabic (native), English C1, French B1',
    },
  },
  {
    label: { de: 'Programmiersprachen', en: 'Programming languages' },
    wert: {
      de: 'Java, Python, C, C#, Go, Scala, Haskell, JavaScript, SQL',
      en: 'Java, Python, C, C#, Go, Scala, Haskell, JavaScript, SQL',
    },
  },
  {
    label: { de: 'Werkzeuge', en: 'Tools' },
    wert: {
      de: 'JavaFX, Maven, JUnit und TestFX, .NET, WiX Toolset, Git und GitHub Actions',
      en: 'JavaFX, Maven, JUnit and TestFX, .NET, WiX Toolset, Git and GitHub Actions',
    },
  },
  {
    label: { de: 'Betrieb', en: 'Operations' },
    wert: {
      de: 'Ubuntu, OpenBSD, Cloudflare (DNS, Reverse Proxy, SSL/TLS), Nextcloud, Raspberry Pi',
      en: 'Ubuntu, OpenBSD, Cloudflare (DNS, reverse proxy, SSL/TLS), Nextcloud, Raspberry Pi',
    },
  },
];

/* ---------------------------------------------------------- Arbeitsfelder */

/**
 * Vier Felder, je ein Beleg aus den Unterlagen. Backend ist der Kern und
 * steht deshalb zuerst; die drei anderen sind belegt, nicht behauptet:
 * Cloud aus dem Arbeitszeugnis Lesto Branto, Hardware aus dem Raspberry-Pi-
 * Server im Lebenslauf, Web aus dem Lern-Repository und dieser Seite.
 */
export const arbeitsfelder: { name: S; beleg: S }[] = [
  {
    name: { de: 'Backend', en: 'Backend' },
    beleg: {
      de: 'Java, Datenverarbeitung, Performance unter Last. Tabellenkern, Undo/Redo und Absturzsicherung im Spesenkonfigurator.',
      en: 'Java, data processing, performance under load. Table core, undo/redo and crash protection in the expense configurator.',
    },
  },
  {
    name: { de: 'Web', en: 'Web' },
    beleg: {
      de: 'HTML, CSS, JavaScript, HTTP und FastAPI im Lern-Repository. Diese Seite: statisch mit Astro und TypeScript, ohne Tracker.',
      en: 'HTML, CSS, JavaScript, HTTP and FastAPI in the learning repository. This page: static, Astro and TypeScript, no trackers.',
    },
  },
  {
    name: { de: 'Cloud & Betrieb', en: 'Cloud & operations' },
    beleg: {
      de: 'Cloudflare mit DNS, Reverse Proxy und SSL/TLS, Nextcloud, Ubuntu und OpenBSD. Unternehmens-Cloud bei Lesto Branto aufgebaut und betrieben.',
      en: 'Cloudflare with DNS, reverse proxy and SSL/TLS, Nextcloud, Ubuntu and OpenBSD. Built and operate the company cloud at Lesto Branto.',
    },
  },
  {
    name: { de: 'Hardware', en: 'Hardware' },
    beleg: {
      de: 'Eigener Nextcloud-Server auf einem Raspberry Pi mit eigener Domain, abgesichert über Cloudflare. Hardware-Montage.',
      en: 'My own Nextcloud server on a Raspberry Pi with its own domain, secured through Cloudflare. Hardware assembly.',
    },
  },
];

/* ------------------------------------------------------------- Stationen */

export const stationen: { zeit: S; rolle: S; ort: string; text: S }[] = [
  {
    zeit: { de: 'seit 10/2025', en: 'since 10/2025' },
    rolle: { de: 'Geschäftsführer', en: 'Managing Director' },
    ort: 'Lesto Branto GmbH',
    text: {
      de: 'Aufbau und Betrieb der unternehmenseigenen Cloud auf Nextcloud. Cloudflare eingerichtet und betrieben: DNS-Verwaltung, Reverse Proxy, SSL/TLS. Eigene Skripte für wiederkehrende IT- und Verwaltungsvorgänge.',
      en: 'Built and operate the company cloud on Nextcloud. Set up and run Cloudflare: DNS management, reverse proxy, SSL/TLS. Own scripts for recurring IT and administrative processes.',
    },
  },
  {
    zeit: { de: '04/2026 – 07/2026', en: '04/2026 – 07/2026' },
    rolle: { de: 'Backend Architect', en: 'Backend Architect' },
    ort: 'Projektron GmbH · Softwareprojekt FU Berlin',
    text: {
      de: 'Sechsköpfiges Team, Auftragsentwicklung für einen Softwarehersteller. Verantwortlich für Tabellenkern, Undo/Redo, Multi-Tab-Verwaltung, Performance und Absturzsicherung.',
      en: 'Six-person team, contract development for a software vendor. Responsible for the table core, undo/redo, multi-tab handling, performance and crash protection.',
    },
  },
  {
    zeit: { de: '09/2025 – 11/2025', en: '09/2025 – 11/2025' },
    rolle: { de: 'Praktikant Softwareentwicklung', en: 'Software Engineering Intern' },
    ort: 'LUM GmbH',
    text: {
      de: 'Prototyp für die automatische Online-Aktualisierung der Laborsoftware SEPView 7. Einarbeitung in das WiX Toolset, Analyse und Behebung von Altlasten, Auslieferung eines lauffähigen Prototyps in C# und .NET.',
      en: 'Prototype for the automatic online update of the SEPView 7 laboratory software. Learned the WiX Toolset, analysed and fixed legacy issues, delivered a working prototype in C# and .NET.',
    },
  },
];

/* ------------------------------------------------------------- Messreihen */

export const projekte = [
  {
    id: 'spesenkonfigurator',
    nr: 'M-1',
    titel: {
      de: 'Spesenkonfigurator für Projektron BCS',
      en: 'Expense configurator for Projektron BCS',
    },
    kurz: {
      de: 'Windows-Desktop-Anwendung, mit der Personal- und Buchhaltungsteams die CSV-basierte Reisekosten-Konfiguration von Projektron BCS pflegen, ohne das zugrunde liegende Dateiformat zu kennen.',
      en: 'A Windows desktop application that lets HR and accounting teams maintain the CSV-based travel expense configuration of Projektron BCS without knowing the underlying file format.',
    },
    kopf: [
      { l: { de: 'Auftraggeber', en: 'Client' }, w: { de: 'Projektron GmbH', en: 'Projektron GmbH' } },
      { l: { de: 'Rahmen', en: 'Context' }, w: { de: 'Softwareprojekt, FU Berlin', en: 'Software project, FU Berlin' } },
      { l: { de: 'Zeitraum', en: 'Period' }, w: { de: 'April – Juli 2026', en: 'April – July 2026' } },
      { l: { de: 'Team', en: 'Team' }, w: { de: '6 Personen', en: '6 people' } },
      { l: { de: 'Meine Rolle', en: 'My role' }, w: { de: 'Backend Architect', en: 'Backend Architect' } },
    ],
    aufgabe: {
      de: 'Die Konfiguration legt für jede Kombination aus Arbeits- und Reiseland fest, welche Pauschalen, Schwellenwerte und Kürzungsregeln in welchem Zeitraum gelten. Von Hand gepflegt war sie unübersichtlich und fehleranfällig, zumal Excel beim Öffnen Geldbeträge in Datumsangaben umwandelt und keine fachliche Prüfung bietet.',
      en: 'The configuration defines, for every combination of work and travel country, which allowances, thresholds and reduction rules apply in which period. Maintained by hand it was opaque and error-prone — Excel turns monetary values into dates on open and offers no domain validation.',
    },
    herausforderung: {
      titel: { de: 'Die technische Kernfrage', en: 'The core technical problem' },
      text: {
        de: 'JavaFX kennt kein Anheften einzelner Spalten. Die fixierte linke Spalte ist deshalb eine zweite Tabelle, die über den Pixel-Offset der virtualisierten Darstellung synchron gehalten wird. Der Stresstest mit 10.000 Zeilen zeigte danach, dass nicht die Prüflogik langsam war, sondern deren Rückmeldung an die Tabelle: ein Listen-Beobachter löste rund 9.600 einzelne Oberflächen-Ereignisse aus. Ihn durch ein einziges Signal je Prüfdurchlauf zu ersetzen brachte den Faktor 34.',
        en: 'JavaFX cannot pin individual columns. The frozen left column is therefore a second table, kept in sync through the pixel offset of the virtualised view. The stress test with 10,000 rows then showed that the validation logic was not the slow part — its feedback to the table was: one list observer fired around 9,600 individual UI events. Replacing it with a single signal per validation pass produced the factor of 34.',
      },
    },
    beitrag: {
      de: [
        'Tabellenkern aus zwei pixelgenau synchronisierten Tabellen mit fixierter Spalte',
        'Multi-Tab-Verwaltung mit vollständig gekapseltem Zustand je Datei',
        'Undo/Redo nach dem Memento-Muster mit dateigrößenabhängigem Speicherbudget',
        'Mehrsprachigkeit mit Sprachwechsel zur Laufzeit',
        'Absturzsicherung mit automatischer Wiederherstellung des Bearbeitungsstands',
        'Performance-Optimierung nach dem Stresstest mit 10.000 Zeilen',
      ],
      en: [
        'Table core built from two pixel-synchronised tables with a frozen column',
        'Multi-tab handling with fully encapsulated state per file',
        'Undo/redo on the memento pattern with a file-size dependent memory budget',
        'Runtime language switching',
        'Crash protection with automatic recovery of the working state',
        'Performance work following the 10,000-row stress test',
      ],
    },
    kennzahlen: [
      { wert: '368', l: { de: 'eigene Commits', en: 'own commits' }, s: { de: 'von 703 im Repository', en: 'of 703 in the repository' } },
      { wert: '3', l: { de: 'behobene Speicherlecks', en: 'memory leaks fixed' }, s: { de: 'im Code-Review aufgedeckt', en: 'found in code review' } },
      { wert: '19', l: { de: 'Testklassen', en: 'test classes' }, s: { de: 'plus Prüftreiber für Last und Oberfläche', en: 'plus drivers for load and UI' } },
      { wert: '90+', l: { de: 'Klassen', en: 'classes' }, s: { de: 'im übergebenen Quelltext', en: 'in the delivered source' } },
    ],
    stack: ['Java 21', 'JavaFX 21', 'FXML', 'Maven', 'JUnit 5', 'TestFX', 'CSS', 'jpackage', 'GitHub Actions', 'Spotless'],
    auslieferung: {
      de: 'Übergeben als nativer Windows-Installer mit gebündelter Java-Laufzeitumgebung, installierbar ohne separate Java-Installation und ohne Administratorrechte. Mitgeliefert wurden Entscheidungsprotokoll, Validierungsregel-Katalog und acht How-to-Anleitungen.',
      en: 'Delivered as a native Windows installer with a bundled Java runtime, installable without a separate Java installation and without administrator rights. Shipped alongside: a decision log, a validation rule catalogue and eight how-to guides.',
    },
    bilder: [
      { datei: 'projektron-hauptfenster', breit: true, bu: { de: 'Hauptfenster mit fixierter linker Spalte, farbigen Prüfmarkierungen direkt an der betroffenen Zelle und Tab-Leiste für mehrere parallel geöffnete Dateien.', en: 'Main window with frozen left column, validation marks directly on the affected cell, and a tab bar for several files open in parallel.' } },
      { datei: 'projektron-zeilenassistent', bu: { de: 'Zeilenassistent: geführte Erfassung Feld für Feld, mit länderabhängigen Schritten.', en: 'Row wizard: guided entry field by field, with country-dependent steps.' } },
      { datei: 'projektron-pruefbericht', bu: { de: 'Prüfbericht: sammelt alle Befunde und springt per Klick zur Zelle.', en: 'Validation report: collects every finding and jumps to the cell on click.' } },
      { datei: 'projektron-einstellungen', bu: { de: 'Einstellungen: Vorgabewerte je Land, speicherbar als benannte Profile.', en: 'Settings: default values per country, storable as named profiles.' } },
    ],
    einordnung: {
      de: 'Die genannten Funktionen stammen aus meinem Verantwortungsbereich im sechsköpfigen Team. Oberfläche, Prototyping und Anforderungsmanagement lagen bei den übrigen Teammitgliedern, die fachliche Validierungslogik entstand gemeinsam.',
      en: 'The functions listed come from my area of responsibility within the six-person team. UI, prototyping and requirements were handled by the other members; the domain validation logic was developed jointly.',
    },
  },
  {
    id: 'kaiju',
    nr: 'M-2',
    titel: { de: 'Kaiju Adventure', en: 'Kaiju Adventure' },
    kurz: {
      de: 'Vollständiges 2D-Action-Adventure in Java, bewusst ohne Spiel-Engine gebaut: eigene Spielschleife, eigene Kollisionserkennung, kachelbasierte Welt und Spielstände in einer MySQL-Datenbank.',
      en: 'A complete 2D action adventure in Java, deliberately built without a game engine: own game loop, own collision detection, tile-based world and save games in a MySQL database.',
    },
    kopf: [
      { l: { de: 'Rahmen', en: 'Context' }, w: { de: 'Abiturprojekt', en: 'Abitur project' } },
      { l: { de: 'Zeitraum', en: 'Period' }, w: { de: 'Nov. – Dez. 2022', en: 'Nov – Dec 2022' } },
      { l: { de: 'Meine Rolle', en: 'My role' }, w: { de: 'Gesamter Quelltext', en: 'Entire source code' } },
      { l: { de: 'Team', en: 'Team' }, w: { de: 'Grafik und Klänge', en: 'Graphics and sound' } },
      { l: { de: 'Umfang', en: 'Scope' }, w: { de: '29 Klassen', en: '29 classes' } },
    ],
    aufgabe: {
      de: 'Ziel war ein fertig spielbares Adventure ohne Rückgriff auf eine Spiel-Engine, also mit selbst geschriebener Spielschleife, eigener Darstellung und eigener Kollisionsprüfung.',
      en: 'The goal was a finished, playable adventure without relying on a game engine — with a hand-written game loop, own rendering and own collision checks.',
    },
    herausforderung: {
      titel: { de: 'Die Spielschleife', en: 'The game loop' },
      text: {
        de: 'Ein eigener Thread hält das Spiel auf 60 Bilder je Sekunde. Statt fester Wartezeiten sammelt ein Delta-Zeit-Akkumulator die vergangene Zeit und zeichnet erst, wenn ein volles Bildintervall zusammengekommen ist. Aktualisieren und Zeichnen sind getrennt. Auf schnelleren Rechnern läuft das Spiel dadurch nicht schneller.',
        en: 'A dedicated thread holds the game at 60 frames per second. Instead of fixed sleeps, a delta-time accumulator collects elapsed time and only draws once a full frame interval has accumulated. Update and draw are separated, so the game does not run faster on faster machines.',
      },
    },
    beitrag: {
      de: [
        'Gesamter Quelltext vom Rendering bis zur Datenbankanbindung',
        'Spielschleife mit Delta-Zeit für konstante Bildrate',
        'Kollisionserkennung gegen Kacheln, Objekte und Einheiten',
        'Zustandsautomat über elf Spielzustände',
        'Spielstände in einer MySQL-Datenbank über JDBC',
        'Auslieferung als Windows-Programm mit eigener Java-Laufzeit',
      ],
      en: [
        'Entire source code, from rendering to database access',
        'Game loop with delta time for a constant frame rate',
        'Collision detection against tiles, objects and units',
        'State machine across eleven game states',
        'Save games in a MySQL database via JDBC',
        'Shipped as a Windows program with its own Java runtime',
      ],
    },
    kennzahlen: [
      { wert: '29', l: { de: 'Java-Klassen', en: 'Java classes' }, s: { de: 'rund 4.960 Zeilen', en: 'about 4,960 lines' } },
      { wert: '60', l: { de: 'Bilder je Sekunde', en: 'frames per second' }, s: { de: 'eigener Game-Loop', en: 'own game loop' } },
      { wert: '6.400', l: { de: 'Kacheln Weltkarte', en: 'world map tiles' }, s: { de: '80 × 80 zu je 48 px', en: '80 × 80 at 48 px each' } },
      { wert: '11', l: { de: 'Spielzustände', en: 'game states' }, s: { de: 'von Titel bis Epilog', en: 'from title to epilogue' } },
    ],
    stack: ['Java', 'Swing / AWT', 'MySQL', 'JDBC', 'Maven', 'jlink', 'jpackage', 'Git'],
    /** Sein eigener Rueckblick. Bleibt drin: das ist die Staerke, nicht die Schwaeche. */
    maengel: {
      titel: { de: 'Mängelliste, von mir selbst geführt', en: 'Defect list, kept by myself' },
      hinweis: {
        de: 'Das Projekt liegt vier Jahre zurück und war mein erstes größeres Stück Software. Diese Liste steht hier, weil sie zeigt, wie ich meinen eigenen Code heute lese.',
        en: 'The project is four years old and was my first larger piece of software. This list is here because it shows how I read my own code today.',
      },
      punkte: {
        de: [
          'Zugangsdaten zur Datenbank stehen fest im Quelltext statt in einer Konfiguration',
          'SQL wird per Zeichenkettenverkettung gebaut statt über Parameter',
          'Die Oberflächenklasse ist mit 1.106 Zeilen deutlich zu groß geraten',
          'Automatisierte Tests fehlen vollständig',
        ],
        en: [
          'Database credentials are hard-coded in the source instead of held in a configuration',
          'SQL is assembled by string concatenation instead of via parameters',
          'The UI class grew far too large at 1,106 lines',
          'Automated tests are missing entirely',
        ],
      },
    },
    bilder: [
      { datei: 'kaiju-ingame', breit: true, bu: { de: 'Spielansicht von oben: die Spielfigur am Strand, eine Nichtspielerfigur davor, links ein Höhleneingang. Oben links der Hinweis auf das Pausemenü, an den Rändern die Zähler für Schlüssel, Geld und Tränke.', en: 'Top-down gameplay: the player on the beach, a non-player character ahead, a cave entrance to the left. Top left the hint for the pause menu, around the edges the counters for keys, money and potions.' } },
      { datei: 'kaiju-titelbild', bu: { de: 'Titelbildschirm mit Menüführung über die Zustände Starten, Neues Spiel, Laden und Beenden. Die Auswahl läuft vollständig über den selbst geschriebenen Zustandsautomaten.', en: 'Title screen with menu navigation across the start, new game, load and quit states. Selection runs entirely through the hand-written state machine.' } },
      { datei: 'kaiju-weltkarte', bu: { de: 'Entwurf der Welt mit Dorf, See, Höhle und Bossarena. Das Raster liegt als Textdatei im Projekt und wird beim Start in Kacheln übersetzt.', en: 'World design with village, lake, cave and boss arena. The grid lives as a text file in the project and is translated into tiles at startup.' } },
      { datei: 'kaiju-pausemenu', bu: { de: 'Pausemenü über der abgedunkelten Spielwelt — einer der elf Spielzustände. Weiterspielen, Speichern und Hauptmenü stehen zur Wahl, darunter die Tastenbelegung für Bewegen, Heilen und Angreifen.', en: 'Pause menu over the dimmed game world — one of the eleven game states. Resume, save and main menu, with the key bindings for moving, healing and attacking below.' } },
      { datei: 'kaiju-sprites', breit: true, bu: { de: 'Spielfigur mit Lauf- und Angriffsbildern, Gegner, vier Nichtspielerfiguren und Tränke. Die Grafiken stammen vom Team, Animation, Kollision und Spiellogik dahinter von mir.', en: 'Player with walk and attack frames, enemies, four non-player characters and potions. The artwork is by the team; the animation, collision and game logic behind it are mine.' } },
    ],
    einordnung: {
      de: 'Schulprojekt aus dem Jahr 2022. Der Quelltext stammt vollständig von mir, Grafiken und Klänge vom übrigen Team.',
      en: 'School project from 2022. The source code is entirely mine; graphics and sound came from the rest of the team.',
    },
    repo: 'https://github.com/KarimBk7/Little-Adventure',
  },
  {
    id: 'lernrepo',
    nr: 'M-3',
    titel: { de: 'Technisches Lern-Repository', en: 'Technical learning repository' },
    kurz: {
      de: 'Über 17 Monate gewachsenes Repository mit eigenen Notizen, Terminal-Protokollen und lauffähigem Beispielcode zu 30 Themengebieten — von Python und Go über SQL und Linux-Administration bis zu Webentwicklung und Testen.',
      en: 'A repository grown over 17 months with my own notes, terminal logs and runnable example code across 30 topic areas — from Python and Go through SQL and Linux administration to web development and testing.',
    },
    kopf: [
      { l: { de: 'Rahmen', en: 'Context' }, w: { de: 'Programmierpraktikum, FU Berlin', en: 'Programming practicum, FU Berlin' } },
      { l: { de: 'Beginn', en: 'Started' }, w: { de: 'April 2025', en: 'April 2025' } },
      { l: { de: 'Meine Rolle', en: 'My role' }, w: { de: 'Alleinige Bearbeitung', en: 'Sole author' } },
      { l: { de: 'Status', en: 'Status' }, w: { de: '67 von 67 abgenommen', en: '67 of 67 accepted' } },
      { l: { de: 'Umfang', en: 'Scope' }, w: { de: '30 Themengebiete', en: '30 topic areas' } },
    ],
    aufgabe: {
      de: 'Das Programmierpraktikum der Freien Universität Berlin ersetzt Vorlesungen durch eigenständige Themenarbeit. Zu jedem Gebiet beantwortet man Verständnisfragen schriftlich, protokolliert die Arbeit an der Kommandozeile und lässt jede Aufgabe einzeln von einem Tutor abnehmen. Nicht bestandene Aufgaben gehen zur Überarbeitung zurück.',
      en: 'The programming practicum at Freie Universität Berlin replaces lectures with independent topic work. For every area you answer comprehension questions in writing, log your work at the command line, and have each assignment individually accepted by a tutor. Failed assignments are returned for revision.',
    },
    beitrag: {
      de: [
        'Eigene Antworten in Markdown zu jedem Thema, in eigenen Worten statt übernommener Lösungen',
        'Terminal-Protokolle mitgeschrieben, samt Fehlversuchen und Fehlermeldungen',
        'Lauffähiger Beispielcode je Sprache, nicht nur Textausschnitte',
        'Zeitaufwand je Aufgabe in der Commit-Nachricht erfasst',
      ],
      en: [
        'My own answers in Markdown for every topic, in my own words rather than adopted solutions',
        'Terminal logs written along the way, including failed attempts and error messages',
        'Runnable example code per language, not just text excerpts',
        'Time spent per assignment recorded in the commit message',
      ],
    },
    kennzahlen: [
      { wert: '67', l: { de: 'abgenommene Aufgaben', en: 'accepted assignments' }, s: { de: 'alle eingereichten', en: 'all submitted' } },
      { wert: '163', l: { de: 'dokumentierte Stunden', en: 'documented hours' }, s: { de: 'aus 140 Commit-Nachrichten', en: 'from 140 commit messages' } },
      { wert: '356', l: { de: 'Commits', en: 'commits' }, s: { de: 'April 2025 bis September 2026', en: 'April 2025 to September 2026' } },
      { wert: '156', l: { de: 'eigene Dateien', en: 'own files' }, s: { de: 'Notizen, Protokolle, Code', en: 'notes, logs, code' } },
    ],
    stack: ['Python', 'Go', 'SQL', 'JavaScript', 'HTML / CSS', 'Linux', 'Bash', 'Git', 'pytest', 'Pandas', 'FastAPI', 'venv / pip'],
    themen: [
      { gruppe: { de: 'Sprachen', en: 'Languages' }, punkte: ['Python', 'Go', 'SQL', 'RegExp'] },
      { gruppe: { de: 'Werkzeuge', en: 'Tools' }, punkte: ['Unix-Basis', 'Unix-Diverses', 'Paketmanager', 'Git', 'Netzwerk', 'Benutzerverwaltung'] },
      { gruppe: { de: 'Bibliotheken', en: 'Libraries' }, punkte: ['Standardbibliothek', 'pip', 'Frameworks', 'Pandas', 'Dokumentation'] },
      { gruppe: { de: 'Web', en: 'Web' }, punkte: ['HTML', 'CSS', 'JavaScript', 'HTTP'] },
      { gruppe: { de: 'Debugging', en: 'Debugging' }, punkte: ['Defektarten', 'Denkweise', 'Werkzeuge'] },
      { gruppe: { de: 'Basis', en: 'Basics' }, punkte: ['Unix-Umgebung', 'Repo', 'IDE', 'Schluss'] },
      { gruppe: { de: 'Testen', en: 'Testing' }, punkte: ['Testgrundlagen', 'Unittests'] },
      { gruppe: { de: 'Praxis', en: 'Practice' }, punkte: ['Python-mlh', 'Linkchecker'] },
    ],
    einordnung: {
      de: 'Sämtliche Inhalte stammen von mir; die Fremdbeiträge im Repository beschränken sich auf das Abhaken des Abnahmestatus durch den Tutor. Ich nutze es als persönliches Nachschlagewerk weiter.',
      en: 'All content is mine; third-party contributions in the repository are limited to the tutor ticking off the acceptance status. I still use it as a personal reference.',
    },
    repo: 'https://github.com/KarimBk7/-propra-Lern-Repository',
  },
] as const;

/* ----------------------------------------------------------- Fremdbefunde */

export const fremdbefunde = [
  {
    quelle: 'Lesto Branto GmbH',
    rolle: { de: 'Arbeitszeugnis, 27.07.2026', en: 'Employment reference, 27 July 2026' },
    zitate: {
      de: [
        'Herr Abdil Karim Bakir erfüllte die ihm übertragenen Aufgaben stets zu unserer vollsten Zufriedenheit.',
        'Die Konzeption und der Aufbau der unternehmenseigenen Cloud-Infrastruktur sowie die Umsetzung moderner Sicherheits- und Zugriffskonzepte zeugen von einer außergewöhnlich hohen technischen Kompetenz.',
      ],
      en: [
        'Mr Abdil Karim Bakir performed the tasks assigned to him always to our fullest satisfaction.',
        'The design and construction of the company’s own cloud infrastructure, and the implementation of modern security and access concepts, testify to exceptionally high technical competence.',
      ],
    },
    datei: '/dokumente/arbeitszeugnis-lesto-branto-geschwaerzt.pdf',
  },
  {
    quelle: 'LUM GmbH',
    rolle: { de: 'Praktikumszeugnis, 28.11.2025', en: 'Internship reference, 28 November 2025' },
    zitate: {
      de: [
        'Er führte alle Arbeitspakete selbständig, äußerst sorgfältig und planvoll durchdacht aus.',
        'Seine fachlichen Kompetenzen sowie seine sozialen Fähigkeiten machen ihn zu einer wertvollen Bereicherung für jedes Team.',
      ],
      en: [
        'He carried out all work packages independently, with the utmost care and in a well-planned manner.',
        'His technical skills and his social abilities make him a valuable asset to any team.',
      ],
    },
    datei: '/dokumente/praktikumszeugnis-lum-geschwaerzt.pdf',
  },
];

/* ------------------------------------------------------------ Oberfläche */

export const ui: Record<string, S> = {
  /**
   * Der Satz unter dem Namen im grünen Kopf. Das Erste, was ein Recruiter
   * liest. Kurz halten: drei Zeilen sind das Maximum, bevor der Kopf wächst
   * und der Rest der Seite nach unten rutscht.
   *
   * Achtung: `seiteBeschreibung` weiter unten ist ein ZWEITER Text über dich —
   * der erscheint in Google und in Link-Vorschauen, nicht auf der Seite.
   * Wenn sich deine Positionierung ändert, gehören beide angepasst.
   */
  kopfText: {
    de: 'Informatikstudent an der FU Berlin. Mein Kern ist das Backend — Java, Datenverarbeitung, Performance unter Last. Dazu Web, Cloud-Infrastruktur und Hardware: vom eigenen Server auf dem Raspberry Pi hinter Cloudflare bis zu dieser Seite.',
    en: 'Computer science student at FU Berlin. My core is the backend — Java, data processing, performance under load. Beyond that: web, cloud infrastructure and hardware, from my own Raspberry Pi server behind Cloudflare to this very page.',
  },

  githubProfil: { de: 'GitHub-Profil öffnen', en: 'Open GitHub profile' },

  pruefling: { de: 'Prüfling', en: 'Item under test' },
  standort: { de: 'Standort', en: 'Location' },
  standortWert: { de: 'Berlin, Deutschland', en: 'Berlin, Germany' },

  /* Sammelüberschrift über den drei Projektblättern. Sie ist auch das
     Sprungziel des Elternknotens im Inhaltsverzeichnis — ein Eintrag, der
     nirgendwohin führt, wäre dort der einzige tote Punkt. */
  projekteTitel: { de: 'Projekte', en: 'Projects' },
  projekteText: {
    de: 'Drei Arbeiten, je ein Blatt: eine Auftragsentwicklung für ein Softwareunternehmen, ein von Grund auf selbst gebautes Spiel ohne fertige Engine und ein über anderthalb Jahre gepflegtes Lernrepository.',
    en: 'Three pieces of work, one sheet each: a contract development for a software company, a game built from scratch without an engine, and a learning repository maintained over eighteen months.',
  },

  /* Inhaltsverzeichnis in der linken Spalte */
  register: { de: 'Inhalt', en: 'Contents' },
  registerAuf: { de: 'Inhaltsverzeichnis einblenden', en: 'Show contents' },
  registerZu: { de: 'Inhaltsverzeichnis ausblenden', en: 'Hide contents' },
  arbeitsfelderTitel: { de: 'Arbeitsfelder', en: 'Fields of work' },

  freigegebenFuer: { de: 'Freigegeben für', en: 'Released for' },
  rolle: {
    de: 'Software Engineering · Backend, Web, Cloud, Hardware',
    en: 'Software Engineering · Backend, Web, Cloud, Hardware',
  },
  kontakt: { de: 'Kontakt aufnehmen', en: 'Get in touch' },
  protokollNr: { de: 'Protokoll-Nr.', en: 'Protocol no.' },
  stand: { de: 'Stand', en: 'As of' },
  pruefer: { de: 'Prüfstellen', en: 'Verified by' },
  sprache: { de: 'Sprache', en: 'Language' },

  performanzTitel: { de: 'Performance-Optimierung', en: 'Performance work' },
  performanzText: {
    de: 'Ein großer Teil meiner Arbeit ging in die Performance. Nach dem Stresstest mit 10.000 Zeilen habe ich jede Optimierung einzeln vorher und nachher gemessen; die vier wichtigsten Werte stehen hier. Sie stammen aus der Projektdokumentation, nicht aus der Erinnerung.',
    en: 'A large part of my work went into performance. After the 10,000-row stress test I measured every optimisation individually, before and after; the four most important values are here. They come from the project documentation, not from memory.',
  },
  pruefstandTitel: { de: 'Prüfstand', en: 'Test bench' },
  pruefstandText: {
    de: 'Vier Messungen aus Messreihe M-1, jeweils bei 10.000 Zeilen.',
    en: 'Four measurements from test series M-1, each at 10,000 rows.',
  },
  spurTitel: { de: 'Beide Stände im Vergleich', en: 'Both states compared' },
  schalterGrund: {
    de: 'Zwei Stellungen, kein Regler: gemessen wurden ausschließlich diese beiden Stände. Jede Zwischenstellung wäre eine erfundene Zahl.',
    en: 'Two positions, not a slider: only these two states were ever measured. Any position between them would be a fabricated number.',
  },
  spurHinweis: {
    de: 'Logarithmische Skala. Offener Kreis: vorher. Gefüllter Kreis: nachher. Die gestrichelte Linie bei P-03 läuft aus dem Bild, weil für den Vorher-Zustand nur „mehrere Minuten“ überliefert ist.',
    en: 'Logarithmic scale. Hollow circle: before. Filled circle: after. The dashed line at P-03 runs off the chart because the before state is recorded only as “several minutes”.',
  },
  kennwerte: { de: 'Kennwerte', en: 'Key figures' },
  pruefpunkt: { de: 'Prüfpunkt', en: 'Test point' },
  istwert: { de: 'Istwert', en: 'Measured value' },
  quelle: { de: 'Quelle', en: 'Source' },
  gemessen: { de: 'gemessen', en: 'measured' },
  schematisch: { de: 'schematisch, nicht gemessen', en: 'schematic, not measured' },
  faktor: { de: 'Faktor', en: 'Factor' },
  standCommit: { de: 'Stand', en: 'Commit' },

  stammdatenTitel: { de: 'Stammdaten', en: 'Master data' },
  stationenTitel: { de: 'Stationen', en: 'Positions' },
  messreihenTitel: { de: 'Messreihen', en: 'Test series' },
  aufgabe: { de: 'Aufgabe', en: 'Task' },
  meinBeitrag: { de: 'Mein Beitrag', en: 'My contribution' },
  auslieferung: { de: 'Auslieferung', en: 'Delivery' },
  einordnung: { de: 'Einordnung', en: 'Context' },
  themenlandkarte: { de: 'Themenlandkarte', en: 'Topic map' },
  werkzeuge: { de: 'Werkzeuge', en: 'Stack' },

  fremdbefundeTitel: { de: 'Fremdbefunde', en: 'External findings' },
  fremdbefundeText: {
    de: 'Zitate aus den Originalzeugnissen. Die verlinkten PDFs sind geschwärzt: Unterschriften, Bankverbindung des Arbeitgebers und meine Anschrift sind entfernt. Ungeschwärzte Originale reiche ich auf Anfrage nach.',
    en: 'Quotations from the original references. The linked PDFs are redacted: signatures, the employer’s bank details and my postal address have been removed. Unredacted originals on request.',
  },
  pdfOeffnen: { de: 'PDF öffnen', en: 'Open PDF' },

  freigabeTitel: { de: 'Freigabe', en: 'Release' },
  freigabeText: {
    de: 'Ich suche eine Position als Software Engineer — Backend als Kern, gern mit Web-, Cloud- oder Hardware-Anteil. In Berlin oder remote. Schreiben Sie mir — ich antworte innerhalb von zwei Werktagen.',
    en: 'I am looking for a software engineering position — backend at the core, gladly with a web, cloud or hardware share. In Berlin or remote. Write to me — I reply within two working days.',
  },
  lebenslaufPdf: { de: 'Lebenslauf als PDF', en: 'CV as PDF' },
  mailBetreff: { de: 'Anfrage über die Website', en: 'Enquiry via your website' },

  seiteTitel: {
    de: 'Abdil Karim Bakir — Software Engineer',
    en: 'Abdil Karim Bakir — Software Engineer',
  },
  seiteBeschreibung: {
    de: 'Informatikstudent an der FU Berlin. Backend als Kern, dazu Web, Cloud-Infrastruktur und Hardware. Drei belegte Projekte, gemessene Ergebnisse, zwei Arbeitszeugnisse.',
    en: 'Computer science student at FU Berlin. Backend at the core, plus web, cloud infrastructure and hardware. Three documented projects, measured results, two employment references.',
  },
  skipLink: { de: 'Zum Inhalt springen', en: 'Skip to content' },
  fussnote: {
    de: 'Diese Seite ist statisch, kommt ohne Tracker und ohne Cookies aus und setzt keine Analysewerkzeuge ein.',
    en: 'This page is static, uses no trackers and no cookies, and runs no analytics.',
  },
};
