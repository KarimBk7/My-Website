import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://my-website.abdilkarimb.workers.dev',

  // Beides ausdruecklich gesetzt, nicht der Vorgabe ueberlassen.
  // Cloudflare hat das Projekt als Worker angelegt und dabei einen Adapter
  // eingesetzt, dessen Bilddienst die Bilder erst beim Abruf erzeugt --
  // ueber einen Endpunkt /_image, den die Auslieferung nicht bedient.
  // Ergebnis: lokal alle Bilder da, live sieben 404er. Mit output 'static'
  // und dem sharp-Dienst entstehen die Bilder beim Bauen, auf jedem Host gleich.
  output: 'static',
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },

  build: {
    // Eine Anfrage weniger auf der kritischen Strecke. Der Recruiter kommt
    // ueber ein unbekanntes Netz; jeder gesparte Roundtrip zaehlt.
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});
