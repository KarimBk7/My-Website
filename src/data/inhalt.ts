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
export const arbeitsfelder: { name: S; symbol: 'code' | 'web' | 'cloud' | 'chip'; beleg: S }[] = [
  {
    name: { de: 'Backend', en: 'Backend' },
    symbol: 'code',
    beleg: {
      de: 'Java, Datenverarbeitung, Performance unter Last. Tabellenkern, Undo/Redo und Absturzsicherung im Spesenkonfigurator.',
      en: 'Java, data processing, performance under load. Table core, undo/redo and crash protection in the expense configurator.',
    },
  },
  {
    name: { de: 'Web', en: 'Web' },
    symbol: 'web',
    beleg: {
      de: 'HTML, CSS, JavaScript, HTTP und FastAPI im Lern-Repository. Diese Seite: statisch mit Astro und TypeScript, ohne Tracker.',
      en: 'HTML, CSS, JavaScript, HTTP and FastAPI in the learning repository. This page: static, Astro and TypeScript, no trackers.',
    },
  },
  {
    name: { de: 'Cloud & Betrieb', en: 'Cloud & operations' },
    symbol: 'cloud',
    beleg: {
      de: 'Cloudflare mit DNS, Reverse Proxy und SSL/TLS, Nextcloud, Ubuntu und OpenBSD. Unternehmens-Cloud bei Lesto Branto aufgebaut und betrieben.',
      en: 'Cloudflare with DNS, reverse proxy and SSL/TLS, Nextcloud, Ubuntu and OpenBSD. Built and operate the company cloud at Lesto Branto.',
    },
  },
  {
    name: { de: 'Hardware', en: 'Hardware' },
    symbol: 'chip',
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
    zeit: { de: '04/2026 – 08/2026', en: '04/2026 – 08/2026' },
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

/* Drei Messwerte fuer den Kopf der Startseite. Absichtlich aus drei
   verschiedenen Blaettern, und jeder fuehrt zu seinem Blatt: wer nur einen
   Bildschirm liest, soll trotzdem die staerkste Zahl gesehen haben. Die Werte
   stehen so auch auf ihrem Blatt -- wird dort einer geaendert, gehoert er hier
   mitgeaendert. */
export const kopfzahlen: { wert: string; l: S; s: S; ziel: string }[] = [
  {
    wert: '34',
    l: { de: 'mal schnellere Prüfung', en: 'times faster validation' },
    s: { de: 'bei 10.000 Zeilen, Spesenkonfigurator', en: 'at 10,000 rows, expense configurator' },
    ziel: 'spesenkonfigurator',
  },
  {
    wert: '67/67',
    l: { de: 'abgenommene Aufgaben', en: 'assignments accepted' },
    s: { de: 'Programmierpraktikum der FU Berlin', en: 'programming practicum, FU Berlin' },
    ziel: 'lernrepo',
  },
  {
    wert: '145',
    l: { de: 'ms Antwortzeit', en: 'ms response time' },
    s: { de: 'dieser Seite, Median aus fünf Abrufen', en: 'of this page, median of five requests' },
    ziel: 'website',
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
      { l: { de: 'Zeitraum', en: 'Period' }, w: { de: '13.04. – 01.08.2026', en: '13 Apr – 1 Aug 2026' } },
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
  /**
   * Das bislang groesste eigene Projekt und das einzige, das im Betrieb laeuft:
   * Backend, Oberflaeche, Anmeldung, Datentrennung und Auslieferung auf eigener
   * Hardware. Die Zahlen sind gemessen -- 168 Backend-Tests am 24.09.2026 lokal
   * ausgefuehrt, Migrationen und Commits im Repository gezaehlt.
   */
  {
    id: 'reflowtask',
    kachel: 'reflow-woche',
    nr: 'M-2',
    stempel: { wort: { de: 'In Betrieb', en: 'In service' }, zusatz: '09/2026' },
    titel: { de: 'ReflowTask', en: 'ReflowTask' },
    kurz: {
      de: 'Aufgabenplaner, der sich selbst repariert: Jede Aufgabe bekommt echte Zeitblöcke, und wer einen verpasst, bekommt den Rest automatisch neu geplant. Selbst gehostet für einen Haushalt, im Betrieb auf einem Raspberry Pi 5.',
      en: 'A task planner that repairs its own schedule: every task gets real time blocks, and a missed block is replanned automatically. Self-hosted for a household, running on a Raspberry Pi 5.',
    },
    kopf: [
      { l: { de: 'Rahmen', en: 'Context' }, w: { de: 'Eigenarbeit', en: 'Own work' } },
      { l: { de: 'Zeitraum', en: 'Period' }, w: { de: '14.09. – 24.09.2026', en: '14–24 Sep 2026' } },
      { l: { de: 'Meine Rolle', en: 'My role' }, w: { de: 'Backend, Oberfläche, Betrieb', en: 'Backend, interface, operations' } },
      { l: { de: 'Umfang', en: 'Scope' }, w: { de: '3.517 Zeilen Java, 4.300 Zeilen TypeScript', en: '3,517 lines of Java, 4,300 of TypeScript' } },
      { l: { de: 'Betrieb', en: 'Operations' }, w: { de: 'Raspberry Pi 5, Docker Compose', en: 'Raspberry Pi 5, Docker Compose' } },
    ],
    aufgabe: {
      de: 'Aufgabenlisten sagen, was zu tun ist, aber nicht wann. Wird ein Termin verpasst, steht die Aufgabe rot da und das Umräumen des Tages bleibt am Menschen hängen. Fertige Dienste, die selbst umplanen, kosten ein Abo und legen den Kalender auf fremde Server. ReflowTask macht dasselbe auf eigener Hardware: Jede Aufgabe trägt eine geschätzte Dauer und optional eine Frist, daraus werden Blöcke in den eigenen Arbeitszeiten.',
      en: 'Task lists tell you what to do, not when. Miss an appointment and the task turns red, leaving you to rearrange the day by hand. Hosted services that replan for you cost a subscription and keep your calendar on someone else’s servers. ReflowTask does the same thing on your own hardware: every task carries an estimated duration and an optional deadline, and from those it places blocks inside your own working hours.',
    },
    herausforderung: {
      titel: { de: 'Planen als reine Funktion', en: 'Planning as a pure function' },
      text: {
        de: 'Der Kern ist bewusst eine reine Funktion: Aufgaben, belegte Zeiten, Einstellungen und der aktuelle Zeitpunkt hinein, fertige Blöcke heraus — ohne Datenbank, ohne Uhr von außen. Dadurch ist jede Regel einzeln durch einen Test beweisbar. Die Reihenfolge ist Frist zuerst, dann Priorität, dann das Alter der Aufgabe. Der letzte Schlüssel ist kein Schönheitsfehler, sondern Absicht: Ohne ihn würden gleichwertige Aufgaben bei jedem Lauf die Plätze tauschen, und jede Umplanung sähe nach einer Änderung aus. Freie Zeit beginnt außerdem immer auf einer glatten Viertelstunde, sonst steht nach einer Umplanung um 10:37 Uhr ein Kalender voller 10:37-Termine.',
        en: 'The core is deliberately a pure function: tasks, committed time, settings and the current moment go in, finished blocks come out — no database, no injected clock. That makes every rule provable by a single test. The order is deadline first, then priority, then the age of the task. That last tie-break is not cosmetic: without it, equivalent tasks would swap places on every run and each replan would look like a change. Free capacity also always starts on a clean quarter hour; otherwise a replan at 10:37 produces a calendar full of 10:37 starts.',
      },
    },
    beitrag: {
      de: [
        'Planungskern als reine Funktion, direkt testbar ohne Datenbank',
        'Stündlicher Lauf erkennt verpasste Blöcke und plant nur den Rest neu',
        'Zustände je Block (geplant, erledigt, verpasst): erledigte Teile zählen gegen die Schätzung',
        'Haushaltskonten mit eigenen Aufgaben, Arbeitszeiten und Verlauf je Person',
        'Datentrennung gegnerisch geprüft: fremde IDs antworten mit 404, nicht mit 403',
        'Anmeldung mit Sitzungscookies, bcrypt und Sperre nach fünf Fehlversuchen',
        'Auslieferung als Docker Compose, im Betrieb auf einem Raspberry Pi 5 hinter Caddy und Tailscale',
      ],
      en: [
        'Planning core as a pure function, testable directly without a database',
        'An hourly job spots missed blocks and replans only what is left',
        'Per-block states (planned, done, missed): finished parts count against the estimate',
        'Household accounts with their own tasks, working hours and history per person',
        'Data isolation tested adversarially: another user’s ID answers 404, not 403',
        'Login with session cookies, bcrypt and a lockout after five failed attempts',
        'Shipped as Docker Compose, running on a Raspberry Pi 5 behind Caddy and Tailscale',
      ],
    },
    kennzahlen: [
      { wert: '168', l: { de: 'Backend-Tests, alle grün', en: 'backend tests, all green' }, s: { de: 'am 24.09.2026 ausgeführt, dazu 29 im Frontend', en: 'run on 24 Sep 2026, plus 29 in the frontend' } },
      { wert: '7', l: { de: 'Datenbank-Migrationen', en: 'database migrations' }, s: { de: 'laufen gleich auf H2 und PostgreSQL', en: 'run identically on H2 and PostgreSQL' } },
      { wert: '40', l: { de: 'Commits', en: 'commits' }, s: { de: 'in zehn Tagen, 14.–24.09.2026', en: 'in ten days, 14–24 Sep 2026' } },
      { wert: '59', l: { de: 'Java-Klassen', en: 'Java classes' }, s: { de: 'plus 26 Dateien im Frontend', en: 'plus 26 files in the frontend' } },
    ],
    stack: ['Java 25', 'Spring Boot 4.1', 'Spring Data JPA', 'PostgreSQL', 'Flyway', 'React 19', 'TypeScript', 'Vite', 'TanStack Query', 'JUnit 5', 'Vitest', 'Docker Compose', 'GitHub Actions'],
    maengel: {
      titel: { de: 'Was noch fehlt', en: 'What is still missing' },
      hinweis: {
        de: 'Im Betrieb, aber nicht fertig. Diese Punkte sind bekannt und stehen hier, damit niemand sie erst suchen muss.',
        en: 'In service, but not finished. These points are known, and they are listed here so nobody has to go looking for them.',
      },
      punkte: {
        de: [
          'Keine wiederkehrenden Aufgaben',
          'Kein Abgleich mit fremden Kalendern: Ein Termin von außen blockiert nur, wenn er auch hier steht',
          'Die Anmeldesperre liegt im Arbeitsspeicher und ist nach einem Neustart weg',
          'Die Oberfläche gibt es nur auf Englisch, alle Texte stehen aber in einer Datei',
          'Keine Erinnerungen aufs Telefon; der vorgesehene Weg über einen Kalender-Feed fehlt noch',
        ],
        en: [
          'No recurring tasks',
          'No sync with external calendars: an outside appointment only blocks time if it is entered here too',
          'The login lockout lives in memory and is gone after a restart',
          'The interface is English-only, though every string sits in a single file',
          'No phone reminders; the intended route through a calendar feed does not exist yet',
        ],
      },
    },
    bilder: [
      { datei: 'reflow-woche', breit: true, bu: { de: 'Wochenansicht: geplante Blöcke in den Arbeitszeiten, rot markiert, was nach seiner Frist endet, gelb umrandet ein verschobener Block samt Herkunft. Links die Aufgaben, die Aufmerksamkeit brauchen, und darunter das Protokoll jeder Verschiebung. Oben je Tag, wie viel Zeit noch frei ist.', en: 'Week view: planned blocks inside the working hours, red for anything ending after its deadline, an amber outline for a moved block with where it came from. On the left the tasks needing attention, below them a log of every move. At the top of each day, how much time is still free.' } },
      { datei: 'reflow-neue-aufgabe', bu: { de: 'Neue Aufgabe: Dauer, Priorität und Frist über Schaltflächen statt über ein Formular. Der Satz darüber sagt vorab, wohin die Aufgabe fällt.', en: 'New task: duration, priority and deadline as chips instead of a form. The sentence above says in advance where the task will land.' } },
      { datei: 'reflow-arbeitszeiten', bu: { de: 'Arbeitszeiten je Person: Vorlagen für Mo–Fr, Mo–Sa oder jeden Tag, dazu Pausen, in die nichts geplant wird. Schichtwoche statt fest verdrahtetem Bürotag.', en: 'Working hours per person: presets for Mon–Fri, Mon–Sat or every day, plus breaks that nothing is scheduled into. Shift patterns rather than a hardcoded office day.' } },
      { datei: 'reflow-konten', bu: { de: 'Haushaltskonten: Mitglieder anlegen, Passwörter zurücksetzen, Konten entfernen. Jede Person sieht nur ihre eigenen Aufgaben; Rolle und Passwortpflicht stehen an der Zeile.', en: 'Household accounts: add members, reset passwords, remove accounts. Each person sees only their own tasks; role and forced password change are shown on the row.' } },
    ],
    auslieferung: {
      de: 'Ein Befehl mit Docker Compose bringt PostgreSQL, das Spring-Boot-Backend und die über Nginx ausgelieferte Oberfläche hoch. Läuft im Betrieb auf einem Raspberry Pi 5 hinter Caddy, erreichbar über Tailscale statt über das offene Internet. Eine Neuinstallation von Grund auf wurde durchgespielt, um die Anleitung zu prüfen.',
      en: 'One Docker Compose command brings up PostgreSQL, the Spring Boot backend and the Nginx-served interface. It runs in production on a Raspberry Pi 5 behind Caddy, reachable over Tailscale rather than the open internet. A from-scratch reinstall was rehearsed to verify the setup guide.',
    },
    einordnung: {
      de: 'Private Arbeit, Quelltext und Oberfläche stammen vollständig von mir. Bewusst ohne vollständiges Spring Security: Das Bedrohungsmodell ist ein Haushalt im privaten Netz, und die Begründung dafür steht als eigenes Dokument im Repository. Passwörter setzt zurück, wer Zugang zur Maschine hat — es gibt keinen Mailserver, also auch keinen Link zum Zurücksetzen.',
      en: 'Private work; source code and interface are entirely mine. Deliberately without the full Spring Security stack: the threat model is a household on a private network, and the reasoning is written down in the repository. Passwords are reset by whoever has access to the machine — there is no mail server, so there is no reset link either.',
    },
    repo: 'https://github.com/KarimBk7/ReflowTask',
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
    nr: 'M-3',
    stempel: { wort: { de: 'Veröffentlicht', en: 'Published' }, zusatz: '09/2026' },
    titel: { de: 'Diese Seite', en: 'This page' },
    kurz: {
      de: 'Die Bewerbungsseite, die Sie gerade lesen: statisch erzeugt, zweisprachig, ohne Tracker und ohne Cookies, ausgeliefert als Cloudflare Worker. Ein Skript von 5,2 KB je Seite, kein Framework im Browser; auf dem Blatt M-6 kommt der Solver als zweites Skript dazu.',
      en: 'The application site you are reading: statically generated, bilingual, no trackers and no cookies, served as a Cloudflare Worker. One 5.2 KB script per page, no framework in the browser; sheet M-6 adds the solver as a second script.',
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
      { wert: '5,2', l: { de: 'KB JavaScript', en: 'KB of JavaScript' }, s: { de: 'je Seite eine Datei, gzip, kein Framework', en: 'one file per page, gzipped, no framework' } },
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
  {
    id: 'kaiju',
    kachel: 'kaiju-spiel',
    nr: 'M-4',
    stempel: { wort: { de: 'Abgegeben', en: 'Submitted' }, zusatz: '12/2022' },
    titel: { de: 'Kaiju Adventure', en: 'Kaiju Adventure' },
    kurz: {
      de: 'Vollständiges 2D-Action-Adventure in Java, bewusst ohne Spiel-Engine gebaut: eigene Spielschleife, eigene Kollisionserkennung, kachelbasierte Welt und Spielstände als Datei, wahlweise in einer MySQL-Datenbank.',
      en: 'A complete 2D action adventure in Java, deliberately built without a game engine: own game loop, own collision detection, tile-based world and save games in a file, or optionally in a MySQL database.',
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
        'Spielstände über JDBC in MySQL, später auf lokale Dateien als Standard umgestellt',
        'Auslieferung als Windows-Programm mit eigener Java-Laufzeit',
      ],
      en: [
        'Entire source code, from rendering to database access',
        'Game loop with delta time for a constant frame rate',
        'Collision detection against tiles, objects and units',
        'State machine across eleven game states',
        'Save games via JDBC in MySQL, later switched to local files as the default',
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
        de: 'Das Projekt ist von 2022 und war mein erstes größeres Stück Software. Diese Liste steht hier, weil sie zeigt, wie ich meinen eigenen Code heute lese.',
        en: 'The project is from 2022 and was my first larger piece of software. This list is here because it shows how I read my own code today.',
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
    repo: 'https://github.com/KarimBk7/Kaiju-Adventure',
  },
  {
    id: 'lernrepo',
    kachel: 'kachel-lernrepo',
    nr: 'M-5',
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
    repo: 'https://github.com/KarimBk7/Learning-repository',
  },
  /**
   * Kleines Werkzeug, bewusst als solches ausgewiesen: es steht hier, weil es
   * fertig ausgeliefert ist -- als Programm, das jemand ohne Python startet --
   * und weil der Umbau vom Erzeugen aller Kombinationen zum Filtern der
   * Wortlisten messbar ist.
   */
  {
    id: 'wordle',
    kachel: 'wordle-ergebnis',
    nr: 'M-6',
    stempel: { wort: { de: 'Veröffentlicht', en: 'Released' }, zusatz: 'v1.0' },
    titel: { de: 'Wordle-Solver', en: 'Wordle Solver' },
    kurz: {
      de: 'Kleines Windows-Programm, das aus den Farbhinweisen einer Wordle-Runde alle noch möglichen Wörter herausfiltert — aus den echten Wortlisten des Spiels, in Python ohne eine einzige Abhängigkeit.',
      en: 'A small Windows program that filters every word still possible from the colour hints of a Wordle round — using the game’s own word lists, written in Python without a single dependency.',
    },
    kopf: [
      { l: { de: 'Rahmen', en: 'Context' }, w: { de: 'Eigenarbeit', en: 'Own work' } },
      { l: { de: 'Zeitraum', en: 'Period' }, w: { de: 'Dez. 2025 – Sept. 2026', en: 'Dec 2025 – Sep 2026' } },
      { l: { de: 'Meine Rolle', en: 'My role' }, w: { de: 'Gesamter Quelltext', en: 'Entire source code' } },
      { l: { de: 'Umfang', en: 'Scope' }, w: { de: '367 Zeilen Python, drei Dateien', en: '367 lines of Python, three files' } },
      { l: { de: 'Stand', en: 'Status' }, w: { de: 'Release v1.0 auf GitHub', en: 'Release v1.0 on GitHub' } },
    ],
    aufgabe: {
      de: 'Wordle gibt nach jedem Rateversuch drei Arten von Hinweisen: richtiger Buchstabe an richtiger Stelle, richtiger Buchstabe an falscher Stelle, Buchstabe gar nicht im Wort. Diese Hinweise im Kopf zu kombinieren ist mühsam und fehleranfällig. Das Programm nimmt sie als Eingabe und zeigt genau die Wörter, die noch übrig bleiben.',
      en: 'After each guess Wordle gives three kinds of hint: right letter in the right place, right letter in the wrong place, and letter not in the word at all. Combining those in your head is tedious and error-prone. The program takes them as input and shows exactly the words that remain.',
    },
    herausforderung: {
      titel: { de: 'Erst erzeugen, dann filtern', en: 'From generating to filtering' },
      text: {
        de: 'Die erste Fassung baute aus den erlaubten Buchstaben alle denkbaren Zeichenketten und prüfte anschließend, welche davon in der Wortliste stehen. Das wächst exponentiell mit der Zahl der offenen Stellen. Die heutige Fassung dreht die Richtung um: Sie geht einmal über die Wortliste und prüft jedes Wort gegen die Bedingungen — feste Buchstaben, ausgeschlossene Positionen, erlaubte Buchstaben und die Häufigkeit je gelbem Buchstaben. Der Aufwand hängt damit nur noch an der Länge der Liste, nicht an der Zahl der Möglichkeiten.',
        en: 'The first version built every conceivable string from the allowed letters and then checked which of them were in the word list. That grows exponentially with the number of open positions. The current version turns it around: it walks the word list once and tests each word against the constraints — fixed letters, excluded positions, allowed letters, and the required count per yellow letter. The work now depends only on the length of the list, not on the number of possibilities.',
      },
    },
    beitrag: {
      de: [
        'Filterlogik über beide Wortlisten, mit Häufigkeitsprüfung je Buchstabe',
        'Oberfläche in Tkinter: fünf Spalten für die fünf Stellen, Tastatur zum Ausschließen grauer Buchstaben',
        'Ergebnisse nach Anzahl verschiedener Buchstaben sortiert — das nächste Raten schließt so am meisten aus',
        'Trennung in mögliche Lösungen und nur erlaubte Rateworte',
        'Auslieferung als Windows-Ordner mit PyInstaller, startbar ohne Python',
      ],
      en: [
        'Filter logic across both word lists, including a per-letter count check',
        'Tkinter interface: five columns for the five positions, a keyboard for excluding grey letters',
        'Results sorted by number of distinct letters — the next guess then rules out the most',
        'Possible solutions kept separate from words that are only accepted as guesses',
        'Shipped as a Windows folder built with PyInstaller, runnable without Python',
      ],
    },
    kennzahlen: [
      { wert: '14.855', l: { de: 'geprüfte Wörter', en: 'words checked' }, s: { de: '2.315 Lösungen, 12.540 Rateworte', en: '2,315 solutions, 12,540 guess words' } },
      { wert: '2', l: { de: 'ms je Suchlauf', en: 'ms per search' }, s: { de: 'Median aus 15 Läufen, Python 3.14', en: 'median of 15 runs, Python 3.14' } },
      { wert: '367', l: { de: 'Zeilen Python', en: 'lines of Python' }, s: { de: 'Oberfläche, Solver, Einstieg', en: 'interface, solver, entry point' } },
      { wert: '0', l: { de: 'Abhängigkeiten', en: 'dependencies' }, s: { de: 'nur die Standardbibliothek', en: 'standard library only' } },
    ],
    stack: ['Python 3', 'Tkinter', 'PyInstaller', 'Git'],
    maengel: {
      titel: { de: 'Was fehlt', en: 'What is missing' },
      hinweis: {
        de: 'Ein Werkzeug für mich selbst, kein Produkt. Die Grenzen stehen hier, damit niemand sie erst suchen muss.',
        en: 'A tool I built for myself, not a product. Its limits are listed here so nobody has to go looking for them.',
      },
      punkte: {
        de: [
          'Keine automatisierten Tests; geprüft wurde von Hand gegen echte Spielrunden',
          'Die Oberfläche liegt mit 305 Zeilen in einer einzigen Datei',
          'Das Programm schlägt kein Wort vor, es filtert nur — eine Bewertung nach Informationsgewinn fehlt',
          'Fertig gebaut nur für Windows, aus dem Quelltext läuft es überall',
        ],
        en: [
          'No automated tests; checked by hand against real rounds of the game',
          'The interface sits in a single 305-line file',
          'The program suggests no word, it only filters — a ranking by information gain is missing',
          'Pre-built for Windows only, though it runs anywhere from source',
        ],
      },
    },
    bilder: [
      { datei: 'wordle-fenster', breit: true, bu: { de: 'Eingabefenster: je Spalte eine Stelle im Wort. Oben der grüne Buchstabe, darunter ob er noch einmal vorkommen darf, dann die gelben Buchstaben mit ihrer Häufigkeit, unten die Tastatur für die grauen.', en: 'Input window: one column per position in the word. The green letter at the top, below it whether it may occur again, then the yellow letters with their count, and at the bottom the keyboard for the grey ones.' } },
      { datei: 'wordle-ergebnis', breit: true, bu: { de: 'Ergebnis in zwei Listen: links die Wörter, die noch die Lösung sein können, rechts die, die nur als Rateversuch erlaubt sind. Je Liste stehen Wörter mit den meisten verschiedenen Buchstaben oben.', en: 'The result in two lists: on the left the words that can still be the solution, on the right those accepted only as a guess. Within each list, words with the most distinct letters come first.' } },
    ],
    auslieferung: {
      de: 'Als ZIP mit Programmordner, entpacken und starten — Python wird nicht gebraucht. Bewusst als Ordner statt als einzelne EXE: eine selbstentpackende Datei stufen Virenscanner und Browser regelmäßig als verdächtig ein.',
      en: 'Shipped as a ZIP containing the program folder: unpack and start, no Python needed. Deliberately a folder rather than a single EXE, because a self-extracting executable is regularly flagged as suspicious by virus scanners and browsers.',
    },
    einordnung: {
      de: 'Private Arbeit, der Quelltext stammt vollständig von mir. Die beiden Wortlisten sind die des Spiels und stammen aus öffentlichen Sammlungen; sie sind im Repository als Quelle genannt.',
      en: 'Private work; the source code is entirely mine. The two word lists are the game’s own and come from public collections, credited as such in the repository.',
    },
    release: {
      url: 'https://github.com/KarimBk7/Wordle-Solver/releases/latest/download/Wordle-Solver-windows.zip',
      groesse: '13 MB',
    },
    repo: 'https://github.com/KarimBk7/Wordle-Solver',
  },
] as const;

/* ----------------------------------------------------------- Fremdbefunde */

export const fremdbefunde = [
  {
    /* Zuerst, weil es die Backend-Arbeit am Spesenkonfigurator (M-1) belegt.
       Geschwaerzt zusaetzlich zu Anschrift, Unterschrift und Bankverbindung:
       Geburtsdatum, der Name der Unterzeichnerin, Logo und Firmenstempel
       (Corporate Identity des Auftraggebers) sowie der Vermerk "Vertraulich". */
    quelle: 'Projektron GmbH',
    rolle: {
      de: 'Teilnahmebescheinigung Studienprojekt, 14.09.2026',
      en: 'Certificate of participation, study project, 14 September 2026',
    },
    zitate: {
      de: [
        'Er zeigte während des Studienprojekts stets ein hohes Maß an Engagement und überzeugte durch ein sehr gutes technisches Verständnis sowie durchdachte und zielführende Fragen.',
        'Durch seine stets engagierte und konstruktive Mitarbeit trug er das Projekt maßgeblich voran und leistete einen sehr wichtigen Beitrag zu dessen erfolgreichem Verlauf.',
      ],
      en: [
        'Throughout the study project he consistently showed a high level of commitment and impressed with a very good technical understanding as well as well-considered, purposeful questions.',
        'Through his consistently committed and constructive collaboration he drove the project forward significantly and made a very important contribution to its successful course.',
      ],
    },
    datei: '/dokumente/teilnahmebescheinigung-projektron-geschwaerzt.pdf',
  },
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
    de: 'Sechs Arbeiten, je ein Blatt zum Aufschlagen: eine Auftragsentwicklung für ein Softwareunternehmen, ein selbst gehosteter Aufgabenplaner im Betrieb, ein von Grund auf gebautes Spiel ohne fertige Engine, ein über anderthalb Jahre gepflegtes Lernrepository, diese Seite selbst — und ein kleines Werkzeug, das fertig ausgeliefert ist.',
    en: 'Six pieces of work, one sheet each to open: a contract development for a software company, a self-hosted task planner in daily service, a game built from scratch without an engine, a learning repository maintained over eighteen months, this page itself — and a small tool that is finished and shipped.',
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
  stammUndStationen: { de: 'Stammdaten & Stationen', en: 'Master data & positions' },
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
    de: 'Zitate aus den Originalzeugnissen. Die verlinkten PDFs sind geschwärzt: Unterschriften, Bankverbindungen und meine Anschrift sind entfernt. Ungeschwärzte Originale reiche ich auf Anfrage nach.',
    en: 'Quotations from the original references. The linked PDFs are redacted: signatures, bank details and my postal address have been removed. Unredacted originals on request.',
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

  /* Deckblatt des Portfolio-PDFs (/druck/, gedruckt von tools/pdf.mjs). Es
     entsteht aus denselben Daten wie die Seite: ein neues Projekt in
     `projekte` steht ohne weiteres Zutun auch im Dokument. */
  druckTitel: { de: 'Projektportfolio', en: 'Project portfolio' },
  druckEmail: { de: 'E-Mail', en: 'Email' },
  druckOnline: { de: 'Onlinefassung', en: 'Online version' },
  druckHinweis: {
    de: 'Dieses Dokument wird aus der Bewerbungsseite erzeugt und trägt denselben Stand. Videos und die interaktive Demo gibt es nur online; im Dokument steht an ihrer Stelle ein Standbild. Alle verlinkten Adressen sind ausgeschrieben.',
    en: 'This document is generated from the application site and carries the same revision. Videos and the interactive demo exist online only; the document shows a still frame instead. Every linked address is written out in full.',
  },

  seiteTitel: {
    de: 'Abdil Karim Bakir — Software Engineer',
    en: 'Abdil Karim Bakir — Software Engineer',
  },
  seiteBeschreibung: {
    de: 'Informatikstudent an der FU Berlin. Backend als Kern, dazu Web, Cloud-Infrastruktur und Hardware. Sechs belegte Projekte, gemessene Ergebnisse, zwei Arbeitszeugnisse.',
    en: 'Computer science student at FU Berlin. Backend at the core, plus web, cloud infrastructure and hardware. Six documented projects, measured results, two employment references.',
  },
  skipLink: { de: 'Zum Inhalt springen', en: 'Skip to content' },

  /* Der Solver zum Ausprobieren auf Blatt M-6. Die Texte gehen als
     data-Attribut an public/js/wordle.js -- eingebettete Skripte verbietet
     die Richtlinie, zweisprachig soll es trotzdem sein. */
  wdDownload: { de: 'Windows-Version herunterladen', en: 'Download the Windows build' },
  wdTitel: { de: 'Selbst ausprobieren', en: 'Try it here' },
  wdText: {
    de: 'Dieselbe Filterung wie im Programm, hier im Browser. Tragen Sie Ihr geratenes Wort ein und klicken Sie jeden Buchstaben auf die Farbe, die das Spiel gezeigt hat. Die Bedingungen leitet die Seite daraus ab, auch wie oft ein Buchstabe vorkommen darf.',
    en: 'The same filtering as in the program, here in the browser. Enter the word you guessed and click each letter to the colour the game showed. The page derives the constraints from that, including how often a letter may occur.',
  },
  wdOhneSkript: {
    de: 'Zum Ausprobieren im Browser wird JavaScript gebraucht. Ohne geht es mit dem Programm: der Link zum Repository steht unten, die Windows-Fassung liegt dort als Download.',
    en: 'Trying it in the browser needs JavaScript. Without it, use the program: the repository link is below, and the Windows build is available there as a download.',
  },
  wdWortZeile: { de: 'Geratenes Wort, Zeile', en: 'Guessed word, row' },
  wdPlatzhalter: { de: 'z. B. slate', en: 'e.g. slate' },
  wdWechseln: { de: 'Farbe wechseln', en: 'change colour' },
  wdLeer: { de: 'Noch kein Buchstabe', en: 'No letter yet' },
  wdGrau: { de: 'grau, nicht im Wort', en: 'grey, not in the word' },
  wdGelb: { de: 'gelb, falsche Stelle', en: 'yellow, wrong position' },
  wdGruen: { de: 'grün, richtige Stelle', en: 'green, right position' },
  wdStart: { de: 'Wörter suchen', en: 'Find words' },
  wdLade: { de: 'Wortlisten laden …', en: 'Loading word lists …' },
  wdFehler: { de: 'Die Wortlisten konnten nicht geladen werden.', en: 'The word lists could not be loaded.' },
  wdLeerText: { de: 'Sobald ein vollständiges Wort eingetragen ist, stehen hier die Treffer.', en: 'Once a complete word is entered, the matches appear here.' },
  wdLoesungen: { de: 'Mögliche Lösungen', en: 'Possible solutions' },
  wdRateworte: { de: 'Nur als Rateversuch erlaubt', en: 'Accepted only as a guess' },
  wdVon: { de: 'von', en: 'of' },
  wdNichts: { de: 'Kein Wort passt zu diesen Angaben.', en: 'No word matches these hints.' },
  wdWeitere: { de: 'und {n} weitere', en: 'and {n} more' },
  datenschutz: { de: 'Datenschutz', en: 'Privacy' },
  impressum: { de: 'Impressum', en: 'Legal notice' },
  revision: { de: 'Revisionsstand', en: 'Revisions' },
  revTitel: { de: 'Revisionsstand', en: 'Revision record' },
  revStand: { de: 'Stand', en: 'As of' },
  revText: {
    de: 'Was an dieser Seite wann geändert wurde, direkt aus der Versionsverwaltung. Ein Protokoll, das sich still ändert, wäre keins — deshalb steht die Historie hier offen, samt der Einträge, die Fehler zurücknehmen.',
    en: 'What changed on this site and when, taken straight from version control. A record that changes silently is no record — so the history is open here, including the entries that undo mistakes.',
  },
  revSeit: { de: 'Erster Eintrag', en: 'First entry' },
  revEintraege: { de: 'Gezeigte Einträge', en: 'Entries shown' },
  revVon: { de: 'von', en: 'of' },
  revQuelle: { de: 'Quelle', en: 'Source' },
  revCommit: { de: 'Commit', en: 'Commit' },
  revHinweis: {
    de: 'Die Betreffzeilen stammen unverändert aus dem Repository und sind deutsch. Jede Zeile führt zum vollständigen Änderungssatz bei GitHub.',
    en: 'The subject lines are taken unchanged from the repository and are in German. Each line links to the full change set on GitHub.',
  },
  fussnote: {
    de: 'Diese Seite ist statisch, kommt ohne Tracker und ohne Cookies aus und setzt keine Analysewerkzeuge ein.',
    en: 'This page is static, uses no trackers and no cookies, and runs no analytics.',
  },
};
