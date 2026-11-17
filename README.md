# LapanganPickle.id

Website LapanganPickle.id (LPID), spesialis kontraktor lapangan pickleball di Indonesia.

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- Dua bahasa: Indonesia (tanpa prefix) dan Inggris (`/en`)
- Kontak lewat WhatsApp langsung, tanpa formulir dan tanpa database
- Di-hosting di Vercel

Daftar konten yang masih dummy ada di **CONTENT-TODO.md**. Baca itu sebelum go-live.

## Menjalankan di komputer

Butuh Node.js 20.9 atau lebih baru.

```bash
npm install
npm run dev        # buka http://localhost:3000  (Inggris: http://localhost:3000/en)
npm run typecheck  # cek error TypeScript
npm run build      # simulasi build produksi, jalankan sebelum deploy
npm start          # jalankan hasil build
```

Saat `dev` dan `build`, Next.js mengunduh font Barlow dari Google Fonts, jadi komputer harus online.

## Struktur folder

```
public/
  brand/            logo
  clients/          logo klien
  images/           foto situs (hanya poster video yang masih dummy, di images/dummy)
  videos/           taruh video pop-up event di sini
  og.png            gambar pratinjau saat link dibagikan
src/
  proxy.ts          aturan bahasa: / = Indonesia, /en = Inggris
  app/
    [lang]/         semua halaman (beranda, about, service, faq, contact)
    sitemap.ts      sitemap.xml otomatis
    robots.ts       robots.txt otomatis
    globals.css     warna dan gaya dasar
  components/       potongan tampilan (header, hero, kartu, dan lain-lain)
  data/             daftar foto, portofolio, klien, layanan
  i18n/dictionaries/id.ts, en.ts    SEMUA teks situs
  lib/site.ts       nomor WhatsApp, alamat, email, link sosial, video
next.config.ts      redirect dari URL lama
```

## Mengubah isi situs

| Yang ingin diubah | Di mana |
| --- | --- |
| Semua teks (judul, paragraf, FAQ, tombol) | `src/i18n/dictionaries/id.ts` dan `en.ts` |
| Nomor WhatsApp, telepon, alamat, email, Instagram, YouTube | `src/lib/site.ts` |
| Video pop-up event | `src/lib/site.ts` (`video.src`) |
| Foto situs | `src/data/images.ts` |
| Portofolio proyek | `src/data/portfolio.ts` |
| Logo klien | `src/data/clients.ts` |
| Warna merek | `src/app/globals.css` (bagian `@theme`) |
| Redirect URL lama | `next.config.ts` (`legacyRedirects`) |

Aturan penting untuk teks: `id.ts` dan `en.ts` harus punya struktur yang sama persis. Jika Anda menambah satu kunci di satu bahasa, tambahkan juga di bahasa lain. `npm run typecheck` akan memberi tahu bila ada yang kurang.

Kolom di `site.ts` yang dikosongkan (`""`), seperti email dan YouTube, otomatis disembunyikan dari situs.

### Mengganti foto

1. Taruh foto asli di `public/images/` (format jpg, png, atau webp). Untuk foto yang sudah terpasang (daftarnya di CONTENT-TODO.md), cukup timpa file dengan nama yang sama dan langkah 2 dan 3 tidak diperlukan.
2. Buka `src/data/images.ts` dan ubah path-nya, misalnya `"/images/hero-1.jpg"`.
3. Untuk foto proyek, ubah `image` di `src/data/portfolio.ts`.

Ukuran yang disarankan: hero 1920x1080, foto layanan/portofolio/mosaik 4:3, foto tim 3:4 (potret), equipment 1:1. Kompres foto dulu (idealnya di bawah 500 KB per foto) agar situs cepat dibuka.

### Memasang video pop-up event

1. Kompres video ke MP4 (H.264), idealnya di bawah sekitar 20 MB. Video yang lebih besar sebaiknya di-hosting di layanan video terpisah.
2. Simpan sebagai `public/videos/popup-event.mp4`.
3. Di `src/lib/site.ts`, ubah `video.src` menjadi `"/videos/popup-event.mp4"`.

### Menambah proyek portofolio

Salin satu blok di `src/data/portfolio.ts`, lalu ubah `id` (harus unik), `name`, `category` (`installation`, `portable`, atau `equipment`), `location`, dan `image`.

## Bahasa dan alamat URL

- Indonesia: `/`, `/about`, `/service`, `/service/instalasi-lapangan`, `/faq`, `/contact`
- Inggris: `/en`, `/en/about`, `/en/service`, dan seterusnya
- `/id/...` otomatis dialihkan ke versi tanpa prefix agar tidak ada URL ganda.
- Setiap halaman sudah punya tag `hreflang`, canonical, dan masuk ke `sitemap.xml`.

Jika Anda membuat halaman baru (misalnya blog untuk SEO): buat folder baru di `src/app/[lang]/`, lalu tambahkan path-nya ke daftar `paths` di `src/app/sitemap.ts`.

## Deploy: GitHub lalu Vercel

### 1. Simpan kode ke GitHub

Buat repository kosong di GitHub (private juga bisa), lalu di folder proyek:

```bash
git init
git add .
git commit -m "Website LapanganPickle.id"
git branch -M main
git remote add origin https://github.com/NAMA-ANDA/NAMA-REPO.git
git push -u origin main
```

### 2. Hubungkan ke Vercel

1. Masuk ke vercel.com, pilih **Add New**, lalu **Project**.
2. Pilih repository tadi dan klik **Import**.
3. Biarkan semua pengaturan bawaan (Vercel mengenali Next.js otomatis). Tidak ada environment variable yang perlu diisi.
4. Klik **Deploy**. Hasilnya muncul di alamat `nama-proyek.vercel.app`.

Setiap kali Anda `git push` ke branch `main`, Vercel otomatis memperbarui situs.

Catatan: paket Hobby (gratis) Vercel dibatasi untuk penggunaan non-komersial. Untuk situs bisnis, periksa ketentuan terbaru Vercel dan paket yang sesuai sebelum go-live.

### 3. Arahkan domain lapanganpickle.id

Lakukan ini **setelah** situs baru diuji dan siap (lihat checklist di bawah).

1. Di Vercel: **Project, Settings, Domains**. Tambahkan `lapanganpickle.id` dan `www.lapanganpickle.id`.
2. Vercel menampilkan record DNS yang harus dipasang. Pasang **persis** seperti yang ditampilkan Vercel di pengaturan DNS tempat domain Anda dibeli (registrar).
3. Jadikan `lapanganpickle.id` (tanpa www) sebagai domain utama, dan alihkan `www` ke sana. Alamat canonical di situs memakai versi tanpa www.
4. Tunggu DNS tersebar (biasanya beberapa menit sampai beberapa jam). HTTPS dipasang otomatis oleh Vercel.

Jika Anda memakai email dengan domain `@lapanganpickle.id`, **jangan hapus record MX** saat mengubah DNS, supaya email tetap berjalan.

## Migrasi dari WordPress

Urutannya penting supaya peringkat Google tidak turun dan tidak ada halaman yang hilang.

1. **Catat semua URL lama.** Buka `https://lapanganpickle.id/wp-sitemap.xml` atau `https://lapanganpickle.id/sitemap_index.xml` di browser, atau lihat Google Search Console, menu **Halaman**. Simpan daftarnya.
2. **Cocokkan dengan URL baru.** Slug sub-layanan di situs ini (`/service/instalasi-lapangan`, `/service/pickleball-portable-court`, `/service/pickleball-equipment`) **belum dicocokkan** dengan situs lama. URL lama yang berbeda harus diisi di `legacyRedirects` pada `next.config.ts`.
3. **Unduh foto dan logo asli** dari WordPress (menu Media) untuk mengganti gambar dummy.
4. **Deploy dulu ke alamat `.vercel.app`** dan uji: semua halaman, versi Indonesia dan Inggris, tombol WhatsApp di HP, dan redirect.
5. **Baru arahkan domain** ke Vercel. Jangan matikan hosting WordPress lama sampai situs baru terlihat benar di domain asli. Simpan backup WordPress beberapa minggu.
6. **Search Console:** kirim `https://lapanganpickle.id/sitemap.xml`, lalu pantau laporan halaman 404 selama beberapa minggu pertama.
7. Cek tautan ke situs di tempat lain (bio Instagram, Google Business Profile, iklan) agar tidak mengarah ke URL yang sudah tidak ada.

## Masalah umum

- **`npm run typecheck` menampilkan error:** kirim pesan error lengkapnya untuk diperbaiki.
- **Foto masih bertanda "FOTO DUMMY":** path di `src/data/images.ts` atau `src/data/portfolio.ts` belum diganti.
- **Perubahan teks tidak muncul:** hentikan `npm run dev` (Ctrl+C) lalu jalankan lagi.
- **Alamat `/id/about` berubah sendiri menjadi `/about`:** itu memang disengaja. Versi Indonesia tidak memakai prefix.
