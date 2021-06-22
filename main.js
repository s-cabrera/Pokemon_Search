//place holder for now
var requestUrl = "https://pokeapi.co/api/v2/pokemon?limit=151"
var searchBarData = document.querySelector('.btn')

// event listener that takes user input and displays data of pokimon in web console 


async function getApi(requestUrl){
  fetch(requestUrl)
  .then(function (response){
    return response.json()
  })
  .then (function(data){
  
    
  

  })
}
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
  .then (function(dataAb){
    console.log(dataAb);
  })
})









