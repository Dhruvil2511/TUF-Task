import mysql2 from "mysql2";

async function connectDb() {
  try {
    return mysql2.createConnection({}).promise()
  } catch (error) {}
}
export default connectDb;
