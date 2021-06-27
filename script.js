var searchInput1El = $('#search-1');
var searchBtn1El = $('#search-btn-1');
var initSearchBar = $('.onload-search-bar');
var searchInput2El = $('#search-2');
var searchBtn2El = $('#search-btn-2');
var sidebar = $('.panel');
var recentSearch = $('#container-1');
var displayImageEl = $("#display-image");
var infoCard = $('#infoCard');
var pokeSprite = $('#sprite');
var pokeName = $('.title');
var pokeType = $('.subtitle');
var pokeFlavor = $('.content');
var searches = Array(0);
var pokemon;



function addSearchItem(name, img){
    let a = $('<a class="panel-block is-active">');
    let image = $(`<image src=${img} class="searchItem-img">`);
    let p = $('<p class="sidebar-pokename">');
    p.text(name);
    
    sidebar.append(a);
    a.append(image);
    a.append(p);
}
//---------  Poke API call ------------//
async function apiCall(pokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}/`)
  .then(function(response){
    if (!response.ok) {
        $('.invalid').removeClass('is-hidden');   
        return 0;
    }
    $('.invalid').addClass('is-hidden');
    return response.json();
  })
  .then(function(data){
      searchBtn1El.removeClass('is-loading');
      searchBtn2El.removeClass('is-loading');
      if(!data){
          console.log("No data recorded")
          return;
        }
        //Show the sidebar and loading icon. Hide the initSearchBar
        initSearchBar.addClass('is-hidden');
        $('#loading-icon').removeClass('is-hidden');
        $('#display').removeClass('is-12');
        $('#display').removeClass('is-8');
        recentSearch.removeClass('is-hidden');

        //Set variables and store data
        console.log(data);
        id = data.id;
        var name = data.name;
        name = name[0].toUpperCase() + name.slice(1, (name.length));
        searches.push(name);

        //Add Search Item
        addSearchItem(name, data.sprites.front_default);
        
        //API calls
        apiCallAgain(data.name);
        pokemonApi_2(data.name);
        
        //Update the display card info
        displayInfo(data, name);
    });
}

//--------  Flavor text Poke API call ---------// 
async function apiCallAgain(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.toLowerCase()}/`)
    .then(function(response){
        if (!response.ok) {
            console.log('Flavor text API response was not ok');
            return 0;
        }
        return response.json();
    })
    .then(function(flavor){
        if(!flavor){
            console.log("Flavor text not recorded");
        }
        let flavor_text;
        for(let i = 0; i < flavor.flavor_text_entries.length; i++){
            if(flavor.flavor_text_entries[i].language.name === "en"){
                flavor_text = flavor.flavor_text_entries[i].flavor_text;
                break;
            }
        }
        console.log(`Name: ${flavor.name}, Description: ${flavor_text}`)
        pokeFlavor.text(flavor_text);
    })
}

//--------  TCG Card API Call ---------// 
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


  function pokemonApi_2(textInput) {
    api(textInput).then(response=>{
        let image = response.data[1].images.large;
        console.log(response);
        console.log(response.data[1].artist);
        displayImageEl.siblings(1).text(response.data[1].artist);
        displayImageEl.attr('src', image);

       //Display the Pokemon card and hide the loading icon AFTER image is set
       $('#loading-icon').addClass('is-hidden');
       infoCard.removeClass('is-hidden');
    })
  } 

//------------ Display Pokemon Card Info -------------//
function displayInfo(api, name) {
    let icon = api.sprites.front_default;
    let type = api.types[0].type.name;
    type =  type[0].toUpperCase() + type.slice(1, (type.length))
    pokeSprite.attr('src', icon);
    pokeName.text(name);
    pokeType.text(`Element: ${type}`);
}

var  searchBtn1Handler = function(){
    if(searchInput1El.val().length > 0){
        searchBtn1El.addClass('is-loading');
        apiCall(searchInput1El.val().trim());
        // recentSearch.removeClass('is-hidden');
        // initSearchBar.addClass('is-hidden');
    }
}

var searchBtn2Handler = function() {
    if (searchInput2El.val().length > 0) {
     infoCard.addClass('is-hidden');
     searchBtn2El.addClass('is-loading');
     apiCall(searchInput2El.val().trim());
    }
}


searchBtn1El.on('click', searchBtn1Handler);
searchBtn2El.on('click', searchBtn2Handler);
