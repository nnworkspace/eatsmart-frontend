import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";

import {SharedModule} from "../shared/shared.module";

import {ShoppingListRoutingModule} from "./shopping-list-routing.module";

import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";


@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports:[
    SharedModule,
    HttpClientModule,
    ShoppingListRoutingModule
  ]
})
export class ShoppingListModule {

}
