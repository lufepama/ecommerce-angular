import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: any

  constructor(
    private ShopSvc: ShopService
  ) { }

  ngOnInit(): void {
  }

  onAddToCart(product: Product): void {
    this.ShopSvc.addProductShoppingCart(product)
  }

}
