import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

import {AuthResponseFirebase, AuthService} from "./auth.service";
import {AlertComponent} from "../shared/alert/alert.component";
import {error} from "util";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  // error: string = null;

  constructor(private authService: AuthService, private router: Router,
    private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) { return; }

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthResponseFirebase>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMsg => {
        console.log(errorMsg);
        // this.error = errorMsg;
        this.showErrorAlert(errorMsg);
        this.isLoading = false;
      });

    authForm.reset();
  }

  showErrorAlert(errorMsg: string) {
    if (errorMsg && errorMsg.trim() != '') {
      // show alert dialog
      const alertRef = this.dialog.open(AlertComponent, {
        data: { message: errorMsg }
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

  // onHandleError() {
  //   this.error = null;
  // }
}
