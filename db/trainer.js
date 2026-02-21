const pool = require("./pool");

// Get all trainers
async function getAllTrainers() {
  const result = await pool.query(`
    SELECT 
      t.id AS trainer_id,
      t.name AS trainer_name,
      p.id AS pokemon_id,
      p.name AS pokemon_name
    FROM trainers t
    LEFT JOIN pokemons p 
      ON t.id = p.trainer_id
    ORDER BY t.name ASC;
  `);

  const trainersMap = {};

  result.rows.forEach(row => {
    if (!trainersMap[row.trainer_id]) {
      trainersMap[row.trainer_id] = {
        id: row.trainer_id,
        name: row.trainer_name,
        pokemons: []
      };
    }

    if (row.pokemon_id) {
      trainersMap[row.trainer_id].pokemons.push({
        id: row.pokemon_id,
        name: row.pokemon_name
      });
    }
  });

  return Object.values(trainersMap);
}

// Count trainers
async function countTrainers() {
  const result = await pool.query(
    "SELECT COUNT(*) FROM trainers"
  );
  return Number(result.rows[0].count);
}

// Find trainer by name
async function findTrainerByName(name) {
  const result = await pool.query(
    "SELECT id FROM trainers WHERE name = $1",
    [name]
  );
  return result.rows[0]; // undefined if not found
}

// Create trainer
async function createTrainer(name) {
  const result = await pool.query(
    "INSERT INTO trainers (name) VALUES ($1) RETURNING id",
    [name]
  );
  return result.rows[0];
}

// Find or create trainer (BEST PRACTICE)
async function findOrCreateTrainer(name) {
  const existing = await findTrainerByName(name);

  if (existing) {
    return existing.id;
  }

  const newTrainer = await createTrainer(name);
  return newTrainer.id;
}

module.exports = {
  getAllTrainers,
  countTrainers,
  findOrCreateTrainer
};