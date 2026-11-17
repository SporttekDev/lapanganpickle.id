import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EquipmentGrid, type EquipmentTile } from "@/components/shared/EquipmentGrid";

export function EquipmentSection({
  title,
  lead,
  cta,
  href,
  items,
}: {
  title: string;
  lead: string;
  cta: string;
  href: string;
  items: EquipmentTile[];
}) {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="text-4xl font-extrabold md:text-6xl lg:col-span-5">{title}</h2>
          <p className="max-w-xl text-lg text-court/80 lg:col-span-7">{lead}</p>
        </div>
        <div className="mt-12">
          <EquipmentGrid items={items} />
        </div>
        <ButtonLink href={href} variant="outline" className="mt-12">
          {cta}
        </ButtonLink>
      </Container>
    </section>
  );
}
