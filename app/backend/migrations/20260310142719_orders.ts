import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("orders", (table) => {
        table.uuid("id").primary();
        table.uuid("customer_id").notNullable().references("id").inTable("customers").onDelete("CASCADE");
        table.uuid("product_id").notNullable().references("id").inTable("products").onDelete("CASCADE");
        table.integer("amount_cents").notNullable();
        table.enum("status", ["PENDING", "PAID", "FAILED"]).defaultTo("PENDING").notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("orders");
}

