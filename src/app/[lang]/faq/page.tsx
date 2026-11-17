import type { Metadata } from "next";
import { FaqList } from "@/components/shared/FaqList";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { WhatsAppButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { pageHeroImage } from "@/data/images";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale, type LangParams } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const meta = getDictionary(lang).meta.pages.faq;
  return pageMetadata({ lang, path: "/faq", title: meta.title, description: meta.description });
}

export default async function FaqPage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.faq.items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <PageHero title={t.faq.hero.title} lead={t.faq.hero.lead} image={pageHeroImage} />
      <section className="bg-white py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-3xl font-extrabold md:text-4xl">{t.faq.askTitle}</h2>
            <p className="mt-3 text-lg text-court/80">{t.faq.askText}</p>
            <WhatsAppButton className="mt-6" message={t.faq.askMessage}>
              {t.common.chatWhatsapp}
            </WhatsAppButton>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={t.faq.items} />
          </div>
        </Container>
      </section>
    </>
  );
}
