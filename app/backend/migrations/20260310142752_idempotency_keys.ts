import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("idempotency_keys", (table) => {
        table.uuid("key").primary();
        table.uuid("user_id").notNullable().references("id").inTable("customers").onDelete("CASCADE");
        table.string("request_hash").notNullable();
        table.jsonb("response_payload")
        table.enum("status_code", ["ACTIVE", "EXPIRED"]).defaultTo("ACTIVE").notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("idempotency_keys");
}

