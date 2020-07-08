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

 









};


if (typeof module !== 'undefined') {
  module.exports = domUpdates\;
}