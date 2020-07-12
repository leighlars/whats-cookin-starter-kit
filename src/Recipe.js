class Recipe {
  constructor(recipe) {
    this.id = this.checkNumber(recipe.id);
    this.name = this.checkName(recipe.name);
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = this.checkTags(recipe);
  }

  checkNumber = (recipe) => {
    return typeof recipe === 'number' ? recipe : Date.now();
  }

  checkName = (recipe) => {
    if (!recipe) {
      return "Recipe";
    }
    return typeof recipe === 'string' ? recipe : JSON.stringify(recipe);
  }

  getInstructions = () => {
    return this.instructions.reduce((directions, instruction) => {
      return directions += `${instruction.number}. ${instruction.instruction}<br>`;
    }, "");
  }

  checkTags = (recipe) => {
    if (!Array.isArray(recipe) || recipe.length === 0) {
      return ["miscellaneous"];
    }
    else {
      return recipe.tags;
    }
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

  filterRecipeByTag = (recipeTag, recipeData) => {
    return recipeData.filter(recipe => recipe.tags.includes(recipeTag));
  }

  filterRecipeByIngredient = (recipeIngredient, ingredientsList, recipeList) => {
    let matchedIngredient = ingredientsList.find(ingredient => ingredient.name === recipeIngredient);
    if (matchedIngredient !== undefined) {
    return recipeList.reduce((filteredRecipes, recipe) => {
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

  filterRecipeByName(recipeIngredient, recipeData) {
    return recipeData.filter(recipe => recipe.name.toLowerCase().includes(recipeIngredient));
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