import { z } from "zod";
import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export function validateParams(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return next(new AppError(result.error.message, 404));
    }
    const data = result.data as { id: string };
    req.params.id = data.id;
    next();
  };
}
