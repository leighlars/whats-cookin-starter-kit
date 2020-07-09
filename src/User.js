const ingredientsData = require('../data/ingredients');

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

  filterFavoriteByTag(tag) {
    return this.favoriteRecipes.filter(faveRecipe => faveRecipe.tags.includes(tag));
  }

  filterPlannedByTag(tag) {
    return this.plannedRecipes.filter(plannedRecipe => plannedRecipe.tags.includes(tag));
  }

  // Search any of my saved recipes by name or ingredient

  searchUserRecipesByName(query) {
    let allSaved = this.favoriteRecipes.concat(this.plannedRecipes);
    return allSaved.filter(recipe => {
      return recipe.name.toLowerCase().includes(query);
    });    
  }  

  searchUserRecipesByIngred(query) {
    let allSaved = this.favoriteRecipes.concat(this.plannedRecipes);
    let matchedIngreds = ingredientsData.filter(ingredient => ingredient.name.includes(query));

    return allSaved.filter(savedRecipe => {
      let result = false;
      savedRecipe.ingredients.forEach(recipeIngredient => {
        if (matchedIngreds.find(ingred => ingred.id === recipeIngredient.id)) {
          result = true;
        }
      })
      return result;
    })
  }

  searchByIngredAndName(query) {
    let allRecipes = this.searchUserRecipesByIngred(query).concat(this.searchUserRecipesByName(query));
    let filterDuplicates = new Set(allRecipes);
    return [...filterDuplicates];
  }

}

if (typeof module !== 'undefined') {
  module.exports = User;
}