class Recipe {
  constructor(recipe) {
    this.id = this.checkNumber(recipe.id);
    this.name = this.checkName(recipe.name);
    this.image = recipe.image || "https://spoonacular.com/recipeImages/595736-556x370.jpg";
    this.ingredients = recipe.ingredients || "No ingredients provided. Please Google other similar recipes for ingredients.";
    this.instructions = recipe.instructions || "No instructions provided. Please Google other similar recipes for instructions.";
    this.tags = this.checkTags(recipe.tags);
    this.isFavorite = false;
    this.isPlanned = false;
  };

  checkNumber = (recipe) => {
    return typeof recipe === 'number' ? recipe : Date.now();
  };

  checkName = (recipe) => {
    if (!recipe) {
      return "Recipe";
    };
    return typeof recipe === 'string' ? recipe : JSON.stringify(recipe);
  };

  checkTags = (recipe) => {
    if (!recipe === "undefined" || Array.isArray(recipe)) {
      return recipe;
    } else {
      return ["miscellaneous"];
    };
  };

  getInstructions = () => {
    if (Array.isArray(this.instructions)) {
      return this.instructions.reduce((directions, instruction) => {
        return directions += `${instruction.number}. ${instruction.instruction}</br></br>`;
      }, "");
    } else {
      return this.instructions;
    };
  };

  capitalize = (words) => {
    return words.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  getIngredients = (ingredientsList) => {
    return this.ingredients.map(ingredient => {
      let ingredientName = this.findIngredient(ingredient, ingredientsList);
      return `${ingredient.quantity.amount} ${ingredient.quantity.unit} ${this.capitalize(ingredientName.name)}</br>`;
    }).join(" ");
  };

  getRecipeCost = (ingredientsList) => {
    if (Array.isArray(this.ingredients)) {
      return this.ingredients.reduce((sum, recipeIngredient) => {
        let matchIngredient = this.findIngredient(recipeIngredient, ingredientsList);
        sum += (matchIngredient.estimatedCostInCents * recipeIngredient.quantity.amount) / 100;
        return sum;
      }, 0);
    } else {
      return this.ingredients;
    };
  };

  findIngredient = (recipeIngredient, ingredientsList) => {
    let foundIngredient = ingredientsList.find(ingredient => ingredient.id === recipeIngredient.id);
    if (foundIngredient !== undefined) {
      return foundIngredient;
    };
  };

};

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}