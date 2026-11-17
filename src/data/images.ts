/*
  Semua gambar situs ada di sini.
  Semua foto ada di public/images/. Satu-satunya placeholder SVG bertanda "FOTO DUMMY"
  yang tersisa adalah poster video (public/images/dummy/video-poster.svg).

  Cara mengganti foto: timpa file di public/images/ dengan nama yang sama
  (jpg), atau ubah path di bawah. Tidak perlu mengubah komponen.

  Ukuran yang disarankan:
  - hero: 1920x1080 (16:9)      - layanan, mosaik, portofolio, Laykold: 4:3
  - tim: 3:4 (potret)           - equipment: 1:1 (persegi)
*/
const dummy = (name: string) => `/images/dummy/${name}.svg`;
const photo = (name: string) => `/images/${name}.jpg`;

/** Slider hero beranda (3 slide). Slide 3 membahas perlengkapan, jadi memakai foto net. */
export const heroImages = [photo("hero-1"), photo("hero-2"), photo("hero-3")];

/** Banner di bagian atas halaman dalam (Tentang, Layanan, FAQ, Kontak). */
export const pageHeroImage = photo("page-hero");

export const serviceImages = {
  "instalasi-lapangan": photo("service-install"),
  "pickleball-portable-court": photo("service-portable"),
  "pickleball-equipment": photo("service-equipment"),
} as const;

/** Empat foto di bagian "Kontraktor pickleball terpercaya" (beranda). */
export const mosaicImages = [photo("mosaic-1"), photo("mosaic-2"), photo("mosaic-3"), photo("mosaic-4")];

export const laykoldImage = photo("laykold");

/** Empat foto di halaman Tentang (keterangan di dictionaries: about.team.captions). */
export const teamImages = [photo("team-1"), photo("team-2"), photo("team-3"), photo("team-4")];

/** Lima foto equipment (persegi 1:1). */
export const equipmentImages = {
  vinyl: photo("equip-vinyl"),
  bleachers: photo("equip-bleachers"),
  net: photo("equip-net"),
  scoreboard: photo("equip-scoreboard"),
  ballMachine: photo("equip-ball-machine"),
} as const;

/** Gambar yang tampil sebelum video pop-up event diisi (lihat src/lib/site.ts). */
export const videoPoster = dummy("video-poster");
