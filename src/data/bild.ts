/* Bilder bewusst NICHT ueber astro:assets.
   Cloudflare hat dieses Projekt als Worker angelegt und dabei einen Adapter
   eingesetzt, dessen Bilddienst <Image> auf einen Laufzeit-Endpunkt /_image
   umbiegt -- den die statische Auslieferung nicht bedient. Lokal war alles
   gruen, live antworteten alle sieben Bilder mit 404.
   Die Varianten erzeugt jetzt `node tools/bilder.mjs` vorab nach public/media,
   dieses Manifest haelt Groessen und Dateinamen. Damit haengt nichts mehr an
   einer Hosting-Eigenheit, und der Build laesst sich vor dem Deploy pruefen. */
import bilder from './bilder.json';

/** Liefert Quelle, srcset und Naturgroesse eines vorberechneten Bildes. */
export const bild = (name: string) => {
  const m = (bilder as Record<string, any>)[name];
  return {
    breite: m.breite as number,
    hoehe: m.hoehe as number,
    gross: m.varianten[m.varianten.length - 1].datei as string,
    srcset: m.varianten.map((v: any) => `${v.datei} ${v.breite}w`).join(', '),
  };
};

/** Adressen der Detailseiten, an einer Stelle. */
export const projektPfad = (lang: 'de' | 'en', id: string) =>
  lang === 'de' ? `/projekte/${id}/` : `/en/projects/${id}/`;
