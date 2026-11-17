export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** URL publik sebuah halaman untuk bahasa tertentu. Indonesia tanpa prefix, Inggris di /en. */
export function localePath(lang: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLocale) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

/** Buang prefix bahasa dari pathname yang tampil di browser. */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (l === defaultLocale) continue;
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname || "/";
}
