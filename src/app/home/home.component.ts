import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ShopService } from '../shop/services/shop.service';
import { Product } from '../shop/interfaces/product';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {


  productsList$: Observable<Product[]>

  constructor(
    private ShopSvc: ShopService
  ) {
    this.productsList$ = ShopSvc.getProductsList()
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.ShopSvc.getProducts()
      .subscribe(data => this.ShopSvc.updateProductList(data))
  }

  ngOnDestroy(): void {

  }

}
