const chai = require('chai');
const expect = chai.expect;
const Pantry = require('../src/Pantry');
const usersData = require('../data/users.js');
const Recipe = require('../src/Recipe');
// const ingredientsData = require("../data/ingredients");


describe('Pantry', function () {
  let pantryFull, pantryEmpty, ingredients, recipe1, recipeInfo1, recipe2, recipeInfo2;

  beforeEach(function () {
    ingredients = [
      {
        "ingredient": 11477,
        "amount": 4
      },
      {
        "ingredient": 18372,
        "amount": 4
      },
      {
        "ingredient": 20081,
        "amount": 2
      }
    ]
    pantryFull = new Pantry(ingredients);
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

  it('can have no ingredients by default', function () {
    expect(pantryEmpty.ingredients).to.deep.equal([]);
  });

  it('can be instantiated with ingredients', function () {
    expect(pantryFull.ingredients).to.deep.equal(ingredients);
  });

  it('should check if recipe and pantry ingredients match and if pantry has enough for recipe', function () {
    expect(pantryFull.matchAndCompareIngredients(recipe1.ingredients[0])).to.equal(true);
    expect(pantryFull.matchAndCompareIngredients(recipe2.ingredients[0])).to.equal(false);
  });

  it('should determine if pantry has enough ingredients for meal', function () {
    expect(pantryFull.checkPantry(recipe1)).to.equal(true);
    expect(pantryFull.checkPantry(recipe2)).to.equal(false);
  });

  it('should determine the amount of ingredients still needed to cook a given meal, based on what’s in my pantry', function() {
    const recipe = {
      ingredients: [
        {ingredient: 1, quantity: 3},
        {ingredient: 2, quantity: 1}
      ]
    }
    const sugar = { id: 1, name: 'sugar', estimatedCostOfCents: 100 };
    const butter = { id: 2, name: 'butter', estimatedCostOfCents: 299 };
    const pantry = new Pantry([sugar, sugar, butter])
    expect(pantry.findMissingIngredients(recipe)).to.deep.equals([{ingredientId: 1, name: 'sugar', quantity: 1}])
  });

  it.skip('should remove ingredient amount from pantry after cooking', function() {
    
    expect(pantryFull.removeIngredient()).to.equal()
    // can't figure out test logic

  })

});