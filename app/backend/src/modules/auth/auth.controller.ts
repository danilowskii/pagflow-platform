import { AuthService } from "./auth.service.js";
import type { Request, Response } from "express";

interface RegisterControllerDTO {
    name: string;
    email: string;
    password: string;
}

interface LoginControllerDTO {
    email: string;
    password: string;
}

export class AuthController {
    private authService: AuthService;
    
    constructor() {
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response) {
        const dto: RegisterControllerDTO = req.body;
        try {
            const result = await this.authService.register(dto);
            return res.status(201).json({"Usuário criado:": result});
        } catch (error: any) {
            console.error("DEBUG SQL/SERVICE:", error.message);
            return res.status(400).json({error: "Erro ao criar usuário."});
    }
    } 

    async login(req: Request, res: Response) {
        const dto: LoginControllerDTO = req.body;
        try {
            const result = await this.authService.login(dto);
            return res.status(200).json(result)
        } catch (error) {
            return res.status(401).json({"message": "Credenciais inválidas."})
        }
    }
}