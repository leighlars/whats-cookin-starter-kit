class Recipe {
  constructor(recipe) {
    this.id = this.checkNumber(recipe.id);
    this.name = this.checkName(recipe.name);
    this.image = recipe.image || "https://spoonacular.com/recipeImages/595736-556x370.jpg";
    this.ingredients = recipe.ingredients || "No ingredients provided. Please Google other similar recipes for ingredients.";
    this.instructions = recipe.instructions || "No instructions provided. Please Google other similar recipes for instructions.";
    this.tags = recipe.tags || ["miscellaneous"];
    this.isFavorite = false;
    this.isPlanned = false;
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
    if (Array.isArray(this.instructions)) {
      return this.instructions.reduce((directions, instruction) => {
        return directions += `${instruction.number}. ${instruction.instruction}</br></br>`;
      }, "");
    } else {
      return this.instructions;
    }
  }

  capitalize = (words) => {
  return words.split(" ").map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
};

  getIngredients = ingredientsList => {
    return this.ingredients.map(ingredient => {
       let ingredientName = this.findIngredient(ingredient, ingredientsList);
        return `${ingredient.quantity.amount} ${ingredient.quantity.unit} ${this.capitalize(ingredientName.name)}</br>`;
      }).join(" ");
    };

  getRecipeCost = (ingredientsList) => {
    if (Array.isArray(this.ingredients)) {
      return this.ingredients.reduce((sum, recipeIngredient) => {
        let matchIngredient = this.findIngredient(recipeIngredient, ingredientsList);
        sum += (matchIngredient.estimatedCostInCents * recipeIngredient.quantity.amount) / 100;
        return sum;
      }, 0);
    } 
    else {
      return this.ingredients;
    };
  };

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