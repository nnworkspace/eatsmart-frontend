import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as reduxApp from '../redux/app.reducer';
import * as AuthActions from '../auth/redux/auth.actions';

import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dsService: DataStorageService,
    private authService: AuthService,
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
    this.dsService.storeRecipes();
  }

  onFetchData() {
    this.dsService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.redux.dispatch(new AuthActions.Logout());
  }
}
