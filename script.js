var searchInput1El = $('#search-1');
var searchBtn1El = $('#search-btn-1');
var searchInput2El = $('#search-2');
var searchBtn2El = $('#search-btn-2');
var sidebar = $('.panel');
var pokemon;
var searches = Array(0);
var displayImageEl = $("#display-image");

gifAPI("burgers");

async function gifAPI(input){
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=bqnf9WXuJ1DCV1XQbL6Ap3Zl0lvARjdW&q=${input}&rating=pg&lang=en`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
    });
}

/*
On search button click: 
    1) send value of input to the API
    2) Add is-loading class until data returns
    3) Remove is-loading class after data is used
    4) Hide the main search bar
    5) Display the Recent Searches search bar
*/

async function iconAPI(icon){
    fetch(icon, {
        method: 'GET',
        mode: 'cors',
    })
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
    return data;
    });
}

function addSearchItem(name, img, sound){
    let a = $('<a class="panel-block is-active">');
    let image = $(`<image src=${img}>`);
    let p = $('<p>');
    //let audio = $('<audio controls>');
    //let source = $(`<source src=${sound} type="audio/ogg">`);
    p.text(name);
    displayImageEl.attr('src', img);
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
        var name = data.name;
        name = name[0].toUpperCase() + name.slice(1, (name.length));
        searches.push(name);
        console.log(`Name: ${data.name}, Sprite URL: ${data.sprites.front_default}`);
        addSearchItem(name, data.sprites.front_default);
    });
}

var  searchBtn1Handler = function(){
    if(searchInput1El.val().length > 0){
        apiCall(searchInput1El.val().trim());
    }
}


searchBtn1El.on('click', searchBtn1Handler);