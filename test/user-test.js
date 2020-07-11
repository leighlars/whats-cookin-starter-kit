const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const Recipe = require('../src/Recipe');
const Pantry = require('../src/Pantry');

describe('User', function() {
  let user, userInfo, recipeInfo1, recipeInfo2, recipe1, recipe2, mockIngredientsList, pantry; 
  
  beforeEach(function() {
    userInfo = {
      name: "Saige O'Kon",
      id: 1,
      pantry: [
        {
          ingredient: 11477,
          amount: 4,
        },
        {
          ingredient: 11297,
          amount: 4,
        },
        {
          ingredient: 1082047,
          amount: 10,
        },
      ],
    };
    mockIngredientsList = [
      {
        id: 9003,
        name: "apple",
        estimatedCostInCents: 207,
      },
      {
        id: 10019903,
        name: "semi sweet chips",
        estimatedCostInCents: 253,
      },
      {
        id: 9040,
        name: "ripe banana",
        estimatedCostInCents: 331,
      },
      {
        id: 20081,
        name: 'wheat flour'
      }
    ];
    user = new User(userInfo, mockIngredientsList);
    pantry = new Pantry(user.pantry);
    recipeInfo1 = {
      "id": 595736,
      "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 1123,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
          "number": 1
        },
        {
          "instruction": "Add egg and vanilla and mix until combined.",
          "number": 2
        },
      ],
      "name": "Loaded Chocolate Chip Pudding Cookie Cups",
      "tags": [
        "antipasti",
        "starter",
        "snack",
        "appetizer",
        "antipasto",
        "hor d'oeuvre"
      ]
    };
    recipeInfo2 = {
      id: 678353,
      image: "https://spoonacular.com/recipeImages/678353-556x370.jpg",
      ingredients: [
        {
          id: 20081,
          quantity: {
            amount: 1.5,
            unit: "c",
          },
        },
        {
          id: 1009016,
          quantity: {
            amount: 1.5,
            unit: "cups",
          },
        },
        {
          id: 9003,
          quantity: {
            amount: 2,
            unit: "",
          },
        },
      ],
      instructions: [
        {
          instruction:
        "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
          number: 1,
        },
      ],
      name: "Maple Dijon Apple Cider Grilled Pork Chops",
      tags: ["lunch", "main course", "main dish", "dinner"],
    };
    recipe1 = new Recipe(recipeInfo1);
    recipe2 = new Recipe(recipeInfo2);
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should instantiate a user', function () {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should have an id', function () {
    expect(user.id).to.be.a('number');
    expect(user.id).to.equal(1);
  });

  it('if id is not a number, assign it to Date.now()', function() {
    expect(user.id).to.equal(1);
    const user2 = new User({name: "Sally", id: "five", pantry: []}); 
    expect(user2.id).to.equal(Date.now());
  })

  it('should have a name', function () {
    expect(user.name).to.be.a('string');
    expect(user.name).to.equal("Saige O'Kon");
  });
  
  it('user name should be a string', function() {
    const user2 = new User({name: 123, id: 2, pantry: []});
    expect(user2.name).to.equal('123');
  });

  it('should have a pantry of ingredients', function () {
    expect(user.pantry.length).to.deep.equal(3);
  });

  it('should have a list of favorite recipes', function () {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should have a list of planned recipes', function () {
    expect(user.plannedRecipes).to.deep.equal([]);
  });

  it('should be able add recipe to favorites', function () {
    user.addFavoriteRecipe(recipe1);
    expect(user.favoriteRecipes.length).to.deep.equal(1);

    user.addFavoriteRecipe(recipe2);
    expect(user.favoriteRecipes.length).to.deep.equal(2);
  });

  it('should delete recipe from favorites', function() {
    user.deleteFavoriteRecipe(recipe1);

    expect(user.favoriteRecipes.length).to.deep.equal(0);
  });

  it('should add recipe to planned recipes', function () {
    user.addPlannedRecipe(recipe1);

    expect(user.plannedRecipes.length).to.deep.equal(1);
  });

  it('should filter favorite recipes by tag', function () {
    user.addFavoriteRecipe(recipe1);
    
    expect(user.filterFavoriteByTag('antipasti')[0]).to.equal(recipe1);
  });

  it('should filter planned recipes by tag', function () {
    user.addPlannedRecipe(recipe1);

    expect(user.filterPlannedByTag('antipasti')[0]).to.equal(recipe1);
  });

  it('should search for all saved recipes by name', function() {
    user.addFavoriteRecipe(recipe1);
    user.addPlannedRecipe(recipe2);

    expect(user.searchSavedRecipesByName('cookie')[0]).to.equal(recipe1);
    expect(user.searchSavedRecipesByName('apple')[0]).to.equal(recipe2);
    expect(user.searchSavedRecipesByName("brick")).to.deep.equal([]);

  });

  it('should search for all saved recipes by ingredient', function() {
    user.addFavoriteRecipe(recipe1);
    user.addPlannedRecipe(recipe2);

    expect(user.searchSavedRecipesByIngred('wheat flour', mockIngredientsList)[0]).to.deep.equal(recipe1);
    expect(user.searchSavedRecipesByIngred('apple', mockIngredientsList)[0]).to.deep.equal(recipe2);
    expect(user.searchSavedRecipesByIngred("brick", mockIngredientsList)).to.deep.equal([]);
  });

  it('should search for all saved recipes by ingredient or name', function() {
    user.addFavoriteRecipe(recipe1);
    user.addPlannedRecipe(recipe2);
    user.addPlannedRecipe(recipe1);

    user.searchByIngredAndName('wheat flour', mockIngredientsList);

    expect(user.searchByIngredAndName('wheat flour', mockIngredientsList)[0]).to.deep.equal(recipe1);
    expect(user.searchByIngredAndName("wheat flour", mockIngredientsList).length).to.deep.equal(2);


  })
});