const BASE_URL = "https://pokeapi.co/api/v2/";
let offset = 0;
const LIMIT = 20;


async function fetchPokemonList() {
    const listResponse = await fetch(BASE_URL + `pokemon?limit=${LIMIT}&offset=${offset}`);
    const pokemonList = await listResponse.json();

    return pokemonList;
}


async function fetchPokemonCardData(url) {
    const response = await fetch(url);
    const pokemon = await response.json();

    const pokemonCardData = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types
    };

    return pokemonCardData;
}


async function fetchPokemonDetails(pokemonId) {
    const response = await fetch(BASE_URL + `pokemon/${pokemonId}`);
    const pokemon = await response.json();

    const pokemonDetails = {
        height: pokemon.height,
        weight: pokemon.weight,
        abilities: pokemon.abilities,
        stats: pokemon.stats,
    };

    return pokemonDetails;
}


async function fetchEvolutionChainUrl(pokemonId) {
    const response = await fetch(BASE_URL + `pokemon-species/${pokemonId}`);
    const pokemonSpecies = await response.json();
    const evolutionChainUrl = pokemonSpecies.evolution_chain.url;

    return evolutionChainUrl;
}


async function fetchEvolutionChain(evolutionChainUrl) {
    const response = await fetch(evolutionChainUrl);
    const evolutionData = await response.json();

    return evolutionData;
}


function getEvolutionChainData(evolutionData) {
    const evolutionChain = [];
    let currentEvolution = evolutionData.chain;


    while (currentEvolution) {
        evolutionChain.push(
            getEvolutionPokemonData(currentEvolution)
        );

        currentEvolution = currentEvolution.evolves_to[0];
    }

    return evolutionChain;
}


function getEvolutionPokemonData(currentEvolution) {
  const pokemonId = getPokemonIdFromUrl(
    currentEvolution.species.url
  );

  return {
    id: pokemonId,
    name: currentEvolution.species.name,
    image: getPokemonArtworkUrl(pokemonId),
  };
}


function getPokemonArtworkUrl(pokemonId) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
}


function getPokemonIdFromUrl(url) {
    const urlParts = url.split("/");

    return urlParts[urlParts.length - 2];
}