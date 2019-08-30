import {createAction, props} from "@ngrx/store";

export const loginStart = createAction(
  '[auth] Login Start',
  props<{ email: string; password: string }>()
);

export const signupStart = createAction(
  '[auth] Signup Start',
  props<{ email: string; password: string }>()
);

export const authenticateSuccess = createAction(
  '[auth] authenticate Success',
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean
  }>()
);

export const authenticateFail = createAction(
  '[auth] authenticate Fail',
  props<{ errorMessage: string }>()
);

export const clearError = createAction('[auth] Clear Error');

export const autoLogin = createAction('[auth] Auto Login');

export const logout = createAction('[auth] Logout');


// export const SIGNUP_START = '[auth] signup start';
// export const LOGIN_START = '[auth] login start';
// export const AUTH_SUCCESS = '[auth] authenticate success';
// export const AUTH_FAIL = '[auth] authenticate fail';
// export const LOGOUT = '[auth] logout';
// export const CLEAR_ERROR = '[auth] clear error';
// export const AUTO_LOGIN = '[auth] auto login';
//
// export class SignupStart implements Action {
//   readonly type = SIGNUP_START;
//
//   constructor(public payload: { email: string; password: string }) {
//   }
// }
//
// export class AuthSuccess implements Action {
//   readonly type = AUTH_SUCCESS;
//
//   constructor(
//     public payload: {
//       email: string;
//       userId: string;
//       token: string;
//       expirationDate: Date;
//       redirect: boolean;
//     }
//   ) {
//   }
// }
//
// export class Logout implements Action {
//   readonly type = LOGOUT;
// }
//
// export class LoginStart implements Action {
//   readonly type = LOGIN_START;
//
//   constructor(public payload: { email: string; password: string }) {
//   }
// }
//
// export class AuthFail implements Action {
//   readonly type = AUTH_FAIL;
//
//   constructor(public payload: string) {
//   }
// }
//
// export class ClearError implements Action {
//   readonly type = CLEAR_ERROR;
// }
//
// export class AutoLogin implements Action {
//   readonly type = AUTO_LOGIN;
// }
//
// export type AuthActions =
//   SignupStart
//   | AuthSuccess
//   | Logout
//   | LoginStart
//   | AuthFail
//   | ClearError
//   | AutoLogin;
