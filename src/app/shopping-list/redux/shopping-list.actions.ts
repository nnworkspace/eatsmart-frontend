import {Action} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENT_LIST = 'ADD_INGREDIENT_LIST';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class AddIngredientList implements Action {
  readonly type = ADD_INGREDIENT_LIST;

  constructor(public payload: Ingredient[]) {
  }
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  /**
   *
   * @param payload the index of the shopping list item that one wants to edit.
   */
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions = AddIngredient
  | AddIngredientList
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit | StopEdit;


