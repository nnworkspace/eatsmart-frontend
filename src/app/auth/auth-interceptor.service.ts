import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, map, take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as reduxApp from '../redux/app.reducer';

import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(
    private authService: AuthService,
    private redux: Store<reduxApp.AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.redux.select('auth').pipe(
      take(1),

      map(authState => {
        return authState.user;
      }),

      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });

        return next.handle(modifiedReq);
      })

    );
  }

}
