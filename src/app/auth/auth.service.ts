import {Injectable} from "@angular/core";

import * as reduxApp from '../redux/app.reducer';
import * as AuthActions from './redux/auth.actions';

import {Store} from "@ngrx/store";

@Injectable({providedIn: 'root'})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private redux: Store<reduxApp.AppState>) {
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.redux.dispatch(AuthActions.logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if( this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
