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
  linkedin: 'abdil-karim-bakir',
  linkedinUrl: 'https://www.linkedin.com/in/abdil-karim-bakir-03b7a9432',
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
    kachel: 'kachel-spesenkonfig',
    nr: 'M-1',
    /* Abnahmevermerk auf dem Blatt. Jedes Wort ist durch einen Fakt auf
       demselben Blatt gedeckt -- hier durch die Auslieferung als Installer im
       Juli 2026. Ein erfundener Stempel waere genau die Deko, die dem
       Protokoll seine Glaubwuerdigkeit nimmt. */
    stempel: { wort: { de: 'Übergeben', en: 'Delivered' }, zusatz: '07/2026' },
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
    /**
     * Der eine Eingriff, der den Faktor 34 gebracht hat -- als Quelltext, nicht
     * als Behauptung. Beide Ausschnitte stehen woertlich so im Repository
     * (Commit f4e8223, docs/PERFORMANCE.md §2.2); nur die Zeilenumbrueche sind
     * fuer die schmale Spalte gesetzt. Die Kommentare bleiben englisch, weil
     * sie im Quelltext englisch sind -- uebersetzt waere es nicht mehr der Code.
     */
    eingriff: {
      titel: { de: 'Der Eingriff', en: 'The change' },
      text: {
        de: 'Vier Zeilen weniger, ein Signal mehr. Bevor das feststand, habe ich Schicht für Schicht gemessen, wo die Zeit blieb — die Prüflogik war es nicht.',
        en: 'Four lines fewer, one signal more. Before that was clear I measured layer by layer where the time went — it was not the validation logic.',
      },
      schichten: [
        { l: { de: 'nur die Liste', en: 'plain list' }, ms: 142 },
        { l: { de: '+ Extractor', en: '+ extractor' }, ms: 250 },
        { l: { de: '+ Filtered/Sorted', en: '+ filtered/sorted' }, ms: 260 },
        { l: { de: '+ TableView', en: '+ TableView' }, ms: 5051 },
      ],
      schichtHinweis: {
        de: '95 % der Kosten lagen darin, dass die Tabelle auf rund 9.600 einzelne Ereignisse reagierte — nicht im Prüfen selbst.',
        en: '95 % of the cost was the table reacting to some 9,600 individual events — not the validation itself.',
      },
      vorher: `// Extractor tells JavaFX to fire list-change
// events when hasRowError/hasRowWarning change
private final ObservableList<ExpenseEntry> data =
    FXCollections.observableArrayList(
        entry -> new Observable[] {
            entry.hasRowError,
            entry.hasRowWarning});`,
      nachher: `private final ObservableList<ExpenseEntry> data =
    FXCollections.observableArrayList();

// Bumped once after each full validation pass
private final IntegerProperty validationEpoch =
    new SimpleIntegerProperty(0);

public void markValidated() {
    validationEpoch.set(validationEpoch.get() + 1);
}`,
      commit: 'f4e8223',
      datei: 'ExpenseManager.java',
    },
    /**
     * Selbstkritik am Projekt, das zaehlt -- nicht nur am alten Schulprojekt.
     * Alle drei Punkte stehen so im Entscheidungsprotokoll des Repositorys
     * (docs/decisions.md D3, D5/D22, D10), also aus der Projektzeit, nicht
     * im Nachhinein zurechtgelegt.
     */
    maengel: {
      titel: { de: 'Was ich heute anders bauen würde', en: 'What I would build differently today' },
      hinweis: {
        de: 'Drei Stellen aus meinem eigenen Entscheidungsprotokoll. Sie stehen dort seit der Projektzeit als bewusst eingegangene Kompromisse — nicht im Nachhinein zurechtgelegt.',
        en: 'Three entries from my own decision log. They were recorded during the project as deliberate trade-offs — not arranged after the fact.',
      },
      punkte: {
        de: [
          'Die fixierte Spalte hängt an fixedCellSize. Das ist schnell, aber empfindlich: nach Struktur- und Spaltenänderungen bleiben Zellen unpositioniert, bis ein Ein-Pixel-Scroll die Ansicht anstößt. Ein bewusster Behelf, kein Entwurf. (D3)',
          'Undo kopiert bei jeder Aktion die gesamte Zeilenliste, rund 2,7 KB je Zeile. Ein delta-basiertes Undo hatte ich geprüft und als zu aufwendig verworfen — die Speichergrenze musste ich später doch nachziehen. (D5, korrigiert in D22)',
          'Die Dialog-Helfer in util importieren ihre Controller direkt. Sauber wäre je eine Schnittstelle; ich habe das für FXML-Dialoge als Überbau eingestuft. (D10)',
        ],
        en: [
          'The frozen column depends on fixedCellSize. That is fast but brittle: after structural and column changes cells stay unpositioned until a one-pixel scroll nudges the view. A deliberate workaround, not a design. (D3)',
          'Undo deep-copies the entire row list on every action, about 2.7 KB per row. I assessed a delta-based undo and rejected it as too costly — then had to retrofit the memory bound after all. (D5, corrected in D22)',
          'The dialog helpers in util import their controllers directly. An interface each would be cleaner; I judged that over-engineering for FXML dialogs. (D10)',
        ],
      },
    },
    stack: ['Java 21', 'JavaFX 21', 'FXML', 'Maven', 'JUnit 5', 'TestFX', 'CSS', 'jpackage', 'GitHub Actions', 'Spotless'],
    auslieferung: {
      de: 'Übergeben als nativer Windows-Installer mit gebündelter Java-Laufzeitumgebung, installierbar ohne separate Java-Installation und ohne Administratorrechte. Mitgeliefert wurden Entscheidungsprotokoll, Validierungsregel-Katalog und acht How-to-Anleitungen.',
      en: 'Delivered as a native Windows installer with a bundled Java runtime, installable without a separate Java installation and without administrator rights. Shipped alongside: a decision log, a validation rule catalogue and eight how-to guides.',
    },
    bilder: [
      { datei: 'projektron-ablauf', breit: true, video: true, bu: { de: 'Laufende Bedienung, 24 Sekunden: Nach dem Import schlägt ein Dialog vor, leere Operator-Zellen anhand des Gültigkeitszeitraums zu füllen. Danach Filtern nach Reiseziel, Suchen und Ersetzen, eine Zelle bearbeiten, eine gelb markierte Warnung, Scrollen durch die Spaltengruppen, die Einstellungen und das Speichern.', en: 'Live use, 24 seconds: after the import, a dialog offers to fill empty operator cells from the validity period. Then filtering by destination, find and replace, editing a cell, a row flagged yellow as a warning, scrolling through the column groups, the settings and saving.' } },
      { datei: 'projektron-zeilenassistent', bu: { de: 'Zeilenassistent: geführte Erfassung Feld für Feld, mit länderabhängigen Schritten.', en: 'Row wizard: guided entry field by field, with country-dependent steps.' } },
      { datei: 'projektron-pruefbericht', bu: { de: 'Prüfbericht: sammelt alle Befunde und springt per Klick zur Zelle.', en: 'Validation report: collects every finding and jumps to the cell on click.' } },
      { datei: 'projektron-einstellungen', bu: { de: 'Einstellungen: Vorgabewerte je Land, speicherbar als benannte Profile.', en: 'Settings: default values per country, storable as named profiles.' } },
    ],
    einordnung: {
      de: 'Die genannten Funktionen stammen aus meinem Verantwortungsbereich im sechsköpfigen Team. Oberfläche, Prototyping und Anforderungsmanagement lagen bei den übrigen Teammitgliedern, die fachliche Validierungslogik entstand gemeinsam. Der Quelltext gehört dem Auftraggeber und ist deshalb als einziges der hier gezeigten Projekte nicht öffentlich einsehbar.',
      en: 'The functions listed come from my area of responsibility within the six-person team. UI, prototyping and requirements were handled by the other members; the domain validation logic was developed jointly. The source code belongs to the client and is therefore the only project shown here that is not publicly viewable.',
    },
  },
  {
    id: 'kaiju',
    kachel: 'kaiju-spiel',
    nr: 'M-2',
    stempel: { wort: { de: 'Abgegeben', en: 'Submitted' }, zusatz: '12/2022' },
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
      /* Das einzige bewegte Bild der Seite, und bewusst hier: ein Standbild
         kann nicht zeigen, dass die selbst geschriebene Spielschleife
         wirklich laeuft. Erzeugt mit tools/video.mjs; `datei` ist zugleich
         der Name des Standbilds im Bildmanifest. */
      { datei: 'kaiju-spiel', breit: true, video: true, bu: { de: 'Laufende Spielszene, 20 Sekunden mit 60 Bildern je Sekunde: Die Kamera folgt der Spielfigur durch den Wald, durch das Tor ins ummauerte Dorf und bis zum Haus eines Dorfbewohners. Unterwegs ein Schwerthieb, gegnerische Würmer und die Geldanzeige, die im Lauf von 200 auf 300 springt.', en: 'Live gameplay, 20 seconds at 60 frames per second: the camera follows the player through the forest, through the gate into the walled village and up to a villager’s house. Along the way a sword strike, enemy worms, and the money counter jumping from 200 to 300 mid-run.' } },
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
    kachel: 'kachel-lernrepo',
    nr: 'M-3',
    stempel: { wort: { de: 'Abgenommen', en: 'Accepted' }, zusatz: '67/67' },
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
  /**
   * Das Projekt, das der Betrachter gerade benutzt. Es stand bis zuletzt nicht
   * in der Liste -- drei Projekte gezeigt und das vierte ausgelassen, obwohl es
   * offen im Netz liegt und den Web- und Betriebsteil belegt.
   *
   * Die Kennzahlen sind gemessen, nicht geschaetzt: Antwortzeit als Median aus
   * fuenf Abrufen gegen die veroeffentlichte Adresse, JavaScript als gzip-Groesse
   * der ausgelieferten Datei.
   */
  {
    id: 'website',
    kachel: 'kachel-website',
    nr: 'M-4',
    stempel: { wort: { de: 'Veröffentlicht', en: 'Published' }, zusatz: '09/2026' },
    titel: { de: 'Diese Seite', en: 'This page' },
    kurz: {
      de: 'Die Bewerbungsseite, die Sie gerade lesen: statisch erzeugt, zweisprachig, ohne Tracker und ohne Cookies, ausgeliefert als Cloudflare Worker. Ein einziges JavaScript von 5,2 KB, kein Framework im Browser.',
      en: 'The application site you are reading: statically generated, bilingual, no trackers and no cookies, served as a Cloudflare Worker. A single 5.2 KB JavaScript file, no framework in the browser.',
    },
    kopf: [
      { l: { de: 'Rahmen', en: 'Context' }, w: { de: 'Eigenarbeit', en: 'Own work' } },
      { l: { de: 'Zeitraum', en: 'Period' }, w: { de: 'September 2026', en: 'September 2026' } },
      { l: { de: 'Meine Rolle', en: 'My role' }, w: { de: 'Entwurf, Umsetzung, Betrieb', en: 'Design, build, operations' } },
      { l: { de: 'Betrieb', en: 'Operations' }, w: { de: 'Cloudflare Worker', en: 'Cloudflare Worker' } },
      { l: { de: 'Umfang', en: 'Scope' }, w: { de: 'Zwei Sprachen, eine Quelle', en: 'Two languages, one source' } },
    ],
    aufgabe: {
      de: 'Eine Bewerbungsseite, die das belegt, was sie behauptet: schnell, ohne fremde Dienste, ohne Datensammlung, mit Inhalten aus einer einzigen geprüften Quelldatei statt handgepflegtem HTML. Bilder werden beim Bauen einmal in mehreren Größen erzeugt, nicht zur Laufzeit umgerechnet.',
      en: 'An application site that demonstrates what it claims: fast, no third-party services, no data collection, with content from a single verified source file instead of hand-maintained HTML. Images are generated once at build time in several sizes rather than converted at runtime.',
    },
    herausforderung: {
      titel: { de: 'Was lokal grün ist, ist online noch lange nicht grün', en: 'Green locally is not green in production' },
      text: {
        de: 'Drei Fehler haben es trotz vollständig grüner lokaler Prüfung bis auf den Server geschafft: die Sicherheitsrichtlinie verbot eingebettete Skripte, weshalb das Seitenverhalten stumm ausfiel; die Bilder wurden zur Laufzeit angefordert und liefen ins Leere; und eine zu lange Cache-Frist lieferte neues HTML mit altem JavaScript aus. Alle drei schlugen nirgends fehl — sie taten einfach nichts. Daraus wurde ein zweiter Prüflauf, der nicht die gebaute Seite testet, sondern die veröffentlichte: ob die Kopfzeilen wirklich ankommen, ob jedes Bild lädt und ob das Skript tatsächlich gelaufen ist.',
        en: 'Three faults reached the server despite an all-green local check: the security policy forbade inline scripts, so the page behaviour silently died; the images were requested at runtime and went nowhere; and an over-long cache lifetime served new HTML with old JavaScript. None of the three failed loudly — they simply did nothing. The answer was a second check that does not test the built site but the published one: whether the headers actually arrive, whether every image loads, and whether the script really ran.',
      },
    },
    beitrag: {
      de: [
        'Inhalte in einer einzigen typisierten Quelldatei, beide Sprachen daneben statt in getrennten Dateien',
        'Sicherheitsrichtlinie ohne eingebettete Skripte, dazu nosniff, Referrer-Regel und gesperrte Einbettung',
        'Eigene Bild-Pipeline: WebP in zwei Breiten beim Bauen, ohne je hochzurechnen',
        'Prüflauf gegen die veröffentlichte Adresse, nicht nur gegen den lokalen Bau',
        'Prüfung auf Querüberlauf bei 1440 und 390 Pixeln, auch während der Einblendbewegung',
        'Bewegung vollständig abschaltbar über prefers-reduced-motion',
      ],
      en: [
        'Content in a single typed source file, both languages side by side rather than in separate files',
        'Security policy without inline scripts, plus nosniff, referrer rule and blocked embedding',
        'Own image pipeline: WebP at two widths at build time, never upscaled',
        'A check against the published address, not only against the local build',
        'Horizontal-overflow checks at 1440 and 390 pixels, including during the reveal animation',
        'Motion fully disabled via prefers-reduced-motion',
      ],
    },
    kennzahlen: [
      { wert: '145', l: { de: 'ms Antwortzeit', en: 'ms response time' }, s: { de: 'Median aus fünf Abrufen', en: 'median of five requests' } },
      { wert: '5,2', l: { de: 'KB JavaScript', en: 'KB of JavaScript' }, s: { de: 'eine Datei, gzip, kein Framework', en: 'one file, gzipped, no framework' } },
      { wert: '0', l: { de: 'Tracker und Cookies', en: 'trackers and cookies' }, s: { de: 'keine fremden Server', en: 'no third-party servers' } },
      { wert: '2', l: { de: 'Sprachen', en: 'languages' }, s: { de: 'vollständig, aus einer Quelle', en: 'complete, from one source' } },
    ],
    stack: ['Astro', 'TypeScript', 'CSS', 'Cloudflare Workers', 'sharp', 'Playwright', 'GitHub Actions'],
    einordnung: {
      de: 'Entwurf, Inhalte und Abnahme liegen bei mir; die Umsetzung ist im Dialog mit einem KI-Agenten entstanden. Das Repository ist offen — Quelltext, Prüfskripte und die Historie samt der oben genannten Fehler sind einsehbar.',
      en: 'Design, content and sign-off are mine; the implementation was produced in dialogue with an AI agent. The repository is open — source, check scripts and the history including the faults named above are all visible.',
    },
    repo: 'https://github.com/KarimBk7/My-Website',
  },
] as const;

/* ----------------------------------------------------------- Fremdbefunde */

export const fremdbefunde = [
  {
    quelle: 'Lesto Branto GmbH',
    /* Das Dokument nennt sich selbst "Arbeitszeugnis", beschreibt aber eine
       laufende Taetigkeit ("ist seit dem 01.10.2025 ... taetig"). Der Zusatz
       verhindert, dass es als Endzeugnis gelesen wird -- ohne den Titel des
       Dokuments zu aendern, den ich nicht aendern darf. */
    rolle: {
      de: 'Arbeitszeugnis, 27.07.2026 · Tätigkeit dauert an',
      en: 'Employment reference, 27 July 2026 · position ongoing',
    },
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
  linkedinProfil: { de: 'LinkedIn-Profil öffnen', en: 'Open LinkedIn profile' },
  /* Links, die eine fremde Seite oeffnen, tun das in einem neuen Tab. Der
     Zusatz gehoert in den Vorlesetext, sonst wechselt der Tab fuer
     Screenreader-Nutzer unangekuendigt. */
  neuerTab: { de: 'öffnet in neuem Tab', en: 'opens in a new tab' },
  herunterladen: { de: 'herunterladen', en: 'download' },

  /* Bildlupe. Ohne Skript bleibt der Link ein Link auf die Bilddatei -- das
     ist der Grund, warum hier ein <a> steht und kein <button>. */
  bildVergroessern: { de: 'Bild vergrößern', en: 'Enlarge image' },
  /* Umschalter mit festem Namen und aria-pressed als Zustand -- das ist das
     Muster, das Screenreader als Schalter ansagen ("gedrueckt"/"nicht
     gedrueckt"), statt dass die Beschriftung bei jedem Klick wechselt. */
  videoAnhalten: { de: 'Video anhalten', en: 'Pause video' },
  videoVollbild: { de: 'Video im Vollbild', en: 'Full-screen video' },
  bildSchliessen: { de: 'Schließen', en: 'Close' },
  bildAnsicht: { de: 'Bildansicht', en: 'Image view' },
  abnahme: { de: 'Abnahme', en: 'Sign-off' },

  /* "Lichtbild" ist das Wort, das auf amtlichen Formularen ueber dem Foto
     steht -- damit gehoert es zum Protokoll statt danebengeklebt zu sein. */
  lichtbild: { de: 'Lichtbild', en: 'Photograph' },
  lichtbildAlt: {
    de: 'Porträtfoto von Abdil Karim Bakir',
    en: 'Portrait photograph of Abdil Karim Bakir',
  },

  /* Die Angabe, die vorher komplett fehlte. Ohne sie kann eine Recruiterin
     nicht entscheiden, ob die Stelle ueberhaupt passt -- und schreibt nicht.
     Sie steht deshalb im Kopf, nicht erst im Freigabeblock ganz unten. */
  verfuegbarTitel: { de: 'Verfügbar', en: 'Availability' },
  verfuegbarWert: {
    de: 'Ab sofort · Werkstudent in Teilzeit',
    en: 'Immediately · working student, part-time',
  },

  /* Rückmeldung am Kontaktknopf. Ein mailto-Link bleibt stumm, wenn kein
     Mailprogramm eingerichtet ist — dann muss die Adresse trotzdem greifbar
     sein, sonst klickt jemand und gibt auf. */
  kontaktKopiert: { de: 'Adresse kopiert', en: 'Address copied' },
  kontaktAdresse: { de: 'Adresse', en: 'Address' },

  pruefling: { de: 'Prüfling', en: 'Item under test' },
  standort: { de: 'Standort', en: 'Location' },
  standortWert: { de: 'Berlin, Deutschland', en: 'Berlin, Germany' },

  /* Überschrift über den Projektkacheln; jede Kachel führt auf ihr Blatt. */
  projekteTitel: { de: 'Projekte', en: 'Projects' },
  blatt: { de: 'Blatt', en: 'Sheet' },
  blattOeffnen: { de: 'Blatt öffnen', en: 'Open sheet' },
  alleProjekte: { de: 'Alle Projekte', en: 'All projects' },
  weitereProjekte: { de: 'Weitere Projekte', en: 'More projects' },
  projekteText: {
    de: 'Vier Arbeiten, je ein Blatt zum Aufschlagen: eine Auftragsentwicklung für ein Softwareunternehmen, ein von Grund auf selbst gebautes Spiel ohne fertige Engine, ein über anderthalb Jahre gepflegtes Lernrepository — und diese Seite selbst.',
    en: 'Four pieces of work, one sheet each to open: a contract development for a software company, a game built from scratch without an engine, a learning repository maintained over eighteen months — and this page itself.',
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
  /* Ohne diesen Satz ist die Tabelle darueber keine Messung, sondern eine Zahl.
     Der Treiber startet die echte Oberflaeche -- das ist der Punkt. */
  messmethode: {
    de: 'Gemessen mit einem TestFX-Treiber, der die echte Oberfläche startet und 10.000 Zeilen in die reale Tabelle einspeist — kein synthetischer Aufbau. Reproduzierbar über <code>mvn test -Dtest=PerfVerifyDriver</code>.',
    en: 'Measured with a TestFX driver that boots the real UI and injects 10,000 rows into the live table — not a synthetic setup. Reproducible via <code>mvn test -Dtest=PerfVerifyDriver</code>.',
  },
  eingriffVorher: { de: 'vorher', en: 'before' },
  eingriffNachher: { de: 'nachher', en: 'after' },
  eingriffCommit: { de: 'Commit', en: 'Commit' },
  kennwerte: { de: 'Kennwerte', en: 'Key figures' },
  pruefpunkt: { de: 'Prüfpunkt', en: 'Test point' },
  quelle: { de: 'Quelle', en: 'Source' },
  faktor: { de: 'Faktor', en: 'Factor' },

  stammdatenTitel: { de: 'Stammdaten', en: 'Master data' },
  stationenTitel: { de: 'Stationen', en: 'Positions' },
  aufgabe: { de: 'Aufgabe', en: 'Task' },
  meinBeitrag: { de: 'Mein Beitrag', en: 'My contribution' },
  auslieferung: { de: 'Auslieferung', en: 'Delivery' },
  einordnung: { de: 'Einordnung', en: 'Context' },
  themenlandkarte: { de: 'Themenlandkarte', en: 'Topic map' },
  werkzeuge: { de: 'Werkzeuge', en: 'Stack' },

  /* Frueher "Fremdbefunde". Die Messprotokoll-Sprache traegt die ganze Seite,
     aber hier stand sie einer nicht-technischen Leserin im Weg: sie muss auf
     einen Blick erkennen, dass es Zeugnisse sind. */
  fremdbefundeTitel: { de: 'Zeugnisse & Referenzen', en: 'References' },
  fremdbefundeText: {
    de: 'Zitate aus den Originalzeugnissen. Die verlinkten PDFs sind geschwärzt: Unterschriften, Bankverbindung des Arbeitgebers und meine Anschrift sind entfernt. Ungeschwärzte Originale reiche ich auf Anfrage nach.',
    en: 'Quotations from the original references. The linked PDFs are redacted: signatures, the employer’s bank details and my postal address have been removed. Unredacted originals on request.',
  },
  /* Hiess "PDF oeffnen". Mit dem download-Attribut speichert der Browser die
     Datei, statt sie anzuzeigen -- dann darf die Beschriftung nicht "oeffnen"
     versprechen. */
  pdfOeffnen: { de: 'PDF herunterladen', en: 'Download PDF' },

  freigabeTitel: { de: 'Freigabe', en: 'Release' },
  freigabeText: {
    de: 'Ich suche eine Werkstudentenstelle in Teilzeit als Software Engineer — Backend als Kern, gern mit Web-, Cloud- oder Hardware-Anteil. Verfügbar ab sofort, in Berlin oder remote; Teilzeit deshalb, weil mein Informatikstudium an der FU noch läuft. Die Geschäftsführung bei Lesto Branto werde ich voraussichtlich nicht dauerhaft weiterführen: Mein Fach ist die Informatik, und dort will ich arbeiten. Schreiben Sie mir — ich antworte innerhalb von zwei Werktagen.',
    en: 'I am looking for a part-time working-student position as a software engineer — backend at the core, gladly with a web, cloud or hardware share. Available immediately, in Berlin or remote; part-time because my computer science degree at FU Berlin is still running. I do not expect to continue as managing director of Lesto Branto in the long run: computer science is my field, and that is where I want to work. Write to me — I reply within two working days.',
  },
  lebenslaufPdf: { de: 'Lebenslauf als PDF', en: 'CV as PDF' },
  mailBetreff: { de: 'Anfrage über die Website', en: 'Enquiry via your website' },

  seiteTitel: {
    de: 'Abdil Karim Bakir — Software Engineer',
    en: 'Abdil Karim Bakir — Software Engineer',
  },
  seiteBeschreibung: {
    de: 'Informatikstudent an der FU Berlin. Backend als Kern, dazu Web, Cloud-Infrastruktur und Hardware. Vier belegte Projekte, gemessene Ergebnisse, zwei Arbeitszeugnisse.',
    en: 'Computer science student at FU Berlin. Backend at the core, plus web, cloud infrastructure and hardware. Four documented projects, measured results, two employment references.',
  },
  skipLink: { de: 'Zum Inhalt springen', en: 'Skip to content' },
  datenschutz: { de: 'Datenschutz', en: 'Privacy' },
  impressum: { de: 'Impressum', en: 'Legal notice' },
  fussnote: {
    de: 'Diese Seite ist statisch, kommt ohne Tracker und ohne Cookies aus und setzt keine Analysewerkzeuge ein.',
    en: 'This page is static, uses no trackers and no cookies, and runs no analytics.',
  },
};
