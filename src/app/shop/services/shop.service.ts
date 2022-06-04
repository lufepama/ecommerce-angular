import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private productsUrl = 'http://localhost:8000/api/product/get-products/'
  shopingCartArray: Product[] = []
  private productList = new Subject<Product[]>()
  private shoppingCart = new BehaviorSubject([])

  constructor(
    private http: HttpClient,
    private CartLocalStorage: LocalstorageService
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.productsUrl)
  }

  getProductsList() {
    return this.productList.asObservable()
  }

  updateProductList(newList: any): void {
    this.productList.next(newList.success)
  }

  addProductShoppingCart(product: Product): void {

    const isProductInList = this.shopingCartArray.includes(product)

    if (!isProductInList) {
      this.shopingCartArray.push(product)
      const shopingCartArrayString = JSON.stringify(this.shopingCartArray)
      this.CartLocalStorage.updateCartListLocalStorage(shopingCartArrayString)
      this.updateShopingCart(this.shopingCartArray)
    }
  }

  updateShopingCart(newCartList: any): void {
    this.shoppingCart.next(newCartList)
  }

  getCurrentShopingCart() {
    return this.shoppingCart.asObservable()
  }

}
