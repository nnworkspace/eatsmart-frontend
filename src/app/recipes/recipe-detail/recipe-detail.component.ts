import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as reduxApp from '../../redux/app.reducer';
import * as RecipeActions from '../redux/recipe.actions';

import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private redux: Store<reduxApp.AppState>) {
  }

  ngOnInit() {
    this.route.params
      .pipe(
        // step 1: retrieve id from page params and forward it to the next step
        map(params => {
          return +params['id'];
        }),

        // step 2: turn the router observable into a redux store observable,
        // and assign the recipe id (which was forwarded from the last step to the
        // class variable to use in the next step.
        switchMap(id => {
          this.id = id;
          return this.redux.select('recipe');
        }),

        // step 3: use the outcome from last step (the recipeState from the redux store)
        // and the class variable to get the recipe observable.
        map(recipeState => {
          return recipeState.recipes.find((recipe, index) => {
            // returns a recipe whose index equals this.id.
            return index === this.id;
          });
        })
      )  // and then, subscribe to the observable which wraps a recipe
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }f

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});

    // the following works too
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route} );
  }

  onDeleteRecipe() {
    //this.recipeService.deleteRecipe(this.id);

    this.redux.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
