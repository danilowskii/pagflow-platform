import { AuthService } from "./auth.service.js";
import type { Request, Response, NextFunction } from "express";
import { type RegisterDTO, type LoginDTO } from "./auth.schema.js";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const dto: RegisterDTO = req.body;
    try {
      const result = await this.authService.register(dto);
      return res.status(201).json({ "Usuário criado:": result });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const dto: LoginDTO = req.body;
    try {
      const result = await this.authService.login(dto);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
