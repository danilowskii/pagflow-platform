import request from "supertest";
import db from "../db/index.js";
import app from "../app.js";
import { v7 as uuidv7 } from "uuid";

const productId = uuidv7();

describe("GET /products", () => {
  beforeAll(async () => {
    await db("products").where("name", "like", "test_%").delete();

    await db("products").insert([
      {
        id: productId,
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
  });
  it("deve retornar todos os dados do banco", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
  });

  it("deve retornar apenas o produto com id enviado via params", async () => {
    const response = await request(app).get(`/api/products/${productId}`);
    console.log(response.body);
    expect(response.status).toBe(200);
  });

  it("deve retornar um erro ao buscar um id inválido/inexistente", async () => {
    const response = await request(app).get("/api/products/123");
    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await db("products").where("name", "like", "test_%").delete();
  await db.destroy();
});
