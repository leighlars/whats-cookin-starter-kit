class User {
 constructor(user) {
  this.id = this.checkNumber(user.id);
  this.name = this.checkName(user.name) || "User123";
  this.pantry = user.pantry;
  this.favoriteRecipes = [];
  this.plannedRecipes = [];
 }
 
 checkNumber = (user) => {
  return typeof user === "number" ? user : Date.now();
 };

 checkName = (user) => {
  return typeof user === "string" ? user : JSON.stringify(user);
 };


 addFavoriteRecipe = (recipe) => {
  if (!this.favoriteRecipes.includes(recipe)) {
    recipe.isFavorite = true;
    this.favoriteRecipes.push(recipe);
  }
 };

 deleteFavoriteRecipe = (recipe) => {
  let i = this.favoriteRecipes.indexOf(recipe);
  this.favoriteRecipes.splice(i, 1);
  recipe.isFavorite = false;
 };

 addPlannedRecipe = (recipe) => {
  if (!this.plannedRecipes.includes(recipe)) {
   this.plannedRecipes.push(recipe);
  }
 };

 deletePlannedRecipe = (recipe) => {
  let i = this.plannedRecipes.indexOf(recipe);
  this.plannedRecipes.splice(i, 1);
 };

 filterFavoriteByTag = (tag) => {
  return this.favoriteRecipes.filter((faveRecipe) =>
   faveRecipe.tags.includes(tag)
  );
 };

 filterPlannedByTag = (tag) => {
  return this.plannedRecipes.filter((plannedRecipe) =>
   plannedRecipe.tags.includes(tag)
  );
 };

 searchSavedRecipesByName = (query) => {
  let allSaved = this.favoriteRecipes.concat(this.plannedRecipes);
  return allSaved.filter((recipe) => {
   return recipe.name.toLowerCase().includes(query);
  });
 };

 searchSavedRecipesByIngred = (query, ingredientList) => {
  let allSaved = this.favoriteRecipes.concat(this.plannedRecipes);
  let ingredientIDs = this.changeIngredientNameToID(query, ingredientList);
  return allSaved.filter((recipe) => {
  let recipeIngredientIDs = this.makeIngredientList(recipe)
  return ingredientIDs.some(id => recipeIngredientIDs.includes(id))
  });
 };

 changeIngredientNameToID = (ingredientName, ingredientList) => {
  let ingredients = ingredientList.filter((ingredient) => {
    return ingredient.name.includes(ingredientName);
  });
  ingredients = ingredients.map(ingredient => ingredient.id)
  return ingredients;
 };

 makeIngredientList = (recipe) => {
  return recipe.ingredients.map((ingredient) => ingredient.id);
 };

 searchByIngredAndName = (query, ingredientList) => {
  let allRecipes = this.searchSavedRecipesByIngred(query, ingredientList).concat(this.searchSavedRecipesByName(query));
  let filterDuplicates = [...new Set(allRecipes)];
  return filterDuplicates;
 };
}

if (typeof module !== 'undefined') {
  module.exports = User;
}