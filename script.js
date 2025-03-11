//Function to create section for each type of pokemon
function createTypeSections(types) {
  types.forEach(type => {
    const typeSection = document.createElement('section');
    typeSection.id = type.toLowerCase();
    typeSection.classList.add('grouppoke');
    document.body.appendChild(typeSection);
  });
}

// Function to create and display Pokémon cards in their respective sections
function displayPokemonByType(types, pokedex) {
  types.forEach(type => {
    const typePokemons = pokedex.filter(pokemon => pokemon.type.includes(type));
    typePokemons.sort((a, b) => a.name.localeCompare(b.name));

    const typeSection = document.getElementById(type.toLowerCase());

    // Display the total sum of HP and Attack before Pokémon cards
    const totalHP = typePokemons.reduce((sum, pokemon) => sum + pokemon.base.HP, 0);
    const totalAttack = typePokemons.reduce((sum, pokemon) => sum + pokemon.base.Attack, 0);

    const totalsParagraph = document.createElement('p');
    totalsParagraph.innerHTML = `<div id="total"><strong>Total HP: ${totalHP}</strong> | <strong>Total Attack: ${totalAttack}</strong></div>`;

    // Add link to go back to top
    const topLink = document.createElement('a');
    topLink.href = '#';
    topLink.textContent = 'Back to Top';
    topLink.classList.add('back-to-top');

    // Add elements to typeSection
    typeSection.appendChild(totalsParagraph);
    typeSection.appendChild(topLink);

    // Display Pokémon cards
    typePokemons.forEach(pokemon => {
      const pokemonCard = createPokemonCard(pokemon);
      typeSection.appendChild(pokemonCard);
    });
  });
}

// Function to create a Pokémon card
function createPokemonCard(pokemon) {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');
  pokemonCard.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprite}" alt="${pokemon.name}">
    <div class="description">
      <div id="pokeBaseHP"><p><b>HP:</b> ${pokemon.base.HP}</p></div>
      <div id="pokeBaseAtt"><p><b>Attack:</b> ${pokemon.base.Attack}</p></div>
      <div id="pokeBaseDef"><p><b>Defense:</b> ${pokemon.base.Defense}</p></div>
      <div id="pokeSpAtt"><p><b>Sp. Attack:</b> ${pokemon.base['Sp. Attack']}</p></div>
      <div id="pokeSpDef"><p><b>Sp. Defense:</b> ${pokemon.base['Sp. Defense']}</p></div>
      <div id="pokeBaseSpee"><p><b>Speed:</b> ${pokemon.base.Speed}</p></div>
    </div>
  `;

  pokemonCard.addEventListener('click', () => {
    window.open(pokemon.url, '_blank');
  });

  return pokemonCard;
}

// Add the word "pokedex" before the navigation bar
const pokedexDiv = document.createElement('div');
pokedexDiv.textContent = 'Pokedex';
pokedexDiv.id = 'pokedex';
document.body.insertAdjacentElement('afterbegin', pokedexDiv);

// Function to create the navigation bar
function createNavBar(types) {
  const navBar = document.createElement('nav');
  types.forEach(type => {
    const navLink = document.createElement('a');
    navLink.href = `#${type.toLowerCase()}`;
    navLink.textContent = type;
    navBar.appendChild(navLink);
  });

  // Replace the existing navigation bar with the new one
  const existingNavBar = document.querySelector('nav');
  if (existingNavBar) {
    existingNavBar.replaceWith(navBar);
  } else {
    document.body.insertAdjacentElement('afterbegin', navBar);
  }
}

const types = [];
const typeCount = {};

pokedex.forEach(pokemon => {
  pokemon.type.forEach(type => {
    if (!types.includes(type)) {
      types.push(type);
      typeCount[type] = 0;
    }
    typeCount[type]++;
  });
});

types.sort();
createNavBar(types);
createTypeSections(types);
displayPokemonByType(types, pokedex);

// Display the number of Pokémon for each type next to each type
types.forEach(type => {
  const typeSection = document.getElementById(type.toLowerCase());
  const countParagraph = document.createElement('p');
  countParagraph.textContent = `Type: ${type} (${typeCount[type]})`;
  typeSection.insertBefore(countParagraph, typeSection.firstChild);
});
