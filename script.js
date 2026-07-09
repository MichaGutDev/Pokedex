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
  setLoadingState(true);

  const pokemonList = await fetchPokemonList();

  for (let index = 0; index < pokemonList.results.length; index++) {
    const cardData = await fetchPokemonCardData(pokemonList.results[index].url);
    loadedPokemonCards.push(cardData);  
    
  }

  visiblePokemonCards = loadedPokemonCards;
  renderPokemonCards(visiblePokemonCards);

  setLoadingState(false)
  
}

async function loadMorePokemon() {
  setLoadMoreButtonDisabled(true);

  offset += LIMIT;
  await loadPokemonCards();

  setLoadMoreButtonDisabled(false);
}

function setLoadMoreButtonDisabled(isDisabled){
  const loadMoreBtn = document.querySelector('[data-id="load-more-button"]');

  loadMoreBtn.disabled = isDisabled;
}

function setLoadingState(isLoading) {
  const loadingSpinner = document.getElementById("loading-spinner");

  if (isLoading) {
    loadingSpinner.classList.remove("d-none");
  } else {
    loadingSpinner.classList.add("d-none");
  }
}