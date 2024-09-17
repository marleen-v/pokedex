const allPokemon_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

let num = 7;

function init() {
    loadPokemonData(num);
  }
  
async function loadPokemonData(num) {

    let resAll = await fetch(allPokemon_URL);
    let resAllPokemon = await resAll.json();
    /* let count = resAllPokemon.count; */

    renderPokemons();
}

function renderPokemons() {
    const contentRef = document.getElementById("content");

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
}