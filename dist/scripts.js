let pokemonRepository=function(){let t=[],e="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(e){return t.push(e)}function i(t){let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){t.imageUrlFront=e.sprites.front_default,t.imageUrlBack=e.sprites.back_default,t.height=e.height,t.weight=e.weight,t.types=e.types[0].type.name,t.abilities=e.abilities[0].ability.name}).catch(function(t){console.error(t)})}function o(t){i(t).then(function(){!function(t){let e=$(".modal-title"),n=$(".modal-body");$(".modal-header");e.empty(),n.empty();let i=$("<h1>"+t.name+"</h1>"),o=$('<img class= "modal-img" style="width:50%">');o.attr("src",t.imageUrlFront);let a=$('<img class="modal-img" style="width:50%">');a.attr("src",t.imageUrlBack);let l=$("<p>Height: "+t.height+"</p>"),s=$("<p>Weight: "+t.weight+"</p>"),r=$("<p>Type: "+t.types+"</p>"),d=$("<p>Abilities: "+t.abilities+"</p>");e.append(i),n.append(o),n.append(a),n.append(l),n.append(s),n.append(r),n.append(d),$("#exampleModal").modal()}(t),console.log(t)})}return{getAll:function(){return t},add:n,addListItem:function(t){let e=document.querySelector(".pokemon-list"),n=document.createElement("li");n.classList.add("group-list-item");let i=document.createElement("button");i.innerText=t.name,i.classList.add("button1"),i.classList.add("btn"),i.classList.add("btn-primary"),i.setAttribute("data-toggle","modal"),i.setAttribute("data-target","#exampleModal"),n.appendChild(i),e.appendChild(n),i.addEventListener("click",function(e){o(t)})},addv:n,loadList:function(){return fetch(e).then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){n({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},showDetails:o,loadDetails:i}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});