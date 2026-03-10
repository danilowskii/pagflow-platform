export const dbConfig = {
    client: "pg",
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env['DB_SSL'] ? { rejectUnauthorized: false } : false,
    }
}