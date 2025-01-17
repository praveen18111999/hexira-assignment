import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProductListComponent } from './components/productlist/productlist.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { IndianCurrencyPipe } from '../pipes/indian-currency.pipe';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomepageComponent,
    ProductListComponent,
    HeaderComponent,

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
