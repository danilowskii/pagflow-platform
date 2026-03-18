import { Router } from "express";
import { type Request, type Response } from "express";
import { AuthController } from "./auth.controller.js"

const authRouter: Router = Router();
const authController = new AuthController()

authRouter.post("/auth/register", (req: Request, res: Response) => authController.register(req, res))
authRouter.post("/auth/login", (req: Request, res: Response) => authController.login(req , res))

export {authRouter}


