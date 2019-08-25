import {User} from "../user.model";
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
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
        user: user
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
