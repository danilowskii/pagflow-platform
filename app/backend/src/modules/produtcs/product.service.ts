import { AppError } from "../../errors/AppError.js";
import { ProductRepository } from "./product.repository.js";
import { Product, ProductDB } from "./product.types.js";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async selectProducts() {
    const result = await this.productRepository.selectProduct();
    return result;
  }

  async findProduct(id: string) {
    const result = await this.productRepository.findProduct(id);
    if (!result) {
      throw new AppError("Produto não encontrado.", 404);
    }
    return result;
  }
}
