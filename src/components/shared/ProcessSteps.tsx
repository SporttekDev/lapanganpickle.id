import { Container } from "@/components/ui/Container";

/** Alur kerja. Ini memang urutan langkah, jadi bernomor. */
export function ProcessSteps({
  title,
  lead,
  steps,
}: {
  title: string;
  lead: string;
  steps: { title: string; text: string }[];
}) {
  return (
    <section className="bg-chalk py-20 md:py-28">
      <Container>
        <h2 className="text-4xl font-extrabold md:text-6xl">{title}</h2>
        <p className="mt-4 max-w-xl text-lg text-court/80">{lead}</p>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-court pt-5">
              <span className="font-display text-6xl font-bold leading-none text-line" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-4 text-2xl font-bold">{step.title}</h3>
              <p className="mt-2 text-court/80">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
