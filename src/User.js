// const recipesData = require('../data/recipe');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = user.favoriteRecipes || [];
    this.plannedRecipes = user.plannedRecipes || [];
  }

  addFavoriteRecipe(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  deleteFavoriteRecipe(recipe) {
    let i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1);
  }

  addPlannedRecipe(recipe) {
    this.plannedRecipes.push(recipe);
  }


// Decide to cook a recipe that week(add to my recipesToCook)
// Filter my favoriteRecipes or recipesToCook by type
// Search any of my saved recipes by name or ingredient

}





if (typeof module !== 'undefined') {
  module.exports = User;
}