import type { Metadata } from "next";
import { EquipmentSection } from "@/components/home/EquipmentSection";
import { FaqPreview } from "@/components/home/FaqPreview";
import { HeroSlider } from "@/components/home/HeroSlider";
import { IntroMosaic } from "@/components/home/IntroMosaic";
import { LaykoldSection } from "@/components/home/LaykoldSection";
import { ServiceTiles } from "@/components/home/ServiceTiles";
import { StatsStrip } from "@/components/home/StatsStrip";
import { VideoSection } from "@/components/home/VideoSection";
import { WhyUs } from "@/components/home/WhyUs";
import { ClientsMarquee } from "@/components/shared/ClientsMarquee";
import { CtaBand } from "@/components/shared/CtaBand";
import { JsonLd } from "@/components/shared/JsonLd";
import { PortfolioGrid } from "@/components/shared/PortfolioGrid";
import { equipmentImages, heroImages, laykoldImage, mosaicImages, serviceImages } from "@/data/images";
import { projects } from "@/data/portfolio";
import { equipmentKeys, serviceSlugs } from "@/data/services";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale, type LangParams } from "@/i18n/server";
import { organizationSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

/* Tombol kedua di tiap slide hero mengarah ke halaman layanan yang sesuai */
const slideHrefs = ["/service", "/service/pickleball-portable-court", "/service/pickleball-equipment"];

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const meta = getDictionary(lang).meta.pages.home;
  return pageMetadata({ lang, path: "/", title: meta.title, description: meta.description });
}

export default async function HomePage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang);
  const h = t.home;

  const slides = h.slides.map((slide, i) => ({
    ...slide,
    image: heroImages[i],
    href: localePath(lang, slideHrefs[i]),
  }));

  const serviceItems = serviceSlugs.map((slug) => ({
    slug,
    name: t.service.items[slug].name,
    text: t.service.items[slug].homeShort,
    image: serviceImages[slug],
    href: localePath(lang, `/service/${slug}`),
  }));

  const equipmentItems = equipmentKeys.map((key) => ({
    key,
    name: t.equipmentItems[key].name,
    text: t.equipmentItems[key].text,
    image: equipmentImages[key],
  }));

  return (
    <>
      <JsonLd data={organizationSchema(lang)} />
      <HeroSlider
        slides={slides}
        labels={{
          carousel: t.common.carousel,
          previous: t.common.previous,
          next: t.common.next,
          goTo: t.common.goToSlide,
          play: t.common.playSlides,
          pause: t.common.pauseSlides,
        }}
      />
      <StatsStrip stats={h.stats} />
      <ServiceTiles title={h.services.title} lead={h.services.lead} items={serviceItems} more={t.common.learnMore} />
      <IntroMosaic
        title={h.intro.title}
        text={h.intro.text}
        cta={h.intro.cta}
        href={localePath(lang, "/about")}
        images={mosaicImages}
      />
      <LaykoldSection
        title={h.laykold.title}
        subtitle={h.laykold.subtitle}
        paragraphs={h.laykold.paragraphs}
        cta={h.laykold.cta}
        message={h.laykold.waMessage}
        image={laykoldImage}
      />
      <PortfolioGrid
        title={h.portfolio.title}
        lead={h.portfolio.lead}
        projects={projects}
        categories={t.portfolio.categories}
      />
      <VideoSection
        title={h.video.title}
        text={h.video.text}
        cta={h.video.cta}
        href={localePath(lang, "/service/pickleball-portable-court")}
      />
      <EquipmentSection
        title={h.equipment.title}
        lead={h.equipment.lead}
        cta={h.equipment.cta}
        href={localePath(lang, "/service/pickleball-equipment")}
        items={equipmentItems}
      />
      <WhyUs title={h.why.title} items={h.why.items} />
      <ClientsMarquee title={h.clients.title} />
      <FaqPreview
        title={h.faq.title}
        items={t.faq.items.slice(0, 4)}
        moreLabel={t.common.seeAllFaq}
        href={localePath(lang, "/faq")}
      />
      <CtaBand title={h.cta.title} text={h.cta.text} button={h.cta.button} message={h.cta.waMessage} />
    </>
  );
}
