const ingredientsData = require("../data/ingredients");
const Recipe = require('./Recipe.js');
class Pantry {
  constructor(user) {
    this.ingredients = user.pantry || [];
  }

  // Determine whether my pantry has enough ingredients to cook a given meal
  // matchAndCompareIngredients returns a boolean.
  matchAndCompareIngredients = (recipeIngredient) => {
    return this.ingredients.some(pantryIngredient => {
      return this.ingredientsMatchAndEnoughInPantry(recipeIngredient, pantryIngredient)
    });
  }

  checkPantry = (recipe) => {
    return recipe.ingredients.every(recipeIngredient => {
      return this.matchAndCompareIngredients(recipeIngredient);
    });
  }

  ingredientsMatchAndEnoughInPantry = (recipeIngredient, pantryIngredient) => {
    return pantryIngredient.ingredient === recipeIngredient.id &&
      recipeIngredient.quantity.amount <= pantryIngredient.amount;
  }

  findMissingIngredients(recipe) {
    let missingIngredients = []
    recipe.ingredients.forEach(recipeIngredient => {
      let quantity = recipeIngredient.quantity - this.ingredients.filter(ingredient => ingredient.id === recipeIngredient.ingredient).length
      if(quantity > 0) { 
        let missingIngredient = { ingredientId: recipeIngredient.ingredient, quantity: quantity, name: this.ingredients.find(ingredient => ingredient.id === recipeIngredient.ingredient).name }
        missingIngredients.push(missingIngredient)
      }
    })

    return missingIngredients;
  }
  
  // Determine the amount of ingredients still needed to cook a given meal, based on what’s in my pantry

  // using the check pantry method see if we can cook given a certain recipe
  // If we can its all good
  // else
    // call the findMissingIngredientsRecipe
    // Go look up the ingredients name based off the result of this
    // Return to the user which ingredients they still need to make the recipe

};







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