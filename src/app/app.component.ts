import {Component, OnInit} from '@angular/core';
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
  constructor(private redux: Store<reduxApp.AppState>, private log: LoggingService) {
  }

  ngOnInit() {
    this.redux.dispatch(AuthActions.autoLogin());

    this.log.printLog('hello from AppComponent ngOnInit');
  }
}
