import { Container } from "@/components/ui/Container";

/* Angka kepercayaan. Isi di src/i18n/dictionaries (home.stats). Hanya "50+ lapangan" yang angka asli. */
export function StatsStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <section className="bg-white">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse justify-end border-b border-rule py-8 pr-4 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="mt-2 max-w-[16rem] text-sm leading-snug text-court/75 md:text-base">{stat.label}</dt>
              <dd className="font-display text-5xl font-bold leading-none md:text-6xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
