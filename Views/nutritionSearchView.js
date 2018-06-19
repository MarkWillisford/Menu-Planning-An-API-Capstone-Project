function getNutritionView(){
	nutritionView = `
	  <div class="nutritionView"
	    <h1>Search by nutrition information</h1>
	    <section>
	      <form class="searchForm" action="Unknown" method="post">
	        <legend class="searchFields"></legend>
	          <div class="searchParamaterGroup">
	            <label><input type="text" name="searchParamater" placeholder="Enter a nutriant: I.E. 'vitamin d'"></label>
	            <button class="addGroup">+</button>
	            <button class="removeGroup">-</button>
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
  return nutritionView;
}