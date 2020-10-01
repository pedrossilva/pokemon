import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from '../services/pokemon.service';
import {NameUrl, PokemonData, Type} from '../shared/model/pokemon';
import {WebstorageService} from '../services/webstorage.service';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'poke-type',
  template: `
    <div class="header"></div>
    <div class="pokelist">
      <div class="alert alert-light" [hidden]="totalPokemons">{{type === 'favorites' ? 'No favorites' : 'No data'}}</div>
      <div *ngFor="let pokemonData of pokemons" class="p-1">
        <poke-row [pokemon]="pokemonData | toPokemon"></poke-row>
      </div>
    </div>
    <div class="pagination text-center">
      <div class="m-auto">
        <button disabled class="btn btn-light btn-sm mr-4">{{pokemons.length}} / {{totalPokemons}}</button>
        <button class="btn btn-light btn-sm" (click)="next()" [hidden]="pokemons.length >= totalPokemons">Load More...</button>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class TypeComponent implements OnInit, OnDestroy {
  type: string;
  types: Type[];
  pokemons: PokemonData[] = [];
  page: Page;
  typeSelected: Type;
  totalPokemons = 0;
  favorites: NameUrl[] = [];
  favoritesSubscription: Subscription;
  typesSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PokemonService,
    private storage: WebstorageService
  ) { }

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.params.type;

    /**
     * Subscribe in param url "type"
     */
    this.activatedRoute.paramMap.subscribe(params => {
      this.type = params.get('type');
      this.service.type = this.type;
      return this.checkSubscriptions() || this.makeList();
    });

  }

  checkSubscriptions(): boolean {
    let newSubscription = false;
    if(this.type === 'favorites' && !this.favoritesSubscription) {
      /**
       * get localStorage favorites and set pages
       */
      this.favoritesSubscription = this.storage.favorites.subscribe(favorites => {
        const names = Object.values(favorites || {});
        this.favorites = names.map(name => ({name, url: `${environment.api}/pokemon/${name}`}));
        if (this.type === 'favorites') {
          this.makeList();
        }
      });
      newSubscription = true;
    }
    if(this.type !== 'favorites' && !this.typesSubscription) {
      /**
       * set this.types on update types in service
       */
      this.typesSubscription = this.service.types.subscribe(types => {
        this.types = types;
        this.makeList();
      });
      newSubscription = true;
    }
    return newSubscription;
  }

  makeList(): void {
    (this.type === 'favorites') ? this.setPages(this.favorites) : this.getList();
  }

  /**
   * Get type by name and define list with first 10 items
   */
  getList(): void {
    if(!this.type || !this.types) return;
    const type = this.types.find(t => t.name === this.type);
    this.typeSelected = type || null;
    if(!type) return;
    this.setPages(type.pokemon.map(poke => poke.pokemon));
  }

  setPages(pokelist: NameUrl[]): void {
    this.totalPokemons = pokelist.length;
    this.page = new Page(pokelist);
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

  ngOnDestroy(): void {
    this.type = undefined;
    this.favorites = [];
    this.pokemons = [];
    this.favoritesSubscription && this.favoritesSubscription.unsubscribe();
    this.typesSubscription && this.typesSubscription.unsubscribe();
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
