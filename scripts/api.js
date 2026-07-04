async function fetchCharizard() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/charizard");
    let test = await response.json();

    return test;
}