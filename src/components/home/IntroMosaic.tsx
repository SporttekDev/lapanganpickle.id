import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

/* "Kontraktor pickleball terpercaya": teks di kiri, empat foto proyek di kanan. */
export function IntroMosaic({
  title,
  text,
  cta,
  href,
  images,
}: {
  title: string;
  text: string;
  cta: string;
  href: string;
  images: string[];
}) {
  return (
    <section className="bg-chalk py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-4xl font-extrabold md:text-6xl">{title}</h2>
          <p className="mt-6 max-w-xl text-lg text-court/80">{text}</p>
          <ButtonLink href={href} variant="outline" className="mt-8">
            {cta}
          </ButtonLink>
        </div>
        <div className="grid grid-cols-2 gap-3 pb-6 md:gap-4">
          {images.map((src, i) => (
            <div
              key={src}
              className={cn("relative aspect-[4/3] overflow-hidden rounded-lg bg-court-deep", i % 2 === 1 && "translate-y-6")}
            >
              <Photo src={src} alt="" sizes="(min-width: 1024px) 25vw, 50vw" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
