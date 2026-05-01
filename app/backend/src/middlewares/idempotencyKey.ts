import { type Request, type Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { IdempotencyKeyService } from "../modules/idempotency-keys/idempotencyKey.service.js";

export class IdempotencyKey {
  private idempotencyKeyService: IdempotencyKeyService;
  constructor() {
    this.idempotencyKeyService = new IdempotencyKeyService();
  }

  async verifyIdempotencyKey(req: Request, res: Response, next: NextFunction) {
    const key = req.headers["idempotency-key"] as string;
    if (req.method == "POST" && !key)
      return next(new AppError("Chave de idempotência não recebida", 422));
    try {
      const verification =
        await this.idempotencyKeyService.findIdempotencyKey(key);
      if (!verification) return next();
      return res.status(200).json({ ok: verification.response_payload });
    } catch (err) {
      next(new AppError("Erro ao conectar com o banco.", 400));
    }
  }
}
