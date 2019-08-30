import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as reduxApp from '../redux/app.reducer';
import * as AuthActions from '../auth/redux/auth.actions';
import * as RecipeActions from '../recipes/redux/recipe.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private redux: Store<reduxApp.AppState>) {
  }

  ngOnInit() {
    this.userSub = this.redux.select('auth').pipe(
      map(authState => authState.user)
    )
    .subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.redux.dispatch(RecipeActions.storeRecipes());
  }

  onFetchData() {
    this.redux.dispatch(RecipeActions.fetchRecipes());
  }

  onLogout() {
    this.redux.dispatch(AuthActions.logout());
  }
}
