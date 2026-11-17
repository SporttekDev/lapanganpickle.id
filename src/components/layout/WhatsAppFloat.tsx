import { FaWhatsapp } from "react-icons/fa6";
import { waLink } from "@/lib/site";

/** Tombol WhatsApp yang selalu terlihat di pojok kanan bawah. */
export function WhatsAppFloat({ label, message }: { label: string; message: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-line text-white ring-4 ring-white transition-colors hover:bg-court sm:bottom-6 sm:right-6"
    >
      <FaWhatsapp className="size-7" aria-hidden="true" />
    </a>
  );
}
