var searchInput1El = $('#search-1');
var searchBtn1El = $('#search-btn-1');
var initSearchBar = $('.onload-search-bar');
var searchInput2El = $('#search-2');
var searchBtn2El = $('#search-btn-2');
var sidebar = $('.panel');
var pokemon;
var searches = Array(0);
var recentSearch = $('#container-1');
var displayImageEl = $("#display-image");
var infoCard = $('#infoCard');
var pokeSprite = $('#sprite');
var pokeName = $('.title');
var pokeType = $('.subtitle');
var pokeFlavor = $('.content');

// gifAPI("burgers");

// async function gifAPI(input){
//     fetch(`https://api.giphy.com/v1/gifs/trending?api_key=bqnf9WXuJ1DCV1XQbL6Ap3Zl0lvARjdW&q=${input}&rating=pg&lang=en`)
//     .then(function(response){
//         return response.json()
//     })
//     .then(function(data){
//         console.log(data);
//     });
// }

/*
On search button click: 
    1) send value of input to the API
    2) Add is-loading class until data returns
    3) Remove is-loading class after data is used
    4) Hide the main search bar
    5) Display the Recent Searches search bar
*/


function addSearchItem(name, img){
    let a = $('<a class="panel-block is-active">');
    let image = $(`<image src=${img} class="searchItem-img">`);
    let p = $('<p>');
    //let audio = $('<audio controls>');
    //let source = $(`<source src=${sound} type="audio/ogg">`);
    p.text(name);
    
    sidebar.append(a);
    a.append(image);
    a.append(p);
    //a.append(audio);
    //audio.append(source);
}

async function apiCall(pokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}/`)
  .then(function(response){
    if (!response.ok) {
        console.log('Network response was not ok');
        return 0;
    }
    return response.json();
  })
  .then(function(data){
      if(!data){
          console.log("No data recorded")
          return;
      }
        console.log(data);
        id = data.id;
        var name = data.name;
        name = name[0].toUpperCase() + name.slice(1, (name.length));
        searches.push(name);
        console.log(data);
        console.log(`Name: ${data.name}, Sprite URL: ${data.sprites.front_default}`);
        displayInfo(data, name);
        addSearchItem(name, data.sprites.front_default);
        apiCallAgain(data.name);
        pokemonApi_2(data.name);
    });
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.toLowerCase()}/`)
    .then(function(response){
      if (!response.ok) {
          console.log('Network response was not ok');
          return 0;
      }
      return response.json();
    })
    .then(function(data){
        if(!data){
            console.log("No data recorded")
            return;
        }
        
        console.log(`Name: ${data.name}, Description: ${data.flavor_text_entries[0].flavor_text}`)
        $('content').text(data.flavor_text_entries[0].flavor_text)
      });
}

async function apiCallAgain(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.toLowerCase()}/`)
    .then(function(response){
        if (!response.ok) {
            console.log('Network response was not ok');
            return 0;
        }
        return response.json();
    })
    .then(function(flavor){
        console.log(flavor);
        let flav = flavor.flavor_text_entries[1].flavor_text;
        pokeFlavor.text(flav);
    })
}

async function api(textInput){
    let response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${textInput}`,{
      method: "GET",
      headers: {
        'x-api-key':"dbd45731-4537-4e36-83cf-77eafd972ad5"
      }
    })
    let data = await response.json();
    return data
  }
 // #2 pass textInput is now in function pokemonApi_2
  function pokemonApi_2(textInput) {
  //#3 pass now textInput is being passing into api
  // .then(response is holding the api data)
  // clg will display the photo 
    api(textInput).then(response=>{
        let image = response.data[1].images.large;
        console.log(response);
        console.log(response.data[1].artist);
        let artistName =response.data[1].artist
       displayImageEl.attr('src', image);
    })
  } 

function displayInfo(api, name) {
    let icon = api.sprites.front_default;
    let type = api.types[0].type.name;
    pokeSprite.attr('src', icon);
    pokeName.text(name);
    pokeType.text(type);
}

var  searchBtn1Handler = function(){
    if(searchInput1El.val().length > 0){
        searchBtn1El.addClass('is-loading');
        apiCall(searchInput1El.val().trim());
        recentSearch.removeClass('is-hidden');
        initSearchBar.addClass('is-hidden');
        infoCard.removeClass('is-hidden');
    }
}

var searchBtn2Handler = function() {
    if (searchInput2El.val().length > 0) {
     apiCall(searchInput2El.val().trim());
    }
}


searchBtn1El.on('click', searchBtn1Handler);
searchBtn2El.on('click', searchBtn2Handler);
