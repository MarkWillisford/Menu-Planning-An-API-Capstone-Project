'use strict';
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

/*    function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: `${searchTerm} in:name`,
      per_page: 5,
      part: 'snippet',
      key: 'AIzaSyAO2Uspz6K8ulVW0pVLlh-q9nR8BeJXJ2I'
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    error: function(e){
      console.log(e);
    }
  };

  //console.log(`parmObject created: ${settings}`);
  $.ajax(settings);
}       */

/*    function renderResult(result) {
  return `
    <div>      
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><img src="${result.snippet.thumbnails.medium.url}"></a>
    </div>
  `;
}     */

/*    function displayYouTubeSearchData(data) {  
  const results = data.items.map((item, index) => renderResult(item));
  console.log(data);
  $('.js-search-results').html(results);
  
}     */



/*    function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    //console.log(`about to search for ${query}`);
    getDataFromApi(query, displayYouTubeSearchData);
  });
}     */

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
}

$(runApp);
