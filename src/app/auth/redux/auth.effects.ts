import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {of} from "rxjs";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

import * as AuthActions from './auth.actions';

export interface AuthResponseFirebase {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string
}

const handleAuthSuccess = (email: string, userId: string, token: string, expiresIn: number) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

  return new AuthActions.AuthSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate
  });
};

const handleAuthError = (errorRes: any) => {
  // ... error handling code
  let errorMsg = 'An unknown error occurred!';

  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthFail(errorMsg));
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
  return of(new AuthActions.AuthFail(errorMsg));
};

@Injectable()
export class AuthEffects {
  private param = {'key': environment.keyFirebase};

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),

    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseFirebase>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
        {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true
        },
        {
          params: this.param
        }
      ).pipe(
        map(resData => {
          return handleAuthSuccess(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }),

        catchError(errorRes => {
          return handleAuthError(errorRes);
        })
      );
    })
  );

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
          return handleAuthSuccess(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }),

        catchError(errorRes => {
          return handleAuthError(errorRes);
        })
      );
    }),
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS, AuthActions.LOGOUT),

    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {
  }
}
