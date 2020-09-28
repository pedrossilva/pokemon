import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'poke-stat-bar',
  template: `
    <div class="bar">
      <div class="stat" [ngStyle]="style"></div>
    </div>
  `,
  styles: [`
    .bar {
      background-color: #DDD;
      border-radius: 0.25em;
      height: 1.2em;
      width: 100%;
      padding: 0.2em;
      box-sizing: border-box;
    }
    .stat {
      height: 0.8em;
      float: left;
      border-radius: 0.25em;
    }
  `]
})
export class StatBarComponent implements OnInit {

  private _limit = 200;
  private _value: number;
  style: {[p: string]: any} | null = {
    width: '10%',
    backgroundColor: 'red'
  };

  @Input()
  set limit(limit: number) {
    this._limit = limit;
    this.style = this.calcStyle(this.value, this.limit);
  }
  get limit(): number {
    return this._limit;
  }

  @Input()
  set value(value: number) {
    this._value = value;
    this.style = this.calcStyle(this.value, this.limit);
  }
  get value(): number {
    return this._value;
  }

  constructor() { }

  ngOnInit(): void {
  }

  calcStyle(value: number, limit: number): {[p: string]: any} {
    if (!value || !limit) {
      return {};
    }

    const percent = value > limit ? 100 : (100 / limit) * value;

    return {
      width: `${percent}%`,
      backgroundColor: this.perc2color(percent)
    };
  }

  /**
   * Convert percent to color
   */
  perc2color(percent: number): string {
    let red = 0;
    let green = 0;
    const blue = 0;
    if (percent < 50) {
      red = 255;
      green = Math.round(5.1 * percent);
    }
    else {
      green = 255;
      red = Math.round(510 - 5.10 * percent);
    }
    const h = red * 0x10000 + green * 0x100 + blue * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
  }

}
