import {User} from "../user.model";
import * as AuthActions from './auth.actions';

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

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions.AuthActions
) {
  console.log(state);

  switch (action.type) {
    case AuthActions.LOGIN:
      const p = action.payload;
      const user = new User(p.email, p.userId, p.token, p.expirationDate);

      return {
        ...state,
        authError: null,
        user: user,
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
