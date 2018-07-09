function getIngredientsView(){
	ingredientsView = `
  <div class="ingredientsView">
    <section class="ingredientsSearchView">
      <h2>Search Recipes</h2>
      <form class="searchIngredientsForm" action="Unknown" method="post">
        <legend class="searchFields"></legend>
        <div class="searchParamaterGroups">
          <h3>
            <span></span>
            Ingredients to search for:
          </h3>
          <div class="searchParamaterGroup">
            <label><input type="text" class="searchParamaterText" name="searchParamater" placeholder="Enter an ingredient"></label>
            <button class="js-addGroup disabled" disabled="true">+</button>
            <button class="js-removeGroup disabled" disabled="true">-</button>
          </div>       
        </div>

        <div class="additionalSearchParamaters">          
          <h3>
            <span></span>
            Search Options:
          </h3>
          <label for="searchNumResultsText">Number of Results:</label>         <br>
          <input type="Number" min="1" max="20" value="10" class="searchNumResultsText" id="searchNumResultsText" name="searchNumResults" placeholder="1 to 20, default is 10"><br>
          <label class="selShoppingPriorityLbl">
            Ranking<br>
            <select class="selShoppingPriority">
              <option value="1" selected="selected">Maximized used ingredients</option>
              <option value="2">Minimize missing ingredients</option>
            </select>
          </label>
        </div>

        <button type="submit" class="js-submitButton disabled" disabled="true">Search >></button>

        <!-- This feature is unavailable at this time, it has been suggested as a possible feature
        <fieldset>
          <legend class="optionalFilters">Optional Filters</legend>
          <label>Mexican Food<input id="optionalCheckBox" type="checkbox" name="mexicanFoodCB"></label>
        </fieldset>
        -->

      </form>
    </section>
  </div>
	`;
  return ingredientsView;
}