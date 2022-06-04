import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInformationInterface } from '../interfaces/userinformation';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  private userInformation = new BehaviorSubject<UserInformationInterface>({ email: '', username: '' })

  constructor(
  ) { }

  updateUserInformation(userData: UserInformationInterface): void {
    this.userInformation.next(userData)
  }

  getUserInformation(): Observable<UserInformationInterface> {
    return this.userInformation.asObservable()
  }

}
