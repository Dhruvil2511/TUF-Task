import { asyncHandler } from "../utils/asyncHandler.js";
import { pool } from "../db/connectDb.js";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config.js";
import { client } from "../middlewares/redis.middleware.js";

const getSubmissions = asyncHandler(async (req, res) => {
  let page = req.query.page;
  let limit = req.query.limit;

  page = Number(page) || 1;
  limit = Number(limit) || 10;
  if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
    return res.status(400).json({ error: "pagination error" });
  }

  let skip = (page - 1) * limit;

  const [rows] = await pool.query(
    `SELECT * FROM submissions 
     ORDER BY inserted_at DESC LIMIT ? OFFSET ?`,
    [limit, skip]
  );
  

  if (rows.length == 0)
    return res.status(404).json({ message: "No submissions found" });
  const totalCount = await pool.query(
    "SELECT COUNT(*) as count FROM submissions"
  );
  const totalSubmissions = totalCount[0][0].count;
  const totalPages = Math.ceil(totalSubmissions / limit);

  try {
    await client.setEx("submissions", 3600, JSON.stringify(rows));
    await client.setEx("totalPages", 3600, totalPages);
  } catch (error) {
    console.error("Redis cache error:", error);
  }

  return res.status(200).json({
    submissions: rows,
    totalPages: totalPages,
  });
});

const postSubmission = asyncHandler(async (req, res) => {
  const { outputDetails, username, language, stdin, code } = req.body;
  if (!outputDetails)
    return res.status(404).json({ message: "output details not found" });

  let finalOutput = "";
  let statusId = outputDetails?.status?.id;
  if (statusId === 6) finalOutput = atob(outputDetails?.compile_output);
  else if (statusId === 3 && atob(outputDetails.stdout) !== null)
    finalOutput = atob(outputDetails.stdout);
  else if (statusId === 5) finalOutput = "Time limit exceeded";
  else finalOutput = atob(outputDetails.stderr);

  const sql =
    "INSERT INTO submissions (id, username, code_language, standard_input, standard_output, source_code) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [uuidv4(), username, language.name, stdin, finalOutput, code];

  try {
    await pool.query(sql, values);
    console.log("1 record inserted");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error inserting submission" });
  }
  return res.status(200).json({ message: "Success" });
});

export { getSubmissions, postSubmission };
