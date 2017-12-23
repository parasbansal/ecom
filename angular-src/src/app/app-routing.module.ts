import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin/admin.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';

import { UserComponent } from './components/user/user/user.component';
import { HomeComponent } from './components/user/home/home.component';
import { CartComponent } from './components/user/cart/cart.component';
import { CheckoutComponent } from './components/user/checkout/checkout.component';
import { ThankYouComponent } from './components/user/thank-you/thank-you.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: '', component: HomeComponent, data: { title: 'E-commerce' } },
      { path: 'cart', component: CartComponent, data: { title: 'Cart | E-commerce' } },
      { path: 'checkout', component: CheckoutComponent, data: { title: 'Checkout | E-commerce' } },
      { path: 'thank-you', component: ThankYouComponent, data: { title: 'Thanks | E-commerce' } }
    ],
    data: { title: '' }
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'add-product', component: AddProductComponent, data: { title: 'Add new Product' } },
    ],
    data: { title: '' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
