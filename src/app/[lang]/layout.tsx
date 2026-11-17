import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale, type LangParams } from "@/i18n/server";
import { site } from "@/lib/site";
import "../globals.css";

/* Huruf isi: Barlow. Huruf judul bergaya papan skor: Barlow Condensed. */
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

/* Hanya /  (Indonesia) dan /en (Inggris) yang valid. Bahasa lain otomatis 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#234135",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
};

export default async function LangLayout({
  children,
  params,
}: LangParams & { children: ReactNode }) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang);

  return (
    <html lang={lang} className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ball focus:px-4 focus:py-3 focus:font-semibold focus:text-court"
        >
          {t.common.skipToContent}
        </a>
        <Header lang={lang} nav={t.nav} common={t.common} />
        <main id="main">{children}</main>
        <Footer lang={lang} t={t} />
        <WhatsAppFloat label={t.common.whatsappFloat} message={t.common.waDefault} />
      </body>
    </html>
  );
}
