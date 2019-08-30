import {createAction, props} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const addRecipe = createAction(
  '[recipe] Add recipe',
  props<{ recipe: Recipe }>()
);

export const updateRecipe = createAction(
  '[recipe] Update recipe',
  props<{ index: number, recipe: Recipe }>()
);

export const deleteRecipe = createAction(
  '[recipe] Delete recipe', props<{ index: number }>()
);

export const setRecipes = createAction(
  '[recipe] Set recipes', props<{ recipes: Recipe[] }>()
);

export const fetchRecipes = createAction('[recipe] Fetch recipes');

export const storeRecipes = createAction('[recipe] Store recipes');

// export const FETCH_RECIPES = '[recipe] fetch recipes';
// export const STORE_RECIPES = '[recipe] store recipes';
// export const SET_RECIPES = '[recipe] set recipes';
// export const ADD_RECIPE = '[recipe] add recipe';
// export const UPDATE_RECIPE = '[recipe] update recipe';
// export const DELETE_RECIPE = '[recipe] delete recipe';
//
// export class FetchRecipes implements Action {
//   readonly type = FETCH_RECIPES;
// }
//
// export class StoreRecipes implements Action {
//   readonly type = STORE_RECIPES;
// }
//
// export class SetRecipes implements Action {
//   readonly type = SET_RECIPES;
//
//   constructor(public payload: Recipe[]) {
//   }
// }
//
// export class AddRecipe implements Action {
//   readonly type = ADD_RECIPE;
//
//   constructor(public payload: Recipe) {
//   }
// }
//
// export class UpdateRecipe implements Action {
//   readonly type = UPDATE_RECIPE;
//
//   constructor(public payload: { index: number; newRecipe: Recipe }) {
//   }
// }
//
// export class DeleteRecipe implements Action {
//   readonly type = DELETE_RECIPE;
//
//   constructor(public payload: number) {
//   }
// }
//
//
// export type RecipeActions =
//   FetchRecipes | StoreRecipes
//   | SetRecipes
//   | AddRecipe
//   | UpdateRecipe
//   | DeleteRecipe;
