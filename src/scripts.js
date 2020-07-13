// const Recipe = require("./Recipe");
let recipeCardSection = document.querySelector(".recipe-cards-parent");
let sidebarSection = document.querySelector(".filter-options");
let userProfileSection = document.querySelector(".user-list");

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
  recipeCardSection.innerHTML = "";
  recipeCardSection.insertAdjacentHTML("beforeend",`<div class="recipe-modal"></div>`);
  recipeList.forEach(eachRecipe => {
    recipe = new Recipe(eachRecipe);
    let cardHtml = `
        <div class="recipe-card" id="${recipe.id}">
          <img src=${recipe.image} class="recipe-img" alt="Image of recipe">
            <div class="card-overlay">
              <div class="card-overlay-top">
                <button class="card-btn add-favorite-recipe-btn">
                  <img src="../assets/heart.svg" class="user-icons red-heart add-to-favorite" id="${recipe.id}" alt="Image of heart">
                </button>   
                <button class="card-btn" class="add-planned-recipe-btn" id="${recipe.id}">
                  <img src="../assets/calendar.svg" class="user-icons calendar add-to-planned" id="${recipe.id}" alt="Image of calendar">
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
  recipeList.forEach(eachRecipe => {
    recipe = new Recipe(eachRecipe);
    recipe.tags.forEach(tag => {
      if (!uniqueTags.includes(tag)) { 
        uniqueTags.push(tag);
        let tagHTML = `<button class="tag-buttons" id="${tag}">${recipe.capitalize(tag)}</button>`
        tagList.insertAdjacentHTML('beforeend', tagHTML);
      }
    });
  })
}

const loadHandler = () => {
  let greeting = document.querySelector(".user-greeting");
  populateAllTags(recipeData);
  populateRecipeCards(recipeData);
  welcomeGreeting();
}

// Pantry Modal //

const openPantryInfo = () => {
  let pantryModal = document.querySelector(".pantry-modal");
  pantryModal.style.display = "inline";
  displayPantryHeader();
}

const displayPantryIngredients = () => {
  return currentPantry.getPantryIngredients(ingredientsData, recipeData).map(ingredient => {
    return `${recipe.capitalize(ingredient.name)}: ${ingredient.quantity} ${ingredient.unit}</br>`;
  }).join("");
}

const displayPantryHeader = () => {
  let pantryModal = document.querySelector(".pantry-modal");
  pantryModal.innerHTML = "";
  let ingredients = displayPantryIngredients();
  let pantryHTML = `
        <button id="exit-btn"><img src="../assets/close.svg" class="close-icon close-icon-pantry" alt="Close instructions"></button>
        <h5 id="pantry-title">My Pantry</h5> 
        <article class="pantry-content">You have the following ingredients in your pantry: </br> </br>${ingredients}</br></article>`;
  pantryModal.insertAdjacentHTML("beforeend", pantryHTML);
}

const closePantryList = () => {
  let pantryModal = document.querySelector(".pantry-modal");
  pantryModal.style.display = "none";
};

const userSectionHandler = (event) => {
  if (event.target.className === "user-list-btns pantry-btn") {
    openPantryInfo();
  }
  if (event.target.className === "close-icon close-icon-pantry") {
    closePantryList();
  }
  if (event.target.className === "user-list-btns show-favorite-btn") {
    populateRecipeCards(currentUser.favoriteRecipes);
  }
  if (event.target.className === "user-list-btns show-planned-btn") {
    populateRecipeCards(currentUser.plannedRecipes);
  }
};

userProfileSection.addEventListener("click", userSectionHandler);

// Sidebar Buttons //
const sidebarButtonsHandler = (event) => {
  // if (event.target.className === "filter-btns show-favorite-btn") {
  //   populateRecipeCards(currentUser.favoriteRecipes);
  // }
  // if (event.target.className === "filter-btns show-planned-btn") {
  //   populateRecipeCards(currentUser.plannedRecipes);
  // }
  if (event.target.className === "filter-btns show-all-btn") {
    populateRecipeCards(recipeData);
  }
}

sidebarSection.addEventListener("click", sidebarButtonsHandler);

// RECIPE MODALS //

const viewRecipe = (recipe) => {
  let allRecipeInfo = document.querySelector(".recipe-modal");
  allRecipeInfo.innerHTML = "";
  allRecipeInfo.style.display = "inline";
  displayRecipeDetails(recipe, ingredientsData);
};
 
const getNeededIngredientsList = (recipe, ingredientsList) => {
  return currentPantry.createGroceryList(recipe, ingredientsList).map(ingredient => {
    return `${recipe.capitalize(ingredient.name)} $${ingredient.cost.toFixed(2)}</br>`;
  }).join(" ");
}

const displayRecipeDetails = (recipe, ingredientsList) => {
  let ingredients = recipe.getIngredients(ingredientsList);
  let instructions = recipe.getInstructions();
  let neededIngredients = getNeededIngredientsList(recipe, ingredientsList);
  let totalCostNeeded = currentPantry.getTotalCostOfGroceries(recipe, ingredientsList).toFixed(2);
  let recipeModalContent = document.querySelector(".recipe-modal");
  let recipeContent = `
      <button id="exit-btn"><img src="../assets/close.svg" class="close-icon" alt="Close instructions"></button>
       <img src="${recipe.image}" class="recipe-img" id="recipe-modal-img"
       alt = "Image of recipe" >
      <h3 id="recipe-title">${recipe.name}</h3>
      <div class="modal-btns">
        <button class="card-btn add-favorite-recipe-btn" id="modal-icons">
          <img src="../assets/heart.svg" class="user-icons red-heart add-to-favorite" id="${recipe.id}" alt="Image of heart">
        </button>
        <button class="card-btn" class="add-planned-recipe-btn" id="${recipe.id}">
           <img src="../assets/calendar.svg" class="user-icons calendar add-to-planned" id="${recipe.id}" alt="Image of calendar">
        </button> 
      </div>  
      <h4>Ingredients</h4>
      <article class="card-ingredients-list">${ingredients}</br></article>
      <h4>Instructions</h4>
      <article "card-instructions-list">${instructions}</article>
      <h4>Cost</h4>
      <article "card-cost-details">Based on what's available in your pantry, you need to spend <b>$${totalCostNeeded}</b> and purchase the following ingredients:</br> </br> ${neededIngredients}.</article>`;
  recipeModalContent.insertAdjacentHTML("beforeend", recipeContent);
}

//^^ need to refactor

const closeRecipe = () => {
  let recipeInfo = document.querySelector(".recipe-modal");
  recipeInfo.style.display = "none";
} 

// RECIPE CARD BUTTONS //

const toggleFavoriteRecipe = (event, recipe) => {
  recipe = recipeData.find(recipe => recipe.id === Number(event.target.id));
  if (!recipe.isFavorite) {
    makeFavorite(event, recipe);
    // persistIconState(event.target, recipe)
  } else {
    makeUnfavorite(event, recipe);
  }
};

const makeFavorite = (event, recipe) => {
  recipe.isFavorite = true;
  event.target.src = "../assets/heart-active.svg";
  currentUser.addFavoriteRecipe(recipe);
};

const makeUnfavorite = (event, recipe) => {
  recipe.isFavorite = false;
  event.target.src = "../assets/heart.svg";
  currentUser.deleteFavoriteRecipe(recipe);
};

const togglePlannedRecipe = (event, recipe) => {
  recipe = recipeData.find(recipe => recipe.id === Number(event.target.id));
  if (!recipe.isPlanned) {
    makePlanned(event, recipe);
  } else {
    makeUnplanned(event, recipe);
  }
};

const makePlanned = (event, recipe) => {
  currentUser.addPlannedRecipe(recipe);
  event.target.src = "../assets/calendar-active.svg";
  recipe.isPlanned = true;
};

const makeUnplanned = (event, recipe) => {
  currentUser.deletePlannedRecipe(recipe);
  event.target.src = "../assets/calendar.svg";
  recipe.isPlanned = false;
};

const recipeCardHandler = (event) => {
  if (event.target.className === "close-icon") {
    closeRecipe();
  } 
  if (event.target.className === "recipe-img") {
    let targetRecipeID = event.target.closest(".recipe-card").id; 
    let targetRecipe = recipeData.find((recipe) => recipe.id === Number(targetRecipeID));
    let recipe = new Recipe(targetRecipe);
    viewRecipe(recipe);
  }
  if (event.target.className === "user-icons red-heart add-to-favorite") {
    toggleFavoriteRecipe(event, recipe);
  }
  if (event.target.className === "user-icons calendar add-to-planned") {
    togglePlannedRecipe(event, recipe);
  }
}

//>>>>>>>>>>>>>>>>. function not working.
// const persistIconState = (eventTarget, recipe) => {
//   recipe = recipeData.find(recipe => recipe.id === Number(event.target.id));
//   console.log('recipe', recipe);
//   let myFavorites = currentUser.favoriteRecipes;
//   let myPlanned = currentUser.plannedRecipes;
//   myFavorites.forEach(fav => {
//       eventTarget.src = "../assets/heart-active.svg";
  
//   })
//   // console.log('Fav', myFavorites, 'myPlanned', myPlanned);
// }

recipeCardSection.addEventListener("click", recipeCardHandler);

window.onload = loadHandler();


