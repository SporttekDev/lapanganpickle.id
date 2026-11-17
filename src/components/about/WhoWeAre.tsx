import { LuBuilding2, LuMegaphone, LuPackage } from "react-icons/lu";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/* Ikon dipasangkan berdasarkan urutan: instalasi lapangan, equipment, portable court. */
const icons = [LuBuilding2, LuPackage, LuMegaphone];

export function WhoWeAre({
  title,
  heading,
  text,
  cta,
  href,
  items,
}: {
  title: string;
  heading: string;
  text: string;
  cta: string;
  href: string;
  items: { title: string; text: string }[];
}) {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <h2 className="text-4xl font-extrabold md:text-6xl">{title}</h2>
          <p className="mt-5 font-display text-3xl font-bold uppercase leading-tight text-line md:text-4xl">
            {heading}
          </p>
          <p className="mt-6 max-w-xl text-lg text-court/80">{text}</p>
          <ButtonLink href={href} className="mt-8">
            {cta}
          </ButtonLink>
        </div>
        <ul className="lg:col-span-6">
          {items.map((item, i) => {
            const Icon = icons[i] ?? LuBuilding2;
            return (
              <li key={item.title} className="flex gap-5 border-t border-rule py-7 first:border-t-0 first:pt-0">
                <Icon className="mt-1 size-9 shrink-0 text-line" aria-hidden="true" />
                <div>
                  <h3 className="text-3xl font-bold">{item.title}</h3>
                  <p className="mt-2 max-w-md text-court/80">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
