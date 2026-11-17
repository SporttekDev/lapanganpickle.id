import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/i18n/dictionaries";

/* Halaman 404 tidak tahu bahasa pengunjung, jadi tampil dalam dua bahasa. */
export default function NotFound() {
  const id = getDictionary("id").common;
  const en = getDictionary("en").common;

  return (
    <section className="py-24 md:py-32">
      <Container>
        <p className="font-display text-8xl font-bold leading-none text-line" aria-hidden="true">
          404
        </p>

        <div lang="id" className="mt-6">
          <h1 className="text-4xl font-extrabold md:text-6xl">{id.notFoundTitle}</h1>
          <p className="mt-4 max-w-xl text-lg text-court/80">{id.notFoundText}</p>
          <ButtonLink href="/" className="mt-8">
            {id.backHome}
          </ButtonLink>
        </div>

        <div lang="en" className="mt-14 border-t border-rule pt-8">
          <p className="font-display text-3xl font-bold uppercase">{en.notFoundTitle}</p>
          <p className="mt-2 max-w-xl text-court/80">{en.notFoundText}</p>
          <ButtonLink href="/en" variant="outline" className="mt-6">
            {en.backHome}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
