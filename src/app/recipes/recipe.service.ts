import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Hello World Recipe',
      'This is the hello world recipe',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'),
    new Recipe('Another Recipe',
      'This is the hello world recipe',
      'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
