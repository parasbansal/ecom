import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import * as globs from '../../../global';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  BaseURL = globs.g.server;

  geolocationPosition: any;

  cartProducts: Object[];
  totalQuantity: any = 0;
  totalPrice: any = 0;

  personalDetailsForm: FormGroup;
  addressForm: FormGroup;
  paymentForm: FormGroup;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    if (this.cartService.cart !== null) {
      this.cartProducts = this.cartService.cart;
      for (const product of this.cartProducts) {
        this.totalQuantity += product['quantity'];
        this.totalPrice += product['price'] * product['quantity'];
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.personalDetailsForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^[a-zA-Z ]{2,30}$/)]
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email, Validators.maxLength(200)]
      }),
      phone: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^[0-9]{10}$/)]
      })
    }, { updateOn: 'change' });

    this.addressForm = new FormGroup({
      address: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(50)]
      }),
      pincode: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^[0-9]{6}$/)]
      }),
      city: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(50)]
      }),
      state: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(50)]
      })
    }, { updateOn: 'submit' });

    this.paymentForm = new FormGroup({
      paymentOption: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^[0-3]$/)]
      })
    }, { updateOn: 'change' });
  }

  useCurrentLocation() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position;

          this.orderService.getLocation(position.coords.latitude, position.coords.longitude).subscribe(data => {

            if (data['status'] === 'OK') {
              const comp = data['results'][0].address_components;
              const address = comp[0].long_name + ', ' + comp[1].long_name + ', ' + comp[2].long_name;
              let city = '';
              let state = '';
              let pincode = 0;
              for (let ac = 0; ac < comp.length; ac++) {
                switch (comp[ac].types[0]) {
                  case 'locality':
                    city = comp[ac].long_name;
                    break;
                  case 'administrative_area_level_1':
                    state = comp[ac].short_name;
                    break;
                  case 'postal_code':
                    pincode = comp[ac].long_name;
                    break;
                }
              }

              this.addressForm.setValue({
                address: address,
                city: city,
                state: state,
                pincode: pincode
              });

            }
          });

        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    }
  }


  placeOrder() {
    if (this.personalDetailsForm.valid && this.addressForm.valid && this.paymentForm.valid) {
      const newOrder = {
        name: this.personalDetailsForm.value.name,
        email: this.personalDetailsForm.value.email,
        phone: this.personalDetailsForm.value.phone,
        products: this.cartProducts,
        address: this.addressForm.value.address,
        city: this.addressForm.value.city,
        state: this.addressForm.value.state,
        pincode: this.addressForm.value.pincode,
        totalQuantity: this.totalQuantity,
        totalPrice: this.totalPrice,
        paymentOption: this.paymentForm.value.paymentOption
      };

      console.log(newOrder);

      this.orderService.add(newOrder).subscribe(data => {
        if (data['status']) {
          this.cartService.emptyCart();
          this.router.navigate(['/thank-you']);
        }
      });

    } else {
      console.log('Form is not valid!');
    }
  }

}
