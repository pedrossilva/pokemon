import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeRoutingModule } from './type-routing.module';
import { TypeComponent } from './type.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [TypeComponent],
  imports: [
    CommonModule,
    TypeRoutingModule,
    SharedModule
  ],
  exports: [TypeComponent]
})
export class TypeModule { }
