export interface User {
    id: string;
    name: string;
    email: string;
    password_hash: string;
}

export type SafeUser = Omit<User, "password_hash">;