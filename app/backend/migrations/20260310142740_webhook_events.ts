import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("webhook_events", (table) => {
        table.uuid("id").primary();
        table.string("event_type").notNullable();
        table.jsonb("payload").notNullable();
        table.boolean("processed").defaultTo(false).notNullable();
        table.integer("attempts").defaultTo(0).notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("webhook_events");
}

