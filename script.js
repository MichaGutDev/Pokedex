let loadedPokemonCards = [];
let visiblePokemonCards = [];



async function init() {
  renderPokemonDialog();
  const pokemonList = await fetchPokemonList();
  console.log(pokemonList.results);
}

init();


function renderPokemonCards(pokemon) {
  const pokemonGrid = document.getElementById("pokemonGrid");
  pokemonGrid.innerHTML = getPokemonCardTemplate(pokemon);

}