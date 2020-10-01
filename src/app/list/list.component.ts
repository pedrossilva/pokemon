import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../services/pokemon.service';
import {PokemonData} from '../shared/model/pokemon';
import {WebstorageService} from '../services/webstorage.service';

@Component({
  selector: 'poke-list',
  template: `
    <div class="header"></div>
    <div class="pokelist" [ngClass]="{'row grid': grid}">
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

  constructor(protected service: PokemonService, private storage: WebstorageService) {
    service.type = null;
  }

  ngOnInit(): void {
    // if(!this.pokemons.length) {
    if(!this.service.pokemonsSource.getValue().length) {
      this.service.updateList().subscribe();
    }

    this.service.pokemons.subscribe(pokemons => {
      this.pokemons = pokemons;
    });

    this.storage.options.subscribe(options => this.grid = options.typeList === 'grid');
  }

}
