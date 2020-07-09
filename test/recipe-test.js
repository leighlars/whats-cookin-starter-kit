const chai = require('chai');
const expect = chai.expect;

const Recipe = require('../src/Recipe')
describe('Recipe', function() {
  let recipe;
  let mockIngredientsList;
  let mockRecipeList;
  beforeEach( () => {
    let mockRecipe = {
      id: 1,
      name: "cookies",
      image: "https://spoonacular.com/recipeImages/595736-556x370.jpg",
      ingredients: [
        {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        }
      ],
      instructions: [{instruction: "Boil water", number: 1}],
      tags: ["breakfast", "lunch"],
    };
    mockIngredientsList = [
      {
        id: 20081,
        name: "wheat flour",
        estimatedCostInCents: 142,
      },
      {
        id: 18372,
        name: "bicarbonate of soda",
        estimatedCostInCents: 582,
      }
    ];
    mockRecipeList = [
      {
        id: 1,
        name: "cookies",
        image: "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        ingredients: [
          {
            id: 20081,
            quantity: {
              amount: 1.5,
              unit: "c",
            },
          },
        ],
        instructions: [{ instruction: "Boil water", number: 1 }],
        tags: ["breakfast", "lunch"],
      },
    ];
    recipe = new Recipe(mockRecipe);
  })

  it('should be a function', function() {
    expect(Recipe).to.be.a('function')
  });

  it('should be an instance of a recipe', function() {
    expect(recipe).to.be.an.instanceOf(Recipe)
  });

  it('should have an id', function() {
    expect(recipe.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(recipe.name).to.equal("cookies")
  });

  it('the name should be a string', function() {
    let recipeSad = new Recipe({id: 1, name: 123});
    expect(recipeSad.name).to.equal('123');
  });

  it('should have a recipe image', function() {
    expect(recipe.image).to.be.a('string');
    expect(recipe.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg");
  });

  it('should have ingredients', function() {
    expect(recipe.ingredients).to.be.an('array');
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
    expect(recipe.instructions).to.be.an('array');
    expect(recipe.instructions[0]).to.deep.equal(
      {
        "instruction": "Boil water",
        "number": 1
      })
  });

  it('should have tags', function() {
    expect(recipe.tags).to.be.an('array');
    expect(recipe.tags.length).to.equal(2)
  });

  it('should get recipe instructions', function() {
    expect(recipe.getInstructions()).to.equal(recipe.instructions)
  });

  it('should get total cost in dollars of ingredients in each recipe', function() {
    expect(recipe.getRecipeCost(mockIngredientsList)).to.equal(2.13);
  });

  it('should filter a recipes by tag', function() {
    expect(recipe.filterRecipeByTag('breakfast', mockRecipeList).length).to.deep.equal(1);
  });

  it('should filter recipes by ingredient', function() {
    expect(recipe.filterRecipeByIngredient('wheat flour', mockIngredientsList, mockRecipeList)).to.deep.equal([mockRecipeList[0]])
  });

  it('should filter recipes by name', function () {
    expect(recipe.filterRecipeByName('cookie', mockRecipeList)).to.deep.equal([mockRecipeList[0]]);
    expect(recipe.filterRecipeByName('cookie', mockRecipeList).length).to.deep.equal(1);

  });

  it('should return all recipes that match searched recipe name or ingredient', function() {
    expect(recipe.filterAllRecipesByQuery('cookie', mockIngredientsList, mockRecipeList).length).to.deep.equal(1);
    expect(recipe.filterAllRecipesByQuery( "wheat flour", mockIngredientsList, mockRecipeList).length).to.deep.equal(1);

  });


})