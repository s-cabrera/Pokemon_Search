//place holder for now
var requestUrl = "https://pokeapi.co/api/v2/pokemon?limit=151"
var searchBarData = document.querySelector('.btn')
var pokemonInfo;

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
  var textInput = document.querySelector('.textInput').value
  // console.log(textInput);
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
    // pokemonInfo = 

  })
  // 2nd api call with user input
requestUrl_2 = `https://api.pokemontcg.io/v2/cards?q=name:${textInput}&appid=dbd45731-4537-4e36-83cf-77eafd972ad5`
fetch(requestUrl_2)
  .then(function (response){
    return response.json()
  })
  // clg api 2nd api data
  .then (function(dataApi_2){
    console.log(dataApi_2);

    
  })
})

// function searchHistory(dataApi_2,dataApi_1){
 
// }
// searchHistory()






// tcg api
// https://api.pokemontcg.io/v2/cards?q=name:grookey







