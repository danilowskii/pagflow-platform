import db from "../../db/index.js";

export class CustomerRepository {
    async findUserByEmail(email: string) {
        const user = await db("customers").where({email}).first();
        return user;
    }

    async createUser(dto: { id: string; name: string; email: string; password_hash: string }) {
        const [user] = await db("customers").insert(dto).returning("*");
        return user;
    }
    
}