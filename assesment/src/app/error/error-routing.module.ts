import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [{
  path: '', component: ErrorComponent,
  children: [{ path: 'notfound', component: NotfoundComponent }
    ,
    

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
