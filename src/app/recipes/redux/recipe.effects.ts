import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {Actions, Effect, ofType} from "@ngrx/effects";

import * as reduxApp from '../../redux/app.reducer';
import * as RecipeActions from './recipe.actions';

import {Recipe} from "../recipe.model";

@Injectable()
export class RecipeEffects {
  dsUrlRecipes = 'https://eatsmart-backend.firebaseio.com/recipes.json';

  @Effect()
  fetchRecipes = this.actions$.pipe(
    // step 1: grab the proper type of actions.
    ofType(RecipeActions.FETCH_RECIPES),

    // step 2: get the http response of backend data store
    switchMap(() => {
      return this.http.get<Recipe[]>(this.dsUrlRecipes)
    }),

    // step 3: transform the response data.
    // If the recipe in the backend has no ingredient, init it with an empty array here
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),

    // step 4: return a SetRecipes action
    map(recipes => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),

    // merge a value from another observable.
    withLatestFrom(this.redux.select('recipe')),

    switchMap(([actionData, recipeState]) => {
      return this.http.put(this.dsUrlRecipes, recipeState.recipes);
    }),
  );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private redux: Store<reduxApp.AppState>) {
  }
}
