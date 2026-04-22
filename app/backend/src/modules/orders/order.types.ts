import z from "zod";

const OrderDBSchema = z.object({
  id: z.uuid(),
  customer_id: z.uuid(),
  product_id: z.uuid(),
  amount_cents: z.int(),
  status: z.enum(["PENDING", "PAID", "FAILED"]),
});

export const OrderClientSchema = z.object({
  product_id: z.uuid(),
});

export type OrderDBDTO = z.infer<typeof OrderDBSchema>;
export type OrderClientDTO = z.infer<typeof OrderClientSchema>;
