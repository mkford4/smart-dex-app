// IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//main functions
  function getAll() {
    return pokemonList;
  };

  function add(pokemon) {
    return pokemonList.push(pokemon)
  };

//bonus task- addv function should only input objects for input vaildation
  function addv(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon //&&
      //'height' in pokemon &&
      //'types' in pokemon
    ) {
      add(pokemon);
      console.log('Added');
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
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  //loads the list of Pokemon from API
  function loadList() {
    return fetch(apiUrl).then(function (response)
  {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  };

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //adds the details to the items
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  };

  //Returns for repository IIFE here:
  return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  addv: add,
  loadList: loadList,
  showDetails: showDetails,
  loadDetails: loadDetails,
};
})();

//fetches the data from API via loadList function
pokemonRepository.loadList().then(function () {
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
