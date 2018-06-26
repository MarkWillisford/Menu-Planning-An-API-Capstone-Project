function getWelcomeView(){
	welcomeView = `
	<div class="welcomeView">
      <h1>Come to the Table</h1>
      <section>
        <p>
          Welcome to our meal preparation and Nutrition reference tool
        </p>
        <div class="dropdown">
        <button class="js-searchByIngredientsViewBtn">Search Recipies</button>
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