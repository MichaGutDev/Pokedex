let loadedPokemonCards = [];
let visiblePokemonCards = [];



async function init() {
  renderPokemonDialog();
  await loadPokemonCards();
}

init();


function renderPokemonCards(pokemonCards) {
  const pokemonGrid = document.getElementById("pokemonGrid");
  pokemonGrid.innerHTML = "";

  for (let index = 0; index < pokemonCards.length; index++) {
    const pokemon = pokemonCards[index];
    pokemonGrid.innerHTML += getPokemonCardTemplate(pokemon);
  }
}

async function loadPokemonCards() {
  const pokemonList = await fetchPokemonList();

  for (let index = 0; index < pokemonList.results.length; index++) {
    const cardData = await fetchPokemonCardData(pokemonList.results[index].url);
    loadedPokemonCards.push(cardData);  
    
  }

  visiblePokemonCards = loadedPokemonCards;
  console.log(visiblePokemonCards);
  renderPokemonCards(visiblePokemonCards);
  
}