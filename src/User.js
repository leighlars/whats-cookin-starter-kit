const ingredientsData = require('../data/ingredients');
const Recipe = require('./Recipe.js');

class User {
  constructor({name, id, pantry}) {
    this.id = this.checkNumber(id);
    this.name = this.checkName(name);
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.plannedRecipes = [];
  }

  checkName(user) {
    return typeof user === 'string' ? user : JSON.stringify(user);
  }

  checkNumber(user) {
    return typeof user === 'number' ? user : Date.now();
  }

  addFavoriteRecipe(recipe) {
    if (recipe instanceof Recipe) {
      this.favoriteRecipes.push(recipe);
    }
  }

  deleteFavoriteRecipe(recipe) {
    let i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1);
  }

  addPlannedRecipe(recipe) {
    if (recipe instanceof Recipe) {
      this.plannedRecipes.push(recipe);
    }
  }

  filterFavoriteByTag(tag) {
    return this.favoriteRecipes.filter(faveRecipe => faveRecipe.tags.includes(tag));
  }

  filterPlannedByTag(tag) {
    return this.plannedRecipes.filter(plannedRecipe => plannedRecipe.tags.includes(tag));
  } 

  // Search any of my saved recipes by name or ingredient

  searchSavedRecipesByName(query) {
    let allSaved = this.favoriteRecipes.concat(this.plannedRecipes);
    return allSaved.filter(recipe => {
      return recipe.name.toLowerCase().includes(query);
    });    
  }  

  searchSavedRecipesByIngred(query) {
    let allSaved = this.favoriteRecipes.concat(this.plannedRecipes);
    let ingredientID = this.changeIngredientNameToID(query);
    return allSaved.filter(recipe => {
      return this.makeIngredientList(recipe).includes(ingredientID);
    })
  }
  
  changeIngredientNameToID(ingredientName) {
    let ingredient = ingredientsData.find(ingredient => {
      return ingredient.name ? ingredient.name.includes(ingredientName) : undefined;
    }); 
    return ingredient ? ingredient.id : [];
  }

  makeIngredientList(recipe) {
    if (recipe instanceof Recipe) {
      return recipe.ingredients.map(ingredient => ingredient.id);
    } else {
      return [];
    }
  }

  searchByIngredAndName(query) {
    let allRecipes = this.searchSavedRecipesByIngred(query).concat(this.searchSavedRecipesByName(query));
    let filterDuplicates = new Set(allRecipes);
    return [...filterDuplicates];
  }

}

if (typeof module !== 'undefined') {
  module.exports = User;
}