import { LuLayers, LuShieldCheck, LuUsers } from "react-icons/lu";
import { Container } from "@/components/ui/Container";

/* Ikon dipasangkan berdasarkan urutan: material, tim, garansi. */
const icons = [LuLayers, LuUsers, LuShieldCheck];

export function WhyUs({ title, items }: { title: string; items: { title: string; text: string }[] }) {
  return (
    <section className="bg-chalk py-20 md:py-28">
      <Container>
        <h2 className="text-4xl font-extrabold md:text-6xl">{title}</h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i] ?? LuLayers;
            return (
              <li key={item.title} className="border-t-2 border-court pt-6">
                <Icon className="size-9 text-line" aria-hidden="true" />
                <h3 className="mt-5 text-3xl font-bold">{item.title}</h3>
                <p className="mt-3 max-w-sm text-court/80">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
