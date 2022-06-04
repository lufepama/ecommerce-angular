import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../user/services/authentication.service';
import { Router } from '@angular/router';
import { UserInformationService } from '../user/services/user-information.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('username', { static: true }) usernameElement: ElementRef;
  @ViewChild('password', { static: true }) passwordElement: ElementRef;

  usernameField: string = ''
  passwordField: string = ''

  constructor(
    emailElement: ElementRef,
    passwordElement: ElementRef,
    private AuthSvc: AuthenticationService,
    private router: Router,
    private UserInfoSvc: UserInformationService
  ) {
    this.usernameElement = emailElement,
      this.passwordElement = passwordElement
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.usernameField = this.usernameElement.nativeElement.value
    this.passwordField = this.passwordElement.nativeElement.value

    if (this.usernameField && this.passwordField) {
      const userData = { "username": this.usernameField, "password": this.passwordField }
      const response = this.AuthSvc.login(userData)
      response.subscribe(data => {
        if (data.success) {
          console.log('token', data)
          this.AuthSvc.updateUserAccessToken(data.token)
          this.UserInfoSvc.updateUserInformation({ 'username': data.username, email: data.email })
          this.router.navigate(['/'])
        }
      })
    }

    this.passwordElement.nativeElement.value = ''
    this.usernameElement.nativeElement.value = ''
  }

}
