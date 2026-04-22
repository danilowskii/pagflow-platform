import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";
import { type Request, type Response, type NextFunction } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("Token não fornecido.", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { id: decoded.sub as string };
    next();
  } catch (error) {
    next(new AppError("Token inválido.", 401));
  }
}
