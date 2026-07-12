let currentDialogPokemon;
let currentDialogDetails;


async function openPokemonDialog(selectedPokemon) {
  const dialog = document.querySelector('[data-id="dialog"]');

  const dialogCard = document.querySelector(
    '[data-id="overlay-pokemon-name"]'
  );
  currentDialogPokemon = selectedPokemon;
  currentDialogDetails = await fetchPokemonDetails(selectedPokemon.id);

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


function renderDialogTabContent(selctedTab) {
  const dialogDetails = document.getElementById("pokemonDialogDetails");

  if (selctedTab === "about") {
     dialogDetails.innerHTML = getPokemonAboutTemplate(currentDialogPokemon, currentDialogDetails)
  } 

  else if (selctedTab === "stats") {
    dialogDetails.innerHTML = getPokemonStatsTemplate();
  }
  
}