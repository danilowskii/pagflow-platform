import { z } from "zod";

export const productParamsSchema = z.object({
  id: z.uuid(),
});
