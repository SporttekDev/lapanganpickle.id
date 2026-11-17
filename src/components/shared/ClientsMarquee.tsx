import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { clients, type Client } from "@/data/clients";
import { cn } from "@/lib/utils";

/**
 * Section "Klien kami".
 *
 * - Klien masih sedikit: kartu logo statis, rata tengah. Tidak ada logo yang terulang.
 * - Klien banyak (sebanyak MARQUEE_MIN atau lebih): logo berjalan pelan seperti sebelumnya.
 *
 * Nama komponen dan file sengaja tidak diubah supaya Beranda dan About tidak perlu diedit.
 */
const MARQUEE_MIN = 10;

export function ClientsMarquee({ title }: { title: string }) {
  const useMarquee = clients.length >= MARQUEE_MIN;

  return (
    <section className="border-y border-rule bg-white py-14 md:py-16">
      <Container>
        <h2 className="text-3xl font-extrabold md:text-4xl">{title}</h2>
        {!useMarquee && <ClientGrid items={clients} />}
      </Container>
      {useMarquee && <ClientMarquee items={clients} />}
    </section>
  );
}

/** Kartu berukuran sama, baris terakhir otomatis rata tengah. 2 kolom di ponsel, 3 di tablet, 5 di layar lebar. */
function ClientGrid({ items }: { items: Client[] }) {
  return (
    <ul className="mt-8 flex flex-wrap justify-center gap-4">
      {items.map((client) => (
        <li
          key={client.name}
          className="flex h-28 basis-[calc(50%-0.5rem)] items-center justify-center rounded-lg border border-rule bg-white px-4 sm:basis-[calc(33.333%-0.667rem)] md:h-32 lg:basis-[calc(20%-0.8rem)]"
        >
          <Image
            src={client.logo}
            alt={client.name}
            width={client.width}
            height={client.height}
            className="h-auto max-h-16 w-auto max-w-full rounded-sm object-contain md:max-h-20"
          />
        </li>
      ))}
    </ul>
  );
}

/** Logo berjalan pelan. Berhenti saat disorot atau jika pengguna memilih mengurangi animasi. */
function ClientMarquee({ items }: { items: Client[] }) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee mt-8 overflow-hidden">
      <ul className="marquee-track flex w-max items-center gap-y-6">
        {doubled.map((client, i) => {
          const isCopy = i >= items.length;
          return (
            <li
              key={`${client.name}-${i}`}
              aria-hidden={isCopy ? true : undefined}
              className={cn("flex shrink-0 items-center pr-12", isCopy && "marquee-dup")}
            >
              <Image
                src={client.logo}
                alt={isCopy ? "" : client.name}
                width={client.width}
                height={client.height}
                className="h-16 w-auto rounded-sm"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}