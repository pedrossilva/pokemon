import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TypeComponent} from './type.component';

const routes: Routes = [
  { path: ':type', component: TypeComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TypeRoutingModule { }
