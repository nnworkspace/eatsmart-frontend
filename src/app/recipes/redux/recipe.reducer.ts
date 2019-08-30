import {Action, createReducer, on} from "@ngrx/store";
import * as RcpActions from "./recipe.actions";

import {Recipe} from "../recipe.model";

export interface RecipeState {
  recipes: Recipe[];
}

const initState: RecipeState = {
  recipes: [
    // private recipes: Recipe[] = [
    //   new Recipe('Shrimps and Tea Leaves',
    //     'Delicious shrimps and tea leaves',
    //     'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
    //     [
    //       new Ingredient('shrimp', 200, 'g'),
    //       new Ingredient('tea leaves', 50, 'g')
    //     ]),
    //   new Recipe('Crabs and Shrimps',
    //     'This is crabs and shrimps',
    //     'https://upload.wikimedia.org/wikipedia/commons/5/53/Korean_seafood-Ganjang_gejang-01.jpg',
    //     [
    //       new Ingredient('crabs', 500, 'g'),
    //       new Ingredient('soya sauce', 50, 'ml'),
    //       new Ingredient('ginger', 50, 'g')
    //     ])
    // ];
  ]
};

export function recipeReducer(recipeState: RecipeState | undefined, recipeAction: Action) {
  return createReducer(
    initState,

    on(RcpActions.addRecipe, (state, action) => ({
      ...state,
      recipes: state.recipes.concat({...action.recipe})
    })),

    on(RcpActions.updateRecipe, (state, action) => ({
      ...state,
      recipes: state.recipes.map((recipe, index) => 
          index === action.index ? {...action.recipe} : recipe
      )
    })),

    on(RcpActions.deleteRecipe, (state, action) => ({
      ...state,
      recipes: state.recipes.filter((recipe, index) => index !== action.index)
    })),

    on(RcpActions.setRecipes, (state, action) => ({
      ...state,
      recipes: [...action.recipes]
    }))
  )(recipeState, recipeAction);
}

// export function recipeReducer(
//   state: RecipeState = initState,
//   action: RcpActions.RecipeActions) {
//
//   switch (action.type) {
//
//     case RcpActions.SET_RECIPES:
//       return {
//         ...state,
//         recipes: [...action.payload]
//       };
//
//     case RcpActions.ADD_RECIPE:
//       return {
//         ...state,
//         recipes: [...state.recipes, action.payload]
//       };
//
//     case RcpActions.UPDATE_RECIPE:
//       const updatedRecipe = {
//         // unwrap all the properties in the old recipe
//         ...state.recipes[action.payload.index],
//         // overwrite the values with property values of the new recipe
//         ...action.payload.newRecipe
//       };
//
//       const recipeArrayCopy = [...state.recipes];
//       recipeArrayCopy[action.payload.index] = updatedRecipe;
//
//       return {
//         ...state,
//         recipes: recipeArrayCopy
//       };
//
//     case RcpActions.DELETE_RECIPE:
//       return {
//         ...state, // copy the old state first, then add own attributes
//
//         // all recipes, whose index are not equal to the given index in the payload
//         // are to be copied over to the recipes array. Hence this filter.
//         recipes: state.recipes.filter((rcp, rcpIndex) => {
//           return rcpIndex !== action.payload;
//         })
//       };
//
//     default:
//       return state;
//   }
// }
