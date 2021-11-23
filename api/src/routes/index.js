const router = require('express').Router();


const pokemonsRoute = require('./pokemons.js')
const pokemonIdRoute = require('./pokemonById.js')
const pokemonNameRoute = require('./pokemonByName.js')
const typesRoute = require('./types.js')


router.use('/pokemons', pokemonsRoute);
router.use('/pokemonId', pokemonIdRoute);
router.use('/pokemonName', pokemonNameRoute);
router.use('/types', typesRoute);

module.exports = router