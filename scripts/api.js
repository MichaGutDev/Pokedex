const BASE_URL = "https://pokeapi.co/api/v2/";
let offset = 0;
const LIMIT = 20;


async function fetchPokemonList() {
    let listResponse = await fetch(BASE_URL + `pokemon?limit=${LIMIT}&offset=${offset}`)
    let pokemonList = await listResponse.json();

    return pokemonList;
}


async function fetchPokemonCardData(url) {
    const response = await fetch(url);
    const pokemon = await response.json();

    let pokemonCardData = {
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

    let pokemonDetails = {
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
        const pokemonId = getPokemonIdFromUrl(currentEvolution.species.url);
        evolutionChain.push({
            id: pokemonId,
            name: currentEvolution.species.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
        });

        currentEvolution = currentEvolution.evolves_to[0];
    }

    return evolutionChain;
}


function getPokemonIdFromUrl(url) {
  const urlParts = url.split("/");

  return urlParts[urlParts.length - 2];
}