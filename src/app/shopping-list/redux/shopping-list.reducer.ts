import * as SlActions from "./shopping-list.actions";

import {Ingredient} from "../../shared/ingredient.model";

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('schrimps', 200, 'g'),
    new Ingredient('Tea leaves', 50, 'g'),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
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
    case SlActions.UPDATE_INGREDIENT:
      const oldIngre = state.ingredients[state.editedIngredientIndex];

      // copy all the properties from the old ingredient and overwrite the values
      // with the new ingredient
      const newIngre = {
        ...oldIngre,
        ...action.payload
      };

      const newIngreArray = [...state.ingredients];
      newIngreArray[state.editedIngredientIndex] = newIngre;

      return {
        ...state, // copy the old state first, then add own attributes
        ingredients: newIngreArray,

        // reset the following two properties to initial values
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case SlActions.DELETE_INGREDIENT:
      return {
        ...state, // copy the old state first, then add own attributes
        ingredients: state.ingredients.filter((ingre, ingreIdx) => {
          return ingreIdx !== state.editedIngredientIndex;
        }),

        // reset the following two properties to initial values
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case SlActions.START_EDIT:
      return{
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };
    case SlActions.STOP_EDIT:
      return{
        ...state,
        // simply reset the following two properties to initial values
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
