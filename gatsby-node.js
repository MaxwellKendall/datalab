/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const axios = require('axios');

const get = endpoint => axios.get(`https://pokeapi.co/api/v2/ability`);

const getPokemonData = names =>
  Promise.all(
    names.map(async name => {
      const { data: pokemon } = await get(`/pokemon/${name}`);
      console.log(name);
      const abilities = await Promise.all(
        pokemon.abilities.map(async ({ ability: { name: abilityName } }) => {
          const { data: ability } = await get(`/ability/${abilityName}`);

          return ability;
        })
      );

      return { ...pokemon, abilities };
    })
  );

exports.createPages = async ({ actions: { createPage } }) => {
  const allPokemon = await getPokemonData(['pikachu', 'charizard', 'squirtle']);

  // Create a page that lists all Pokémon.
  createPage({
    path: `/`,
    component: require.resolve('./src/pages/all-pokemon.js'),
    context: { allPokemon }
  });

  // Create a page for each Pokémon.
  allPokemon.forEach(pokemon => {
    createPage({
      path: `/pokemon/${pokemon.name}/`,
      component: require.resolve('./src/pages/pokemon.js'),
      context: { pokemon }
    });

    // Create a page for each ability of the current Pokémon.
    pokemon.abilities.forEach(ability => {
      createPage({
        path: `/pokemon/${pokemon.name}/ability/${ability.name}/`,
        component: require.resolve('./src/pages/ability.js'),
        context: { pokemon, ability }
      });
    });
  });
};