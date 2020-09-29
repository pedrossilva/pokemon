import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from './card/card.component';
import {TypeColorPipe} from './pipe/type-color.pipe';
import {StatsComponent} from './stats/stats.component';
import {StatBarComponent} from './stat-bar/stat-bar.component';
import {RowComponent} from './row/row.component';
import {PaginatorComponent} from './paginator/paginator.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { TypesMenuComponent } from './types-menu/types-menu.component';
import {RouterModule} from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    RowComponent,
    PaginatorComponent,
    TypesMenuComponent
  ],
  declarations: [
    CardComponent,
    TypeColorPipe,
    StatsComponent,
    StatBarComponent,
    RowComponent,
    PaginatorComponent,
    TypesMenuComponent
  ]
})
export class SharedModule { }
