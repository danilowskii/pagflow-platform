import db from "../../db/index.js";

export class ProductRepository {
  async selectProduct() {
    const products = await db
      .select("id", "name", "description", "price_cents", "currency")
      .from("products")
      .where({ active: true });
    return products;
  }

  async findProduct(id: string) {
    const product = await db("products")
      .where({ id: id, active: true })
      .first();
    return product;
  }
}
