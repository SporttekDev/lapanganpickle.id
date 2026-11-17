"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/Button";
import { localePath, locales, stripLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

const links = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "service", href: "/service" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

const noopSubscribe = () => () => {};

function LanguageSwitch({ lang, current, label }: { lang: Locale; current: string; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center text-sm font-bold">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 ? (
            <span aria-hidden="true" className="px-0.5 text-court/30">
              |
            </span>
          ) : null}
          <Link
            href={localePath(l, current)}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            className={cn(
              "rounded px-2 py-1.5 uppercase",
              l === lang
                ? "text-court underline decoration-ball decoration-2 underline-offset-4"
                : "text-court/60 hover:text-court",
            )}
          >
            {l}
          </Link>
        </span>
      ))}
    </div>
  );
}

export function Header({
  lang,
  nav,
  common,
}: {
  lang: Locale;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /*
    Halaman Indonesia ditampilkan lewat rewrite (/ -> /id), jadi pathname saat render server
    bisa berbeda dari yang tampil di browser. Agar HTML server dan klien selalu sama,
    path aktif baru dipakai setelah halaman termuat di browser. Sebelum itu, tombol bahasa
    mengarah ke beranda masing-masing bahasa.
  */
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const current = mounted ? stripLocale(pathname) : "/";

  const isActive = (href: string) =>
    mounted && (href === "/" ? current === "/" : current === href || current.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-white/95 backdrop-blur">
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Link href={localePath(lang, "/")} className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo.png"
            alt="LapanganPickle.id"
            width={387}
            height={76}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav aria-label={common.mainMenu} className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={localePath(lang, link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "border-b-2 px-3 py-2 text-base font-semibold transition-colors",
                isActive(link.href)
                  ? "border-line text-court"
                  : "border-transparent text-court/70 hover:border-court/30 hover:text-court",
              )}
            >
              {nav[link.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitch lang={lang} current={current} label={common.language} />
          <WhatsAppButton message={common.waDefault}>{common.consultNow}</WhatsAppButton>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-court lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? common.closeMenu : common.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <LuX className="size-6" aria-hidden="true" /> : <LuMenu className="size-6" aria-hidden="true" />}
        </button>
      </Container>

      <div id="mobile-nav" hidden={!open} className="border-t border-rule bg-white lg:hidden">
        <Container className="flex flex-col gap-1 py-4">
          <nav aria-label={common.mainMenu} className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.key}
                href={localePath(lang, link.href)}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "border-l-4 py-3 pl-4 text-lg font-semibold",
                  isActive(link.href) ? "border-line text-court" : "border-transparent text-court/75",
                )}
              >
                {nav[link.key]}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between gap-4 border-t border-rule pt-4">
            <LanguageSwitch lang={lang} current={current} label={common.language} />
            <WhatsAppButton message={common.waDefault}>{common.consultNow}</WhatsAppButton>
          </div>
        </Container>
      </div>
    </header>
  );
}
