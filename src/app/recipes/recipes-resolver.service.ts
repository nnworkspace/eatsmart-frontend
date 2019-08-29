import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {of} from "rxjs";
import {map, switchMap, take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {Actions, ofType} from "@ngrx/effects";

import * as reduxApp from '../redux/app.reducer';
import * as RecipeActions from './redux/recipe.actions';

import {Recipe} from "./recipe.model";


@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private redux: Store<reduxApp.AppState>, private actions$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.redux.select('recipe').pipe(
      take(1),
      map(recipeState => {
        return recipeState.recipes;
      }),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.redux.dispatch(new RecipeActions.FetchRecipes());
          return this.actions$.pipe(
            // listen to the SetRecipes action
            ofType(RecipeActions.SET_RECIPES),
            take(1)
          );
        } else {
          // don't send any request, if we already have recipes.
          return of(recipes);
        }
      })
    );
    //this.redux.dispatch(new RecipeActions.FetchRecipes());

    // the resolver expects an observable as return value here, on the resolve method
    // and it waits for the observable to complete,
    // before it loads the route which added this resolver.
    // the problem is, when we dispatch redux action, we don't get back an observable.
    // Therefore, the resolver would instantly resolve,
    // and would instantly load the route, where the data is actually not there yet.
    // Here is a workaround.

  }

}
