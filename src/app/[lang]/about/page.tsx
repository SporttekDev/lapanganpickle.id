import type { Metadata } from "next";
import { TeamGallery } from "@/components/about/TeamGallery";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { ClientsMarquee } from "@/components/shared/ClientsMarquee";
import { CtaBand } from "@/components/shared/CtaBand";
import { PageHero } from "@/components/shared/PageHero";
import { pageHeroImage, teamImages } from "@/data/images";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale, type LangParams } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await resolveLocale(params);
  const meta = getDictionary(lang).meta.pages.about;
  return pageMetadata({ lang, path: "/about", title: meta.title, description: meta.description });
}

export default async function AboutPage({ params }: LangParams) {
  const lang = await resolveLocale(params);
  const t = getDictionary(lang);

  return (
    <>
      <PageHero title={t.about.hero.title} lead={t.about.hero.lead} image={pageHeroImage} />
      <WhoWeAre
        title={t.about.who.title}
        heading={t.about.who.heading}
        text={t.about.who.text}
        cta={t.about.who.cta}
        href={localePath(lang, "/service")}
        items={t.about.who.items}
      />
      <TeamGallery title={t.about.team.title} images={teamImages} captions={t.about.team.captions} />
      <ClientsMarquee title={t.home.clients.title} />
      <CtaBand
        title={t.home.cta.title}
        text={t.home.cta.text}
        button={t.home.cta.button}
        message={t.home.cta.waMessage}
      />
    </>
  );
}
