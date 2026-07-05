import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { orderSchema, type StoredOrder } from "@/lib/orders";
import { club } from "@/lib/data/club";

/**
 * Serverless function da loja (fase 1).
 *
 * Recebe uma encomenda do formulário, valida-a, grava-a no Upstash Redis para
 * consulta posterior e dispara um email via Resend. NUNCA enviar email do
 * browser — este é o único ponto onde as chaves são usadas.
 *
 * Sem pagamento online: a confirmação instrui o utilizador a pagar por MB WAY /
 * transferência e a levantar no pavilhão.
 */

export const runtime = "nodejs";

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function orderEmail(order: StoredOrder): string {
  return [
    `Nova encomenda na loja RCS (#${order.id})`,
    "",
    `Produto: ${order.productName}`,
    `Tamanho: ${order.size}`,
    `Quantidade: ${order.quantity}`,
    `Nome: ${order.name}`,
    `Contacto: ${order.contact}`,
    order.team ? `Escalão: ${order.team}` : "",
    order.notes ? `Notas: ${order.notes}` : "",
    "",
    `Recebida em ${new Date(order.createdAt).toLocaleString("pt-PT")}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const order: StoredOrder = {
    ...parsed.data,
    id: crypto.randomUUID().slice(0, 8),
    createdAt: new Date().toISOString(),
  };

  // 1) Registar no Redis para consulta posterior (não bloqueia se indisponível).
  const redis = getRedis();
  if (redis) {
    try {
      await redis.lpush("encomendas", JSON.stringify(order));
    } catch (err) {
      console.error("[encomendas] falha ao gravar no Redis:", err);
    }
  } else {
    console.warn("[encomendas] Redis não configurado — encomenda não persistida.");
  }

  // 2) Enviar email de notificação ao clube.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.ENCOMENDAS_FROM_EMAIL ?? "loja@realclubesenhorense.pt",
        to: process.env.ENCOMENDAS_TO_EMAIL ?? club.contact.email,
        subject: `Encomenda #${order.id} — ${order.productName}`,
        text: orderEmail(order),
      });
    } catch (err) {
      console.error("[encomendas] falha ao enviar email:", err);
    }
  } else {
    console.warn("[encomendas] Resend não configurado — email não enviado.");
  }

  // 3) Confirmação ao utilizador, com instruções de pagamento/levantamento.
  return NextResponse.json({
    ok: true,
    orderId: order.id,
    message:
      "Encomenda registada! Vamos confirmar por email/telemóvel. O pagamento é por MB WAY ou transferência e o levantamento no pavilhão.",
  });
}
