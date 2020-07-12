// const Recipe = require("./Recipe");

let recipeCardSection = document.querySelector(".recipe-cards-parent");
let userPantryBtn = document.getElementById("user-pantry-btn");
let addToFavesBtn = document.querySelector(".add-favorite-recipe-btn");
let addToPlannedBtn = document.querySelector(".add-planned-recipe-btn");
let showFavesBtn = document.getElementById("show-favorite-recipe-btn");
let showPlannedBtn = document.getElementById("show-planned-btn");
let filterBtn = document.getElementById("filter-recipe-btn");
let showAllRecipesBtn = document.getElementById("show-all-btn");
let closeBtn = document.getElementById("#exit-btn");
// let searchBtn = document.getElementById("search-btn");
// let clearSearchBtn = document.getElementById("clear-text-btn");
// let myPantrySection = document.querySelector(".pantry-list")

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

const populateAllRecipeCards = (recipeList) => {
  recipeList.forEach(recipe => {
    let cardHtml = `
        <div class="recipe-card" id="${recipe.id}">
          <img src=${recipe.image} class="recipe-img" alt="Image of recipe">
            <div class="card-overlay">
              <div class="card-overlay-top">
                <button class="card-btn" class ='add-favorite-recipe-btn'>
                  <img src="../assets/heart.svg" class="user-icons" id="${recipe.id}" alt="Image of heart">
                </button>   
                <button class="card-btn" class="add-planned-recipe-btn">
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
  populateAllRecipeCards(recipeData);
  welcomeGreeting();
}

// Pantry Modal //

const viewPantryList = () => {
  openPantryInfo();
}

const openPantryInfo = () => {
  let pantryList = document.querySelector(".pantry-list");
  pantryList.style.display = "inline";
}

// const generatePantryDetails = () => {}


userPantryBtn.addEventListener("click", viewPantryList);


// Buttons on Recipe Cards //

// const addRecipeToFaves = (event) => {
// let recipeId = event.path.find(e => e.id).id;
// let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
//   currentUser.addFavoriteRecipe(recipe); 
// } /// not functional 

// addToFavesBtn.addEventListener("click", addRecipeToFaves); says method is null

// const addRecipeToPlanned = () => {
//   let recipeId = event.path.find(e => e.id).id;
//   let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
//   currentUser.addPlannedRecipe(recipe);
// } // not functional

// addToPlannedBtn.addEventListener("click", addRecipeToPlanned);



// Sidebar Buttons //

// showPlannedBtn.addEventListener("click", showPlannedRecipes);

// showFavesBtn.addEventListener("click", showFavoriteRecipe);

// const hideRecipes = () => {}

// filterBtn.addEventListener("click", filterRecipes);


showAllRecipesBtn.addEventListener("click", populateAllRecipeCards);

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
  // document.getElementById("overlay").remove();
} 

const recipeCardHandler = (event) => {
  if (event.target.className === 'recipe-img') {
    viewRecipe();
  } 
  if (event.target.className === 'close-icon') {
    closeRecipe();  
  } 
  
}
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Not currently working
// const closePantryList = (event) => {

//   let pantryList = document.querySelector(".pantry-list");
//   console.log('pantryList', pantryList);
//   pantryList.style.display = "none";
// }

// const myPantryHandler = (event) => {
//   console.log('1', event.target);
//   if (event.target.className === "close-icon-pantry") {
//       console.log('2', event.target);
//     closePantryList(event)
//   }
// }

// myPantrySection.addEventListener('click', myPantryHandler)
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  Not currently working

recipeCardSection.addEventListener("click", recipeCardHandler)

window.onload = loadHandler();



