import { WhatsAppButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

/* Klaim "Official Brand Partner Laykold". Teksnya mengikuti situs lama, edit di dictionaries (home.laykold). */
export function LaykoldSection({
  title,
  subtitle,
  paragraphs,
  cta,
  message,
  image,
}: {
  title: string;
  subtitle: string;
  paragraphs: string[];
  cta: string;
  message: string;
  image: string;
}) {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-court-deep lg:col-span-6">
          <Photo src={image} alt="" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div className="lg:col-span-6">
          <h2 className="text-4xl font-extrabold md:text-5xl">{title}</h2>
          <p className="mt-4 font-display text-3xl font-bold uppercase text-line md:text-4xl">{subtitle}</p>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-xl text-lg text-court/80">
              {paragraph}
            </p>
          ))}
          <WhatsAppButton message={message} size="lg" className="mt-8">
            {cta}
          </WhatsAppButton>
        </div>
      </Container>
    </section>
  );
}
