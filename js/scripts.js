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

//bonus task 1.5- addv function should only input objects for input vaildation
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
    listItem.classList.add('group-list-item');
    let button = document.createElement('button');
    //each button via getAll is named after each pokemon in pokemonList
    button.innerText = pokemon.name;
    //added classList of button1 for CSS styling
    button.classList.add('button1');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.setAttribute('data-toggle', 'modal');

    //append created elements to li and ul, respectively
    listItem.appendChild(button);
    uList.appendChild(listItem);
    //event listener to created button above that listens for click
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  //closure of addListItem function here
  };

  //bonus task 1.7- displays a loading message while data is being loaded
  /*let messageParent = document.querySelector('app-body'));
  let message = document.createElement('p');
  message.innerText = 'Pokedex is loading...';
  messageParent.appendChild(message);

  function showLoadingMessage() {
    message.classList.add('is-visible');
  }
  function hideLoadingMessage() {
    message.classList.remove('is-visible');
  }
*/
  //loads the list of Pokemon from API
  function loadList() {
    //showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        //hideLoadingMessage();
      });
    }).catch(function (e) {
      console.error(e);
      //hideLoadingMessage();
    });
  };

  function loadDetails(item) {
    //showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //add the details to the items
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
      item.abilities = details.abilities;
      //hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      //hideLoadingMessage();
    });
  };


  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      //console.log(pokemon.name);
      showModal(pokemon);
      console.log(pokemon);
    });
  }
//Modal code:
  //let modalContainer = document.querySelector('#modal-container');

  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');
    let modalHeader = $('.modal-header');

    //refreshes modal each time
    modalTitle.empty();
    modalBody.empty();

    //create elements for modal content
    let nameElement = $('<h1>' + pokemon.name + '</h1>');

    let imageElementFront = $('<img class= "modal-img" style="width:50%">');
    imageElementFront.attr('src', pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', pokemon.imageUrlBack);

    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
    let typeElement = $('<p>' + 'Type: ' + pokemon.type + '</p>');
    let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');
    //append all from above
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilitiesElement);

    //calling the modal
    $('#exampleModalLabel').modal();

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
  let getPokemon = pokemonRepository.getAll();
  // forEach loop (simplified from for loop below)
  getPokemon.forEach(function (getPokemon) {
    pokemonRepository.addListItem(getPokemon);
  });

});
