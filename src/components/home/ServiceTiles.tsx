import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

export type ServiceTile = {
  slug: string;
  name: string;
  text: string;
  image: string;
  href: string;
};

/* Tiga layanan sebagai ubin foto. Seluruh ubin bisa diklik. */
export function ServiceTiles({
  title,
  lead,
  items,
  more,
}: {
  title: string;
  lead: string;
  items: ServiceTile[];
  more: string;
}) {
  return (
    <section className="bg-white pb-20 pt-8 md:pb-28 md:pt-12">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold md:text-6xl">{title}</h2>
          <p className="mt-4 text-lg text-court/80">{lead}</p>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.slug}
              data-surface="dark"
              className="group relative isolate aspect-[4/5] overflow-hidden rounded-lg bg-court-deep text-white has-[a:focus-visible]:outline-[3px] has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ball"
            >
              <Photo
                src={item.image}
                alt=""
                sizes="(min-width: 768px) 33vw, 100vw"
                className="transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-court-deep via-court-deep/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <h3 className="text-3xl font-bold md:text-4xl">
                  <Link href={item.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                    {item.name}
                  </Link>
                </h3>
                <p className="mt-3 text-white/85">{item.text}</p>
                <span className="mt-5 inline-block border-b-2 border-ball pb-0.5 font-semibold">{more}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
