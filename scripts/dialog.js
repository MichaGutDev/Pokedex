function renderPokemonDialog() {
  const dialogCard = document.querySelector('[data-id="overlay-pokemon-name"]');
  dialogCard.innerHTML = getPokemonDialogTemplate();
  
}

function openPokemonDialog(selectedPokemon) {
  const dialog = document.querySelector('[data-id="dialog"]');

  console.log(selectedPokemon);
  dialog.showModal();
  
}