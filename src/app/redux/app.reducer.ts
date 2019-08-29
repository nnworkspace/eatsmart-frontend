import {ActionReducerMap} from "@ngrx/store";

import * as reduxAuth from '../auth/redux/auth.reducer';
import * as reduxRecipe from '../recipes/redux/recipe.reducer';
import * as reduxShoppingList from '../shopping-list/redux/shopping-list.reducer';

export interface AppState {
  auth: reduxAuth.AuthState;
  recipe: reduxRecipe.RecipeState;
  shoppingList: reduxShoppingList.ShoppingListState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: reduxAuth.authReducer,
  recipe: reduxRecipe.recipeReducer,
  shoppingList: reduxShoppingList.shoppingListReducer,
};
