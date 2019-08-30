import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {LoggingService} from "../logging.service";

import * as reduxApp from '../redux/app.reducer';
import * as SlActions from './redux/shopping-list.actions';

import {Ingredient} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private log: LoggingService,
    private store: Store<reduxApp.AppState>) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    this.log.printLog('hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(idx: number) {
    this.store.dispatch(SlActions.startEdit({index: idx}));
  }

  ngOnDestroy(): void {
  }

}
