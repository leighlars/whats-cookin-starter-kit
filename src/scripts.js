let recipeCardSection = document.querySelector(".recipe-cards-parent");
let sidebarSection = document.querySelector(".filter-options");
let userProfileSection = document.querySelector(".user-list");
let searchSection = document.querySelector(".search-box")


const generateRandomUser = () => {
  return Math.round(Math.random() * usersData.length);
}
  
const currentUser = new User(usersData[generateRandomUser()]);
const currentPantry = new Pantry(currentUser.pantry);
const tagsSelected = [];

// DOM Display Onload //

const welcomeGreeting = () => {
  let greeting = document.querySelector(".user-greeting");
  let firstName = currentUser.name.split(" ")[0];
  greeting.innerText = `Welcome, ${firstName}!`;
}

const populateRecipeCards = (recipeList) => {
  recipeCardSection.innerHTML = "";
  recipeCardSection.insertAdjacentHTML("beforeend",`<div class="recipe-modal"></div>`);
  recipeList.forEach(eachRecipe => {
    let cardHtml = `
        <section class="recipe-card" id="${eachRecipe.id}">
          <img src=${eachRecipe.image} class="recipe-img" alt="Image of recipe">
            <section class="card-overlay">
              <div class="card-overlay-top">
                <button class="card-btn add-favorite-recipe-btn">
                  <img src="../assets/${eachRecipe.isFavorite ? 'heart-active' :'heart'}.svg" class="user-icons red-heart add-to-favorite" id="${eachRecipe.id}" alt="Image of heart">
                </button>   
                <button class="card-btn" class="add-planned-recipe-btn" id="${eachRecipe.id}">
                  <img src="../assets/${eachRecipe.isPlanned ? 'calendar-active' :'calendar'}.svg" class="user-icons calendar add-to-planned" id="${eachRecipe.id}" alt="Image of calendar">
                </button>
              <h5 class="recipe-title">${eachRecipe.name}</h5>
              </div>
            </section>`
    recipeCardSection.insertAdjacentHTML("beforeend", cardHtml);
  })
}

const populateAllTags = (recipeList) => {
  let tagList = document.querySelector(".tag-list");
  let uniqueTags = [];
  recipeList.forEach(eachRecipe => {
    eachRecipe.tags.forEach(tag => {
      if (!uniqueTags.includes(tag)) { 
        uniqueTags.push(tag);
        let tagHTML = `<button class="tag-buttons" id="${tag}">${capitalize(tag)}</button>`
        tagList.insertAdjacentHTML('beforeend', tagHTML);
      }
    });
  })
}

const capitalize = (words) => {
  return words.split(" ").map((word) =>  word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
};

const loadHandler = () => {
  let greeting = document.querySelector(".user-greeting");
  let recipes = recipeData.map(recipe => new Recipe(recipe));
  populateRecipeCards(recipes);
  populateAllTags(recipes);
  welcomeGreeting();
}

// PANTRY MODAL //

const openPantryInfo = () => {
  document.querySelector(".recipe-modal").style.display = "none";
  let pantryModal = document.querySelector(".pantry-modal");
  pantryModal.style.display = "inline";
  displayPantryHeader();
}


const displayPantryIngredients = () => {
  return currentPantry.getPantryIngredients(ingredientsData, recipeData).map(ingredient => {
    return `${capitalize(ingredient.name)}: ${ingredient.quantity} ${ingredient.unit}</br>`;
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

// SIDEBAR //

const toggleTagButton = () => {
  let tag = event.target.id;
  let tagButton = event.target.closest(".tag-buttons");
  if (!tagButton.classList.contains("active")) {
    tagButton.classList.add("active");
    tagsSelected.push(tag);
  } else {
    tagButton.classList.remove("active");
    let i = tagsSelected.indexOf(tag);
    tagsSelected.splice(i, 1);
  }
  displayRecipesByTag();
} 

const displayRecipesByTag = () => {
  let filteredRecipesByTag = [];
  let recipesWithTags = [];
  tagsSelected.forEach(tag => {
    recipesWithTags = recipesWithTags.concat(currentUser.filterRecipeByTag(tag, recipeData))
  });
  recipesWithTags.forEach(recipe => (!filteredRecipesByTag.includes(recipe)) ? filteredRecipesByTag.push(recipe) : null);
  filteredRecipesByTag.length !== 0 ? populateRecipeCards(filteredRecipesByTag) : populateRecipeCards(recipeData);
}

const sidebarHandler = (event) => {
  if (event.target.closest(".tag-buttons")) {
    toggleTagButton();
  } 
  if (event.target.className === "filter-btns show-all-btn") {
    populateRecipeCards(recipeData);
  }
}

// RECIPE MODAL //

const viewRecipe = (recipe) => {
  document.querySelector(".pantry-modal").style.display = "none";
  let allRecipeInfo = document.querySelector(".recipe-modal");
  allRecipeInfo.innerHTML = "";
  allRecipeInfo.style.display = "inline";
  displayRecipeDetails(recipe, ingredientsData);
};
 
const getNeededIngredientsList = (recipe, ingredientsList) => {
  return currentPantry.createGroceryList(recipe, ingredientsList).map(ingredient => {
    return `${capitalize(ingredient.name)} $${ingredient.cost.toFixed(2)}</br>`;
  }).join(" ");
}

const displayRecipeDetails = (recipe, ingredientsList) => {
  let recipeInstance = new Recipe(recipe);
  let ingredients = recipeInstance.getIngredients(ingredientsList);
  let instructions = recipeInstance.getInstructions();
  let neededIngredients = getNeededIngredientsList(recipe, ingredientsList);
  let totalCostNeeded = currentPantry.getTotalCostOfGroceries(recipe, ingredientsList).toFixed(2);
  let recipeModalContent = document.querySelector(".recipe-modal");
  let recipeContent = `
      <button id="exit-btn"><img src="../assets/close.svg" class="close-icon" alt="Close instructions"></button>
       <img src="${recipe.image}" class="recipe-img" id="recipe-modal-img"
       alt = "Image of recipe" >
      <h3 id="recipe-title">${recipe.name}</h3>
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
  if (!recipe.isFavorite) {
    makeFavorite(event, recipe);
  } else {
    makeUnfavorite(event, recipe);
  }
};

const makeFavorite = (event, recipe) => {
  event.target.src = "../assets/heart-active.svg";
  currentUser.addFavoriteRecipe(recipe);
};

const makeUnfavorite = (event, recipe) => {
  event.target.src = "../assets/heart.svg";
  currentUser.deleteFavoriteRecipe(recipe);
};

const togglePlannedRecipe = (event, recipe) => {
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
  let recipeCard = event.target.closest(".recipe-card");
  if (event.target.className === "close-icon") {
    closeRecipe();
  } else if (recipeCard) {
    let recipe = recipeData.find((recipe) => recipe.id === Number(recipeCard.id));
    if (event.target.className === "recipe-img") {
      viewRecipe(recipe);
    }
    if (event.target.classList.contains('add-to-favorite')) {
      toggleFavoriteRecipe(event, recipe);
    }
    if (event.target.classList.contains('add-to-planned')) {
      togglePlannedRecipe(event, recipe);
    }
  }
}

// SEARCH BOX//

const displaySearchedAllRecipes = (query, ingredientList, recipeList) => {
  let allNameMatches = recipeList.filter(recipe => recipe.name.toLowerCase().includes(query));
  let ingredientIDs = currentUser.changeIngredientNameToID(query, ingredientList);
  let allIngredientMatches = recipeList.filter(recipe => {
    let recipeIngredientIDs = currentUser.makeIngredientList(recipe);
    return ingredientIDs.some(id => recipeIngredientIDs.includes(id));
  })
  return allNameMatches.concat(allIngredientMatches);
}

const searchHandler = () => {
  let savedSearch;
  let searchInput = document.getElementById('search-text');
  let query = searchInput.value.toLowerCase();
  if (query !== "") {
    if (event.target.className === 'search-box-btns search-saved') {
      savedSearch = currentUser.searchAllSavedByAll(query, ingredientsData);
      populateRecipeCards(savedSearch);
    } 
    if (event.target.className === "search-box-btns search-favorites") {
      savedSearch = currentUser.searchFavoritesByAll(query, ingredientsData);
      populateRecipeCards(savedSearch);
    }
    if (event.target.className === "search-box-btns search-planned") {
      savedSearch = currentUser.searchPlannedByAll(query, ingredientsData);
      populateRecipeCards(savedSearch);
    }
    if (event.target.className === "search-box-btns search-all") {
      savedSearch = displaySearchedAllRecipes(query, ingredientsData, recipeData);   
      populateRecipeCards(savedSearch);
    }
    if (event.target.className === "search-box-btns clear-text-btn") {
      searchInput.value = "";
    }
    searchInput.value = "";
  }
}

// Event Listeners //

searchSection.addEventListener('click', searchHandler)

sidebarSection.addEventListener("click", sidebarHandler);

userProfileSection.addEventListener("click", userSectionHandler);

recipeCardSection.addEventListener("click", recipeCardHandler);

window.onload = loadHandler;