import { AppError } from "../../errors/AppError.js";
import { IdempotencyKeyRepository } from "./idempotencyKey.repository.js";
import { IdempotencyKeyDTO } from "./idempotencyKey.schema.js";

export class IdempotencyKeyService {
  private idempotencyKeyRepository: IdempotencyKeyRepository;
  constructor() {
    this.idempotencyKeyRepository = new IdempotencyKeyRepository();
  }

  async findIdempotencyKey(key: string) {
    const result = await this.idempotencyKeyRepository.findIdempotencyKey(key);
    if (result.status_code == "ACTIVE")
      throw new AppError("Requisition in progress.", 409);
    return result;
  }

  async createIdempotencyKey(dto: IdempotencyKeyDTO) {
    const result =
      await this.idempotencyKeyRepository.createIdempotencyKey(dto);
    return result;
  }

  async clearExpiredIdempotencyKeys() {
    const result = "";
  }
}
