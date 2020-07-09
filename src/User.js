const ingredientsData = require('../data/ingredients');
const usersData = require('../data/users.js');
const Recipe = require('./Recipe.js');
const Pantry = require('./Pantry.js');
const recipeData = require('../data/recipes.js');

class User {
  constructor(usersData) {
    this.id = this.checkNumber(usersData.id);
    this.name = this.checkName(usersData.name);
    this.pantry = new Pantry(usersData.pantry.ingredients);
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
  
  
  // let matchedIngreds = ingredientsData.filter(ingredient => ingredient.name.includes(query));

  // return allSaved.filter(savedRecipe => {
  //   let result = false;
  //   savedRecipe.ingredients.forEach(recipeIngredient => {
  //     if (matchedIngreds.find(ingred => ingred.id === recipeIngredient.id)) {
  //       result = true;
  //     }
  //   })
  //   return result;
  // })
  
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