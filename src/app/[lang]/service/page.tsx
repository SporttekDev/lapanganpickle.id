import type { Metadata } from "next";
import { ServiceRows } from "@/components/service/ServiceRows";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { pageHeroImage, serviceImages } from "@/data/images";
import { serviceSlugs } from "@/data/services";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale, type LangParams } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const meta = getDictionary(lang).meta.pages.service;
  return pageMetadata({ lang, path: "/service", title: meta.title, description: meta.description });
}

export default async function ServicePage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang);

  const items = serviceSlugs.map((slug) => ({
    slug,
    name: t.service.items[slug].name,
    text: t.service.items[slug].short,
    image: serviceImages[slug],
    href: localePath(lang, `/service/${slug}`),
    waMessage: t.service.items[slug].waMessage,
  }));

  return (
    <>
      <PageHero title={t.service.hero.title} lead={t.service.hero.lead} image={pageHeroImage} />
      <ServiceRows items={items} more={t.common.learnMore} book={t.service.book} />
      <ProcessSteps title={t.service.process.title} lead={t.service.process.lead} steps={t.service.process.steps} />
      <CtaBand
        title={t.home.cta.title}
        text={t.home.cta.text}
        button={t.home.cta.button}
        message={t.home.cta.waMessage}
      />
    </>
  );
}
