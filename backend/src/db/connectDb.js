import mysql2 from "mysql2/promise";

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Dhruvil@2511",
  database: "code_submissions",
});

export { pool };
