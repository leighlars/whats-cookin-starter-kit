class Pantry {
  constructor(ingredients, allIngredients) {
    this.allIngredients = allIngredients;
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

  getIngredientCostByID = (ingredientID) => {
    return (this.allIngredients.find(ingredient => ingredient.id === ingredientID).estimatedCostInCents) / 100;
  }

  calculateCost = (cost, quantity) => {
    return (quantity * cost); 
  }

  createGroceryList = (recipe) => {
   return this.getIngredientsForRecipe(recipe).map(ingredient => {
     let name = this.allIngredients.find(dataIngredient => dataIngredient.id === ingredient.id).name;
     let dollarAmount = this.getIngredientCostByID(ingredient.id);
     let totalCost = this.calculateCost(ingredient.amount, dollarAmount);
      return {name: name, cost: totalCost};
    });
  }


}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}