async function openPokemonDialog(selectedPokemon) {
  const dialog = document.querySelector('[data-id="dialog"]');

  const dialogCard = document.querySelector(
    '[data-id="overlay-pokemon-name"]'
  );
  const pokemonDetails = await fetchPokemonDetails(selectedPokemon.id);

  console.log(pokemonDetails);

  dialogCard.innerHTML = getPokemonDialogTemplate(selectedPokemon, pokemonDetails);
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