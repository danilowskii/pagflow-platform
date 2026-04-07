import { AppError } from "../../errors/AppError.js";
import { ProductRepository } from "../products/product.repository.js";
import { OrderRepository } from "./order.repository.js";
import { Orders } from "./order.types.js";
import jwt from "jsonwebtoken";

export class OrderService {
  private orderRepository: OrderRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.productRepository = new ProductRepository();
  }

  async postNewOrder(dto: Orders) {
    if (!dto) throw new AppError("Dados da ordem não recebidos", 400);
    const getPrice = await this.productRepository.getPrice(dto.product_id);
    if (!getPrice) throw new AppError("Erro ao buscar valor do produto.", 400);

    const result = await this.orderRepository.postNewOrder(dto, getPrice);
    return result;
  }

  async findOrdersByCustomer(customer_id: string) {
    if (!customer_id) throw new AppError("ID do usuário não recebido.", 400);

    const result = await this.orderRepository.findOrdersByCustomer(customer_id);
    return result;
  }

  async findOrderById(order_id: string) {
    if (!order_id) throw new AppError("ID da ordem não recebido.", 400);

    const result = await this.orderRepository.findOrderById(order_id);
    return result;
  }
}
