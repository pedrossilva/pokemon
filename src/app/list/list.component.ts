import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../services/pokemon.service';
import {PokemonData} from '../shared/model/pokemon';

@Component({
  selector: 'poke-list',
  template: `
    <div class="header"></div>
    <div class="pokelist" [ngClass]="{'row': grid}">
      <div *ngFor="let pokemonData of pokemons" class="p-1" [ngClass]="{'col-md-6 col-lg-4 col-xl-3': grid}">
        <poke-row [pokemon]="pokemonData | toPokemon" [grid]="grid"></poke-row>
      </div>
    </div>
    <div class="pagination">
      <poke-paginator></poke-paginator>
    </div>
  `,
  styles: [`
  `]
})
export class ListComponent implements OnInit {
  pokemons: PokemonData[] = [];
  grid = false;

  constructor(protected service: PokemonService) {
    service.type = null;
  }

  ngOnInit(): void {
    this.service.updateList().subscribe();

    this.service.pokemons.subscribe(pokemons => {
      this.pokemons = pokemons;
    });
  }

}
