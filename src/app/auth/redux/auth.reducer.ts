import {User} from "../user.model";
import {ShoppingListState} from "../../shopping-list/redux/shopping-list.reducer";

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
}

export function authReducer(state: AuthState = initialState, action) {
  return state;
}
