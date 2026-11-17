import { LuPlus } from "react-icons/lu";

/** Daftar FAQ memakai <details> bawaan browser: bisa dibuka lewat keyboard, tanpa JavaScript. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-rule border-y border-rule">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <LuPlus
              className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-3xl pb-6 text-court/80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
