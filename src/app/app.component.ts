import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

import {Store} from "@ngrx/store";
import * as reduxApp from "./redux/app.reducer";

import * as AuthActions from './auth/redux/auth.actions';
import {LoggingService} from "./logging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private redux: Store<reduxApp.AppState>,
    private log: LoggingService,
    @Inject(PLATFORM_ID) private platformId) {
  }

  ngOnInit() {
    // browser functions, won't work with server-side rendering.
    if (isPlatformBrowser(this.platformId)) {
      this.redux.dispatch(AuthActions.autoLogin());
    }

    this.log.printLog('hello from AppComponent ngOnInit');
  }
}
