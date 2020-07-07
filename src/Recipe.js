class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
  }

  getInstructions() {
    return this.instructions;
  }

  getIngredientCost() {
    // iterate thru this.ingredients
    // param sum & ingredient
    // forEach ingredient , get id, get quantity which is an obj.
    // ingredient.id, ingredient.quantity.amount
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}