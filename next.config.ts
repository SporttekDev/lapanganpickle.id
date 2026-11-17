import type { NextConfig } from "next";

/*
  REDIRECT DARI URL LAMA (WordPress) KE URL BARU. Permanen, supaya peringkat Google berpindah.
  Isi hanya URL lama yang BERBEDA dengan URL baru. Cara mendapatkan daftar URL lama ada di README.md
  (bagian "Migrasi dari WordPress"). Contoh:
    { from: "/home", to: "/" },
    { from: "/service/court-installation", to: "/service/instalasi-lapangan" },
  Catatan: alamat dengan garis miring di akhir (/about/) otomatis dialihkan ke /about.
*/
const legacyRedirects: { from: string; to: string }[] = [];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return legacyRedirects.map(({ from, to }) => ({ source: from, destination: to, permanent: true }));
  },
};

export default nextConfig;
