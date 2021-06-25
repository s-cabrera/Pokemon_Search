var requestUrl;
var searchButton = $('#search_btn');
var mainContent = $('#display');

async function getApi(requestUrl){
  fetch(requestUrl)
  .then(function (response){
    return response.json()
  })
  .then (function(){
  })
}
// event listener that takes user input and displays data of pokimon in web console 
// getApi(requestUrl);
searchButton.on('click',function(event) {
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
    displayPokemon(dataApi_1);
  })
})
// requestUrl_2 = `https://api.pokemontcg.io/v2/cards?q=name:${textInput}&appid=9f5ed968cd7052cfa23b29d8fa2f4bad`
// fetch(requestUrl_2)
//   .then(function (response){
//     return response.json()
//   })
//   .then (function(dataApi_2){
//     console.log(dataApi_2);
//   })
// })

// tcg api
// https://api.pokemontcg.io/v2/cards?q=name:grookey

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
