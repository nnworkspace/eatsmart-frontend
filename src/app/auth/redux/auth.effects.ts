import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {of} from "rxjs";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";

import * as AuthActions from './auth.actions';
import {User} from "../user.model";
import {AuthService} from "../auth.service";

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
  const user = new User(email, userId, token, expirationDate);

  // save the user data to localStorage for the auto login feature.
  localStorage.setItem('userData', JSON.stringify(user));

  return AuthActions.authenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: true
  });
};

const handleAuthError = (errorRes: any) => {
  // ... error handling code
  let errorMsg = 'An unknown error occurred!';

  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticateFail({errorMessage: errorMsg}));
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
  return of(AuthActions.authenticateFail({errorMessage: errorMsg}));
};

@Injectable()
export class AuthEffects {
  private param = {'key': environment.keyFirebase};

  authSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),

      switchMap(signupAction => {
        return this.http.post<AuthResponseFirebase>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
          {
            email: signupAction.email,
            password: signupAction.password,
            returnSecureToken: true
          },
          {
            params: this.param
          }
        ).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),

          map(resData => {
            return handleAuthSuccess(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          }),

          catchError(errorRes => {
            return handleAuthError(errorRes);
          })
        );
      })
    ));

  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginStart),

      switchMap(loginAction => {
        return this.http.post<AuthResponseFirebase>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
          {
            email: loginAction.email,
            password: loginAction.password,
            returnSecureToken: true
          },
          {
            params: this.param
          }
        ).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),

          map(resData => {
            return handleAuthSuccess(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
          }),

          catchError(errorRes => {
            return handleAuthError(errorRes);
          })
        );
      }),
    ));

  authRedirect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSuccess),

        tap(authSuccessAction => {
          authSuccessAction.redirect && this.router.navigate(['/']);
        })
      ),
    {dispatch: false}
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),

      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return {type: 'DUMMY'};
        }

        const loadedUser = new User(userData.email, userData.id, userData._token,
          new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
          //this.user.next(loadedUser);
          const expirationDuration = new Date(userData._tokenExpirationDate).getTime()
            - new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);

          return AuthActions.authenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false
          });

          // const expirationDuration = new Date(userData._tokenExpirationDate).getTime()
          //   - new Date().getTime();
          // this.autoLogout(expirationDuration);
        }

        return {type: 'DUMMY'};
      })
    ));

  authLogout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),

        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    {dispatch: false}
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router,
              private authService: AuthService) {
  }
}
