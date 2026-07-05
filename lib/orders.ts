import { z } from "zod";

/** Esquema de validação de uma encomenda (fase 1 — sem pagamento online). */
export const orderSchema = z.object({
  productId: z.string().min(1, "Produto em falta."),
  productName: z.string().min(1),
  size: z.string().min(1, "Escolhe um tamanho."),
  quantity: z.coerce.number().int().min(1).max(20),
  name: z.string().min(2, "Indica o teu nome."),
  contact: z
    .string()
    .min(6, "Indica um email ou telemóvel válido.")
    .max(120),
  team: z.string().optional(),
  pickup: z.literal(true, {
    errorMap: () => ({ message: "Confirma o levantamento no pavilhão." }),
  }),
  notes: z.string().max(500).optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;

export interface StoredOrder extends OrderInput {
  id: string;
  createdAt: string;
}
