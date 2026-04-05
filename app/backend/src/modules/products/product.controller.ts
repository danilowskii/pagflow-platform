import { ProductService } from "./product.service.js";
import { type Request, Response, NextFunction } from "express";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async selectProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.productService.selectProducts();
      return res.status(200).json({ Produtos: result });
    } catch (error) {
      next(error);
    }
  }

  async findProduct(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.id as string;
    try {
      const result = await this.productService.findProduct(productId);
      return res.status(200).json({ "Dados do produto": result });
    } catch (error) {
      next(error);
    }
  }
}
