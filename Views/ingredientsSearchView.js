function getIngredientsView(){
	ingredientsView = `
  <div class="ingredientsView"
    <h1>Search by Ingredients</h1>
    <section>
      <form class="searchForm" action="Unknown" method="post">
        <legend class="searchFields"></legend>
          <div class="searchParamaterGroup">
            <label><input type="text" name="searchParamater" placeholder="Enter an ingredient"></label>
            <button class="addGroup">+</button>
            <button class="removeGroup">-</button>
          </div>        
        <button type="submit" class="js-submitButton">Search</button>
      </form>
    </section>
  </div>
	`;
  return ingredientsView;
}