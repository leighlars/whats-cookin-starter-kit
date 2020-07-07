class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = user.pantry;
    this.favoriteRecipes = user.favoriteRecipes || [];
    this.plannedRecipes = user.plannedRecipes || [];
  }
}





if (typeof module !== 'undefined') {
  module.exports = User;
}