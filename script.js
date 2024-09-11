const allPokemon_URL = "https://pokeapi.co/api/v2/pokemon/";

let num = 3;


function init() {
  loadPokemonData(num);
  updateProgressBars();
}






async function loadPokemonData(num) {
  let response = await fetch(allPokemon_URL + num.toString());
  let responseAsJSON = await response.json();
  console.log(responseAsJSON);
}



function renderPokemons(){
  const contentRef = document.getElementById("content");

  response
};