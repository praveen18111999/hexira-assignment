import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductListComponent } from './productlist/productlist.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    HomeComponent,
    HomepageComponent,
    ProductListComponent,
    CartpageComponent,
    NotFoundComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    HttpClientModule,
    CurrencyPipe,

    
   
  ]
})
export class HomeModule { }
