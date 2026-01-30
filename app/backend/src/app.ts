import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import fs from "fs";
import path from "path";

//* precisei usar isso por que o dirname é antigo "commonjs"
// e como uso esmodules, preciso importar o "dirname" para ler certo /
const __dirname = import.meta.dirname;

const app: Application = express();
app.use(express.json());
app.use(cors());

const openApiPath = path.join(__dirname, "..", "docs", "openapi.yaml");
const openApiFile = fs.readFileSync(openApiPath, "utf8");
const openApiSpec = YAML.parse(openApiFile);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

export default app;
