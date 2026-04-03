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

  it("deve tentar criar um usuario com email existente", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Joao",
      email: "test_joao@email.com",
      password: "Joao123!",
    });

    expect(response.status).toBe(409);
  });

  it("deve retornar 400 com campos vazios", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "",
      email: "",
      password: "",
    });

    expect(response.status).toBe(400);
  });

  it("deve retornar 400 com campos ausentes", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Joao",
    });

    expect(response.status).toBe(400);
  });
});

describe("POST /auth/login", () => {
  beforeAll(async () => {
    await db("customers").where("email", "like", "test_%").delete();

    await request(app).post("/api/auth/register").send({
      name: "João",
      email: "test_joao@email.com",
      password: "Joao123!",
    });
  });

  it("deve retornar 200 se credenciais corretas", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test_joao@email.com",
      password: "Joao123!",
    });
    expect(response.status).toBe(200);
  });

  it("deve retornar 400 com campos ausentes", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test_joao@email.com",
    });

    expect(response.status).toBe(400);
  });

  it("deve retornar 401 se credenciais inválidas", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test_joa@email.com",
      password: "Joao1f2!",
    });
    expect(response.status).toBe(401);
  });
});

afterAll(async () => {
  await db("customers").where("email", "like", "test_%").delete();
  await db.destroy();
});
