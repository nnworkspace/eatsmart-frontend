import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingrChangeSub: Subscription;

  constructor(private slService: ShoppingListService, private log: LoggingService) {
  }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.ingrChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    this.log.printLog('hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    this.ingrChangeSub.unsubscribe();
  }

  onEditItem(idx: number) {
    this.slService.startedEditing.next(idx);
  }
}
