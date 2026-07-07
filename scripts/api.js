const BASE_URL = "https://pokeapi.co/api/v2/";
let offset = 0;
const LIMIT = 25;


async function fetchPokemonList() {
    let listResponse = await fetch(BASE_URL + `pokemon?limit=${LIMIT}&offset=${offset}`)
    let pokemonList = await listResponse.json();

  return pokemonList;
}



async function fetchPokemonCardData(BASE_URL) {
    let response = await fetch(url);
    let pokemon = await response.json();

    let pokemonCardData = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types
    };

    console.log(pokemonCardData);
    

    return pokemonCardData;
}