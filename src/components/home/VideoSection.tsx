import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/lib/site";

/*
  Video pop-up event. Sumbernya diatur di src/lib/site.ts (site.video.src).
  Selama src kosong, yang tampil hanya gambar poster.
*/
export function VideoSection({
  title,
  text,
  cta,
  href,
}: {
  title: string;
  text: string;
  cta: string;
  href: string;
}) {
  const { src, poster } = site.video;
  const type = src.endsWith(".webm") ? "video/webm" : "video/mp4";

  return (
    <section data-surface="dark" className="bg-court-deep py-20 text-white md:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 className="text-4xl font-extrabold md:text-6xl">{title}</h2>
          <p className="mt-5 max-w-md text-lg text-white/80">{text}</p>
          <ButtonLink href={href} variant="accent" size="lg" className="mt-8">
            {cta}
          </ButtonLink>
        </div>
        <div className="lg:col-span-7">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
            {src ? (
              <video className="size-full object-cover" controls playsInline preload="metadata" poster={poster}>
                <source src={src} type={type} />
              </video>
            ) : (
              <Photo src={poster} alt="" sizes="(min-width: 1024px) 58vw, 100vw" />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
