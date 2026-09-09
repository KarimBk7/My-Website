import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://my-website.pages.dev',
  build: {
    // Eine Anfrage weniger auf der kritischen Strecke. Der Recruiter kommt
    // ueber ein unbekanntes Netz; jeder gesparte Roundtrip zaehlt.
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});
