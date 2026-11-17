import { Photo } from "@/components/ui/Photo";

export type EquipmentTile = {
  key: string;
  name: string;
  text: string;
  image: string;
};

/* Lima perlengkapan: vinyl, bleacher, net, scoreboard, mesin pelontar. Dipakai di beranda dan halaman layanan. */
export function EquipmentGrid({ items }: { items: EquipmentTile[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
      {items.map((item) => (
        <li key={item.key}>
          <div className="relative aspect-square overflow-hidden rounded-lg bg-chalk">
            <Photo src={item.image} alt="" sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw" />
          </div>
          <h3 className="mt-4 text-2xl font-bold">{item.name}</h3>
          <p className="mt-1 text-sm text-court/75 md:text-base">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
