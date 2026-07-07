function getPokemonDialogTemplate() {
    return `
        ${getPokemonDialogCloseButtonTemplate()}
        ${getPokemonDialogHeroTemplate()}
        ${getPokemonDialogTabsTemplate()}
        ${getPokemonDialogDetailsTemplate()}
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

function getPokemonDialogHeroTemplate() {
    return /*HTML*/ `
    <section class="pokemon-dialog-hero">
        <p class="pokemon-dialog-id">#006</p>
        <h2>Charizard</h2>
        <div class="pokemon-dialog-types">
            <!-- TODO type badges later -->
        </div>
        <div class="pokemon-dialog-image-wrapper">
             <img class="pokemon-dialog-image" data-id="dialog-image" src="" alt="">
        </div>
    </section>
    `;
}

function getPokemonDialogTabsTemplate() {
    return /*HTML*/ `
    <nav class="pokemon-dialog-tabs" aria-label="Pokémon detail sections">
        <button type="button" data-tab="about">About</button>
        <button type="button" data-tab="stats">Base Stats</button>
        <button type="button" data-tab="abilities">Abilities</button>
        <button type="button" data-tab="moves">Moves</button>
    </nav> 
    `;
}

function getPokemonDialogDetailsTemplate() {
    return /*HTML*/ `
    <section class="pokemon-dialog-details">
        ${getPokemonAboutTemplate()}
    </section>
    `;
}

function getPokemonAboutTemplate() {
    return /*HTML*/ `
    <div class="pokemon-detail-row">
        <span>Height</span>
        <strong>1.7 m</strong>
    </div>

    <div class="pokemon-detail-row">
        <span>Weight</span>
        <strong>90.5 kg</strong>
    </div>

    <div class="pokemon-detail-row">
        <span>Types</span>
        <strong>Fire, Flying</strong>
    </div>

    <div class="pokemon-detail-row">
        <span>Abilities</span>
        <strong>Blaze</strong>
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

function getPokemonCardTemplate(pokemon) {
    return /*HTML*/ `
    <button class="pokemon-card" data-id="card" type="button">
       <p class="pokemon-card-id"># ${pokemon.id}</p>
        <h3>${pokemon.name}</h3>
        <div class="pokemon-card-image-wrapper">
             <img class="pokemon-card-image" data-id="card-image" src="${pokemon.image}" alt="${pokemon.name}">
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
        <span class="pokemon-type-badge">${typeName}</span>
        `;              
    }

    return typeBadges;
}