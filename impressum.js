async function showEvoChainInfo(pokedexNr) {
    const mainInfoRef = document.getElementById("card-info");
      mainInfoRef.innerHTML = `<div class="flex-center" style="height: 80%;" id="evo-chain-container">`;
    const evoChainRef = document.getElementById('evo-chain-container')
  
    const resSpecies = await fetch(singlePokemonSpecies_URL + pokedexNr.toString()); // to fetch the evolution chain
    const resSpeciesPokemon = await resSpecies.json();
  
    const resEvoChain = await fetch(resSpeciesPokemon.evolution_chain.url) 
    const pokemonSpecies = await resEvoChain.json();
  
    let nextLevel =  pokemonSpecies.chain.evolves_to;
    let pokemonNextLevel  = pokemonSpecies.chain.evolves_to[0].species.name;
    
    if(nextLevel == []){
     
      evoChainRef.innerHTML = `<p>${resSpeciesPokemon.name} does not have an evolution chain</p> ` ;
    } else {
      
      let pokemon = pokemonSpecies.chain.species.name; //get the name of the first pokemon of the evolution chain
  
      const resSingle = await fetch(singlePokemon_URL + pokemon.toString()); // to fetch the image
      const resSinglePokemon = await resSingle.json(); 
  
      let pokemonImg = resSinglePokemon.sprites.other["official-artwork"].front_default;
  
      evoChainRef.innerHTML =  `
      
        <div class="evo">
          <img src="${pokemonImg}" alt="${pokemon}" />
          <span class="evo-title">${pokemon}</span>
        </div>
        ` ;
  
        if (nextLevel != [] ){
          const resSingle = await fetch(singlePokemon_URL + pokemonNextLevel.toString()); // to fetch the image
          const resSinglePokemon = await resSingle.json(); 
  
          pokemonImg = resSinglePokemon.sprites.other["official-artwork"].front_default;
       
  
          evoChainRef.innerHTML +=  `
          <div>
          <svg
            class="icon icon-small"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
            <path
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
            />
          </svg>
        </div>
  
        <div class="evo">
          <img src="${pokemonImg}" alt="${pokemonNextLevel}" />
          <span class="evo-title">${pokemonNextLevel}</span>
        </div>
            ` ;
  
            if (pokemonSpecies.chain.evolves_to[0].evolves_to != [] ){
              pokemonNextLevel = pokemonSpecies.chain.evolves_to[0].evolves_to[0].species.name;
  
              const resSingle = await fetch(singlePokemon_URL + pokemonNextLevel.toString()); // to fetch the image
              const resSinglePokemon = await resSingle.json(); 
  
          pokemonImg = resSinglePokemon.sprites.other["official-artwork"].front_default;
       
  
          evoChainRef.innerHTML +=  `
          <div>
          <svg
            class="icon icon-small"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
            <path
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
            />
          </svg>
        </div>
  
        <div class="evo">
          <img src="${pokemonImg}" alt="${pokemonNextLevel}" />
          <span class="evo-title">${pokemonNextLevel}</span>
        </div>
            ` ;
            }  
        /*   nextLevel += ["evolves_to"];
         pokemonNextLevel = pokemonSpecies.chain.evolves_to[0] + addNextLevel + ["species.name"];
          addNextLevel += ["evolves_to[0]"];   */
  
        };
    }
    
  
    /* mainInfoRef.innerHTML = renderEvoChainTemplateHTML(pokedexNr, pokemonSpecies); */
  }
  