import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "./user.model";

export interface AuthResponseFirebase {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new Subject<User>();

  private param = {'key': environment.keyFirebase};

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {

    return this.http.post<AuthResponseFirebase>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      {
        email: email,
        password: password,
        returnSecureToken: true
      },
      {
        params: this.param
      })
    .pipe(catchError(this.handleError), tap(this.handleAuthentication));
  }

  login(email: string, password: string) {

    return this.http.post<AuthResponseFirebase>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      {
        email: email,
        password: password,
        returnSecureToken: true
      },
      {
        params: this.param
      })
    .pipe(catchError(this.handleError), tap(this.handleAuthentication));
  }

  private handleAuthentication(resData: AuthResponseFirebase) {
    const user = new User(resData.email, resData.localId, resData.idToken,
      this.calcExpirationDate(resData));
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    // console.log(errorRes);
    let errorMsg = 'An unknown error occurred!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
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

    return throwError(errorMsg);
  }

  private calcExpirationDate(resData: AuthResponseFirebase): Date {
    return new Date(new Date().getTime() + +resData.expiresIn * 1000);
  }
}
