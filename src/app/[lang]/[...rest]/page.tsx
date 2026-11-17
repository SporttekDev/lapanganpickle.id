import { notFound } from "next/navigation";

/* Alamat yang tidak dikenal di dalam /en atau / dialihkan ke halaman 404 bermerek (lengkap dengan header dan footer). */
export default function UnknownPage() {
  notFound();
}
