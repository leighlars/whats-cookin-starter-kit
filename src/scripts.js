let recipeCardSection = document.querySelector(".recipe-cards-parent");
let sidebarSection = document.querySelector(".search-options");
let userPantryBtn = document.getElementById("user-pantry-btn");
let closeBtn = document.getElementById("#exit-btn");

// let searchBtn = document.getElementById("search-btn");
// let clearSearchBtn = document.getElementById("clear-text-btn");
// let myPantrySection = document.querySelector(".pantry-list")
let redHeart = document.querySelector('.red-heart');

const generateRandomUser = () => {
  return Math.round(Math.random() * usersData.length);
}
  
const currentUser = new User(usersData[generateRandomUser()]);
const currentPantry = new Pantry(currentUser.pantry);

// DOM display onload

const welcomeGreeting = () => {
  let greeting = document.querySelector(".user-greeting");
  let firstName = currentUser.name.split(" ")[0];
  greeting.innerText = `Welcome, ${firstName}!`;
}

const populateRecipeCards = (recipeList) => {
  // recipeCardSection.innerHTML = "";
  recipeList.forEach(recipe => {
    let cardHtml = `
        <div class="recipe-card" id="${recipe.id}">
          <img src=${recipe.image} class="recipe-img" alt="Image of recipe">
            <div class="card-overlay">
              <div class="card-overlay-top">
                <button class="card-btn" class="add-favorite-recipe-btn">
                  <img src="../assets/heart.svg" class="user-icons red-heart" id="${recipe.id}" alt="Image of heart">
                </button>   
                <button class="card-btn" class="add-planned-recipe-btn" id="${recipe.id}">
                  <img src="../assets/calendar.svg" class="user-icons" alt="Image of calendar">
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
  populateRecipeCards(recipeData);
  welcomeGreeting();
}

// Pantry Modal //

const viewPantryList = () => {
  openPantryInfo();
}

const openPantryInfo = () => {
  let pantryModal = document.querySelector(".pantry-list");
  pantryModal.style.display = "inline";
  generatePantryDetails(pantryModal);
}

const generatePantryDetails = (pantryModal) => {
 
}

userPantryBtn.addEventListener("click", viewPantryList);

// Sidebar Buttons //
const sidebarButtonsHandler = (event) => {
  if (event.target.className === "filter-btns show-favorite-btn") {
    populateRecipeCards(currentUser.favoriteRecipes);
  }
  if (event.target.className === "filter-btns show-planned-btn") {
    populateRecipeCards(currentUser.plannedRecipes);
  }
  if (event.target.className === "filter-btns show-all-btn") {
    populateRecipeCards(recipeData);
  }
}

sidebarSection.addEventListener("click", sidebarButtonsHandler);

// Recipe Modals //

const viewRecipe = () => {
  openAllRecipeInfo()
}

const openAllRecipeInfo = () => {
  let allRecipeInfo = document.querySelector(".recipe-instructions");
  
  allRecipeInfo.innerHTML = "";
  allRecipeInfo.style.display = "inline";
  let recipeId = event.path.find(e => e.id).id;
  let recipeObj = recipeData.find(recipe => recipe.id === Number(recipeId));
  let recipe =  new Recipe(recipeObj); 
  let recipeIngredients = recipe.ingredients;
  generateRecipeDetails(recipe, makeIngredientsReadable(recipeIngredients), getRecipeInstructions(recipe), getNeededIngredientsList(recipe, ingredientsData));
};

const getIngredientName = (recipeIngredient) => {
  return ingredientsData.find(ingredient => recipeIngredient.id === ingredient.id);
}

const makeIngredientsReadable = (recipeIngredients) => {
  return recipeIngredients.map(ingredient => {
    let ingredientName = getIngredientName(ingredient);
    return `${ingredient.quantity.amount} ${ingredient.quantity.unit} ${capitalize(ingredientName.name)}</br>`;
  }).join(" ");
}

const getRecipeInstructions = (recipe) => {
  return recipe.getInstructions();
}

const getNeededIngredientsList = (recipe, ingredientsList) => {
  return currentPantry.createGroceryList(recipe, ingredientsList).map(ingredient => {
    return `${capitalize(ingredient.name)} $${Math.round(ingredient.cost)}</br>`;
  }).join(" ");
}

const generateRecipeDetails = (recipe, ingredients, instructions, neededIngredients, totalCost) => {
  let fullRecipeInfo = document.querySelector(".recipe-instructions");
  let recipeTitle = `
      <button id="exit-btn"><img src="../assets/close.svg" class="close-icon" alt="Close instructions"></button>
       <img src="${recipe.image}" class="recipe-img" id="recipe-modal-img"
       alt = "Image of recipe" >
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <article class="card-ingredients-list">${ingredients}</article>
      <h4>Instructions</h4>
      <article>${instructions}</article>
      <h4>Cost</h4>
      <article>To make this recipe, you need to buy: </br> ${neededIngredients}.</br>For a total of $${totalCost}.</article>`
  fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
}

const closeRecipe = () => {
  let recipeInfo = document.querySelector(".recipe-instructions");
  recipeInfo.style.display = "none";
} 

const recipeCardDisplayHandler = (event) => {
  if (event.target.className === 'recipe-img') {
    viewRecipe();
  } 
  if (event.target.className === 'close-icon') {
    closeRecipe();  
  }   
}

const addRecipeToPlanned = (event) => {
  if (event.target.className === "add-planned-recipe-btn") {
    let recipeId = event.path.find(e => e.id).id;
    let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
    currentUser.addPlannedRecipe(recipe);
  }
}; // not adding to planned recipe

const addRecipeToFavorites = (event) => {
  if (event.target.className === "user-icons red-heart") {
    event.target.src = '../assets/heart-active.svg';
    let recipe = recipeData.find(recipe => recipe.id === Number(event.target.id));
    currentUser.addFavoriteRecipe(recipe);
  }
}

recipeCardSection.addEventListener("click", function() {
  recipeCardDisplayHandler(event);
  addRecipeToFavorites(event);
  addRecipeToPlanned(event); // not adding to planned recipe
})

window.onload = loadHandler();

