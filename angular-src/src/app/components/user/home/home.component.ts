import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import * as globs from '../../../global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  BaseURL = globs.g.server;

  products: Object[];
  page: Number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {

    this.productService.getAll(this.page).subscribe(data => {
      console.log(data);
      if (data['status']) {
        this.products = data['data'];
        console.log(this.products);
      } else {

      }
    });

  }

  buy(product) {
    console.log(product);
    // add this product to cart and navigate to checkout
    this.cartService.addToCart(product);
    this.router.navigate(['/checkout']);
  }

  addToCart(product) {
    // add this product to cart and navigate to cart
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }

}
