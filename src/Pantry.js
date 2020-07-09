const ingredientsData = require("../data/ingredients");
const Recipe = require('./Recipe.js');
const { indexOf } = require("../data/recipes");
class Pantry {
  constructor(ingredients) {
    this.ingredients =  ingredients || [];
    this.groceryList = [];
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

  findMissingIngredients = (recipe) => {
    recipe.ingredients.forEach(recipeIngredient => {
      let quantity = recipeIngredient.quantity - this.ingredients.filter(ingredient => ingredient.id === recipeIngredient.ingredient).length;
      if(quantity > 0) { 
        let missingIngredient = { ingredientId: recipeIngredient.ingredient, quantity: quantity, name: this.ingredients.find(ingredient => ingredient.id === recipeIngredient.ingredient).name }
        this.groceryList.push(missingIngredient)
      }
    })
    return this.groceryList;
  }
  
  // Determine the amount of ingredients still needed to cook a given meal, based on what’s in my pantry

  // I think I fixed this issue by adding a property called groceryList and added missingIngredients into that
  // I also instantiated a pantry as the pantry value on user, so the user can have access to Pantry methods 
  
  // using the check pantry method see if we can cook given a certain recipe
  // If we can its all good
  // else
    // call the findMissingIngredientsRecipe
    // Go look up the ingredients name based off the result of this
    // Return to the user which ingredients they still need to make the recipe

    // Remove the ingredients used for a given meal from my pantry, once that meal has been cooked(only applicable if users have a list of mealsToCook; can be considered a stretch goal)
    // can't figure out test logic
    // removeIngredient = (ingredientToRemove) => {
  //    const foundIngredient = this.ingredients.find((ingredient) => {
  //     return ingredient.ingredient === ingredientToRemove.id;
  //    });
  //    console.log(foundIngredient);
  //    const i = this.ingredients.indexOf(foundIngredient);
  //    this.ingredients[i].amount -= ingredientToRemove.quantity.amount;
  //    return this.ingredients;
  // }

};


if (typeof module !== 'undefined') {
  module.exports = Pantry;
}