import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpInterface } from '../user/interfaces/signup';
import { AuthenticationService } from '../user/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('username', { static: true }) usernameElement: ElementRef;
  @ViewChild('email', { static: true }) emailElement: ElementRef;
  @ViewChild('password', { static: true }) passwordElement: ElementRef;
  @ViewChild('confirmpassword', { static: true }) confirmPasswordElement: ElementRef;

  usernameField: string = ''
  emailField: string = ''
  passwordField: string = ''
  confirmPasswordField: string = ''

  signUpMessage$: Observable<string>

  constructor(
    private AuthSvc: AuthenticationService,
    emailElement: ElementRef,
    passwordElement: ElementRef,
    confirmPasswordElement: ElementRef,
    usernameElement: ElementRef
  ) {
    this.emailElement = emailElement,
      this.passwordElement = passwordElement
    this.confirmPasswordElement = confirmPasswordElement,
      this.usernameElement = usernameElement,
      this.signUpMessage$ = this.AuthSvc.getSignUnMessage()
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.emailField = this.emailElement.nativeElement.value
    this.passwordField = this.passwordElement.nativeElement.value
    this.confirmPasswordField = this.confirmPasswordElement.nativeElement.value
    this.usernameField = this.usernameElement.nativeElement.value
    if (this.passwordField === this.confirmPasswordField) {
      const userData = { 'username': this.usernameField, 'email': this.emailField, 'password': this.passwordField }
      this.onSignUp(userData)
    }

  }

  onSignUp(userData: SignUpInterface): void {
    const response = this.AuthSvc.signup(userData)
    response.subscribe(res => {
      if (res.success) {
        this.AuthSvc.updateSignUpMessage(res.success)
      }
    })
  }

}
