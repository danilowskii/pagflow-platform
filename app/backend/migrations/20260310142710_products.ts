import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("products", (table) => {
        table.uuid("id").primary();
        table.string("name").notNullable();
        table.text("description").notNullable();
        table.integer("price_cents").notNullable();
        table.boolean("active").defaultTo(true).notNullable();
        table.string("currency").defaultTo("BRL").notNullable();
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("products");
}

