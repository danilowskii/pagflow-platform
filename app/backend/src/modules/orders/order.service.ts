import { AppError } from "../../errors/AppError.js";
import { ProductRepository } from "../products/product.repository.js";
import { OrderRepository } from "./order.repository.js";
import { v7 as uuidv7 } from "uuid";
export class OrderService {
  private orderRepository: OrderRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.productRepository = new ProductRepository();
  }

  async postNewOrder(dto: { product_id: string; customer_id: string }) {
    const id = uuidv7();

    const amount_cents = await this.productRepository.getPrice(dto.product_id);
    if (!amount_cents)
      throw new AppError("Erro ao buscar valor do produto.", 400);
    const payload = {
      id,
      amount_cents: amount_cents.price_cents,
      status: "PENDING" as const,
      ...dto,
    };
    const result = await this.orderRepository.postNewOrder(payload);
    return result;
  }

  async findOrdersByCustomer(customer_id: string) {
    const result = await this.orderRepository.findOrdersByCustomer(customer_id);
    return result;
  }

  async findOrderById(order_id: string) {
    const result = await this.orderRepository.findOrderById(order_id);
    if (!result) throw new AppError("Ordem não encontrada.", 404);
    return result;
  }
}
