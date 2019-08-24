import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import * as reduxApp from "./redux/app.reducer";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";

import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reduxApp.appReducer),
    BrowserAnimationsModule,
    SharedModule,
    CoreModule
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
