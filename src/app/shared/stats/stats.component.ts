import {Component, Input, OnInit} from '@angular/core';
import {Stat} from '../model/pokemon';

@Component({
  selector: 'poke-stats',
  template: `
    <div class="stats-bars">
      <div class="row mb-2" *ngFor="let stat of stats">
        <div class="col-3 text-right label-val">
          <strong class="mr-4">{{stat.name | titlecase}}</strong>
          <span class="val">{{stat.value}}</span>
        </div>
        <div class="col"><poke-stat-bar [value]="stat.value"></poke-stat-bar></div>
      </div>
    </div>
  `,
  styles: [`
    .val {
      min-width: 2.5em;
      display: inline-block;
    }
    .label-val {
      min-width: 15em;
      max-width: 15em;
    }
    .stats-bars {
      max-width: 1600px;
      margin: 0 auto;
    }
  `]
})
export class StatsComponent implements OnInit {

  @Input()
  stats: Stat[];

  constructor() { }

  ngOnInit(): void {
  }

}
