import { type Request, type Response, NextFunction, Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { OrderClientSchema } from "./order.types.js";
import { OrderController } from "./order.controller.js";
import { authenticate } from "../../middlewares/jwtVerify.js";

export const orderRouter: Router = Router();
const orderController = new OrderController();

orderRouter.post(
  "/order",
  authenticate,
  validate(OrderClientSchema),
  (req: Request, res: Response, next: NextFunction) => {
    orderController.postNewOrder(req, res, next);
  },
);
