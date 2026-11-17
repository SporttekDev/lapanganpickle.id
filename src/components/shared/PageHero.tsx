import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

/** Banner judul untuk halaman dalam. Setiap halaman punya tepat satu <h1> di sini. */
export function PageHero({ title, lead, image }: { title: string; lead?: string; image: string }) {
  return (
    <section data-surface="dark" className="relative isolate overflow-hidden bg-court-deep text-white">
      <Photo src={image} alt="" sizes="100vw" priority className="opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-r from-court-deep/95 via-court-deep/75 to-court-deep/30" />
      <Container className="relative py-20 md:py-28">
        <h1 className="max-w-4xl text-5xl font-extrabold sm:text-6xl md:text-7xl">{title}</h1>
        {lead ? <p className="mt-5 max-w-xl text-lg text-white/85 md:text-xl">{lead}</p> : null}
      </Container>
    </section>
  );
}
