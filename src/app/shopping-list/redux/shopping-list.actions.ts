import {createAction, props} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const addIngredient = createAction(
  '[shopping list] Add Ingredient',
  props<{ ingredient: Ingredient }>()
);

export const addIngredientList = createAction(
  '[shopping list] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);

export const updateIngredient = createAction(
  '[shopping list] Update Ingredient',
  props<{ ingredient: Ingredient }>()
);

export const deleteIngredient = createAction('[shopping list] Delete Ingredient');

export const startEdit = createAction(
  '[shopping list] Start Edit',
  props<{ index: number }>()
);

export const stopEdit = createAction('[shopping list] Stop Edit');


// export const ADD_INGREDIENT = '[shopping list] add ingredient';
// export const ADD_INGREDIENT_LIST = '[shopping list] add ingredient list';
// export const UPDATE_INGREDIENT = '[shopping list] update ingredient';
// export const DELETE_INGREDIENT = '[shopping list] delete ingredient';
// export const START_EDIT = '[shopping list] start edit';
// export const STOP_EDIT = '[shopping list] stop edit';
//
// export class AddIngredient implements Action {
//   readonly type = ADD_INGREDIENT;
//
//   constructor(public payload: Ingredient) {
//   }
// }
//
// export class AddIngredientList implements Action {
//   readonly type = ADD_INGREDIENT_LIST;
//
//   constructor(public payload: Ingredient[]) {
//   }
// }
//
// export class UpdateIngredient implements Action {
//   readonly type = UPDATE_INGREDIENT;
//
//   constructor(public payload: Ingredient) {
//   }
// }
//
// export class DeleteIngredient implements Action {
//   readonly type = DELETE_INGREDIENT;
// }
//
// export class StartEdit implements Action {
//   readonly type = START_EDIT;
//
//   /**
//    *
//    * @param payload the index of the shopping list item that one wants to edit.
//    */
//   constructor(public payload: number) {
//   }
// }
//
// export class StopEdit implements Action {
//   readonly type = STOP_EDIT;
// }
//
// export type ShoppingListActions = AddIngredient
//   | AddIngredientList
//   | UpdateIngredient
//   | DeleteIngredient
//   | StartEdit | StopEdit;


