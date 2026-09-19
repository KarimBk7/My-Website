import type { APIRoute } from 'astro';
import { projekte } from '../data/inhalt';

/* Die Sitemap entsteht beim Bauen aus den Inhalten. Vorher lag sie als feste
   Datei in public/ -- und wurde beim fuenften Projekt prompt vergessen.
   Die Rechtsseiten fehlen absichtlich: das Impressum traegt noindex, und die
   404-Seite gehoert in keinen Index. */
const seiten = (): [string, string][] => [
  ['/', '/en/'],
  ['/datenschutz/', '/en/privacy/'],
  ...projekte.map((p) => [`/projekte/${p.id}/`, `/en/projects/${p.id}/`] as [string, string]),
];

export const GET: APIRoute = ({ site }) => {
  const abs = (pfad: string) => new URL(pfad, site).href;
  const eintrag = (pfad: string, [de, en]: [string, string]) => `  <url>
    <loc>${abs(pfad)}</loc>
    <xhtml:link rel="alternate" hreflang="de" href="${abs(de)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs(en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(de)}"/>
  </url>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${seiten().flatMap((paar) => paar.map((pfad) => eintrag(pfad, paar))).join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
