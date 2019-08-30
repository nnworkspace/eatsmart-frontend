import {Action, createReducer, on} from "@ngrx/store";

import * as SlActions from "./shopping-list.actions";

import {Ingredient} from "../../shared/ingredient.model";

export interface ShoppingListState {
  ingredients: Ingredient[];
  editIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('schrimps', 200, 'g'),
    new Ingredient('Tea leaves', 50, 'g'),
  ],
  editIndex: -1
};

export function shoppingListReducer(
  shoppingListState: ShoppingListState | undefined,
  shoppingListAction: Action) {

  return createReducer(
    initialState,

    on(SlActions.addIngredient, (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(action.ingredient)
    })),

    on(SlActions.addIngredientList, (state, action) => ({
      ...state,
      ingredients: state.ingredients.concat(...action.ingredients)
    })),

    on(SlActions.updateIngredient, (state, action) => ({
      ...state,
      ingredients: state.ingredients.map((ingredient, index) =>
        index === state.editIndex ? {...action.ingredient} : ingredient
      ),
      editIndex: -1
    })),

    on(SlActions.deleteIngredient, state => ({
      ...state,
      ingredients: state.ingredients.filter((ingredient, index) =>
        index !== state.editIndex
      ),
      editIndex: -1
    })),

    on(SlActions.startEdit, (state, action) => ({...state, editIndex: action.index})),

    on(SlActions.stopEdit, state => ({...state, editIndex: -1}))

  )(shoppingListState, shoppingListAction);

}

// export function shoppingListReducer(state = initialState, action: SlActions.ShoppingListActions) {
//   switch (action.type) {
//     case SlActions.ADD_INGREDIENT:
//       return {
//         ...state, // copy the old state first, then add own attributes
//         ingredients: [...state.ingredients, action.payload]
//       };
//     case SlActions.ADD_INGREDIENT_LIST:
//       return {
//         ...state, // copy the old state first, then add own attributes
//         ingredients: [...state.ingredients, ...action.payload]
//       };
//     case SlActions.UPDATE_INGREDIENT:
//       const oldIngre = state.ingredients[state.editedIngredientIndex];
//
//       // copy all the properties from the old ingredient and overwrite the values
//       // with the new ingredient
//       const newIngre = {
//         ...oldIngre,
//         ...action.payload
//       };
//
//       const newIngreArray = [...state.ingredients];
//       newIngreArray[state.editedIngredientIndex] = newIngre;
//
//       return {
//         ...state, // copy the old state first, then add own attributes
//         ingredients: newIngreArray,
//
//         // reset the following two properties to initial values
//         editedIngredient: null,
//         editedIngredientIndex: -1
//       };
//     case SlActions.DELETE_INGREDIENT:
//       return {
//         ...state, // copy the old state first, then add own attributes
//         ingredients: state.ingredients.filter((ingre, ingreIdx) => {
//           return ingreIdx !== state.editedIngredientIndex;
//         }),
//
//         // reset the following two properties to initial values
//         editedIngredient: null,
//         editedIngredientIndex: -1
//       };
//     case SlActions.START_EDIT:
//       return{
//         ...state,
//         editedIngredientIndex: action.payload,
//         editedIngredient: { ...state.ingredients[action.payload] }
//       };
//     case SlActions.STOP_EDIT:
//       return{
//         ...state,
//         // simply reset the following two properties to initial values
//         editedIngredient: null,
//         editedIngredientIndex: -1
//       };
//     default:
//       return state;
//   }
// }
