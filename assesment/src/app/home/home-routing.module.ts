import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductListComponent } from './productlist/productlist.component';
import { CartpageComponent } from './cartpage/cartpage.component';

const routes: Routes = [{ path: '', component: HomeComponent ,children:[{path: 'homepage', component: HomepageComponent},{path:'productlist',component:ProductListComponent},{path:'cartpage',component:CartpageComponent}  

] }]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
