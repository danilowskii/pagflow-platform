import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { ProductController } from "./product.controller.js";
import { validateParams } from "../../middlewares/validateParams.js";
import { productParamsSchema } from "./product.schema.js";

const productRouter: Router = Router();
const productController = new ProductController();

productRouter.get(
  "/products",
  (req: Request, res: Response, next: NextFunction) =>
    productController.selectProducts(req, res, next),
);

productRouter.get(
  "/products/:id",
  validateParams(productParamsSchema),
  (req: Request, res: Response, next: NextFunction) =>
    productController.findProduct(req, res, next),
);

export { productRouter };
