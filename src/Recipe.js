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

  filterRecipeByTag(recipeTag) {
    return recipeData.filter(recipe => recipe.tags.includes(recipeTag))
  }

  filterRecipeByIngredient(recipeIngredient) {
    let matchedIngredient = ingredientsData.find(ingredient => ingredient.name === recipeIngredient);
    return recipeData.reduce((filteredRecipes, recipe) => {
      recipe.ingredients.forEach(ingredient => {
            if (ingredient.id === matchedIngredient.id && (!filteredRecipes.includes(recipe))) {
              filteredRecipes.push(recipe)
            }
          })
      return filteredRecipes
    }, [])
  }
  
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}