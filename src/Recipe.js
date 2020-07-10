class Recipe {
  constructor(recipe, allIngredients, allRecipes) {
    this.id = this.checkNumber(recipe.id);
    this.name = this.checkName(recipe.name);
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.allIngredients = allIngredients;
    this.allRecipes = allRecipes;
  }

  checkName = (recipe) => {
    return typeof recipe === 'string' ? recipe : JSON.stringify(recipe);
  }

  checkNumber = (recipe) => {
    return typeof recipe === 'number' ? recipe : Date.now();
  }

  getInstructions = () => {
    return this.instructions.reduce((directions, instruction) => {
      return directions += `${instruction.number}. ${instruction.instruction}<br>`;
    }, "");
  }

  getRecipeCost = () => {
    return this.ingredients.reduce((sum, recipeIngredient) => {
      let matchIngredient = this.findIngredient(recipeIngredient);
      sum += (matchIngredient.estimatedCostInCents * recipeIngredient.quantity.amount) / 100;
      return sum;
    }, 0);
  }

  findIngredient = (recipeIngredient) => {
    let foundIngredient = this.allIngredients.find(ingredient => ingredient.id === recipeIngredient.id);
    if (foundIngredient !== undefined) {
      return foundIngredient;
    }
  }

  filterRecipeByTag = (recipeTag) => {
    return this.allRecipes.filter(recipe => recipe.tags.includes(recipeTag));
  }

  filterRecipeByIngredient = (recipeIngredient) => {
    let matchedIngredient = this.allIngredients.find(ingredient => ingredient.name === recipeIngredient);
    if (matchedIngredient !== undefined) {
    return this.allRecipes.reduce((filteredRecipes, recipe) => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.id === matchedIngredient.id && (!filteredRecipes.includes(recipe))) {
          filteredRecipes.push(recipe);
        }
      })
      return filteredRecipes;
    }, []);
    } else {
      return [];
    }
  }

  filterRecipeByName(recipeIngredient) {
    return this.allRecipes.filter(recipe => recipe.name.toLowerCase().includes(recipeIngredient));
  }

  filterAllRecipesByQuery(recipeIngredient, ingredientsList, recipeList) {
    let allSearchedRecipes = this.filterRecipeByIngredient(recipeIngredient, ingredientsList, recipeList).concat(this.filterRecipeByName(recipeIngredient, recipeList));
    let filterDuplicates = [...new Set(allSearchedRecipes)];
    return filterDuplicates;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}