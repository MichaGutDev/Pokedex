function renderPokemonDialog() {
  const dialogCard = document.querySelector('[data-id="overlay-pokemon-name"]');
  dialogCard.innerHTML = getPokemonDialogTemplate();
  
}