import {Action} from "@ngrx/store";

export const LOGIN_START = '[auth] login start';
export const LOGIN = '[auth] login';
export const LOGIN_FAIL = '[auth] login fail';
export const LOGOUT = '[auth] logout';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {

  }
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {

  }
}

export type AuthActions = Login | Logout | LoginStart | LoginFail;
