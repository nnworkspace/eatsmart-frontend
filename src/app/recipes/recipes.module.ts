import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

import {SharedModule} from "../shared/shared.module";

import {RecipesRoutingModule} from "./recipes-routing.module";

import {RecipesComponent} from "./recipes.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeHomeComponent} from "./recipe-home/recipe-home.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeHomeComponent,
    RecipeEditComponent,
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    RecipesRoutingModule
  ],
  exports: [],
  providers: []
})
export class RecipesModule {

}
