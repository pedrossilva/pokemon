import { Pipe, PipeTransform } from '@angular/core';
import {Pokemon, PokemonData} from '../model/pokemon';
import {pokemonNormalize} from '../model/pokemon.normalize';

@Pipe({
  name: 'toPokemon'
})
export class ToPokemonPipe implements PipeTransform {

  transform(pokemonData: PokemonData): Pokemon {
    return pokemonNormalize(pokemonData);
  }

}
