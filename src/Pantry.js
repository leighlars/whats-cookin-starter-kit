
class Pantry {
  constructor(user) {
    this.pantry = user.pantry;
  }
  
  determineSufficientIngredients(recipe) {
    const notEnoughIngredients = this.pantry.reduce((acc, pantryIngredient) => {
      const recipeIngredientToCompare = recipe.ingredients.find(recipeIngredient => {
        return pantryIngredient.ingredient === recipeIngredient.id
      })
      if (recipeIngredientToCompare) {
        if (recipeIngredientToCompare.quantity.amount > pantryIngredient.amount) {
          recipeIngredientToCompare.quantity.amount = recipeIngredientToCompare.quantity.amount - pantryIngredient.amount
          acc.push(recipeIngredientToCompare);
        }
      }
      return acc
    }, [])
    return notEnoughIngredients.length > 0 ? notEnoughIngredients : false;
  }
}
// Determine the amount of ingredients still needed to cook a given meal, based on what’s in my pantry
    
// Remove the ingredients used for a given meal from my pantry, once that meal has been cooked(only applicable if users have a list of mealsToCook; can be considered a stretch goal)


if (typeof module !== 'undefined') {
  module.exports = Pantry;
}