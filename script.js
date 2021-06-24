var searchInputEl = $('#search_input');
var searchBtnEl = $('search_btn');




var  searchBtnHandler = function(){
    if(searchInputEl.val().length === 0){
        console.log("NO input");
    }
    console.log("");
}


searchBtnEl.on('click', searchBtnHandler);