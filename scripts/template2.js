function renderPokemonsTemplateHTML(pokemonData){
    let pokemonName = pokemonData.name;
    let pokemonImg = pokemonData.sprites.other['official-artwork'].front_default;
    /* let pokemonType = pokemonData.types[0].type.name; */

    return `
    <button class="card-small-btn" onclick="openCardInfo(${pokedexNr})">
        <div class="card-small ${typeClass}" id="card">
          <div class="card-small-title d-flex bd-radius-top">
            <span class="card-small-nr">#${pokedexNr}</span>
            <h2 id="card-name">${pokemonName}</h2>
          </div>
          <div class="card-small-img d-flex ">
         
            <img
              src="${pokemonImg}"
              alt="${pokemonName}"
              id="card-img"
              class="card-pokemon-img"
            />
          </div>
    
          <div class="card-bottom">
            <div class="circle-type ${typeClass} ">
              <span class="fa-solid ${typeClassIcon}"></span>
            </div>
          </div>
        </div>
      </button>
    `;
}