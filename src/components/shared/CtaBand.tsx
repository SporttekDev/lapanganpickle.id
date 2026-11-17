import { Container } from "@/components/ui/Container";
import { CourtLines } from "@/components/ui/CourtLines";
import { WhatsAppButton } from "@/components/ui/Button";

/** Ajakan terakhir di bawah halaman: satu pesan, satu tombol WhatsApp. */
export function CtaBand({
  title,
  text,
  button,
  message,
}: {
  title: string;
  text: string;
  button: string;
  message: string;
}) {
  return (
    <section data-surface="dark" className="relative isolate overflow-hidden bg-court text-white">
      <CourtLines className="pointer-events-none absolute -right-28 top-1/2 hidden w-[760px] -translate-y-1/2 text-white/10 md:block" />
      <Container className="relative flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold md:text-6xl">{title}</h2>
          <p className="mt-4 text-lg text-white/80">{text}</p>
        </div>
        <WhatsAppButton variant="accent" size="lg" message={message} className="shrink-0">
          {button}
        </WhatsAppButton>
      </Container>
    </section>
  );
}
