import mysql2 from "mysql2/promise";
import "dotenv/config";

const pool = mysql2.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  port: process.env.DB_HOST_PORT || 3306,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export { pool };
