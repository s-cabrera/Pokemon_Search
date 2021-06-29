//place holder for now
var requestUrl = "https://pokeapi.co/api/v2/pokemon?limit=151"
var searchBarData = document.querySelector('.button')

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






