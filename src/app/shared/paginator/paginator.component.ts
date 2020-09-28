import {Component, Input, OnInit} from '@angular/core';
import {Pagination} from '../model/pagination';
import {PokemonService} from '../../services/pokemon.service';

@Component({
  selector: 'poke-paginator',
  template: `
    <div class="row">
      <div class="col">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><button class="page-link" (click)="service.previous()" [disabled]="!pagination.previous">Previous</button></li>
            <li *ngFor="let page of pages" class="page-item"><button class="page-link" (click)="service.page(page)" [disabled]="pagination.page === page">{{page}}</button></li>
            <li class="page-item"><button class="page-link" (click)="service.next()" [disabled]="!pagination.next">Next</button></li>
          </ul>
        </nav>
      </div>

      <div class="m-2 col">
        <select [(ngModel)]="limit" class="form-control form-control-sm w-auto" name="perpage" id="perpage">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  `,
  styles: [`
    nav {
      margin: 0 auto;
    }
    .pagination li button[disabled] {
      background-color: #eeeeee;
    }
    .page-link {
      color: var(--gray-dark);
    }
    select.form-control {
      outline: none;
      box-shadow: unset;
    }
  `]
})
export class PaginatorComponent implements OnInit {
  get limit(): number {
    return this.pagination.limit;
  }
  set limit(limit: number) {
    this.service.setPagination({offset: limit, limit, page: 1});
    this.service.page(1);
  }

  pages: (number | string)[] = [];
  private _pagination: Pagination;
  get pagination(): Pagination {
    return this._pagination;
  }

  set pagination(pagination: Pagination) {
    this._pagination = pagination;
    const { count, limit, page } = pagination;
    if(!count) return;
    const numPages = Math.ceil(count / limit);
    const show = [-page + 1, '...', -2, -1, 0, 1, 2, '...', numPages - page];
    if(page < 4) show.splice(0, 2);
    if(page > numPages - 4) show.splice(-2);

    const showPages = show.map(n => (page + +n) || n)
      .filter(v => v === '...' || v > 0 && v <= numPages);

    this.pages = showPages;
  }

  constructor(public service: PokemonService) { }

  ngOnInit(): void {
    this.service.pagination.subscribe(pagination => (this.pagination = pagination));
  }

}
