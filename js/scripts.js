let pokemonList = [
  {name: 'Bulbasaur', height: 2.04, types: ['grass', 'poison']},
  {name: 'Charmander', height: 2, types: 'fire'},
  {name: 'Squirtle', height: 1.08, types: 'water'},
  {name: 'Alakazam', height: 4.11, types: 'psychic'},
  {name: 'Pikachu', height: 1.04, types: 'electric'},
  {name: 'Sandslash', height: 3.3, types: 'ground'},
]

let pokemonList2 = [
  {name: 'Alakazam', height: 4.11, types: 'psychic'},
  {name: 'Pikachu', height: 1.04, types: 'electric'},
  {name: 'Sandslash', height: 3.3, types: 'ground'},
]

// for loop: Lists out pokemon in pokemonList with height; added conditional for tallest Pokemon with extra message
for (i=0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 4) {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + ' - Wow, that\'s big!<p>')
  } else {
    document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')<p>')
  }
}

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

/* for loop example 1.3
let personAge = [
  {name: 'person1', age: 16},
  {name: 'person2', age: 10},
  {name: 'person3', age: 25}
];

for  (let i=0; i < personAge.length; i++) {
  if (personAge[i].age < 19 && personAge[i].age > 13){
    console.log(personAge[i].name + ' is a teenager')
  } else if (personAge[i].age < 13) {
    console.log(personAge[i].name +' is a child')
  } else {
    console.log(personAge[i].name + ' is an adult')
  }
}
*/
