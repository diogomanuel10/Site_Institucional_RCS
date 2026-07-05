"use client";

import { useState } from "react";
import type { Product } from "@/lib/data/products";
import { orderTeamOptions } from "@/lib/data/products";
import { formatPrice } from "@/lib/format";

type Status = "idle" | "sending" | "success" | "error";

export function OrderForm({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = new FormData(e.currentTarget);
    const payload = {
      productId: product.id,
      productName: product.name,
      size: form.get("size"),
      quantity: Number(form.get("quantity")),
      name: form.get("name"),
      contact: form.get("contact"),
      team: form.get("team") || undefined,
      pickup: form.get("pickup") === "on",
      notes: form.get("notes") || undefined,
    };

    try {
      const res = await fetch("/api/encomendas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Não foi possível registar a encomenda.");
        return;
      }
      setStatus("success");
      setOrderId(data.orderId ?? "");
      setMessage(data.message ?? "Encomenda registada!");
    } catch {
      setStatus("error");
      setMessage("Erro de ligação. Tenta novamente.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-3xl">
          ✓
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold uppercase text-cream">
          Encomenda registada
        </h3>
        {orderId && (
          <p className="mt-1 scoreboard text-gold">#{orderId}</p>
        )}
        <p className="mt-3 text-sm text-cream/70">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-md bg-gold px-5 py-2.5 font-display text-sm uppercase tracking-wide text-navy-deep"
        >
          Fechar
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="font-display text-xl font-semibold uppercase text-cream">
            {product.name}
          </h3>
          <p className="scoreboard text-gold">{formatPrice(product.price)}</p>
        </div>
        <span className="text-4xl" aria-hidden="true">
          {product.icon}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Tamanho" htmlFor="size">
          <select id="size" name="size" required className={inputCls}>
            {product.sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Quantidade" htmlFor="quantity">
          <input
            id="quantity"
            name="quantity"
            type="number"
            min={1}
            max={20}
            defaultValue={1}
            required
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Nome" htmlFor="name">
        <input id="name" name="name" type="text" required className={inputCls} />
      </Field>

      <Field label="Email ou telemóvel" htmlFor="contact">
        <input id="contact" name="contact" type="text" required className={inputCls} />
      </Field>

      <Field label="Escalão (opcional)" htmlFor="team">
        <select id="team" name="team" className={inputCls} defaultValue="">
          <option value="">—</option>
          {orderTeamOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Notas (opcional)" htmlFor="notes">
        <textarea id="notes" name="notes" rows={2} className={inputCls} />
      </Field>

      <label className="flex items-start gap-3 text-sm text-cream/80">
        <input
          type="checkbox"
          name="pickup"
          required
          className="mt-1 h-4 w-4 accent-gold"
        />
        <span>
          Confirmo que levanto e pago no pavilhão (MB WAY ou transferência). Sem
          pagamento online nesta fase.
        </span>
      </label>

      {status === "error" && (
        <p className="rounded-md bg-red-500/15 px-4 py-2 text-sm text-red-300">
          {message}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex-1 rounded-md bg-gold px-5 py-2.5 font-display text-sm uppercase tracking-wide text-navy-deep transition-colors hover:bg-gold-soft disabled:opacity-60"
        >
          {status === "sending" ? "A enviar…" : "Encomendar"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-white/15 px-5 py-2.5 font-display text-sm uppercase tracking-wide text-cream/80 hover:border-white/30"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "mt-1 w-full rounded-md border border-white/15 bg-navy-deep px-3 py-2 text-sm text-cream placeholder-cream/40 focus-visible:border-gold focus-visible:outline-none";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="font-display text-xs uppercase tracking-wide text-cream/60">
        {label}
      </span>
      {children}
    </label>
  );
}
