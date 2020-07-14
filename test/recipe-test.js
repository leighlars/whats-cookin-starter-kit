const chai = require('chai');
const expect = chai.expect;

const Recipe = require('../src/Recipe')
describe('Recipe', function() {
  let recipe, recipe1, recipeSad, mockRecipe, mockIngredientsList, mockRecipeList;
  beforeEach( () => {
    mockRecipe = {
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
    recipeSad = {
      id: "",
      name: "",
      image: "",
      ingredients: "",
      instructions: "",
      tags: "",
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
    recipe = new Recipe(mockRecipe, mockIngredientsList, mockRecipeList);
    recipe1 = new Recipe(recipeSad, mockIngredientsList, mockRecipeList);
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

  it("should have default image if none is provided", function() {
    expect(recipe1.image).to.equal("https://spoonacular.com/recipeImages/595736-556x370.jpg");
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

  it('should have default ingredients if none are provided', function() {
    expect(recipe1.ingredients).to.deep.equal("No ingredients provided. Please Google other similar recipes for ingredients.");

  });

  it('should have instructions', function() {
    expect(recipe.instructions).to.be.an('array');
    expect(recipe.instructions[0]).to.deep.equal(
      {
        "instruction": "Boil water",
        "number": 1
      })
  });

  it('should have default instructions if none are given', function() {
    expect(recipe1.instructions).to.deep.equal("No instructions provided. Please Google other similar recipes for instructions.")
  });

  it('should have tags', function() {
    expect(recipe.tags).to.be.an('array');
    expect(recipe.tags.length).to.equal(2);
  });

  it('can have default tags if no tags are given', function() {
    expect(recipe1.tags).to.be.an('array');
     
    expect(recipe.tags).to.deep.equal(["breakfast", "lunch"]);

    expect(recipe1.tags).to.deep.equal(["miscellaneous"]);
  })

  it('should return recipe instructions', function() {
    expect(recipe.getInstructions()).to.equal('1. Boil water</br></br>');
    expect(recipe1.getInstructions()).to.equal("No instructions provided. Please Google other similar recipes for instructions.")
  });

  it('should get total cost in dollars of each ingredients in each recipe', function() {
    expect(recipe.getRecipeCost(mockIngredientsList)).to.equal(2.13);
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