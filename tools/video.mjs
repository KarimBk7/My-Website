// Macht aus einer bereits zugeschnittenen Bildschirmaufnahme ein Web-Video
// plus Standbild.
//
//   public/media/<name>.mp4       H.264, stumm, zum Abspielen auf der Seite
//   src/assets/media/<name>.png   erstes Bild; tools/bilder.mjs macht daraus
//                                 das WebP-Standbild (poster) im Manifest
//
// Aufruf:  FFMPEG=/pfad/zu/ffmpeg node tools/video.mjs <eingabe.mp4> <name>
// ffmpeg ist bewusst KEINE Projektabhaengigkeit: das Paket laedt beim
// npm install ein 80-MB-Programm nach, und das bei jedem Cloudflare-Build.
// Das Werkzeug laeuft nur, wenn ein neues Video dazukommt.
//
// Die Einstellungen sind gemessen, nicht geraten (Kaiju-Aufnahme, 712x534, 20 s):
// - Nur MP4/H.264: laeuft in jedem Browser. VP9/WebM war bei gleicher
//   Einstellung groesser, nicht kleiner -- eine zweite Datei haette nichts
//   gespart, nur verdoppelt.
// - CRF 29: 2,5 MB statt 3,8 MB bei CRF 26. Dreifach vergroessert mitten in
//   der Kamerafahrt praktisch nicht zu unterscheiden -- und Pixel-Art zeigt
//   Kompressionsartefakte an harten Kanten sonst sofort.
// - 60 fps bleiben: 30 fps sparten nur 13 %, weil aufeinanderfolgende Bilder
//   fast nichts kosten. Und die Seite wirbt mit der 60-fps-Spielschleife.
// - Kein Ton: das Video laeuft stumm, und so kann auch kein Hintergrund-
//   geraeusch der Aufnahme mitkommen.
// - faststart: die Abspielinfos stehen vorn, das Video startet vor dem
//   vollstaendigen Laden.
// - Standbild = erstes Bild, damit beim Start nichts springt.
import { execFileSync } from 'node:child_process';

const [, , eingabe, name] = process.argv;
if (!eingabe || !name) {
  console.error('Aufruf: FFMPEG=/pfad/zu/ffmpeg node tools/video.mjs <eingabe.mp4> <name>');
  process.exit(1);
}
const ffmpeg = process.env.FFMPEG || 'ffmpeg';
const lauf = (args) => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });

lauf(['-i', eingabe, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '29',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `public/media/${name}.mp4`]);
lauf(['-i', eingabe, '-frames:v', '1', `src/assets/media/${name}.png`]);
console.log(`geschrieben: public/media/${name}.mp4, src/assets/media/${name}.png`);
