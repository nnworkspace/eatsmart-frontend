import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import * as reduxApp from '../redux/app.reducer';
import * as AuthActions from './redux/auth.actions';

import {AuthService} from "./auth.service";
import {AlertComponent} from "../shared/alert/alert.component";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;

  private reduxSub: Subscription;

  constructor(private authService: AuthService, private router: Router,
              private dialog: MatDialog, private redux: Store<reduxApp.AppState>) {
  }

  ngOnInit() {
    this.reduxSub = this.redux.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      if (authState.authError) {
        this.showErrorAlert(authState.authError);
      }
    });
  }

  ngOnDestroy() {
    if (this.reduxSub) {
      this.reduxSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.isLoginMode) {
      //authObs = this.authService.login(email, password);
      this.redux.dispatch(new AuthActions.LoginStart({
          email: email,
          password: password
        })
      );
    } else {
      this.redux.dispatch(new AuthActions.SignupStart({
          email: email,
          password: password
        })
      );
    }

    this.redux.select('auth').subscribe();

    authForm.reset();
  }

  showErrorAlert(errorMsg: string) {
    if (errorMsg && errorMsg.trim() != '') {
      // show alert dialog
      const alertRef = this.dialog.open(AlertComponent, {
        data: {message: errorMsg}
      });

      alertRef.afterClosed().subscribe(input => {
        // NOTE: The result can also be nothing if the user presses
        // the `esc` key or clicks outside the dialog
        if (input === 'close') {
          console.log('user clicked close');
        }
      });
    }
  }
}
