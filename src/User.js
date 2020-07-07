const ingredientsData = require('../data/ingredients');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = user.favoriteRecipes || [];
    this.plannedRecipes = user.plannedRecipes || [];
  }

  addFavoriteRecipe(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  deleteFavoriteRecipe(recipe) {
    let i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1);
  }

  addPlannedRecipe(recipe) {
    this.plannedRecipes.push(recipe);
  }

  filterFavoriteByTag(tag) {
    return this.favoriteRecipes.filter(faveRecipe => faveRecipe.tags.includes(tag));
  }

  filterPlannedByTag(tag) {
    return this.plannedRecipes.filter(plannedRecipe => plannedRecipe.tags.includes(tag));
  }

  // Search any of my saved recipes by name or ingredient

  searchUserRecipesByName(query) {
    let allSaved = this.favoriteRecipes.concat(this.plannedRecipes);
    return allSaved.filter(recipe => {
      return recipe.name.toLowerCase().includes(query);
    });    
  }  

  searchUserRecipesByIngred(query) {
    let allSaved = this.favoriteRecipes.concat(this.plannedRecipes);
    // loop thru ingredientsData to filter all ingredients with names that includes query
    let matchedIngreds = ingredientsData.filter(ingredient => ingredient.name.includes(query));
    console.log(matchedIngreds); // says name is undefined???

    // return an array of recipes of which the saved recipes' ingredients match any of the matchedIngred[i].id
    

    // return allSaved.filter()
  }
  
}
// if any of the user's saved recipes' ingredients' ids match any of the new array's elements,

// let matchedIngredients = ingredientsData.filter(ingredient => ingredient.name.includes(query));
// let matchedIDs = matchedIngredients.map(matched => {
//   return matched.id;
// });






if (typeof module !== 'undefined') {
  module.exports = User;
}