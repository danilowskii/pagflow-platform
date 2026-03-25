import express, { Application } from "express";
import { authRouter } from "./modules/auth/auth.routes.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import fs from "fs";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler.js";

//* precisei usar isso por que o dirname é antigo "commonjs" e como uso esmodules,
//  preciso importar o "dirname" para ler certo e evitar falha no build /

const app: Application = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV !== "test") {
  const __dirname = import.meta.dirname;
  const openApiPath = path.join(__dirname, "..", "docs", "openapi.yaml");
  const openApiFile = fs.readFileSync(openApiPath, "utf8");
  const openApiSpec = YAML.parse(openApiFile);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
}

app.use("/api", authRouter);

app.use(errorHandler);

export default app;
