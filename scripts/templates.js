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


function getPokemonStatsTemplate() {
    return /*HTML*/ `
   <div class="pokemon-stats-list">
        <div class="pokemon-stat-row">
             <span class="pokemon-stat-name">HP</span>
            <strong class="pokemon-stat-value">78</strong>
            <div class="pokemon-stat-bar">
                <div class="pokemon-stat-bar-fill"></div>
            </div>
        </div>
        <div class="pokemon-stat-row">
            <span class="pokemon-stat-name">Attack</span>
            <strong class="pokemon-stat-value">84</strong>
            <div class="pokemon-stat-bar">
                <div class="pokemon-stat-bar-fill"></div>
            </div>
        </div>
        <div class="pokemon-stat-row">
            <span class="pokemon-stat-name">Defense</span>
            <strong class="pokemon-stat-value">78</strong>
            <div class="pokemon-stat-bar">
                <div class="pokemon-stat-bar-fill"></div>
            </div>
        </div>
        <div class="pokemon-stat-row">
             <span class="pokemon-stat-name">Sp. Atk</span>
            <strong class="pokemon-stat-value">109</strong>
            <div class="pokemon-stat-bar">
                <div class="pokemon-stat-bar-fill"></div>
             </div>
        </div>
        <div class="pokemon-stat-row">
            <span class="pokemon-stat-name">Sp. Def</span>
             <strong class="pokemon-stat-value">85</strong>
             <div class="pokemon-stat-bar">
                <div class="pokemon-stat-bar-fill"></div>
            </div>
        </div>
        <div class="pokemon-stat-row">
            <span class="pokemon-stat-name">Speed</span>
            <strong class="pokemon-stat-value">100</strong>
            <div class="pokemon-stat-bar">
                <div class="pokemon-stat-bar-fill"></div>
            </div>
        </div>
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

        typeBadges += `
        <span class="pokemon-type-badge ${typeName}">${typeName}</span>
        `;
    }

    return typeBadges;
}