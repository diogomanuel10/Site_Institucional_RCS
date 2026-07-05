import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

export function ShopPreview() {
  const preview = products.slice(0, 4);

  return (
    <Section id="loja" tone="navy">
      <SectionHeader
        eyebrow="Cores do clube"
        title="Loja oficial"
        action={
          <Button href="/loja" variant="ghost">
            Ver loja completa →
          </Button>
        }
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {preview.map((p) => (
          <article
            key={p.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-panel"
          >
            <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-navy to-navy-deep text-5xl">
              <span aria-hidden="true">{p.icon}</span>
              {p.badge && (
                <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-0.5 font-display text-[0.6rem] uppercase tracking-wide text-navy-deep">
                  {p.badge}
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-display text-base font-semibold uppercase leading-tight text-cream">
                {p.name}
              </h3>
              <p className="mt-auto pt-3 scoreboard text-lg text-gold">
                {formatPrice(p.price)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
