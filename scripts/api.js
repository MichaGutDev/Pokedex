async function fetchCharizard() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/charizard");
    let test = await response.json();
    console.log(test.id);
    console.log(test.name);
    console.log(test.types);
    console.log(test.sprites);
    console.log(test.sprites.other["official-artwork"].front_default);

    return test;
}