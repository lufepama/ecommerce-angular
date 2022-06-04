import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(

  ) { }

  canActivate() {

    const tokenAccess = localStorage.getItem('token')

    if (tokenAccess) { return true }
    return false
  }

}
