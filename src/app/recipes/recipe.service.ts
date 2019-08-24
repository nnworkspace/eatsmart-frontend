import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import * as reduxApp from "../redux/app.reducer";
import * as SlActions from "../shopping-list/redux/shopping-list.actions";

import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Shrimps and Tea Leaves',
  //     'Delicious shrimps and tea leaves',
  //     'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
  //     [
  //       new Ingredient('shrimp', 200, 'g'),
  //       new Ingredient('tea leaves', 50, 'g')
  //     ]),
  //   new Recipe('Crabs and Shrimps',
  //     'This is crabs and shrimps',
  //     'https://upload.wikimedia.org/wikipedia/commons/5/53/Korean_seafood-Ganjang_gejang-01.jpg',
  //     [
  //       new Ingredient('crabs', 500, 'g'),
  //       new Ingredient('soya sauce', 50, 'ml'),
  //       new Ingredient('ginger', 50, 'g')
  //     ])
  // ];

  private recipes: Recipe[] = [];

  constructor(
    private store: Store<reduxApp.AppState> ) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.notifyObservers();
  }

  getRecipe(idx: number) {
    return this.recipes[idx];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.store.dispatch(new SlActions.AddIngredientList(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.notifyObservers();
  }

  updateRecipe(index: number, editedRecipe: Recipe) {
    this.recipes[index] = editedRecipe;
    this.notifyObservers();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.notifyObservers();
  }

  private notifyObservers() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
