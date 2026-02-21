require("dotenv").config();
const express = require("express");

const { 
  getAllTrainers, 
  countTrainers, 
  findOrCreateTrainer 
} = require("./db/trainer.js");

const { 
  countPokemons, 
  addPokemon 
} = require("./db/pokemon.js");

const { 
  getAllTypes, 
  countTypes 
} = require("./db/types.js");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Show all trainers
app.get("/trainers", async (req, res) => {
  const trainers = await getAllTrainers();
  res.render("trainers", { trainers });
});

// Home dashboard
app.get("/", async (req, res) => {
  const totalTrainers = await countTrainers();
  const totalPokemons = await countPokemons();
  const totalTypes = await countTypes();

  res.render("home", {
    totalTrainers,
    totalPokemons,
    totalTypes
  });
});

// Show add form
app.get("/add-pokemon", async (req, res) => {
  const trainers = await getAllTrainers();
  const types = await getAllTypes();

  res.render("add-pokemon", { trainers, types });
});

// Handle form submission
app.post("/add-pokemon", async (req, res) => {
  try {
    let { name, trainer_id, trainer_name, type_id } = req.body;

    let finalTrainerId;

    if (trainer_id && trainer_id !== "") {
      finalTrainerId = parseInt(trainer_id);
    } else {
      finalTrainerId = await findOrCreateTrainer(
        trainer_name.trim()
      );
    }

    await addPokemon(
      name.trim(),
      finalTrainerId,
      parseInt(type_id)
    );

    res.redirect("/trainers");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding Pokémon");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});