import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesResolverService} from "./recipes/recipes-resolver.service";

import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeHomeComponent} from "./recipes/recipe-home/recipe-home.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
      {path: '', component: RecipeHomeComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
    ]},
  {path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule {

}
