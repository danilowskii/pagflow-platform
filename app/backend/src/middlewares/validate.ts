import { z } from "zod";
import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new AppError(result.error.message, 400));
    }
    req.body = result.data;
    next();
  };
}
