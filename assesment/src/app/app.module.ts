import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
     BrowserAnimationsModule,  // Required for ngx-toastr animations
     ToastrModule.forRoot( {positionClass: 'toast-top-right',  // Default position
      preventDuplicates: true,} )   
 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
