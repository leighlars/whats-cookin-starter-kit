class Pantry {
  constructor(userPantry) {
    this.ingredients =  userPantry || [];
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
       neededIngredients.push({id: ingredient.id, unit: ingredient.quantity.unit || "whole", amount: ingredient.quantity.amount});
      } else {
        let amountNeeded = ingredient.quantity.amount - foundPantryIngredient.amount;
        if (amountNeeded > 0) {neededIngredients.push({id: ingredient.id, unit: ingredient.quantity.unit || "whole", amount: amountNeeded});
        }
      }
      return neededIngredients;
    }, []);
  }

// getUnit = (recipeList) => {
//   recipeList.find((recipe) => {
//    recipe.ingredients.forEach((recipeIngredient) => {
//     recipeIngredient.id === ingredient.id;
//    });
//   });
// } can't figure out logic
// basic: if pantry pantry ingred id match recipe ingred id
// logic: loop through pantry ingredients, get the id of each ingred
// loop through recipe data for each recipe, loop through recipe's ingredients
// find recipe ingred id that matches pantry ingred id
// get that recipe ingred unit value

  getPantryIngredients = (ingredientsList, recipeList) => {
   return this.ingredients.reduce((totalInfo, ingredient) => {
      let nameIngred = this.findIngredientGlobally(ingredient.ingredient, ingredientsList).name;
      console.log(recipeList);  
      let unit = "blah";
      let ingredientObj = {name: nameIngred, quantity: ingredient.amount, unit: unit};
      totalInfo.push(ingredientObj);
      return totalInfo;
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
      let cost = this.calculateCost(dollarAmount, ingredient.amount);
      return {name: name, cost: cost};
    });
  }

  getTotalCostOfGroceries = (recipe, ingredientsList) => {
   return this.createGroceryList(recipe, ingredientsList).reduce((totalCost, item) => {
     totalCost += item.cost;
      return totalCost;
    }, 0);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}