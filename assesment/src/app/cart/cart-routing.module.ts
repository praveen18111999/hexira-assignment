import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartpageComponent } from './components/cartpage/cartpage.component';

const routes: Routes = [{ path: '', component: CartComponent, children: [{ path: 'cartpage', component: CartpageComponent }] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
