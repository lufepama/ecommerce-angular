import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  updateCartListLocalStorage(newCartList: string): void {
    localStorage.setItem('cart', newCartList)
  }

  deleteCartListLocalStorage(): void {
    localStorage.removeItem('cart')
  }

}
