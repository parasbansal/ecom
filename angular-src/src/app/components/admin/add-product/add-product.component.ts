import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: FormGroup;
  error: String = '';
  constructor(
    private el: ElementRef,
    private productService: ProductService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.addProductForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(200)]
      }),
      price: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^[0-9]+(\.\d{1,2})?$/)]
      }),
      stock: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^[0-9]+$/)]
      }),
      photo: new FormControl('')
    }, { updateOn: 'change' });
  }

  addProduct() {
    if (this.addProductForm.valid) {
      const photoEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
      const fileCount: Number = photoEl.files.length;

      if (fileCount > 0) {

        const formData = new FormData();

        formData.append('photo', photoEl.files.item(0));
        formData.append('name', this.addProductForm.value.name);
        formData.append('price', this.addProductForm.value.price);
        formData.append('stock', this.addProductForm.value.stock);

        this.productService.add(formData).subscribe(data => {
          if (data['status']) {
            this.flashMessage.show('Product added!', { cssClass: 'alert', timeout: 5000 });
            this.addProductForm.reset();
          } else {
            this.error = 'Something went wrong! Please try again later.';
          }
        });

      } else {
        this.error = 'Please select an image to upload';
      }

    } else {
      this.error = 'Please enter valid inputs';
    }
  }

}
