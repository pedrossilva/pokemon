import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {Pagination} from '../shared/model/pagination';
import {NameUrl, Type} from '../shared/model/pokemon';

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

  public pokemonsSource = new BehaviorSubject([]);
  pokemons = this.pokemonsSource.asObservable();

  private paginationSource = new BehaviorSubject<Pagination>({});
  pagination = this.paginationSource.asObservable();

  private typesSource = new BehaviorSubject<Type[]>([]);
  types = this.typesSource.asObservable();

  type: string;

  constructor(private http: HttpClient) { }

  updateList(url = this.getUrl()): Observable<any> {
    return this.http.get(url)
      .pipe(mergeMap((response) => {
        const {next, previous, count, results} = response as any;
        this.setPagination({next, previous, count, url});
        return this.getList(results).pipe(map(pokemons => this.pokemonsSource.next(pokemons)));
      }));
  }

  getList(list: NameUrl[]): Observable<any> {
    const observables = (list || []).map(pokemon => this.http.get(pokemon.url));
    return forkJoin(...observables);
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

  getTypes(): Observable<any> {
    this.http.get(`${environment.api}/type/`)
      .pipe(mergeMap((response) => {
        const {results} = response as any;
        const observables = results.map(type => this.http.get(type.url));
        return forkJoin(...observables).pipe(map(types => this.typesSource.next(types)));
      })).subscribe();

    return this.types;
  }
}

