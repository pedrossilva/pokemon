import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../model/pokemon';

@Component({
  selector: 'poke-row',
  template: `
    <div class="row align-items-center p-1">
      <div class="col-12 col-md-4 card-wrap">
        <poke-card [data]="data"></poke-card>
      </div>
      <div class="col mt-4">
        <poke-stats [stats]="data.stats"></poke-stats>
      </div>
    </div>
  `,
  styles: [`
    .card-wrap {
      max-width: 515px;
      margin: 0 auto;
    }
  `]
})
export class RowComponent implements OnInit {

  @Input() data: Pokemon;

  constructor() { }

  ngOnInit(): void {
  }

}
