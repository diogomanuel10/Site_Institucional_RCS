import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/data/products";
import { club } from "@/lib/data/club";

export const metadata: Metadata = {
  title: "Loja",
  description:
    "Loja oficial do Real Clube Senhorense. Encomenda equipamento e artigos do clube com levantamento no pavilhão.",
};

export default function ShopPage() {
  return (
    <>
      <section className="border-b border-white/10 bg-navy-deep">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <p className="eyebrow">Cores do clube</p>
          <h1 className="section-title mt-2 text-cream">Loja oficial</h1>
          <p className="mt-4 max-w-xl text-cream/70">
            Escolhe o teu artigo e encomenda online. Sem pagamento no site:
            confirmamos contigo e o pagamento é por MB WAY ou transferência, com
            levantamento no pavilhão.
          </p>
        </div>
      </section>

      <section className="bg-navy">
        <div className="mx-auto max-w-content px-5 py-14 sm:px-8 sm:py-16">
          <ShopGrid products={products} />
        </div>
      </section>

      {/* Bloco Sê sócio */}
      <section id="socio" className="scroll-mt-24 bg-navy-panel">
        <div className="mx-auto max-w-content px-5 py-16 sm:px-8 sm:py-20">
          <div className="gold-rule mb-10" />
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">Faz parte</p>
              <h2 className="section-title mt-2 text-cream">Sê sócio do RCS</h2>
              <p className="mt-4 max-w-lg text-cream/70">
                Apoia o clube, entra de graça nos jogos em casa e ajuda a
                formar os atletas de amanhã. Fala connosco para te tornares
                sócio.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href={`mailto:${club.contact.email}?subject=Quero ser sócio do RCS`}>
                Quero ser sócio
              </Button>
              <Button href={`tel:${club.contact.phone.replace(/\s/g, "")}`} variant="outline">
                Ligar ao clube
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
