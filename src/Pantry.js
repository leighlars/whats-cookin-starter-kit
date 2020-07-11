class Pantry {
  constructor(ingredients) {
    this.ingredients =  ingredients || [];
  }

  findIngredientByID = (id) => {
    return this.ingredients.find(pantryIngredient => id === pantryIngredient.ingredient);
  }

  isInPantry = (recipe) => {
    return recipe.ingredients.every(recipeIngredient => {
      let foundPantryIngredient = this.findIngredientByID(recipeIngredient.id);
      if (!foundPantryIngredient) {
        return false;
      }
      return recipeIngredient.quantity.amount < foundPantryIngredient.amount;
    });
  }

  getIngredientsForRecipe = (recipe) => {
    return recipe.ingredients.reduce((neededIngredients, ingredient) => {
      let foundPantryIngredient = this.findIngredientByID(ingredient.id);
      if (!foundPantryIngredient) {
       neededIngredients.push({id: ingredient.id, amount: ingredient.quantity.amount});
      } else {
        let amountNeeded = ingredient.quantity.amount - foundPantryIngredient.amount;
        if (amountNeeded > 0) {
          neededIngredients.push({id: ingredient.id, amount: amountNeeded});
        }
      }
      return neededIngredients;
    }, []);
  }

  findIngredientGlobally(ingredientID, ingredientsList) {
    return ingredientsList.find(ingredient => ingredient.id === ingredientID);
  }

  getIngredientCost = (ingredient) => {
    return ingredient.estimatedCostInCents / 100;
  }

  calculateCost = (cost, quantity) => {
    return (quantity * cost); 
  }

  createGroceryList = (recipe, ingredientsList) => {
    return this.getIngredientsForRecipe(recipe).map(ingredient => {
      let foundIngredient = this.findIngredientGlobally(ingredient.id, ingredientsList);
      let name = foundIngredient.name;
      let dollarAmount = this.getIngredientCost(foundIngredient);
      let totalCost = this.calculateCost(dollarAmount, ingredient.amount);
      return {name: name, cost: totalCost};
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}