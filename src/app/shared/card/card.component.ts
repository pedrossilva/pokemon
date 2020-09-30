import {Component, Input, OnInit} from '@angular/core';

import {faRulerVertical, faWeight} from '@fortawesome/free-solid-svg-icons';
import {Pokemon} from '../model/pokemon';

@Component({
  selector: 'poke-card',
  template: `
    <div class="card">
      <div class="card-body" *ngIf="pokemon">
        <span class="ident">#{{pokemon.id}}</span>
        <div class="text-center wrap-img">
            <img [src]="pokemon.img" alt="">
        </div>
        <h5 class="card-title mt-2">{{pokemon.name | titlecase}}</h5>
        <div class="mb-2">
            <span class="badge badge-pill badge-light m-1" *ngFor="let type of pokemon.types" [ngClass]="type">{{type | titlecase}}</span>
        </div>
        <div>
          <span class="alert alert-secondary d-inline-block m-1 pt-0 pb-0">
            <fa-icon [icon]="faRulerVertical"></fa-icon>
            {{pokemon.height / 10}}m</span>
          <span class="alert alert-secondary d-inline-block m-1 pt-0 pb-0">
            <fa-icon [icon]="faWeight"></fa-icon>
            {{pokemon.weight}} kg</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      max-width: 30em;
      text-align: center;
    }
    .card img {
      max-width: 50%;
    }
    .ident {
      position: absolute;
      left: 15px;
      font-size: 50px;
      line-height: 1em;
      opacity: 0.3;
      font-weight: bold;
      text-shadow: 0px 0px 4px white;
    }
    .wrap-img {
      min-height: 70px;
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
  pokemon: Pokemon;

  constructor() { }

  ngOnInit(): void {
  }

}
