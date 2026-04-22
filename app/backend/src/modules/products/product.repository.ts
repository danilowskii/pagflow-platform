import db from "../../db/index.js";

export class ProductRepository {
  async selectProducts() {
    const products = await db
      .select("id", "name", "description", "price_cents", "currency")
      .from("products")
      .where({ active: true });
    return products;
  }

  async findProduct(id: string) {
    const product = await db
      .select("id", "name", "description", "price_cents", "currency")
      .from("products")
      .where({ id: id })
      .first();
    return product;
  }

  async getPrice(procut_id: string) {
    const result = await db
      .select("price_cents")
      .from("products")
      .where({ id: procut_id })
      .first();
    return result;
  }
}
