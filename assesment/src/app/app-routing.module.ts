import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './home/components/homepage/homepage.component';
import { ProductListComponent } from './home/components/productlist/productlist.component';
import { CartpageComponent } from './cart/components/cartpage/cartpage.component';

import { ErrorComponent } from './notfound/components/error/error.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'product/:id', component: ProductListComponent },
  { path: 'cartpage', component: CartpageComponent },
  { path: '', redirectTo: '/home/homepage', pathMatch: 'full' },


{path:'error/notfound',component:ErrorComponent}  ,

  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'notfound', loadChildren: () => import('./notfound/notfound.module').then(m => m.NotfoundModule) },
  { path: '**', redirectTo: '/error/notfound' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
