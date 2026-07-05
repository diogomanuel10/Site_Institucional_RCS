import Link from "next/link";
import { Crest } from "@/components/ui/Crest";
import { club } from "@/lib/data/club";

const columns = [
  {
    title: "Clube",
    links: [
      { label: "Notícias", href: "/noticias" },
      { label: "Equipas", href: "/#equipas" },
      { label: "Iniciativas", href: "/#iniciativas" },
      { label: "Sê sócio", href: "/loja#socio" },
    ],
  },
  {
    title: "Desporto",
    links: [
      { label: "Jogos & resultados", href: "/#jogos" },
      { label: "Loja oficial", href: "/loja" },
      { label: "O clube", href: "/#clube" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-deep text-cream">
      <div className="gold-rule" />
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <Crest className="h-11 w-auto" />
            <span className="font-display text-xl font-semibold uppercase tracking-wide">
              {club.shortName}
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            {club.name}. {club.sport} na {club.location}.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="eyebrow">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/75 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h3 className="eyebrow">Contactos</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
            <li>
              <a href={`mailto:${club.contact.email}`} className="hover:text-gold">
                {club.contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${club.contact.phone.replace(/\s/g, "")}`} className="hover:text-gold">
                {club.contact.phone}
              </a>
            </li>
            <li className="text-cream/60">{club.contact.address}</li>
          </ul>
          <div className="mt-5 flex gap-4 text-sm">
            {club.social.instagram && (
              <a href={club.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                Instagram
              </a>
            )}
            {club.social.facebook && (
              <a href={club.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-content flex-col gap-2 px-5 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {club.name}. Todos os direitos reservados.
          </p>
          <p>Dados desportivos fornecidos pelo RCSGestão.</p>
        </div>
      </div>
    </footer>
  );
}
