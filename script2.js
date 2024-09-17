const baseUrl = 'https://pokeapi.co/api/v2/';

let num = 20;

function init() {
    renderPokemon();
   
  }

// Funktion zum Abrufen der Pokémon-Daten
async function getPokemonData(pokemonNr) {
    try {
      const response = await fetch(`${baseUrl}pokemon/${pokemonNr}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Pokémon-Daten:', error);
    }
  }

// Funktion zum Abrufen der Pokémon-SpeciesDaten
async function getPokemonData(pokemonName) {
  try {
    const response = await fetch(`${baseUrl}pokemon-species/${pokemonName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Pokémon-Daten:', error);
  }
}

// Funktion zum Abrufen der Evolution Chain
async function getEvolutionChain(evolutionChainUrl) {
    try {
      const response = await fetch(evolutionChainUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Evolution Chain:', error);
    }
  }


//---------------------------------


function renderPokemon() {
    const contentRef = document.getElementById("content");

    for (let pokemonNr = 1; pokemonNr <= num; pokemonNr++) {

       let pokemonData = getPokemonData(pokemonNr);

    
      
        contentRef.innerHTML += renderPokemonsTemplateHTML(pokemonData);
      }
}