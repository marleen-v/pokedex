const allPokemon_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const singlePokemon_URL = "https://pokeapi.co/api/v2/pokemon/";
const singlePokemonSpecies_URL = "https://pokeapi.co/api/v2/pokemon-species/"

let num = 30;
;
let typeClass;
let typeClassIcon;


function init() {
  loadPokemonData(num);
 
}


async function loadPokemonData(num) {

/*   let resAll = await fetch(allPokemon_URL);
  let resAllPokemon = await resAll.json(); 
  let count = resAllPokemon.count; */

  for (let pokedexNr = 1; pokedexNr <= num; pokedexNr++) {
    let resSingle = await fetch(singlePokemon_URL + pokedexNr.toString());
    let resSinglePokemon = await resSingle.json();

    let pokemonName = resSinglePokemon.name;
    let pokemonImg = resSinglePokemon.sprites.other['official-artwork'].front_default;
    let pokemonType = resSinglePokemon.types[0].type.name;
  
    
    /* console.log(pokemonName); */
  
    renderPokemons(pokemonName, pokemonImg, pokemonType, pokedexNr);
  }

}



function renderPokemons( pokemonName, pokemonImg, pokemonType, pokedexNr){
  const contentRef = document.getElementById("content");
  

    if(pokemonType === "fire") {
      typeClass = "typeFire";
      typeClassIcon = "fa-star";
    } else if(pokemonType === "grass"){
      typeClass = "typeGrass";
      typeClassIcon = "fa-user";
    } else if(pokemonType === "water"){
        typeClass = "typeWater";
        typeClassIcon = "fa-user";
  }
 
 

  contentRef.innerHTML += renderPokemonsTemplateHTML(pokemonName, pokemonImg, pokedexNr);

};

async function openCardInfo(pokedexNr) {
  const contentInfoRef = document.getElementById("pokemon-info-card");
  
  let resSingle = await fetch(singlePokemon_URL + pokedexNr.toString());
  let resSinglePokemon = await resSingle.json();

  contentInfoRef.innerHTML = renderInfoTemplateHTML(resSinglePokemon, pokedexNr); 
  showMainInfo(pokedexNr);
    
}

function closeCardInfo(){
  const ContentInfoRef = document.getElementById("pokemon-info-card");

  ContentInfoRef.innerHTML ="";

}


async function showMainInfo(pokedexNr) {
  const mainInfoRef = document.getElementById("card-info");

  const resSingle = await fetch(singlePokemon_URL + pokedexNr.toString());
  const resSinglePokemon = await resSingle.json();

  const pokemonkWeight = resSinglePokemon.weight/10;
  const pokemonHeight = resSinglePokemon.height/10;
  const pokemonAbilities = () => resSinglePokemon.abilities.map(item => item.ability.name).join(', ');
  const pokemonAllAbilites = pokemonAbilities();

  mainInfoRef.innerHTML = renderMainTemplateHTML(pokemonkWeight, pokemonHeight, pokemonAllAbilites);
}


function showStatsInfo(pokedexNr) {
  const mainInfoRef = document.getElementById("card-info");
  mainInfoRef.innerHTML = renderStatsTemplateHTML(pokedexNr);
  updateProgressBars(pokedexNr);
}

//to dos:


async function showEvoChainInfo(pokedexNr) {
  const mainInfoRef = document.getElementById("card-info");
/* 
  */

  const resSpecies = await fetch(singlePokemonSpecies_URL + pokedexNr.toString()); // to fetch the evolution chain
  const resSpeciesPokemon = await resSpecies.json();

  const resEvoChain = await fetch(resSpeciesPokemon.evolution_chain.url) 
  const pokemonSpecies = await resEvoChain.json();

  let nextLevel =  pokemonSpecies.chain.evolves_to;
  
  if(nextLevel == []){
    mainInfoRef.innerHTML = `<div class="flex-center" style="height: 80%;">${pokemon} does not have an evolution chain </div>` ;
  } else {
    let pokemon = pokemonSpecies.chain.species.name; //get the name of the first pokemon of the evolution chain

    const resSingle = await fetch(singlePokemon_URL + pokemon.toString()); // to fetch the image
    const resSinglePokemon = await resSingle.json(); 

    const pokemonImg = resSinglePokemon.sprites.other["official-artwork"].front_default;

    mainInfoRef.innerHTML =  `
    <div class="flex-center" style="height: 80%;">
      <div class="evo">
        <img src="${pokemonImg}" alt="${pokemon}" />
        <span class="evo-title">${pokemon}</span>
      </div>
    </div>
      ` ;
/*       for(let nextEbene = 1; nextEbene ){

      } */
  }
  

  /* mainInfoRef.innerHTML = renderEvoChainTemplateHTML(pokedexNr, pokemonSpecies); */
}



async function showNextPokemon(pokedexNr){

  let resAll = await fetch(allPokemon_URL);
  let resAllPokemon = await resAll.json(); 
  let count = resAllPokemon.count; 

  if (pokedexNr < count){
  pokedexNr = pokedexNr + 1;
  openCardInfo(pokedexNr);
};
}



function showPreviousPokemon(pokedexNr) {

  if(pokedexNr > 1){
  pokedexNr = pokedexNr - 1;
  openCardInfo(pokedexNr);
}
};