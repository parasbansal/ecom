import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

// Custom Modules
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

import { AdminComponent } from './components/admin/admin/admin.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';

import { UserComponent } from './components/user/user/user.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { HomeComponent } from './components/user/home/home.component';
import { CartComponent } from './components/user/cart/cart.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { ThankYouComponent } from './components/user/thank-you/thank-you.component';

// Services Imports
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddProductComponent,
    UserComponent,
    NavbarComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [ProductService, CartService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
