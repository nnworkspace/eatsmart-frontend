import {Recipe} from "../recipe.model";
import * as RcpActions from "./recipe.actions";

export interface RecipeState {
  recipes: Recipe[];
}

const initState: RecipeState = {
  recipes: new Array<Recipe>()
};

export function recipeReducer(
  state: RecipeState = initState,
  action: RcpActions.RecipeActions) {

  switch (action.type) {

    case RcpActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    case RcpActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case RcpActions.UPDATE_RECIPE:
      const updatedRecipe = {
        // unwrap all the properties in the old recipe
        ...state.recipes[action.payload.index],
        // overwrite the values with property values of the new recipe
        ...action.payload.newRecipe
      };

      const recipeArrayCopy = [...state.recipes];
      recipeArrayCopy[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: recipeArrayCopy
      };

    case RcpActions.DELETE_RECIPE:
      return {
        ...state, // copy the old state first, then add own attributes

        // all recipes, whose index are not equal to the given index in the payload
        // are to be copied over to the recipes array. Hence this filter.
        recipes: state.recipes.filter((rcp, rcpIndex) => {
          return rcpIndex !== action.payload;
        })
      };

    default:
      return state;
  }
}
