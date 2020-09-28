import {Component, Input, OnInit} from '@angular/core';
import {StatInfo} from '../model/stat';

@Component({
  selector: 'poke-stats',
  template: `
    <div class="stats-bars">
      <div class="row mb-2" *ngFor="let item of stats">
        <div class="col-3 text-right label-val">
          <strong class="mr-4">{{item.stat.name | titlecase}}</strong>
          <span class="val">{{item.base_stat}}</span>
        </div>
        <div class="col"><poke-stat-bar [value]="item.base_stat"></poke-stat-bar></div>
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
  stats: StatInfo[];

  constructor() { }

  ngOnInit(): void {
  }

}
