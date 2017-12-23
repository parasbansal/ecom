import { Component, OnInit } from '@angular/core';

import { CartService } from '../../../services/cart.service';
import * as globs from '../../../global';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  BaseURL = globs.g.server;

  products: Object[];

  totalQuantity: any = 0;
  totalPrice: any = 0;

  constructor(
    private cartService: CartService
  ) {

    if (this.cartService.cart !== null) {

      this.products = this.cartService.cart;

      for (const product of this.products) {
        this.totalQuantity += product['quantity'];
        this.totalPrice += product['price'] * product['quantity'];
      }
    }

  }

  ngOnInit() {
  }

}
