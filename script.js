let loadedPokemonCards = [];
let visiblePokemonCards = [];



async function init() {
  renderPokemonDialog();
  const pokemonList = await fetchPokemonList();
  const cardData = await fetchPokemonCardData(pokemonList.results[0].url)

  renderPokemonCards(cardData);
}

init();


function renderPokemonCards(pokemon) {
  const pokemonGrid = document.getElementById("pokemonGrid");
  pokemonGrid.innerHTML = getPokemonCardTemplate(pokemon);

}