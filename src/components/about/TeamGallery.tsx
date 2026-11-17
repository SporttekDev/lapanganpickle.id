import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

/* Empat foto tim di lapangan. Foto di src/data/images.ts (teamImages), keterangan di dictionaries (about.team.captions). */
export function TeamGallery({
  title,
  images,
  captions,
}: {
  title: string;
  images: string[];
  captions: string[];
}) {
  return (
    <section className="bg-chalk py-20 md:py-28">
      <Container>
        <h2 className="text-4xl font-extrabold md:text-6xl">{title}</h2>
        <ul className="mt-12 grid grid-cols-2 gap-4 pb-8 lg:grid-cols-4 lg:gap-5">
          {images.map((src, i) => (
            <li key={src} className={cn(i % 2 === 1 && "lg:translate-y-8")}>
              <figure>
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-court-deep">
                  <Photo src={src} alt={captions[i] ?? ""} sizes="(min-width: 1024px) 25vw, 50vw" />
                </div>
                <figcaption className="mt-3 text-court/75">{captions[i]}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
