const fetch = require("node-fetch");
const { Pokemon, Tipo } = require("../db.js");

const info = async (by) => {
  const api = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40");
  const data = await api.json();
  const db = await Pokemon.findAll({ include: Tipo });

  let base = [...db, ...data.results];

  if (by === "2") {
    base = [...db];
  } else if (by === "1") {
    base = [...data.results];
  }

  let pokemonInfo = [];
  for (i = 0; i < base.length; i++) {
    if (!base[i]) return pokemonInfo;
    if (base[i].url) {
      const pokemon = await fetch(base[i].url);
      const info = await pokemon.json();

      pokemonInfo.push({
        id: info.id,
        name: info.name,
        type: info.types.map((t) => t.type.name),
        img: info.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
        attack: info.stats[1].base_stat,
      });
    } else {
      pokemonInfo.push({
        id: base[i].id,
        idPoke: base[i].idPoke,
        name: base[i].name,
        type: base[i].tipos.map((t) => t.name),
        attack: base[i].attack,
        img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
      });
    }
  }
  // const poke = await Pokemon.findAll({ include: Tipo });
  // pokemonInfo.push({ ...poke });
  return pokemonInfo;
};

const byName = async (name) => {
  try {
    const db = await Pokemon.findOne({
      where: {
        name: name,
      },
      include: Tipo,
    });
    if (db) {
      const pokemonDb = [
        {
          id: db.id,
          idPoke: db.idPoke,
          name: db.name,
          type: db.tipos.map((t) => t.name),
          img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
        },
      ];
      return pokemonDb;
    } else {
      const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await api.json();
      const pokemonName = [
        {
          id: data.id,
          name: data.name,
          type: data.types.map((t) => t.type.name),
          img: data.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
        },
      ];
      return pokemonName;
    }
  } catch (error) {
    return [];
  }
};

const byId = async (id) => {
  try {
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await api.json();

    const pokemonId = {
      id: data.id,
      name: data.name,
      type: data.types.map((t) => t.type.name),
      img: data.sprites.versions["generation-iii"]["emerald"]
        .front_default,
      hitpoints: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
    };

    return pokemonId;
  } catch (error) {}
  try {
    const db = await Pokemon.findByPk(id, { include: Tipo });
    const pokemonDb = {
      id: db.idPoke,
      name: db.name,
      type: db.tipos.map((t) => t.name),
      img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
      hitpoints: db.hitpoints,
      attack: db.attack,
      defense: db.defense,
      speed: db.speed,
      height: db.height,
      weight: db.weight,
    };

    return pokemonDb;
  } catch (error) {
    return {};
  }
};

module.exports = {
  info,
  byName,
  byId,
};
