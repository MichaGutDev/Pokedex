async function init() {
  renderPokemonDialog();
  const pokemon = await fetchCharizard();

  renderPokemonCards(pokemon);
}

init();


function renderPokemonCards(pokemon) {
  const pokemonGrid = document.getElementById("pokemonGrid");
  pokemonGrid.innerHTML = getPokemonCardTemplate(pokemon);

}