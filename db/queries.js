const pool = require("./pool");

async function getAllTrainers() {
  const result = await pool.query("SELECT * FROM trainers;");
  return result.rows;
}

module.exports = {
  getAllTrainers,
};