let recipeCardSection = document.querySelector(".recipe-cards-parent");
let userSection = document.querySelector(".user-list");
let userPantryBtn = document.getElementById("user-pantry-btn");
let showFavesBtn = document.getElementById("show-favorite-recipe-btn");
let showPlannedBtn = document.getElementById("show-planned-btn");
let addToFavesBtn = document.getElementById("add-favorite-recipe-btn");
let addToPlannedBtn = document.getElementById("add-planned-recipe-btn");
let filterBtn = document.getElementById("filter-recipe-btn");
let showAllRecipesBtn = document.getElementById("show-all-btn");
let closeBtn = document.getElementById("#exit-btn");
// let searchBtn = document.getElementById("search-btn");
// let clearSearchBtn = document.getElementById("clear-text-btn");

const generateRandomUser = () => {
  return Math.round(Math.random() * usersData.length);
}
  
const currentUser = new User(usersData[generateRandomUser()]);
const currentPantry = new Pantry(currentUser.pantry);


const welcomeGreeting = () => {
  let greeting = document.querySelector(".user-greeting");
  let firstName = currentUser.name.split(" ")[0];
  greeting.innerText = `Welcome, ${firstName}!`;
}

const populateAllRecipeCards = (recipeList) => {
  recipeList.forEach(recipe => {
    let cardHtml = `
        <div class="recipe-card" id="${recipe.id}">
          <img src=${recipe.image} class="recipe-img" alt="Image of recipe">
            <div class="card-overlay">
              <div class="card-overlay-top">
                <button class="card-btn">
                  <img src="../assets/heart.svg" class="user-icons" id="add-favorite-recipe-btn" id="${recipe.id}" alt="Image of heart">
                </button>   
                <button class="card-btn">
                  <img src="../assets/calendar.svg" class="user-icons" id="add-planned-recipe-btn" alt="Image of calendar">
                </button>
              <h5 class="recipe-title">${recipe.name}</h5>
              </div>
            </div>`
    recipeCardSection.insertAdjacentHTML("beforeend", cardHtml);
  })
}

const populateAllTags = (recipeList) => {
  let tagList = document.querySelector(".tag-list");
  let uniqueTags = [];
  recipeList.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!uniqueTags.includes(tag)) { 
        uniqueTags.push(tag);
        let tagHTML = `<button class="tag-buttons" id="${tag}">${capitalize(tag)}</button>`
        tagList.insertAdjacentHTML('beforeend', tagHTML);
      }
    });
  })
}

const capitalize = (words) => {
  return words.split(" ").map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
};

const loadHandler = () => {
  let greeting = document.querySelector(".user-greeting");
  populateAllTags(recipeData);
  populateAllRecipeCards(recipeData);
  welcomeGreeting();
}

//Pantry Modal
const viewPantryList = () => {
  event.target.id === '#user-pantry-btn';
  openPantryInfo();
}

const openPantryInfo = () => {
  let pantryList = document.querySelector(".pantry-list");
  pantryList.style.display = "inline";
}

const closePantryList = () => {
  let pantryList = document.querySelector(".pantry-list");
  pantryList.style.display = "none";
}

userPantryBtn.addEventListener("click", viewPantryList);
// closeBtn.addEventListener(closePantryList);
// userSection.addEventListener("click", closePantryList); can't get modals to close


// Buttons on Recipe Cards

const addRecipeToFaves = (event) => {
  event.target.id === "#add-favorite-recipe-btn";
  let recipeId = event.path.find(e => e.id).id;
  let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
  currentUser.addFavoriteRecipe(recipe);
}

// addToFavesBtn.addEventListener("click", addRecipeToFaves); says method is null

const addRecipeToPlanned = () => {
  event.target.id === "#add-planned-btn";
  let recipeId = event.path.find(e => e.id).id;
  let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
  currentUser.addPlannedRecipe(recipe);
}

// addToPlannedBtn.addEventListener("click", addRecipeToPlanned);

// Sidebar Buttons

// Recipe Modals

const viewRecipe = () => {
  openAllRecipeInfo()
}

const openAllRecipeInfo = () => {
  let allRecipeInfo = document.querySelector(".recipe-instructions");
  allRecipeInfo.style.display = "inline";
  let recipeId = event.path.find(e => e.id).id;
  let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
  let recipeIngredients = recipe.ingredients;
  generateRecipeDetails(recipe, makeIngredientsReadable(recipeIngredients));
};

const getIngredientName = (recipeIngredient) => {
  return ingredientsData.find(ingredient => recipeIngredient.id === ingredient.id);
}

const makeIngredientsReadable = (recipeIngredients) => {
  return recipeIngredients.map(ingredient => {
    let ingredientName = getIngredientName(ingredient);
    return `${ingredient.quantity.amount} ${ingredient.quantity.unit} ${capitalize(ingredientName.name)}`;
  }).join(", ");
}

const generateRecipeDetails = (recipe, ingredients) => {
  let fullRecipeInfo = document.querySelector(".recipe-instructions");
  let recipeTitle = `
      <button id="exit-btn"><img src="../assets/close.svg" class="close-icon" alt="Close instructions"></button>
       <img src="${recipe.image}" class="recipe-img" id="recipe-modal-img"
       alt = "Image of recipe" >
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <article class="card-ingredients-list">${ingredients}</article>
      <h4>Instructions</h4>
      <article>Boil water</article>
      <h4>Cost</h4>
      <article>Total Recipe Cost:   - Your Pantry:  =  $100!</article>`
  fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
  // document.getElementById("overlay").add();
}

const closeRecipe = () => {
  console.log(test);
  let recipeInfo = document.querySelector(".recipe-instructions");
  recipeInfo.style.display = "none";
  // document.getElementById("overlay").remove();
}

const recipeCardHandler = (event) => {
  if (event.target.className === 'recipe-img') {
    viewRecipe();
  } 
  if (event.target.id === '#exit-btn') {
    closeRecipe();  
  }
}

recipeCardSection.addEventListener("click", recipeCardHandler);



window.onload = loadHandler();



