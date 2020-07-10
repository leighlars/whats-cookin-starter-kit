class Pantry {
  constructor(ingredients, allIngredients) {
    this.allIngredients = allIngredients;
    this.ingredients =  ingredients || [];
    this.groceryList = [];
  }

  // Determine whether my pantry has enough ingredients to cook a given meal

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

  getIngredientCostByID = (ingredientID) => {
    return (this.allIngredients.find(ingredient => ingredient.id === ingredientID).estimatedCostInCents) / 100;
  }

  calculateCost = (cost, quantity) => {
    return (quantity * cost) / 100; 
  }

  createGroceryList = (recipe) => {
    console.log(this.getIngredientsForRecipe(recipe));

  }
// calculate the cost of each missing ingredient 
// mapping over the groceryList

}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}