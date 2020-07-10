const chai = require('chai');
const expect = chai.expect;
const Pantry = require('../src/Pantry');
const Recipe = require('../src/Recipe');


describe('Pantry', function () {
  let pantryFull, pantryEmpty, userPantryIngredients, recipe1, recipeInfo1, recipe2, recipeInfo2, mockIngredientList;

  beforeEach(function () {
    mockIngredientList = [
      {
        id: 20081,
        name: "wheat flour",
        estimatedCostInCents: 142,
      },
      {
        id: 18372,
        name: "bicarbonate of soda",
        estimatedCostInCents: 582,
      },
      {
        id: 1009016,
        name: "apple cider",
        estimatedCostInCents: 468,
      },
      {
        id: 9003,
        name: "apple",
        estimatedCostInCents: 207,
      },
    ];
    userPantryIngredients = [
      {
        ingredient: 20081,
        amount: 2,
      },
      {
        ingredient: 18372,
        amount: 1,
      },
      {
        ingredient: 9003,
        amount: 10,
      },
    ];
    pantryFull = new Pantry(userPantryIngredients, mockIngredientList);
    pantryEmpty = new Pantry();
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
        }
      ]
    };
    recipeInfo2 = {
      "id": 678353,
      "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
      "ingredients": [
        {
          "id": 1009016,
          "quantity": {
            "amount": 10.5,
            "unit": "cups"
          }
        },
        {
          "id": 9003,
          "quantity": {
            "amount": 20
          }
        }
      ],
      "instructions": [
        {
          "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!",
          "number": 10
        }
      ]
    },
    recipe1 = new Recipe(recipeInfo1);
    recipe2 = new Recipe(recipeInfo2);
  });

  it('should be a function', function () {
    expect(Pantry).to.be.a('function');
  });

  it('should instantiate a new pantry', function () {
    expect(pantryFull).to.be.an.instanceOf(Pantry);
    expect(pantryEmpty).to.be.an.instanceOf(Pantry);
  });

  it('should have access to all ingredients data', function() {
    expect(pantryFull.allIngredients).to.deep.equal(mockIngredientList);
  })

  it('can have no ingredients by default', function () {
    expect(pantryEmpty.ingredients).to.deep.equal([]);
  });

  it('can be instantiated with ingredients', function () {
    expect(pantryFull.ingredients).to.deep.equal(userPantryIngredients);
  });

  it('should find pantry ingredient that matches recipe ingredient by ID', function() {
    expect(pantryFull.findIngredientByID(20081)).to.deep.equal({
      ingredient: 20081,
      amount: 2,
    });
  })

  it('should check if pantry has enough ingredients amount for given recipe', function () {
    expect(pantryFull.isInPantry(recipe1)).to.equal(true);
    expect(pantryFull.isInPantry(recipe2)).to.equal(false);
  });

  it('should return missing ingredient and amount needed to make a meal', function() {
    let expected = [ {"id": 1009016, "amount": 10.5}, {"id": 9003, "amount": 10}];
    let expected2 = [ {"id": 1009016, "amount": 10.5 }, {"id": 9003, "amount": 20 }];

    expect(pantryFull.getIngredientsForRecipe(recipe2)).to.deep.equal(expected);
    expect(pantryEmpty.getIngredientsForRecipe(recipe2)).to.deep.equal(expected2);
    expect(pantryFull.getIngredientsForRecipe(recipe1)).to.deep.equal([]);
  });

  it('should return a list of ingredients and cost to buy for a meal', function() {
    expect(pantryFull.createGroceryList(recipe2)[0]).to.deep.equal({name: 'apple cider', cost: 49.14})
    expect(pantryFull.createGroceryList(recipe2)[1]).to.deep.equal({ name: "apple", cost: 20.7});
  });
  

});