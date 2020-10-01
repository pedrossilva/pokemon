import { Component, OnInit } from '@angular/core';
import {LoadingService} from './loading.service';

@Component({
  selector: 'poke-loading',
  template: `
    <div class="overlay" [hidden]="!data.show">
      <div class="wrap">
        <div class="half-ball"></div>
        <div class="big-button"></div>
        <div class="small-button"></div>
        <div class="horizon"></div>
        <div class="ball"></div>
      </div>
    </div>
  `,
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(public data: LoadingService) { }

  ngOnInit(): void {
  }

}
