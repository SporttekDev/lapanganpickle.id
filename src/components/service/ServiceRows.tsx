import { ButtonLink, WhatsAppButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

export type ServiceRowItem = {
  slug: string;
  name: string;
  text: string;
  image: string;
  href: string;
  waMessage: string;
};

/* Halaman Layanan: tiga layanan berselang-seling foto kiri dan kanan. */
export function ServiceRows({
  items,
  more,
  book,
}: {
  items: ServiceRowItem[];
  more: string;
  book: string;
}) {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <ul className="space-y-16 md:space-y-24">
          {items.map((item, i) => {
            const flipped = i % 2 === 1;
            return (
              <li key={item.slug} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden rounded-lg bg-court-deep lg:col-span-7",
                    flipped && "lg:order-2",
                  )}
                >
                  <Photo src={item.image} alt="" sizes="(min-width: 1024px) 58vw, 100vw" />
                </div>
                <div className={cn("lg:col-span-5", flipped && "lg:order-1")}>
                  <h2 className="text-4xl font-extrabold md:text-5xl">{item.name}</h2>
                  <p className="mt-4 text-lg text-court/80">{item.text}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href={item.href}>
                      {more}
                      <span className="sr-only"> {item.name}</span>
                    </ButtonLink>
                    <WhatsAppButton variant="outline" message={item.waMessage}>
                      {book}
                    </WhatsAppButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
