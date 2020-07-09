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

  getRecipeCost = (ingredientsList) => {
    return this.ingredients.reduce((sum, recipeIngredient) => {
      let matchIngredient = this.findIngredient(recipeIngredient, ingredientsList);
      sum += (matchIngredient.estimatedCostInCents * recipeIngredient.quantity.amount) / 100;
      return sum;
    }, 0);
  }

  findIngredient = (recipeIngredient, ingredientsList) => {
    let foundIngredient = ingredientsList.find(ingredient => ingredient.id === recipeIngredient.id);
    if (foundIngredient !== undefined) {
      return foundIngredient;
    }
  }

  filterRecipeByTag = (recipeTag, recipeList) => {
    return recipeList.filter(recipe => recipe.tags.includes(recipeTag))
  }

  filterRecipeByIngredient = (recipeIngredient, ingredientsList, recipeList) => {
    let matchedIngredient = ingredientsList.find(ingredient => ingredient.name === recipeIngredient);
    if (matchedIngredient !== undefined) {
    return recipeList.reduce((filteredRecipes, recipe) => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.id === matchedIngredient.id && (!filteredRecipes.includes(recipe))) {
          filteredRecipes.push(recipe)
        }
      })
      return filteredRecipes
    }, []);
    } else {
      return [];
    }
  }

  filterRecipeByName(recipeIngredient, recipeList) {
    return recipeList.filter(recipe => recipe.name.toLowerCase().includes(recipeIngredient));
  }

  filterAllRecipesByQuery(recipeIngredient, ingredientsList, recipeList) {
    let allSearchedRecipes = this.filterRecipeByIngredient(recipeIngredient, ingredientsList, recipeList).concat(this.filterRecipeByName(recipeIngredient, recipeList));
    let filterAllSearched = new Set(allSearchedRecipes);
    console.log([...filterAllSearched]);
    return [...filterAllSearched];
  }

  
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}