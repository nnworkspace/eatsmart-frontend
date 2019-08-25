import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {of, throwError} from "rxjs";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

import * as AuthActions from './auth.actions';
import {error} from "util";

export interface AuthResponseFirebase {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string
}

@Injectable()
export class AuthEffects {
  private param = {'key': environment.keyFirebase};

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),

    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseFirebase>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        },
        {
          params: this.param
        }
      ).pipe(
        map(resData => {
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);

          return new AuthActions.Login({
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate: expirationDate
          });
        }),

        catchError(errorRes => {
          // ... error handling code
          let errorMsg = 'An unknown error occurred!';

          if (!errorRes.error || !errorRes.error.error) {
            return of(new AuthActions.LoginFail(errorMsg));
          }

          switch (errorRes.error.error.message) {
            // error cases from sign up:
            case 'EMAIL_EXISTS':
              errorMsg = 'This email exists already!';
              break;
            case 'OPERATION_NOT_ALLOWED':
              errorMsg = 'Operation not allowed!';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              errorMsg = 'Too many attempts, try later!';
              break;
            // error cases from login
            case 'EMAIL_NOT_FOUND':
              errorMsg = 'Cannot find account with this email!';
              break;
            case 'INVALID_PASSWORD':
              errorMsg = 'Invalid password!';
              break;
            case 'USER_DISABLED':
              errorMsg = 'User disabled!';
              break;
          }

          // then have to return a none-error observable
          return of(new AuthActions.LoginFail(errorMsg));
        })
      );
    }),
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),

    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {
  }
}
