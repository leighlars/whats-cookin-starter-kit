
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
        let missingIngredient = { ingredientId: recipeIngredient.ingredient, quantity: quantity, name: this.ingredients.find(ingredient => ingredient.id === recipeIngredient.ingredient).name, unit: recipeIngredient.unit }
        this.groceryList.push(missingIngredient)
      }
    })
    return this.groceryList;
  }
    
  ingredientsMissingForRecipe(recipe) {
    if (this.checkPantry(recipe)) {
      return `You have all the necessary ingredients for this recipe.`
    } else {
      let allMissingIngredients = this.findMissingIngredients(recipe)
      return allMissingIngredients.reduce((phrase, missingIngredient) => {
        phrase = `You need ${missingIngredient.quantity} ${missingIngredient.unit} of ${missingIngredient.name} to make this recipe.`
        return phrase
      }, '')
    }
  };

  // Remove the ingredients used for a given meal from my pantry, once that meal has been cooked(only applicable if users have a list of mealsToCook; can be considered a stretch goal)
  // can't figure out test logic-- skipped test
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




// Remove the ingredients used for a given meal from my pantry, once that meal has been cooked(only applicable if users have a list of mealsToCook; can be considered a stretch goal)



if (typeof module !== 'undefined') {
  module.exports = Pantry;
}