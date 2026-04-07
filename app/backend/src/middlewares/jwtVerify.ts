import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError.js";

const token = req.headers.authorization?.split(" ")[1];

if (!token) throw new AppError("Token não fornecido.", 401);
const decoded = jwt.verify(token, process.env.JWT_SECRET);
