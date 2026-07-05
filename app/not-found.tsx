import Link from "next/link";
import { Crest } from "@/components/ui/Crest";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-content flex-col items-center justify-center px-5 py-20 text-center">
      <Crest className="h-16 w-auto" />
      <p className="mt-6 scoreboard text-6xl font-bold text-gold">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold uppercase text-cream">
        Página não encontrada
      </h1>
      <p className="mt-3 max-w-sm text-cream/60">
        A página que procuras pode ter sido movida ou já não existe.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-gold px-5 py-2.5 font-display text-sm uppercase tracking-wide text-navy-deep"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
