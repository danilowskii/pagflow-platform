import db from "../../db/index.js";
import { Orders } from "./order.types.js";

export class OrderRepository {
  async postNewOrder(payload: Orders, price: number) {
    const [order] = await db("orders")
      .insert({
        id: payload.id,
        customer_id: payload.customer_id,
        product_id: payload.product_id,
        amount_cents: price,
        status: payload.status,
      })
      .returning("*");

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
