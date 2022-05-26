import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private productsUrl = 'http://localhost:8000/api/product/get-products/'

  private productList = new Subject<Product[]>()

  constructor(
    private http: HttpClient
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

}
