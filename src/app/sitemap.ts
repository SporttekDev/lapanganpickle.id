import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/data/services";
import { locales, type Locale } from "@/i18n/config";
import { absoluteUrl } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

/* Semua halaman publik. Tambahkan path baru di sini saat membuat halaman baru (mis. blog). */
const paths = ["/", "/about", "/service", ...serviceSlugs.map((slug) => `/service/${slug}`), "/faq", "/contact"];

function entry(lang: Locale, path: string): Entry {
  // Setiap halaman memberi tahu Google versi bahasa lainnya (hreflang)
  const languages: Record<string, string> = { "x-default": absoluteUrl("id", path) };
  for (const l of locales) languages[l] = absoluteUrl(l, path);

  return {
    url: absoluteUrl(lang, path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/service/") ? 0.7 : 0.8,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => locales.map((lang) => entry(lang, path)));
}
