import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../model/pokemon';

@Component({
  selector: 'poke-row',
  template: `
    <div class="row align-items-center p-1">
      <div class="col-12 card-wrap" [ngClass]="{'col-md-4': !grid}">
        <poke-card [pokemon]="pokemon"></poke-card>
      </div>
      <div class="col mt-4" [ngClass]="{'col-md-12': grid}">
        <poke-stats [stats]="pokemon?.stats"></poke-stats>
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

  @Input()
  pokemon: Pokemon;

  @Input() grid = false;

  constructor() { }

  ngOnInit(): void {
  }

}
