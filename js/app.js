'use strict';
const SEARCH_BY_INGREDIENTS_UTL = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/
recipes/findByIngredients`;
const RECIPE_INFORMATION_UTL = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/`;
let RECIPIE_SEARCH_RESULTS = {};

// This function listens for the user to click on the welcome screen search button
function startSearchButton(){
  $('.main').on('click', '.js-beginButton', function (event) {
    $('.dropdown-content').toggleClass("show");
  });
 };

// These two functions listen for the user to select one of the dropdown buttons made viewable by the above function
function searchByIngredientsButton(){
  $('.main').on('click', '.js-searchByIngredientsViewBtn', function (event) {    
    $('.welcomeView').remove();
    render(getIngredientsView());
  });  
}

// This function listens for the user to select the back to search button after entering invalid data
function backToSearch(){
  $('.main').on('click', '.js-backToSearchBtn', function (event) {    
    $('.main > div ').remove();
    render(getIngredientsView());
  });  
}

// This feature is unavailable at this time, it has been suggested as a possible feature
function searchByNutritionButton(){
  $('.main').on('click', '.js-searchByNutritionViewBtn', function (event) {    
    $('.welcomeView').remove();
    render(getNutritionView());
  });  
}

// This function listens for button click and adds a group of elements allowing for an additional 
// ingrediant to be searched for
function addSearchParamaterGroup(){
  $('.main').on('click', '.js-addGroup', function (event) {    
    event.preventDefault();   
    $(this).parent().parent().append(
      `<div class="searchParamaterGroups">
        <div class="searchParamaterGroup">
          <label><input type="text" class="searchParamaterText" name="searchParamater" placeholder="Enter an ingredient"></label>
          <button class="js-addGroup disabled" disabled="true">+</button>
          <button class="js-removeGroup">-</button>
        </div>       
      </div>`
    );

    // Activate the current groups removal button and deactivate the current add button
    $(this).prop('disabled',true).addClass('disabled');
    $(this).next().prop('disabled',false).removeClass('disabled');
  });  
}

// this function listens for a button click and removes the group of elements
function removeSearchParamaterGroup(){
  $('.main').on('click', '.js-removeGroup', function (event) {    
    event.preventDefault();
    $(this).closest('.searchParamaterGroup').remove();

    // Check for a single group remaining and if so deactivate the removal button
    if($('.searchParamaterGroup').length===1){
      $('.js-removeGroup').prop('disabled',true).addClass('disabled');
      if($('.searchParamaterText').val().length!==0){
        $('.js-addGroup').prop('disabled',false).removeClass('disabled');
      }
    }
  });    
}

// This function will listen to the text boxes and activates a number of buttons once the user inputs data
function onTypingInSearch(){
  $('.main').on('input', '.searchParamaterText', function (event) {  
    // console.log('yes Im listening');
    // if there is at least single char then activate the submission and + buttons
    if($(this).val().length>0){
      $('.js-submitButton').prop('disabled',false).removeClass('disabled');
      $(this).parent().next().prop('disabled',false).removeClass('disabled');
    }
    // if there are now zero characters then deactivate the same buttons
    else if($(this).val().length===0){
      $(this).parent().next().prop('disabled',true).addClass('disabled');
    }
  });   
}

// This function listens for the user to press the submit button on a search page
function searchByIngredientsSubmitButton(){
  $('.main').on('submit', '.searchIngredientsForm', function (event) { 
    // console.log("Hi in searchByIngredientsSubmitButton");
    event.preventDefault();

    // first get an array of all the text boxes
    const queryBoxesValues = [];
    let values = $('.searchParamaterText').filter(function() {
      return $(this).val();
    }).get(); // converts collection to array

    // turn it into an array of the values in those text boxes
    for(let i=0;i<values.length;i++){
      // console.log(values[i].value);
      queryBoxesValues.push(values[i].value);
    }
    // then turn that array into a JSON object
    const queryBoxesValuesJSON = JSON.stringify(queryBoxesValues);
    // console.log(queryBoxesValues);

    // check the number of results text box for optional input
    const queryResultsTarget = $(event.currentTarget).find('.searchNumResultsText');
    const queryResults = queryResultsTarget.val();

    // check the select element 
    const shoppingPriority = $(event.currentTarget).find('.selShoppingPriority option:selected').val();

    // and finally send it off to the API with the call back function
    if(queryResults){
      getDataFromIngredientsApi(queryBoxesValuesJSON, displaySearchDataWrapper, shoppingPriority, queryResults);
    } else {
      getDataFromIngredientsApi(queryBoxesValuesJSON, displaySearchDataWrapper, shoppingPriority);
    }
  });  
}

// This function builds the data and calls the AJAX .getJSON method
function getDataFromIngredientsApi(searchTerm, callback, shoppingPriority, queryResults = 10){
  // console.log("Hi in getDataFromIngredientsApi");
  // console.log(searchTerm);
  $.ajax({
    url: SEARCH_BY_INGREDIENTS_UTL,
    type: 'GET',
    data: {
      fillIngredients: "true",
      ingredients: searchTerm,
      limitLicense: "false",
      number: queryResults,    
      ranking: shoppingPriority
    },
    datatype: 'json',
    success: callback,
    error: function(err) { console.log(err); },
    beforeSend: function(xhr) {
      // This is a free api so this isn't an issue, however!  BAD CODE!
      xhr.setRequestHeader("X-Mashape-Key", "b12jWQWQxfmshv0FFKT9wsWFthTkp189NfbjsnisHkjkNVMsjm");  
      xhr.setRequestHeader("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/");
    }
  });
}

// This function builds the data and calls the AJAX .getJSON method
function getDataFromRecipiesApi(searchTerm, callback){
  // console.log(searchTerm);
  $.ajax({
    url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${searchTerm}/information`,
    type: 'GET',
    data: {
      id: searchTerm,
      includeNutrition: "true"
    },
    datatype: 'json',
    success: callback,
    error: function(err) { console.log(err); },
    beforeSend: function(xhr) {
      // This is a free api so this isn't an issue, however!  BAD CODE!
      xhr.setRequestHeader("X-Mashape-Key", "b12jWQWQxfmshv0FFKT9wsWFthTkp189NfbjsnisHkjkNVMsjm");  
      xhr.setRequestHeader("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com");
    }
  });
}

// This function sets the global search results variable then calls the display displaySearchData function
function displaySearchDataWrapper(data){
  // Set the global variable
  RECIPIE_SEARCH_RESULTS = data;
  // console.log("Hi in displaySearchDataWrapper");
  // console.log(RECIPIE_SEARCH_RESULTS);

  // Call the display function
  displaySearchData();

}

// These functions will display the results of the AJAX calls to the page
function displaySearchData(){
  // console.log("Hi in displaySearchData");
  // console.log(RECIPIE_SEARCH_RESULTS);  
  // Rendering methods

  // console.log(RECIPIE_SEARCH_RESULTS);

  let html =``
  if(RECIPIE_SEARCH_RESULTS.length<1){
    html =  `
      <section class="errorViewSection">
        <p>
          Please enter a valid ingredient
        </p>
        <button class="js-backToSearchBtn"><< Back to Search</button>          
      </section>      
    `;
  } else {
    html = RECIPIE_SEARCH_RESULTS.map(item => `
      <div class="recipePreview col-3">
        <h3>
          <button class="titleLinkBtn recipeLink" data-id="${item.id}">${item.title}</button>
        </h3>
        <button class="imageLinkBtn">
          <img class="image-link recipeLink" src=${item.image} alt="${item.title}" data-id="${item.id}">
        </button>
        <div class="moreData .col-3">
          <span>
            <!-- Broken API data Uses: ${item.usedIngredientCount}, Missed: ${item.missedIngredientCount}-->
            Click for details
          </span>
        </div>  
      </div>
    `);
  }
  /* temporary - just to make it work for now */
  $('.main > div ').remove();
  /* end temporary code */

  render(getRecipiesResultsView());
  $('.resultsViewSection').html(html);

}

function displayRecipieData(data){
  // Rendering methods

  /* temporary - just to make it work for now */
  $('.main > div ').remove();
  /* end temporary code */

  // console.log(data);
  render(getRecipieView(data));
  $('.main').css("background-color", "rgba(255,255,255,0.75)");
  $('.main').css("color", "black");
  //$('.resultsViewSection').html(html);  
}

function recipieLinkButton(){
  $('.main').on('click', '.recipeLink', function(event){
    event.preventDefault();
    //console.log(`Inside link button function - 'button' has been clicked`);
    //console.log( $(this).attr('data-id') );
    getDataFromRecipiesApi($(this).attr('data-id'), displayRecipieData);
  })
}

// This function listens for a butten click and redisplays search results
function backToSearchResults(){
  $('.main').on('click', '.backToSearchResults', function(event){
    event.preventDefault();
    displaySearchData();
    $('.main').css("background-color", "rgba(0,0,0,0.5)");
    $('.main').css("color", "white");
  })
}

// This function takes an object and a key and varifies that the key value pair exists.
function getProp(object, keys, defaultVal = 'na') {
  keys = Array.isArray(keys) ? keys : keys.replace(/(\[(\d)\])/g, '.$2').split('.');
  object = object[keys[0]];
  if (object && keys.length > 1) {
    return getProp(object, keys.slice(1), defaultVal);
  }
  return object === undefined ? defaultVal : object;
}

// This function accepts a string, converts it to HTML and adds it to the DOM - note: security risk
function render(view){
  $('.main').append(view);
}


function runApp(){
  // Render the starting view by calling a function found in the applicable .js file in the Views 
  // folder. These functions return the needed HTML as a string to pass to the render function above
  render(getWelcomeView());
  // Activate listeners
  startSearchButton();
  searchByIngredientsButton();
  searchByNutritionButton();
  addSearchParamaterGroup();
  removeSearchParamaterGroup();
  onTypingInSearch();
  searchByIngredientsSubmitButton();
  recipieLinkButton();
  backToSearchResults();
  backToSearch();
}

$(runApp);
