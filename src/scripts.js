let recipeCardSection = document.querySelector(".recipe-cards-parent");
let greeting = document.querySelector(".user-greeting");
// let userPantryBtn = document.getElementById("user-pantry-btn");
// let userGroceryBtn =  document.getElementById("user-grocery-list-btn");
// let addToFavesBtn = document.getElementById("add-favorite-recipe-btn");
// let addToPlannedBtn = document.getElementById("add-planned-recipe-btn");
// let filterBtn = document.getElementById("filter-recipe-btn");

const generateRandomUser = () => {
  return Math.round(Math.random() * usersData.length);
}
  
const currentUser = new User(usersData[generateRandomUser()]);

// userGroceryBtn.addEventListener("click", showGroceryList);
// userPantryBtn.addEventListener("click", showPantryContents);

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

// const generateRecipeDetails = (recipe, ingredients) => {
//   let fullRecipeInfo = document.querySelector(".recipe-instructions");
//   let recipeTitle = `
//       <button id="exit-recipe-btn"><img src="../assets/close.svg" class="close-icon" alt="Close instructions"></button>
//        <img src="${recipe.image}" class="recipe-img" id="recipe-modal-img"
//        alt = "Image of recipe" >
//       <h3 id="recipe-title">${recipe.name}</h3>
//       <h4>Ingredients</h4>
//       <ul class="ingredients-list">${ingredients}</ul>
//       <h4>Instructions</h4>
//       <h4>Cost</h4>` 
//   fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
// }

const viewRecipe = (event) => {
  event.target.closest('.recipe-card');
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

const generateRecipeDetails = (recipe, ingredients, instructions, cost) => {
  let fullRecipeInfo = document.querySelector(".recipe-instructions");
  let recipeTitle = `
      <button id="exit-recipe-btn"><img src="../assets/close.svg" class="close-icon" alt="Close instructions"></button>
       <img src="${recipe.image}" class="recipe-img" id="recipe-modal-img"
       alt = "Image of recipe" >
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Ingredients</h4>
      <article class="card-ingredients-list>${ingredients}</article>
      <h4>Instructions</h4>
      <article class="card-ingredients>${ingredients}</article>
      <h4>Cost</h4>`
  fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
}


// const generateInstructions = (recipe) => {
//   let fullRecipeInfo = document.querySelector(".recipe-instructions");
//   let instructionsList = "";
//   let instructions = recipe.instructions.map(i => {
//     return i.instruction
//   });
//   instructions.forEach(i => {
//     instructionsList += `<li>${i}</li>`
//   });
//   fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
//   fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol class="instructions">${instructionsList}</ol>`);
// },

const closeRecipe = () => {
  let allRecipeInfo = document.querySelector(".recipe-instructions");
  allRecipeInfo.style.display = "block";
},


const recipeCardHandler = (event) => {
  if (event.target.classList.contains('.recipe-img')) {
    viewRecipe(event);
  }; 
  if (event.target.id === 'exit-recipe-btn') {
    closeRecipe(event);  
  };
},

recipeCardSection.addEventListener("click", recipeCardHandler);



window.onload = loadHandler();



