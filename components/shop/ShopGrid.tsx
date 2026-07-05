"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";
import { OrderForm } from "./OrderForm";

export function ShopGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState<Product | null>(null);

  // Fechar com Escape e bloquear scroll do body enquanto o modal está aberto.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article
            key={p.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-panel"
          >
            <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-navy to-navy-deep text-6xl">
              <span aria-hidden="true">{p.icon}</span>
              {p.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-0.5 font-display text-[0.6rem] uppercase tracking-wide text-navy-deep">
                  {p.badge}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-semibold uppercase leading-tight text-cream">
                {p.name}
              </h3>
              <p className="mt-2 text-sm text-cream/70">{p.description}</p>
              <p className="mt-3 text-xs text-cream/50">
                Tamanhos: {p.sizes.join(" · ")}
              </p>
              <div className="mt-auto flex items-center justify-between pt-5">
                <span className="scoreboard text-2xl text-gold">
                  {formatPrice(p.price)}
                </span>
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className="rounded-md bg-gold px-4 py-2 font-display text-sm uppercase tracking-wide text-navy-deep transition-colors hover:bg-gold-soft"
                >
                  Encomendar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Encomendar ${active.name}`}
        >
          <button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-navy-deep/80 backdrop-blur-sm"
            onClick={() => setActive(null)}
          />
          <div className="relative z-10 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-gold/25 bg-navy-panel p-6 shadow-panel sm:p-8">
            <OrderForm product={active} onClose={() => setActive(null)} />
          </div>
        </div>
      )}
    </>
  );
}
