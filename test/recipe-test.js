const chai = require('chai');
const expect = chai.expect;

const Recipe = require('../src/Recipe')
const RecipeData = require('../data/recipes');
const recipeData = require('../data/recipes');
describe('Recipe', function() {
  let recipe;
  let recipeInfo;
  let recipeInfo2;
  let ingredients;
  beforeEach(function() {
    recipeInfo =  {
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

    recipeInfo2 = [
      {
      "id": 543687,
      "image": "https://spoonacular.com/recipeImages/543687-556x370.jpg",
      "ingredients": [
        {
          "id": 93607,
          "quantity": {
            "amount": 1,
            "unit": "cup"
          }
        },
        {
          "id": 9040,
          "quantity": {
            "amount": 1,
            "unit": "small"
          }
        },
        {
          "id": 18942,
          "quantity": {
            "amount": 1,
            "unit": "Tbsp"
          }
        },
        {
          "id": 1012010,
          "quantity": {
            "amount": 0.25,
            "unit": "tsp"
          }
        },
        {
          "id": 2021,
          "quantity": {
            "amount": 1,
            "unit": "pinch"
          }
        },
        {
          "id": 2025,
          "quantity": {
            "amount": 1,
            "unit": "pinch"
          }
        },
        {
          "id": 43274,
          "quantity": {
            "amount": 1,
            "unit": "oz"
          }
        },
        {
          "id": 8120,
          "quantity": {
            "amount": 0.25,
            "unit": "cup"
          }
        },
        {
          "id": 11424,
          "quantity": {
            "amount": 0.5,
            "unit": "cup"
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Add all ingredients to a blender (except graham crackers if using). Cover and blend until well pureed then serve topped with crushed graham crackers if desired.*The banana is mostly what gives this smoothie it's sweetness, so I recommend using one that is speckled (not mushy though).Recipe Source: Cooking Classy",
          "number": 1
        }
      ],
      "name": "Pumpkin Cheesecake Breakfast Smoothie",
      "tags": [
        "morning meal",
        "brunch",
        "breakfast"
      ]
    }
  ],
    recipe = new Recipe(recipeInfo);
    recipe2 = new Recipe(recipeInfo2)
    ingredients = [
      {
        "id": 20081,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      },
      {
        "id": 18372,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
      },
      {
        "id": 1123,
        "name": "eggs",
        "estimatedCostInCents": 472
      }
    ]
  });

  it('should be a function', function() {
    expect(Recipe).to.be.a('function')
  });

  it('should be an instance of a recipe', function() {
    expect(recipe).to.be.an.instanceOf(Recipe)
  });

  it('should have an id', function() {
    expect(recipe.id).to.equal(595736)
  });

  it('should have a name', function() {
    expect(recipe.name).to.equal("Loaded Chocolate Chip Pudding Cookie Cups")
  });

  it('should have a recipe image', function() {
    expect(recipe.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg")
  });

  it('should have ingredients', function() {
    expect(recipe.ingredients[0]).to.deep.equal(
      {
        "id": 20081,
        "quantity": {
          "amount": 1.5,
          "unit": "c"
        }
      })
  });

  it('should have instructions', function() {
    expect(recipe.instructions[0]).to.deep.equal(
      {
        "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
        "number": 1
      })
  });

  it('should have tags', function() {
    expect(recipe.tags.length).to.equal(6)
  });

  it('should get recipe instructions', function() {
    expect(recipe.getInstructions()).to.equal(recipe.instructions)
  });

  it('should get total cost of ingredients in each recipe', function() {
    expect(recipe.getRecipeCost()).to.equal(976);
  });

  it('should filter a recipes by tag', function() {
    expect(recipe.filterRecipeByTag('breakfast')).to.deep.equal(recipeInfo2)
  });

  it('should filter a recipes by ingredient', function() {
    expect(recipe.filterRecipeByIngredient('maple')).
    to.deep.equal([recipeData[1], recipeData[6]])
  });


})