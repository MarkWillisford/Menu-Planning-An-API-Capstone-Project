function getIngredientsView(){
	ingredientsView = `
  <div class="ingredientsView"
    <h1>Search by Ingredients</h1>
    <section>
      <form class="searchForm" action="Unknown" method="post">
        <legend class="searchFields"></legend>
          <div class="searchParamaterGroups">
            <div class="searchParamaterGroup">
              <label><input type="text" name="searchParamater" placeholder="Enter an ingredient"></label>
              <button class="js-addGroup">+</button>
              <button class="js-removeGroup">-</button>
            </div>       
          </div> 
        <button type="submit" class="js-submitButton">Search</button>

        <fieldset>
          <legend class="optionalFilters">Optional Filters</legend>
          <label>Mexican Food<input id="optionalCheckBox" type="checkbox" name="mexicanFoodCB"></label>
        </fieldset>
        
      </form>
    </section>
  </div>
	`;
  return ingredientsView;
}