import { NextFunction, Router, type Request, type Response } from "express";
import { AuthController } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.post(
  "/auth/register",
  validate(registerSchema),
  (req: Request, res: Response, next: NextFunction) =>
    authController.register(req, res, next),
);
authRouter.post(
  "/auth/login",
  validate(loginSchema),
  (req: Request, res: Response, next: NextFunction) =>
    authController.login(req, res, next),
);

export { authRouter };
