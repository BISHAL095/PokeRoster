require("dotenv").config();
const express = require("express");
const { getAllTrainers } = require("./db/queries.js");

const app = express();
app.set("view engine", "ejs");

app.get("/trainers", async (req, res) => {
  const trainers = await getAllTrainers();
  res.render("trainers", { trainers }); 
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});