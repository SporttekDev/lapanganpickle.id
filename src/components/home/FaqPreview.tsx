import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqList } from "@/components/shared/FaqList";

/* Empat FAQ teratas di beranda, sisanya ada di halaman FAQ. */
export function FaqPreview({
  title,
  items,
  moreLabel,
  href,
}: {
  title: string;
  items: { q: string; a: string }[];
  moreLabel: string;
  href: string;
}) {
  return (
    <section className="bg-chalk py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <h2 className="text-4xl font-extrabold md:text-5xl">{title}</h2>
          <ButtonLink href={href} variant="outline" className="mt-8">
            {moreLabel}
          </ButtonLink>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={items} />
        </div>
      </Container>
    </section>
  );
}
