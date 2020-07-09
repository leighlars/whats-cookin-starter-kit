const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const Recipe = require('../src/Recipe');
const Pantry = require('../src/Pantry');
const ingredientsData = require('../data/ingredients');

describe('User', function() {
  let user, userInfo, recipeInfo1, recipeInfo2, recipe1, recipe2, ingredients, pantry; 
  
  beforeEach(function() {
    userInfo = {
      "name": "Saige O'Kon",
      "id": 1,
      "pantry": [
        {
          "ingredient": 11477,
          "amount": 4
        },
        {
          "ingredient": 11297,
          "amount": 4
        },
        {
          "ingredient": 1082047,
          "amount": 10
        },
        {
          "ingredient": 20081,
          "amount": 5
        },
        {
          "ingredient": 11215,
          "amount": 5
        },
        {
          "ingredient": 2047,
          "amount": 6
        },
        {
          "ingredient": 1123,
          "amount": 8
        },
        {
          "ingredient": 11282,
          "amount": 4
        },
        {
          "ingredient": 6172,
          "amount": 2
        },
        {
          "ingredient": 2044,
          "amount": 2
        },
        {
          "ingredient": 2050,
          "amount": 4
        },
        {
          "ingredient": 1032009,
          "amount": 3
        },
        {
          "ingredient": 5114,
          "amount": 3
        },
        {
          "ingredient": 1017,
          "amount": 2
        },
        {
          "ingredient": 18371,
          "amount": 7
        },
        {
          "ingredient": 1001,
          "amount": 6
        },
        {
          "ingredient": 99223,
          "amount": 2
        },
        {
          "ingredient": 1230,
          "amount": 2
        },
        {
          "ingredient": 9152,
          "amount": 4
        },
        {
          "ingredient": 10611282,
          "amount": 2
        },
        {
          "ingredient": 93607,
          "amount": 2
        },
        {
          "ingredient": 14106,
          "amount": 4
        },
        {
          "ingredient": 1077,
          "amount": 4
        },
        {
          "ingredient": 6150,
          "amount": 2
        },
        {
          "ingredient": 1124,
          "amount": 2
        },
        {
          "ingredient": 10011693,
          "amount": 4
        },
        {
          "ingredient": 1102047,
          "amount": 2
        },
        {
          "ingredient": 19206,
          "amount": 2
        },
        {
          "ingredient": 1145,
          "amount": 4
        },
        {
          "ingredient": 1002030,
          "amount": 4
        },
        {
          "ingredient": 12061,
          "amount": 2
        },
        {
          "ingredient": 19335,
          "amount": 4
        },
        {
          "ingredient": 15152,
          "amount": 3
        },
        {
          "ingredient": 9003,
          "amount": 2
        },
        {
          "ingredient": 18372,
          "amount": 3
        },
        {
          "ingredient": 2027,
          "amount": 2
        }
      ]
    },
    user = new User(userInfo);
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
        {
          "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees.",
          "number": 3
        },
        {
          "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt.",
          "number": 4
        },
        {
          "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown.",
          "number": 5
        },
        {
          "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.",
          "number": 6
        }
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
    },
    recipeInfo2 = {
      "id": 678353,
      "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
      "ingredients": [
        {
          "id": 1009016,
          "quantity": {
            "amount": 1.5,
            "unit": "cups"
          }
        },
        {
          "id": 9003,
          "quantity": {
            "amount": 2,
            "unit": ""
          }
        },
        {
          "id": 20027,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 1002046,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 11215,
          "quantity": {
            "amount": 1,
            "unit": "clove"
          }
        },
        {
          "id": 1012046,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 19911,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 16112,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 10010062,
          "quantity": {
            "amount": 24,
            "unit": "ounce"
          }
        },
        {
          "id": 1102047,
          "quantity": {
            "amount": 4,
            "unit": "servings"
          }
        },
        {
          "id": 16124,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        },
        {
          "id": 1016168,
          "quantity": {
            "amount": 1,
            "unit": "tablespoon"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
          "number": 1
        }
      ],
      "name": "Maple Dijon Apple Cider Grilled Pork Chops",
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    recipe1 = new Recipe(recipeInfo1);
    recipe2 = new Recipe(recipeInfo2);
    ingredients = [ {
      "id": 9003,
      "name": "apple",
      "estimatedCostInCents": 207
    },
    {
      "id": 10019903,
      "name": "semi sweet chips",
      "estimatedCostInCents": 253
    }, 
    {
      "id": 9040,
      "name": "ripe banana",
      "estimatedCostInCents": 331
    }
    ];
    pantry = new Pantry(ingredients);
  });

  it.only('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it.only('should instantiate a user', function () {
    expect(user).to.be.an.instanceOf(User);
  });

  it.only('should have an id', function () {
    expect(user.id).to.be.a('number');
    expect(user.id).to.equal(1);
  });

  it.only('if id is not a number, assign it to Date.now()', function() {
    expect(user.id).to.equal(1);
    const user2 = new User({name: "Sally", id: "five", pantry: []}); 
    expect(user2.id).to.equal(Date.now());
  })

  it.only('should have a name', function () {
    expect(user.name).to.be.a('string');
    expect(user.name).to.equal("Saige O'Kon");
  });
  
  it.only('user name should be a string', function() {
    const user2 = new User({name: 123, id: 2, pantry: []});
    expect(user2.name).to.equal('123');
  });

  it.only('should have a pantry that is instance of Pantry', function () {
    expect(user.pantry).to.be.an.instanceOf(Pantry);
  })

  it.only('should have a pantry of ingredients', function () {
    expect(user.pantry.ingredients.length).to.deep.equal(36);
  });

  it.only('should have a list of favorite recipes', function () {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it.only('should have a list of planned recipes', function () {
    expect(user.plannedRecipes).to.deep.equal([]);
  });

  it.only('should be able add recipe to favorites', function () {
    user.addFavoriteRecipe(recipe1);
    expect(user.favoriteRecipes.length).to.deep.equal(1);

    user.addFavoriteRecipe("blah");
    expect(user.favoriteRecipes.length).to.deep.equal(1);
  });

  it.only('should delete recipe from favorites', function() {
    user.deleteFavoriteRecipe(recipe1);

    expect(user.favoriteRecipes.length).to.deep.equal(0);
  });

  it.only('should add recipe to planned recipes', function () {
    user.addPlannedRecipe(recipe1);

    expect(user.plannedRecipes.length).to.deep.equal(1);
  });

  it.only('should filter favorite recipes by tag', function () {
    user.addFavoriteRecipe(recipe1);
    
    expect(user.filterFavoriteByTag('antipasti')[0]).to.equal(recipe1);
  });

  it.only('should filter favorite recipes by tag', function () {
    user.addPlannedRecipe(recipe1);

    expect(user.filterPlannedByTag('antipasti')[0]).to.equal(recipe1);
  });

  it.only('should search for all saved recipes by name', function() {
    user.addFavoriteRecipe(recipe1);
    user.addPlannedRecipe(recipe2);

    expect(user.searchSavedRecipesByName('cookie')[0]).to.equal(recipe1);
    expect(user.searchSavedRecipesByName('apple')[0]).to.equal(recipe2);
  });

  it.only('should search for all saved recipes by ingredient', function() {
    user.addFavoriteRecipe(recipe1);
    user.addPlannedRecipe(recipe2);

    expect(user.searchSavedRecipesByIngred('eggs')[0]).to.deep.equal(recipe1);
    expect(user.searchSavedRecipesByIngred('apple cider')[0]).to.equal(recipe2);
  });

  it.only('should search for all saved recipes by ingredient or name', function() {
    user.addFavoriteRecipe(recipe1);
    user.addPlannedRecipe(recipe2);

    user.searchByIngredAndName('eggs');

    expect(user.searchByIngredAndName('eggs')[0]).to.deep.equal(recipe1);


  })
});