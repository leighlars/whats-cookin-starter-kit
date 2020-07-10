let recipeCardSection = document.querySelector(".recipe-cards-parent");
let greeting = document.querySelector(".user-greeting");
let userPantryBtn = document.getElementById("user-pantry-btn");
let userGroceryBtn =  document.getElementById("user-grocery-list-btn");
let addToFavesBtn = document.getElementById("add-favorite-recipe-btn");
let addToPlannedBtn = document.getElementById("add-planned-recipe-btn");
let filterBtn = document.getElementById("filter-recipe-btn");


const generateRandomUser = () => {
  return Math.round(Math.random() * usersData.length);
}
  
const currentUser = new User(usersData[generateRandomUser()]);


userGroceryBtn.addEventListener("click", showGroceryList);
userPantryBtn.addEventListener("click", showPantryContents);
recipeCardSection.addEventListener("click", openAllRecipeInfo);



const welcomeGreeting = () => {
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
                  <img src="../assets/heart.svg" class="user-icons" alt="Image of heart">
                </button>   
                <button class="card-btn">
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
  populateAllTags(recipeData);
  populateAllRecipeCards(recipeData);
  welcomeGreeting();
}

// recipe modals

// const generateRecipeTitle = (recipe, ingredients) => {
//   let fullRecipeInfo = document.querySelector(".recipe-instructions");
//   let recipeTitle = `
//       <button id="exit-recipe-btn"><img src="../assets/close.svg" class="close-icon" alt="Close instructions"></button>
//       <h3 id="recipe-title">${recipe.name}</h3>
//       <h4>Ingredients</h4>
//       <p>${ingredients}</p>`
//   fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
// },

// const addRecipeImage = (recipe) => {
//   document.getElementById("recipe-title").style.backgroundImage = `url(${recipe.image})`;
// },

// const generateInstructions = (recipe) => {
//   let allRecipeInfo = document.querySelector(".recipe-instructions");
//   let instructionsList = "";
//   let instructions = recipe.instructions.map(i => {
//     return i.instruction
//   });
//   instructions.forEach(i => {
//     instructionsList += `<li>${i}</li>`
//   });
//   allRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
//   allRecipeInfo.insertAdjacentHTML("beforeend", `<ol class="instructions">${instructionsList}</ol>`);
// },

// const generateRecipeBtns = (recipe) => {
//   let allRecipeInfo = document.querySelector(".recipe-instructions");
//   let recipeButtons = `
//       <button class="cook-recipe" disabled id="${recipe.id}">Cook This Recipe</button>
//       <button class="calculate-cost" id="${recipe.id}">Cost to Cook</button>
//       <button class="check-pantry" id="${recipe.id}">Check Pantry</button>
//       `;
//   allRecipeInfo.insertAdjacentHTML("beforeend", recipeButtons);
// }, 

// const openAllRecipeInfo = () => {
//   let allRecipeInfo = document.querySelector(".recipe-instructions");
//   allRecipeInfo.style.display = "inline";
//   let recipeId = event.path.find(e => e.id).id;
//   let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
//   generateRecipeTitle(recipe, generateIngredients(recipe));
//   addRecipeImage(recipe);
//   generateInstructions(recipe);
//   generateRecipeBtns(recipe);
//   allRecipeInfo.insertAdjacentHTML("beforebegin", "<section id='overlay'></section>");
// };

// const closeRecipe = () => {
//   let allRecipeInfo = document.querySelector(".recipe-instructions");
//   allRecipeInfo.style.display = "block";
// },


window.onload = loadHandler();



if (typeof module !== 'undefined') {
  module.exports = domUpdates;
}

