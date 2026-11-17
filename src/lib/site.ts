/*
  Data kontak dan identitas situs. Edit di sini.
  Kolom kosong ("") otomatis disembunyikan dari halaman.
*/
type SiteConfig = {
  name: string;
  shortName: string;
  url: string;
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  social: { instagram: string; youtube: string };
  video: { src: string; poster: string };
};

export const site: SiteConfig = {
  name: "LapanganPickle.id",
  shortName: "LPID",
  url: "https://lapanganpickle.id",

  // Nomor WhatsApp format internasional tanpa + dan spasi
  whatsapp: "6281380197258",
  phone: "+62 813-8019-7258",

  // TODO: isi email bila sudah siap (kosong = disembunyikan)
  email: "lapanganpickle@gmail.com",

  // DUMMY: ganti dengan alamat kantor yang asli
  address: "Jl. Raya Perjuangan, Marga Mulya, Kec. Bekasi Utara, Kota Bks, Jawa Barat 17142",

  social: {
    instagram: "https://www.instagram.com/lapanganpickleid/",
    // TODO: isi link YouTube bila ada (kosong = disembunyikan)
    youtube: "",
  },

  // Video "Pickleball pop-up event". Taruh file di public/videos/popup-event.mp4
  // lalu isi src dengan "/videos/popup-event.mp4". Selama kosong, yang tampil gambar poster.
  video: {
    src: "/videos/isfex.mp4",
    poster: "/images/dummy/video-poster.svg",
  },
};

/** Link WhatsApp langsung dengan pesan yang sudah terisi. */
export function waLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
