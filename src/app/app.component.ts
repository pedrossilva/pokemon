import {Component, OnInit} from '@angular/core';
import {PokemonService} from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pokemon';
  pokemons = [];

  constructor(protected service: PokemonService) {
  }

  ngOnInit(): void {
    this.service.updateList().subscribe();

    this.service.pokemons.subscribe(pokemons => {
      this.pokemons = pokemons;
    });
  }
}
