import { z } from "zod";

export const idempotencyKeySchema = z.object({
  key: z.uuid(),
  user_id: z.uuid(),
  request_hash: z.string(),
  response_payload: z.json(),
  status_code: z.enum(["PROCESSING", "COMPLETED"]),
});

export type IdempotencyKeyDTO = z.infer<typeof idempotencyKeySchema>;
