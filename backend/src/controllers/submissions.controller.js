import { asyncHandler } from "../utils/asyncHandler.js";
import { pool } from "../db/connectDb.js";

const getSubmissions = asyncHandler(async (req, res) => {
  const [rows] = await pool.query("Select * from submissions");
  if (rows.length == 0)
    return res.status(404).json({ message: "No submissions found" });
  console.log(rows);
  return res.status(200).json({ submissions: rows });
});
const postSubmission = asyncHandler((req, res) => {});

export { getSubmissions, postSubmission };
