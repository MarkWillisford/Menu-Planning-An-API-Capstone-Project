function getWelcomeView(){
	welcomeView = `
	<div class="welcomeView">
      <section class="welcomeViewSection">
        <p>
          Welcome to our meal preparation and nutrition reference tool
        </p>
        <p>
          Whether you are planning a weekday meal for your family or a formal extravaganza with five courses, we can help you find and prepare the right meal for your event, complete with pricing and nutrition information. 
        </p>
        <div class="dropdown">
        <button class="js-searchByIngredientsViewBtn">Search Recipes >></button>
          <!-- This feature is unavailable at this time, it has been suggested as a possible feature
          <div id="searchOptionsDropdown" class="dropdown-content">
            <button class="js-searchByIngredientsViewBtn">Search by Ingredients</button>
            <button class="js-searchByNutritionViewBtn">Search by Nutrition Information</button>
          </div>
          -->
        </div>
      </section>
    </div>
	`;
  return welcomeView;
}