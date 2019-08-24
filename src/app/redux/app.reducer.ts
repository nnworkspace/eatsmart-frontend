import {ActionReducerMap} from "@ngrx/store";

import * as reduxShoppingList from '../shopping-list/redux/shopping-list.reducer';
import * as reduxAuth from '../auth/redux/auth.reducer';

export interface AppState {
  auth: reduxAuth.AuthState;
  shoppingList: reduxShoppingList.ShoppingListState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: reduxAuth.authReducer,
  shoppingList: reduxShoppingList.shoppingListReducer
};
