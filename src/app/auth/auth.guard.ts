import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {map, take} from "rxjs/operators";

import {AuthService} from "./auth.service";
import {Store} from "@ngrx/store";
import * as reduxApp from "../redux/app.reducer";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private redux: Store<reduxApp.AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.redux.select('auth').pipe(
      take(1),

      map(authState => {
        return authState.user;
      }),

      map(user => {
        const isAuth = !!user;

        if (isAuth) {
          return true;
        }

        return this.router.createUrlTree(['/auth']);
      }));
  }

}
