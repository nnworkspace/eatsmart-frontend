import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {environment} from "../../environments/environment";

interface AuthResponseFirebase {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  signup(email: string, password: string) {
    const param = {'key' : environment.keyFirebase}
    return this.http.post<AuthResponseFirebase>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      {
        email: email,
        password: password,
        returnSecureToken: true
      },
      {
        params: param
      })
      .pipe(catchError(errorRes => {
        // console.log(errorRes);
        let errorMsg = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMsg);
        }

        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMsg = 'This email exists already!';
          case 'OPERATION_NOT_ALLOWED':
            errorMsg = 'Operation not allowed!';
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMsg = 'Too many attempts, try later!';
        }

        return throwError(errorMsg);
      }));
  }
}
