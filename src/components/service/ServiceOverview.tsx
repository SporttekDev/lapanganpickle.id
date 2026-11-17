import { LuCheck } from "react-icons/lu";
import { WhatsAppButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/* Isi utama halaman detail layanan: penjelasan, yang didapat, dan cocok untuk siapa. */
export function ServiceOverview({
  lead,
  includesTitle,
  includes,
  suitableTitle,
  suitable,
  book,
  message,
}: {
  lead: string;
  includesTitle: string;
  includes: string[];
  suitableTitle: string;
  suitable: string[];
  book: string;
  message: string;
}) {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="max-w-2xl text-xl leading-relaxed md:text-2xl">{lead}</p>
          <h2 className="mt-12 text-3xl font-extrabold md:text-4xl">{includesTitle}</h2>
          <ul className="mt-5 space-y-3">
            {includes.map((item) => (
              <li key={item} className="flex gap-3 text-lg">
                <LuCheck className="mt-1 size-5 shrink-0 text-line" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <WhatsAppButton size="lg" message={message} className="mt-10">
            {book}
          </WhatsAppButton>
        </div>
        <div className="lg:col-span-5">
          <h2 className="text-3xl font-extrabold md:text-4xl">{suitableTitle}</h2>
          <ul className="mt-5 border-b border-rule">
            {suitable.map((item) => (
              <li key={item} className="border-t border-rule py-4 font-display text-2xl font-bold uppercase">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
