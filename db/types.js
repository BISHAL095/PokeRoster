const pool = require("./pool");

async function getAllTypes() {
  const result = await pool.query("SELECT * FROM types;");
  return result.rows;
}

async function countTypes() {
  const result = await pool.query("SELECT COUNT(*) FROM types;");
  return Number(result.rows[0].count);
}

module.exports = { getAllTypes, countTypes };