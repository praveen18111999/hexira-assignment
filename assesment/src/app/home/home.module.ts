import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductListComponent } from './productlist/productlist.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { IndianCurrencyPipe } from '../pipes/indian-currency.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    HomepageComponent,
    ProductListComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    FormsModule,
    IndianCurrencyPipe



  ]
})
export class HomeModule { }
