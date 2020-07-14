class User {
 constructor(user) {
  this.id = this.checkNumber(user.id);
  this.name = this.checkName(user.name);
  this.pantry = user.pantry;
  this.favoriteRecipes = [];
  this.plannedRecipes = [];
 }

 checkNumber = (user) => {
  return typeof user === "number" ? user : Date.now();
 };

 checkName = (user) => {
  return typeof user === "string" ? user : "User123";
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

 // filter recipes by tag options

 filterRecipeByTag = (recipeTag, recipeList) => {
  return recipeList.filter((recipe) => recipe.tags.includes(recipeTag));
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

// search favorites in search bar
 searchFavoritesByName = (query) => {
  return this.favoriteRecipes.filter((recipe) =>
   recipe.name.toLowerCase().includes(query)
  );
 };

 searchFavoritesByIngred = (query, ingredientList) => {
  let ingredientIDs = this.changeIngredientNameToID(query, ingredientList);
  return this.favoriteRecipes.filter((recipe) => {
   let recipeIngredientIDs = this.makeIngredientList(recipe);
   return ingredientIDs.some((id) => recipeIngredientIDs.includes(id));
  });
 };

 searchFavoritesByAll = (query, ingredientList) => {
  let allFaveSearches = this.searchFavoritesByIngred(query, ingredientList).concat(this.searchFavoritesByName(query));
  let filterDuplicates = [...new Set(allFaveSearches)];
  return filterDuplicates;
 };

 // search planned in search bar

 searchPlannedByName = (query) => {
  return this.plannedRecipes.filter((recipe) => recipe.name.toLowerCase().includes(query));
 };

 searchPlannedByIngred = (query, ingredientList) => {
  let ingredientIDs = this.changeIngredientNameToID(query, ingredientList);
  return this.plannedRecipes.filter((recipe) => {
    let recipeIngredientIDs = this.makeIngredientList(recipe);
    return ingredientIDs.some((id) => recipeIngredientIDs.includes(id));
  });
 };

 searchPlannedByAll = (query, ingredientList) => {
  let allPlannedSearches = this.searchPlannedByIngred(query, ingredientList).concat(this.searchPlannedByName(query));
  let filterDuplicates = [...new Set(allPlannedSearches)];
  return filterDuplicates;
 };

 // search all saved recipes in search bar 
 searchSavedByName = (query) => {
  let allSaved = this.favoriteRecipes.concat(this.plannedRecipes);
  return allSaved.filter((recipe) => recipe.name.toLowerCase().includes(query));
 };

 searchSavedByIngred = (query, ingredientList) => {
  let allSaved = this.favoriteRecipes.concat(this.plannedRecipes);
  let ingredientIDs = this.changeIngredientNameToID(query, ingredientList);
  return allSaved.filter((recipe) => {
   let recipeIngredientIDs = this.makeIngredientList(recipe);
   return ingredientIDs.some((id) => recipeIngredientIDs.includes(id));
  });
 };

 changeIngredientNameToID = (ingredientName, ingredientList) => {
  let ingredients = ingredientList.filter((ingredient) => ingredient.name.includes(ingredientName));
    ingredients = ingredients.map((ingredient) => ingredient.id);
    return ingredients;
 };

 makeIngredientList = (recipe) => {
  return recipe.ingredients.map((ingredient) => ingredient.id);
 };

 searchAllSavedByAll = (query, ingredientList) => {
  let allRecipes = this.searchSavedByIngred(query,ingredientList).concat(this.searchSavedByName(query));
  let filterDuplicates = [...new Set(allRecipes)];
  return filterDuplicates;
 };
}

// search all recipe data by name // all 3 of these tests throw errors for "not a function"?
searchAllRecipesByName = (query, recipeList) => {
  return recipeList.filter(recipe => recipe.name.toLowerCase().includes(query));
}

searchAllRecipesByIngred = (query, recipeList, ingredientList) => {
  let ingredientIDs = this.changeIngredientNameToID(query, ingredientList);
  return recipeList.filter(recipe => {
   let recipeIngredientIDs = this.makeIngredientList(recipe);
    return ingredientIDs.some(id => recipeIngredientIDs.includes(id));
  })
}

searchAllRecipesByAll = (query, recipeList, ingredientList) => {
  let allSearchedRecipes = this.searchAllRecipesByIngred(query, recipeList, ingredientList).concat(this.searchAllRecipesByName(query, recipeList));
  let filterDuplicates = [...new Set(allSearchedRecipes)];
  return filterDuplicates;
} 

if (typeof module !== 'undefined') {
  module.exports = User;
}