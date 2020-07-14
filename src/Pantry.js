class Pantry {
 constructor(userPantry) {
  this.ingredients = userPantry || [];
 }

 findIngredientByID = (id) => {
  return this.ingredients.find(pantryIngredient => id === pantryIngredient.ingredient)};

 findIngredientGlobally(ingredientID, ingredientsList) {
  return ingredientsList.find((ingredient) => ingredient.id === ingredientID);
 }

 isInPantry = (recipe) => {
  return recipe.ingredients.every((recipeIngredient) => {
   let foundPantryIngredient = this.findIngredientByID(recipeIngredient.id);
   if (!foundPantryIngredient) {
    return false;
   }
   return recipeIngredient.quantity.amount < foundPantryIngredient.amount;
  });
 };

 getNeededIngredientsForRecipe = (recipe) => {
  return recipe.ingredients.reduce((neededIngredients, ingredient) => {
    let foundPantryIngredient = this.findIngredientByID(ingredient.id);
    if (!foundPantryIngredient) {
      neededIngredients.push({id: ingredient.id, unit: ingredient.quantity.unit || "whole", amount: ingredient.quantity.amount});
    } else {
      let amountNeeded = ingredient.quantity.amount - foundPantryIngredient.amount;
    if (amountNeeded > 0) {
     neededIngredients.push({id: ingredient.id, unit: ingredient.quantity.unit || "whole", amount: amountNeeded});
    }
   }
   return neededIngredients;
  }, []);
 };

 findIngredientMeasurement = (id, recipeList) => {
  let result = "whole";
  recipeList.forEach((recipe) => {
   let foundIngredient = recipe.ingredients.find(ingredient => ingredient.id === id);
   if (foundIngredient && foundIngredient.quantity.unit)
    result = foundIngredient.quantity.unit;
  });
  return result;
 };

 getPantryIngredients = (ingredientsList, recipeList) => {
  return this.ingredients.reduce((totalInfo, ingredient) => {
    let nameIngred = this.findIngredientGlobally(ingredient.ingredient, ingredientsList).name;
    let unit = this.findIngredientMeasurement(ingredient.ingredient, recipeList);
    let ingredientObj = {name: nameIngred, quantity: ingredient.amount, unit: unit};
    totalInfo.push(ingredientObj);
    return totalInfo;
  }, []);
 };

 findIngredientMeasurement = (id, recipeList) => {
  let result = "whole";
  recipeList.forEach((recipe) => {
   let foundIngredient = recipe.ingredients.find(ingredient => ingredient.id === id);
   if (foundIngredient && foundIngredient.quantity.unit)
    result = foundIngredient.quantity.unit;
  });
  return result;
 };

 getIngredientCost = (ingredient) => {
  return ingredient.estimatedCostInCents / 100;
 };

 calculateCost = (cost, quantity) => {
  return quantity * cost;
 };

 createGroceryList = (recipe, ingredientsList) => {
  return this.getNeededIngredientsForRecipe(recipe).map((ingredient) => {
    let foundIngredient = this.findIngredientGlobally(ingredient.id, ingredientsList);
    let name = foundIngredient.name;
    let dollarAmount = this.getIngredientCost(foundIngredient);
    let cost = this.calculateCost(dollarAmount, ingredient.amount);
    return { name: name, cost: cost };
  });
 };

 getTotalCostOfGroceries = (recipe, ingredientsList) => {
  return this.createGroceryList(recipe, ingredientsList).reduce((totalCost, item) => {
    totalCost += item.cost;
    totalCost = totalCost;
    return totalCost;
   }, 0);
  };
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}