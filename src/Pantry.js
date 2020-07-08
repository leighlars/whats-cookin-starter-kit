const ingredientsData = require("../data/ingredients");

class Pantry {
  constructor(ingredients = []) {
    this.ingredients = ingredients;
  }

  // Determine whether my pantry has enough ingredients to cook a given meal

  matchAndCompareIngredients = (recipeIngredient) => {
    return this.ingredients.find(pantryIngredient => {
      return pantryIngredient.ingredient === recipeIngredient.id &&
        recipeIngredient.quantity.amount <= pantryIngredient.amount;
    });
  }

  checkPantry = (recipe) => {
    return recipe.ingredients.every(recipeIngredient => {
      return this.matchAndCompareIngredients(recipeIngredient);
    });
  }
};



// Determine the amount of ingredients still needed to cook a given meal, based on what’s in my pantry

// findMissingIngredients() {

// }


// determineSufficientIngredients(recipe) {
//   const notEnoughIngredients = this.pantry.reduce((acc, pantryIngredient) => {
//     const recipeIngredientToCompare = recipe.ingredients.find(recipeIngredient => {
//       return pantryIngredient.ingredient === recipeIngredient.id
//     });
//     console.log(recipeIngredientToCompare.quantity);
//     if (recipeIngredientToCompare) {
//       if (recipeIngredientToCompare.quantity.amount > pantryIngredient.amount) {
//         recipeIngredientToCompare.quantity.amount = recipeIngredientToCompare.quantity.amount - pantryIngredient.amount
//         acc.push(recipeIngredientToCompare);
//       }
//     }
//     return acc;
//   }, []);
//   return notEnoughIngredients.length === 0 ? true : notEnoughIngredients;
// }




// Remove the ingredients used for a given meal from my pantry, once that meal has been cooked(only applicable if users have a list of mealsToCook; can be considered a stretch goal)


if (typeof module !== 'undefined') {
  module.exports = Pantry;
}