import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Pagination} from '../model/pagination';
import {PokemonService} from '../../services/pokemon.service';
import {Subscription} from 'rxjs';
import {faTh, faThList} from '@fortawesome/free-solid-svg-icons';
import {WebstorageService} from '../../services/webstorage.service';

@Component({
  selector: 'poke-paginator',
  template: `
    <div class="row">
      <div class="col">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><button class="page-link" (click)="service.previous()" [disabled]="!pagination.previous">Previous</button></li>
            <li *ngFor="let page of pages" class="page-item"><button class="page-link" (click)="service.page(page)"
                [disabled]="pagination.page === page" [ngClass]="{'d-none d-md-block': page === '...' || page > this.pagination.page + 1 || page < this.pagination.page - 1}">{{page}}</button></li>
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
      <div class="m-2 col typelist-select">
        <fa-icon [icon]="typeListIcon" (click)="toggleTypeList()"></fa-icon>
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
    .typelist-select {
      font-size: 1.4em;
      cursor: pointer;
    }
  `]
})
export class PaginatorComponent implements OnInit, OnDestroy {
  paginatorSubscription: Subscription;
  typeList = 'list';
  typeListIcon = faTh;

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

  constructor(public service: PokemonService, private storage: WebstorageService) { }

  ngOnInit(): void {
    this.paginatorSubscription = this.service.pagination.subscribe(pagination => (this.pagination = pagination));

    this.storage.options.subscribe(options => {
      this.typeList = options?.typeList || 'list';
      this.typeListIcon = this.typeList === 'grid' ? faThList : faTh;
    });
  }

  toggleTypeList(): void {
    const typeList = this.typeList === 'list' ? 'grid' : 'list';
    this.storage.saveOptions('typeList', typeList);
  }

  ngOnDestroy(): void {
    this.paginatorSubscription && this.paginatorSubscription.unsubscribe();
  }

}
