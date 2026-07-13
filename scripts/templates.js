function getPokemonDialogTemplate(selectedPokemon, pokemonDetails) {
    return `
        ${getPokemonDialogCloseButtonTemplate()}
        ${getPokemonDialogHeroTemplate(selectedPokemon)}
        ${getPokemonDialogTabsTemplate()}
        ${getPokemonDialogDetailsTemplate(selectedPokemon, pokemonDetails)}
        ${getPokemonDialogNavigationTemplate()}
    `;
}

function getPokemonDialogCloseButtonTemplate() {
    return /*HTML*/`
    <button class="dialog-close-button" data-id="close-dialog-button" type="button" aria-label="Close dialog">
        <img src="./assets/icons/close-icon.svg" alt="">
    </button>
    `;
}


function getPokemonDialogHeroTemplate(selectedPokemon) {
    const primaryType = selectedPokemon.types[0].type.name;

    return /*HTML*/ `
    <section class="pokemon-dialog-hero">
        <p class="pokemon-dialog-id">#${selectedPokemon.id}</p>
        <h2>${selectedPokemon.name}</h2>
        <div class="pokemon-dialog-types">
            ${getPokemonTypeBadgesTemplate(selectedPokemon.types)}
        </div>
        <div class="pokemon-dialog-image-wrapper ${primaryType}">
             <img class="pokemon-dialog-image" data-id="dialog-image" src="${selectedPokemon.image}" alt="${selectedPokemon.name}">
        </div>
    </section>
    `;
}


function getPokemonDialogTabsTemplate() {
    return /*HTML*/ `
    <nav class="pokemon-dialog-tabs" aria-label="Pokémon detail sections">
        <button class="active" type="button" data-tab="about">About</button>
        <button type="button" data-tab="stats">Base Stats</button>
        <button type="button" data-tab="abilities">Abilities</button>
        <button type="button" data-tab="evolution">Evolution</button>
    </nav> 
    `;
}


function getPokemonDialogDetailsTemplate(selectedPokemon, pokemonDetails) {
    return /*HTML*/ `
    <section class="pokemon-dialog-details" id="pokemonDialogDetails">
        ${getPokemonAboutTemplate(selectedPokemon, pokemonDetails)}
    </section>
    `;
}


function getPokemonAboutTemplate(selectedPokemon, pokemonDetails) {
    return /*HTML*/ `
    <div class="pokemon-detail-row">
        <span>Height</span>
        <strong>${pokemonDetails.height / 10} m</strong>
    </div>

    <div class="pokemon-detail-row">
        <span>Weight</span>
        <strong>${pokemonDetails.weight / 10} kg</strong>
    </div>

    <div class="pokemon-detail-row">
        <span>Abilities</span>
        <strong>${getPokemonTypeNames(selectedPokemon.types)}</strong>
    </div>
    `;
}


function getPokemonStatsTemplate(stats) {
    let statsTemplate = "";

    for (let index = 0; index < stats.length; index++) {
        const statName = stats[index].stat.name;
        const statValue = stats[index].base_stat;
        const statBarWidth = Math.min(statValue, 100);

        statsTemplate += /*HTML*/ `
        <div class="pokemon-stat-row">
             <span class="pokemon-stat-name">${statName}</span>
            <strong class="pokemon-stat-value">${statValue}</strong>
            <div class="pokemon-stat-bar">
                <div class="pokemon-stat-bar-fill" style="width: ${statBarWidth}%"></div>
            </div>
        </div>
        `;
        
    }

        return /*HTML*/ `
        <div class="pokemon-stats-list">
            ${statsTemplate}       
        </div>
        `;
}


function getPokemonDialogNavigationTemplate() {
    return /*HTML*/ `
    <div class="pokemon-dialog-navigation">
        <button data-id="prev-button" type="button" aria-label="Show previous Pokémon">
            <img src="./assets/icons/arrow-left.svg" alt="">
        </button>

        <button data-id="next-button" type="button" aria-label="Show next Pokémon">
            <img src="./assets/icons/arrow-right.svg" alt="">
        </button>
    </div>
    `;
}


function getPokemonCardTemplate(pokemon, index) {
    const primaryType = pokemon.types[0].type.name;

    return /*HTML*/ `
    <button class="pokemon-card" data-id="card" data-index="${index}" type="button">
       <p class="pokemon-card-id"># ${pokemon.id}</p>
        <h3>${pokemon.name}</h3>
        <div class="pokemon-card-image-wrapper  ${primaryType}">
             <img class="pokemon-card-image" data-id="card-image" src="${pokemon.image}" alt="${pokemon.name}"  loading="lazy"
                decoding="async">
        </div> 
        <div class="pokemon-card-types">
            ${getPokemonTypeBadgesTemplate(pokemon.types)}
        </div>
    </button>
    `;
}


function getPokemonTypeBadgesTemplate(types) {
    let typeBadges = "";

    for (let index = 0; index < types.length; index++) {
        const pokemonType = types[index];
        const typeName = pokemonType.type.name;

        typeBadges += /*HTML*/ `
        <span class="pokemon-type-badge ${typeName}">${typeName}</span>
        `;
    }

    return typeBadges;
}


function getPokemonAbilitiesTemplate(abilities) {
    let abilitiesTemplate = "";

    for (let index = 0; index < abilities.length; index++) {
        const ability = abilities[index];
        const abilityName = abilities[index].ability.name;

        abilitiesTemplate += /*HTML*/ `
        <li class="pokemon-ability">
            ${abilityName}
        </li>
        `;

    }

    return /*HTML*/ `
        <ul class="pokemon-abilities-list">
            ${abilitiesTemplate}
        </ul>
        `;
}


function getPokemonEvolutionTemplate(evolutionChain) {
  let evolutionTemplate = "";

  for (let index = 0; index < evolutionChain.length; index++) {
    const evolution = evolutionChain[index];

    evolutionTemplate += `
      <div class="pokemon-evolution-item">
        <img
          class="pokemon-evolution-image"
          src="${evolution.image}"
          alt="${evolution.name}"
        >
        <span class="pokemon-evolution-name">
          ${evolution.name}
        </span>
      </div>
    `;
  }

  return `
    <div class="pokemon-evolution-list">
      ${evolutionTemplate}
    </div>
  `;
}