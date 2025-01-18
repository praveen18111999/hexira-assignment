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
import { ToastrModule } from 'ngx-toastr';



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
    IndianCurrencyPipe,ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Optional: Global position for toastr notifications
      timeOut: 3000,  // Optional: Duration for which the toastr is visible
      closeButton: true,  // Optional: Adds a close button to the toastr
    }),



  ]
})
export class HomeModule { }
