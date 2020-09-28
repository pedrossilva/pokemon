import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../model/pokemon';

@Component({
  selector: 'poke-row',
  template: `
    <div class="row align-items-center p-1">
      <div class="col-4">
        <poke-card [data]="data"></poke-card>
      </div>
      <div class="col">
        <poke-stats [stats]="data.stats"></poke-stats>
      </div>
    </div>
  `,
  styles: [`
  `]
})
export class RowComponent implements OnInit {

  @Input() data: Pokemon;

  constructor() { }

  ngOnInit(): void {
  }

}
