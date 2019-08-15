import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";

import {RecipeService} from "../recipes/recipe.service";
import {map, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  dsUrlRecipes = 'https://eatsmart-backend.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.dsUrlRecipes, recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.dsUrlRecipes)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
