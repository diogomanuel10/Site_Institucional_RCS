import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide text-sm font-semibold rounded-md px-5 py-2.5 transition-colors focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-navy-deep hover:bg-gold-soft",
  ghost: "text-cream hover:text-gold",
  outline:
    "border border-gold/60 text-cream hover:border-gold hover:text-gold",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & Partial<ComponentProps<"button">>) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http");
    return (
      <Link
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
