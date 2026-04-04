import { dbConfig } from "./src/db/config.js";
import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: envFile });

export default {
  ...dbConfig,

  migrations: {
    tableName: "migrations",
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
