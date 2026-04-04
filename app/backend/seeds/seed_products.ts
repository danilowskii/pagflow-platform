import type { Knex } from "knex";
import { v7 as uuidv7 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
  await knex("products").del();
  await knex("products").insert([
    {
      id: uuidv7(),
      name: "livro 1",
      description: "descricao livro 1",
      price_cents: 10,
      currency: "BRL",
      active: true,
    },
    {
      id: uuidv7(),
      name: "livro 2",
      description: "descricao livro 2",
      price_cents: 10,
      currency: "BRL",
      active: true,
    },
    {
      id: uuidv7(),
      name: "livro 3",
      description: "descricao livro 3",
      price_cents: 10,
      currency: "BRL",
      active: true,
    },
    {
      id: uuidv7(),
      name: "livro 4",
      description: "descricao livro 4",
      price_cents: 10,
      currency: "BRL",
      active: false,
    },
  ]);
}
