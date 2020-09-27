import {Component, Input, OnInit} from '@angular/core';

import {faRulerVertical, faWeight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'poke-card',
  template: `
    <div class="card">
      <div class="card-body">
        <span class="ident">#{{data.id}}</span>
        <div class="text-center">
            <img [src]="data.sprites.other.dream_world.front_default" alt="">
        </div>
        <h5 class="card-title mt-2">{{data.name | titlecase}}</h5>
        <div class="mb-2">
            <span class="badge badge-pill m-1" *ngFor="let item of data.types" [ngClass]="item.type.name">{{item.type.name | titlecase}}</span>
        </div>
        <div>
          <span class="alert alert-secondary d-inline-block m-1">
            <fa-icon [icon]="faRulerVertical"></fa-icon>
            {{data.height / 10}}m</span>
          <span class="alert alert-secondary d-inline-block m-1">
            <fa-icon [icon]="faWeight"></fa-icon>
            {{data.weight}} kg</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      width: 18rem;
      text-align: center;
    }
    .card img {
      max-width: 60%;
    }
    .ident {
      position: absolute;
      left: 15px;
      font-size: 50px;
      line-height: 1em;
      opacity: 0.3;
      font-weight: bold;
    }
  `]
})
export class CardComponent implements OnInit {

  faRulerVertical = faRulerVertical;
  faWeight = faWeight;

  /**
   * What background color to use
   */
  @Input()
  data: any;

  @Input()
  name: string;

  @Input()
  img: string;

  constructor() { }

  ngOnInit(): void {
  }

}
