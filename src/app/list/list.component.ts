import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../services/pokemon.service';

@Component({
  selector: 'poke-list',
  template: `
    <div class="header"></div>
    <div class="pokelist p-2">
      <div *ngFor="let pokemon of pokemons" class="p-1">
        <poke-row [data]="pokemon"></poke-row>
      </div>
    </div>
    <div class="pagination">
      <poke-paginator></poke-paginator>
    </div>
  `,
  styles: [`
    .pokelist {
      overflow: auto;
      height: calc(100% - 80px);
      background-color: var(--light);
    }
  `]
})
export class ListComponent implements OnInit {
  pokemons = [];

  constructor(protected service: PokemonService) {
  }

  ngOnInit(): void {
    this.service.updateList().subscribe();

    this.service.pokemons.subscribe(pokemons => {
      this.pokemons = pokemons;
    });
  }

}
