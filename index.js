'use strict';
const SEARCH_BY_INGREDIENTS_UTL = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/
recipes/findByIngredients`;

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
    }
  });    
}

// This function will listen to the text boxes and activates a number of buttons once the user inputs data
function onTypingInSearch(){
  $('.main').on('input', '.searchParamaterText', function (event) {  
    console.log('yes Im listening');
    // if there is a single char then activate the submission and + buttons
    if($(this).val().length===1){
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
    getDataFromIngredientsApi(queryBoxesValuesJSON, displaySearchData);
  });  
}

// This function builds the data and calls the AJAX .getJSON method
function getDataFromIngredientsApi(searchTerm, callback){
  console.log(searchTerm);
  $.ajax({
    url: SEARCH_BY_INGREDIENTS_UTL,
    type: 'GET',
    data: {
      fillIngredients: "true",
      ingredients: searchTerm,
      limitLicense: "false",
      number: "10",
      ranking: "1"
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

// This function will display the results of the AJAX call to the page
function displaySearchData(data){
  // console.log(data);  
  // Rendering methods
  const html = data.map(item => `<div>
      <h2>${item.title}</h2>
      <a href=""><img src=${item.image} width="64" height="64" alt=${item.title}></a>
    </div>`);

  /* temporary - just to make it work for now */
  $('.main > div ').remove();
  /* end temporary code */

  render(getRecipiesResultsView());
  $('.resultsViewSection').html(html);
}

// This is a great idea. TODO!
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.js-beginButton')) {

    let dropdowns = $("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
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

}

$(runApp);
