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

// This feature is unavailable at this time, it has been suggested as a possible feature
function searchByNutritionButton(){
  $('.main').on('click', '.js-searchByNutritionViewBtn', function (event) {    
    $('.welcomeView').remove();
    render(getNutritionView());
  });  
}

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

function removeSearchParamaterGroup(){
  $('.main').on('click', '.js-removeGroup', function (event) {    
    event.preventDefault();
    $(this).closest('.searchParamaterGroup').remove();

    // Check for a single group remaining and if so deactivate the removal button
    if($('.searchParamaterGroup').length===1){
      $('.js-removeGroup').prop('disabled',true).addClass('disabled');
      $('.js-addGroup').prop('disabled',false).removeClass('disabled');
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
      // however we can only deactivate the submit button if all text inputs are empty - so how do I do that . . .   
      // TODO!!
      // $('.js-submitButton').prop('disabled',true).addClass('disabled');
    }
  });   
}

// This function listens for the user to press the submit button on a search page
function searchByIngredientsSubmitButton(){
  $('.main').on('submit', '.searchIngredientsForm', function (event) { 
    event.preventDefault();
    /* Working for Single search paramaters - 
    const queryTarget = $(event.currentTarget).find('.searchParamaterText');
    const query = queryTarget.val(); 
    */

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

    // and finally send it off to the API with the call back function
    getDataFromIngredientsApi(queryBoxesValuesJSON, displaySearchDataWrapper);
  });  
}

// This function builds the data and calls the AJAX .getJSON method
function getDataFromIngredientsApi(searchTerm, callback){
  // console.log(searchTerm);
  $.ajax({
    url: SEARCH_BY_INGREDIENTS_UTL,
    type: 'GET',
    data: {
      fillIngredients: "true",
      ingredients: searchTerm,
      limitLicense: "false",
      number: "10",    // This is currently lowered for testing
      ranking: "1"
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
  // console.log(RECIPIE_SEARCH_RESULTS);

  // Call the display function
  displaySearchData();

}

// These functions will display the results of the AJAX calls to the page
function displaySearchData(){
  // console.log(RECIPIE_SEARCH_RESULTS);  
  // Rendering methods

  const html = RECIPIE_SEARCH_RESULTS.map(item => `<div>
      <h2>${item.title}</h2>
      <!--<a href="">-->
      <img class="image-link" src=${item.image} width="64" height="64" alt="${item.title}" data-id="${item.id}">
      <!--</a>-->
    </div>`);

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

  render(getRecipieView(data));
  //$('.resultsViewSection').html(html);  
}

function recipieLinkButton(){
  $('.main').on('click', '.image-link', function(event){
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
  })
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
}

$(runApp);
