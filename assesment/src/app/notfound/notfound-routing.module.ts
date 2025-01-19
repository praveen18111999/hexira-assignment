import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [{ path: '', component: NotfoundComponent ,children:[{path:'error',component:ErrorComponent}]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotfoundRoutingModule { }
