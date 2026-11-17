/*
  Logo klien. Sekarang hasil crop dari screenshot halaman About situs lama
  (resolusi rendah). Ganti dengan file logo asli di public/clients/ dengan
  nama yang sama, atau ubah path di bawah.
  width/height = ukuran asli file (dipakai agar tidak ada loncatan layout).
*/
export type Client = {
  name: string;
  logo: string;
  width: number;
  height: number;
};

export const clients: Client[] = [
  { name: "Mouratoglou Academy Bali", logo: "/clients/mouratoglou-academy.png", width: 183, height: 69 },
  { name: "Packle Zone", logo: "/clients/packle-zone.png", width: 213, height: 119 },
  { name: "Di Atas Social Club", logo: "/clients/di-atas-social-club.png", width: 213, height: 119 },
  { name: "Pickle Town", logo: "/clients/pickle-town.png", width: 188, height: 188 },
  { name: "Net Racket Club", logo: "/clients/net-racket-club.png", width: 213, height: 111 },
];
