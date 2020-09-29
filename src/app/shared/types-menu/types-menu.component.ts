import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Type} from '../model/pokemon';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'poke-types-menu',
  template: `
    <div class="header"></div>
    <ul>
      <li [ngClass]="{'selected': service.type === null}">
        <a class="btn btn-light mt-1 mb-1 pl-md-5" routerLink="list">
          <span class="circle dark"></span>
          <span class="label">All</span>
        </a>
      </li>
      <li *ngFor="let type of types" [ngClass]="{'selected': type.name === service.type}" [hidden]="typeByName && !typeByName[type.name]?.pokemon?.length">
        <a class="btn btn-light mt-1 mb-1 pl-md-5" [routerLink]="['type', type.name]">
          <span class="circle" [ngClass]="type.name"></span>
          <span class="label">{{type.name | titlecase}}</span>
        </a>
      </li>
    </ul>
  `,
  styles: [`
    ul {
      padding: 0;
      margin: 0;
      overflow: auto;
      height: calc(100% - 70px);
    }
    li {
      list-style: none;
    }
    li.selected a {
      background-color: #e2e6ea;
      border-color: #dae0e5;
    }
    a {
      color: inherit;
      display: block;
      position: relative;
      overflow: hidden;
      padding: 0 1em 0 1em;
      line-height: 2.6em;
      text-align: left;
    }
    a:hover {
      color: inherit;
    }
    .circle {
      width: 1.6em;
      height: 1.6em;
      border-radius: 1em;
      position: absolute;
      top: 0.5em;
      left: 0.5em;
    }
    .spc {
      width: 1.6em;
      height: 1.6em;
      display: inline-block;
    }
    .label {
      position: relative;
      z-index: 2;
    }
  `]
})
export class TypesMenuComponent implements OnInit {
  types: Type[];
  typeByName: {[key: string]: Type} = {};

  constructor(public service: PokemonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getTypes().subscribe(types => {
      this.types = types;
      this.types.forEach(type => this.typeByName[type.name] = type);
    });
  }

}
