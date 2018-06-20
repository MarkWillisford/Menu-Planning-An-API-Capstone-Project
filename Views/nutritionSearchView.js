function getNutritionView(){
	nutritionView = `
	  <div class="nutritionView"
	    <h1>Search by nutrition information</h1>
	    <section>
	      <form class="searchNutritionForm" action="Unknown" method="post">
	        <legend class="searchFields"></legend>
	          <div class="searchParamaterGroups">
	            <div class="searchParamaterGroup">
	              <label><input type="text" class="searchParamaterText" name="searchParamater" placeholder="Enter an ingredient"></label>
	              <button class="js-addGroup disabled" disabled="true">+</button>
	              <button class="js-removeGroup disabled" disabled="true">-</button>
	            </div>       
	          </div> 
	        <button type="submit" class="js-submitButton disabled" disabled="true">Search</button>

	        <fieldset>
	          <legend class="optionalFilters">Optional Filters</legend>
	          <label>Mexican Food<input id="optionalCheckBox" type="checkbox" name="mexicanFoodCB"></label>
	        </fieldset>
        
	      </form>
	    </section>
	  </div>
	`;
  return nutritionView;
}