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
      //hideLoadingMessage();
    }).catch(function (e) {
      console.error(e);
      //hideLoadingMessage();
    });
  };

//Modal code:
  let modalContainer = document.querySelector('#modal-container');
  // function to show modal:
  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';

    //closes modal when X button is clicked
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.classList.add('title-element');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.classList.add('content-element');
    contentElement.innerText = ('Height: ' + pokemon.height + ' Type: ' + pokemon.type);

    let imgElement = document.createElement('img');
    imgElement.src = pokemon.imageUrl;
    imgElement.classList.add('pokemon-photo');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imgElement);

    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
  }

  //close Modal function:
  function hideModal(title, text) {
    modalContainer.classList.remove('is-visible');
  }

  //showDetails function for later on
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      //console.log(pokemon.name);
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  //closes modal with ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  //closes modal with hideModal by clicking anywhere outside modal
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  //Returns showModal when button is clicked with title & text parameters
  //document.querySelector('#show-modal').addEventListener('click', () => {
  //  showModal(pokemon.name, ('Height: ' + pokemon.height + 'Type: ' + pokemon.type));
  //});

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

    /*if (pokemon.height > 4) {
      document.write( '<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big! </p>' )
    } else {
      document.write( '<p>' + pokemon.name + ' (height: ' + pokemon.height + ') </p>')
    }
  */
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
