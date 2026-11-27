import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaYoutube } from "react-icons/fa6";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { Container } from "@/components/ui/Container";
import { serviceSlugs } from "@/data/services";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

const menu = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "service", href: "/service" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

const linkClass = "text-white/75 transition-colors hover:text-white";

export function Footer({ lang, t }: { lang: Locale; t: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer data-surface="dark" className="bg-court-deep text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link href={localePath(lang, "/")} className="inline-block">
            <Image src="/brand/logo-white.png" alt="LapanganPickle.id" width={387} height={76} className="h-9 w-auto" />
          </Link>
          <p className="mt-5 max-w-xs text-white/75">{t.footer.tagline}</p>
          <div className="mt-6 flex items-center gap-3">
            {site.social.instagram ? (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-court"
              >
                <FaInstagram className="size-5" aria-hidden="true" />
              </a>
            ) : null}
            {site.social.youtube ? (
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-court"
              >
                <FaYoutube className="size-5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>

        <nav aria-label={t.footer.menu} className="lg:col-span-2 lg:col-start-6">
          <h2 className="text-2xl">{t.footer.menu}</h2>
          <ul className="mt-4 space-y-2">
            {menu.map((item) => (
              <li key={item.key}>
                <Link href={localePath(lang, item.href)} className={linkClass}>
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.services} className="lg:col-span-3">
          <h2 className="text-2xl">{t.footer.services}</h2>
          <ul className="mt-4 space-y-2">
            {serviceSlugs.map((slug) => (
              <li key={slug}>
                <Link href={localePath(lang, `/service/${slug}`)} className={linkClass}>
                  {t.service.items[slug].name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-2xl">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-3 text-white/75">
            <li className="flex gap-3">
              <LuPhone className="mt-1 size-4 shrink-0" aria-hidden="true" />
              <a href={`tel:+${site.whatsapp}`} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            {site.email ? (
              <li className="flex gap-3">
                <LuMail className="mt-1 size-4 shrink-0" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
            ) : null}
            {site.address ? (
              <li className="flex gap-3">
                <LuMapPin className="mt-1 size-4 shrink-0" aria-hidden="true" />
                <span>{site.address}</span>
              </li>
            ) : null}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="flex flex-col gap-2 py-5 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <p>
            {t.footer.partOf} <span className="font-semibold text-white">Sport Group Indonesia</span>
          </p>
        </Container>
      </div>
    </footer>
  );
}
