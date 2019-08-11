import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log('editMode: ' + this.editMode);
        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  private initForm() {
    let recipeName = '';
    let recipeUrl = '';
    let desc = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeUrl = recipe.imageUrl;
      desc = recipe.description;
      if (recipe['ingredients']) {
        for (let ingre of recipe.ingredients) {
          ingredients.push(new FormGroup({
            'ingreName': new FormControl(ingre.name),
            'ingreAmount': new FormControl(ingre.amount),
            'ingreUnit': new FormControl(ingre.amountUnit)
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imageUrl': new FormControl(recipeUrl),
      'description': new FormControl(desc),
      'ingredients': ingredients
      }
    );
  }

  get ingredientCtrl() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
