let loadedPokemonCards = [];
let visiblePokemonCards = [];



async function init() {
  addPokemonCardClickListener();
  addPokemonDialogTabClickListener();
  addPokemonDialogListener()
  await loadPokemonCards();
}

init();


function renderPokemonCards(pokemonCards) {
  const pokemonGrid = document.getElementById("pokemonGrid");
  pokemonGrid.innerHTML = "";

  for (let index = 0; index < pokemonCards.length; index++) {
    const pokemon = pokemonCards[index];
    pokemonGrid.innerHTML += getPokemonCardTemplate(pokemon, index);
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


function addPokemonCardClickListener() {
  const pokemonGrid = document.getElementById("pokemonGrid");

  pokemonGrid.addEventListener("click", handlePokemonCardClick);
}


function handlePokemonCardClick(event) {
  const pokemonCard = event.target.closest('[data-id="card"]');

  if (pokemonCard === null) {
    return;
  }

  const cardIndex = Number(pokemonCard.dataset.index);
  const selectedPokemon = visiblePokemonCards[cardIndex];

  openPokemonDialog(selectedPokemon);
  
}