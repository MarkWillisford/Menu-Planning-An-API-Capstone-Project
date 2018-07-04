function getRecipieView(data){
  let pricePerServing = parseInt(data.pricePerServing);

	recipieView = `
  <div class="recipieView">
  	<button class="backToSearchResults">Back to results</button>
    <h1>${data.title}</h1>
    <section class="resultsViewSection">
		<div class="col-12">
    		<img class="recipeImage centered" src=${data.image} alt="${data.title}" data-id="${data.id}">
    	</div>    	
		<div class="referenceLinks col-12">
			<a href="${data.sourceUrl}" target="_blank">Offsite Reference</a>
			<a href="${data.spoonacularSourceUrl}" target="_blank">Spoonacular Reference</a>
		</div>
		<div class="preparationData">
	    	<ul class="preparationDataList">
		    	<li>Prepared In: ${data.preparationMinutes} minutes</li>
		    	<li>Ready In: ${data.readyInMinutes} minutes</li>
		    	<li>Servings: ${data.servings}</li>
		    	<li>Price per serving: $${pricePerServing / 100}</li>
		    </ul>
		</div>

	    <h3 class="col-12">
            <span></span>Ingredients:</h3>	
		<div class="ingredients>"	    
	    	${data.extendedIngredients.map(item => `
	    		<div class="ingredientWrapper">
		    		<div class="ingredient">
		    			<div class="ingredientAmountUS">${item.measures.us.amount} ${item.measures.us.unitLong}</div>
		    			<div class="ingredientImageWrapper">
							<img class="ingredientImage" src="https://spoonacular.com/cdn/ingredients_100x100/${item.image}" alt="${item.name}" data-id="${item.id}">
		    			</div>
		    			<div class="ingredientName">${item.name}</div>
	    			</div>
		    	</div>
		    `)}			
		</div>

	    <h3 class="col-12">
            <span></span>Instructions:</h3>	

		<div class="Instructions">
			<p>${data.instructions}</p>
		</div>

	    <h3 class="col-12">
            <span></span>Nutrition Information:</h3>	

		<p>Overview</p>
		<div class="nutritionOverview">${Math.round(data.nutrition.nutrients[0].amount)} Calories</div>
		<div class="nutritionOverview">${Math.round(data.nutrition.nutrients[7].amount)}g Protein</div>
		<div class="nutritionOverview">${Math.round(data.nutrition.nutrients[1].amount + data.nutrition.nutrients[2].amount)}g Total Fat</div>
		<div class="nutritionOverview">${Math.round(data.nutrition.nutrients[4].amount)}g Sugar</div>
		<div class="nutritionOverview">${Math.round(data.nutrition.nutrients[8].amount)}µg Vitamin K</div>
		<div class="nutritionOverview">${Math.round(data.nutrition.nutrients[3].amount)}g Carbs</div>
    </section>
  </div>
	`;
  return recipieView;
}