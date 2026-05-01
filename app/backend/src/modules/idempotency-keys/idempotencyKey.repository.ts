import db from "../../db/index.js";
import { type IdempotencyKeyDTO } from "./idempotencyKey.schema.js";

export class IdempotencyKeyRepository {
  async findIdempotencyKey(key: string) {
    const result = await db("idempotency_keys")
      .where({ key: key })
      .select(["user_id", "request_hash", "response_payload", "status_code"])
      .first();
    if (!result) return null;
    return result;
  }

  async createIdempotencyKey(dto: IdempotencyKeyDTO) {
    const result = await db("idempotency_keys")
      .insert({
        key: dto.key,
        user_id: dto.user_id,
        request_hash: dto.request_hash,
        response_payload: dto.response_payload,
        status_code: dto.status_code,
      })
      .returning("*");
    return result;
  }

  async clearExpiredIdempotencyKeys() {
    
  }
}
