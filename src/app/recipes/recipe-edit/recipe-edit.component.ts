import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as reduxApp from '../../redux/app.reducer';
import * as RecipeActions from '../redux/recipe.actions';

import {Ingredient} from "../../shared/ingredient.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  private reduxSub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private redux: Store<reduxApp.AppState>) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;

        console.log('editMode: ' + this.editMode);

        this.initForm();
      }
    );
  }

  ngOnDestroy(): void {
    if(this.reduxSub) {
      this.reduxSub.unsubscribe();
    }
  }

  onSubmit() {
    if (this.editMode) {
      //this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.redux.dispatch(new RecipeActions.UpdateRecipe({
        index: this.id,
        newRecipe: this.recipeForm.value
      }));
    } else {
      //this.recipeService.addRecipe(this.recipeForm.value);
      this.redux.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }

    // done, simply navigate away
    this.onCancel();
  }

  private initForm() {
    let recipeName = '';
    let recipeUrl = '';
    let desc = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      this.reduxSub = this.redux.select('recipe')
        .pipe(
          // get the recipe observable.
          map(recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              // returns a recipe whose index equals this.id.
              return index === this.id;
            });
          })
        )  // then subscribe to the observable which wraps a recipe.
        .subscribe(recipe => {
            recipeName = recipe.name;
            recipeUrl = recipe.imageUrl;
            desc = recipe.description;
            if (recipe['ingredients']) {
              for (let ingre of recipe.ingredients) {
                ingredients.push(this.buildFormGroupIngredients(ingre));
              }
            }
          }
        );
    }

    this.recipeForm = new FormGroup({
        name: new FormControl(recipeName, Validators.required),
        imageUrl: new FormControl(recipeUrl, Validators.required),
        description: new FormControl(desc, Validators.required),
        ingredients: ingredients
      }
    );
  }

  get ingredientCtrl() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.buildFormGroupIngredients(null));
  }

  onDeleteIngredient(idx: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(idx);
  }

  private buildFormGroupIngredients(ingre: Ingredient): FormGroup {
    return new FormGroup({
      'name': new FormControl(ingre ? ingre.name : null, Validators.required),
      'amount': new FormControl(ingre ? ingre.amount : null,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'amountUnit': new FormControl(ingre ? ingre.amountUnit : null, Validators.required)
    })
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
