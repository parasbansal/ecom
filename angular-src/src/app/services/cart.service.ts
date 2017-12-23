import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  cart: Object[];

  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    console.log('cart: ', this.cart);
  }

  addToCart(product) {

    if (this.cart == null) {
      this.cart = [];
      product.quantity = 1;
      this.cart.push(product);
    } else {
      // is product already in cart?
      const productIndex = this.isProductInCart(product);
      if (productIndex === -1) {
        product.quantity = 1;
        this.cart.push(product);
      } else {
        console.log(this.cart[productIndex]['quantity'], product.stock, this.cart[productIndex]['quantity'] < product.stock);
        if (this.cart[productIndex]['quantity'] < product.stock) {
          console.log('q:' + this.cart[productIndex]['quantity']);
          this.cart[productIndex]['quantity']++;
        }
      }
    }

    this.saveCart();
    console.log('Added product to cart: ', this.cart);
  }

  removeFromCart(product) {

    const productIndex = this.cart.indexOf(product);
    if (productIndex > -1) {
      this.cart.splice(productIndex, 1);
    }

    this.saveCart();

    console.log('Removed from cart: ', this.cart);

  }

  emptyCart() {
    this.cart = null;
    localStorage.setItem('cart', null);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private isProductInCart(product) {
    return this.cart.findIndex(x => {
      return x['_id'] === product._id;
    });
  }

}
