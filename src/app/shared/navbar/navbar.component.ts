import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shop/interfaces/product';
import { ShopService } from 'src/app/shop/services/shop.service';
import { UserInformationInterface } from 'src/app/user/interfaces/userinformation';
import { AuthenticationService } from 'src/app/user/services/authentication.service';
import { UserInformationService } from 'src/app/user/services/user-information.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  shoppingCart$: Observable<Product[]>
  authToken$: Observable<string>
  userInformation$: Observable<UserInformationInterface>

  constructor(
    private ShopSvc: ShopService,
    private AuthSvc: AuthenticationService,
    private UserInfoSvc: UserInformationService
  ) {
    this.shoppingCart$ = this.ShopSvc.getCurrentShopingCart()
    this.authToken$ = this.AuthSvc.getUserAccessToken()
    this.userInformation$ = this.UserInfoSvc.getUserInformation()
  }

  ngOnInit(): void {
  }

}
