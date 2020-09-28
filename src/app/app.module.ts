import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './shared/card/card.component';
import { TypeColorPipe } from './shared/pipe/type-color.pipe';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { StatsComponent } from './shared/stats/stats.component';
import { StatBarComponent } from './shared/stat-bar/stat-bar.component';
import { RowComponent } from './shared/row/row.component';
import {HttpClientModule} from '@angular/common/http';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    TypeColorPipe,
    StatsComponent,
    StatBarComponent,
    RowComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
