/*
  Daftar proyek / portofolio. Tambah, hapus, atau ubah urutan bebas.
  Foto proyek ada di public/images/project-<id>.jpg (rasio 4:3).

  Yang perlu Anda cek:
  - Kategori "portable" untuk Sport Hub Anniversary dan Pickle Town (event dengan court vinyl portable).
  - Lokasi hanya Bali dan Lampung yang terisi. Tambahkan `location` jika mau ditampilkan.
*/
export type ProjectCategory = "installation" | "portable" | "equipment";

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  /** Opsional. Kosongkan jika belum ada. */
  location?: string;
  image: string;
};

const photo = (id: string) => `/images/project-${id}.jpg`;

export const projects: Project[] = [
  {
    id: "mouratoglou-academy-bali",
    name: "Mouratoglou Academy Bali",
    category: "installation",
    location: "Bali",
    image: photo("mouratoglou-academy-bali"),
  },
  {
    id: "bepeka-archery-indonesia",
    name: "Bepeka Archery Indonesia",
    category: "installation",
    image: photo("bepeka-archery-indonesia"),
  },
  {
    id: "net-racket-club",
    name: "Net Racket Club",
    category: "installation",
    location: "Lampung",
    image: photo("net-racket-club"),
  },
  {
    id: "the-net-pickleball",
    name: "The Net Pickleball",
    category: "installation",
    image: photo("the-net-pickleball"),
  },
  {
    id: "di-atas-social-club",
    name: "Di Atas Social Club",
    category: "installation",
    image: photo("di-atas-social-club"),
  },
  {
    id: "packle-zone",
    name: "Packle Zone",
    category: "installation",
    image: photo("packle-zone"),
  },
  {
    id: "ditto-percussion",
    name: "Ditto Percussion",
    category: "installation",
    image: photo("ditto-percussion"),
  },
  {
    id: "sport-hub-anniversary",
    name: "Sport Hub Anniversary",
    category: "portable",
    image: photo("sport-hub-anniversary"),
  },
  {
    id: "pickle-town",
    name: "Pickle Town",
    category: "portable",
    image: photo("pickle-town"),
  },
];
