"use client";

import Link from "next/link";
import { useState } from "react";
import { Crest } from "@/components/ui/Crest";
import { Button } from "@/components/ui/Button";
import { club } from "@/lib/data/club";

const links = [
  { label: "Notícias", href: "/noticias" },
  { label: "Jogos", href: "/#jogos" },
  { label: "Equipas", href: "/#equipas" },
  { label: "Iniciativas", href: "/#iniciativas" },
  { label: "Loja", href: "/loja" },
  { label: "Clube", href: "/#clube" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy-deep/90 backdrop-blur">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-content items-center justify-between px-5 py-3 sm:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Crest className="h-10 w-auto" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold uppercase tracking-wide text-cream">
              {club.shortName}
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-gold-soft">
              {club.sport}
            </span>
          </span>
        </Link>

        {/* Links — desktop */}
        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-display text-sm uppercase tracking-wide text-cream/80 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="/loja#socio" variant="primary">
            Sê sócio
          </Button>
        </div>

        {/* Hambúrguer — mobile */}
        <button
          type="button"
          className="flex items-center rounded-md p-2 text-cream lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">
            {open ? "Fechar menu" : "Abrir menu"}
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div id="menu-mobile" className="border-t border-white/5 lg:hidden">
          <ul className="mx-auto flex max-w-content flex-col px-5 py-2 sm:px-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3 font-display text-base uppercase tracking-wide text-cream/90 hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Button
                href="/loja#socio"
                variant="primary"
                className="w-full"
              >
                Sê sócio
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
