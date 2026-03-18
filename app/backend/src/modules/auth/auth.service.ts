import { v7 as uuidv7 } from "uuid";
import { CustomerRepository } from "../customers/customer.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { User, SafeUser } from "../customers/customer.types.js";

interface RegisterServiceDTO {
    name: string;
    email: string;
    password: string;
}

interface LoginServiceDTO {
    email: string;
    password: string;
}

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

    async register(dto: RegisterServiceDTO): Promise<RegisterResponse> {
        const existingUser = await this.customerRepository.findUserByEmail(dto.email);
        if (existingUser) {
            throw new Error("Já existe um usuário com esse e-mail.");
        }

        const passwordHash = await bcrypt.hash(dto.password, 12);
        const userId = uuidv7();

        const newUser: User = await this.customerRepository.createUser({
            id: userId,
            name: dto.name,
            email: dto.email,
            password_hash: passwordHash
        })

        const tokens = this.generateTokens(newUser.id);
        const { password_hash, ...safeUser } = newUser as SafeUser & { password_hash: string };
        return {user: safeUser, tokens};
    }

    private generateTokens(userId: string): AuthTokens {

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not defined");
    }

    if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
        throw new Error("JWT_REFRESH_TOKEN_SECRET not defined");
    }

    const accessToken = jwt.sign({sub: userId}, process.env.JWT_SECRET, {expiresIn: "15m"});
    const refreshToken = jwt.sign({sub: userId}, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: "7d"});

    return {accessToken, refreshToken};

    }

    async login(dto: LoginServiceDTO) {
        if (!dto.email || !dto.password) {
            throw new Error("Credenciais inválidas. ")
        }

        const existingUser = await this.customerRepository.findUserByEmail(dto.email)
        if (!existingUser) {
            throw new Error("Usuário não encontrado.")
        }

        const passwordVerification = await bcrypt.compare(dto.password, existingUser.password_hash)

        if (!passwordVerification) {
            throw new Error("Senha incorreta.")
        }
        
        const tokens = this.generateTokens(existingUser.id)
        const {password_hash: _, ...safeUser} = existingUser;

        return { user: safeUser, tokens };
    }
}