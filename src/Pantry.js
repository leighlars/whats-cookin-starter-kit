const ingredientsData = require("../data/ingredients");

class Pantry {
  constructor(ingredients = []) {
    this.ingredients = ingredients;
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
    // console.log(pantryIngredient.ingredient === recipeIngredient.id &&
    //   recipeIngredient.quantity.amount <= pantryIngredient.amount);
    
    return pantryIngredient.ingredient === recipeIngredient.id &&
      recipeIngredient.quantity.amount <= pantryIngredient.amount;
  }

  findMissingIngredients(recipe) {
    let missingIngredients = []
    recipe.ingredients.forEach(recipeIngredient => {
      console.log('recipeIngredient', recipeIngredient);
      
      let quantity = recipeIngredient.quantity - this.ingredients.filter(ingredient => ingredient.id === recipeIngredient.ingredient).length
      if(quantity > 0) { 
        
        let missingIngredient = { ingredientId: recipeIngredient.ingredient, quantity: quantity, name: this.ingredients.find(ingredient => ingredient.id === recipeIngredient.ingredient).name, unit: recipeIngredient.unit}
        missingIngredients.push(missingIngredient)
      }
    })

    return missingIngredients;
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

}

// Remove the ingredients used for a given meal from my pantry, once that meal has been cooked(only applicable if users have a list of mealsToCook; can be considered a stretch goal)


if (typeof module !== 'undefined') {
  module.exports = Pantry;
}