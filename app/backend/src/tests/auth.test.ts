import request from "supertest";
import app from "../app.js";
import db from "../db/index.js";

describe("POST /auth/register", () => {
  beforeAll(async () => {
    await db("customers").where("email", "like", "test_%").delete();

    await request(app).post("/api/auth/register").send({
      name: "João",
      email: "test_joao@email.com",
      password: "Joao123!",
    });
  });

  afterAll(async () => {
    await db("customers").where("email", "like", "test_%").delete();
    await db.destroy();
  });

  it("deve tentar criar um usuario com email existente", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Joao",
      email: "test_joao@email.com",
      password: "Joao123!",
    });

    expect(response.status).toBe(409);
  });
});
