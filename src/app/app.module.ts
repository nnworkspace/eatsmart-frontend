import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import * as reduxApp from "./redux/app.reducer";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";

import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {AppRoutingModule} from "./app-routing.module";
import {AuthEffects} from "./auth/redux/auth.effects";

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
    EffectsModule.forRoot([AuthEffects]),
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
