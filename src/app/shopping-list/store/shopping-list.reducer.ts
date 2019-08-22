import {Action} from "@ngrx/store";
import * as SlActions from "./shopping-list.actions";

import {Ingredient} from "../../shared/ingredient.model";

const initialState = {
  ingredients: [
    new Ingredient('schrimps', 200, 'g'),
    new Ingredient('Tea leaves', 50, 'g'),
  ]
};

export function shoppingListReducer(state = initialState, action: SlActions.ShoppingListActions) {
  switch (action.type) {
    case SlActions.ADD_INGREDIENT:
      return {
        ...state, // copy the old state first, then add own attributes
        ingredients: [...state.ingredients, action.payload]
      };
    case SlActions.ADD_INGREDIENT_LIST:
      return {
        ...state, // copy the old state first, then add own attributes
        ingredients: [...state.ingredients, ...action.payload]
      };
    default:
      return state;
  }
}
