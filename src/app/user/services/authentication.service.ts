import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserloginInterface } from '../interfaces/loginuser';
import { SignUpInterface } from '../interfaces/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loginUrl = 'http://localhost:8000/api/user/login/'
  private signUpUrl = 'http://localhost:8000/api/user/signup/'


  private currentAccessToken: any = localStorage.getItem('token')

  private userAccessToken = new BehaviorSubject<string>(this.currentAccessToken)
  private signUpMessage = new BehaviorSubject<string>('')

  constructor(
    private http: HttpClient,
  ) { }

  getUserAccessToken(): Observable<string> {
    return this.userAccessToken.asObservable()
  }

  login(userData: UserloginInterface): Observable<any> {
    return this.http.post<any>(this.loginUrl, userData)
  }

  logout(): void {
    this.userAccessToken.next('')
    this.deleteTokenLocalStorage()
  }

  signup(userData: SignUpInterface): Observable<any> {
    return this.http.post<any>(this.signUpUrl, userData)
  }

  updateUserAccessToken(token: string): void {
    this.userAccessToken.next(token)
    this.addTokenLocalStorage(token)
  }

  updateSignUpMessage(message: string): void {
    this.signUpMessage.next(message)
  }

  getSignUnMessage(): Observable<string> {
    return this.signUpMessage.asObservable()
  }

  //LocalStorage
  addTokenLocalStorage(token: string): void {
    localStorage.setItem('token', token)
  }
  deleteTokenLocalStorage(): void {
    localStorage.removeItem('token')
  }

}
