function getRecipieView(data){
  let pricePerServing = parseInt(data.pricePerServing);

	recipieView = `
  <div class="recipieView"
    <h1>${data.title}</h1>
    <section class="resultsViewSection">

	    <img class="image" src=${data.image} alt="${data.title}" data-id="${data.id}"></br>
	    <a href="${data.sourceUrl}" target="_blank">Offsite Reference</a>
	    <a href="${data.spoonacularSourceUrl}" target="_blank">Spoonacular Reference</a>
	    <p>Prepared In: ${data.preparationMinutes}</p>
	    <p>Ready In: ${data.readyInMinutes} minutes</p>
	    <p>Servings: ${data.servings}</p>
	    <p>Price per serving: ${pricePerServing / 100}</p>
	    <p>Ingredients:</p>
	    <ul>
	    	${data.extendedIngredients.map(item => `<li class="ingredientsList">			      
		      	${item.name}
		      	<img src="https://spoonacular.com/cdn/ingredients_100x100/${item.image}" width="100" height="100" alt="${item.name}" data-id="${item.id}">
		    </li>`)}
		</ul></br>
		<p>Instructions:</p>
		<div>
			<p>${data.instructions}</p>
		</div>		
		<p>Nutrition Information:</p>
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