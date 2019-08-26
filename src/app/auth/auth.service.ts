import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

import * as reduxApp from '../redux/app.reducer';
import * as AuthActions from './redux/auth.actions';

import {User} from "./user.model";
import {Store} from "@ngrx/store";

@Injectable({providedIn: 'root'})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private redux: Store<reduxApp.AppState>) {
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token,
      new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      //this.user.next(loadedUser);

      this.redux.dispatch(new AuthActions.AuthSuccess({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }));

      const expirationDuration = new Date(userData._tokenExpirationDate).getTime()
        - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    // this.user.next(null);
    this.redux.dispatch(new AuthActions.Logout());

    // clear ...
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout((this.tokenExpirationTimer));
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

}
