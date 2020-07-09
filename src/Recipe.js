const ingredientsData = require('../data/ingredients');
const recipeData = require ('../data/recipes')
class Recipe {
  constructor(recipe) {
    this.id = this.checkNumber(recipe.id);
    this.name = this.checkName(recipe.name);
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
  }

  checkName = (recipe) => {
    return typeof recipe === 'string' ? recipe : JSON.stringify(recipe);
  }

  checkNumber = (recipe) => {
    return typeof recipe === 'number' ? recipe : Date.now();
  }

  getInstructions = () => {
    return this.instructions;
  }

  getRecipeCost() {
    return this.ingredients.reduce((sum, recipeIngredient) => {
      let matchIngredient = this.findIngredient(recipeIngredient);
      sum += (matchIngredient.estimatedCostInCents * recipeIngredient.quantity.amount) / 100;
      return sum;
    }, 0);
  }

  findIngredient = (recipeIngredient) => {
    let foundIngredient = ingredientsData.find(ingredient => ingredient.id === recipeIngredient.id);
    if (foundIngredient !== undefined) {
      return foundIngredient;
    }
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
    }, []);
  }

  filterRecipeByName(recipeIngredient) {
    return recipeData.filter(recipe => recipe.name.toLowerCase().includes(recipeIngredient));
  }

  filterAllRecipesByQuery(recipeIngredient) {
    let allSearchedRecipes = this.filterRecipeByIngredient(recipeIngredient).concat(this.filterRecipeByName(recipeIngredient));
    let filterAllSearched = new Set(allSearchedRecipes);
    return [...filterAllSearched];
  }

  
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}