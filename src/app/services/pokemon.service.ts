import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {Page, Pagination} from '../shared/model/pagination';
import {Pokemon} from '../shared/model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private _pagination: Pagination = {
    count: 0,
    page: 0,
    limit: 10,
    offset: 0,
    next: '',
    previous: '',
    url: ''
  };

  private pokemonsSource = new BehaviorSubject([]);
  pokemons = this.pokemonsSource.asObservable();

  private paginationSource = new BehaviorSubject<Pagination>({});
  pagination = this.paginationSource.asObservable();

  constructor(private http: HttpClient) { }

  updateList(url = this.getUrl()): Observable<any> {
    return this.http.get(url)
      .pipe(mergeMap((response) => {
        const {next, previous, count, results} = response as any;
        this.setPagination({next, previous, count, url});
        const observables = results.map(pokemon => this.http.get(pokemon.url));
        return forkJoin(...observables).pipe(map(pokemons => this.pokemonsSource.next(pokemons)));
      }));
  }

  next(): void {
    this.updateList(this._pagination.next).subscribe();
  }

  previous(): void {
    this.updateList(this._pagination.previous).subscribe();
  }

  page(page): void {
    if(isNaN(page)) return;
    const { limit } = this._pagination;
    this.updateList(this.getUrl({page: page - 1, limit})).subscribe();
  }

  getUrl(pagination = this._pagination): string {
    const {page, limit} = pagination || {};
    const offset = page * limit;
    pagination.url = `${environment.api}/pokemon/?limit=${limit}&offset=${offset}`;
    this.setPagination(pagination);
    return pagination.url;
  }

  getLimitOffset(url: string): {limit?: number, offset?: number} {
    if(!url) return {};
    const [_, search] = url.split('?');
    const urlParams = new URLSearchParams(search);
    return {
      limit: +urlParams.get('limit'),
      offset: +urlParams.get('offset')
    };
  }

  setPagination(pagination: Pagination): void {
    if(!pagination) {
      pagination = {};
    }
    const { limit, offset } = this.getLimitOffset(pagination.url);
    const newPaginator = Object.assign( pagination, {
      limit: limit || pagination.limit,
      offset: offset || pagination.offset,
      page: !offset ? 1 : (offset / limit) + 1
    });
    Object.assign(this._pagination, newPaginator);
    this.paginationSource.next(newPaginator);
  }

  getTypes(): void {
    this.http.get(`${environment.api}/type/`)
      .pipe(mergeMap((response) => {
        const {results} = response as any;
        // this.setPagination({next, previous, count, url});
        const observables = results.map(pokemon => this.http.get(pokemon.url));
        return forkJoin(...observables).pipe(map(pokemons => this.pokemonsSource.next(pokemons)));
      })).subscribe(data => console.log(data));
  }
}

