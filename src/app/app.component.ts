import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ShopService } from './shop/services/shop.service';
import { Product } from './shop/interfaces/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

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
