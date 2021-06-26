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

function addSearchItem(name, img) {
    let a = $('<a class="panel-block is-active">');
    let image = $(`<image src=${img} class="searchItem-img">`);
    let p = $('<p>');
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
                $('.invalid').removeClass('is-invisible');
                return 0;
            }
            return response.json();
        })
        .then(async function (data) {
            if (!data) {
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
            console.log(flavor);
            let flav = flavor.flavor_text_entries[1].flavor_text;
            pokeFlavor.text(flav);
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
// #2 pass textInput is now in function pokemonApi_2
function pokemonApi_2(textInput) {
    return new Promise(function(resolve, reject) {
    //#3 pass now textInput is being passing into api
    // .then(response is holding the api data)
    // clg will display the photo 
    api(textInput)
        .then(response => {
            let image = response.data[1].images.large;
            displayImageEl.attr('src', image);
            return resolve(response);
        })
    })
}

function displayInfo(api, name) {
    let icon = api.sprites.front_default;
    let type = api.types[0].type.name;
    type = type[0].toUpperCase() + type.slice(1, (type.length))
    pokeSprite.attr('src', icon);
    pokeName.text(name);
    pokeType.text(`Element: ${type}`);
}

function savePokemon(one, two, three) {
    let pokeData = JSON.stringify([one, two, three]);
    console.log(JSON.parse(pokeData));
    let pokeKey = one.name;
    localStorage.setItem(pokeKey, pokeData);
}

var searchBtn1Handler = function () {
    if (searchInput1El.val().length > 0) {
        searchBtn1El.addClass('is-loading');
        apiCall(searchInput1El.val().trim());
        recentSearch.removeClass('is-hidden');
        initSearchBar.addClass('is-hidden');
        infoCard.removeClass('is-hidden');
    }
}

var searchBtn2Handler = function () {
    if (searchInput2El.val().length > 0) {
        apiCall(searchInput2El.val().trim());
    }
}


searchBtn1El.on('click', searchBtn1Handler);
searchBtn2El.on('click', searchBtn2Handler);
recentSearch.on('click', function (event) {
    if (event.target.classList.contains('recent')) {
        let recentName = event.target.id;
        console.log(recentName);
        let recall = JSON.parse(localStorage.getItem(recentName));
        console.log(recall);
    }
})
