import type { Metadata } from "next";
import { locales, localePath, type Locale } from "@/i18n/config";
import { site } from "./site";

export function absoluteUrl(lang: Locale, path = "/"): string {
  return `${site.url}${localePath(lang, path)}`;
}

/** Metadata satu halaman: judul, deskripsi, canonical, hreflang, Open Graph. */
export function pageMetadata(opts: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const { lang, path, title, description } = opts;
  const url = absoluteUrl(lang, path);

  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl("id", path);

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: site.name,
      locale: lang === "id" ? "id_ID" : "en_US",
      alternateLocale: lang === "id" ? "en_US" : "id_ID",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}
