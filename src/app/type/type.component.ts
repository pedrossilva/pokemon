import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from '../services/pokemon.service';
import {NameUrl, Pokemon, PokemonData, Type} from '../shared/model/pokemon';

@Component({
  selector: 'poke-type',
  template: `
    <div class="header"></div>
    <div class="pokelist">
      <div *ngFor="let pokemonData of pokemons" class="p-1">
        <poke-row [pokemon]="pokemonData | toPokemon"></poke-row>
      </div>
    </div>
    <div class="pagination text-center">
      <div class="m-auto">
        <button disabled class="btn btn-light btn-sm mr-4">{{pokemons.length}} / {{typeSelected?.pokemon?.length}}</button>
        <button class="btn btn-light btn-sm" (click)="next()" [hidden]="pokemons.length >= typeSelected?.pokemon?.length">Load More...</button>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class TypeComponent implements OnInit {
  type: string;
  types: Type[];
  pokemons: PokemonData[] = [];
  page: Page;
  typeSelected: Type;

  constructor(private activatedRoute: ActivatedRoute, private service: PokemonService) { }

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.params.type;

    /**
     * Subscribe in param url "type"
     */
    this.activatedRoute.paramMap.subscribe(params => {
      this.type = params.get('type');
      this.service.type = this.type;
      this.getList();
    });

    /**
     * set this.types on update types in service
     */
    this.service.types.subscribe(types => {
      this.types = types;
      this.getList();
    });
  }

  /**
   * Get type by name and define list with first 10 items
   */
  getList(): Pokemon[] {
    if(!this.type || !this.types) return [];
    const type = this.types.find(t => t.name === this.type);
    this.typeSelected = type || null;
    if(!type) return [];

    this.page = new Page(type.pokemon.map(poke => poke.pokemon));
    this.pokemons.length = 0;
    this.next();
  }

  /**
   * Load +10 items on click in "Learn More..."
   */
  next(): void {
    if(!this.page) return;
    const pageList: NameUrl[] = this.page.next().value;
    this.service.getList(pageList).subscribe(pokemons => {
      this.pokemons = [...this.pokemons, ...pokemons];
    });
  }

}

/**
 * Page iterator return 10 items for step
 */
class Page {
  private pointer = 0;
  private offset = 10;

  constructor(public items: NameUrl[]) {
  }

  public next(): IteratorResult<NameUrl[]> {
    if (this.pointer < this.items.length) {
      const result = {
        done: false,
        value: this.items.slice(this.pointer, this.pointer + this.offset)
      };
      this.pointer += this.offset;
      return result;
    } else {
      return {
        done: true,
        value: null
      };
    }
  }

}
