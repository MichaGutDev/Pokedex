let currentDialogPokemon;
let currentDialogDetails;
let currentEvolutionChain;


async function openPokemonDialog(selectedPokemon) {
  const dialog = document.querySelector('[data-id="dialog"]');

  const dialogCard = document.querySelector('[data-id="overlay-pokemon-name"]');

  currentDialogPokemon = selectedPokemon;
  currentDialogDetails = await fetchPokemonDetails(selectedPokemon.id);

  await loadCurrentEvolutionChain(selectedPokemon.id);

  dialogCard.innerHTML = getPokemonDialogTemplate(currentDialogPokemon, currentDialogDetails);
  dialog.showModal();

}


async function loadCurrentEvolutionChain(pokemonId) {
  const evolutionChainUrl = await fetchEvolutionChainUrl(pokemonId);
  const evolutionData = await fetchEvolutionChain(evolutionChainUrl);

  currentEvolutionChain = getEvolutionChainData(evolutionData);

}


function getPokemonTypeNames(types) {
  let typeNames = "";

  for (let index = 0; index < types.length; index++) {
    const typeName = types[index].type.name;

    typeNames += typeName;

    if (index < types.length - 1) {
      typeNames += ", ";
    }

  }

  return typeNames;
}


function addPokemonDialogTabClickListener() {
  const dialog = document.querySelector('[data-id="dialog"]');

  dialog.addEventListener("click", handlePokemonDialogTabClick);
}


function handlePokemonDialogTabClick(event) {
  const clickedTab = event.target.closest("[data-tab]");

  if (!clickedTab) {
    return;
  }

  const selectedTab = clickedTab.dataset.tab;
  setActiveDialogTab(clickedTab);
  renderDialogTabContent(selectedTab)
}


function setActiveDialogTab(clickedTab) {
  const tabButtons = document.querySelectorAll(".pokemon-dialog-tabs button");

  for (let index = 0; index < tabButtons.length; index++) {
    tabButtons[index].classList.remove("active");
  }

  clickedTab.classList.add("active")

}


function renderDialogTabContent(selectedTab) {
  const dialogDetails = document.getElementById(
    "pokemonDialogDetails"
  );

  dialogDetails.innerHTML = getDialogTabTemplate(selectedTab);
}


function getDialogTabTemplate(selectedTab) {
  if (selectedTab === "about") {
    return getPokemonAboutTemplate(
      currentDialogPokemon,
      currentDialogDetails
    );
  }

  if (selectedTab === "stats") {
    return getPokemonStatsTemplate(currentDialogDetails.stats);
  }

  if (selectedTab === "abilities") {
    return getPokemonAbilitiesTemplate(
      currentDialogDetails.abilities
    );
  }

  if (selectedTab === "evolution") {
    return getPokemonEvolutionTemplate(currentEvolutionChain);
  }
}


function addPokemonDialogListener() {
  const dialog = document.querySelector(`[data-id="dialog"]`);

  dialog.addEventListener("click", handlePokemonDialogClick);
}


function handlePokemonDialogClick(event) {
  if (event.target === event.currentTarget) {
    closePokemonDialog();
    return;
  }

  const clickedButton = event.target.closest("button");

  if (!clickedButton) {
    return;
  }

  handlePokemonDialogButton(clickedButton);
}


function handlePokemonDialogButton(clickedButton) {
  const buttonId = clickedButton.dataset.id;

  if (buttonId === "prev-button") {
    previousPokemon();
  }

  if (buttonId === "next-button") {
    nextPokemon();
  }

  if (buttonId === "close-dialog-button") {
    closePokemonDialog();
  }
}


function previousPokemon() {
  const currentIndex = getCurrentPokemonIndex();
  let previousIndex;

  if (currentIndex === 0) {
    previousIndex = visiblePokemonCards.length - 1;
  } else {
    previousIndex = currentIndex - 1
  }

  const previousPokemonData = visiblePokemonCards[previousIndex];

  openPokemonDialog(previousPokemonData);
}


function nextPokemon() {
  const currentIndex = getCurrentPokemonIndex();
  let nextIndex;

  if (currentIndex === visiblePokemonCards.length - 1) {
    nextIndex = 0;
  } else {
    nextIndex = currentIndex + 1;
  }

  const nextPokemonData = visiblePokemonCards[nextIndex];

  openPokemonDialog(nextPokemonData);
}


function getCurrentPokemonIndex() {
  return visiblePokemonCards.findIndex(
    (pokemon) => pokemon.id === currentDialogPokemon.id
  );
}


function closePokemonDialog() {
  const dialog = document.querySelector('[data-id="dialog"]');
  dialog.close();
}