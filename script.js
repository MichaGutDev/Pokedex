let loadedPokemonCards = [];
let visiblePokemonCards = [];



async function init() {
  renderPokemonDialog();
  const pokemon = await fetchPokemonCardData();

  renderPokemonCards(pokemon);
}

init();


function renderPokemonCards(pokemon) {
  const pokemonGrid = document.getElementById("pokemonGrid");
  pokemonGrid.innerHTML = getPokemonCardTemplate(pokemon);

}