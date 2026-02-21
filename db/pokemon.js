const pool = require("./pool");

// Count pokemons
async function countPokemons() {
  const result = await pool.query(
    "SELECT COUNT(*) FROM pokemons"
  );
  return Number(result.rows[0].count);
}

// Add pokemon
async function addPokemon(name, trainerId, typeId) {
  await pool.query(
    "INSERT INTO pokemons (name, trainer_id, type_id) VALUES ($1, $2, $3)",
    [name, trainerId, typeId]
  );
}

module.exports = {
  countPokemons,
  addPokemon
};