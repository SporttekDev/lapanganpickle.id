import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./config";

export type LangParams = { params: Promise<{ lang: string }> };

/** Ambil bahasa dari params halaman; 404 jika bukan bahasa yang didukung. */
export async function resolveLocale(params: LangParams["params"]): Promise<Locale> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return lang;
}
