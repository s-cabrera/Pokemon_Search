<<<<<<< HEAD
//place holder for now
var requestUrl = "https://pokeapi.co/api/v2/pokemon?limit=151"
var searchBarData = document.querySelector('.button')

=======
var requestUrl;
var searchButton = $('#search_btn');
var mainContent = $('#display');
>>>>>>> 9f780e328f44188b465383e6fe386882007bd6d4

async function getApi(requestUrl){
  fetch(requestUrl)
  .then(function (response){
    return response.json()
  })
  .then (function(){
  })
}
// event listener that takes user input and displays data of pokimon in web console 
getApi(requestUrl);


searchBarData.addEventListener('click',function(event){
  event.preventDefault();
  var textInput = $('.input').val();
  console.log(textInput);
  requestUrl =`https://pokeapi.co/api/v2/pokemon/${textInput}`
  // console.log(data);
  // fetched pokemon data
  // had to recall the api again to be able to display the data. was only displaying the dynamic api link with user search input 
  fetch(requestUrl)
  .then(function (response){
    return response.json()
  })
  .then (function(dataApi_1){
    console.log(dataApi_1);
    // search history is passing the data on line 50-55 the parameter naming doesnt matter it wil be the same data
  })
  //passing textInput from eventListener to pokemonApi_2 #1 pass
  pokemonApi_2(textInput)
})
// passing api key through header

//textInput is a parameter that is being passed 

// #4 textInput now exist in api function to call the data via event listener 
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
      console.log(response.data[0].artist);
       artistName =response.data[0].artist
    })
  } 




<<<<<<< HEAD


=======


function displayPokemon(api) {
  var cardDiv = $('<div>');
  cardDiv.addClass('card');
  var imageDiv = $('<div>');
  imageDiv.addClass('card-image');
  var cardFigure = $('<figure>');
  cardFigure.addClass('image');
  var cardImage = $('<img>');
  cardImage.attr({src: "https://bulma.io/images/placeholders/1280x960.png", alt: "pokemon sprite"});
  var contentDiv = $('<div>');
  contentDiv.addClass('card-content is-flex-grow-0');
  var mediaDiv = $('<div>');
  mediaDiv.addClass('media');
  var mediaLeft = $('<div>');
  mediaLeft.addClass('media-left');
  var spriteFigure = $('<figure>');
  spriteFigure.addClass('image is-48x48');
  var spriteImage = $('<img>');
  spriteImage.attr({src: `${api.sprites.front_default}`, alt: "pokemon sprite"});
  var mediaContent = $('<div>');
  mediaContent.addClass('media-content');
  var name = $('<p>');
  name.addClass('title is-4');
  name.text(api.name);
  var type = $('<p>');
  type.addClass('subtitle is-6');
  type.text(api.types[0].type.name);
  var infoDiv = $('<div>');
  infoDiv.addClass('content');
  infoDiv.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.');
  mediaContent.append(name, type);
  spriteFigure.append(spriteImage);
  mediaLeft.append(spriteFigure);
  mediaDiv.append(mediaLeft, mediaContent);
  contentDiv.append(mediaDiv, infoDiv);
  cardFigure.append(cardImage);
  imageDiv.append(cardFigure);
  cardDiv.append(imageDiv, contentDiv);
  mainContent.append(cardDiv);
}
>>>>>>> 9f780e328f44188b465383e6fe386882007bd6d4
