import type { Metadata } from "next";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { pageHeroImage } from "@/data/images";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale, type LangParams } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import { site, waLink } from "@/lib/site";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const meta = getDictionary(lang).meta.pages.contact;
  return pageMetadata({ lang, path: "/contact", title: meta.title, description: meta.description });
}

/*
  Kontak lewat WhatsApp saja (tanpa formulir). Tiap topik membuka WhatsApp dengan pesan yang sudah terisi.
  Email, alamat, dan YouTube hanya tampil jika diisi di src/lib/site.ts.
*/
export default async function ContactPage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang);

  return (
    <>
      <PageHero title={t.contact.hero.title} lead={t.contact.hero.lead} image={pageHeroImage} />
      <section className="bg-white py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-4xl font-extrabold md:text-6xl">{t.contact.heading}</h2>
            <p className="mt-4 max-w-xl text-lg text-court/80">{t.contact.lead}</p>
            <ul className="mt-10 border-b border-rule">
              {t.contact.topics.map((topic) => (
                <li key={topic.label} className="border-t border-rule">
                  <a
                    href={waLink(topic.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-6 font-display text-3xl font-bold uppercase transition-colors hover:text-line md:text-4xl"
                  >
                    {topic.label}
                    <FaWhatsapp className="size-7 shrink-0 text-line" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-3xl font-extrabold md:text-4xl">{t.contact.info.title}</h2>
            <dl className="mt-6 space-y-7">
              <div>
                <dt className="text-sm font-semibold text-court/65">{t.contact.info.phone}</dt>
                <dd className="mt-1 text-lg">
                  <a href={`tel:+${site.whatsapp}`} className="hover:text-line">
                    {site.phone}
                  </a>
                </dd>
              </div>
              {site.address ? (
                <div>
                  <dt className="text-sm font-semibold text-court/65">{t.contact.info.address}</dt>
                  <dd className="mt-1 max-w-sm text-lg">{site.address}</dd>
                </div>
              ) : null}
              {site.email ? (
                <div>
                  <dt className="text-sm font-semibold text-court/65">{t.contact.info.email}</dt>
                  <dd className="mt-1 text-lg">
                    <a href={`mailto:${site.email}`} className="hover:text-line">
                      {site.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="text-sm font-semibold text-court/65">{t.contact.info.social}</dt>
                <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-lg">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-line"
                  >
                    <FaInstagram className="size-5" aria-hidden="true" />
                    Instagram
                  </a>
                  {site.social.youtube ? (
                    <a
                      href={site.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-line"
                    >
                      <FaYoutube className="size-5" aria-hidden="true" />
                      YouTube
                    </a>
                  ) : null}
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>
    </>
  );
}
