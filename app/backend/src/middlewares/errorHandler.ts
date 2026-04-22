import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ err: err.message });
  } else {
    res.status(500).json({ erro: "Erro inesperado." });
  }
}
