function getWelcomeView(){
	welcomeView = `
        <h1>Welcome</h1>
          <section>
            <p>
              Welcome to our meal preparation and Nutrition reference tool
            </p>
            <div class="dropdown">
            <button class="js-beginButton">Search Recipies</button>
              <div id="searchOptionsDropdown" class="dropdown-content">
                <a href="#">Search by Ingredients</a>
                <a href="#">Search by Nutrition Information</a>
              </div>
            </div>
          </section>
	`;
  return welcomeView;
}