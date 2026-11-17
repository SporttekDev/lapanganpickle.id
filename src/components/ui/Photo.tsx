import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Foto yang mengisi penuh kotak induknya.
 * Induk harus `relative` dan punya ukuran (mis. `aspect-[4/3]`).
 */
export function Photo({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
