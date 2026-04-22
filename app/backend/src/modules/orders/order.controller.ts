import { type Request, type Response, NextFunction } from "express";
import { OrderService } from "./order.service.js";
import { AppError } from "../../errors/AppError.js";

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async postNewOrder(req: Request, res: Response, next: NextFunction) {
    const product_id = req.body.product_id;
    const customer_id = req.user!.id;

    try {
      const result = await this.orderService.postNewOrder({
        product_id,
        customer_id,
      });
      res.status(201).json({ "Ordem criada com sucesso.": result });
    } catch (error) {
      next(error);
    }
  }

  async findOrdersByCustomer(req: Request, res: Response, next: NextFunction) {
    const customer_id = req.user?.id;
    if (!customer_id) {
      return next(new AppError("ID não recebido.", 400));
    }

    try {
      const result = await this.orderService.findOrdersByCustomer(customer_id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findOrderById(req: Request, res: Response, next: NextFunction) {
    const order_id = req.params.id as string;
    if (!order_id) {
      return next(new AppError("ID da ordem não recebido.", 400));
    }

    try {
      const result = await this.orderService.findOrderById(order_id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
