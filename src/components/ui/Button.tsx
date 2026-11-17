import Link from "next/link";
import type { ReactNode } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type Variant = "solid" | "accent" | "outline" | "outline-light";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold leading-none transition-colors duration-150";

const variants: Record<Variant, string> = {
  solid: "bg-court text-white hover:bg-court-deep",
  accent: "bg-ball text-court hover:bg-white",
  outline: "border border-court/35 text-court hover:border-court hover:bg-court hover:text-white",
  "outline-light": "border border-white/55 text-white hover:bg-white hover:text-court",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-base",
  lg: "px-7 py-4 text-lg",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "solid",
  size = "md",
  external = false,
  icon,
  className,
  children,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {icon}
      {children}
    </Link>
  );
}

/** Tombol yang langsung membuka WhatsApp dengan pesan yang sudah terisi. */
export function WhatsAppButton({
  message,
  variant = "solid",
  size = "md",
  className,
  children,
}: {
  message: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <ButtonLink
      external
      href={waLink(message)}
      variant={variant}
      size={size}
      className={className}
      icon={<FaWhatsapp className="size-5 shrink-0" aria-hidden="true" />}
    >
      {children}
    </ButtonLink>
  );
}
