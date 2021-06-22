var requestUrl;
var searchBarData = document.querySelector('.btn')

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
  })
requestUrl_2 = `https://api.pokemontcg.io/v2/cards?q=name:${textInput}&appid=9f5ed968cd7052cfa23b29d8fa2f4bad`
fetch(requestUrl_2)
  .then(function (response){
    return response.json()
  })
  .then (function(dataApi_2){
    console.log(dataApi_2);
  })
})





// tcg api
// https://api.pokemontcg.io/v2/cards?q=name:grookey







