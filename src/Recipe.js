const ingredientsData = require('../data/ingredients');
const recipeData = require ('../data/recipes')
class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
  }

  getInstructions() {
    return this.instructions;
  }

  getRecipeCost() {
    return this.ingredients.reduce((sum, recipeIngredient) => {
      let matchIngredient = ingredientsData.find(ingredient => ingredient.id === recipeIngredient.id);
      sum += (matchIngredient.estimatedCostInCents * recipeIngredient.quantity.amount);
      return sum;
    }, 0);
  }

  filterRecipeByTag(recipeType) {
    return recipeData.filter(recipe => {
      if (recipe.tags.includes(recipeType)) {
        return recipe;
      }
    })
  }

  // iterate over recipeData
  // access the tags key, which is an array
  // possibly iterate over array
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}