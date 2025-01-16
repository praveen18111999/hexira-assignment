import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { CartpageComponent } from './home/cartpage/cartpage.component';
import { ProductListComponent } from './home/productlist/productlist.component';

const routes: Routes = [
  {path:'home',component:HomeComponent}, 
  {path:'homepage',component:HomepageComponent},
  {path:'productlist',component:ProductListComponent},  
  {path:'cartpage',component:CartpageComponent},  
  {path:'',redirectTo:'/home/homepage',pathMatch:'full'  },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
