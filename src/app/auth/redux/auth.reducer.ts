import {Action, createReducer, on} from "@ngrx/store";
import * as AuthActions from './auth.actions';

import {User} from "../user.model";

export interface AuthState {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
}

export function authReducer(authState: AuthState | undefined, authAction: Action) {

  return createReducer(
    initialState,

    on(AuthActions.loginStart, AuthActions.signupStart, state => ({
      ...state,
      authError: null,
      loading: true
    })),

    on(AuthActions.authenticateSuccess, (state, action) => ({
      ...state,
      user: new User(action.email, action.userId, action.token, action.expirationDate),
      authError: null,
      loading: false
    })),

    on(AuthActions.authenticateFail, (state, action) => ({
      ...state,
      user: null,
      authError: action.errorMessage,
      loading: false
    })),

    on(AuthActions.logout, state => ({...state, user: null})),

    on(AuthActions.clearError, state => ({...state, authError: null})),

  )(authState, authAction);
}

// export function authReducer(
//   state: AuthState = initialState,
//   action: AuthActions.AuthActions
// ) {
//   console.log(state);
//
//   switch (action.type) {
//     case AuthActions.AUTH_SUCCESS:
//       const p = action.payload;
//       const user = new User(p.email, p.userId, p.token, p.expirationDate);
//
//       return {
//         ...state,
//         authError: null,
//         user: user,
//         loading: false
//       };
//     case AuthActions.LOGOUT:
//       return {
//         ...state,
//         user: null
//       };
//     case AuthActions.LOGIN_START:
//     case AuthActions.SIGNUP_START:
//       return {
//         ...state,
//         authError: null,
//         loading: true
//       };
//     case AuthActions.AUTH_FAIL:
//       return {
//         ...state,
//         user: null,
//         authError: action.payload,
//         loading: false
//       };
//     case AuthActions.CLEAR_ERROR:
//       return {
//         ...state,
//         authError: null
//       };
//     default:
//       return state;
//   }
// }
