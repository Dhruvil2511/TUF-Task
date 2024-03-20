import { pool } from "./db/connectDb.js";
import { app } from "./app.js";

pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database!");
    app.listen(process.env.PORT || 6969, () =>
      console.log("Server running on port " + process.env.PORT || 6969)
    );
    connection.release();
  })
  .catch((error) => {
    console.error("Error connecting to MySQL database:", error.message);
    process.exit(1); 
  });
