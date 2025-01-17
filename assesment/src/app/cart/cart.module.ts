import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { FormsModule } from '@angular/forms';
import { CartpageComponent } from './components/cartpage/cartpage.component';
import { IndianCurrencyPipe } from '../pipes/indian-currency.pipe';


@NgModule({
  declarations: [
    CartComponent,
    CartpageComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    IndianCurrencyPipe


  ]
})
export class CartModule { }
