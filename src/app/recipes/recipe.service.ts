import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Shrimps and Tea Leaves',
      'Delicious shrimps and tea leaves',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
      [
        new Ingredient('shrimp', 200, 'g'),
        new Ingredient('tea leaves', 50, 'g')
      ]),
    new Recipe('Crabs and Shrimps',
      'This is crabs and shrimps',
      'https://upload.wikimedia.org/wikipedia/commons/5/53/Korean_seafood-Ganjang_gejang-01.jpg',
      [
        new Ingredient('crabs', 500, 'g'),
        new Ingredient('soya sauce', 50, 'ml'),
        new Ingredient('ginger', 50, 'g')
      ])
  ];

  constructor(private slService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(idx: number) {
    return this.recipes[idx];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, editedRecipe: Recipe) {
    this.recipes[index] = editedRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}
