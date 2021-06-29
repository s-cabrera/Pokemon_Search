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

function addSearchItem(name, img) {
    let a = $('<a class="panel-block is-active">');
    let image = $(`<image src=${img} class="searchItem-img">`);
    let p = $('<p class="sidebar-pokename">');
    let saved = name.toLowerCase();
    p.text(name);
    a.addClass('recent');
    a.attr('id', saved);
    sidebar.append(a);
    a.append(image);
    a.append(p);
}

async function apiCall(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}/`)
        .then(function (response) {
            if (!response.ok) {
                $('.invalid').removeClass('is-hidden');
                return 0;
            }
            $('.invalid').addClass('is-hidden');
            return response.json();
        })
        .then(async function (data) {
            searchBtn1El.removeClass('is-loading');
            searchBtn2El.removeClass('is-loading');
            if (!data) {
                console.log("No data recorded")
                return;
            }

            //Show the sidebar and loading icon. Hide the initSearchBar
            initSearchBar.addClass('is-hidden');
            $('#loading-icon').removeClass('is-hidden');
            $('#display').removeClass('is-12');
            $('#display').removeClass('is-8');
            recentSearch.removeClass('is-hidden');

            var name = data.name;
            name = capitalizeFirstLetter(name);
            displayInfo(data, name);
            addSearchItem(name, data.sprites.front_default);
            var flavorText = await apiCallAgain(data.name);
            var tcgCard = await pokemonApi_2(data.name);
            savePokemon(data, flavorText, tcgCard);
        });
};

async function apiCallAgain(pokemon) {
    return new Promise(function(resolve, reject) {
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.toLowerCase()}/`)
        .then(function (response) {
            if (!response.ok) {
                console.log('Network response was not ok');
                return 0;
            };
            return response.json();
        })
        .then(function (flavor) {
            if (!flavor) {
                console.log("No data recorded");
                return;
            };
            displayFlavor(flavor);
            return resolve(flavor);
        });
    })
};

async function api(textInput) {
    let response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${textInput}`, {
        method: "GET",
        headers: {
            'x-api-key': "dbd45731-4537-4e36-83cf-77eafd972ad5"
        }
    })
    let data = await response.json();
    return data
}

//--------  Flavor text API call ---------// 
function pokemonApi_2(textInput) {
    return new Promise(function(resolve, reject) {
    api(textInput)
        .then(response => {
            displayCard(response);
            return resolve(response);
        })
    })
}

function displayFlavor(flavorApi) {
    console.log(flavorApi);
    let flav = flavorApi.flavor_text_entries[0].flavor_text;
    for(let i = 0; i < flavorApi.flavor_text_entries.length; i++){
        if(flavorApi.flavor_text_entries[i].language.name === "en"){
            flav = flavorApi.flavor_text_entries[i].flavor_text;
            break;
        }
    }
    pokeFlavor.text(flav);
}

function displayCard(cardApi) {
    let image = cardApi.data[1].images.large;
    displayImageEl.attr('src', image);
    displayImageEl.siblings(1).text(cardApi.data[1].artist);
    $('#loading-icon').addClass('is-hidden');
    infoCard.removeClass('is-hidden');
}

function displayInfo(api, name) {
    let icon = api.sprites.front_default;
    let type = api.types[0].type.name;
    type = capitalizeFirstLetter(type);
    pokeSprite.attr('src', icon);
    pokeName.text(name);
    pokeType.text(`Element: ${type}`);
}

function savePokemon(one, two, three) {
    let pokeData = JSON.stringify([one, two, three]);
    let pokeKey = one.name;
    localStorage.setItem(pokeKey, pokeData);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var searchBtn1Handler = function (event) {
    //console.log($(event.target).attr('id'));
    if (searchInput1El.val().length > 0) {
        searchBtn1El.addClass('is-loading');
        apiCall(searchInput1El.val().trim());
    }
}

var searchBtn2Handler = function (event) {
    //console.log($(event.target).html());
    if (searchInput2El.val().length > 0) {
     infoCard.addClass('is-hidden');
     searchBtn2El.addClass('is-loading');
     apiCall(searchInput2El.val().trim());
    }
}


searchBtn1El.on('click', searchBtn1Handler);
searchBtn2El.on('click', searchBtn2Handler);
recentSearch.on('click', function (event) {
    if (event.target.classList.contains('recent')) {
        // Local Variables
        let recentName = event.target.id;
        let recall = JSON.parse(localStorage.getItem(recentName));
        let one = recall[0], two = recall[1], three = recall[2];
        let title = capitalizeFirstLetter(recentName);

        //Hide Pokemon display card and invalid text, show loading icon
        infoCard.addClass('is-hidden');
        $('#loading-icon').removeClass('is-hidden');
        $('.invalid').addClass('is-hidden');

        //Display Info
        displayInfo(one, title);
        displayFlavor(two);
        displayCard(three);

        //Show display Card, hide loading icon
        infoCard.removeClass('is-hidden');
        $('#loading-icon').addClass('is-hidden');
    }
})