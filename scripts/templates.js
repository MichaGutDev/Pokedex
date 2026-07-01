function getPokemonDialogTemplate() {
    return `
    ${getPokemonDialogCloseButtonTemplate()}`;
}

function getPokemonDialogCloseButtonTemplate() {
    return /*HTML*/`
    <button class="dialog-close-button" data-id="close-dialog-button" type="button" aria-label="Close dialog">
                <img src="./assets/icons/close-icon.svg" alt="">
            </button>
    `;
}

