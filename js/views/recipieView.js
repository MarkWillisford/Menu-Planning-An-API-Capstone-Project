function getRecipieView(data){
  let pricePerServing = parseInt(data.pricePerServing);

	recipieView = `
  <div class="recipieView">
  	<button class="backToSearchResults">Back to results</button>
    <h2>${data.title}</h2>
    <section class="resultsViewSection">
		<div class="col-12">
    		<img class="recipeImage centered" src="${data.image}" alt="${data.title}" data-id="${data.id}">
    	</div>    	
		<div class="referenceLinks col-12">
			<a href="${data.sourceUrl}" target="_blank">Offsite Reference</a>
			<a href="${data.spoonacularSourceUrl}" target="_blank">Spoonacular Reference</a>
		</div>
		<div class="preparationData">
	    	<ul class="preparationDataList">
		    	<li>Prepared In: ${getProp(data, "preparationMinutes", "NA")} minutes</li>
		    	<li>Ready In: ${getProp(data, "readyInMinutes", "NA")} minutes</li>
		    	<li>Servings: ${getProp(data, "servings", "NA")}</li>
		    	<li>Price per serving: $${pricePerServing / 100}</li>
		    </ul>
		</div>

	    <h3 class="col-12">
            <span></span>Ingredients:</h3>	
		<div class="ingredients">	    
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
		    `).join("")}			
		</div>

	    <h3 class="col-12">
            <span></span>Instructions:</h3>	

		<div class="instructions">
			<p>${getProp(data, "instructions", "NA")}</p>
		</div>

	    <h3 class="col-12">
            <span></span>Nutrition Information:</h3>	

        <div class="nutrition">
			<p>Overview</p>
			<div class="nutritionOverview">${Math.round(getProp(data, "nutrition.nutrients[0].amount", 0))} Calories</div>
			<div class="nutritionOverview">${Math.round(getProp(data, "nutrition.nutrients[7].amount", 0))}g Protein</div>
			<div class="nutritionOverview">${Math.round(getProp(data, "nutrition.nutrients[1].amount", 0) + 
						getProp(data, "nutrition.nutrients[2].amount", 0))}g Total Fat</div>
			<div class="nutritionOverview">${Math.round(getProp(data, "nutrition.nutrients[4].amount", 0))}g Sugar</div>
			<div class="nutritionOverview">${Math.round(getProp(data, "nutrition.nutrients[8].amount", 0))}µg Vitamin K</div>
			<div class="nutritionOverview">${Math.round(getProp(data, "nutrition.nutrients[3].amount", 0))}g Carbs</div>
    	</div>
    </section>
  </div>
	`;
  return recipieView;
}