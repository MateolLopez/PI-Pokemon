const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const { info, byName, byId } = require("../middlewares/middleware.js");

const router = Router();

router.get("/", async (req, res) => {
  let { name, by } = req.query;
  let pokemonInfo = [];
  if (name) {
    name = name.toLowerCase();
    pokemonInfo = await byName(name);
    if (!pokemonInfo.length)
      return res.status(404).send('Pokemon not found');
    return res.status(200).json(pokemonInfo);
  }

  pokemonInfo = await info(by);
  if (!pokemonInfo.length) return res.json({ info: "There are no more records" });

  res.json(pokemonInfo);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const pokemonInfo = await byId(id);
  if (!pokemonInfo.id) return res.status(404).send('Pokemon not found');
  res.status(200).json(pokemonInfo);
});

router.post("/", async (req, res) => {
  let { name, hitpoints, attack, defense, speed, height, weight, types } =
    req.body;
  if (
    isNaN(hitpoints) ||
    isNaN(attack) ||
    isNaN(defense) ||
    isNaN(speed) ||
    isNaN(height) ||
    isNaN(weight)
  )
    return res.json({ info: "All arguments must be numbers" });

  if (!name) return res.json({ info: "The name is required" });

  const exists = await Pokemon.findOne({ where: { name: name } });
  if (exists) return res.json({ info: "The Pokemon already exists" });

  const pokemon = await Pokemon.create({
    name: name.toLowerCase(),
    hitpoints: Number(hitpoints),
    attack: Number(attack),
    defense: Number(defense),
    speed: Number(speed),
    height: Number(height),
    weight: Number(weight),
  });

  if (!types.length) types = [1];

  await pokemon.setTypes(types);
  res.json({ info: "Pokemon created!" });
});

module.exports = router;