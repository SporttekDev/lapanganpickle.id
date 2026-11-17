import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { absoluteUrl } from "./seo";
import { site } from "./site";

/*
  Data terstruktur (JSON-LD) untuk Google.
  Sengaja memakai tipe "Organization" tanpa alamat. Setelah alamat kantor asli diisi di
  src/lib/site.ts, tipe ini bisa diganti menjadi "LocalBusiness" dengan menambahkan "address".
*/
export function organizationSchema(lang: Locale) {
  const sameAs = [site.social.instagram, site.social.youtube].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/brand/logo.png`,
    description: getDictionary(lang).meta.description,
    areaServed: "ID",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone,
        contactType: "customer service",
        areaServed: "ID",
        availableLanguage: ["Indonesian", "English"],
      },
    ],
    ...(site.email ? { email: site.email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function serviceSchema(lang: Locale, opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(lang, opts.path),
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "Indonesia" },
  };
}
