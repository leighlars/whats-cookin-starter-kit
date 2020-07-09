const domUpdates {

  exitRecipe() {
    let allRecipeInfo = document.querySelector(".recipe-instructions");
    allRecipeInfo.style.display = "none";
    document.getElementById("overlay").remove();
  },

  openRecipeInfo(event) {
    let allRecipeInfo = document.querySelector(".recipe-instructions");
    allRecipeInfo.style.display = "inline";
    let recipeId = event.path.find(e => e.id).id;
    let recipe = this.recipeData.find(recipe => recipe.id === Number(recipeId));
    this.generateRecipeTitle(recipe, this.generateIngredients(recipe));
    this.addRecipeImage(recipe);
    this.generateInstructions(recipe);
    this.generateRecipeBtns(recipe);
    allRecipeInfo.insertAdjacentHTML("beforebegin", "<section id='overlay'></section>");
},

generateRecipeTitle(recipe, ingredients) {
  let fullRecipeInfo = document.querySelector(".recipe-instructions");
  let recipeTitle = `
        <button id="exit-recipe-btn">X</button>
        <h3 id="recipe-title">${recipe.name}</h3>
        <h4>Ingredients</h4>
        <p>${ingredients}</p>`
  fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
},

  addRecipeImage(recipe) {
    document.getElementById("recipe-title").style.backgroundImage = `url(${recipe.image})`;
  },

  generateInstructions(recipe) {
    let allRecipeInfo = document.querySelector(".recipe-instructions");
    let instructionsList = "";
    let instructions = recipe.instructions.map(i => {
      return i.instruction
    });
    instructions.forEach(i => {
      instructionsList += `<li>${i}</li>`
    });
    allRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
    allRecipeInfo.insertAdjacentHTML("beforeend", `<ol class="instructions">${instructionsList}</ol>`);
  },

  generateRecipeBtns(recipe) {
    let allRecipeInfo = document.querySelector(".recipe-instructions");
    let recipeButtons = `
        <button class="cook-recipe" disabled id="${recipe.id}">Cook This Recipe</button>
        <button class="calculate-cost" id="${recipe.id}">Cost to Cook</button>
        <button class="check-pantry" id="${recipe.id}">Check Pantry</button>
        `;
    allRecipeInfo.insertAdjacentHTML("beforeend", recipeButtons);
  }, 









};


if (typeof module !== 'undefined') {
  module.exports = domUpdates\;
}