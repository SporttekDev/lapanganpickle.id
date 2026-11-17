import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/* "Layanan lainnya" di bawah halaman detail layanan. */
export function OtherServices({
  title,
  items,
  more,
  tone = "chalk",
}: {
  title: string;
  items: { slug: string; name: string; text: string; href: string }[];
  more: string;
  /** Warna latar section, supaya berselang-seling dengan section di atasnya. */
  tone?: "chalk" | "white";
}) {
  return (
    <section className={cn("py-20 md:py-28", tone === "chalk" ? "bg-chalk" : "bg-white")}>
      <Container>
        <h2 className="text-4xl font-extrabold md:text-6xl">{title}</h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.slug}
              className="group relative border-t-2 border-court pt-6 has-[a:focus-visible]:outline-[3px] has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ball"
            >
              <h3 className="text-3xl font-bold md:text-4xl">
                <Link href={item.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                  {item.name}
                </Link>
              </h3>
              <p className="mt-3 max-w-lg text-court/80">{item.text}</p>
              <span className="mt-5 inline-block border-b-2 border-ball pb-0.5 font-semibold">{more}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
