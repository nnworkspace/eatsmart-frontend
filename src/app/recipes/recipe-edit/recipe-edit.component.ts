import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe.service";
import {Ingredient} from "../../shared/ingredient.model";

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
              private recipeService: RecipeService) {
  }

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
    // const editedRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imageUrl'],
    //   this.recipeForm.value['ingredients']);

    console.log('this.recipeForm.value[ingredients]: ' + this.recipeForm.value['ingredients']);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
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
          ingredients.push(this.buildFormGroupIngredients(ingre));
        }
      }
    }

    this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'imageUrl': new FormControl(recipeUrl, Validators.required),
        'description': new FormControl(desc, Validators.required),
        'ingredients': ingredients
      }
    );
  }

  get ingredientCtrl() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.buildFormGroupIngredients(null));
  }

  private buildFormGroupIngredients(ingre: Ingredient): FormGroup {
    return new FormGroup({
      'name': new FormControl(ingre ? ingre.name : null, Validators.required),
      'amount': new FormControl(ingre ? ingre.amount : null,
        [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'amountUnit': new FormControl(ingre ? ingre.amountUnit : null, Validators.required)
    })
  }
}
