import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {faRulerVertical, faWeight, faHeart} from '@fortawesome/free-solid-svg-icons';
import {Pokemon} from '../model/pokemon';
import {WebstorageService} from '../../services/webstorage.service';

@Component({
  selector: 'poke-card',
  template: `
    <div class="card">
      <div class="card-body" *ngIf="pokemon">
        <span class="ident">#{{pokemon.id}}</span>
        <span class="favorite" (click)="toggleFavorite()" [ngClass]="{'selected': favorited}">
          <fa-icon [icon]="faHeart"></fa-icon>
        </span>
        <div class="text-center wrap-img">
            <img [src]="pokemon.img" alt="">
        </div>
        <h5 class="card-title mt-2">{{pokemon.name | titlecase}}</h5>
        <div class="mb-2">
            <span class="badge badge-pill badge-light m-1" *ngFor="let type of pokemon.types" [ngClass]="type">{{type | titlecase}}</span>
        </div>
        <div>
          <span [hidden]="!pokemon.height" class="alert alert-secondary d-inline-block m-1 pt-0 pb-0">
            <fa-icon [icon]="faRulerVertical"></fa-icon>
            {{(pokemon.height || 0) / 10}}m</span>
          <span [hidden]="!pokemon.weight" class="alert alert-secondary d-inline-block m-1 pt-0 pb-0">
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
      top: 15px;
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
    .favorite {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 28px;
      line-height: 1em;
      opacity: 0.3;
      cursor: pointer;
    }
    .favorite:hover {
      opacity: 0.4;
    }
    .favorite.selected {
      color: var(--danger);
      opacity: 1;
    }
  `]
})
export class CardComponent implements OnInit {

  faRulerVertical = faRulerVertical;
  faWeight = faWeight;
  faHeart = faHeart;
  favorited = false;

  /**
   * What background color to use
   */
  @Input()
  pokemon: Pokemon;

  @Output()
  onFavorite = new EventEmitter<boolean>();

  constructor(private storage: WebstorageService) { }

  ngOnInit(): void {
    this.storage.favorites.subscribe(favorites => {
      this.favorited = !!favorites[this.pokemon.id];
    });
  }

  toggleFavorite(): void {
    this.favorited = !this.favorited;
    this.onFavorite.emit(this.favorited);
    const { id, name } = this.pokemon;
    this.storage.saveFavorite(id, this.favorited && name);
  }
}
