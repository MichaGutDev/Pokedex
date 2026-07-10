function openPokemonDialog(selectedPokemon) {
  const dialog = document.querySelector('[data-id="dialog"]');

  const dialogCard = document.querySelector(
    '[data-id="overlay-pokemon-name"]'
  );

  dialogCard.innerHTML = getPokemonDialogTemplate(selectedPokemon);

  console.log(selectedPokemon);
  dialog.showModal();

}