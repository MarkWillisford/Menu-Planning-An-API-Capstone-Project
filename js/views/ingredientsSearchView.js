function getIngredientsView(){
	ingredientsView = `
  <div class="ingredientsView"
    <h1>Search by Ingredients</h1>
    <section>
      <form class="searchIngredientsForm" action="Unknown" method="post">
        <legend class="searchFields"></legend>
          <div class="searchParamaterGroups">
            <div class="searchParamaterGroup">
              <label><input type="text" class="searchParamaterText" name="searchParamater" placeholder="Enter an ingredient"></label>
              <button class="js-addGroup disabled" disabled="true">+</button>
              <button class="js-removeGroup disabled" disabled="true">-</button>
            </div>       
          </div> 
        <button type="submit" class="js-submitButton disabled" disabled="true">Search</button>

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