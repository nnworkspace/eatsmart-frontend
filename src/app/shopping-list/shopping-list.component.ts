import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {LoggingService} from "../logging.service";

import * as fromShoppingList from './store/shopping-list.reducer';
import * as SlActions from './store/shopping-list.actions';

import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  //private ingrChangeSub: Subscription;

  constructor(
    private slService: ShoppingListService,
    private log: LoggingService,
    private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');

    // this.ingredients = this.slService.getIngredients();
    // this.ingrChangeSub = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );

    this.log.printLog('hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(idx: number) {
    // this.slService.startedEditing.next(idx);
    this.store.dispatch(new SlActions.StartEdit(idx));
  }

  ngOnDestroy(): void {
    // this.ingrChangeSub.unsubscribe();
  }

}
