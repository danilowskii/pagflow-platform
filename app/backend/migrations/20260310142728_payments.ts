import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("payments", (table) => {
        table.uuid("id").primary();
        table.uuid("order_id").notNullable().references("id").inTable("orders").onDelete("CASCADE");
        table.string("payment_method").notNullable();
        table.jsonb("gateway_payload");
        table.enum("status", ["PENDING", "SUCCESS", "FAILED"]).defaultTo("PENDING").notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("payments");
}

