let currentDialogPokemon;
let currentDialogDetails;
let currentEvolutionChain;


async function openPokemonDialog(selectedPokemon) {
  const dialog = document.querySelector('[data-id="dialog"]');

  const dialogCard = document.querySelector(
    '[data-id="overlay-pokemon-name"]'
  );
  currentDialogPokemon = selectedPokemon;
  currentDialogDetails = await fetchPokemonDetails(selectedPokemon.id);

  const evolutionChainUrl = await fetchEvolutionChainUrl(
    selectedPokemon.id
  );

  const evolutionData = await fetchEvolutionChain(
    evolutionChainUrl
  );

  currentEvolutionChain = getEvolutionChainData(evolutionData);

  console.log(currentEvolutionChain);

  dialogCard.innerHTML = getPokemonDialogTemplate(currentDialogPokemon, currentDialogDetails);
  dialog.showModal();

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

  const selctedTab = clickedTab.dataset.tab;
  setActivDialogTab(clickedTab);
  renderDialogTabContent(selctedTab)
  console.log(selctedTab);

}


function setActivDialogTab(clickedTab) {
  const tabButtons = document.querySelectorAll(".pokemon-dialog-tabs button");

  for (let index = 0; index < tabButtons.length; index++) {
    tabButtons[index].classList.remove("active");

    clickedTab.classList.add("active")

  }
}


function renderDialogTabContent(selectedTab) {
  const dialogDetails = document.getElementById("pokemonDialogDetails");

  if (selectedTab === "about") {
    dialogDetails.innerHTML = getPokemonAboutTemplate(currentDialogPokemon, currentDialogDetails)
  }

  else if (selectedTab === "stats") {
    dialogDetails.innerHTML = getPokemonStatsTemplate(currentDialogDetails.stats);
  }
  else if (selectedTab === "abilities") {
    dialogDetails.innerHTML = getPokemonAbilitiesTemplate(currentDialogDetails.abilities);
  }
  else if (selectedTab === "evolution") {dialogDetails.innerHTML = getPokemonEvolutionTemplate(currentEvolutionChain);
}

}