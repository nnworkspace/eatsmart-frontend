import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as reduxApp from "../../redux/app.reducer";
import * as SlActions from "../redux/shopping-list.actions";

import {Ingredient} from "../../shared/ingredient.model";


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscriptionEdit: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<reduxApp.AppState>) {
  }

  ngOnInit() {
    this.subscriptionEdit = this.store.select('shoppingList').subscribe(stateData => {
      const idx = stateData.editIndex;

      if (idx > -1) {
        this.editMode = true;
        this.editedItem = stateData.ingredients[idx];

        // Form setup:
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
          unit: this.editedItem.amountUnit
        });

      } else {
        this.editMode = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionEdit.unsubscribe();
    this.store.dispatch(SlActions.stopEdit());
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount, value.unit);

    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(SlActions.updateIngredient({ingredient: newIngredient}));
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(SlActions.addIngredient({ingredient: newIngredient}));
    }

    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(SlActions.stopEdit());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(SlActions.deleteIngredient());
    this.onClear();
  }
}
