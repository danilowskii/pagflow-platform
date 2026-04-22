import db from "../../db/index.js";
import { OrderDBDTO } from "./order.types.js";

export class OrderRepository {
  async postNewOrder(payload: OrderDBDTO) {
    const [order] = await db("orders")
      .insert({
        id: payload.id,
        customer_id: payload.customer_id,
        product_id: payload.product_id,
        amount_cents: payload.amount_cents,
        status: payload.status,
      })
      .returning(["customer_id", "product_id", "amount_cents", "status"]);

    return order;
  }

  async findOrdersByCustomer(id: string) {
    const result = await db("orders")
      .where({ customer_id: id })
      .select("product_id", "amount_cents", "status", "created_at");
    return result;
  }

  async findOrderById(order_id: string) {
    const result = await db("orders")
      .where({ id: order_id })
      .select("product_id", "amount_cents", "status", "created_at")
      .first();
    return result;
  }
}
