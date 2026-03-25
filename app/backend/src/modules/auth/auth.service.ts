import { v7 as uuidv7 } from "uuid";
import { CustomerRepository } from "../customers/customer.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { User, SafeUser } from "../customers/customer.types.js";
import { AppError } from "../../errors/AppError.js";
import { type RegisterDTO, type LoginDTO } from "./auth.schema.js";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface RegisterResponse {
  user: SafeUser;
  tokens: AuthTokens;
}

export class AuthService {
  private customerRepository: CustomerRepository;

  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  async register(dto: RegisterDTO): Promise<RegisterResponse> {
    const existingUser = await this.customerRepository.findUserByEmail(
      dto.email,
    );
    if (existingUser) {
      throw new AppError("Já existe um usuário com esse e-mail.", 409);
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const userId = uuidv7();

    const newUser: User = await this.customerRepository.createUser({
      id: userId,
      name: dto.name,
      email: dto.email,
      password_hash: passwordHash,
    });

    const tokens = this.generateTokens(newUser.id);
    const { password_hash, ...safeUser } = newUser as SafeUser & {
      password_hash: string;
    };
    return { user: safeUser, tokens };
  }

  private generateTokens(userId: string): AuthTokens {
    if (!process.env.JWT_SECRET) {
      throw new AppError("JWT_SECRET not defined", 500);
    }

    if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
      throw new AppError("JWT_REFRESH_TOKEN_SECRET not defined", 500);
    }

    const accessToken = jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { sub: userId },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    return { accessToken, refreshToken };
  }

  async login(dto: LoginDTO) {
    const existingUser = await this.customerRepository.findUserByEmail(
      dto.email,
    );
    if (!existingUser) {
      throw new AppError("Credenciais inválidas.", 401);
    }

    const passwordVerification = await bcrypt.compare(
      dto.password,
      existingUser.password_hash,
    );

    if (!passwordVerification) {
      throw new AppError("Credenciais inválidas. ", 401);
    }

    const tokens = this.generateTokens(existingUser.id);
    const { password_hash: _, ...safeUser } = existingUser;

    return { user: safeUser, tokens };
  }
}
