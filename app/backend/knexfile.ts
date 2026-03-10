import {dbConfig} from "./src/db/config"
import dotenv from "dotenv";
dotenv.config()  

export default {
    ...dbConfig,
    
    migrations: {
        tableName: "migrations",
        directory: "./migrations",
    }
}

