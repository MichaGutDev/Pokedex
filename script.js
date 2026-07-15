let loadedPokemonCards = [];
let visiblePokemonCards = [];



async function init() {
  addPokemonCardClickListener();
  addPokemonDialogTabClickListener();
  addPokemonDialogListener()
  addPokemonSearchListener()
  addLoadMoreButtonListener();
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
  await loadPokemonCardData(pokemonList);

  visiblePokemonCards = loadedPokemonCards;
  renderPokemonCards(visiblePokemonCards);
  setLoadingState(false);
}


async function loadPokemonCardData(pokemonList) {
  for (let index = 0; index < pokemonList.results.length; index++) {
    const pokemonUrl = pokemonList.results[index].url;
    const cardData = await fetchPokemonCardData(pokemonUrl);

    loadedPokemonCards.push(cardData);
  }
}


async function loadMorePokemon() {
  setLoadMoreButtonDisabled(true);

  offset += LIMIT;
  await loadPokemonCards();

  setLoadMoreButtonDisabled(false);
}


function setLoadMoreButtonDisabled(isDisabled) {
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


function addPokemonSearchListener() {
  const searchForm = document.querySelector(".search-form");
  const searchInput = document.querySelector('[data-id="search-input"]');

  searchForm.addEventListener("submit", handlePokemonSearch);
  searchInput.addEventListener("input", handleEmptySearchInput);
}


function handlePokemonSearch(event) {
  event.preventDefault();

  const searchTerm = getSearchTerm();

  if (searchTerm === "") {
    resetPokemonSearch();
    return;
  }

  if (searchTerm.length < 3) {
    return;
  }

  filterPokemonCards(searchTerm);
}


function getSearchTerm() {
  const searchInput = document.querySelector(`[data-id="search-input"]`);

  return searchInput.value.trim().toLowerCase();
}

function filterPokemonCards(searchTerm) {
  visiblePokemonCards = loadedPokemonCards.filter(
    (pokemon) => pokemon.name.includes(searchTerm)
  );

  renderPokemonSearchResult();
  hideLoadMoreButton();
}

function renderPokemonSearchResult() {
  if (visiblePokemonCards.length === 0) {
    renderPokemonNotFound();
    return;
  }

  renderPokemonCards(visiblePokemonCards);
}


function renderPokemonNotFound() {
  const pokemonGrid = document.getElementById("pokemonGrid");
  pokemonGrid.innerHTML = getPokemonNotFoundTemplate();
}


function hideLoadMoreButton() {
  const loadMoreButton = document.querySelector(
    '[data-id="load-more-button"]'
  );

  loadMoreButton.classList.add("d-none");
}


function showLoadMoreButton() {
  const loadMoreButton = document.querySelector(
    '[data-id="load-more-button"]'
  );

  loadMoreButton.classList.remove("d-none");
}


function resetPokemonSearch() {
  visiblePokemonCards = loadedPokemonCards;
  renderPokemonCards(visiblePokemonCards);
  showLoadMoreButton();
}


function handleEmptySearchInput(event) {
  const searchTerm = event.target.value.trim();

  if (searchTerm === "") {
    resetPokemonSearch();
  }
}


function addLoadMoreButtonListener() {
  const loadMoreButton = document.querySelector(
    '[data-id="load-more-button"]'
  );

  loadMoreButton.addEventListener("click", loadMorePokemon);
}