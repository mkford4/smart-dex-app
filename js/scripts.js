// IIFE
let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Bulbasaur', height: 2.04, types: ['grass', 'poison']},
    {name: 'Charmander', height: 2, types: 'fire'},
    {name: 'Squirtle', height: 1.08, types: 'water'},
    {name: 'Alakazam', height: 4.11, types: 'psychic'},
    {name: 'Pikachu', height: 1.04, types: 'electric'},
    {name: 'Sandslash', height: 3.3, types: 'ground'},
  ];

  function getAll() {
    return pokemonList;
  };

  function add(pokemon) {
    return pokemonList.push(pokemon)
  };

/* attempt at bonus task- addv function should only input objects
  function addv(pokemon) {
    if (typeof(pokemon) === 'object') {
      return add(pokemon)
    } else {
      console.log('Cannot be added');
    }
  };

// addListItem
  function addListItem(pokemon) {
    //created li & button to existing HTML ul.pokmeon-list
    let uList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    //each button via getAll is named after each pokemon in pokemonList
    button.innerText = pokemon.name;
    //added classList of button1 for CSS styling
    button.classList.add('button1');
    //append created elements to li and ul, respectively
    listItem.appendChild(button);
    uList.appendChild(listItem);

    //event listener to created button above that listens for click
    button.addEventListener('click', function(event) {
      showDetails(pokemon)
    })
//closure of addListItem function here
  };

  //showDetails function for later on
  function showDetails(pokemon) {
    console.log(pokemon)
  };

  return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  addv: add
};

})();

// forEach loop (simplified from for loop below)
pokemonRepository.getAll().forEach( function(pokemon) {
  /*if (pokemon.height > 4) {
    document.write( '<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big! </p>' )
  } else {
    document.write( '<p>' + pokemon.name + ' (height: ' + pokemon.height + ') </p>')
  }
*/
  pokemonRepository.addListItem(pokemon);
  });


/* for loop: Lists out pokemon in pokemonList with height; added conditional for tallest Pokemon with extra message
for (i=0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 4) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s big!<p>')
  } else {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')<p>')
  }
}
*/

// printArrayDetails function loop example with parameter (list)
/* function printArrayDetails(list) {
  for (i=0; i < list.length; i++) {
    document.write('<p>' + list[i].name + '</p>');
    console.log(list[i].name);
  }
}

printArrayDetails(pokemonList);
printArrayDetails(pokemonList2);
*/
