import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OtherServices } from "@/components/service/OtherServices";
import { ServiceOverview } from "@/components/service/ServiceOverview";
import { CtaBand } from "@/components/shared/CtaBand";
import { EquipmentGrid } from "@/components/shared/EquipmentGrid";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { PortfolioGrid } from "@/components/shared/PortfolioGrid";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { Container } from "@/components/ui/Container";
import { equipmentImages, serviceImages } from "@/data/images";
import { projects, type ProjectCategory } from "@/data/portfolio";
import { equipmentKeys, isServiceSlug, serviceSlugs, type ServiceSlug } from "@/data/services";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { resolveLocale } from "@/i18n/server";
import { serviceSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ lang: string; slug: string }> };

/* Layanan mana yang menampilkan proyek kategori mana di bagian portofolio. */
const categoryBySlug: Record<ServiceSlug, ProjectCategory> = {
  "instalasi-lapangan": "installation",
  "pickleball-portable-court": "portable",
  "pickleball-equipment": "equipment",
};

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = await resolveLocale(params);
  if (!isServiceSlug(slug)) return {};
  const item = getDictionary(lang).service.items[slug];
  return pageMetadata({
    lang,
    path: `/service/${slug}`,
    title: `${item.name} | ${site.name}`,
    description: item.short,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const lang = await resolveLocale(params);
  if (!isServiceSlug(slug)) notFound();

  const t = getDictionary(lang);
  const item = t.service.items[slug];
  const related = projects.filter((project) => project.category === categoryBySlug[slug]);

  const otherItems = serviceSlugs
    .filter((s) => s !== slug)
    .map((s) => ({
      slug: s,
      name: t.service.items[s].name,
      text: t.service.items[s].short,
      href: localePath(lang, `/service/${s}`),
    }));

  const equipmentItems = equipmentKeys.map((key) => ({
    key,
    name: t.equipmentItems[key].name,
    text: t.equipmentItems[key].text,
    image: equipmentImages[key],
  }));

  /* Latar section dibuat berselang-seling putih dan krem. Bagian Ikhtisar selalu putih. */
  const isInstall = slug === "instalasi-lapangan";
  const isEquipment = slug === "pickleball-equipment";
  const hasChalkMiddle = isInstall || isEquipment;
  const portfolioTone = hasChalkMiddle ? "white" : "chalk";
  const lastTone = related.length > 0 ? portfolioTone : hasChalkMiddle ? "chalk" : "white";
  const otherTone = lastTone === "chalk" ? "white" : "chalk";

  return (
    <>
      <JsonLd data={serviceSchema(lang, { name: item.name, description: item.short, path: `/service/${slug}` })} />
      <PageHero title={item.name} lead={item.short} image={serviceImages[slug]} />
      <ServiceOverview
        lead={item.lead}
        includesTitle={t.service.labels.includes}
        includes={item.includes}
        suitableTitle={t.service.labels.suitable}
        suitable={item.suitable}
        book={t.service.book}
        message={item.waMessage}
      />

      {isEquipment ? (
        <section className="bg-chalk py-20 md:py-28">
          <Container>
            <h2 className="text-4xl font-extrabold md:text-6xl">{t.service.labels.products}</h2>
            <div className="mt-12">
              <EquipmentGrid items={equipmentItems} />
            </div>
          </Container>
        </section>
      ) : null}

      {isInstall ? (
        <ProcessSteps title={t.service.process.title} lead={t.service.process.lead} steps={t.service.process.steps} />
      ) : null}

      {related.length > 0 ? (
        <PortfolioGrid
          title={t.home.portfolio.title}
          lead={t.home.portfolio.lead}
          projects={related}
          categories={t.portfolio.categories}
          tone={portfolioTone}
        />
      ) : null}

      <OtherServices title={t.common.otherServices} items={otherItems} more={t.common.learnMore} tone={otherTone} />
      <CtaBand
        title={t.home.cta.title}
        text={t.home.cta.text}
        button={t.home.cta.button}
        message={item.waMessage}
      />
    </>
  );
}
