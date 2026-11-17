/*
  Slug layanan = bagian akhir URL, mis. /service/instalasi-lapangan.
  PENTING: slug ini BELUM dicocokkan dengan URL situs WordPress lama. Cek URL lama Anda
  (lihat README.md, bagian "Migrasi dari WordPress"). Jika berbeda, jangan ubah slug di sini;
  cukup tambahkan redirect di next.config.ts (legacyRedirects).
*/
export const serviceSlugs = [
  "instalasi-lapangan",
  "pickleball-portable-court",
  "pickleball-equipment",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}

export const equipmentKeys = ["vinyl", "bleachers", "net", "scoreboard", "ballMachine"] as const;
export type EquipmentKey = (typeof equipmentKeys)[number];
